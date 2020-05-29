import { insert } from './array';

describe('insert', () => {
    it('should add items to certain array index without mutation the original array', () => {
        const original = ['a', 'b', 'c'];
        const newArr = insert(original, 2, ['d', 'e', 'f']);
        expect(original).toEqual(['a', 'b', 'c']);
        expect(newArr).toEqual(['a', 'b', 'd', 'e', 'f', 'c']);
    });
});
