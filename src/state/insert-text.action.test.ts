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
                        idx: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        idx: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIdx: 0,
                    startOffset: 2,
                    endSegmentIdx: 0,
                    endOffset: 2
                }
            },
            text: 'c',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        idx: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abcd'.split('')
                    },
                    {
                        idx: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIdx: 0,
                    startOffset: 3,
                    endSegmentIdx: 0,
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
                        idx: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        idx: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentIdx: 1,
                    startOffset: 5,
                    endSegmentIdx: 1,
                    endOffset: 5
                }
            },
            text: 'world',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        idx: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        idx: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'helloworld'.split('')
                    }
                ],
                cursor: {
                    startSegmentIdx: 1,
                    startOffset: 10,
                    endSegmentIdx: 1,
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
                    startSegmentIdx: -1,
                    startOffset: -1,
                    endSegmentIdx: -1,
                    endOffset: -1
                }
            },
            text: 'world',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        idx: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'world'.split('')
                    }
                ],
                cursor: {
                    startSegmentIdx: 0,
                    startOffset: 5,
                    endSegmentIdx: 0,
                    endOffset: 5
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
