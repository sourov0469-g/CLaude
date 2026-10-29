// usage: node sect.js <sec> [url]
// For each version 1..3 at 1440 and 375 (and 1440 with reduced motion): switch with the section's own switcher,
// check every OTHER section's stage is byte-identical (the switcher swaps only its section), run the section's
// control checks (ACT[sec][v]: returns a list of failures), record console errors/warnings and horizontal overflow.
const { chromium } = require('playwright');
const [sec, url = 'http://127.0.0.1:8765/index.html'] = process.argv.slice(2);
async function formRun(p, sel) {   // a multi-step booking form: Continue with nothing picked must stop; then fill and send
  const f = [], form = p.locator(sel).first();
  await form.locator('.bk-next').click(); await p.waitForTimeout(200);
  if (!(await form.locator('.bk-err').first().isVisible())) f.push('step 1 let an empty pick through');
  await form.locator('input[name=trade]').first().check(); await form.locator('.bk-next').click(); await p.waitForTimeout(300);
  await form.locator('input[type=radio]').first().check(); await form.locator('.bk-next').click(); await p.waitForTimeout(300);
  await form.locator('input[name=name]').fill('Ana'); await form.locator('input[name=tel]').fill('5125550123'); await form.locator('input[name=zip]').fill('78752');
  await form.locator('.bk-send').click(); await p.waitForTimeout(900);
  if (!(await form.locator('.bk-done').isVisible())) f.push('valid form did not reach done');
  return f;
}
const tel = async (p, sec) => (await p.evaluate(s => !!document.querySelector(`#${s} a[href^="tel:"]`), sec)) ? [] : ['no tel'];
const ACT = {
  services: {
    1: async p => { const f = []; await p.locator('#services .sv1-parts [data-part=windows]').click(); await p.waitForTimeout(400);
      const st = await p.evaluate(() => ({ facts: document.querySelector('#services [data-s1=facts]').textContent, on: [...document.querySelectorAll('#services .sv1-h.on')].length, bk: document.querySelector('#services .sv1-book').dataset.trade, money: /\$\d/.test(document.querySelector('#services .sv1-card').textContent) }));
      if (!/NT Windows 238/.test(st.facts) || st.on !== 1 || st.bk !== 'Windows' || st.money) f.push('pick windows ' + JSON.stringify(st));
      await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
      const k = await p.evaluate(() => document.querySelector('#services [data-s1=label]').textContent); if (k !== 'Roof') f.push('arrow ' + k);
      return f.concat(await tel(p, 'services')); },
    2: async p => { const f = []; const n = await p.evaluate(() => document.querySelectorAll('#services .ix-row').length); if (n !== 11) f.push('rows ' + n); return f; },
    3: async p => { const f = []; const h = p.locator('#services [role=slider]').first(); await h.focus(); const a = await h.getAttribute('aria-valuenow'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200); const b2 = await h.getAttribute('aria-valuenow'); if (a === b2) f.push('tape key ' + a + '=' + b2); return f; }
  },
  work: {
    1: async p => { const f = []; const h = p.locator('#work .cmp-handle'); await h.focus(); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(150); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(1500);
      const v = +(await h.getAttribute('aria-valuenow')); if (v >= 50) f.push('keys during sweep -> ' + v);
      await p.locator('#work .fs').nth(1).click(); await p.waitForTimeout(1600);
      const pr = await p.evaluate(() => document.querySelector('#work .fs[aria-pressed=true]').dataset.i); if (pr !== '1') f.push('pair pick ' + pr); return f; },
    2: async p => { const f = []; await p.locator('#work .bp-step').nth(2).click(); await p.waitForTimeout(400);
      const k = await p.evaluate(() => [...document.querySelectorAll('#work .bp-step')].findIndex(t => t.getAttribute('aria-checked') === 'true')); if (k !== 2) f.push('job pick ' + k); return f; },
    3: async p => { const f = []; const n = await p.evaluate(() => document.querySelectorAll('#work img').length); if (n < 2) f.push('imgs ' + n); return f; }
  },
  built: {
    1: async p => { const f = []; await p.locator('#built [data-explode]').click(); await p.waitForTimeout(900);
      const t = await p.evaluate(() => [...document.querySelectorAll('#built .asm')].filter(g => g.getAttribute('transform')).length); if (!t) f.push('explode moved nothing');
      await p.locator('#built .lg-b').nth(2).click(); await p.waitForTimeout(300);
      const rd = await p.evaluate(() => document.querySelector('#built [data-readout]').textContent); if (!/wrap/i.test(rd)) f.push('readout ' + rd.slice(0, 40)); return f; },
    2: async p => { const f = []; const n = await p.evaluate(() => document.querySelectorAll('#built .ts-card, #built [class*="ts-c"]').length); if (n < 5) f.push('cards ' + n); return f; },
    3: async p => { const f = []; const seg = p.locator('#built .b3x-seg [role=radio]'); const n = await seg.count(); if (n < 2) { f.push('seg ' + n); return f; }
      await seg.nth(1).click(); await p.waitForTimeout(900); const h = await p.evaluate(() => document.querySelector('#built .sh-lap').hasAttribute('hidden')); if (!h) f.push('style switch'); return f; }
  },
  colour: {
    1: async p => { const f = [];
      await p.locator('#colour .c1t-parts [data-part=trim]').click(); await p.locator('#colour .c1t-chips .sw').nth(3).click(); await p.waitForTimeout(500);
      let st = await p.evaluate(() => ({ t: document.querySelector('#colour .zone-trim').classList.contains('is-painted'), now: document.querySelector('#colour [data-c1=code]').textContent }));
      if (!st.t || !/trim/.test(st.now)) f.push('job paint ' + JSON.stringify(st));
      await p.locator('#colour .c1t-src [data-src=mine]').click(); await p.waitForTimeout(200);
      st = await p.evaluate(() => ({ empty: !document.querySelector('#colour .c1t-empty').hidden, frame: document.querySelector('#colour .st-frame').hidden }));
      if (!st.empty || !st.frame) f.push('mine mode ' + JSON.stringify(st));
      await p.locator('#colour .c1t-file').setInputFiles('/home/user/CLaude/siding/site/assets/img/photos/p3-1400.webp'); await p.waitForTimeout(800);
      const px = () => p.evaluate(() => { const c = document.querySelector('#colour .c1t-cv'); const k = document.createElement('canvas'); k.width = c.width || 1; k.height = c.height || 1; const x = k.getContext('2d', { willReadFrequently: true }); x.drawImage(c, 0, 0); const d = x.getImageData(c.width >> 1, c.height >> 1, 1, 1).data; return [c.width, c.hidden, d[0], d[1], d[2]].join(','); });
      const a = await px(); await p.locator('#colour [data-c1=all]').click(); await p.waitForTimeout(300); const b2 = await px();
      if (a.split(',')[0] === '0' || a.split(',')[1] === 'true' || a === b2) f.push('canvas ' + a + ' -> ' + b2);
      await p.locator('#colour [data-c1=clear]').click(); await p.waitForTimeout(200); const c2 = await px(); if (c2 !== a) f.push('clear ' + c2);
      return f.concat(await tel(p, 'colour')); },
    2: async p => { const f = []; const sw = p.locator('#colour .cmp-sw').nth(2); await sw.click(); await p.waitForTimeout(200); if ((await sw.getAttribute('aria-pressed')) !== 'true') f.push('swatch'); return f; },
    3: async p => { const f = []; await p.locator('#colour .cb-t').nth(4).click(); await p.waitForTimeout(800); if (await p.evaluate(() => document.querySelector('#colour .cb-sheet').hidden)) f.push('sheet open');
      await p.keyboard.press('Escape'); await p.waitForTimeout(900); if (!(await p.evaluate(() => document.querySelector('#colour .cb-sheet').hidden))) f.push('esc close'); return f; }
  },
  near: {
    1: async p => { const f = []; const cb = p.locator('#near [role=combobox]').first(); await cb.fill('Round'); await p.waitForTimeout(400);
      const n = await p.locator('#near [role=listbox] [role=option]').count(); if (!n) f.push('no options'); else { await p.keyboard.press('ArrowDown'); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
        const out = await p.evaluate(() => (document.querySelector('#near .fd-out') || {}).textContent || ''); if (!/Round Rock/.test(out)) f.push('finder out ' + out.slice(0, 60)); }
      return f; },
    2: async p => { const f = []; const btn = p.locator('#near .mx-row').nth(1); await btn.click(); await p.waitForTimeout(500); if ((await btn.getAttribute('aria-expanded')) !== 'true') f.push('row open'); return f; },
    3: async p => { const f = []; const before = await p.evaluate(() => document.querySelector('#near .dv-svg').getAttribute('viewBox')); await p.locator('#near .dv-chip').nth(2).click(); await p.waitForTimeout(1500);
      const after = await p.evaluate(() => document.querySelector('#near .dv-svg').getAttribute('viewBox')); if (before === after) f.push('fly-in ' + after); return f; }
  },
  reviews: {
    1: async p => { const f = []; const st = await p.evaluate(() => ({ loop: document.querySelectorAll('#reviews .sk-track.is-loop').length, rm: !document.documentElement.classList.contains('motion'), hidden: [...document.querySelectorAll('#reviews .sk[aria-hidden=true]')].length }));
      if (!st.rm && (st.loop !== 2 || !st.hidden)) f.push('loop ' + JSON.stringify(st));
      if (!st.rm) { await p.locator('#reviews .sk-pause').click(); if (!(await p.evaluate(() => document.querySelector('#reviews .sk-rows').classList.contains('is-held')))) f.push('pause'); }
      return f; },
    2: async p => { const f = []; const q0 = await p.evaluate(() => document.querySelector('#reviews .dh-n').textContent); await p.locator('#reviews .rb[data-dir="1"]').click(); await p.waitForTimeout(600);
      const st = await p.evaluate(() => ({ n: document.querySelector('#reviews .dh-n').textContent, pip: [...document.querySelectorAll('#reviews .pp')].findIndex(x => x.classList.contains('on')) }));
      if (st.n === q0 || st.pip !== 1) f.push('next ' + JSON.stringify(st));
      await p.locator('#reviews .dh').focus(); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(600);
      const k = await p.evaluate(() => [...document.querySelectorAll('#reviews .pp')].findIndex(x => x.classList.contains('on'))); if (k !== 0) f.push('arrow ' + k); return f; },
    3: async p => { const f = []; await p.locator('#reviews .cr-n[data-name=Garrett]').click(); await p.waitForTimeout(500);
      const st = await p.evaluate(() => { const c = [...document.querySelectorAll('#reviews .cr-c')].filter(x => !x.hidden); return { n: c.length, all: c.every(x => /Garret/.test(x.textContent)), more: !document.querySelector('#reviews .cr-more').hidden }; });
      if (!st.n || !st.all) f.push('garrett ' + JSON.stringify(st));
      if (st.more) { await p.locator('#reviews .cr-more').click(); await p.waitForTimeout(300); const m2 = await p.evaluate(() => ({ n: [...document.querySelectorAll('#reviews .cr-c')].filter(x => !x.hidden).length, foc: document.activeElement.classList.contains('cr-c') })); if (m2.n <= st.n || !m2.foc) f.push('more ' + JSON.stringify(m2)); }
      await p.locator('#reviews .cr-n[data-name=Garrett]').focus(); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(400); const nm = await p.evaluate(() => document.querySelector('#reviews .cr-n[aria-checked=true]').dataset.name); if (nm !== 'Tracy') f.push('arrow ' + nm);
      return f; }
  },
  money: {
    1: async p => { const f = []; await p.locator('#money .pay-t[data-n="24"]').click(); await p.waitForTimeout(500);
      const st = await p.evaluate(() => ({ on: [...document.querySelectorAll('#money .pay-panes rect')].filter(x => !x.classList.contains('off')).length, sub: document.querySelector('#money [data-pay=sub]').textContent, big: document.querySelector('#money .pay-big .sr-only, #money .odo .sr-only') && document.querySelector('#money .odo .sr-only').textContent }));
      if (st.on !== 24 || !/24 months at 0%/.test(st.sub) || st.big !== '$625.00') f.push('24mo ' + JSON.stringify(st));
      await p.locator('#money .pay-t[data-n="120"]').click(); await p.waitForTimeout(400);
      const big = await p.evaluate(() => document.querySelector('#money .odo .sr-only').textContent); if (big !== '$181.91') f.push('example ' + big);
      return f; },
    2: async p => { const f = []; const t = p.locator('#money .dt').nth(1); await t.click(); await p.waitForTimeout(400); if ((await t.getAttribute('aria-checked')) !== 'true') f.push('tab'); return f; },
    3: async p => { const f = []; const tot = () => p.evaluate(() => document.querySelector('#money [data-now]').textContent);
      if ((await tot()) !== '$22,500') f.push('start ' + (await tot()));
      await p.locator('#money .rcp-opts input').nth(1).uncheck(); await p.waitForTimeout(500); if ((await tot()) !== '$25,500') f.push('no pay-in-full ' + (await tot()));
      await p.locator('#money .rcp-amt input').fill('10000'); await p.locator('#money .rcp-amt input').blur(); await p.waitForTimeout(500);
      if ((await tot()) !== '$8,500') f.push('10k ' + (await tot()));
      return f.concat(await tel(p, 'money')); }
  },
  book: {
    1: async p => { const f = []; const o = p.locator('#book .b1-open'); await o.click(); await p.waitForTimeout(500); if ((await o.getAttribute('aria-expanded')) !== 'true') f.push('panel');
      f.push(...await formRun(p, '#book .b1-panel form, #book form')); return f.concat(await tel(p, 'book')); },
    2: async p => { const f = []; f.push(...await formRun(p, '#book form')); return f.concat(await tel(p, 'book')); },
    3: async p => { const f = []; await p.locator('#book .snt-send').click(); await p.waitForTimeout(300);
      if (await p.evaluate(() => document.querySelector('#book .snt-err').hidden)) f.push('empty send gave no errors');
      await p.selectOption('#book select[name=trade]', { index: 1 }); await p.selectOption('#book select[name=band]', { index: 1 });
      for (const [n, v] of [['name', 'Ana'], ['tel', '5125550123'], ['zip', '78752']]) { const i = p.locator(`#book .snt-form input[name=${n}]`); if (await i.count()) await i.fill(v); }
      await p.locator('#book .snt-send').click(); await p.waitForTimeout(800);
      if (await p.evaluate(() => document.querySelector('#book .snt-done').hidden)) f.push('valid send not done: ' + (await p.evaluate(() => document.querySelector('#book .snt-err').textContent)));
      return f.concat(await tel(p, 'book')); }
  },
  hero: {
    1: async p => p.evaluate(() => { const f = []; const h = document.querySelector('#hero h1'); if (!h || !/Siding and windows, priced in public/.test(h.textContent)) f.push('h1 text');
      const svg = [...document.querySelectorAll('#hero .h1m-svg')].find(s => s.getBoundingClientRect().width); if (!svg) f.push('no visible svg');
      else { const im = svg.querySelector('.h1m-img'); if (!im.getAttribute('href')) f.push('image href'); if (svg.querySelectorAll('clipPath text').length < 2) f.push('clip text ' + svg.querySelectorAll('clipPath text').length); }
      if (!document.querySelector('#hero a[href^="tel:"]')) f.push('no tel'); return f; }),
    2: async p => { const f = []; const c = p.locator('#hero .h2p').nth(1); await c.click(); await p.waitForTimeout(300);
      const st = await p.evaluate(() => ({ s2: !document.querySelector('#hero .h2-s2').hidden, s1: document.querySelector('#hero .h2-s1').hidden, z: document.querySelector('#hero .h2-loc-l').dataset.zone, name: document.querySelector('#hero [data-f=name]').textContent, bk: document.querySelector('#hero [data-f=book]').dataset.trade, foc: document.activeElement.matches('[data-f=head]') }));
      if (!st.s2 || !st.s1 || st.z !== 'win' || st.name !== 'Windows' || st.bk !== 'Windows' || !st.foc) f.push('step2 ' + JSON.stringify(st));
      await p.locator('#hero [data-f=back]').click(); await p.waitForTimeout(200);
      const back = await p.evaluate(() => !document.querySelector('#hero .h2-s1').hidden && document.querySelector('#hero .h2-s2').hidden); if (!back) f.push('back');
      if (!(await p.evaluate(() => !!document.querySelector('#hero a[href^="tel:"]')))) f.push('no tel'); return f; },
    3: async p => { const f = []; await p.locator('#hero .h3-tab').nth(2).click(); await p.waitForTimeout(400);
      let st = await p.evaluate(() => ({ on: [...document.querySelectorAll('#hero .h3-ph')].findIndex(x => x.classList.contains('on')), sel: document.querySelector('#hero .h3-tab[aria-selected=true]').dataset.k, place: document.querySelector('#hero [data-s=place]').textContent, when: document.querySelector('#hero [data-s=when]').textContent }));
      if (st.on !== 2 || st.sel !== '2' || st.when !== 'Nov 2024') f.push('tab click ' + JSON.stringify(st));
      await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
      st = await p.evaluate(() => ({ on: [...document.querySelectorAll('#hero .h3-ph')].findIndex(x => x.classList.contains('on')), foc: document.activeElement.dataset.k }));
      if (st.on !== 3 || st.foc !== '3') f.push('arrow key ' + JSON.stringify(st));
      if (!(await p.evaluate(() => !!document.querySelector('#hero a[href^="tel:"]')))) f.push('no tel'); return f; }
  }
};
(async () => {
  const b = await chromium.launch();
  const out = [];
  for (const [w, h, tag, rm] of [[1440, 900, 'd', 'no-preference'], [375, 812, 'm', 'no-preference'], [1440, 900, 'd-rm', 'reduce']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: tag === 'm', isMobile: tag === 'm', reducedMotion: rm });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
    await p.goto(url + '?v=1111111111', { waitUntil: 'load' });
    await p.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
    await p.waitForTimeout(500);
    for (const v of [2, 3, 1]) {
      await p.evaluate(s => { window.__mark = [...document.querySelectorAll('.sec')].filter(x => x.id !== s).map(x => [x.querySelector('.stage').firstElementChild, x.dataset.v]); }, sec);
      await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 80); }, sec);
      await p.waitForTimeout(250);
      await p.locator(`#${sec} .vsw-b[data-v="${v}"]`).click();
      await p.waitForTimeout(900);
      const moved = await p.evaluate(s => [...document.querySelectorAll('.sec')].filter(x => x.id !== s).filter((x, i) => x.querySelector('.stage').firstElementChild !== window.__mark[i][0] || x.dataset.v !== window.__mark[i][1]).map(x => x.id), sec);
      const live = await p.evaluate(s => document.getElementById(s).dataset.v, sec);
      const f = [];
      if (live !== String(v)) f.push('switch did not take: ' + live);
      if (moved.length) f.push('other sections remounted: ' + moved.join(','));
      if (ACT[sec] && ACT[sec][v]) f.push(...await ACT[sec][v](p));
      const ox = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      if (ox > 0) f.push('overflow-x ' + ox);
      out.push(`${tag} ${sec}${v}: ${f.length ? 'FAIL ' + f.join('; ') : 'PASS'}`);
    }
    out.push(`${tag} console: ${errs.length ? errs.join(' | ') : '0'}`);
    await ctx.close();
  }
  console.log(out.join('\n'));
  await b.close();
})();
