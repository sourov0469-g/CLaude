(function(){
'use strict';
var OWL = window.OWL = {inits:{}, started:{}};
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
OWL.reduce = reduce; OWL.fine = fine;
/* each version registers its own init; only the chosen version of a section runs */
OWL.reg = function(sec, v, fn){ OWL.inits[sec + ':' + v] = fn; };

var q = new URLSearchParams(location.search);
function chosen(sec){ return q.get(sec) || q.get('all') || '1'; }
function apply(){
  var secs = {};
  document.querySelectorAll('.ver').forEach(function(el){
    var s = el.dataset.sec, v = el.dataset.v; secs[s] = secs[s] || [];
    secs[s].push(v);
    var on = (v === chosen(s)) || (secs[s].length === 1 && !document.querySelector('.ver[data-sec="'+s+'"][data-v="'+chosen(s)+'"]'));
    el.hidden = !on;
    if (on) el.querySelectorAll('video[data-media]').forEach(function(m){ if (!m.src && OWL.media) { m.src = OWL.media[m.dataset.media]; if (m.autoplay && !reduce) m.play().catch(function(){}); } });
    if (!on) el.querySelectorAll('video').forEach(function(m){ m.pause(); });
    if (on && !OWL.started[s+':'+v] && OWL.inits[s+':'+v]) { OWL.started[s+':'+v] = 1; try { OWL.inits[s+':'+v](el); } catch(e){ console.error(e); } if (OWL.buttons) OWL.buttons(el); }
  });
  /* anchors: whichever version is shown carries the section's main id (the V1 id), so links like #book always land */
  Object.keys(secs).forEach(function(s){
    var els = document.querySelectorAll('.ver[data-sec="' + s + '"]'), main = null;
    els.forEach(function(el){ var sc = el.querySelector('section'); if (!sc) return; if (!sc.dataset.cid) sc.dataset.cid = sc.id || ''; if (el.dataset.v === '1') main = sc.dataset.cid; });
    if (!main) return;
    els.forEach(function(el){ var sc = el.querySelector('section'); if (!sc) return; sc.id = el.hidden ? main + '-alt' + el.dataset.v : main; });
  });
  return secs;
}

/* review toolbar: ?review shows a switcher so every version can be judged in the one file */
function review(secs){
  var bar = document.querySelector('.rev'); if (!bar || !q.has('review')) return;
  bar.classList.add('on'); bar.innerHTML = '';
  Object.keys(secs).forEach(function(s){
    var lab = document.createElement('span'); lab.textContent = s; bar.appendChild(lab);
    secs[s].forEach(function(v){
      var b = document.createElement('button'); b.textContent = 'V' + v; if (chosen(s) === v) b.className = 'on';
      b.onclick = function(){ q.set(s, v); history.replaceState(null,'','?' + q.toString() + location.hash); var r = apply(); review(r); };
      bar.appendChild(b);
    });
  });
}

/* header menu */
function header(){
  var h = document.querySelector('.hdr'), m = h && h.querySelector('.hdr-menu'); if (!m) return;
  m.addEventListener('click', function(){ var o = h.classList.toggle('open'); m.setAttribute('aria-expanded', o); });
  h.querySelectorAll('.hdr-nav a').forEach(function(a){ a.addEventListener('click', function(){ h.classList.remove('open'); m.setAttribute('aria-expanded', false); }); });
  /* ridge line: how far down the page you are */
  var rg = h.querySelector('.hdr-ridge'), rq = 0;
  if (rg){ var upd = function(){ rq = 0; var d = document.documentElement, mx = d.scrollHeight - innerHeight; rg.style.setProperty('--p', mx > 0 ? Math.min(1, scrollY/mx).toFixed(4) : 0); };
    addEventListener('scroll', function(){ if (!rq) rq = requestAnimationFrame(upd); }, {passive: true}); upd(); }
  /* footer roofline: 29 small roofs, one for each town */
  var fr = document.querySelector('.ftr-roofs');
  if (fr && !fr.childNodes.length){ var o = ''; for (var i = 0; i < 29; i++){ var x = 10 + i*40, hgt = 16 + (i*7 % 3)*6; o += '<path style="--i:' + i + '" d="M' + x + ' 60 V' + (60 - 12) + ' L' + (x + 16) + ' ' + (60 - 12 - hgt) + ' L' + (x + 32) + ' ' + (60 - 12) + ' V60 Z"/>'; } fr.innerHTML = o; }
}

/* magnetic 3D buttons: the pill leans toward the pointer, springs back on leave */
function magnets(root){
  if (!fine || reduce) return;
  (root||document).querySelectorAll('[data-mag]').forEach(function(b){
    if (b._mag) return; b._mag = 1;
    b.addEventListener('pointermove', function(e){
      var r = b.getBoundingClientRect(), x = (e.clientX - r.left - r.width/2) / r.width, y = (e.clientY - r.top - r.height/2) / r.height;
      b.style.setProperty('--mx', (x*10).toFixed(1) + 'px'); b.style.setProperty('--my', (y*6).toFixed(1) + 'px');
    });
    b.addEventListener('pointerleave', function(){ b.style.setProperty('--mx','0px'); b.style.setProperty('--my','0px'); });
  });
}
OWL.magnets = magnets;

/* Owl button system v2 (GATE-BUTTONS): label roll, icon slot, in-button ripple, tap splash, lift and press for every control */
var ARW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
var PHN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>';
function rollLabel(b){
  [].slice.call(b.childNodes).forEach(function(n){ if (n.nodeType !== 3 || !n.textContent.trim()) return;
    var txt = n.textContent.replace(/\s+/g, ' '), w = document.createElement('span'); w.className = 'bl'; var k = 0;
    txt.trim().split('').forEach(function(ch){ var i = document.createElement('i'); i.textContent = ch; i.dataset.c = ch; i.style.setProperty('--i', k++); w.appendChild(i); });
    if (/^\s/.test(txt)) b.insertBefore(document.createTextNode(' '), n); b.replaceChild(w, n); });
}
function buttons(root){
  (root || document).querySelectorAll('.btn').forEach(function(b){ if (b._bv) return; b._bv = 1;
    if (!b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby')) { var lab = b.textContent.replace(/\s+/g, ' ').trim(); if (lab) b.setAttribute('aria-label', lab); }
    rollLabel(b);
    var href = b.getAttribute('href') || '', has = b.querySelector('svg, .arr');
    if (!has && /^tel:/.test(href)){ var s = document.createElement('span'); s.className = 'bi ph'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = PHN; b.insertBefore(s, b.firstChild); }
    else if (!has && /^#book/.test(href)){ var s2 = document.createElement('span'); s2.className = 'bi'; s2.setAttribute('aria-hidden', 'true'); s2.innerHTML = ARW.replace('<svg', '<svg class="a1"') + ARW.replace('<svg', '<svg class="a2"'); b.appendChild(s2); }
    b.addEventListener('pointerdown', function(e){ var r = b.getBoundingClientRect(), d = document.createElement('span'); d.className = 'rp';
      d.style.left = (e.clientX - r.left) + 'px'; d.style.top = (e.clientY - r.top) + 'px'; d.style.setProperty('--rs', (Math.max(r.width, r.height)*2.4/16).toFixed(1));
      b.appendChild(d); setTimeout(function(){ d.remove(); }, 700);
      if (b.querySelector('.bi.ph')){ b.classList.remove('rung'); void b.offsetWidth; b.classList.add('rung'); } });
  });
  /* every other control gets the shared lift and press (transform-safe: uses the individual translate and scale properties) */
  (root || document).querySelectorAll('.ver [role="slider"]').forEach(function(k){ if (k._ck) return; k._ck = 1; if (k.getBoundingClientRect().width > 300 || k.offsetWidth > 300) return; k.classList.add('ctl-knob'); });
  (root || document).querySelectorAll('.ver button, .ver [role="button"], .ver [role="tab"], .ver a[href].key, .ver a[href^="tel:"], .ver a[href^="mailto:"], .hdr a, .hdr button').forEach(function(c){
    if (c._cl || c.classList.contains('btn') || c.closest('.btn')) return; c._cl = 1;
    var cs = getComputedStyle(c); if (cs.display === 'inline') c.style.display = 'inline-block'; if (/translate|scale|all/.test(cs.transitionProperty) && cs.transitionDuration !== '0s') { c.classList.add('ctl-lift'); return; }
    var t = cs.transition && cs.transition !== 'all 0s ease 0s' && cs.transitionDuration !== '0s' ? cs.transition + ', ' : '';
    c.style.transition = t + 'translate .28s cubic-bezier(.16,1,.3,1), scale .14s cubic-bezier(.2,0,0,1), outline-offset .22s cubic-bezier(.16,1,.3,1)';
    c.classList.add('ctl-lift'); });
}
OWL.buttons = buttons;
/* the tap splash: wherever a finger or pointer presses a control, an amber ring opens (also for Enter and Space) */
function splash(x, y){ var t = document.createElement('span'); t.className = 'tap'; t.style.left = x + 'px'; t.style.top = y + 'px'; document.body.appendChild(t); setTimeout(function(){ t.remove(); }, 560); }
document.addEventListener('pointerdown', function(e){ var c = e.target.closest && e.target.closest('a[href], button, [role="button"], [role="tab"], label, summary'); if (c && !c.closest('.rev')) splash(e.clientX, e.clientY); }, true);
document.addEventListener('keydown', function(e){ if (e.key !== 'Enter' && e.key !== ' ') return; var c = document.activeElement; if (!c || !c.matches || !c.matches('a[href], button, [role="button"], [role="tab"]')) return; var r = c.getBoundingClientRect(); splash(r.left + r.width/2, r.top + r.height/2); });

/* owl cursor companion: follows with a soft lag, looks where you look, reacts per element (data-owl) */
function companion(){
  var c = document.querySelector('.owlc'); if (!c || !fine) return;
  var tag = c.querySelector('.tag'), pus = c.querySelectorAll('.pu');
  var x = innerWidth/2, y = innerHeight/2, tx = x, ty = y, vx = 0, shown = false, mode = '';
  addEventListener('pointermove', function(e){ if (e.pointerType !== 'mouse') return; tx = e.clientX + 18; ty = e.clientY + 16; if (!shown){ shown = true; c.classList.add('on'); x = tx; y = ty; } }, {passive:true});
  document.addEventListener('pointerleave', function(){ c.classList.remove('on'); shown = false; });
  document.addEventListener('pointerover', function(e){
    var t = e.target.closest('[data-owl]'); var m = t ? t.dataset.owl : '';
    if (m === mode) return; mode = m;
    c.classList.remove('hoot','peek','say');
    if (!m) return;
    var parts = m.split(':'); c.classList.add(parts[0]);
    if (parts[1]) { tag.textContent = parts.slice(1).join(':'); c.classList.add('say'); }
  });
  (function loop(){
    var k = reduce ? 1 : .18; var dx = tx - x; x += dx * k; y += (ty - y) * k; vx = dx;
    var tilt = Math.max(-14, Math.min(14, vx * .35));
    c.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + tilt.toFixed(1) + 'deg)';
    var ox = Math.max(-2.6, Math.min(2.6, dx*.08)), oy = Math.max(-2.6, Math.min(2.6, (ty-y)*.08));
    pus.forEach(function(p, i){ p.setAttribute('cx', (i ? 37 : 21) + ox); p.setAttribute('cy', 25 + oy); });
    requestAnimationFrame(loop);
  })();
  setInterval(function(){ c.classList.add('blink'); setTimeout(function(){ c.classList.remove('blink'); }, 140); }, 3600);
}

/* reveal on scroll */
function reveals(){
  var els = document.querySelectorAll('.rv'); if (!('IntersectionObserver' in window)) { els.forEach(function(e){ e.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {rootMargin:'0px 0px -10% 0px'});
  els.forEach(function(e){ io.observe(e); });
}

/* YouTube on demand: nothing loads from YouTube until the visitor presses play */
OWL.youtube = function(holder, id){
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
  f.title = 'Owl Roofing on YouTube'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
  f.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
  holder.appendChild(f);
};

/* booking forms are not connected to a server: they open the visitor's email app with the details filled in,
   and never claim anything was sent */
OWL.bookForm = function(form, msg){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var bad = null; form.querySelectorAll('[required]').forEach(function(i){ var ok = i.value.trim().length > (i.type === 'tel' ? 6 : 1); i.setAttribute('aria-invalid', ok ? 'false' : 'true'); if (!ok && !bad) bad = i; });
    if (bad){ msg.className = 'form-msg err'; msg.textContent = 'Please add your ' + bad.dataset.n + '.'; bad.focus(); return; }
    var lines = []; form.querySelectorAll('[data-n]').forEach(function(i){ if (i.value) lines.push(i.dataset.n.charAt(0).toUpperCase() + i.dataset.n.slice(1) + ': ' + i.value); });
    form.querySelectorAll('.chips').forEach(function(c){ var on = c.querySelector('[aria-pressed="true"]'); if (on) lines.push(c.dataset.n + ': ' + on.textContent); });
    location.href = 'mailto:info@owlroofing.com?subject=' + encodeURIComponent('Wise Check request') + '&body=' + encodeURIComponent(lines.join('\n'));
    msg.className = 'form-msg'; msg.textContent = 'Your email app should open with these details. Send it from there, or call (651) 977-6027.';
  });
  form.querySelectorAll('.chips').forEach(function(c){ c.addEventListener('click', function(e){ var b = e.target.closest('button'); if (!b) return; c.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed', x === b); }); }); });
};

OWL.play = function(v){ var p = v.play(); if (p && p.catch) p.catch(function(){}); };

/* full film in a modal: used where the frame is not 16:9 */
OWL.ytModal = function(id){
  var d = document.createElement('dialog'); d.className = 'ytm'; d.setAttribute('aria-label','Owl Roofing on YouTube');
  d.innerHTML = '<div class="ytm-box"></div><button class="ytm-x" type="button" aria-label="Close video">×</button>';
  document.body.appendChild(d); OWL.youtube(d.querySelector('.ytm-box'), id);
  d.querySelector('.ytm-x').onclick = function(){ d.close(); };
  d.addEventListener('close', function(){ d.remove(); }); d.addEventListener('click', function(e){ if (e.target === d) d.close(); });
  d.showModal();
  var esc = function(e){ if (e.key === 'Escape' && d.open){ d.close(); } }; document.addEventListener('keydown', esc); d.addEventListener('close', function(){ document.removeEventListener('keydown', esc); });
  d.querySelector('.ytm-x').focus();
};

/* router: every page lives in this one file; #/name shows a page, #anchor scrolls (switching page if needed) */
function router(){
  var pages = document.querySelectorAll('.page'); if (!pages.length) return;
  function show(name, anchor){
    var pg = document.querySelector('.page[data-page="' + name + '"]') || document.querySelector('.page[data-page="home"]'), changed = pg.hidden;
    pages.forEach(function(p){ p.hidden = p !== pg; });
    document.title = pg.dataset.title || document.title;
    document.querySelectorAll('.hdr-nav a[data-route]').forEach(function(a){ if (a.dataset.route === pg.dataset.page) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    if (changed){ pg.querySelectorAll('.rv').forEach(function(e){ e.classList.add('in'); }); dispatchEvent(new Event('resize')); }
    var t = anchor && document.getElementById(anchor);
    if (t) t.scrollIntoView({behavior: (changed || reduce) ? 'instant' : 'smooth'}); else scrollTo({top:0, behavior: (changed || reduce) ? 'instant' : 'smooth'});
  }
  function go(){
    var h = decodeURIComponent(location.hash.slice(1));
    if (h.charAt(0) === '/') { show(h.slice(1) || 'home'); return; }
    var cur = document.querySelector('.page:not([hidden])'), curName = cur ? cur.dataset.page : 'home';
    if (!h) { show(curName); return; }
    var el = document.getElementById(h), pg = el && el.closest('.page');
    show(pg ? pg.dataset.page : (el ? curName : 'home'), h);
  }
  addEventListener('hashchange', go); go();
}


/* ===== Upgrade R1 shared systems ===== */
/* masked word reveal ⟦S0451⟧⟦S1329⟧: split once, keep the sentence for screen readers, reveal on demand */
OWL.split = function(el, delay){
  if (!el || el.dataset.split) return el; el.dataset.split = 1;
  var i = 0, label = el.textContent.replace(/\s+/g, ' ').trim();
  (function walk(node){
    [].slice.call(node.childNodes).forEach(function(n){
      if (n.nodeType === 3){
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function(part){
          if (!part) return; if (!part.trim()){ frag.appendChild(document.createTextNode(part)); return; }
          var m = document.createElement('span'); m.className = 'wm'; m.setAttribute('aria-hidden', 'true');
          var w = document.createElement('span'); w.className = 'w'; w.style.setProperty('--i', i++); w.textContent = part; m.appendChild(w); frag.appendChild(m);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
  })(el);
  el.setAttribute('aria-label', label); el.classList.add('split'); if (delay) el.style.setProperty('--d', delay + 'ms');
  return el;
};
OWL.reveal = function(el){ if (!el) return; requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.classList.add('in'); }); }); };

/* drawn-plate buttons: the amber wash starts where the cursor came in ⟦S1324⟧ */
document.addEventListener('pointerover', function(e){
  var b = e.target.closest && e.target.closest('.btn-ink'); if (!b || b.contains(e.relatedTarget)) return;
  var r = b.getBoundingClientRect(); b.style.setProperty('--x', (e.clientX - r.left) + 'px'); b.style.setProperty('--y', (e.clientY - r.top) + 'px');
});

/* the splash surface ⟦S1338⟧⟦S1323⟧, technique read from Immersive Garden's engine: a small flowmap the cursor
   stamps into and that decays every frame (×0.953). Consumers read .canvas (alpha = wake) as a mask or a texture.
   Stamps are laid by distance travelled, not by time, so a flick and a crawl leave the same wake. */
OWL.flow = function(el, o){
  o = o || {}; var W = o.w || 160, R = o.radius || .14, DEC = o.decay || .953, STEP = o.step || .012, A = o.alpha || .32, EASE = o.ease || .4;
  var c = document.createElement('canvas'), g = c.getContext('2d', {willReadFrequently: !!o.read}), deep = o.deep ? document.createElement('canvas') : null, gd = deep && deep.getContext('2d', {willReadFrequently: !!o.read});
  var rect = null, H = 100, tx = -1, ty = -1, ex = -1, ey = -1, inside = false, energy = 0;
  function size(){ rect = el.getBoundingClientRect(); H = Math.max(8, Math.round(W * rect.height / Math.max(1, rect.width))); c.width = W; c.height = H; if (deep){ deep.width = W; deep.height = H; } }
  size(); new ResizeObserver(size).observe(el);
  function local(e){ return [(e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height]; }
  el.addEventListener('pointermove', function(e){ if (e.pointerType === 'touch' && !o.touch) return; rect = el.getBoundingClientRect(); var p = local(e); tx = p[0]; ty = p[1]; if (!inside){ inside = true; ex = tx; ey = ty; } }, {passive:true});
  el.addEventListener('pointerleave', function(){ inside = false; });
  function blob(ctx, x, y, a, r){ var gr = ctx.createRadialGradient(x*W, y*H, 0, x*W, y*H, r*W); gr.addColorStop(0, 'rgba(255,255,255,' + a + ')'); gr.addColorStop(.45, 'rgba(255,255,255,' + a*.6 + ')'); gr.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x*W, y*H, r*W, 0, 6.3); ctx.fill(); }
  var api = {canvas: c, deep: deep, energy: 0,
    stamp: function(x, y, a, r){ blob(g, x, y, a == null ? A : a, r || R); if (deep) blob(gd, x, y, (a == null ? A : a) * .5, (r || R) * .8); },
    step: function(){
      g.globalCompositeOperation = 'destination-out'; g.fillStyle = 'rgba(0,0,0,' + (1 - DEC) + ')'; g.fillRect(0, 0, W, H); g.globalCompositeOperation = 'source-over';
      if (deep){ gd.globalCompositeOperation = 'destination-out'; gd.fillStyle = 'rgba(0,0,0,' + (1 - (o.deepDecay || .985)) + ')'; gd.fillRect(0, 0, W, H); gd.globalCompositeOperation = 'source-over'; }
      if (!inside) { energy *= .9; api.energy = energy; return; }
      var px = ex, py = ey; ex += (tx - ex) * EASE; ey += (ty - ey) * EASE;
      var dx = ex - px, dy = ey - py, d = Math.sqrt(dx*dx + dy*dy), n = Math.min(14, Math.floor(d / STEP));
      energy = Math.min(1, energy * .9 + d * 6); api.energy = energy;
      for (var i = 1; i <= n; i++){ var t = i / n; blob(g, px + dx*t, py + dy*t, A, R); }
      if (deep){ var slow = Math.max(0, 1 - d * 60); if (slow > .05) blob(gd, ex, ey, .06 * slow, R * .7); }
      if (!n && Math.random() < .08) blob(g, ex, ey, A * .35, R * .8);
    }};
  return api;
};

/* images stored once by the build (window.OWLA) */
OWL.hydrate = function(scope){ if (!window.OWLA) return; (scope || document).querySelectorAll('[data-asrc]').forEach(function(e){ e.src = OWLA[e.dataset.asrc]; e.removeAttribute('data-asrc'); }); (scope || document).querySelectorAll('[data-ahref]').forEach(function(e){ e.setAttribute('href', OWLA[e.dataset.ahref]); e.removeAttribute('data-ahref'); }); (scope || document).querySelectorAll('[data-aposter]').forEach(function(e){ e.setAttribute('poster', OWLA[e.dataset.aposter]); e.removeAttribute('data-aposter'); }); };
OWL.hydrate();
document.addEventListener('DOMContentLoaded', function(){
  OWL.hydrate();
  var secs = apply(); review(secs); header(); magnets(); buttons(); companion(); reveals(); router();
});
})();
