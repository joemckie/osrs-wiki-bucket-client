import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxLocationBucketSchema = z.object({
  bucketName: z.literal('infobox_location'),
  bucket: z.array(
    z
      .object({
        is_members_only: wikiBooleanSchema,
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxLocationBucket = z.infer<typeof infoboxLocationBucketSchema>;
