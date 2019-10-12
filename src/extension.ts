import * as vscode from 'vscode';
import { LabelEnvironment, Label } from './label-interface';
import getTabLabels from './labelers/tabs';
import * as _ from 'lodash';


function main() {
	vscode.window.showInformationMessage('Jumpy activated!!!');

	const environment:LabelEnvironment = {
		// keys: getKeySet(atom.config.get('jumpy.customKeys')),
		keys: ['aa'],
		settings: {}
	};

	const tabLabels:Array<Label> = getTabLabels(environment);

	const allLabels: Array<Label> = [
		...tabLabels
	];

	const drawnLabels:Array<Label> = [];
	let currentLabels:Array<Label> = [];

	for (const label of allLabels) {
		drawnLabels.push(label.drawLabel());
	}

	currentLabels = _.clone(allLabels);
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.jumpy-vscode', main);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
