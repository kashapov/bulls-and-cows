import { describe, expect, it } from 'vitest';

import { createDigitValidator } from '../src/game/createDigitValidator.js';

describe('createDigitValidator', () => {
  it('returns a predicate function', () => {
    const isDigit = createDigitValidator(10);

    expect(typeof isDigit).toBe('function');
  });

  it('accepts binary digits for base 2', () => {
    const isDigit = createDigitValidator(2);

    expect(isDigit('0')).toBe(true);
    expect(isDigit('1')).toBe(true);
  });

  it('rejects non-binary digits for base 2', () => {
    const isDigit = createDigitValidator(2);

    expect(isDigit('2')).toBe(false);
    expect(isDigit('a')).toBe(false);
  });

  it('accepts octal digits for base 8', () => {
    const isDigit = createDigitValidator(8);

    expect(isDigit('0')).toBe(true);
    expect(isDigit('7')).toBe(true);
  });

  it('rejects digits outside octal alphabet for base 8', () => {
    const isDigit = createDigitValidator(8);

    expect(isDigit('8')).toBe(false);
    expect(isDigit('9')).toBe(false);
  });

  it('accepts decimal digits for base 10', () => {
    const isDigit = createDigitValidator(10);

    expect(isDigit('0')).toBe(true);
    expect(isDigit('9')).toBe(true);
  });

  it('rejects non-decimal characters for base 10', () => {
    const isDigit = createDigitValidator(10);

    expect(isDigit('a')).toBe(false);
    expect(isDigit('A')).toBe(false);
  });

  it('accepts hex digits for base 16 regardless of case', () => {
    const isDigit = createDigitValidator(16);

    expect(isDigit('0')).toBe(true);
    expect(isDigit('9')).toBe(true);
    expect(isDigit('a')).toBe(true);
    expect(isDigit('f')).toBe(true);
    expect(isDigit('A')).toBe(true);
    expect(isDigit('F')).toBe(true);
  });

  it('rejects characters outside hex alphabet for base 16', () => {
    const isDigit = createDigitValidator(16);

    expect(isDigit('g')).toBe(false);
    expect(isDigit('G')).toBe(false);
    expect(isDigit('-')).toBe(false);
  });

  it('rejects empty and multi-character input', () => {
    const isDigit = createDigitValidator(10);

    expect(isDigit('')).toBe(false);
    expect(isDigit('12')).toBe(false);
  });
});
