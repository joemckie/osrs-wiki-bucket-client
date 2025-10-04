import z from 'zod';

export const infoboxConstructionBucketSchema = z.object({
  bucketName: z.literal('infobox_construction'),
  fields: z.object({
    default_version: z.boolean(),
    image: z.string().nonempty(),
    icon: z.string().nonempty(),
    item_id: z.int().nonnegative(),
    object_id: z.int().nonnegative(),
    level: z.int().nonnegative(),
    experience: z.int().nonnegative(),
    uses_skill: z.literal('Construction'),
  }),
});

export type InfoboxConstructionBucket = z.infer<
  typeof infoboxConstructionBucketSchema
>;
