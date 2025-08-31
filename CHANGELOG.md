# Changelog

## [1.6.0] - 2025-08-31

### Added
- Add the ability to "execute" Typescript projects by running `npm run start` on the terminal.

## [1.5.3] - 2025-04-18

### Changed
- Fix the issue where Python cannot be run.

## [1.5.2] - 2025-03-29

### Changed
- Fix the issue where C++ cannot be run on Windows machines.

## [1.5.1] - 2025-03-29

### Changed
- Fix the issue where C++ cannot be run on Windows machines.

## [1.5.0] - 2025-03-14

### Changed
- For Windows users, the button when executing C++ will now work since the command will be changed to ./a.exe if the machine is on Windows. On a Mac, the command is ./a.out.

## [1.4.3] - 2024-11-06

### Changed
- Prevent creating multiple terminals from multiple compilations/executions.
- Let users choose to clear the terminal before each compilation/execution or not (int the setting).


## [1.4.2] - 2024-11-06

### Changed
- Removed unnecessary packages/dependencies.

## [1.4.1] - 2024-11-06

### Changed
- Fixed the issue of not getting running time and memory usage after pressing the button.


## [1.4.0] - 2024-11-06

### Added
- Added the functionality to show the run time and memory usage after each compilation and run.


## [1.3.0] - 2024-11-03

### Added
- Added the functionality to run python files with the execution button or the command.

### Changed
- Changed the README.md file to specify the new functionality in terms of Python.


## [1.2.0] - 2024-10-31

### Added
- Add the icon for the extension.


## [1.1.5] - 2024-10-31

### Added
- Add the in the settings of whether to automatically save all files when running the command `🚀 Run C++ 💻`.


## [1.1.4] - 2024-10-31

### Added
- Add the in the settings of whether to automatically save all files when running the command `🚀 Run Java 💻`.

### Changed
- Add "TODO: " in front of the default message of @Author when calling the command `📜 Generate Header` if the author in the setting is not specified.


## [1.1.3] - 2024-10-30

### Changed
- Add "TODO: " in front of the default message of @Project when calling the command `📜 Generate Header`.


## [1.1.2] - 2024-10-30

### Added
- When compiling java programs, the `.class` files generated will now be stored into a "build" folder (automatically created) instead of being next to the `.java` files in the workspace.

### Changed
- Update the README.md to let users know their compiled java files (.class) will be stored in a created folder called "build."


## [1.1.1] - 2024-10-29

### Changed
- Fix the issue of running C++.


## [1.1.0] - 2024-10-28
### Added
- **Customizable Author Name**: Users can specify the author name in the extension settings for inclusion in header comments.
- **Header Comment Generation**: Introduced a feature to add a standardized header comment at the top of code files, including fields for:
  - Author Name
  - Date Created
  - File Name
  - Project Name
  - Description

### Changed
- Updated the README.md to include instructions for the new header comment generation feature and author name customization.


## [1.0.1] - 2024-10-28
### Added
- Added a section in the changelog to keep track of future changes.

### Changed
- Minor formatting adjustments to the existing changelog entries.

### Removed
- None


## [1.0.0] - 2024-10-26
### Added
- Initial release of the extension.
- Support for running C++ and Java files.
- Buttons in the editor for quick access.

### Changed
- Improved the button layout in the editor.
- Enhanced error handling for compilation failures.

### Removed
- None


## [0.1.0] - 2024-10-26
### Added
- First draft of the extension.