import { generateSecret } from '../game/generateSecret.js';
import { createInitialState, startRound, submitGuess } from '../game/state.js';
import type { GameSettings, GameState } from '../game/types.js';
import { clear, el } from './dom.js';
import { createGuessInputPanel } from './guessInput.js';
import { createSettingsPanel } from './settings.js';

const DEFAULT_SETTINGS: GameSettings = {
  length: 4,
  base: 10,
};

export const createApp = (root: HTMLElement): void => {
  let state: GameState = createInitialState();
  let draftSettings: GameSettings = { ...DEFAULT_SETTINGS };

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
          render();
        },
        onStart: () => {
          if (state.status !== 'idle') {
            return;
          }
          const secret = generateSecret(draftSettings.length, draftSettings.base);
          state = startRound(draftSettings, secret);
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
          onSubmit: (guess) => {
            state = submitGuess(state, guess);
            render();
          },
        }),
      );
    }
  };

  render();
};
