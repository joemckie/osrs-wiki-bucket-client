import z from 'zod';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const infoboxScenerySchema = z.object({
  bucketName: z.literal('infobox_scenery'),
  bucket: z.array(
    z
      .object({
        default_version: wikiBooleanSchema,
        image: z.array(z.string().nonempty()).min(1),
        is_members_only: wikiBooleanSchema,
        league_region: leagueRegionSchema,
        release: z.iso.date(),
        object_id: z.array(z.int().nonnegative()).min(1),
        npc_id: z.array(z.int().nonnegative()).min(1),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxSceneryBucket = z.infer<typeof infoboxScenerySchema>;
