// Our work page: interaction-state screenshots (gate/page-work-state-*.png)
const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final-work.html#/our-work', G = '/home/user/CLaude/siding/redo/final/gate/';
(async () => { const b = await chromium.launch(); const w = +(process.argv[2] || 1440); const p = await b.newPage({ viewport: { width: w, height: 900 } });
  p.on('pageerror', e => console.log('PAGEERR', e.message)); await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const to = async (sel, off = 90) => { await p.evaluate(([s, o]) => { const el = document.querySelector(s); scrollTo({ top: scrollY + el.getBoundingClientRect().top - o, behavior: 'instant' }); }, [sel, off]); await p.waitForTimeout(600); };
  await to('.po-case .po-cgrid', 100);
  for (const k of [2, 3, 4]) { await p.focus('.po-hd2'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); if (k !== 2) await p.screenshot({ path: G + `page-work-state-case-${w}-${k}.png` }); }
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); await p.screenshot({ path: G + `page-work-state-case-${w}-end.png` });
  await to('.po-gal .po-chips', 80); await p.click('.po-chip[data-k=windows]'); await p.waitForTimeout(700); await p.screenshot({ path: G + `page-work-state-filter-${w}.png` });
  await p.click('.po-gi:not([hidden]) .po-card'); await p.waitForTimeout(1600); await p.screenshot({ path: G + `page-work-state-viewer-${w}.png` });
  await p.keyboard.press('ArrowRight'); await p.waitForTimeout(1500); await p.screenshot({ path: G + `page-work-state-viewer2-${w}.png` });
  await p.keyboard.press('Escape'); await p.waitForTimeout(400); console.log('focus after close:', await p.evaluate(() => document.activeElement.className));
  await b.close(); console.log('done'); })();
