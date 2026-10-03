const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const F='file:///home/user/CLaude/uav-site/dist/UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html';
let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 for(const [w,h,touch] of [[1280,800,false],[390,844,true]]){
 const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:touch,isMobile:touch});const p=await ctx.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto(F+'#/contact/');await p.waitForTimeout(1000);
 await p.evaluate(()=>{window.__mail=[];window.UAV.openMail=h=>window.__mail.push(h)});
 const tag=`[${w}] `;
 const status=()=>p.evaluate(()=>{const s=document.querySelector('.form-status');return {t:s.textContent.trim().slice(0,160),st:s.dataset.state,hidden:s.hidden}});
 const mails=()=>p.evaluate(()=>window.__mail.length);
 const submit=async()=>{if(touch)await p.tap('button[type=submit]');else await p.click('button[type=submit]');await p.waitForTimeout(300)};
 // empty
 await submit();let s=await status();ok(s.st==='error'&&!s.hidden,tag+'empty submit shows error status');ok(await mails()===0,tag+'no mail opened when invalid');
 const errCount=await p.evaluate(()=>document.querySelectorAll('.field-err').length);ok(errCount===2&&await p.evaluate(()=>document.querySelector('#reach-hint').classList.contains('is-err')),tag+'2 field errors + reach hint error -> '+errCount);
 ok(await p.evaluate(()=>document.activeElement.id)==='f-name',tag+'focus moved to first invalid field');
 ok(await p.evaluate(()=>document.querySelector('#f-name').getAttribute('aria-invalid')==='true'&&document.querySelector('#f-name').getAttribute('aria-describedby').includes('f-name-err')),tag+'aria-invalid + describedby set');
 await p.screenshot({path:__dirname+`/t2/form_err_${w}.png`});
 // fix name -> its error clears on input
 await p.fill('#f-name','Test Person');ok(await p.evaluate(()=>!document.querySelector('#f-name-err')),tag+'error clears when typing');
 // message only (no email/phone)
 await p.fill('#f-msg','Roof check please');await submit();
 ok(await p.evaluate(()=>document.querySelector('#reach-hint').classList.contains('is-err')),tag+'email-or-phone required');
 // bad email
 await p.fill('#f-email','nope');await submit();ok(await p.evaluate(()=>/does not look right/.test(document.querySelector('#f-email-err')?.textContent||'')),tag+'invalid email message');
 // bad phone only
 await p.fill('#f-email','');await p.fill('#f-phone','12');await submit();ok(await p.evaluate(()=>/at least 7 digits/.test(document.querySelector('#f-phone-err')?.textContent||'')),tag+'short phone message');
 // phone only valid
 await p.fill('#f-phone','07780 947875');await submit();ok(await mails()===1,tag+'phone-only path opens mail');
 let href=await p.evaluate(()=>window.__mail[0]);const dec=decodeURIComponent(href);
 ok(href.startsWith('mailto:terry.snape@uavaerialsolutions.co.uk?subject='),tag+'mailto target correct');
 ok(dec.includes('Phone: 07780 947875')&&dec.includes('Roof check please')&&dec.includes('Name: Test Person'),tag+'body contains details');
 s=await status();ok(s.st==='ok'&&/Nothing has been sent yet/.test(s.t),tag+'truthful status (no fake success): '+s.t.slice(0,60));
 ok(await p.evaluate(()=>!!document.querySelector('[data-copy]')),tag+'copy fallback button present');
 await p.screenshot({path:__dirname+`/t2/form_ok_${w}.png`});
 // email only + service preselect + long text + HTML chars
 await p.fill('#f-phone','');await p.fill('#f-email','a@b.co.uk');
 await p.fill('#f-msg','<script>alert(1)</script> & "quotes" '+'x'.repeat(3000));
 if(touch)await p.tap('label.chip:nth-child(4)');else await p.click('label.chip:nth-child(4)');
 await p.fill('#f-loc','SK11 7AA');await new Promise(r=>setTimeout(r,2600));await submit();
 ok(await mails()===2,tag+'email-only path opens mail');
 href=await p.evaluate(()=>window.__mail[1]);ok(decodeURIComponent(href).includes('Service: Aerial monitoring')&&decodeURIComponent(href).includes('Site location: SK11 7AA'),tag+'service + location included');
 ok(!/<script>/.test(await p.evaluate(()=>document.querySelector('.form-status').innerHTML)),tag+'status HTML does not echo user input');
 // honeypot
 await p.evaluate(()=>{document.querySelector('[name=company_website]').value='spam'});await new Promise(r=>setTimeout(r,2600));await submit();ok(await mails()===2,tag+'honeypot blocks send');
 // input attributes
 const attrs=await p.evaluate(()=>({e:document.querySelector('#f-email').type+'|'+document.querySelector('#f-email').inputMode,ph:document.querySelector('#f-phone').type+'|'+document.querySelector('#f-phone').inputMode,fs:getComputedStyle(document.querySelector('#f-name')).fontSize}));
 ok(attrs.e==='email|email'&&attrs.ph==='tel|tel',tag+'mobile keyboards '+JSON.stringify(attrs));ok(parseFloat(attrs.fs)>=16,tag+'inputs >=16px (no iOS zoom)');
 ok(errs.length===0,tag+'no console errors '+JSON.stringify(errs));
 await ctx.close();}
 console.log(fails?fails+' FAILED':'ALL PASSED');await b.close();
})();
