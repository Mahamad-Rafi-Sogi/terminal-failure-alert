# Packaging Instructions

To package the extension for distribution:

## Option 1: Using npx (Recommended)

```bash
npx @vscode/vsce package
```

This will create a `.vsix` file in the current directory.

## Option 2: Install vsce globally

If you have a Node.js version compatible with npm:

```bash
npm install -g @vscode/vsce
vsce package
```

## Option 3: Using yarn (if npm has issues)

```bash
yarn global add @vscode/vsce
vsce package
```

## Installing the Packaged Extension

Once you have the `.vsix` file:

1. Open VS Code
2. Go to Extensions view (Ctrl+Shift+X)
3. Click the `...` menu at the top
4. Select "Install from VSIX..."
5. Choose your `.vsix` file

## Publishing to Marketplace

To publish to the VS Code Marketplace:

1. Create a publisher account at https://marketplace.visualstudio.com/
2. Get a Personal Access Token from Azure DevOps
3. Run: `vsce publish`

For more details, see: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
