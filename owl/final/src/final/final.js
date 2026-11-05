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
})();
