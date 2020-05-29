import { IEditorState } from './editor.state';

export interface Action {
    perform(state: IEditorState): IEditorState;
}
