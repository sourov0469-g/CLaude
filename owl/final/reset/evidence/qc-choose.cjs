// Quiet Cubes: make the first choice and record what the page does with it
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const O = path.join(__dirname, 'quietcubes');
  await p.goto('https://quietcubes.com/', { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(12000);
  const pills = await p.evaluate(() => [...document.querySelectorAll('a,button,[role=button],div')].filter(e => /^(Office|Home|Outdoor|Nursing) Pods$/.test((e.textContent || '').trim()) && e.getBoundingClientRect().width < 400).map(e => ({ tag: e.tagName, cls: e.className.toString().slice(0, 80), href: e.getAttribute('href') })).slice(0, 8));
  const before = await p.evaluate(() => ({ url: location.href, h: document.documentElement.scrollHeight, overflow: getComputedStyle(document.body).overflow + '/' + getComputedStyle(document.documentElement).overflow }));
  const t = p.getByText('Home Pods', { exact: true }).first(); let clicked = 'no';
  try { await t.click({ timeout: 8000 }); clicked = 'yes'; } catch (e) { clicked = 'fail ' + e.message.split('\n')[0]; }
  const shots = [];
  for (const [k, ms] of [[1, 400], [2, 900], [3, 1800], [4, 3500]]) { await p.waitForTimeout(ms); const f = path.join(O, `qc-after-${k}.jpg`); await p.screenshot({ path: f, type: 'jpeg', quality: 60 }); shots.push(f); }
  const after = await p.evaluate(() => ({ url: location.href, h: document.documentElement.scrollHeight, overflow: getComputedStyle(document.body).overflow + '/' + getComputedStyle(document.documentElement).overflow, heads: [...document.querySelectorAll('h1,h2,h3')].slice(0, 8).map(h => h.textContent.trim().slice(0, 60)) }));
  for (const [k, f] of [[1, .1], [2, .25], [3, .45]]) { await p.evaluate(f => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), f); await p.waitForTimeout(1500); await p.screenshot({ path: path.join(O, `qc-scroll-${k}.jpg`), type: 'jpeg', quality: 60 }); }
  const res = { pills, before, clicked, after }; fs.writeFileSync(path.join(O, 'choice.json'), JSON.stringify(res, null, 1)); console.log(JSON.stringify(res).slice(0, 1500)); await b.close(); })();
