import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const objectIdBucketSchema = z.object({
  bucketName: z.literal('object_id'),
  bucket: z.array(
    z
      .object({
        id: z.array(z.int().nonnegative()),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type ObjectIdBucket = z.infer<typeof objectIdBucketSchema>;
