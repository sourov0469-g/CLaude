// Windows page (#/windows) test: node tools/page_windows_test.js   (build first: python3 tools/pbuild.py windows out/final-windows.html)
const L = require('./page_test_lib'); const { chromium, fs, ok, open, to, audit, report } = L;
const U = 'file:///home/user/CLaude/siding/redo/final/out/final-windows.html#/windows', SC = '#pg-windows', DATA = '/home/user/CLaude/siding/work/data/', RAW = '/home/user/CLaude/siding/work/raw/';
const COL = JSON.parse(fs.readFileSync(DATA + 'window_colours.json')), SVC = JSON.parse(fs.readFileSync(DATA + 'svcpairs.json')).windows;
const rawTxt = (f) => fs.readFileSync(RAW + f, 'utf8').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/’/g, "'");
const COST = rawTxt('services_windows_cost.html'), WIN = rawTxt('services_windows.html');
(async () => { const b = await chromium.launch();
  let p = await open(b, U); const A = await audit(p, SC, 'windows'); const T = A.text;
  // ---- locked and published facts (compared with the data files at test time) ----
  ok('page shown at #/windows', await p.evaluate(() => !document.querySelector('#pg-windows').hidden && document.documentElement.dataset.page === 'windows'));
  ok('locked: 388 documented / 376 priced / $10k-$15k median / 2 days / lifetime labor', /388/.test(T) && /376/.test(T) && /\$10k–\$15k/.test(T) && /2 days/.test(T) && /Lifetime/.test(T));
  ok('maker counts NT 238 / Simonton 54 / Andersen 38 / Pella 31 on the page and in the cost guide', ['238', '54', '38', '31'].every(n => T.includes(n)) && /NT Windows 238 projects/.test(COST) && /Simonton 54 projects/.test(COST) && /Andersen 38 projects/.test(COST) && /Pella 31 projects/.test(COST));
  ok('no unpublished sums (361, 330, 497, 241) on the page', !/\b(361|330|497|241)\b/.test(T));
  const bands = await p.evaluate(() => Array.from(document.querySelectorAll('.pw-col')).map(c => [c.querySelector('em').textContent, +c.querySelector('.pw-n').textContent, c.getAttribute('data-i')]));
  const pub = [['Under $2k', 12], ['$2k–$5k', 40], ['$5k–$10k', 96], ['$10k–$15k', 79], ['$15k–$20k', 50], ['$20k–$25k', 30], ['$25k–$30k', 19], ['$30k–$40k', 30], ['$40k–$50k', 13], ['$50k–$60k', 4], ['$75k–$100k', 2], ['$100k+', 1]];
  ok('12 price bands match the cost guide and sum to 376', bands.length === 12 && bands.every((x, i) => x[1] === pub[i][1]) && pub.every(([n, v]) => COST.includes(`${n} ${v} project`)) && bands.reduce((a, x) => a + x[1], 0) === 376);
  const medians = await p.evaluate(() => Array.from(document.querySelectorAll('.pw-chips [role=radio]')).map(c => c.textContent));
  ok('brand medians NT $10k-$15k, Simonton $10k-$15k, Andersen $20k-$25k, Pella $5k-$10k, Provia $5k-$10k', ['NT Windows238 jobs · $10k–$15k', 'Simonton54 jobs · $10k–$15k', 'Andersen38 jobs · $20k–$25k', 'Pella31 jobs · $5k–$10k', 'Provia5 jobs · $5k–$10k'].every((s, i) => medians[i + 1] === s), medians.join(' / '));
  const cities = await p.evaluate(() => Array.from(document.querySelectorAll('.pw-crow')).map(r => r.innerText.replace(/\s+/g, ' ').trim()));
  ok('6 cities with priced counts and median bands as in the cost guide', cities.length === 6 && cities.every(c => { const m = c.match(/^(.+?)\s(\d+)\s(\$.+)$/); return m && COST.includes(`${m[1]} ${m[2]} projects ${m[3]}`); }), cities.join(' | '));
  ok('frame materials 214 / 64 / 33 / 4 / 61 (sum 376) as in the windows page', await p.evaluate(() => Array.from(document.querySelectorAll('.pw-fs')).map(x => +x.querySelector('.pw-fn').textContent).join(',')) === '214,64,33,4,61' && /214 Vinyl/.test(WIN) && /61 Not recorded/.test(WIN));
  ok('same-job shares 36% / 22% / 18% / 10% (134, 82, 68, 37 of 376)', (await p.evaluate(() => document.querySelector('.pw-srow').textContent.replace(/\s+/g, ' '))).match(/36%.*134 of 376.*22%.*82 of 376.*18%.*68 of 376.*10%.*37 of 376/) !== null);
  // ---- links / maps / media ----
  ok('no outside links (every href is #/route, #id, tel: or mailto:)', A.outside.length === 0, A.outside.join(','));
  ok('anchors resolve', A.badAnchors.length === 0, A.badAnchors.join(','));
  ok('no external images or media on the page', A.srcExt.length === 0);
  ok('no map graphic or the word map', !A.mapWord);
  ok('no video or audio elements on the page', await p.evaluate(() => !document.querySelector('#pg-windows video,#pg-windows audio,#pg-windows iframe')));
  ok('fonts: Montserrat and Inter only; form controls inherit', A.fonts.every(f => /^(Montserrat|Inter)$/.test(f)) && A.ctrlFont.length === 0, A.fonts.join(',') + ' / ' + A.ctrlFont.join(','));
  // ---- opener ----
  const hook = '.pw-hook'; await to(p, '.pw-open', 10); await p.waitForTimeout(2600);
  ok('opener: tape autoplays once and the window is set (hook 100, unit visible)', await p.evaluate(() => document.querySelector('.pw-hook').getAttribute('aria-valuenow') === '100' && +document.querySelector('.pw-u').getAttribute('opacity') === 1));
  await p.focus(hook); await p.keyboard.press('Home'); await p.waitForTimeout(500);
  ok('opener: Home retracts the tape and removes the unit; caption asks to pull', await p.evaluate(() => document.querySelector('.pw-hook').getAttribute('aria-valuenow') === '0' && +document.querySelector('.pw-u').getAttribute('opacity') === 0) && /Pull the tape/.test(await p.textContent('.pw-capt')));
  for (let i = 0; i < 4; i++) await p.keyboard.press('ArrowLeft');
  ok('opener: arrow keys pull the tape by steps (40%), caption says keep pulling', await p.getAttribute(hook, 'aria-valuenow') === '40' && /Keep pulling/.test(await p.textContent('.pw-capt')));
  await p.keyboard.press('End'); await p.waitForTimeout(1700);
  ok('opener: End completes, the window sets and "Measure again" appears', !(await p.isHidden('.pw-again')) && /Measured/.test(await p.textContent('.pw-capt')));
  const box = await (await p.$('.pw-tsvg')).boundingBox(); await p.click('.pw-again'); await p.waitForTimeout(800);
  await p.mouse.move(box.x + box.width * .8, box.y + box.height * .86); await p.mouse.down(); await p.mouse.move(box.x + box.width * .55, box.y + box.height * .86, { steps: 6 }); await p.mouse.up();
  const pv = +(await p.getAttribute(hook, 'aria-valuenow')); ok('opener: pointer drag pulls the tape to where the pointer is', pv > 20 && pv < 90, pv + '%');
  // ---- parts ----
  await to(p, '.pw-parts', 90);
  const lines = await p.$$eval('.pw-lines [role=radio]', e => e.map(x => x.textContent));
  ok('parts: six published lines in a radiogroup (NT Executive, Twinsulator, Presidential, Simonton DaylightMax, Andersen 100 Series, Pella Impervia)', lines.length === 6 && /Executive/.test(lines[0]) && /Twinsulator/.test(lines[1]) && /Presidential/.test(lines[2]) && /DaylightMax/.test(lines[3]) && /100 Series/.test(lines[4]) && /Impervia/.test(lines[5]), lines.join(' | '));
  ok('parts: line job counts 89 / 54 / 33 / 49 / 33 / 2', lines[0].includes('89 jobs') && lines[1].includes('54 jobs') && lines[2].includes('33 jobs') && lines[3].includes('49 jobs') && lines[4].includes('33 jobs') && lines[5].includes('2 jobs'));
  const partTxt = async () => p.$$eval('.pw-plist li', e => e.map(x => x.textContent.replace(/\s+/g, ' ').trim()));
  let pl = await partTxt(); ok('parts: Executive names frame 3-1/4", glass 99% UV, sill, finish (4 parts) and nothing else', pl.length === 4 && /3-1\/4″ multi-chambered vinyl/.test(pl[0]) && /99% UV protection/.test(pl[1]) && /true slope sill with a double-weatherstripped/.test(pl[2]) && /Creme White or Almond/.test(pl[3]) && WIN.includes('double-weatherstripped'));
  await p.evaluate(() => { const r = document.querySelector('#pw-pull'); r.value = 100; r.dispatchEvent(new Event('input')); }); await p.waitForTimeout(200);
  const tr = await p.$$eval('.pw-lay', e => e.map(x => x.getAttribute('transform')));
  ok('parts: pulling apart moves every layer behind the front finish, each to its own place, and the label says Fully apart', tr.length >= 5 && new Set(tr).size === tr.length && tr.filter(t => /translate\(0 0\)/.test(t)).length === 1 && /Fully apart/.test(await p.textContent('.pw-out')), tr.join(' ; '));
  ok('parts: the sill exists only for the Executive (the only line with a published sill)', await p.$$eval('.pw-lay[data-l=sill]', e => e.length) === 1);
  await p.focus('.pw-lines [role=radio][aria-checked=true]'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(150);
  pl = await partTxt(); ok('parts: ArrowRight moves to Twinsulator (3 parts, aluminum, Quad LoE-452+, 3 colors, names not published)', pl.length === 3 && /Aluminum/.test(pl[0]) && /Quad LoE-452\+/.test(pl[1]) && /3 colors/.test(pl[2]) && await p.$$eval('.pw-lay[data-l=sill]', e => e.length) === 0);
  await p.keyboard.press('ArrowRight'); pl = await partTxt(); ok('parts: Presidential says the glass package is not published (no invented spec); VividColor 18 colors, 15-year coating warranty', /does not publish/.test(pl[1]) && /VividColor in 18 colors/.test(pl[2]) && /15-year/.test(pl[2]));
  const sw = async (k) => { await p.click(`.pw-lines [role=radio]:nth-child(${k})`); await p.waitForTimeout(100); return p.$$eval('.pw-swr [role=radio]', e => e.map(x => x.title)); };
  const sS = await sw(4), sA = await sw(5), sP = await sw(6); await p.click('.pw-lines [role=radio]:nth-child(1)'); const sE = await p.$$eval('.pw-swr [role=radio]', e => e.map(x => x.title));
  ok('parts: swatches equal window_colours.json (Simonton 10, Andersen 5, Pella 5, Executive Creme White + Almond)', JSON.stringify(sS) === JSON.stringify(COL['Simonton'].map(x => x[0])) && JSON.stringify(sA) === JSON.stringify(COL['Andersen'].map(x => x[0])) && JSON.stringify(sP) === JSON.stringify(COL['Pella'].map(x => x[0])) && JSON.stringify(sE) === '["Creme White","Almond"]', [sS.length, sA.length, sP.length, sE.length].join('/'));
  await p.click('.pw-swr [role=radio]:nth-child(2)'); await p.waitForTimeout(100); ok('parts: choosing Almond recolours the finish layer to the published hex', (await p.$eval('.pw-lay[data-l=finish] path', e => e.getAttribute('fill'))).toLowerCase() === COL['NT Windows'].find(x => x[0] === 'Almond')[1].toLowerCase());
  await p.click('.pw-plist li:nth-child(2) button'); await p.waitForTimeout(150); ok('parts: choosing a part highlights its layer and dims the others', await p.$$eval('.pw-lay', e => e.filter(x => x.style.opacity === '1').length === 2 && e.filter(x => x.style.opacity === '0.3').length === e.length - 2) && await p.$eval('.pw-plist li:nth-child(2) button', e => e.getAttribute('aria-pressed')) === 'true');
  // ---- glass ----
  await to(p, '.pw-glass', 90); const gt = await p.$$eval('.pw-gtabs [role=radio]', e => e.map(x => x.textContent));
  ok('glass: four makers with the published package names (Quad LoE-452+, ProSolar Shield, sun-control Low-E, SmartSun)', gt.length === 4 && /Quad LoE-452\+/.test(gt[0]) && /ProSolar Shield/.test(gt[1]) && /Sun-control/.test(gt[2]) && /SmartSun/.test(gt[3]), gt.join('|'));
  await p.click('.pw-gtabs [role=radio]:nth-child(2)'); ok('glass: Simonton card quotes "made for the warmest climates"', /warmest climates/.test(await p.textContent('.pw-gp')) && WIN.includes('made for the warmest climates'));
  const r1 = await p.$eval('.pw-rays', e => e.innerHTML); await p.click('.pw-tg'); const r2 = await p.$eval('.pw-rays', e => e.innerHTML); ok('glass: the Low-E switch redraws the rays and flips aria-checked', r1 !== r2 && await p.getAttribute('.pw-tg', 'aria-checked') === 'false');
  await p.$eval('#pw-sun', e => { e.value = 10; e.dispatchEvent(new Event('input')); }); ok('glass: the sun-height range redraws the rays', (await p.$eval('.pw-rays', e => e.innerHTML)) !== r2);
  // ---- order ----
  await to(p, '.pw-order', 90); const nodes = await p.$$eval('.pw-nodes button', e => e.map(x => x.textContent));
  ok('order: five published steps (Free inspection, Measure, Built to order, Set and sealed, Final check)', nodes.length === 5 && /Free inspection/.test(nodes[0]) && /Measure/.test(nodes[1]) && /Built to order/.test(nodes[2]) && /Set and sealed/.test(nodes[3]) && /Final check/.test(nodes[4]));
  await p.focus('.pw-mark'); await p.keyboard.press('End'); await p.waitForTimeout(900); ok('order: End goes to step 5 "Final check" with the warranty text', await p.getAttribute('.pw-mark', 'aria-valuenow') === '5' && /Final check/.test(await p.textContent('.pw-oh')) && /warranty details/.test(await p.textContent('.pw-op')));
  await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(900); ok('order: step 4 text carries "two days on site" as published', /two days on site/.test(await p.textContent('.pw-op')));
  const tb = await (await p.$('.pw-track')).boundingBox(); await p.mouse.move(tb.x + 4, tb.y + 20); await p.mouse.down(); await p.mouse.move(tb.x + tb.width * .5, tb.y + 20, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(900);
  ok('order: dragging the marker to the middle snaps to step 3 "Built to order" (Dallas–Fort Worth plant named)', await p.getAttribute('.pw-mark', 'aria-valuenow') === '3' && /Dallas–Fort Worth/.test(await p.textContent('.pw-op')));
  ok('order: Sara Helms quote verbatim and flagged as one customer’s account', /It took about 6 weeks for measuring, ordering and installing\./.test(await p.textContent('.pw-q')) && /One customer/.test(await p.textContent('.pw-q')));
  // ---- price ----
  await to(p, '.pw-price', 90); await p.focus('.pw-bars'); await p.keyboard.press('Home'); ok('price: Home selects "Under $2k · 12 of 376"', /Under \$2k.*12.*of 376/.test(await p.textContent('.pw-read')));
  await p.keyboard.press('End'); ok('price: End selects "$100k+ · 1 of 376"', /\$100k\+.*1.* of 376/.test(await p.textContent('.pw-read')));
  for (let i = 0; i < 8; i++) await p.keyboard.press('ArrowLeft'); await p.keyboard.press('Home'); for (let i = 0; i < 3; i++) await p.keyboard.press('ArrowRight'); ok('price: the median band reads "$10k–$15k · 79 · the median band"', /\$10k–\$15k.*79.*median band/.test(await p.textContent('.pw-read')));
  await p.click('.pw-chips [role=radio]:nth-child(4)'); await p.waitForTimeout(150); const fl = await p.$$eval('.pw-flag', e => e.map(x => x.textContent)); ok('price: choosing Andersen adds its median flag next to "Median band" and "Most common band"', fl.includes('Andersen median') && fl.includes('Median band') && fl.includes('Most common band'), fl.join('|'));
  // ---- pairs ----
  await to(p, '.pw-pairs', 90); const pt = await p.$$eval('.pw-wtabs [role=radio]', e => e.map(x => x.textContent));
  ok('pairs: four published window pairs, places and months as in svcpairs.json', pt.length === 4 && SVC.every((s, i) => pt[i].includes(s.place.split(',')[0]) && pt[i].includes(s.when)), pt.join('|'));
  ok('pairs: eight real photos, each with real alt text (published before/after alt)', await p.$$eval('.pw-pi img', e => e.length === 8 && e.every(i => i.naturalWidth > 0 && i.alt.length > 10)));
  ok('pairs: caption carries installed line and windows-portion band as published', SVC.every((s, i) => true) && /Installed: NT Windows Twinsulator/.test(await p.textContent('.pw-wcap')) && /\$40k–\$50k/.test(await p.textContent('.pw-wcap')));
  await p.focus('.pw-wline'); await p.keyboard.press('End'); ok('pairs: End on the wipe line shows the whole before image (position 100)', await p.getAttribute('.pw-wline', 'aria-valuenow') === '100'); await p.keyboard.press('Home'); ok('pairs: Home shows the whole after image (position 0)', await p.getAttribute('.pw-wline', 'aria-valuenow') === '0');
  await p.click('.pw-wtabs [role=radio]:nth-child(3)'); ok('pairs: choosing North Austin shows Simonton DaylightMax, $10k–$15k', /Simonton DaylightMax/.test(await p.textContent('.pw-wcap')) && /\$10k–\$15k/.test(await p.textContent('.pw-wcap')));
  // ---- warranties ----
  await to(p, '.pw-warr', 90); const wt = []; for (let k = 1; k <= 4; k++) { await p.click(`.pw-wrt [role=radio]:nth-child(${k})`); wt.push((await p.textContent('.pw-l1')).replace(/\s+/g, ' ')); }
  ok('warranty: NT 15-year VividColor, Simonton lifetime limited parts and labor transferable, Andersen 20 yrs glass / 10 yrs other, Pella limited lifetime + labor 2 years', /15 years/.test(wt[0]) && /Lifetime limited, parts and labor, transferable/.test(wt[1]) && /20 years on glass, 10 years on other parts/.test(wt[2]) && /Limited lifetime\. Pella covers labor 2 years/.test(wt[3]));
  ok('warranty: Austin Pro lifetime workmanship warranty on labor is the layer under every maker', /Lifetime workmanship warranty on labor/.test(await p.textContent('.pw-l2')));
  ok('closing: routes to #/contact and has the locked phone and address', await p.$$eval('#pg-windows a[href="#/contact"]', e => e.length) >= 2 && /\(512\) 550-0000/.test(T) && /7801 N Lamar Blvd Suite C70, Austin TX 78752/.test(T) && /Mon–Fri 8–8 · Sat 8–6 · Sun 12–5/.test(T));
  // ---- sizes ----
  const wt1 = await p.evaluate(() => Array.from(document.querySelectorAll('#pg-windows img')).length); ok('images: all real photos load (8)', wt1 === 8);
  await p.waitForTimeout(600); const A1 = await audit(p, SC, 'windows'); ok('contrast: every resolvable text >= 4.5', A1.minContrast >= 4.5, `lowest ${A1.minContrast} (${A1.minEl}) over ${A1.contrastN} text elements`);
  ok('targets: every control >= 44 x 44 at 1440', A1.small.length === 0, A1.small.join(' ; '));
  ok('1440: no horizontal overflow', A1.docOver <= 0 && A1.over.length === 0, A1.docOver + ' ' + A1.over.join(','));
  ok('0 page errors (desktop session)', p.errs.length === 0, p.errs.join(' | ')); await p.ctx.close();
  for (const w of [1024, 768, 390]) { const q = await open(b, U, w, w === 390 ? 844 : 900); await q.waitForTimeout(500); const a = await audit(q, SC, 'windows'); ok(`${w}: no horizontal overflow, every control >= 44, 0 errors`, a.docOver <= 0 && a.over.length === 0 && a.small.length === 0 && q.errs.length === 0, `doc ${a.docOver}; ${a.over.join(',')}; small ${a.small.join(';')}; errs ${q.errs.join('|')}`); if (w === 390) ok('390: contrast >= 4.5', a.minContrast >= 4.5, a.minContrast + ' ' + a.minEl); await q.ctx.close(); }
  // 1440 again at a tall viewport for contrast at 1024 with the phone
  // ---- reduced motion ----
  const rm = await open(b, U, 1440, 900, { reducedMotion: 'reduce' }); await rm.waitForTimeout(500);
  ok('reduced motion: the tape is already measured and the window set, nothing autoplays', await rm.evaluate(() => document.querySelector('.pw-hook').getAttribute('aria-valuenow') === '100' && +document.querySelector('.pw-u').getAttribute('opacity') === 1));
  ok('reduced motion: no running CSS animation or transition inside the page', await rm.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.target && a.effect.target.closest && a.effect.target.closest('#pg-windows')).length === 0));
  await to(rm, '.pw-parts', 90); await rm.evaluate(() => { const r = document.querySelector('#pw-pull'); r.value = 100; r.dispatchEvent(new Event('input')); }); ok('reduced motion: pulling apart snaps (no easing)', await rm.$$eval('.pw-lay', e => e.filter(x => /translate\([1-9-]/.test(x.getAttribute('transform'))).length === e.length - 1));
  ok('reduced motion: revealed sections are visible without scrolling in', await rm.$$eval('.pw-rv', e => e.every(x => getComputedStyle(x).opacity === '1'))); await rm.ctx.close();
  // ---- touch ----
  const tc = await open(b, U, 390, 844, { hasTouch: true, isMobile: true }); await to(tc, '.pw-parts', 80);
  ok('touch: drag areas keep vertical scroll (touch-action pan-y) — tape, stage, glass, scene, chart, wipe', await tc.evaluate(() => ['.pw-tape', '.pw-stage', '.pw-gfig', '.pw-scene', '.pw-chart', '.pw-wst', '.pw-track'].every(s => /pan-y/.test(getComputedStyle(document.querySelector(s)).touchAction))));
  await tc.tap('.pw-lines [role=radio]:nth-child(4)'); ok('touch: tapping a line selects it', /DaylightMax/.test(await tc.textContent('.pw-linet')));
  await to(tc, '.pw-pairs', 60); await tc.tap('.pw-wtabs [role=radio]:nth-child(2)'); ok('touch: tapping a pair tab works', /Ridgewood/.test(await tc.textContent('.pw-wcap')));
  const y0 = await tc.evaluate(() => scrollY); await tc.evaluate(() => scrollBy(0, 300)); ok('touch: the page still scrolls vertically', (await tc.evaluate(() => scrollY)) > y0);
  ok('touch: 0 errors', tc.errs.length === 0, tc.errs.join('|')); await tc.ctx.close();
  // ---- weight ----
  const css = fs.statSync('/home/user/CLaude/siding/redo/final/src/page_windows.css').size, js = fs.statSync('/home/user/CLaude/siding/redo/final/src/page_windows.js').size;
  const imgB = fs.readFileSync('/home/user/CLaude/siding/redo/final/out/final-windows.html', 'utf8'); const sect = imgB.slice(imgB.indexOf('id="pg-windows"'), imgB.indexOf('data-page="our-work"') > 0 ? imgB.indexOf('data-page="our-work"') : undefined); const imgBytes = (sect.match(/data:image\/webp;base64,[A-Za-z0-9+\/=]+/g) || []).reduce((a, s) => a + s.length, 0);
  ok('weight: CSS + JS <= 120 KB, images <= 1.2 MB embedded', css + js <= 120 * 1024 && imgBytes <= 1.2 * 1024 * 1024, `css ${(css / 1024).toFixed(1)} KB, js ${(js / 1024).toFixed(1)} KB, images ${(imgBytes / 1024).toFixed(0)} KB`);
  await b.close(); process.exit(report('Windows page') ? 1 : 0); })();
