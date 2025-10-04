import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxActivityBucketSchema = z.object({
  bucketName: z.literal('infobox_activity'),
  bucket: z.array(
    z
      .object({
        image: z.string().nonempty().nullable(),
        is_members_only: wikiBooleanSchema,
        default_version: wikiBooleanSchema,
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxActivityBucket = z.infer<typeof infoboxActivityBucketSchema>;
