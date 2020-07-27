import { ISegment } from '../entities/segment';
import { ICursor } from '../entities/cursor';
import { IOption } from '../entities/option';

export interface IEditorState {
    options: IOption[];
    segments: ISegment[];
    cursor: ICursor;
}

export function getCurrSegment(state: IEditorState): ISegment {
    return findSegment(state.cursor.startSegmentIndex, state.segments);
}

export function findSegment(
    segmentIndex: number,
    segments: ISegment[]
): ISegment {
    return segments[segmentIndex];
}
