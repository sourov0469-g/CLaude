/* ==========================================================================
   MEDIA
   One registry for every picture and clip in the deck. The build step
   rewrites IMAGES / VIDEOS into data URIs so the finished file works from a
   USB stick with no network at all; in development they stay as paths.
   ========================================================================== */

const IMAGES = /*__IMAGES__*/ {};
const VIDEOS = /*__VIDEOS__*/ {};

const Media = (function () {
  const texCache = {};
  const missing = [];

  function src(name) {
    if (IMAGES[name]) return IMAGES[name];
    if (missing.indexOf(name) < 0) { missing.push(name); console.warn('missing image:', name); }
    /* a warm placeholder rather than a broken-image icon */
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10"><rect width="16" height="10" fill="%23e6dbc9"/></svg>'
    );
  }

  function video(name) { return VIDEOS[name] || ''; }

  function texture(name) {
    if (texCache[name]) return texCache[name];
    const T = window.THREE;
    const img = new Image();
    const tex = new T.Texture(img);
    tex.colorSpace = T.SRGBColorSpace;
    tex.anisotropy = 4;
    img.onload = () => { tex.needsUpdate = true; };
    img.src = src(name);
    texCache[name] = tex;
    return tex;
  }

  function has(name) { return !!IMAGES[name]; }

  /* Pick the first name that actually exists. Lets a slide ask for a real
     PizzaBurg photograph and fall back to stock without breaking. */
  function pick() {
    for (let i = 0; i < arguments.length; i++) if (IMAGES[arguments[i]]) return arguments[i];
    return arguments[arguments.length - 1];
  }

  function preload(names) {
    names.forEach((n) => { if (IMAGES[n]) { const i = new Image(); i.src = IMAGES[n]; } });
  }

  return { src, video, texture, has, pick, preload, missing: () => missing };
})();
