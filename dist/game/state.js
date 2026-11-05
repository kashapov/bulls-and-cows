import { evaluateGuess } from './evaluateGuess.js';
export const createInitialState = () => ({
    status: 'idle',
    settings: null,
    secret: null,
    history: [],
    startedAt: null,
    finishedAt: null,
});
export const startRound = (settings, secret, startedAt = Date.now()) => ({
    status: 'playing',
    settings,
    secret,
    history: [],
    startedAt,
    finishedAt: null,
});
const normalizeGuess = (guess) => guess.toLowerCase();
const hasGuess = (history, guess) => history.some((entry) => normalizeGuess(entry.guess) === normalizeGuess(guess));
export const submitGuess = (state, guess, finishedAt = Date.now()) => {
    if (state.status !== 'playing' || state.secret === null || state.settings === null) {
        return state;
    }
    if (hasGuess(state.history, guess)) {
        return state;
    }
    const { bulls, cows } = evaluateGuess(state.secret, guess);
    const entry = { guess, bulls, cows };
    const history = [...state.history, entry];
    const isWon = bulls === state.settings.length;
    return {
        ...state,
        history,
        status: isWon ? 'won' : state.status,
        finishedAt: isWon ? finishedAt : state.finishedAt,
    };
};
export const resetToSettings = () => createInitialState();
export const getAttempts = (state) => state.history.length;
export const getElapsedMs = (state, now = Date.now()) => {
    if (state.startedAt === null) {
        return null;
    }
    const end = state.finishedAt ?? now;
    return Math.max(0, end - state.startedAt);
};
//# sourceMappingURL=state.js.map