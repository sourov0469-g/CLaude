(function () {
  document.querySelectorAll('.rev-bg').forEach(function (s) { Owl.bg.rings(s); });
  document.querySelectorAll('.rev-v1 .vcard').forEach(function (f) { Owl.videoCard(f); });
  var r = document.querySelector('.rev-v2'); if (!r) return;
  var holder = r.querySelector('.rv2-main'), items = [].slice.call(r.querySelectorAll('.rv2-item'));
  function mount(yt, title, cap) { // rebuild the player as a fresh thumbnail card for the chosen video
    var old = holder.querySelector('.vcard'), img = r.querySelector('.rv2-item[data-yt="' + yt + '"] img').getAttribute('src');
    var fig = document.createElement('figure'); fig.className = 'vcard rv2-player'; fig.dataset.yt = yt; fig.dataset.title = title;
    fig.innerHTML = '<button class="vcard-btn" type="button"><img alt="" src="' + img + '"><span class="vcard-play"><svg class="icon" aria-hidden="true"><use href="#icon-action-play"/></svg></span></button><figcaption class="rv2-cap"></figcaption>';
    fig.querySelector('.vcard-btn').setAttribute('aria-label', 'Play: ' + title); fig.querySelector('figcaption').innerHTML = cap;
    old.replaceWith(fig); Owl.videoCard(fig);
  }
  Owl.videoCard(holder.querySelector('.vcard'));
  items.forEach(function (b) { b.addEventListener('click', function () { items.forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); mount(b.dataset.yt, b.dataset.title, b.dataset.cap); holder.querySelector('.vcard-btn').focus(); }); });
})();
