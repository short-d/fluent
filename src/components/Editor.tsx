import React, {Component, createRef, KeyboardEvent} from 'react';

import {ARROW_LEFT, ARROW_RIGHT, BACKSPACE, META, ARROW_UP, ARROW_DOWN} from '../key';
import {ISegment, SegmentType} from '../entities/segment';
import {IEditorStateService, Subscriber} from '../services/editor-state.service';
import {InsertTextAction} from '../state/insert-text.action';
import {IEditorState} from '../state/editor.state';


export default class Editor extends Component<any, IEditorState> {
    private editorStateService: IEditorStateService;
    private readonly stateChangeSubscriber: Subscriber;
    private editableRegion = createRef<HTMLDivElement>();

    constructor(props: any) {
        super(props);
        this.editorStateService = props.stateService;
        this.state = this.editorStateService.getState();

        this.stateChangeSubscriber = () => this.setState(this.editorStateService.getState());
        this.editorStateService.onStateChange(this.stateChangeSubscriber);
    }

    public componentWillUnmount() {
        this.editorStateService.unSubscribe(this.stateChangeSubscriber);
    }

    render() {
        return (
            <div className={'Editor'}>
                <div ref={this.editableRegion}
                     className={'editable-region'}
                     contentEditable
                     suppressContentEditableWarning={true}
                     onKeyDown={this.handleOnKeyDown}
                >
                    {this.renderSegments()}
                </div>
            </div>
        );
    }

    private renderSegments() {
        return this.state.segments.map(this.renderSegment);
    }

    private renderSegment = (segment: ISegment) => {
        switch (segment.type) {
            case SegmentType.Text:
                return (
                    <span data-segment-index={segment.index}
                          key={segment.index}
                    >
                        {segment.content.join('')}
                    </span>
                );
        }
    };

    private handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        switch (event.key) {
            case BACKSPACE:
                event.preventDefault();
                //TODO: Handle BACKSPACE event
                return;
            case ARROW_LEFT:
                event.preventDefault();
                //TODO: Handle ARROW_LEFT event
                return;
            case ARROW_RIGHT:
                event.preventDefault();
                //TODO: Handle ARROW_RIGHT event
                return;
            case ARROW_UP:
                event.preventDefault();
                //TODO: Handle ARROW_UP event
                return;
            case ARROW_DOWN:
                event.preventDefault();
                //TODO: Handle ARROW_DOWN event
                return;
            case META:
                event.preventDefault();
                //TODO: Handle META event
                return;
            default:
                event.preventDefault();
                if (event.key.length > 1) {
                    return;
                }
                this.insertText(event.key);
        }
    };

    private insertText(text: string) {
        const action = new InsertTextAction(text);
        this.editorStateService.performAction(action);
    }
}
