// R5 switcher click-through: for every section of every page, the number keys switch the section in view (1-8 home,
// 1-5 pages; a key past the last version changes nothing), a click on a picker label switches too, and the B key
// shows the backup buttons. Errors 0.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const PAGES = [['rembrandt-homepage.html', ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call'], 8], ['services.html', ['sphero', 'svcp', 'spclose'], 5], ['about.html', ['abhero', 'about', 'abclose'], 5], ['contact.html', ['cthero', 'contact'], 5]];
const b = await chromium.launch(); let bad = 0, n = 0;
for (const [file, ids, max] of PAGES) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}`); await p.waitForTimeout(1200);
  const rows = [];
  for (const id of ids) {
    await p.evaluate(id => { const s = document.getElementById(id); scrollTo(0, s.getBoundingClientRect().top + scrollY + 40); }, id); await p.waitForTimeout(700);
    const got = [];
    for (let k = 1; k <= max; k++) { await p.keyboard.press(String(k)); await p.waitForTimeout(250); got.push(await p.evaluate(id => document.getElementById(id).dataset.v, id)); }
    let past = 'n/a'; if (max < 8) { await p.keyboard.press(String(max + 2)); await p.waitForTimeout(200); past = await p.evaluate(id => document.getElementById(id).dataset.v, id); }
    await p.click(`label[for="v-${id}-2"]`); await p.waitForTimeout(300); const click = await p.evaluate(id => document.getElementById(id).dataset.v, id);
    const keysOk = got.every((v, i) => v === String(i + 1)), pastOk = past === 'n/a' || past === String(max), ok = keysOk && pastOk && click === '2';
    n++; if (!ok) bad++; rows.push(`${id}:${ok ? 'ok' : 'BAD keys ' + got.join('') + ' past ' + past + ' click ' + click}`);
  }
  await p.keyboard.press('b'); await p.waitForTimeout(300);
  const bk = await p.evaluate(() => [...document.querySelectorAll('.pick-bk')].filter(x => x.getBoundingClientRect().width > 0).length + '/' + document.querySelectorAll('.pick-bk').length);
  console.log(file, rows.join(' '), '| B key shows backup buttons:', bk, '| errors', errs.length ? errs.join(' | ').slice(0, 200) : 0); if (errs.length) bad++;
  await p.close();
}
console.log(`sections switched by key and click: ${n - bad} of ${n}; bad ${bad}`); await b.close();
