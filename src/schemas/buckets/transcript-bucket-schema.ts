import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const transcriptBucketSchema = z.object({
  bucketName: z.literal('transcript'),
  fields: z
    .object({
      npcs: z.array(z.string().nonempty()),
    })
    .extend(sharedBucketSchema.shape),
});

export type TranscriptBucket = z.infer<typeof transcriptBucketSchema>;
