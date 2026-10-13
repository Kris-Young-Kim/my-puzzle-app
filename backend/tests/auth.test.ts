import { describe, it, expect } from 'vitest';
import { getBearerToken } from '../src/lib/auth.ts';

describe('getBearerToken', () => {
  it('extracts the token from a Bearer header', () => {
    const req = new Request('https://x.test/api/progress', {
      headers: { authorization: 'Bearer abc.def.ghi' },
    });
    expect(getBearerToken(req)).toBe('abc.def.ghi');
  });

  it('returns null when no authorization header', () => {
    const req = new Request('https://x.test/api/progress');
    expect(getBearerToken(req)).toBeNull();
  });

  it('returns null for a non-Bearer scheme', () => {
    const req = new Request('https://x.test/api/progress', {
      headers: { authorization: 'Basic abc' },
    });
    expect(getBearerToken(req)).toBeNull();
  });
});
