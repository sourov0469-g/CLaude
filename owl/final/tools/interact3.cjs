// round 3 interactives: storm slider, guarded layers, split-flap board, services index
const {chromium}=require('playwright'); const path=require('path');
const F='file://'+path.resolve(__dirname,'../owl-roofing.html');
(async()=>{const b=await chromium.launch(); const errs=[];
async function page(q){const p=await b.newPage({viewport:{width:1440,height:900}}); p.on('pageerror',e=>errs.push(q+': '+e.message)); await p.route('https://**',r=>r.abort()); await p.goto(F+q); await p.waitForTimeout(1200); return p;}
let p=await page('?all=1');
await p.fill('.wrap1 input[type=range]','92'); await p.dispatchEvent('.wrap1 input[type=range]','input');
console.log('storm label:', await p.textContent('.wrap1 output'), '| shaking:', await p.evaluate(()=>document.querySelector('.wrap1 .pane.u').classList.contains('shake')), '| glow:', await p.evaluate(()=>document.querySelector('.wrap1 .glow').style.opacity));
await p.focus('.wrap1 input[type=range]'); await p.keyboard.press('Home'); console.log('Home key ->', await p.textContent('.wrap1 output'));
await p.locator('.svc1 .rows').scrollIntoViewIfNeeded(); await p.waitForTimeout(3500);
console.log('board row 1 text:', await p.evaluate(()=>[...document.querySelectorAll('.svc1 .row')[0].querySelectorAll('.t')].map(t=>t.textContent||' ').join('').trim()));
await p.click('.svc1 .row:nth-child(3)'); await p.waitForTimeout(2200);
console.log('board pick:', await p.textContent('.svc1 .det h3'), '| row 3 text:', await p.evaluate(()=>[...document.querySelectorAll('.svc1 .row')[2].querySelectorAll('.t')].map(t=>t.textContent||' ').join('').trim()));
await p.close(); p=await page('?all=2');
await p.click('.wrap2 .labels button[data-i="3"]'); console.log('guarded pick:', await p.textContent('.wrap2 .note'), '| air on:', await p.evaluate(()=>document.querySelector('.wrap2 .air').classList.contains('on')));
await p.click('.svc2 li:nth-child(3) .r'); console.log('index open:', await p.evaluate(()=>[...document.querySelectorAll('.svc2 li')].map(l=>l.classList.contains('open')?1:0).join('')), await p.getAttribute('.svc2 li:nth-child(3) .r','aria-expanded'));
await p.hover('.svc2 li:nth-child(4) .r'); await p.mouse.move(700,500); await p.hover('.svc2 li:nth-child(4) .r'); console.log('float preview on:', await p.evaluate(()=>document.querySelector('.svc2 .float').classList.contains('on')));
await p.close();
console.log(errs.length?'ERRORS:\n'+errs.join('\n'):'no page errors'); await b.close();})();
