import { Style } from './style.enum';

export enum SegmentType {
    Text
}

export interface ISegment {
    index: number;
    type: SegmentType;
    styles: Style[];
    content: any;
}
