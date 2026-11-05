// Finder V3 · Two questions: one at a time, then an answer card with what Owl does first
module.exports = {
  noMedia: true,
  async beforeAxe(p) { },
  async extra(p, rec) {
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(300);
    rec('question 1 of 2: six answers in plain words', await p.evaluate(() => document.querySelectorAll('#finder .o1 button').length === 6 && !document.querySelector('#finder .p1').hidden && document.querySelector('#finder .p2').hidden));
    await p.click('#finder .o1 button >> nth=1'); await p.waitForTimeout(500);
    rec('answering moves to question 2 (“How long…?”) and the bar fills half way', await p.evaluate(() => !document.querySelector('#finder .p2').hidden && document.getElementById('finder').dataset.step === '2'));
    await p.click('#finder .o2 button >> nth=0'); await p.waitForTimeout(500);
    const a = await p.evaluate(() => ({ cas: document.getElementById('finder').dataset.case, t: document.querySelector('#finder .ans').textContent, call: !!document.querySelector('#finder .ans a.btn-call[href="tel:+16519776027"]') }));
    rec('the answer card: the stain case, “What we do first: go up into the attic above the stain”, “call today” with the hours, the copper call', a.cas === 'stain' && /attic above the stain/.test(a.t) && /call today: \(651\) 977-6027, Mon–Sat 08:00–18:00/.test(a.t) && a.call, a.t.slice(0, 100));
    await p.click('#finder .b3'); await p.waitForTimeout(400);
    rec('“Start again” returns to question 1', await p.evaluate(() => !document.querySelector('#finder .p1').hidden));
    await p.evaluate(() => window.RESET.openCase('storm')); await p.waitForTimeout(600);
    rec('the hero can open a case here: it goes straight to question 2 for “After a storm”', await p.evaluate(() => !document.querySelector('#finder .p2').hidden && document.getElementById('finder').dataset.case === 'storm'));
  },
  async reduced(p, rec) { await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.click('#finder .o1 button >> nth=0'); await p.click('#finder .o2 button >> nth=1'); await p.waitForTimeout(100);
    rec('reduced motion: the steps change at once and the answer is ready', await p.evaluate(() => !document.querySelector('#finder .p3').hidden && document.getElementById('finder').dataset.case === 'leak')); }
};
