import { IEditorState } from './editor.state';
import { SegmentType } from '../entities/segment';
import { DeleteTextAction } from './delete-text.action';
import { deepCopy } from '../common/object';

describe('DeleteTextAction', () => {
    interface ITestCase {
        name: string;
        currState: IEditorState;
        expectedNewState: IEditorState;
    }

    const testCases: ITestCase[] = [
        {
            name: 'should delete 1 character at cursor position',
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
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'ad'.split('')
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
                    startOffset: 1,
                    endSegmentIndex: 0,
                    endOffset: 1
                }
            }
        },
        {
            name: 'should delete 1 character at cursor position and should delete the segment when segment is empty',
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
                        content: 'h'.split('')
                    },
                    {
                        index: 2,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'asd'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 1,
                    startOffset: 1,
                    endSegmentIndex: 1,
                    endOffset: 1
                }
            },
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
                        content: 'asd'.split('')
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
            name: 'should delete multiple characters at cursor selection',
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
                    startOffset: 3,
                    endSegmentIndex: 1,
                    endOffset: 5
                }
            },
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
                        content: 'hel'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 1,
                    startOffset: 3,
                    endSegmentIndex: 1,
                    endOffset: 3
                }
            }
        },
        {
            name: 'should delete multiple characters at cursor selection among different start/end segment',
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
                    endSegmentIndex: 1,
                    endOffset: 4
                }
            },
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'ab'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'o'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 0,
                    endOffset: 2
                }
            }
        },
        {
            name: 'should delete text among more than 2 segments and have correct index',
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
                    },
                    {
                        index: 2,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'qwer'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 2,
                    endOffset: 2
                }
            },
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'ab'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'er'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 0,
                    endOffset: 2
                }
            }
        },
        {
            name: 'edge case: test when delete all content among three segments',
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
                    },
                    {
                        index: 2,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'qwer'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 0,
                    endSegmentIndex: 2,
                    endOffset: 4
                }
            },
            expectedNewState: {
                options: [],
                segments: [
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 0,
                    endSegmentIndex: 0,
                    endOffset: 0
                }
            }
        },
        {
            name: 'edge case: test when end segment\'s content is removed',
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
                    },
                    {
                        index: 2,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'qwer'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 1,
                    endOffset: 5
                }
            },
            expectedNewState: {
                options: [],
                segments: [
                    {
                        index: 0,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'ab'.split('')
                    },
                    {
                        index: 1,
                        type: SegmentType.Text,
                        styles: [],
                        content: 'qwer'.split('')
                    }
                ],
                cursor: {
                    startSegmentIndex: 0,
                    startOffset: 2,
                    endSegmentIndex: 0,
                    endOffset: 2
                }
            }
        }
    ];

    for (const testCase of testCases) {
        it(testCase.name, () => {
            const action = new DeleteTextAction();
            const state = deepCopy(testCase.currState);
            const newState = action.perform(state);

            expect(state).toEqual(testCase.currState);
            expect(newState).toStrictEqual(testCase.expectedNewState);
        });
    }
});
