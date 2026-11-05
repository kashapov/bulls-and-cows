import type { Base, GameSettings } from '../game/types.js';
export declare const LENGTH_OPTIONS: readonly [2, 3, 4, 5, 6];
export declare const BASE_OPTIONS: ReadonlyArray<{
    value: Base;
    label: string;
}>;
export declare const isLengthAvailable: (length: number, base: Base) => boolean;
export declare const clampLength: (length: number, base: Base) => number;
export declare const createSettingsPanel: (options: {
    settings: GameSettings;
    locked: boolean;
    onChange: (settings: GameSettings) => void;
    onStart: () => void;
}) => HTMLElement;
