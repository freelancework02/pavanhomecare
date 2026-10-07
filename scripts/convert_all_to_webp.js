const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TARGET_DIRS = [
  'public/images',
  'public', // for root icons
  'Pavan Homecare-Final Logo',
  'Pavan_Homecare_Header_Assets'
];

const VALID_EXTS = ['.jpg', '.jpeg', '.png'];

async function getImagesInDir(dir, recursive = true) {
  let images = [];
  if (!fs.existsSync(dir)) return images;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (recursive && !['node_modules', '.next', '.git'].includes(entry.name)) {
        // If checking 'public' root, don't recurse into 'images' since it's handled separately
        if (dir === 'public' && entry.name === 'images') continue;
        const sub = await getImagesInDir(fullPath, recursive);
        images = images.concat(sub);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTS.includes(ext)) {
        images.push(fullPath);
      }
    }
  }
  return images;
}

async function convertImage(srcPath) {
  const ext = path.extname(srcPath);
  const destPath = srcPath.slice(0, -ext.length) + '.webp';

  try {
    const origStat = fs.statSync(srcPath);
    const origSize = origStat.size;

    const metadata = await sharp(srcPath).metadata();
    const isPhoto = srcPath.includes('photos') || /photo|blog|hero|service|client|image\d?\.jpe?g/i.test(srcPath);
    const hasAlpha = metadata.hasAlpha;

    const maxDim = hasAlpha && !isPhoto ? 2400 : 1920;

    let pipeline = sharp(srcPath);

    if (metadata.width > maxDim || metadata.height > maxDim) {
      pipeline = pipeline.resize(maxDim, maxDim, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    let webpOptions = {
      effort: 6
    };

    if (hasAlpha) {
      webpOptions.quality = 90;
      webpOptions.alphaQuality = 100;
    } else {
      webpOptions.quality = 82;
    }

    pipeline = pipeline.webp(webpOptions);

    await pipeline.toFile(destPath);
    const newStat = fs.statSync(destPath);
    const newSize = newStat.size;
    const savedBytes = origSize - newSize;
    const pct = ((savedBytes / origSize) * 100).toFixed(1);

    return {
      src: srcPath,
      dest: destPath,
      origSize,
      newSize,
      savedBytes,
      pct,
      success: true
    };
  } catch (err) {
    return {
      src: srcPath,
      dest: destPath,
      error: err.message,
      success: false
    };
  }
}

async function main() {
  console.log('--- Starting WebP Conversion ---');
  let allImages = [];

  for (const dir of TARGET_DIRS) {
    const imgs = await getImagesInDir(dir, dir !== 'public');
    allImages = allImages.concat(imgs);
  }

  // Remove duplicates if any
  allImages = Array.from(new Set(allImages));
  console.log(`Found ${allImages.length} images to convert.\n`);

  let successCount = 0;
  let failCount = 0;
  let totalOrigBytes = 0;
  let totalNewBytes = 0;

  for (let i = 0; i < allImages.length; i++) {
    const imgPath = allImages[i];
    process.stdout.write(`[${i + 1}/${allImages.length}] Converting ${imgPath}... `);
    const res = await convertImage(imgPath);
    if (res.success) {
      successCount++;
      totalOrigBytes += res.origSize;
      totalNewBytes += res.newSize;
      console.log(`OK: ${(res.origSize / 1024).toFixed(0)}KB -> ${(res.newSize / 1024).toFixed(0)}KB (-${res.pct}%)`);
    } else {
      failCount++;
      console.log(`FAILED: ${res.error}`);
    }
  }

  const savedTotal = totalOrigBytes - totalNewBytes;
  const totalPct = ((savedTotal / totalOrigBytes) * 100).toFixed(1);

  console.log('\n========================================');
  console.log('Conversion Complete Summary:');
  console.log(`Successfully converted: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Original total size: ${(totalOrigBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total size: ${(totalNewBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total space saved: ${(savedTotal / 1024 / 1024).toFixed(2)} MB (${totalPct}% reduction)`);
  console.log('========================================\n');
}

main().catch(err => {
  console.error('Fatal error during conversion:', err);
  process.exit(1);
});
