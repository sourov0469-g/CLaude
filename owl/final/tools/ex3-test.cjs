const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?explore=3'); await p.waitForTimeout(800);
  const S = '.explore3'; await p.evaluate(s => document.querySelector(s).scrollIntoView(), S); await p.waitForTimeout(600);
  const R = {};
  await p.click(S + ' .tile[data-i="3"]'); R.wrongHint = await p.textContent(S + ' .hint'); await p.waitForTimeout(500);
  // drag the deck tile onto the roof
  await p.evaluate(s => document.querySelector(s + ' .tray').scrollIntoView({block: 'center'}), S); await p.waitForTimeout(300);
  const t = await (await p.$(S + ' .tile[data-i="0"]')).boundingBox(); const s = await (await p.$(S + ' .site')).boundingBox();
  await p.mouse.move(t.x + 30, t.y + 20); await p.mouse.down(); await p.mouse.move(t.x + 60, t.y + 30, { steps: 4 }); await p.mouse.move(s.x + s.width / 2, s.y + s.height / 2, { steps: 12 }); await p.mouse.up(); await p.waitForTimeout(400);
  R.afterDrag = await p.textContent(S + ' .placed'); R.t = t; R.s = s; R.scroll = await p.evaluate(() => scrollY);
  for (const i of [1, 2, 3, 4, 5, 6]) { await p.focus(S + ` .tile[data-i="${i}"]`); await p.keyboard.press('Enter'); await p.waitForTimeout(250); }
  await p.waitForTimeout(700); R.done = await p.textContent(S + ' .placed'); R.won = await p.evaluate(s => document.querySelector(s + ' .won').classList.contains('on'), S); R.final = (await p.textContent(S + ' .hint')).slice(0, 60);
  await p.screenshot({ path: path.resolve(__dirname, '../gates/wip/ex3-won.jpg'), quality: 75, type: 'jpeg' });
  R.errs = errs; console.log(JSON.stringify(R)); await b.close();
})();
