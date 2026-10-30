// R5 full-site QA sweep (WEB-SKILLS judging notes §3.4 contrast, §3.8 touch/headings/images, §3.2 type floors):
// every visible version of every page at 1440 and 375, reduced motion (content at rest). Writes JSON per run.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright'); import fs from 'node:fs';
const HOME = ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'];
const PAGES = [['rembrandt-homepage.html', HOME, 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]]; // R5: inner pages per section
const only = process.env.ONLY; const widths = (process.env.W || '1440,375').split(',').map(Number);
const b = await chromium.launch(); const out = [];
for (const [file, ids, n] of PAGES) {
  if (only && !file.startsWith(only)) continue;
  for (const w of widths) for (let v = 1; v <= n; v++) {
    const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 812 : 900 }, reducedMotion: 'reduce', hasTouch: w < 500, isMobile: w < 500 });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${ids.map(i => i + v).join(',')}`); await p.waitForTimeout(1300);
    // walk the page so lazy images load and scroll-bound states settle
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(500);
    const r = await p.evaluate(({ ids, w }) => {
      const rgba = s => { const m = (s.match(/[\d.]+/g) || []).map(Number); return m.length >= 3 ? [m[0], m[1], m[2], m.length > 3 ? m[3] : 1] : null; };
      const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
      const L = c => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
      const mix = (fg, bg) => [0, 1, 2].map(i => fg[i] * fg[3] + bg[i] * (1 - fg[3]));
      const bgOf = el => { const layers = []; for (let e = el; e; e = e.parentElement) { const cs = getComputedStyle(e);
          if (cs.backgroundImage !== 'none' && !/data:image\/svg/.test(cs.backgroundImage) && !/^linear-gradient\((rgb[^)]*\)), \1\)/.test(cs.backgroundImage)) return { complex: e.className.toString().slice(0, 40) };
          const c = rgba(cs.backgroundColor); if (c && c[3] > 0) { layers.push(c); if (c[3] >= 0.99) break; } }
        let base = [255, 255, 255]; for (let i = layers.length - 1; i >= 0; i--) base = mix(layers[i], base); return { c: base }; };
      const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false; for (let x = e; x; x = x.parentElement) { const cs = getComputedStyle(x); if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.05) return false; } return true; };
      const name = e => (e.tagName.toLowerCase() + '.' + (e.className && e.className.baseVal === undefined ? e.className : (e.className.baseVal || '')).toString().split(' ').filter(Boolean).slice(0, 2).join('.')).slice(0, 50);
      const res = { overflow: document.documentElement.scrollWidth - innerWidth, h1: document.querySelectorAll('h1').length, contrast: [], small: [], targets: [], clipped: [], imgs: [], hjump: [], complexText: 0 };
      const scope = [...ids.map(id => document.getElementById(id)), document.querySelector('.ftr, footer'), document.querySelector('.nav, header')].filter(Boolean);
      for (const root of scope) {
        // contrast + small text: elements owning a non-empty text node
        const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const seen = new Set();
        while (tw.nextNode()) { const t = tw.currentNode; if (!t.textContent.trim()) continue; const e = t.parentElement; if (seen.has(e) || e.closest('svg,.vh,template,[aria-hidden="true"] .vh')) continue; seen.add(e);
          if (!vis(e) || e.closest('.vh')) continue; const cs = getComputedStyle(e); const fs = parseFloat(cs.fontSize), fw = +cs.fontWeight;
          if (fs < 12) res.small.push(`${name(e)} ${fs}px "${t.textContent.trim().slice(0, 24)}"`);
          const fg = rgba(cs.color); const bg = bgOf(e); if (!fg) continue; if (bg.complex) { res.complexText++; continue; }
          const f = mix(fg, bg.c), a = L(f), c2 = L(bg.c), ratio = (Math.max(a, c2) + 0.05) / (Math.min(a, c2) + 0.05);
          const large = fs >= 24 || (fs >= 18.66 && fw >= 700); const need = large ? 3 : 4.5;
          if (ratio < need) res.contrast.push(`${name(e)} ${ratio.toFixed(2)}<${need} "${t.textContent.trim().slice(0, 28)}"`); }
        // touch targets on phones (inline text links exempt, WCAG 2.5.8 inline exception)
        if (w < 500) root.querySelectorAll('a[href],button,input,select,[role=tab],label:has(input)').forEach(e => { if (!vis(e) || e.closest('.pick')) return; const cs = getComputedStyle(e); if (cs.display === 'inline' && e.tagName === 'A') return;
          const r = e.getBoundingClientRect(); if (r.width < 44 - 0.5 || r.height < 44 - 0.5) res.targets.push(`${name(e)} ${Math.round(r.width)}x${Math.round(r.height)}`); });
        // clipped text: a text-bearing box that overflows its own clip
        root.querySelectorAll('h1,h2,h3,p,li,b,span,a,button,figcaption,dd,dt,label').forEach(e => { if (!vis(e) || !e.textContent.trim()) return; const cs = getComputedStyle(e);
          if (/(hidden|clip)/.test(cs.overflowX + cs.overflowY) && cs.textOverflow !== 'ellipsis' && (e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2) && e.clientWidth > 0) res.clipped.push(`${name(e)} "${e.textContent.trim().slice(0, 24)}"`); });
        root.querySelectorAll('img').forEach(i => { if (vis(i) && !i.naturalWidth) res.imgs.push(name(i) + ' ' + (i.dataset.img || i.src.slice(0, 30))); });
      }
      // heading order inside each section (no jump down by more than one level)
      for (const id of ids) { let last = 1; document.getElementById(id).querySelectorAll('h1,h2,h3,h4,h5').forEach(h => { if (!vis(h)) return; const l = +h.tagName[1]; if (l > last + 1) res.hjump.push(`${id}: h${last}->h${l} "${h.textContent.trim().slice(0, 24)}"`); last = l; }); }
      return res;
    }, { ids, w });
    out.push({ file, w, v, errs: errs.slice(0, 3), ...r });
    const k = x => (x.length ? x.length : 0);
    console.log(`${file} ${w} v${v}: ovf ${r.overflow} h1 ${r.h1} err ${errs.length} contrast ${k(r.contrast)} small ${k(r.small)} targets ${k(r.targets)} clipped ${k(r.clipped)} imgs ${k(r.imgs)} hjump ${k(r.hjump)} complex ${r.complexText}`);
    await ctx.close();
  }
}
fs.writeFileSync(process.env.OUT || 'qa/qa5/fullqa.json', JSON.stringify(out, null, 1)); await b.close();
