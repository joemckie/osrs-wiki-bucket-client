import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxSpellBucketSchema = z.object({
  bucketName: z.literal('infobox_spell'),
  bucket: z.array(
    z
      .object({
        image: z.string().nonempty(),
        is_members_only: wikiBooleanSchema,
        spellbook: z.enum(['normal', 'ancient', 'lunar', 'arceuus']),
        uses_material: z.array(z.string()).nullable(),
        json: z.json(), // TODO: check schema
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxSpellBucket = z.infer<typeof infoboxSpellBucketSchema>;
