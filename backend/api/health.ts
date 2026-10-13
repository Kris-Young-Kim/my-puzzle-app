import { productionDeps } from '../src/lib/deps.ts';
import { ok, serverError } from '../src/lib/http.ts';

export async function GET(): Promise<Response> {
  try {
    const { db } = productionDeps();
    await db.query('SELECT 1');
    return ok({ status: 'ok', db: 'connected' });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'db error');
  }
}
