import { generateSecret } from '../game/generateSecret.js';
import {
  createInitialState,
  getAttempts,
  getElapsedMs,
  resetToSettings,
  startRound,
  submitGuess,
} from '../game/state.js';
import type { GameSettings, GameState } from '../game/types.js';
import { clear, el } from './dom.js';
import { createGuessInputPanel } from './guessInput.js';
import { createHistoryPanel } from './history.js';
import { createSettingsPanel } from './settings.js';
import { createWinPanel } from './win.js';

const DEFAULT_SETTINGS: GameSettings = {
  length: 4,
  base: 10,
};

export const createApp = (root: HTMLElement): void => {
  let state: GameState = createInitialState();
  let draftSettings: GameSettings = { ...DEFAULT_SETTINGS };
  let notice = '';

  const render = (): void => {
    clear(root);

    const settings = state.status === 'idle' ? draftSettings : (state.settings ?? draftSettings);
    const locked = state.status !== 'idle';

    root.append(
      el(
        'header',
        { className: 'hero' },
        el('h1', { className: 'brand', text: 'Bulls and Cows' }),
        el('p', {
          className: 'tagline',
          text: 'Guess the secret number. Bulls are right place, cows are right digit.',
        }),
      ),
      createSettingsPanel({
        settings,
        locked,
        onChange: (next) => {
          if (state.status !== 'idle') {
            return;
          }
          draftSettings = next;
          notice = '';
          render();
        },
        onStart: () => {
          if (state.status !== 'idle') {
            return;
          }
          const secret = generateSecret(draftSettings.length, draftSettings.base);
          state = startRound(draftSettings, secret);
          notice = '';
          render();
        },
      }),
    );

    if (state.status === 'playing' || state.status === 'won') {
      const playSettings = state.settings ?? draftSettings;

      root.append(
        createGuessInputPanel({
          length: playSettings.length,
          base: playSettings.base,
          disabled: state.status !== 'playing',
          notice,
          onSubmit: (guess) => {
            const previousLength = state.history.length;
            const nextState = submitGuess(state, guess);

            if (nextState.history.length === previousLength) {
              notice = 'This guess was already used.';
              state = nextState;
              render();
              return;
            }

            notice = '';
            state = nextState;
            render();
          },
        }),
        createHistoryPanel(state.history),
      );
    }

    if (state.status === 'won') {
      const elapsedMs = getElapsedMs(state) ?? 0;

      root.append(
        createWinPanel({
          attempts: getAttempts(state),
          elapsedMs,
          onNewGame: () => {
            draftSettings = state.settings ?? draftSettings;
            state = resetToSettings();
            notice = '';
            render();
          },
        }),
      );
    }
  };

  render();
};
