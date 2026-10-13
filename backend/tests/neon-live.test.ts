import { describe, it, expect } from 'vitest';
import { createNeonExecutor } from '../src/lib/db.ts';
import { getAllPaintings } from '../src/repositories/paintings.ts';
import { getAllPacks } from '../src/repositories/packs.ts';

describe('Neon live connection & seeded data', () => {
  const dbUrl = process.env.DATABASE_URL;

  it('connects to live Neon database and reads seeded paintings', async () => {
    if (!dbUrl) {
      console.warn('DATABASE_URL not set, skipping live test');
      return;
    }
    const db = createNeonExecutor(dbUrl);
    const result = await db.query<{ one: number }>('SELECT 1 as one');
    expect(result[0].one).toBe(1);

    const paintings = await getAllPaintings(db);
    expect(paintings.length).toBeGreaterThanOrEqual(5);

    const starry = paintings.find(p => p.id === 'starry-night');
    expect(starry).toBeDefined();
    expect(starry?.painter.name).toBe('Vincent van Gogh');
    expect(starry?.difficulties.length).toBe(3);

    const packs = await getAllPacks(db);
    expect(packs.length).toBeGreaterThanOrEqual(1);
    expect(packs[0].id).toBe('impressionism-masters');
  });
});
