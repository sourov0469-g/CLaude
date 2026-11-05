const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const c = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await c.newPage();
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final-area.html'); await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  await p.evaluate(() => scrollTo({ top: scrollY + document.querySelector('.ar-board').getBoundingClientRect().top - 330, behavior: 'instant' })); await p.waitForTimeout(1500);
  await p.focus('.ar-chip[data-t="all"]'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.waitForTimeout(900);
  await p.screenshot({ path: '/home/user/CLaude/siding/redo/final/gate/area-1440-focus-sign.png' });
  await p.focus('.ar-c:nth-child(3) .ar-card'); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab'); await p.waitForTimeout(900);
  await p.screenshot({ path: '/home/user/CLaude/siding/redo/final/gate/area-1440-focus-card.png' });
  await b.close();
})();
