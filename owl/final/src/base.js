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
    if (on && !OWL.started[s+':'+v] && OWL.inits[s+':'+v]) { OWL.started[s+':'+v] = 1; try { OWL.inits[s+':'+v](el); } catch(e){ console.error(e); } }
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

document.addEventListener('DOMContentLoaded', function(){
  var secs = apply(); review(secs); header(); magnets(); companion(); reveals(); router();
});
})();
