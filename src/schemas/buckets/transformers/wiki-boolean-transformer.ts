import z from 'zod';

/**
 * The Wiki returns an empty string for true and nothing for false, so convert these to a boolean
 */
export const wikiBooleanSchema = z
  .string()
  .optional()
  .transform((value) => value === '');
