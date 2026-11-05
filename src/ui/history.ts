import type { HistoryEntry } from '../game/types.js';
import { el } from './dom.js';

export const createHistoryPanel = (history: HistoryEntry[]): HTMLElement => {
  if (history.length === 0) {
    return el(
      'section',
      { className: 'panel history-panel' },
      el('h2', { text: 'History' }),
      el('p', { className: 'history-empty', text: 'No guesses yet.' }),
    );
  }

  return el(
    'section',
    { className: 'panel history-panel' },
    el('h2', { text: 'History' }),
    el(
      'ol',
      { className: 'history-list' },
      ...history.map((entry, index) =>
        el(
          'li',
          { className: 'history-item' },
          el('span', { className: 'history-index', text: String(index + 1) }),
          el('span', { className: 'history-guess', text: entry.guess }),
          el('span', {
            className: 'history-result',
            text: `${entry.bulls} bulls · ${entry.cows} cows`,
          }),
        ),
      ),
    ),
  );
};
