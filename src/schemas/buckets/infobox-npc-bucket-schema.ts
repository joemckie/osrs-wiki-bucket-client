import z from 'zod';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxNpcBucketSchema = z.object({
  bucketName: z.literal('infobox_npc'),
  fields: z
    .object({
      default_version: wikiBooleanSchema,
      image: z.array(z.string().nonempty()).min(1),
      is_members_only: wikiBooleanSchema,
      league_region: leagueRegionSchema,
      npc_id: z.array(z.int().nonnegative()).min(1),
      release: z.iso.date(),
      examine: z.string().nonempty(),
      location: z.string().nonempty(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxNpcBucket = z.infer<typeof infoboxNpcBucketSchema>;
