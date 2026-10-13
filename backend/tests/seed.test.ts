import { describe, it, expect, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createTestDb, type TestDb } from '../src/test/pglite-executor.ts';
import { applySqlFile } from '../src/lib/sql-file.ts';
import { getAllPaintings } from '../src/repositories/paintings.ts';
import { getAllPacks } from '../src/repositories/packs.ts';

let db: TestDb;
afterEach(async () => {
  await db?.close();
});

describe('seed.sql', () => {
  it('loads 5 paintings each with 3 difficulties and 1 pack', async () => {
    db = await createTestDb();
    await applySqlFile(db, readFileSync(join(process.cwd(), 'src/migrations/seed.sql'), 'utf8'));

    const paintings = await getAllPaintings(db);
    expect(paintings).toHaveLength(5);
    for (const p of paintings) {
      expect(p.difficulties.map((d) => d.level).sort()).toEqual(['100', '25', '400']);
    }

    const packs = await getAllPacks(db);
    expect(packs).toHaveLength(1);
    expect(packs[0].paintingIds).toContain('water-lilies');
  });
});
