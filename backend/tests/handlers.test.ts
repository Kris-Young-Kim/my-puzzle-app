import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';
import { handleGetPaintings } from '../src/handlers/paintings.ts';
import { handleGetPacks } from '../src/handlers/packs.ts';
import { handleGetProgress, handlePutProgress } from '../src/handlers/progress.ts';
import { handleSync } from '../src/handlers/sync.ts';
import type { Deps } from '../src/lib/deps.ts';

let db: TestDb;

function depsWithUser(userId: string | null): Deps {
  return { db, getUserId: async () => userId };
}

async function readJson(res: Response) {
  return JSON.parse(await res.text());
}

async function seedPainting() {
  await db.query(`INSERT INTO painters (id, name) VALUES ('vangogh', 'Vincent van Gogh')`);
  await db.query(`INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url) VALUES ('starry-night', 'vangogh', 'Starry Night', 'img', 'thumb')`);
  await db.query(`INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES ('starry-night', '100', 10, 10)`);
}

beforeEach(async () => {
  db = await createTestDb();
});
afterEach(async () => {
  await db.close();
});

describe('GET /paintings', () => {
  it('returns 200 with paintings array (public, no auth)', async () => {
    await seedPainting();
    const res = await handleGetPaintings(new Request('https://x.test/api/paintings'), depsWithUser(null));
    expect(res.status).toBe(200);
    const body = await readJson(res);
    expect(body.success).toBe(true);
    expect(body.paintings).toHaveLength(1);
  });
});

describe('GET /packs', () => {
  it('returns 200 with packs array', async () => {
    const res = await handleGetPacks(new Request('https://x.test/api/packs'), depsWithUser(null));
    expect(res.status).toBe(200);
    expect((await readJson(res)).packs).toEqual([]);
  });
});

describe('GET /progress', () => {
  it('returns 401 when unauthenticated', async () => {
    const res = await handleGetProgress(new Request('https://x.test/api/progress'), depsWithUser(null));
    expect(res.status).toBe(401);
  });

  it('returns the user progress when authenticated', async () => {
    await seedPainting();
    const res = await handleGetProgress(new Request('https://x.test/api/progress'), depsWithUser('user_1'));
    expect(res.status).toBe(200);
    expect((await readJson(res)).progress).toEqual([]);
  });
});

describe('PUT /progress', () => {
  const validBody = JSON.stringify({
    paintingId: 'starry-night',
    difficulty: '100',
    placedPieceIds: [0, 1],
    isCompleted: false,
    completedAt: null,
    updatedAt: '2026-10-13T10:00:00.000Z',
  });

  it('returns 401 when unauthenticated', async () => {
    const req = new Request('https://x.test/api/progress', { method: 'PUT', body: validBody });
    const res = await handlePutProgress(req, depsWithUser(null));
    expect(res.status).toBe(401);
  });

  it('returns 400 on invalid body', async () => {
    await seedPainting();
    const req = new Request('https://x.test/api/progress', { method: 'PUT', body: JSON.stringify({ difficulty: '100' }) });
    const res = await handlePutProgress(req, depsWithUser('user_1'));
    expect(res.status).toBe(400);
  });

  it('upserts and returns 200 on valid body', async () => {
    await seedPainting();
    const req = new Request('https://x.test/api/progress', { method: 'PUT', body: validBody });
    const res = await handlePutProgress(req, depsWithUser('user_1'));
    expect(res.status).toBe(200);
    expect((await readJson(res)).success).toBe(true);
  });
});

describe('POST /sync', () => {
  it('returns 401 when unauthenticated', async () => {
    const req = new Request('https://x.test/api/sync', { method: 'POST', body: JSON.stringify({ records: [] }) });
    const res = await handleSync(req, depsWithUser(null));
    expect(res.status).toBe(401);
  });

  it('merges records and returns the full progress set', async () => {
    await seedPainting();
    const body = JSON.stringify({
      records: [{
        paintingId: 'starry-night', difficulty: '100', placedPieceIds: [0, 1, 2],
        isCompleted: true, completedAt: '2026-10-13T10:00:00.000Z', updatedAt: '2026-10-13T10:00:00.000Z',
      }],
    });
    const req = new Request('https://x.test/api/sync', { method: 'POST', body });
    const res = await handleSync(req, depsWithUser('user_1'));
    expect(res.status).toBe(200);
    const out = await readJson(res);
    expect(out.progress.find((p: { difficulty: string }) => p.difficulty === '100').isCompleted).toBe(true);
  });
});
