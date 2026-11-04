import type { Base } from './types.js';

export const createDigitValidator = (base: Base): ((char: string) => boolean) => {
  return (char: string): boolean => {
    void base;
    void char;
    return false;
  };
};
