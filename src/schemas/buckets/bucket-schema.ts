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

export const bucketSchema = z.discriminatedUnion('bucketName', [
  combatAchievementBucketSchema,
  dropsLineSchema,
  exchangeBucketSchema,
  feedbackBucketSchema,
  infoboxActivityBucketSchema,
  infoboxBonusesSchema,
  infoboxConstructionBucketSchema,
  infoboxItemBucketSchema,
  infoboxLocationBucketSchema,
  infoboxMonsterBucketSchema,
]);

export type Bucket = z.infer<typeof bucketSchema>;
