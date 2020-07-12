import React, { Component } from 'react';

import styles from './Editor.module.scss';

export class Editor extends Component<any, any> {
    render() {
        return (
            <div
                className={styles.Editor}
                contentEditable
                suppressContentEditableWarning
            />
        );
    }
}
