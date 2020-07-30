import { IEditorState } from './editor.state';
import { SegmentType } from '../entities/segment';
import { InsertTextAction } from './insert-text.action';
import { deepCopy } from '../common/object';

describe('InsertTextAction', () => {
    interface ITestCase {
        name: string;
        currState: IEditorState;
        text: string;
        expectedNewState: IEditorState;
    }

    const testCases: ITestCase[] = [
        {
            name: 'should add 1 character at cursor position',
            currState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 0,
                    endOffset: 2
                }
            },
            text: 'c',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abcd'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 3,
                    endSegmentIndex: 0,
                    endOffset: 3
                }
            }
        },
        {
            name: 'should add multiple characters at cursor position',
            currState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 1,
                    startOffset: 5,
                    endSegmentIndex: 1,
                    endOffset: 5
                }
            },
            text: 'world',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'helloworld'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 1,
                    startOffset: 10,
                    endSegmentIndex: 1,
                    endOffset: 10
                }
            }
        },
        {
            name: 'should create the first segment if no one exists',
            currState: {
                options: [],
                segments: [],
                cursor: {
                    startSegmentIndex: -1,
                    startOffset: -1,
                    endSegmentIndex: -1,
                    endOffset: -1
                }
            },
            text: 'world',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'world'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 5,
                    endSegmentIndex: 0,
                    endOffset: 5
                }
            }
        },
        {
            name: 'should add 4 space at cursor position',
            currState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 0,
                    endOffset: 2
                }
            },
            text: '    ',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'ab    d'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 6,
                    endSegmentIndex: 0,
                    endOffset: 6
                }
            }
        }
    ];

    for (const testCase of testCases) {
        it(testCase.name, () => {
            const action = new InsertTextAction(testCase.text);
            const state = deepCopy(testCase.currState);
            const newState = action.perform(state);

            expect(state).toEqual(testCase.currState);
            expect(newState).toStrictEqual(testCase.expectedNewState);
        });
    }
});
