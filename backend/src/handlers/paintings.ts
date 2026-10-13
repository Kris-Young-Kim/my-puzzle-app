import type { Deps } from '../lib/deps.ts';
import { getAllPaintings } from '../repositories/paintings.ts';
import { ok, serverError } from '../lib/http.ts';

export async function handleGetPaintings(_request: Request, deps: Deps): Promise<Response> {
  try {
    const paintings = await getAllPaintings(deps.db);
    return ok({ paintings });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
