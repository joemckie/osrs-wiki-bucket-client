import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const interfaceBucketSchema = z.object({
  bucketName: z.literal('interface'),
  bucket: z.array(
    z
      .object({
        name: z.string().nonempty(),
        id: z.int().nonnegative(),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InterfaceBucket = z.infer<typeof interfaceBucketSchema>;
