import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';
import { getAllPaintings } from '../src/repositories/paintings.ts';
import { getAllPacks } from '../src/repositories/packs.ts';
import { getProgressForUser, upsertProgress, syncProgress } from '../src/repositories/progress.ts';
import type { ProgressRecord } from '../src/types.ts';

let db: TestDb;

async function seedPainting() {
  await db.query(`INSERT INTO painters (id, name, birth_year, death_year) VALUES ('vangogh', 'Vincent van Gogh', 1853, 1890)`);
  await db.query(`INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url, style_tag, docent_story, is_featured)
                  VALUES ('starry-night', 'vangogh', 'The Starry Night', 'img', 'thumb', 'post-impressionism', 'a story', TRUE)`);
  await db.query(`INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES
                  ('starry-night', '25', 5, 5), ('starry-night', '100', 10, 10)`);
}

beforeEach(async () => {
  db = await createTestDb();
});
afterEach(async () => {
  await db.close();
});

describe('getAllPaintings', () => {
  it('returns paintings with nested painter and difficulties', async () => {
    await seedPainting();
    const paintings = await getAllPaintings(db);
    expect(paintings).toHaveLength(1);
    const p = paintings[0];
    expect(p.id).toBe('starry-night');
    expect(p.painter.name).toBe('Vincent van Gogh');
    expect(p.isFeatured).toBe(true);
    expect(p.difficulties.map((d) => d.level).sort()).toEqual(['100', '25']);
    expect(p.difficulties.find((d) => d.level === '25')).toMatchObject({ gridCols: 5, gridRows: 5 });
  });

  it('returns an empty array when no paintings', async () => {
    expect(await getAllPaintings(db)).toEqual([]);
  });
});

describe('getAllPacks', () => {
  it('returns packs with painting ids', async () => {
    await db.query(`INSERT INTO packs (id, name, description, price_display, revenuecat_product_id, painting_ids)
                    VALUES ('impressionism', 'Impressionism Masters', 'desc', '$3.99', 'rc_impr', ARRAY['starry-night'])`);
    const packs = await getAllPacks(db);
    expect(packs).toHaveLength(1);
    expect(packs[0]).toMatchObject({ id: 'impressionism', name: 'Impressionism Masters', paintingIds: ['starry-night'] });
  });
});

describe('progress repository', () => {
  const userId = 'user_123';
  function rec(overrides: Partial<ProgressRecord> = {}): ProgressRecord {
    return {
      paintingId: 'starry-night',
      difficulty: '100',
      placedPieceIds: [0, 1, 2],
      isCompleted: false,
      completedAt: null,
      updatedAt: '2026-10-13T10:00:00.000Z',
      ...overrides,
    };
  }

  it('upsertProgress inserts then updates the same row', async () => {
    await seedPainting();
    await upsertProgress(db, userId, rec());
    let all = await getProgressForUser(db, userId);
    expect(all).toHaveLength(1);
    expect(all[0].placedPieceIds).toEqual([0, 1, 2]);

    await upsertProgress(db, userId, rec({ placedPieceIds: [0, 1, 2, 3], updatedAt: '2026-10-13T11:00:00.000Z' }));
    all = await getProgressForUser(db, userId);
    expect(all).toHaveLength(1);
    expect(all[0].placedPieceIds).toEqual([0, 1, 2, 3]);
  });

  it('getProgressForUser returns records in ProgressRecord shape', async () => {
    await seedPainting();
    await upsertProgress(db, userId, rec({ isCompleted: true, completedAt: '2026-10-13T10:00:00.000Z' }));
    const all = await getProgressForUser(db, userId);
    expect(all[0]).toMatchObject({
      paintingId: 'starry-night',
      difficulty: '100',
      isCompleted: true,
    });
    expect(typeof all[0].updatedAt).toBe('string');
  });

  it('syncProgress merges incoming records against server (completion is monotonic)', async () => {
    await seedPainting();
    // 서버에는 완성본이 이미 있음
    await upsertProgress(db, userId, rec({ isCompleted: true, completedAt: '2026-10-13T09:00:00.000Z', updatedAt: '2026-10-13T09:00:00.000Z' }));
    // 클라이언트가 더 최신 timestamp의 미완성본을 올림 → 완성이 유지돼야 함
    const merged = await syncProgress(db, userId, [rec({ isCompleted: false, updatedAt: '2026-10-13T20:00:00.000Z' })]);
    const target = merged.find((m) => m.paintingId === 'starry-night' && m.difficulty === '100');
    expect(target?.isCompleted).toBe(true);

    const persisted = await getProgressForUser(db, userId);
    expect(persisted.find((p) => p.difficulty === '100')?.isCompleted).toBe(true);
  });
});
