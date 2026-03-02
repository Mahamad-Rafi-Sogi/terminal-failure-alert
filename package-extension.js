const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Creating extension package...\n');

// Create a minimal package for vsce
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Create output directory
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  console.log('❌ Error: out/ directory not found. Run: .\\node_modules\\.bin\\tsc -p .');
  process.exit(1);
}

// Run vsce with skip dependencies flag
try {
  console.log('Running vsce package with --no-dependencies flag...\n');
  execSync('node node_modules\\@vscode\\vsce\\out\\vsce package --no-dependencies', { 
    stdio: 'inherit',
    shell: true 
  });
  console.log('\n✅ Package created successfully!');
  console.log(`📦 Look for: terminal-failure-alert-${packageJson.version}.vsix`);
} catch (error) {
  console.error('❌ Packaging failed:', error.message);
  process.exit(1);
}
