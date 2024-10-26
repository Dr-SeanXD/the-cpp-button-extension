const vscode = require('vscode');

function activate(context) {
    console.log('Congratulations, your extension "The C++ Button" is now active!');

    vscode.window.showInformationMessage("Compiling codes...");

    let disposable = vscode.commands.registerCommand("the-c---button.button", () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage("No active text editor found!");
            return;
        }

        const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const outputFilePath = "/tmp/a.out";

        const terminal = vscode.window.createTerminal("C++ Terminal");

        terminal.show(true);
        terminal.sendText(`clear`);
        terminal.sendText(`g++ ${folderPath}/*.cpp -o ${outputFilePath}`);
        terminal.sendText(`${outputFilePath}`);

    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};