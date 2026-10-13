import type { Deps } from '../lib/deps.ts';
import { getAllPacks } from '../repositories/packs.ts';
import { ok, serverError } from '../lib/http.ts';

export async function handleGetPacks(_request: Request, deps: Deps): Promise<Response> {
  try {
    const packs = await getAllPacks(deps.db);
    return ok({ packs });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
