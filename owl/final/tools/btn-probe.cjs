// Reference button study: node btn-probe.cjs <name> <url>   → gates/buttons/study/<name>.json + .jpg
// For CTA-like buttons: structure, every transition, and what changes on hover (120 ms, 700 ms), press and keyboard focus,
// on the element, its descendants and their ::before/::after. Stops at bot walls (never bypassed).
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [name, url] = process.argv.slice(2); const OUT = path.resolve(__dirname, '../gates/buttons/study'); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' });
  const p = await ctx.newPage(); const res = { name, url, buttons: [] };
  try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { res.gotoError = e.message.slice(0, 120); }
  await p.waitForTimeout(6000);
  const head = await p.evaluate(() => document.title + ' ' + (document.body ? document.body.innerText.slice(0, 300) : ''));
  if (/just a moment|attention required|verify you are human|captcha|access denied/i.test(head)) { res.botWall = true; fs.writeFileSync(path.join(OUT, name + '.json'), JSON.stringify(res, null, 1)); console.log(name, 'BOT WALL, stopped'); await b.close(); return; }
  // dismiss nothing; pick CTA-like elements (filled or bordered, padded, with text), on the first two screens
  const ids = await p.evaluate(() => { const out = []; let n = 0;
    for (const e of document.querySelectorAll('a, button')) { const r = e.getBoundingClientRect(); if (!r.width || r.height < 28 || r.top > 1700 || r.top < 0) continue; const s = getComputedStyle(e);
      const filled = s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none' || parseFloat(s.borderTopWidth) > 0 || [...e.querySelectorAll('*')].some(c => getComputedStyle(c).backgroundColor !== 'rgba(0, 0, 0, 0)');
      const txt = (e.innerText || e.getAttribute('aria-label') || '').trim(); if (!filled || !txt || txt.length > 40 || r.width > 520) continue;
      e.dataset.bp = n; out.push(n++); if (n >= 7) break; } return out; });
  const snap = (id) => p.evaluate((id) => { const e = document.querySelector('[data-bp="' + id + '"]'); const nodes = [e, ...e.querySelectorAll('*')].slice(0, 14); const o = [];
    nodes.forEach((n, i) => { for (const ps of [null, '::before', '::after']) { const s = getComputedStyle(n, ps); if (ps && (s.content === 'none' || s.content === '')) continue;
      o.push({ k: i + (ps || ''), tag: n.tagName, cls: (n.className && n.className.baseVal === undefined ? String(n.className) : '').slice(0, 60), transform: s.transform, bg: s.backgroundColor, bgi: s.backgroundImage.slice(0, 80), color: s.color, opacity: s.opacity, clip: s.clipPath, shadow: s.boxShadow.slice(0, 80), w: Math.round(n.getBoundingClientRect().width), radius: s.borderRadius, outline: s.outlineStyle + ' ' + s.outlineWidth, transition: s.transition.slice(0, 220) }); } }); return o; }, id);
  const diff = (A, B) => { const d = []; A.forEach((a, i) => { const bb = B.find(x => x.k === a.k); if (!bb) return; for (const f of ['transform', 'bg', 'bgi', 'color', 'opacity', 'clip', 'shadow', 'w', 'outline']) if (a[f] !== bb[f]) d.push(a.k + ' ' + a.tag + ' ' + f + ': ' + a[f] + ' → ' + bb[f]); }); return d; };
  for (const id of ids) { try {
    const el = await p.$('[data-bp="' + id + '"]'); await el.scrollIntoViewIfNeeded(); await p.mouse.move(5, 5); await p.waitForTimeout(400);
    const info = await el.evaluate(e => ({ text: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 40), html: e.outerHTML.replace(/\s+/g, ' ').slice(0, 420) }));
    const rest = await snap(id); const bb = await el.boundingBox();
    await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, { steps: 4 }); await p.waitForTimeout(120); const h1 = await snap(id); await p.waitForTimeout(600); const h2 = await snap(id);
    await p.mouse.down(); await p.waitForTimeout(150); const pr = await snap(id); await p.mouse.move(5, 5); await p.mouse.up(); await p.waitForTimeout(600);
    await p.keyboard.press('Escape').catch(() => {}); await el.evaluate(e => e.blur());
    await el.focus(); await p.keyboard.press('Shift'); const f1 = await snap(id); await el.evaluate(e => e.blur());
    res.buttons.push({ ...info, transitions: [...new Set(rest.map(r => r.k + ' ' + r.tag + ' ' + r.transition).filter(t => !/ all 0s| none 0s|^\S+ \S+ all$/.test(t)))].slice(0, 12), hover120: diff(rest, h1).slice(0, 14), hover700: diff(rest, h2).slice(0, 14), press: diff(h2, pr).slice(0, 10), focus: diff(rest, f1).slice(0, 8) });
  } catch (e) { res.buttons.push({ id, error: e.message.slice(0, 120) }); } }
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 55 });
  fs.writeFileSync(path.join(OUT, name + '.json'), JSON.stringify(res, null, 1)); console.log(name, 'buttons', res.buttons.length); await b.close();
})();
