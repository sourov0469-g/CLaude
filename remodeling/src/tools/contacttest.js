// Contact page mechanisms, both motion settings. The mailto hand-off is intercepted (EZ.consultMail), nothing is sent.
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/contact.html';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
    const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const go = async (sec, v) => { await p.goto(FILE + '?' + sec + '=' + v); await p.waitForTimeout(1100); await p.evaluate(() => { window.__mail = []; EZ.consultMail = u => window.__mail.push(u); }); await p.evaluate(s => document.getElementById(s).scrollIntoView(), sec); await p.waitForTimeout(500); };
    const cl = async sel => { const l = p.locator(sel).first(); await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(300); await l.click(); };
    const fill = async (sel, v) => { await p.locator(sel).first().fill(v); };
    const mail = () => p.evaluate(() => window.__mail.map(decodeURIComponent));
    const errsShown = v => p.evaluate(v => [...document.querySelectorAll('#contact-form .ver[data-v="' + v + '"] .c-err')].filter(e => !e.hidden).length, v);
    const R = {};
    const who = { name: 'Test Person', phone: '(305) 555-0100', email: 'test@example.com', address: '1 Test St, Miami', project: 'Kitchen layout change' };

    await go('contact-form', 1); await cl('.fm1__go'); R.f1empty = await errsShown(1);
    for (const k of ['name', 'phone', 'email', 'address']) await fill('#fm1-' + k, who[k]);
    await fill('#fm1-project', who.project); await cl('label[data-rx="~check/frame/tick/l"]'); await cl('.fm1__go');
    R.f1 = [(await mail()).length, /Sales@elbazconstruction\.com/.test((await mail())[0] || ''), await p.evaluate(() => !document.querySelector('.fm1 .c-done').hidden)];

    await go('contact-form', 2); await cl('.fm2__next'); R.f2block = await errsShown(2);
    await fill('#fm2-project', who.project); await cl('.fm2__next'); await fill('#fm2-address', who.address); await cl('.fm2__next');
    await fill('#fm2-name', who.name); await cl('.fm2__next'); await fill('#fm2-phone', who.phone); await fill('#fm2-email', who.email); await cl('.fm2__next');
    R.f2step = await p.evaluate(() => document.querySelector('.fm2__count .nums').textContent);
    await cl('.fm2__step[data-step="5"] .c-consent'); await cl('.fm2__go'); R.f2 = (await mail()).length;

    await go('contact-form', 3); await cl('.fm3__go'); R.f3empty = await errsShown(3);
    for (const k of ['name', 'project', 'address', 'phone', 'email']) await fill('#fm3-' + k, who[k]);
    await p.selectOption('#fm3-contact', 'email'); await cl('.fm3 .c-consent'); await cl('.fm3__go'); R.f3 = /Preferred contact: email/.test((await mail())[0] || '');

    await go('contact-form', 4); await cl('.fm4__go'); R.f4nowork = await p.evaluate(() => !document.querySelector('.fm4__chips + .c-err').hidden);
    await cl('.fm4__chip >> nth=0'); await cl('.fm4__chip >> nth=7');
    for (const k of ['name', 'phone', 'email', 'address']) await fill('#fm4-' + k, who[k]);
    await cl('.fm4 .c-consent'); await cl('.fm4__go'); R.f4 = /Work: Kitchen Remodeling, Roofing/.test((await mail())[0] || '');

    await go('contact-form', 5); R.f5open = await p.evaluate(() => document.querySelector('.fm5__st').textContent);
    for (const k of ['name', 'phone', 'project']) await fill('#fm5-' + k, who[k]);
    await cl('.fm5 .c-consent'); await cl('.fm5__go'); R.f5 = (await mail()).length;

    await go('contact-visit', 1); await cl('.vs1__turn'); await p.waitForTimeout(800);
    R.card = await p.evaluate(() => [document.querySelector('.vs1__turn').getAttribute('aria-pressed'), document.querySelector('.vs1__front').inert, document.querySelector('.vs1__back').inert]);
    await go('contact-visit', 2); R.week = await p.evaluate(() => [document.querySelectorAll('.vs2__row').length, document.querySelectorAll('.vs2__row.is-today').length, document.querySelector('.vs2__now').textContent]);
    await go('contact-visit', 3); await cl('.vs3__cp'); await p.waitForTimeout(300); R.copy = await p.evaluate(() => document.querySelector('.vs3__st').textContent);
    await go('contact-visit', 5); R.clock = await p.evaluate(() => !!document.querySelector('.vs5__hh').getAttribute('transform'));

    await go('contact-area', 1); await fill('#sa1-town', 'coral gables'); await cl('.sa1__go'); R.town = await p.evaluate(() => document.querySelector('.sa1__out').textContent.trim());
    await fill('#sa1-town', 'Orlando'); await cl('.sa1__go'); R.notTown = await p.evaluate(() => document.querySelector('.sa1__out').textContent.trim().slice(0, 40));
    await go('contact-area', 2); R.cols = await p.evaluate(() => document.querySelectorAll('.sa2__ul li').length);
    await go('contact-area', 3); await cl('.sa3__b[data-c="Broward"]'); R.map = await p.evaluate(() => [document.querySelector('.sa3__n').textContent, document.querySelectorAll('.sa3__g.is-off').length]);
    await go('contact-area', 4); await cl('.sa4__p[data-c="Broward"]'); R.bar = await p.evaluate(() => document.querySelectorAll('.sa4__tags li').length);
    await p.keyboard.press('ArrowRight'); R.barKey = await p.evaluate(() => document.activeElement.dataset.c);
    await go('contact-area', 5); R.rows = await p.evaluate(() => [document.querySelector('.sa5__stop').hidden, document.querySelectorAll('.sa5__set').length]);
    if (rm === 'no-preference') { await cl('.sa5__stop'); R.stop = await p.evaluate(() => document.querySelector('.sa5__stop').getAttribute('aria-pressed')); }
    console.log(rm, JSON.stringify(R), 'ERRORS', errs.length, errs.slice(0, 3));
    await ctx.close();
  }
  await b.close();
})();
