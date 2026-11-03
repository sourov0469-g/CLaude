const { chromium } = require('playwright');
(async () => { const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto('file://' + process.argv[2] + '?v=families:2#/home/families', { waitUntil: 'load' }); await p.waitForTimeout(400);
await p.focus('.fv2-next'); for (let i = 0; i < 4; i++) { await p.keyboard.press('Enter'); await p.waitForTimeout(250); }
console.log(JSON.stringify(await p.evaluate(() => ({ nextDisabled: document.querySelector('.fv2-next').disabled, active: document.activeElement.tagName + '.' + document.activeElement.className }))));
await b.close(); })();
