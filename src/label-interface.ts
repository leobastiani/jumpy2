import { TextEditor, DecorationOptions } from 'vscode';

export interface Settings {
    wordsPattern: RegExp;
    customKeys: ReadonlyArray<string>;
}

export interface LabelEnvironment {
    keys: Generator<string, void, void>;
    settings: Settings;
}

export interface Label {
    keyLabel: string;
    textEditor: TextEditor | undefined;
    settings: Settings | undefined;
    getDecoration(): DecorationOptions;
    animateBeacon(): void;
    jump(isSelectionMode: boolean): void;
    destroy(): void;
}

export interface Labeler {
    (environment: LabelEnvironment, editor: TextEditor): Array<Label>;
}
