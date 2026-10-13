import type { ProgressRecord } from '../types.ts';

/**
 * 같은 (painting, difficulty)에 대한 로컬/서버 진행상황을 병합한다.
 * 규칙: (1) 완성은 단조 — 완성 레코드가 미완성 레코드를 항상 이긴다.
 *       (2) 완성 상태가 같으면 updatedAt 최신이 이기고, 동률이면 local 우선.
 */
export function mergeProgress(
  local: ProgressRecord,
  server: ProgressRecord | null,
): ProgressRecord {
  if (!server) return local;

  if (local.isCompleted && !server.isCompleted) return local;
  if (server.isCompleted && !local.isCompleted) return server;

  const localTime = new Date(local.updatedAt).getTime();
  const serverTime = new Date(server.updatedAt).getTime();
  return localTime >= serverTime ? local : server;
}
