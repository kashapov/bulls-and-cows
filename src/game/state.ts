import { evaluateGuess } from './evaluateGuess.js';
import type { GameSettings, GameState, HistoryEntry } from './types.js';

export const createInitialState = (): GameState => ({
  status: 'idle',
  settings: null,
  secret: null,
  history: [],
  startedAt: null,
  finishedAt: null,
});

export const startRound = (
  settings: GameSettings,
  secret: string,
  startedAt: number = Date.now(),
): GameState => ({
  status: 'playing',
  settings,
  secret,
  history: [],
  startedAt,
  finishedAt: null,
});

const normalizeGuess = (guess: string): string => guess.toLowerCase();

const hasGuess = (history: HistoryEntry[], guess: string): boolean =>
  history.some((entry) => normalizeGuess(entry.guess) === normalizeGuess(guess));

export const submitGuess = (
  state: GameState,
  guess: string,
  finishedAt: number = Date.now(),
): GameState => {
  if (state.status !== 'playing' || state.secret === null || state.settings === null) {
    return state;
  }

  if (hasGuess(state.history, guess)) {
    return state;
  }

  const { bulls, cows } = evaluateGuess(state.secret, guess);
  const entry: HistoryEntry = { guess, bulls, cows };
  const history = [...state.history, entry];
  const isWon = bulls === state.settings.length;

  return {
    ...state,
    history,
    status: isWon ? 'won' : state.status,
    finishedAt: isWon ? finishedAt : state.finishedAt,
  };
};

export const resetToSettings = (): GameState => createInitialState();

export const getAttempts = (state: GameState): number => state.history.length;

export const getElapsedMs = (state: GameState, now: number = Date.now()): number | null => {
  if (state.startedAt === null) {
    return null;
  }

  const end = state.finishedAt ?? now;
  return Math.max(0, end - state.startedAt);
};
