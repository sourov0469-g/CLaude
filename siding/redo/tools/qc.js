// Quiet Cubes: pass the "Select Your Pod" gate, then map every sticky chapter (sticky height vs its scroll track),
// record a wheel frame sequence, and save the page's own inline scripts to the scratchpad for code reading (not committed).
// node qc.js <scratchDir>
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const OUT = path.join(__dirname, '..', 'evidence', 'quietcubes'); const SCR = process.argv[2]; fs.mkdirSync(path.join(OUT, 'gate'), {recursive: true});
(async () => {
  const b = await chromium.launch(); const p = await (await b.newContext({viewport: {width: 1440, height: 900}})).newPage();
  await p.goto('https://quietcubes.com/', {waitUntil: 'domcontentloaded', timeout: 60000}); await p.waitForTimeout(6000);
  const gate = await p.evaluate(() => { const g = [...document.querySelectorAll('body *')].filter(e => /select your pod/i.test(e.textContent) && e.children.length < 3)[0]; let a = g; while (a && getComputedStyle(a).position !== 'fixed') a = a.parentElement; const opts = [...(a || document).querySelectorAll('a,button,[role=button],div[class*=option],div[class*=btn]')].filter(e => /pods?/i.test(e.textContent) && e.getBoundingClientRect().width > 40 && e.getBoundingClientRect().width < 260).map(e => ({t: e.textContent.trim().replace(/\s+/g, ' '), tag: e.tagName, cls: (e.className || '').toString().slice(0, 60), href: e.getAttribute('href')})); return {overlay: a ? (a.className || '').toString() : null, z: a ? getComputedStyle(a).zIndex : null, opts}; });
  // hover then click "Office Pods"
  const btn = p.getByText('Office Pods', {exact: false}).first(); const bb = await btn.boundingBox();
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, {steps: 6}); await p.waitForTimeout(500); await p.screenshot({path: path.join(OUT, 'gate', 'g1-hover.png')});
  gate.hoverStyle = await btn.evaluate(e => { let a = e; for (let i = 0; i < 3 && a; i++, a = a.parentElement) { const s = getComputedStyle(a); if (s.transitionDuration !== '0s') return {cls: (a.className || '').toString().slice(0, 60), tr: s.transitionProperty, d: s.transitionDuration, f: s.transitionTimingFunction, w: a.getBoundingClientRect().width}; } return null; });
  const tc = Date.now(); await btn.click(); const seq = [];
  for (const ms of [100, 300, 600, 1000, 1600, 2600]) { await p.waitForTimeout(ms - (seq.length ? seq[seq.length - 1].ms : 0)); seq.push({ms, gateOpacity: await p.evaluate(c => { const e = c && document.querySelector('.' + c.split(' ')[0]); return e ? [getComputedStyle(e).opacity, getComputedStyle(e).display, getComputedStyle(e).transform.slice(0, 40)].join(' | ') : 'gone'; }, gate.overlay), url: p.url()}); await p.screenshot({path: path.join(OUT, 'gate', `g2-${ms}ms.png`)}); }
  gate.afterClick = seq;
  await p.waitForTimeout(1500);
  const map = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).position === 'sticky').map(e => { const par = e.parentElement; const r = par.getBoundingClientRect(); return {cls: (e.className || '').toString().slice(0, 40), top: getComputedStyle(e).top, h: Math.round(e.getBoundingClientRect().height), track: Math.round(r.height), pageTop: Math.round(r.top + scrollY), heads: [...par.querySelectorAll('h1,h2,h3')].slice(0, 4).map(h => h.textContent.trim().replace(/\s+/g, ' ').slice(0, 50))}; }));
  const heads = await p.evaluate(() => [...document.querySelectorAll('h1,h2')].map(h => ({t: h.textContent.trim().replace(/\s+/g, ' ').slice(0, 60), y: Math.round(h.getBoundingClientRect().top + scrollY), vis: h.getBoundingClientRect().height > 0})).filter(h => h.vis).slice(0, 30));
  const docH = await p.evaluate(() => document.documentElement.scrollHeight);
  const ys = []; await p.mouse.move(720, 450);
  for (let i = 1; i <= 22; i++) { await p.mouse.wheel(0, 700); await p.waitForTimeout(900); ys.push(await p.evaluate(() => Math.round(scrollY))); await p.screenshot({path: path.join(OUT, 'gate', `s${String(i).padStart(2, '0')}.png`)}); }
  if (SCR) { fs.mkdirSync(SCR, {recursive: true}); const inl = await p.evaluate(() => [...document.querySelectorAll('script:not([src])')].map(s => s.textContent).filter(t => /gsap|ScrollTrigger|Lenis|Swiper/.test(t))); inl.forEach((t, i) => fs.writeFileSync(path.join(SCR, `inline-${i}.js`), t)); console.log('inline scripts saved', inl.length, inl.map(t => t.length)); }
  const out = {gate, stickyMap: map, headings: heads, docH, wheelScrollY: ys};
  fs.writeFileSync(path.join(OUT, 'gate.json'), JSON.stringify(out, null, 1)); console.log(JSON.stringify(out).slice(0, 5000)); await b.close();
})();
