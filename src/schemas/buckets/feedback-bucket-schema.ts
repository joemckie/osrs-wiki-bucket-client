import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const feedbackBucketSchema = z.object({
  bucketName: z.literal('feedback'),
  bucket: z.array(
    z
      .object({
        id: z.string().nonempty(),
        comment: z.string().nonempty(),
        resolved: wikiBooleanSchema,
        category: z.array(z.string().nonempty()).min(1),
        timestamp: z.string().nonempty(),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type FeedbackBucket = z.infer<typeof feedbackBucketSchema>;
