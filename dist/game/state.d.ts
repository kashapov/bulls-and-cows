import type { GameSettings, GameState } from './types.js';
export declare const createInitialState: () => GameState;
export declare const startRound: (settings: GameSettings, secret: string, startedAt?: number) => GameState;
export declare const submitGuess: (state: GameState, guess: string, finishedAt?: number) => GameState;
export declare const resetToSettings: () => GameState;
export declare const getAttempts: (state: GameState) => number;
export declare const getElapsedMs: (state: GameState, now?: number) => number | null;
