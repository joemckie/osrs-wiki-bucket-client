import z from 'zod';
import { combatAchievementTierSchema } from '../osrs/combat-achievement-tier-schema';
import { combatAchievementTypeSchema } from '../osrs/combat-achievement-type-schema';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const combatAchievementBucketSchema = z.object({
  bucketName: z.literal('combat_achievement'),
  fields: z
    .object({
      id: z.int().nonnegative(),
      name: z.string().nonempty(),
      monster: z.string().nonempty(),
      task: z.string().nonempty(),
      tier: combatAchievementTierSchema,
      type: combatAchievementTypeSchema,
      league_region: leagueRegionSchema,
    })
    .extend(sharedBucketSchema.shape),
});

export type CombatAchievementBucket = z.infer<
  typeof combatAchievementBucketSchema
>;
