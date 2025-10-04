import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const mapBucketSchema = z.object({
  bucketName: z.literal('map'),
  bucket: z.array(
    z
      .object({
        features: z.string().nonempty(), // TODO: add JSON schema
        options: z.string().nonempty(), // TODO: add JSON schema
        is_historic: wikiBooleanSchema,
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type MapBucket = z.infer<typeof mapBucketSchema>;
