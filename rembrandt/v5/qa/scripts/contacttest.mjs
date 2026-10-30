// R5 Contact click-through (per-section page): head V2 card turns (click and Enter, inert follows), head V3 "Now" line
// matches Springboro's clock, body V2 ring = 23 dots + office, body V3 distance-band tabs (click, arrows, Home/End, each
// band's towns within its miles, 24 in all), body V5 town checker (yes with miles, no + call), errors 0.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
const F = 'file:///home/user/CLaude/rembrandt/v5/contact.html?v='; let bad = 0; const ok = (c, m) => { if (!c) bad++; console.log((c ? 'PASS ' : 'FAIL ') + m); };
await p.goto(F + 'cthero2'); await p.waitForTimeout(1000);
const st = () => p.evaluate(() => [document.querySelector('.kt2-turn').getAttribute('aria-pressed'), document.querySelector('.kt2-front').inert, document.querySelector('.kt2-back').inert].join());
const a = await st(); await p.click('.kt2-turn'); await p.waitForTimeout(500); const b2 = await st(); await p.keyboard.press('Enter'); await p.waitForTimeout(500); const c = await st();
ok(a === 'false,false,true' && b2 === 'true,true,false' && c === 'false,false,true', `head V2 card turns and back (${a} | ${b2} | ${c})`);
await p.goto(F + 'cthero3'); await p.waitForTimeout(1000);
const w = await p.evaluate(() => { const n = document.querySelector('.kt3-now'), t = document.querySelector('.kt3-day.is-today'), r = n.getBoundingClientRect(), bar = t.querySelector('.kt3-bar').getBoundingClientRect();
  const h = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' }).format(new Date()), m = +new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', minute: 'numeric' }).format(new Date());
  return [t.querySelector('b').textContent, new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long' }).format(new Date()), Math.abs((r.left - bar.left) / bar.width * 24 - (h + m / 60)) < 0.2, document.querySelector('[data-hours]').textContent]; });
ok(w[0] === w[1] && w[2] && !/open now/i.test(w[3]), `head V3 today marked (${w[0]}), Now line at the clock, hours line "${w[3]}"`);
await p.goto(F + 'contact2'); await p.waitForTimeout(1000);
const r = await p.evaluate(() => [document.querySelectorAll('.ct-ring-dot').length, document.querySelectorAll('.ct2-list li').length]);
ok(r[0] === 23 && r[1] === 24, `body V2 ring ${r[0]} dots + office, list ${r[1]}`);
await p.goto(F + 'contact3'); await p.waitForTimeout(1000);
const bands = await p.evaluate(() => [...document.querySelectorAll('.ct3-pan ul')].map(u => [u.dataset.band, [...u.querySelectorAll('li')].map(li => li.querySelector('.num').textContent)]));
const inBand = bands.every(([bd, mis]) => { const [lo, hi] = bd.split('-').map(Number); return mis.every(x => { const v = x === 'Home' ? 0 : parseFloat(x); return v >= lo && (v < hi || (hi === 25 && v <= hi)); }); });
ok(inBand && bands.reduce((n, x) => n + x[1].length, 0) === 24, `body V3 bands ${bands.map(x => x[0] + ':' + x[1].length).join(' ')}; every town inside its band`);
await p.click('#ct3-t2'); const t1 = await p.evaluate(() => [document.activeElement.id, [...document.querySelectorAll('.ct3-pan')].map(x => x.hidden ? 0 : 1).join('')]);
await p.focus('#ct3-t2'); await p.keyboard.press('ArrowRight'); const t2 = await p.evaluate(() => [document.activeElement.id, [...document.querySelectorAll('.ct3-pan')].map(x => x.hidden ? 0 : 1).join('')]);
await p.keyboard.press('Home'); const t3 = await p.evaluate(() => document.activeElement.id);
ok(t1[1] === '0010' && t2[0] === 'ct3-t3' && t2[1] === '0001' && t3 === 'ct3-t0', `body V3 tabs: click ${t1[1]}, ArrowRight ${t2.join(' ')}, Home ${t3}`);
await p.goto(F + 'contact5'); await p.waitForTimeout(1000);
const ask = async q => { await p.fill('.ct5-in', q); await p.waitForTimeout(80); return p.evaluate(() => [document.querySelector('.ct5-out').classList.contains('is-yes'), document.querySelector('.ct5-out').textContent]); };
const y1 = await ask('Franklin'), y2 = await ask('yellow springs'), n1 = await ask('Cincinnati');
ok(y1[0] && /3\.3 miles west/.test(y1[1]) && y2[0] && !n1[0] && /746-7377/.test(n1[1]), `body V5 checker: "${y1[1]}" / "${y2[1]}" / "${n1[1]}"`);
ok(!errs.length, `errors ${errs.length ? errs.join(' | ') : 0}`);
console.log('bad', bad); await b.close();
