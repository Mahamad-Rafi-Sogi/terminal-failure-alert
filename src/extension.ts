import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  console.log('Terminal Failure Alert extension is now active!');

  // Register test command
  const testCommand = vscode.commands.registerCommand('terminalFailureAlert.testSound', () => {
    playFailSound(context);
  });
  context.subscriptions.push(testCommand);

  // Listen for terminal command completion
  const disposable = vscode.window.onDidEndTerminalShellExecution((event: vscode.TerminalShellExecutionEndEvent) => {
    // Only trigger sound if exitCode is defined and NOT equal to 0 (command failed)
    if (event.exitCode !== undefined && event.exitCode !== 0) {
      playFailSound(context);
    }
  });

  context.subscriptions.push(disposable);
}

function playFailSound(context: vscode.ExtensionContext): void {
  // Get the custom sound path from settings
  const config = vscode.workspace.getConfiguration('terminalFailureAlert');
  const customSoundPath = config.get<string>('customSoundPath', '');

  let soundPath: string;

  // If custom path is provided, use it; otherwise, use default fha.wav in extension root
  if (customSoundPath && customSoundPath.trim() !== '') {
    soundPath = customSoundPath;
  } else {
    soundPath = path.join(context.extensionPath, 'fha.wav');
  }

  // Check if the sound file exists
  if (!fs.existsSync(soundPath)) {
    console.error(`Sound file not found: ${soundPath}`);
    vscode.window.showWarningMessage(`Terminal Failure Alert: Sound file not found at ${soundPath}`);
    return;
  }

  // Windows: Use System.Media.SoundPlayer - instant and reliable with WAV files
  if (process.platform === 'win32') {
    const escapedPath = soundPath.replace(/\\/g, '\\\\').replace(/'/g, "''");
    const psCommand = `$sound = New-Object System.Media.SoundPlayer; $sound.SoundLocation = '${escapedPath}'; $sound.PlaySync()`;
    
    exec(`powershell -NoProfile -Command "${psCommand}"`, (error) => {
      if (error) {
        console.error(`Error playing sound: ${error.message}`);
      }
    });
  } else if (process.platform === 'darwin') {
    // macOS: afplay
    exec(`afplay "${soundPath}"`, (error) => {
      if (error) {
        console.error(`Error playing sound: ${error.message}`);
      }
    });
  } else {
    // Linux: aplay with fallback to paplay
    exec(`aplay "${soundPath}" || paplay "${soundPath}"`, (error) => {
      if (error) {
        console.error(`Error playing sound: ${error.message}`);
      }
    });
  }
}

export function deactivate() {}
