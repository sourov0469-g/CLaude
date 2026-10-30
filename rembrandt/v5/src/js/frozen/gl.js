// Minimal WebGL for "post-processed image" panels (S0743): one full-screen triangle, alpha false, DPR <= 2,
// shader logs on failure, null when WebGL is missing so the caller keeps its <img> fallback (S1338 contract).
const VS = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
export function glPanel(canvas, fs) {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; };
  const v = sh(gl.VERTEX_SHADER, VS), f = sh(gl.FRAGMENT_SHADER, 'precision highp float;varying vec2 v;' + fs);
  if (!v || !f) return null;
  const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(pr)); return null; }
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  const locs = {}, texs = [];
  const u = n => (n in locs ? locs[n] : (locs[n] = gl.getUniformLocation(pr, n)));
  const api = {
    gl,
    set(n, ...x) { const l = u(n); if (l === null) return; [, gl.uniform1f, gl.uniform2f, gl.uniform3f, gl.uniform4f][x.length].call(gl, l, ...x); },
    tex(imgEl, unit, name) {
      const t = gl.createTexture(); texs.push(t); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, imgEl);
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(w => gl.texParameteri(gl.TEXTURE_2D, w, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(u(name), unit);
    },
    resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2), w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h); api.set('uRes', w, h); return [w, h];
    },
    draw() { gl.drawArrays(gl.TRIANGLES, 0, 3); },
    dispose() { texs.forEach(t => gl.deleteTexture(t)); gl.deleteBuffer(buf); gl.deleteProgram(pr); const lose = gl.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext(); },
  };
  return api;
}
// run a frame loop only while the element is on screen and the tab is visible (S1338, S1377 "nothing runs unseen")
export function loop(el, frame) {
  let raf = 0, seen = false, last = 0;
  const tick = t => { raf = 0; const dt = Math.min((t - (last || t)) / 1000, 1 / 30); last = t; if (frame(dt, t) !== false && seen && !document.hidden) raf = requestAnimationFrame(tick); };
  const go = () => { if (!raf && seen && !document.hidden) { last = 0; raf = requestAnimationFrame(tick); } };
  const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; go(); }, { rootMargin: '80px' }); io.observe(el);
  const vis = () => go(); document.addEventListener('visibilitychange', vis);
  return { wake: go, stop() { cancelAnimationFrame(raf); raf = 0; io.disconnect(); document.removeEventListener('visibilitychange', vis); } };
}
