export const el = (tag, props = {}, ...children) => {
    const node = document.createElement(tag);
    if (props.className) {
        node.className = props.className;
    }
    if (props.text !== undefined) {
        node.textContent = props.text;
    }
    if (props.attrs) {
        Object.entries(props.attrs).forEach(([key, value]) => {
            if (value === undefined || value === false) {
                return;
            }
            if (value === true) {
                node.setAttribute(key, '');
                return;
            }
            node.setAttribute(key, String(value));
        });
    }
    if (props.on) {
        Object.entries(props.on).forEach(([eventName, handler]) => {
            if (handler) {
                node.addEventListener(eventName, handler);
            }
        });
    }
    children.forEach((child) => {
        if (child === null || child === undefined) {
            return;
        }
        node.append(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
};
export const clear = (node) => {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};
//# sourceMappingURL=dom.js.map