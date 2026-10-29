// usage: node rxtest.js <width 1440|375> [sections] [versions]  (OUT=file.json for the full table)
// Per element: hover draws its reaction (rx-on + a visible drawing), leaving clears it, click/tap fires the beat,
// and the control does its job (non-link: DOM changes outside the reaction drawing; link: its target exists).
// Native reactions (the section's own centrepiece response) must change the DOM on hover/focus or tap.
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const ALL = 'hero,proof,services,ba,process,financing,work,reviews,towns,consult'.split(',');
(async () => {
  const w = +(process.argv[2] || 1440), mob = w < 600;
  const SECS = (process.argv[3] || ALL.join(',')).split(',');
  const VERS = (process.argv[4] || '1,2,3').split(',').map(Number);
  const b = await chromium.launch();
  const rows = [], errs = [];
  const runScope = async (v, chrome) => {
    const ctx = await b.newContext({ viewport: { width: w, height: mob ? 812 : 900 }, hasTouch: mob, isMobile: mob });
    const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(`v${v} pageerror ${e.message}`));
    p.on('console', m => { if (m.type() === 'error') errs.push(`v${v} console ${m.text()}`); });
    // keep the test on the page: links are checked by target, not followed
    await ctx.addInitScript(() => {
      document.addEventListener('click', e => { const a = e.target.closest('a[href]'); if (a && !a.getAttribute('href').startsWith('#')) { e.preventDefault(); window.__followed = a.href; } }, true);
      window.open = () => null;
    });
    await p.goto(FILE + '?' + ALL.map(s => s + '=' + v).join('&'));
    // jumps go straight there (a smooth-scroll in flight would otherwise carry the page away from the next element)
    const jump = y => p.evaluate(y => { if (window.EZ && EZ.lenis) EZ.lenis.scrollTo(Math.max(0, y), { immediate: true, force: true }); window.scrollTo(0, Math.max(0, y)); }, y);
    await p.waitForTimeout(1300);
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 800) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(90); }
    await p.waitForTimeout(500);
    const ids = await p.evaluate(([SECS, chrome]) => {
      const out = [];
      let n = 0;
      document.querySelectorAll('[data-rx]').forEach(el => {
        const ver = el.closest('.ver');
        if (chrome ? (ver || el.closest('.vswitch') && false) : (!ver || ver.hidden || !SECS.includes(ver.closest('section').id))) return;
        el.dataset.t = 't' + (n++);
        out.push(el.dataset.t);
      });
      return out;
    }, [SECS, chrome]);
    for (const id of ids) {
      const sel = `[data-t="${id}"]`;
      const info = await p.evaluate(sel => {
        const el = document.querySelector(sel);
        const ver = el.closest('.ver');
        const where = ver ? ver.closest('section').id + ver.dataset.v : (el.closest('.vswitch') ? el.closest('section').id + ':switch' : 'chrome');
        const r = el.getBoundingClientRect(); const top = r.top + scrollY;
        const fixed = !!el.closest('.nav, .mbar, .settings, .sheet');
        return { where, name: (el.getAttribute('aria-label') || el.textContent || el.querySelector('input')?.name || '').trim().replace(/\s+/g, ' ').slice(0, 28), rx: el.dataset.rx, top, fixed, href: el.getAttribute('href') };
      }, sel);
      const row = { ...info, w, hover: null, clear: null, click: null, job: null, note: '' };
      try {
        await p.waitForTimeout(300);
        await jump(info.fixed ? 0 : info.top - (mob ? 406 : 450));
        await p.waitForTimeout(650);
        const measure = () => p.$eval(sel, e => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, vis: getComputedStyle(e).visibility !== 'hidden' && r.width > 0 }; });
        let bx = await measure();
        if (!bx.vis) {
          // state-held controls: open what holds them (menu sheet, settings, second form step, finance sheet, all projects)
          const opened = await p.evaluate(sel => {
            const e = document.querySelector(sel), click = q => { const b = document.querySelector(q); if (b && b.offsetParent !== null) { b.click(); return true; } return false; };
            if (e.closest('.sheet')) return click('.nav__menu');
            if (e.closest('#settings-panel')) return document.getElementById('settings-panel').hidden ? click('.settings__btn') : true;
            if (e.closest('.consult2__p2')) { const r = document.querySelector('.consult2__room'); if (r && r.getAttribute('aria-pressed') !== 'true') r.click(); return click('.consult2__next'); }
            if (e.closest('.financing3')) return click('.financing3__orb');
            if (e.closest('.work1__it')) { const m = document.querySelector('.work1__more'); if (m && m.getAttribute('aria-expanded') !== 'true') m.click(); const f = document.querySelector('.work1__f[data-f="all"]'); if (f && f.getAttribute('aria-pressed') !== 'true') f.click(); return true; }
            if (e.closest('.work1__more')) { const f = document.querySelector('.work1__f[data-f="all"]'); if (f) f.click(); return true; }
            return false;
          }, sel);
          if (opened) { await p.waitForTimeout(900); if (!info.fixed) { const t = await p.$eval(sel, e => e.getBoundingClientRect().top + scrollY); await jump(t - (mob ? 406 : 450)); await p.waitForTimeout(500); } bx = await measure(); }
        }
        if (!bx.vis) {
          const why = await p.$eval(sel, e => { for (let n = e; n; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display === 'none') return 'not shown at this width'; if (n.hidden) return 'held closed'; } return 'hidden'; });
          row.note = 'n/a: ' + why; rows.push(row); continue;
        }
        if (bx.y < 0 || bx.y > (mob ? 812 : 900)) { row.note = 'not on screen ' + JSON.stringify(bx); rows.push(row); continue; }
        const cx = bx.x + Math.min(bx.w / 2, 40), cy = bx.y + bx.h / 2;
        const native = info.rx.startsWith('native:');
        // DOM watcher outside reaction drawings
        await p.evaluate(sel => {
          window.__mut = 0;
          window.__mo && window.__mo.disconnect();
          window.__mo = new MutationObserver(l => { l.forEach(m => { if (!(m.target.closest && m.target.closest('.rx')) && !(m.target.parentElement && m.target.parentElement.closest('.rx')) && !(m.target.classList && m.target.classList.contains('bdy'))) window.__mut++; }); });
          window.__mo.observe(document.body, { subtree: true, attributes: true, childList: true, characterData: true });
        }, sel);
        if (!mob) {
          await p.mouse.move(cx, cy, { steps: 3 });
          await p.waitForTimeout(380);
          row.hover = native ? await p.evaluate(() => window.__mut > 0)
            : await p.$eval(sel, e => e.classList.contains('rx-on') && !!e.querySelector(':scope > .rx') && [...e.querySelectorAll(':scope > .rx *')].some(n => +getComputedStyle(n).opacity > .5 && n.getBBox && n.getBBox().width > 0));
          await p.mouse.move(2, mob ? 400 : 450, { steps: 2 });
          await p.waitForTimeout(700);
          row.clear = native ? true : await p.$eval(sel, e => !e.classList.contains('rx-on'));
          await jump(info.fixed ? 0 : info.top - 450);
          await p.waitForTimeout(450);
          bx = await p.$eval(sel, e => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
          await p.mouse.move(bx.x + Math.min(bx.w / 2, 40), bx.y + bx.h / 2, { steps: 2 });
          await p.waitForTimeout(200);
          await p.evaluate(() => { window.__mut = 0; window.__followed = null; });
          await p.mouse.down(); await p.mouse.up();
          await p.waitForTimeout(25);
          row.click = native ? true : await p.$eval(sel, e => e.classList.contains('rx-on'));
        } else {
          await p.evaluate(() => { window.__mut = 0; window.__followed = null; });
          await p.touchscreen.tap(cx, cy);
          await p.waitForTimeout(120);
          row.hover = native ? await p.evaluate(() => window.__mut > 0) : await p.$eval(sel, e => e.classList.contains('rx-on'));
          row.click = row.hover;
          await p.waitForTimeout(1900);
          row.clear = native ? true : await p.$eval(sel, e => !e.classList.contains('rx-on') || e.matches(':focus-within'));
        }
        await p.waitForTimeout(350);
        row.job = await p.evaluate(([sel, href]) => {
          if (href) {
            if (href.startsWith('#')) return !!document.getElementById(href.slice(1)) || href === '#top' || href === '#main';
            return !!window.__followed || /^(https?:|tel:|mailto:|sms:)/.test(href);
          }
          return window.__mut > 0;
        }, [sel, info.href]);
        // put things back: escape closes sheets/dialogs, return to the top of the scope
        await p.keyboard.press('Escape');
      } catch (e) { row.note = 'ERR ' + e.message.split('\n')[0].slice(0, 90); }
      rows.push(row);
    }
    await ctx.close();
  };
  for (const v of VERS) await runScope(v, false);
  if (!process.argv[3]) await runScope(1, true);
  await b.close();
  const fail = rows.filter(r => !r.note && !(r.hover && r.clear && r.click && r.job));
  const skipped = rows.filter(r => r.note && !r.note.startsWith('n/a'));
  const na = rows.filter(r => r.note.startsWith('n/a'));
  console.log(`width ${w}: tested ${rows.length - skipped.length - na.length}, failed ${fail.length}, n/a at this width ${na.length}, not on screen/err ${skipped.length}, page errors ${errs.length}`);
  na.forEach(r => console.log('NA', r.where, r.name, r.note));
  fail.forEach(r => console.log('FAIL', r.where, r.name, r.rx, 'hover', r.hover, 'clear', r.clear, 'click', r.click, 'job', r.job));
  skipped.forEach(r => console.log('SKIP', r.where, r.name, r.rx, r.note));
  errs.slice(0, 10).forEach(e => console.log('ERR', e));
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify({ rows, errs }, null, 1));
})();
