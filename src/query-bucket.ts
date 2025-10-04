import z, { type ZodLiteral, type ZodObject } from 'zod';
import { constants } from './config/constants';
import { bucketSchema, type Bucket } from './schemas/buckets/bucket-schema';
import type { Selector } from './types/selector';
import { isLimitedResponse } from './types/limited-response';

interface BucketApiQueryOptions<T extends Bucket['bucket'][number]> {
  select: Selector<T>;
  where?: '';
  limit?: number;
  offset?: number;
}

export async function queryBucket<
  BucketName extends Bucket['bucketName'],
  BucketSchema extends Extract<
    (typeof bucketSchema)['options'][number],
    ZodObject<{ bucketName: ZodLiteral<BucketName> }>
  >,
  BucketFields extends Extract<
    z.infer<BucketSchema>,
    { bucketName: BucketName }
  >['bucket'][number],
  Options extends BucketApiQueryOptions<BucketFields>,
>(
  bucket: BucketName,
  { select, limit = 0, offset = 0, where = '' }: Options,
): Promise<
  Pick<BucketFields, Extract<keyof Options['select'], keyof BucketFields>>[]
> {
  try {
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

    const requestedBucketSchema = bucketSchema.options.find(
      (b): b is BucketSchema =>
        [...b.def.shape.bucketName.values].includes(bucket),
    );

    if (!requestedBucketSchema) {
      throw new Error(`Bucket schema not configured: ${bucket}`);
    }

    const limitedResponseSchema = z.object({
      bucket: z.array(
        z
          .object(requestedBucketSchema.def.shape.bucket.element.shape)
          .pick(select),
      ),
    });

    const data = await response.json();

    if (
      !isLimitedResponse<
        BucketFields,
        Extract<keyof Options['select'], keyof BucketFields>
      >(data, limitedResponseSchema)
    ) {
      throw limitedResponseSchema.safeParse(data).error;
    }

    return data;
  } catch (e) {
    console.error('Error querying bucket:', e);

    throw e;
  }
}
