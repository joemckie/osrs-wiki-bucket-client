import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const defaultPreset = createDefaultPreset();

export default {
  ...defaultPreset,
  testEnvironment: 'node',
} satisfies Config;
