// MERSI: small scroll steps to see how the split cover and its seam card change
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const O = path.join(__dirname, 'mersi');
  await p.goto('https://www.mersi-architecture.com/', { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(7000);
  const out = [];
  for (const [i, y] of [[0, 0], [1, 300], [2, 700], [3, 1200], [4, 2000], [5, 3200], [6, 5000], [7, 8000]].map(x => x)) {
    await p.mouse.wheel(0, y - (out.length ? out[out.length - 1].y : 0)); await p.waitForTimeout(1400);
    const st = await p.evaluate(() => { const cards = [...document.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 150 && r.width < 700 && r.height > 40 && r.height < 260 && /\d{4}|Hamelin|Berri/.test(e.textContent || '') && e.children.length < 12; }).slice(0, 3).map(e => { const r = e.getBoundingClientRect(); return { t: (e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60), x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width) }; });
      const imgs = [...document.querySelectorAll('img')].filter(im => { const r = im.getBoundingClientRect(); return r.width > 300 && r.bottom > 0 && r.top < innerHeight; }).map(im => { const r = im.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.width), getComputedStyle(im).clipPath.slice(0, 50), getComputedStyle(im.parentElement).clipPath.slice(0, 50)]; }).slice(0, 4);
      return { sy: Math.round(scrollY), cards, imgs }; });
    out.push(Object.assign({ i, y }, st)); await p.screenshot({ path: path.join(O, `step-${i}.jpg`), type: 'jpeg', quality: 55 });
  }
  fs.writeFileSync(path.join(O, 'steps.json'), JSON.stringify(out, null, 1)); console.log(JSON.stringify(out.map(o => ({ i: o.i, sy: o.sy, c: o.cards.map(c => c.t.slice(0, 30) + '@' + c.x), im: o.imgs.map(m => m[0] + '/' + m[1] + ' ' + m[3]) })))); await b.close(); })();
