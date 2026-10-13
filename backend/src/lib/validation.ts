import { z } from 'zod';

export const difficultySchema = z.enum(['25', '100', '400']);

export const progressRecordSchema = z.object({
  paintingId: z.string().min(1).max(64),
  difficulty: difficultySchema,
  placedPieceIds: z.array(z.number().int().nonnegative()),
  isCompleted: z.boolean(),
  completedAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime(),
});

export const syncBodySchema = z.object({
  records: z.array(progressRecordSchema).max(500),
});

export type ProgressRecordInput = z.infer<typeof progressRecordSchema>;
export type SyncBodyInput = z.infer<typeof syncBodySchema>;
