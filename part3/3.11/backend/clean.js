const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../frontend/dist');

if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('Frontend dist directory removed');
}
