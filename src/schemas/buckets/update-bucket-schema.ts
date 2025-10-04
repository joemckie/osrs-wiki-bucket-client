import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const updateBucketSchema = z.object({
  bucketName: z.literal('update'),
  fields: z
    .object({
      date: z.iso.date(),
      type: z.string().nonempty(),
      year: z.string().nonempty(),
      month: z.string().nonempty(),
      day: z.string().nonempty(),
    })
    .extend(sharedBucketSchema.shape),
});

export type UpdateBucket = z.infer<typeof updateBucketSchema>;
