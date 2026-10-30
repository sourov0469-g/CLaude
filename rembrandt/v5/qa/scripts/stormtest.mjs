import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=';
await p.goto(F + 'storm6'); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('storm').scrollIntoView()); await p.waitForTimeout(600);
const it = p.locator('.st6-item'); await it.nth(0).click(); await it.nth(4).click();
await p.keyboard.press('Tab'); // focus moves on; Space on a focused box
await p.locator('.st6-item input').nth(2).focus(); await p.keyboard.press('Space'); await p.waitForTimeout(400);
const s6 = await p.evaluate(() => [document.querySelector('.st6-count').textContent, document.querySelectorAll('.st6-row.is-on').length]);
await it.nth(0).click(); await p.waitForTimeout(400);
const s6b = await p.evaluate(() => [document.querySelector('.st6-count').textContent, document.querySelectorAll('.st6-row.is-on').length]);
console.log('v6 after 3 ticks', s6, 'after untick', s6b);
await p.goto(F + 'storm7'); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('storm').scrollIntoView()); await p.waitForTimeout(600);
const r = [];
for (const i of [3, 1, 2]) { await p.click(`.st7-spot[data-i="${i}"]`); await p.waitForTimeout(300); r.push(await p.evaluate(() => [[...document.querySelectorAll('.st7-spot')].findIndex(s => s.getAttribute('aria-pressed') === 'true'), [...document.querySelectorAll('.st7-note')].findIndex(n => !n.hidden)].join('='))); }
const sz = await p.evaluate(() => { const r = document.querySelector('.st7-spot').getBoundingClientRect(); return r.width + 'x' + r.height; });
console.log('v7 spots chosen->note', r, 'target', sz);
console.log('errors', errs.length ? errs : 0); await b.close();
