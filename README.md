# Terminal Failure Alert

A VS Code extension that plays a sound alert when terminal commands fail - never miss an error again!

## Features

- 🔊 Automatically plays a sound when any terminal command exits with a non-zero exit code
- 🎵 Configurable custom sound file support (.mp3 or .wav)
- 🖥️ Cross-platform support (Windows, macOS, Linux)
- ⚙️ Simple configuration via VS Code settings
- 🎯 Works with any shell that supports VS Code shell integration

## Requirements

- VS Code 1.75.0 or higher
- Shell integration must be enabled in the terminal (enabled by default in VS Code)

## Installation

Install from the VS Code Marketplace or Extensions view:

1. Open VS Code
2. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS)
3. Search for "Terminal Failure Alert"
4. Click Install

## Quick Start

The extension works out of the box! Just add a sound file:

1. Place a file named `fha.mp3` in the extension's installation directory, or
2. Configure a custom sound path in VS Code settings (recommended)

To configure a custom sound:

1. Open Settings (`Ctrl+,` or `Cmd+,` on macOS)
2. Search for "terminal failure alert"
3. Set "Custom Sound Path" to your sound file location

Example: `C:\\Users\\YourName\\Sounds\\fail.mp3`

## Usage

Once installed, the extension automatically monitors terminal commands:

1. Open a terminal in VS Code
2. Run any command that fails (e.g., `ls nonexistent-folder`)
3. Hear the sound play when the command exits with an error

## Configuration

Open VS Code Settings (File > Preferences > Settings) and search for "terminal failure alert":

**terminalFailureAlert.customSoundPath** (string)
- Path to a custom sound file (.mp3 or .wav)
- Leave empty to use the default `fha.mp3` file
- Set to an absolute path to use your own sound file
- Example: `C:\\Users\\YourName\\Sounds\\fail.mp3`

### Finding Sound Files

You can download free sound effects from:
- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)

Popular choices:
- Error beep sounds
- "Bruh" sound effect
- Sad trombone
- Windows error sound
- Custom sounds of your choice

## How It Works

The extension uses VS Code's Terminal Shell Execution API (`vscode.window.onDidEndTerminalShellExecution`) to listen for command completions. When a command finishes with an exit code that is:
- **Defined** (not `undefined`)
- **Non-zero** (indicates failure)

The extension triggers sound playback using platform-specific commands:

- **Windows**: PowerShell with .NET MediaPlayer
- **macOS**: Built-in `afplay` command
- **Linux**: `aplay` (ALSA) or `paplay` (PulseAudio)

All file paths are automatically escaped to handle spaces and special characters.

## Troubleshooting

### Sound doesn't play

1. **Check sound file**: Verify your sound file exists and the path is correct
2. **Check shell integration**: Ensure terminal shell integration is enabled (Settings > Terminal > Integrated > Shell Integration)
3. **Check platform requirements**:
   - Windows: PowerShell must be available (built-in)
   - macOS: `afplay` is built-in
   - Linux: Install `alsa-utils` (for aplay) or `pulseaudio-utils` (for paplay):
     ```bash
     # Ubuntu/Debian
     sudo apt-get install alsa-utils
     # or
     sudo apt-get install pulseaudio-utils
     ```

### Extension not detecting failures

- Verify terminal shell integration is active (you should see command decorations in the terminal)
- Some shells or terminal setups may not support shell integration
- Try creating a new terminal and test again

## Development

### Build from Source

```bash
git clone <repository-url>
cd terminal-fail-sound
yarn install
yarn compile
```

### Debug

Press F5 in VS Code to launch the Extension Development Host.

### Package

```bash
yarn global add @vscode/vsce
vsce package
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

MIT

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

### 1.0.0

Initial release with:
- Terminal command failure detection
- Configurable sound file
- Cross-platform sound playback
- Automatic path escaping for files with spaces

---

**Enjoy!** 🎉
