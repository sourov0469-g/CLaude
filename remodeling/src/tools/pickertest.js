// Phase 4 evidence: the Finish picker, clicked end to end. Each swatch must load its own project's photo into the house
// and print that project's real title; arrow keys move the choice; reduced motion swaps instantly.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const out = [];
  for (const rm of [false, true]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm ? 'reduce' : 'no-preference' });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('file:///home/user/CLaude/remodeling/site/elbaz-homepage.html?hero=1'); await p.waitForTimeout(1200);
    const n = await p.$$eval('#hero .ver[data-v="1"] .hp__s', a => a.length);
    for (let i = 0; i < n; i++) {
      await p.click(`#hero .ver[data-v="1"] .hp__s:nth-child(${i + 1})`); await p.waitForTimeout(rm ? 60 : 520);
      const r = await p.evaluate(i => {
        const v = document.querySelector('#hero .ver[data-v="1"]'), img = v.querySelector('.hp__win img'), sw = v.querySelectorAll('.hp__s')[i];
        const P = window.__DATA.projects, keyOf = Object.keys(EZ._imgKeys || {});
        return { label: sw.getAttribute('aria-label'), checked: sw.getAttribute('aria-checked'), name: v.querySelector('.hp__name').textContent, src: img.src.slice(0, 30), opacity: getComputedStyle(img).opacity, titles: P.map(x => x.t).includes(v.querySelector('.hp__name').textContent) };
      }, i);
      out.push(`${rm ? 'RM ' : ''}swatch ${i + 1} ${r.label}: checked=${r.checked} name="${r.name}" isRealProjectTitle=${r.titles} opacity=${r.opacity}`);
    }
    await p.focus('#hero .ver[data-v="1"] .hp__s[aria-checked="true"]'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(rm ? 60 : 520);
    out.push((rm ? 'RM ' : '') + 'ArrowRight from last -> ' + await p.$eval('#hero .ver[data-v="1"] .hp__s[aria-checked="true"]', e => e.getAttribute('aria-label')) + '; focus on ' + await p.evaluate(() => document.activeElement.getAttribute('aria-label')));
    out.push((rm ? 'RM ' : '') + 'page errors: ' + errs.length);
    await p.close();
  }
  await b.close(); console.log(out.join('\n'));
})();
