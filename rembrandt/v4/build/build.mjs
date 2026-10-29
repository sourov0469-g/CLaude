// Rembrandt v4 build (reconstructed in Run D). Writes site/index.html, site/versions.html, site/css/*.css and site/js/*.js
// from site/src/, fills the build placeholders from build/generated/ (recovered by recover-generated.mjs), and prints a
// size report. Run: `node build.mjs` (needs esbuild: ESBUILD=/path/to/esbuild or `npm i esbuild` next to this file).
// `node build.mjs --check` rebuilds into memory and reports any output that differs from what is on disk.
import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process'; import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(here, '../../site');
const SRC = path.join(SITE, 'src'), GEN = path.join(here, 'generated');
const CHECK = process.argv.includes('--check');
const ESBUILD = process.env.ESBUILD || [path.join(here, 'node_modules/.bin/esbuild'), 'esbuild'].find(p => p === 'esbuild' || fs.existsSync(p));

// the site's CSS minifier: comments out, lines trimmed and joined, child combinators and last semicolons tightened.
// Deliberately light: it keeps rgb(r g b / a) and quoted family names exactly as written.
const minCss = s => s.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').map(l => l.trim()).filter(Boolean).join('').replace(/ > /g, '>').replace(/;}/g, '}');
// the HTML pass: comments out (placeholders kept until filled), leading whitespace stripped, empty lines dropped
const stripHtml = s => s.replace(/<!--(?![A-Z_]+-->)[\s\S]*?-->/g, '').split('\n').map(l => l.replace(/^\s+/, '')).filter(l => l !== '').join('\n');
const gen = {};
for (const f of fs.readdirSync(GEN)) if (f.endsWith('.html')) gen[path.basename(f, '.html')] = fs.readFileSync(path.join(GEN, f), 'utf8');
const fill = (s, extra = {}) => s.replace(/<!--([A-Z_]+)-->/g, (m, k) => { const v = extra[k] ?? gen[k]; if (v == null) throw new Error('no fragment for ' + k); return v; });
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');

const out = {};
// CSS: the critical block is inlined in the page (asset URLs rebased from css/ to the page), the rest is css/site.css
const css = read('site.css'), cut = css.indexOf('/* @critical-end */');
if (cut < 0) throw new Error('site.css: no @critical-end marker');
const critical = minCss(css.slice(0, cut)).replace(/\.\.\/assets\//g, 'assets/');
out['css/site.css'] = minCss(css.slice(cut));
const { ORDER } = await import(path.join(SRC, 'versions/order.js'));
const vcss = ['core', ...ORDER, 'storm-mode'].filter(k => fs.existsSync(path.join(SRC, 'versions', k + '.css')));
out['css/versions.css'] = minCss(vcss.map(k => read(`versions/${k}.css`)).join('\n'));

// HTML
out['index.html'] = fill(stripHtml(read('index.html')), { CRITICAL_CSS: critical }) + '\n';
out['versions.html'] = fill(stripHtml(ORDER.filter(k => fs.existsSync(path.join(SRC, 'versions', k + '.html'))).map(k => read(`versions/${k}.html`)).join(''))) + '\n';

// JS (esbuild): app.js is a deferred classic script, lamp.js an ES module, versions/ one bundled ES module
const esb = (entry, args) => execFileSync(ESBUILD, [path.join(SRC, entry), '--minify', '--log-level=error', ...args], { encoding: 'utf8', maxBuffer: 1 << 26 });
out['js/app.js'] = esb('app.js', []);
out['js/lamp.js'] = esb('lamp.js', ['--format=esm']);
out['js/versions.js'] = esb('versions/index.js', ['--bundle', '--format=esm']);

// gates and report
const gz = s => zlib.gzipSync(Buffer.from(s), { level: 9 }).length;
const kb = n => (n / 1024).toFixed(1) + ' KB';
const fails = [];
if (Buffer.byteLength(critical) > 14 * 1024) fails.push(`critical CSS ${kb(Buffer.byteLength(critical))} > 14 KB`);
if (gz(out['index.html']) > 60 * 1024) fails.push(`index.html ${kb(gz(out['index.html']))} gzip > 60 KB`);
if (gz(out['js/app.js']) > 35 * 1024) fails.push(`app.js ${kb(gz(out['js/app.js']))} gzip > 35 KB`);
if (gz(out['js/lamp.js']) > 8 * 1024) fails.push(`lamp.js ${kb(gz(out['js/lamp.js']))} gzip > 8 KB`);
let diff = 0;
for (const [f, s] of Object.entries(out)) {
  const p = path.join(SITE, f), before = fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null, same = before === s;
  if (!same) diff++;
  if (!CHECK && !same) fs.writeFileSync(p, s);
  console.log(f.padEnd(18), String(Buffer.byteLength(s)).padStart(7), 'B', kb(gz(s)).padStart(9), 'gzip', same ? '' : CHECK ? '  DIFFERS from disk' : '  written');
}
console.log('critical CSS'.padEnd(18), String(Buffer.byteLength(critical)).padStart(7), 'B (inline, budget 14 KB)');
if (CHECK) console.log(diff ? `${diff} output(s) differ from disk` : 'all outputs identical to disk');
if (fails.length) { console.error('BUDGET FAIL:\n  ' + fails.join('\n  ')); process.exit(1); }
