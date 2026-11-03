// Phase 8 · device matrix (FINALIZE AUDIT STANDARD: "every pin behaving on real phone sizes ... never trap scrolling";
// "nothing broken ships"). Every page at eight widths. Phones run twice: a desktop-style context (wheel), and an
// emulated phone (isMobile, touch, coarse pointer) that scrolls by script, so the touch code paths run too.
//  errors    page errors and console errors
//  overflow  horizontal overflow at any sampled scroll position, with the elements that cause it
//  pins      the scroll reaches the end of the page (no pin traps it); steps taken
//  call      on phones, a visible tel: link at every sampled position
//  targets   interactive targets under 24x24 (WCAG 2.2 AA 2.5.8; inline text links exempt) and under 44 (craft line)
//  clipped   text cut by an overflow-hidden box (scrollWidth beyond clientWidth)
// Usage: node matrix.js [outfile]
const { chromium } = require('playwright');
const fs = require('fs');
const SITE = 'file:///home/user/CLaude/remodeling/site/';
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const SIZES = [[320, 568], [360, 740], [375, 667], [414, 896], [768, 1024], [1024, 768], [1280, 800], [1920, 1080]];
const OUT = process.argv[2] || '/home/user/CLaude/qa/finalize/phase8/matrix.json';

function overflowCulprits() {
  const W = document.documentElement.clientWidth, out = [];
  if (document.documentElement.scrollWidth <= W + 1) return out;
  document.querySelectorAll('body *').forEach(e => {
    const r = e.getBoundingClientRect(); if (r.width === 0 || r.right <= W + 1) return;
    // skip anything inside a box that clips it
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (o.overflowX !== 'visible' || o.clipPath !== 'none') return; }
    const sec = e.closest('section[id]'); out.push((sec ? sec.id : 'chrome') + ' ' + e.tagName.toLowerCase() + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).split(' ')[0] + ' right ' + Math.round(r.right));
  });
  return [...new Set(out)].slice(0, 8);
}
function telVisible() {
  return [...document.querySelectorAll('a[href^="tel:"]')].some(a => { const r = a.getBoundingClientRect(); const s = getComputedStyle(a); return r.width > 0 && r.top >= 0 && r.bottom <= innerHeight && s.visibility !== 'hidden' && +s.opacity > .5; });
}
function audit() {
  const vis = e => { const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return false; if (e.closest('[hidden], [inert], [aria-hidden="true"]')) return false; const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none'; };
  const small = [];
  document.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea, [role="slider"], [role="tab"], [tabindex="0"]').forEach(e => {
    if (!vis(e) && !(e.matches('input[type="checkbox"], input[type="radio"]') && e.closest('label') && vis(e.closest('label')))) return;
    let r = e.getBoundingClientRect();
    if (e.matches('input[type="checkbox"], input[type="radio"]') && e.closest('label')) r = e.closest('label').getBoundingClientRect();
    // inline text links are exempt from 2.5.8 (a link inside a run of text)
    if (e.tagName === 'A' && e.parentElement && /^(P|LI|SPAN|DD|FIGCAPTION|SMALL|LABEL)$/.test(e.parentElement.tagName) && e.parentElement.textContent.trim().length > e.textContent.trim().length + 8) return;
    const m = Math.min(r.width, r.height);
    if (m < 44) { const sec = e.closest('section[id]'); small.push({ sec: sec ? sec.id : 'chrome', el: e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0], label: (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height), aa: m >= 24 }); }
  });
  const clipped = [];
  document.querySelectorAll('body *').forEach(e => {
    if (!vis(e) || e.closest('.sr-only, .visually-hidden')) return; const s = getComputedStyle(e);
    if (!/(hidden|clip)/.test(s.overflowX) || e.scrollWidth <= e.clientWidth + 2) return;
    const direct = [...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim());
    if (!direct || s.textOverflow === 'ellipsis') return;
    const sec = e.closest('section[id]'); clipped.push((sec ? sec.id : 'chrome') + ' ' + e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' ' + e.textContent.trim().slice(0, 30) + ' (' + e.scrollWidth + '>' + e.clientWidth + ')');
  });
  return { small, clipped: [...new Set(clipped)] };
}

async function run(b, file, w, h, mobile) {
  const ctx = await b.newContext(mobile ? { viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : { viewport: { width: w, height: h } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror ' + String(e).slice(0, 140)));
  p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text().slice(0, 140)); });
  await p.goto(SITE + file); await p.waitForTimeout(1300);
  if (!mobile) await p.mouse.move(w / 2, h / 2);
  let last = -1, still = 0, n = 0, over = [], call = [], overAt = [];
  while (n < 1200 && still < 14) {
    if (mobile) await p.evaluate(dy => scrollBy(0, dy), Math.round(h * .55)); else await p.mouse.wheel(0, Math.round(h * .55));
    await p.waitForTimeout(45); n++;
    const y = await p.evaluate(() => scrollY); still = y === last ? still + 1 : 0; last = y;
    if (n % 4 === 0) {
      const o = await p.evaluate(overflowCulprits); if (o.length) { over = over.concat(o); overAt.push(y); }
      if (w <= 414) call.push(await p.evaluate(telVisible));
    }
  }
  const reached = await p.evaluate(() => Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2);
  await p.waitForTimeout(500);
  const a = await p.evaluate(audit);
  await ctx.close();
  return { w, h, mobile, errors: errs, reached, steps: n, overflow: [...new Set(over)].slice(0, 10), overflowAt: overAt.slice(0, 5), call: call.length ? call.filter(Boolean).length + '/' + call.length : null, small: a.small, clipped: a.clipped };
}

(async () => {
  const b = await chromium.launch(); const R = {};
  const only = process.env.PAGES ? process.env.PAGES.split(',') : Object.keys(PAGES);
  for (const name of only) {
    R[name] = [];
    for (const [w, h] of SIZES) {
      R[name].push(await run(b, PAGES[name], w, h, false));
      if (w <= 414) R[name].push(await run(b, PAGES[name], w, h, true));
    }
  }
  await b.close();
  fs.mkdirSync(require('path').dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
  for (const [name, rows] of Object.entries(R)) for (const r of rows) {
    const aa = r.small.filter(s => !s.aa).length, craft = r.small.length;
    console.log(`${name} ${r.w}${r.mobile ? 'm' : ' '} errors ${r.errors.length} | end ${r.reached} (${r.steps}) | overflow ${r.overflow.length} | call ${r.call || '-'} | targets <24: ${aa}, <44: ${craft} | clipped ${r.clipped.length}`);
  }
})();
