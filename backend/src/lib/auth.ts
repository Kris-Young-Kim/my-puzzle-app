import { verifyToken } from '@clerk/backend';

/** Authorization: Bearer <token> 헤더에서 토큰만 추출한다. 순수 함수. */
export function getBearerToken(request: Request): string | null {
  const header = request.headers.get('authorization');
  if (!header) return null;
  const match = /^Bearer\s+(.+)$/.exec(header);
  return match ? match[1] : null;
}

/** Clerk 세션 토큰을 검증하고 user id(sub)를 반환한다. 실패 시 null. */
export async function verifyClerkToken(token: string): Promise<string | null> {
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) return null;
  try {
    const claims = await verifyToken(token, { secretKey });
    return claims.sub ?? null;
  } catch {
    return null;
  }
}

/** 요청에서 인증된 user id를 뽑아낸다. 없거나 검증 실패면 null. */
export async function getUserIdFromRequest(request: Request): Promise<string | null> {
  const token = getBearerToken(request);
  if (!token) return null;
  return verifyClerkToken(token);
}
