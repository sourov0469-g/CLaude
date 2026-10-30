import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=';
await p.goto(F + 'area7'); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('area').scrollIntoView()); await p.waitForTimeout(600);
const rd = () => p.evaluate(() => [document.querySelector('.tw7-count').textContent, document.querySelectorAll('.tw7-list li').length, document.querySelectorAll('.tw7-dot.is-in').length]);
const out = [];
for (const v of ['0', '5', '25']) { await p.fill('.tw7-r', v); await p.waitForTimeout(350); out.push([v, ...(await rd())]); }
await p.focus('.tw7-r'); await p.keyboard.press('Home'); for (let i = 0; i < 20; i++) await p.keyboard.press('ArrowRight'); await p.waitForTimeout(350); out.push(['10 by keys', ...(await rd())]);
console.log('v7', JSON.stringify(out));
await p.goto(F + 'area6'); await p.waitForTimeout(1000); console.log('v6 patches', await p.evaluate(() => [...document.querySelectorAll('.tw6-patch')].map(x => x.querySelector('h3').textContent + ':' + x.querySelectorAll('li').length).join(', ')));
await p.goto(F + 'area8'); await p.waitForTimeout(1000); console.log('v8 signs', await p.evaluate(() => document.querySelectorAll('.tw8-s').length));
console.log('errors', errs.length ? errs : 0); await b.close();
