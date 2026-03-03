import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  console.log('Terminal Failure Alert extension is now active!');

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

  // If custom path is provided, use it; otherwise, use default fha.mp3 in extension root
  if (customSoundPath && customSoundPath.trim() !== '') {
    soundPath = customSoundPath;
  } else {
    soundPath = path.join(context.extensionPath, 'fha.mp3');
  }

  // Check if the sound file exists
  if (!fs.existsSync(soundPath)) {
    console.error(`Sound file not found: ${soundPath}`);
    vscode.window.showWarningMessage(`Terminal Failure Alert: Sound file not found at ${soundPath}`);
    return;
  }

  // Wrap path in double quotes for safety with spaces
  const quotedPath = `"${soundPath}"`;

  // Determine the platform and use appropriate playback command
  const platform = process.platform;
  let command: string;

  if (platform === 'win32') {
    // Windows: Use PowerShell with .NET MediaPlayer
    const escapedPath = soundPath.replace(/'/g, "''");
    command = `powershell -WindowStyle Hidden -Command "Add-Type -AssemblyName presentationCore; $player = New-Object System.Windows.Media.MediaPlayer; $player.Open('${escapedPath}'); $player.Play(); Start-Sleep -Milliseconds 500"`;
  } else if (platform === 'darwin') {
    // macOS: Use afplay
    command = `afplay ${quotedPath}`;
  } else {
    // Linux: Try aplay first, fallback to paplay
    command = `aplay ${quotedPath} || paplay ${quotedPath}`;
  }

  // Execute the command to play the sound
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error playing sound: ${error.message}`);
      console.error(`stderr: ${stderr}`);
    }
  });
}

export function deactivate() {}
