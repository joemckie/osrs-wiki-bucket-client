import type { Bucket } from './schemas/buckets/bucket-schema';

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
  { select, limit = 0, offset = 0, where = '' }: Options,
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

  return [];
}
