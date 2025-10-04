import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const dropsLineSchema = z.object({
  bucketName: z.literal('dropsline'),
  fields: z
    .object({
      item_name: z.string().nonempty(),
      drop_json: z.string().nonempty(),
      rare_drop_table: wikiBooleanSchema,
    })
    .extend(sharedBucketSchema.shape),
});

export type DropsLineBucket = z.infer<typeof dropsLineSchema>;
