import { describe, it, expect, afterEach } from 'vitest';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';

let db: TestDb;
afterEach(async () => {
  await db?.close();
});

describe('migration 001_init', () => {
  it('creates all expected tables', async () => {
    db = await createTestDb();
    const rows = await db.query<{ table_name: string }>(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    const names = rows.map((r) => r.table_name).sort();
    expect(names).toEqual(
      ['packs', 'painters', 'painting_difficulties', 'paintings', 'user_gallery', 'user_progress', 'users'].sort(),
    );
  });

  it('enforces the difficulty CHECK constraint', async () => {
    db = await createTestDb();
    await db.query(`INSERT INTO painters (id, name) VALUES ('vangogh', 'Vincent van Gogh')`);
    await db.query(
      `INSERT INTO paintings (id, painter_id, title, image_url, thumbnail_url) VALUES ('sn', 'vangogh', 'Starry Night', 'u', 't')`,
    );
    await expect(
      db.query(
        `INSERT INTO painting_difficulties (painting_id, level, grid_cols, grid_rows) VALUES ('sn', '50', 5, 10)`,
      ),
    ).rejects.toThrow();
  });
});
