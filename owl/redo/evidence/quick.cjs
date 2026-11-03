const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [name, url] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] }); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.setDefaultTimeout(60000);
try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { console.log('goto', e.message.slice(0, 80)); }
await p.waitForTimeout(8000); console.log('title:', await p.title()); console.log('text:', (await p.evaluate(() => document.body.innerText.slice(0, 300))).replace(/\n/g, ' | '));
console.log('iframes:', await p.evaluate(() => [...document.querySelectorAll('iframe')].map(f => f.src.slice(0, 80)).join(' ')));
try { const c = await (await p.context()).newCDPSession(p); const { data } = await c.send('Page.captureScreenshot', { format: 'jpeg', quality: 50 }); fs.mkdirSync(name, { recursive: true }); fs.writeFileSync(name + '/quick.jpg', Buffer.from(data, 'base64')); console.log('shot ok'); } catch (e) { console.log('shot fail', e.message.slice(0, 80)); }
await b.close(); })();
