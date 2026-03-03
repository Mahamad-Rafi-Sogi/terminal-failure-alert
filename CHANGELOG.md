# Change Log

All notable changes to the "Terminal Failure Alert" extension will be documented in this file.

## [1.0.0] - 2026-03-02

### Added
- Initial release
- Terminal command failure detection using `vscode.window.onDidEndTerminalShellExecution`
- Plays sound when terminal commands exit with non-zero exit code
- Configurable custom sound file path setting (`fhaaaaaa.customSoundPath`)
- Default sound file support (`fha.mp3` in extension root)
- Cross-platform sound playback support:
  - Windows: PowerShell with .NET MediaPlayer
  - macOS: afplay command
  - Linux: aplay with paplay fallback
- Automatic path escaping for files with spaces
- File existence validation before playback
- Error handling and user notifications

### Features
- Works with any terminal shell that supports VS Code shell integration
- Supports .mp3 and .wav audio files
- Non-intrusive background playback
- Zero configuration required (works out of the box with default sound)

## [1.0.2] - 2026-03-03

### Improved
- Reduced sound playback delay on Windows from 3 seconds to 500ms for faster response
- Sound now plays almost immediately after command failure

## [Unreleased]

No unreleased changes yet.
