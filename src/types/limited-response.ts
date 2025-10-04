import type { Bucket } from '../schemas/buckets/bucket-schema';

export type LimitedResponse<
  T extends Bucket,
  K extends keyof T['bucket'][number],
> = {
  bucket: Pick<T['bucket'][number], K>[];
};
