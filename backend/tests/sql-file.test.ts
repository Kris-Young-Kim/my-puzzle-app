import { describe, it, expect } from 'vitest';
import { splitStatements, applySqlFile } from '../src/lib/sql-file.ts';
import type { QueryExecutor } from '../src/lib/db.ts';

describe('splitStatements', () => {
  it('splits on semicolons and trims', () => {
    expect(splitStatements('SELECT 1; SELECT 2;')).toEqual(['SELECT 1', 'SELECT 2']);
  });

  it('drops empty trailing statements', () => {
    expect(splitStatements('SELECT 1;\n\n')).toEqual(['SELECT 1']);
  });

  it('strips full-line comments', () => {
    const sql = `-- a comment\nSELECT 1;\n-- another\nSELECT 2;`;
    expect(splitStatements(sql)).toEqual(['SELECT 1', 'SELECT 2']);
  });
});

describe('applySqlFile', () => {
  it('runs each statement in order against the executor', async () => {
    const seen: string[] = [];
    const db: QueryExecutor = {
      async query<T>(text: string): Promise<T[]> {
        seen.push(text);
        return [] as T[];
      },
    };
    await applySqlFile(db, 'SELECT 1; SELECT 2;');
    expect(seen).toEqual(['SELECT 1', 'SELECT 2']);
  });
});
