import z from 'zod';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const infoboxItemBucketSchema = z.object({
  bucketName: z.literal('infobox_item'),
  fields: z
    .object({
      item_name: z.string().nonempty(),
      image: z.string().nonempty(),
      is_members_only: z.boolean(),
      item_id: z.int().nonnegative(),
      examine: z.string().nonempty(),
      high_alchemy_value: z.int().nonnegative(),
      league_region: leagueRegionSchema,
      release_date: z.iso.date(),
      value: z.int().nonnegative(),
      weight: z.number().nonnegative(),
      version_anchor: z.string().nonempty(),
      buy_limit: z.int().nonnegative(),
      default_version: z.boolean(),
    })
    .extend(sharedBucketSchema.shape),
});

export type InfoboxItemBucket = z.infer<typeof infoboxItemBucketSchema>;
