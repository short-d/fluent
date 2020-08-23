import React, { Component } from 'react';

import styles from './Fluent.module.scss';
import Editor from './Editor';
import { IEditorStateService } from '../services/editor-state.service';
import { SelectionService } from '../services/selection.service';

export class Fluent extends Component<any, any> {
    private editorStateService = new IEditorStateService();
    private selectionService = new SelectionService();
    
    public render() {
        return (
            <div className={styles.Fluent}>
                <Editor
                    stateService={this.editorStateService}
                    selectionService={this.selectionService}
                />
            </div>
        );
    }
}
