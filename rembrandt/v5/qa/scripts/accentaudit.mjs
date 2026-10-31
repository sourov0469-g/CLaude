// R6 QA: where does the accent appear, and does it mean one thing (S0071 one colour one meaning, S1435 isolation)?
// For every visible version on all four pages: every rendered accent-hue paint (text, fill, border, svg fill/stroke) is
// classed by role: action (filled primary), state (pressed/checked/hover-able control), link/interactive text, logo,
// illustration (one focal mark per drawing), deep band (the declared deep sections), or OTHER (flagged for review).
// Then, scrolling one viewport at a time, the number of filled accent actions visible at once (one filled primary per view),
// and high-chroma grounds behind body text (eye comfort: chroma of any ground under a paragraph).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright'); import fs from 'node:fs';
const PAGES = [['rembrandt-homepage.html', ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]];
const b = await chromium.launch(); const out = { roles: {}, other: [], multi: [], chroma: [] };
for (const [file, ids, n] of PAGES) for (let v = 1; v <= n; v++) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${ids.map(i => i + v).join(',')}`); await p.waitForTimeout(1000);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 450) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(90); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
  const r = await p.evaluate(() => {
    const hexOf = c => { const m = c && c.match(/rgba?\(([\d.]+),?\s*([\d.]+),?\s*([\d.]+)(?:,?\s*\/?\s*([\d.]+))?/); if (!m || (m[4] !== undefined && +m[4] < 0.5)) return null; return '#' + [m[1], m[2], m[3]].map(x => (+x | 0).toString(16).padStart(2, '0')).join(''); };
    const cs = getComputedStyle(document.documentElement); const ramp = {}; for (const s of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) ramp[cs.getPropertyValue('--teal-' + s).trim().toLowerCase()] = s;
    const vis = e => { for (let x = e; x && x.nodeType === 1; x = x.parentElement) { const c = getComputedStyle(x); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) return false; } const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const roles = {}, other = [];
    const DEEP = '.cl1,.cl2,.cl3,.cl4,.cl5,.cl7,.sc2-band,.ac2-band,.kt4-panel,.kt2-back,#call.sec';
    for (const e of document.querySelectorAll('body *')) {
      if (e.closest('.pick-bk,.bkv,[data-bk],.cmp,script,style') || e.closest('.sec.on-bk,.sec.on-rec')) continue;
      const c = getComputedStyle(e); const paints = [];
      const isSvg = e instanceof SVGElement;
      if (isSvg) { paints.push(['fill', c.fill], ['stroke', c.stroke]); } else { paints.push(['text', e.childNodes.length && [...e.childNodes].some(t => t.nodeType === 3 && t.textContent.trim()) ? c.color : null], ['bg', c.backgroundColor], ['border', +c.borderTopWidth > 0 ? c.borderTopColor : null]); }
      for (const [k, val] of paints) { const h = hexOf(val); if (!h || !(h in ramp)) continue; const step = ramp[h]; if (step <= 100 && (k === 'bg' || k === 'fill')) continue; // tints are grounds, not accent marks
        if (!vis(e)) continue;
        const inter = e.closest('a,button,label,input,select,[role=tab],summary,[tabindex]:not([tabindex="-1"]),[aria-pressed]');
        let role;
        if (e.closest('.logo,.mk-g,.r4-lab,link')) role = 'logo/brand glyph';
        else if (e.closest(DEEP)) role = 'deep band';
        else if (e.closest('.pick')) role = 'picker state';
        else if (inter && k === 'bg' && step >= 600) role = 'action fill';
        else if (inter) role = 'interactive (link/state/ring)';
        else if (isSvg || e.closest('svg,canvas')) role = 'illustration focal mark';
        else role = 'OTHER';
        roles[role] = (roles[role] || 0) + 1;
        if (role === 'OTHER') { const sec = e.closest('.sec,nav,footer,.ftr'); other.push(`${sec ? sec.id || sec.className.split(' ')[0] : '?'} ${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]} ${k} teal-${step} "${(e.textContent || '').trim().slice(0, 30)}"`); }
      }
    }
    return { roles, other };
  });
  for (const [k, n2] of Object.entries(r.roles)) out.roles[k] = (out.roles[k] || 0) + n2;
  for (const o of r.other) out.other.push(`${file.replace('rembrandt-homepage.html', 'home').replace('.html', '')} ${o.replace(/ "[^"]*"$/, '')} | v${v} ${(o.match(/"[^"]*"$/) || [''])[0]}`);
  // one filled primary per view, and grounds behind paragraphs
  for (let y = 0; y < H; y += 900) {
    await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(260);
    const m = await p.evaluate(() => {
      const hexOf = c => { const m = c && c.match(/rgba?\(([\d.]+),?\s*([\d.]+),?\s*([\d.]+)(?:,?\s*\/?\s*([\d.]+))?/); if (!m || (m[4] !== undefined && +m[4] < 0.5)) return null; return [+m[1], +m[2], +m[3]]; };
      const cs = getComputedStyle(document.documentElement); const solid = [cs.getPropertyValue('--teal-600').trim(), cs.getPropertyValue('--teal-700').trim()].map(h => h.toLowerCase());
      const toHex = a => '#' + a.map(x => (x | 0).toString(16).padStart(2, '0')).join('');
      const vis = e => { for (let x = e; x; x = x.parentElement) { const c = getComputedStyle(x); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) return false; } return true; };
      const fills = [];
      for (const e of document.querySelectorAll('a[href],button')) { if (e.closest('.pick,.cmp,.sec.on-bk,.sec.on-rec,[aria-pressed="true"],[aria-selected="true"],[role=tab]') || e.getAttribute('aria-pressed') === 'true') continue; /* a pressed chip or selected tab is a state, not an action */ const r = e.getBoundingClientRect(); if (r.width < 60 || r.height < 28 || r.bottom <= 0 || r.top >= innerHeight) continue; const h = hexOf(getComputedStyle(e).backgroundColor); if (h && solid.includes(toHex(h)) && vis(e)) fills.push((e.closest('.sec,nav,.mbar,footer') || {}).id || e.className.split(' ')[0]); }
      // chroma (OKLCH C) of the ground under each visible paragraph
      const lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      const C = ([r, g, b]) => { r = lin(r); g = lin(g); b = lin(b); const l = Math.cbrt(0.4122214708 * r + 0.5363137098 * g + 0.0514459929 * b), mm = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b); const A = 1.9779984951 * l - 2.428592205 * mm + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * mm - 0.808675766 * s; return Math.hypot(A, B); };
      let worst = null;
      for (const e of document.querySelectorAll('p,li')) { const r = e.getBoundingClientRect(); if (r.bottom <= 0 || r.top >= innerHeight || !vis(e) || (e.textContent || '').trim().length < 40 || e.closest('.sec.on-bk,.sec.on-rec')) continue; let g = null; for (let x = e; x; x = x.parentElement) { const h = hexOf(getComputedStyle(x).backgroundColor); if (h) { g = h; break; } } if (!g) continue; const c = C(g); if (!worst || c > worst.c) worst = { c, g: toHex(g), sec: (e.closest('.sec') || {}).id }; }
      return { fills, worst };
    });
    if (m.fills.length > 1) out.multi.push(`${file} v${v} y${y}: ${m.fills.join(' + ')}`);
    if (m.worst) out.chroma.push([m.worst.c, `${file} v${v} y${y} ${m.worst.sec} ${m.worst.g}`]);
  }
  await p.context().close();
}
out.chroma.sort((a, b) => b[0] - a[0]);
console.log('ACCENT PAINTS BY ROLE', JSON.stringify(out.roles));
console.log('OTHER (non-role accent) ' + out.other.length); const grp = {}; for (const o of out.other) { const [k, w] = o.split(' | '); (grp[k] = grp[k] || new Set()).add(w); } for (const [k, w] of Object.entries(grp)) console.log('  ' + k + ' | ' + [...w].slice(0, 3).join(' ; ') + (w.size > 3 ? ' (+' + (w.size - 3) + ')' : ''));
console.log('VIEWS WITH >1 FILLED ACCENT ACTION ' + out.multi.length); for (const o of out.multi.slice(0, 40)) console.log('  ' + o);
console.log('HIGHEST-CHROMA GROUND BEHIND BODY TEXT (OKLCH C):'); for (const [c, s] of out.chroma.slice(0, 8)) console.log('  ' + c.toFixed(3) + ' ' + s);
await b.close();
