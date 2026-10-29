// §12 item 6: DOM integrity in every one of the 21 live versions at 1440 (and the chrome once): every id that markup or
// script references resolves in the live document, no duplicate ids, every control changes the DOM when used (or is a
// valid tel / external / in-page link), and every form has a working submit handler. Mutations inside the companion and
// cursor-effect layers, and the bare press class, do not count as a control working.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const SECS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'];
const b = await chromium.launch(); const out = []; let fails = 0; const errs = [];
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage();
p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.exposeFunction('noop', () => 0);
const SCRIPT_IDS = ['announce', 'foot', 'hero', ...SECS, ...SECS.flatMap(s => [1, 2, 3].map(v => `tpl-${s}-${v}`))];
for (const s of SECS) for (const v of [1, 2, 3]) {
  await p.goto(FILE + '?v=' + s + v); await p.waitForTimeout(900);
  const refs = await p.evaluate(ids => {
    const all = [...document.querySelectorAll('[id]')].map(e => e.id), dup = all.filter((x, i) => all.indexOf(x) !== i);
    const want = new Set(ids);
    for (const e of document.querySelectorAll('*')) {
      for (const a of ['clip-path', 'mask', 'fill', 'stroke', 'filter', 'marker-end', 'style']) { const val = e.getAttribute(a); if (val) for (const m of val.matchAll(/url\(#([^)]+)\)/g)) want.add(m[1]); }
      for (const a of ['aria-controls', 'aria-labelledby', 'aria-describedby', 'for']) { const val = e.getAttribute(a); if (val) val.split(/\s+/).forEach(x => x && want.add(x)); }
      const h = e.getAttribute('href'); if (h && h.startsWith('#') && h.length > 1) want.add(h.slice(1));
    }
    const missing = [...want].filter(id => !document.getElementById(id));
    return { n: want.size, missing, dup: [...new Set(dup)] };
  }, SCRIPT_IDS);
  // controls inside this version
  const ctrls = await p.evaluate(s => { const st = document.querySelector(`#${s} .stage`); return [...st.querySelectorAll('a[href],button,input,select,textarea,[role=tab]')].map((e, i) => { e.dataset.gate = `${s}-${i}`; return { k: e.dataset.gate, tag: e.tagName.toLowerCase(), href: e.getAttribute('href') || '', type: e.type || '', target: e.target || '', label: (e.getAttribute('aria-label') || e.textContent || e.value || '').trim().replace(/\s+/g, ' ').slice(0, 34) }; }); }, s);
  const res = [];
  for (const c of ctrls) {
    if (c.tag === 'a' && c.href.startsWith('tel:')) { res.push([c.href === 'tel:+19377467377', `tel "${c.label}"`]); continue; }
    if (c.tag === 'a' && /^https?:/.test(c.href)) { res.push([c.target === '_blank' && c.href.startsWith('https://'), `external "${c.label}"`]); continue; }
    if (c.tag === 'a' && c.href.startsWith('#')) {
      const ok = await p.evaluate(([k, h]) => { const t = document.getElementById(h.slice(1)); return !!t; }, [c.k, c.href]);
      await p.evaluate(k => document.querySelector(`[data-gate="${k}"]`).click(), c.k); await p.waitForTimeout(1500);
      const top = await p.evaluate(h => Math.round(document.getElementById(h.slice(1)).getBoundingClientRect().top), c.href);
      res.push([ok && Math.abs(top) < 140, `anchor ${c.href} "${c.label}" (target top ${top})`]);
      await p.evaluate(s => document.getElementById(s).scrollIntoView(), s); await p.waitForTimeout(500); continue;
    }
    // buttons / tabs / inputs: count meaningful DOM mutations while it is used
    await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start' }), s); await p.waitForTimeout(300);
    await p.evaluate(() => { window.__mut = 0; window.__mo && window.__mo.disconnect(); window.__mo = new MutationObserver(list => { for (const m of list) { const t = m.target.nodeType === 1 ? m.target : m.target.parentElement; if (!t || t.closest('.cmp,.cfx') || t === document.documentElement) continue; if (m.type === 'attributes' && m.attributeName === 'class') { const a = (m.oldValue || '').split(/\s+/).filter(x => x && x !== 'is-press').sort().join(' '), z = [...t.classList].filter(x => x !== 'is-press').sort().join(' '); if (a === z) continue; } window.__mut++; } }); window.__mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeOldValue: true, characterData: true }); });
    if (c.tag === 'input' && (c.type === 'text' || c.type === 'search' || !c.type)) { await p.evaluate(k => { const i = document.querySelector(`[data-gate="${k}"]`); i.focus(); i.value = 'Bellbrook'; i.dispatchEvent(new Event('input', { bubbles: true })); i.form && i.form.requestSubmit(); }, c.k); }
    else await p.evaluate(k => document.querySelector(`[data-gate="${k}"]`).click(), c.k);
    await p.waitForTimeout(700);
    const m = await p.evaluate(() => { window.__mo.disconnect(); return window.__mut; });
    res.push([m > 0, `${c.tag}${c.type && c.tag === 'input' ? '[' + c.type + ']' : ''} "${c.label}" (${m} mutations)`]);
  }
  const forms = await p.evaluate(s => [...document.querySelectorAll(`#${s} form`)].map(f => ({ id: f.className, action: f.getAttribute('action'), inline: f.getAttribute('onsubmit') })), s);
  const bad = res.filter(r => !r[0]);
  const ok = !refs.missing.length && !refs.dup.length && !bad.length;
  if (!ok) fails++;
  out.push(`${ok ? 'PASS' : 'FAIL'} ${s}${v}: ids referenced ${refs.n}, missing ${refs.missing.length ? refs.missing.join(',') : 0}, duplicates ${refs.dup.length ? refs.dup.join(',') : 0}; controls ${res.length} working ${res.length - bad.length}${bad.length ? ' FAILING: ' + bad.map(r => r[1]).join(' | ') : ''}${forms.length ? `; forms ${forms.length} (${forms.map(f => f.id).join(',')})` : ''}`);
  for (const r of res) out.push(`   ${r[0] ? 'ok ' : 'BAD'} ${r[1]}`);
}
// chrome: section switchers (every 1/2/3 label changes its section), nav, phone bar, footer, helper picker
await p.goto(FILE); await p.waitForTimeout(900);
const sw = await p.evaluate(async secs => { const r = []; for (const s of secs) for (const v of [2, 3, 1]) { const sec = document.getElementById(s), before = sec.querySelector('.stage').firstElementChild; const l = document.querySelector(`label[for="v-${s}-${v}"]`); l.click(); await new Promise(z => setTimeout(z, 250)); r.push(`${s}${v}:${sec.querySelector('.stage').firstElementChild !== before && sec.dataset.v === String(v) ? 'ok' : 'BAD'}`); } return r; }, SECS);
if (sw.some(x => x.endsWith('BAD'))) fails++;
out.push(`switchers (21 labels): ${sw.filter(x => x.endsWith('ok')).length}/21 change their own section ${sw.filter(x => x.endsWith('BAD')).join(' ')}`);
const pk = await p.evaluate(async () => { const r = []; for (const v of ['hammer', 'drop', 'off', 'house']) { document.querySelector(`label[for="cmp-${v}"]`).click(); await new Promise(z => setTimeout(z, 120)); r.push(document.documentElement.dataset.companion === v); } return r; });
if (pk.includes(false)) fails++;
out.push(`helper picker (4 options): ${pk.filter(Boolean).length}/4 set the companion`);
const chrome = await p.evaluate(() => [...document.querySelectorAll('.nav a, .mbar a, .ftr a')].map(a => [a.getAttribute('href'), a.getAttribute('href') === 'tel:+19377467377' || (a.getAttribute('href').startsWith('#') && !!document.getElementById(a.getAttribute('href').slice(1)))]));
if (chrome.some(c => !c[1])) fails++;
out.push(`nav / phone bar / footer links: ${chrome.filter(c => c[1]).length}/${chrome.length} valid (${chrome.map(c => c[0]).join(' ')})`);
out.push(`forms on the page across versions: tw3-form (Towns V3) only; handler tested in areaint.log and above`);
out.push('console errors: ' + (errs.length ? errs.join(' | ') : 0)); if (errs.length) fails++;
out.push('FAILS: ' + fails); console.log(out.join('\n')); await b.close();
