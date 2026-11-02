// FINALIZE Phase 2 QA: the companion and the living logo, measured in a real browser (foreground, no background work).
// Usage: node tools/companion-qa.js <outdir>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = process.argv[2] || '/tmp/cqa'; fs.mkdirSync(OUT, { recursive: true });
const URL = 'file://' + path.resolve(__dirname, '../../site/harness-companion.html');
const KINDS = ['k-text', 'k-link', 'k-cta', 'k-btn', 'k-tel', 'k-dis', 'k-img', 'k-type', 'k-radio', 'k-slider', 'k-drag', 'k-town', 'k-watch'];
const results = { kinds: {}, checks: {} };

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = []; p.on('pageerror', e => errors.push(String(e))); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await p.goto(URL); await p.waitForTimeout(1600);
  // logo load beat frames
  for (const t of [0, 250, 900]) { }
  await p.mouse.move(700, 450); await p.waitForTimeout(80); await p.mouse.move(720, 460); await p.waitForTimeout(900);

  for (const id of KINDS) {
    const box = await p.evaluate(i => { const e = document.getElementById(i); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, id);
    await p.waitForTimeout(250);
    // glide in, like a hand
    const from = await p.evaluate(() => ({ x: EZ.ptr.x, y: EZ.ptr.y }));
    for (let s = 1; s <= 12; s++) await p.mouse.move(from.x + (box.x - from.x) * s / 12, from.y + (box.y - from.y) * s / 12);
    await p.waitForTimeout(700);
    const m = await p.evaluate(() => {
      const bd = document.querySelector('.buddy'), tip = document.querySelector('.ptip');
      const vis = e => e && getComputedStyle(e).visibility === 'visible' && getComputedStyle(e).display !== 'none';
      const rx = [...document.querySelectorAll('.rx, .rx-on')].filter(e => vis(e)).length;
      // hat attachment in screen space: brim bottom must sit inside the face circle's top band
      const hat = bd.querySelector('.cp-hat rect').getBoundingClientRect(), face = bd.querySelector('.cp-head > circle').getBoundingClientRect();
      const tb = tip.querySelector('svg').getBoundingClientRect();
      return { state: bd.dataset.state, buddyOn: vis(bd), tipOn: vis(tip), rxVisible: rx,
        hatOverlap: +(hat.bottom - face.top).toFixed(1), hatGap: +(face.top - hat.bottom).toFixed(1),
        hotspotErr: +Math.hypot(tb.left + tb.width * 4 / 28 - EZ.ptr.x, tb.top + tb.height * 4 / 28 - EZ.ptr.y).toFixed(2),
        buddyRect: (r => ({ x: r.left, y: r.top, w: r.width, h: r.height }))(bd.getBoundingClientRect()), ptr: { x: EZ.ptr.x, y: EZ.ptr.y } };
    });
    results.kinds[id] = m;
    const cx = Math.min(m.ptr.x, m.buddyRect.x) - 40, cy = Math.min(m.ptr.y, m.buddyRect.y) - 40;
    await p.screenshot({ path: `${OUT}/${id}.png`, clip: { x: Math.max(0, cx), y: Math.max(0, cy), width: 260, height: 200 } });
    // press frame (tip tap + squash on the same frame)
    if (['k-cta', 'k-drag', 'k-link'].includes(id)) {
      await p.mouse.down(); await p.waitForTimeout(70);
      await p.screenshot({ path: `${OUT}/${id}-press.png`, clip: { x: Math.max(0, cx), y: Math.max(0, cy), width: 260, height: 200 } });
      await p.mouse.up(); await p.waitForTimeout(300);
    }
  }
  results.errors = errors;

  // logo: hover beat and footer closing beat
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
  const lg = await p.evaluate(() => { const r = document.querySelector('.nav__logo').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, t: r.top }; });
  await p.mouse.move(lg.x, lg.y); await p.waitForTimeout(450);
  await p.screenshot({ path: `${OUT}/logo-hover.png`, clip: { x: lg.l - 20, y: Math.max(0, lg.t - 20), width: 240, height: 90 } });
  results.checks.logoTileX = await p.evaluate(() => document.querySelector('.lg--nav .lg-tile').getAttribute('x'));
  await p.mouse.move(700, 500); await p.waitForTimeout(600);
  results.checks.logoTileXOut = await p.evaluate(() => document.querySelector('.lg--nav .lg-tile').getAttribute('x'));
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(1800);
  const ft = await p.evaluate(() => { const r = document.querySelector('.foot__logo').getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; });
  await p.screenshot({ path: `${OUT}/logo-footer.png`, clip: { x: ft.l - 10, y: ft.t - 10, width: ft.w + 20, height: ft.h + 20 } });
  results.checks.footerClosed = await p.evaluate(() => getComputedStyle(document.querySelector('.lg--foot .lg-close')).strokeDashoffset);

  // touch: no companion, no tip, system behaviour
  const t = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await t.goto(URL); await t.waitForTimeout(1200); await t.tap('#k-cta').catch(() => {}); await t.waitForTimeout(400);
  results.checks.touch = await t.evaluate(() => ({ hasBuddy: document.documentElement.classList.contains('has-buddy'), buddyVisible: getComputedStyle(document.querySelector('.buddy')).visibility, tipVisible: getComputedStyle(document.querySelector('.ptip')).visibility }));
  // reduced motion: no companion
  const r = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await r.goto(URL); await r.waitForTimeout(1000); await r.mouse.move(600, 400); await r.mouse.move(640, 420); await r.waitForTimeout(500);
  results.checks.reduced = await r.evaluate(() => ({ hasBuddy: document.documentElement.classList.contains('has-buddy'), buddyDisplay: getComputedStyle(document.querySelector('.buddy')).display }));
  fs.writeFileSync(`${OUT}/results.json`, JSON.stringify(results, null, 1));
  console.log(JSON.stringify(results, null, 1));
  await b.close();
})();
