module.exports = { hash: '#/services', sharpAt: [0],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(700);
    const a = await p.evaluate(s => ({ h1: document.querySelector(s + ' h1').textContent, tabs: [...document.querySelectorAll(s + ' [role="tab"]')].map(t => t.textContent), sel: document.querySelectorAll(s + ' [aria-selected="true"]').length, imgs: document.querySelectorAll(s + ' img').length, page: document.querySelector('.page[data-page="services"]').hidden }), S);
    rec('the Services page shows, with five jobs and nothing else selected but one', !a.page && a.tabs.length === 5 && a.sel === 1 && /Roof Replacement/.test(a.tabs[0]) && a.imgs === 0, JSON.stringify(a));
    await p.hover(S + ' [role="tab"] >> nth=2'); await p.waitForTimeout(200); await p.click(S + ' [role="tab"] >> nth=2'); await p.waitForTimeout(400);
    const b = await p.evaluate(s => ({ h2: document.querySelector(s + ' .card h2').textContent, li: document.querySelectorAll(s + ' .card li').length, sel: [...document.querySelectorAll(s + ' [role="tab"]')].findIndex(t => t.getAttribute('aria-selected') === 'true') }), S);
    rec('choosing Storm Damage Help shows its own details', b.h2 === 'Storm Damage Help' && b.li === 3 && b.sel === 2, JSON.stringify(b));
    await p.focus(S + ' [role="tab"][aria-selected="true"]'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(300);
    rec('arrow keys move between jobs', await p.evaluate(s => document.querySelector(s + ' .card h2').textContent === 'Wise Check Inspections', S));
    rec('Book a Wise Check is there, and the crumb goes home', await p.evaluate(s => !!document.querySelector(s + ' a[href="#book"]') && !!document.querySelector(s + ' .crumb a[href="#/"]'), S));
    await p.screenshot({ path: c.OUT + '/svc-hero.png' }); } };
