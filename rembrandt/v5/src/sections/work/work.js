// WORK. ba2 is the only genuine before/after pair (owner); it is not pixel-aligned, so nothing here wipes one photo
// over the other: v1 shows them side by side, v3 crossfades the whole frame.
import { gsap } from 'gsap';
import { lines, rise, onEnter, EASE, MOVE } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';
import { glPanel, loop } from '../../js/gl.js';
import { step } from '../../js/spring.js';

// v1 Split. Model (S0089 spring-for-gestures, S0340): the divider is a mass of 1 on a stiffness-500, damping-30 spring;
// a drag holds it 1:1 (G4 #8), release keeps the hand's velocity (samples older than 60ms are stale) and coasts to
// x + v*m/c before the spring settles it; walls at 15% and 85% (S1303 range). Until touched it idles 15<->85 over 4s,
// sine.inOut, yoyo (S1303 wipe); reduced motion rests at 50.
function split(root, c) {
  const stage = root.querySelector('.wv1-stage'), range = root.querySelector('.wv1-range');
  const pb = root.querySelector('.wv1-pb'), pa = root.querySelector('.wv1-pa'), ib = pb.querySelector('img'), ia = pa.querySelector('img');
  const bar = root.querySelector('.wv1-bar'), cb = root.querySelector('.wv1-cb'), ca = root.querySelector('.wv1-ca');
  const S = { k: 500, c: 30, m: 1 }, b = { p: 50, v: 0 };
  let W = stage.clientWidth, target = 50, dragging = false, touched = false, raf = 0, samples = [], idle = null;
  const clamp = x => Math.max(15, Math.min(85, x));
  const render = () => { // set each transform directly (S0059: never through a parent CSS variable)
    const x = b.p;
    pb.style.clipPath = `inset(0 ${100 - x}% 0 0)`; ib.style.transform = `translateX(${x / 2 - 50}%)`;
    pa.style.clipPath = `inset(0 0 0 ${x}%)`; ia.style.transform = `translateX(${x / 2}%)`;
    bar.style.transform = `translate3d(${(x / 100) * W}px,0,0)`;
    cb.style.transform = `translate3d(calc(${(x / 200) * W}px - 50%),0,0)`; ca.style.transform = `translate3d(calc(${((x + 100) / 200) * W}px - 50%),0,0)`;
    const v = Math.round(x); if (+range.value !== v) range.value = v;
    range.setAttribute('aria-valuetext', v < 45 ? 'Mostly the after photo' : v > 55 ? 'Mostly the before photo' : 'Even split');
  };
  const tick = t => {
    raf = 0; const dt = 1 / 60;
    if (!dragging) { step(S, b, target, dt); b.p = Math.max(12, Math.min(88, b.p)); }
    render();
    if (dragging || Math.abs(b.p - target) > 0.02 || Math.abs(b.v) > 0.05) raf = requestAnimationFrame(tick); else { b.p = target; b.v = 0; render(); }
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const stopIdle = () => { touched = true; if (idle) { idle.kill(); idle = null; } };
  const toX = e => clamp(((e.clientX - stage.getBoundingClientRect().left) / W) * 100);
  const down = e => {
    if (dragging) return; // multi-touch guard (S0059)
    stopIdle(); dragging = true; stage.setPointerCapture(e.pointerId); samples = [[performance.now(), b.p]];
    b.p = toX(e); b.v = 0; wake();
  };
  const move = e => { if (!dragging) return; b.p = toX(e); const now = performance.now(); samples.push([now, b.p]); samples = samples.filter(s => now - s[0] < 100); };
  const up = () => {
    if (!dragging) return; dragging = false;
    const now = performance.now(), recent = samples.filter(s => now - s[0] < 60); // the 60ms rule zeroes stale velocity
    b.v = recent.length > 1 ? ((recent.at(-1)[1] - recent[0][1]) / Math.max(1, recent.at(-1)[0] - recent[0][0])) * 1000 : 0;
    target = clamp(b.p + b.v * S.m / S.c); wake();
  };
  stage.addEventListener('pointerdown', down); stage.addEventListener('pointermove', move);
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up); stage.addEventListener('lostpointercapture', up);
  const onRange = () => { stopIdle(); target = clamp(+range.value); if (c.reduce) b.p = target; wake(); };
  range.addEventListener('input', onRange); range.addEventListener('focus', stopIdle);
  const ro = new ResizeObserver(() => { W = stage.clientWidth; render(); }); ro.observe(stage);
  render();
  if (c.motion) {
    lines(root.querySelector('h2'), { scrollTrigger: onEnter(root) });
    gsap.fromTo(stage, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: MOVE, scrollTrigger: onEnter(stage, { start: 'top 85%' }) }); // S0060 scroll reveal
    const proxy = { x: 50 };
    idle = gsap.timeline({ paused: true, onUpdate: () => { if (!touched) { b.p = target = proxy.x; render(); } } })
      .to(proxy, { x: 85, duration: 2, ease: 'sine.inOut' })
      .to(proxy, { x: 15, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top 70%', end: 'bottom 20%', onToggle: s => { if (!idle) return; s.isActive ? idle.play() : idle.pause(); } } });
  }
  return () => { stopIdle(); cancelAnimationFrame(raf); ro.disconnect(); };
}

// v2 Street: pinned horizontal run (S1321 initHorizontalGalleries: x to -(scrollWidth - innerWidth), end +=scrollWidth,
// scrub 1, pin, anticipatePin 1, invalidateOnRefresh). Inside each frame the photo drifts the other way (G4 #6, 115%,
// about ±7%); a progress line fills (S1325); hover tilts a frame under 4 degrees (S1321 magnetic cards).
function street(root, c) {
  const pin = root.querySelector('.wv2-pin'), track = root.querySelector('.wv2-track'), fill = root.querySelector('.wv2-prog span');
  root.querySelectorAll('.wv2-f img').forEach(im => { const w = +im.getAttribute('width'), h = +im.getAttribute('height'); if (w && h) im.closest('figure').style.setProperty('--ar', (w / h).toFixed(3)); });
  const offs = [];
  if (c.motion) lines(root.querySelector('h2'), { scrollTrigger: onEnter(root) });
  if (c.motion && c.wide) {
    const dist = () => Math.max(0, track.scrollWidth - innerWidth);
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
      .fromTo(track, { x: 0 }, { x: () => -dist() }, 0)
      .fromTo(track.querySelectorAll('img'), { xPercent: -12.5 }, { xPercent: -0.5 }, 0) // stays inside the 115% overscan
      .fromTo(fill, { scaleX: 0 }, { scaleX: 1 }, 0);
    rise(track.querySelectorAll('.wv2-f'), { scrollTrigger: onEnter(root, { start: 'top 75%' }), stagger: 0.07, duration: 0.9 }, { x: 60, y: 0 });
    if (c.fine) track.querySelectorAll('.wv2-f').forEach(f => {
      const ry = gsap.quickTo(f, 'rotationY', { duration: 0.5, ease: 'power3.out' }), rx = gsap.quickTo(f, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const move = e => { const r = f.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 7); rx(-((e.clientY - r.top) / r.height - 0.5) * 5); };
      const leave = () => { rx(0); ry(0); };
      f.addEventListener('pointermove', move); f.addEventListener('pointerleave', leave);
      offs.push(() => { f.removeEventListener('pointermove', move); f.removeEventListener('pointerleave', leave); });
    });
  }
  return () => offs.forEach(f => f());
}

// v3 Dissolve: pinned (end +=200%, scrub, ease none: S1326 normalized progress). The old roof burns away into the new one
// along an fbm noise front that starts at the roofline and moves down, with a thin sun-coloured edge. WebGL per S0743;
// both photos stay as real <img>s underneath (S1338); without WebGL the after photo fades in instead.
const DISSOLVE = `uniform sampler2D uA,uB;uniform vec2 uRes,uImg;uniform float uP;
vec2 cover(vec2 p){float ra=uRes.x/uRes.y,ri=uImg.x/uImg.y;vec2 s=ra>ri?vec2(1.,ri/ra):vec2(ra/ri,1.);return .5*(1.-s)+p*s;}
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n(p);p*=2.03;a*=.5;}return s;}
void main(){vec2 uv=cover(v);float k=fbm(v*vec2(uRes.x/uRes.y,1.)*3.4)*.55+(1.-v.y)*.45;float e=.05;float r=uP*(1.+4.*e)-2.*e;
float m=smoothstep(r-e,r+e,k);vec3 a=texture2D(uA,uv).rgb,b=texture2D(uB,uv).rgb;vec3 col=mix(b,a,m);
float g=1.-clamp(abs(k-r)/(e*.45),0.,1.);col=mix(col,vec3(1.,.78,.25),g*g*.55*step(.001,uP)*step(uP,.999));gl_FragColor=vec4(col,1.);}`;
function dissolve(root, c) {
  if (!(c.motion && c.wide)) return; // stacked side by side with captions (CSS)
  const pin = root.querySelector('.wv3-pin'), stage = root.querySelector('.wv3-stage'), cvs = root.querySelector('.wv3-gl');
  const fa = root.querySelector('.wv3-fa'), ib = root.querySelector('.wv3-fb img'), ia = fa.querySelector('img');
  const sb = root.querySelector('.wv3-sb'), sa = root.querySelector('.wv3-sa');
  const st = { p: 0 }; let gl = null, ro = null, dead = false;
  const draw = () => { if (gl) { gl.set('uP', st.p); gl.draw(); } else gsap.set(fa, { autoAlpha: st.p }); };
  const ready = Promise.all([ib.decode(), ia.decode()]).catch(() => {});
  gsap.set(fa, { autoAlpha: 0 });
  ready.then(() => {
    if (dead) return;
    gl = glPanel(cvs, DISSOLVE); if (!gl) { draw(); return; }
    gl.tex(ib, 0, 'uA'); gl.tex(ia, 1, 'uB'); gl.set('uImg', ib.naturalWidth, ib.naturalHeight);
    ro = new ResizeObserver(() => { gl.resize(); draw(); }); ro.observe(cvs); gl.resize(); draw(); cvs.classList.add('on');
  });
  lines(root.querySelector('h2'), { scrollTrigger: onEnter(root) });
  gsap.timeline({ scrollTrigger: { trigger: pin, start: 'top top', end: '+=200%', scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: s => { const on = s.progress > 0.5; sb.classList.toggle('is-on', !on); sa.classList.toggle('is-on', on); } } })
    .to({}, { duration: 0.12 })
    .to(st, { p: 1, duration: 1, ease: 'none', onUpdate: draw })
    .to({}, { duration: 0.12 });
  let off = () => {};
  if (c.fine) { // S1330: the image plane leans toward the pointer (near yaw 0.055 rad, pitch 0.026 rad), damped by quickTo
    const ry = gsap.quickTo(stage, 'rotationY', { duration: 0.8, ease: 'power3.out' }), rx = gsap.quickTo(stage, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const move = e => { if (e.pointerType !== 'mouse') return; ry((e.clientX / innerWidth * 2 - 1) * 3.15); rx(-(e.clientY / innerHeight * 2 - 1) * 1.5); };
    const leave = () => { rx(0); ry(0); };
    root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave);
    off = () => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); };
  }
  return () => { dead = true; off(); if (ro) ro.disconnect(); if (gl) gl.dispose(); };
}

export default { 1: split, 2: street, 3: dissolve };
