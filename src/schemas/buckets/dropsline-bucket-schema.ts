import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const dropsLineSchema = z.object({
  bucketName: z.literal('dropsline'),
  fields: z
    .object({
      item_name: z.string().nonempty(),
      drop_json: z.string().nonempty(),
      rare_drop_table: z.boolean(),
    })
    .extend(sharedBucketSchema.shape),
});

export type DropsLineBucket = z.infer<typeof dropsLineSchema>;
