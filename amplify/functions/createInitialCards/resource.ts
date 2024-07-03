import { defineFunction } from '@aws-amplify/backend';

export const createInitialCards = defineFunction({
  entry: './handler.ts',
});
