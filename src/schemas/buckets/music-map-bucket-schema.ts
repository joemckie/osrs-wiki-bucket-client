import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';
import { wikiBooleanSchema } from './transformers/wiki-boolean-transformer';

export const musicMapBucketSchema = z.object({
  bucketName: z.literal('music_map'),
  fields: z
    .object({
      location_json: z.string().nonempty(), // TODO: add JSON schema
      music_tracks: z.string().nonempty(),
      is_historic: wikiBooleanSchema,
    })
    .extend(sharedBucketSchema.shape),
});

export type MusicMapBucket = z.infer<typeof musicMapBucketSchema>;
