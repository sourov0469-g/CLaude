// Reset page checks: node reset-test.cjs <sectionId> <outDir>   (sectionId e.g. finder; outDir relative to owl/final)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const AXE = fs.readFileSync('/tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/axe/node_modules/axe-core/axe.min.js', 'utf8');
const F = 'file://' + path.resolve(__dirname, '../owl-reset.html');
const [SEC, OUTD] = process.argv.slice(2); const OUT = path.resolve(__dirname, '..', OUTD || 'gates/reset/tmp'); fs.mkdirSync(OUT, { recursive: true });
const res = []; const rec = (name, ok, info) => { res.push({ name, ok: !!ok, info: info || '' }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + name + (info ? ' | ' + info : '')); };
const EXTRA = {
  call: async (p) => {
    const hrs = async iso => { await p.clock.setFixedTime(new Date(iso)); await p.reload(); await p.waitForTimeout(500); return p.evaluate(() => { const s = document.getElementById('call'); return { now: s.querySelector('.now').textContent, today: [...s.querySelectorAll('.week li')].findIndex(l => l.classList.contains('today')), open: s.dataset.open }; }); };
    const wedOpen = await hrs('2026-11-04T16:20:00Z'), wedEarly = await hrs('2026-11-04T12:00:00Z'), wedLate = await hrs('2026-11-05T01:00:00Z'), satLate = await hrs('2026-11-08T01:00:00Z'), sun = await hrs('2026-11-08T18:00:00Z');
    rec('today’s hours, live in Shoreview time from the stated Mon–Sat 08:00–18:00: open Wed 10:20; opens today at 08:00 (Wed 06:00); tomorrow (Wed 19:00); Monday (Sat 19:00 and Sunday noon)', /Open now/.test(wedOpen.now) && /Until 18:00 today/.test(wedOpen.now) && wedOpen.today === 2 && wedOpen.open === '1' && /open today at 08:00/.test(wedEarly.now) && /open tomorrow at 08:00/.test(wedLate.now) && /open Monday at 08:00/.test(satLate.now) && satLate.today === 5 && /open Monday at 08:00/.test(sun.now) && sun.today === 6 && sun.open === '0', [wedOpen, wedEarly, wedLate, satLate, sun].map(x => x.now.replace(/ · Mon.*/, '')).join(' / '));
    await p.clock.setFixedTime(new Date('2026-11-04T16:20:00Z')); await p.reload(); await p.waitForTimeout(800);
    rec('the week strip: seven days, Mon–Sat 8–6, Sunday closed, today marked with a now line', await p.evaluate(() => { const l = [...document.querySelectorAll('#call .week li')]; return l.length === 7 && l.slice(0, 6).every(x => x.querySelector('.bar') && /8–6/.test(x.textContent)) && !l[6].querySelector('.bar') && /closed/.test(l[6].textContent) && !!l[2].querySelector('.mark'); }));
    rec('not pinned, and the call pill steps aside here (the number is the call)', await p.evaluate(async () => { const s = document.getElementById('call'); s.scrollIntoView({ block: 'start', behavior: 'instant' }); await new Promise(r => setTimeout(r, 900)); return s.hasAttribute('data-nocall') && ![...s.querySelectorAll('*')].some(e => getComputedStyle(e).position === 'sticky') && document.querySelector('.callpill').classList.contains('away'); }));
    rec('the Longbow end card: one number set as type, a real tel link, at least 120 px on desktop', await p.evaluate(() => { const a = document.querySelector('#call a.num'); return a.getAttribute('href') === 'tel:+16519776027' && parseFloat(getComputedStyle(a).fontSize) >= 120 && /\(651\)\s*977-6027/.test(a.textContent) && /\(651\) 977-6027/.test(a.getAttribute('aria-label')); }));
    rec('with nothing chosen: "Tell us what’s going on." and the note says "Not chosen yet" twice', await p.evaluate(() => { const s = document.getElementById('call'); return s.querySelector('h2').textContent === 'Tell us what’s going on.' && s.querySelector('.d-case').textContent === 'Not chosen yet' && s.querySelector('.d-town').textContent === 'Not chosen yet'; }));
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(400); await p.click('#finder .pill >> nth=3'); await p.waitForTimeout(1200);
    await p.evaluate(() => document.querySelector('#towns .ask').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.fill('#tw-in', 'Stillwater'); await p.waitForTimeout(400);
    const w = await p.evaluate(() => { const s = document.getElementById('call'), h = decodeURIComponent(s.querySelector('.mail').getAttribute('href')); return { h2: s.querySelector('h2').textContent, c: s.querySelector('.d-case').textContent, t: s.querySelector('.d-town').textContent, h }; });
    rec('the end is written from your own choices: "After a storm" picked in section 2 and Stillwater typed in section 6 reach the headline, the note and the email', w.h2 === 'Tell us about the storm.' && w.c === 'After a storm' && w.t === 'Stillwater' && /^mailto:info@owlroofing\.com\?subject=Roof help: After a storm&body=/.test(w.h) && /What’s going on: After a storm/.test(w.h) && /My town: Stillwater/.test(w.h), w.h.slice(0, 90));
    await p.evaluate(() => { const m = document.querySelector('#call .mail'); m.addEventListener('click', e => e.preventDefault(), { once: true }); m.click(); }); await p.waitForTimeout(200);
    rec('the honest email note, word for word: "Your email app should open with these details. Send it from there, or call (651) 977-6027."', await p.evaluate(() => document.querySelector('#call .msg').textContent === 'Your email app should open with these details. Send it from there, or call (651) 977-6027.'));
    rec('the closing line carries only locked facts: Owl Roofing LLC, the Shoreview address, licence #BC809662, info@owlroofing.com, We Give a Hoot', await p.evaluate(() => { const t = document.querySelector('#call .end').textContent.replace(/\s+/g, ' '); return ['Owl Roofing LLC', '1000 County Rd E #230, Shoreview, MN 55126', 'MN licence #BC809662', 'info@owlroofing.com', 'We Give a Hoot'].every(x => t.includes(x)); }));
  },
  towns: async (p) => {
    const go = () => p.evaluate(() => document.querySelector('#towns .ask').scrollIntoView({ block: 'center', behavior: 'instant' }));
    const ans = () => p.evaluate(() => document.querySelector('#towns .ans').textContent);
    const hit = () => p.evaluate(() => [...document.querySelectorAll('#towns .dot')].findIndex(d => d.classList.contains('hit')));
    await go(); await p.waitForTimeout(500);
    rec('not pinned (the pinned budget is spent): no sticky stage, the map sits in normal flow', await p.evaluate(() => ![...document.querySelectorAll('#towns *')].some(e => getComputedStyle(e).position === 'sticky') && document.getElementById('towns').offsetHeight < innerHeight * 2.2));
    rec('the site’s own 29 towns: 29 dot buttons, 29 suggestions, "29 towns", Shoreview marked as home with the owl', await p.evaluate(() => { const s = document.getElementById('towns'); return s.querySelectorAll('.dot').length === 29 && s.querySelectorAll('datalist option').length === 29 && /29 towns/.test(s.querySelector('.count').textContent) && !!s.querySelector('.home img') && /our home base/.test(s.querySelector('.dot.me').getAttribute('aria-label')); }));
    rec('a contour-line ground (the Lando mechanism): drawn rings, not a picture of a map', await p.evaluate(() => document.querySelectorAll('#towns svg.ground path').length >= 20));
    await p.fill('#tw-in', 'Roseville'); await p.waitForTimeout(300);
    const a1 = await ans(), h1 = await hit();
    rec('typing a whole town name answers yes, with its straight-line distance, and lights its dot', /Yes, we come to Roseville\./.test(a1) && /About \d+ miles from our Shoreview base/.test(a1) && h1 === 5, a1);
    await p.fill('#tw-in', 'st paul'); await p.waitForTimeout(300); const a2 = await ans();
    await p.fill('#tw-in', 'Still'); await p.waitForTimeout(300); const a3 = await ans();
    rec('forgiving input: "st paul" finds Saint Paul; a 3+ letter start ("Still") finds Stillwater', /Saint Paul/.test(a2) && /Stillwater/.test(a3), a2 + ' / ' + a3);
    await p.fill('#tw-in', 'Duluth'); await p.waitForTimeout(300); const a4 = await ans(), h4 = await hit();
    rec('a town not on the list gets an honest answer and the phone number, no dot lit', /Duluth isn’t on our list of 29 towns/.test(a4) && /\(651\) 977-6027/.test(a4) && h4 === -1, a4);
    await p.fill('#tw-in', '<img src=x>'); await p.waitForTimeout(300);
    rec('typed text is never injected as markup', await p.evaluate(() => !document.querySelector('#towns .ans img')));
    await p.fill('#tw-in', ''); await p.waitForTimeout(200);
    rec('clearing the box restores the opening line', /We come to 29 towns around Shoreview, MN\./.test(await ans()));
    await p.click('#towns .dot >> nth=18', { force: true }); await p.waitForTimeout(300);
    rec('tapping a dot fills the box and answers (Stillwater)', await p.inputValue('#tw-in') === 'Stillwater' && /Yes, we come to Stillwater\./.test(await ans()) && await hit() === 18);
    await p.click('#towns .dot.me', { force: true }); await p.waitForTimeout(300);
    rec('Shoreview is home: the answer gives the real office address', /Shoreview is home/.test(await ans()) && /1000 County Rd E #230, Shoreview, MN 55126/.test(await ans()));
    await p.focus('#towns .dot >> nth=13'); await p.keyboard.press('Enter'); await p.waitForTimeout(300);
    rec('keyboard: Enter on a focused dot answers (Saint Paul); every dot has a spoken label with the distance', /Saint Paul/.test(await ans()) && await p.evaluate(() => [...document.querySelectorAll('#towns .dot')].slice(1).every(d => /, about \d+ miles from our Shoreview base$/.test(d.getAttribute('aria-label')))));
    rec('every dot clears the ask card on desktop (no dot hidden under it)', await p.evaluate(() => { if (innerWidth <= 860) return true; const c = document.querySelector('#towns .ask').getBoundingClientRect(); return [...document.querySelectorAll('#towns .dot i')].every(i => { const r = i.getBoundingClientRect(); return r.right < c.left || r.left > c.right || r.bottom < c.top || r.top > c.bottom; }); }));
  },
  people: async (p) => {
    const at = async (f, w) => { await p.evaluate(f => { const s = document.getElementById('people'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(w || 1300); return p.evaluate(() => { const s = document.getElementById('people'); return { cv: +s.dataset.cover, nm: s.querySelector('.card .nm').textContent, cur: [...s.querySelectorAll('.dots button')].findIndex(b => b.getAttribute('aria-current') === 'true') }; }); };
    rec('a split cover on a pinned stage: three covers of two halves each, a seam, and the name card sitting on the seam', await p.evaluate(() => { const s = document.getElementById('people'), st = s.querySelector('.stage'), card = s.querySelector('.card').getBoundingClientRect(), seam = s.querySelector('.seam').getBoundingClientRect(); return getComputedStyle(st).position === 'sticky' && s.querySelectorAll('.cv').length === 3 && [...s.querySelectorAll('.cv')].every(c => c.querySelectorAll('.half img').length === 2) && Math.abs((card.left + card.width / 2) - (seam.left + seam.width / 2)) < 4; }));
    const a = await at(.15), b = await at(.5), c = await at(.85);
    rec('scroll turns the chapters: The Browns → The Berglands → Owl’s crew; the dots follow', /^The Browns/.test(a.nm) && /^The Berglands/.test(b.nm) && /^Owl’s crew/.test(c.nm) && a.cv === 1 && b.cv === 2 && c.cv === 3 && a.cur === 0 && c.cur === 2);
    await at(.15); await p.evaluate(() => { const s = document.getElementById('people'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .5); }); await p.waitForTimeout(260);
    rec('mid-turn: the two halves move in opposite directions across the seam (old out, new in)', await p.evaluate(() => { const on = document.querySelector('#people .cv.on'), past = document.querySelector('#people .cv.past'); if (!on || !past) return false; const ty = i => parseFloat(getComputedStyle(i).translate.split(' ')[1] || '0'); const [ol, or] = [...on.querySelectorAll('img')].map(ty), [pl, pr] = [...past.querySelectorAll('img')].map(ty); return ol > 1 && ol < 99 && or < -1 && or > -99 && pl < -1 && pr > 1; }));
    rec('real people, captioned as the site already captions them; only locked facts (founded 2025, co-founders Tim Brown and Noah Bergland, GAF Systems Plus, We Give a Hoot); no invented details', await p.evaluate(() => { const s = document.getElementById('people'), alts = [...s.querySelectorAll('img')].map(i => i.alt).join(' | '), t = s.querySelector('script').textContent; return /Tim Brown with his wife and their children/.test(alts) && /Noah Bergland with his wife and their children/.test(alts) && /Noah Bergland on a ladder at a roof edge/.test(alts) && /Founded 2025/.test(t) && /Tim Brown, co-founder/.test(t) && /Noah Bergland, co-founder/.test(t) && /GAF Systems Plus/.test(t) && /We Give a Hoot/.test(t) && !/\bvan\b|years? of experience|since 19|since 20[01]/i.test(t); }));
    await p.click('#people .dots button >> nth=1'); await p.waitForTimeout(1500);
    rec('the dots jump to a chapter (The Berglands)', await p.evaluate(() => +document.getElementById('people').dataset.cover) === 2);
  },
  numbers: async (p) => {
    const vals = () => p.evaluate(() => [...document.querySelectorAll('#numbers .v, #numbers .n b')].map(e => e.textContent.replace(/\s+/g, ' ').trim()));
    const final = await vals();
    rec('not a pinned scene (a different kind from section 3): no sticky stage, the numbers arrive in normal flow', await p.evaluate(() => ![...document.querySelectorAll('#numbers *')].some(e => getComputedStyle(e).position === 'sticky')));
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo(0, s.offsetTop); }); await p.waitForTimeout(250);
    const mid = await vals();
    rec('honest arrival: mid-reveal every number already shows its true value (no count-up through wrong values)', JSON.stringify(mid) === JSON.stringify(final), mid.join(' | '));
    rec('the numerals arrive as events: a masked rise (clip-path) and a hairline drawn above each', await p.evaluate(() => { const b = document.querySelector('#numbers .n b'); return /inset/.test(getComputedStyle(b).clipPath) && getComputedStyle(document.querySelector('#numbers .n'), '::before').transformOrigin.startsWith('0'); }));
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo(0, s.offsetTop + s.offsetHeight - innerHeight); }); await p.waitForTimeout(2200);
    rec('every number has arrived by the end of the section', await p.evaluate(() => document.querySelectorAll('#numbers .n.on').length === 6 && document.querySelector('#numbers .big').classList.contains('on')));
    rec('locked facts, exact: 5.0 · 90+ reviews, 10-year workmanship, up to 50-year manufacturer, 29 towns, GAF Systems Plus, BBB A−, founded 2025 by Tim Brown and Noah Bergland, licence #BC809662, Mon–Sat 08:00–18:00, Shoreview address, We Give a Hoot', await p.evaluate(() => { const t = document.getElementById('numbers').innerText.replace(/\s+/g, ' '); return ['5.0', 'from 90+ reviews', 'Workmanship warranty', '10-year', 'Manufacturer warranties', 'up to 50-year', '29', 'Certified by GAF', 'Systems Plus', 'A−', 'Better Business Bureau', '2025', 'Tim Brown and Noah Bergland', '#BC809662', 'Mon–Sat', '08:00–18:00', '1000 County Rd E #230', 'Shoreview, MN 55126', 'We Give a Hoot'].every(x => t.includes(x)) && !/A\+|Master Elite|Accredited|lifetime/i.test(t); }));
  },
  nothing: async (p) => {
    const at = async f => { await p.evaluate(f => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(1000); return p.evaluate(() => { const s = document.getElementById('nothing'), v = s.querySelector('video'); return { beat: +s.dataset.beat, t: v.currentTime, first: s.querySelector('.bt b').textContent, on: s.querySelector('.bt.on b').textContent, you: s.querySelector('.you .w').textContent, cur: [...s.querySelectorAll('.rail button')].findIndex(b => b.getAttribute('aria-current') === 'step') }; }); };
    rec('a pinned stage: the section is at least 4 screens tall and its stage is position: sticky', await p.evaluate(() => { const s = document.getElementById('nothing'); return s.offsetHeight >= innerHeight * 4 && getComputedStyle(s.querySelector('.stage')).position === 'sticky'; }));
    const a = await at(.1), b = await at(.5), c = await at(.9), d = await at(.5);
    rec('scroll moves through five beats (1 at 10 %, 3 at 50 %, 5 at 90 %), the rail and the "meanwhile, you" line follow', a.beat === 1 && b.beat === 3 && c.beat === 5 && a.cur === 0 && c.cur === 4 && a.you === 'make coffee.' && c.you === 'open the front door.');
    rec('the AirPods mechanism: scroll scrubs the film (currentTime rises with scroll and falls back when you scroll up)', b.t > a.t + 3 && c.t > b.t + 3 && Math.abs(d.t - b.t) < .6 && d.t < c.t, [a.t, b.t, c.t, d.t].map(x => x.toFixed(2)).join(' → '));
    rec('the beats are Owl facts: Wise Check, Protect Your Nest wrap, GAF Systems Plus crew, three cleanup passes, the aftercare box with the 10-year workmanship warranty', await p.evaluate(() => { const t = [...document.querySelectorAll('#nothing .bt')].map(e => e.textContent).join(' '); return /Wise Check/.test(t) && /Protect Your Nest/.test(t) && /GAF Systems Plus/.test(t) && /magnet sweep/.test(t) && /project manager/.test(t) && /aftercare box/.test(t) && /10-year workmanship warranty/.test(t) && !/\bfree\b|\$|same.day|one day|hours?\b/i.test(t); }));
    rec('with no case chosen, beat 1 reads "We look closely first."', a.first === 'We look closely first.');
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(400); await p.click('#finder .pill >> nth=3'); await p.waitForTimeout(1400);
    const e = await at(.05);
    rec('tailored by section 2: choosing "After a storm" makes beat 1 "We check the storm damage first."', e.first === 'We check the storm damage first.');
    await p.click('#nothing .rail button >> nth=3'); await p.waitForTimeout(1600);
    rec('the rail jumps straight to a step (Clean)', await p.evaluate(() => +document.getElementById('nothing').dataset.beat) === 4);
  },
  finder: async (p) => {
    const S = '#finder';
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(800);
    const st = () => p.evaluate(() => { const s = document.getElementById('finder'), g = s.querySelector('.gate'); return { kase: s.dataset.case || '', gateUp: g.classList.contains('up'), gateHidden: g.getAttribute('aria-hidden'), dock: document.querySelector('.rbar .dock').classList.contains('on'),
      gateChecked: [...s.querySelectorAll('.pill')].map(b => b.getAttribute('aria-checked')).indexOf('true'), dockChecked: [...document.querySelectorAll('.rbar .dock button')].map(b => b.getAttribute('aria-checked')).indexOf('true'),
      h: s.querySelector('.sc-h').textContent, k: s.querySelector('.sc-k').textContent, tag: s.querySelector('.ph-tag').textContent, store: (() => { try { return sessionStorage.getItem('owlCase'); } catch (e) { return 'x'; } })(), call: s.querySelector('.sc-call').getAttribute('aria-label'), clip: getComputedStyle(g).clipPath }; });
    let s = await st();
    rec('the first act is a choice: "What’s going on up there?" with six photo pills (a radiogroup); no scene, no dock yet', s.kase === '' && !s.gateUp && !s.dock && await p.evaluate(() => { const g = document.querySelector('#finder .pills'); return g.getAttribute('role') === 'radiogroup' && g.querySelectorAll('[role="radio"] img').length === 6 && document.getElementById('fd-q').textContent === 'What’s going on up there?'; }));
    await p.evaluate(() => { window.__ev = ''; document.addEventListener('owl:case', e => { window.__ev = e.detail; }); });
    await p.click(S + ' .pill >> nth=0'); await p.waitForTimeout(450); s = await st();
    rec('choosing pulls the gate up with a curved edge (curtain mid-reveal: an ellipse clip-path animating)', s.gateUp && /ellipse/.test(s.clip) && !/ellipse\(160% 100%/.test(s.clip));
    await p.waitForTimeout(1300); s = await st();
    rec('behind it: the full scene for YOUR case (Roof Repair, "A leak? We’ll find it and stop it.", Owl’s crew photo) and a tailored call', s.kase === 'leak' && s.k === 'Roof Repair' && s.h === 'A leak? We’ll find it and stop it.' && s.tag === 'Owl’s crew' && s.call === 'Call about my leak, (651) 977-6027' && s.gateHidden === 'true');
    rec('the choice docks into the top bar (page-wide chooser), with the same case checked', s.dock && s.dockChecked === 0 && s.gateChecked === 0);
    rec('the case is shared with the rest of the page (stored + owl:case event)', s.store === 'leak' && await p.evaluate(() => window.__ev) === 'leak');
    await p.focus('.rbar .dock button >> nth=0'); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(900); s = await st();
    rec('keyboard: ArrowRight in the dock switches the case (A ceiling stain) and the scene follows', s.kase === 'stain' && s.dockChecked === 1 && /A stain\? We look above it\./.test(s.h) && /attic above the stain/.test(await p.evaluate(() => document.querySelector('#finder .sc-l').textContent)));
    await p.click('.rbar .dock button >> nth=3'); await p.waitForTimeout(900); s = await st();
    rec('switching to "After a storm" names Storm Damage Help and labels the photo illustrative', s.kase === 'storm' && s.k === 'Storm Damage Help' && s.tag === 'Illustrative photo' && s.call === 'Call about storm damage, (651) 977-6027');
    rec('every answer names a real Owl service from the site’s own list; no prices, timings or invented claims', await p.evaluate(() => { const C = RESET.cases, svc = ['Roof Repair', 'Storm Damage Help', 'Wise Check Inspections', 'Roof Replacement', 'Wise Check']; return C.length === 6 && C.every(c => c.s.split(/ \+ | · /).every(x => svc.includes(x))) && !C.some(c => /\$|\bfree\b|same.day|within|hours?\b|minutes?\b|guarantee/i.test(c.h + c.l)); }));
  }
};
(async () => { const b = await chromium.launch(); const errs = [];
  const open = async (q, o) => { const p = await b.newPage(Object.assign({ viewport: { width: 1440, height: 900 } }, o || {})); p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(F + (q || '')); await p.waitForTimeout(1200); return p; };
  let p = await open();
  for (const pal of ['night', 'control', 'safety', 'slate']) {
    await p.evaluate(pal => document.documentElement.dataset.pal = pal, pal); await p.addScriptTag({ content: AXE });
    if (SEC) { await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await p.evaluate(s => { const e = document.getElementById(s); scrollTo(0, e.offsetTop + Math.max(0, e.offsetHeight - innerHeight)); }, SEC); await p.waitForTimeout(2000); await p.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await p.waitForTimeout(1200); }
    const ax = await p.evaluate(async s => { const r = await axe.run(s ? document.getElementById(s) : document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } }); return r.violations.map(x => x.id + '(' + x.nodes.length + ':' + x.nodes[0].target.join(' ') + ')'); }, SEC);
    rec('axe WCAG 2.1 A/AA, palette ' + pal + ': 0 violations', ax.length === 0, ax.join(' '));
  }
  await p.evaluate(() => document.documentElement.dataset.pal = 'night');
  rec('facts lock: only (651) 977-6027; no Master Elite, A+, Accredited; reviews only as 5.0 · 90+', await p.evaluate(() => { const t = document.body.innerText + [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.href).join(' '); return !/867-2961|Master Elite|A\+|Accredited/i.test(t) && [...document.querySelectorAll('a[href^="tel:"]')].every(a => a.getAttribute('href') === 'tel:+16519776027') && !/\b[0-4]\.\d\s*(stars?|·)/.test(t); }));
  if (SEC) rec('no skeleton: the section opens with no kicker + h2 + lede and ends with no Book + Call button row', await p.evaluate(s => { const e = document.getElementById(s); return !e.querySelector('.kick') && !(e.querySelector('a[href="#book"]') && e.querySelector('a[href^="tel:"].btn-line')); }, SEC));
  if (SEC && EXTRA[SEC]) { const q = await open(); try { await EXTRA[SEC](q); } catch (e) { rec('extra checks ran', false, e.message.split('\n')[0]); } await q.close(); }
  for (const w of [1440, 768, 390]) { const q = await open('', { viewport: { width: w, height: 900 } }); if (SEC) { await q.evaluate(s => document.getElementById(s).scrollIntoView({ block: 'start', behavior: 'instant' }), SEC); await q.waitForTimeout(400); if (SEC === 'finder') { await q.click('#finder .pill >> nth=1'); await q.waitForTimeout(1500); } }
    const ov = await q.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    rec('no sideways scroll at ' + w, ov <= 0, ov + ' px');
    const sm = await q.evaluate(s => [...(s ? document.getElementById(s) : document).querySelectorAll('a[href], button, [role=radio]')].concat([...document.querySelectorAll('.rbar a, .rbar button, .callpill')]).filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 40) && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[aria-hidden="true"]') && !e.closest('.gate.gone'); }).map(e => (e.className || e.tagName) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)), SEC);
    rec('controls at least 44 px at ' + w, sm.length === 0, sm.join('; ')); await q.close(); }
  const rm = await open('', { reducedMotion: 'reduce' });
  if (SEC === 'finder') { await rm.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await rm.click('#finder .pill >> nth=2'); await rm.waitForTimeout(150);
    rec('reduced motion: the choice swaps at once (no curtain animation), scene ready', await rm.evaluate(() => document.querySelector('#finder .gate').classList.contains('gone') && parseFloat(getComputedStyle(document.querySelector('#finder .gate')).transitionDuration) < .01 && document.getElementById('finder').dataset.case === 'shingles')); }
  if (SEC === 'nothing') { await rm.evaluate(() => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .7); }); await rm.waitForTimeout(500);
    rec('reduced motion: no film is loaded or scrubbed (the still poster stays), the beats still follow scroll', await rm.evaluate(() => { const s = document.getElementById('nothing'); return !s.querySelector('video').getAttribute('src') && +s.dataset.beat === 4; })); }
  if (SEC === 'numbers') { await rm.evaluate(() => document.getElementById('numbers').scrollIntoView()); await rm.waitForTimeout(300);
    rec('reduced motion: every number is visible at once, no mask or rise', await rm.evaluate(() => [...document.querySelectorAll('#numbers .n b')].every(b => getComputedStyle(b).clipPath === 'none' && getComputedStyle(b.closest('.n')).opacity === '1'))); }
  if (SEC === 'people') { await rm.evaluate(() => { const s = document.getElementById('people'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .5); }); await rm.waitForTimeout(200);
    rec('reduced motion: the chapter swaps at once (no slide)', await rm.evaluate(() => { const on = document.querySelector('#people .cv.on'); return +document.getElementById('people').dataset.cover === 2 && [...on.querySelectorAll('img')].every(i => getComputedStyle(i).translate === '0px' || getComputedStyle(i).translate === 'none' || parseFloat(getComputedStyle(i).transitionDuration) < .01); })); }
  const loops = await rm.evaluate(() => document.getAnimations().filter(a => a.effect && a.effect.getTiming().iterations === Infinity).length);
  rec('reduced motion: no looping animation', loops === 0, loops + ' looping'); await rm.close();
  rec('no page or console errors', errs.length === 0, errs.slice(0, 3).join(' | '));
  const pass = res.filter(r => r.ok).length; console.log('TOTAL ' + pass + '/' + res.length + ' passed');
  fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify({ section: SEC, total: res.length, passed: pass, results: res }, null, 1)); await b.close(); })();
