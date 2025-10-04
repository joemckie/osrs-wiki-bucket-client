import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

const combatStyleSchema = z.enum([
  'Crossbow',
  'Thrown',
  'Pickaxe',
  'Axe',
  'Stab Sword',
  '2h Sword',
  'Blunt',
  'Spear',
  'Spiked',
  'Slash Sword',
  'Whip',
  'Claw',
  'Polearm',
  'Staff',
  'Bow',
  'Unarmed',
  'Chinchompas',
  'Polestaff',
  'Salamander',
  'Scythe',
  'Banner',
  'Bladed Staff',
  'Powered Staff',
  'Blaster',
  'Bludgeon',
  'Bulwark',
  'Partisan',
  'Gun',
  'Powered Wand',
]);

export const infoboxBonusesSchema = z.object({
  bucketName: z.literal('infobox_bonuses'),
  bucket: z.array(
    z
      .object({
        stab_attack_bonus: z.int().nonnegative(),
        slash_attack_bonus: z.int().nonnegative(),
        crush_attack_bonus: z.int().nonnegative(),
        range_attack_bonus: z.int().nonnegative(),
        magic_attack_bonus: z.int().nonnegative(),
        stab_defence_bonus: z.int().nonnegative(),
        slash_defence_bonus: z.int().nonnegative(),
        crush_defence_bonus: z.int().nonnegative(),
        range_defence_bonus: z.int().nonnegative(),
        magic_defence_bonus: z.int().nonnegative(),
        strength_bonus: z.int().nonnegative(),
        ranged_strength_bonus: z.int().nonnegative(),
        prayer_bonus: z.int().nonnegative(),
        magic_damage_bonus: z.number().nonnegative(),
        equipment_slot: z.string().nonempty(),
        weapon_attack_speed: z.int().nonnegative().nullable(),
        weapon_attack_range: z.int().nonnegative().nullable(),
        combat_style: combatStyleSchema.nullable(),
      })
      .extend(sharedBucketSchema.shape),
  ),
});

export type InfoboxBonusesBucket = z.infer<typeof infoboxBonusesSchema>;
