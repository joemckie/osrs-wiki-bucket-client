import z from 'zod';
import { sharedBucketSchema } from './bucket-page-name-schema';

export const questBucketSchema = z.object({
  bucketName: z.literal('quest'),
  fields: z
    .object({
      description: z.string().nonempty(),
      enemies_to_defeat: z.string().nonempty(),
      ironman_concerns: z.string().nonempty(),
      items_required: z.string().nonempty(),
      official_difficulty: z.enum([
        'Novice',
        'Intermediate',
        'Experienced',
        'Master',
        'Grandmaster',
      ]), // TODO: double check
      official_length: z.enum(['Short', 'Medium', 'Long', 'Very Long']), // TODO: double check
      requirements: z.string().nonempty(),
      start_point: z.string().nonempty(),
      json: z.string().nonempty(), // TODO: check schema
    })
    .extend(sharedBucketSchema.shape),
});

export type QuestBucket = z.infer<typeof questBucketSchema>;
