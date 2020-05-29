import React, { Component } from 'react';

import './App.scss';

import { Fluent } from 'fluent';
import 'fluent/dist/index.css';

export class App extends Component {
    public render() {
        return (
            <div className='App'>
                <header>
                    <div className={'center'}>
                        <span className={'logo'}>Fluent</span>
                        Editor
                    </div>
                </header>
                <div className={'main-content center'}>
                    <Fluent/>
                </div>
                <footer className='center'>
                    Made with
                    <i className="heart">
                    </i>
                    by <a href="https://github.com/short-d">Short</a>
                </footer>
            </div>
        );
    }
}

export default App;
