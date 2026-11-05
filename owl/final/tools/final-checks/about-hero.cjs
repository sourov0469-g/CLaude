module.exports = { hash: '#/about', sharpAt: [0],
  async extra(p, rec, c) { const S = c.SELF;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(700);
    const a = await p.evaluate(s => { const e = document.querySelector(s); return { h1: e.querySelector('h1').textContent, facts: [...e.querySelectorAll('.facts li')].map(l => l.textContent), page: document.querySelector('.page[data-page="about"]').hidden }; }, S);
    rec('About names the founders and carries only the locked facts', !a.page && /Family-Owned/.test(a.h1) && a.facts.join('|') === 'Founded2025, Shoreview, MN|LicenceMN #BC809662|CertifiedGAF Systems Plus|BBBA−|Reviews5.0 · 90+ reviews|Warranty10-year workmanship', a.facts.join('|'));
    await p.hover(S + ' .hoot'); await p.click(S + ' .hoot'); await p.waitForTimeout(500);
    rec('the owl says hello', await p.evaluate(s => document.querySelector(s + ' .bubble').textContent.length > 5, S));
    await p.screenshot({ path: c.OUT + '/about-hero.png' }); } };
