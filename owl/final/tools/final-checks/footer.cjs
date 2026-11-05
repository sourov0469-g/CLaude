const frames = p => p.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
module.exports = { sharpAt: [0],
  async beforeAxe(p) { await p.evaluate(() => document.querySelector('footer').scrollIntoView({ block: 'end', behavior: 'instant' })); await p.waitForTimeout(1200); },
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(() => document.querySelector('footer').scrollIntoView({ block: 'end', behavior: 'instant' })); await p.waitForTimeout(1500);
    const a = await p.evaluate(s => { const f = document.querySelector(s + ' footer'); const t = f.textContent.replace(/\s+/g, ' '); return { roofs: f.querySelectorAll('.rf').length, home: f.querySelector('.rf.home') && f.querySelector('.rf.home').getAttribute('aria-label'), nav: [...f.querySelectorAll('nav a')].map(x => x.getAttribute('href')), trust: [...f.querySelectorAll('.ftr-trust span')].map(x => x.textContent), arrived: f.classList.contains('in'), addr: /1000 County Rd E #230/.test(t) && /Shoreview, MN 55126/.test(t), hours: /Mon–Sat 08:00–18:00/.test(t), tel: [...f.querySelectorAll('a[href^="tel:"]')].map(x => x.getAttribute('href')) }; }, S);
    rec('29 roofs, the first is home (Shoreview)', a.roofs === 29 && /Shoreview, our home base/.test(a.home), a.home);
    rec('the links go to this page\'s sections (no Protect Your Nest section is linked)', JSON.stringify(a.nav) === JSON.stringify(['#services', '#wise-check', '#ask-owl', '#family', '#reviews', '#areas', '#book']), a.nav.join(','));
    rec('the proofs and the address, hours and one phone number are exact', JSON.stringify(a.trust) === JSON.stringify(['GAF Systems Plus Certified', 'BBB A−', 'MN licence #BC809662', '10-year workmanship warranty', '5.0 · 90+ reviews']) && a.addr && a.hours && a.tel.every(t => t === 'tel:+16519776027'), JSON.stringify(a.trust));
    rec('the columns and proofs arrive when the footer is reached', a.arrived);
    await p.screenshot({ path: c.OUT + '/footer.png' });
    // hover a roof: the owl hops over and names the town
    const r = await p.evaluate(s => { const b = document.querySelectorAll(s + ' .rf')[9].getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, S);
    await p.mouse.move(r[0] - 5, r[1], { steps: 3 }); await p.mouse.move(r[0], r[1], { steps: 3 }); await p.waitForTimeout(700);
    const h = await p.evaluate(s => ({ on: [...document.querySelectorAll(s + ' .rf')].findIndex(x => x.classList.contains('on')), say: document.querySelector(s + ' .perch').classList.contains('say'), tip: document.querySelector(s + ' .perch .tip').textContent, px: document.querySelector(s + ' .perch').style.getPropertyValue('--px') }), S);
    rec('pointing at a roof lifts it and an owl hops over to name the town and its distance', h.on === 9 && h.say && /about \d+ mi/.test(h.tip) && parseFloat(h.px) > 50, JSON.stringify(h));
    await p.screenshot({ path: c.OUT + '/roof-hover.png' });
    // keyboard
    await p.focus(S + ' .rf >> nth=0'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    const k = await p.evaluate(s => ({ idx: [...document.querySelectorAll(s + ' .rf')].indexOf(document.activeElement), tip: document.querySelector(s + ' .perch .tip').textContent }), S);
    rec('keyboard: arrows move along the roofline (one tab stop)', k.idx === 3 && /mi/.test(k.tip) && (await p.evaluate(s => document.querySelectorAll(s + ' .rf[tabindex="0"]').length, S)) === 1, JSON.stringify(k));
    await p.keyboard.press('End'); await p.waitForTimeout(200);
    rec('End goes to the farthest town', await p.evaluate(s => [...document.querySelectorAll(s + ' .rf')].indexOf(document.activeElement) === 28, S));
    // choosing a roof puts the town in the areas search
    await p.keyboard.press('Home'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('Enter'); await p.waitForTimeout(1600);
    const ch = await p.evaluate(() => ({ v: document.querySelector('#areas input').value, ans: document.querySelector('#areas .ans').textContent }));
    rec('choosing a roof puts that town in the Areas search and answers', ch.v.length > 2 && /^Yes, we come to /.test(ch.ans), JSON.stringify(ch));
    // hours, honestly
    const ctx = p.context(); const url = p.url().split('?')[0].split('#')[0];
    async function at(iso) { const q = await ctx.browser().newPage(); await q.addInitScript(t => { const R = Date; const fixed = new R(t).getTime(); const start = R.now(); class D extends R { constructor(...a) { if (a.length) super(...a); else super(fixed + (R.now() - start)); } static now() { return fixed + (R.now() - start); } } window.Date = D; }, iso);
      await q.goto(url); await q.waitForTimeout(700); const t = await q.evaluate(() => ({ s: document.querySelector('footer .open span').textContent, o: document.querySelector('footer .open').dataset.open })); await q.close(); return t; }
    const wed10 = await at('2026-11-04T16:00:00Z'), wed22 = await at('2026-11-05T04:00:00Z'), sun = await at('2026-11-08T18:00:00Z'), sat19 = await at('2026-11-08T01:00:00Z');
    rec('Wednesday 10 am in Shoreview: "Open now"', wed10.o === 'yes' && /Open now: it is 10:00 am in Shoreview/.test(wed10.s), wed10.s);
    rec('Wednesday 10 pm: closed, says why and when we open', wed22.o === 'no' && /it is 10:00 pm in Shoreview. We open tomorrow at 8 am/.test(wed22.s), wed22.s);
    rec('Sunday: closed, opens Monday at 8 am', sun.o === 'no' && /We open Monday at 8 am/.test(sun.s), sun.s);
    rec('Saturday evening: closed, opens Monday at 8 am', sat19.o === 'no' && /Monday at 8 am/.test(sat19.s), sat19.s);
    // copy
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    await p.evaluate(() => document.querySelector('footer').scrollIntoView({ block: 'end', behavior: 'instant' })); await p.waitForTimeout(500);
    await p.hover(S + ' .cp[data-copy="eml"]'); await p.waitForTimeout(150); await p.click(S + ' .cp[data-copy="eml"]'); await p.waitForTimeout(400);
    const cp = await p.evaluate(s => ({ lab: document.querySelector(s + ' .cp[data-copy="eml"] span').textContent, ok: document.querySelector(s + ' .cp[data-copy="eml"]').dataset.copied }), S);
    rec('the copy button says "Copied" (or honestly "Select it to copy")', cp.lab === 'Copied' || cp.lab === 'Select it to copy', JSON.stringify(cp));
    // back to top
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
    const off = await p.evaluate(s => document.querySelector(s + ' .totop').classList.contains('on'), S);
    await p.evaluate(() => scrollTo(0, 4000)); await p.waitForTimeout(500);
    const atEnd = await (async () => { await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(500); const v = await p.evaluate(s => document.querySelector(s + ' .totop').classList.contains('on'), S); await p.evaluate(() => scrollTo(0, 4000)); await p.waitForTimeout(500); return v; })();
    rec('the floating button steps aside when the footer\'s own Back to top link is on screen', atEnd === false);
    const on = await p.evaluate(s => ({ on: document.querySelector(s + ' .totop').classList.contains('on'), p: parseFloat(document.querySelector(s + ' .totop').style.getPropertyValue('--p')) }), S);
    rec('a Back to top button appears after the first screen, with a ring that shows how far down you are', !off && on.on && on.p > .05 && on.p < 1, JSON.stringify([off, on]));
    await p.screenshot({ path: c.OUT + '/totop.png' });
    await p.hover(S + ' .totop'); await p.waitForTimeout(250); await p.click(S + ' .totop'); await p.waitForTimeout(2200);
    rec('it takes you back to the top', await p.evaluate(() => scrollY < 5), String(await p.evaluate(() => scrollY)));
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(500);
    await p.hover(S + ' .up'); await p.waitForTimeout(250); await p.click(S + ' .up'); await p.waitForTimeout(2200);
    rec('the Back to top link in the footer does too', await p.evaluate(() => scrollY < 5));
  },
  async reduced(p, rec, c) { const r = await p.evaluate(s => getComputedStyle(document.querySelector(s + ' .ar')).opacity, c.SELF); rec('reduced motion: the footer is simply there', r === '1', r); } };
