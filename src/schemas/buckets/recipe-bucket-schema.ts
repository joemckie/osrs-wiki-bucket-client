import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const recipeBucketSchema = z.object({
  bucketName: z.literal('recipe'),
  bucket: z.array(
    z
      .object({
        uses_material: z.string().nonempty(),
        uses_tool: z.string().nonempty(),
        uses_facility: z.string().nonempty(),
        is_members_only: wikiBooleanSchema,
        is_boostable: z.string().nonempty(),
        uses_skill: z.string().nonempty(),
        source_template: z.string().nonempty(),
        production_json: z.json(), // TODO: check schema
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type RecipeBucket = z.infer<typeof recipeBucketSchema>;
