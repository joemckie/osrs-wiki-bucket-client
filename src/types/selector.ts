import type { Bucket } from '../schemas/buckets/bucket-schema';

export type Selector<T extends Bucket['bucket'][number]> = Partial<
  Record<keyof T, true>
>;
