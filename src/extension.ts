import * as vscode from 'vscode';

export class UriEventHandler implements vscode.UriHandler {
	public handleUri(uri: vscode.Uri) {
		vscode.window.showInformationMessage(`UriEventHandler: uri=${uri}`);
	}
  }

export function activate(context: vscode.ExtensionContext) {

	vscode.window.registerUriHandler(new UriEventHandler());

	let disposable = vscode.commands.registerCommand('externaluri.sample', async () => {
		const publisher = context.extension.packageJSON.publisher;
		const name = context.extension.packageJSON.name;
		const uri = vscode.Uri.parse(`${vscode.env.uriScheme}://${publisher}.${name}`);
		const externalUri = await vscode.env.asExternalUri(uri);
		const contents = new vscode.MarkdownString(
			`URI: ${uri}\nExternal URI: [${externalUri}](${externalUri})`
			);
		vscode.window.showInformationMessage(contents.value);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
