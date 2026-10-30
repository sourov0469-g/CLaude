// Consult honesty, all visible slots: an empty send opens nothing and shows errors; a valid send composes exactly one
// mailto to Sales@elbazconstruction.com and shows the "your email app should now be open" note (never "sent").
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const VAL = { name: 'Ana Test', phone: '305 555 0100', email: 'ana@example.com', address: '1 Test St, Miami', project: 'Kitchen remodel', notes: 'none' };
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const rows = [];
  for (const v of [1, 2, 3, 4, 5, 6, 7, 8]) {
    await p.goto(FILE + '?consult=' + v); await p.waitForTimeout(1200);
    await p.evaluate(() => { window.__mails = []; EZ.consultMail = u => window.__mails.push(u); document.getElementById('consult').scrollIntoView(); });
    await p.waitForTimeout(500);
    const ver = '#consult .ver[data-v="' + v + '"]';
    // slot 1: pick a room and go to step 2; slot 4: walk the questions
    if (v === 1) { await p.click(ver + ' .cpx__room >> nth=0'); await p.click(ver + ' .cpx__next'); await p.waitForTimeout(700); }
    const submit = async () => p.evaluate(s => { const f = document.querySelector(s + ' form'); f.requestSubmit ? f.requestSubmit() : f.dispatchEvent(new Event('submit', { cancelable: true })); }, ver);
    if (v !== 4) { await submit(); await p.waitForTimeout(300); }
    const empty = await p.evaluate(s => [window.__mails.length, [...document.querySelectorAll(s + ' .c-err')].filter(e => !e.hidden && e.textContent).length], ver);
    if (v === 4) {
      for (const k of ['project', 'name', 'phone', 'email', 'address']) { await p.fill(ver + ' [name="' + k + '"]', VAL[k]); await p.click(ver + ' .ccv__next'); await p.waitForTimeout(350); }
    } else {
      for (const k of Object.keys(VAL)) { const n = await p.$(ver + ' [name="' + k + '"]'); if (n && await n.isVisible()) await n.fill(VAL[k]); }
    }
    await p.evaluate(s => { const c = document.querySelector(s + ' [name="consent"]'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); }, ver);
    await submit(); await p.waitForTimeout(400);
    const r = await p.evaluate(s => { const d = document.querySelector(s + ' .c-done'); return [window.__mails.length, (window.__mails[0] || '').slice(0, 42), decodeURIComponent((window.__mails[0] || '').split('body=')[1] || ''), d && !d.hidden ? d.textContent : '']; }, ver);
    const extra = v === 7 ? await p.evaluate(s => document.querySelector(s + ' .cbp__count .nums').textContent, ver) : '';
    rows.push({ v, emptyMails: empty[0], emptyErrors: empty[1], mails: r[0], to: r[1], bodyHasAll: ['Ana Test', '305 555 0100', 'ana@example.com', '1 Test St, Miami', 'I agree to be contacted'].every(x => r[2].includes(x)), done: r[3].slice(0, 60), sentClaim: /\bsent\b/i.test(r[3]) && !/Send it from there/.test(r[3]), extra });
  }
  rows.forEach(r => console.log(JSON.stringify(r)));
  console.log('ERRORS', errs.length, errs.slice(0, 3));
  await b.close();
})();
