// R6 measured contrast table (better-colors S0071 "measure the rendered pair"; design-token-contrast S0248 token pairs;
// critique-color S1497 contrast dimension). Every row reads computed colours from REAL rendered elements in their real
// ground (light theme and the deep band), resolves alpha against what is behind, and reports WCAG 2 ratio vs threshold.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright'); import fs from 'node:fs';
const b = await chromium.launch(); const rows = [];
const page = async (q, file = 'rembrandt-homepage.html') => { const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.emulateMedia({ reducedMotion: 'reduce' }); await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${q}`); await p.waitForTimeout(1100); return p; };
const measure = (p, spec) => p.evaluate(spec => {
  const rgb = s => { const m = (s.match(/[\d.]+/g) || []).map(Number); return [m[0], m[1], m[2], m.length > 3 ? m[3] : 1]; };
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const L = c => .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]);
  const ground = el => { const ls = []; for (let e = el; e; e = e.parentElement) { const c = rgb(getComputedStyle(e).backgroundColor); if (c[3] > 0) { ls.push(c); if (c[3] >= .99) break; } } let base = [255, 255, 255]; for (let i = ls.length - 1; i >= 0; i--) base = [0, 1, 2].map(k => ls[i][k] * ls[i][3] + base[k] * (1 - ls[i][3])); return base; };
  const hex = c => '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const el = document.querySelector(spec.sel); if (!el) return { miss: spec.sel };
  const cs = getComputedStyle(el); let fg = rgb(spec.shadow !== undefined ? ((cs.boxShadow.match(/rgba?\([^)]*\)/g) || [])[spec.shadow] || '') : cs[spec.prop || 'color']);
  const bgEl = spec.on ? document.querySelector(spec.on) : spec.self ? el : el.parentElement;
  let bg = spec.onProp ? rgb(getComputedStyle(bgEl)[spec.onProp]).slice(0, 3) : ground(spec.self ? el.parentElement : bgEl);
  if (spec.self) { fg = rgb(cs.backgroundColor); }
  if (fg[3] < 1) fg = [0, 1, 2].map(k => fg[k] * fg[3] + bg[k] * (1 - fg[3]));
  const a = L(fg), c = L(bg); return { fg: hex(fg), bg: hex(bg), ratio: (Math.max(a, c) + .05) / (Math.min(a, c) + .05), size: cs.fontSize, weight: cs.fontWeight };
}, spec);
const add = async (p, label, level, need, spec) => { const r = await measure(p, spec); if (r.miss) { rows.push([label, level, 'not on this state', '', '', need, 'n/a']); return; } rows.push([label, level, r.fg, r.bg, r.ratio.toFixed(2), need, r.ratio >= need ? 'pass' : 'FAIL']); };
let p = await page('hero2,proof2,svc1,work1,family1,how3,storm1,area3,call6');
await add(p, 'Page title (H1, hero)', 'primary', 3, { sel: '#hero h1' });
await add(p, 'Filled primary call: label on accent-solid', 'primary', 4.5, { sel: '#hero .btn--sun span', on: '#hero .btn--sun', onProp: 'backgroundColor' });
await add(p, 'Filled primary call: fill vs page ground', 'UI', 3, { sel: '#hero .btn--sun', self: true });
await add(p, 'Section heading (H2)', 'secondary', 3, { sel: '#proof h2' });
await add(p, 'Body copy', 'tertiary', 4.5, { sel: '#how .hw-note' });
await add(p, 'Fine print / source note', 'quaternary', 4.5, { sel: '#area .tw-src' });
await add(p, 'Section label (brand glyph row)', 'quaternary', 4.5, { sel: '#proof .r4-lab' });
await add(p, 'Link in body (accent text)', 'tertiary', 4.5, { sel: '#hero .hx2-proof, #hero a.rx:not(.btn)' });
await add(p, 'Secondary (section) call: label', 'secondary action', 4.5, { sel: '#storm .btn--sun span' });
await add(p, 'Secondary call: 2px outline (inset ring) vs ground', 'UI', 3, { sel: '#storm .btn--sun', shadow: 0 });
await add(p, 'Picker: checked number on the accent indicator', 'state', 4.5, { sel: '#proof .pick input:checked+label', on: '#proof .pick-ind', onProp: 'backgroundColor' });
await add(p, 'Picker: idle number on the pill', 'UI', 4.5, { sel: '#proof .pick input:not(:checked)+label' });
await add(p, 'Nav link', 'tertiary', 4.5, { sel: '.nav-list a' });
await add(p, 'Nav call (persistent filled primary): label', 'primary', 4.5, { sel: '.nav .btn--sun span', on: '.nav .btn--sun', onProp: 'backgroundColor' });
await add(p, 'Footer label', 'quaternary', 4.5, { sel: '.ftr .ftr-k' });
await add(p, 'Footer value', 'tertiary', 4.5, { sel: '.ftr-nap' });
await p.evaluate(() => { const r = document.documentElement; window.__lm = getComputedStyle(document.querySelector('.nav .logo .lg-m')).stroke; });
await add(p, 'Logo mark (graphic) vs nav plate', 'UI', 3, { sel: '.nav .logo .lg-m', prop: 'stroke', on: '.nav-logo' });
await add(p, 'Logo wordmark vs nav plate', 'primary', 4.5, { sel: '.nav .logo .lg-w', prop: 'fill', on: '.nav-logo' });
await p.focus('.nav-list a'); await p.keyboard.press('Tab'); await p.keyboard.press('Shift+Tab');
await add(p, 'Focus outline (site-wide, 3px) vs page ground', 'UI', 3, { sel: '.nav-list a:focus-visible, .nav-list a', prop: 'outlineColor', on: 'body' });
await p.close();
p = await page('call1');
await add(p, 'Deep band: heading (white on teal-800)', 'secondary', 3, { sel: '#call h2' });
await add(p, 'Deep band: body (teal-100 on teal-800)', 'tertiary', 4.5, { sel: '#call .cl1-p, #call p' });
await add(p, 'Deep band: secondary call label on the band', 'secondary action', 4.5, { sel: '#call .btn--sun span' });
await add(p, 'Deep band: secondary call ring vs band', 'UI', 3, { sel: '#call .btn--sun', shadow: 0 });
await p.close();
p = await page('area1');
await add(p, 'Town chip pressed: label on accent-solid', 'state', 4.5, { sel: '#area .tw1-list button[aria-pressed="true"]' , on: '#area .tw1-list button[aria-pressed="true"]', onProp: 'backgroundColor' });
await p.close();
p = await page('contact5', 'contact.html');
await add(p, 'Town field: input border vs ground', 'UI', 3, { sel: '#contact .ct5-in', prop: 'borderTopColor' });
await add(p, 'Town field: typed text', 'tertiary', 4.5, { sel: '#contact .ct5-in' });
await p.focus('#contact .ct5-in'); await p.keyboard.press('Tab'); await p.keyboard.press('Shift+Tab');
await add(p, 'Focus ring (outer ring, accent) vs page ground', 'UI', 3, { sel: '#contact .ct5-in', shadow: 1 });
await p.close();
// the token tier itself (S0248): every text token on every ground token it is used on, light and deep
const css = fs.readFileSync('/home/user/CLaude/rembrandt/v5/src/base.css', 'utf8'); const root = css.match(/:root\{([\s\S]*?)\n\}/)[1];
const prim = Object.fromEntries([...root.matchAll(/--((?:teal|neutral)-\d+|white):(#[0-9a-f]{6})/g)].map(m => [m[1], m[2]]));
const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; const Lh = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); return .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]); };
const cr = (a, c) => { const x = Lh(a), y = Lh(c); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const tok = [['text', 'neutral-900'], ['text-secondary', 'neutral-700'], ['text-tertiary', 'neutral-600'], ['accent-text', 'teal-700']];
const grounds = [['bg', 'neutral-50'], ['bg-subtle', 'neutral-100'], ['bg-surface', 'white'], ['accent-subtle', 'teal-50'], ['accent-subtle-hover', 'teal-100']];
const tokRows = [];
for (const [t, tp] of tok) for (const [g, gp] of grounds) { const r = cr(prim[tp], prim[gp]); tokRows.push([`--color-${t} on --color-${g}`, prim[tp], prim[gp], r.toFixed(2), 4.5, r >= 4.5 ? 'pass' : 'FAIL']); }
for (const [t, tp, g, gp, need] of [['text-on-accent', 'white', 'accent-solid', 'teal-600', 4.5], ['text-on-accent', 'white', 'accent-solid-hover', 'teal-700', 4.5], ['accent-solid (fill)', 'teal-600', 'bg', 'neutral-50', 3], ['border-control', 'neutral-600', 'bg', 'neutral-50', 3], ['border-focus', 'teal-600', 'bg-surface', 'white', 3],
  ['deep: text (white)', 'white', 'bg-inverse', 'teal-800', 4.5], ['deep: text-secondary', 'teal-100', 'bg-inverse', 'teal-800', 4.5], ['deep: text-tertiary', 'teal-200', 'bg-inverse', 'teal-800', 4.5], ['deep: text on surface', 'white', 'surface', 'teal-700', 4.5], ['deep: secondary on surface', 'teal-100', 'surface', 'teal-700', 4.5], ['deep: action label', 'teal-800', 'action fill', 'white', 4.5]]) {
  const r = cr(prim[tp], prim[gp]); tokRows.push([`${t} on ${g}`, prim[tp], prim[gp], r.toFixed(2), need, r >= need ? 'pass' : 'FAIL']); }
let out = '| Rendered pair | Level | Foreground | Ground | Ratio | Need | Result |\n|---|---|---|---|---|---|---|\n' + rows.map(r => `| ${r.join(' | ')} |`).join('\n');
out += '\n\n| Token pair (S0248) | Foreground | Ground | Ratio | Need | Result |\n|---|---|---|---|---|---|\n' + tokRows.map(r => `| ${r.join(' | ')} |`).join('\n');
fs.writeFileSync('/home/user/CLaude/rembrandt/v5/qa/gate/r6-contrast-table.md', out + '\n'); console.log(out);
console.log('\nFAIL rows:', [...rows, ...tokRows].filter(r => r[r.length - 1] === 'FAIL').length); await b.close();
