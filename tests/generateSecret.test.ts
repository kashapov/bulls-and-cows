import { describe, expect, it } from 'vitest';

import { generateSecret } from '../src/game/generateSecret.js';
import { isValidGuess } from '../src/game/isValidGuess.js';

const createSequenceRandom = (values: number[]): (() => number) => {
  let index = 0;
  return () => {
    const value = values[index];
    index += 1;
    return value ?? 0;
  };
};

describe('generateSecret', () => {
  it('returns a secret of the requested length', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(secret).toHaveLength(4);
  });

  it('returns unique digits valid for the selected base', () => {
    const secret = generateSecret(4, 10, createSequenceRandom([0.1, 0.2, 0.3, 0.4]));

    expect(isValidGuess(secret, 4, 10)).toBe(true);
  });

  it('is deterministic with a fixed random source', () => {
    const random = createSequenceRandom([0, 0, 0, 0]);

    expect(generateSecret(4, 10, random)).toBe('0123');
  });

  it('can produce a secret that starts with zero', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(secret.startsWith('0')).toBe(true);
  });

  it('works for binary length 2', () => {
    const secret = generateSecret(2, 2, createSequenceRandom([0, 0]));

    expect(secret).toBe('01');
    expect(isValidGuess(secret, 2, 2)).toBe(true);
  });

  it('works for hex alphabet', () => {
    const secret = generateSecret(4, 16, () => 0);

    expect(secret).toBe('0123');
    expect(isValidGuess(secret, 4, 16)).toBe(true);
  });

  it('uses the provided random function', () => {
    const calls: number[] = [];
    const random = (): number => {
      calls.push(0);
      return 0;
    };

    generateSecret(3, 10, random);

    expect(calls).toHaveLength(3);
  });
});
