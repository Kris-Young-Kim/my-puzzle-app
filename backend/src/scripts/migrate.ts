import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createNeonExecutor } from '../lib/db.ts';
import { applySqlFile } from '../lib/sql-file.ts';

const here = dirname(fileURLToPath(import.meta.url));

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const db = createNeonExecutor(url);
  const sql = readFileSync(join(here, '..', 'migrations', '001_init.sql'), 'utf8');
  await applySqlFile(db, sql);
  console.log('Migration 001_init applied.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
