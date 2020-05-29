export function insert<T>(arr: T[], idx: number, slice: T[]): T[] {
    return [...arr.slice(0, idx), ...slice, ...arr.slice(idx)];
}
