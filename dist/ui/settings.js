import { countPossibleSecrets } from '../game/countPossibleSecrets.js';
import { el } from './dom.js';
export const LENGTH_OPTIONS = [2, 3, 4, 5, 6];
export const BASE_OPTIONS = [
    { value: 2, label: 'bin' },
    { value: 8, label: 'oct' },
    { value: 10, label: 'dec' },
    { value: 16, label: 'hex' },
];
export const isLengthAvailable = (length, base) => length >= 2 && length <= 6 && length <= base;
export const clampLength = (length, base) => {
    const available = LENGTH_OPTIONS.filter((option) => isLengthAvailable(option, base));
    return available.includes(length)
        ? length
        : (available[0] ?? 2);
};
export const createSettingsPanel = (options) => {
    const { settings, locked, onChange, onStart } = options;
    const possible = countPossibleSecrets(settings.length, settings.base);
    const lengthGroup = el('fieldset', { className: 'option-group', attrs: { disabled: locked } }, el('legend', { text: 'Length' }), ...LENGTH_OPTIONS.map((length) => {
        const available = isLengthAvailable(length, settings.base);
        const id = `length-${length}`;
        return el('label', { className: 'option', attrs: { for: id } }, el('input', {
            attrs: {
                id,
                type: 'radio',
                name: 'length',
                value: length,
                checked: settings.length === length,
                disabled: locked || !available,
            },
            on: {
                change: () => {
                    if (!available) {
                        return;
                    }
                    onChange({ ...settings, length });
                },
            },
        }), el('span', { text: String(length) }));
    }));
    const baseGroup = el('fieldset', { className: 'option-group', attrs: { disabled: locked } }, el('legend', { text: 'Numeral system' }), ...BASE_OPTIONS.map(({ value, label }) => {
        const id = `base-${label}`;
        return el('label', { className: 'option', attrs: { for: id } }, el('input', {
            attrs: {
                id,
                type: 'radio',
                name: 'base',
                value,
                checked: settings.base === value,
                disabled: locked,
            },
            on: {
                change: () => {
                    onChange({
                        base: value,
                        length: clampLength(settings.length, value),
                    });
                },
            },
        }), el('span', { text: label }));
    }));
    const panel = el('section', { className: 'panel settings-panel' }, el('h2', { text: 'Settings' }), lengthGroup, baseGroup, el('p', {
        className: 'possible-count',
        text: `Possible secrets: ${possible}`,
    }));
    if (!locked) {
        panel.append(el('button', {
            className: 'button primary',
            attrs: { type: 'button' },
            text: 'Start game',
            on: { click: onStart },
        }));
    }
    return panel;
};
//# sourceMappingURL=settings.js.map