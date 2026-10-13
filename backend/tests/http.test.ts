import { describe, it, expect } from 'vitest';
import { jsonResponse, ok, badRequest, unauthorized, serverError } from '../src/lib/http.ts';

async function readJson(res: Response) {
  return JSON.parse(await res.text());
}

describe('http helpers', () => {
  it('jsonResponse sets status and content-type', async () => {
    const res = jsonResponse(201, { a: 1 });
    expect(res.status).toBe(201);
    expect(res.headers.get('content-type')).toBe('application/json');
    expect(await readJson(res)).toEqual({ a: 1 });
  });

  it('ok wraps data with success true and status 200', async () => {
    const res = ok({ paintings: [] });
    expect(res.status).toBe(200);
    expect(await readJson(res)).toEqual({ success: true, paintings: [] });
  });

  it('badRequest returns 400 with error message', async () => {
    const res = badRequest('bad input');
    expect(res.status).toBe(400);
    expect(await readJson(res)).toEqual({ success: false, error: 'bad input' });
  });

  it('unauthorized returns 401', async () => {
    const res = unauthorized();
    expect(res.status).toBe(401);
    expect(await readJson(res)).toEqual({ success: false, error: 'Unauthorized' });
  });

  it('serverError returns 500', async () => {
    const res = serverError('boom');
    expect(res.status).toBe(500);
    expect(await readJson(res)).toEqual({ success: false, error: 'boom' });
  });
});
