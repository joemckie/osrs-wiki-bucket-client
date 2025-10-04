import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const npcIdBucketSchema = z.object({
  bucketName: z.literal('npc_id'),
  fields: z
    .object({
      id: z.array(z.int().nonnegative()),
    })
    .extend(sharedBucketSchema.shape),
});

export type NpcIdBucket = z.infer<typeof npcIdBucketSchema>;
