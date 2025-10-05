import type { Bucket } from '../schemas/buckets/bucket-schema';
import type { Selector } from './selector';

export interface Condition<T extends Bucket['bucket'][number]> {
  field: keyof Selector<T>;
  operator?: '=' | '!=' | '>=' | '<=' | '>' | '<';
  value: string | number;
}
