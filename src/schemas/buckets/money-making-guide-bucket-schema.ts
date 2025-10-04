import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const moneyMakingGuideBucketSchema = z.object({
  bucketName: z.literal('money_making_guide'),
  bucket: z.array(
    z
      .object({
        value: z.string().nonempty(),
        recurring: wikiBooleanSchema,
        json: z.string().nonempty(), // TODO: add JSON schema
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type MoneyMakingGuideBucket = z.infer<
  typeof moneyMakingGuideBucketSchema
>;
