import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const feedbackBucketSchema = z.object({
  bucketName: z.literal('feedback'),
  fields: z
    .object({
      id: z.string().nonempty(),
      comment: z.string().nonempty(),
      resolved: z.boolean(),
      category: z.string().nonempty(),
      timestamp: z.string().nonempty(),
    })
    .extend(sharedBucketSchema.shape),
});

export type FeedbackBucket = z.infer<typeof feedbackBucketSchema>;
