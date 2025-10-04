import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const logsBucketSchema = z.object({
  bucketName: z.literal('logs'),
  bucket: z.array(
    z
      .object({
        module: z.string().nonempty(),
        message: z.string().nonempty(),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type LogsBucket = z.infer<typeof logsBucketSchema>;
