import { el } from './dom.js';
import { formatDuration } from './format.js';
export const createWinPanel = (options) => {
    const { attempts, elapsedMs, onNewGame } = options;
    return el('section', { className: 'panel win-panel' }, el('h2', { text: 'You won' }), el('p', {
        className: 'win-summary',
        text: `Solved in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'} · ${formatDuration(elapsedMs)}`,
    }), el('button', {
        className: 'button primary',
        attrs: { type: 'button' },
        text: 'New game',
        on: { click: onNewGame },
    }));
};
//# sourceMappingURL=win.js.map