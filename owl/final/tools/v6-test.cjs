const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.route('https://**', r => r.abort());
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?hero=6'); await p.waitForTimeout(1800);
  const R = [];
  for (const k of ['repair', 'storm', 'replace']) {
    await p.click(`.hero6 .key[data-k="${k}"]`); await p.waitForTimeout(420);
    if (k === 'storm') await p.screenshot({ path: path.resolve(__dirname, '../gates/wip/v6-curtain.jpg'), clip: { x: 60, y: 100, width: 620, height: 710 }, quality: 75, type: 'jpeg' });
    await p.waitForTimeout(900);
    R.push(await p.evaluate(k => ({ k, pressed: document.querySelector(`.hero6 .key[data-k="${k}"]`).getAttribute('aria-pressed'), seam: document.querySelector('.hero6 .seam b').textContent, ans: document.querySelector('.hero6 .ans p').textContent.slice(0, 40), layers: document.querySelectorAll('.hero6 .cover .lay').length }), k));
  }
  await p.mouse.move(900, 300, { steps: 5 }); await p.mouse.move(1300, 420, { steps: 25 }); await p.waitForTimeout(60);
  await p.screenshot({ path: path.resolve(__dirname, '../gates/wip/v6-topo.jpg'), clip: { x: 680, y: 110, width: 700, height: 420 }, quality: 75, type: 'jpeg' });
  // keyboard: tab to a key and press space
  await p.focus('.hero6 .key[data-k="check"]'); await p.keyboard.press('Space'); await p.waitForTimeout(300);
  R.push({ keyboardCheck: await p.getAttribute('.hero6 .key[data-k="check"]', 'aria-pressed') });
  console.log(JSON.stringify(R)); await b.close();
})();
