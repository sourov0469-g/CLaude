// round 4 interactives: reviews dial tabs, clothesline swing, route ribbon, radius rings
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
let p=await page('?all=1');
await p.locator('.rev1 .dial').scrollIntoViewIfNeeded(); await p.waitForTimeout(1600);
console.log('dial count:', await p.textContent('.rev1 .big'));
await p.click('.rev1 .tab[data-i="2"]'); await p.waitForTimeout(700);
console.log('tab Trusted face:', await p.evaluate(()=>document.querySelector('.rev1 .face>div.on').textContent.trim()), '| bezel:', await p.evaluate(()=>document.querySelector('.rev1 .bez').style.transform));
await p.keyboard.press('ArrowLeft'); console.log('arrow -> selected:', await p.evaluate(()=>document.querySelector('.rev1 .tab[aria-selected="true"] b').textContent));
await p.fill('.area1 input','Stillwater'); await p.dispatchEvent('.area1 input','input'); await p.waitForTimeout(1800);
console.log('ribbon:', await p.textContent('.area1 .res'), '| trip drawn:', await p.evaluate(()=>document.querySelector('.area1 .trip').style.strokeDasharray));
await p.fill('.area1 input','Ma'); await p.dispatchEvent('.area1 input','input'); console.log('partial:', await p.textContent('.area1 .res'));
await p.click('.area1 .towns button:first-child'); await p.waitForTimeout(300); console.log('home:', await p.textContent('.area1 .res'));
await p.close(); p=await page('?all=2');
const line=await (await p.$('.rev2 .line')).boundingBox(); await p.mouse.move(line.x+10,line.y+120); await p.mouse.move(line.x+line.width-10,line.y+120,{steps:12}); await p.waitForTimeout(100);
console.log('cards swinging:', await p.evaluate(()=>[...document.querySelectorAll('.rev2 .card')].map(c=>c.style.transform).join(' ')));
await p.fill('.area2 input','Eagan'); await p.dispatchEvent('.area2 input','input'); console.log('rings:', await p.textContent('.area2 .res'), '| band hot:', await p.evaluate(()=>document.querySelector('.area2 .band.hot').dataset.b));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();
