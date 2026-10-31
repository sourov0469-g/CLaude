// REBRAND challenge (S1435 isolation inflation, S0071 one colour one meaning): in every visible version, count what
// the accent paints. (1) teal fills: solid (the primary) and tint blocks that are not a selected state; (2) teal text
// that is not inside something interactive, i.e. highlights a visitor could mistake for links.
// NODE_PATH=$(npm root -g) node qa/v9/accent.js [pages]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const PAGES = (process.argv[2] || 'index,siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
const BASE = process.env.QBASE || 'http://127.0.0.1:8765/';
(async () => {
  const b = await chromium.launch(); const rows = []; const tally = { views: 0, tintMax: 0, tintViews: {}, textNonInt: 0, textNonIntUnderlined: 0, samples: {} };
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(BASE + 'site/' + pg + '.html'); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 });
    const secs = await p.evaluate(() => [...document.querySelectorAll('.sec:not([data-bk])')].map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length })));
    for (const s of secs) for (let v = 1; v <= Math.max(1, s.n); v++) {
      const r = await p.evaluate(([id, v]) => new Promise(res => { const sec = document.getElementById(id); const t = sec.querySelector(`.vsw-b[data-v="${v}"]`); if (t) t.click(); setTimeout(() => {
        const TINT = ['rgb(212, 238, 234)', 'rgb(195, 231, 225)'], SOLID = ['rgb(0, 115, 106)', 'rgb(1, 101, 92)'], TXT = ['rgb(0, 90, 82)', 'rgb(5, 47, 42)', 'rgb(0, 115, 106)'];
        const st = sec.querySelector('.stage') || sec; const tints = [], solids = [], texts = [];
        for (const el of st.querySelectorAll('*')) {
          if (!el.checkVisibility() || el.closest('svg, [data-bk]')) continue;
          const c = getComputedStyle(el), r = el.getBoundingClientRect(); if (r.width < 4 || r.height < 4) continue;
          const selected = el.closest('[aria-selected="true"], [aria-checked="true"], [aria-pressed="true"], .vsw');
          if (TINT.includes(c.backgroundColor) && !selected && !(el.parentElement && TINT.includes(getComputedStyle(el.parentElement).backgroundColor))) tints.push(el.className.toString().split(' ')[0] || el.tagName);
          if (SOLID.includes(c.backgroundColor)) solids.push(el.className.toString().split(' ')[0] || el.tagName);
          const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          if (own && TXT.includes(c.color) && !el.closest('a, button, [role], label, summary, input, select')) texts.push({ t: el.textContent.trim().slice(0, 24), cls: el.className.toString().split(' ')[0] || el.tagName, u: c.textDecorationLine.includes('underline') });
        }
        res({ tints, solids, texts });
      }, 250); }), [s.id, v]);
      tally.views++;
      const key = `${pg}:${s.id}:${v}`;
      tally.tintMax = Math.max(tally.tintMax, r.tints.length); tally.tintViews[r.tints.length] = (tally.tintViews[r.tints.length] || 0) + 1;
      if (r.tints.length >= 3) rows.push(`TINTS ${key}: ${r.tints.length} (${[...new Set(r.tints)].join(', ')})`);
      tally.textNonInt += r.texts.length; tally.textNonIntUnderlined += r.texts.filter(x => x.u).length;
      r.texts.forEach(x => { tally.samples[x.cls] = (tally.samples[x.cls] || 0) + 1; });
    }
    await p.close();
  }
  const out = [`views ${tally.views}; tint blocks per view histogram ${JSON.stringify(tally.tintViews)}; max ${tally.tintMax}`, `teal text outside interactive elements: ${tally.textNonInt} (underlined ${tally.textNonIntUnderlined}); by class ${JSON.stringify(Object.entries(tally.samples).sort((a, b) => b[1] - a[1]).slice(0, 20))}`, ...rows];
  console.log(out.join('\n')); fs.writeFileSync(path.join(__dirname, 'accent.txt'), out.join('\n') + '\n'); await b.close();
})();
