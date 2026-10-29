// S3 relight: one WebGL1 context, albedo + height (normals derived in-shader), raking lamp, dents. PLAN §3.4 constants.
const VS = 'attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}';
const FS = `precision mediump float;varying vec2 v;uniform sampler2D A,Ht;uniform vec2 lamp,texel,sc;uniform float aspect;uniform vec4 hits[12];
float hgt(vec2 uv){float h=texture2D(Ht,uv).r;for(int i=0;i<12;i++){vec4 k=hits[i];if(k.w>0.){vec2 d=(uv-k.xy)*vec2(aspect,1.);float r=length(d);float a=min(k.z,1.);
h-=exp(-pow(r/.010,2.))*k.w*.32*a;h+=exp(-pow((r-a*.022)/.004,2.))*k.w*.22*(1.-a);}}return h;}
void main(){vec2 uv=(v-.5)*sc+.5;vec3 al=texture2D(A,uv).rgb;
float hl=hgt(uv-vec2(texel.x,0.)),hr=hgt(uv+vec2(texel.x,0.)),hd=hgt(uv-vec2(0.,texel.y)),hu=hgt(uv+vec2(0.,texel.y));
vec3 N=normalize(vec3((hl-hr)*2.4,(hd-hu)*2.4,1.));
vec2 dv=(lamp-v)*vec2(aspect,1.);float dist=length(dv);
vec3 L=normalize(vec3(dv,.11));
float m=1.-smoothstep(.04,.40,dist);m=m*m*m*(m*(m*6.-15.)+10.);
float rake=max(dot(N,L),0.);float fl=max(dot(vec3(0.,0.,1.),L),0.);
float relief=clamp(rake-fl*.92,-.25,.6);
vec3 lc=vec3(1.,.94,.84);
float spec=pow(max(dot(reflect(-L,N),vec3(0.,0.,1.)),0.),24.)*.12;
vec3 lit=al*(.18+.30*(1.-m)+(.92+relief*1.6)*m*lc)+spec*m;
float y=dot(lit,vec3(.2126,.7152,.0722));
vec3 o=mix(mix(vec3(y),lit,.35),lit,m)*mix(.72,1.,m);
float y2=dot(o,vec3(.2126,.7152,.0722));o*=clamp(y2,.04,.96)/max(y2,1e-4);
gl_FragColor=vec4(o,1.);}`;

const load = src => new Promise((res, rej) => { const i = new Image(); i.decoding = 'async'; i.onload = () => res(i); i.onerror = rej; i.src = src; });

export async function createLamp(box, albedoSrc, heightSrc, force = false) { // force: QA flag ?gl=force, skips the software-GL guards
  const cv = box.querySelector('[data-lamp-canvas]');
  const gl = cv.getContext('webgl', { failIfMajorPerformanceCaveat: true, premultipliedAlpha: true, antialias: false, alpha: false });
  if (!gl) return null;
  // software GL passes failIfMajorPerformanceCaveat in some setups (proven: ANGLE SwiftShader in a VM, ~600 ms a frame); never run the lamp on it
  const dbg = gl.getExtension('WEBGL_debug_renderer_info'), renderer = String(gl.getParameter(dbg ? dbg.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
  const step = (to, why) => (window.dataLayer || []).push({ event: 'quality_step', where: 'lamp', to, why });
  if (!force && /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer)) { step('css', 'software-gl'); return null; }
  const [alb, hgt] = await Promise.all([load(albedoSrc), load(heightSrc)]);
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const tex = (img, unit, fmt) => { const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, fmt, fmt, gl.UNSIGNED_BYTE, img); return t; };
  tex(alb, 0, gl.RGB); tex(hgt, 1, gl.LUMINANCE);
  const U = n => gl.getUniformLocation(pr, n);
  gl.uniform1i(U('A'), 0); gl.uniform1i(U('Ht'), 1); gl.uniform2f(U('texel'), 1 / hgt.width, 1 / hgt.height);
  const uLamp = U('lamp'), uSc = U('sc'), uAsp = U('aspect'), uHits = U('hits');
  const hits = new Float32Array(48); let nHit = 0;
  let dpr = Math.min(devicePixelRatio || 1, 2), frames = [];
  const imgA = alb.naturalWidth / alb.naturalHeight;
  let sc = [1, 1];
  const size = () => { const w = box.clientWidth, h = box.clientHeight; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); gl.viewport(0, 0, cv.width, cv.height);
    const bA = w / h; sc = bA > imgA ? [1, imgA / bA] : [bA / imgA, 1]; gl.uniform2f(uSc, sc[0], sc[1]); gl.uniform1f(uAsp, bA); };
  size(); addEventListener('resize', size);
  let shown = false, ctxLost = false, failed = false, probe = [];
  cv.addEventListener('webglcontextlost', e => { e.preventDefault(); ctxLost = true; cv.remove(); });
  const fail = why => { failed = true; cv.classList.remove('is-on'); step('css', why); return false; };
  const api = {
    get failed() { return failed || ctxLost; },
    render(x, y, dt) {
      if (ctxLost || failed) return false;
      let busy = false;
      for (let i = 0; i < nHit; i++) { const k = i * 4; if (hits[k + 2] < 1) { hits[k + 2] = Math.min(1, hits[k + 2] + dt / 2000); busy = true; } }
      // §3.13 watchdog: median frame over 24 ms steps DPR 2 -> 1.5 -> 1, then hands back to the CSS lamp
      frames.push(dt); if (frames.length > 30) frames.shift();
      if (frames.length === 30) { const m = [...frames].sort((a, b) => a - b)[15]; if (m > 24) { if (dpr > 1) { dpr = dpr > 1.5 ? 1.5 : 1; frames = []; size(); step('dpr-' + dpr, 'frame-time'); } else if (!force) return fail('frame-time'); } }
      const t0 = !force && probe.length < 2 ? performance.now() : 0;
      gl.uniform2f(uLamp, x, y); gl.uniform4fv(uHits, hits); gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (t0) { gl.finish(); probe.push(performance.now() - t0); if (probe.length === 2 && Math.min(...probe) > 40) return fail('slow-draw'); } // two synced draws: a real GPU takes a few ms
      if (!shown) { shown = true; cv.classList.add('is-on'); }
      return busy;
    },
    drop(x, y) { // box uv -> texture uv (cover)
      const u = (x - 0.5) * sc[0] + 0.5, v = (y - 0.5) * sc[1] + 0.5; const i = (nHit % 12) * 4;
      hits[i] = u; hits[i + 1] = v; hits[i + 2] = 0; hits[i + 3] = 1; nHit = Math.min(12, nHit + 1);
    },
    clear() { hits.fill(0); nHit = 0; }
  };
  return api;
}
