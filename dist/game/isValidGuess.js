import { createDigitValidator } from './createDigitValidator.js';
export const isValidGuess = (guess, length, base) => {
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
//# sourceMappingURL=isValidGuess.js.map