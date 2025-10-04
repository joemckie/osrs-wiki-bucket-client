import z from 'zod';

export const infoboxActivityBucketSchema = z.object({
  bucketName: z.literal('infobox_activity'),
  fields: z.object({
    image: z.string().nonempty(),
    is_members_only: z.boolean(),
    default_version: z.boolean(),
  }),
});

export type InfoboxActivityBucket = z.infer<typeof infoboxActivityBucketSchema>;
