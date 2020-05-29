import { IEditorState } from './editor.state';
import { SegmentType } from '../entities/segment';
import { InsertTextAction } from './insert-text.action';

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
                        id: '0',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        idx: 1,
                        id: '1',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentID: '0',
                    startOffset: 2,
                    endSegmentID: '0',
                    endOffset: 2
                }
            },
            text: 'c',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        idx: 0,
                        id: '0',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abcd'.split('')
                    },
                    {
                        idx: 1,
                        id: '1',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentID: '0',
                    startOffset: 3,
                    endSegmentID: '0',
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
                        id: '0',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        idx: 1,
                        id: '1',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'hello'.split('')
                    }
                ],
                cursor: {
                    startSegmentID: '1',
                    startOffset: 5,
                    endSegmentID: '1',
                    endOffset: 5
                }
            },
            text: 'world',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        idx: 0,
                        id: '0',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'abd'.split('')
                    },
                    {
                        idx: 1,
                        id: '1',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'helloworld'.split('')
                    }
                ],
                cursor: {
                    startSegmentID: '1',
                    startOffset: 10,
                    endSegmentID: '1',
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
                    startSegmentID: '',
                    startOffset: -1,
                    endSegmentID: '',
                    endOffset: -1
                }
            },
            text: 'world',
            expectedNewState: {
                options: [],
                segments: [
                    {
                        idx: 0,
                        id: '0',
                        type: SegmentType.Text,
                        styles: [],
                        content: 'world'.split('')
                    }
                ],
                cursor: {
                    startSegmentID: '0',
                    startOffset: 5,
                    endSegmentID: '0',
                    endOffset: 5
                }
            }
        }
    ];

    for (const testCase of testCases) {
        it(testCase.name, () => {
            const action = new InsertTextAction(testCase.text);
            const newState = action.perform(testCase.currState);
            expect(newState).toStrictEqual(testCase.expectedNewState);
        });
    }
});
