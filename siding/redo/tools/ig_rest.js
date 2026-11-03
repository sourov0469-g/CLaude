// Immersive Garden, decisive test: wait for the intro to finish ("Scroll down" shown) with NO input, then
// (1) does the hero relief appear on its own? (2) does it move at rest? (3) what does a pointer pass change, near vs far from the path?
const {chromium} = require('playwright'); const fs = require('fs'); const O = __dirname + '/../evidence/immersive-garden/rest/'; fs.mkdirSync(O, {recursive: true});
(async () => {
  const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']});
  const p = await (await b.newContext({viewport: {width: 1440, height: 900}})).newPage();
  const t0 = Date.now(); await p.goto('https://immersive-g.com/', {waitUntil: 'domcontentloaded', timeout: 60000});
  const T = () => ((Date.now() - t0) / 1000).toFixed(1);
  const shot = async n => { await p.screenshot({path: O + n + '.png'}); console.log(T() + 's', n); };
  // no input at all for ~110 s: shoot every ~8 s and log the counter text, to see whether the hero relief appears by itself
  for (let i = 0; i < 12; i++) { await p.waitForTimeout(6000); const c = await p.evaluate(() => { const e = [...document.querySelectorAll('body *')].find(x => x.children.length === 0 && /^(\d{1,3}|scroll down)$/i.test(x.textContent.trim()) && x.getBoundingClientRect().left > 400); return e ? e.textContent.trim() + ' op ' + getComputedStyle(e).opacity : '-'; }); console.log(T() + 's counter', c); await shot('noinput-' + String(i).padStart(2, '0')); }
  await p.waitForTimeout(4000); await shot('r1-rest-a'); await p.waitForTimeout(3000); await shot('r2-rest-b');
  await p.mouse.move(150, 600); await p.waitForTimeout(200); await p.mouse.move(1300, 600, {steps: 40}); await shot('r3-pass-0');
  await p.waitForTimeout(400); await shot('r4-pass-400'); await p.waitForTimeout(2500); await shot('r5-pass-3000');
  await b.close();
})();
