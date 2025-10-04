import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const musicBucketSchema = z.object({
  bucketName: z.literal('music'),
  fields: z
    .object({
      title: z.string().nonempty(),
      number: z.int().nonnegative(),
      duration: z.string().nonempty(),
      composer: z.string().nonempty(),
      unlock_hint: z.string().nonempty(),
      track: z.string().nonempty(),
      release_date: z.string().nonempty().nullable(),
      release_update: z.string().nullable(),
      is_members_only: wikiBooleanSchema,
    })
    .extend(sharedBucketSchema.shape),
});

export type MusicBucket = z.infer<typeof musicBucketSchema>;
