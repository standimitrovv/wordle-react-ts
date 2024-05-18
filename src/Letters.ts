import { ALPHABET } from './Alphabet';

export const createDefaultLetters = () => {
  const defaultLetters: Record<string, string> = {};

  ALPHABET.split('').forEach((l) => (defaultLetters[l] = ''));

  return defaultLetters;
};

export type Letters = Record<string, string>;
