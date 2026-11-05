type Child = Node | string | null | undefined;
type ElementProps = {
    className?: string;
    text?: string;
    attrs?: Record<string, string | number | boolean | undefined>;
    on?: Partial<{
        [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;
    }>;
};
export declare const el: <K extends keyof HTMLElementTagNameMap>(tag: K, props?: ElementProps, ...children: Child[]) => HTMLElementTagNameMap[K];
export declare const clear: (node: ParentNode) => void;
export {};
