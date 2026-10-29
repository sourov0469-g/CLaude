# DEEP READS — SLICE 3 (queue 129–170, 34 entries) — Lane 3, 26 Oct 2026

**Completed 33 · Blocked 1** (160 Behance roofing — design-only source; gallery URL never evidenced across 6 logged routes, no analysis fabricated). Extracts in code-source/<slug>/values.txt per entry. Zero permission cards, zero 429s across the slice. Note: entry 129 carries a worker self-correction verified against the tutorial repo's main branch (initial draft values replaced). Tooling note for Lane 1: fetch_and_mine.sh drops demo subpaths when resolving relative assets — Part B worked around it with urljoin fetches on the demo's own host.

# Deep Reads — Slice 3, Part A: Codrops WebGL entries (queue 129–144)

Source-level treatments. Every entry: Codrops article read in full, demo opened (first contact),
source pass via code-source/fetch_and_mine.sh, and the tutorial's own GitHub repo mined where the
demo ships a compiled bundle. Values are labelled Measured (article) / Measured (repo/demo bundle) /
Derived / Inferred. Zero permission cards encountered in this part; no 429s.

## 129 Shader Based Reveal Effect with React Three Fiber & GLSL — https://tympanus.net/Tutorials/R3FImageReveal/
Source: Codrops article https://tympanus.net/codrops/2024/12/02/how-to-code-a-shader-based-reveal-effect-with-react-three-fiber-glsl/ · repo https://github.com/colindmg/r3f-image-reveal-effect (main = final; branches are tutorial steps) · code-source slug: shader-reveal-r3f

CORRECTION (26 Oct, post-delivery): this block was rewritten against the repo's main-branch sources after a late-arriving fetch showed the original block misstated the final shader (it described a uDirection quadrant mask and edge glow that exist on no branch, wrong geometry/aspect/wave constants, and an unsupported demo-bundle measurement). The corrected version follows; values.txt carries the same correction note.

Stack (Measured — repo package.json): Vite ^5.4.8 + React 18.3.1, three ^0.169.0, @react-three/fiber ^8.17.10, @react-three/drei ^9.114.6, motion ^11.11.17, leva ^0.9.35 (declared; shipped UI is plain buttons), vite-plugin-glsl ^1.3.0, Tailwind ^3.4.14. The demo source pass returned only the Codrops frame page, so the repo is the code of record.

Mechanism (step-by-step):
1. Plane: planeGeometry args [1, 1, 32, 32], scaled by drei useAspect(texWidth, texHeight, 0.2); a fullscreen toggle swaps the mesh scale to the full viewport size.
2. Material via drei shaderMaterial + extend, transparent = true; uniforms uTexture, uTime, uProgress, uRes, uImageRes (uRes/uImageRes maintained on resize purely to feed cover-fit).
3. Fragment samples the texture at CoverUV(vUv, uRes, uImageRes) (standard cover-fit from shaders/includes/coverUV.glsl) but computes the reveal MASK on raw vUv: displacedUv = vUv + cnoise(vec3(vUv*5.0, uTime*0.1)); strength = cnoise(vec3(displacedUv*5.0, uTime*0.2)) (Ashima 3D Perlin); radialGradient = distance(vUv, 0.5)*12.5 − 7.0*uProgress; strength = 1 − clamp(strength + radialGradient, 0, 1); alpha = strength * smoothstep(0.0, 0.7, uProgress).
4. Vertex ripple: position.z += (1 − uProgress) * sin(distance(uv, 0.5)*20.0 − uProgress*5.0).
5. Drive: revealProgress is a motion MotionValue starting at 1 (demo starts revealed); the button toggles animate(revealProgress, 0|1, {duration: 1.5, ease: "easeInOut"}); useFrame copies clock.elapsedTime → uTime and revealProgress.get() → uProgress (no React state in the loop). Extra toggles: fullscreen scale, dark/light canvas background (#000 / #F9FAF7). Branch 4-addingdisplacement is the identical shader minus CoverUV.

Exact parameters: noise scale 5.0 both octaves, time rates 0.1 / 0.2; radial coefficients 12.5 and −7.0; alpha smoothstep 0→0.7; vertex wave 20.0 / 5.0; geometry 32×32; useAspect factor 0.2; tween 1.5s easeInOut.

Rebuild notes: In vanilla Three keep the same shader pair and drive uProgress with a GSAP tween on a plain object read inside the render loop — the MotionValue is just a mutable number. Paste in the Ashima cnoise include and the ~10-line CoverUV function; no other dependencies. Fallback for no-WebGL: plain <img> with CSS opacity/clip-path reveal (the material is transparent, so content visibility must not depend on the canvas).

Evidence: Stack/parameters Measured (repo main-branch package.json, RevealImage.jsx, App.jsx, both shaders and both includes, read verbatim). Mechanism Derived from those sources. code-source: code-source/shader-reveal-r3f/values.txt (rewritten with correction note).

## 131 WebGL Rotating Image Gallery using OGL and GLSL — https://tympanus.net/Tutorials/RotatingSlideshow/
Source: Codrops article https://tympanus.net/codrops/2024/12/03/how-to-create-a-webgl-rotating-image-gallery-using-ogl-and-glsl-shaders/ (Oluwaseyi Oluwadare) · repo https://github.com/oluwadareseyi/webgl-rotating-image-gallery (master) · code-source slug: rotating-gallery-ogl

Stack (Measured): OGL ^1.0.8 + normalize-wheel + Vite + SCSS. No GSAP, no Three. Renderer alpha + antialias, DPR = min(devicePixelRatio, 2). Camera fov 45, z = 20; viewport height in world units = 2*tan(fov/2)*z.

Mechanism (step-by-step):
1. Virtual scroll: wheel events (pixelY * 0.005) and drag (dy * 0.1) feed scroll.target; every frame scroll.current = lerp(current, target, 0.01) — a very heavy ease that gives the gallery its drift.
2. 10 images become 10 planes sharing one Plane geometry (widthSegments 100, heightSegments 1 — the width segments exist purely so the vertex shader can bend the plane). Plane size maps a 320×300 px design box into world units via the viewport; vertical padding factor 0.8 between planes.
3. Infinite wrap: each plane's y is offset by a direction-aware `extra` term so the column wraps seamlessly in both scroll directions (heightTotal modulo).
4. Per-plane uniforms: uPosition = map(position.y, −viewportH, +viewportH, 5, 15) — where the plane sits in the scroll column becomes the bend driver; uTime += 0.04/frame and uSpeed exist but are unused by the final shaders (vestigial).
5. Vertex bend: the plane rotates around the Y axis by an angle that varies along its width: offset = (dot(vec3(1,1,0), position) + 0.25)/0.5 (a 0..1 diagonal coordinate); localprogress = clamp((fract(uPosition*0.05) − 0.01*uDistortion*offset) / (1 − 0.01*uDistortion), 0, 2) with uDistortion = 3; angle = quinticInOut(localprogress) * π; rotation applied with a Rodrigues rotation matrix around (0,1,0). Planes near the viewport centre stand flat; planes entering/leaving curl around an invisible cylinder.
6. Program flags: depthTest, depthWrite, cullFace all false (draw order = DOM order). Textures: generateMipmaps false. Fragment does cover-fit ratio cropping only.

Exact parameters: quinticInOut GLSL: t<0.5 ? 16t⁵ : −0.5|2t−2|⁵+1. Scroll lerp 0.01; wheel scale 0.005; drag scale 0.1. uPosition mapping 5→15 across the viewport height; fract(uPosition * 0.05) phase; distortion divisor 0.01*uDistortion with uDistortion = 3.

Rebuild notes: OGL is a thin wrapper — the same structure ports 1:1 to Three (PlaneGeometry(1,1,100,1), ShaderMaterial with side effects none, transparent ordering by renderOrder). The quintic ease in GLSL is the feel: do not substitute a cubic. Demo bundle route failed via the mining script's relative-asset resolution (logged in values.txt); the repo is code of record and its shaders match the article verbatim.

Evidence: Stack/parameters Measured (repo sources + article). Mechanism Derived from repo. code-source: code-source/rotating-gallery-ogl/values.txt.

## 132 Interactive WebGL Hover Effects — https://tympanus.net/Tutorials/webgl-mouseover-effects/step3.html
Source: Codrops article https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/ (Yuri Artiukh; effect recreated from Jesper Landberg's site) · repo https://github.com/akella/webgl-mouseover-effects (linked from the demo page) · code-source slug: webgl-hover-effects

Stack (Measured — step3 demo bundle, unminified Parcel output read in full): three + @johh/three-effectcomposer, dat.gui (effect switcher), simple-input-events, GSAP 3.2.6 (template), imagesLoaded + FontFaceObserver gating. Renderer antialias + alpha, setPixelRatio(1) deliberately, sRGBEncoding. Camera PerspectiveCamera(70, aspect, 100, 1000) at distance 400, fov recomputed on resize as fov = 2*atan(width/aspect/(2*400)) — the px==world-unit calibration.

Mechanism (step-by-step):
1. DOM→GL sync: each <img class="js-image"> is measured (getBoundingClientRect), hidden (visibility:hidden), and replaced by a mesh sharing PlaneBufferGeometry(1,1,80,80) scaled to (w, h, w/2). Per-mesh material clone does centred cover-fit in its fragment: newUV = (vUv − 0.5)*resolution.zw + 0.5 with resolution = vec4(w, h, a1, a2) cover ratios. Scroll translates the scene in world units so planes track their DOM boxes; step3 also uses IntersectionObserver (thresholds 0, .3–.9, 1) to toggle visibility.
2. The effect is a POST-PROCESS, not per-image: EffectComposer = RenderPass + one custom ShaderPass (renderToScreen). A single fullscreen fragment shader warps everything the canvas rendered, around the cursor.
3. Mouse plumbing: normalised mouse (x/w, 1−y/h); followMouse lerps at 0.1/frame; speed = euclidean |prevMouse − mouse|; targetSpeed lerps toward speed at 0.1; uVelo = min(targetSpeed, 0.05); targetSpeed *= 0.999 decay per frame; time += 0.05/frame.

Exact parameters (post fragment, verbatim from bundle): uniforms tDiffuse, resolution = vec2(1, h/w), uMouse (init (−10,−10)), uVelo, uType (int). circle(uv, c, r, border): aspect-corrects (uv−c)*resolution, returns smoothstep(r+border, r−border, length). Type 0 RGB split: c = circle(uv, mouse, 0.0, 0.2); r = tex(newUV += c*uVelo*0.5).x; g = tex(newUV += c*uVelo*0.525).y; b = tex(newUV += c*uVelo*0.55).z (note: += accumulates across channels). Type 1 zoom/melt: c = circle(uv, mouse, 0.0, 0.1 + uVelo*2.)*40.*uVelo; warpedUV = mix(vUv, uMouse, c*0.99); colour = tex(warped) + tex(warped)*vec4(vec3(c),1). Type 2 random: hash = hash12(vUv*10.) (fract(sin(dot(p, (127.1,311.7)))*43758.5453123)); c = circle(uv, mouse, 0.0, 0.1 + uVelo*0.01)*10.*uVelo; warpedUV = vUv + vec2(hash − 0.5)*c; same glow add. uType switched live from dat.GUI buttons. Steps: step1 = RGB split only; step2 = DOM-synced list; step3 = switchable types.

Rebuild notes: In modern Three use the addons EffectComposer/RenderPass/ShaderPass with the same fragment shader unchanged. The velocity cap (0.05) + 0.999 decay is the liquid feel — distortion is a brief impulse tied to cursor speed and zero at rest. Cost is one fullscreen pass regardless of image count; the trade-off is that everything in the canvas warps, so keep real text in the DOM if readability matters.

Evidence: Stack/parameters Measured (demo bundle modules js/scene.js, js/post/fragment.glsl read in full; article cross-checked). fetch_and_mine's relative-asset fetch failed on this demo (1,441B error pages); the real 1.62MB bundle was fetched from the demo directory on the same host and restored into the slug's assets/. code-source: code-source/webgl-hover-effects/values.txt.

## 133 Gooey Image Hover Effects with Three.js — https://tympanus.net/Tutorials/GooeyImageHoverEffects/
Source: Codrops article https://tympanus.net/codrops/2019/10/23/making-gooey-image-hover-effects-with-three-js/ · repo https://github.com/Aqro/gooey-hover-codrops · code-source slug: gooey-hover

Stack (Measured — repo package.json): three ^0.109.0, gsap ^2.1.3 (TweenMax), smooth-scrollbar ^8.4.1, webpack 4 + glslify (glsl-noise snoise3, glsl-voronoi-noise, glsl-worley). Renderer alpha, setPixelRatio(devicePixelRatio). Camera px-calibrated: perspective = 800; fov = 180*(2*atan(innerHeight/2/800))/π; z = 800; near 1 far 1000. One plane per DOM img (data-src / data-hover), PlaneBufferGeometry(1,1,1,1) scaled to the element rect, offset = (left − innerWidth/2 + width/2, −top + innerHeight/2 − height/2); fixed canvas behind content (z 9 vs 10).

Mechanism (step-by-step) — article version:
1. Fragment builds a soft disc at the cursor: st = gl_FragCoord.xy/(u_res*PR) − 0.5, aspect-corrected; circle(st, r, blur) = 1 − smoothstep(r − r*blur, r + r*blur, dot(dist,dist)*4.0).
2. A boiling noise field: offx = uv.x + sin(uv.y + u_time*0.1); offy = uv.y − u_time*0.1 − cos(u_time*0.001)*0.01; n = snoise3(vec3(offx, offy, u_time*0.1) * 8.0) − 1.0 (time is the third noise dimension).
3. Goo mask: c = circle(circlePos, 0.3, 2.0) * 2.5; finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.0)) — the pow sharpens the disc, the added noise makes its edge wobble and drip.
4. finalImage = mix(u_image, u_imagehover, finalMask). u_time += 0.01/frame; mouse tweened by TweenMax over 0.5s to normalised coords; mesh tilt on the same tween: rotation.x = −mouse.y*0.3, rotation.y = mouse.x*(π/6).

Shipped demo version (Measured — repo gooeyShader.glsl + Tile.js/Scene.js): 5 tiles get 5 different shaders [trippy, shape, gooey, wave, reveal] with hover durations [0.5, 0.5, 0.5, 0.8, 0.8]s. Hover tweens u_progressHover 0→1 (TweenMax, Power2.easeInOut); click drives u_progressClick for expansion. Gooey shader: time = u_time*0.05; c = circle(cpos, 0.04*progressHover + progress*0.8, 2.)*50.; c2 = circle(cpos, 0.01*progressHover + progress*0.5, 2.); nc = snoise3(vec3(offX, offY, time*0.5)*8.) * progressHover (noise amplitude gated BY hover progress); c2 = smoothstep(0.1, 0.8, c2*5. + nc*3. − 1.); base UV zooms 1 − 0.2*progressHover and shifts by mouse*0.1*progressHover; hover UV zooms 1 − 0.1*progressHover with wobble nh = snoise3(...*2.)*0.1 scaled by progressHover*(1−progress); hover tinted toward deep blue (0.0314, 0.0314, 0.2235) by 0.8*(1−progress); mix factor clamp(c2 + progress, 0, 1); tile edge mask from a 0.1*progressHover gradient border (sqr/finalMask smoothstep(0., 0.1, sqr − c)).

Rebuild notes: The generalisable idiom is mask = smoothstep(lo, hi, noiseField + shapeField) — swap the circle for any SDF. Prefer the shipped progress-gated version for production: the goo grows/shrinks with the tween instead of boiling permanently, and only hovered tiles pay the noise cost. GSAP 2 TweenMax code ports directly to GSAP 3 (gsap.to on uniform objects).

Evidence: article values Measured (article code blocks); shipped values Measured (repo sources). Mechanism Derived. code-source: code-source/gooey-hover/values.txt.

## 136 WebGL Shader Techniques for Dynamic Image Transitions — https://tympanus.net/Tutorials/ShaderImageReveal
Source: Codrops article https://tympanus.net/codrops/2025/01/22/webgl-shader-techniques-for-dynamic-image-transitions/ (Arlind Aliu) · repo https://github.com/Arrlindii/Shader-Image-Transition · code-source slug: shader-image-transitions

Stack (Measured — repo package.json): Vite 5 + vite-plugin-glsl, three ^0.166.1, GSAP ^3.12.5, lil-gui. Renderer alpha, DPR min(dpr, 2). Camera PerspectiveCamera(35, aspect, 0.1, 2000) at z = 1600. Four meshes (1000×667, 450×581, 553×600, 600×600 px), PlaneGeometry(w, h, 128, 128), stacked one viewport height apart.

Mechanism (step-by-step):
1. Scroll is sectioned: section = round(scrollY / innerHeight); camera.position.y lerps toward −scrollY at 0.1/frame.
2. On entering a section, GSAP tweens that mesh's uProgress → 1 over 3.0s. uProgress is the ONLY animated uniform — the article's free-running clock is re-parameterised as progress in the shipped code.
3. Fragment: noise(point) is cheap trig noise — angle = atan(y, x) + uProgress*π (rotation driven by progress); w0 = (cos(angle)+1)/2, w1 = (sin(2*angle)+1)/2, w2 = (cos(3*angle)+1)/2, averaged.
4. circleSDF(pos, rad) returns the FIELD length(pos) + noise(pos)*rad*amt, amt = 0.5 + sin(uProgress*0.2)*0.25. Because noise is multiplied by rad, blobs start as clean circles and get wigglier as they grow.
5. radialCircles(p, o, count) uses a sector fold (s = round(atan(p)/sectorAngle)) so ONE circleSDF evaluation yields a whole ring — O(1) per pixel instead of the article's 4-layer × 12-item loop version.
6. main: t = pow(uProgress, 2.5); rad = t * (uSize.x/2); c1 = central blob field; r1/r2/r3 = rings at 0.20*uSize.x (count 3), 0.25*uSize.x (count 3), 0.45*uSize.x (count 5), each with inner radius 15.0; k = 50.0/uSize.x; circle = softMin(c1, r1, k) then softMin with r2, r3 (softMin(a,b,k) = −log(exp(−ka) + exp(−kb))/k — exponential smooth-min from iq); mask = step(circle, rad); colour = mix(transparent black, texture, mask).

Exact parameters: article version differs — t = pow(uTime, 1.5), radius 15.0 fixed, centre offset (0.1, 0.1)*uSize, rings (0.1*uSize.x, 2.0) and (0.4*uSize.x, 5.0), softMin k = 0.01 fixed, noise angle += uTime*0.02, amt = 0.5 + sin(uTime*0.2)*0.25. Article's un-optimised radial version: circleRadius 0.021, 4 layers × 12 items, layerOffset 0.5/4, r starts 0.1.

Rebuild notes: The whole effect is one SDF idiom — field = min over shapes of (length + noise*rad*amt), threshold by growing rad; softMin makes overlaps merge organically. Driving it from a tweened 0..1 progress (rather than a clock) makes the reveal scrubbable and scroll-safe. Works as a standalone fragment shader on any fullscreen quad; in WP/Elementor contexts it can run as a small Three snippet behind a hero image.

Evidence: shipped values Measured (repo fragment.glsl/script.js/MeshItem.js verbatim); article values Measured (article). code-source: code-source/shader-image-transitions/values.txt.

## 137 Animated Heat Distortion Effects with WebGL — https://tympanus.net/Tutorials/HeatDistortionEffect/
Source: Codrops article https://tympanus.net/codrops/2016/05/03/animated-heat-distortion-effects-webgl/ (Lucas Bebber) · repo https://github.com/lbebber/HeatDistortionEffect · code-source slug: heat-distortion

Stack (Measured — repo): RAW WebGL, no library — a small custom GL wrapper compiles one fullscreen-quad program per demo (4 demos: desert, cooking, flight, water). Frame clock: target frame 1000/60 ms; incr = delta/frameDuration clamped to 1.5, scaled by timeScale; time wraps at loops = 1000.

Mechanism (step-by-step) — article walkthrough:
1. Haze: distortion = sin(position.y*frequency + time*speed) * amplitude with frequency = 100.0, amplitude = 0.003, speed = 0.03; colour sampled at (x + distortion, y) — x-only offset.
2. Masking: distortion multiplied by a painted grayscale map's brightness (map.r) with blurred map edges so untouched areas stay clean.
3. Depth/parallax: parallax = mouse * 0.005, mouse uniform = (clientX/canvas.width, clientY/canvas.height); colour sampled at distortedPosition + parallax.
4. Channel packing: ONE maps texture carries both maps — depthMap = maps.r, distortionMap = maps.g; final sample = texture(image, (x + distortion*distortionMap, y) + parallax*depthMap).
5. Text: an SVG is rasterised to a 2D canvas, uploaded as a texture, positioned via contentPosition/contentSize uniforms from the placeholder element's getBoundingClientRect.

Shipped desert shader (Measured verbatim — haze-desert.frag): wave(x, freq, speed) = sin(x*freq + u_time*(π/2)*speed). waves(): mask = maps.b (B channel is the haze mask in the shipped maps image); intensity = vec2(2.0, 1.0) * pixel() where pixel() = dpi/resolution (offsets in PIXELS, resolution-scaled); offset = (wave(pos.y, 190.0, 0.35), wave(pos.x, 100.0, 0.4)) * intensity * mask. depth(): d = −pow(maps.r, 1.0); pos + vec2(0.004)*mouse*d. Film grain: 256px noise texture (u_noiseSize 256), per-frame random per-channel offsets, added as (1 − colour)*0.1*noise. SVG title compositing gated by maps.g (vdepth): where vdepth < 0.5, alpha multiplier = clamp(1 − (vdepth − 0.1)/0.4, 0, 1); title UVs waved at 30% blend so text shimmers less. Mouse normalised −1..1 then shaped by curve(v) = sign(v)*|v|^0.8; touch uses devicemotion (accel/10, 6-sample smoothing, gains ×12/×3). Cooking variant: 5-wave turbulence (55/−0.48, 66/−0.33 on x−0.7y; 50/0.21, 66/0.45, 45/0.25 on y), masked by maps.g, intensity 0.3*pixel().

Rebuild notes: The reusable core is tiny and ports to any stack (a fragment shader on an image quad, or a Three ShaderMaterial): offset = sin(pos*freq + time*speed)*amp gated by a painted mask texture, plus optional mouse*depth parallax from a second packed channel. Quote amplitudes in pixels (scale by 1/resolution) so the look is size-independent. Everything else — grain, SVG text, device motion — is garnish.

Evidence: article values Measured (article); shipped values Measure (repo shaders/haze.js/index-desert.js). code-source: code-source/heat-distortion/values.txt.

## 138 Interactive Wave Propagation Cube Grid with Three.js — https://projects.arkon.digital/threejs/wavy-cubes/
Source: Codrops article https://tympanus.net/codrops/2026/07/09/building-an-interactive-wave-propagation-cube-grid-with-three-js/ (Franky Hung) · repo https://github.com/franky-adl/3d-wave-grid · code-source slug: wave-cube-grid

Stack (Measured — repo package.json): Vite 8, three ^0.184.0, GSAP ^3.15.0 (peripheral), lil-gui, mitt, stats.js. Post: EffectComposer = RenderPass + custom VignetteRGBShift ShaderPass + OutputPass.

Mechanism (step-by-step):
1. Grid: InstancedMesh of BoxGeometry(0.8, 3, 0.8); shipped gridSize = 40 → 1600 instances in ONE draw call (the article walkthrough builds 20×20 = 400). gap 0.01; footprint ≈ 32.4 world units. Per-instance InstancedBufferAttribute aOffset (world XZ) doubles as instance ID. MeshPhongMaterial white; castShadow + receiveShadow. Lights: ambient 0.5; directional 4.0 with shadow mapSize 1024², radius 6; second directional 1.0.
2. Pointer → world: Raycaster onto an invisible y=0 plane gives (x, z). Trail points are recorded only when the pointer moved ≥ trailSpacing 0.1 world units; each stores (x, z, age, distDelta).
3. Trail → GPU: DataTexture 128×1 RGBA float (MAX_TRAIL 128, reduced from 200 for cost); texel = (worldX, worldZ, ageSeconds, distDelta). fadeTime 2.0s; points expire at age > fadeTime*4 = 8s; texture upload skipped when idle and empty.
4. Vertex injection via MeshPhongMaterial.onBeforeCompile (after begin_vertex), applied ONLY to top vertices (if position.y > 0.0 — author's ~50% vertex saving): worldXZ = aOffset + hash2(aOffset)*uJitter (0.2). Per trail texel: dist = length(worldXZ − td.rg); wavefront = uWaveSpeed * age; relDist = dist − wavefront; window = exp(−relDist²/uWaveWidth²) (Gaussian ring centred on the expanding wavefront); fade = exp(−age/uFadeTime); atten = 1/(1 + dist*0.1); weight = fade * window * atten * distDelta (slow cursor = weak wave); waveHeight += weight * cos(uWaveFreq * relDist). Then waveHeight /= max(totalWeight, 1.0) — a weighted AVERAGE, so overlapping waves blend instead of spiking. displacement = clamp(waveHeight * uAmplitude, −uMaxHeight, uMaxHeight); transformed.y += displacement.
5. The SAME override is applied to a MeshDepthMaterial set as instancedMesh.customDepthMaterial — shadows deform identically or they detach from the cubes.
6. Colour: vHeight varying → fragment mix(uColorBase #ffffff, uColorHigh #0055ff, clamp(vHeight/uMaxHeight)); scene.background = colorBase * 0.5 (kills dark flashes in the gaps).
7. Camera: PerspectiveCamera(40, aspect, 0.1, 200) on a mouse-tilted sphere (α range π*0.03, β range π*0.05, mouse lerp 0.04/frame).

Exact parameters (shipped defaults): uWaveSpeed 6.0 world-units/s; uWaveFreq 1.2 rad/unit (article: keep ~1 for a single subtle front); uWaveWidth 3.0; uAmplitude 0.4; uMaxHeight 0.4; uJitter 0.2; uFadeTime 2.0. Post shader: shiftAmount 0.005, vignetteRadius 0.3, vignetteSoftness 0.3; vignetteFactor = smoothstep(radius, radius+softness, dist(vUv, 0.5)); r sampled at +shift*factor, b at −shift*factor; darken = 1 − factor*0.5. Idle/mobile: random trail points start immediately, resume after 3.0s of no pointer movement, one every 1.5s at strength 0.8; any real move stops them.

Rebuild notes: The production lessons are the payload: (1) pointer history as a DataTexture = zero per-frame JS math per instance; (2) weighted-average superposition; (3) distDelta speed gating; (4) depth-material parity; (5) the 3s-idle random-point mode is the mobile answer for cursor-driven heroes. The vertex block ports to any InstancedMesh + onBeforeCompile setup in vanilla Three.

Evidence: article values Measured (article); shipped values Measured (repo Stage.js/MouseTrail.js/Camera.js/package.json). Divergence (grid 20 vs 40) noted. code-source: code-source/wave-cube-grid/values.txt.

## 140 Color Customizer App for a 3D Model with Three.js — https://tympanus.net/Tutorials/3DModelCustomizer/
Source: Codrops article https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js/ (Kyle Wetton) · demo + full-source ZIP linked from the article · code-source slug: color-customizer-3d

Stack (Measured — article): three r108 global build + GLTFLoader (r92 examples/js) + OrbitControls via script tags; no bundler. Model chair.glb (~1MB) authored in Blender (Smart UV unwrap); each customisable part a separate named object: back, base, cushions, legs, supports. No shaders — the mechanism is scene-graph/material management.

Mechanism (step-by-step):
1. Scene: background 0xf1f1f1 with matching Fog(0xf1f1f1, 20, 100); camera PerspectiveCamera(50, aspect, 0.1, 1000) at z = 5; renderer antialias with setPixelRatio(devicePixelRatio) + resize handling. Model on load: scale (2,2,2), y = −1; the CSS loader overlay is removed only after scene.add(theModel).
2. Lights: HemisphereLight(0xffffff, 0xffffff, 0.61) at (0,50,0); DirectionalLight(0xffffff, 0.54) at (−8,12,8), castShadow, shadow map 1024². Floor: PlaneGeometry(5000,5000) MeshPhongMaterial(0xeeeeee, shininess 0) — hand-tuned so the lit floor matches the background and disappears — rotation.x = −π/2, y = −1, receiveShadow.
3. Part tagging: initColor(parent, type, mtl) traverses the model; any mesh whose name INCLUDES the type string gets o.material = mtl and o.nameID = type (substring matching absorbs Blender's .001/.002 duplicate suffixes).
4. Swatches: colors = [{texture wood.jpg, size [2,2,2], shininess 60}, {texture denim.jpg, size [3,3,3], shininess 0}, {color '66533C'}, {'173A2F'}, {'153944'}, {'27548D'}, {'438AAC'}]. selectSwatch builds a NEW MeshPhongMaterial per click: texture entries via TextureLoader with repeat.set(size) and RepeatWrapping on S/T; colour entries via parseInt('0x' + color); shininess defaults to 10. setMaterial(theModel, activeOption, new_mtl) swaps the material on every mesh whose nameID matches the part chosen in the options row.
5. Controls: OrbitControls enableDamping, dampingFactor 0.1, enablePan false, polar clamp [π/3, π/2], autoRotate false (autoRotateSpeed 0.2 if enabled); touch rotate/zoom native. Intro spin: initialRotation() adds π/60 to rotation.y for the first 120 frames (full 360° ≈ 2s at 60fps), then sets loaded and reveals the drag notice.
6. Loader overlay (pure CSS): wrapper perspective 120px; 100px box; 50×50px red square, @keyframes flip 1s infinite (0% rotate(0), 50% rotateY(180deg), 100% rotateY(180deg) rotateX(180deg)).

Rebuild notes: This is the template for client product configurators (the direct ancestor of trade demos like door/roof configurators): name Blender objects by part, tag once with nameID, and a swatch click is just build-material → traverse → swap. Materials are rebuilt per click rather than mutated, keeping texture/colour entries uniform. Upgrade path: MeshStandard/PhysicalMaterial drops into the same architecture. The fog-matched floor colour is the trick that makes the ground vanish.

Evidence: all values Measured (article code blocks, incl. the full-article text extraction for the parts the web reader paginates). code-source: code-source/color-customizer-3d/values.txt.

## 141 Underwater-Style Navigation Using PixiJS — https://tympanus.net/Tutorials/underwater-navigation/
Source: Codrops article https://tympanus.net/codrops/2019/04/24/how-to-build-an-underwater-style-navigation-using-pixijs/ (Liam Egan) · repo https://github.com/liamegan/underwater-navigation · code-source slug: underwater-nav-pixi

Stack (Measured): PixiJS v5 (repo credits v5-beta; bundled pixi.min.js), vanilla JS classes, WebFont loader gating init on 'Abril Fatface'. NOTE: the repo README's demo link (…/Development/underwater-navigation/) is dead (404); the live demo is the Tutorials path above, reached through the article's own step-demo links (step-1.html = semantic HTML, step-2.html = Pixi without filters, index = final).

Mechanism (step-by-step):
1. Semantic-first: the nav is a real checkbox-hack toggle + <ul class="main-nav__fallback"> of anchors. The fallback IS the accessible nav — keyboard/screen-reader users keep DOM links; the Pixi canvas is aria-hidden="true", tab-index="-1".
2. Each anchor title is rasterised to a 2D canvas (80px Abril Fatface; canvas width = measureText + 50, height = 120; fillStyle rgba(40,50,60,1); text centred, baseline bottom at height − 16) and becomes a PIXI.Sprite; sprites laid out in a centred row. PIXI.Application({backgroundColor 0xF9F9F9, window size, resolution: 2}); maskpadding default 100 so filter displacement doesn't tear at sprite edges.
3. ScreenFilter (on the stage): uniforms time (+= 0.01/frame via overridden apply), mouse (normalised 0..1), u_resolution, ratio. Fragment: centred uv; uvm = (uv − mouse)/ratio; polar warp — polar.y += smoothstep(0.1, 2.0, abs(uvm.x)*2.0); vertical squash textureCoord.y *= 1 − abs(uvm.x*1.5)*0.3; animated value-noise offset noise(uv, 10000 + sin(time)*5000) * smoothstep(0.15, 2.0, abs(uvm.x)) * 0.6; edge fade 1 − smoothstep(0.5, 1.5, length(uvm)*2). A 7-tap Jam3 fast Gaussian blur (offsets 1.4117647/3.2941176/5.1764706; weights 0.19648255/0.29690696/0.09447040/0.01038136) is defined, its two-pass call (clamped 5.0) COMMENTED OUT in the shipped code.
4. HoverFilter (per sprite, only while hovered OR focused): time += 0.01/frame; pattern = distortedFBM(vec3(uv*4, time*2)) — 3-octave value-noise fbm, double domain-warped (offsets (t−0.5), then (t−0.5)*0.6); pattern *= pattern*1.2; colour = mix(vec4(0.81, 0.33, 0, 1), white, smoothstep(0, 1, pattern)) — the source comment calls the base colour "dark blue" but the values are orange; values are of record. Output = tex.a * patternColour: the water pattern exists ONLY inside the glyph alpha.
5. Focus parity: root anchor focus → focusNavItemByIndex(i) (simulated pointer move) + same HoverFilter applied; blur removes it. pointerup triggers rootElement.click() unless dragging (drag = pointer down > 300ms).

Rebuild notes: Copy the accessibility shape for any WebGL menu: DOM nav as source of truth, canvas decorative and aria-hidden, focus events driving the GL state. Cost control: expensive filter only on the hovered sprite (bounds-limited). The L2 inspection found this demo class can freeze low-end phones — gate the fullscreen filter behind a device check when porting.

Evidence: architecture + values Measured (article + repo js/main.js read in full, both filter fragment sources verbatim). code-source: code-source/underwater-nav-pixi/values.txt.

## 143 Liquid Distortion Effects — https://tympanus.net/Development/LiquidDistortion/
Source: Codrops article https://tympanus.net/codrops/2017/10/10/liquid-distortion-effects/ · no separate repo — the article prints the full CanvasSlideshow component and timelines (code of record) · code-source slug: liquid-distortion

Stack (Measured — article): PixiJS v4-era API (PIXI.autoDetectRenderer, PIXI.filters.DisplacementFilter, PIXI.ticker.Ticker) + GSAP TimelineMax/TweenMax. No custom GLSL: the effect is Pixi's built-in DisplacementFilter driven by a displacement-map sprite.

Mechanism (step-by-step):
1. DOM-first slides: .slide-item markup (img + title) is scraped into Pixi sprites (wrapper set display:none); optional PIXI.Text child per slide (fill #ffffff, wordWrap, wordWrapWidth 400, anchor 0.5, centred).
2. One DisplacementFilter on the whole stage: displacementSprite = Sprite(displacementImage); filter = new DisplacementFilter(displacementSprite); stage.filters = [filter]. The filter offsets pixels by the map's channels × filter.scale (px).
3. Transition (moveSlider, TimelineMax, isPlaying guard): scale → (200, 200) over 1.0s (distortion ramps up FIRST) → current slide alpha → 0 over 0.5s → next slide alpha → 1 over 0.5s (crossfade hidden at peak distortion) → scale → (20, 20) over 1.0s. Total 3.0s; settles at 20, not 0, so the page keeps a subtle permanent wobble. Index wraps both ends.
4. Idle liquid crawl: the Ticker moves the MAP, not the image — displacementSprite.x += 10*delta, y += 3*delta. Component defaults: autoPlaySpeed [10, 3], displaceScale [200, 70] (walkthrough timeline uses 200/200).
5. Interactive variant: pointerover tweens filter.scale by (sin(mouseX)*100, cos(mouseY)*100) over 1s and starts a rAF spinning displacementSprite.rotation += 0.001/frame; pointerdown kicks (sin*1200, cos*200) over 1s; pointerout/up tween scale back to (0, 0) over 1s and cancel the rAF.

Exact parameters: displacement map should be power-of-2 sized (8…2048) — dimensions change the look. Component options: sprites[], texts[], displacementImage, autoPlay, autoPlaySpeed [x,y], displaceScale [x,y], fullScreen, stageWidth 800 / stageHeight 600, navElement ([data-nav]), displaceAutoFit.

Rebuild notes: The borrowable core is the timing shape — ramp distortion 20→200 (1s), crossfade at the peak (0.5+0.5s), settle (1s) — which makes ANY slideshow transition feel liquid; the Pixi filter itself is one DisplacementFilter with a scrolling map sprite. Porting caveats: needs a server context for texture loading, Safari gaps noted historically, and Pixi v5+ renames the v4 APIs used here (fromImage, autoDetectRenderer) — pin the major version or update the calls. The fetch_and_mine pass on the demo URL landed on the Codrops demo frame page (12K JS), so no bundle parameters were recoverable from the demo itself; all values above are article-Measured.

Evidence: all values Measured (article). code-source: code-source/liquid-distortion/values.txt.

## 144 Reactive Depth: Scroll-Driven 3D Image Tube with React Three Fiber — https://tympanus.net/Tutorials/3DImageTubeR3F/
Source: Codrops article https://tympanus.net/codrops/2026/02/17/reactive-depth-building-a-scroll-driven-3d-image-tube-with-react-three-fiber/ · repo https://github.com/matdn/helmet (linked from the demo page; README title matches the article) · code-source slug: reactive-depth-tube

Stack (Measured — repo package.json): Next.js 16 + React 19 + TypeScript; three ^0.182.0, @react-three/fiber ^9.4.2, @react-three/drei ^10.7.7, leva. Canvas camera [0,0,6.5] fov 50; ambient 0.5 + directional [5,5,5] intensity 1; drei Environment preset "studio" blur 10.5 for the glass helmet that shares the tube's rotation.

Mechanism (step-by-step) — one shared motion system, ALL state in useRef, zero React state in the loop:
1. Refs: scrollTarget, spinVelocity, angle, rotationSpeedScaleTarget (=1), baseSpeed = 0.25.
2. useFrame(dt): scrollCurrent += (target − current) * 0.12; spinVelocity *= Math.pow(0.92, dt*60) (frame-rate-independent damping), clamped to ±2.0; rotationSpeedScale lerps toward its target at 0.12; scaledDt = dt * rotationSpeedScale; angle += (baseSpeed*naturalDir + spinVelocity) * scaledDt.
3. Wheel input adds ENERGY, never position: spinVelocity += event.deltaY * 0.004.
4. Hover slows TIME: hovering an image sets rotationSpeedScaleTarget = 0.35; leaving restores 1. Because dt itself is scaled, inertia stays coherent while slowed.
5. Tube: rows 5 × cols 12 around radius 4; tile planes 0.72×1.0; ySpacing 2.7; loopHeight = 13.5; repeatCount 3 → 15 rendered rows. Per tile theta = ((col + rowOffset)/cols)*2π (rowOffset staggers rows); x = cos*4, z = sin*4, rotationY = −(theta + π/2) (faces outward); textures cycle. Seamless wrap: when |scrollCurrent| > loopHeight/2, BOTH scrollCurrent and scrollTarget shift by ∓loopHeight — shifting only current would snap the chase.
6. Background grid: plane 18×18 with 512×512 segments; vertex shader displaces z by edgeMask*uEdgeAmp + centerMask*uCenterAmp (masks from smoothstep on edge distance / distance to uCenter, the pointer UV lerped at 0.08/frame); fragment draws procedural grid lines with fwidth-based anti-aliasing, scrolled by uTime*uScrollSpeed in x.
7. DOM satellites: tooltip chases the pointer at lerp 0.18, custom cursor at 0.14, both on a standalone rAF outside React. Mesh pointer handlers stopPropagation so container tracking never double-fires.

Exact parameters (Measured — repo FiberScene.tsx/CodropScene.tsx): grid uniforms uGridScale 28.0, uLineWidth 0.5, uEdgeWidth 0.14, uEdgeAmp 1.35, uCenterRadius 0.22, uCenterAmp 0.9, uScrollSpeed 0.01; grid fragment: uv = (vUv + vec2(uTime*uScrollSpeed, 0)) * uGridScale; gridLine via abs(fract(coord−0.5)−0.5) with smoothstep(width*fw, (width+1)*fw, p); lines vec3(0.1) on black. The repo also ships a sphere variant (CodropScene): images on radius 4.25, y squashed ×0.92, X/Y spin velocities with per-frame ×0.92 damping and alpha = 1 − pow(0.92, dt*60).

Rebuild notes: The portable asset is the signal graph, not the tube: one velocity fed by wheel delta (×0.004), exponentially damped (0.92^(dt·60)), clamped (±2.0), plus a global time-scale lerp (hover → 0.35×) that slows everything coherently. In vanilla Three, keep a plain refs object and the same math in a rAF loop; in R3F, never put per-frame values in React state. The wrap rule (shift target with current) applies to any infinite scroller.

Evidence: article values Measured (article); geometry/uniform defaults Measured (repo sources). code-source: code-source/reactive-depth-tube/values.txt.

---

Part A totals: 11 of 11 entries completed at source level (article + demo opened for all 11; repo mined for
129, 131, 133, 136, 137, 138, 141, 144; article-as-code-of-record for 140, 143). Blocked: none.
Known source quirks logged per entry: relative-asset mining failure on 131/132 demos (worked around on the
same host / via repo), 141 README demo link dead (live demo found via the article's own step links),
143 demo fetch landed on the Codrops frame page (article used as code of record).
Permission cards: none encountered. 429s: none.

# Deep Reads — Slice 3, Part B (queue 145–157, 12 entries)

Code-level reverse analyses. Every value labelled Measured was read from the demo/repo/article source on disk in `code-source/<slug>/` (see each slug's `values.txt` for the full parameter dump). Zero permission cards, zero 429s encountered in this part.

---

## 145 WebGL Distortion Hover Effects — https://tympanus.net/Development/DistortionHoverEffect/

**Source** · Article: tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/ · Library repo: github.com/robin-dela/hover-effect · Demo + library source (`hover.js`, 7,130 B) downloaded and read in full.
**Stack (Measured)** · Three.js (WebGL) single-quad shader per element · GSAP TweenMax (drives the transition uniform) · imagesLoaded (init gate).
**Mechanism (step by step)** · 1) Each figure holds two images + a `data-displacement` map; the library swaps them for one canvas sized to the parent. 2) Both photos and the displacement map upload as textures on a `PlaneBufferGeometry(w, h, 1, 1)` viewed by an exactly-fitted OrthographicCamera — all distortion happens in the fragment shader, the mesh never deforms. 3) The shader samples only the displacement texture's **red channel**: image 1 is sampled at `uv.x + dispFactor * (disp.r * effectFactor)`, image 2 at `uv.x − (1.0 − dispFactor) * (disp.r * effectFactor)`, and the two are cross-faded with `mix(tex1, tex2, dispFactor)`. 4) Hover tweens `dispFactor` 0→1 over `speedIn` (TweenMax, chosen easing) so the pair melts through each other along the map's shapes; leave tweens back over `speedOut`. 5) `next()`/`previous()` expose the same tween programmatically; on touch devices enter/leave become touchstart/touchend.
**Exact parameters** · Defaults: intensity 1, speedIn 1.6 s, speedOut 1.2 s, easing Expo.easeOut. Displacement texture: RepeatWrapping, LinearFilter; image textures get max anisotropy; renderer antialias false. Demo's 11 instances: intensity −0.8, −0.65, −0.4, −0.1, 0.2 (×2), 0.4, 0.6 (×2), 0.7, 0.9 (negative = reversed melt direction); displacement maps 1.jpg, 2.jpg, 4.png, 6.jpg, 7.jpg, 8.jpg (×2), 10.jpg, 11.jpg, 13.jpg, 15.jpg; easing overrides Sine.easeOut, Circ.easeOut, Power2.easeOut, power2.easeInOut; per-instance speed pairs across 0.3–1.6 s.
**Rebuild notes** · Any grayscale texture works as the map; blobby high-contrast maps give the classic liquid look. Keep |intensity| ≈ 0.2–0.9 for tasteful portfolio use. One canvas per hover target — cap concurrent instances on a page.
**Evidence** · Article opened; demo opened; library + demo source read (Measured). **Slug:** `webgl-distortion-hover-effects`

## 146 On-Scroll Morphing Background Shapes — https://tympanus.net/Development/MorphingBackgroundShapes/

**Source** · Demo source read in full (`js/demo1.js`, 12,447 B) · Repo: github.com/codrops/MorphingBackgroundShapes · No separate article URL located (a CodePen copy by minijuji123, pen wvKGLbo, mirrors the code with one offset difference, noted below).
**Stack (Measured)** · Anime.js (path morph + element transforms) · scrollMonitor (section triggers) · imagesLoaded (init gate) · One fixed background SVG, `<svg class="morph" width="1400" height="770" viewBox="0 0 1400 770">` inside a fixed `.morph-wrap`.
**Mechanism (step by step)** · 1) A single blob `<path>` sits fixed behind all content, oversized so edges never show. 2) Each of the 5 content sections + footer owns a shape state: a `path` geometry, a `pathAlt`, and an SVG-level transform (scaleX/scaleY/rotate/translateX/translateY). 3) `scrollMonitor.create(section, -300)` fires on enter/exit; anime.js morphs the path's `d` to the section's geometry while simultaneously tweening the whole SVG's transform — geometry + gross transform together read as organic motion. 4) When the morph completes, `initShapeLoop()` starts an infinite alternate loop path → pathAlt (3500 ms) → path (3500 ms), easing linear, so the blob breathes forever. 5) Foreground items get a TiltObj: image layer translates {x: −10, y: −10}, title {x: 25, y: 25} with the mouse; mouseleave returns over 1500 ms, easeOutElastic, elasticity 400.
**Exact parameters** · All 6 states: fill #282faf, colour tween 500 ms linear. Path tweens: 3000/2000/3000/3000/3000/3000 ms, easeOutElastic elasticity 600 (shape 4 + footer: easeOutQuad). SVG transform tweens: 2000/2000/2500/3000/2000/3000 ms easeOutElastic (shape 5: easeOutExpo). Extremes: shape 1 scaleX 1.2, tx −30, ty −300; shape 2 scaleX 0.4, scaleY 1.4, ty −100; shape 3 scale 0.7/1.1, rotate −20, tx 200, ty 200; shape 5 scale 1.8/1.5, tx 250, ty 50; footer scale 2.5/2. Shape 1 path: "M -71.09,102.028 C 12.704,91.818 73.489,25.238 161,14 C 259.86,1.298 338.87,41.516 387.78,104.03 C 436.69,166.53 368.83,211.02 272,213 C 175.17,215 90.36,217.213 -71.09,102.028 Z" (all six path/pathAlt pairs verbatim in values.txt / demo1.js). scrollMonitor offset −300 (the CodePen mirror uses −350; demo1.js governs).
**Rebuild notes** · All morph targets must share identical path command structure (M + 4 cubic segments + Z) or the `d` interpolation breaks. Vary geometry/transform per section, keep one brand fill throughout.
**Evidence** · Demo opened; demo1.js + CSS read (Measured). **Slug:** `morphing-background-shapes`

## 147 Shape Hover Effect with SVG — http://tympanus.net/Tutorials/ShapeHoverEffectSVG/

**Source** · Article: tympanus.net/codrops/2014/01/07/shape-hover-effect-with-svg/ · Repo: github.com/codrops/ShapeHoverEffectSVG · All three demo pages (index, index2, index3) fetched; inline scripts + markup read.
**Stack (Measured)** · Snap.svg path morphing (mina easings) · CSS grid + absolutely positioned SVG overlay per card · No build step.
**Mechanism (step by step)** · 1) Each card is an `<a>` wrapping a `<figure>`: photo, an inline SVG whose single white path covers the photo's lower part with a shaped edge (diagonal / wave / chevron), and a caption pushed down 50 px. 2) The hover geometry lives in the anchor's `data-path-hover` attribute; init reads the path's current `d` as "from" and the attribute as "to". 3) mouseenter: Snap animates `{path: to}` at the demo's speed/easing — the shape retracts upward, uncovering photo. mouseleave reverses. 4) In parallel the caption text transitions translateY(50px) → 0 over 0.3 s CSS, rising into the vacated space.
**Exact parameters** · Demo 1: speed 250 ms, mina.easeinout; viewBox "0 0 180 320", preserveAspectRatio "none", svg absolute top −1px, fill #fff; from "M 180,160 0,218 0,0 180,0 z" → to "m 180,34.57627 -180,0 L 0,0 180,0 z". Demo 2: speed 330 ms, mina.backout; from "m 0,0 0,171.14385 c 24.580441,15.47138 55.897012,24.75772 90,24.75772 34.10299,0 65.41956,-9.28634 90,-24.75772 L 180,0 0,0 z" → to "m 0,0 0,47.7775 c 24.580441,3.12569 55.897012,-8.199417 90,-8.199417 34.10299,0 65.41956,11.325107 90,8.199417 L 180,0 z". Demo 3: speed 300 ms, mina.backout; from "M 0 0 L 0 182 L 90 126.5 L 180 182 L 180 0 L 0 0 z" → to "M 0,0 0,38 90,58 180.5,38 180,0 z". Grid: figures at 33.333% width, breakpoint 58em.
**Rebuild notes** · Both path states need identical command counts for Snap to interpolate. The 180×320 viewBox with preserveAspectRatio "none" stretches one shape over any card aspect. backout (300–330 ms) = playful; easeinout (250 ms) = sober. A 2014 technique that still ports 1:1 to GSAP `attr:{d}`.
**Evidence** · Article opened; all 3 demo pages fetched and read (Measured). **Slug:** `shape-hover-effect-svg`

## 148 Superhero Animation Effect with SVG Filters — https://tympanus.net/codrops/2021/08/09/superhero-animation-effect-with-svg-filters/

**Source** · Article read in full (both halves); no hosted demo or repo exists — the article's code blocks are the source.
**Stack (Measured)** · Inline SVG (viewBox "0 0 196 296") layered `<image>` artwork · SVG filter primitives feTurbulence + feDisplacementMap · SVG masks animated by GSAP · lodash.throttle (interactive variant).
**Mechanism (step by step)** · 1) Stack the scene as image layers in one SVG; duplicate "transformed" layers are hidden by masks whose white rect (100%×100%) is parked at y=−100%. 2) The key trick: the distortion filter is applied to a `<g>` WRAPPING each mask rect — the filter stays fixed in space while the mask moves through it, so the reveal edge is a wavy liquid boundary. 3) GSAP animates the mask rect's translateY 0→100% (or 296 px), sweeping the distorted edge down the picture and revealing the transformed layer (the article's Mystique morph). 4) Simultaneously the background rect's fill tweens, flipping the scene's mood colour. 5a) Autoplay: timeline repeat −1, yoyo true. 5b) Interactive: timeline paused with ease 'none'; mousemove maps relative cursor Y to `tl.progress(relPos)` — the user wipes the transformation by hand.
**Exact parameters** · Filter `#distort`: feTurbulence type="turbulence" baseFrequency 0.08, numOctaves 2, result "turbulence" → feDisplacementMap in="SourceGraphic" in2="turbulence" scale 50. Background rect fill #4a5eb2 → tweened to #ffd11b, duration 2, at position '<+=1'. Mask tween: translateY '100%' (or 296 px), duration 3. Interactive throttle: 60 ms. Page CSS: body radial-gradient(at top, #5e4082, #3a124d); .picture height 80vh, drop-shadow(2px 4px 6px rgba(0,0,0,0.5)).
**Rebuild notes** · Natural fit for before/after reveals (old site → new site hero). Scale 50 is strong; 20–35 reads subtler. Author's own warning: animated SVG filters are Chrome-best and can slow pages — keep the filter on the small mask group only, never the artwork; prefer WebGL for heavy production use.
**Evidence** · Article opened and fully read; code blocks Measured from article. **Slug:** `superhero-svg-filters`

## 149 Building an Infinite Marquee Along an SVG Path with React & Motion — https://tympanus.net/codrops/2025/06/17/building-an-infinite-marquee-along-an-svg-path-with-react-motion/

**Source** · Article by Daniel Petho, read in full; all 26 code blocks extracted from the article HTML. No public repo found (author's GitHub repo list checked via API) and no separate demo link — article code is the source.
**Stack (Measured)** · React + Motion (`motion/react`: useMotionValue, useTransform, useAnimationFrame, useScroll, useVelocity, useSpring) · CSS Motion Path (offset-path / offset-distance / offset-rotate) for placement · D3 (scaleLinear, line/curveBasis, getTotalLength/getPointAtLength) for responsive path rescaling.
**Mechanism (step by step)** · 1) One MotionValue `baseOffset` is the single clock: `useAnimationFrame` advances it by `baseVelocity * delta / 1000` (% of path length per second). 2) Items are the children × `repeat`, flattened with useMemo; itemIndex = repeatIndex × childCount + childIndex. 3) Each `MarqueeItem` derives its own `offsetDistance` via useTransform: position = itemIndex × 100 / totalItems; wrapped = wrap(0, 100, clock + position) — perfectly even spacing, seamless wrap. The browser's CSS motion-path engine places and auto-rotates each item along the path string; the visible SVG is only a guide. 4) zIndex = floor(zIndexBase + progress%) so items stack correctly where the path self-overlaps. 5) Hover: a ref flips the hover-factor target to 0.3; a spring smooths it, and moveBy is multiplied by the factor — the marquee glides slower. 6) Scroll: scrollY velocity is sprung, mapped [0, 1000] → [0, 5] (clamp false); its sign sets directionFactor ±1 and its magnitude boosts moveBy — flicking the page reverses/speeds the marquee. 7) Edge fade per item: opacity = (1 − |2p − 1|^10)^2. 8) Responsiveness: because offset-path percentages live in the path's own coordinate space, the path is re-derived at container pixel size on resize — D3 samples ≤100 points via getPointAtLength, rescales with scaleLinear, and regenerates a smooth path with line().curve(curveBasis).
**Exact parameters** · Demo path: "M0 186.219C138.5 186.219 305.5 194.719 305.5 49.7188C305.5 -113.652 -75 186.219 484.5 186.219H587.5"; viewBox "0 0 588 187". baseVelocity 20 (single-item demo), 5 (final: 5 cards × repeat 4 = 20 items). Hover factor 0.3; hover spring stiffness 100, damping 20. wrap() = ((((v − min) % range) + range) % range) + min. parsePathToPoints maxSamples default 100. Not printed in the article (stated honestly): the numeric `springConfig` for the scroll spring and the `zIndexBase` value — both are referenced by name only in the published excerpts.
**Rebuild notes** · Keep children × repeat high enough that item spacing < item width, or a gap shows at the wrap point. The D3 resampling step is the part most reimplementations skip — without it the marquee drifts off the drawn curve on resize.
**Evidence** · Article opened and fully extracted (Measured from article code). **Slug:** `infinite-marquee-svg-path`

## 150 Dynamic Shape Overlays with SVG — https://tympanus.net/Development/ShapeOverlays/

**Source** · Article: tympanus.net/codrops/2017/10/17/dynamic-shape-overlays-with-svg/ · Original technique repo: github.com/ykob/shape-overlays · Demo class source (`js/demo1.js`, `demo2.js`, `demo3.js`, `easings.js`) downloaded and read in full.
**Stack (Measured)** · Vanilla JS `ShapeOverlays` class + requestAnimationFrame loop (no animation library) · Inline SVG `<svg class="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">` with stacked paths (demo 1: 3) · Hand-ported glsl-easings (cubicInOut: t<0.5 ? 4t³ : 0.5·(2t−2)³+1).
**Mechanism (step by step)** · 1) A fixed full-screen SVG holds 2–4 same-geometry paths in different colours. 2) On toggle, the class precomputes a per-point delay wave: range = 4·random + 6 (6–10); delay[i] = (sin(−radian) + sin(−radian·range) + 2) / 4 × delayPointsMax, radian = i/(numPoints−1)·π — re-randomised every toggle so the edge never ripples the same way twice. 3) Each RAF frame, every point's Y = cubicInOut(clamp((time − delay[i]) / duration, 0, 1)) × 100, and the path string is rebuilt: start `M 0 0 V {p0}` (opening) and one cubic segment per point with the control point X at the midpoint between point X positions, closing `V 0 H 0` / `V 100 H 0`. The curtain's leading edge is a living curve, not a straight line. 4) Layers chase each other delayPerPath apart; closing runs the layer order in reverse. 5) The loop stops at duration + delayPerPath·(paths−1) + delayPointsMax; an isAnimating flag guards re-entry; nav items just toggle classes in sync.
**Exact parameters** · Demo 1: numPoints 18, duration 600 ms, delayPointsMax 300 ms, delayPerPath 100 ms; fills #413f46 / #e6e5ea / #cccccc. Demo 2: numPoints 4, duration 800, delayPointsMax 180, delayPerPath 70; delay formula (sin(radian + range) + 1)/2 × max with radian over 2π and range = random × 2π. Demo 3: numPoints 2, duration 600, delayPointsMax 0, delayPerPath 200; per-path easing swap — opening (i==1 ? cubicOut : cubicInOut), closing (i==1 ? cubicInOut : cubicOut).
**Rebuild notes** · The classic full-screen menu / page-transition curtain. Demo 1 config (18 points, 600 ms, 300 ms wave) = liquid; demo 3 (2 points, 200 ms stagger) = snappy wipe. Randomising `range` per toggle is what stops it feeling canned.
**Evidence** · Article opened; demo opened; class + easings source read (Measured). **Slug:** `dynamic-shape-overlays`

## 151 Elastic SVG Elements — http://tympanus.net/Development/ElasticSVGElements/

**Source** · Article: tympanus.net/codrops/2014/12/15/elastic-svg-elements/ · Repo: github.com/codrops/ElasticSVGElements · Demo pages fetched and read: index (sidebar), drag.html, button.html; six further variant pages exist (hamburger, circlemenu, collapseexpand, dropdown, inputs, pullupmenu) on the same pattern.
**Stack (Measured)** · Snap.svg path morphs with mina easings · classie.js · Draggabilly (drag demo) · Shape states stored as `data-morph-*` attributes; the inline path `d` is the reset state.
**Mechanism (step by step)** · 1) Every component keeps 2–3 states of one path topology: reset (inline `d`), open/active and close (data attributes). 2) On interaction, Snap's `animate({path: target}, speed, easing)` interpolates the `d` strings. 3) The signature move is two-stage: a fast plain-eased jump to an exaggerated state (50–350 ms), then a slow release back to reset (600–800 ms) with mina.elastic or mina.bounce — overshoot-and-settle is what reads as "elastic". 4) Content state (menu open class) flips 250 ms after the shape starts, so the shape visibly leads the content.
**Exact parameters** · Sidebar: .morph-shape width 240 px, height 100%; svg viewBox "0 0 600 800", preserveAspectRatio "none"; path stroke #5f656f, stroke-width 5. Reset d "M300-10c0,0,0,164,0,410c0,232,0,410,0,410"; data-morph-open "M300-10c0,0,295,164,295,410c0,232-295,410-295,410"; data-morph-close "M300-10C300-10,5,154,5,400c0,232,295,410,295,410". Toggle: 350 ms mina.easeout to open/close, then 800 ms mina.elastic back to reset; class delay 250 ms. Drag demo per-item {reset/active speed, easing}: {100/100, easeinout/easeinout}, {800/100, elastic/easeinout}, {600/50, bounce/easeout}. Button demo: {800/150, elastic/easein}, {650/650, elastic/elastic}.
**Rebuild notes** · Port = GSAP `attr:{d}` with an elastic ease on the RETURN leg only; keep the out-leg short and plain. All states must share identical path command structure. Best modern use: menu buttons, toggles, checkbox/tick shapes — micro-interactions, not page furniture.
**Evidence** · Article opened; demo opened; 3 demo pages' inline scripts + attributes read (Measured). **Slug:** `elastic-svg-elements`

## 152 GSAP getScrollLookup() helper — fake horizontal scrolling — https://codepen.io/GreenSock/pen/zYeZmVw

**Source** · GreenSock pen opened; full JS visible on the pen page and read.
**Stack (Measured)** · GSAP + ScrollTrigger + ScrollToPlugin · Pinned horizontal-scroll section driven by vertical page scroll.
**Mechanism (step by step)** · 1) Pin the container and scrub a horizontal `x` tween of the panel strip over a long vertical scroll distance (2000 px per panel). 2) The problem solved: anchors to sections INSIDE the horizontal strip have no document scroll position — their position is a function of the container animation's progress. 3) `getScrollLookup` pre-creates one ScrollTrigger per target measured in container-animation space (refreshPriority −10 so they measure after the main pin). 4) The returned lookup converts: targetPos = mainST.start + (targetStart / containerDuration) × (mainST.end − mainST.start); without a containerAnimation it returns the target trigger's own start. An isParent flag resolves parentNode targets; misses log "target not found". 5) Nav click → ScrollToPlugin tweens window scroll to the computed position (1 s); the scrubbed horizontal tween follows and the target panel lands centred.
**Exact parameters** · Horizontal tween: `x: () => -(panelContainer.scrollWidth - window.innerWidth - 50)`, ease "none"; ScrollTrigger pin true, scrub 1, end `"+=" + panels.length * 2000`. Lookup built as `getScrollLookup(".section", { start: "center center", containerAnimation: scrollHorizontalTween })`; helper start default "top top", refreshPriority −10. Nav scroll: duration 1, overwrite "auto". Variant seen in Level 2 (start "top 125px", pinSpacing false) is a usage variant; pen values govern.
**Rebuild notes** · The reusable pattern for any horizontal-scroll site with in-page nav. Create the lookup AFTER the container tween exists, and keep refreshPriority −10.
**Evidence** · Pen opened; code read on pen page (Measured). **Slug:** `gsap-getscrolllookup`

## 153 GSAP Pin Sidebar — https://codepen.io/akapowl/pen/poRdoLV/9b99361db3839f1169cdc0f278746ee5

**Source** · Pen by akapowl; the hash-suffixed URL is required (bare /pen/poRdoLV 404s). Full HTML/CSS/JS captured from the hash URL. A "- 2" fork (pen JjEOwoP) and a GreenSock variant (pen NWprdPM) exist — variants only, not this entry.
**Stack (Measured)** · GSAP + ScrollTrigger · Two scrubbed timelines on one pinned section · Vanilla CSS layout.
**Mechanism (step by step)** · 1) A full-height section holds N "points" (image + article pairs) all absolutely stacked at top 0, plus a slim vertical indicator rail with one segment per point. 2) The pinner timeline pins the section wrapper for exactly +100% of scroll so the stack stays in view. 3) The points timeline is scrubbed over 100% of viewport height per point: at each unit position the current point enters (image fades in, article rises from y 100 with autoAlpha), its indicator lights orange (0.25), and at +0.75 the point exits upward (y −100, fade out) and the indicator dims — a scroll-driven carousel with a progress rail. 4) Stacked-absolute layout means all motion is transform/opacity only; no layout shift.
**Exact parameters** · Points timeline: duration = points.length; ScrollTrigger trigger ".philosophie", start "top bottom", end "+=" + (100 × points.length) + "%", scrub true, id "points". Pinner: trigger ".philosophie.wrapper", start "top top", end "+=100%", scrub true, pin ".philosophie.wrapper", pinSpacing true, id "pinning", markers true (left on in the pen). Per point i (at position i): indicator backgroundColor → "orange" 0.25; img from autoAlpha 0; article from autoAlpha 0 + y 100; exits at i + 0.75 for all but the last point (indicator → "#adadad" 0.25). CSS: .indicators absolute left 2rem, margin 10vh 0, height 80vh, width 3px, flex column space-between, display none until JS sets flex; .point height 100vh, padding 4rem, flex; article flex-basis 60%; img flex-basis 25%, max-width 25vw.
**Rebuild notes** · Keep the pin timeline separate from the content timeline — pin distance = one viewport, content distance = 100% × point count; the split keeps the maths clean. Remove markers:true for production. Strong pattern for services/process sections on trade sites.
**Evidence** · Pen opened via hash URL; source read (Measured). **Slug:** `gsap-pin-sidebar`

## 154 How to scale smoothly the container on scroll using ScrollTrigger — https://codepen.io/popjrluq-the-selector/pen/VwNvVWP

**Source** · Pen by popjrluq-the-selector. The pen page itself rendered only its settings panel; the full CSS+JS were recovered from the CodePen embed crawl in search results — embed-excerpt evidence, labelled as such (not a direct pen-page code read).
**Stack (Measured from embed excerpt)** · GSAP + ScrollTrigger · CSS background-attachment: fixed parallax layers inside a pinned fixed-width container.
**Mechanism (step by step)** · 1) A 1320 px "browser window" container (rounded blue top bar) is pinned when its top reaches 12% of the viewport (clamped start). 2) Inside, two stacked background layers (.imgOwl.inner / .imgOwl.extra) with background-attachment: fixed are counter-shifted by scrubbed backgroundPosition tweens (−550 px vs +5 px) — a depth/parallax reveal inside the frame as the page scrolls past. 3) toggleActions "restart pause reverse pause" replays the timeline on re-entry.
**Exact parameters** · ScrollTrigger: trigger ".imgOwl", pin '.container', scrub 1, markers true, start "clamp(top 12%)", end "bottom top", toggleActions "restart pause reverse pause"; tween force3D true. Tweens: ".imgOwl.inner" backgroundPosition → "0px -550px" ease power1.out; ".imgOwl.extra" → "0px 5px" power1.out at "<". CSS: .imgOwl 1320 × 540 px, clip-path inset(0); header 1320 × 80 px, border-radius 24 px top corners; SVG wave divider at top 460 px, transform scale(0.6) (Level 2 measured it 480 × 40).
**Rebuild notes — honest gap** · Despite the title, the pen as published does NOT scale the container: its scale step is an empty `.from(".container", {})` placeholder at "<". What actually ships is pinned-container background parallax. A rebuild wanting the titled effect must add the scale itself (e.g. `.from(".container", {scale: 0.85, transformOrigin: "center"})`) — that addition is our inference, not the pen's code.
**Evidence** · Pen page opened (settings only); code via embed excerpt in search crawl (Seen/excerpt, labelled). **Slug:** `scale-container-scrolltrigger`

## 156 How to Create a Motion Hover Effect for a Background Image Grid — http://tympanus.net/Tutorials/ImageGridMotionEffect/

**Source** · Article: tympanus.net/codrops/2020/06/10/how-to-create-a-motion-hover-effect-for-a-background-image-grid/ · Repo: github.com/codrops/ImageGridMotionEffect · Demo bundle (`demo1.151408fb.js`) downloaded and grepped — lerp 0.07, stagger amount 0.6, Expo.easeOut and getRandomNumber all present in the shipped bundle; grid CSS measured from the demo's base CSS; the article's printed move()/intro code matches the bundle.
**Stack (Measured)** · GSAP (gsap.set in the loop; Expo.easeOut intro) · Vanilla Grid/GridItem classes · Oversized CSS-grid background layer behind hero content, pointer-events none.
**Mechanism (step by step)** · 1) A decorative grid of small images sits behind the hero, 10% larger than the viewport and offset −5%/−5%, so translating it never exposes an edge. 2) At init each item draws its own random roam amplitude (15–60 px, separately for x and y) — the variance makes the field feel organic rather than one rigid block chasing the cursor. 3) A single RAF loop maps cursor position to a per-item target translation (−amp…+amp across the window) and lerps the current translation toward it at 0.07/frame, applied with gsap.set — opposite sides of the grid drift in opposite directions, so the field shears around the pointer. 4) Entrance: items start at scale 0.7 / opacity 0 and bloom to scale 1 over 2 s, Expo.easeOut, with a centre-out grid stagger (amount 0.6 s).
**Exact parameters** · .grid: position absolute, width 110%, height 110%, top −5%, left −5%, grid-template-columns/rows: repeat(50, 2%), pointer-events none. GridItem.move(): xstart/ystart = getRandomNumber(15, 60); tx = lerp(tx, map(mousepos.x, 0, winsize.width, −xstart, xstart), 0.07), same pattern for ty. Intro: duration 2, ease Expo.easeOut, stagger {amount: 0.6, grid: 'auto', from: 'center'}, from scale 0.7, opacity 0.
**Rebuild notes** · Lerp 0.07 at 60 fps reaches ~99% of target in ~1 s — that's the floaty lag; 0.12 tightens it. pointer-events:none is essential. Works with any tile content (photos, logos, icons) as a living hero backdrop.
**Evidence** · Article opened; demo opened; bundle + CSS mined on disk (Measured). **Slug:** `image-grid-motion-effect`

## 157 Push Animation on Grid Items — http://tympanus.net/Development/PushGridItems/

**Source** · Article: tympanus.net/codrops/2024/06/05/push-animation-on-grid-items/ (read) · Repo: github.com/codrops/PushGridItems · All three demo scripts downloaded and read: `js/index.js`, `js/demo2/index.js`, `js/demo3/index.js`, plus base.css.
**Stack (Measured)** · GSAP + Flip plugin · CSS Grid with explicit per-item grid-area placements — position changes are class toggles and Flip animates the delta · imagesloaded preload gate.
**Mechanism (step by step)** · 1) A 7×7 grid collage: every item owns a fixed grid-area; the layout IS the animation data — "pushing" an item means changing only its row or column to an edge (1 or 7). 2) On click, capture Flip state of everything. 3) The clicked image element is reparented into a separate `.fullscreen` element (its grid item gets zIndex 99) and Flip.from animates it from its grid rect to fullscreen with scale:true. 4) Every other item is classified against the clicked rect (bottom < clicked.top → north; top > clicked.bottom → south; right < clicked.left → west; left > clicked.right → east) and its edge class toggled; Flip.from then replays all of them from captured rects to their new edge positions — they read as physically pushed away by the expanding image. 5) Clicking again toggles the classes off and reparents the image back; Flip returns everything.
**Exact parameters** · Grid vars: --rows 7, --columns 7 (one breakpoint raises columns to 8); templates repeat(var(--rows/--columns), 1fr). Item placement example: .pos-9 { grid-area: 3 / 5 / 4 / 6; }. Push classes override one axis only: .pos-north { grid-row: 1; } .pos-south { grid-row: var(--rows); } .pos-west { grid-column: 1; } .pos-east { grid-column: var(--columns); }. Demo 1: defaults duration 0.9, ease 'expo'; Flip.from {scale: true, prune: true}. Demo 2: duration 1, ease 'expo.inOut'; Flip.getState with props 'borderRadius'; pushed items rotation = gsap.utils.random(-50, 50) entering fullscreen, 0 leaving. Demo 3: duration 0.6, ease 'expo'; direction read from the clicked item's data-direction-items — ALL items move in that one direction.
**Rebuild notes** · No coordinate math at all — the grid does the geometry, Flip does the motion. Demo 2's random ±50° rotation is the playful variant; demo 3's uniform data-direction push suits directional page transitions and gallery openers.
**Evidence** · Article opened/read; demo opened; all 3 demo scripts + CSS read (Measured). **Slug:** `push-grid-items`

# Deep Reads — Slice 3, Part C (queue 158–170)

Worker: Lane 3 helper, for Lane 1 (Design Bank). All sources gathered 26 Oct 2026. Evidence labels: **Measured** = read directly from source code / article code excerpts · **Seen** = observed in a listing/page render without source access · **Inferred** = mechanism interpretation. No permission cards were encountered anywhere in Part C; no 429s. Route failures: CodePen direct asset URLs (Cloudflare block — worked around via embed preview), Behance (JS cookie challenge + HTTP 403 — logged, not retried after the denial).

---

## 158 The Never Ending Story: Seamless Infinite Scroll with GSAP & Lenis — https://tympanus.net/codrops/2026/05/28/the-never-ending-story-building-a-seamless-infinite-scroll-experience-with-gsap-lenis/

**Source.** Codrops tutorial by Joe Ben Taylor, reverse-engineering his client site for artist Jillian Phyllis (original build: Next.js + TypeScript + Styled Components; the tutorial strips it to vanilla JS). Demo opened first-contact: https://tympanus.net/Tutorials/InfiniteScrollParallax/ (three fullscreen hero sections — Founder/Creator, Producer/Executive, Psychic/Celebrity — images assets/01–03.webp). Tutorial repo mined: github.com/joebentaylor1995/infinite-scroll-with-parallax (`scripts.js`, `styles.css`, `index.html` copied into the code-source folder). fetch_and_mine ran on the demo host but captured only the Codrops frame chrome — the demo's real JS/CSS load from cross-host CDNs (cdnjs/unpkg) and are skipped by the one-host discipline; the article + repo are the Measured source.

**Stack (Measured).** Vanilla HTML/CSS/JS · GSAP 3.12.5 + ScrollTrigger (cdnjs) · Lenis 1.3.23 + lenis-snap (unpkg) + lenis.css · Fonts: Inter Tight, Ms Madi (Google Fonts), Druk Trial (cdnfonts).

**Mechanism (step-by-step).**
1. Build a fixed clipping stage: `.wrapper { position: relative; height: 100svh; overflow: hidden }` containing `.content` with the page sections. The window never scrolls — Lenis scrolls the content inside the wrapper.
2. Make the content loopable: markup holds 3 `.hero` sections (each `height: 100svh; overflow: clip`) plus a 4th section that is an exact duplicate of the first, marked `aria-hidden="true"`. The duplicate is what an infinite wrap lands on, so the jump is invisible.
3. Create a nested Lenis instance: `new Lenis({ infinite: true, wrapper, content, syncTouch: true })`. `infinite: true` wraps the scroll position; `syncTouch: true` (in the shipped repo version) keeps touch scrolling in sync.
4. Add snapping: `new Snap(lenis, { type: 'mandatory', debounce: 500, duration: 0.9, easing: t => 1 - Math.pow(1 - t, 4) })`, then `snap.addElements(sections, { align: 'start' })` so every hero settles flush at the top.
5. Bridge ScrollTrigger to the non-window scroller: `ScrollTrigger.scrollerProxy(wrapper, { scrollTop(value) { return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll }, pinType: 'transform' })`, and give every ScrollTrigger `scroller: wrapper`.
6. Run one clock: `lenis.on('scroll', ScrollTrigger.update)`; `gsap.ticker.add(t => lenis.raf(t * 1000))`; `gsap.ticker.lagSmoothing(0)`.
7. Parallax: each hero's `picture` sits `position: absolute; inset: 0; z-index: -1` with the `img` at `object-fit: cover`. A scrubbed tween moves the picture `yPercent: -50 → 50`, `ease: 'none'`, `start: 'top bottom'`, `end: 'bottom top'`, `scrub: true`, `fastScrollEnd: true` (repo version) — the image is taller than the section's visible band, so it drifts slower than the scroll without ever exposing an edge.
8. Repo-only extra: each hero embeds a curved SVG marquee (OSMO Curved Marquee component, heavily customised; the two marquees run at different speeds) that scales `1.5 → 0.5` on the same scrub settings, adding depth as sections pass.

**Exact parameters.** Sections: 100svh each, 3 + 1 duplicate. Snap: mandatory, debounce 500 ms, duration 0.9 s, easeOutQuart `1-(1-t)^4`. Parallax: yPercent −50→50, linear, full section traversal. Marquee scale 1.5→0.5. Chrome CSS: header/footer fixed, z-index 12, padding 1.2rem; link hover opacity 0.5 with `transition: opacity 0.4s cubic-bezier(0.430, 0.195, 0.020, 1)`; mobile breakpoint 700 px; helper beziers `--bezzy: cubic-bezier(0.8,0,0,1)`, `--bezzy3: cubic-bezier(0.5,0,0,1)`; root font-size 62.5% (1rem = 10px).

**Rebuild notes.** The three load-bearing decisions: (1) scroll inside a clipped 100svh wrapper, not the window; (2) duplicate the first section — Lenis infinite mode does the wrap, the duplicate makes it seamless; (3) scrollerProxy with `pinType: 'transform'` is mandatory or ScrollTrigger measures the wrong scroll. Drop the snap and it still loops; drop the duplicate and it visibly jumps.

**Evidence labels.** Stack/parameters: Measured (article + repo source read in full). Mechanism: Measured, with the seam explanation Inferred.

**code-source slug:** `infinite-scroll-parallax`

---

## 160 Roofing website. Construction website — Behance project (confirmed on Behance's "Self-construction Projects" category listing; no gallery URL could be evidenced)

**Source.** Behance design presentation by **Jannatul Naima Mishu** — **142 appreciations, 391 views** (Seen, from Behance's own category listing).

**Status: BLOCKED — no code source exists, and the project page itself could not be reached.** This entry is design-only by nature (a Behance presentation), but even the section-by-section design analysis the task calls for was impossible: the gallery page content was never retrievable, so no hero/services/proof/CTA breakdown is offered — inventing one from a listing title would be fabrication.

**Routes logged (6 attempts, 4+ distinct):**
1. Web search, exact title → returned Behance category/search listings only; no project gallery URL.
2. Web search, author name + title → no project hit.
3. browser.open of the verbatim category URL from the search results (https://www.behance.net/search/projects/self-construction?locale=zh_CN) → project confirmed present with the metadata above; the extracted text exposes no gallery href.
4. curl of the Behance search page → 453-byte JavaScript cookie-challenge page (no content).
5. Web search `"behance.net/gallery" roofing …` → unrelated results only.
6. browser.open of a Behance search URL → HTTP 403; per instruction the denied request was not retried.

**What is known (Seen, listing-level only).** Title "Roofing website. Construction website"; author Jannatul Naima Mishu; categorised under Self-construction Projects; 142 appreciations / 391 views at time of listing read. No linked live site could be evidenced. If a gallery URL is later supplied, this entry can be completed as a Seen/Derived design analysis (hero, services, proof, CTA, type/colour system) — no code parameters will ever exist for it.

**Evidence labels.** Metadata: Seen. Everything else: unavailable.

**code-source slug:** none — design-only source

---

## 161 GSAP Marquee Text — https://codepen.io/GreenSock/pen/wvZMwez

**Source.** Official GreenSock CodePen "GSAP Marquee Text" (pen wvZMwez). Routes: (1) direct pen asset URLs (.js/.css/.html) → Cloudflare "Attention Required" block pages, no code; (2) pen page via browser.open → extraction returned the compiled CSS + HTML only, no JS; (3) **embed preview URL succeeded** — https://codepen.io/GreenSock/embed/preview/wvZMwez?default-tabs=js%2Cresult exposed the full JS source, which is the Measured source below.

**Stack (Measured).** GSAP core only — the seamless-loop helper is fully self-contained in the pen (no plugins). Page furniture is Tailwind (CDN, v3.3.3 compiled output visible in the page CSS — preflight/utilities, not part of the mechanism) plus one hand-written marquee rule.

**Mechanism (step-by-step).**
1. Markup: a `<footer>` (dark panel) holds `.marquee-container` (`display: flex; flex-wrap: nowrap; white-space: nowrap; gap: 100px`) with 6 `<p class="marquee__item">` items at `font-size: 186px; text-transform: uppercase; line-height: 1`. Item text: "Komt goed bro." (the first item is prefixed "1" and the last carries a stray "L" in the source — as authored).
2. Wait for `document.fonts.ready` so item widths are final, then call `horizontalLoop(".marquee__item", { repeat: -1, paused: false, speed: 5, paddingRight: 100 })`.
3. The helper converts each item's x transform into xPercent (with integer snapping by default), measures `totalWidth` (last item's offsetLeft + its xPercent share + its scaled width − startX + `paddingRight`), and computes each item's distance to the loop point.
4. For every item it builds two tweens on one timeline with `ease: "none"`: a `to` that carries the item to its loop point, then a `fromTo` (immediateRender: false) that restarts it one full `totalWidth` ahead and carries it back to its start xPercent. Durations are distance ÷ pixelsPerSecond, so every item moves at identical velocity regardless of width.
5. It pre-renders the timeline (`progress(1, true).progress(0, true)`), adds `label0…N` at each item's start time, and attaches a wrap-aware API — `next()`, `previous()`, `toIndex()`, `current()` — using a modifiers time-wrap so the playhead itself loops seamlessly; `onReverseComplete` jumps `totalTime` forward by `duration × 100` for endless reverse.

**Exact parameters.** Config: `repeat: -1, paused: false, speed: 5, paddingRight: 100`. Speed unit: `pixelsPerSecond = (speed || 1) * 100` → **500 px/s**. Gap: 100 px (CSS) mirrors paddingRight 100. Snap: `gsap.utils.snap(config.snap || 1)` — xPercent snapped to integers unless `snap: false`. Items: 6. Font size 186 px.

**Rebuild notes.** This helper is the canonical GSAP seamless marquee — lift it whole. The two details people get wrong when re-implementing: measuring before fonts load (widths shift, seam jumps) and forgetting `immediateRender: false` on the wrap tween (items flash at their wrapped position on load).

**Evidence labels.** All values Measured from the pen's JS source via the embed route.

**code-source slug:** `gsap-marquee-text-codepen`

---

## 162 How to Code the K72 Marquee Hover Animation — https://tympanus.net/codrops/2021/06/30/how-to-code-the-k72-marquee-hover-animation/

**Source.** Codrops tutorial by Mary Lou, recreating the menu hover from Locomotive's k72.ca. Demo opened first-contact: http://tympanus.net/Tutorials/MarqueeMenu/. Repo mined: github.com/codrops/MarqueeMenu — `menuItem.js`, `utils.js`, `menu.js`, `index.js`, `base.css` read in full and copied into the code-source folder (article CSS and repo base.css agree).

**Stack (Measured).** Vanilla ES modules + GSAP 3 (npm), plain CSS. No framework. The `closestEdge()` helper is credited in-source to John Stewart's CodePen (zxYJZP).

**Mechanism (step-by-step).**
1. Markup per menu row: `.menu__item` (position relative, overflow hidden) contains the visible link `a.menu__item-link` and a `.marquee` overlay: `position: absolute; inset: 0; overflow: hidden; pointer-events: none`, parked below the row at `transform: translate3d(0, 101%, 0)`.
2. Inside the marquee, `.marquee__inner-wrap` (height/width 100%) is counter-parked at `transform: translate3d(0, -101%, 0)`, wrapping `.marquee__inner` — a flex row (`width: fit-content; will-change: transform`) running a pure-CSS infinite scroll: `animation: marquee 15s linear infinite` with `@keyframes marquee { 100% { transform: translate3d(-50%, 0, 0) } }`. The inner content (span/img pairs) is duplicated exactly 2× in the markup, so the −50% endpoint is a perfect loop.
3. A `MenuItem` class binds `mouseenter`/`mouseleave` on the **link only**. On enter it asks `closestEdge(x, y, w, h)` which edge the pointer crossed — the helper compares squared distance to the top-centre point (w/2, 0) vs the bottom-centre point (w/2, h); only top/bottom exist.
4. Enter animation (one GSAP timeline, defaults duration 0.6, ease 'expo'): `.set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)` teleports the band to the entry edge, `.set(innerWrap, { y: opposite }, 0)` counter-teleports the wrap, then `.to([marquee, innerWrap], { y: '0%' }, 0)` slides both home together. Because the two translations cancel, the marquee text never appears to move vertically — the band wipes over the row while its content is already "in place".
5. Leave mirrors it: set both to 0%, tween both out toward the exit edge (±101%). The CSS marquee scroll runs independently the whole time, including mid-wipe.

**Exact parameters.** Wipe: duration 0.6 s, ease 'expo' (expo.out). Marquee loop: 15 s linear infinite, −50% translate loop, content ×2 (4 unique span/img pairs). Type: link and marquee spans `font-size: 6vw; line-height: 1.2; text-transform: uppercase; white-space: nowrap; padding: 1vh 1vw 0`; link weight 600, marquee span weight 400. Marquee images: `width: 15vw; height: 70%; margin: 0 2vw; border-radius: 5vw; background-size: cover; background-position: 50% 50%`. Colours: `--marquee-bg: #000; --marquee-text: #fff; --menu-focus: #775e41`.

**Rebuild notes.** The nested counter-translation is the whole trick — a single sliding layer looks like the text slides in; the counter-moved wrap makes it read as a reveal. Keep the marquee on CSS, not GSAP: it must keep scrolling during the 0.6 s wipes and costs nothing. Edge detection only needs top/bottom for full-width rows.

**Evidence labels.** All values Measured (article + repo source).

**code-source slug:** `k72-marquee-menu`

---

## 163 The Architecture Behind Trionn: Coordinating GSAP, Three.js, Lenis, and Web Audio — https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/

**Source.** Codrops case study of trionn.com (agency site, built over 4 months). The article is itself the architecture document — every value below is quoted from its code excerpts (Measured). No single demo/repo exists for this entry; the coordination design is the deliverable.

**Stack (Measured).** Next.js + React + Tailwind · GSAP + @gsap/react (`useGSAP` owns lifecycle) at the centre · ScrollTrigger for pins/scrubs · **vanilla Three.js, deliberately not React Three Fiber** (direct control of one shared render loop, per-panel meshes) · Lenis · Swiper (testimonial/awards carousels) · Web Audio API (synthesized sounds; recorded buffers only in the About section) · SplitText behind a reusable `BlurTextReveal` component · `gsap.matchMedia()` for separate desktop/mobile animation logic.

**Coordination architecture (the point of the article).**
- **One master clock:** GSAP's ticker drives everything — Lenis is rafed from `gsap.ticker`, Three.js scenes render in the same loop, ScrollTrigger reads the same scroll state. Nothing runs its own independent rAF empire.
- **Loader sequencing:** hero layers are gated by a shared `transitionReady` flag — no hero animation starts until the page transition/loader clears; the hero headline additionally uses delay 1.2 s. All non-critical work (the 371-frame services preload) is deferred to `requestIdleCallback`.
- **One shared scroll value:** sections consume a single `scrollProgressRef` (0–1) remapped per section; the flagship Services sequence uses **no ScrollTrigger at all**. A stripe-wipe `holdT` pattern (clamp of progress past a hold start) scrubs a paused timeline + the next section's `yPercent` slide, and is reused across Services/Vision/About/Gallery.
- **Audio unlock:** the article documents **no explicit `AudioContext.resume()` routine** — every sound is gesture-triggered (hover beep, hold-to-blast, drag, pluck), i.e. playback only ever starts inside a user-gesture handler chain. Hero/footer sounds are synthesized live; the About curtain/growl use recorded assets.
- **Decoupled coupling:** the footer logo and the fog shader never reference each other — a shared "atmosphere" context exposes only `pulseSmoke()` and `getSmokeAnalyser()`. Cross-section sequencing (About lion) uses a `CustomEvent("trionn:about-lion-start")` **plus** a `document.documentElement.dataset.trionnLionStart` flag so a component that mounts late still catches the signal; the listener is `{ once: true }`.
- **Author's closing lesson:** build a shared `canvasManager` from day one — hand-juggling multiple canvases was the project's biggest friction.

**Mechanism + exact parameters, per system.**

*Headline reveal (BlurTextReveal).* SplitText type "chars, words, lines", smartWrap. Set chars: autoAlpha 0, blur(12px), willChange "filter, opacity". Container tweens to blur(0) over **0.5 s** at the delay; chars: duration **0.8**, stagger **{ each: 0.08, from: "random" }**, ease **power2.out**; usage delay **1.2**. will-change removed on complete. Foreground text renders `mix-blend-mode: difference` over the canvas.

*Hero symbol (Three.js).* Idle spin rotY += **0.0042**/frame (**0.0015** under prefers-reduced-motion — reduced, not removed); rotX clamped ±π/2; group rotation lerps (factor **0.06**) toward target + mouse·**0.22**. Three arms drift on phases 0°/120°/240° (`shapeIdx · 2π/3`): driftX sin(t·0.4+phase)·**0.012**, driftY cos(t·0.35+phase)·**0.008**, driftZ sin(t·0.3+phase·1.5)·**0.006**, all ×(1−explodeAmt). *Magnetic hover:* raycast per frame only when the mouse is present (≠ −9999) AND scrollProgress < **0.08** AND clickBurst < **0.05** AND introAmt < **0.08**; entering a new panel sets `_flash = 1.0` and plays one hover beep; flash decays **×0.92**/frame; `envMapIntensity = 3.0 + f·1.6`; `clearcoatRoughness = max(0.01, 0.05 − f·0.035)`; `transmission = 0.35 + f·0.32`. *Weld sparks:* armed when in-section AND undrawAmt < **0.02** AND every guide-line progress ≥ **0.995**; hit-test vs the 3 line paths at **14 px** tolerance (lines are pre-rendered to an offscreen 2D canvas texture so hit-testing is 2D); burst = **5 + floor(rand·2)** bolts (5–6) aimed at 1–2 other lines (50% get 1); cooldown **0.04 + rand·0.06 s**; glow is layered `THREE.Line` — no bloom pass; one spark sound per burst; timing by frame counters, not GSAP. *Hold-to-blast:* mousedown sets holding, holdTime 0, vibrateAmt 1.0, clickBurst 0; holdTime += **1/60** per frame; charge phase < **0.5 s** — past it, vibration stops and explode + whoosh play once; vibrateAmt decays **×0.88**/frame; clickBurst ramps **+0.02**/frame to 1.0 (≈50 frames); on release vibrateAmt −**0.08**/frame, clickBurst −**0.025**/frame. `explodeAmt = max(scrollProgress, hoverAmt, burstContrib, introAmt)` with burstContrib counted only when scrollProgress < **0.15**; panel offset = max(0, explodeAmt − panel.delay) × **5.5** along its explode direction; panel rotation = spinAxis·spinSpeed·amt·π. UI vibrate release: `transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`, transform `perspective(600px) translate(0,0) rotateX(0)`.

*Services scroll sequence.* **TOTAL = 371 WebP frames** on a single `<img>`; src swapped only when the index changes; files `frame_0001.webp` (padStart 4). **EXPLODE_START 0.35, EXPLODE_END 0.53, CARDS_START 0.56, CARDS_END 1.0.** Frame index lerps: `videoIdx += (target − videoIdx)·0.12`. Preload in `requestIdleCallback` chunks of **20** with `img.decode()`. Headline glyphs measured per-char via the Range API; particle speed hero glyphs rand(**0.05–0.15**)·maxDim, other headlines rand(**0.4–0.9**)·maxDim; dirY = sin(angle)·rand(**−1.0, 0.18**). Six cards; desktop pairs start **0.2** timeline units apart; X arc `frac ≤ 0.5 ? sin(frac·π) : 1`, Y linear; at a pair's centre its SVG icon draws (DrawSVG "0%"→"100%", duration **1.5**, stagger **0.04**, fired once per card via a Set). One GSAP timeline per layout, scrubbed via `.progress(explodeT)`. Palette flips black→white inside the same progress value.

*Helix gallery.* **9 cards** on a parametric helix `hPos(a) = (R·cos a, Y_START + a·pitchPerRad − dip(a), R·sin a)` with a Gaussian dip `DIP_A·exp(−d²)`, d = (a−MID)/DIP_S. Cards are vertex-deformed onto the curve per column per frame (scalar math, zero Vector3 allocations). ScrollTrigger pin: start "top top", end `+= totalScroll`; rendering only on onUpdate + a gated ticker (active window = section ± **1 viewport**). Hover raycast → target scale **1.12**, eased by lerp. Rounded corners are a fragment-shader SDF: `dist = min(max(q.x,q.y),0) + length(max(q,0)) − uRadius; alpha = 1 − smoothstep(−0.5, 0.5, dist)`, discard if alpha ≤ 0. warmUp ritual: all visible → `renderer.compile` → `renderer.render` → restore visibility → `renderer.clear()`, at init **and** again after textures load.

*Footer wire logo + fog.* Each SVG stroke is a playable string: cycles **2.2**; note = `DEFAULT_SCALE[i % len] · (i % 2 ? 1 : 0.5)`; intensity = i===0 ? 0 : **pow(i/(paths−1), 1.25)**. Hover sets amp = hoverAmp, speed = **18**, kills state tweens, then amp→0 and speed→0 over **0.9 s expo.out** each; fires `pluckFluteDreamy(note, intensity)` and `pulseSmoke(0.4)`. Wave path rebuilt per frame with **26** segments, envelope sin(πt), wobble sin(2π·cycles·t + phase) along the perpendicular; updates only while amp > **0.02** or speed > **0.02**; phase += speed·dt. Invisible hit-clones: stroke transparent, strokeWidth = **max(12, strokeWidth·18)**, pointer-events "stroke", forwarding mouseenter to the real path. *Pluck synth:* 3 sine oscillators at f, **2f, 3f**; LFO **4.9 Hz** vibrato on osc1; delay (max 1.0) delayTime **0.14**; feedback gain ramps to **0.32 + intensity·0.12** over **0.05 s**; loop delay → echo lowpass → feedback → delay. *Fog:* one fullscreen fragment shader, FBM **3 octaves** (amplitude 0.5, ×0.5 per octave; p = p·2.1 + vec2(3.7, 8.3)); rise = T·**0.07**; q = vec2(uv.x·aspect·**3.0**, (1−y)·**4.5** + rise); domain warp **1.4**·fbm; colour mixes via pow(f, 1.0), pow(f, 2.2), hover tint H·**0.55**·f. *Audio-reactive:* AnalyserNode energy summed over bins **2..length·0.5**, raw = sum/(length·0.5·255), smoothed toward raw; `morphOffset += (4.0 + freqEnergy·16.0 + hoverBoost·2.8)·dt`.

*Lion reveal (About).* Depth-map shader: mouse = (uMouseEase − 0.5)·vec2(2.0, −2.0); breathing = sin(uTime·**0.0012**)·0.5+0.5; amount = (**0.03** + **0.012**·breathing)·uHover; disp = mouse·depth·amount; RGB split r at uv + disp·**0.16**, b at uv − disp·0.16; cursor eased **0.07**/frame.

*Curtain (About).* Per-strip spring: `sp = −offY·0.12; vel = (vel + sp)·0.65; offY += vel`; neighbour coupling `sp = (overlap − offY[ni])·0.22; vel = (vel + sp)·0.62`. Drag warp = Gaussian envelope `exp(−(dx²)·SIGMA_INV)` around the grab point. Audio: curtain SFX loops only during a real drag (loopStart = min(**0.1**, dur·0.1), loopEnd = min(**1.5**, dur·0.5), randomised start); growl gated on dragSpeed > DRAG_MOVE_PX, |offY| > CURTAIN_OPEN_PX and elapsed ≥ CURTAIN_LEAD_S; release "thud" only if something actually played — a plain click stays silent.

*Scatter gallery ("Work hard. Play loud.").* **11** photos in shuffled collision-safe slots (separate desktop/mobile fractions), rotation rand(**−4, 4**)°, jitter ±**36 px**; 10 off-screen start positions cycled by index, gap = max(vw, vh)·**0.72**; pinned timeline scrub **0.6**, item tweens duration **1.2** at position index·**0.34**; stripe phase gated by `animationEnd = GALLERY_VH/(GALLERY_VH + STRIPE_HOLD_VH)`. Dominant colour: downsample to **72×72**, skip alpha < **220**, brightness < **25** or > **245**, saturation < **12**; buckets round(c/22)·22; winner = best count × vividness, averaged. Click pull-forward: inner to rotation direction·**4.5**, scale **1.035**, opacity **0.18**, duration **0.34**, back over **0.56**; overlapping neighbours pushed x = dx·random(**18, 34**), rotation dx·random(**1.4, 2.8**), **0.34** out / **0.52** back. Images mount client-only via `useSyncExternalStore` (server returns false), `crossOrigin="anonymous"`.

**Rebuild notes.** Steal the architecture, not the scale: (1) one ticker to rule scroll + 3D + shaders; (2) one shared progress ref per page instead of dozens of ScrollTriggers; (3) a single `transitionReady` gate for everything above the fold; (4) idle-chunked preloads (20 at a time) for image sequences; (5) cross-section talk only through tiny named functions/events. The 371-frame services sequence and the vertex-deformed helix are the two most portable showpieces for service-business templates (product/trade imagery swaps straight in).

**Evidence labels.** Stack, architecture, all parameters: Measured (article excerpts). The "no explicit AudioContext.resume()" point is stated as an absence in the article text, honestly labelled.

**code-source slug:** `trionn-architecture`

---

## 164 Circular Text — https://reactbits.dev/text-animations/circular-text

**Source.** React Bits component page opened first-contact (live, confirmed 26 Oct 2026). Canonical source mined from the React Bits GitHub repo (DavidHDev/react-bits, `src/content/TextAnimations/CircularText/CircularText.jsx` + `.css`, default JS variant) and copied into the code-source folder — all values below are from that source (Measured).

**Stack (Measured).** React + Motion (`motion/react`: motion values, springs, `frame.update`, reduced-motion hook). **Not SVG textPath** — each letter is an absolutely positioned DOM span rotated around the ring centre on a spinning plane div.

**Mechanism (step-by-step).**
1. Split the text into letters. In `fill` mode, distribute them evenly: angle step = 360/letters.length, offset by startAngle, with `repeat` copies each offset 360/copies. In non-fill mode, measure real glyph widths (after `document.fonts.ready`) and give each glyph an arc proportional to its width (estimates before measuring: space = fontSize·0.3, other = fontSize·0.6, plus letterSpacing·fontSize).
2. A Motion `frame.update` loop advances the ring angle by the current speed each frame (delta clamped to 100 ms); the speed is a springed motion value, so hover changes ease in/out instead of jumping.
3. Cruise velocity = 360/spinDuration °/s, sign flipped for counterclockwise. Hover modes multiply it via HOVER_SPEED: slowDown 0.5, speedUp 4, pause 0, goBonkers 20.
4. Optional drag: pointer angle from atan2 about the centre (dead radius 6% of size); angle samples kept for 100 ms; on release, if the last sample is < 80 ms old, its velocity becomes a fling, clamped to ±1440 °/s, decaying `fling *= exp(−dt/0.7)` and zeroing below 1 °/s.
5. The whole ring scales via a second spring (0.8 while hovering in goBonkers mode, 0.96 while dragging) and tilts toward the pointer via two more springs; the spin only runs while an IntersectionObserver reports the component on screen; reduced motion zeroes the cruise speed and disables fling/tilt.

**Exact parameters.** Defaults: text (required), spinDuration **20**, onHover **'speedUp'**, direction 'clockwise', size **200**, fontSize **24**, fontWeight **900**, letterSpacing **0**, startAngle **0**, fill **true**, repeat **1**, ring false, tilt **0**, hoverTilt **0**, draggable false. Springs: speed stiffness **60** / damping **18**; scale **300/20**; tilt **150/18**. MAX_FLING **1440** °/s. Perspective = size × **2.5**. Non-fill glyph arc = width × (180 / (π · max(size/2 − fontSize·0.6, 1))); span scaled by fit = min(1, 360/(span × copies)). Ring line: inset **1.3em**, borderWidth max(1, fontSize/16). CSS transitions: plane transform **0.7 s cubic-bezier(0.22, 1, 0.36, 1)**; settled letters **0.5 s cubic-bezier(0, 0, 0, 1)**; ring opacity 0.4 s ease. Root role="img", aria-label = text.

**Rebuild notes.** The DOM-span ring (vs SVG textPath) is what makes drag/fling and per-letter springs trivial — copy that choice. Springs on speed (60/18) are the feel: slightly soft, no overshoot. Fully portable to vanilla JS with one rAF loop.

**Evidence labels.** Measured (repo source read in full; component page confirmed live).

**code-source slug:** `circular-text`

---

## 165 Depth Text — https://reactbits.dev/text-animations/depth-text

**Source.** React Bits component page opened first-contact (live). Canonical source: DavidHDev/react-bits, `src/content/TextAnimations/DepthText/DepthText.jsx` + `.css`, copied into the code-source folder. All values Measured.

**Stack (Measured).** React + plain CSS 3D — no WebGL, no animation library. The extrusion is real geometry: a face span plus N aria-hidden layer spans in a `preserve-3d` stage, layer i at `translateZ(−i · depth px)` via a `--depth-text-grow` custom property; layer shading via CSS `color-mix()`. One self-terminating rAF loop drives pointer/orbit/float.

**Mechanism (step-by-step).**
1. Render the word `layers + 1` times in a grid-stacked stage: the face on top (translateZ 0.6px), depth layers behind it, each pushed back `depth` px more than the last. Total extrusion extent = layers × depth (default 34 × 2.4 = 81.6 px).
2. Colour the layers as a gradient into the depth colour: with eased progress p², each layer is `color-mix(faceColor (1−p²)·72+4 %, depthColor)`, then mixed 92% toward black; in `gradientDepth` mode, per-layer alpha fades by reach = (1 − (i−0.5)/total)^1.6 instead.
3. Intro: over 1200 ms a grow factor runs 0→1 with cubic-out easing, scaling every layer's Z offset — the extrusion literally grows out of the face.
4. Pointer tracking: normalise the pointer over 0.8× the element rect; target rotation = base tilt (−tilt·0.32 X, +tilt·0.42 Y) adjusted by ±tilt; current rotation lerps toward target by `smoothing` each frame.
5. With no active pointer, auto-orbit takes over: sinusoidal targets at orbitSpeed, amplitude factor 0.18 on pointer-capable devices, 0.55 otherwise. Hover/press runs a push spring (stiffness 260, damping 17, integrated in ≤1/120 s substeps; press adds 0.25) whose sink value (clamped −0.25…1) pushes the whole stage back by sink × extent and shrinks the grow.
6. Optional float adds slow sinusoidal drift (rotation, lift, roll). The rAF loop stops itself when everything settles and no orbit/float/intro is active; IntersectionObserver pauses off-screen; reduced motion renders the static base pose with the intro completed.

**Exact parameters.** Defaults: text **'Elevate'**, layers **34** (clamp 2–**64**), depth **2.4** (0–12), faceColor 'currentColor', depthColor **'#7c3aed'**, gradientDepth false, tilt **7.5** (0–12), pointerTracking true, smoothing **0.14** (0.02–0.35), perspective **900** (300–2000), autoOrbit true, orbitSpeed **0.35** (0–2), hoverPush **0** (0–1), float false, fontSize **'clamp(3rem, 12vw, 7rem)'**, fontWeight **900**, shadow true, outline false, intro true. INTRO_MS **1200**, grow = 1−(1−p)³. Push spring **260/17**, PRESS_EXTRA **0.25**. Float: rotX cos(t·1.19)·2·drift, rotY sin(t·0.86+2.1)·4·drift, lift sin(t·1.43)·fontSizePx·0.045·drift, roll sin(t·1.03+0.8)·1.6·drift, FLOAT_EASE τ **0.7 s**. Shadows: face `0 0.035em 0.07em rgba(0,0,0,0.28)`; depth `0 0.18em 0.32em color-mix(in srgb, depthColor 24%, rgba(0,0,0,0.42))` (off in gradientDepth mode). CSS: line-height 0.86, letter-spacing −0.065em, face translateZ(0.6px), outline stroke max(1px, 0.012em). Delta clamp 50 ms.

**Rebuild notes.** Cheapest possible "3D headline" — 35 DOM nodes, zero libraries, works in WordPress/Elementor with a small JS shim. Watch the DOM cost at layers 64 on low-end phones; the component's own rAF sleep behaviour is worth copying verbatim.

**Evidence labels.** Measured (repo JSX + CSS read in full).

**code-source slug:** `depth-text`

---

## 166 Particle Text — https://reactbits.dev/text-animations/particle-text

**Source.** React Bits component page opened first-contact (live). Canonical source: DavidHDev/react-bits, `src/content/TextAnimations/ParticleText/ParticleText.jsx` + `.css`, copied into the code-source folder. All values Measured.

**Stack (Measured).** React + Canvas 2D (no WebGL). Text is rasterised to an offscreen canvas, alpha-sampled on a grid; each kept pixel becomes a particle with a home target. Rendering is batched into **96 draw groups** (12 tone steps × 8 alpha fades) to avoid per-particle fillStyle changes.

**Mechanism (step-by-step).**
1. Sampling: draw the text (white fill) to an offscreen canvas, font shrunk so the text width ≤ 0.92 × container (min 18 px), padding max(12, size·0.08). Walk a grid of step max(2, floor(density)); keep pixels with alpha > 40 as particle targets. Cap the count at clamp(floor(w·h/90), **900, 5200**) by stride thinning. Each particle gets a deterministic seed `((i·9301 + 49297) % 233280)/233280` and depth 0.45 + (((i·233+97) % 1000)/1000)·0.9 — no Math.random in the loop, so resizes are stable.
2. Intro (per-particle delay = seed × stagger): **gather** — start on a circle (angle seed·2π, distance scatter·(0.35 + depth·0.75) + jitter), easeOutCubic over gatherDuration; **rain** — start above (startY = −12 − depth·30 − seed·height·0.22), travel gatherDuration·(0.45 + depth·0.3), delay ×1.3, easeInFall t^1.7; **spiral** — startRadius r·(1.04 + depth·0.22) + spread·0.3·seed, swirl (1.5 + 2.6·(1 − r/reach))·(0.85 + seed·0.3), easeInOutCubic; **scan** — a 1.5 px sweep line reveals particles, duration max(200, gatherDuration·0.8), delay = along·scanDuration + seed·stagger·0.15, gradient stops [0, .12, .42, .78, 1, .78, .42, .12, 0], alpha ×0.85, shadowBlur 8·dpr. Per-intro alpha floors: gather 0, rain 0.55, spiral 0.45, scan 0.35.
3. Per frame (frame-rate normalised with `frames = dt·60`, dt clamped 0.05): positions follow targets at 1 − 0.78^frames; the pointer is smoothed at 1 − 0.82^frames; particles inside repelRadius are pushed by (1 − d/radius)² × pointerRepel. Idle drift adds sin/cos wobble scaled by idleDrift × depth.
4. Click burst (pointerdown, unless trigger = 'click'): radius = 90 + 70·√strength + repelRadius·0.25; power = 950·strength·(0.2 + 0.8·falloff²)·(0.65 + depth·0.45); direction jittered (seed−0.5)·0.9 rad; offsets spring home with BURST_SPRING 18 / BURST_DAMPING 7.5 and settle at |offset| ≤ 0.05, |velocity| ≤ 1.
5. Colour/heat: tone picked from a 12-step base→highlight palette; in 'motion' highlight mode, heat = clamp((distance-from-target − 3)/36, 0, 1) — displaced particles glow toward the highlight colour. Hot tones (tone ≥ 1) are composited through an offscreen glow layer with shadowBlur (3 + particleSize·1.5)·dpr. DPR capped at 2; the rAF loop sleeps when nothing is busy.

**Exact parameters.** Defaults: text **'React Bits'**, particleSize **2**, density **4**, color 'currentColor', highlightColor **'#ff5a36'**, highlightMode 'motion', shape 'circle', intro **'gather'**, scatter **180**, gatherDuration **1600**, stagger **420**, clickBurst true, burstStrength **1**, pointerRepel **40**, repelRadius **120**, idleDrift **0.7**, trigger 'mount', fontSize **'clamp(3rem, 12vw, 8rem)'**, fontWeight **800**, glow true. Constants: HEAT_DEADZONE **3**, HEAT_RANGE **36**; follow 0.78 / pointer 0.82 / line-angle turn 0.72 (as 1−x^frames); line shape restLength = max(2, particleSize·0.8 + max(2, floor(density))·0.7), rest angle −π/4, length growth +min(rest·4, speed·1.6), strokeWidth max(1, particleSize·0.65); circle/square size = particleSize·(0.75 + weight·0.45) with a rect fast-path ≤ 2.1. Container min-height 240 px, touch-action pan-y; reduced motion snaps particles to targets; sr-only span carries the text.

**Rebuild notes.** The two transferable tricks: bucketed colour batching (96 groups) and deterministic seeds. The heat-from-displacement colour system is the signature — the headline visibly "lights up" where it's disturbed, which is what makes this more than a particle demo.

**Evidence labels.** Measured (repo JSX + CSS read in full).

**code-source slug:** `particle-text`

---

## 167 Stroke Text — https://reactbits.dev/text-animations/stroke-text

**Source.** React Bits component page opened first-contact (live). Canonical source: DavidHDev/react-bits, `src/content/TextAnimations/StrokeText/StrokeText.jsx` + `.css`, copied into the code-source folder. All values Measured.

**Stack (Measured).** React + GSAP + ScrollTrigger. One SVG with two `<text>` layers (stroke layer, fill layer), each character a `<tspan>`; the viewBox is measured from the real glyph bbox (`getBBox`) so the SVG always fits its own letterforms.

**Mechanism (step-by-step).**
1. Render each char as a tspan in the stroke text. Set every char's dash to `max(fontSize·7, 200)` — deliberately far longer than any glyph path — with dashoffset = dash (fully hidden).
2. Draw-on: tween all chars' strokeDashoffset to 0 over drawDuration, staggered 0.05 (or from 'end' when reverse). Because the dash exceeds every path length, each letter reads as genuinely drawn, never faded.
3. Fill: after drawDuration + fillDelay, over fillDuration = max(0.4, drawDuration·0.5) — either a clipPath `<rect>` wipes across from the chosen direction (ease power2.inOut) or per-char fill tspans fade in with the same stagger (power2.out).
4. Optional drop shadow (feDropShadow) animates in behind: dx/dy 0 → lift (fontSize·0.06), flood-opacity 0 → 0.5, over fillDuration·1.4 with power3.out, starting at drawDuration + fillDelay + fillDuration·0.3.
5. Triggers: mount plays immediately; scroll uses ScrollTrigger start 'top 82%', once; hover starts from the finished state and replays on pointerenter; loop repeats −1 with repeatDelay 0.9, yoyo. hoverRedraw (not with loop/hover): after completion, a pointerenter fades the strokes out in 0.2 s (power1.out), resets offsets, and redraws at 0.8× duration.
6. Patterned strokes: dashed (on = max(dashLength − strokeWidth, 0.5), off = dashLength·0.6 + strokeWidth) or dotted (`0 ${gap}`, gap = max(dashLength, strokeWidth·1.8), round caps form the dots) are drawn through a mask plus an feMorphology erode filter (radius strokeWidth/2 + 0.75) so the reveal consumes the pattern cleanly; marching-ants mode animates dashoffset 0 → −period with duration = period/(fontSize·0.22), linear, infinite.
7. Measurement hygiene: bbox padded by max(strokeWidth, fontSize·0.1); re-measure on document.fonts.ready and ResizeObserver (0.5 px hysteresis); fallback viewBox `0 −fontSize 600 fontSize·1.3`; SVG hidden until measured. Reduced motion sets the end state instantly.

**Exact parameters.** Defaults: text **'Draw Attention'**, strokeColor **'#A78BFA'**, fillColor 'currentColor', strokeWidth **1.4**, drawDuration **1.6**, fillDelay **0.2**, stagger **0.05**, ease **'power2.out'**, trigger 'mount', fillMode **'wipe'**, wipeFrom 'left', fontSize **128**, fontWeight **800**, letterSpacing **−4**, reverse false, strokeStyle 'solid', dashLength **10**, marching false, hoverRedraw false, shadow false. Shadow softness stdDeviation = fontSize·**0.016**, SHADOW_OPACITY **0.5**. CSS: svg max-width var(--stroke-text-width, 600 px), overflow visible.

**Rebuild notes.** The dash = fontSize×7 rule and the directional clip wipe are the two details that separate this from every "SVG text draw" tutorial. The erode-mask trick for dashed/dotted reveals is niche but unique in the bank.

**Evidence labels.** Measured (repo JSX + CSS read in full).

**code-source slug:** `stroke-text`

---

## 169 Text Loop — https://reactbits.dev/text-animations/text-loop

**Source.** React Bits component page opened first-contact (live; page describes it as "A seamless text marquee that flows along curved SVG paths" — despite the name it is **not** a phrase cycler). Canonical source: DavidHDev/react-bits, `src/content/TextAnimations/TextLoop/TextLoop.jsx` + `.css`, copied into the code-source folder. All values Measured.

**Stack (Measured).** React + GSAP (ticker only, as the frame clock). A single SVG, viewBox **1200×520** (centre 600/260, edge pad 6), with generated paths and two `<textPath>` copies of the string placed exactly one path-length apart.

**Mechanism (step-by-step).**
1. Build the path for the chosen shape inside a vertical "room" = max(20, 260 − ribbonWidth/2 − 6): **wave** — amplitude a = min(curviness·2.2, room·2), `M −320 CY Q −160 CY−a 0 CY T 320 … T 1520 CY` (T steps of 320); **circle** — r = min(90 + curviness·0.95, room), two-arc closed path (mirrored variant: ellipse rx = r·1.22, ry = r·0.42); **infinity** — r = 150 + curviness·1.4, h = min(60 + curviness·0.95, room), cubic lobes, 0.55 control factor; **arch** — rise = min(120 + curviness·1.1, room·2), `M 120 CY+rise/2 Q CX CY−rise·1.5 1080 CY+rise/2`; **line** — `M −320 CY L 1520 CY`. A custom `path` prop overrides all of these.
2. Measure: pathLength via `getTotalLength()`, one unit (text + NBSP + separator + NBSP) via `getComputedTextLength()`; reps = max(1, round(pathLength/unitWidth)). The rendered text carries `textLength = pathLength` with `lengthAdjust: 'spacing'` — the browser stretches letter-spacing so one repetition always equals the full path length exactly.
3. Two textPath copies: head startOffset = wrap(travel, L), tail = startOffset − L. As travel grows the pair tiles the path seamlessly forever.
4. Drive: GSAP ticker, dt clamped 0.05, travel += v·dt where v = base·hoverScale + fling + boost; base = speed × direction sign.
5. Interactions feed v: **drag** (circular shapes: atan2 angle delta × radius; others: pointer delta projected onto the tilt angle × 1200/rect.width; velocity EMA 0.6/0.4; release velocity zeroed if the last move is > 90 ms old) becomes a fling decaying exp(−dt/0.55), clamped ±2600. **scrollBoost**: scroll velocity EMA (0.5/0.5), stale events (> 90 ms) decay exp(−dt/0.12), source resets after 200 ms; target = clamp(scrollVelocity·scrollBoost·0.35·sign, ±1600), approached at 1 − exp(−dt/0.18). **pauseOnHover**: hover scale tweens to 0 over 0.6 s power2.out, back to 1 over 0.9 s power2.inOut (touch ignored).
6. Dressing: the ribbon band follows the same path underneath; optional **cross** mode adds a second counter-scrolling ribbon (wrap(−travel)) rotated ±crossAngle/2, its tape colour = tint(ribbonColor, 0.62), ink chosen by sRGB luminance threshold 0.2 ('#120f17' vs '#ffffff'), with a blurred black under-shadow (stdDeviation max(4, ribbonWidth·0.11), offset max(4, ribbonWidth·0.08), opacity 0.42) masked to the underlap. **edgeFade** builds an 8-stop smootherstep gradient mask over min(1, edgeFade)·0.3 of the path. IntersectionObserver starts/stops the ticker; reduced motion sets base speed 0 and never starts it.

**Exact parameters.** Defaults: text **'React ✦ Bits'**, shape **'wave'**, speed **90** (path units/sec), direction 'forward', separator **'✦'**, curviness **90**, tilt **0**, fontSize **46**, fontWeight **800**, letterSpacing **2**, uppercase true, ribbon true, ribbonColor **'#5227FF'**, ribbonWidth **86**, edgeFade **0**, pauseOnHover true, cross false, crossAngle **16**, draggable false, scrollBoost **0**, outline false, outlineWidth **1.5**. Constants: MAX_FLING **2600**, MAX_BOOST **1600**, FADE_STEPS **8**, smootherstep t³(t(6t−15)+10).

**Rebuild notes.** `textLength` + `lengthAdjust: 'spacing'` is the load-bearing trick — it makes the two-copy wrap exact on any path shape without manual letter counting. The scrollBoost recipe (EMA velocity → ±1600 cap → 0.18 s approach) is a drop-in "marquee reacts to page scroll" module for any marquee in the bank.

**Evidence labels.** Measured (repo JSX + CSS read in full).

**code-source slug:** `text-loop`

---

## 170 Text Type — https://reactbits.dev/text-animations/text-type

**Source.** React Bits component page opened first-contact (live). Canonical source: DavidHDev/react-bits, `src/content/TextAnimations/TextType/TextType.jsx` + `.css`, copied into the code-source folder. All values Measured.

**Stack (Measured).** React + GSAP (cursor glide + blink only). Typing is a setTimeout state machine (type → pause → delete → next sentence, with an onSentenceComplete callback); text is split grapheme-aware via `Intl.Segmenter`; per-character entrance effects use the WAAPI (`element.animate`).

**Mechanism (step-by-step).**
1. Type the current sentence one grapheme per tick (typingSpeed, or a uniform random delay in [min, max] when variableSpeed is set). After initialDelay for the first sentence.
2. The cursor is an absolutely positioned element tracked to a zero-width caret span's offsetLeft/offsetTop. With cursorGlide it tweens to each new caret position over clamp(pace·0.0016, 0.06, 0.18) s, power3.out, overwrite. Its blink is a GSAP timeline (repeat −1): hold = blink·0.7, fade out/in at blink·0.45 each (sine.inOut), extra gap blink·0.4; on every caret move the blink pauses, opacity snaps to 1 in 0.12 s (power1.out), and the timeline restarts after a 0.12 s delayedCall — so the caret is solid while moving, blinking only at rest.
3. Optional per-char entrances (WAAPI): fade — opacity 0→1, 360 ms cubic-bezier(0.25, 1, 0.5, 1); blur — opacity + blur(0.3em→0), 520 ms cubic-bezier(0.22, 1, 0.36, 1); rise — opacity + top 0.6em→0, 480 ms cubic-bezier(0.34, 1.4, 0.64, 1).
4. Mistakes (humanisation): a full QWERTY NEIGHBORS map lives in the source. Each char has probability min(1, mistakes)·0.16 of triggering a typo (never on the first char, never the same index twice running): a wrong neighbour is typed at typing speed (40% chance the following char is typed too), dwells 260 + rand·320 ms, deletes at max(45, deletingSpeed), pauses 90 + rand·140 ms, then typing resumes correctly.
5. At sentence end: pause pauseDuration, then delete — backspace mode removes one char per deletingSpeed tick; select mode grows a highlight one char per tick, waits max(160, deletingSpeed·8), then clears instantly. Advance to the next sentence; loop or stop. startOnVisible gates the start on an IntersectionObserver (threshold 0.1, one-shot). Reduced motion: typing/deleting resolve instantly.

**Exact parameters.** Defaults: typingSpeed **50**, initialDelay **0**, pauseDuration **2000**, deletingSpeed **30**, deleteMode **'backspace'**, loop **true**, showCursor true, hideCursorWhileTyping false, cursorStyle **'character'**, cursorCharacter **'|'**, cursorColor 'currentColor', cursorBlinkDuration **0.5**, cursorGlide true, typeEffect **'none'**, mistakes **0**, prefix '', startOnVisible false, reverseMode false, as 'div'. Cursor CSS shapes: bar width max(2px, 0.07em) × height 1.1em; block 0.56em × 1.1em; underscore 0.56em × max(2px, 0.075em); character cursor margin-left 0.25rem; selected-char background color-mix(in srgb, currentColor 25%, transparent). An sr-only span holds the prefix + all sentences for screen readers.

**Rebuild notes.** The realism lives in the mistakes system and caret physics, not the typing speed — steal those two layers onto any simpler typewriter. The grapheme-aware splitting (Intl.Segmenter) is mandatory if the strings ever contain emoji or accented combining characters.

**Evidence labels.** Measured (repo JSX + CSS read in full).

**code-source slug:** `text-type`
