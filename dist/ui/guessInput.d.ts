import type { Base } from '../game/types.js';
export declare const createGuessInputPanel: (options: {
    length: number;
    base: Base;
    disabled: boolean;
    notice?: string;
    onSubmit: (guess: string) => void;
}) => HTMLElement;
