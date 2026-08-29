/* ==========================================================================
   PizzaBurg CSR — deck engine.
   Fixed 1920x1080 stage, transform-scaled to any viewport.
   Everything on a slide lands together — no click-to-reveal anywhere.
   ========================================================================== */
(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var total = slides.length;
  var idx = 0;

  /* ---------- stage scaling (spec: css_scaling_approach) ---------- */
  function fit() {
    document.documentElement.style.setProperty(
      "--s", Math.min(innerWidth / 1920, innerHeight / 1080)
    );
  }
  addEventListener("resize", fit, { passive: true });
  addEventListener("orientationchange", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(document.documentElement);
  fit();

  /* ---------- fonts: block, never swap (spec) ---------- */
  function ready() { document.documentElement.classList.add("fonts-ready"); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready);
  setTimeout(ready, 3000);

  /* ---------- footer denominator is generated, never typed ---------- */
  slides.forEach(function (s, i) {
    var p = s.querySelector(".foot-page");
    if (p) p.textContent = String(i + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
  });

  var counter = document.getElementById("counter");
  var notesBody = document.getElementById("notes-body");
  var notesEl = document.getElementById("notes");

  function show(n) {
    if (n < 0 || n >= total || n === idx) return;
    apply(n);
  }
  function apply(n) {
    idx = n;
    slides.forEach(function (s, i) {
      var on = i === idx;
      s.classList.toggle("is-active", on);
      // spec rule 7: never display:none a slide with video; drive playback explicitly
      s.querySelectorAll("video").forEach(function (v) {
        if (on) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else { v.pause(); v.currentTime = 0; }
      });
    });
    if (counter) counter.textContent = String(idx + 1).padStart(2, "0") + " / " + String(total).padStart(2, "0");
    if (notesBody) notesBody.textContent = slides[idx].getAttribute("data-notes") || "No notes for this slide.";
    history.replaceState(null, "", "#" + (idx + 1));
  }
  var next = function () { show(idx + 1); };
  var prev = function () { show(idx - 1); };

  document.getElementById("btn-next").addEventListener("click", next);
  document.getElementById("btn-prev").addEventListener("click", prev);
  document.getElementById("btn-notes").addEventListener("click", function () {
    notesEl.classList.toggle("open");
  });
  document.getElementById("btn-fs").addEventListener("click", function () {
    if (!document.fullscreenElement) { if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); }
    else if (document.exitFullscreen) document.exitFullscreen();
  });

  addEventListener("keydown", function (e) {
    var k = e.key;
    if (k === "ArrowRight" || k === " " || k === "PageDown" || k === "ArrowDown" || k === "Enter") { e.preventDefault(); next(); }
    else if (k === "ArrowLeft" || k === "PageUp" || k === "ArrowUp" || k === "Backspace") { e.preventDefault(); prev(); }
    else if (k === "Home") { show(0); }
    else if (k === "End") { show(total - 1); }
    else if (k.toLowerCase() === "n") { notesEl.classList.toggle("open"); }
    else if (k.toLowerCase() === "f") { document.getElementById("btn-fs").click(); }
  });

  var stage = document.getElementById("viewport");
  stage.addEventListener("click", function (e) {
    if (e.target.closest(".nav") || e.target.closest(".notes")) return;
    (e.clientX < innerWidth * 0.16) ? prev() : next();
  });

  var tsx = 0, tsy = 0;
  stage.addEventListener("touchstart", function (e) { tsx = e.touches[0].clientX; tsy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tsx, dy = e.changedTouches[0].clientY - tsy;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
  }, { passive: true });

  /* ---------- presenter chrome wakes on activity, fades when idle ---------- */
  var sleepT;
  function wake() {
    document.body.classList.add("ui-awake");
    clearTimeout(sleepT);
    sleepT = setTimeout(function () { document.body.classList.remove("ui-awake"); }, 2200);
  }
  ["mousemove", "keydown", "touchstart"].forEach(function (ev) {
    addEventListener(ev, wake, { passive: true });
  });
  wake();

  var deep = parseInt((location.hash || "").replace("#", ""), 10);
  apply(!isNaN(deep) && deep >= 1 && deep <= total ? deep - 1 : 0);
})();
