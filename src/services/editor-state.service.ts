import { SegmentType } from '../entities/segment';
import { Action } from '../state/action';
import { IEditorState } from '../state/editor.state';

export type Subscriber = () => void;

export class IEditorStateService {
    private subscribers: Subscriber[] = [];
    private state: IEditorState;

    constructor() {
        this.state = {
            options: [],
            segments: [
                {
                    index: 0,
                    type: SegmentType.Text,
                    styles: [],
                    content: ''.split('')
                }
            ],
            cursor: {
                startSegmentIndex: 0,
                startOffset: 0,
                endSegmentIndex: 0,
                endOffset: 0
            }
        };
    }

    public onStateChange(subscriber: Subscriber) {
        this.subscribers.push(subscriber);
    }

    public unSubscribe(subscriber: Subscriber) {
        this.subscribers = this.subscribers.filter(
            (currSubscriber) => currSubscriber !== subscriber
        );
    }

    public getState(): IEditorState {
        return this.state;
    }

    public performAction(action: Action) {
        this.state = action.perform(this.state);
        this.notifyStateChange();
    }

    private notifyStateChange() {
        this.subscribers.forEach((subscriber) => subscriber());
    }
}
