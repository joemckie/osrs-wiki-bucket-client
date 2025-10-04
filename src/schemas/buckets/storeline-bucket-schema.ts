import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const storeLineBucketSchema = z.object({
  bucketName: z.literal('storeline'),
  fields: z
    .object({
      sold_by: z.string().nonempty(),
      sold_item: z.string().nonempty(),
      sold_item_image: z.string().nonempty(),
      store_buy_price: z.string().nonempty(),
      store_sell_price: z.string().nonempty(),
      store_currency: z.string().nonempty(),
      store_delta: z.string().nonempty(),
      store_stock: z.string().nonempty(),
      restock_time: z.string().nonempty(),
      store_notes: z.string().nonempty(),
      sold_item_json: z.json(), // TODO: check schema
    })
    .extend(sharedBucketSchema.shape),
});

export type StoreLine = z.infer<typeof storeLineBucketSchema>;
