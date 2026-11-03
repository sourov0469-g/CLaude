/* OWNER · Home 8b · What homeowners wrote: the twenty published Google reviews, verbatim (FACTS.md). A swipeable row of
   cards (native scroll with snap on touch, drag with a mouse, arrows and keys); filters by room from the review's own
   words; long reviews fold to six lines with "Read all". Cards rise in as the row arrives. Reduced motion: no rise
   [S1443 gestures, S1018 keyboard, S0400]. */
(function () {
  // [text, name as shown, date as shown, tags] (tags only from the review's own words: kitchen, bathroom, or another job)
  var R = [
    ['Excellent beautiful work on our kitchen project. Asher passion and professionalism were outstanding! Very happy with the outcome', 'Alan Schroeder', 'a year ago', 'kitchen'],
    ['I am very grateful that Ashley took on my project . Now every morning I run to my beautiful kitchen because it is more than I expected. Thank you Ashley for your efforts, understanding and patience', 'RIo Norman', 'a year ago', 'kitchen'],
    ['Sean has experience and he gave me the best ideas for my kitchen and bathroom project. He did high quality Job . We are very satisfied', 'J C', 'a year ago', 'kitchen bath'],
    ['Highly recommended for any bathroom or kitchen projects! Raz is very knowledgeable at this field and gave us wonderful ideas for the design. It was done in a timely manner. Thank you !!', 'Valerie Cisneros', 'a year ago', 'kitchen bath'],
    ['If you are planning to remodel your kitchen or bathroom or do any other construction project, call Sean from Elbaz Construction . He has a lot of experience and will recommend the best options/ suggestions to your project. He did high quality job !', 'Kameron Allison', 'a year ago', 'kitchen bath'],
    ['Thank you Ashley ! We love the new bathrooms. Good with communication and very clear with explanations . I will definitely use them again in the future', 'Andrew Tyupa', 'a year ago', 'bath'],
    ['If I could refer anybody to getting their bathroom redone it\'s through this company very reliable honest and clean work', 'Jonathan Vargas', '11 months ago', 'bath'],
    ['Outstanding service by Elbaz Construction. The team finished our bathroom in a timely fashion. Highly recommended for anyone who is looking for à reliable construction work', 'Paco Jazz', 'a year ago', 'bath'],
    ['Very satisfied with my bathroom and the way it looks now they crew was very professional, The service was quick, and the staff was friendly , The customer service staff went above and beyond , The customer support was fantastic! They quickly resolved my bathroom issues and were very friendly , highly recommended!!', 'Leynol Carvajal', 'a year ago', 'bath'],
    ['Dealing with Asher was a truly enjoyable experience. His team is experienced and swift. They did a splendid job!', 'Sandy Zurita', 'a year ago', ''],
    ['Elbaz Construction provided excellent service and outstanding craftsmanship. The team was professional and attentive to our needs. We\'re extremely satisfied with the results!', 'Damian Nunez', 'a year ago', ''],
    ['Asher was knowledgeable and gave us cool ideas that we didn\'t even know before. Nice beautiful color and design. We appreciate the price !', 'Sierra Bernabeo', 'a year ago', ''],
    ['We had a good time dealing with Asher and the crew, he went over and above all our expectations and made every effort to ensure that the end result was up to their high standards. Thank you !!', 'Emmett Giffin', 'a year ago', ''],
    ['Elbaz Construction provided excellent service and great customer service. also provide the right team to get the job done. Any project or style that\'s needed it. Elbaz Construction is the place to call. Thank you!', 'Jaee Rodriguez', 'a year ago', ''],
    ['Great experience! The team was professional, efficient, and delivered high-quality work on time. They communicated clearly throughout the project and exceeded our expectations. Highly recommend for any construction needs!', 'Andrew', 'a year ago', ''],
    ['Asher was the best choice I have made. We love the outcome of the ADU . They showed up on time and did a great job, were friendly. No issues at all during the whole process. Very organized team . I would recommend them to everyone I know !', 'Robert Bryan', 'a year ago', 'other'],
    ['Really glad we went with Elbaz Construction for our ADU . They were in and out faster than we expected which I appreciated , and the price seemed reasonable. Overall great experience!!', 'Kirtsada Shearing', 'a year ago', 'other'],
    ['Asher has a lot of experience . We replaced our windows to energy efficient windows. He got down to business right away and did high quality work. His team is very professional! Thanks again', 'jessica berliner', 'a year ago', 'other'],
    ['I give them a five star rating not only for their excellent roofing skills and timelines, but also for their competitive pricing and the honesty and professionalism of the team !! We are very pleased with the outcome', 'Zachary Gugliotta', 'a year ago', 'other'],
    ['The team was amazing. Did a fabulous job with the landscaping, roofing and backyard renovation. The best contractors I have worked with! Will definitely use this company in the future.', 'Derpy Day', 'a year ago', 'other']
  ];
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  EZ.section('voices', {
    1: { init: function (root, k) {
      var rail = root.querySelector('.vc__rail'), count = root.querySelector('.vc__count');
      var chips = Array.prototype.slice.call(root.querySelectorAll('.vc__chip'));
      rail.innerHTML = R.map(function (r, i) {
        return '<li class="vc__c" data-tags="' + r[3] + '" style="--i:' + i + '"><figure class="vc__fig">' +
          '<p class="vc__st" role="img" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>' +
          '<blockquote class="vc__q" id="vc-q' + i + '"><p>&ldquo;' + esc(r[0]) + '&rdquo;</p></blockquote>' +
          '<button type="button" class="vc__more" aria-expanded="false" aria-controls="vc-q' + i + '" hidden>Read all</button>' +
          '<figcaption class="vc__by"><span class="vc__av" aria-hidden="true">' + esc(r[1].trim().charAt(0).toUpperCase()) + '</span>' +
          '<span class="vc__who"><span class="vc__n">' + esc(r[1]) + '</span><span class="vc__d">on Google &middot; ' + r[2] + '</span></span></figcaption>' +
          '</figure></li>';
      }).join('');
      var cards = Array.prototype.slice.call(rail.children);
      // long reviews fold to six lines; "Read all" opens the card in place
      function folds() {
        cards.forEach(function (c) {
          var q = c.querySelector('.vc__q'), b = c.querySelector('.vc__more');
          if (c.classList.contains('is-open')) return;
          b.hidden = q.scrollHeight <= q.clientHeight + 2;
        });
      }
      cards.forEach(function (c) {
        var b = c.querySelector('.vc__more');
        k.on(b, 'click', function () { var open = !c.classList.contains('is-open'); c.classList.toggle('is-open', open); b.setAttribute('aria-expanded', open ? 'true' : 'false'); b.textContent = open ? 'Show less' : 'Read all'; });
      });
      function visible() { return cards.filter(function (c) { return !c.hidden; }); }
      function upd() {
        var v = visible(); if (!v.length) { count.textContent = ''; return; }
        var r = rail.getBoundingClientRect(), first = -1, last = -1;
        v.forEach(function (c, i) { var q = c.getBoundingClientRect(), seen = Math.min(q.right, r.right) - Math.max(q.left, r.left); if (seen > q.width * .6) { if (first < 0) first = i; last = i; } });   // a card counts once it is mostly on screen
        if (first < 0) first = last = 0;
        count.textContent = (first === last ? (first + 1) : (first + 1) + '–' + (last + 1)) + ' of ' + v.length;
      }
      function filter(f) {
        chips.forEach(function (ch) { ch.setAttribute('aria-pressed', ch.dataset.f === f ? 'true' : 'false'); });
        cards.forEach(function (c) { c.hidden = f !== 'all' && c.dataset.tags.split(' ').indexOf(f) < 0; });
        rail.scrollLeft = 0; folds(); upd();
        if (k.motion) gsap.fromTo(visible().slice(0, 4), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .4, ease: 'power3.out', stagger: .05, clearProps: 'transform,opacity' });
      }
      chips.forEach(function (ch) { k.on(ch, 'click', function () { filter(ch.dataset.f); }); });
      function step(d) { var c = visible()[0]; if (!c) return; var w = c.getBoundingClientRect().width + 16; rail.scrollBy({ left: d * w * Math.max(1, Math.floor(rail.clientWidth / w)), behavior: k.motion ? 'smooth' : 'auto' }); }
      root.querySelectorAll('.vc__btn').forEach(function (b) { k.on(b, 'click', function () { step(+b.dataset.d); }); });
      k.on(rail, 'keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
      k.on(rail, 'scroll', upd);
      // mouse drag (touch scrolls natively)
      var dn = null;
      k.on(rail, 'pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.target.closest('button')) return; dn = { x: e.clientX, l: rail.scrollLeft }; rail.classList.add('is-grab'); });
      k.on(window, 'pointermove', function (e) { if (dn) rail.scrollLeft = dn.l - (e.clientX - dn.x); });
      k.on(window, 'pointerup', function () { if (dn) { dn = null; rail.classList.remove('is-grab'); } });
      k.ro(rail, function () { folds(); upd(); });
      folds(); upd();
      k.add(function () { rail.innerHTML = ''; count.textContent = ''; });
      EZ.reveal(k, root.querySelectorAll('.vc__head > *, .vc__bar, .vc__foot'));
      if (!k.motion) return;
      gsap.set(cards.slice(0, 5), { y: 40, opacity: 0 });
      var st = ScrollTrigger.create({ trigger: rail, start: 'top 85%', once: true, onEnter: function () { gsap.to(cards.slice(0, 5), { y: 0, opacity: 1, duration: .65, ease: 'power3.out', stagger: .08, clearProps: 'transform,opacity' }); } });
      k.add(function () { st.kill(); });
    } }
  });
})();
