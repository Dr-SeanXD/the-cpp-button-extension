# The C++ Button README

🚀 The C++ Button is a simple VS Code extension that provides a quick way to compile and run all `.cpp` files and Java programs in your current workspace folder. Perfect for developers looking to speed up their workflow!

## Features

- **Compile and Run C++ Files**: With a single click or command, compile all `.cpp` files in the current workspace and run the main program.

- **Compile and Run Java Programs**: Automatically detects the main Java class, compiles all `.java` files, and runs the main program.

- **Custom Button**: Adds a custom button in the editor for `.cpp` and `.java` files, allowing fast access to compilation and execution.

- **Error Handling**: Displays compilation and runtime errors directly in VS Code.

## Usage

### C++ Code

1. Open one or multiple C++ files in your VS Code workspace.
2. Use the Command Palette (Cmd+Shift+P or Ctrl+Shift+P) and search for 🚀 Run C++ 💻 to compile and run your C++ files.
3. Alternatively, click the Run C++ button in the editor title when viewing a `.cpp` file.

### Java Code

1. Open one or multiple Java files in your VS Code workspace.
2. Ensure one of your Java files contains the `public static void main(String[] args)` method.
3. Use the Command Palette (Cmd+Shift+P or Ctrl+Shift+P) and search for 🚀 Run Java ☕ to compile and run your Java program.
4. Alternatively, click the Run Java button in the editor title when viewing a `.java` file.

## Requirements

- **C++**: Ensure `g++` is installed and available in your PATH. This extension uses `g++` to compile C++ files.

- **Java**: Ensure the Java Development Kit (JDK) is installed and available in your PATH. This extension requires the JDK to compile and run Java files.

- **VS Code**: Version 1.94.0 or higher.