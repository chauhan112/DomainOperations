export function addItem(setStack, typ, item) {
    setStack((prev) => [...prev, typ, item]);
}

export function removeItem(setStack, index) {
    setStack((prev) => {
        if (index === -1) return [];
        const newStack = [];
        for (let i = 0; i < index + 1; i++) {
            newStack.push(prev[i]);
        }
        return newStack;
    });
}
