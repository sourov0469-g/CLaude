const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?explore=3'); await p.waitForTimeout(800);
  const S = '.explore3'; await p.evaluate(s => document.querySelector(s).scrollIntoView(), S); await p.waitForTimeout(600);
  await p.click(S + ' .tile[data-i="3"]'); await p.waitForTimeout(500);
  await p.evaluate(() => { const t = document.querySelector('.explore3 .tile[data-i="0"]'); ['pointerdown','pointermove','pointerup','click','lostpointercapture'].forEach(n => t.addEventListener(n, e => { (window.__l = window.__l || []).push(n + ':' + Math.round(e.clientX)); })); });
  const t = await (await p.$(S + ' .tile[data-i="0"]')).boundingBox(); const s = await (await p.$(S + ' .site')).boundingBox();
  await p.mouse.move(t.x + 30, t.y + 20); await p.mouse.down(); await p.mouse.move(t.x + 60, t.y + 30, { steps: 4 }); await p.mouse.move(s.x + s.width / 2, s.y + s.height / 2, { steps: 12 }); 
  const ghost = await p.evaluate(() => !!document.querySelector('.ghost'));
  await p.mouse.up(); await p.waitForTimeout(400);
  console.log(ghost, JSON.stringify(await p.evaluate(() => window.__l.slice(0, 8).concat(window.__l.slice(-5)))), await p.textContent(S + ' .placed'), JSON.stringify(t), JSON.stringify(s)); await b.close();
})();
