// Windows page: interaction-state screenshots (gate/page-windows-state-*.png)
const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final-windows.html#/windows', G = '/home/user/CLaude/siding/redo/final/gate/';
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const to = async (sel) => { await p.evaluate((s) => { const el = document.querySelector(s); scrollTo({ top: scrollY + el.getBoundingClientRect().top - 90, behavior: 'instant' }); }, sel); await p.waitForTimeout(500); };
  // opener: mid pull
  await to('.pw-open'); await p.click('.pw-hook', { force: true }).catch(() => {}); await p.keyboard.press('Home'); await p.waitForTimeout(300); for (let i = 0; i < 5; i++) await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(400); await p.screenshot({ path: G + 'page-windows-state-tape-mid.png' });
  // parts: pulled apart
  await to('.pw-parts'); await p.evaluate(() => { const r = document.querySelector('#pw-pull'); r.value = 100; r.dispatchEvent(new Event('input')); }); await p.waitForTimeout(400); await p.screenshot({ path: G + 'page-windows-state-parts-exe.png' });
  await p.click('.pw-lines [role=radio]:nth-child(4)'); await p.evaluate(() => { const r = document.querySelector('#pw-pull'); r.value = 100; r.dispatchEvent(new Event('input')); }); await p.click('.pw-plist li:nth-child(3) button'); await p.waitForTimeout(500); await p.screenshot({ path: G + 'page-windows-state-parts-sim.png' });
  // order steps
  await to('.pw-order'); for (const k of [1, 2, 3, 4]) { await p.focus('.pw-mark'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); await p.screenshot({ path: G + `page-windows-state-order-${k + 1}.png` }); }
  // price: andersen
  await to('.pw-price'); await p.click('.pw-chips [role=radio]:nth-child(4)'); await p.hover('.pw-col:nth-child(6)'); await p.waitForTimeout(400); await p.screenshot({ path: G + 'page-windows-state-price.png' });
  await b.close(); console.log('done'); })();
