import { describe, it, expect } from 'vitest';
import { progressRecordSchema, syncBodySchema } from '../src/lib/validation.ts';

const validRecord = {
  paintingId: 'starry-night',
  difficulty: '100',
  placedPieceIds: [0, 1, 2],
  isCompleted: false,
  completedAt: null,
  updatedAt: '2026-10-13T10:00:00.000Z',
};

describe('progressRecordSchema', () => {
  it('accepts a valid record', () => {
    expect(progressRecordSchema.safeParse(validRecord).success).toBe(true);
  });

  it('rejects an invalid difficulty', () => {
    const r = progressRecordSchema.safeParse({ ...validRecord, difficulty: '50' });
    expect(r.success).toBe(false);
  });

  it('rejects a non-ISO updatedAt', () => {
    const r = progressRecordSchema.safeParse({ ...validRecord, updatedAt: 'yesterday' });
    expect(r.success).toBe(false);
  });

  it('rejects negative piece ids', () => {
    const r = progressRecordSchema.safeParse({ ...validRecord, placedPieceIds: [-1] });
    expect(r.success).toBe(false);
  });
});

describe('syncBodySchema', () => {
  it('accepts an array of records under records key', () => {
    const r = syncBodySchema.safeParse({ records: [validRecord] });
    expect(r.success).toBe(true);
  });

  it('rejects more than 500 records', () => {
    const many = Array.from({ length: 501 }, () => validRecord);
    const r = syncBodySchema.safeParse({ records: many });
    expect(r.success).toBe(false);
  });
});
