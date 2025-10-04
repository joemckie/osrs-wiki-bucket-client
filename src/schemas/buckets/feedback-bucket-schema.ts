import z from 'zod';

export const feedbackSchema = z.object({
  bucketName: z.literal('feedback'),
  fields: z.object({
    id: z.string().nonempty(),
    comment: z.string().nonempty(),
    resolved: z.boolean(),
    category: z.string().nonempty(),
    timestamp: z.string().nonempty(),
  }),
});

export type FeedbackBucket = z.infer<typeof feedbackSchema>;
