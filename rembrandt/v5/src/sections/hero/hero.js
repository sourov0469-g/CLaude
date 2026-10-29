// HERO. Each init runs inside the section's gsap.matchMedia() (main.js), so tweens, triggers and pins revert on swap.
import { gsap } from 'gsap';
import { lines, rise, EASE } from '../../js/fx.js';
import { parallax } from '../../js/depth.js';
import { glPanel, loop } from '../../js/gl.js';

// v1 Daylight: the photo relit by a soft light that follows the damped pointer (S0743 post-processed image).
// Pseudo-normals come from luminance gradients, so ridges, siding and leaves catch the light. Crop = the <img>'s.
const RELIGHT = `uniform sampler2D uTex;uniform vec2 uRes,uImg,uL,uPos;uniform float uOn;
vec2 cover(vec2 p){float ra=uRes.x/uRes.y,ri=uImg.x/uImg.y;vec2 s=ra>ri?vec2(1.,ri/ra):vec2(ra/ri,1.);return uPos*(1.-s)+p*s;}
float lum(vec2 u){return dot(texture2D(uTex,u).rgb,vec3(.299,.587,.114));}
void main(){vec2 uv=cover(v);vec2 t=1.5/uImg;
float gx=lum(uv+vec2(t.x,0.))-lum(uv-vec2(t.x,0.));float gy=lum(uv+vec2(0.,t.y))-lum(uv-vec2(0.,t.y));
vec3 n=normalize(vec3(-gx*4.,-gy*4.,1.));vec2 d=(uL-v)*vec2(uRes.x/uRes.y,1.);float r2=dot(d,d);
vec3 L=normalize(vec3(d,.42));float diff=max(dot(n,L),0.);float fall=exp(-r2/.09);
vec3 c=texture2D(uTex,uv).rgb;vec3 col=c*mix(1.,.76,uOn);
col+=c*vec3(1.12,1.04,.9)*fall*(.34+.56*diff)*uOn;
col+=vec3(1.,.96,.86)*pow(max(dot(reflect(-L,n),vec3(0.,0.,1.)),0.),20.)*fall*.16*uOn;
gl_FragColor=vec4(col,1.);}`;

function daylight(root, c) {
  const media = root.querySelector('.hv1-media'), pd = root.querySelector('.hv1-pd'), cvs = root.querySelector('.hv1-gl'), im = root.querySelector('.hv1-img');
  const REST = [0.64, 0.56]; // S1330 designed still at x=.28, y=-.12, in canvas uv (y up)
  const st = { x: REST[0], y: REST[1], tx: REST[0], ty: REST[1], on: 0 };
  let gl = null, lp = null, ro = null, rect = null, dead = false;
  const draw = () => { if (!gl) return; gl.set('uL', st.x, st.y); gl.set('uOn', st.on); gl.draw(); };
  const start = () => {
    if (dead) return;
    gl = glPanel(cvs, RELIGHT); if (!gl) return; // no WebGL: the <img> stays (S1338)
    gl.tex(im, 0, 'uTex'); gl.set('uImg', im.naturalWidth, im.naturalHeight); gl.set('uPos', 0.08, 0.5);
    if (innerWidth <= 640) gl.set('uPos', 0.3, 0.5);
    ro = new ResizeObserver(() => { gl.resize(); rect = cvs.getBoundingClientRect(); draw(); }); ro.observe(cvs);
    gl.resize(); draw(); cvs.classList.add('on');
    if (c.reduce) { st.on = 1; draw(); return; } // one designed frame, no loop
    lp = loop(cvs, dt => { // S1330 frame-rate independent damping: alpha = 1 - (1 - 0.055)^(dt*60)
      const a = 1 - Math.pow(1 - 0.055, dt * 60);
      st.x += (st.tx - st.x) * a; st.y += (st.ty - st.y) * a;
      st.x = Math.round(st.x * 1000) / 1000; st.y = Math.round(st.y * 1000) / 1000;
      draw();
      return Math.abs(st.tx - st.x) > 0.001 || Math.abs(st.ty - st.y) > 0.001 || gsap.isTweening(st);
    });
  };
  im.decode().then(start, start);
  const onMove = e => {
    if (e.pointerType !== 'mouse' || !lp) return;
    rect = rect || cvs.getBoundingClientRect();
    st.tx = (e.clientX - rect.left) / rect.width; st.ty = 1 - (e.clientY - rect.top) / rect.height; lp.wake();
  };
  const onLeave = () => { st.tx = REST[0]; st.ty = REST[1]; if (lp) lp.wake(); };
  const onScroll = () => { rect = null; };
  if (c.fine && c.motion) { root.addEventListener('pointermove', onMove); root.addEventListener('pointerleave', onLeave); addEventListener('scroll', onScroll, { passive: true }); }

  if (c.motion) { // hero: at most 4 beats (S1303): photo, headline, line and actions, then the light
    const tl = gsap.timeline({ delay: c.swap ? 0 : 0.15 });
    tl.fromTo(media, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: EASE }, 0)
      .fromTo(pd, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: EASE }, 0)
      .add(lines(root.querySelector('.hv1-h')), 0.25)
      .add(rise(root.querySelectorAll('.hv1-act > *')), 0.75)
      .fromTo(st, { on: 0, x: 0.12, tx: 0.12 }, { on: 1, x: REST[0], tx: REST[0], duration: 1.5, ease: 'power2.inOut', onStart: () => lp && lp.wake(), onUpdate: () => lp && lp.wake() }, 0.45);
    parallax(root);
  }
  return () => {
    dead = true; if (lp) lp.stop(); if (ro) ro.disconnect(); if (gl) gl.dispose();
    root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); removeEventListener('scroll', onScroll);
  };
}

// v2 Aperture: pinned; the frame opens to full bleed while the two lines part (S1321 pinned scene, S0095 inset frame that grows)
function aperture(root, c) {
  const pin = root.querySelector('.hv2-pin'), fr = root.querySelector('.hv2-frame'), shade = root.querySelector('.hv2-shade');
  const a = root.querySelector('.hv2-a'), b = root.querySelector('.hv2-b');
  if (c.motion && c.wide) {
    gsap.timeline({ scrollTrigger: { trigger: pin, start: 'top top', end: '+=100%', scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      onUpdate: s => root.classList.toggle('is-open', s.progress > 0.62) } })
      .fromTo(fr, { clipPath: 'inset(29% 34% 35% 34%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
      .fromTo(a, { x: 0 }, { x: () => -(a.offsetLeft + a.offsetWidth + 40), ease: 'none' }, 0) // fully off-screen, measured
      .fromTo(b, { x: 0 }, { x: () => innerWidth - b.offsetLeft + 40, ease: 'none' }, 0)
      .fromTo(shade, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.4 }, 0.6);
  }
  if (c.motion) {
    const tl = gsap.timeline({ delay: c.swap ? 0 : 0.15 });
    if (c.wide) tl.fromTo(fr, { clipPath: 'inset(46.5% 34% 52.5% 34%)' }, { clipPath: 'inset(29% 34% 35% 34%)', duration: 1.1, ease: EASE, immediateRender: true }, 0.2);
    else tl.fromTo(fr, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: EASE }, 0.2);
    tl.add(lines(root.querySelector('.hv2-h')), 0)
      .fromTo(fr.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 1.4, ease: EASE }, 0.2)
      .add(rise(root.querySelectorAll('.hv2-act > *')), 0.7);
  }
}

// v3 Blueprint: S1324 reveal-hover-effect, exact contract (radius 260 or 22% of width clamped 140-260, pointer ease 0.1,
// radius ease 0.14, rAF only while unsettled, collapse on leave/cancel/blur, local coordinates after scroll and resize)
function blueprint(root, c) {
  const art = root.querySelector('.hv3-art'), grid = root.querySelector('.hv3-grid'), btn = root.querySelector('.hv3-show');
  const s = { x: 0, y: 0, tx: 0, ty: 0, r: 0, tr: 0, gx: 0, gy: 0, tgx: 0, tgy: 0, cx: 0, cy: 0, inside: false, frame: 0 };
  const radius = () => Math.min(260, Math.max(140, art.clientWidth * 0.22));
  const tick = () => {
    s.frame = 0;
    const pe = c.reduce ? 1 : 0.1, re = c.reduce ? 1 : 0.14, ge = 0.06;
    s.x += (s.tx - s.x) * pe; s.y += (s.ty - s.y) * pe; s.r += (s.tr - s.r) * re;
    art.style.setProperty('--reveal-x', s.x.toFixed(2) + 'px'); art.style.setProperty('--reveal-y', s.y.toFixed(2) + 'px'); art.style.setProperty('--reveal-radius', s.r.toFixed(2) + 'px');
    let moving = Math.abs(s.tx - s.x) > 0.1 || Math.abs(s.ty - s.y) > 0.1 || Math.abs(s.tr - s.r) > 0.1;
    if (!c.reduce) { // optional grid parallax: drift ±16px, ease 0.06, slower than the reveal
      s.gx += (s.tgx - s.gx) * ge; s.gy += (s.tgy - s.gy) * ge; grid.style.transform = `translate3d(${s.gx.toFixed(2)}px,${s.gy.toFixed(2)}px,0)`;
      moving = moving || Math.abs(s.tgx - s.gx) > 0.05 || Math.abs(s.tgy - s.gy) > 0.05;
    }
    if (moving) schedule();
  };
  const schedule = () => { if (!s.frame) s.frame = requestAnimationFrame(tick); };
  const target = (x, y) => { const r = art.getBoundingClientRect(); s.cx = x; s.cy = y; s.tx = x - r.left; s.ty = y - r.top; s.tgx = ((s.tx / r.width) * 2 - 1) * -16; s.tgy = ((s.ty / r.height) * 2 - 1) * -16; };
  const enter = e => { s.inside = true; target(e.clientX, e.clientY); if (s.r < 0.5) { s.x = s.tx; s.y = s.ty; } s.tr = radius(); schedule(); };
  const move = e => { target(e.clientX, e.clientY); if (!s.inside) { s.inside = true; if (s.r < 0.5) { s.x = s.tx; s.y = s.ty; } s.tr = radius(); } schedule(); };
  const hide = () => { s.inside = false; s.tr = 0; s.tgx = 0; s.tgy = 0; schedule(); };
  const view = () => { if (!s.inside) return; target(s.cx, s.cy); s.tr = radius(); schedule(); };
  const ro = new ResizeObserver(view); ro.observe(art);
  // the copy and scrim sit above the art, so listen on the whole version and let the art's rect decide
  if (c.fine) { root.addEventListener('pointerenter', enter); root.addEventListener('pointermove', move); root.addEventListener('pointerleave', hide); root.addEventListener('pointercancel', hide); addEventListener('blur', hide); addEventListener('scroll', view, { passive: true }); }
  const toggle = () => { const on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', String(on)); root.classList.toggle('show-photo', on); };
  btn.addEventListener('click', toggle);

  if (c.motion) {
    const tl = gsap.timeline({ delay: c.swap ? 0 : 0.15 });
    tl.fromTo(art, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: EASE }, 0) // the drawing scans in
      .add(lines(root.querySelector('.hv3-h')), 0.3)
      .add(rise(root.querySelectorAll('.hv3-copy > p, .hv3-copy > .cta-row, .hv3-show')), 0.75);
    if (c.fine) tl.call(() => { // one hint: the light opens over the house once, unless the visitor is already exploring
      if (s.inside) return;
      const r = art.getBoundingClientRect(); s.tx = s.x = r.width * 0.56; s.ty = s.y = r.height * 0.5; s.tr = radius(); schedule();
      gsap.delayedCall(1.3, () => { if (!s.inside) { s.tr = 0; schedule(); } });
    }, null, 1.5);
  }
  return () => {
    if (s.frame) cancelAnimationFrame(s.frame); ro.disconnect();
    root.removeEventListener('pointerenter', enter); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', hide); root.removeEventListener('pointercancel', hide);
    removeEventListener('blur', hide); removeEventListener('scroll', view); btn.removeEventListener('click', toggle);
  };
}

export default { 1: daylight, 2: aperture, 3: blueprint };
