import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + process.argv[2] + '#/contact/ct-message', { waitUntil: 'load' }); await p.waitForTimeout(300);
await p.fill('#km-name-2', 'Pat'); await p.fill('#km-msg-2', 'Shingles off after the wind.'); await p.fill('#km-zip-2', '55126');
const pre = await p.evaluate(() => document.querySelector('.km2-pre').textContent);
console.log((/Shingles off after the wind\./.test(pre) && /– Pat/.test(pre) && /ZIP: 55126/.test(pre) ? 'PASS' : 'FAIL') + '  V2 preview shows exactly what will be sent'); console.log((errs.length ? 'FAIL' : 'PASS') + '  no JS errors'); await b.close();
