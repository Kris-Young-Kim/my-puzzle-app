import type { Deps } from '../lib/deps.ts';
import { syncProgress } from '../repositories/progress.ts';
import { syncBodySchema } from '../lib/validation.ts';
import { ok, badRequest, unauthorized, serverError } from '../lib/http.ts';

export async function handleSync(request: Request, deps: Deps): Promise<Response> {
  const userId = await deps.getUserId(request);
  if (!userId) return unauthorized();

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return badRequest('Invalid JSON');
  }

  const parsed = syncBodySchema.safeParse(raw);
  if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? 'Invalid body');

  try {
    const progress = await syncProgress(deps.db, userId, parsed.data.records);
    return ok({ progress });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
