// Master directive light check (amended Rule 1): in every visible version and the page chrome, list every element
// whose own background colour is black or near-black (relative luminance < 0.05), and any large dark area
// (luminance < 0.12 covering > 15 % of its section). Photos, video and canvas are content and are not counted.
const { chromium } = require('playwright');
const keys = 'hero,proof,services,work,built,colour,near,reviews,money,book'.split(',');
const VS = (process.argv[2] || '1,2,3').split(',').map(Number);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto('file://' + require('path').resolve(__dirname, '../../homepage-standalone.html')); await p.waitForTimeout(1200);
  const scan = sel => p.evaluate(sel => {
    const lum = c => { const m = c.match(/[\d.]+/g); if (!m) return 1; let [r, g, b2, a = 1] = m.map(Number); if (c.startsWith('color(')) { r *= 255; g *= 255; b2 *= 255; } if (a < 0.5) return 1; const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b2); };
    const root = document.querySelector(sel), R = root.getBoundingClientRect(), area = R.width * R.height, out = [];
    for (const el of [root, ...root.querySelectorAll('*')]) {
      if (/^(IMG|VIDEO|CANVAS|PICTURE|SOURCE)$/.test(el.tagName) || el.closest('svg') || el.closest('[hidden]')) continue;
      const c = getComputedStyle(el); if (c.display === 'none' || c.visibility === 'hidden' || +c.opacity < 0.05) continue;
      const L = lum(c.backgroundColor); if (L >= 0.12) continue;
      if (/--c|--sw|background/.test((el.getAttribute('style') || '') + (el.parentElement && el.parentElement.getAttribute('style') || ''))) continue;   // paint swatches: product colours are content, like photos
      const r = el.getBoundingClientRect(), a = r.width * r.height; if (a < 4 || Math.min(r.width, r.height) <= 3) continue;   // hairlines and ticks are strokes, not backgrounds
      if (L < 0.05 || a > area * 0.15) out.push(`${el.tagName.toLowerCase()}.${String(el.className).replace(/ /g, '.')}${el.parentElement ? '<' + String(el.parentElement.className).split(' ')[0] : ''} L=${L.toFixed(3)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
    return out;
  }, sel);
  let total = 0;
  for (const k of keys) for (const v of VS) {
    await p.evaluate(([k, v]) => { const s = document.getElementById(k); const t = s.querySelector(`.vsw-b[data-v="${v}"]`); t && t.click(); s.scrollIntoView(); }, [k, v]);
    await p.waitForTimeout(300);
    const o = await scan('#' + k); total += o.length; if (o.length) console.log(`${k}${v}: ${o.slice(0, 6).join(' | ')}`);
  }
  for (const sel of ['header.hd', 'footer.ft', '.picks']) { const o = await scan(sel); total += o.length; if (o.length) console.log(`${sel}: ${o.join(' | ')}`); }
  console.log('dark backgrounds found:', total); await b.close();
})();
