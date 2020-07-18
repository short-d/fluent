import React, { Component } from 'react';

import styles from './Fluent.module.scss';
import Editor from './Editor';

export class Fluent extends Component<any, any> {
    public render() {
        return (
            <div className={styles.Fluent}>
                <Editor />
            </div>
        );
    }
}
