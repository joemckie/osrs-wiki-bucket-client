import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

const spellbookSchema = z.enum(['normal', 'ancient', 'lunar', 'arceuus']);

export const infoboxSpellBucketSchema = z.object({
  bucketName: z.literal('infobox_spell'),
  fields: z
    .object({
      image: z.string().nonempty(),
      is_members_only: z.boolean(),
      spellbook: spellbookSchema,
      uses_material: z.array(z.string()).nullable(),
      json: z.string(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxSpellBucket = z.infer<typeof infoboxSpellBucketSchema>;
