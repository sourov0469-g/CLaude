(function () {
  var filename = 'https://tympanus.net/codrops/adpacks/demoad.css?' + new Date().getTime();
  var fileref = document.createElement('link');
  fileref.rel = 'stylesheet';
  fileref.type = 'text/css';
  fileref.href = filename;
  document.head.appendChild(fileref);

  function pickPlacement(callback) {
    if (window.__codropsPlacementConfig) {
      callback(window.__codropsPlacementConfig.pick());
      return;
    }

    var s = document.createElement('script');
    s.src = 'https://tympanus.net/codrops/adpacks/placement-config.js';

    s.onload = function () {
      callback(
        window.__codropsPlacementConfig
          ? window.__codropsPlacementConfig.pick()
          : 'in-demo-placement',
      );
    };

    s.onerror = function () {
      callback('in-demo-placement');
    };

    document.head.appendChild(s);
  }

  var box = document.createElement('div');
  box.id = 'in-demo-placement-box';
  document.body.appendChild(box);

  pickPlacement(function (placement) {
    fetch(
      'https://tympanus.net/codrops/wp-admin/admin-ajax.php?action=aa-server-select&p=' + placement,
    )
      .then(function (res) {
        return res.text();
      })
      .then(function (body) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(body, 'text/html');
        var ad_container = doc.querySelector('div');

        if (!ad_container) return;

        // 🔑 EXACT same behavior as Advanced Ads
        box.innerHTML = ad_container.innerHTML;

        var cdawrap = box.querySelector('#cdawrap');
        if (!cdawrap) return;

        // ✅ augment AFTER injection
        var link = cdawrap.querySelector('a');
        if (link) {
          var carbonText = document.createElement('div');
          carbonText.className = 'carbon-text';
          carbonText.appendChild(link);
          cdawrap.insertBefore(carbonText, cdawrap.firstChild);
        }

        var footer = document.createElement('div');
        footer.className = 'cda-footer';

        var close = document.createElement('span');
        close.id = 'cda-remove';
        close.className = 'cda-remove';
        close.textContent = 'Close';

        footer.appendChild(close);
        cdawrap.appendChild(footer);
      });
  });

  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'cda-remove') {
      var wrap = document.getElementById('cdawrap');
      if (wrap) wrap.style.display = 'none';
      e.preventDefault();
    }
  });
})();
