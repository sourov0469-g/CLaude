const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final.html', { waitUntil: 'load' }); await p.waitForTimeout(2800);
  await p.mouse.move(500, 700); await p.mouse.move(900, 640, { steps: 5 }); await p.waitForTimeout(90); await p.screenshot({ path: 'rv/cursor_move.png', clip: { x: 700, y: 540, width: 360, height: 200 } });
  await p.waitForTimeout(900); await p.screenshot({ path: 'rv/cursor_rest.png', clip: { x: 760, y: 560, width: 240, height: 160 } });
  await b.close(); })();
