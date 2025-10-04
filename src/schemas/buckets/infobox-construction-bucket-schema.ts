import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxConstructionBucketSchema = z.object({
  bucketName: z.literal('infobox_construction'),
  bucket: z.array(
    z
      .object({
        default_version: wikiBooleanSchema,
        image: z.array(z.string().nonempty()).min(1),
        icon: z.array(z.string().nonempty()).min(1),
        item_id: z.array(z.int().nonnegative()).min(1),
        object_id: z.array(z.int().nonnegative()).min(1),
        level: z.int().nonnegative(),
        experience: z.int().nonnegative(),
        uses_skill: z.array(z.literal('Construction')).min(1),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxConstructionBucket = z.infer<
  typeof infoboxConstructionBucketSchema
>;
