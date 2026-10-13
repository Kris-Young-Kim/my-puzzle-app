import { createNeonExecutor, type QueryExecutor } from './db.ts';
import { getUserIdFromRequest } from './auth.ts';

export interface Deps {
  db: QueryExecutor;
  getUserId: (request: Request) => Promise<string | null>;
}

let cached: Deps | null = null;

/** 프로덕션 Deps. 요청 간 재사용(Fluid Compute 인스턴스 재활용)을 위해 캐시한다. */
export function productionDeps(): Deps {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  cached = {
    db: createNeonExecutor(url),
    getUserId: getUserIdFromRequest,
  };
  return cached;
}
