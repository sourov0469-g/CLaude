// Page-level measures (audit pack 2026-10-30 C2-C4): per section x version at 1440: background, height, element count,
// every h1/h2 size/weight/alignment, eyebrow-like labels (uppercase + tracking), muted-text contrast below 4.5:1.
// usage: node measure.mjs <file> [versions e.g. 1,2,3,4,5]
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [FILE, vs = '1,2,3,4,5'] = process.argv.slice(2);
const IDS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'];
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const p = await ctx.newPage(); await p.goto('file://' + FILE); await p.waitForTimeout(1500);
const out = [];
for (const id of IDS) for (const v of vs.split(',')) {
  const ok = await p.evaluate(([id, v]) => !!document.getElementById(`v-${id}-${v}`), [id, v]); if (!ok) continue;
  await p.evaluate(([id, v]) => { const s = document.getElementById(id); s.scrollIntoView(); const i = document.getElementById(`v-${id}-${v}`); if (!i.checked) { i.checked = true; i.dispatchEvent(new Event('change', { bubbles: true })); } }, [id, v]);
  await p.waitForTimeout(900);
  out.push(await p.evaluate(([id, v]) => {
    const s = document.getElementById(id), r = s.querySelector('.stage').firstElementChild;
    const lum = c => { const m = c.match(/[\d.]+/g); if (!m) return null; const [R, G, B] = m.slice(0, 3).map(x => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * R + 0.7152 * G + 0.0722 * B; };
    const bgOf = el => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c) && !/, 0\)$/.test(c)) return c; el = el.parentElement; } return 'rgb(242, 245, 251)'; };
    const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const heads = [...s.querySelectorAll('h1,h2')].filter(h => h.getClientRects().length).map(h => { const c = getComputedStyle(h); return `${h.tagName}:${Math.round(parseFloat(c.fontSize))}/${c.fontWeight}${c.textAlign === 'center' ? '/C' : ''}`; });
    const eyebrows = [...s.querySelectorAll('p,span,div,small,strong,em,li')].filter(e => { if (!e.childNodes.length || ![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2)) return false; const c = getComputedStyle(e); return c.textTransform === 'uppercase' && parseFloat(c.letterSpacing) > 0.5 && e.getClientRects().length; }).map(e => e.textContent.trim().slice(0, 24));
    const lowc = [];
    for (const e of s.querySelectorAll('*')) { if (!e.getClientRects().length) continue; const t = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1); if (!t) continue; const c = getComputedStyle(e); if (c.visibility === 'hidden' || +c.opacity === 0) continue; const ratio = cr(c.color, bgOf(e)); const big = parseFloat(c.fontSize) >= 24 || (parseFloat(c.fontSize) >= 18.6 && +c.fontWeight >= 700); if (ratio < (big ? 3 : 4.5)) lowc.push(`${e.textContent.trim().slice(0, 18)}(${ratio.toFixed(2)})`); }
    return `${id} v${v}: bg ${getComputedStyle(s).getPropertyValue('--sec-bg').trim()} h ${Math.round(s.getBoundingClientRect().height)} els ${r.querySelectorAll('*').length} heads ${heads.join(' ')} eyebrows [${eyebrows.join('|')}] lowcontrast [${lowc.slice(0, 6).join('|')}${lowc.length > 6 ? '|+' + (lowc.length - 6) : ''}]`;
  }, [id, v]));
}
console.log(out.join('\n')); await b.close();
