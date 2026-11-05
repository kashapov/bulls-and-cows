const cache = new Map();
const cacheKey = (length, base) => `${length}:${base}`;
export const countPossibleSecrets = (length, base) => {
    if (length < 0 || base < 0 || length > base) {
        return 0;
    }
    if (length === 0) {
        return 1;
    }
    const key = cacheKey(length, base);
    const cached = cache.get(key);
    if (cached !== undefined) {
        return cached;
    }
    const result = base * countPossibleSecrets(length - 1, base - 1);
    cache.set(key, result);
    return result;
};
//# sourceMappingURL=countPossibleSecrets.js.map