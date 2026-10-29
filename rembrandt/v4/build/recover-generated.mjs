// One-time recovery (Run D): the original generators for the build placeholders (rings SVG, ply SVGs, seal,
// town lists, credits, JSON-LD, receipt...) were not carried into this repository. Their output is still inside the
// shipped site/index.html and site/versions.html, so this script cuts each fragment back out, aligned against src/,
// and saves it to build/generated/<NAME>.html. build.mjs then fills the placeholders from those files.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SITE || path.resolve(here, '../../site');
const OUT = path.join(here, 'generated'); fs.mkdirSync(OUT, { recursive: true });
// the build's HTML pass: drop comments (not placeholders), strip leading whitespace, drop empty lines
export const strip = s => s.replace(/<!--(?![A-Z_]+-->)[\s\S]*?-->/g, '').split('\n').map(l => l.replace(/^\s+/, '')).filter(l => l !== '').join('\n');
const PH = /<!--([A-Z_]+)-->/g;

function recover(srcText, built, label) {
  const parts = strip(srcText).split(PH); // [text, NAME, text, NAME, ...]
  let at = 0; const got = {};
  if (!built.startsWith(parts[0].slice(0, 200))) throw new Error(label + ': head does not align');
  at = parts[0].length;
  for (let i = 1; i < parts.length; i += 2) {
    const name = parts[i], next = parts[i + 1];
    const probe = next.slice(0, Math.min(next.length, 120));
    const end = probe ? built.indexOf(probe, at) : built.length;
    if (end < 0) throw new Error(`${label}: cannot align after ${name}`);
    const frag = built.slice(at, end);
    if (got[name] != null && got[name] !== frag) throw new Error(`${label}: ${name} differs between uses`);
    got[name] = frag; at = end + next.length;
  }
  return got;
}
const vsrc = fs.readdirSync(path.join(SITE, 'src/versions')).filter(f => f.endsWith('.html'));
const order = (await import(path.join(SITE, 'src/versions/order.js'))).ORDER;
const vtext = order.filter(k => vsrc.includes(k + '.html')).map(k => fs.readFileSync(path.join(SITE, 'src/versions', k + '.html'), 'utf8')).join('');
const all = { ...recover(fs.readFileSync(path.join(SITE, 'src/index.html'), 'utf8'), fs.readFileSync(path.join(SITE, 'index.html'), 'utf8'), 'index'),
  ...recover(vtext, fs.readFileSync(path.join(SITE, 'versions.html'), 'utf8'), 'versions') };
for (const [k, v] of Object.entries(all)) { if (k === 'CRITICAL_CSS') continue; fs.writeFileSync(path.join(OUT, k + '.html'), v); console.log(k.padEnd(14), v.length, 'chars'); }
