const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const codeDirs = ['app', 'components', 'lib', 'data'];

const imageRegex = /["'](\/(?:images|icons|photos|logos|favicons|pavan-logo)[^"'?#]+\.(?:webp|png|jpg|jpeg|svg|ico))["']/g;
const foundPaths = new Set();

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') scan(full);
    } else if (/\.(js|jsx|ts|tsx|json|css)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf-8');
      let m;
      while ((m = imageRegex.exec(content)) !== null) {
        foundPaths.add(m[1]);
      }
    }
  }
}

for (const d of codeDirs) {
  if (fs.existsSync(d)) scan(d);
}

console.log('Total referenced assets found:', foundPaths.size);
const missing = [];
for (const p of foundPaths) {
  const diskPath = path.join(publicDir, p.replace(/^\//, '').replace(/\//g, path.sep));
  if (!fs.existsSync(diskPath)) {
    missing.push(p);
  }
}

console.log('Missing assets count:', missing.length);
if (missing.length > 0) {
  console.log('Missing assets list:');
  missing.forEach(m => console.log(' - ' + m));
} else {
  console.log('ALL REFERENCED ASSETS EXIST ON DISK!');
}
