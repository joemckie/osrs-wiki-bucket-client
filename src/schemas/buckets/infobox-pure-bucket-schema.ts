import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxPureBucketSchema = z.object({
  bucketName: z.literal('infobox_pure'),
  bucket: z.array(
    z
      .object({
        name: z.string().nonempty(),
        image: z.string().nonempty().nullable(),
        is_members_only: wikiBooleanSchema,
        type: z.array(z.string().nonempty()).min(1),
        max_hit: z.array(z.coerce.number().nonnegative().nullable()).min(1),
        combat_level: z.array(z.coerce.number().nonnegative()).min(1),
        hitpoints: z.coerce.number().nonnegative(),
        attack_level: z.coerce.number().nonnegative(),
        strength_level: z.coerce.number().nonnegative(),
        defence_level: z.coerce.number().nonnegative(),
        ranged_level: z.coerce.number().nonnegative(),
        magic_level: z.coerce.number().nonnegative(),
        prayer_level: z.coerce.number().nonnegative(),
        attack_style: z.string().nonempty().nullable(),
        all_attack_style: z.array(z.string().nonempty().nullable()).min(1),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxPureBucket = z.infer<typeof infoboxPureBucketSchema>;
