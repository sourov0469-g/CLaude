// Phase 11 · "every click state clean" (FINALIZE AUDIT STANDARD). Every control on every page, with each version set,
// at 1440 and 390, is pressed; every form is submitted empty (errors) and complete (success); focus is walked by Tab.
//  after each press   page errors, horizontal overflow, leaked text (codes, undefined, NaN, [object, braces)
//  forms              empty submit shows errors and does not mail; complete submit calls the mail hand-off with
//                     mailto:Sales@elbazconstruction.com and shows a message that never claims the mail was sent
//  messages           every error, success and live message shown: AA contrast against its painted ground
//  focus              every element reached by Tab shows a visible focus indicator (outline, ring or shadow)
// Usage: node states.js <page> <width> <versions 1|2> [outdir]
const { chromium } = require('playwright');
const fs = require('fs');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const [page, wArg, vArg, outd] = process.argv.slice(2); const W = +wArg, V = +vArg, OUTD = outd || '/home/user/CLaude/qa/finalize/phase11';
const LEAK = /~[a-z]+\/[a-z]+|\bundefined\b|\bNaN\b|\[object|\{\{|\}\}|\bnull\b/;
const CLAIM = /\b(we (have )?received|has been sent|was sent|message sent|request sent|submitted successfully|thank you for (your )?submission)\b/i;

function contrastOf(sel) {
  const lin = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); };
  const L = c => .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]);
  const parse = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; };
  const over = (t, b) => [t[0] * t[3] + b[0] * (1 - t[3]), t[1] * t[3] + b[1] * (1 - t[3]), t[2] * t[3] + b[2] * (1 - t[3]), 1];
  const out = [];
  document.querySelectorAll(sel).forEach(box => {
    if (box.hidden || box.closest('[hidden]') || box.getBoundingClientRect().width === 0) return;
    box.querySelectorAll('*').forEach(x => x); [box, ...box.querySelectorAll('*')].forEach(e => {
      if (![...e.childNodes].some(n => n.nodeType === 3 && n.nodeValue.trim())) return;
      const rr = e.getBoundingClientRect(); if (rr.width === 0 || rr.height === 0) return;
      const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return; let op = 1; for (let a = e; a; a = a.parentElement) op *= +getComputedStyle(a).opacity; if (op < .15) return;
      const fg = parse(cs.color); if (!fg) return; const st = [];
      for (let a = e; a; a = a.parentElement) { const c = parse(getComputedStyle(a).backgroundColor); if (c && c[3] > 0) { st.push(c); if (c[3] >= .99) break; } }
      let bg = [255, 255, 255, 1]; for (let i = st.length - 1; i >= 0; i--) bg = over(st[i], bg);
      const f = over([fg[0], fg[1], fg[2], fg[3] * op], bg); const l1 = L(f), l2 = L(bg); const r = (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05);
      const px = parseFloat(cs.fontSize), large = px >= 24 || (px >= 18.66 && +cs.fontWeight >= 700);
      out.push({ sel, cls: String(e.className).slice(0, 30), text: e.textContent.trim().slice(0, 50), ratio: +r.toFixed(2), ok: r >= (large ? 3 : 4.5) });
    });
  });
  return out;
}

(async () => {
  fs.mkdirSync(OUTD, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: W > 500 ? 900 : 844 } });
  const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 200)));
  p.on('dialog', d => d.dismiss());
  await p.goto('file:///home/user/CLaude/remodeling/site/' + PAGES[page]); await p.waitForTimeout(1200);
  await p.evaluate(() => { window.__mail = []; EZ.consultMail = u => window.__mail.push(u); });
  if (V === 2) await p.evaluate(() => [...document.querySelectorAll('section.sec[id]')].forEach(s => { if (s.querySelectorAll(':scope .ver[data-v]').length > 1) EZ.activate(s.id, 2); }));
  await p.waitForTimeout(500);
  // scroll the whole page once so every reveal has played (revealed controls start at visibility: hidden)
  const Hh = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < Hh; y += 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); }
  await p.waitForTimeout(400);
  const R = { page, W, V, presses: [], issues: [], forms: [], messages: [], focus: { walked: 0, missing: [] } };
  const issue = (what) => { R.issues.push(what); };
  const health = async (label) => {
    const h = await p.evaluate(LEAKsrc => { const re = new RegExp(LEAKsrc); const W = document.documentElement.clientWidth;
      const text = document.body.innerText; const leak = (text.match(re) || [])[0];
      return { over: document.documentElement.scrollWidth > W + 1, leak }; }, LEAK.source);
    if (h.over) issue(label + ': horizontal overflow');
    if (h.leak) issue(label + ': leaked text "' + h.leak + '"');
  };
  // ---- 1. every control (forms' submit buttons are handled in step 2; the page and version switchers are skipped)
  const n = await p.evaluate(() => {
    const els = [...document.querySelectorAll('button, [role="tab"], [role="button"], summary, select, input[type="radio"], input[type="checkbox"]')]
      .filter(e => !e.closest('.vswitch, .nav__vs, [hidden]') && !(e.matches('button') && e.type === 'submit') && !e.disabled);
    // a group of more than 10 identical controls in one section (the 104 town names) is sampled: its first 8 and last 2
    const groups = {}; els.forEach(e => { const k = ((e.closest('section[id]') || {}).id || 'chrome') + '|' + e.tagName + '|' + String(e.className).split(' ')[0]; (groups[k] = groups[k] || []).push(e); });
    const keep = new Set(); Object.values(groups).forEach(g => (g.length > 10 ? g.slice(0, 8).concat(g.slice(-2)) : g).forEach(e => keep.add(e)));
    const pick = els.filter(e => keep.has(e)); window.__sampled = els.length - pick.length;
    pick.forEach((e, i) => e.setAttribute('data-st', i)); return pick.length; });
  for (let i = 0; i < n; i++) {
    const info = await p.evaluate(i => { const e = document.querySelector('[data-st="' + i + '"]'); if (!e) return null; const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      const shown = (r.width > 0 && r.height > 0 && s.visibility !== 'hidden') || (e.matches('input') && e.closest('label') && e.closest('label').getBoundingClientRect().width > 0);
      return { shown, tag: e.tagName.toLowerCase(), cls: String(e.className).split(' ')[0], label: (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 40), sec: (e.closest('section[id]') || { id: 'chrome' }).id }; }, i);
    if (!info || !info.shown) continue;
    const label = `${info.sec} ${info.tag}.${info.cls} "${info.label}"`;
    if (process.env.TRACE) console.error('press', i, label);
    const before = errs.length;
    try {
      if (info.tag === 'select') await p.evaluate(i => { const s = document.querySelector('[data-st="' + i + '"]'); s.selectedIndex = Math.min(s.options.length - 1, 1); s.dispatchEvent(new Event('change', { bubbles: true })); }, i);
      else { const h = await p.$('[data-st="' + i + '"]'); await h.scrollIntoViewIfNeeded().catch(() => {}); await h.click({ timeout: 1500 }).catch(async () => { await p.evaluate(i => document.querySelector('[data-st="' + i + '"]').click(), i); }); }
    } catch (e) { issue(label + ': could not press (' + String(e).slice(0, 60) + ')'); continue; }
    await p.waitForTimeout(220);
    R.presses.push(label);
    if (errs.length > before) issue(label + ': page error ' + errs[errs.length - 1]);
    await health(label);
    // close anything modal the press opened (menu sheet, lightbox)
    if (await p.evaluate(() => !!document.querySelector('.sheet:not([hidden]), [role="dialog"]:not([hidden])'))) { await p.keyboard.press('Escape'); await p.waitForTimeout(250);
      if (await p.evaluate(() => !!document.querySelector('.sheet:not([hidden]), [role="dialog"]:not([hidden])'))) issue(label + ': Escape did not close the overlay'); }
  }
  // ---- 2. every visible form: empty submit, then complete submit
  const forms = await p.evaluate(() => [...document.querySelectorAll('form')].filter(f => f.getBoundingClientRect().width > 0 && !f.closest('[hidden]')).map((f, i) => { f.setAttribute('data-fm', i); return { i, id: f.id || f.className.split(' ')[0], sec: (f.closest('section[id]') || { id: '?' }).id }; }));
  for (const f of forms) {
    const sel = '[data-fm="' + f.i + '"]';
    await p.evaluate(sel => { const f = document.querySelector(sel); f.reset(); f.scrollIntoView({ block: 'center' }); }, sel);
    const m0 = await p.evaluate(() => window.__mail.length);
    await p.evaluate(sel => { const f = document.querySelector(sel); const s = f.querySelector('[type="submit"]'); s.click(); }, sel); await p.waitForTimeout(400);
    const empty = await p.evaluate(sel => { const f = document.querySelector(sel); return { errors: [...f.querySelectorAll('.c-err')].filter(e => !e.hidden).map(e => e.textContent.trim()), invalid: f.querySelectorAll('[aria-invalid="true"]').length, focus: document.activeElement ? (document.activeElement.name || document.activeElement.id || document.activeElement.tagName) : null }; }, sel);
    const mailedEmpty = (await p.evaluate(() => window.__mail.length)) > m0;
    R.messages.push(...await p.evaluate(contrastOf, sel + ' .c-err'));
    // complete it: text by name, a valid email and phone, the first option of each choice group, consent
    await p.evaluate(sel => { const f = document.querySelector(sel);
      f.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.type === 'hidden' || el.disabled) return;
        if (el.tagName === 'SELECT') { if (el.selectedIndex <= 0 && el.options.length > 1) el.selectedIndex = 1; }
        else if (el.type === 'checkbox') { el.checked = true; }
        else if (el.type === 'radio') { if (!f.querySelector('input[type="radio"][name="' + el.name + '"]:checked')) el.checked = true; }
        else if (el.type === 'email' || /mail/i.test(el.name)) el.value = 'visitor@example.com';
        else if (el.type === 'tel' || /phone|tel/i.test(el.name)) el.value = '(305) 555-0100';
        else if (/zip|postal/i.test(el.name)) el.value = '33130';
        else el.value = el.tagName === 'TEXTAREA' ? 'A kitchen with a new layout.' : 'Test Visitor';
        el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
      }); }, sel);
    const m1 = await p.evaluate(() => window.__mail.length);
    await p.evaluate(sel => document.querySelector(sel).querySelector('[type="submit"]').click(), sel); await p.waitForTimeout(500);
    const done = await p.evaluate(([sel, m1]) => { const f = document.querySelector(sel); const d = f.querySelector('.c-done');
      return { mail: window.__mail.slice(m1), doneShown: !!d && !d.hidden, doneText: d ? d.textContent.trim() : '', errors: [...f.querySelectorAll('.c-err')].filter(e => !e.hidden).map(e => e.textContent.trim()) }; }, [sel, m1]);
    R.messages.push(...await p.evaluate(contrastOf, sel + ' .c-done'));
    const rec = { form: f.id, sec: f.sec, emptyErrors: empty.errors.length, emptyInvalid: empty.invalid, emptyFocus: empty.focus, mailedEmpty, mailed: done.mail.map(u => u.split('?')[0]), doneShown: done.doneShown, doneText: done.doneText.slice(0, 160), leftErrors: done.errors };
    R.forms.push(rec);
    if (mailedEmpty) issue(f.sec + ' form: an empty submit opened the mail hand-off');
    if (!empty.errors.length && !empty.invalid) issue(f.sec + ' form: an empty submit showed no error');
    if (!done.mail.length) issue(f.sec + ' form: a complete submit did not hand off to mail (left errors: ' + done.errors.join(' | ') + ')');
    done.mail.forEach(u => { if (!/^mailto:Sales@elbazconstruction\.com\?/i.test(u)) issue(f.sec + ' form: mail hand-off to ' + u.slice(0, 60)); });
    if (done.mail.length && !done.doneShown) issue(f.sec + ' form: no confirmation shown after the hand-off');
    if (CLAIM.test(done.doneText)) issue(f.sec + ' form: confirmation claims the mail was sent: "' + done.doneText.slice(0, 80) + '"');
    if (LEAK.test(done.doneText)) issue(f.sec + ' form: leaked text in confirmation');
    await health(f.sec + ' form');
  }
  // live regions that hold text now (answers, tips, readouts)
  R.messages.push(...await p.evaluate(contrastOf, '[aria-live]:not(.c-done):not(.c-err)'));
  R.messages.filter(m => !m.ok).forEach(m => issue('contrast ' + m.ratio + ' on "' + m.text + '" (' + m.sel + ')'));
  // ---- 3. focus walk: every element Tab reaches must look different focused than blurred. The comparison covers the
  // element, its pseudo-elements, its descendants, its parent (and the parent's pseudo-elements) and its next sibling,
  // across outline, box-shadow, border colour, background, colour, stroke, fill, opacity and transform.
  await p.evaluate(() => {
    window.__snap = e => { const P = ['outlineStyle', 'outlineWidth', 'outlineColor', 'boxShadow', 'borderTopColor', 'borderBottomColor', 'backgroundColor', 'color', 'stroke', 'strokeWidth', 'fill', 'opacity', 'transform', 'textDecorationLine'];
      const take = (x, ps) => { const c = getComputedStyle(x, ps); return P.map(k => c[k]).join('|'); };
      const list = [e, ...[...e.querySelectorAll('*')].slice(0, 40)]; if (e.parentElement) list.push(e.parentElement); if (e.nextElementSibling) list.push(e.nextElementSibling);
      return list.map(x => take(x) + '#' + take(x, '::before') + '#' + take(x, '::after')).join('\n'); };
    scrollTo(0, 0); document.activeElement && document.activeElement.blur(); });
  const seen = new Set();
  for (let t = 0; t < 400; t++) {
    await p.keyboard.press('Tab'); await p.waitForTimeout(30);
    const f = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null;
      const id = e.getAttribute('data-fw') || (e.setAttribute('data-fw', Math.random().toString(36).slice(2)), e.getAttribute('data-fw'));
      window.__on = window.__snap(e); window.__el = e; e.blur();
      return { id, label: e.tagName.toLowerCase() + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).split(' ')[0] + ' "' + (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30) + '"', sec: (e.closest('section[id]') || { id: 'chrome' }).id }; });
    if (!f) continue;
    // indicators often animate (an underline drawing in): compare against the blurred state once transitions have finished
    await p.waitForTimeout(380);
    f.vis = await p.evaluate(() => { const e = window.__el; const off = window.__snap(e); e.focus({ preventScroll: true }); return window.__on !== off; });
    if (seen.has(f.id)) break; seen.add(f.id); R.focus.walked++;
    if (!f.vis) R.focus.missing.push(f.sec + ' ' + f.label);
  }
  R.focus.missing.forEach(m => issue('no visible focus: ' + m));
  R.errors = errs; R.sampledOut = await p.evaluate(() => window.__sampled || 0);
  fs.writeFileSync(`${OUTD}/states-${page}-${W}-v${V}.json`, JSON.stringify(R, null, 1));
  console.log(`${page} ${W} v${V}: presses ${R.presses.length} | forms ${R.forms.length} | messages ${R.messages.length} | focus walked ${R.focus.walked} | issues ${R.issues.length} | page errors ${errs.length}`);
  [...new Set(R.issues)].slice(0, 30).forEach(x => console.log('   ' + x));
  await b.close();
})();
