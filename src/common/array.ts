export function insert<T>(arr: T[], index: number, slice: T[]): T[] {
    return [...arr.slice(0, index), ...slice, ...arr.slice(index)];
}

export function remove<T>(arr: T[], idx: number, count: number = 1): T[] {
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx + count)
    ];
}