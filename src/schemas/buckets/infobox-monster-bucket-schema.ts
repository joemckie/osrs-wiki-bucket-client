import z from 'zod';
import { leagueRegionSchema } from '../osrs/league-region-schema';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

const immunitySchema = z
  .enum(['Immune', 'Not Immune'])
  .transform((val) => val === 'Immune');

export const infoboxMonsterBucketSchema = z.object({
  bucketName: z.literal('infobox_monster'),
  bucket: z.array(
    z
      .object({
        default_version: wikiBooleanSchema,
        name: z.string().nonempty(),
        image: z.array(z.string().nonempty()).min(1),
        is_members_only: wikiBooleanSchema,
        id: z.array(z.int().nonnegative()).min(1),
        examine: z.string().nonempty(),
        league_region: leagueRegionSchema,
        release_date: z.iso.date(),
        version_anchor: z.string().nonempty(),
        combat_level: z.int().nonnegative(),
        poisonous: z.string().nonempty(),
        attribute: z.array(z.string().nonempty()).min(1),
        hitpoints: z.int().nonnegative(),
        max_hit: z.array(z.string().nonempty()).min(1),
        slayer_level: z.int().nonnegative(),
        slayer_experience: z.number().nonnegative(),
        slayer_category: z.array(z.string().nonempty()).min(1),
        uses_skill: z.array(z.string().nonempty()).min(1),
        assigned_by: z.array(z.string().nonempty()).min(1),
        attack_level: z.int().nonnegative(),
        strength_level: z.int().nonnegative(),
        defence_level: z.int().nonnegative(),
        ranged_level: z.int().nonnegative(),
        magic_level: z.int().nonnegative(),
        magic_attack_bonus: z.int().nonnegative(),
        range_attack_bonus: z.int().nonnegative(),
        stab_attack_bonus: z.int().nonnegative(),
        slash_attack_bonus: z.int().nonnegative(),
        crush_attack_bonus: z.int().nonnegative(),
        stab_defence_bonus: z.int().nonnegative(),
        slash_defence_bonus: z.int().nonnegative(),
        crush_defence_bonus: z.int().nonnegative(),
        magic_defence_bonus: z.int().nonnegative(),
        range_defence_bonus: z.int().nonnegative(),
        light_range_defence_bonus: z.int().nonnegative(),
        standard_range_defence_bonus: z.int().nonnegative(),
        heavy_range_defence_bonus: z.int().nonnegative(),
        attack_bonus: z.int().nonnegative(),
        strength_bonus: z.int().nonnegative(),
        range_strength_bonus: z.int().nonnegative(),
        magic_damage_bonus: z.int().nonnegative(),
        poison_immune: immunitySchema,
        venom_immune: immunitySchema,
        thrall_immune: immunitySchema,
        cannon_immune: immunitySchema,
        burn_immune: immunitySchema,
        attack_style: z.array(z.string().nonempty()).min(1),
        attack_speed: z.int().nonnegative(),
        experience_bonus: z.number().nonnegative(),
        flat_armour: z.int().nonnegative(),
        size: z.int().nonnegative(),
        freeze_resistance: z.string().nonempty(),
        elemental_weakness: z.string().nonempty(),
        elemental_weakness_percent: z.int().nonnegative(),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxMonsterBucket = z.infer<typeof infoboxMonsterBucketSchema>;
