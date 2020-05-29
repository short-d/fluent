import { Style } from './style.enum';

export enum SegmentType {
    Text
}

export interface ISegment {
    idx: number;
    id: string;
    type: SegmentType;
    styles: Style[];
    content: any;
}
