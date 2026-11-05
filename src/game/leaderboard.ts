import type { Base, LeaderboardEntry } from './types.js';

export const LEADERBOARD_LIMIT = 10;
export const LEADERBOARD_STORAGE_KEY = 'bulls-and-cows:leaderboard';

const isBase = (value: unknown): value is Base =>
  value === 2 || value === 8 || value === 10 || value === 16;

const isLeaderboardEntry = (value: unknown): value is LeaderboardEntry => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const entry = value as Partial<LeaderboardEntry>;

  return (
    typeof entry.attempts === 'number' &&
    typeof entry.elapsedMs === 'number' &&
    typeof entry.length === 'number' &&
    isBase(entry.base) &&
    typeof entry.recordedAt === 'number'
  );
};

export const compareLeaderboardEntries = (
  left: LeaderboardEntry,
  right: LeaderboardEntry,
): number => {
  if (left.attempts !== right.attempts) {
    return left.attempts - right.attempts;
  }

  return left.elapsedMs - right.elapsedMs;
};

export const rankLeaderboard = (
  entries: LeaderboardEntry[],
  limit: number = LEADERBOARD_LIMIT,
): LeaderboardEntry[] => [...entries].sort(compareLeaderboardEntries).slice(0, limit);

export const addLeaderboardEntry = (
  entries: LeaderboardEntry[],
  entry: LeaderboardEntry,
  limit: number = LEADERBOARD_LIMIT,
): LeaderboardEntry[] => rankLeaderboard([...entries, entry], limit);

export const parseLeaderboard = (raw: string | null): LeaderboardEntry[] => {
  if (!raw) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return rankLeaderboard(parsed.filter(isLeaderboardEntry));
  } catch {
    return [];
  }
};

export const loadLeaderboard = (
  storage: Pick<Storage, 'getItem'> = localStorage,
): LeaderboardEntry[] => parseLeaderboard(storage.getItem(LEADERBOARD_STORAGE_KEY));

export const saveLeaderboard = (
  entries: LeaderboardEntry[],
  storage: Pick<Storage, 'setItem'> = localStorage,
): void => {
  storage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(rankLeaderboard(entries)));
};
