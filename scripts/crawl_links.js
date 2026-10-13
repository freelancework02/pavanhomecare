const baseUrl = 'http://localhost:3000';
const visited = new Set();
const queue = ['/'];
const errors = [];
const checkedLinks = new Map();

async function crawl() {
  console.log('STARTING SITE-WIDE LINK CRAWLER...');
  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (visited.has(currentPath)) continue;
    visited.add(currentPath);

    try {
      const res = await fetch(`${baseUrl}${currentPath}`);
      checkedLinks.set(currentPath, res.status);
      if (res.status >= 400) {
        errors.push({ path: currentPath, status: res.status });
        console.log(`[FAIL ${res.status}] ${currentPath}`);
        continue;
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('text/html')) continue;

      const html = await res.text();
      const hrefRegex = /href=["']([^"'#\s]+)["']/gi;
      let match;
      while ((match = hrefRegex.exec(html)) !== null) {
        let href = match[1];
        if (href.startsWith('http://localhost:3000')) {
          href = href.replace('http://localhost:3000', '');
        } else if (href.startsWith('https://pavanhomecare.com')) {
          href = href.replace('https://pavanhomecare.com', '');
        }
        if (
          href.startsWith('/') &&
          !href.startsWith('/_next') &&
          !href.startsWith('/api') &&
          !href.endsWith('.pdf') &&
          !href.endsWith('.zip')
        ) {
          if (!visited.has(href) && !queue.includes(href)) {
            queue.push(href);
          }
        }
      }
    } catch (err) {
      errors.push({ path: currentPath, error: err.message });
      console.log(`[ERR] ${currentPath}: ${err.message}`);
    }
  }

  console.log(`\nCRAWL COMPLETE! Checked ${visited.size} internal pages/links.`);
  console.log(`Broken links found: ${errors.length}`);
  if (errors.length > 0) {
    errors.forEach(e => console.log(` - ${e.path} (${e.status || e.error})`));
  } else {
    console.log('ALL INTERNAL LINKS ARE VALID (STATUS 200)!');
  }
}

crawl();
