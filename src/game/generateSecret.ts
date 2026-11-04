import { getAlphabet } from './alphabet.js';
import type { Base } from './types.js';

export const generateSecret = (
  length: number,
  base: Base,
  random: () => number = Math.random,
): string => {
  const initialPool = [...getAlphabet(base)];

  const { digits } = Array.from({ length }).reduce<{
    pool: string[];
    digits: string[];
  }>(
    ({ pool, digits }) => {
      const index = Math.floor(random() * pool.length);
      const digit = pool[index] ?? '';

      return {
        pool: pool.filter((_, poolIndex) => poolIndex !== index),
        digits: [...digits, digit],
      };
    },
    { pool: initialPool, digits: [] },
  );

  return digits.join('');
};
