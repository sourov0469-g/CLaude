// One-file preview of the homepage (BUILD-NOTE A1): `node standalone.mjs [out.html]`, default ../../homepage-standalone.html.
// Everything the page loads is inside the file: critical and full CSS, the versions CSS, GSAP, the app, the WebGL lamp,
// the switcher with all 32 alternate templates, the town data, the fonts, the ply drawings and the favicon.
// It opens from disk (file://) with no server. The graded photographs are not in this repository, so every photo is a
// labelled placeholder at its real proportions (standins.mjs). Run build.mjs first; this reads the built site/.
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { execFileSync } from 'node:child_process'; import { fileURLToPath } from 'node:url';
import { loadRatios, standinSvg } from './standins.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(here, '../../site');
const OUT = path.resolve(process.argv[2] || path.join(SITE, '..', 'homepage-standalone.html'));
const ESBUILD = process.env.ESBUILD || [path.join(here, 'node_modules/.bin/esbuild'), 'esbuild'].find(p => p === 'esbuild' || fs.existsSync(p));
const read = f => fs.readFileSync(path.join(SITE, f), 'utf8');
// replace exactly once, or stop: a source change must never slip through as a silently broken preview
const patch = (s, a, b, label) => { const n = s.split(a).length - 1; if (n !== 1) throw new Error(`${label}: expected 1 match, found ${n}`); return s.replace(a, () => b); };

// ---------- patched copies of the sources: module loads, data and runtime-built image paths resolve from inside the page
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rr-standalone-'));
try {
  fs.cpSync(path.join(SITE, 'src'), tmp, { recursive: true });
  let app = fs.readFileSync(path.join(tmp, 'app.js'), 'utf8');
  app = patch(app, "import('./lamp.js')", 'Promise.resolve(window.__lampMod)', 'app: lamp import');
  app = patch(app, "import('./versions.js')", 'Promise.resolve().then(() => window.__versionsBoot())', 'app: versions import');
  app = patch(app, "fetch('assets/data/zips.json').then(r => r.json())", 'Promise.resolve(window.__DATA.zips)', 'app: zips');
  app = patch(app, "fetch('assets/data/towns.json').then(r => r.json())", 'Promise.resolve(window.__DATA.towns)', 'app: towns');
  app = patch(app, 'new URL(`assets/img/paper-lit-${k}.webp`, location.href)', 'window.__img(`assets/img/paper-lit-${k}.webp`)', 'app: paper tooth');
  fs.writeFileSync(path.join(tmp, 'app.js'), app);
  const vi = path.join(tmp, 'versions/index.js'); let idx = fs.readFileSync(vi, 'utf8');
  idx = patch(idx, idx.match(/const cssReady = new Promise\([^\n]*\n/)?.[0] ?? '<none>', 'const cssReady = Promise.resolve(); // versions CSS is inline\n', 'versions: css');
  idx = patch(idx, idx.match(/if \(!tplDoc\) \{ const html = await fetch\([^\n]*\n/)?.[0] ?? '<none>', 'if (!tplDoc) tplDoc = d; // the templates are inline <template>s\n', 'versions: templates');
  if (/import\.meta/.test(idx)) throw new Error('versions: import.meta still used');
  fs.writeFileSync(vi, idx);
  const ij = path.join(tmp, 'versions/install.js'); let inst = fs.readFileSync(ij, 'utf8');
  inst = patch(inst, 'FRAMES.map(f => `assets/img/${f[0]}-${w}.webp`)', 'FRAMES.map(f => window.__img(`assets/img/${f[0]}-${w}.webp`))', 'install: frames');
  if (!inst.includes('? 1600 : 1080')) throw new Error('install: frame widths changed');
  const frames = [...inst.matchAll(/\['(install-\d)'/g)].map(m => m[1]);
  fs.writeFileSync(ij, inst);

  const esb = (entry, args) => execFileSync(ESBUILD, [path.join(tmp, entry), '--minify', '--log-level=error', ...args], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const appJs = esb('app.js', []);
  const lampJs = esb('lamp.js', ['--format=iife', '--global-name=__lampMod']);
  const versionsJs = 'window.__versionsBoot=function(){' + esb('versions/index.js', ['--bundle', '--format=iife']) + '};';

  // ---------- assets as data URIs
  const ratio = loadRatios(SITE), cache = new Map(), counts = { real: 0, placeholder: 0 };
  const uri = rel => {
    if (cache.has(rel)) return cache.get(rel);
    const file = path.join(SITE, rel); let u;
    if (fs.existsSync(file)) { const t = { '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png' }[path.extname(rel)]; u = `data:${t};base64,${fs.readFileSync(file).toString('base64')}`; counts.real++; }
    else if (/^assets\/img\//.test(rel)) { u = 'data:image/svg+xml;base64,' + Buffer.from(standinSvg(rel, ratio)).toString('base64'); counts.placeholder++; }
    else throw new Error('missing asset ' + rel);
    cache.set(rel, u); return u;
  };
  const ASSET = /assets\/(?:img|svg|fonts)\/[A-Za-z0-9._-]+\.(?:avif|webp|jpe?g|png|svg|woff2)/g;
  const inline = s => s.replace(ASSET, uri);
  const dynamic = {}; // paths the scripts build at run time
  for (let k = 0; k < 5; k++) dynamic[`assets/img/paper-lit-${k}.webp`] = uri(`assets/img/paper-lit-${k}.webp`);
  for (const f of frames) for (const w of [1080, 1600]) dynamic[`assets/img/${f}-${w}.webp`] = uri(`assets/img/${f}-${w}.webp`);
  const data = { zips: JSON.parse(read('assets/data/zips.json')), towns: JSON.parse(read('assets/data/towns.json')) };

  // ---------- the page
  let html = read('index.html');
  html = html.replace(/<link rel="preload"[^>]*>\n?/g, ''); // nothing to preload: it is all here
  html = patch(html, '<noscript><link rel="stylesheet" href="css/site.css"></noscript>\n', '', 'page: noscript css');
  html = patch(html, `<link rel="stylesheet" href="css/site.css" media="print" onload="this.media='all'">`, `<style>${read('css/site.css')}</style>\n<style>${read('css/versions.css')}</style>`, 'page: site css');
  html = patch(html, '<script src="js/app.js" defer></script>\n', '', 'page: app script');
  // the map script is left as is: its keys are the paths the scripts ask for
  const scripts = [
    `window.__DATA=${JSON.stringify(data)};window.__IMG=${JSON.stringify(dynamic)};window.__img=function(p){return window.__IMG[p]||p};`,
    read('js/gsap.min.js'), inline(lampJs), inline(versionsJs), inline(appJs)
  ].map(s => `<script>${s.replace(/<\/script/gi, '<\\/script')}</script>`).join('\n');
  html = inline(patch(html, '</body>', `${read('versions.html')}</body>`, 'page: body end'));
  html = patch(html, '</body>', `${scripts}\n</body>`, 'page: scripts');
  const left = html.match(/\s(?:src|srcset|href)="(?!data:|https?:|tel:|sms:|mailto:|#)[^"]+"/g); // markup only: the app's GSAP fallback loader stays, unused
  if (left) throw new Error('unresolved references: ' + [...new Set(left)].slice(0, 5).join(' '));
  html = html.replace('<!doctype html>\n', `<!doctype html>\n<!-- Rembrandt Roofing & Restoration, "In Good Light": one-file preview of the homepage concept, built ${new Date().toISOString().slice(0, 10)} from rembrandt/site by rembrandt/v4/build/standalone.mjs. Photos are placeholders: the graded photographs are not in the repository. Version switcher: 1|2|3 pills, ?v=hero:2, ?clean=1, ?showcase=1, ?storm=1, ?motion=calm. -->\n`);
  fs.writeFileSync(OUT, html);
  console.log(`${path.relative(process.cwd(), OUT)}  ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB  (${counts.real} real assets, ${counts.placeholder} photo placeholders inlined)`);
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }
