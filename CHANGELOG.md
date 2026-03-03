# Change Log

All notable changes to the "Terminal Failure Alert" extension will be documented in this file.

## [2.1.0] - 2026-03-04

### Fixed
- **Working audio playback!** Switched to Windows System.Media.SoundPlayer with WAV format
- Converted default sound from fha.mp3 to fha.wav for reliable playback
- Fixed audio not playing issue - MP3 files don't work with PowerShell SoundPlayer
- Uses `PlaySync()` to ensure sound completes before process exits

### Added
- Test command: "Terminal Failure Alert: Test Failure Sound" to manually test audio
- Command palette integration for easy sound testing

### Changed
- Default sound format changed from MP3 to WAV for Windows compatibility
- Removed sound-play npm dependency (wasn't producing audio on Windows)
- Updated configuration description to recommend WAV format for custom sounds

## [2.0.0] - 2026-03-03

### Changed
- **Major improvement:** Uses hidden background PowerShell process for instant audio playback
- No visible windows or media player GUI
- Sound plays immediately when command fails without blocking
- Returns instantly to extension (~900ms vs 3000ms blocking)

## [1.0.4] - 2026-03-03

### Fixed
- Reverted to 3 second delay to ensure complete sound playback
- Users reported sound was being cut off with shorter delays

## [1.0.3] - 2026-03-03

### Fixed
- Increased sound playback delay to 1500ms (1.5 seconds) to ensure sound plays reliably on Windows
- Previous 500ms delay was too short, causing sound to be cut off

## [1.0.2] - 2026-03-03

### Improved
- Reduced sound playback delay on Windows from 3 seconds to 500ms for faster response (later fixed in 1.0.3)
- Updated extension logo

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
