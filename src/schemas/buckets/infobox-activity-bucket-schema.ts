import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const infoboxActivityBucketSchema = z.object({
  bucketName: z.literal('infobox_activity'),
  fields: z
    .object({
      image: z.string().nonempty(),
      is_members_only: z.boolean(),
      default_version: z.boolean(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxActivityBucket = z.infer<typeof infoboxActivityBucketSchema>;
