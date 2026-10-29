// Local test server: `node serve.mjs [port]`. Serves site/ gzipped like a production host.
// The graded photos are not in this repository: any missing image under assets/img/ is answered with a stand-in at
// its real proportions (standins.mjs). Every stand-in served is counted at GET /__standins.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib'; import { fileURLToPath } from 'node:url';
import { loadRatios, standinSvg } from './standins.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(here, '../../site');
const port = +(process.argv[2] || 8766);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };

const ratio = loadRatios(SITE), standins = new Map();
const standin = rel => { standins.set(rel, (standins.get(rel) || 0) + 1); return standinSvg(rel, ratio); };

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
