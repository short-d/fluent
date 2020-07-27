import React, { Component } from 'react';

import styles from './Fluent.module.scss';
import Editor from './Editor';
import { IEditorStateService } from '../services/editor-state.service';

export class Fluent extends Component<any, any> {
    private editorStateService = new IEditorStateService();

    public render() {
        return (
            <div className={styles.Fluent}>
                <Editor stateService={this.editorStateService} />
            </div>
        );
    }
}
