import z from 'zod';

export const dropsLineSchema = z.object({
  bucketName: z.literal('dropsline'),
  fields: z.object({
    item_name: z.string().nonempty(),
    drop_json: z.string().nonempty(),
    rare_drop_table: z.boolean(),
  }),
});

export type DropsLine = z.infer<typeof dropsLineSchema>;
