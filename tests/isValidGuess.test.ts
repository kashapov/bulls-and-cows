import { describe, expect, it } from 'vitest';

import { isValidGuess } from '../src/game/isValidGuess.js';

describe('isValidGuess', () => {
  it('accepts a valid decimal guess of the expected length', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('rejects a guess with the wrong length', () => {
    expect(isValidGuess('012', 4, 10)).toBe(false);
    expect(isValidGuess('01234', 4, 10)).toBe(false);
  });

  it('rejects a guess with repeated digits', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
    expect(isValidGuess('aAa', 3, 16)).toBe(false);
  });

  it('rejects digits outside the selected base', () => {
    expect(isValidGuess('012', 3, 2)).toBe(false);
    expect(isValidGuess('078', 3, 8)).toBe(false);
    expect(isValidGuess('09a', 3, 10)).toBe(false);
  });

  it('accepts hex digits in either case', () => {
    expect(isValidGuess('aB3', 3, 16)).toBe(true);
    expect(isValidGuess('Ab3', 3, 16)).toBe(true);
  });

  it('accepts a valid binary guess', () => {
    expect(isValidGuess('01', 2, 2)).toBe(true);
  });

  it('rejects an empty guess', () => {
    expect(isValidGuess('', 2, 10)).toBe(false);
  });
});
