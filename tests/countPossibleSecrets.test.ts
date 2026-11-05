import { describe, expect, it } from 'vitest';

import { countPossibleSecrets } from '../src/game/countPossibleSecrets.js';

describe('countPossibleSecrets', () => {
  it('returns 1 for length 0', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('returns base for length 1', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
    expect(countPossibleSecrets(1, 2)).toBe(2);
  });

  it('counts permutations without repetition for binary length 2', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('counts P(10, 4) for decimal length 4', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('counts P(16, 4) for hex length 4', () => {
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  it('counts P(8, 3) for octal length 3', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('returns 0 when length is greater than base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });

  it('returns the same result on repeated calls', () => {
    const first = countPossibleSecrets(4, 10);
    const second = countPossibleSecrets(4, 10);

    expect(first).toBe(5040);
    expect(second).toBe(first);
  });
});
