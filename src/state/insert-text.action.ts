import { Action } from './action';
import { ISegment, SegmentType } from '../entities/segment';
import { ICursor } from '../entities/cursor';
import { getCurrSegment, IEditorState } from './editor.state';
import { insert } from '../common/array';

export class InsertTextAction implements Action {
    private readonly chars: string[];

    constructor(private text: string) {
        this.chars = this.text.split('');
    }

    public perform(state: IEditorState): IEditorState {
        const { cursor, segments } = state;
        let newState: IEditorState = state;
        let newSegments: ISegment[] = segments;
        let newCursor: ICursor = cursor;

        if (newSegments.length < 1) {
            newSegments = [
                {
                    idx: 0,
                    type: SegmentType.Text,
                    styles: [],
                    content: []
                }
            ];
            newCursor = {
                startSegmentIdx: 0,
                startOffset: 0,
                endSegmentIdx: 0,
                endOffset: 0
            };
            newState = Object.assign<any, IEditorState, Partial<IEditorState>>(
                {},
                state,
                {
                    segments: newSegments,
                    cursor: newCursor
                }
            );
        }

        const segment = getCurrSegment(newState);
        if (!segment) {
            return state;
        }

        const newSegment = Object.assign<any, ISegment, Partial<ISegment>>(
            {},
            segment,
            {
                content: insert<string>(
                    segment.content,
                    newCursor.startOffset,
                    this.chars
                )
            }
        );
        newCursor = Object.assign({}, newCursor, {
            startOffset: newCursor.startOffset + this.chars.length,
            endOffset: newCursor.startOffset + this.chars.length
        });
        newSegments = newSegments.map((currSegment: ISegment) => {
            if (currSegment.idx === segment.idx) {
                return newSegment;
            }
            return currSegment;
        });
        return Object.assign({}, state, {
            segments: newSegments,
            cursor: newCursor
        });
    }
}
