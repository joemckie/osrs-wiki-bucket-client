import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const varbitBucketSchema = z.object({
  bucketName: z.literal('varbit'),
  fields: z
    .object({
      content: z.string().nonempty(),
      name: z.string().nonempty(),
      index: z.int().nonnegative(),
    })
    .extend(sharedBucketSchema.shape),
});

export type VarbitBucket = z.infer<typeof varbitBucketSchema>;
