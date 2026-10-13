import type { QueryExecutor } from '../lib/db.ts';
import type { ProgressRecord, Difficulty } from '../types.ts';
import { mergeProgress } from '../lib/sync-merge.ts';

interface ProgressRow {
  painting_id: string;
  difficulty: Difficulty;
  placed_piece_ids: number[] | string;
  is_completed: boolean;
  completed_at: Date | string | null;
  updated_at: Date | string;
}

function toIso(value: Date | string | null): string | null {
  if (value === null) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function rowToRecord(r: ProgressRow): ProgressRecord {
  const pieces = typeof r.placed_piece_ids === 'string' ? JSON.parse(r.placed_piece_ids) : r.placed_piece_ids;
  return {
    paintingId: r.painting_id,
    difficulty: r.difficulty,
    placedPieceIds: pieces ?? [],
    isCompleted: r.is_completed,
    completedAt: toIso(r.completed_at),
    updatedAt: toIso(r.updated_at) as string,
  };
}

/** user_progress FK를 위해 users 행이 존재하도록 보장한다. */
async function ensureUser(db: QueryExecutor, userId: string): Promise<void> {
  await db.query(`INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`, [userId]);
}

export async function getProgressForUser(db: QueryExecutor, userId: string): Promise<ProgressRecord[]> {
  const rows = await db.query<ProgressRow>(
    `SELECT painting_id, difficulty, placed_piece_ids, is_completed, completed_at, updated_at
     FROM user_progress WHERE user_id = $1`,
    [userId],
  );
  return rows.map(rowToRecord);
}

export async function upsertProgress(db: QueryExecutor, userId: string, record: ProgressRecord): Promise<void> {
  await ensureUser(db, userId);
  await db.query(
    `INSERT INTO user_progress (user_id, painting_id, difficulty, placed_piece_ids, is_completed, completed_at, updated_at)
     VALUES ($1, $2, $3, $4::jsonb, $5, $6, $7)
     ON CONFLICT (user_id, painting_id, difficulty)
     DO UPDATE SET placed_piece_ids = EXCLUDED.placed_piece_ids,
                   is_completed = EXCLUDED.is_completed,
                   completed_at = EXCLUDED.completed_at,
                   updated_at = EXCLUDED.updated_at`,
    [
      userId,
      record.paintingId,
      record.difficulty,
      JSON.stringify(record.placedPieceIds),
      record.isCompleted,
      record.completedAt,
      record.updatedAt,
    ],
  );
}

/**
 * 클라이언트가 올린 레코드들을 서버 상태와 병합(mergeProgress)하여 저장하고,
 * 병합 후 유저의 전체 진행상황을 반환한다.
 */
export async function syncProgress(
  db: QueryExecutor,
  userId: string,
  incoming: ProgressRecord[],
): Promise<ProgressRecord[]> {
  await ensureUser(db, userId);
  const existing = await getProgressForUser(db, userId);
  const serverByKey = new Map<string, ProgressRecord>();
  for (const r of existing) serverByKey.set(`${r.paintingId}:${r.difficulty}`, r);

  for (const local of incoming) {
    const key = `${local.paintingId}:${local.difficulty}`;
    const winner = mergeProgress(local, serverByKey.get(key) ?? null);
    await upsertProgress(db, userId, winner);
  }

  await db.query(`UPDATE users SET last_synced_at = NOW() WHERE id = $1`, [userId]);
  return getProgressForUser(db, userId);
}
