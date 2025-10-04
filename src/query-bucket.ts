import type { ConditionalPick } from 'type-fest';
import type { DropsLineBucket } from './schemas/buckets/dropsline-bucket-schema';
import type { CombatAchievementBucket } from './schemas/buckets/combat-achievement-bucket-schema';
import type { ExchangeBucket } from './schemas/buckets/exchange-bucket-schema';
import type { FeedbackBucket } from './schemas/buckets/feedback-bucket-schema';
import type { InfoboxActivityBucket } from './schemas/buckets/infobox-activity-bucket-schema';
import type { InfoboxBonusesBucket } from './schemas/buckets/infobox-bonuses-bucket-schema';
import type { InfoboxConstructionBucket } from './schemas/buckets/infobox-construction-bucket-schema';
import type { InfoboxItemBucket } from './schemas/buckets/infobox-item-bucket-schema';
import type { InfoboxLocationBucket } from './schemas/buckets/infobox-location-bucket-schema';
import type { InfoboxMonsterBucket } from './schemas/buckets/infobox-monster-bucket-schema';

type Bucket =
  | CombatAchievementBucket
  | DropsLineBucket
  | ExchangeBucket
  | FeedbackBucket
  | InfoboxActivityBucket
  | InfoboxBonusesBucket
  | InfoboxConstructionBucket
  | InfoboxItemBucket
  | InfoboxLocationBucket
  | InfoboxMonsterBucket;

type Selector<T extends Bucket['fields']> = Partial<Record<keyof T, true>>;

interface BucketApiQueryOptions<T extends Bucket['fields']> {
  select: Selector<T>;
  where?: '';
  limit?: number;
  offset?: number;
}

export async function queryBucket<
  BucketName extends Bucket['bucketName'],
  BucketFields extends Extract<Bucket, { bucketName: BucketName }>['fields'],
  Options extends BucketApiQueryOptions<BucketFields>,
  BucketLineItem extends {
    [K in keyof BucketFields as Options['select'][K] extends true
      ? K
      : never]: BucketFields[K];
  },
>(
  bucket: BucketName,
  { select, limit = 0, offset = 0, where = null }: Options,
): Promise<BucketLineItem[]> {
  const query = [
    `bucket("${bucket}")`,
    `select(${
      select === '*'
        ? '"*"'
        : Object.keys(select || {})
            .map((key) => `"${key}"`)
            .join(',')
    })`,
    ...(limit ? [`limit(${limit})`] : []),
    ...(offset ? [`offset(${offset})`] : []),
    ...(where ? [`where(${where})`] : []),
    'run()',
  ].join('.');

  console.log(query);

  return [];
}
