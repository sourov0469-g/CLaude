// Bank-read fix list checks (PROGRESS "Addendum"): page hygiene the other tools do not cover.
// overflow at 5 widths, exposed h1, duplicate ids, DOM size, input font size on phones, small targets,
// no-JS visibility, forced colours, daylight theme, first tel: position, copy greps (AI words, other trades).
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const PATH = FILE.replace('file://', '');
const OUT = process.env.OUT || '/home/user/CLaude/remodeling/qa';
const SECS = ['hero', 'proof', 'services', 'ba', 'process', 'financing', 'work', 'reviews', 'towns', 'consult'];
const AI = ['transform', 'elevate', 'unlock', 'seamless', 'robust', 'leverage', 'delve', 'tapestry', 'game-changer', 'cutting-edge', 'world-class', 'unparalleled', 'elevating', 'journey', 'empower', 'synergy', 'next-level', 'state-of-the-art'];
const TRADE = ['roof', 'shingle', 'fence', 'hvac', 'furnace', 'siding', 'gutter', 'solar', 'lawn', 'pest', 'plumber near'];
const FIRMS = ['PHS', 'KBF', 'CMK', 'West Shore', 'Stronghold', 'LYKORA', 'Renewal by Andersen', 'Power Home', 'Bonner'];
(async () => {
  const b = await chromium.launch();
  const out = [], fail = [];
  const log = (k, v) => out.push(k + ': ' + v);
  const visText = p => p.evaluate(() => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('script, style, noscript, template, [hidden]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let t = '', n; while ((n = w.nextNode())) t += n.nodeValue + ' ';
    return t.replace(/\s+/g, ' ');
  });
  const errs = [];

  // 1. overflow at 320 / 375 / 768 / 1024 / 1440, all 30 versions
  for (const w of [320, 375, 768, 1024, 1440]) {
    for (const v of [1, 2, 3]) {
      const m = w < 768;
      const c = await b.newContext({ viewport: { width: w, height: 860 }, hasTouch: m, isMobile: m });
      const p = await c.newPage();
      p.on('console', x => { if (x.type() === 'error' || x.type() === 'warning') errs.push(w + 'v' + v + ': ' + x.text()); });
      p.on('pageerror', e => errs.push(w + 'v' + v + ' pageerror: ' + e.message));
      await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
      await p.waitForTimeout(900);
      const H = await p.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); }
      const r = await p.evaluate(() => {
        const W = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const off = [];
        for (const el of document.querySelectorAll('main *, header *, footer *')) {
          if (el.closest('[hidden], svg, .marquee, [aria-hidden="true"]')) continue;
          const cs = getComputedStyle(el); if (cs.position === 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') continue;
          const b = el.getBoundingClientRect(); if (!b.width || !b.height) continue;
          // clipped by an overflow ancestor? then it does not widen the page
          let a = el.parentElement, clipped = false;
          while (a && a !== document.body) { const o = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clipped = true; break; } a = a.parentElement; }
          if (!clipped && (b.right > W + 1 || b.left < -1)) off.push((el.id || el.className || el.tagName).toString().slice(0, 40) + '@' + Math.round(b.right));
        }
        return { sw, W, off: off.slice(0, 6), n: off.length };
      });
      const bad = r.sw > r.W || r.n > 0;
      log('overflow ' + w + ' v' + v, 'scrollWidth ' + r.sw + ' / ' + r.W + ', escaping elements ' + r.n + (r.n ? ' ' + JSON.stringify(r.off) : ''));
      if (bad) fail.push('overflow ' + w + ' v' + v);
      await c.close();
    }
  }

  // 2. structure at 1440 (version 1 + 2 + 3)
  for (const v of [1, 2, 3]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
    await p.waitForTimeout(900);
    const s = await p.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
      const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
      const h1 = [...document.querySelectorAll('h1')].filter(h => !h.closest('[hidden]') && h.getClientRects().length).length;
      const skip = document.querySelector('a.skip');
      return {
        dup: [...new Set(dup)], nodes: document.getElementsByTagName('*').length, h1,
        skip: !!(skip && document.querySelector(skip.getAttribute('href'))),
        icon: !!document.querySelector('link[rel="icon"]'), og: document.querySelectorAll('meta[property^="og:"]').length,
        address: !!document.querySelector('footer address'),
        licLink: [...document.querySelectorAll('a[href*="myfloridalicense.com"]')].length,
        navTel: !!document.querySelector('header a[href^="tel:"]'),
        transAll: [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).transitionProperty === 'all' && getComputedStyle(e).transitionDuration !== '0s').length,
        focusTrans: [...document.querySelectorAll('a, button, input, textarea, [tabindex]')].filter(e => { const c = getComputedStyle(e); return /outline|all/.test(c.transitionProperty) && c.transitionDuration.split(',').some(d => parseFloat(d) > 0); }).length
      };
    });
    log('v' + v + ' duplicate ids', s.dup.length ? JSON.stringify(s.dup) : 0); if (s.dup.length) fail.push('duplicate ids v' + v);
    log('v' + v + ' DOM elements', s.nodes);
    log('v' + v + ' exposed h1', s.h1); if (s.h1 !== 1) fail.push('h1 count v' + v + ' = ' + s.h1);
    log('v' + v + ' elements transitioning "all"', s.transAll); if (s.transAll) fail.push('transition all v' + v);
    if (v === 1) {
      log('skip link resolves', s.skip); if (!s.skip) fail.push('skip link');
      log('favicon', s.icon); if (!s.icon) fail.push('favicon');
      log('og tags', s.og);
      log('footer <address>', s.address); if (!s.address) fail.push('address');
      log('links to myfloridalicense.com', s.licLink); if (!s.licLink) fail.push('licence link');
      log('phone in header', s.navTel);
      log('controls whose focus ring (outline) is transitioned', s.focusTrans);
      if (s.focusTrans) fail.push('focus ring transitioned');
    }
    await p.close();
  }

  // 3. phones: input font size >= 16px, targets >= 24px (all 3 versions)
  for (const v of [1, 2, 3]) {
    const c = await b.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
    const p = await c.newPage();
    await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
    await p.waitForTimeout(900);
    const r = await p.evaluate(() => {
      const small = [], tiny = [];
      for (const i of document.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea, select')) {
        if (i.closest('[hidden]')) continue;
        const fs = parseFloat(getComputedStyle(i).fontSize); if (fs < 16) small.push((i.id || i.name || i.className) + '=' + fs);
      }
      for (const a of document.querySelectorAll('main a, main button, main [role=tab], main [role=radio], main input[type=range], main [tabindex="0"]')) {
        if (a.closest('[hidden], [aria-hidden="true"]')) continue;
        const r = a.getBoundingClientRect(); if (!r.width) continue;
        if (getComputedStyle(a).display === 'inline' && a.tagName === 'A') continue; // inline text links are exempt (WCAG 2.5.8)
        if (r.width < 24 || r.height < 24) tiny.push((a.className || a.tagName).toString().slice(0, 30) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
      }
      return { small, tiny };
    });
    log('375 v' + v + ' inputs under 16px', r.small.length ? JSON.stringify(r.small) : 0); if (r.small.length) fail.push('input font v' + v);
    log('375 v' + v + ' targets under 24px', r.tiny.length ? JSON.stringify(r.tiny.slice(0, 8)) + (r.tiny.length > 8 ? ' +' + (r.tiny.length - 8) : '') : 0); if (r.tiny.length) fail.push('small targets v' + v);
    await c.close();
  }

  // 4. without JavaScript: every section's first version is readable (no opacity 0 start states from CSS)
  {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const p = await c.newPage();
    await p.goto(FILE);
    await p.waitForTimeout(500);
    const r = await p.evaluate(() => {
      const hid = [];
      for (const el of document.querySelectorAll('main h1, main h2, main p, main li, main a.btn, main button')) {
        if (el.closest('[hidden], .ver[hidden]')) continue;
        let e = el, op = 1, vis = true;
        while (e && e !== document.body) { const cs = getComputedStyle(e); op *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') vis = false; e = e.parentElement; }
        if ((op < .1 || !vis) && el.textContent.trim()) hid.push(el.textContent.trim().slice(0, 30));
      }
      return { hid, h2: document.querySelectorAll('main h2').length };
    });
    log('no-JS: hidden text elements', r.hid.length ? JSON.stringify(r.hid.slice(0, 8)) + ' (' + r.hid.length + ')' : 0);
    if (r.hid.length) fail.push('content hidden without JS');
    await c.close();
  }

  // 5. forced colours + daylight theme render without errors (screenshots for the spot check)
  {
    const c = await b.newContext({ viewport: { width: 1440, height: 900 }, forcedColors: 'active' });
    const p = await c.newPage(); const e = [];
    p.on('pageerror', x => e.push(x.message));
    await p.goto(FILE); await p.waitForTimeout(800);
    await p.screenshot({ path: OUT + '/hygiene-forced-colors.png' });
    log('forced-colors page errors', e.length);
    await c.close();
    const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p2.addInitScript(() => { try { localStorage.setItem('ez-theme', 'daylight'); } catch (e) {} });
    await p2.goto(FILE); await p2.waitForTimeout(800);
    const th = await p2.evaluate(() => document.documentElement.dataset.theme);
    for (const id of ['hero', 'proof', 'reviews', 'consult']) {
      await p2.evaluate(id => document.getElementById(id).scrollIntoView(), id); await p2.waitForTimeout(500);
      await p2.screenshot({ path: OUT + '/hygiene-daylight-' + id + '.png' });
    }
    log('daylight theme applied', th);
    await p2.close();
  }

  // 6. source-level checks
  const html = fs.readFileSync(PATH, 'utf8');
  const tel = html.indexOf('href="tel:');
  log('first tel: link at', (100 * tel / html.length).toFixed(2) + '% of the HTML (' + tel + ' B in)');
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  let all = '';
  for (const v of [1, 2, 3]) { await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&')); await p.waitForTimeout(700); all += (await visText(p)) + ' '; }
  const low = all.toLowerCase();
  const ai = AI.filter(w => new RegExp('\\b' + w + '\\b').test(low));
  log('AI-pattern words in visible copy', ai.length ? ai.join(', ') : 0); if (ai.length) fail.push('AI words: ' + ai);
  // a trade word is foreign only if Elbaz's own published facts never use it (roofing is a listed Elbaz service; HVAC and solar are lender categories)
  const facts = fs.readFileSync('/home/user/CLaude/remodeling/FACTS.md', 'utf8').toLowerCase();
  const tr = TRADE.filter(w => new RegExp('\\b' + w).test(low));
  const foreign = tr.filter(w => !facts.includes(w));
  log('trade words in visible copy', tr.length ? tr.join(', ') + ' (all in FACTS.md: ' + (foreign.length === 0) + ')' : 0); if (foreign.length) fail.push('foreign trade terms: ' + foreign);
  const fi = FIRMS.filter(w => new RegExp('\\b' + w + '\\b').test(all));
  log('other firms named in visible copy', fi.length ? fi.join(', ') : 0); if (fi.length) fail.push('firm names: ' + fi);
  log('em dashes in visible copy', (all.match(/—/g) || []).length); if (/—/.test(all)) fail.push('em dash');
  const H = await p.evaluate(() => document.body.scrollHeight);
  log('page length (v3 page, 1440x900)', (H / 900).toFixed(1) + ' screens');
  await b.close();

  log('console errors/warnings across overflow runs', errs.length ? JSON.stringify(errs.slice(0, 6)) : 0);
  if (errs.length) fail.push('console messages: ' + errs.length);
  out.push('', 'FAILS: ' + (fail.length ? fail.join(' | ') : 0));
  fs.writeFileSync(OUT + '/hygiene.txt', out.join('\n') + '\n');
  console.log(out.join('\n'));
})();
