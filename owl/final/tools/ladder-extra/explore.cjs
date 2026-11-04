// Ladder interaction checks for new Explore versions (no game mechanic allowed: Explore V3 is the site's one game).
module.exports = {
  '4': async (p, S, rec) => {
    const at = async f => { await p.evaluate(([S, f]) => { const t = document.querySelector(S + ' .track'), r = t.getBoundingClientRect(), span = t.offsetHeight - innerHeight * .9; scrollTo({ top: scrollY + r.top + span * f + 2, behavior: 'instant' }); }, [S, f]); await p.waitForTimeout(500); };
    await at(0); rec('top of the pin: the finished roof, nothing lifted', await p.evaluate(S => document.querySelectorAll(S + ' .ly.off').length === 0 && document.querySelector(S + ' .ev h3').textContent === 'A finished roof', S));
    await at(3 / 6); await p.waitForTimeout(400);
    rec('half way: shingles and underlayment lifted away, the ice & water shield is the layer peeling', await p.evaluate(S => [...document.querySelectorAll(S + ' .ly.off')].map(l => l.dataset.i).sort().join() === '1,2' && document.querySelector(S + ' .ly[data-i="3"]').classList.contains('lift') && document.querySelector(S + ' .ev h3').textContent === 'Ice & water shield', S));
    await at(1); await p.waitForTimeout(400);
    rec('end of the pin: only the rafters remain', await p.evaluate(S => document.querySelectorAll(S + ' .ly.off').length === 5 && document.querySelector(S + ' .ev h3').textContent === 'Rafters', S));
    rec('roofer order top to bottom: shingles, underlayment, ice & water, drip edge, deck, rafters', await p.evaluate(S => [...document.querySelectorAll(S + ' .rail button')].slice(1).map(b => b.getAttribute('aria-label').replace('Lift to: ', '')).join('|') === 'Shingles|Underlayment|Ice & water shield|Drip edge|Roof deck|Rafters', S));
    await p.click(S + ' .rail button:nth-child(5)'); await p.waitForTimeout(1500);
    rec('a rail button jumps to its layer (aria-current)', await p.evaluate(S => document.querySelector(S + ' .rail [aria-current]').textContent === '04' && document.querySelector(S + ' .ev h3').textContent === 'Drip edge', S));
  },
  '5': async (p, S, rec) => {
    rec('six layer cards, top to bottom, first selected', await p.evaluate(S => [...document.querySelectorAll(S + ' .card')].map(c => c.getAttribute('aria-label')).join('|') === 'Shingles|Underlayment|Ice & water shield|Drip edge|Roof deck|Rafters' && document.querySelector(S + ' .card[aria-selected="true"]').id === 'ex5-c0', S));
    await p.hover(S + ' .deck'); await p.waitForTimeout(900); await p.evaluate(S => document.querySelector(S + ' #ex5-c2').click(), S); await p.waitForTimeout(500);
    rec('choosing ice & water brings it forward and states the 24 in rule with its source', await p.evaluate(S => document.querySelector(S + ' #ex5-c2').getAttribute('aria-selected') === 'true' && /24 in/.test(document.querySelector(S + ' .info').textContent) && /R905\.1\.2/.test(document.querySelector(S + ' .info').textContent), S));
    await p.focus(S + ' #ex5-c2'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(400);
    rec('arrow keys move through the layers (roving tabindex)', await p.evaluate(S => document.activeElement.id === 'ex5-c3' && document.querySelector(S + ' #ex5-c3').tabIndex === 0 && /Drip edge/.test(document.querySelector(S + ' .info h3').textContent), S));
    rec('numbers are framed as typical, not as a quote', await p.evaluate(S => /Typical values for a correct roof, not a quote/.test(document.querySelector(S).innerText), S));
  },
  '6': async (p, S, rec) => {
    await p.waitForTimeout(4500);
    rec('a correct eave plays first: the drop ends in the gutter, water shows there', await p.evaluate(S => document.querySelector(S + ' .gwater').classList.contains('on') && document.querySelector(S + ' .tag').textContent === 'Into the gutter', S));
    rec('layers are drawn in roofer order (deck → drip edge → ice & water → underlayment → starter → shingles)', await p.evaluate(S => { const k = [...document.querySelectorAll(S + ' .part')].map(e => e.dataset.k); const o = ['dk', 'de', 'iw', 'ul', 'st', 'sh']; return o.every((x, i) => i === 0 || k.indexOf(x) > k.indexOf(o[i - 1])); }, S));
    rec('ice & water shield runs past the inside of the heated wall', await p.evaluate(S => { const b = document.querySelector(S + ' .part[data-k="iw"]').getBBox(); return b.x < 470; }, S));
    rec('the lit chips follow the drop (shingles, starter, drip edge, gutter)', await p.evaluate(S => [...document.querySelectorAll(S + ' .chips li.lit')].map(l => l.textContent).join('|') === 'Shingles|Starter strip|Drip edge|Gutter', S));
    await p.click(S + ' .key:nth-child(2)'); await p.waitForTimeout(4500);
    rec('without drip edge: the drip edge is removed and the fascia shows rot', await p.evaluate(S => document.querySelector(S + ' .part[data-k="de"]').classList.contains('gone') && document.querySelector(S + ' .rot').classList.contains('on') && !document.querySelector(S + ' .gwater').classList.contains('on'), S));
    await p.click(S + ' .key:nth-child(3)'); await p.waitForTimeout(4500);
    rec('ice dam with ice & water shield: snow and ice show, the water is stopped', await p.evaluate(S => ['snow', 'ice', 'stop'].every(c => document.querySelector(S + ' .' + c).classList.contains('on')) && document.querySelector(S + ' .tag').textContent === 'Sealed by ice & water shield' && document.querySelector(S + ' .chips li:nth-child(4)').classList.contains('lit'), S));
    await p.click(S + ' .key:nth-child(4)'); await p.waitForTimeout(4500);
    rec('ice dam without it: the membrane is gone and the leak reaches the ceiling', await p.evaluate(S => document.querySelector(S + ' .part[data-k="iw"]').classList.contains('gone') && document.querySelector(S + ' .leak').classList.contains('on') && !document.querySelector(S + ' .stop').classList.contains('on'), S));
    rec('one scenario key is pressed and the outcome text matches it', await p.evaluate(S => document.querySelectorAll(S + ' .key[aria-pressed="true"]').length === 1 && document.querySelector(S + ' .out h3').textContent === 'Ice dam, without it', S));
    rec('the figure has a text description of the scenario', await p.evaluate(S => /no ice and water shield/.test(document.querySelector(S + ' svg title').textContent), S));
    rec('no game: no score, no win state', await p.evaluate(S => !/score|you win|points|level/i.test(document.querySelector(S).innerText), S));
  },
  '7': async (p, S, rec) => {
    await p.waitForTimeout(2500);
    rec('the lens opens at the eave on view', await p.evaluate(S => parseFloat(getComputedStyle(document.querySelector(S + ' .roof')).getPropertyValue('--r0')) > 60 && document.querySelector(S + ' .read h3').textContent === 'Ice & water shield', S));
    rec('three rings, each smaller than the last', await p.evaluate(S => { const w = [...document.querySelectorAll(S + ' .rings i')].map(i => parseFloat(i.style.width)); return w[0] > w[1] && w[1] > w[2] && w[2] > 0; }, S));
    const box = await p.evaluate(S => { const r = document.querySelector(S + ' .roof').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; }, S);
    await p.mouse.move(box[0] + box[2] * .5, box[1] + box[3] * .45, { steps: 8 }); await p.waitForTimeout(1600);
    rec('pointing up the field shows synthetic underlayment', await p.evaluate(S => document.querySelector(S + ' .read h3').textContent === 'Synthetic underlayment' && document.querySelector(S + ' .zones button[data-z="field"]').getAttribute('aria-pressed') === 'true', S));
    rec('the lens follows the pointer', await p.evaluate(([S, b]) => { const x = parseFloat(getComputedStyle(document.querySelector(S + ' .roof')).getPropertyValue('--x')); return Math.abs(x - b[2] * .5) < 40; }, [S, box]));
    await p.mouse.move(box[0] + box[2] * .03, box[1] + box[3] * .5, { steps: 6 }); await p.waitForTimeout(1600);
    rec('at the rake the drip edge goes over the underlayment', await p.evaluate(S => document.querySelector(S + ' .read h3').textContent === 'Drip edge over the underlayment', S));
    await p.mouse.move(box[0] - 30, box[1] - 30); await p.click(S + ' .zones button[data-z="ridge"]'); await p.waitForTimeout(1800);
    rec('Ridge key glides the lens to the ridge vent slot', await p.evaluate(S => document.querySelector(S + ' .read h3').textContent === 'Ridge vent slot' && document.querySelector(S + ' .rings .b1').textContent === 'Ridge vent slot', S));
    await p.focus(S + ' .roof'); for (let i = 0; i < 6; i++) await p.keyboard.press('Shift+ArrowDown'); await p.waitForTimeout(1600);
    rec('arrow keys move the lens back down to the eave', await p.evaluate(S => document.querySelector(S + ' .read h3').textContent === 'Ice & water shield', S));
    rec('the readout lists five layers for the zone', await p.evaluate(S => document.querySelectorAll(S + ' .read li').length === 5, S));
    rec('the deck layer shows a slot cut at the ridge (attic visible)', await p.evaluate(S => /y="70\.0" width="[\d.]+" height="14\.0" fill="#3A3036"/.test(decodeURIComponent(document.querySelector(S + ' .l2 img').src)), S));
  },
  '8': async (p, S, rec, txt) => {
    rec('five keys: right and four common faults', await p.evaluate(S => [...document.querySelectorAll(S + ' .keys button')].map(b => b.textContent).join('|') === 'Right|Too high|Too low|Over-driven|Under-driven', S));
    rec('right: four nails in the nailing strip, the doctrine in words', await p.evaluate(S => { const n = [...document.querySelectorAll(S + ' .fn')]; return n.length === 4 && n.every(e => { const y = +(e.style.transform.match(/,\s*([\d.]+)px/) || [0, 0])[1]; return y >= 196 && y <= 230; }) && /At least four nails per shingle/.test(document.querySelector(S + ' .read p').textContent); }, S));
    await p.click(S + ' .keys button >> nth=1'); await p.waitForTimeout(700);
    rec('too high: nails above the strip, the section shows it missing the bottom layer', await p.evaluate(S => [...document.querySelectorAll(S + ' .fn')].every(e => +(e.style.transform.match(/,\s*([\d.]+)px/) || [0, 999])[1] < 196) && document.querySelector(S + ' .miss').getAttribute('opacity') === '1' && /wind can tear it loose/.test(document.querySelector(S + ' .read p').textContent), S));
    await p.click(S + ' .keys button >> nth=2'); await p.waitForTimeout(700);
    rec('too low: nails below the cover line, head out in the weather', await p.evaluate(S => [...document.querySelectorAll(S + ' .fn')].every(e => +(e.style.transform.match(/,\s*([\d.]+)px/) || [0, 0])[1] > 250) && document.querySelector(S + ' .bare').getAttribute('opacity') === '1', S));
    await p.click(S + ' .keys button >> nth=4'); await p.waitForTimeout(700);
    rec('under-driven: raised head lifts the course above so it can’t seal', await p.evaluate(S => document.querySelector(S + ' .gap').getAttribute('opacity') === '1' && /translate\(0px,\s*-14px\)/.test(document.querySelector(S + ' .above').style.transform) && /seal strip can’t stick down/.test(document.querySelector(S + ' .read p').textContent), S));
    rec('faults are marked as faults, right as right', await p.evaluate(S => !document.querySelector(S + ' .read').classList.contains('ok') && document.querySelector(S + ' .read i').textContent === '✕', S));
    rec('no game: no score or win', !/score|you win|points|level up/i.test(txt));
  },
  '9': async (p, S, rec, txt) => {
    await p.waitForTimeout(1500);
    rec('air particles flow while the attic is in view', await p.evaluate(S => { const c = document.querySelector(S + ' canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 40) if (d[i] > 0) n++; return n > 20; }, S));
    rec('balanced: baffles shown, no damp, intake and ridge labelled', await p.evaluate(S => document.querySelector(S + ' .baffle').classList.contains('on') && !document.querySelector(S + ' .damp').classList.contains('on') && /Soffit intake/.test(document.querySelector(S + ' svg').textContent) && /Ridge vent/.test(document.querySelector(S + ' svg').textContent), S));
    await p.click(S + ' .keys button >> nth=1'); await p.waitForTimeout(500);
    rec('blocked soffits: insulation over the vents, damp and the honest consequence', await p.evaluate(S => document.querySelector(S + ' .plug').classList.contains('on') && document.querySelector(S + ' .damp').classList.contains('on') && !document.querySelector(S + ' .baffle').classList.contains('on') && /frost can form on the nails/.test(document.querySelector(S + ' .read p').textContent), S));
    await p.click(S + ' .keys button >> nth=2'); await p.waitForTimeout(500);
    rec('no ridge vent: the exhaust is shut and air has no way out', await p.evaluate(S => document.querySelector(S + ' .shut').classList.contains('on') && document.querySelector(S + ' .read h3').textContent === 'No way out' && document.querySelectorAll(S + ' .keys [aria-pressed="true"]').length === 1, S));
    rec('the figure describes the current state', await p.evaluate(S => /no exhaust at the ridge/.test(document.querySelector(S + ' svg title').textContent), S));
  },
  '10': async (p, S, rec) => {
    await p.waitForTimeout(1200);
    rec('a 3D block: six faces plus the rafter, all six layers drawn', await p.evaluate(S => document.querySelectorAll(S + ' .blk > .face').length === 11 && [0, 1, 2, 3, 4, 5].every(i => document.querySelector(S + ' .blk [data-l="' + i + '"]')), S));
    const a1 = await p.evaluate(S => document.querySelector(S + ' .blk').style.transform, S); await p.waitForTimeout(700);
    const a2 = await p.evaluate(S => document.querySelector(S + ' .blk').style.transform, S);
    rec('it rests with a slow sway until touched', a1 !== a2);
    const box = await p.evaluate(S => { const r = document.querySelector(S + ' .stg').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, S);
    const v0 = await p.evaluate(S => +document.querySelector(S + ' .stg').getAttribute('aria-valuenow'), S);
    await p.mouse.move(box[0], box[1]); await p.mouse.down(); await p.mouse.move(box[0] - 160, box[1], { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(1200);
    const v1 = await p.evaluate(S => +document.querySelector(S + ' .stg').getAttribute('aria-valuenow'), S);
    rec('dragging turns it and the slider value follows', Math.abs(v1 - v0) > 40);
    await p.focus(S + ' .stg'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(1200);
    const v2 = await p.evaluate(S => +document.querySelector(S + ' .stg').getAttribute('aria-valuenow'), S);
    rec('arrow keys turn it by 30°', Math.abs(((v2 - v1 + 540) % 360) - 180) > 20);
    await p.click(S + ' .lay button >> nth=2'); await p.waitForTimeout(1600);
    rec('picking ice & water lights it, dims the rest, and gives the 24 in IRC fact', await p.evaluate(S => { const b = document.querySelector(S + ' .blk'); const on = getComputedStyle(b.querySelector('[data-l="2"]')).opacity, off = getComputedStyle(b.querySelector('[data-l="0"]')).opacity; return b.dataset.on === '2' && +on === 1 && +off < .5 && document.querySelector(S + ' .inf strong').textContent === '24 in' && /IRC R905\.1\.2/.test(document.querySelector(S + ' .inf .num span').textContent); }, S));
    await p.click(S + ' .lay button >> nth=5'); await p.waitForTimeout(1800);
    rec('picking the rafter turns the block to show its underside', await p.evaluate(S => /rotateX\(30/.test(document.querySelector(S + ' .blk').style.transform) && document.querySelector(S + ' .ud').getAttribute('aria-pressed') === 'true' && document.querySelector(S + ' .inf b').textContent === 'Rafters', S));
    await p.click(S + ' .ud'); await p.waitForTimeout(1600);
    rec('See the Underside toggles back to the top view', await p.evaluate(S => /rotateX\(-26/.test(document.querySelector(S + ' .blk').style.transform) && document.querySelector(S + ' .ud').getAttribute('aria-pressed') === 'false', S));
    rec('drip edge is drawn under the ice & water, with its lip past the deck', await p.evaluate(S => { const s = document.querySelector(S + ' .blk .face:nth-child(3) svg').innerHTML; return s.indexOf('data-l="3"') > s.indexOf('data-l="2"') && /M34 51H-4V88/.test(s); }, S));
    rec('the honest scale note is shown', await p.evaluate(S => /Thicknesses drawn larger/.test(document.querySelector(S + ' .ctl small').textContent), S));
  },
  '11': async (p, S, rec) => {
    await p.waitForTimeout(600);
    rec('it opens on the homeowner’s question, not a lesson: “Not sure what’s wrong?” with Wise Check', await p.evaluate(S => document.querySelector(S + ' .ans h3').textContent === 'Not sure what’s wrong?' && /Wise Check/.test(document.querySelector(S + ' .ans').textContent), S));
    rec('five trouble spots, each a named 44 px+ button', await p.evaluate(S => { const b = [...document.querySelectorAll(S + ' .spot')]; return b.length === 5 && b.every(x => x.getAttribute('aria-label') && x.getBoundingClientRect().width >= 44); }, S));
    rec('no two spots overlap, at this width', await p.evaluate(S => { const r = [...document.querySelectorAll(S + ' .spot')].map(x => x.getBoundingClientRect()); for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) { if (Math.hypot(r[i].x - r[j].x, r[i].y - r[j].y) < 46) return false; } return true; }, S));
    const ownership = { 'Shingles': /repair|replace/, 'Storm damage': /hail and wind/, 'Chimney': /water gets in/, 'Stain on the ceiling': /leak/, 'Siding': /siding/ };
    let all = true, owlMoved = true, last = '';
    for (let i = 0; i < 5; i++) {
      await p.click(S + ' .spot >> nth=' + i); await p.waitForTimeout(800);
      const st = await p.evaluate(([S, i]) => { const b = document.querySelectorAll(S + ' .spot')[i]; const o = document.querySelector(S + ' .owl'); return { n: b.getAttribute('aria-label'), pressed: [...document.querySelectorAll(S + ' .spot')].filter(x => x.getAttribute('aria-pressed') === 'true').length, a: document.querySelector(S + ' .ans').textContent, pos: o.style.left + o.style.top }; }, [S, i]);
      if (!(st.pressed === 1 && ownership[st.n].test(st.a))) all = false; if (st.pos === last) owlMoved = false; last = st.pos;
    }
    rec('each spot answers that Owl fixes it, with a real Owl service, one at a time', all);
    rec('the Owl flies to each chosen spot', owlMoved);
    rec('no answer teaches construction (no layers, underlayment, decking, nails, ventilation words)', await p.evaluate(S => !/underlayment|ice & water|decking|drip edge|nail|ventilation|rafter/i.test(document.querySelector(S).innerText), S));
    rec('next steps: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-amber').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
  },
  '12': async (p, S, rec) => {
    await p.waitForTimeout(500);
    const set = (v) => p.evaluate(([S, v]) => { const r = document.querySelector(S + ' input[type=range]'); r.value = v; r.dispatchEvent(new Event('input')); }, [S, v]);
    const st = () => p.evaluate(S => { const g = document.querySelector(S + ' .sh'); const t = [...g.querySelectorAll('.tab')]; const fill = t[5].getAttribute('fill'); return { fill, curled: t.filter(x => x.style.transform && x.style.transform !== 'none').length, gone: t.filter(x => x.style.opacity === '0').length, moss: Math.max(...[...g.querySelectorAll('.moss')].map(m => +m.style.opacity || 0)), yr: document.querySelector(S + ' .yr').textContent, vt: document.querySelector(S + ' input').getAttribute('aria-valuetext'), h: document.querySelector(S + ' .ans h3').textContent, tag: document.querySelector(S + ' .ans small').textContent }; }, S);
    await set(2); await p.waitForTimeout(250); const a = await st();
    rec('a young roof: crisp shingles, nothing curled, no moss; Owl says it will fix anything fast (Roof repair)', a.curled === 0 && a.gone === 0 && a.moss === 0 && a.yr === '2' && a.h === 'Still young.' && a.tag === 'Roof repair', JSON.stringify(a));
    await set(10); await p.waitForTimeout(250); const b = await st();
    rec('middle years: a Wise Check', b.tag === 'Wise Check' && b.h === 'In its middle years.' && b.fill !== a.fill);
    await set(30); await p.waitForTimeout(250); const c = await st();
    rec('30+: faded, some tabs curled and a few missing, moss; "It’s had a good run" with the replacement and the 10-year workmanship warranty', c.curled > 0 && c.gone > 0 && c.moss > .5 && c.yr === '30+' && c.vt === '30 or more years' && c.tag === 'Roof replacement' && /10-year workmanship warranty/.test(await p.evaluate(S => document.querySelector(S + ' .ans p').textContent, S)), JSON.stringify(c));
    await p.focus(S + ' input[type=range]'); await p.keyboard.press('Home'); await p.waitForTimeout(250);
    rec('keyboard: Home goes to a new roof (native range)', (await st()).yr === '0');
    await p.click(S + ' .unsure'); await p.waitForTimeout(200);
    rec('"Not sure how old it is?" answers with a Wise Check', await p.evaluate(S => /Not sure\? Most people aren’t\./.test(document.querySelector(S + ' .ans h3').textContent) && document.querySelector(S + ' .ans small').textContent === 'Wise Check', S));
    rec('no lifespan claims and no construction words', await p.evaluate(S => !/last(s)? (about|up to)?\s*\d|lifespan|years? to|underlayment|decking|nail|ventilation|rafter|granule/i.test(document.querySelector(S).innerText), S));
    rec('next steps: book and the real phone', await p.evaluate(S => document.querySelector(S + ' .btn-amber').getAttribute('href') === '#book' && document.querySelector(S + ' a[href="tel:+16519776027"]').textContent.trim() === 'Call (651) 977-6027', S));
  }
};
