import type { QueryExecutor } from './db.ts';

/**
 * SQL 문자열을 문 단위로 분리한다.
 * 전제: 통제된 내부 SQL(문자열 리터럴 안에 세미콜론 없음)에만 사용한다.
 * 전체 줄 주석(`--`로 시작)은 제거한다.
 */
export function splitStatements(sql: string): string[] {
  const withoutComments = sql
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');
  return withoutComments
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** SQL 파일 내용을 문 단위로 분리해 순서대로 실행한다. */
export async function applySqlFile(db: QueryExecutor, sql: string): Promise<void> {
  for (const stmt of splitStatements(sql)) {
    await db.query(stmt);
  }
}
