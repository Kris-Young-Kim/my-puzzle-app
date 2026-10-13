import { describe, it, expect } from 'vitest';
import { GET as healthGet } from '../api/health.ts';
import { GET as paintingsGet } from '../api/paintings.ts';
import { GET as packsGet } from '../api/packs.ts';

describe('Neon live API endpoints', () => {
  it('GET /api/health returns status ok with connected db', async () => {
    const res = await healthGet();
    expect(res.status).toBe(200);
    const body = JSON.parse(await res.text());
    expect(body.success).toBe(true);
    expect(body.status).toBe('ok');
    expect(body.db).toBe('connected');
  });

  it('GET /api/paintings returns seeded catalog from Neon', async () => {
    const res = await paintingsGet(new Request('http://localhost/api/paintings'));
    expect(res.status).toBe(200);
    const body = JSON.parse(await res.text());
    expect(body.success).toBe(true);
    expect(body.paintings.length).toBeGreaterThanOrEqual(5);
  });

  it('GET /api/packs returns seeded packs from Neon', async () => {
    const res = await packsGet(new Request('http://localhost/api/packs'));
    expect(res.status).toBe(200);
    const body = JSON.parse(await res.text());
    expect(body.success).toBe(true);
    expect(body.packs.length).toBeGreaterThanOrEqual(1);
  });
});
