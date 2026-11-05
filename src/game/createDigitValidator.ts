import { getAlphabet } from './alphabet.js';
import type { Base } from './types.js';

export const createDigitValidator = (base: Base): ((char: string) => boolean) => {
  const alphabet = getAlphabet(base);

  return (char: string): boolean => {
    if (char.length !== 1) {
      return false;
    }

    return alphabet.includes(char.toLowerCase());
  };
};
