import { neon } from '@neondatabase/serverless';

/** 모든 DB 접근이 통과하는 최소 인터페이스. rows 배열을 직접 반환한다. */
export interface QueryExecutor {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
}

/** 프로덕션용: Neon serverless(http) 드라이버. sql(text, params)는 rows 배열을 반환한다. */
export function createNeonExecutor(connectionString: string): QueryExecutor {
  const sql = neon(connectionString);
  return {
    async query<T>(text: string, params: unknown[] = []): Promise<T[]> {
      return (await sql(text, params)) as T[];
    },
  };
}
