import {SegmentType} from '../entities/segment';
import {Action} from '../state/action';
import {IEditorState} from '../state/editor.state';

/** This is a description of the foo function. 
const sampleText = `
This study was a preliminary study of high school student value changes because of the terrorist attack on the U.S. 
The major limitations of this study were that the student population was from California and might not truly represent all high school students in the U.S. 
Further, this study could not be considered a truly longitudinal study because of privacy issues that prevented the researchers from identifying all the students who returned surveys before the attack. 
In addition, the senior class had graduated the previous year, and a much larger freshman class entered the school. 
These issues not only made the samples similar, but also different in their composition. 
The researchers will conduct periodic studies to explore whether these value changes are permanent and continue into adulthood. 
We do not know what if any changes will take place in their values as they grow older, and we will continue to explore their values in our longitudinal studies of the impact of the 9/11 terrorist attacks.
`.split('');
*/

export type Subscriber = () => void

export class IEditorStateService {
    private subscribers: Subscriber[] = [];
    private state: IEditorState;

    constructor() {
        this.state = {
            options: [],
            segments: [{
                idx: 0,
                type: SegmentType.Text,
                styles: [],
                content: ''.split('')
            }],
            cursor: {
                startSegmentIdx: 0,
                startOffset: 0,
                endSegmentIdx: 0,
                endOffset: 0
            }
        };
    }

    public onStateChange(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }

    public unSubscribe(subscriber: Subscriber) {
        this.subscribers = this
            .subscribers
            .filter(currSubscriber => currSubscriber !== subscriber);
    }

    public getState(): IEditorState {
        return this.state;
    }

    public performAction(action: Action) {
        this.state = action.perform(this.state);
        this.notifyStateChange();
    }

    private notifyStateChange() {
        this.subscribers.forEach(subscriber => subscriber());
    }
}