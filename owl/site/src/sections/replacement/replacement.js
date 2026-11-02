/* V2: the roof's layers lay themselves as the section passes (courses motif, eave to ridge) */
(function () { var s = document.querySelector('.rp2-art'); if (!s) return; var c = Owl.courses(s, { rows: 7, width: 600, height: 300 }); Owl.scrub(s, c.set, { start: 0.95, end: 0.45 }); })();
