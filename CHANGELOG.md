# Changelog

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