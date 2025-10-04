import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const itemIdBucketSchema = z.object({
  bucketName: z.literal('item_id'),
  bucket: z.array(
    z
      .object({
        id: z.array(z.int().nonnegative()),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type ItemIdBucket = z.infer<typeof itemIdBucketSchema>;
