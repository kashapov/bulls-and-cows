import type { LeaderboardEntry } from './types.js';
export declare const LEADERBOARD_LIMIT = 10;
export declare const LEADERBOARD_STORAGE_KEY = "bulls-and-cows:leaderboard";
export declare const compareLeaderboardEntries: (left: LeaderboardEntry, right: LeaderboardEntry) => number;
export declare const rankLeaderboard: (entries: LeaderboardEntry[], limit?: number) => LeaderboardEntry[];
export declare const addLeaderboardEntry: (entries: LeaderboardEntry[], entry: LeaderboardEntry, limit?: number) => LeaderboardEntry[];
export declare const parseLeaderboard: (raw: string | null) => LeaderboardEntry[];
export declare const loadLeaderboard: (storage?: Pick<Storage, "getItem">) => LeaderboardEntry[];
export declare const saveLeaderboard: (entries: LeaderboardEntry[], storage?: Pick<Storage, "setItem">) => void;
