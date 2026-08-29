/* ============================================================
   PizzaBurg HRM — Presentation Engine
   Arrow keys / click / swipe to advance. Everything on a slide
   appears on arrival — no click-to-reveal anywhere.
   ============================================================ */
(function(){
  "use strict";

  const stageEl   = document.querySelector(".slides");
  const slideEls  = Array.from(document.querySelectorAll(".slide"));
  const total     = slideEls.length;
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
  const deepLink = parseInt((location.hash||"").replace("#",""),10);
  if(!isNaN(deepLink) && deepLink>=1 && deepLink<=total){ idx = deepLink-1; }

  // overview cards
  slideEls.forEach((s,i)=>{
    const card=document.createElement("div");
    card.className="ov-card";
    const sw=document.createElement("div"); sw.className="swatch";
    sw.style.background = s.dataset.swatch || "var(--accent)";
    const num=document.createElement("div"); num.className="num"; num.textContent=String(i+1).padStart(2,"0");
    const ttl=document.createElement("div"); ttl.className="ttl"; ttl.textContent=s.dataset.title||("Slide "+(i+1));
    card.append(sw,num,ttl);
    card.addEventListener("click",()=>{ goTo(i); closeOverview(); });
    ovGrid.appendChild(card);
  });
  const ovCards = Array.from(ovGrid.children);

  function applyPositions(){
    slideEls.forEach((s,i)=>{
      const d = i - idx;
      s.dataset.pos = d===0 ? "active" : d===1 ? "next" : d===-1 ? "prev" : "hidden";
      s.classList.toggle("is-active", d===0);
    });
  }

  function animateBars(root){
    root.querySelectorAll(".bfill:not(.done)").forEach((el,i)=>{
      el.classList.add("done");
      const w = el.dataset.w || "0";
      setTimeout(()=>{ el.style.width = w+"%"; }, 150+i*90);
    });
  }
  function animateCounters(root){
    root.querySelectorAll(".counter-num:not(.done)").forEach(el=>{
      el.classList.add("done");
      const to = parseFloat(el.dataset.to||"0");
      const suffix = el.dataset.suffix||"";
      const dur=1100, start=performance.now();
      (function step(t){
        const p=Math.min(1,(t-start)/dur), e=1-Math.pow(1-p,3);
        el.textContent = Math.round(to*e) + suffix;
        if(p<1) requestAnimationFrame(step);
      })(start);
    });
  }
  function drawPaths(root){
    root.querySelectorAll(".draw-path:not(.done)").forEach(p=>{
      p.classList.add("done");
      const len=p.getTotalLength();
      p.style.strokeDasharray=len; p.style.strokeDashoffset=len;
      p.getBoundingClientRect();
      p.style.transition="stroke-dashoffset 1100ms cubic-bezier(.16,1,.3,1)";
      requestAnimationFrame(()=> p.style.strokeDashoffset=0);
    });
  }

  // everything lands together, fast — a slide is fully readable within ~half a second
  function reveal(slide){
    const items = slide.querySelectorAll(".rv");
    items.forEach(el=> el.classList.remove("in"));
    void slide.offsetWidth;
    items.forEach((el,i)=> setTimeout(()=> el.classList.add("in"), 30 + i*28));
    document.querySelectorAll("video[data-autoplay]").forEach(v=>{
      if(slide.contains(v)){ v.currentTime=0; v.play().catch(()=>{}); } else { v.pause(); }
    });
    setTimeout(()=>{ animateBars(slide); animateCounters(slide); drawPaths(slide); }, 160);
  }

  function updateChrome(){
    ovCards.forEach((c,i)=> c.classList.toggle("current", i===idx));
    progressFill.style.width = ((idx)/(total-1)*100).toFixed(2)+"%";
    counterEl.innerHTML = "<b>"+String(idx+1).padStart(2,"0")+"</b> / "+String(total).padStart(2,"0");
    const s = slideEls[idx];
    sectionLabel.textContent = s.dataset.section || "";
    notesBody.textContent = s.dataset.notes || "No notes for this slide.";
    const presenter = s.dataset.presenter || "";
    const chip = speakerAvatar.parentElement;
    if(presenter){
      speakerAvatar.textContent = presenter.split(" ").map(w=>w[0]).slice(0,2).join("");
      speakerWho.innerHTML = "Presented by<b>"+presenter+"</b>";
      chip.style.display="flex";
    } else { chip.style.display="none"; }
    history.replaceState(null,"","#"+(idx+1));
  }

  function goTo(n){
    if(animating || n===idx || n<0 || n>=total) return;
    idx = n;
    applyPositions();
    updateChrome();
    animating = true;
    setTimeout(()=>{ animating=false; reveal(slideEls[idx]); }, 50);
  }
  const next = ()=> goTo(Math.min(idx+1,total-1));
  const prev = ()=> goTo(Math.max(idx-1,0));

  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-prev").addEventListener("click", prev);

  window.addEventListener("keydown",(e)=>{
    if(overview.classList.contains("open")){ if(e.key==="Escape") closeOverview(); return; }
    const k=e.key.toLowerCase();
    if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"||e.key==="ArrowDown"||e.key==="Enter"){ e.preventDefault(); next(); }
    else if(e.key==="ArrowLeft"||e.key==="PageUp"||e.key==="ArrowUp"||e.key==="Backspace"){ e.preventDefault(); prev(); }
    else if(e.key==="Home"){ goTo(0); }
    else if(e.key==="End"){ goTo(total-1); }
    else if(k==="g"){ toggleOverview(); }
    else if(k==="n"){ toggleNotes(); }
    else if(k==="f"){ toggleFullscreen(); }
  });

  // click anywhere advances; click the left sixth goes back
  stageEl.addEventListener("click",(e)=>{
    if(e.target.closest("video")) return;
    (e.clientX < window.innerWidth*0.16) ? prev() : next();
  });

  let tsx=0,tsy=0;
  stageEl.addEventListener("touchstart",(e)=>{ tsx=e.touches[0].clientX; tsy=e.touches[0].clientY; },{passive:true});
  stageEl.addEventListener("touchend",(e)=>{
    const dx=e.changedTouches[0].clientX-tsx, dy=e.changedTouches[0].clientY-tsy;
    if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)){ dx<0? next():prev(); }
  },{passive:true});

  let wheelLock=false;
  window.addEventListener("wheel",(e)=>{
    if(overview.classList.contains("open")) return;
    if(Math.abs(e.deltaY)<40 || wheelLock) return;
    wheelLock=true; e.deltaY>0 ? next() : prev();
    setTimeout(()=> wheelLock=false, 620);
  },{passive:true});

  function toggleOverview(){ overview.classList.toggle("open"); }
  function closeOverview(){ overview.classList.remove("open"); }
  document.getElementById("btn-overview").addEventListener("click", toggleOverview);
  overview.addEventListener("click",(e)=>{ if(e.target===overview) closeOverview(); });

  function toggleNotes(){ notesDraw.classList.toggle("open"); notesBtn.classList.toggle("active"); }
  notesBtn.addEventListener("click", toggleNotes);

  function toggleFullscreen(){
    if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }
  document.getElementById("btn-fs").addEventListener("click", toggleFullscreen);

  applyPositions();
  updateChrome();
  setTimeout(()=> reveal(slideEls[idx]), 100);
})();
