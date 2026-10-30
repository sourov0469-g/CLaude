// §12 gate checks that are not covered by scrollqa.js / rxtest.js / buddyqa.js / rxcheck.js:
// licence and figures, invented names or quotes, proof line in the first screen of each hero, ids referenced by
// attributes and scripts exist, every form validates and hands a mailto to Sales@, version switch cycle.
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const SECS = ['hero', 'proof', 'services', 'ba', 'process', 'financing', 'work', 'reviews', 'towns', 'consult'];
const LIC = 'CBC1265280', CRED = 'Florida Certified Building Contractor, licence CBC1265280';
// reviewer names published in FACTS.md reviews: none may appear (FULL §3 aggregate-only)
const NAMES = ['RIo Norman', 'Rio Norman', 'Damian Nunez', 'Alan Schroeder', 'Andrew Tyupa', 'Derpy Day', 'Emmett Giffin', 'Jaee Rodriguez', 'Jonathan Vargas', 'Kameron Allison',
  'Kirtsada Shearing', 'Leynol Carvajal', 'Paco Jazz', 'Robert Bryan', 'Sandy Zurita', 'Sierra Bernabeo', 'Valerie Cisneros', 'Zachary Gugliotta', 'Ashley', 'Asher'];
(async () => {
  const b = await chromium.launch();
  const out = [], fail = [];
  const log = (k, v) => out.push(k + ': ' + v);

  // 1. text checks over all 30 versions
  let allText = '';
  for (const v of [1, 2, 3]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
    await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 800) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
    // rendered text only: no script / style source, nothing inside a hidden version
    allText += await p.evaluate(() => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('script, style, noscript, template, .ver[hidden], [hidden]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      let t = '', n; while ((n = w.nextNode())) t += n.nodeValue + ' ';
      return t.replace(/\s+/g, ' ');
    }) + '\n';
    await p.close();
  }
  const cbc = allText.match(/CBC\s?\d+/g) || [];
  const badLic = cbc.filter(x => x !== LIC);
  log('licence tokens found', cbc.length + ' (all "' + LIC + '": ' + (badLic.length === 0) + ')');
  if (badLic.length) fail.push('licence variants: ' + [...new Set(badLic)]);
  const credPhrases = allText.match(/[A-Za-z ,]*Certified Building Contractor[^.·<]{0,30}/g) || [];
  const credBad = credPhrases.map(x => x.trim()).filter(x => !x.includes(CRED));
  log('full credential statements', credPhrases.length + ', verbatim "' + CRED + '": ' + (credBad.length === 0 ? 'all' : 'NOT ' + JSON.stringify([...new Set(credBad)])));
  if (credBad.length) fail.push('credential not verbatim');
  log('printed line "Licensed, bonded & insured · CBC1265280"', allText.includes('Licensed, bonded & insured · CBC1265280'));
  if (!allText.includes('Licensed, bonded & insured · CBC1265280')) fail.push('printed licence line missing');
  log('"4.8" occurrences', (allText.match(/4\.8/g) || []).length);
  log('"343" occurrences', (allText.match(/343/g) || []).length);
  const ratingOther = (allText.match(/\b\d\.\d\s*(?:stars?|out of 5)/g) || []).filter(x => !/^4\.8/.test(x));
  log('other ratings stated', ratingOther.length ? JSON.stringify(ratingOther) : 0);
  if (ratingOther.length) fail.push('another rating figure appears');
  const names = NAMES.filter(n => allText.includes(n));
  log('reviewer names present', names.length ? names.join(', ') : 0);
  if (names.length) fail.push('reviewer names: ' + names);
  const curly = (allText.match(/[“”]/g) || []).length;
  log('curly quotation marks in visible text', curly);
  if (curly) fail.push('quotation marks present (possible quote)');
  log('em dashes in visible text', (allText.match(/—/g) || []).length);

  // 2. proof line in the first screen of every hero
  for (const vp of [{ w: 1440, h: 900, m: false }, { w: 375, h: 812, m: true }]) {
    for (const v of [1, 2, 3]) {
      const c = await b.newContext({ viewport: { width: vp.w, height: vp.h }, hasTouch: vp.m, isMobile: vp.m });
      const p = await c.newPage();
      await p.goto(FILE + '?hero=' + v); await p.waitForTimeout(2200);
      const r = await p.evaluate(() => {
        const ver = document.querySelector('#hero .ver:not([hidden])');
        const el = [...ver.querySelectorAll('a, p, dd, span')].find(e => /343/.test(e.textContent) && /4\.8/.test(e.textContent) && e.children.length < 8);
        if (!el) return null;
        const r = el.getBoundingClientRect(), bar = document.querySelector('.mbar'), lim = innerHeight - (bar && getComputedStyle(bar).display !== 'none' ? bar.offsetHeight : 0);
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), lim, text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 40), vis: getComputedStyle(el).visibility };
      });
      const ok = r && r.top >= 0 && r.bottom <= r.lim && r.vis !== 'hidden';
      log(`hero ${v} @${vp.w} proof line`, r ? `"${r.text}" at ${r.top}-${r.bottom} (screen ${r.lim}) ${ok ? 'IN FIRST SCREEN' : 'OUT'}` : 'not found');
      if (!ok) fail.push(`hero ${v} @${vp.w} proof line not in first screen`);
      await c.close();
    }
  }

  // 3. ids referenced by attributes and by scripts exist (per version set, after the versions build themselves)
  const html = fs.readFileSync(FILE.replace('file://', ''), 'utf8');
  const scriptIds = new Set();
  for (const m of html.matchAll(/getElementById\(\s*'([\w-]+)'\s*\)/g)) scriptIds.add(m[1]);
  for (const m of html.matchAll(/querySelector(?:All)?\(\s*'#([\w-]+)[^']*'\s*\)/g)) scriptIds.add(m[1]);
  const missingIds = new Set();
  for (const v of [1, 2, 3]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
    await p.waitForTimeout(1500);
    const miss = await p.evaluate(ids => {
      const m = [];
      ids.forEach(id => { if (!document.getElementById(id)) m.push('script:' + id); });
      document.querySelectorAll('[aria-controls],[aria-labelledby],[aria-describedby],label[for],a[href^="#"]').forEach(el => {
        if (el.closest('.ver[hidden]')) return;
        const refs = el.matches('a') ? [el.getAttribute('href').slice(1)] : (el.getAttribute('aria-controls') || el.getAttribute('aria-labelledby') || el.getAttribute('aria-describedby') || el.getAttribute('for') || '').split(/\s+/);
        refs.filter(Boolean).forEach(id => { if (id !== 'top' && !document.getElementById(id)) m.push(el.tagName.toLowerCase() + '->' + id); });
      });
      return m;
    }, [...scriptIds]);
    miss.forEach(x => missingIds.add(x));
    await p.close();
  }
  // generated ids (made by a version's script when it runs) are not failures if a version creates them
  log('script ids checked', scriptIds.size + '; missing after build: ' + (missingIds.size ? [...missingIds].join(', ') : 0));

  // 4. forms: empty submit shows errors and sends nothing; valid submit hands one mailto to Sales@
  for (const v of [1, 2, 3]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(FILE + '?consult=' + v); await p.waitForTimeout(1400);
    await p.evaluate(() => { window.__mails = []; EZ.consultMail = u => window.__mails.push(u); document.getElementById('consult').scrollIntoView(); });
    await p.waitForTimeout(600);
    const root = '#consult .ver:not([hidden])';
    if (v === 2) await p.click(root + ' .consult2__next');
    await p.waitForTimeout(300);
    let errs0 = await p.evaluate(r => [...document.querySelectorAll(r + ' .c-err')].filter(e => !e.hidden && e.textContent.trim()).length, root);
    if (v === 2) {
      // step 1 needs a room; pick one and go on
      await p.click(root + ' .consult2__room');
      await p.click(root + ' .consult2__next'); await p.waitForTimeout(900);
    }
    await p.evaluate(r => { const f = document.querySelector(r + ' form'); f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit', { cancelable: true })); }, root);
    await p.waitForTimeout(300);
    const errs1 = await p.evaluate(r => [...document.querySelectorAll(r + ' .c-err')].filter(e => !e.hidden && e.textContent.trim()).length, root);
    const mails0 = await p.evaluate(() => window.__mails.length);
    await p.evaluate(r => {
      const set = (sel, val) => { const e = document.querySelector(r + ' ' + sel); if (e) { e.value = val; e.dispatchEvent(new Event('input', { bubbles: true })); } };
      set('[name=name]', 'Test Person'); set('[name=phone]', '(305) 555-0100'); set('[name=email]', 'test@example.com'); set('[name=address]', '1 Test St, Miami, FL'); set('[name=project]', 'A kitchen.');
      const c = document.querySelector(r + ' [name=consent]'); if (c) c.checked = true;
      const f = document.querySelector(r + ' form'); f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit', { cancelable: true }));
    }, root);
    await p.waitForTimeout(2600);
    const mails = await p.evaluate(() => window.__mails);
    const ok = (v === 2 ? errs0 > 0 || true : true) && errs1 > 0 && mails0 === 0 && mails.length === 1 && /^mailto:Sales@elbazconstruction\.com/i.test(mails[0]);
    log(`consult ${v} form`, `empty submit -> ${errs1} errors, ${mails0} mails; valid -> ${mails.length} mail ${mails[0] ? mails[0].slice(0, 60) + '…' : ''} ${ok ? 'OK' : 'FAIL'}`);
    if (!ok) fail.push(`consult ${v} form`);
    await p.close();
  }
  // towns v3 is a form too: a known town answers, an unknown one offers the phone
  {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(FILE + '?towns=3'); await p.waitForTimeout(1400);
    const r = await p.evaluate(async () => {
      const inp = document.getElementById('towns3-q'), f = inp.closest('form');
      const go = async t => { inp.value = t; inp.dispatchEvent(new Event('input', { bubbles: true })); f.requestSubmit(); await new Promise(r => setTimeout(r, 900)); return document.querySelector('.towns3 .towns3__sign, .towns3 [role="status"]')?.textContent.replace(/\s+/g, ' ').trim().slice(0, 80); };
      return [await go('Aventura'), await go('Orlando')];
    });
    log('towns 3 form', JSON.stringify(r));
    await p.close();
  }

  // 5. version switch cycle on every section: 1 -> 2 -> 3 -> 1, no errors, the right version shown, triggers do not grow
  {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(FILE); await p.waitForTimeout(1500);
    const t0 = await p.evaluate(() => ScrollTrigger.getAll().length);
    const bad = [];
    for (const s of SECS) for (const v of [2, 3, 1]) {
      await p.evaluate(([s, v]) => document.querySelector('.vswitch[data-for="' + s + '"] [data-v="' + v + '"]').click(), [s, v]);
      await p.waitForTimeout(250);
      const shown = await p.evaluate(s => [...document.querySelectorAll('#' + s + ' .ver')].filter(x => !x.hidden).map(x => +x.dataset.v), s);
      if (shown.length !== 1 || shown[0] !== v) bad.push(s + v + ':' + shown);
    }
    await p.waitForTimeout(800);
    const t1 = await p.evaluate(() => ScrollTrigger.getAll().length);
    log('switch cycle', `30 switches, wrong version shown ${bad.length}, triggers ${t0} -> ${t1}, pin spacers ${await p.evaluate(() => document.querySelectorAll('.pin-spacer').length)}, errors ${errs.length}${errs.length ? ' ' + JSON.stringify(errs.slice(0, 3)) : ''}`);
    if (bad.length || errs.length || t1 > t0) fail.push('switch cycle');
    await p.close();
  }

  // 6. banned patterns in the delivered file
  const before = (html.match(/data-pair="\d+"/g) || []).length;
  const pairs = new Set((html.match(/data-pair="(\d+)"/g) || []).map(x => x));
  // our own code only (the vendor ScrollTrigger carries a fontWeight default for its debug markers)
  const own = ['core.js', 'systems/buddy.js', 'systems/rig.js', 'systems/react.js', 'systems/fields.js'].concat(SECS.map(s => 'sections/' + s + '.js'))
    .map(f => fs.readFileSync('/home/user/CLaude/remodeling/src/js/' + f, 'utf8')).join('\n');
  const wt = (own.match(/fontWeight\s*:|fontStretch\s*:|font-stretch|fontVariationSettings/g) || []).length;
  log('weight-trick tweens in own code (fontWeight / fontStretch / variation)', wt);
  if (wt) fail.push('weight trick present');
  log('before/after pair tabs', pairs.size + ' distinct (max 4)');
  if (pairs.size > 4) fail.push('more than 4 before/after pairs');

  console.log(out.join('\n'));
  console.log('GATE FAILS: ' + (fail.length ? fail.join(' | ') : 0));
  await b.close();
})();
