const fs = require('fs');
const { execSync } = require('child_process');

const CHROME_PATH = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';

const pages = [
  { name: 'Homepage', url: 'http://localhost:3000/' },
  { name: 'About Us', url: 'http://localhost:3000/about' },
  { name: 'Services', url: 'http://localhost:3000/services' },
  { name: 'Areas We Serve (Bucks)', url: 'http://localhost:3000/areas-we-serve/bucks' },
  { name: 'Blog', url: 'http://localhost:3000/blog' },
  { name: 'Contact Us', url: 'http://localhost:3000/contact-us' }
];

console.log('====================================================');
console.log('  LIVE GOOGLE CHROME BROWSER WEBP VERIFICATION AUDIT');
console.log('====================================================\n');

let totalImagesFound = 0;
let totalNonWebp = 0;

pages.forEach(page => {
  console.log(`Auditing ${page.name} (${page.url}) in Chrome...`);
  try {
    const stdout = execSync(`${CHROME_PATH} --headless --disable-gpu --virtual-time-budget=5000 --dump-dom "${page.url}"`, {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024
    });

    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    const pageImages = [];

    while ((match = imgRegex.exec(stdout)) !== null) {
      const src = match[1];
      const decoded = decodeURIComponent(src);
      pageImages.push(decoded);
    }

    console.log(`  Found ${pageImages.length} <img> tags in rendered DOM.`);

    const nonWebp = [];
    const webpImages = [];

    pageImages.forEach(src => {
      totalImagesFound++;
      if (src.includes('.webp') || src.includes('format=webp')) {
        webpImages.push(src);
      } else if (src.startsWith('data:image')) {
        webpImages.push('(inline data/svg)');
      } else {
        nonWebp.push(src);
        totalNonWebp++;
      }
    });

    console.log(`  - WebP images: ${webpImages.length}`);
    if (nonWebp.length > 0) {
      console.log(`  - NON-WEBP IMAGES FOUND: ${nonWebp.length}`);
      nonWebp.forEach(s => console.log(`      * ${s}`));
    } else {
      console.log(`  - Non-WebP images: 0 (100% WebP!)\n`);
    }

    // Print sample of images
    console.log('    Sample rendered image URLs:');
    webpImages.slice(0, 5).forEach((img, i) => {
      console.log(`      ${i + 1}. ${img}`);
    });
    console.log('');
  } catch (err) {
    console.error(`  Error dumping DOM for ${page.url}:`, err.message);
  }
});

console.log('====================================================');
console.log('AUDIT SUMMARY ACROSS ALL AUDITED PAGES:');
console.log(`Total <img> tags inspected across browser pages: ${totalImagesFound}`);
console.log(`Total Non-WebP images: ${totalNonWebp}`);
if (totalNonWebp === 0) {
  console.log('RESULT: 100% OF ALL IMAGES ARE USING WEBP FORMAT!');
} else {
  console.log(`RESULT: Found ${totalNonWebp} non-webp images that need attention.`);
}
console.log('====================================================\n');
