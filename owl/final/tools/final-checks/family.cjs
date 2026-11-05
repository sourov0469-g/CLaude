module.exports = { sharpAt: [0, .5, 1],
  async extra(p, rec, c) {
    const S = c.SELF;
    await p.evaluate(s => document.querySelector(s + ' .stage').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(2600);
    const a = await p.evaluate(s => { const e = document.querySelector(s); return { orbs: [...e.querySelectorAll('.orb')].map(o => ({ t: o.querySelector('span').textContent, scale: getComputedStyle(o).transform, nat: o.querySelector('img').naturalWidth, shown: Math.round(o.getBoundingClientRect().width) })), owl: !!e.querySelector('.owl svg'), who: e.querySelector('.who').textContent.replace(/\s+/g, ' ') }; }, S);
    rec('four images, The Browns, The Berglands, The crew, The community, around the owl in the middle', a.orbs.map(o => o.t).join('|') === 'The Browns|The Berglands|The crew|The community' && a.owl, JSON.stringify(a.orbs.map(o => o.t)));
    rec('the images arrived by themselves when the section came into view', a.orbs.every(o => o.scale !== 'matrix(0, 0, 0, 0, 0, 0)' && o.shown > 100), JSON.stringify(a.orbs.map(o => o.shown)));
    rec('the two founders are named, nobody else', /Tim Brown, co-founder.*Noah Bergland, co-founder/.test(a.who), a.who);
    await p.screenshot({ path: c.OUT + '/orbs.png' });
    await p.evaluate(s => { const x = document.querySelector(s + ' .snd'); if (x.getAttribute('aria-pressed') === 'true') x.click(); }, S);
    await p.click(S + ' .hoot'); await p.waitForTimeout(900);
    const h = await p.evaluate(s => ({ say: document.querySelector(s + ' .say').textContent, snd: document.querySelector(s + ' .snd').getAttribute('aria-pressed'), rings: [...document.querySelectorAll(s + ' .ring')].filter(r => r.classList.contains('go')).length }), S);
    rec('"Give a Hoot" answers "Hoo-hoo. We give a hoot." with rings; sound can be switched off', /Hoo-hoo/.test(h.say) && h.snd === 'false' && h.rings === 3, JSON.stringify(h));
    await p.screenshot({ path: c.OUT + '/hoot.png' });
  },
  async reduced(p, rec, c) { const r = await p.evaluate(s => [...document.querySelectorAll(s + ' .orb')].every(o => o.style.getPropertyValue('--s') === '1'), c.SELF); rec('reduced motion: the four images are simply there', r); } };
