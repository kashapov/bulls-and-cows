export const LEADERBOARD_LIMIT = 10;
export const LEADERBOARD_STORAGE_KEY = 'bulls-and-cows:leaderboard';
const isBase = (value) => value === 2 || value === 8 || value === 10 || value === 16;
const isLeaderboardEntry = (value) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const entry = value;
    return (typeof entry.attempts === 'number' &&
        typeof entry.elapsedMs === 'number' &&
        typeof entry.length === 'number' &&
        isBase(entry.base) &&
        typeof entry.recordedAt === 'number');
};
export const compareLeaderboardEntries = (left, right) => {
    if (left.attempts !== right.attempts) {
        return left.attempts - right.attempts;
    }
    return left.elapsedMs - right.elapsedMs;
};
export const rankLeaderboard = (entries, limit = LEADERBOARD_LIMIT) => [...entries].sort(compareLeaderboardEntries).slice(0, limit);
export const addLeaderboardEntry = (entries, entry, limit = LEADERBOARD_LIMIT) => rankLeaderboard([...entries, entry], limit);
export const parseLeaderboard = (raw) => {
    if (!raw) {
        return [];
    }
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return rankLeaderboard(parsed.filter(isLeaderboardEntry));
    }
    catch {
        return [];
    }
};
export const loadLeaderboard = (storage = localStorage) => parseLeaderboard(storage.getItem(LEADERBOARD_STORAGE_KEY));
export const saveLeaderboard = (entries, storage = localStorage) => {
    storage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(rankLeaderboard(entries)));
};
//# sourceMappingURL=leaderboard.js.map