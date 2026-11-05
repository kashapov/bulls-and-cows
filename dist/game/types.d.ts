export type Base = 2 | 8 | 10 | 16;
export type GameStatus = 'idle' | 'playing' | 'won';
export type GameSettings = {
    length: number;
    base: Base;
};
export type HistoryEntry = {
    guess: string;
    bulls: number;
    cows: number;
};
export type GameState = {
    status: GameStatus;
    settings: GameSettings | null;
    secret: string | null;
    history: HistoryEntry[];
    startedAt: number | null;
    finishedAt: number | null;
};
export type LeaderboardEntry = {
    attempts: number;
    elapsedMs: number;
    length: number;
    base: Base;
    recordedAt: number;
};
