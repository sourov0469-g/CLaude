// AirPods: is a film scrubbed by scroll? Step forward then back through a sticky stage and record currentTime + frames
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const O = path.join(__dirname, 'airpods');
  await p.goto('https://www.apple.com/airpods-pro/', { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(6000);
  const stages = await p.evaluate(() => [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').map(e => { const host = e.parentElement; const r = host.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), h: Math.round(host.offsetHeight), vids: e.querySelectorAll('video').length, cls: (e.className || '').toString().slice(0, 60) }; }).filter(s => s.h > innerHeight * 1.4));
  const st = stages.find(s => s.vids > 0) || stages[0]; const out = { stages: stages.slice(0, 12), chosen: st, steps: [] };
  if (st) { const seq = [0, .2, .4, .6, .8, .6, .4, .2];
    for (let i = 0; i < seq.length; i++) { const y = st.top + (st.h - 900) * seq[i]; await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(900);
      const t = await p.evaluate(y => [...document.querySelectorAll('video')].map(v => { const r = v.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight ? +v.currentTime.toFixed(2) : null; }).filter(x => x !== null), y);
      out.steps.push({ f: seq[i], times: t }); await p.screenshot({ path: path.join(O, `scrub-${i}-${Math.round(seq[i] * 100)}.jpg`), type: 'jpeg', quality: 55 }); } }
  fs.writeFileSync(path.join(O, 'scrub.json'), JSON.stringify(out, null, 1)); console.log(JSON.stringify({ chosen: out.chosen, steps: out.steps })); await b.close(); })();
