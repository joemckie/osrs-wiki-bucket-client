import type { ZodObject } from 'zod';
import type { Bucket } from '../schemas/buckets/bucket-schema';

export type LimitedResponse<
  T extends Bucket,
  K extends keyof T['bucket'][number],
> = {
  bucket: Pick<T['bucket'][number], K>[];
};

// Type guard to check if the response matches the LimitedResponse schema
// In theory, this should never fail.
// It only exists to satisfy the generic types used in the bucket query function.
export const isLimitedResponse = <
  BucketFields,
  SelectedFields extends keyof BucketFields,
>(
  data: unknown,
  limitedResponseSchema: ZodObject,
): data is { bucket: Pick<BucketFields, SelectedFields>[] } =>
  limitedResponseSchema.safeParse(data).success;
