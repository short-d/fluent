import { Action } from './action';
import { ISegment } from '../entities/segment';
import { ICursor } from '../entities/cursor';
import { getCurrSegment, IEditorState, findSegment } from './editor.state';
import { remove } from '../common/array';

export class DeleteTextAction implements Action {

    private rematchIndex(segments: ISegment[]): ISegment[]{
        return segments.map((currSegment: ISegment, idx: number) => {
            return Object.assign<any, ISegment, Partial<ISegment>>(
                {},
                currSegment,
                {
                    index: idx
                }
            );
        });
    }

    private deleteSingleChar(state: IEditorState): IEditorState {
        const { cursor, segments } = state;
        let newState: IEditorState = state;
        let newSegments: ISegment[] = segments;
        let newCursor: ICursor = cursor;

        const segment = getCurrSegment(newState);
        if (!segment) {
            return state;
        }

        const newSegment = Object.assign<any, ISegment, Partial<ISegment>>(
            {},
            segment,
            {
                // to remove the single char at the cursor
                content: remove<string>(
                    segment.content,
                    newCursor.startOffset - 1
                )
            }
        );

        newSegments = newSegments.map((currSegment: ISegment) => {
            if (currSegment.index === segment.index) {
                return newSegment;
            }
            return currSegment;
        });

        // If after the deletion, the segment is empty, we need to remove it, and set the cursor to the end of the previous segment
        if (newSegment.content.length === 0) {
            newSegments = remove<ISegment>(newSegments, newSegment.index);

            // set the cursor to the end of the previous segment
            if (newSegment.index > 0) {
                let prevSegment = findSegment(segment.index - 1, segments);

                newCursor = Object.assign({}, newCursor, {
                    startSegmentIndex: prevSegment.index,
                    startOffset: prevSegment.content.length,
                    endSegmentIndex: prevSegment.index,
                    endOffset: prevSegment.content.length
                });

                // rematch index here since we have removed a segment
                newSegments = this.rematchIndex(newSegments);

            // If it's the first segment, we need to reset the cursor.
            } else {
                newCursor = Object.assign({}, newCursor, {
                    startSegmentIndex: 0,
                    startOffset: 0,
                    endSegmentIndex: 0,
                    endOffset: 0
                });
            }
            
        } else {
            newCursor = Object.assign({}, newCursor, {
                startOffset: newCursor.startOffset - 1,
                endOffset: newCursor.endOffset - 1
            });
        }

        return Object.assign({}, state, {
            segments: newSegments,
            cursor: newCursor
        });
    }

    private deleteMultiple(state: IEditorState): IEditorState {
        const { cursor, segments } = state;
        let newSegments: ISegment[] = segments;
        let newCursor: ICursor = cursor;

        let startSegment = findSegment(cursor.startSegmentIndex, segments);
        if (!startSegment) {
            return state;
        }

        let endSegment = findSegment(cursor.endSegmentIndex, segments);
        if (!endSegment) {
            return state;
        }

        startSegment = Object.assign<any, ISegment, Partial<ISegment>>(
            {},
            startSegment,
            {
                // to remove the single char at the cursor
                content: remove<string>(
                    startSegment.content,
                    cursor.startOffset,
                    startSegment.content.length - cursor.startOffset
                )
            }
        );

        endSegment = Object.assign<any, ISegment, Partial<ISegment>>(
            {},
            endSegment,
            {
                // to remove the single char at the cursor
                content: remove<string>(
                    endSegment.content,
                    0,
                    cursor.endOffset
                )
            }
        );

        newSegments = newSegments.map((currSegment: ISegment) => {
            if (currSegment.index === startSegment.index) {
                return startSegment;
            }
            if (currSegment.index === endSegment.index) {
                return endSegment;
            }
            return currSegment;
        });

        let startIndex = startSegment.index;
        let endIndex = endSegment.index;
        if (startSegment.content.length === 0) {
            startIndex = startIndex - 1;
        }
        if (endSegment.content.length === 0) {
            endIndex = endIndex + 1;
        }

        if (endIndex - startIndex - 1 > 0) {
            newSegments = remove<ISegment>(newSegments, startIndex + 1, endIndex - startIndex - 1);
            newSegments = this.rematchIndex(newSegments);
        }
        
        newCursor = Object.assign({}, newCursor, {
            endSegmentIndex: newCursor.startSegmentIndex,
            endOffset: newCursor.startOffset
        });

        return Object.assign({}, state, {
            segments: newSegments,
            cursor: newCursor
        });
    }

    public perform(state: IEditorState): IEditorState {
        const { cursor, segments } = state;

        if (segments.length < 1) {
            return state;
        }

        if (cursor.startSegmentIndex >= segments.length || cursor.endSegmentIndex < 0 || cursor.startSegmentIndex > cursor.endSegmentIndex) {
            return state;
        }

        if (cursor.startSegmentIndex === cursor.endSegmentIndex && cursor.startOffset === cursor.endOffset) {
            return this.deleteSingleChar(state);
        } else {
            return this.deleteMultiple(state);
        }
    }
}
