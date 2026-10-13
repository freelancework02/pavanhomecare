const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/about',
  'http://localhost:3000/services',
  'http://localhost:3000/areas-we-serve',
  'http://localhost:3000/areas-we-serve/bucks',
  'http://localhost:3000/areas-we-serve/bucks-county',
  'http://localhost:3000/areas-we-serve/philadelphia',
  'http://localhost:3000/blog',
  'http://localhost:3000/blog/paid-family-caregiver-pa',
  'http://localhost:3000/blog/hospital-to-home-transition-guide-pa',
  'http://localhost:3000/contact-us',
  'http://localhost:3000/privacy-policy',
  'http://localhost:3000/terms-conditions'
];

async function auditPage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { url, error: `Status ${res.status}` };
    }
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const description = descMatch ? descMatch[1].trim() : null;

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : null;

    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
    const ogImage = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);

    // Collect internal links to test
    const internalLinks = [];
    const linkRegex = /href=["'](\/[^"'#?]*)/g;
    let m;
    while ((m = linkRegex.exec(html)) !== null) {
      if (!m[1].startsWith('/_next') && !m[1].startsWith('/api')) {
        internalLinks.push(m[1]);
      }
    }

    return {
      url: url.replace('http://localhost:3000', '') || '/',
      status: res.status,
      title: title || 'MISSING',
      titleLength: title ? title.length : 0,
      description: description || 'MISSING',
      descLength: description ? description.length : 0,
      canonical: canonical || 'MISSING',
      h1Count: h1Matches.length,
      hasOgTitle: !!ogTitle,
      hasOgImage: !!ogImage,
      linksSample: Array.from(new Set(internalLinks)).slice(0, 5)
    };
  } catch (e) {
    return { url, error: e.message };
  }
}

async function run() {
  console.log('AUDITING SEO AND HEADERS ACROSS PAGES...\n');
  const results = [];
  for (const u of urls) {
    const r = await auditPage(u);
    results.push(r);
  }

  for (const r of results) {
    console.log(`PAGE: ${r.url}`);
    if (r.error) {
      console.log(`  ERROR: ${r.error}`);
      continue;
    }
    console.log(`  Title: ${r.title.slice(0, 60)}... (${r.titleLength} chars)`);
    console.log(`  Meta Desc: ${r.description.slice(0, 60)}... (${r.descLength} chars)`);
    console.log(`  Canonical: ${r.canonical}`);
    console.log(`  H1 count: ${r.h1Count}`);
    console.log(`  OG tags: Title=${r.hasOgTitle}, Image=${r.hasOgImage}`);
    if (r.h1Count !== 1) console.log(`  [ALERT] H1 count is ${r.h1Count} (recommended: exactly 1)`);
    if (r.title === 'MISSING') console.log(`  [ALERT] Title tag is missing!`);
    if (r.description === 'MISSING') console.log(`  [ALERT] Description meta is missing!`);
    console.log('');
  }
}
run();
