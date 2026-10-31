// REBRAND text hierarchy, measured [S1434 four levels, >= 1.5x or a clear weight step; S0011 typography spec].
// Per visible version: L2 = largest heading (visual size: 'Elbaz Display' renders at 74%), L3 = body (the size carrying the
// most characters among non-heading text), L4 = fine print (smallest text size with >= 12 characters).
// Pass when L2/L3 >= 1.5 and (L3/L4 >= 1.5 or weight(L4) - weight(L3) >= 200 or weight(L3) - weight(L4) >= 200).
// Per page: L1 (h1 of the first section) against the median L2 of the other sections.
const { chromium } = require('playwright'); const fs = require('fs');
const FILE = process.env.FILE, SECS = process.env.SECS.split(','), SLOTS = (process.env.SLOTS || '1,2,3,4,5').split(',');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +(process.env.W || 1440), height: 900 }, reducedMotion: 'reduce' });
  await p.goto(FILE); await p.waitForTimeout(1500);
  const rows = []; let fails = 0; const h2s = []; let h1 = null;
  for (const s of SECS) for (const v of SLOTS) {
    const ok = await p.evaluate(([s, v]) => { const el = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]'); if (!el) return false; EZ.activate(s, v); return true; }, [s, v]);
    if (!ok) continue; await p.waitForTimeout(250);
    const r = await p.evaluate(([s, v]) => {
      const ver = document.querySelector('#' + s + ' .ver[data-v="' + v + '"]');
      const vis = n => { const c = getComputedStyle(n); const q = n.getBoundingClientRect(); return q.width > 0 && q.height > 0 && c.visibility !== 'hidden' && +c.opacity > 0; };
      const size = c => parseFloat(c.fontSize) * (/Elbaz Display/.test(c.fontFamily.split(',')[0]) ? .74 : 1);
      let head = 0, headTag = '', w = {}, small = 1e9, smallW = 400;
      ver.querySelectorAll('h1,h2').forEach(h => { if (!vis(h)) return; const z = size(getComputedStyle(h)); if (z > head) { head = z; headTag = h.tagName; } });
      const tw = document.createTreeWalker(ver, NodeFilter.SHOW_TEXT); let n;
      while ((n = tw.nextNode())) {
        const t = n.nodeValue.trim(); if (!t) continue; const el = n.parentElement; if (!el || !vis(el) || el.closest('h1,h2,h3,svg,button,.btn,[aria-hidden="true"],label')) continue;
        const c = getComputedStyle(el), z = Math.round(size(c) * 10) / 10;
        w[z] = (w[z] || 0) + t.length;
        if (t.length >= 3 && z < 15 && z < small) { small = z; smallW = +c.fontWeight; }
      }
      let body = 0, bodyN = 0; for (const k in w) if (+k >= 15 && w[k] > bodyN) { bodyN = w[k]; body = +k; }
      if (!body) for (const k in w) if (w[k] > bodyN) { bodyN = w[k]; body = +k; }
      const bodyW = (() => { const tw2 = document.createTreeWalker(ver, NodeFilter.SHOW_TEXT); let m; while ((m = tw2.nextNode())) { const el = m.parentElement; if (el && !el.closest('h1,h2,h3,svg,button,.btn,label') && m.nodeValue.trim().length > 20 && Math.abs(size(getComputedStyle(el)) - body) < .2) return +getComputedStyle(el).fontWeight; } return 400; })();
      return { head, headTag, body, small: small === 1e9 ? body : small, bodyW, smallW };
    }, [s, v]);
    const r1 = r.head / r.body, r2 = r.body / r.small, wstep = Math.abs(r.smallW - r.bodyW);
    const pass = r1 >= 1.5 && (r2 >= 1.5 || wstep >= 200 || r.small === r.body);
    if (!pass) fails++;
    if (r.headTag === 'H1' && !h1) h1 = r.head; else if (r.headTag === 'H2') h2s.push(r.head);
    rows.push(`${s}${v}\thead ${r.head.toFixed(1)}px (${r.headTag})\tbody ${r.body}px w${r.bodyW}\tfine ${r.small}px w${r.smallW}\thead/body ${r1.toFixed(2)}\tbody/fine ${r2.toFixed(2)} wstep ${wstep}\t${pass ? 'pass' : 'FAIL'}`);
  }
  h2s.sort((a, c) => a - c); const mh2 = h2s[Math.floor(h2s.length / 2)];
  const out = rows.join('\n') + `\n\npage: L1 h1 ${h1 && h1.toFixed(1)}px vs median L2 h2 ${mh2 && mh2.toFixed(1)}px = ${h1 && mh2 ? (h1 / mh2).toFixed(2) : '-'}\nversion fails: ${fails}\n`;
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, out); console.log(out); await b.close();
})();
