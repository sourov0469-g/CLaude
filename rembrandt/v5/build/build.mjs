// Builds the v5 homepage as ONE self-contained HTML file: rembrandt/v5/rembrandt-homepage.html
// Everything is inside: CSS, the Epilogue font, GSAP 3.13 (core, ScrollTrigger, SplitText), Lenis, the app, every photo.
// Usage: TOOLS=<dir holding node_modules with esbuild, gsap, lenis> node build/build.mjs
// Each section lives in src/sections/<id>/ as v1.html ... v5.html, <id>.css and <id>.js. The section's default version (its
// audit winner, `def` below) is rendered into the page (so it works without JS); the others ship as <template>s mounted by
// the section's 1-5 picker. Audit pack 2026-10-30 A2: src/sections/<id>/bk/ holds the versions as they stood before the
// round (b1-b3.html, bk.css, bk.js); they ship as templates behind the picker's hidden Backup buttons, never the default.
import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module'; import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const V5 = path.resolve(here, '..'), SRC = path.join(V5, 'src'), OUT = process.env.OUT || path.join(V5, 'rembrandt-homepage.html');
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null; // build a subset of sections (parallel work)
const TOOLS = process.env.TOOLS || path.join(V5, 'build');
const require = createRequire(path.join(TOOLS, 'node_modules', 'x.js'));
const esbuild = require('esbuild');
const read = f => fs.readFileSync(path.join(SRC, f), 'utf8');

export const REGISTRY = [
  { id: 'hero', name: 'Hero', label: 'Rembrandt Roofing & Restoration', def: 2 },
  { id: 'proof', name: 'Reviews', label: 'Reviews and credentials', def: 2 },
  { id: 'svc', name: 'Services', label: 'What we do', def: 1 },
  { id: 'work', name: 'Work', label: 'Our work', def: 1 },
  { id: 'family', name: 'Family', label: 'The family', def: 1 },
  { id: 'how', name: 'Steps', label: 'How it works', def: 3 },
  { id: 'storm', name: 'Storm', label: 'Storm damage and insurance', def: 1 },
  { id: 'area', name: 'Towns', label: 'Where we work', def: 3 },
  { id: 'call', name: 'Call', label: 'Call Rembrandt', def: 1 },
  // R4 inner pages: each page body is one section with five whole-page layouts behind the same 1-5 picker
  { id: 'svcp', name: 'Page', label: 'Services', def: 1 },
  { id: 'about', name: 'Page', label: 'About the family', def: 1 },
  { id: 'contact', name: 'Page', label: 'Contact and service area', def: 1 },
];
// R4 (AUDIT-R4.md §2): four pages. The homepage keeps its file name; the inner pages sit beside it.
const HOME = 'rembrandt-homepage.html';
export const PAGES = [
  { key: 'home', file: HOME, ids: ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], home: '#hero', est: '#call',
    title: 'Rembrandt Roofing &amp; Restoration, Springboro, Ohio', desc: "Springboro's family roofers since 1995. 4.9 stars from 295 Google reviews, BBB A+ accredited since 2001. Call Rachel at (937) 746-7377, Monday to Friday, 9 to 5." },
  { key: 'services', file: 'services.html', ids: ['svcp'], home: HOME, est: 'contact.html',
    title: 'Roofing, storm damage, siding and gutters | Rembrandt Roofing &amp; Restoration', desc: 'Roof replacement, roof repair, storm and hail damage, insurance claims, siding and gutters in Springboro and Greater Dayton. Call Rachel at (937) 746-7377, Monday to Friday, 9 to 5.' },
  { key: 'about', file: 'about.html', ids: ['about'], home: HOME, est: 'contact.html',
    title: 'About the Walker family | Rembrandt Roofing &amp; Restoration', desc: 'Founded in 1995 by Franklin "Bunk" Walker; his son Wade has been president since 2015. BBB A+ accredited since 2001, Owens Corning Platinum Preferred, 4.9 stars from 295 Google reviews.' },
  { key: 'contact', file: 'contact.html', ids: ['contact'], home: HOME, est: 'tel:+19377467377',
    title: 'Contact and service area | Rembrandt Roofing &amp; Restoration', desc: 'Call Rachel at (937) 746-7377, Monday to Friday, 9 to 5. Office at 38 N Pioneer Blvd, Springboro, OH 45066. We work in 24 towns around Springboro.' },
].filter(p => !process.env.PAGE || process.env.PAGE.split(',').includes(p.key));
let SECTIONS = [];

const ICONS = {
  ICON_PHONE: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4.2 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.2 1.6 1.6 0 0 1 5 3.5z"/><path class="ic-arc" pathLength="1" d="M14.6 2.6a7.2 7.2 0 0 1 6.8 6.8"/><path class="ic-arc" pathLength="1" d="M14.3 6.2a3.6 3.6 0 0 1 3.5 3.5"/></svg>',
  ICON_SPLIT: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>',
  ICON_ARROW: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  // R4 service icons (⟦S0139⟧ flat: solid planes, one stroke weight), shared by the Services versions and the Services page
  ICON_SREPLACE: '<svg class="ic-s" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path class="ic-f" d="M6 24 24 9l18 15v3H6z"/><path d="M6 24 24 9l18 15M11 23v17h26V23M20 40V30h8v10"/></svg>',
  ICON_SREPAIR: '<svg class="ic-s" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M6 30 24 14l18 16"/><path class="ic-f" d="M22 21h9v7h-9z"/><path d="M22 21h9v7h-9zM34 8l6 6-12 12-6-6z"/></svg>',
  ICON_SHAIL: '<svg class="ic-s" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path class="ic-f" d="M13 26a8 8 0 0 1 1-16 11 11 0 0 1 21 3 6.5 6.5 0 0 1 0 13z"/><path d="M13 26a8 8 0 0 1 1-16 11 11 0 0 1 21 3 6.5 6.5 0 0 1 0 13z"/><circle cx="16" cy="34" r="2.4"/><circle cx="26" cy="38" r="2.4"/><circle cx="34" cy="33" r="2.4"/></svg>',
  ICON_SCLAIM: '<svg class="ic-s" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path class="ic-f" d="M12 6h18l8 8v28H12z"/><path d="M12 6h18l8 8v28H12zM30 6v8h8M18 22h14M18 28h14M18 34h8"/></svg>',
  ICON_SSIDING: '<svg class="ic-s" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path class="ic-f" d="M8 10h32v28H8z"/><path d="M8 10h32v28H8zM8 17h32M8 24h32M8 31h32"/></svg>',
  ICON_SGUTTER: '<svg class="ic-s" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M4 12 24 4l20 8"/><path class="ic-f" d="M6 14h36v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z"/><path d="M6 14h36v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3zM36 22v16"/><path class="ic-f" d="M36 42c-2 0-3-1.4-3-3 0-2 3-5 3-5s3 3 3 5c0 1.6-1 3-3 3z"/></svg>',
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
let inlined = new Set();
function images(html, live) {
  return html.replace(/<img\b([^>]*?)data-img="([a-z0-9-]+)"([^>]*)>/g, (m, a, k, b) => {
    const attrs = a + b; let out = `<img${a}data-img="${k}"${b}`;
    if (!/\swidth=/.test(attrs)) { const [w, h] = size(k); out = out.replace(/<img/, `<img width="${w}" height="${h}"`); }
    if (live && (!inlined.has(k) || /\sdata-keep/.test(attrs))) { inlined.add(k); out = out.replace(/<img/, `<img src="${dataUri(k)}"`); }
    return out + '>';
  });
}

// ---------- markup
const has = (s, f) => fs.existsSync(path.join(SRC, 'sections', s.id, f));
const VERS = s => [1, 2, 3, 4, 5].filter(v => has(s, `v${v}.html`)).map(String);
const BKS = s => [1, 2, 3].filter(v => has(s, `bk/b${v}.html`)).map(v => 'b' + v);
const radio = (s, v, txt) => `<input type="radio" name="v-${s.id}" id="v-${s.id}-${v}" value="${v}"${v === String(s.def) ? ' checked' : ''}><label for="v-${s.id}-${v}" data-cursor="pick" data-c="pick">${txt}</label>`;
// R3 D7: each picker carries a 14px section glyph that plays once on every switch (its moving part is .g-m)
const GLYPH = {
  hero: '<path d="M1 10h14v4H1z"/><path class="g-m" d="M1 6h8v3.4H1z"/>',
  proof: '<path class="g-m" d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.4L8 11.2l-3.9 2.2.9-4.4-3.3-3 4.4-.5z"/>',
  work: '<rect x="1" y="4" width="9" height="8" rx="2.5"/><path class="g-m" d="M10 9.5h5v2h-5z"/>',
  family: '<path d="M3 10a5 5 0 0 1 10 0z"/><path class="g-m" d="M1 10.5h14v2H1z"/>',
  how: '<path d="M2 14l1-4 8-8 3 3-8 8z"/><circle class="g-m" cx="13.5" cy="13.5" r="1.6"/>',
  area: '<path class="g-m" d="M8 15s-5-5.2-5-8.6a5 5 0 0 1 10 0C13 9.8 8 15 8 15zm0-6.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill-rule="evenodd"/>',
  svc: '<path d="M2 8 8 3l6 5v6H2z"/><rect class="g-m" x="6" y="9" width="4" height="5"/>',
  storm: '<path d="M4.5 9a3 3 0 0 1 .5-6 4 4 0 0 1 7.5 1A2.5 2.5 0 0 1 12 9z"/><circle class="g-m" cx="8" cy="13" r="1.6"/>',
  svcp: '<path d="M2 8 8 3l6 5v6H2z"/><rect class="g-m" x="6" y="9" width="4" height="5"/>',
  about: '<circle cx="5" cy="5" r="2.4"/><circle cx="11" cy="5" r="2.4"/><path class="g-m" d="M1 14a4 4 0 0 1 8 0zM7 14a4 4 0 0 1 8 0z"/>',
  contact: '<path class="g-m" d="M8 15s-5-5.2-5-8.6a5 5 0 0 1 10 0C13 9.8 8 15 8 15zm0-6.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill-rule="evenodd"/>',
  call: '<path d="M3.5 1.5h2.6l1.2 3.2-1.5 1a8 8 0 0 0 4.5 4.5l1-1.5 3.2 1.2v2.6a1.2 1.2 0 0 1-1.3 1.2A12 12 0 0 1 2.3 2.8a1.2 1.2 0 0 1 1.2-1.3z"/><circle class="g-m" cx="13" cy="3" r="2"/>',
};
const pick = s => `<div class="pick-rail"><fieldset class="pick"><legend class="vh">${s.name} section: choose a version</legend><span class="pick-l" aria-hidden="true"><svg class="pick-g pick-g--${s.id}" viewBox="0 0 16 16" focusable="false">${GLYPH[s.id] || ''}</svg>${s.name}</span>` +
  VERS(s).map(v => radio(s, v, `<span class="vh">Version </span>${v}`)).join('') +
  (BKS(s).length ? `<button type="button" class="pick-more" aria-expanded="false" aria-controls="bk-${s.id}"><span class="vh">Show the backups</span><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="3" cy="8" r="1.6"/><circle cx="8" cy="8" r="1.6"/><circle cx="13" cy="8" r="1.6"/></svg></button><span class="pick-bk" id="bk-${s.id}">` +
  BKS(s).map(v => radio(s, v, `<span class="vh">Backup </span>B${v.slice(1)}`)).join('') + `</span>` : '') +
  `</fieldset></div>`;
const ver = (s, v) => icons(read(`sections/${s.id}/${String(v)[0] === 'b' ? `bk/${v}` : `v${v}`}.html`)).trim();
for (const P of PAGES) {
  SECTIONS = P.ids.map(id => REGISTRY.find(r => r.id === id)).filter(x => x && fs.existsSync(path.join(SRC, 'sections', x.id)) && (!ONLY || ONLY.includes(x.id)));
  inlined = new Set();
  let sections = '', templates = '';
  for (const s of SECTIONS) {
    sections += `<section id="${s.id}" class="sec sec--${s.id}" data-section="${s.id}" data-def="${s.def}" aria-label="${s.label.replace(/&/g, '&amp;')}">\n${pick(s)}\n<div class="stage">\n${images(ver(s, s.def), true)}\n</div>\n</section>\n`;
  }
  for (const s of SECTIONS) for (const v of [...VERS(s), ...BKS(s)]) if (v !== String(s.def)) templates += `<template id="tpl-${s.id}-${v}">${images(ver(s, v), false)}</template>\n`;
  let page = icons(read('index.html'));
  const cur = k => P.key === k ? ' aria-current="page"' : '';
  page = page.replace('PAGE_TITLE', () => P.title).replace('PAGE_DESC', () => P.desc).replaceAll('HOME_HREF', P.home).replaceAll('HOME_LABEL', P.key === 'home' ? 'back to top' : 'home page')
    .replace('EST_HREF', P.est).replace(/NAV_(home|services|about|contact)/g, (m, k) => cur(k));
  page = page.replace(/<img\b[^>]*>/g, m => images(m, true));
  page = page.replace('<!--SECTIONS-->', () => sections).replace('<!--TEMPLATES-->', () => templates);
  // photos not embedded in the live page go into one registry the scripts read
  const keys = new Set([...page.matchAll(/data-(?:img|fill)="([a-z0-9-]+)"/g)].map(m => m[1]));
  const registry = Object.fromEntries([...keys].filter(k => !inlined.has(k)).map(k => [k, dataUri(k)]));

  // ---------- CSS
  const minCss = s => s.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').map(l => l.trim()).filter(Boolean).join('').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}');
  let css = read('base.css') + SECTIONS.map(s => [`sections/${s.id}/bk/bk.css`, `sections/${s.id}/${s.id}.css`].filter(f => fs.existsSync(path.join(SRC, f))).map(read).join('\n')).join('\n');
  const font = f => `data:font/woff2;base64,${fs.readFileSync(path.join(V5, 'assets', 'fonts', f)).toString('base64')}`;
  css = minCss(css).replace('FONT_EPILOGUE', () => font('epilogue.woff2')).replace('FONT_OPENSANS', () => font('opensans-var.woff2')).replace(/FONT_POPPINS_(\d{3})/g, (m, w) => font(`poppins-${w}.woff2`)); // R4: Poppins + Open Sans (Epilogue for the backups)
  page = page.replace('/*CSS*/', () => css);
  page = page.replace('FAVICON', () => `data:image/png;base64,${fs.readFileSync(path.join(V5, 'assets', 'img', 'favicon.png')).toString('base64')}`);

  // ---------- JS
  const bkJs = s => has(s, 'bk/bk.js');
  const entry = `import { boot } from './js/main.js';\n` + SECTIONS.map(s => `import ${s.id} from './sections/${s.id}/${s.id}.js';` + (bkJs(s) ? `\nimport ${s.id}Bk from './sections/${s.id}/bk/bk.js';` : '')).join('\n') +
    `\nboot({ ${SECTIONS.map(s => bkJs(s) ? `${s.id}: { ...${s.id}, b1: ${s.id}Bk[1], b2: ${s.id}Bk[2], b3: ${s.id}Bk[3] }` : s.id).join(', ')} });\n`;
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
  const OUTF = P.key === 'home' ? OUT : path.join(path.dirname(OUT), P.file);
  fs.writeFileSync(OUTF, page);
  const kb = n => (n / 1024).toFixed(0) + ' KB';
  console.log(`${OUTF}  ${kb(Buffer.byteLength(page))}  (css ${kb(css.length)}, js ${kb(js.length)}, ${inlined.size} live images, ${Object.keys(registry).length} in registry, ${SECTIONS.length} sections)`);

}
