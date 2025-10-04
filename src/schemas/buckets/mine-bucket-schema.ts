import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const mineBucketSchema = z.object({
  bucketName: z.literal('mine'),
  fields: z
    .object({
      is_members_only: wikiBooleanSchema,
      json: z.json(), // TODO: add JSON schema
    })
    .extend(sharedBucketSchema.shape),
});

export type MineBucket = z.infer<typeof mineBucketSchema>;
