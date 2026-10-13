import type { Deps } from '../lib/deps.ts';
import { getProgressForUser, upsertProgress } from '../repositories/progress.ts';
import { progressRecordSchema } from '../lib/validation.ts';
import { ok, badRequest, unauthorized, serverError } from '../lib/http.ts';

export async function handleGetProgress(request: Request, deps: Deps): Promise<Response> {
  const userId = await deps.getUserId(request);
  if (!userId) return unauthorized();
  try {
    const progress = await getProgressForUser(deps.db, userId);
    return ok({ progress });
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}

export async function handlePutProgress(request: Request, deps: Deps): Promise<Response> {
  const userId = await deps.getUserId(request);
  if (!userId) return unauthorized();

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return badRequest('Invalid JSON');
  }

  const parsed = progressRecordSchema.safeParse(raw);
  if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? 'Invalid body');

  try {
    await upsertProgress(deps.db, userId, parsed.data);
    return ok({});
  } catch (err) {
    return serverError(err instanceof Error ? err.message : 'unknown error');
  }
}
