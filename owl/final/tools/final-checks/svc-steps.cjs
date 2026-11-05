module.exports = { hash: '#/services', sharpAt: [0],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(700);
    const a = await p.evaluate(s => ({ tabs: document.querySelectorAll(s + ' .tab').length, h3: document.querySelector(s + ' .card h3').textContent }), S);
    rec('seven steps, the first is the Wise Check', a.tabs === 7 && a.h3 === 'Wise Check', JSON.stringify(a));
    await p.hover(S + ' .nx'); await p.click(S + ' .nx'); await p.click(S + ' .nx'); await p.waitForTimeout(300);
    const b = await p.evaluate(s => ({ h3: document.querySelector(s + ' .card h3').textContent, done: document.querySelectorAll(s + ' .tab.done').length, n: document.querySelector(s + ' .card .n').textContent }), S);
    rec('Next lifts the third step ("The wrap") and marks two done', b.h3 === 'The wrap' && b.done === 2 && /STEP 03 OF 07/.test(b.n), JSON.stringify(b));
    await p.click(S + ' .tab >> nth=6'); await p.waitForTimeout(300);
    rec('the last step is aftercare and the 10-year workmanship warranty', await p.evaluate(s => /10-year workmanship warranty/.test(document.querySelector(s + ' .card p').textContent), S));
    await p.screenshot({ path: c.OUT + '/svc-steps.png' }); } };
