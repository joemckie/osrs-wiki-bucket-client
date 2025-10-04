import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const dependencyListBucketSchema = z.object({
  bucketName: z.literal('dependency_list'),
  fields: z
    .object({
      require: z.array(z.string().nonempty()).nullable(),
      load_data: z.array(z.string().nonempty()).min(1).nullable(),
    })
    .extend(sharedBucketSchema.shape),
});

export type DependencyListBucket = z.infer<typeof dependencyListBucketSchema>;
