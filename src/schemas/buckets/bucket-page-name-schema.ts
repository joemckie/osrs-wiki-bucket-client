import z from 'zod';

export const sharedBucketSchema = z.object({
  page_name: z.string().nonempty(),
  page_name_sub: z.string().nonempty(),
});
