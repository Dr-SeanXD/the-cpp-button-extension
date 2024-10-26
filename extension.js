const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function findJavaMain(folderPath) {
    const javaFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.java'));

    for (const file of javaFiles) {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        if (content.includes('public static void main(String[] args)')) {
            const mainClass = path.parse(file).name;
            return mainClass;
        }
    }
    return null;
}

function runCpp(folderPath) {

    const terminal = vscode.window.createTerminal("C++ Terminal");

    const outputFilePath = "/tmp/a.out";

    terminal.show(true);
    terminal.sendText(`clear`);
    terminal.sendText(`g++ ${folderPath}/*.cpp -o ${outputFilePath}`);
    terminal.sendText(`${outputFilePath}`);
}

function runJava (folderPath) {

    const mainClass = findJavaMain(folderPath);

    if (!mainClass) {
        vscode.window.showErrorMessage("No main class found with 'public static void main(String[] args)' method.");
        return;
    }

    const terminal = vscode.window.createTerminal("Java Terminal");

    terminal.show(true);
    terminal.sendText(`clear`);

    terminal.sendText(`cd "${folderPath}"`);
    terminal.sendText(`javac *.java`, true);
    terminal.sendText(`java ${mainClass}`, true);
}

function checkEditor() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active text editor found!");
        return false;
    }
    return true;
}

function activate(context) {

    console.log('Congratulations, your extension "The C++ Button" is now active!');

    let disposable = vscode.commands.registerCommand("the-c---button.cpp", () => {
        if (!checkEditor) return;

        runCpp(vscode.workspace.workspaceFolders[0].uri.fsPath);
    });

    let exeJava = vscode.commands.registerCommand("the-c---button.java", () => {
        if (!checkEditor) return;

        runJava(vscode.workspace.workspaceFolders[0].uri.fsPath);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};