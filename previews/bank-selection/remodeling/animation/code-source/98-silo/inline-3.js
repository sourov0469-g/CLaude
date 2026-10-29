
  (function() {
    const cols = Array.from(document.querySelectorAll('.mat-col'));
    if (!cols.length) return;

    // Publish the cart bar's real height so the columns can size to
    // calc(100vh - var(--bar-h)) instead of guessing at it. The sticky
    // material header is measured the same way: the explode frame parks
    // directly beneath it, so a guessed height shows as a clipped stack.
    //
    // Two numbers. --bar-h is the bar as it stands right now, and only the
    // desktop scroller's height reads it. --bar-room is the bar with the
    // thumbnail strip counted as OPEN whether or not it is: every explode
    // frame, wall and piece size reads that one. Sizing them off the live
    // height meant the first item added to the cart opened the strip,
    // changed the height, and re-sized the whole shop under the pointer —
    // pieces shrinking a step on the phone, the page shifting on desktop.
    // Reserving the strip's height from the start costs 7.2rem of frame
    // and nothing ever moves.
    function measureBar() {
      const bar = document.querySelector('.sticky-ui');
      if (bar && bar.offsetHeight > 0) {
        const strip = bar.querySelector('.cart-strip');
        const stripH = strip ? strip.offsetHeight : 0;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
        const room = bar.offsetHeight - stripH + 7.2 * rem;
        document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
        document.documentElement.style.setProperty('--bar-room', room + 'px');
      }
      const head = document.querySelector('.mat-col_head');
      if (head && head.offsetHeight > 0) {
        document.documentElement.style.setProperty('--head-h', head.offsetHeight + 'px');
      }
    }

    // The cart strip changes the bar's height when it opens, and every explode
    // frame is sized against that height.
    window.remeasureBar = measureBar;

    // The collapse toggles, the peek, and the jump nav all belonged to the
    // accordion layout, where three materials had to share one phone screen.
    // Mobile gives each material a screen of its own now, so there is nothing
    // to collapse and nowhere to jump to that scrolling does not already reach.
    measureBar();
    window.addEventListener('resize', measureBar);
    // The bar's height changes once #cart is folded into it.
    window.setTimeout(measureBar, 1300);
  })();
