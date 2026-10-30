// v8: the v7 suite, waiting for the page's apReady signal after each navigation (scripts now boot from a deflate stream)
// V6 addendum re-check: the list built during the full bank read (READ-V6.md), run on the delivered file.
// node recheck.js  (QURL overrides the target)
const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
const URL = process.env.QURL || ('file://' + require('path').resolve(__dirname, '../../homepage-standalone.html'));
const out = []; const ok = (n, c, x = '') => out.push(`${c ? 'PASS' : 'FAIL'} ${n}${x ? ' :: ' + x : ''}`);
const info = (n, x) => out.push(`INFO ${n} :: ${x}`);
const code = (sec, v) => SECS.map(s => s === sec ? v : 1).join('');

(async () => {
  const b = await chromium.launch();
  // ---------- desktop, every version ----------
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    for (const sec of SECS) for (const v of [1, 2, 3]) {
      await p.goto(`${URL}?v=${code(sec, v)}`, { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 15000 }); await p.waitForTimeout(300);
      const s = await p.evaluate(sec => {
        const ids = [...document.querySelectorAll('[id]')].map(e => e.id); const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
        const hid = [...document.querySelectorAll('[aria-hidden="true"]')].flatMap(h => [...h.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(f => !f.closest('[inert]') && f.tabIndex >= 0));
        const root = document.getElementById(sec);
        const sliders = [...root.querySelectorAll('[role=slider]')].map(e => ({ now: e.getAttribute('aria-valuenow'), min: e.getAttribute('aria-valuemin'), max: e.getAttribute('aria-valuemax'), tab: e.tabIndex, name: e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') }));
        const textRot = [...root.querySelectorAll('*')].filter(e => { const t = getComputedStyle(e).transform; if (!t || t === 'none') return false; const m = t.match(/matrix\(([^)]+)\)/); if (!m) return false; const [a, bb] = m[1].split(',').map(Number); const deg = Math.abs(Math.atan2(bb, a) * 180 / Math.PI); return deg > 1 && deg < 359 && e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1) && e.getBoundingClientRect().width > 0; }).map(e => e.className + ':' + e.textContent.trim().slice(0, 20));
        return { h1: [...document.querySelectorAll('h1')].filter(h => !h.closest('template')).length, main: document.querySelectorAll('main').length, dup: [...new Set(dup)], hid: hid.map(e => e.outerHTML.slice(0, 80)), sliders, textRot };
      }, sec);
      ok(`${sec}${v} one h1 + one main`, s.h1 === 1 && s.main === 1, `h1=${s.h1} main=${s.main}`);
      ok(`${sec}${v} no duplicate ids`, !s.dup.length, s.dup.join(','));
      ok(`${sec}${v} no focusable inside aria-hidden`, !s.hid.length, s.hid.slice(0, 2).join(' | '));
      if (s.sliders.length) ok(`${sec}${v} sliders carry aria-valuenow/min/max + tab stop + name`, s.sliders.every(x => x.now !== null && x.min !== null && x.max !== null && x.tab >= 0 && x.name), JSON.stringify(s.sliders));
      ok(`${sec}${v} no rotated text-bearing element`, !s.textRot.length, s.textRot.slice(0, 3).join(' | '));
    }
    ok('console clean across 30 versions', !errs.length, errs.slice(0, 3).join(' | '));

    // switcher = tablist pattern: arrow keys move selection and focus
    await p.goto(`${URL}?v=1111111111`, { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 15000 });
    const tl = await p.evaluate(async () => {
      const t1 = document.getElementById('hero-tab1'); t1.focus();
      t1.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await new Promise(r => setTimeout(r, 400));
      const a = document.activeElement; return { id: a && a.id, sel: document.getElementById('hero-tab2').getAttribute('aria-selected') };
    });
    ok('switcher: ArrowRight moves focus + selection (tablist)', tl.id === 'hero-tab2' && tl.sel === 'true', JSON.stringify(tl));

    // page-level facts
    const f = await p.evaluate(() => {
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent); } catch (e) { return null; } });
      const txt = document.body.innerText;
      const sections = [...document.querySelectorAll('main section[id], main > [id]')].map(s => ({ id: s.id, smt: getComputedStyle(s).scrollMarginTop }));
      const pm = [...document.querySelectorAll('main p')].filter(e => e.getBoundingClientRect().width > 0).map(e => { const fs = parseFloat(getComputedStyle(e).fontSize); return Math.round(e.getBoundingClientRect().width / (fs * 0.5)); });
      return { title: document.title, desc: (document.querySelector('meta[name=description]') || {}).content, ld, sections, other: (txt.match(/\b(fencing|fence|plumb\w*|hvac|landscap\w*|lawn|concrete|paver\w*)\b/gi) || []), ph: (txt.match(/\b(lorem|ipsum|todo|placeholder|xxx|tbd)\b/gi) || []), reviews: (txt.match(/\b\d{3}\b(?= (?:Google )?reviews)/gi) || []), pmax: Math.max(...pm), lcp: [...document.querySelectorAll('img')].filter(i => i.getBoundingClientRect().top < innerHeight).map(i => ({ fp: i.getAttribute('fetchpriority'), lazy: i.loading })), cursor: getComputedStyle(document.body).cursor };
    });
    info('title', f.title); info('meta description', f.desc);
    const biz = JSON.stringify(f.ld);
    ok('JSON-LD: tel, PostalAddress, hours, 4.9/474', /\+1-?512-?550-?0000|\+15125500000/.test(biz) && /7801 N Lamar Blvd/.test(biz) && /78752/.test(biz) && /Mo-Fr 08:00-20:00/.test(biz) && /Sa 08:00-18:00/.test(biz) && /Su 12:00-17:00/.test(biz) && /"ratingValue":"?4\.9/.test(biz) && /"reviewCount":"?474/.test(biz), biz.slice(0, 400));
    ok('every review count printed = 474', f.reviews.every(n => n === '474'), f.reviews.join(','));
    ok('no other-trade words (template residue)', !f.other.length, f.other.join(','));
    ok('no placeholder words', !f.ph.length, f.ph.join(','));
    info('sections scroll-margin-top', f.sections.map(s => `${s.id}:${s.smt}`).join(' '));
    info('max paragraph measure (approx ch)', f.pmax);
    info('images in first viewport', JSON.stringify(f.lcp));
    ok('system cursor kept (body cursor not none)', f.cursor !== 'none', f.cursor);
    await ctx.close();
  }
  // ---------- reviews marquee: pause control, hover/focus pause, offscreen pause ----------
  for (const v of [1, 2, 3]) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    await p.goto(`${URL}?v=${code('reviews', v)}`, { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 15000 });
    const m = await p.evaluate(async () => {
      const r = document.getElementById('reviews');
      const moving = () => document.getAnimations().filter(a => a.playState === 'running' && a.effect && a.effect.target && r.contains(a.effect.target) && /infinite/.test(String(a.effect.getTiming().iterations)) || (a.playState === 'running' && a.effect && a.effect.target && r.contains(a.effect.target) && a.effect.getTiming().iterations === Infinity)).length;
      const off = moving(); r.scrollIntoView(); await new Promise(z => setTimeout(z, 800)); const on = moving();
      const pause = [...r.querySelectorAll('button')].find(b => /pause|stop/i.test(b.textContent + (b.getAttribute('aria-label') || '')));
      const dupHidden = [...r.querySelectorAll('[aria-hidden="true"]')].length;
      return { off, on, pause: pause ? (pause.getAttribute('aria-label') || pause.textContent.trim()) : null, dupHidden };
    });
    info(`reviews${v} infinite animations offscreen/onscreen`, `${m.off}/${m.on}`);
    if (m.on) { ok(`reviews${v} moving strip has a visible pause control`, !!m.pause, m.pause || 'none'); ok(`reviews${v} paused offscreen`, m.off === 0, `offscreen running ${m.off}`); }
    await ctx.close();
  }
  // ---------- reduced motion ----------
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    for (const sec of SECS) for (const v of [1, 2, 3]) {
      await p.goto(`${URL}?v=${code(sec, v)}`, { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 15000 });
      await p.waitForSelector('#' + sec); await p.evaluate(s => document.getElementById(s).scrollIntoView(), sec); await p.waitForTimeout(400);
      const r = await p.evaluate(sec => ({ lenis: document.documentElement.classList.contains('lenis') || document.documentElement.classList.contains('lenis-smooth'), inf: document.getAnimations().filter(a => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).length, sb: getComputedStyle(document.documentElement).scrollBehavior, hiddenTxt: [...document.getElementById(sec).querySelectorAll('h2,h3,p')].filter(e => { const cs = getComputedStyle(e); return e.getBoundingClientRect().height > 0 && (+cs.opacity < 0.1 || cs.visibility === 'hidden'); }).length }), sec);
      ok(`RM ${sec}${v}: no Lenis, no infinite loops, text visible`, !r.lenis && !r.inf && !r.hiddenTxt, JSON.stringify(r));
    }
    await ctx.close();
  }
  // ---------- no JS ----------
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false }); const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: 'load' });   // no JS: nothing to wait for
    const n = await p.evaluate(() => { const vis = [...document.querySelectorAll('main h2, main p')].filter(e => e.getBoundingClientRect().height > 0); return { total: vis.length, hidden: vis.filter(e => +getComputedStyle(e).opacity < 0.1 || getComputedStyle(e).visibility === 'hidden').length, zeros: (document.querySelector('main').innerText.match(/(^|\s)0(\s|$)/g) || []).length, has474: /474/.test(document.body.innerText), has886: /886/.test(document.body.innerText) }; });
    ok('no-JS: content visible, figures printed', n.total > 20 && !n.hidden && n.has474 && n.has886, JSON.stringify(n));
    await ctx.close();
  }
  // ---------- 320 / 375 reflow, touch targets, form ----------
  for (const w of [320, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 740 }, hasTouch: true, isMobile: true }); const p = await ctx.newPage();
    for (const sec of SECS) for (const v of [1, 2, 3]) {
      await p.goto(`${URL}?v=${code(sec, v)}`, { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 15000 });
      await p.evaluate(s => document.getElementById(s).scrollIntoView(), sec); await p.waitForTimeout(250);
      const r = await p.evaluate(sec => {
        const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const small = [...document.getElementById(sec).querySelectorAll('a[href],button,input,select,[role=tab],[role=slider],[role=radio]')].filter(e => { const b = e.getBoundingClientRect(); const cs = getComputedStyle(e); return b.width > 0 && cs.visibility !== 'hidden' && !e.closest('[aria-hidden=true]') && (b.width < 24 || b.height < 24) && !(e.tagName === 'A' && getComputedStyle(e).display === 'inline'); }).map(e => `${e.tagName}.${e.className}:${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
        return { over, small };
      }, sec);
      ok(`${w}px ${sec}${v} no horizontal overflow`, r.over <= 0, `over=${r.over}`);
      if (r.small.length) out.push(`INFO ${w}px ${sec}${v} targets <24px :: ${[...new Set(r.small)].slice(0, 4).join(' ')}`);
    }
    await ctx.close();
  }
  {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
    for (const v of [1, 2, 3]) {
      await p.goto(`${URL}?v=${code('book', v)}`, { waitUntil: 'load' }); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 15000 });
      const fm = await p.evaluate(() => { const fs = [...document.querySelectorAll('#book input, #book select, #book textarea')].filter(e => e.type !== 'hidden'); return { fields: fs.map(e => ({ n: e.name, t: e.type, ac: e.autocomplete, im: e.inputMode, lab: !!(e.labels && e.labels.length) || !!e.getAttribute('aria-label') || !!e.getAttribute('aria-labelledby'), fs: getComputedStyle(e).fontSize, req: e.required })), live: document.querySelectorAll('#book [aria-live], #book [role=status], #book [role=alert]').length, auto: document.querySelectorAll('#book [autofocus]').length }; });
      info(`book${v} fields`, JSON.stringify(fm));
      ok(`book${v} every field labelled, ≥16px, no autofocus, live region present`, fm.fields.every(x => x.lab && parseFloat(x.fs) >= 16) && !fm.auto && fm.live > 0);
    }
    await ctx.close();
  }
  await b.close();
  console.log(out.join('\n'));
  console.log(`\n${out.filter(l => l.startsWith('PASS')).length} pass, ${out.filter(l => l.startsWith('FAIL')).length} fail`);
})();
