import { Selection, TextEditor, TextEditorRevealType, window } from 'vscode';
import { LabelEnvironment, Label, Labeler, Settings } from '../label-interface';
import { Range, Position } from 'vscode';
import { jumpedLabels } from '../extension';

const timers: Record<string, NodeJS.Timeout> = {};

export class WordLabel implements Label {
    keyLabel!: string;
    textEditor: TextEditor | undefined;
    lineNumber!: number;
    column!: number;
    settings: Settings | undefined;
    marker!: Range;

    destroy() {}

    getDecoration(): any {
        const { lineNumber, column, keyLabel } = this;

        this.marker = new Range(
            new Position(lineNumber, column),
            new Position(lineNumber, column + 2)
        );

        const label = { after: { contentText: keyLabel } };
        const decoration = {
            range: this.marker,
            renderOptions: { dark: label, light: label },
        };

        return decoration;
    }

    animateBeacon() {}

    async jump() {
        if (!jumpedLabels.map((l) => l.keyLabel).includes(this.keyLabel)) {
            jumpedLabels.push(this);
        }
        if (timers[this.keyLabel]) {
            clearTimeout(timers[this.keyLabel]);
        }
        timers[this.keyLabel] = setTimeout(() => {
            jumpedLabels.splice(
                jumpedLabels.map((l) => l.keyLabel).indexOf(this.keyLabel),
                1
            );
        }, 10 * 60 * 1000);

        if (this.textEditor) {
            if (this.textEditor !== window.activeTextEditor) {
                await window.showTextDocument(this.textEditor.document.uri, {
                    preview: false,
                    viewColumn: this.textEditor.viewColumn,
                });
                this.textEditor = window.activeTextEditor!;
            }
            this.textEditor.selection = new Selection(
                this.lineNumber,
                this.column,
                this.lineNumber,
                this.column
            );
            this.textEditor.revealRange(
                this.textEditor.selection,
                TextEditorRevealType.InCenterIfOutsideViewport
            );
        }
    }
}

const labeler: Labeler = function (
    env: LabelEnvironment,
    editor: TextEditor
): Array<WordLabel> {
    const usedKeys = env.keys; // Intentionally mutate from calling env
    const labels: Array<WordLabel> = [...jumpedLabels];

    if (editor) {
        const visibleRanges = editor.visibleRanges;
        const document = editor.document;
        visibleRanges.forEach((range) => {
            const text = document.getText(range);
            const lines = text.split(/\r?\n/);
            lines.forEach((line, index) => {
                let word: any;
                while ((word = env.settings.wordsPattern.exec(line)) !== null) {
                    const keyLabel = usedKeys.next().value;
                    if (!keyLabel) {
                        break;
                    }

                    const column = word.index;
                    const label = new WordLabel();
                    label.settings = env.settings;
                    label.textEditor = editor;
                    label.keyLabel = keyLabel || '';
                    label.lineNumber = range.start.line + index;
                    label.column = column;
                    labels.push(label);
                }
            });
        });
    }
    return labels;
};

export default labeler;
