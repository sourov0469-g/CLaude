/* ===== Owl reset: the world ===== */
(function(){
  'use strict';
  var R = window.RESET = window.RESET || {};
  var reduce = OWL.reduce, root = document.documentElement;

  /* the visitor's case (chosen in section 2) is shared with the rest of the page: the Quiet Cubes mechanism */
  R.case = function(){ try { return sessionStorage.getItem('owlCase') || ''; } catch (e){ return R._case || ''; } };
  R.setCase = function(k){ R._case = k; try { sessionStorage.setItem('owlCase', k); } catch (e){} document.dispatchEvent(new CustomEvent('owl:case', { detail: k })); };

  /* palette switch: four labelled treatments on tokens, never a silent change */
  var PALS = [['shingle', 'Shingle Slate'], ['navy', 'North Navy'], ['hearth', 'Hearth Charcoal'], ['stone', 'Storm Stone']];
  /* the amber palettes of the reset night stay reachable by address only (?palette=night): records, out of the switch */
  var OLD = { night: 'Night Owl (record)', control: 'Owl today (record)', safety: 'Safety (record)', slate: 'Slate & Brass (record)' };
  var pal = document.querySelector('.pal');
  function palLabel(){ var cur = root.dataset.pal || 'shingle', i = PALS.findIndex(function(p){ return p[0] === cur; }), name = i < 0 ? (OLD[cur] || PALS[0][1]) : PALS[i][1];
    pal.querySelector('.pal-n').textContent = name; pal.setAttribute('aria-label', 'Colour palette: ' + name + '. Press to try the next one.'); return i; }
  if (pal){ palLabel(); pal.addEventListener('click', function(){ var i = (palLabel() + 1) % PALS.length; root.dataset.pal = PALS[i][0]; palLabel();
    try { var u = new URL(location.href); u.searchParams.set('palette', PALS[i][0]); history.replaceState(null, '', u); } catch (e){} }); }

  /* versions: the owner reviews by switching. One row per section, the best starred; a choice reloads to that section with it in the address */
  var vb = document.querySelector('.vers'), vp = document.querySelector('.vpanel');
  if (vb && vp && R.versions){
    var rows = vp.querySelector('.vp-rows'), q = new URLSearchParams(location.search);
    (R.order || Object.keys(R.versions)).forEach(function(sec){ var V = R.versions[sec], row = document.createElement('div'); row.className = 'vp-row';
      row.innerHTML = '<p class="vp-l">' + V.label + '</p><div class="vp-b" role="group" aria-label="' + V.label + ' versions"></div>';
      V.list.forEach(function(x){ var b = document.createElement('button'); b.type = 'button'; b.className = 'vp-v'; b.setAttribute('aria-pressed', x.v === V.cur ? 'true' : 'false');
        b.innerHTML = '<b>V' + x.v + '</b> ' + x.name + (x.v === V.def ? ' <span class="vp-star" aria-label="the best, shown by default">★</span>' : '');
        b.addEventListener('click', function(){ var u = new URL(location.href); if (x.v === V.def) u.searchParams.delete(sec); else u.searchParams.set(sec, x.v); u.hash = sec; location.href = u.toString(); if (u.pathname === location.pathname && u.search === location.search) location.reload(); });
        row.querySelector('.vp-b').appendChild(b); });
      rows.appendChild(row); });
    var keep = new URL(location.href); (R.order || []).forEach(function(s){ keep.searchParams.delete(s); }); keep.hash = ''; vp.querySelector('.vp-best').setAttribute('href', keep.search || '?');
    var changed = (R.order || []).some(function(s){ return q.has(s); }); vb.classList.toggle('mixed', changed);
    function open(on){ vp.hidden = !on; vb.setAttribute('aria-expanded', on ? 'true' : 'false'); if (on){ var f = vp.querySelector('[aria-pressed="true"]') || vp.querySelector('button'); f && f.focus(); } else vb.focus(); }
    vb.addEventListener('click', function(){ open(vp.hidden); });
    vp.querySelector('.vp-x').addEventListener('click', function(){ open(false); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !vp.hidden) open(false); });
  }

  /* sky, bar, call pill and the travelling owl all follow one scroll reader */
  var sky = document.querySelector('.sky'), bar = document.querySelector('.rbar'), pill = document.querySelector('.callpill'), flyer = document.querySelector('.flyer');
  var secs = [].slice.call(document.querySelectorAll('[data-sky]')), dusk = 0, eve = 0, tDusk = 0, tEve = 0, fx = 0, fy = 0, raf = 0;
  function read(){
    var vh = innerHeight, mid = vh * .5, cur = null;
    secs.forEach(function(s){ var r = s.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) cur = s; });
    var k = cur ? cur.dataset.sky : 'dawn'; tDusk = k === 'dusk' ? 1 : 0; tEve = k === 'eve' ? 1 : 0;
    var over = document.querySelector('[data-over]'), ob = over && over.getBoundingClientRect();
    bar.classList.toggle('over', !!(ob && ob.top <= 10 && ob.bottom > 70) || (cur && cur.dataset.sky === 'dusk'));
    bar.classList.toggle('solid', !(ob && ob.bottom > 70) && !(cur && cur.dataset.sky === 'dusk'));
    var stop = document.querySelector('[data-nocall]'), sb = stop && stop.getBoundingClientRect();
    if (pill) pill.classList.toggle('away', !!(sb && sb.top < vh * .7 && sb.bottom > 0));
    if (flyer){ var mx = document.documentElement.scrollHeight - vh, p = mx > 0 ? scrollY / mx : 0;
      /* the owl only crosses at the seams between sections, never over content */
      var seam = secs.some(function(s){ var t = s.getBoundingClientRect().top; return t > vh * .05 && t < vh * .45; });
      flyer.classList.toggle('on', seam && p > .04 && !(stop && sb.top < vh * .8));
      flyer.dataset.tx = (innerWidth * (.06 + .78 * ((Math.sin(p * Math.PI * 3 - 1.2) + 1) / 2)));
      var near = secs.map(function(s){ return s.getBoundingClientRect().top; }).filter(function(t){ return t > 0 && t < vh; })[0];
      flyer.dataset.ty = near ? Math.max(70, near - flyer.offsetHeight * .7) : vh * .14; }
  }
  function tick(){
    var k = reduce ? 1 : .08; dusk += (tDusk - dusk) * k; eve += (tEve - eve) * k;
    sky.style.setProperty('--dusk', dusk.toFixed(3)); sky.style.setProperty('--eve', eve.toFixed(3));
    if (flyer && flyer.dataset.tx){ var tx = +flyer.dataset.tx, ty = +flyer.dataset.ty, dx = tx - fx; fx += dx * (reduce ? 1 : .05); fy += (ty - fy) * (reduce ? 1 : .05);
      flyer.style.transform = 'translate3d(' + fx.toFixed(1) + 'px,' + fy.toFixed(1) + 'px,0) scaleX(' + (dx < 0 ? -1 : 1) + ') rotate(' + Math.max(-10, Math.min(10, dx * .05)).toFixed(1) + 'deg)'; }
    raf = requestAnimationFrame(tick);
  }
  addEventListener('scroll', read, { passive: true }); addEventListener('resize', read);
  document.addEventListener('DOMContentLoaded', function(){ read(); tick(); });
})();
