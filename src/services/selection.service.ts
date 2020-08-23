import { ICursor } from '../entities/cursor';

export class SelectionService {
    setCursor(selectable: HTMLElement, cursor: ICursor) {
        const selectElement = document.getSelection();
        if (!selectElement) {
            return;
        }
        const range = this.createRange(selectable, cursor);
        if (!range) {
            return;
        }

        selectElement.removeAllRanges();
        selectElement.addRange(range);
    }

    private createRange(
        selectable: HTMLElement,
        cursor: ICursor
    ): Range | null {
        const startElement = this.selectSegment(
            selectable,
            cursor.startSegmentIndex
        );
        if (!startElement || !startElement.firstChild) {
            return null;
        }

        const endElement = this.selectSegment(
            selectable,
            cursor.endSegmentIndex
        );
        if (!endElement || !endElement.firstChild) {
            return null;
        }
        const range = document.createRange();
        range.setStart(startElement.firstChild, cursor.startOffset);
        range.setEnd(endElement.firstChild, cursor.endOffset);
        return range;
    }

    private selectSegment(
        el: HTMLElement,
        segmentIndex: number
    ): HTMLElement | null {
        return el.querySelector(`[data-segment-index='${segmentIndex}']`);
    }
}
