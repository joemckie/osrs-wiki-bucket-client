import z from 'zod';

import { combatAchievementBucketSchema } from './combat-achievement-bucket-schema';
import { dropsLineSchema } from './dropsline-bucket-schema';
import { exchangeBucketSchema } from './exchange-bucket-schema';
import { feedbackBucketSchema } from './feedback-bucket-schema';
import { infoboxActivityBucketSchema } from './infobox-activity-bucket-schema';
import { infoboxBonusesSchema } from './infobox-bonuses-bucket-schema';
import { infoboxConstructionBucketSchema } from './infobox-construction-bucket-schema';
import { infoboxItemBucketSchema } from './infobox-item-bucket-schema';
import { infoboxLocationBucketSchema } from './infobox-location-bucket-schema';
import { infoboxMonsterBucketSchema } from './infobox-monster-bucket-schema';
import { infoboxNpcBucketSchema } from './infobox-npc-bucket-schema';
import { infoboxScenerySchema } from './infobox-scenery-bucket-schema';
import { infoboxSpellBucketSchema } from './infobox-spell-bucket-schema';
import { interfaceBucketSchema } from './interface-bucket-schema';
import { itemIdBucketSchema } from './item-id-bucket-schema';
import { logsBucketSchema } from './logs-bucket-schema';
import { mapBucketSchema } from './map-bucket-schema';
import { mineBucketSchema } from './mine-bucket-schema';
import { moneyMakingGuideBucketSchema } from './money-making-guide-bucket-schema';
import { musicBucketSchema } from './music-bucket-schema';
import { musicMapBucketSchema } from './music-map-bucket-schema';
import { npcIdBucketSchema } from './npc-id-bucket-schema';
import { objectIdBucketSchema } from './object-id-bucket-schema';
import { questBucketSchema } from './quest-bucket-schema';
import { recipeBucketSchema } from './recipe-bucket-schema';
import { recommendedEquipmentBucketSchema } from './recommended-equipment-bucket-schema';
import { soundEffectBucketSchema } from './sound-effect-bucket-schema';
import { storeLineBucketSchema } from './storeline-bucket-schema';
import { transcriptBucketSchema } from './transcript-bucket-schema';
import { updateBucketSchema } from './update-bucket-schema';
import { varbitBucketSchema } from './varbit-bucket-schema';
import { dependencyListBucketSchema } from './dependency-list-bucket-schema';

export const bucketSchema = z.discriminatedUnion('bucketName', [
  combatAchievementBucketSchema,
  dependencyListBucketSchema,
  dropsLineSchema,
  exchangeBucketSchema,
  feedbackBucketSchema,
  infoboxActivityBucketSchema,
  infoboxBonusesSchema,
  infoboxConstructionBucketSchema,
  infoboxItemBucketSchema,
  infoboxLocationBucketSchema,
  infoboxMonsterBucketSchema,
  infoboxNpcBucketSchema,
  infoboxScenerySchema,
  infoboxSpellBucketSchema,
  interfaceBucketSchema,
  itemIdBucketSchema,
  logsBucketSchema,
  mapBucketSchema,
  mineBucketSchema,
  moneyMakingGuideBucketSchema,
  musicBucketSchema,
  musicMapBucketSchema,
  npcIdBucketSchema,
  objectIdBucketSchema,
  questBucketSchema,
  recipeBucketSchema,
  recommendedEquipmentBucketSchema,
  soundEffectBucketSchema,
  storeLineBucketSchema,
  transcriptBucketSchema,
  updateBucketSchema,
  varbitBucketSchema,
]);

export type Bucket = z.infer<typeof bucketSchema>;
