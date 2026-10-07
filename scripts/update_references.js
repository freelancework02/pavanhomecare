const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        results = results.concat(getFiles(full));
      }
    } else {
      results.push(full);
    }
  });
  return results;
}

const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.html', '.md'];
const files = getFiles('.').filter(f => 
  codeExtensions.includes(path.extname(f).toLowerCase()) &&
  !f.endsWith('package-lock.json') &&
  !f.includes('convert_all_to_webp.js') &&
  !f.includes('update_references.js')
);

console.log(`Checking ${files.length} code files for image references...`);

const imageRegex = /(\/images\/[^\s'"`\)\>]+?\.)(png|jpe?g)/gi;

let totalReplacements = 0;
const modifiedFiles = [];

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let fileReplacements = 0;

  const newContent = content.replace(imageRegex, (match, prefix, ext) => {
    // Check if webp file actually exists in public
    const publicPath = path.join('public', prefix.slice(1) + 'webp');
    if (fs.existsSync(publicPath)) {
      fileReplacements++;
      return prefix + 'webp';
    } else {
      console.warn(`Warning: WebP target not found for ${match} (checked ${publicPath})`);
      return match;
    }
  });

  if (fileReplacements > 0) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    totalReplacements += fileReplacements;
    modifiedFiles.push({ file: filePath, count: fileReplacements });
  }
});

console.log(`\nReplacement Complete!`);
console.log(`Total references updated to .webp: ${totalReplacements}`);
console.log(`Files modified: ${modifiedFiles.length}`);
modifiedFiles.forEach(m => {
  console.log(`  - ${m.file} (${m.count} replacements)`);
});
