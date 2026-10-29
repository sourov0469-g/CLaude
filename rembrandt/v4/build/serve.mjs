// Local test server: `node serve.mjs [port]`. Serves site/ gzipped like a production host.
// The graded photos and the fonts are not in this repository (17 MB of variants). For any missing image under
// assets/img/ the server answers with a labelled SVG stand-in at the file's real proportions (taken from the width and
// height attributes of the <img> that uses it, and the width in its filename), so layout, image decode and no-jump
// checks behave as they would with the real files. Missing fonts 404 and the metric-matched fallbacks take over.
// Every stand-in served is counted at GET /__standins.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(here, '../../site');
const port = +(process.argv[2] || 8766);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

// proportions per image base name, from every <img>/<source> in the shipped pages
const ratio = {};
for (const page of ['index.html', 'versions.html']) {
  const html = fs.readFileSync(path.join(SITE, page), 'utf8');
  for (const pic of html.matchAll(/<picture[\s\S]*?<\/picture>|<img\b[^>]*>/g)) {
    const img = pic[0].match(/<img\b[^>]*>/)?.[0] || '';
    const w = +(img.match(/\bwidth="(\d+)"/) || [])[1], h = +(img.match(/\bheight="(\d+)"/) || [])[1];
    if (!w || !h) continue;
    for (const u of pic[0].matchAll(/assets\/img\/([a-z0-9-]+?)(?:-\d{3,4})?\.(?:avif|webp|jpe?g|png)/g)) ratio[u[1]] ??= w / h;
  }
}
const DEFAULT = { night: 16 / 9, 'macro-height': 1, macro: 16 / 10, 'paper-lit': 1, paper: 1, og: 1200 / 630 };
const standins = new Map();
function standin(rel) {
  const name = path.basename(rel).replace(/\.[a-z0-9]+$/, '');
  const m = name.match(/^(.*?)(?:-(\d{3,4}))?$/), base = m[1], w = +(m[2] || 1200);
  const r = ratio[base] || Object.entries(DEFAULT).find(([k]) => base.startsWith(k))?.[1] || 3 / 2;
  const h = Math.round(w / r);
  const dark = /night|storm|macro|hero|dusk|age|house|stain/.test(base), paper = /paper|tooth/.test(base);
  const a = paper ? '#e6e2dc' : dark ? '#4a3d33' : '#9a9088', b = paper ? '#ddd8d1' : dark ? '#1f1813' : '#5d5650';
  const fs2 = Math.max(12, Math.round(w / 40));
  standins.set(rel, (standins.get(rel) || 0) + 1);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/>${paper ? '' : `<text x="${fs2}" y="${h - fs2}" font-family="system-ui,sans-serif" font-size="${fs2}" fill="#fff" fill-opacity=".55">stand-in: ${base}</text>`}</svg>`;
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__standins') { res.writeHead(200, { 'content-type': 'application/json' }); return res.end(JSON.stringify(Object.fromEntries(standins))); }
  let rel = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
  if (rel.endsWith('/')) rel += 'index.html';
  const file = path.join(SITE, rel);
  if (!file.startsWith(SITE)) { res.writeHead(403); return res.end(); }
  let body, type = TYPES[path.extname(rel)] || 'application/octet-stream';
  if (fs.existsSync(file) && fs.statSync(file).isFile()) body = fs.readFileSync(file);
  else if (/^assets\/img\/.+\.(avif|webp|jpe?g|png)$/.test(rel)) { body = Buffer.from(standin(rel)); type = TYPES['.svg']; }
  else { res.writeHead(404, { 'content-type': 'text/plain' }); return res.end('not found'); }
  const head = { 'content-type': type, 'cache-control': 'no-cache' };
  if (/text|javascript|json|svg/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '')) { body = zlib.gzipSync(body); head['content-encoding'] = 'gzip'; }
  res.writeHead(200, head); res.end(body);
}).listen(port, () => console.log(`serving ${SITE} on http://localhost:${port}`));
