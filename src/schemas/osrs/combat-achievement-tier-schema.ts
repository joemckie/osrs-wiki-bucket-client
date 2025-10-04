import { z } from 'zod';

export const combatAchievementTierSchema = z.enum([
  'Easy',
  'Medium',
  'Hard',
  'Elite',
  'Master',
  'Grandmaster',
]);
