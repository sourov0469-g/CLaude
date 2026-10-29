// Builds the v5 homepage as ONE self-contained HTML file: rembrandt/v5/rembrandt-homepage.html
// Everything is inside: CSS, the Epilogue font, GSAP 3.13 (core, ScrollTrigger, SplitText), Lenis, the app, every photo.
// Usage: TOOLS=<dir holding node_modules with esbuild, gsap, lenis> node build/build.mjs
// Each section lives in src/sections/<id>/ as v1.html, v2.html, v3.html, <id>.css and <id>.js. Version 1 is rendered into
// the page (so it works without JS); versions 2 and 3 ship as <template>s and are mounted by the section's 1 · 2 · 3 picker.
import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module'; import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const V5 = path.resolve(here, '..'), SRC = path.join(V5, 'src'), OUT = process.env.OUT || path.join(V5, 'rembrandt-homepage.html');
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null; // build a subset of sections (parallel work)
const TOOLS = process.env.TOOLS || path.join(V5, 'build');
const require = createRequire(path.join(TOOLS, 'node_modules', 'x.js'));
const esbuild = require('esbuild');
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');

export const SECTIONS = [
  { id: 'hero', name: 'Hero', label: 'Rembrandt Roofing & Restoration' },
  { id: 'proof', name: 'Reviews', label: 'Reviews and credentials' },
  { id: 'work', name: 'Work', label: 'Our work' },
  { id: 'family', name: 'Family', label: 'The family' },
  { id: 'how', name: 'Steps', label: 'How it works' },
  { id: 'area', name: 'Towns', label: 'Where we work' },
  { id: 'call', name: 'Call', label: 'Call Rembrandt' },
].filter(s => fs.existsSync(path.join(SRC, 'sections', s.id)) && (!ONLY || ONLY.includes(s.id)));

const ICONS = {
  ICON_PHONE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.2 1.6 1.6 0 0 1 5 3.5z"/></svg>',
  ICON_SPLIT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>',
  ICON_ARROW: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
const icons = s => s.replace(/ICON_[A-Z]+/g, k => { if (!ICONS[k]) throw new Error('unknown icon ' + k); return ICONS[k]; });

// ---------- images: each photo is embedded once
const IMG_DIR = path.join(V5, 'assets', 'img');
const imgFile = k => { for (const ext of ['webp', 'png', 'jpg']) { const f = path.join(k === 'logo' ? path.join(V5, 'assets', 'owner') : IMG_DIR, `${k}.${ext}`); if (fs.existsSync(f)) return f; } throw new Error('missing image ' + k); };
const mime = f => ({ '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' })[path.extname(f)];
const dataUri = k => { const f = imgFile(k); return `data:${mime(f)};base64,${fs.readFileSync(f).toString('base64')}`; };
const size = k => { // width and height from the file header (webp VP8/VP8L/VP8X, png)
  const b = fs.readFileSync(imgFile(k));
  if (b.toString('ascii', 1, 4) === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)];
  const c = b.toString('ascii', 12, 16);
  if (c === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  if (c === 'VP8L') { const n = b.readUInt32LE(21); return [1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff)]; }
  if (c === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  throw new Error('unknown image format ' + k);
};
const inlined = new Set();
function images(html, live) {
  return html.replace(/<img\b([^>]*?)data-img="([a-z0-9-]+)"([^>]*)>/g, (m, a, k, b) => {
    const attrs = a + b; let out = `<img${a}data-img="${k}"${b}`;
    if (!/\swidth=/.test(attrs)) { const [w, h] = size(k); out = out.replace(/<img/, `<img width="${w}" height="${h}"`); }
    if (live && (!inlined.has(k) || /\sdata-keep/.test(attrs))) { inlined.add(k); out = out.replace(/<img/, `<img src="${dataUri(k)}"`); }
    return out + '>';
  });
}

// ---------- markup
const pick = s => `<div class="pick-rail"><fieldset class="pick"><legend class="vh">${s.name} section: choose a version</legend><span class="pick-l" aria-hidden="true">${s.name}</span>` +
  [1, 2, 3].map(v => `<input type="radio" name="v-${s.id}" id="v-${s.id}-${v}" value="${v}"${v === 1 ? ' checked' : ''}><label for="v-${s.id}-${v}" data-cursor="pick"><span class="vh">Version </span>${v}</label>`).join('') +
  `</fieldset></div>`;
const ver = (s, v) => icons(read(`sections/${s.id}/v${v}.html`)).trim();
let sections = '', templates = '';
for (const s of SECTIONS) {
  sections += `<section id="${s.id}" class="sec sec--${s.id}" data-section="${s.id}" aria-label="${s.label.replace(/&/g, '&amp;')}">\n${pick(s)}\n<div class="stage">\n${images(ver(s, 1), true)}\n</div>\n</section>\n`;
}
for (const s of SECTIONS) for (const v of [2, 3]) {
  const f = path.join(SRC, 'sections', s.id, `v${v}.html`);
  if (fs.existsSync(f)) templates += `<template id="tpl-${s.id}-${v}">${images(ver(s, v), false)}</template>\n`;
}
let page = icons(read('index.html'));
page = page.replace(/<img\b[^>]*>/g, m => images(m, true));
page = page.replace('<!--SECTIONS-->', () => sections).replace('<!--TEMPLATES-->', () => templates);
// photos not embedded in the live page go into one registry the scripts read
const keys = new Set([...page.matchAll(/data-img="([a-z0-9-]+)"/g)].map(m => m[1]));
for (const k of ['job-charcoal-lines']) if (fs.existsSync(path.join(IMG_DIR, k + '.webp'))) keys.add(k); // textures only scripts use
const registry = Object.fromEntries([...keys].filter(k => !inlined.has(k)).map(k => [k, dataUri(k)]));

// ---------- CSS
const minCss = s => s.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').map(l => l.trim()).filter(Boolean).join('').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}');
let css = read('base.css') + SECTIONS.map(s => { const f = `sections/${s.id}/${s.id}.css`; return fs.existsSync(path.join(SRC, f)) ? read(f) : ''; }).join('\n');
css = minCss(css).replace('FONT_EPILOGUE', `data:font/woff2;base64,${fs.readFileSync(path.join(V5, 'assets', 'fonts', 'epilogue.woff2')).toString('base64')}`);
page = page.replace('/*CSS*/', () => css);
page = page.replace('FAVICON', () => `data:image/png;base64,${fs.readFileSync(path.join(V5, 'assets', 'img', 'favicon.png')).toString('base64')}`);

// ---------- JS
const entry = `import { boot } from './js/main.js';\n` + SECTIONS.map(s => `import ${s.id} from './sections/${s.id}/${s.id}.js';`).join('\n') + `\nboot({ ${SECTIONS.map(s => s.id).join(', ')} });\n`;
const js = (await esbuild.build({ stdin: { contents: entry, resolveDir: SRC, loader: 'js' }, bundle: true, minify: true, format: 'iife', target: 'es2020', write: false, nodePaths: [path.join(TOOLS, 'node_modules')], legalComments: 'none', logLevel: 'error' })).outputFiles[0].text;
const scripts = [`window.__IMG=${JSON.stringify(registry)};`, js].map(s => `<script>${s.replace(/<\/script/gi, '<\\/script')}</script>`).join('\n');
page = page.replace('<!--SCRIPTS-->', () => scripts);

// ---------- gates
const visible = page.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<template[\s\S]*?<\/template>/g, m => m.replace(/<[^>]+>/g, ' ')).replace(/<[^>]+>/g, ' ');
const attrsText = [...page.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').matchAll(/\s(?:alt|aria-label|title|content)="([^"]*)"/g)].map(m => m[1]).join(' ');
const fails = [];
if (/[—–]/.test(visible + attrsText)) fails.push('em or en dash in visible text');
if (/·/.test(visible + attrsText)) fails.push('middle dot in visible text');
if (/transition:\s*all|will-change:\s*all/.test(css)) fails.push('transition: all / will-change: all');
if (/scale\(0\)/.test(css + js)) fails.push('scale(0)');
if (fails.length) { console.error('GATE FAIL:\n- ' + fails.join('\n- ')); process.exit(1); }
fs.writeFileSync(OUT, page);
const kb = n => (n / 1024).toFixed(0) + ' KB';
console.log(`${OUT}  ${kb(Buffer.byteLength(page))}  (css ${kb(css.length)}, js ${kb(js.length)}, ${inlined.size} live images, ${Object.keys(registry).length} in registry, ${SECTIONS.length} sections)`);
