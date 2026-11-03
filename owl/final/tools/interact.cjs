// exercises every round-1 interactive and reports state changes and errors
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1500); return p;}
let p=await page('?all=1');
await p.click('.hero1 .storm'); console.log('storm pressed:', await p.getAttribute('.hero1 .storm','aria-pressed'));
await p.click('.video1 .chips button:nth-child(4)'); await p.waitForTimeout(300);
console.log('chip seek t=', await p.evaluate(()=>document.querySelector('.video1 video').currentTime.toFixed(1)), 'on:', await p.textContent('.video1 .chips .on'));
await p.click('.video1 .play'); console.log('yt iframe:', await p.evaluate(()=>!!document.querySelector('.video1 iframe[src*="youtube-nocookie.com/embed/ehKLv5DF2TQ"]')));
await p.keyboard.press('Tab'); 
await p.close();
p=await page('?all=2');
const card=await p.$('.hero2 .card'); const bb=await card.boundingBox();
await p.mouse.move(bb.x+bb.width*.8,bb.y+bb.height*.8); await p.mouse.down(); await p.mouse.move(bb.x+bb.width*.2,bb.y+bb.height*.2,{steps:8}); await p.mouse.up(); await p.waitForTimeout(800);
console.log('peel range after drag:', await p.inputValue('.hero2 .range'));
await p.focus('.hero2 .range'); await p.keyboard.press('Home'); await p.waitForTimeout(300); console.log('peel after Home key:', await p.inputValue('.hero2 .range'));
const kn=await p.$('.video2 .knob'); await kn.scrollIntoViewIfNeeded(); const port=await (await p.$('.video2 .port')).boundingBox();
const kb=await kn.boundingBox(); await p.mouse.move(kb.x+22,kb.y+22); await p.mouse.down(); await p.mouse.move(port.x+port.width*.5,port.y+port.height*.95,{steps:10}); await p.mouse.up();
console.log('ring scrub t=', await p.evaluate(()=>document.querySelector('.video2 video').currentTime.toFixed(1)), 'label:', await p.textContent('.video2 .cur'));
await p.click('.video2 .full'); console.log('yt modal:', await p.evaluate(()=>!!document.querySelector('dialog.ytm[open] iframe')));
await p.keyboard.press('Escape'); await p.waitForTimeout(200); console.log('modal closed:', await p.evaluate(()=>!document.querySelector('dialog.ytm')));
await p.close(); p=await page('?review');
console.log('review bar buttons:', await p.evaluate(()=>document.querySelectorAll('.rev button').length));
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();
