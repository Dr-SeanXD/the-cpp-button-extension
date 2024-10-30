const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let month = {};
month[1] = 'Jan. ';
month[2] = 'Feb. ';
month[3] = 'Mar. ';
month[4] = 'Apr. ';
month[5] = 'May ';
month[6] = 'Jun. ';
month[7] = 'Jul. ';
month[8] = 'Aug. ';
month[9] = 'Sep. ';
month[10] = 'Oct. ';
month[11] = 'Nov. ';
month[12] = "Dec. ";

const first = ['1', '21', '31'];
const second = ['2', '22'];
const third = ['3', '23'];

function dateSuffix(day) {
    for (let x in first) {
        if (day == first[x]) return "st";
    }
    for (let x in second) {
        if (day == second[x]) return 'nd';
    }
    for (let x in third) {
        if (day == third[x]) return 'rd';
    }
    return 'th';
}

function addHeaderComment() {
    const editor = vscode.window.activeTextEditor;
    
    // Check if an editor is open and the document is valid
    if (!editor || !editor.document) {
        vscode.window.showErrorMessage("No active text editor found!");
        return;
    }

    const date = new Date().toLocaleDateString();

    const splitedDate = date.split('/');

    let addDate = '';
    addDate += month[Number(splitedDate[0])];
    addDate += splitedDate[1];
    addDate += dateSuffix(splitedDate[1]) + ', ';
    addDate += splitedDate[2];

    const config = vscode.workspace.getConfiguration('the-c++-button');
    const filePath = editor.document.uri.fsPath; // Get the file path from the active editor
    const author = config.get('authorName') || "Enter Your Name!";
    const dateCreated = addDate;
    const fileName = path.basename(filePath);
    const project = "Your Project Name Here"; // Customize this as needed
    const description = "TODO: Add a brief description of the file."; // Placeholder for the description

    // Construct the header comment
    const headerComment = `/*
 * @Author       : ${author}
 * @Date Created : ${dateCreated}
 * @File Name    : ${fileName}
 * @Project      : ${project}
 * @Description  : ${description}
 */\n\n`;

    editor.edit(editBuilder => {
        // Insert the header comment at the very start (0, 0)
        editBuilder.insert(new vscode.Position(0, 0), headerComment);
    }).then(success => {
        if (success) {
            vscode.window.showInformationMessage("Header comment added successfully!");
        } else {
            vscode.window.showErrorMessage("Failed to add header comment.");
        }
    });
}

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

    terminal.show(true);
    terminal.sendText(`clear`);
    terminal.sendText(`g++ ${folderPath}/*.cpp`);
    terminal.sendText(`./a.out`);
}

function runJava (folderPath) {

    const mainClass = findJavaMain(folderPath);

    if (!mainClass) {
        vscode.window.showErrorMessage("No main class found with 'public static void main(String[] args)' method.");
        return;
    }

    const buildFolderPath = path.join(folderPath, 'build');

    if (!fs.existsSync(buildFolderPath)) {
        fs.mkdirSync(buildFolderPath, { recursive: true });
    }

    const terminal = vscode.window.createTerminal("Java Terminal");

    terminal.show(true);
    terminal.sendText(`clear`);
    
    terminal.sendText(`javac -d "${buildFolderPath}" ${folderPath}/*.java`);

    terminal.sendText(`java -cp "${buildFolderPath}" ${mainClass}`);
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

    let generateHeader = vscode.commands.registerCommand("the-c---button.generate-header", () => {
        if (!checkEditor()) return;

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const filePath = editor.document.uri.fsPath; // Get the file path
            addHeaderComment(filePath); // Pass the file path to the function
        }
    })

    const myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    myStatusBarItem.text = 'Generate Header';
    myStatusBarItem.command = 'the-c---button.generate-header';
    myStatusBarItem.tooltip = 'Run my command';

    // 4. Show the status bar item
    myStatusBarItem.show();

    context.subscriptions.push(disposable);
    context.subscriptions.push(exeJava);
    context.subscriptions.push(generateHeader);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};