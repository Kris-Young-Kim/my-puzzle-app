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
  await applySqlFile(db, readFileSync(join(here, '..', 'migrations', 'seed.sql'), 'utf8'));
  console.log('Seed data applied.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
