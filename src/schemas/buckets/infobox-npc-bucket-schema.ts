import z from 'zod';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const infoboxNpcBucketSchema = z.object({
  bucketName: z.literal('infobox_npc'),
  fields: z
    .object({
      default_version: z.boolean(),
      image: z.string().nonempty(),
      is_members_only: z.boolean(),
      league_region: leagueRegionSchema,
      npc_id: z.int().nonnegative(),
      release: z.iso.date(),
      examine: z.string().nonempty(),
      location: z.string().nonempty(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxNpcBucket = z.infer<typeof infoboxNpcBucketSchema>;
