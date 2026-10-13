import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import type { QueryExecutor } from '../lib/db.ts';
import { applySqlFile } from '../lib/sql-file.ts';

const here = dirname(fileURLToPath(import.meta.url));

export interface TestDb extends QueryExecutor {
  close(): Promise<void>;
}

/** 인프로세스 Postgres(PGlite)로 QueryExecutor를 만들고 초기 스키마를 적용한다. */
export async function createTestDb(): Promise<TestDb> {
  const pg = new PGlite();
  const db: QueryExecutor = {
    async query<T>(text: string, params: unknown[] = []): Promise<T[]> {
      const res = await pg.query<T>(text, params);
      return res.rows;
    },
  };
  const initSql = readFileSync(join(here, '..', 'migrations', '001_init.sql'), 'utf8');
  await applySqlFile(db, initSql);
  return {
    query: db.query,
    async close() {
      await pg.close();
    },
  };
}
