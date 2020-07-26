export function insert<T>(arr: T[], index: number, slice: T[]): T[] {
    return [...arr.slice(0, index), ...slice, ...arr.slice(index)];
}
