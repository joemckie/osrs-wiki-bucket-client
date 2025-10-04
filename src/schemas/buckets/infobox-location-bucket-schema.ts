import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const infoboxLocationBucketSchema = z.object({
  bucketName: z.literal('infobox_location'),
  fields: z
    .object({
      is_members_only: z.boolean(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxLocationBucket = z.infer<typeof infoboxLocationBucketSchema>;
