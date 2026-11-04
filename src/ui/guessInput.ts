import { createDigitValidator } from '../game/createDigitValidator.js';
import { isValidGuess } from '../game/isValidGuess.js';
import type { Base } from '../game/types.js';
import { el } from './dom.js';

export const createGuessInputPanel = (options: {
  length: number;
  base: Base;
  disabled: boolean;
  onSubmit: (guess: string) => void;
}): HTMLElement => {
  const { length, base, disabled, onSubmit } = options;
  const isDigit = createDigitValidator(base);
  const message = el('p', { className: 'guess-message', attrs: { 'aria-live': 'polite' } });

  const input = el('input', {
    className: 'guess-input',
    attrs: {
      id: 'guess-input',
      type: 'text',
      maxlength: length,
      autocomplete: 'off',
      spellcheck: 'false',
      disabled,
      'aria-label': 'Guess',
    },
  }) as HTMLInputElement;

  const submitButton = el('button', {
    className: 'button primary',
    attrs: { type: 'submit', disabled },
    text: 'Guess',
  }) as HTMLButtonElement;

  const filterValue = (raw: string): string => [...raw].filter(isDigit).slice(0, length).join('');

  input.addEventListener('beforeinput', (event) => {
    if (disabled || !(event instanceof InputEvent)) {
      return;
    }

    if (event.inputType.startsWith('delete') || event.inputType === 'historyUndo') {
      return;
    }

    const data = event.data ?? '';
    if (data.length === 0) {
      return;
    }

    if (![...data].every(isDigit)) {
      event.preventDefault();
    }
  });

  input.addEventListener('input', () => {
    const filtered = filterValue(input.value);
    if (input.value !== filtered) {
      input.value = filtered;
    }
    message.textContent = '';
  });

  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    input.value = filterValue(`${input.value}${pasted}`);
    message.textContent = '';
  });

  const form = el(
    'form',
    {
      className: 'guess-form',
      on: {
        submit: (event) => {
          event.preventDefault();
          if (disabled) {
            return;
          }

          const guess = input.value;
          if (!isValidGuess(guess, length, base)) {
            message.textContent = `Enter ${length} unique digits for the selected system.`;
            return;
          }

          onSubmit(guess);
          input.value = '';
          message.textContent = '';
          input.focus();
        },
      },
    },
    el('label', { className: 'guess-label', attrs: { for: 'guess-input' }, text: 'Your guess' }),
    input,
    submitButton,
    message,
  );

  return el('section', { className: 'panel play-panel' }, el('h2', { text: 'Play' }), form);
};
