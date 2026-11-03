/* Hours V2: marks today and says whether Owl is open now, in Shoreview's time zone (America/Chicago). Hours are the
   lock's Mon-Sat 8:00-18:00; Sunday has no hours in the lock, so it reads "Closed". */
(function () {
  var r = document.querySelector('.kv-v2'); if (!r) return;
  try {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    var get = function (t) { return (parts.filter(function (p) { return p.type === t; })[0] || {}).value; };
    var d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), h = +get('hour') + (+get('minute')) / 60;
    var li = r.querySelector('.kv2-week [data-d="' + d + '"]'); li && li.classList.add('is-today'); li && li.setAttribute('aria-current', 'date');
    var open = d >= 1 && d <= 6 && h >= 8 && h < 18, now = r.querySelector('.kv2-now');
    if (open) now.textContent = 'Open now, until 18:00 Shoreview time.';
    else { var nd = (d === 6 && h >= 18) || d === 0 ? 'Monday' : (h >= 18 ? 'tomorrow' : 'today'); now.textContent = 'Closed now. Opens ' + nd + ' at 8:00 Shoreview time. You can still text us.'; }
  } catch (e) { /* the static hours line stays */ }
})();
