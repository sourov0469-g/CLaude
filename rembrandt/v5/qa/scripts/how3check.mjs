import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const out=[];
for (const [w,h] of [[1440,900],[375,812]]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, hasTouch:w<500, isMobile:w<500 }); const p = await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'); await p.waitForTimeout(800);
  await p.evaluate(()=>document.getElementById('how').scrollIntoView()); await p.waitForTimeout(300);
  await p.locator('label[for="v-how-3"]').click({force:true}); await p.waitForTimeout(1200);
  // scroll through the section slowly so every scrub completes
  const top = await p.evaluate(()=>document.getElementById('how').getBoundingClientRect().top+scrollY);
  const hh = await p.evaluate(()=>document.getElementById('how').offsetHeight);
  for (let y=top-h; y<=top+hh; y+=120) { await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(60); }
  await p.waitForTimeout(800);
  const drawn = await p.evaluate(()=>[...document.querySelectorAll('.hw3-rl')].map(e=>getComputedStyle(e).strokeDasharray));
  const op = await p.evaluate(()=>[...document.querySelectorAll('.hw3-line')].map(e=>getComputedStyle(e).opacity));
  out.push(`${w}: ridge dasharray ${JSON.stringify(drawn)}; line opacity ${op}`);
  await p.locator('#how').screenshot({path:`shots/how3-full-${w}.jpg`,type:'jpeg',quality:60});
  if (w===1440) {
    const a = p.locator('.hw3-act').nth(1); await a.scrollIntoViewIfNeeded(); await p.waitForTimeout(300); await a.hover(); await p.waitForTimeout(500);
    out.push(`R28/overstroke hover: ro dasharray ${await p.evaluate(()=>getComputedStyle(document.querySelectorAll('.hw3-ro')[1]).strokeDasharray)}; seg2 ${await p.evaluate(()=>getComputedStyle(document.querySelector('.hw3-ico--rule .i-seg2')).transform)}`);
    const r = await a.boundingBox(); const ib = await p.locator('.hw3-ico--rule').boundingBox(); const tb = await p.locator('.hw3-line').nth(1).boundingBox();
    out.push(`icon box x ${Math.round(ib.x)}-${Math.round(ib.x+ib.width)}; text right ${Math.round(tb.x+tb.width)} (no overlap ${ib.x>tb.x+tb.width})`);
    await p.mouse.down(); await p.waitForTimeout(60); out.push(`press: is-press ${await a.evaluate(e=>e.classList.contains('is-press'))}; seg1 anim ${await p.evaluate(()=>getComputedStyle(document.querySelector('.hw3-ico--rule .i-seg1')).animationName)}`); await p.mouse.up();
    const r0 = await p.evaluate(()=>getComputedStyle(document.querySelector('.hw3-raft')).transform); await p.mouse.move(80,120,{steps:6}); await p.waitForTimeout(900);
    out.push(`bg rafters on pointer depth: ${r0} -> ${await p.evaluate(()=>getComputedStyle(document.querySelector('.hw3-raft')).transform)}`);
  }
  out.push(`errors ${errs.length?errs.join('|'):0}`); await ctx.close();
}
console.log(out.join('\n')); await b.close();
