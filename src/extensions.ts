declare global {
    interface Array<T> {
        removeAtIndex(index: number): T[];
    }
}

Array.prototype.removeAtIndex = function<T>(this: T[], index: number): T[] {
    return this.filter((_, i) => i !== index);
};

export {};
