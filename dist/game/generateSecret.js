import { getAlphabet } from './alphabet.js';
export const generateSecret = (length, base, random = Math.random) => {
    const initialPool = [...getAlphabet(base)];
    const { digits } = Array.from({ length }).reduce(({ pool, digits }) => {
        const index = Math.floor(random() * pool.length);
        const digit = pool[index] ?? '';
        return {
            pool: pool.filter((_, poolIndex) => poolIndex !== index),
            digits: [...digits, digit],
        };
    }, { pool: initialPool, digits: [] });
    return digits.join('');
};
//# sourceMappingURL=generateSecret.js.map