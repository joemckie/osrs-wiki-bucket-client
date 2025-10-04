import z from 'zod';

export const infoboxLocationBucketSchema = z.object({
  bucketName: z.literal('infobox_location'),
  fields: z.object({
    is_members_only: z.boolean(),
  }),
});

export type InfoboxLocationBucket = z.infer<typeof infoboxLocationBucketSchema>;
