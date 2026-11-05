import type { Base, LeaderboardEntry } from '../game/types.js';
import { el } from './dom.js';
import { formatDuration } from './format.js';
import { BASE_OPTIONS } from './settings.js';

const baseLabel = (base: Base): string =>
  BASE_OPTIONS.find((option) => option.value === base)?.label ?? String(base);

export const createLeaderboardPanel = (entries: LeaderboardEntry[]): HTMLElement => {
  if (entries.length === 0) {
    return el(
      'section',
      { className: 'panel leaderboard-panel' },
      el('h2', { text: 'Leaderboard' }),
      el('p', {
        className: 'leaderboard-empty',
        text: 'No records yet. Win a game to appear here.',
      }),
    );
  }

  return el(
    'section',
    { className: 'panel leaderboard-panel' },
    el('h2', { text: 'Leaderboard' }),
    el(
      'ol',
      { className: 'leaderboard-list' },
      ...entries.map((entry, index) =>
        el(
          'li',
          { className: 'leaderboard-item' },
          el('span', { className: 'leaderboard-rank', text: String(index + 1) }),
          el('span', {
            className: 'leaderboard-score',
            text: `${entry.attempts} ${entry.attempts === 1 ? 'try' : 'tries'} · ${formatDuration(entry.elapsedMs)}`,
          }),
          el('span', {
            className: 'leaderboard-badge',
            text: `${entry.length} / ${baseLabel(entry.base)}`,
          }),
        ),
      ),
    ),
  );
};
