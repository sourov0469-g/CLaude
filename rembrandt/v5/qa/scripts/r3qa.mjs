// R3 per-section QA instrument (AUDIT-R3.md A4). For each version of one section, at 320/375/768/1024/1440 (+1440 reduced
// motion): page overflow, clipped text (nowrap boxes wider than their parent), H1/H2 size/weight/centring, tracked-caps
// labels, text under 4.5:1 (3:1 large) against its painted ground, controls under 44px, height, element count, console
// errors. One line per version x width. usage: node r3qa.mjs <section> <versions e.g. 1,2,3,4,5> [file]
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [id, vs = '1,2,3,4,5', FILE = '/home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'] = process.argv.slice(2);
const b = await chromium.launch(); const out = [];
for (const [w, rm] of [[320, 0], [375, 0], [768, 0], [1024, 0], [1440, 0], [1440, 1]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 812 : 900 }, reducedMotion: rm ? 'reduce' : 'no-preference', hasTouch: w < 500, isMobile: w < 500 });
  for (const v of vs.split(',')) {
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(`file://${FILE}?v=${id}${v}`); await p.waitForTimeout(1300);
    await p.evaluate(id => document.getElementById(id).scrollIntoView(), id); await p.waitForTimeout(1600);
    const r = await p.evaluate(id => {
      const s = document.getElementById(id), root = s.querySelector('.stage').firstElementChild;
      const lum = c => { const m = c.match(/[\d.]+/g); if (!m) return 1; const [R, G, B] = m.slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * R + 0.7152 * G + 0.0722 * B; };
      const bgOf = el => { while (el) { const cs = getComputedStyle(el); const c = cs.backgroundColor; if (cs.backgroundImage !== 'none' && el !== root) return null; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c) && !/, 0\)$/.test(c)) return c; el = el.parentElement; } return 'rgb(242, 245, 251)'; };
      const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
      const vis = e => { const r = e.getBoundingClientRect(); if (!r.width || !r.height) return false; for (let n = e; n && n !== document.body; n = n.parentElement) { const c = getComputedStyle(n); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) return false; } return true; };
      const els = [...root.querySelectorAll('*')].filter(e => !e.closest('svg') || e.tagName === 'svg');
      const heads = [...root.querySelectorAll('h1,h2')].filter(vis).map(h => { const c = getComputedStyle(h); return `${h.tagName}:${Math.round(parseFloat(c.fontSize))}/${c.fontWeight}${c.textAlign === 'center' ? '/C' : ''}`; });
      const txt = e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
      const caps = els.filter(e => txt(e) && vis(e)).filter(e => { const c = getComputedStyle(e); return c.textTransform === 'uppercase' && parseFloat(c.letterSpacing) > 0.5; }).map(e => e.textContent.trim().slice(0, 20));
      const lowc = []; for (const e of els) { if (!txt(e) || !vis(e) || e.closest('[aria-hidden=true]')) continue; const c = getComputedStyle(e); const bg = bgOf(e); if (!bg) continue; const ratio = cr(c.color, bg); const big = parseFloat(c.fontSize) >= 24 || (parseFloat(c.fontSize) >= 18.6 && +c.fontWeight >= 700); if (ratio < (big ? 3 : 4.5)) lowc.push(`${e.textContent.trim().slice(0, 16)}(${ratio.toFixed(2)})`); }
      const clip = els.filter(e => txt(e) && vis(e) && getComputedStyle(e).whiteSpace === 'nowrap').filter(e => { const r = e.getBoundingClientRect(), pr = (e.closest('section') || document.body).getBoundingClientRect(); return r.right > pr.right + 1 || r.left < pr.left - 1; }).map(e => e.textContent.trim().slice(0, 16));
      const small = [...root.querySelectorAll('a[href],button,input:not([type=radio]),label[for]')].filter(vis).filter(e => { const r = e.getBoundingClientRect(); return r.height < 43.5 && !e.closest('p,li>p'); }).map(e => `${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 14)}:${Math.round(e.getBoundingClientRect().height)}`);
      return { v: s.dataset.v, h: Math.round(s.getBoundingClientRect().height), n: root.querySelectorAll('*').length, ov: document.documentElement.scrollWidth - document.documentElement.clientWidth, heads, caps, lowc, clip, small };
    }, id);
    out.push(`${id} v${v}${r.v !== v ? '(GOT ' + r.v + ')' : ''} @${w}${rm ? ' rm' : ''}: h ${r.h} els ${r.n} ov ${r.ov} heads ${r.heads.join(' ')} caps[${r.caps.join('|')}] lowc[${r.lowc.join('|')}] clip[${r.clip.join('|')}] small[${r.small.join('|')}] err ${errs.length ? errs.join(' | ').slice(0, 160) : 0}`);
    await p.close();
  }
  await ctx.close();
}
console.log(out.join('\n')); await b.close();
