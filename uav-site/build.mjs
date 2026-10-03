// Build: node build.mjs
// Outputs:
//   dist/site/...                                   deployable multi-page site (real URLs, no JS needed to navigate)
//   dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html   everything in one double-clickable file
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { site, header, footer, imgManifest, services } from './src/lib/site.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const R = (...p) => path.join(root, ...p);
const dist = R('dist'), siteOut = R('dist', 'site');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(siteOut, { recursive: true });

/* ---------- load pages ---------- */
const pageFiles = ['home', 'services', 'roof-inspections', 'rtk-mapping', '3d-modelling', 'aerial-monitoring', 'aerial-photography-videography', 'process', 'about', 'contact', 'privacy', 'notfound'];
const pages = [];
for (const f of pageFiles) {
  const mod = await import(pathToFileURL(R('src', 'pages', f + '.mjs')).href);
  pages.push(mod.default());
}
const routePages = pages.filter((p) => p.path !== '/404/');

/* ---------- checks ---------- */
const problems = [];
const imgUse = {};
for (const p of pages) for (const m of p.body.matchAll(/\{\{IMG:([\w-]+)\}\}/g)) (imgUse[m[1]] ||= []).push(p.path);
for (const [k, v] of Object.entries(imgUse)) {
  if (!imgManifest[k]) problems.push(`unknown image ${k}`);
  if (v.length > 1) problems.push(`image ${k} used ${v.length}x: ${v.join(', ')}`);
}
for (const k of Object.keys(imgManifest)) if (!k.startsWith('_') && !imgUse[k]) problems.push(`image ${k} is not used anywhere`);
const srcSeen = {};
for (const [k, v] of Object.entries(JSON.parse(fs.readFileSync(R('tools', 'images.json'), 'utf8')))) (srcSeen[v.src] ||= []).push(k);
for (const [s, ks] of Object.entries(srcSeen)) if (ks.length > 1) problems.push(`source ${s} reused by ${ks.join(', ')}`);

const idsByPath = {};
const fullHtml = (p) => header() + p.body + footer();
for (const p of pages) {
  const html = fullHtml(p);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set();
  for (const id of ids) { if (seen.has(id)) problems.push(`${p.path}: duplicate id ${id}`); seen.add(id); }
  idsByPath[p.path] = seen;
  if (!/<h1[\s>]/.test(p.body)) problems.push(`${p.path}: no h1`);
  if ((p.body.match(/<h1[\s>]/g) || []).length > 1) problems.push(`${p.path}: more than one h1`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) problems.push(`${p.path}: img without alt`);
  if (/\b(TODO|FIXME|lorem|placeholder|TBC|TBD|coming soon|dummy|your text|image here)\b/i.test(p.body.replace(/placeholder="[^"]*"/g, ''))) problems.push(`${p.path}: unfinished-content word found`);
}
const routeSet = new Set(routePages.map((p) => p.path));
for (const p of pages) {
  const html = fullHtml(p);
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const h = m[1];
    if (h === '' || h === '#') { problems.push(`${p.path}: empty href`); continue; }
    if (/^(https?:|mailto:|tel:)/.test(h)) continue;
    if (h === '#main') continue;
    let [pth, anchor] = h.split('#'); pth = pth.split('?')[0];
    if (h.startsWith('#')) { if (!idsByPath[p.path].has(h.slice(1))) problems.push(`${p.path}: broken in-page anchor ${h}`); continue; }
    if (!routeSet.has(pth)) problems.push(`${p.path}: link to unknown route ${h}`);
    else if (anchor && !idsByPath[pth].has(anchor)) problems.push(`${p.path}: link ${h} targets a missing id`);
  }
}

/* ---------- shared pieces ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const attrText = (s) => esc(s.replace(/&amp;/g, '&'));
const cssRaw = fs.readFileSync(R('src', 'css', 'site.css'), 'utf8');
const jsSite = fs.readFileSync(R('src', 'js', 'site.js'), 'utf8');
const jsRouter = fs.readFileSync(R('src', 'js', 'router.js'), 'utf8');
const ldJson = (items) => items.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
const ogImage = site.origin + '/assets/og/home.jpg';
const markCurrent = (html, pth) => html.replace(/(<a [^>]*?data-nav="([^"]+)")/g, (m, a, n) => (n === pth ? a + ' aria-current="page"' : m));
const inertable = (html) => html.replace('<header class="site-header" data-header>', '<header class="site-header" data-header data-inertable>').replace('<footer class="site-footer">', '<footer class="site-footer" data-inertable>');

const metaTags = (p) => {
  const url = site.origin + p.path, t = attrText(p.title), d = attrText(p.description);
  return `<meta name="description" content="${d}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${site.name}"><meta property="og:locale" content="en_GB">
<meta property="og:title" content="${t}"><meta property="og:description" content="${d}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="UAV Aerial Solutions: drone roof inspections, mapping and 3D modelling in Cheshire">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${t}"><meta name="twitter:description" content="${d}"><meta name="twitter:image" content="${ogImage}">`;
};

/* ---------- 1. deployable site ---------- */
const assets = path.join(siteOut, 'assets');
for (const d of ['css', 'js', 'img', 'fonts', 'og']) fs.mkdirSync(path.join(assets, d), { recursive: true });
const used = new Set([...Object.keys(imgUse)]);
for (const k of used) fs.copyFileSync(R('src', 'img', 'out', imgManifest[k].file), path.join(assets, 'img', imgManifest[k].file));
for (const f of ['logo.webp', 'logo.png', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png']) fs.copyFileSync(R('src', 'img', 'out', f), path.join(assets, 'img', f));
fs.copyFileSync(R('src', 'img', 'out', 'og-home.jpg'), path.join(assets, 'og', 'home.jpg'));
for (const f of fs.readdirSync(R('src', 'fonts'))) fs.copyFileSync(R('src', 'fonts', f), path.join(assets, 'fonts', f));
fs.writeFileSync(path.join(assets, 'css', 'site.css'), cssRaw.replace(/\{\{FONT:([^}]+)\}\}/g, '../fonts/$1'));
fs.writeFileSync(path.join(assets, 'js', 'site.js'), jsSite);

const deployUrl = (html) => html.replace(/\{\{IMG:([\w-]+)\}\}/g, (m, k) => '/assets/img/' + imgManifest[k].file);

function deployDoc(p) {
  const bodyHtml = inertable(markCurrent(deployUrl(header()), p.path)) + `\n<div class="page">\n<main id="main" tabindex="-1" data-inertable>\n${deployUrl(p.body)}\n</main>\n${inertable(deployUrl(footer()))}\n</div>`;
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${attrText(p.title).replace(/&quot;/g, '"')}</title>
${metaTags(p)}
<meta name="robots" content="${p.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
<meta name="theme-color" content="#FAF9F6">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preload" href="/assets/fonts/manrope-400-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
${ldJson(p.jsonld || [])}
</head>
<body>
${bodyHtml}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}
for (const p of pages) {
  if (p.path === '/404/') { fs.writeFileSync(path.join(siteOut, '404.html'), deployDoc(p)); continue; }
  const dir = p.path === '/' ? siteOut : path.join(siteOut, p.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), deployDoc(p));
}
fs.writeFileSync(path.join(siteOut, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(siteOut, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routePages.map((p) => `  <url><loc>${site.origin}${p.path}</loc><lastmod>${site.updated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(siteOut, 'manifest.webmanifest'), JSON.stringify({ name: site.name, short_name: 'UAV Aerial', description: 'Drone roof inspections, mapping, 3D modelling and monitoring in Cheshire.', start_url: '/', display: 'browser', background_color: '#FAF9F6', theme_color: '#FAF9F6', lang: 'en-GB', icons: [{ src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }] }, null, 2));
fs.writeFileSync(path.join(siteOut, 'favicon.ico'), fs.readFileSync(R('src', 'img', 'out', 'favicon-32.png')));

/* ---------- 2. single-file edition ---------- */
const b64 = (file, mime) => `data:${mime};base64,` + fs.readFileSync(file).toString('base64');
const imgData = {};
const dataUri = (k) => (imgData[k] ||= b64(R('src', 'img', 'out', imgManifest[k].file), 'image/webp'));
const toSingle = (html, route) =>
  html
    .replace(/\{\{IMG:([\w-]+)\}\}/g, (m, k) => dataUri(k))
    .replace(/href="\/([^"]*)"/g, (m, r) => `href="#/${r}"`)
    .replace(/href="#(?!\/)([^"]+)"/g, (m, a) => (a === 'main' ? m : `href="#${route}#${a}"`));
const fontCss = cssRaw.replace(/\{\{FONT:([^}]+)\}\}/g, (m, f) => b64(R('src', 'fonts', f), 'font/woff2'));
const home = pages.find((p) => p.path === '/');
const templates = pages
  .map((p) => {
    const canon = p.path === '/404/' ? site.origin + '/' : site.origin + p.path;
    return `<template data-route="${p.path}" data-title="${attrText(p.title)}" data-desc="${attrText(p.description)}" data-canonical="${canon}">${p.jsonld && p.jsonld.length ? `<script type="application/ld+json">${JSON.stringify(p.jsonld.length === 1 ? p.jsonld[0] : { '@context': 'https://schema.org', '@graph': p.jsonld.map((o) => { const c = { ...o }; delete c['@context']; return c; }) })}</script>` : ''}${toSingle(p.body, p.path)}</template>`;
  })
  .join('\n');
const singleHeader = inertable(toSingle(header(), '/'));
const singleFooter = inertable(toSingle(footer(), '/'));
const single = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${attrText(home.title)}</title>
${metaTags(home)}
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#FAF9F6">
<link rel="icon" type="image/png" sizes="32x32" href="${b64(R('src', 'img', 'out', 'favicon-32.png'), 'image/png')}">
<script type="application/ld+json" id="ld">${JSON.stringify(home.jsonld.length === 1 ? home.jsonld[0] : { '@context': 'https://schema.org', '@graph': home.jsonld.map((o) => { const c = { ...o }; delete c['@context']; return c; }) })}</script>
<style>
${fontCss}
</style>
</head>
<body>
${singleHeader}
<div class="page">
<main id="main" tabindex="-1" data-inertable></main>
${singleFooter}
</div>
<div id="route-announcer" role="status" aria-live="polite"></div>
<noscript><p style="padding:24px;font:16px/1.5 system-ui,sans-serif">This single-file edition of the website needs JavaScript to switch between pages. The deployable version works without it.</p></noscript>
${templates}
<script>window.UAV={single:true,query:''};</script>
<script>
${jsSite}
</script>
<script>
${jsRouter}
</script>
</body>
</html>
`;
fs.writeFileSync(path.join(dist, 'UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html'), single);

/* ---------- report ---------- */
const kb = (n) => Math.round(n / 1024) + ' KB';
console.log('Pages:', pages.length, '| images used:', used.size);
console.log('Single file:', kb(fs.statSync(path.join(dist, 'UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html')).size));
let total = 0; (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) f.isDirectory() ? walk(path.join(d, f.name)) : (total += fs.statSync(path.join(d, f.name)).size); })(siteOut);
console.log('Deploy package:', kb(total));
if (problems.length) { console.log('\nPROBLEMS (' + problems.length + '):'); problems.forEach((x) => console.log(' -', x)); process.exitCode = 1; } else console.log('Checks: all passed');

/* ---------- deploy notes + zip ---------- */
import { execSync } from 'node:child_process';
fs.writeFileSync(path.join(siteOut, 'DEPLOY.txt'), `UAV Aerial Solutions: deployable site
=====================================
Upload the CONTENTS of this folder to the root of the website (https://www.uavaerialsolutions.co.uk/).
Every page is a real URL (for example /services/roof-inspections/index.html) and works without JavaScript.
No build step, no third-party requests, no cookies.

Files: index.html, /services/*, /process-deliverables/, /about/, /contact/, /privacy-cookies/, 404.html,
sitemap.xml, robots.txt, manifest.webmanifest, /assets (css, js, fonts, images).
Configure the host to serve 404.html for unknown addresses.
`);
try {
  execSync(`cd "${siteOut}" && rm -f ../UAV_AERIAL_SOLUTIONS_deploy-package.zip && zip -qr ../UAV_AERIAL_SOLUTIONS_deploy-package.zip .`);
  console.log('Zip:', kb(fs.statSync(path.join(dist, 'UAV_AERIAL_SOLUTIONS_deploy-package.zip')).size));
} catch (e) { console.log('zip skipped:', e.message.split('\n')[0]); }
