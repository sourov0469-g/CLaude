// Code/DOM-level probes for the annex references added by the completion: node annex.js <dropbox|cowboy|ever|erie>
// dropbox: how the colour blocks assemble with scroll (rects per scroll step) + what a tile does on hover
// cowboy: sticky tracks, hotspot buttons, the stepped image reveal (clip/transform per scroll step)
// ever:   the virtual scroll (which wrapper moves, lerp per frame after one wheel), chapters
// erie:   FAQ and proof wording (content note only)
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const site = process.argv[2]; const URL = {dropbox: 'https://brand.dropbox.com/', cowboy: 'https://cowboy.com/', ever: 'https://ever-live-here.com/', erie: 'https://www.eriehome.com/'}[site];
const OUT = path.join(__dirname, '..', 'evidence', site); fs.mkdirSync(OUT, {recursive: true});
(async () => {
  const b = await chromium.launch(); const p = await (await b.newContext({viewport: {width: 1440, height: 900}})).newPage();
  await p.goto(URL, {waitUntil: 'domcontentloaded', timeout: 60000}); await p.waitForTimeout(7000);
  await p.evaluate(() => { for (const e of document.querySelectorAll('[id*=onetrust],[class*=cookie],[class*=osano],[class*=consent]')) e.style.display = 'none'; });
  const out = {site, url: URL};
  if (site === 'dropbox') {
    const blocks = () => p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return r.width > 120 && r.height > 120 && r.width < 1400 && /rgb\((?!255, 255, 255)/.test(s.backgroundColor) && s.backgroundColor !== 'rgba(0, 0, 0, 0)'; }).slice(0, 12).map(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return {t: (e.innerText || '').trim().split('\n')[0].slice(0, 20), bg: s.backgroundColor, x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height), tr: s.transform.slice(0, 50)}; }));
    out.steps = []; for (let i = 0; i <= 12; i++) { out.steps.push({wheel: i * 150, scrollY: await p.evaluate(() => Math.round(scrollY)), blocks: await blocks()}); await p.mouse.wheel(0, 150); await p.waitForTimeout(700); }
    await p.screenshot({path: path.join(OUT, 'frames', 'mosaic.png')});
    const tile = p.getByText('Typography', {exact: true}).first(); const bb = await tile.boundingBox();
    if (bb) { const before = await tile.evaluate(e => { const a = e.closest('a') || e.parentElement; const s = getComputedStyle(a); return {tag: a.tagName, href: a.getAttribute('href'), tr: s.transform, trn: s.transitionProperty + ' ' + s.transitionDuration + ' ' + s.transitionTimingFunction}; });
      await p.mouse.move(bb.x + 60, bb.y + 80, {steps: 5}); const seq = []; for (const ms of [50, 150, 300, 600]) { await p.waitForTimeout(ms - (seq.length ? [50, 150, 300, 600][seq.length - 1] : 0)); seq.push({ms, s: await tile.evaluate(e => { const a = e.closest('a') || e.parentElement; const kids = [...a.querySelectorAll('*')].map(k => getComputedStyle(k).transform).filter(t => t !== 'none').slice(0, 4); return {tr: getComputedStyle(a).transform, kids, anims: document.getAnimations().slice(0, 4).map(x => (x.animationName || x.transitionProperty) + ' ' + (x.effect && x.effect.getTiming().duration))}; })}); }
      await p.screenshot({path: path.join(OUT, 'frames', 'tile-hover.png')}); out.tileHover = {before, seq}; }
  }
  if (site === 'cowboy') {
    out.sticky = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).position === 'sticky').map(e => ({cls: (e.className || '').toString().slice(0, 50), h: Math.round(e.getBoundingClientRect().height), track: Math.round(e.parentElement.getBoundingClientRect().height), top: Math.round(e.parentElement.getBoundingClientRect().top + scrollY), txt: (e.innerText || '').trim().slice(0, 60)})));
    out.hotspots = await p.evaluate(() => [...document.querySelectorAll('button,a')].filter(e => /explore/i.test(e.textContent)).slice(0, 6).map(e => { const s = getComputedStyle(e); return {txt: e.textContent.trim().slice(0, 20), aria: e.getAttribute('aria-label'), trn: s.transitionProperty.slice(0, 50) + ' ' + s.transitionDuration + ' ' + s.transitionTimingFunction}; }));
    out.toggles = await p.evaluate(() => [...document.querySelectorAll('button,[role=tab]')].filter(e => /^(Cruiser|Cruiser ST|Cross|Cross ST)$/.test(e.textContent.trim())).map(e => ({t: e.textContent.trim(), role: e.getAttribute('role'), sel: e.getAttribute('aria-selected') || e.getAttribute('aria-pressed') || e.className.toString().slice(0, 40)})));
    const h = await p.evaluate(() => { const e = [...document.querySelectorAll('h2,h3,p')].find(x => /power so natural/i.test(x.textContent)); if (!e) return null; e.scrollIntoView({block: 'start'}); return Math.round(scrollY); });
    out.stairs = []; if (h !== null) { for (let i = 0; i < 8; i++) { await p.waitForTimeout(500); out.stairs.push(await p.evaluate(() => { const sec = [...document.querySelectorAll('section,div')].find(x => /power so natural/i.test(x.innerText || '') && x.getBoundingClientRect().height > 600 && x.getBoundingClientRect().height < 5000); if (!sec) return null; const els = [...sec.querySelectorAll('*')].filter(k => { const s = getComputedStyle(k); return (s.clipPath !== 'none' || s.transform !== 'none') && k.getBoundingClientRect().width > 80; }).slice(0, 8).map(k => { const s = getComputedStyle(k); return {tag: k.tagName, clip: s.clipPath.slice(0, 60), tr: s.transform.slice(0, 50), w: Math.round(k.getBoundingClientRect().width)}; }); return {scrollY: Math.round(scrollY), track: Math.round(sec.getBoundingClientRect().height), els}; })); if (i === 3) await p.screenshot({path: path.join(OUT, 'frames', 'stairs.png')}); await p.mouse.wheel(0, 300); } }
  }
  if (site === 'ever') {
    out.movers = await p.evaluate(async () => { const cands = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().height > 2000); const before = cands.map(e => getComputedStyle(e).transform); window.dispatchEvent(new WheelEvent('wheel', {deltaY: 400, bubbles: true})); document.dispatchEvent(new WheelEvent('wheel', {deltaY: 400, bubbles: true})); const series = []; for (let i = 0; i < 60; i++) { await new Promise(r => requestAnimationFrame(r)); series.push(cands.map(e => getComputedStyle(e).transform)); } return cands.map((e, k) => ({cls: (e.className || '').toString().slice(0, 50), h: Math.round(e.getBoundingClientRect().height), before: before[k].slice(0, 60), ys: series.map(s => { const m = s[k].match(/matrix.*\((.+)\)/); return m ? Math.round(+m[1].split(',')[5]) : 0; })})).filter(c => c.ys.some(y => y !== 0)); });
    for (const m of out.movers) { const ys = m.ys, end = ys[ys.length - 1], g = ys.map(y => end - y), k = []; for (let i = 1; i < g.length; i++) if (Math.abs(g[i - 1]) > 3) k.push(1 - g[i] / g[i - 1]); m.closePerFrame = k.length ? +(k.slice(0, 10).reduce((a, c) => a + c, 0) / Math.min(10, k.length)).toFixed(3) : null; }
    out.chapters = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map(h => h.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)).filter(Boolean).slice(0, 30));
    out.filters = await p.evaluate(() => [...document.querySelectorAll('button,a,label')].filter(e => /^(nature|play|chill|sport)$/i.test(e.textContent.trim())).map(e => ({t: e.textContent.trim(), tag: e.tagName, cls: (e.className || '').toString().slice(0, 50)})));
  }
  if (site === 'erie') {
    out.faq = await p.evaluate(() => [...document.querySelectorAll('h2,h3,h4,button,summary,dt')].map(e => e.textContent.trim().replace(/\s+/g, ' ')).filter(t => /\?$/.test(t) && t.length < 140).slice(0, 25));
    out.proof = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,li,span')].map(e => e.textContent.trim().replace(/\s+/g, ' ')).filter(t => t.length > 8 && t.length < 160 && /(\d[\d,.]*\+?|warrant|certif|trusted|rated|review|years|homeowners|BBB|A\+)/i.test(t)).filter((t, i, a) => a.indexOf(t) === i).slice(0, 30));
  }
  fs.writeFileSync(path.join(OUT, 'annex.json'), JSON.stringify(out, null, 1)); console.log(JSON.stringify(out).slice(0, 3500)); await b.close();
})();
