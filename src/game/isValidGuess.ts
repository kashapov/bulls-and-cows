import { createDigitValidator } from './createDigitValidator.js';
import type { Base } from './types.js';

export const isValidGuess = (guess: string, length: number, base: Base): boolean => {
  if (guess.length !== length) {
    return false;
  }

  const isDigit = createDigitValidator(base);
  const chars = [...guess];

  if (!chars.every(isDigit)) {
    return false;
  }

  const normalized = chars.map((char) => char.toLowerCase());
  return new Set(normalized).size === normalized.length;
};
