/* ============================================================
   PizzaBurg HRM — Deck Engine
   Navigation, 3D transitions, overview grid, presenter notes,
   micro-interactions (tilt, spotlight, counters, SVG draw-on).
   ============================================================ */
(function(){
  "use strict";

  const envEl     = document.getElementById("env");
  const envBlobs  = [document.getElementById("env-b1"), document.getElementById("env-b2"), document.getElementById("env-b3")];
  const stageEl   = document.querySelector(".slides");
  const slideEls  = Array.from(document.querySelectorAll(".slide"));
  const total     = slideEls.length;
  const dotsWrap  = document.getElementById("dots");
  const overview  = document.getElementById("overview");
  const ovGrid    = document.getElementById("ov-grid");
  const notesDraw = document.getElementById("notes-drawer");
  const notesBtn  = document.getElementById("btn-notes");
  const notesBody = document.getElementById("notes-body");
  const progressFill = document.getElementById("progress-fill");
  const counterEl = document.getElementById("counter");
  const sectionLabel = document.getElementById("section-label-text");
  const speakerAvatar = document.getElementById("speaker-avatar");
  const speakerWho = document.getElementById("speaker-who");

  let idx = 0;
  let animating = false;
  const deepLinkIdx = parseInt((location.hash||"").replace("#",""),10);
  if(!isNaN(deepLinkIdx) && deepLinkIdx>=1 && deepLinkIdx<=total){ idx = deepLinkIdx-1; }

  // Build dots
  slideEls.forEach((s,i)=>{
    const b=document.createElement("button");
    b.setAttribute("aria-label","Go to slide "+(i+1));
    b.addEventListener("click",()=>goTo(i));
    dotsWrap.appendChild(b);
  });
  const dotEls = Array.from(dotsWrap.children);

  // Build overview cards
  slideEls.forEach((s,i)=>{
    const card=document.createElement("div");
    card.className="ov-card";
    const swatch=document.createElement("div");
    swatch.className="swatch";
    swatch.style.background = s.dataset.swatch ? s.dataset.swatch : "var(--accent)";
    const num=document.createElement("div"); num.className="num"; num.textContent = String(i+1).padStart(2,"0");
    const ttl=document.createElement("div"); ttl.className="ttl"; ttl.textContent = s.dataset.title || ("Slide "+(i+1));
    card.appendChild(swatch); card.appendChild(num); card.appendChild(ttl);
    card.addEventListener("click",()=>{ goTo(i); closeOverview(); });
    ovGrid.appendChild(card);
  });
  const ovCards = Array.from(ovGrid.children);

  function applyPositions(){
    slideEls.forEach((s,i)=>{
      let pos;
      const d = i - idx;
      if(d===0) pos="active";
      else if(d===1) pos="next";
      else if(d===-1) pos="prev";
      else if(d>1) pos="far-next";
      else pos="far-prev";
      s.dataset.pos = pos;
      s.classList.toggle("is-active", d===0);
    });
  }

  function triggerReveals(slide){
    const items = slide.querySelectorAll(".reveal");
    items.forEach(el=> el.classList.remove("in"));
    // force reflow then stagger in
    void slide.offsetWidth;
    items.forEach((el,i)=>{
      const delay = el.dataset.delay ? parseInt(el.dataset.delay,10) : i*70;
      setTimeout(()=> el.classList.add("in"), 60+delay);
    });
    // run any slide-specific init hook
    const initFn = slide.dataset.init;
    if(initFn && window.SlideInit && typeof window.SlideInit[initFn]==="function"){
      window.SlideInit[initFn](slide);
    }
    // autoplay video if flagged, pause all others
    document.querySelectorAll("video[data-autoplay]").forEach(v=>{
      if(slide.contains(v)){ v.currentTime=0; v.play().catch(()=>{}); }
      else { v.pause(); }
    });
    // data-viz micro-interactions: counters, SVG draw-on, bar fills
    setTimeout(()=>{ animateCounters(slide); drawPaths(slide); animateBars(slide); }, 220);
    // mini-timeline: always (re)populate detail text from the active (or first) node
    slide.querySelectorAll(".mt").forEach(mt=>{
      const node = mt.querySelector(".mt-node.active") || mt.querySelector(".mt-node");
      if(node) selectMtNode(node);
    });
  }

  function updateChrome(){
    dotEls.forEach((d,i)=> d.classList.toggle("active", i===idx));
    ovCards.forEach((c,i)=> c.classList.toggle("current", i===idx));
    progressFill.style.width = ((idx)/(total-1)*100).toFixed(2)+"%";
    counterEl.innerHTML = "<b>"+String(idx+1).padStart(2,"0")+"</b> / "+String(total).padStart(2,"0");
    const s = slideEls[idx];
    sectionLabel.textContent = s.dataset.section || "";
    const notes = s.dataset.notes || "No notes for this slide.";
    notesBody.textContent = notes;
    const presenter = s.dataset.presenter || "";
    if(presenter){
      speakerAvatar.textContent = presenter.split(" ").map(w=>w[0]).slice(0,2).join("");
      speakerWho.innerHTML = "Presented by<b>"+presenter+"</b>";
      speakerAvatar.parentElement.style.display="flex";
    } else {
      speakerAvatar.parentElement.style.display="none";
    }
    history.replaceState(null,"","#"+(idx+1));
  }

  /* ---- ambient environment: retint + reposition on every navigation ---- */
  function seededFrac(n, salt){
    const x = Math.sin(n*127.1 + salt*311.7) * 43758.5453;
    return x - Math.floor(x);
  }
  function hexToRgb(hex){
    hex = hex.replace("#","");
    if(hex.length===3) hex = hex.split("").map(c=>c+c).join("");
    const n = parseInt(hex,16);
    return [(n>>16)&255,(n>>8)&255,n&255];
  }
  function resolveSwatch(raw){
    if(!raw) return "#E4544E";
    if(raw.startsWith("#")) return raw;
    const m = raw.match(/var\((--[a-z0-9-]+)\)/i);
    if(m){ const v = getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim(); return v || "#E4544E"; }
    return raw;
  }
  function updateEnvironment(n, dir){
    const slide = slideEls[n];
    const tone = slide.dataset.tone === "dark" ? "dark" : "light";
    envEl.setAttribute("data-tone", tone);
    const swatch = resolveSwatch(slide.dataset.swatch);
    const [r,g,b] = hexToRgb(swatch.match(/^#/) ? swatch : "#E4544E");
    envBlobs.forEach((el,i)=>{
      if(!el) return;
      const lx = 8 + seededFrac(n, i+1)*60;
      const ly = 6 + seededFrac(n, i+9)*60;
      el.style.left = lx+"%";
      el.style.top  = ly+"%";
      const alpha = tone==="dark" ? 0.30 : 0.30;
      el.style.background = `rgba(${r},${g},${b},${alpha - i*0.05})`;
    });
    // directional parallax "push" — the whole environment nudges opposite the
    // travel direction then eases back, reading as a camera move through space.
    envEl.style.transition = "none";
    envEl.style.transform = `translate3d(${dir*-2.2}vw, ${dir*0.6}vh, 0) scale(1.015)`;
    requestAnimationFrame(()=>{
      envEl.style.transition = "transform 1100ms var(--ease-in-out)";
      envEl.style.transform = "translate3d(0,0,0) scale(1)";
    });
  }

  function goTo(n){
    if(animating || n===idx || n<0 || n>=total) return;
    const dir = n > idx ? 1 : -1;
    idx = n;
    applyPositions();
    updateChrome();
    updateEnvironment(idx, dir);
    animating = true;
    setTimeout(()=>{ animating=false; triggerReveals(slideEls[idx]); }, 60);
  }
  function next(){ goTo(Math.min(idx+1,total-1)); }
  function prev(){ goTo(Math.max(idx-1,0)); }

  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-prev").addEventListener("click", prev);

  // keyboard
  window.addEventListener("keydown",(e)=>{
    if(overview.classList.contains("open")){
      if(e.key==="Escape") closeOverview();
      return;
    }
    if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"){ e.preventDefault(); next(); }
    else if(e.key==="ArrowLeft"||e.key==="PageUp"){ e.preventDefault(); prev(); }
    else if(e.key==="Home"){ goTo(0); }
    else if(e.key==="End"){ goTo(total-1); }
    else if(e.key.toLowerCase()==="g"||e.key==="Escape"){ toggleOverview(); }
    else if(e.key.toLowerCase()==="n"){ toggleNotes(); }
    else if(e.key.toLowerCase()==="f"){ toggleFullscreen(); }
  });

  // touch swipe
  let tsx=0,tsy=0;
  stageEl.addEventListener("touchstart",(e)=>{ tsx=e.touches[0].clientX; tsy=e.touches[0].clientY; },{passive:true});
  stageEl.addEventListener("touchend",(e)=>{
    const dx=e.changedTouches[0].clientX-tsx, dy=e.changedTouches[0].clientY-tsy;
    if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)){ dx<0? next():prev(); }
  },{passive:true});

  // wheel (debounced) — big trackpad/mouse-wheel swipes advance
  let wheelLock=false;
  window.addEventListener("wheel",(e)=>{
    if(overview.classList.contains("open")) return;
    if(Math.abs(e.deltaY) < 42) return;
    if(wheelLock) return;
    wheelLock=true;
    e.deltaY>0 ? next() : prev();
    setTimeout(()=> wheelLock=false, 700);
  },{passive:true});

  // click zones on far left/right edge of stage
  stageEl.addEventListener("click",(e)=>{
    const w = window.innerWidth;
    if(e.clientX < w*0.06) prev();
    else if(e.clientX > w*0.94) next();
  });

  function toggleOverview(){ overview.classList.contains("open") ? closeOverview() : openOverview(); }
  function openOverview(){ overview.classList.add("open"); }
  function closeOverview(){ overview.classList.remove("open"); }
  document.getElementById("btn-overview").addEventListener("click", toggleOverview);
  overview.addEventListener("click",(e)=>{ if(e.target===overview) closeOverview(); });

  function toggleNotes(){ notesDraw.classList.toggle("open"); notesBtn.classList.toggle("active"); }
  notesBtn.addEventListener("click", toggleNotes);

  function toggleFullscreen(){
    if(!document.fullscreenElement){ document.documentElement.requestFullscreen?.(); }
    else{ document.exitFullscreen?.(); }
  }
  document.getElementById("btn-fs").addEventListener("click", toggleFullscreen);

  // init
  applyPositions();
  updateChrome();
  updateEnvironment(idx, 0);
  setTimeout(()=> triggerReveals(slideEls[idx]), 120);

  /* ============================================================
     Micro-interactions
     ============================================================ */

  // Tilt-on-hover for .tilt-card
  document.querySelectorAll(".tilt-card").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
      card.style.transform = `rotateY(${px*10}deg) rotateX(${-py*10}deg) translateZ(10px)`;
    });
    card.addEventListener("mouseleave",()=>{ card.style.transform="rotateY(0) rotateX(0)"; });
  });

  // Spotlight cursor-follow for .spotlit
  document.querySelectorAll(".spotlit").forEach(el=>{
    el.addEventListener("mousemove",(e)=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");
      el.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");
    });
  });

  // animated counters: <span class="counter-num" data-to="22" data-suffix="">0</span>
  function animateCounters(root){
    root.querySelectorAll(".counter-num:not(.done)").forEach(el=>{
      el.classList.add("done");
      const to = parseFloat(el.dataset.to||"0");
      const suffix = el.dataset.suffix||"";
      const dur = 1400, start=performance.now();
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals,10):0;
      function step(t){
        const p = Math.min(1,(t-start)/dur);
        const eased = 1-Math.pow(1-p,3);
        el.textContent = (to*eased).toFixed(decimals) + suffix;
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  // SVG path draw-on: any <path class="draw-path"> animates its stroke in
  function drawPaths(root){
    root.querySelectorAll(".draw-path:not(.done)").forEach(p=>{
      p.classList.add("done");
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.getBoundingClientRect();
      p.style.transition = "stroke-dashoffset 1400ms cubic-bezier(.16,1,.3,1)";
      requestAnimationFrame(()=> p.style.strokeDashoffset = 0);
    });
  }

  // animated bar fills: <div class="bar-fill" data-w="72"></div>
  function animateBars(root){
    root.querySelectorAll(".bar-fill:not(.done)").forEach((el,i)=>{
      el.classList.add("done");
      const w = el.dataset.w || "0";
      setTimeout(()=>{ el.style.width = w+"%"; }, 120+i*90);
    });
  }

  window.SlideInit = window.SlideInit || {};

  /* ---- mini-timeline component: .mt with .mt-node[data-detail] + .mt-detail ---- */
  function selectMtNode(node){
    const mt = node.closest(".mt");
    mt.querySelectorAll(".mt-node").forEach(n=> n.classList.remove("active"));
    node.classList.add("active");
    const out = mt.querySelector(".mt-detail");
    if(out) out.innerHTML = node.dataset.detail || "";
    const meanEl = mt.querySelector(".mt-meaning");
    if(meanEl && node.dataset.meaning) meanEl.innerHTML = node.dataset.meaning;
  }
  document.addEventListener("click",(e)=>{
    const node = e.target.closest(".mt-node");
    if(node){ selectMtNode(node); }
    const quad = e.target.closest(".quad-cell");
    if(quad){ quad.classList.toggle("open"); }
    const flip = e.target.closest(".flip3d");
    if(flip){ flip.classList.toggle("flipped"); }
    const chip = e.target.closest("[data-reveal-target]");
    if(chip){
      const targetSel = chip.getAttribute("data-reveal-target");
      const scope = chip.closest("[data-reveal-scope]") || document;
      scope.querySelectorAll(targetSel).forEach(t=> t.classList.remove("shown"));
      chip.parentElement.querySelectorAll("[data-reveal-target]").forEach(b=>b.classList.remove("active"));
      chip.classList.add("active");
      const t = scope.querySelector(targetSel+'[data-key="'+chip.dataset.key+'"]') || scope.querySelector(targetSel);
      if(t) t.classList.add("shown");
    }
  });

})();
