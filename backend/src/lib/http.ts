export function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export function ok(data: Record<string, unknown>): Response {
  return jsonResponse(200, { success: true, ...data });
}

export function badRequest(error: string): Response {
  return jsonResponse(400, { success: false, error });
}

export function unauthorized(): Response {
  return jsonResponse(401, { success: false, error: 'Unauthorized' });
}

export function serverError(error: string): Response {
  return jsonResponse(500, { success: false, error });
}
