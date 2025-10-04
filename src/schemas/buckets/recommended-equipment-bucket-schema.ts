import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const recommendedEquipmentBucketSchema = z.object({
  bucketName: z.literal('recommended_equipment'),
  fields: z
    .object({
      json: z.json(), // TODO: check schema
    })
    .extend(sharedBucketSchema.shape),
});

export type RecommendedEquipmentBucket = z.infer<
  typeof recommendedEquipmentBucketSchema
>;
