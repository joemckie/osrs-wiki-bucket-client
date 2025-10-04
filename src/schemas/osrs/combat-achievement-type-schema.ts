import { z } from 'zod';

export const combatAchievementTypeSchema = z.enum([
  'Kill Count',
  'Mechanical',
  'Perfection',
  'Restriction',
  'Speed',
  'Stamina',
]);
