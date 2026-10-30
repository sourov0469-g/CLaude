// node ctl.js <fileurl> <width> > out   — §12.7 "every switcher button and interactive control is click-tested to
// confirm it actually changes the DOM". Each control is clicked on a FRESH load of its version (no cascading state).
// A control passes if the click changes the DOM (mutations outside decor/companion/field layers and outside targets
// that were already changing on their own), the scroll position, the URL, or moves focus; tel: and external links are
// checked by href (not followed); a radio/tab already selected is reported SELECTED (clicking it is a no-op by design).
const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
const [URL, W] = [process.argv[2], +process.argv[3] || 1440];
const H = W < 600 ? 812 : 900;
const SEL = 'a[href], button, input, select, textarea, [role="slider"], [role="radio"], [role="tab"], [role="option"]';
const DECOR = '.rx, .pal, .cfx, .sfx, .sdv, .cur, .rx-lap, .bgf, .pal-mini';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: W < 600, hasTouch: W < 600 });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const res = [];
  const open = async (code, sec) => {
    await p.goto(`${URL}?v=${code}`, { waitUntil: 'load' });
    if (sec) await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, sec);
    await p.waitForTimeout(450);
  };
  const list = (scope) => p.evaluate(([scope, SEL]) => {
    const root = document.querySelector(scope);
    return [...root.querySelectorAll(SEL)].map((e, i) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
      const vis = r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && !e.closest('[hidden]') && !e.closest('[aria-hidden="true"]') && !(e.tagName === 'INPUT' && e.type === 'hidden');
      return { i, vis, tag: e.tagName.toLowerCase(), type: e.type || '', role: e.getAttribute('role') || '', href: e.getAttribute('href') || '', label: (e.getAttribute('aria-label') || e.textContent || e.value || e.name || '').trim().replace(/\s+/g, ' ').slice(0, 40), sel: e.getAttribute('aria-checked') === 'true' || e.getAttribute('aria-selected') === 'true', disabled: e.disabled === true }; });
  }, [scope, SEL]);
  const probe = (scope, i, fileInput) => p.evaluate(async ([scope, SEL, DECOR, i]) => {
    const el = [...document.querySelector(scope).querySelectorAll(SEL)][i];
    const decor = n => { const e = n.nodeType === 1 ? n : n.parentElement; return !e || !!e.closest(DECOR); };
    // noise: what changes on its own for 350 ms
    const noisy = new Set(); let mo = new MutationObserver(ms => ms.forEach(m => noisy.add(m.target)));
    mo.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true }); await new Promise(r => setTimeout(r, 350)); mo.disconnect();
    window.__hits = []; window.__mo = new MutationObserver(ms => ms.forEach(m => { if (!decor(m.target) && !noisy.has(m.target)) window.__hits.push((m.target.className && m.target.className.baseVal === undefined ? m.target.className : m.target.nodeName) + ':' + (m.attributeName || m.type)); }));
    window.__mo.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
    window.__before = { y: scrollY, href: location.href, act: document.activeElement };
    const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, [scope, SEL, DECOR, i]);
  const verdict = () => p.evaluate(() => { window.__mo.disconnect(); const B = window.__before; return { dom: window.__hits.length, sample: window.__hits.slice(0, 3).join(' '), scroll: Math.abs(scrollY - B.y) > 4, url: location.href !== B.href, focus: document.activeElement !== B.act && document.activeElement !== document.body }; });
  const run = async (name, code, sec, scope) => {
    await open(code, sec);
    const items = await list(scope);
    for (const it of items) {
      if (!it.vis) continue;
      const tagline = `${name} #${it.i} ${it.tag}${it.type ? '[' + it.type + ']' : ''}${it.role ? '(' + it.role + ')' : ''} "${it.label}"`;
      if (it.href.startsWith('tel:')) { res.push(`${it.href === 'tel:+15125500000' ? 'PASS' : 'FAIL'} ${tagline} tel href ${it.href}`); continue; }
      if (/^https?:|^mailto:/.test(it.href)) { res.push(`PASS ${tagline} external href`); continue; }
      if (it.sel) { res.push(`SELECTED ${tagline}`); continue; }
      if (it.disabled) { res.push(`DISABLED ${tagline}`); continue; }
      await open(code, sec);
      const now = await list(scope); const cur = now[it.i];
      if (!cur || !cur.vis) { res.push(`SKIP ${tagline} not visible after reload`); continue; }
      // content inside an inert panel is reached the way a visitor reaches it: open its controller first (aria-controls)
      const opener = await p.evaluate(([scope, SEL, i]) => { const el = [...document.querySelector(scope).querySelectorAll(SEL)][i], ine = el.closest('[inert]'); if (!ine || !ine.id) return false; const c = document.querySelector(`[aria-controls="${ine.id}"]`); if (!c) return false; c.click(); return true; }, [scope, SEL, it.i]);
      if (opener) await p.waitForTimeout(450);
      const pt = await probe(scope, it.i);
      const loc = p.locator(scope).locator(SEL).nth(it.i);
      try {
        if (it.tag === 'input' && it.type === 'file') await loc.setInputFiles('/home/user/CLaude/siding/site/assets/img/photos/p3-1400.webp');
        else if (it.tag === 'input' && it.type === 'range') { await loc.focus(); await p.keyboard.press('ArrowRight'); }
        else if (it.tag === 'input' && (it.type === 'checkbox' || it.type === 'radio')) await loc.click({ force: true, timeout: 3000 });
        else if (it.tag === 'input' || it.tag === 'textarea') { await loc.fill('78752'); await loc.press('Tab'); }
        else if (it.tag === 'select') { const v = await loc.evaluate(s => s.options[s.options.length - 1].value); await loc.selectOption(v); }
        else if (it.role === 'slider') { await loc.focus(); await p.keyboard.press('ArrowRight'); }
        else await loc.click({ timeout: 3000 });
      } catch (e) { res.push(`FAIL ${tagline} could not act: ${e.message.split('\n')[0]}`); continue; }
      await p.waitForTimeout(450);
      const v = await verdict();
      const ok = v.dom > 0 || v.scroll || v.url || v.focus;
      res.push(`${ok ? 'PASS' : 'FAIL'} ${tagline} dom ${v.dom}${v.scroll ? ' scroll' : ''}${v.url ? ' url' : ''}${v.focus ? ' focus' : ''} ${v.sample}`);
    }
  };
  const only = process.argv[4] ? process.argv[4].split(',') : null;   // optional: a comma list like near2,reviews3
  for (const s of SECS) for (const v of [1, 2, 3]) { if (only && !only.includes(s + v)) continue; await run(`${s}${v}`, SECS.map(x => x === s ? v : 1).join(''), s, `#${s} .stage`); }
  if (only) { console.log(res.join('\n')); await b.close(); return; }
  await run('chrome-header', '1111111111', '', '.hd');
  await run('chrome-footer', '1111111111', 'book', '.ft');
  await run('chrome-picks', '1111111111', '', '.picks');
  await run('chrome-switchers', '1111111111', 'proof', '#proof .vsw');
  console.log(res.join('\n'));
  const n = k => res.filter(r => r.startsWith(k)).length;
  console.log(`SUMMARY ${W}: PASS ${n('PASS')} FAIL ${n('FAIL')} SELECTED ${n('SELECTED')} SKIP ${n('SKIP')} DISABLED ${n('DISABLED')} | page errors: ${errs.length ? errs.join(' | ') : 0}`);
  await b.close();
})();
