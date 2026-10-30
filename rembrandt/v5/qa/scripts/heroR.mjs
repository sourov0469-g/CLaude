import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'; const b = await chromium.launch(); const out = [];
// V3: every town in the slot at 320/375/1024/1440 must fit the line (slot right edge inside the copy box)
for (const w of [320, 375, 1024, 1440]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 812 } })).newPage(); await p.goto(F + '?v=hero3'); await p.waitForTimeout(1200);
  out.push(`V3 fit @${w}: ` + await p.evaluate(async () => {
    const { TOWNS } = { TOWNS: null }; const word = document.querySelector('.hx3-word'), slot = document.querySelector('.hx3-slot'), copy = document.querySelector('.hx3-copy');
    const names = ['Springboro', 'West Carrollton', 'Yellow Springs', 'Huber Heights', 'Beavercreek', 'Harveysburg', 'Germantown', 'Clarksville'];
    const cs = getComputedStyle(copy), right = copy.getBoundingClientRect().right - parseFloat(cs.paddingRight); const bad = [];
    for (const n of names) { word.textContent = n; slot.style.width = ''; const r = slot.getBoundingClientRect(); const dot = document.querySelector('.hx3-dot').getBoundingClientRect(); if (Math.max(r.right, dot.right) > right + 1) bad.push(`${n} +${Math.round(Math.max(r.right, dot.right) - right)}px`); }
    return bad.length ? 'OVER ' + bad.join(', ') : 'all fit';
  }));
}
// re-entry: switch to V2 from V1 via the picker; the lines must be fully visible at once (no choreography)
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); await p.goto(F + '?v=hero1'); await p.waitForTimeout(1500);
  await p.locator('label[for="v-hero-2"]').click(); await p.waitForTimeout(60);
  out.push('re-entry V2 after 60ms: ' + await p.evaluate(() => [...document.querySelectorAll('.hx2-l')].map(l => getComputedStyle(l).opacity).join(',') + ' pre ' + document.querySelector('.hx2').classList.contains('is-pre')));
  await p.locator('label[for="v-hero-4"]').click(); await p.waitForTimeout(60);
  out.push('re-entry V4 after 60ms: ' + await p.evaluate(() => [...document.querySelectorAll('.hx4-l')].map(l => getComputedStyle(l).opacity).join(',')));
  await p.locator('label[for="v-hero-5"]').click(); await p.waitForTimeout(60);
  out.push('re-entry V5 after 60ms: ' + await p.evaluate(() => [...document.querySelectorAll('.hx5-line')].map(l => getComputedStyle(l).opacity).join(',')));
}
// first load V2: choreography runs (lines start hidden), and is done by 900ms
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); await p.goto(F); 
  await p.waitForFunction(() => document.querySelector('.hx2.is-pre'), null, { timeout: 3000 }).catch(() => {});
  const a = await p.evaluate(() => getComputedStyle(document.querySelectorAll('.hx2-l')[1]).opacity); await p.waitForTimeout(900);
  out.push(`first load V2: line 2 opacity at start ${a}, after 900ms ${await p.evaluate(() => getComputedStyle(document.querySelectorAll('.hx2-l')[1]).opacity + ' pre ' + document.querySelector('.hx2').classList.contains('is-pre') + ' underline ' + getComputedStyle(document.querySelector('.hx2-proof span')).backgroundSize)}`);
}
// reduced motion: V3 static line, pause hidden; V2 no pre; V1 canvas drawn
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage(); await p.goto(F + '?v=hero3'); await p.waitForTimeout(1500);
  out.push('rm V3: ' + await p.evaluate(() => document.querySelector('.hx3-h').textContent.replace(/\s+/g, ' ').trim() + ' | pause hidden ' + document.querySelector('.hx3-pause').hidden));
  await p.screenshot({ path: '../r3/look/hrm3.jpg', type: 'jpeg', quality: 50 });
}
console.log(out.join('\n')); await b.close();
