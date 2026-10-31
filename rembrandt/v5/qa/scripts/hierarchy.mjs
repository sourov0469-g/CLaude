// R6 Step 3: the four type levels (visual-hierarchy S1434), measured on every visible version at 1440 and 375.
// L1 = the page H1; L2 = the largest visible section or group heading (h2/h3: Services V4/V5 label their groups with small
// h2 kickers and title each service with an h3); L3 = body paragraphs at reading weight (modal size, weight <= 500);
// L4 = labels (.t-label, .r4-lab, .hx-lab). Each adjacent pair passes on a 1.5x size step OR a weight step >= 200 (the directive).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const PAGES = [['rembrandt-homepage.html', ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]];
const b = await chromium.launch(); let bad = 0; const rows = [];
for (const w of [1440, 375]) for (const [file, ids, n] of PAGES) for (let v = 1; v <= n; v++) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${ids.map(i => i + v).join(',')}`); await p.waitForTimeout(700);
  const r = await p.evaluate(() => {
    const ok = e => e.offsetParent !== null && !e.closest('.on-bk,.on-rec,.pick,.cmp,[aria-hidden="true"]') && getComputedStyle(e).visibility !== 'hidden';
    const fs = e => parseFloat(getComputedStyle(e).fontSize), fw = e => +getComputedStyle(e).fontWeight;
    const h1 = [...document.querySelectorAll('h1')].find(ok);
    const h2s = [...document.querySelectorAll('h2,h3')].filter(ok); const big = h2s.sort((a, b) => fs(b) - fs(a))[0];
    const ps = [...document.querySelectorAll('.sec p, .sec li')].filter(e => ok(e) && (e.textContent || '').trim().length > 50 && !e.closest('h1,h2,h3') && fw(e) <= 500);
    const cnt = {}; for (const e of ps) { const k = fs(e) + '/' + fw(e); cnt[k] = (cnt[k] || 0) + 1; }
    const body = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0];
    const lab = [...document.querySelectorAll('.t-label,.r4-lab,.hx-lab')].find(ok);
    return { h1: h1 && [fs(h1), fw(h1), h1.textContent.trim().slice(0, 30)], h2: big && [fs(big), fw(big), big.textContent.trim().slice(0, 30)], body: body && body[0].split('/').map(Number), lab: lab && [fs(lab), fw(lab)] };
  });
  const f = [];
  const step = (a, b) => a[0] / b[0] >= 1.5 - 1e-3 || Math.abs(a[1] - b[1]) >= 200;
  if (r.h1 && r.h2 && !step(r.h1, r.h2)) f.push(`L1/L2 ${(r.h1[0] / r.h2[0]).toFixed(2)} (${r.h1[0]} vs "${r.h2[2]}" ${r.h2[0]})`);
  if (r.h2 && r.body && !step(r.h2, r.body)) f.push(`L2/L3 ${(r.h2[0] / r.body[0]).toFixed(2)}`);
  if (r.body && r.lab && !step(r.body, r.lab)) f.push(`L3/L4 no step (${r.body} vs ${r.lab})`);
  if (f.length) bad++;
  rows.push(`${w} ${file} v${v}: L1 ${r.h1 && r.h1[0]}/${r.h1 && r.h1[1]}  L2 ${r.h2 && r.h2[0]}/${r.h2 && r.h2[1]}  L3 ${r.body}  L4 ${r.lab}  ${f.length ? 'FAIL ' + f.join('; ') : 'ok'}`);
  await p.context().close();
}
console.log(rows.join('\n')); console.log('hierarchy failures', bad); await b.close();
