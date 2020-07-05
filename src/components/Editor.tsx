import React, {ClipboardEvent, Component, createRef, KeyboardEvent} from 'react';

import {ARROW_LEFT, ARROW_RIGHT, BACKSPACE, META} from '../key';
import {ISegment, SegmentType} from '../entities/segment';
import {IEditorStateService, Subscriber} from '../services/editor-state.service';
import {InsertTextAction} from '../state/insert-text.action';
import {IEditorState} from '../state/editor.state';


export default class Editor extends Component<any, IEditorState> {
    private editorStateService = new IEditorStateService();

    private readonly stateChangeSubscriber: Subscriber;

    private editableRegion = createRef<HTMLDivElement>();

    private isHoldingMetaKey = false;

    constructor(props: any) {
        super(props);
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
                     onKeyUp={this.handleOnKeyUp}
                     onPaste={this.handleOnPaste}
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
                    <span data-segment-id={segment.idx}
                          key={segment.idx}
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
                return;
            case ARROW_LEFT:
                event.preventDefault();
                return;
            case ARROW_RIGHT:
                event.preventDefault();
                return;
            case META:
                event.preventDefault();
                this.isHoldingMetaKey = true;
                return;
            default:
                if (this.isHoldingMetaKey) {
                    return;
                }
                event.preventDefault();
                if (event.key.length > 1) {
                    return;
                }
                this.insertText(event.key);
        }
    };

    private handleOnPaste = (event: ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData('Text');
        if (text.length < 1) {
            return;
        }
        this.insertText(text);
    };

    private insertText(text: string) {
        const action = new InsertTextAction(text);
        this.editorStateService.performAction(action);
    }

    private handleOnKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === META) {
            this.isHoldingMetaKey = false;
        }
    };
}