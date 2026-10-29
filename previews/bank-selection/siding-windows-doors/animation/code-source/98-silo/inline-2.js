
  // Lenis smooth-scrolls the page. On desktop the material columns are their
  // own native scroll container, and the handoff between the two scrollers is
  // positional, not just spatial: a wheel over the columns belongs to the PAGE
  // until the shop actually fills the screen — otherwise the columns start
  // consuming scroll while the shop is still half-entered, headers cut off,
  // which reads as the page jamming. Only once the grid's top edge has parked
  // at the viewport top do the columns take over.
  let gridLenis = null;
  const gridAligned = () => {
    const grid = document.querySelector('.mat-cols');
    return !grid || grid.getBoundingClientRect().top <= 4;
  };
  // gridLenis is the columns' own instance, declared below. Lenis calls
  // preventDefault on every wheel it sees, so native scroll chaining is gone:
  // when the grid is at either end and the wheel keeps going, the grid's
  // instance lets the event through and THIS one has to take it, or the page
  // is stuck under a parked grid.
  const gridAtEdge = () => !gridLenis
    || gridLenis.animatedScroll <= 0 || gridLenis.animatedScroll >= gridLenis.limit;
  // Speed limit. Two caps on wheel input, applied before Lenis reads it
  // (its `virtualScroll` option sees the delta object before the values are
  // read off it, so clamping there sticks): each event's delta is capped, and
  // the target may only run so far ahead of the smoothed position — that
  // second one is the real ceiling, since with a lerp the speed is
  // proportional to that lead. Roughly a third of a screen of lead is about
  // two screens a second flat out, and the explode cannot be flicked open.
  // 40px per event clamped normal scrolling, not just flicks: one notch of a
  // mouse wheel is ~100px and a trackpad's momentum events run past 150, so
  // every ordinary gesture arrived flattened to a constant rate — the wheel
  // stopped feeling connected to the page. 100 leaves normal input alone and
  // trims only the violent end. The lead cap is the real ceiling anyway (with
  // a lerp, speed is proportional to lead): a third of a screen is about two
  // screens a second flat out, which is the number the note above describes.
  const MAX_WHEEL_DELTA = 100;
  const maxLead = () => 0.3 * window.innerHeight;
  const speedLimit = (getLenis) => (d) => {
    const l = getLenis();
    if (!l) return;
    if (Math.abs(d.deltaY) > MAX_WHEEL_DELTA) d.deltaY = Math.sign(d.deltaY) * MAX_WHEEL_DELTA;
    const cap = maxLead();
    const lead = l.targetScroll - l.animatedScroll + d.deltaY;
    if (lead > cap) d.deltaY -= lead - cap;
    else if (lead < -cap) d.deltaY -= lead + cap;
  };

  const lenis = new Lenis({
    virtualScroll: speedLimit(() => lenis),
    prevent: (node) => !!(node && node.closest && node.closest('.mat-cols'))
      && isMatDesktop() && gridAligned() && !gridAtEdge()
  });
  // The page ends at the shop. There was a footer under it — a mark, an
  // Instagram link and INFO — which had a whole reveal cycle of its own so it
  // stayed blank until the scroll ran out at the bottom of BOTH scrollers.
  // It is gone (EC, 8/23), and so is that machinery: the last thing on the
  // page is the thing the page is for.
  lenis.on('scroll', () => {
    ScrollTrigger.update();
    // Momentum clamp: approaching from above, the page PARKS at the shop —
    // Lenis's leftover velocity must not coast past it, or the grid starts
    // its explode with its own headers scrolled out of view. Only clamped on
    // the approach; once past (deep-linked, or returning up from the footer),
    // the page moves freely.
    const grid = document.querySelector('.mat-cols');
    if (grid && isMatDesktop()) {
      const gridDocY = grid.getBoundingClientRect().top + window.scrollY;
      if (lenis.animatedScroll < gridDocY - 1 && lenis.targetScroll > gridDocY) {
        lenis.scrollTo(gridDocY);
      }
    }
  });
  gsap.ticker.add((time) => {lenis.raf(time * 1000);});
  gsap.ticker.lagSmoothing(0);

  const MAT_DESKTOP = '(min-width: 992px)';
  const isMatDesktop = () => window.matchMedia(MAT_DESKTOP).matches;

  // The columns get the same smoothing the page has. On silosilosilo.com the
  // explode is driven off the window, which Lenis smooths, and that lerp is
  // half of the feel — the pieces are read off a scroll position that eases,
  // not off raw wheel ticks. Here the grid is its own scroller, so it needs
  // its own instance. It only takes the wheel while the grid is the active
  // surface (desktop, and parked at the top of the window), and at either
  // end it lets the event through so the page picks it up as before.
  const matGrid = document.querySelector('.mat-cols');
  gridLenis = matGrid ? new Lenis({
    wrapper: matGrid,
    content: matGrid,
    overscroll: true,
    virtualScroll: speedLimit(() => gridLenis),
    prevent: () => !(isMatDesktop() && gridAligned())
  }) : null;
  if (gridLenis) {
    gridLenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {gridLenis.raf(time * 1000);});
  }

  let explodeTriggers = [];
  let explodeParts = [];
  let sharedProgress = true;

  // Desktop puts the three materials side by side on one scroll surface, so
  // they open and close together, off the MAX progress across the columns —
  // scrolling aluminum must not leave brass and titanium sitting closed beside
  // it, which is the whole point of three exploded materials in a row. The max,
  // not the last one touched: scrolling a second column after the first is open
  // must not drag the first shut, and scrolling back to the top closes all three.
  //
  // Mobile stacks them instead, one material per screen, so each column is
  // driven by its own trigger. A shared progress there would open all three at
  // once — you would arrive at brass to find it already apart, with nothing
  // left to scroll it through.
  // Share of the opening run within which a closing stack snaps shut.
  const CLOSE_MAGNET = 0.3;
  // Share of the opening run by which the closed stack's offer has faded out
  // — the point past which there is nothing left to stop on. Kept in step
  // with the offer's own tween below.
  const OFFER_GONE = 0.35;
  // How long the pieces take to catch up to where the scroll says they are —
  // scrub, in other words, and short enough that they move WITH the wheel.
  // This was a rate cap with a 1.4s floor: every wheel event scheduled a
  // tween of at least 1.4 seconds, so the pieces were still travelling more
  // than a second after the wheel stopped, and a full open took four seconds
  // of animation no matter how you scrolled. That decoupling is what read as
  // jank — the surface never tracked the hand.
  const OPEN_LAG = 0.35;
  // A ceiling still applies, but as a ceiling rather than a speed: a jump of
  // half the run takes half a second, a nudge takes OPEN_LAG. The explode
  // cannot be thrown open in one flick, and it is never slower than the hand.
  // This is the limit that holds on a phone, where touch scroll is native and
  // cannot be capped at the input.
  const OPEN_RATE = 1;
  function driveExplodes() {
    if (!explodeParts.length) return;
    const shared = sharedProgress
      ? explodeParts.reduce((m, x) => Math.max(m, x.st.progress), 0)
      : null;
    explodeParts.forEach((x) => {
      const p = shared === null ? x.st.progress : shared;
      // What `scrub` used to do, applied per column: the timeline is paused,
      // and this tween is what carries it to where the scroll says it should be.
      // The two directions feel different on purpose. Opening (scrolling
      // down) tracks the scroll gently — a long, soft catch-up, no snap, so
      // the pieces part smoothly under the finger. Closing (scrolling up) is
      // magnetic: a quick expo catch-up, and once the stack is within the
      // magnet zone of closed it is pulled the rest of the way shut on its
      // own, like the pieces seating on a magnet.
      const last = x.target === undefined ? x.proxy.p : x.target;
      const closing = p < last || (p === last && x.st.direction < 0);
      let target = p;
      if (closing && p < CLOSE_MAGNET * EXPAND_END) target = 0;
      x.target = p;
      const openDur = Math.max(OPEN_LAG, Math.abs(target - x.proxy.p) / OPEN_RATE);
      gsap.to(x.proxy, {
        p: target,
        duration: closing ? 0.6 : openDur,
        ease: closing ? 'expo.out' : 'power2.out',
        overwrite: true,
        onUpdate: () => applyPart(x),
        onComplete: () => applyPart(x)
      });
    });
  }

  function applyPart(x) {
    const p = x.proxy.p;
    x.tl.progress(p);
    // Closed only at the start. Five pieces sitting on top of each other are
    // five overlapping hit targets, so the piece controls stay dead until they
    // part — and the offer panel, which keeps its slot in the frame while
    // faded, takes clicks over exactly the same stretch. Closed, the whole
    // stack is one target and one price, which is what the panel is showing.
    //
    // Only on the change. This ran two classList writes per section per frame
    // of every scroll, and one of the classes is read by :has() rules — the
    // kind of per-frame style work that has no business in the scroll path.
    const closed = p < stackedBelow;
    if (closed !== x.wasClosed) {
      x.wasClosed = closed;
      x.stack.classList.toggle('is-stacked', closed);
      x.section.classList.toggle('is-panel-live', closed);
      if (window.syncBarHint) window.syncBarHint();
    }
  }

  // There is one explode per material now, each inside its own column. Every
  // query below is scoped to its section — the selectors used to be global,
  // which would drive both stacks off whichever timeline ran last.
  //
  // "Started on a stack. Then as you scroll down, it expands. Then the stepper
  // comes up for quantities." And it does not end there: "there's a step after
  // 90 that brings it back together… it reassembles the full stack. You get an
  // offer for a full stack at the beginning and the end. In between, you can
  // buy individual." Closed offer, open configurator, closed receipt.
  //
  const EXPAND_RUN = 1;   // share of the scroll range spent opening
  // The held stretch at the cap. The stack opens, and then the scroll is
  // STUCK there for a bit — fully open, frame parked, steppers still — before
  // the wall runs out and the column moves on; coming back up, the same
  // stretch keeps it open before the close begins. This dwell was cut once
  // (it read as the page stopping dead) and is back by request at 08-19: the
  // open state is the configurator, and arriving at it should feel like
  // arriving, not like driving past. The scroll distance the dwell occupies
  // follows this number on its own — the desktop wall is written from it
  // (--wall-screens, below) and the mobile travel is a multiple of T — so the
  // opening's px-per-progress does not move when this does. One number.
  //
  // 0.75 was cut to 0.4 (~210px of wheel) on the theory that a long dead stop
  // reads as the scroll jamming. That theory is retired. 0.8 on EC's call
  // 8/21 — "it needs to stop at this screen more" — and 1.15 on 8/23, "a bit
  // longer" again: ~560px, about two thirds of a screen standing on the open
  // configurator. It is the thing the page is for, and it should be hard to
  // scroll past by accident.
  const OPEN_HOLD = 1.15;
  const EXPAND_END = EXPAND_RUN / (EXPAND_RUN + OPEN_HOLD);

  // How much wheel the OPENING takes, in scroller screens. Holding this fixed
  // is what lets the dwell above move on its own: the pieces part at the same
  // rate per pixel whatever OPEN_HOLD is set to, and only the beat at the cap
  // gets longer. The wall the run is measured against follows from the two —
  // one screen for the parked frame, plus the run itself — and is written
  // into the stylesheet from here rather than typed there a second time. It
  // was typed there a second time, and the two had already drifted: the CSS
  // said 2 screens while the comment beside it said 2.34.
  const OPEN_SCREENS = 0.714;
  document.documentElement.style.setProperty(
    '--wall-screens', String(1 + OPEN_SCREENS * (EXPAND_RUN + OPEN_HOLD)));

  // The dwell on its own, in screens — what the two constants above are worth
  // once the opening is paid for. The accessories hold for the same beat (see
  // parkAccessories), and this is how they get it: the beat is one number,
  // written once, rather than a second one typed somewhere else that starts
  // out equal and drifts the first time this one moves.
  document.documentElement.style.setProperty(
    '--acc-screens', String(OPEN_SCREENS * OPEN_HOLD));

  // Where "stacked" ends, as a fraction of the whole timeline. One cut, not
  // two: the stack no longer comes back together at the far end, so there is
  // no second closed stretch to gate.
  let stackedBelow = 0.35;

  function createScrollTrigger() {
    // Where each stack was before the rebuild, by section. The rebuild fires
    // when the cart strip first opens, and resetting every proxy to closed
    // and tweening back out replayed the whole explode across the page —
    // three stacks snapping shut and reopening because a thumbnail appeared.
    // Rebuilt in place, a stack picks up exactly where it stood.
    const wasAt = new Map(explodeParts.map((x) => [x.section, x.proxy.p]));
    explodeTriggers.forEach((t) => t.kill());
    explodeParts.forEach((x) => {
      gsap.killTweensOf(x.proxy);
      // Rewound, THEN discarded. A timeline is only killed here — it is never
      // rendered again — so whatever it last wrote stays on the element, and
      // the replacement does not necessarily overwrite it: the frame's
      // release tween starts late in the run, so at the top of the new
      // timeline it writes nothing at all. Three rebuilds later the frame was
      // still wearing the first timeline's end state, parked a release's
      // worth above where it belonged for the whole run. Rewinding puts every
      // target back the way it was found.
      x.tl.progress(0).kill();
    });
    explodeTriggers = [];
    explodeParts = [];

    const isDesktop = window.innerWidth >= 992;
    const stagger = EXPAND_RUN * 0.06;
    sharedProgress = isDesktop;

    // The stack opens and stays open: reaching the bottom of a column leaves
    // it apart, with the accessories below it, and closing it is what scrolling
    // back UP does. The timeline is scrubbed off scroll position, so the close
    // is the expand run backwards — it needs no segment of its own, and taking
    // one out is what stops the column from spending its last screen putting
    // away the thing you came to buy from.
    const T = EXPAND_RUN + OPEN_HOLD;
    stackedBelow = (0.77 * EXPAND_RUN) / T;

    document.querySelectorAll('[data-explode]').forEach((section) => {
      const stack = section.querySelector('.hp_storage-box');
      const boxes = Array.from(section.querySelectorAll('.hp_storage-box_inner:not(.is-1)'));
      const endTrigger = section.querySelector('.hp_storage-wrap_wall');
      if (!stack || !boxes.length || !endTrigger) return;

      // The grid scrolls itself on desktop, so ScrollTrigger has to watch that
      // element rather than the window. All three explodes share it, which is
      // what makes them open and close as one.
      const grid = section.closest('.mat-cols');
      const scroller = (isDesktop && grid) ? grid : undefined;

      // How far the pieces travel. Measured, not guessed: the open stack has to
      // fit the sticky frame it parks in, or the 90 — the piece with the most
      // to sell — hangs off the bottom where nobody can reach its control.
      //
      // The cap is the fixed point. It is already excluded from `boxes`
      // (:not(.is-1)), so it holds its place under the material title while the
      // four pieces below it fall away — which means the travel budget is the
      // room LEFT UNDER the closed stack, not the frame's full height.
      // Open, the stack fills the frame: the cap stays under the title and
      // the last piece lands a short margin above the frame's bottom edge,
      // which is where the accessories start. Measured off the frame's CONTENT box — its own
      // padding is not room the pieces may travel into, and guessing at it with
      // a flat 24px left the 90 hanging over the edge on some window sizes.
      const frame = section.querySelector('.hp-storage_wrap-box');
      // Measured clean: a previous pass may have grown the frame and the wall
      // to hold a phone's open stack (below), and that must not compound.
      if (frame) frame.style.height = '';
      endTrigger.style.height = '';
      section.style.marginBottom = '';
      const fcs = frame ? getComputedStyle(frame) : null;
      const inner = frame
        ? frame.clientHeight - parseFloat(fcs.paddingTop) - parseFloat(fcs.paddingBottom)
        : 0;
      // Less a margin: landing flush on the frame's edge put the 90 hard
      // against the checkout bar, which read as the bar cutting it off.
      const clearance = 4 * parseFloat(getComputedStyle(document.documentElement).fontSize || '10');
      const gap = Math.max(16, (inner - clearance - stack.offsetHeight) / boxes.length);
      // The phone used to override this measured spread with fixed vh
      // offsets (k·(i+2)^1.5, k = 4) that overshot any screen shorter than
      // ~950px — the open 90 sat under the checkout bar, off the frame.
      // AZ's call (8/19): "shrink the silo a bit — so when fully expanded it
      // fits — the pieces could also be a little closer together." So every
      // width now does what desktop always did: the open stack is fitted
      // into the frame it actually has. The smaller phone stack (--piece-em
      // .7vw, was .85) is what gives the measured gaps their air.
      const offsets = boxes.map((box, i) => (i + 1) * gap);

      // The 16px gap floor can still outgrow a very short frame, and the
      // pieces move by transform, so nothing below would make room for
      // them: the open 90 would sit on the accessories, or on the next
      // material. So the frame and the wall grow to hold the open stack.
      // Taller than the viewport the frame no longer parks, which is fine —
      // the timeline reads scroll position, not stickiness.
      // The travel is also longer here than the CSS wall gives, so a
      // thumb-flick moves the pieces less: the explode reads slower under
      // the finger.
      let travel = 0;
      // Declared out here because the release ramp below needs it too, and a
      // `screen` scoped to this block resolves to window.screen out there —
      // silently NaN, which takes the whole ramp with it.
      let screenH = 0;
      if (frame && !isDesktop) {
        const screen = screenH = frame.clientHeight;
        const need = stack.offsetHeight + offsets[offsets.length - 1] + clearance
          + parseFloat(fcs.paddingTop) + parseFloat(fcs.paddingBottom);
        const frameH = Math.max(need, screen);
        // Two screens carried the old 1.3-unit run (2/1.3 ≈ 1.54 screens per
        // timeline unit). The run grew with OPEN_HOLD, and the travel grows
        // with it: the pieces part at the same rate under the thumb, and the
        // extra distance is all the held stretch at the cap.
        travel = 1.54 * screen * T;
        frame.style.height = frameH + 'px';
        endTrigger.style.height = (frameH + travel) + 'px';
      }

      // The timeline is paused and driven by driveExplodes(), not scrubbed by
      // this trigger — the trigger is only here to report how far this column
      // has been scrolled. The 0.35s tween in driveExplodes() is what `scrub`
      // used to do, applied to all three at once.
      // Never park half-open. Wheel input can stop anywhere, so once it does,
      // the surface settles to whichever state is nearest: closed offer, open
      // configurator (any point in the hold is open, so the hold is left
      // alone), or reassembled receipt. One trigger owns the snap; all three
      // share the scroller, so snapping one snaps the surface.
      const expandEnd = EXPAND_RUN / T;

      const headPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--head-h')) || 95;
      const tl = gsap.timeline({ paused: true });
      const st = ScrollTrigger.create({
        trigger: endTrigger,
        scroller: scroller,
        // The frame sticks at --head-h, not at the top of the screen, so on
        // mobile the run starts where the frame stops moving, or the pieces
        // would sit still for the first head's-height of it and the frame
        // would drift for the last.
        start: isDesktop ? 'top top' : 'top ' + headPx,
        endTrigger: endTrigger,
        // Desktop: the wall's bottom meets the frame's — the frame IS a
        // screen. Mobile: the frame may stand taller than the screen (grown
        // above to hold the open stack), and then "bottom bottom" runs on
        // past the point where the sticky frame lets go — the stack would
        // still be opening while it scrolls away. So the run ends exactly
        // when the frame unsticks: the wall's height less the frame's, which
        // is the travel. Nothing scrolls past until the stack is fully open.
        end: (isDesktop || !frame)
          ? 'bottom bottom'
          : '+=' + Math.max(1, endTrigger.offsetHeight - frame.offsetHeight),
        snap: (isDesktop && !explodeTriggers.length) ? {
          // Directional: finish whatever movement the scroll started, never
          // pull against it — snapping backward reads as the page fighting
          // the wheel. The hold is left alone; any point in it is open.
          snapTo: (p, self) => {
            // Coming back up: nearly closed goes closed, like a magnet.
            if (self.direction < 0 && p < expandEnd * CLOSE_MAGNET) return 0;
            // Going down: the stretch between the two states is a dead zone —
            // the pieces are apart but the labels have not arrived and every
            // click is still swallowed, so stopping there leaves a stack that
            // has come apart into nothing you can buy from. The offer fading
            // out is the line: once the closed stack's price is gone the
            // surface owes you the open configurator, so finish the open.
            // Forward only, so it never pulls against the wheel.
            if (self.direction > 0 && p > expandEnd * OFFER_GONE && p < expandEnd) return expandEnd;
            return p;
          },
          duration: { min: 0.2, max: 0.45 },
          delay: 0.2,
          ease: 'power1.inOut'
        } : undefined,
        onUpdate: driveExplodes,
        onRefresh: driveExplodes
      });

      explodeTriggers.push(st);
      explodeParts.push({ st: st, tl: tl, stack: stack, section: section, proxy: { p: 0 } });

      // Empty on the first pass — the controls are built once CartManager has
      // loaded, and this runs again after. GSAP warns on an empty NodeList, so
      // the fade is only scheduled when there is something to fade.
      const sides = Array.from(section.querySelectorAll('.piece-side, .piece-label'));

      // Closed: every piece sits where it was drawn, nested into a stack.
      boxes.forEach((box) => gsap.set(box, { y: 0 }));
      gsap.set(stack, { y: 0 });
      if (sides.length) gsap.set(sides, { opacity: 0 });

      // From the bottom up, and that is not decoration. Each piece travels
      // further than the one above it, so if the upper piece starts FIRST it
      // closes on a lower piece that has not set off yet — the two overlap more
      // than they did closed, then separate. Starting at the end inverts it:
      // the piece below always leads the piece above, so every joint opens
      // monotonically and no two units ever pass through each other. The same
      // holds in reverse, which is the close.
      //
      // The ease was power3.in — written for the close, which reversed is a
      // power3.out seat. But an ease-in open hits its top speed at the very
      // end, and that is where the frame lets go and the page starts to
      // scroll: the pieces went from full tilt to a dead stop as the scroll
      // took over. power3.inOut instead: the pieces slow to rest at the end
      // of the run and the scroll picks up from stillness. The close's
      // precision now comes from the magnet in driveExplodes(), not the ease.
      // In order but overlapping: the 90 sets off first, the 60 while it is
      // still going, then the 30, then the 15 — starts .06 apart, each run
      // .82 long, so the last one ends the opening. Reversed that is the
      // close, 15 seating first. Mobile runs the same sequence; each column
      // there has its own trigger, so the stacks open one at a time as they
      // come up the page.
      tl.to(boxes, {
        y: (i) => offsets[i],
        stagger: { each: stagger, from: 'end' },
        ease: 'power3.inOut',
        duration: EXPAND_RUN * 0.82
      }, 0);

      // "The person closed: a hundred dollars. You scroll and it opens up,
      // the hundred dollars goes away."
      const offer = section.querySelector('.stack-offer');
      if (offer) {
        gsap.set(offer, { opacity: 1 });
        tl.to(offer, {
          opacity: 0,
          ease: 'power1.out',
          duration: EXPAND_RUN * 0.3
        }, EXPAND_RUN * 0.05);
      }

      // "Then the stepper comes up for quantities" — after the pieces have
      // parted, not during, so the type does not ride down through the stack.
      if (sides.length) {
        tl.to(sides, {
          opacity: 1,
          ease: 'power2.out',
          duration: EXPAND_RUN * 0.4
        }, EXPAND_RUN * 0.6);
      }

      // Middle silence: the stack is open and still while you buy from it.
      // A timeline sizes itself to its content, so on mobile — where nothing
      // follows — the hold has to be an explicit segment or there is nothing
      // to scroll through.
      tl.to({}, { duration: OPEN_HOLD }, EXPAND_RUN);

      // Easing into the scroll. A sticky frame lets go all at once — parked
      // one moment, moving at full scroll speed the next — and no amount of
      // settling the pieces softens that step. So through the tail the frame
      // itself starts to drift up, ease-in, and the drift is sized so that at
      // the moment the frame unsticks it is already travelling at exactly the
      // page's speed: over the tail's S px of scroll it moves S/2 (a power2.in
      // ramp ends with slope 2·D/S = 1). Position and velocity are both
      // continuous through the release; scrolling back up it re-parks the
      // same way in reverse.
      if (frame && !isDesktop && travel > 0) {
        const tailPx = travel * OPEN_HOLD / T;
        // ...over the LAST stretch of the hold, not all of it. The ramp costs
        // half its own length in blank wall — the frame ends up that much
        // higher than the slot it was laid out in — and the hold has grown a
        // lot (0.4 -> 1.15), which turned that cost into a screen of nothing
        // between one material and the next on a phone. Capped at ~0.6 of a
        // screen, the void is ~0.3 and the release is identical: the ramp's
        // end slope is 2·(D/2)/D = 1 whatever D is.
        //
        // It is better for the dwell as well. Easing across the whole hold
        // meant the frame never actually stood still — the beat the hold is
        // there to buy was a slow drift. Now it stops, then leaves.
        const releasePx = Math.min(tailPx, 0.6 * screenH);
        const releaseRun = OPEN_HOLD * (releasePx / tailPx);
        gsap.set(frame, { y: 0 });
        tl.to(frame, { y: -releasePx / 2, ease: 'power2.in', duration: releaseRun },
              EXPAND_RUN + OPEN_HOLD - releaseRun);

        // The ramp ends with the frame drawn releasePx/2 above the slot it was
        // laid out in, so the wall's last releasePx/2 are blank — and the
        // section keeps that height whatever the frame is doing, which left a
        // band of nothing at the foot of every material and kept the sticky
        // title pinned over it. Pulling the next section up by exactly that
        // much closes it: at the moment the frame lets go, its visual bottom
        // and the next section's top are the same pixel, and the column now
        // ends where its content ends. The wall itself is untouched, so the
        // run and the trigger are unchanged.
        section.style.marginBottom = (-releasePx / 2) + 'px';
      }

    });

    // First build: nothing has scrolled yet, so every stack starts closed.
    // Rebuild: each stack keeps its place; the refresh below then tweens it
    // to wherever the re-measured scroll says, which is a small move or none.
    explodeParts.forEach((x) => {
      x.proxy.p = wasAt.has(x.section) ? wasAt.get(x.section) : 0;
      x.target = x.proxy.p;
      applyPart(x);
    });
    // A grown wall moves everything under it, so every trigger re-measures.
    ScrollTrigger.refresh();
  }

  createScrollTrigger();

  // The per-piece buy controls are built later — they need CartManager's price
  // map, which loads after this block. Building them changes both the targets
  // of the fade tween and the height of the closed stack the gap is measured
  // against, so the timelines are rebuilt once the controls are in.
  window.rebuildExplodes = function() {
    createScrollTrigger();
  };

  // The scroller has to refresh ScrollTrigger as it moves, or the explodes
  // never advance — the window is not what is scrolling any more.
  document.querySelectorAll('.mat-cols').forEach((grid) => {
    grid.addEventListener('scroll', () => ScrollTrigger.update(), { passive: true });
  });

  // Rebuild on any real width change. The previous version compared against a
  // `windowWidth` owned by an earlier resize handler that had already updated it,
  // so the condition was always false and the timeline never rebuilt — which now
  // matters, because the correct scroller differs on either side of 992px.
  let lastWidthTl = window.innerWidth;

  $(window).on('resize', function() {
    if (window.innerWidth !== lastWidthTl) {
      lastWidthTl = window.innerWidth;
      // Before the rebuild: the accessories move between the columns and the
      // end of the run across 992px, which changes what every trigger below
      // them is measured against.
      if (window.placeAccessories) window.placeAccessories();
      if (window.parkAccessories) window.parkAccessories();
      createScrollTrigger();
      ScrollTrigger.refresh();
    }
  });
