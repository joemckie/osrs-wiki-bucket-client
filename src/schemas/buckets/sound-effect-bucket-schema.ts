import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const soundEffectBucketSchema = z.object({
  bucketName: z.literal('sound_effect'),
  bucket: z.array(
    z
      .object({
        name: z.string().nonempty(),
        id: z.int().nonnegative(),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type SoundEffectBucket = z.infer<typeof soundEffectBucketSchema>;
