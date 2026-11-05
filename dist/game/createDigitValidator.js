import { getAlphabet } from './alphabet.js';
export const createDigitValidator = (base) => {
    const alphabet = getAlphabet(base);
    return (char) => {
        if (char.length !== 1) {
            return false;
        }
        return alphabet.includes(char.toLowerCase());
    };
};
//# sourceMappingURL=createDigitValidator.js.map