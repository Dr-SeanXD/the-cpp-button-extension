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
    const author = config.get('authorName') || "TODO: Enter Your Name!";
    const dateCreated = addDate;
    const fileName = path.basename(filePath);
    const project = "TODO: Your Project Name Here"; // Customize this as needed
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

let terminal;

function getOrCreateTerminal(name) {
    if (!terminal || terminal.exitStatus) {
        terminal = vscode.window.createTerminal(name);
    }
    const config = vscode.workspace.getConfiguration('the-c++-button');
    const clear = config.get('clearTerminalBeforeExecution');
    if (clear) terminal.sendText(`clear`);
    terminal.show(true);
    return terminal;
}

function measureRuntimeAndMemory(command, terminalName) {
    const terminal = getOrCreateTerminal(terminalName);
    terminal.show(true);

    const start = process.hrtime();

    terminal.sendText(`${command}`);

    const config = vscode.workspace.getConfiguration('the-c++-button');
    const time = config.get('showRunTimeAndMemoryUsage');
    
    if (time) {
        setTimeout(() => {
            const end = process.hrtime(start);
            const executionTime = (end[0] * 1000 + end[1] / 1e6).toFixed(2);
            const memoryUsage = process.memoryUsage();
            const memoryUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2); 

            // Display the results in a VS Code notification
            vscode.window.showInformationMessage(`Execution Time: ${executionTime} ms, Memory Used: ${memoryUsed} MB`);
        }, 1000);
    }
}

function runPython() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage("No active text editor found!");
        return;
    }

    const filePath = editor.document.uri.fsPath; // Get the path of the current file

    measureRuntimeAndMemory(`python3 "${filePath}"`, "Python Terminal");
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
    const outputFile = process.platform === "win32" ? "a.exe" : "a.out";
    if (process.platform === "win32") {
        // Compile step
        const compileCommand = `g++ ${folderPath}/*.cpp -o ${outputFile}`;
        measureRuntimeAndMemory(compileCommand, "C++ Terminal");
        
        // Run the executable after a short delay to allow compilation to complete
        setTimeout(() => {
            measureRuntimeAndMemory("./a.exe", "C++ Terminal");
        }, 500);
    } else {
        // On non-Windows platforms, chain compile and run with &&
        const runCommand = `./${outputFile}`;
        const compileAndRun = `g++ ${folderPath}/*.cpp -o ${outputFile} && ${runCommand}`;
        measureRuntimeAndMemory(compileAndRun, "C++ Terminal");
    }
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

    const compile = `javac -d "${buildFolderPath}" ${folderPath}/*.java`;
    const run = `java -cp "${buildFolderPath}" ${mainClass}`;

    const terminal = getOrCreateTerminal("Java Terminal");
    terminal.show(true);

    const start = process.hrtime();

    terminal.sendText(compile);

    setTimeout(() => {
        terminal.sendText(run);

        setTimeout(() => {
            const end = process.hrtime(start);
            const exeTime = (end[0] * 1000 + end[1] / 1e6).toFixed(2);
            const memUsage = process.memoryUsage();
            const memUsed = (memUsage.heapUsed / 1024 / 1024).toFixed(2);

            vscode.window.showInformationMessage(`Execution Time: ${exeTime} ms, Memory
                                                  Used: ${memUsed} MB`);
        }, 2000);
    }, 2000);
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

        const config = vscode.workspace.getConfiguration('the-c++-button');

        if (config.get("saveAllBeforeRunC++")) {
            vscode.workspace.saveAll().then(() => {
                runCpp(vscode.workspace.workspaceFolders[0].uri.fsPath);
            });
        }
        else runCpp(vscode.workspace.workspaceFolders[0].uri.fsPath);
    });

    let exeJava = vscode.commands.registerCommand("the-c---button.java", () => {
        if (!checkEditor) return;

        const config = vscode.workspace.getConfiguration('the-c++-button');

        if (config.get("saveAllBeforeRunJava")) {
            vscode.workspace.saveAll().then(() => {
                runJava(vscode.workspace.workspaceFolders[0].uri.fsPath);
            });
        }
        else runJava(vscode.workspace.workspaceFolders[0].uri.fsPath);
        
    });

    let generateHeader = vscode.commands.registerCommand("the-c---button.generate-header", () => {
        if (!checkEditor()) return;

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const filePath = editor.document.uri.fsPath; // Get the file path
            addHeaderComment(filePath); // Pass the file path to the function
        }
    });

    let exePython = vscode.commands.registerCommand("the-c---button.python", runPython);

    context.subscriptions.push(disposable);
    context.subscriptions.push(exeJava);
    context.subscriptions.push(generateHeader);
    context.subscriptions.push(exePython);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};