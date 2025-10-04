import z from 'zod';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxScenerySchema = z.object({
  bucketName: z.literal('infobox_scenery'),
  fields: z
    .object({
      default_version: wikiBooleanSchema,
      image: z.string().nonempty(),
      is_members_only: wikiBooleanSchema,
      league_region: leagueRegionSchema,
      release: z.iso.date(),
      object_id: z.int().nonnegative(),
      npc_id: z.int().nonnegative(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxSceneryBucket = z.infer<typeof infoboxScenerySchema>;
