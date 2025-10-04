import z, { type ZodLiteral, type ZodObject } from 'zod';
import { constants } from './config/constants';
import { bucketSchema, type Bucket } from './schemas/buckets/bucket-schema';
import type { Selector } from './types/selector';

interface BucketApiQueryOptions<T extends Bucket['bucket'][number]> {
  select: Selector<T>;
  where?: '';
  limit?: number;
  offset?: number;
}

export async function queryBucket<
  BucketName extends Bucket['bucketName'],
  BucketFields extends Extract<
    Bucket,
    { bucketName: BucketName }
  >['bucket'][number],
  Options extends BucketApiQueryOptions<BucketFields>,
>(
  bucket: BucketName,
  { select, limit = 0, offset = 0, where = '' }: Options,
): Promise<
  {
    [K in keyof BucketFields as Options['select'][K] extends true
      ? K
      : never]: BucketFields[K];
  }[]
> {
  const query = [
    `bucket("${bucket}")`,
    `select(${Object.keys(select)
      .map((key) => `"${key}"`)
      .join(',')})`,
    ...(limit ? [`limit(${limit})`] : []),
    ...(offset ? [`offset(${offset})`] : []),
    ...(where ? [`where(${where})`] : []),
    'run()',
  ].join('.');

  const url = new URL(`${constants.wikiUrl}/api.php`);

  url.searchParams.set('action', 'bucket');
  url.searchParams.set('query', query);
  url.searchParams.set('format', 'json');

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': constants.userAgent,
    },
  });

  const requestedBucketSchema = bucketSchema.options.find((b) =>
    [...b.def.shape.bucketName.values].includes(bucket),
  );

  requestedBucketSchema?.shape.bucket.element.shape;

  if (!requestedBucketSchema) {
    throw new Error(`Bucket schema not configured: ${bucket}`);
  }

  const itemShape = requestedBucketSchema.def.shape.bucket.element.shape;

  const limitedResponseSchema = z.object({
    bucket: z.array(z.object(itemShape).pick(select)),
  });

  return limitedResponseSchema.parse(await response.json()).bucket;
}
