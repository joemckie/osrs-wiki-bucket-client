import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const infoboxPureBucketSchema = z.object({
  bucketName: z.literal('infobox_pure'),
  fields: z
    .object({
      name: z.string().nonempty(),
      image: z.string().nonempty().nullable(),
      is_members_only: z.boolean().nullable(),
      type: z.string().nonempty(),
      max_hit: z.coerce.number().nonnegative().nullable(),
      combat_level: z.coerce.number().nonnegative(),
      hitpoints: z.coerce.number().nonnegative(),
      attack_level: z.coerce.number().nonnegative(),
      strength_level: z.coerce.number().nonnegative(),
      defence_level: z.coerce.number().nonnegative(),
      ranged_level: z.coerce.number().nonnegative(),
      magic_level: z.coerce.number().nonnegative(),
      prayer_level: z.coerce.number().nonnegative(),
      attack_style: z.string().nonempty().nullable(),
      all_attack_style: z.string().nonempty().nullable(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxPureBucket = z.infer<typeof infoboxPureBucketSchema>;
