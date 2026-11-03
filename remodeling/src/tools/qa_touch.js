// Deep QA · touch interaction pass: on an emulated phone (touch, 390x844) every interactive piece is TAPPED the way a
// thumb would, and its visible result is read back. One line per check: PASS or FAIL with what was seen.
// Usage: node qa_touch.js
const { chromium } = require('playwright');
const SITE = 'file:///home/user/CLaude/remodeling/site/';
let fails = 0;
function out(ok, name, seen) { if (!ok) fails++; console.log((ok ? 'PASS ' : 'FAIL ') + name + (seen !== undefined ? '  [' + seen + ']' : '')); }
async function open(b, file) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(String(e).slice(0, 140)));
  await p.goto(SITE + file); await p.waitForTimeout(1200); return p;
}
async function to(p, sel) { await p.evaluate(s => { const e = document.querySelector(s); scrollTo(0, e.getBoundingClientRect().top + scrollY - 120); }, sel); await p.waitForTimeout(900); }
async function center(p, sel) { await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(1200); }
const txt = (p, s) => p.evaluate(s => { const e = document.querySelector(s); return e ? e.textContent.trim().replace(/\s+/g, ' ') : null; }, s);
(async () => {
  const b = await chromium.launch();
  /* ---------- Home ---------- */
  let p = await open(b, 'elbaz-homepage.html');
  // menu sheet
  await p.tap('.nav__menu'); await p.waitForTimeout(500);
  out(await p.evaluate(() => !document.getElementById('sheet').hidden), 'menu opens on tap');
  out(await p.evaluate(() => document.activeElement && !!document.activeElement.closest('#sheet')), 'menu takes focus');
  await p.tap('.sheet__close'); await p.waitForTimeout(400);
  out(await p.evaluate(() => document.getElementById('sheet').hidden), 'menu closes');
  // hero swatch
  const n0 = await txt(p, '.hm__name');
  const sw = await p.$$('.hm__sw [role="radio"], .hm__sw button'); if (sw.length > 2) { await sw[2].scrollIntoViewIfNeeded(); await sw[2].tap(); await p.waitForTimeout(600); }
  out(sw.length > 2 && (await txt(p, '.hm__name')) !== n0, 'hero swatch tap changes the kitchen', await txt(p, '.hm__name'));
  // proof: tap a block opens its card
  await to(p, '#proof .pf__site'); await p.waitForTimeout(2500);
  const blk = (await p.$$('#proof .pf__b'))[2]; const bb = await blk.boundingBox();
  await p.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(600);
  out(await p.evaluate(() => !document.querySelector('#proof .pf__fact').hidden), 'proof: tap a block opens its card', await txt(p, '#proof .pf__fv'));
  await p.tap('#proof .pf__tower'); await p.waitForTimeout(4500);
  out(await p.evaluate(() => document.querySelector('#proof .pf__site').classList.contains('is-won')), 'proof: Build the tower earns the stamp');
  // services: open a sheet
  await to(p, '#services');
  const sv = await p.$('#services button'); if (sv) { await sv.tap(); await p.waitForTimeout(700); }
  out(!!sv && await p.evaluate(() => !!document.querySelector('#services [aria-expanded="true"], #services .is-open, .sheetx:not([hidden]), [role="dialog"]:not([hidden])')), 'services: a scope sheet opens on tap');
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  // before/after: tap another pair
  await to(p, '#ba');
  const pairs = await p.$$('#ba [role="tab"], #ba .bx__it button, #ba li button'); const cap0 = await txt(p, '#ba figcaption');
  if (pairs.length > 1) { await pairs[1].tap(); await p.waitForTimeout(800); }
  out(pairs.length > 1 && await p.evaluate(() => document.getElementById('bx-t1').getAttribute('aria-selected') === 'true'), 'before/after: tap a project switches the pair');
  // process dial: tap a stage icon
  await to(p, '#process');
  const nodes = await p.$$('#process .pd__node'); await nodes[4].tap(); await p.waitForTimeout(600);
  out((await txt(p, '#process .pz-t')) === 'Permitting', 'process: tap a stage shows it', await txt(p, '#process .pz-t'));
  await p.tap('#process .pd__btn[data-d="1"]'); await p.waitForTimeout(500);
  out((await txt(p, '#process .pz-t')) === 'Construction', 'process: next button steps on', await txt(p, '#process .pz-t'));
  // financing switch
  await to(p, '#financing');
  await p.tap('#financing .fb__sb[data-w="in"]'); await p.waitForTimeout(500);
  out(await p.evaluate(() => document.querySelector('#financing .fb__h--pa').classList.contains('is-dim')), 'financing: Inside the home lights consumer credit');
  // work: tap a frame opens the viewer
  await to(p, '#work');
  const fr = await p.$('#work .pj__f'); if (fr) { await fr.tap({ force: true }); await p.waitForTimeout(800); }
  out(!!fr && await p.evaluate(() => { const v = document.querySelector('.viewer, .vw, [class*="viewer"]'); return !!v && !v.hidden; }), 'projects: tap a frame opens it large');
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  // reviews: tap the stars (no error)
  await to(p, '#reviews .rv__cv'); const cv = await (await p.$('#reviews .rv__cv')).boundingBox(); await p.touchscreen.tap(cv.x + cv.width / 2, cv.y + cv.height / 2); await p.waitForTimeout(500);
  out(p.errs.length === 0, 'reviews: tapping the stars runs clean');
  // what homeowners wrote: filter, read all, step on
  await center(p, '#voices .vc__chip[data-f="bath"]'); await p.tap('#voices .vc__chip[data-f="bath"]'); await p.waitForTimeout(600);
  const vn = await p.evaluate(() => [...document.querySelectorAll('#voices .vc__c')].filter(c => !c.hidden).length);
  out(vn === 7, 'voices: Bathrooms filter shows the bathroom reviews', vn + ' cards');
  await p.tap('#voices .vc__chip[data-f="all"]'); await p.waitForTimeout(500);
  const more = await p.evaluate(() => { const b = [...document.querySelectorAll('#voices .vc__more')].find(x => !x.hidden); if (!b) return null; b.scrollIntoView({ block: 'center', inline: 'nearest' }); b.closest('.vc__c').scrollIntoView({ inline: 'start', block: 'nearest' }); return b.id || b.getAttribute('aria-controls'); });
  if (more) { await p.waitForTimeout(700); await p.tap(`#voices .vc__more[aria-controls="${more}"]`); await p.waitForTimeout(400); }
  out(!!more && await p.evaluate(m => document.querySelector(`#voices .vc__more[aria-controls="${m}"]`).getAttribute('aria-expanded') === 'true', more), 'voices: Read all opens a long review');
  await center(p, '#voices .vc__btn[data-d="1"]'); const vc0 = await txt(p, '#voices .vc__count');
  await p.tap('#voices .vc__btn[data-d="1"]'); await p.waitForTimeout(900);
  out((await txt(p, '#voices .vc__count')) !== vc0, 'voices: next moves the row on', vc0 + ' -> ' + await txt(p, '#voices .vc__count'));
  // towns: type, pick, answer
  await to(p, '#towns');
  await p.tap('#tw-q'); await p.keyboard.type('Dora'); await p.waitForTimeout(500);
  const opt = await p.$('#tw-opts [role="option"]'); if (opt) { await opt.tap(); await p.waitForTimeout(1500); }
  out(!!opt && /Doral/.test(await txt(p, '#towns .tw__ans') || ''), 'towns: type and tap a town answers', (await txt(p, '#towns .tw__ans') || '').slice(0, 60));
  const tile = await p.$('#towns .tw__cb'); await tile.tap(); await p.waitForTimeout(400);
  out(await p.evaluate(() => !document.querySelector('#towns .tw__ul').hidden), 'towns: county tile opens its list');
  // consult: empty submit shows errors, never mails
  await to(p, '#consult form');
  await p.evaluate(() => { window.__mailed = 0; if (window.EZ) { const o = EZ.consultMail; EZ.consultMail = function () { window.__mailed++; }; } });
  const sub = await p.$('#consult form [type="submit"], #consult form button.btn'); await sub.tap(); await p.waitForTimeout(600);
  const errsShown = await p.evaluate(() => [...document.querySelectorAll('#consult .c-err')].filter(e => !e.hidden && e.textContent.trim()).length);
  out(errsShown > 0 && (await p.evaluate(() => window.__mailed)) === 0, 'consult: empty send shows errors, sends nothing', errsShown + ' errors');
  // call card copy
  const cp = await p.$('#consult .cl__copy'); await cp.tap(); await p.waitForTimeout(300);
  out(/Copied|\(754\)/.test(await txt(p, '#consult .cl__copy')), 'consult: copy number confirms', await txt(p, '#consult .cl__copy'));
  out(p.errs.length === 0, 'home: no page errors', p.errs.join(' | '));
  await p.context().close();

  /* ---------- Kitchens ---------- */
  p = await open(b, 'kitchens.html');
  await to(p, '#kitchen-scope'); const t0 = await txt(p, '#kitchen-scope');
  const tiers = await p.$$('#kitchen-scope [role="tab"], #kitchen-scope button'); if (tiers.length > 1) { await tiers[1].tap(); await p.waitForTimeout(700); }
  out(tiers.length > 1 && (await txt(p, '#kitchen-scope')) !== t0, 'kitchens: tap a scope tier changes the plan');
  out(p.errs.length === 0, 'kitchens: no page errors', p.errs.join(' | '));
  await p.context().close();

  /* ---------- Bathrooms ---------- */
  p = await open(b, 'bathrooms.html');
  const mk = await p.$$('#bath-intro button'); const c0 = await txt(p, '.bi__call');
  if (mk.length) { await mk[1].scrollIntoViewIfNeeded(); await mk[1].tap(); await p.waitForTimeout(700); }
  out(mk.length > 0 && (await txt(p, '.bi__call')) !== c0, 'bathrooms: tap a mark explains it', (await txt(p, '.bi__call') || '').slice(0, 50));
  await to(p, '#bath-rooms'); const rooms = await p.$$('#bath-rooms .br__r'); await rooms[7].evaluate(e => e.scrollIntoView({ block: 'center' })); await p.waitForTimeout(1200);
  out(await rooms[7].evaluate(e => getComputedStyle(e).visibility === 'visible' && +getComputedStyle(e.closest('li') || e).opacity > .5), 'bathrooms: the room list is visible once scrolled to', await rooms[7].evaluate(e => getComputedStyle(e).visibility + ' ' + getComputedStyle(e).opacity + ' ' + JSON.stringify(e.getBoundingClientRect())));
  await rooms[7].tap(); await p.waitForTimeout(600);
  out(await p.evaluate(() => document.querySelector('#bath-rooms .br__prev').classList.contains('has-plan')), 'bathrooms: tap a room without a photo shows its plan');
  await rooms[1].tap(); await p.waitForTimeout(600);
  out(await p.evaluate(() => document.querySelector('#bath-rooms .br__prev').classList.contains('has-img')), 'bathrooms: tap a room with a photo shows it');
  out(p.errs.length === 0, 'bathrooms: no page errors', p.errs.join(' | '));
  await p.context().close();

  /* ---------- Renovation ---------- */
  p = await open(b, 'renovation.html');
  await center(p, '#reno-permits .rp__c[data-c="pb"]'); await p.tap('#reno-permits .rp__c[data-c="pb"]'); await p.waitForTimeout(600);
  out(/Wind-Borne/.test(await txt(p, '#reno-permits .rp__rule')), 'renovation: tap Palm Beach stamps its rule');
  out(p.errs.length === 0, 'renovation: no page errors', p.errs.join(' | '));
  await p.context().close();

  /* ---------- Contact ---------- */
  p = await open(b, 'contact.html');
  await center(p, '#contact-faq .fq__btn'); const q = await p.$('#contact-faq .fq__btn, #contact-faq button[aria-expanded]'); await q.tap(); await p.waitForTimeout(600);
  out(await p.evaluate(() => !!document.querySelector('#contact-faq [aria-expanded="true"]')), 'contact: tap a question opens its answer');
  await center(p, '#contact-form form [type="submit"], #contact-form form button.btn');
  await p.evaluate(() => { window.__mailed = 0; EZ.consultMail = function () { window.__mailed++; }; });
  const s2 = await p.$('#contact-form form [type="submit"], #contact-form form button.btn'); await s2.tap(); await p.waitForTimeout(600);
  const e2 = await p.evaluate(() => [...document.querySelectorAll('#contact-form .c-err, #contact-form [aria-invalid="true"]')].filter(e => !e.hidden).length);
  out(e2 > 0 && (await p.evaluate(() => window.__mailed)) === 0, 'contact: empty send shows errors, sends nothing', e2);
  out(p.errs.length === 0, 'contact: no page errors', p.errs.join(' | '));
  await p.context().close();

  await b.close();
  console.log('\nchecks failed: ' + fails);
})();
