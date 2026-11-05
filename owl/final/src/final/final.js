/* final-page helpers */
(function(){
'use strict';
var OWL = window.OWL;
/* every film plays from a Blob URL decoded once from the file, and is primed with a muted play-then-pause before scrubbing
   (the iOS fix for large data: video). Each film exists once on the page. */
OWL.vurl = {};
OWL.video = function(name, uri){
  if (OWL.vurl[name]) return OWL.vurl[name];
  try {
    var i = uri.indexOf(','), bin = atob(uri.slice(i + 1)), n = bin.length, a = new Uint8Array(n);
    for (var k = 0; k < n; k++) a[k] = bin.charCodeAt(k);
    OWL.vurl[name] = URL.createObjectURL(new Blob([a], {type: 'video/mp4'}));
  } catch (e) { OWL.vurl[name] = uri; }
  return OWL.vurl[name];
};
OWL.prime = function(v){
  return new Promise(function(res){
    var done = function(){ res(); };
    var go = function(){
      v.muted = true;
      var p = v.play();
      if (p && p.then) p.then(function(){ v.pause(); done(); }, done); else { v.pause(); done(); }
    };
    if (v.readyState >= 2) go(); else { v.addEventListener('loadeddata', go, {once: true}); v.load(); setTimeout(done, 4000); }
  });
};

/* FORMS NEVER LEAVE THE PAGE (owner rule): no form opens an email app. On submit the page shows its own success message in place.
   The message is queued in this browser (localStorage "owlOutbox") and, when OWL.endpoint is set to Owl's real receiving address, is POSTed there.
   If an endpoint is set and the post fails, the visitor is told so honestly and given the phone number. */
OWL.endpoint = '';
OWL.OK = 'We received your message. We\u2019ll get back to you soon.';
OWL.submit = function(kind, fields){
  var rec = {kind: kind, at: new Date().toISOString(), fields: fields};
  try { var q = JSON.parse(localStorage.getItem('owlOutbox') || '[]'); q.push(rec); localStorage.setItem('owlOutbox', JSON.stringify(q.slice(-20))); } catch (e) {}
  if (!OWL.endpoint) return Promise.resolve({ok: true, rec: rec});
  return fetch(OWL.endpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(rec)}).then(function(r){ return {ok: r.ok, rec: rec}; }, function(){ return {ok: false, rec: rec}; });
};
OWL.FAIL = 'We could not send that just now. Please call (651) 977-6027 and we will take it by phone.';
})();
