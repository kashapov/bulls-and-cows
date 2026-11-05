import { describe, expect, it } from 'vitest';

import { evaluateGuess } from '../src/game/evaluateGuess.js';

describe('evaluateGuess', () => {
  it('returns all bulls for an exact match', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  it('returns zeros when there are no matching digits', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('counts cows for digits present in the wrong positions', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  it('counts bulls and cows together', () => {
    expect(evaluateGuess('1234', '1523')).toEqual({ bulls: 1, cows: 2 });
  });

  it('ignores case for hex digits', () => {
    expect(evaluateGuess('abcd', 'ABCD')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('a1b2', 'A3B4')).toEqual({ bulls: 2, cows: 0 });
    expect(evaluateGuess('a1b2', 'B2A1')).toEqual({ bulls: 0, cows: 4 });
  });

  it('supports secrets that start with zero', () => {
    expect(evaluateGuess('0123', '0123')).toEqual({ bulls: 4, cows: 0 });
    expect(evaluateGuess('0123', '3012')).toEqual({ bulls: 0, cows: 4 });
  });
});
