/* ============================================================
   PizzaBurg HRM — Deck Engine
   Navigation, smooth fade/slide transitions, overview grid,
   presenter notes, micro-interactions (tilt, spotlight, counters,
   SVG draw-on, mini-timeline, flip cards, quadrants).
   ============================================================ */
(function(){
  "use strict";

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
  const sweepEl = document.getElementById("sweep");

  let idx = 0;
  let animating = false;
  const deepLinkIdx = parseInt((location.hash||"").replace("#",""),10);
  if(!isNaN(deepLinkIdx) && deepLinkIdx>=1 && deepLinkIdx<=total){ idx = deepLinkIdx-1; }

  slideEls.forEach((s,i)=>{
    const b=document.createElement("button");
    b.setAttribute("aria-label","Go to slide "+(i+1));
    b.addEventListener("click",()=>goTo(i));
    dotsWrap.appendChild(b);
  });
  const dotEls = Array.from(dotsWrap.children);

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
      else pos="hidden";
      s.dataset.pos = pos;
      s.classList.toggle("is-active", d===0);
    });
  }

  function animateCounters(root){
    root.querySelectorAll(".counter-num:not(.done)").forEach(el=>{
      el.classList.add("done");
      const to = parseFloat(el.dataset.to||"0");
      const suffix = el.dataset.suffix||"";
      const dur = 1300, start=performance.now();
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
  function drawPaths(root){
    root.querySelectorAll(".draw-path:not(.done)").forEach(p=>{
      p.classList.add("done");
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.getBoundingClientRect();
      p.style.transition = "stroke-dashoffset 1300ms cubic-bezier(.16,1,.3,1)";
      requestAnimationFrame(()=> p.style.strokeDashoffset = 0);
    });
  }
  function animateBars(root){
    root.querySelectorAll(".bar-fill:not(.done)").forEach((el,i)=>{
      el.classList.add("done");
      const w = el.dataset.w || "0";
      setTimeout(()=>{ el.style.width = w+"%"; }, 100+i*80);
    });
  }
  function selectMtNode(node){
    const mt = node.closest(".mt");
    mt.querySelectorAll(".mt-node").forEach(n=> n.classList.remove("active"));
    node.classList.add("active");
    const out = mt.querySelector(".mt-detail");
    if(out) out.innerHTML = node.dataset.detail || "";
    const meanEl = mt.querySelector(".mt-meaning");
    if(meanEl) meanEl.innerHTML = node.dataset.meaning || "";
  }

  function triggerReveals(slide){
    const items = slide.querySelectorAll(".reveal");
    items.forEach(el=> el.classList.remove("in"));
    void slide.offsetWidth;
    items.forEach((el,i)=>{
      const delay = el.dataset.delay ? parseInt(el.dataset.delay,10) : i*60;
      setTimeout(()=> el.classList.add("in"), 50+delay);
    });
    document.querySelectorAll("video[data-autoplay]").forEach(v=>{
      if(slide.contains(v)){ v.currentTime=0; v.play().catch(()=>{}); }
      else { v.pause(); }
    });
    setTimeout(()=>{ animateCounters(slide); drawPaths(slide); animateBars(slide); }, 200);
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

  function fireSweep(dir){
    sweepEl.classList.remove("go","rev");
    void sweepEl.offsetWidth;
    sweepEl.classList.add("go");
    if(dir<0) sweepEl.classList.add("rev");
  }

  function goTo(n){
    if(animating || n===idx || n<0 || n>=total) return;
    const dir = n > idx ? 1 : -1;
    idx = n;
    applyPositions();
    updateChrome();
    fireSweep(dir);
    animating = true;
    setTimeout(()=>{ animating=false; triggerReveals(slideEls[idx]); }, 60);
  }
  function next(){ goTo(Math.min(idx+1,total-1)); }
  function prev(){ goTo(Math.max(idx-1,0)); }

  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-prev").addEventListener("click", prev);

  window.addEventListener("keydown",(e)=>{
    if(overview.classList.contains("open")){
      if(e.key==="Escape") closeOverview();
      return;
    }
    if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"){ e.preventDefault(); next(); }
    else if(e.key==="ArrowLeft"||e.key==="PageUp"){ e.preventDefault(); prev(); }
    else if(e.key==="Home"){ goTo(0); }
    else if(e.key==="End"){ goTo(total-1); }
    else if(e.key.toLowerCase()==="g"){ toggleOverview(); }
    else if(e.key.toLowerCase()==="n"){ toggleNotes(); }
    else if(e.key.toLowerCase()==="f"){ toggleFullscreen(); }
  });

  let tsx=0,tsy=0;
  stageEl.addEventListener("touchstart",(e)=>{ tsx=e.touches[0].clientX; tsy=e.touches[0].clientY; },{passive:true});
  stageEl.addEventListener("touchend",(e)=>{
    const dx=e.changedTouches[0].clientX-tsx, dy=e.changedTouches[0].clientY-tsy;
    if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)){ dx<0? next():prev(); }
  },{passive:true});

  let wheelLock=false;
  window.addEventListener("wheel",(e)=>{
    if(overview.classList.contains("open")) return;
    if(Math.abs(e.deltaY) < 42) return;
    if(wheelLock) return;
    wheelLock=true;
    e.deltaY>0 ? next() : prev();
    setTimeout(()=> wheelLock=false, 650);
  },{passive:true});

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

  applyPositions();
  updateChrome();
  setTimeout(()=> triggerReveals(slideEls[idx]), 120);

  /* ---- micro-interactions ---- */
  document.querySelectorAll(".tilt-card").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5;
      card.style.transform = `rotateY(${px*8}deg) rotateX(${-py*8}deg) translateZ(6px)`;
    });
    card.addEventListener("mouseleave",()=>{ card.style.transform="rotateY(0) rotateX(0)"; });
  });
  document.querySelectorAll(".spotlit").forEach(el=>{
    el.addEventListener("mousemove",(e)=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty("--mx",((e.clientX-r.left)/r.width*100)+"%");
      el.style.setProperty("--my",((e.clientY-r.top)/r.height*100)+"%");
    });
  });
  document.addEventListener("click",(e)=>{
    const node = e.target.closest(".mt-node");
    if(node){ selectMtNode(node); }
    const quad = e.target.closest(".quad-cell");
    if(quad){ quad.classList.toggle("open"); }
    const flip = e.target.closest(".flip3d");
    if(flip){ flip.classList.toggle("flipped"); }
  });

})();
