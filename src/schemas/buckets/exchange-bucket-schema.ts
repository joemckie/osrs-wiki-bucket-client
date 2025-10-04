import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const exchangeBucketSchema = z.object({
  bucketName: z.literal('exchange'),
  fields: z
    .object({
      id: z.int().nonnegative(),
      name: z.string().nonempty(),
      value: z.int().nonnegative(),
      is_alchable: wikiBooleanSchema,
      high_alch: z.int().nonnegative(),
      low_alch: z.int().nonnegative(),
      limit: z.int().nonnegative(),
      module: z.string().nonempty(),
      is_historical: wikiBooleanSchema,
      json: z.string().nonempty(),
    })
    .extend(sharedBucketSchema.shape),
});

export type ExchangeBucket = z.infer<typeof exchangeBucketSchema>;
