# Installation Instructions

Due to npm/Node.js version compatibility issues on your system, you'll need to install the dependencies using one of these methods:

## Option 1: Use NVM to switch Node versions (Recommended)

```powershell
# Install nvm-windows if not already installed
# Download from: https://github.com/coreybutler/nvm-windows/releases

# Switch to Node 18
nvm install 18
nvm use 18

# Now install dependencies
npm install

# Compile the extension
npm run compile
```

## Option 2: Use Yarn instead of npm

```powershell
# Install Yarn globally
npm install -g yarn --force

# Install dependencies with Yarn
yarn install

# Compile the extension
yarn compile
```

## Option 3: Manual dependency installation

If both options above fail, you can try:

```powershell
# Remove npm from the old Node installation path
$env:PATH = $env:PATH -replace 'C:\\Users\\SG0706304\\AppData\\Roaming\\nvm\\v18.16.0\\node_modules\\npm;', ''

# Reinstall npm for current Node version
npm install -g npm@latest --force

# Now install dependencies
npm install
```

## After Installation

1. Add your sound file as `fha.mp3` in the root directory
   - You can download a sound effect from any royalty-free sound library
   - Recommended format: .mp3 or .wav
   - Example sounds: error beep, "bruh" sound effect, sad trombone, etc.

2. Press F5 in VS Code to launch the extension development host

3. Test by running a failing command in the terminal:
   ```bash
   ls /nonexistent-directory
   ```

## Adding a Custom Sound

You can use any .mp3 or .wav file. Here are some free sources:
- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)

Save your chosen file as `fha.mp3` in this directory, or configure a custom path in VS Code settings.
