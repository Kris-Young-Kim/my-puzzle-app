import { describe, it, expect } from 'vitest';
import { mergeProgress } from '../src/lib/sync-merge.ts';
import type { ProgressRecord } from '../src/types.ts';

function rec(overrides: Partial<ProgressRecord> = {}): ProgressRecord {
  return {
    paintingId: 'starry-night',
    difficulty: '100',
    placedPieceIds: [0, 1],
    isCompleted: false,
    completedAt: null,
    updatedAt: '2026-10-13T10:00:00.000Z',
    ...overrides,
  };
}

describe('mergeProgress', () => {
  it('returns local when server record is null', () => {
    const local = rec();
    expect(mergeProgress(local, null)).toBe(local);
  });

  it('when neither completed, newer updatedAt wins', () => {
    const local = rec({ updatedAt: '2026-10-13T12:00:00.000Z', placedPieceIds: [0, 1, 2] });
    const server = rec({ updatedAt: '2026-10-13T09:00:00.000Z', placedPieceIds: [0] });
    expect(mergeProgress(local, server)).toBe(local);
  });

  it('when neither completed, older local loses to newer server', () => {
    const local = rec({ updatedAt: '2026-10-13T08:00:00.000Z' });
    const server = rec({ updatedAt: '2026-10-13T09:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(server);
  });

  it('on equal updatedAt, local wins', () => {
    const local = rec({ updatedAt: '2026-10-13T10:00:00.000Z' });
    const server = rec({ updatedAt: '2026-10-13T10:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(local);
  });

  it('completed local beats not-completed server even if server is newer', () => {
    const local = rec({ isCompleted: true, completedAt: '2026-10-13T08:00:00.000Z', updatedAt: '2026-10-13T08:00:00.000Z' });
    const server = rec({ isCompleted: false, updatedAt: '2026-10-13T20:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(local);
  });

  it('completed server beats not-completed local even if local is newer', () => {
    const local = rec({ isCompleted: false, updatedAt: '2026-10-13T20:00:00.000Z' });
    const server = rec({ isCompleted: true, completedAt: '2026-10-13T08:00:00.000Z', updatedAt: '2026-10-13T08:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(server);
  });

  it('when both completed, newer updatedAt wins', () => {
    const local = rec({ isCompleted: true, completedAt: '2026-10-13T08:00:00.000Z', updatedAt: '2026-10-13T08:00:00.000Z' });
    const server = rec({ isCompleted: true, completedAt: '2026-10-13T09:00:00.000Z', updatedAt: '2026-10-13T09:00:00.000Z' });
    expect(mergeProgress(local, server)).toBe(server);
  });
});
