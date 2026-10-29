
  (function() {
    // Fallback only. This used to be the sole source of the displayed price, maintained by
    // hand alongside CartManager's map — two copies of the same number, free to drift, which
    // is exactly how a row can advertise one price while checkout charges another.
    const FALLBACK_PRICES = {
      '8973822722300': '$100',
      '8973825540348': '$19',
      '8973828849916': '$19',
      '8973831667964': '$19',
      '8974057079036': '$9',
      '8974057832700': '$19',
      '8974058717436': '$29',
      '8974059077884': '$39',
      '8974059602172': '$49'
    };

    function applyTopPrices() {
      // Derive from the map that actually drives the subtotal and the checkout permalink, so
      // the number a buyer reads is the number they are charged. Adding a product is then a
      // one-place change.
      const cm = window.CartManager;
      let productPrices = FALLBACK_PRICES;
      if (cm && cm.config && cm.config.prices) {
        productPrices = {};
        Object.keys(cm.config.prices).forEach(function(id) {
          productPrices[id] = '$' + cm.config.prices[id];
        });
      }

      Object.entries(productPrices).forEach(([productId, price]) => {
        const section = document.querySelector(`section.section_cart[sf-product="${productId}"]`);
        if (!section) {
          return;
        }

        const productRow = section.querySelector('.shopify-buy__product');
        const quantityContainer = section.querySelector('.shopify-buy__quantity-container');
        const quantity = section.querySelector('.shopify-buy__quantity');
        if (!productRow || !quantityContainer || !quantity) {
          return;
        }

        let priceEl = productRow.querySelector('.cart-top-price');
        if (!priceEl) {
          priceEl = document.createElement('div');
          priceEl.className = 'cart-top-price user-select-off';
          productRow.insertBefore(priceEl, quantityContainer);
        }

        priceEl.textContent = price;

        const quantityStyles = window.getComputedStyle(quantity);
        priceEl.style.fontSize = quantityStyles.fontSize;
        priceEl.style.lineHeight = quantityStyles.lineHeight;
        priceEl.style.fontWeight = quantityStyles.fontWeight;
      });
    }

    function markSkuAddons() {
      const addonLabels = {
        '8974057079036': 'Cap',
        '8974057832700': '15',
        '8974058717436': '30',
        '8974059077884': '60',
        '8974059602172': '90',
        // Bare sizes in both columns. This was the other way round while the
        // page was a single strip, where a brass row under a bare "60" was
        // indistinguishable from the aluminum "60" above it. The material
        // column header now carries that, so the prefix is redundant.
        'brass-cap': 'Cap',
        'brass-15': '15',
        'brass-30': '30',
        'brass-60': '60',
        'brass-90': '90'
      };

      Object.entries(addonLabels).forEach(([productId, label]) => {
        const cartSection = document.querySelector(`section.section_cart[sf-product="${productId}"]`);
        if (!cartSection) {
          return;
        }

        cartSection.classList.add('sku-addon');

        const visualSection = cartSection.previousElementSibling;
        if (visualSection && visualSection.classList.contains('section_hp-storage-extra')) {
          visualSection.classList.add('sku-addon');
          const heading = visualSection.querySelector('.heading-style-h1');
          if (heading) {
            heading.textContent = label;
          }
        }
      });
    }

    // ----------------------------------------------------------------------
    // Buy from the explode.
    //
    // The control does not hold a quantity of its own. It reads and drives the
    // product's existing .section_cart row, so the piece, the row below it, the
    // subtotal and the checkout permalink are all one number. A second counter
    // here would be a second thing to keep in step — and the one that ends up
    // disagreeing with what Shopify charges.
    // ----------------------------------------------------------------------
    function rowFor(productId) {
      return document.querySelector(`section.section_cart[sf-product="${productId}"]`);
    }

    // Which stack product a column sells.
    const STACK_OF = { aluminum: '8973822722300', brass: 'brass-stack' };

    // Every stepper on the page — piece, stack, insert — reads and writes one
    // thing: the product's .section_cart row. That row is what CartManager
    // totals and what the checkout permalink is built from, so there is a
    // single number per product and nothing to keep in step. A control holding
    // a count of its own would be a second copy, and the one that ends up
    // disagreeing with what Shopify charges.
    function qtyOf(productId) {
      return window.CartManager.rowQty(productId);
    }

    function setQty(productId, n) {
      const row = rowFor(productId);
      if (!row) return;
      window.CartManager.setSectionQuantity($(row), Math.max(0, n));
    }

    // The tap's acknowledgement: a quick dip of the render. The class is
    // pulled and re-added around a reflow so a second tap replays it.
    function pulseTap(el) {
      if (!el) return;
      el.classList.remove('is-tapped');
      void el.offsetWidth;
      el.classList.add('is-tapped');
    }

    function buildPieceControls() {
      const cm = window.CartManager;
      if (!cm || !cm.config) return false;

      let built = 0;
      document.querySelectorAll('[data-explode] .hp_storage-box_inner').forEach((box) => {
        if (box.querySelector('.piece-side')) return;

        // Two sides of type: the size stays in the left slot, where the
        // markup put it, and the price and stepper take the right. Every
        // piece gets the label, sellable or not — a titanium piece still has
        // to say 30 MM — and it fades in with the sides, so it is marked.
        const side = document.createElement('div');
        side.className = 'piece-side';
        const head = document.createElement('div');
        head.className = 'piece-side_head';
        const label = box.querySelector('.hp_storage-visual_text');
        if (label) label.classList.add('piece-label');
        side.appendChild(head);
        box.appendChild(side);
        built++;

        const productId = box.getAttribute('data-piece');
        const row = productId ? rowFor(productId) : null;
        const price = productId ? cm.config.prices[productId] : null;
        // No row, no price, or gated off: the piece simply does not sell. It
        // gets no stepper rather than a dead one — the same reason the titanium
        // waitlist rows are not .section_cart sections.
        if (!row || price == null || !cm.isPurchasable(productId)) return;

        // The unit price, and it stays the unit price. What a complete set is
        // worth is settled in collapseCart(), which is what the bar shows —
        // the row here answers "what does one more cost", nothing else.
        const priceEl = document.createElement('div');
        priceEl.className = 'piece-buy_price';
        priceEl.textContent = '$' + price;
        head.appendChild(priceEl);

        // Straight into the cart, starting at nothing. These used to hold a
        // scratch configuration that a per-column receipt committed later;
        // with the receipts gone the bar at the bottom is the only subtotal,
        // so a press has to move it immediately or it moves nothing at all.
        const ctrl = document.createElement('div');
        ctrl.className = 'piece-buy';
        ctrl.setAttribute('data-piece-for', productId);
        ctrl.innerHTML =
          '<div class="piece-buy_qty">' +
            '<div class="piece-buy_step piece-buy_dec" role="button" tabindex="0" aria-label="One fewer">&minus;</div>' +
            '<div class="piece-buy_n">0</div>' +
            '<div class="piece-buy_step piece-buy_inc" role="button" tabindex="0" aria-label="One more">+</div>' +
          '</div>';

        ctrl.querySelector('.piece-buy_inc').addEventListener('click', () => setQty(productId, qtyOf(productId) + 1));
        ctrl.querySelector('.piece-buy_dec').addEventListener('click', () => setQty(productId, qtyOf(productId) - 1));

        side.appendChild(ctrl);

        // The piece itself adds to the cart — every width; the bar-hint is
        // what says so. Not while the offer panel is live (closed, the
        // five pieces are five overlapping hit targets and the panel owns
        // the click), and not for clicks that came off the row's own
        // controls, which bubble up through the box.
        box.addEventListener('click', (e) => {
          if (e.target.closest('.piece-side')) return;
          const sec = box.closest('[data-explode]');
          if (sec && sec.classList.contains('is-panel-live')) return;
          setQty(productId, qtyOf(productId) + 1);
          pulseTap(box.querySelector('.hp_storage_visual'));
        });

        // "We don't need to repeat all the stuff in the back." The explode is
        // the piece listing now, so the product's own row and visual come off
        // the page. They stay in the DOM because they are still what the cart
        // is written to and what the checkout permalink is built from.
        row.classList.add('is-in-explode');
        const visual = row.previousElementSibling;
        if (visual && visual.classList.contains('section_hp-storage-extra')) {
          visual.classList.add('is-in-explode');
        }
      });

      if (built) {
        document.querySelectorAll('[data-explode]').forEach(buildStackPanel);
        syncShopControls();
      }
      return built > 0;
    }

    // The closed stack's own storefront: what it costs, the same stepper the
    // pieces carry, and one press that puts a whole stack in the cart.
    //
    // It shows at both ends of the explode, because both ends are the same
    // closed stack — the offer you arrive at and the offer you land back on
    // once the pieces have reassembled. There is no third thing to build; the
    // receipt that used to occupy the far end was the third subtotal on a page
    // that now has exactly one, in the bar.
    //
    // Titanium has no stack SKU, so its panel is the price and a waitlist
    // link: same slot, same shape, and no stepper for something that cannot be
    // bought.
    function buildStackPanel(section) {
      // Anchored to the stack box, which is what the panel is the price of —
      // and which, now that nothing lifts it, holds one place all the way
      // through the explode.
      const anchor = section.querySelector('.hp_storage-box');
      if (!anchor || section.querySelector('.stack-offer')) return;

      const cm = window.CartManager;
      const stackId = STACK_OF[section.getAttribute('data-explode')];
      const stackRow = stackId ? rowFor(stackId) : null;
      const sellable = !!(stackRow && cm.isPurchasable(stackId) && cm.config.prices[stackId] != null);
      const price = sellable ? '$' + cm.config.prices[stackId] : section.getAttribute('data-offer-price');
      if (!price) return;

      const tag = section.getAttribute('data-offer-tag');
      const href = section.getAttribute('data-offer-href');

      const panel = document.createElement('div');
      panel.className = 'stack-offer';
      panel.innerHTML =
        '<span class="stack-offer_name">Stack</span>' +
        '<div class="stack-offer_side">' +
          '<div class="stack-offer_head">' +
            '<span class="stack-offer_price">' + price + '</span>' +
            (tag && !sellable ? '<span class="stack-offer_tag">' + tag + '</span>' : '') +
          '</div>' +
        '</div>';
      const sideSlot = panel.querySelector('.stack-offer_side');

      if (sellable) {
        const ctrl = document.createElement('div');
        ctrl.className = 'piece-buy stack-offer_buy';
        ctrl.setAttribute('data-piece-for', stackId);
        ctrl.innerHTML =
          '<div class="piece-buy_qty">' +
            '<div class="piece-buy_step piece-buy_dec" role="button" tabindex="0" aria-label="One fewer stack">&minus;</div>' +
            '<div class="piece-buy_n">0</div>' +
            '<div class="piece-buy_step piece-buy_inc" role="button" tabindex="0" aria-label="One more stack">+</div>' +
          '</div>';
        ctrl.querySelector('.piece-buy_inc').addEventListener('click', () => setQty(stackId, qtyOf(stackId) + 1));
        ctrl.querySelector('.piece-buy_dec').addEventListener('click', () => setQty(stackId, qtyOf(stackId) - 1));
        sideSlot.appendChild(ctrl);

        // The panel is the stack's listing now, so the plain row and its
        // visual come off the page like the piece rows did. The row stays in
        // the DOM as the cart's model.
        stackRow.classList.add('is-in-explode');
        const stackVisual = stackRow.previousElementSibling;
        if (stackVisual && stackVisual.classList.contains('section_hp-storage-extra')) {
          stackVisual.classList.add('is-in-explode');
        }
      }
      // Titanium has no button of its own. It had one — JOIN WAITLIST, in a
      // box, in the narrowest side track on the page, where it was clipped at
      // some widths and wrapped to two lines at others. The stack is the
      // control now, the same as every other column: the row states the price
      // and the word WAITLIST, and clicking the render opens the panel.

      // The closed stack is a target too, and it has to be: the bar says to
      // click, and until the pieces part the stack is the only thing there.
      // Clicking it does exactly what the panel's + does — one stack, at the
      // stack price — or opens the waitlist where there is no stack to sell.
      //
      // The two states never overlap. Closed, the section is .is-panel-live
      // and the piece handlers bail out; open, this one does. Clicks off the
      // panel's own controls bubble up through here and are let alone.
      anchor.addEventListener('click', (e) => {
        if (!section.classList.contains('is-panel-live')) return;
        if (e.target.closest('.stack-offer')) return;
        if (sellable) {
          setQty(stackId, qtyOf(stackId) + 1);
          pulseTap(anchor);
        } else if (href) {
          openWaitlist('Titanium Stack', href);
        }
      });

      anchor.appendChild(panel);
    }

    // The waitlist modal. One panel for the page, built on first use;
    // openWaitlist() resets it, so a second visit starts clean. Submits to
    // /api/waitlist, which writes the email into the site's Vercel Blob store —
    // if that fails for any reason, the old mailto link is the way out.
    let wlVeil = null;
    function ensureWaitlistModal() {
      if (wlVeil) return wlVeil;
      wlVeil = document.createElement('div');
      wlVeil.className = 'wl-veil';
      wlVeil.innerHTML =
        '<div class="wl-band" role="dialog" aria-modal="true" aria-labelledby="wl-title">' +
          '<button type="button" class="wl-close" aria-label="Close">&times;</button>' +
          '<div class="wl-band_head">' +
            '<div class="wl-title" id="wl-title">Titanium waitlist</div>' +
            '<div class="wl-copy">Leave your email and we’ll write when titanium is ready.</div>' +
          '</div>' +
          '<form class="wl-form" novalidate>' +
            '<input class="wl-input" type="email" name="email" placeholder="you@example.com" autocomplete="email" required>' +
            '<div class="wl-hairline"></div>' +
            '<div class="wl-strip">' +
              '<div class="wl-msg" aria-live="polite"></div>' +
              '<button type="submit" class="wl-submit">Join waitlist</button>' +
            '</div>' +
          '</form>' +
        '</div>';
      document.body.appendChild(wlVeil);

      const close = () => {
        wlVeil.classList.remove('is-open');
        document.documentElement.style.overflow = '';
        if (typeof lenis !== 'undefined' && lenis) lenis.start();
      };
      wlVeil.addEventListener('click', (e) => { if (e.target === wlVeil) close(); });
      wlVeil.querySelector('.wl-close').addEventListener('click', close);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wlVeil.classList.contains('is-open')) close();
      });

      const form = wlVeil.querySelector('.wl-form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('.wl-input');
        const submit = form.querySelector('[type="submit"]');
        const msg = wlVeil.querySelector('.wl-msg');
        const email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          msg.textContent = 'Enter a valid email.';
          input.focus();
          return;
        }
        submit.disabled = true;
        msg.textContent = 'One moment…';
        try {
          const r = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, product: wlVeil.dataset.product })
          });
          if (!r.ok) {
            const j = await r.json().catch(() => ({}));
            throw new Error(j.error || 'Could not save your email.');
          }
          wlVeil.querySelector('.wl-title').textContent = 'You’re on the list';
          wlVeil.querySelector('.wl-copy').textContent =
            'We’ll write to ' + email + ' when titanium is ready.';
          form.style.display = 'none';
          msg.textContent = '';
          document.dispatchEvent(new CustomEvent('silo:waitlist', { detail: { product: wlVeil.dataset.product } }));
        } catch (err) {
          msg.innerHTML = '';
          msg.appendChild(document.createTextNode(err.message + ' Or '));
          const a = document.createElement('a');
          a.href = wlVeil.dataset.mailto || 'mailto:silo@silosilosilo.com';
          a.textContent = 'email us';
          msg.appendChild(a);
          msg.appendChild(document.createTextNode('.'));
        } finally {
          submit.disabled = false;
        }
      });
      return wlVeil;
    }

    // One quiet line in the bar teaches the gesture; the strip filling is
    // both what retires it and the proof the lesson took. Wording follows the
    // input that will actually be used — and the thing under it. Closed, the
    // only target is the stack; open, it is the piece you want. The line said
    // "a piece" from the first paint, over a closed stack whose clicks are
    // deliberately swallowed, so the first thing anyone tried did nothing.
    // The CSS above stops the drag in WebKit and Blink; this is the backstop
    // everywhere else, and it covers renders built after this line — one
    // listener rather than an attribute to remember on every new image.
    document.addEventListener('dragstart', (e) => {
      if (e.target.closest && e.target.closest('.hp_storage_visual, .inserts-row_img, .cart-strip_item')) {
        e.preventDefault();
      }
    });

    (function barHint() {
      const bar = document.querySelector('.sticky-ui .cart_box-checkout');
      if (!bar || bar.querySelector('.bar-hint')) return;
      const hint = document.createElement('div');
      hint.className = 'bar-hint';
      const verb = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        ? 'Click' : 'Tap';
      window.syncBarHint = () => {
        const open = !!document.querySelector('[data-explode]:not(.is-panel-live)');
        const text = open ? verb + ' a piece to add it' : verb + ' the stack to add it';
        if (hint.textContent !== text) hint.textContent = text;
      };
      window.syncBarHint();
      bar.appendChild(hint);
    })();

    function openWaitlist(product, mailto) {
      const veil = ensureWaitlistModal();
      veil.dataset.product = product;
      veil.dataset.mailto = mailto || '';
      veil.querySelector('.wl-title').textContent = 'Titanium waitlist';
      veil.querySelector('.wl-copy').textContent =
        'Leave your email and we’ll write when titanium is ready.';
      veil.querySelector('.wl-msg').textContent = '';
      const form = veil.querySelector('.wl-form');
      form.style.display = '';
      form.querySelector('.wl-input').value = '';
      veil.classList.add('is-open');
      // The page must not move behind the veil: Lenis is told to stand
      // still, and the html overflow lock catches native touch scrolling.
      document.documentElement.style.overflow = 'hidden';
      if (typeof lenis !== 'undefined' && lenis) lenis.stop();
      form.querySelector('.wl-input').focus();
    }

    // One pass that makes every control agree with the cart rows. Nothing here
    // decides anything — the rows are the model, so this only redraws.
    function syncShopControls() {
      document.querySelectorAll('[data-piece-for]').forEach((ctrl) => {
        const n = qtyOf(ctrl.getAttribute('data-piece-for'));
        const nEl = ctrl.querySelector('.piece-buy_n, .ins-buy_n');
        if (nEl) nEl.textContent = n;
        ctrl.classList.toggle('is-empty', n === 0);
      });
    }
    window.syncShopControls = syncShopControls;

    // The inserts row under the titanium stack. Unlike the explode's steppers
    // these buy immediately — an insert is à la carte, there is no stack to
    // configure it into — so each click writes straight into the hidden cart
    // row and the bar moves at once.
    // The accessories, built as piece rows. They are the same kind of thing —
    // a render, a size, a price, a stepper — so they are made of the same parts
    // rather than a second, smaller design. What differs is only that these
    // never belonged to a stack: an insert is à la carte, so there is no bundle
    // for collapseCart() to fold it into.
    function buildInsertsRow() {
      const cm = window.CartManager;
      if (!cm || !cm.config) return;
      document.querySelectorAll('.inserts-row_cell[data-insert]').forEach((cell) => {
        if (cell.querySelector('.piece-side')) return;
        const id = cell.getAttribute('data-insert');
        const row = rowFor(id);
        const price = cm.config.prices[id];
        if (!row || price == null || !cm.isPurchasable(id)) return;

        const nameEl = cell.querySelector('.inserts-row_name');
        const name = nameEl ? nameEl.textContent.trim() : '';
        if (nameEl) nameEl.remove();

        const label = document.createElement('div');
        label.className = 'hp_storage-visual_text piece-label';
        label.innerHTML = '<div class="text-color-gray-200"><div class="hp_storage-heading">' + esc(name) + '</div></div>';
        cell.appendChild(label);

        const side = document.createElement('div');
        side.className = 'piece-side';
        side.innerHTML =
          '<div class="piece-side_head">' +
            '<div class="piece-buy_price">$' + price + '</div>' +
          '</div>' +
          '<div class="piece-buy" data-piece-for="' + esc(id) + '">' +
            '<div class="piece-buy_qty">' +
              '<div class="piece-buy_step piece-buy_dec" role="button" tabindex="0" aria-label="One fewer">&minus;</div>' +
              '<div class="piece-buy_n">0</div>' +
              '<div class="piece-buy_step piece-buy_inc" role="button" tabindex="0" aria-label="One more">+</div>' +
            '</div>' +
          '</div>';

        side.querySelector('.piece-buy_inc').addEventListener('click', () => setQty(id, qtyOf(id) + 1));
        side.querySelector('.piece-buy_dec').addEventListener('click', () => setQty(id, qtyOf(id) - 1));

        cell.appendChild(side);

        // Same as the pieces — the insert's render is the add control at
        // every width; the stepper's clicks bubble through and are let alone.
        cell.addEventListener('click', (e) => {
          if (e.target.closest('.piece-side')) return;
          setQty(id, qtyOf(id) + 1);
          pulseTap(cell.querySelector('.inserts-row_img') || cell);
        });
      });
      syncShopControls();
    }

    // ----------------------------------------------------------------------
    // The visual cart — a row of thumbnails above the grey bar.
    //
    // It is drawn from the same collapsed line items the subtotal is priced
    // from, so a complete set of five shows as one stack thumbnail rather than
    // five pieces. The picture and the number are two views of one list, which
    // is what makes the bundle rule legible: press five pieces and you watch
    // them become a stack.
    // ----------------------------------------------------------------------
    const PRODUCT_MEDIA = {};

    function noteMedia(id, img, label) {
      if (!id || PRODUCT_MEDIA[id] || !img) return;
      const src = img.currentSrc || img.getAttribute('src') || '';
      if (!src) return;
      PRODUCT_MEDIA[id] = { src: src, label: label || '' };
    }

    // Order matters: each product is claimed by the most specific source that
    // has a picture of it, and noteMedia never overwrites.
    function buildProductMedia() {
      document.querySelectorAll('[data-explode]').forEach((section) => {
        const col = section.closest('.mat-col');
        const nameEl = col && col.querySelector('.mat-col_name');
        const material = nameEl ? nameEl.textContent.trim() : '';

        section.querySelectorAll('.hp_storage-box_inner[data-piece]').forEach((box) => {
          const heading = box.querySelector('.hp_storage-heading');
          noteMedia(box.getAttribute('data-piece'), box.querySelector('img.cover-img'),
            (material + ' ' + (heading ? heading.textContent.trim() : '')).trim());
        });

        // The stack is one SKU and gets one thumbnail: the closed-stack
        // render named on the section. Unlike every other product it has no
        // listing row to borrow a picture from — the explode is its listing —
        // so the image is declared in the markup beside the piece renders it
        // has to sit next to.
        const stackId = STACK_OF[section.getAttribute('data-explode')];
        const thumb = section.getAttribute('data-stack-thumb');
        if (stackId && thumb) {
          const img = new Image();
          img.src = thumb;
          noteMedia(stackId, img, (material + ' stack').trim());
        }
      });

      document.querySelectorAll('.inserts-row_cell[data-insert]').forEach((cell) => {
        const nameEl = cell.querySelector('.inserts-row_name');
        noteMedia(cell.getAttribute('data-insert'),
          cell.querySelector('img'),
          ('Insert ' + (nameEl ? nameEl.textContent.trim() : '')).trim());
      });
    }

    function esc(text) {
      return String(text).replace(/[&<>"]/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    }

    // Press a thumbnail and one of that thing comes back out of the cart. It
    // writes to the same .section_cart row every stepper writes to, so the
    // strip, the subtotal and the checkout permalink all move together —
    // there is still exactly one number per product.
    //
    // A stack thumbnail is the one line that may not have a row behind it:
    // collapseCart() also shows five folded piece rows as a stack. So the
    // stack row is taken from first — that is the one somebody added AS a
    // stack — and a set is only unfolded when there is no stack row left to
    // take from. Unfolding takes one off each of the five, which is precisely
    // the set that was folded, so the pieces the buyer had over and above it
    // stay in the cart.
    function removeLine(id) {
      const cm = window.CartManager;
      if (!id || !cm) return;
      const set = (cm.config.sets || []).find((s) => s.stack === id);
      if (set && qtyOf(id) === 0) {
        set.pieces.forEach((pieceId) => setQty(pieceId, qtyOf(pieceId) - 1));
        return;
      }
      setQty(id, qtyOf(id) - 1);
    }

    // Prepended into .sticky-ui but OUTSIDE the checkout anchor — a thumbnail
    // is not a checkout button, and inside the <a> every one of them would be.
    function ensureCartStrip() {
      const bar = document.querySelector('.sticky-ui');
      if (!bar) return null;
      let strip = bar.querySelector('.cart-strip');
      if (strip) return strip;
      strip = document.createElement('div');
      strip.className = 'cart-strip';
      strip.innerHTML = '<div class="cart-strip_items"></div>';
      // On the strip, not on each item: the items are rewritten from the
      // model on every change, and a listener per thumbnail would be rebound
      // on every click.
      strip.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-strip_item');
        if (item) removeLine(item.getAttribute('data-line'));
      });
      strip.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const item = e.target.closest('.cart-strip_item');
        if (!item) return;
        e.preventDefault();
        removeLine(item.getAttribute('data-line'));
      });
      bar.prepend(strip);
      return strip;
    }

    function renderCartStrip(lines) {
      const strip = ensureCartStrip();
      if (!strip) return;
      const items = strip.querySelector('.cart-strip_items');

      items.innerHTML = (lines || []).map((line) => {
        const media = PRODUCT_MEDIA[line.id];
        if (!media) return '';
        const name = esc(media.label);
        const label = name + (line.n > 1 ? ' × ' + line.n : '');
        // Named as what pressing it does, because pressing it is all it does.
        const act = 'Remove ' + (name || 'item');
        return '<div class="cart-strip_item" data-line="' + esc(line.id) + '"' +
                 ' role="button" tabindex="0" title="' + act + '" aria-label="' + act + '">' +
                 '<img src="' + esc(media.src) + '" alt="' + label + '"/>' +
                 (line.n > 1 ? '<span class="cart-strip_n">' + line.n + '</span>' : '') +
               '</div>';
      }).join('');

      const filled = items.children.length > 0;
      if (filled === strip.classList.contains('is-filled')) return;
      strip.classList.toggle('is-filled', filled);

      // The frames are sized off --bar-room, which already counts the strip
      // as open, so nothing inside the shop changes size here. Only the
      // desktop scroller's own height moves (it reads the live --bar-h), so
      // the triggers re-measure once the transition has run — no rebuild.
      window.setTimeout(() => {
        if (window.remeasureBar) window.remeasureBar();
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 320);
    }
    window.renderCartStrip = renderCartStrip;

    function placeTotalInStickyBar() {
      const checkoutWrap = document.querySelector('.cart_wrap-checkout');
      const cartBoxBottom = document.getElementById('cart');

      if (!checkoutWrap || !cartBoxBottom || checkoutWrap.contains(cartBoxBottom)) {
        return;
      }

      checkoutWrap.prepend(cartBoxBottom);
      checkoutWrap.classList.add('has-inline-total');
    }

    // Where a moved node lived. A marker left permanently in its old slot,
    // rather than a remembered (parent, nextSibling) pair: siblings that move
    // together invalidate each other's references, and a marker that never
    // moves cannot go stale.
    function homeMarker(el) {
      let m = el.previousElementSibling;
      if (!m || !m.classList.contains('acc-home')) {
        m = document.createElement('div');
        m.className = 'acc-home';
        el.parentNode.insertBefore(m, el);
      }
      return m;
    }

    // Desktop reads down three columns at once, so each material's inserts
    // belong under its own stack. The phone reads down ONE column, and there
    // the same arrangement buries the accessories between the materials: you
    // meet aluminum's inserts before you have seen brass at all.
    //
    // "Stacks in order then the accessories." So on a phone the three stacks
    // run back to back and every insert lands after them, in one row, in size
    // order — which is what they always were: one product family that crosses
    // the materials, three cells across. The row keeps its own head, the
    // emptied one is hidden, and the whole thing goes back into the columns
    // the moment the layout does.
    function placeAccessories() {
      const cols = document.querySelector('.mat-cols');
      const rows = Array.from(document.querySelectorAll('.inserts-row'));
      if (!cols || !rows.length) return;

      // Desktop: every marker takes its own node back. Order survives because
      // the markers never left.
      if (window.innerWidth >= 992) {
        document.querySelectorAll('[data-acc-home]').forEach((el) => {
          const m = document.getElementById(el.getAttribute('data-acc-home'));
          if (m) m.after(el);
        });
        rows.forEach((r) => r.classList.remove('is-emptied'));
        return;
      }

      // Re-entrant: applyLayoutTweaks() runs again once the prices have
      // loaded, and by then the host has already moved to the end of the page
      // — so document order no longer names it. It carries its own tag, and
      // the emptied flags are cleared before they are re-applied, or the row
      // that hosted the first pass gets hidden by the second.
      rows.forEach((r) => r.classList.remove('is-emptied'));
      const host = rows.find((r) => r.classList.contains('is-acc-host')) || rows[0];
      host.classList.add('is-acc-host');
      const grid = host.querySelector('.inserts-row_grid');
      if (!grid) return;

      // The cells first, so the host row is carrying all of them when it moves.
      const cells = rows.flatMap((r) => Array.from(r.querySelectorAll('.inserts-row_cell')));
      cells.forEach(markHome);
      // 15, 30, 60 — the sizes read as a series, which is the only order they
      // have. Split across two columns they were 30, 60, then 15.
      cells.sort((a, b) => sizeOf(a) - sizeOf(b)).forEach((c) => grid.appendChild(c));

      markHome(host);
      cols.appendChild(host);
      rows.filter((r) => r !== host).forEach((r) => r.classList.add('is-emptied'));
    }

    let accIds = 0;
    function markHome(el) {
      if (el.hasAttribute('data-acc-home')) return;
      const m = homeMarker(el);
      m.id = 'acc-home-' + (++accIds);
      el.setAttribute('data-acc-home', m.id);
    }

    function sizeOf(cell) {
      const name = cell.querySelector('.inserts-row_name, .piece-label');
      return parseInt((name ? name.textContent : '').replace(/\D/g, ''), 10) || 0;
    }

    window.placeAccessories = placeAccessories;

    // Park the accessories the way the explode parks a stack: the inner is
    // sticky (see the CSS), this decides where it stops and how long it stays
    // there. Both are measurements, because both depend on how tall the row's
    // own content turns out to be — and on desktop the two rows are not the
    // same height, so the numbers are per row.
    function parkAccessories() {
      const cols = document.querySelector('.mat-cols');
      if (!cols) return;
      const rows = Array.from(document.querySelectorAll('.inserts-row'))
        .filter((r) => !r.classList.contains('is-emptied'));
      const inners = rows.map((r) => r.querySelector('.padding-global'))
        .filter(Boolean);
      if (!inners.length) return;

      const root = getComputedStyle(document.documentElement);
      const px = (name) => parseFloat(root.getPropertyValue(name)) || 0;
      const desktop = window.innerWidth >= 992;
      // Desktop parks against the grid's own scrollport, under the material
      // title that is stuck to the top of it; a phone parks against the
      // window, with the fixed bar taking the bottom and nothing above.
      const head = desktop
        ? ((document.querySelector('.mat-col_head') || {}).offsetHeight || 0)
        : 0;
      const frame = (desktop ? cols.clientHeight
                             : window.innerHeight - px('--bar-h')) - head;
      // The open stack's dwell, in screens. One source (see --acc-screens).
      const hold = frame * (parseFloat(root.getPropertyValue('--acc-screens')) || 0.82);
      // Fractional, not offsetHeight — these are 318.4 and 116.6, and every
      // number below is a difference of them.
      const heights = inners.map((i) => i.getBoundingClientRect().height);
      const tallest = Math.max.apply(null, heights);

      // Desktop hangs the accessories off the material title, the way the
      // stack hangs off it — the same 1.2rem breath .hp-storage_wrap-box
      // takes, and for the reason written beside it there: centring a short
      // row in a tall frame is where a screenful of air between ALUMINUM and
      // INSERTS comes from. It was, again. The slack belongs under the last
      // insert, where the bar closes it, not over the first one. One park for
      // every row, so the heads make a band across the shop rather than
      // appearing twice at two different heights.
      //
      // A phone has no title above the accessories — the last material's
      // header has let go by then — so there is nothing to hang from and the
      // row is a screen of its own. Centred there.
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
      const park = desktop ? Math.round(head + 1.2 * rem)
                           : Math.max(0, Math.round((frame - tallest) / 2));

      inners.forEach((inner, i) => {
        const h = heights[i];
        rows[i].style.setProperty('--acc-park', park + 'px');
        // The wall, derived rather than guessed. At the end of the run the
        // row's bottom sits on the bottom of the frame, so how long the inner
        // stays parked is how far the row's own top has travelled past the
        // park by then — which makes the wall the beat plus everything
        // between the park and the frame's bottom edge. Guessing it cost the
        // dwell half its length the first time the park moved.
        //
        // It also equalises for free: the row's total height comes out at
        // hold + frame + head − park whatever is in it, so aluminum's two
        // inserts and titanium's one run out on the same line instead of the
        // short one riding up while the tall one is still parked.
        wallOf(rows[i]).style.height =
          Math.round(hold + frame + head - park - h - padBottom(rows[i])) + 'px';
      });
    }

    function padBottom(el) {
      return parseFloat(getComputedStyle(el).paddingBottom) || 0;
    }

    function wallOf(row) {
      let wall = row.querySelector(':scope > .acc-wall');
      if (!wall) {
        wall = document.createElement('div');
        wall.className = 'acc-wall';
        row.appendChild(wall);
      }
      return wall;
    }

    window.parkAccessories = parkAccessories;

    function applyLayoutTweaks() {
      placeTotalInStickyBar();
      markSkuAddons();
      applyTopPrices();
      buildPieceControls();
      buildInsertsRow();
      placeAccessories();
      parkAccessories();
      buildProductMedia();
      // Draws the strip for whatever is already in the cart and puts every
      // stepper in step with it — one call, because updateCartTotal is the
      // single path from the rows to the page.
      if (window.CartManager) window.CartManager.updateCartTotal();
      // Always, not only when controls were built. The travel is derived from
      // the measured height of the closed stack, and adding the controls
      // changes that height — a rebuild fired in the same tick as the insert
      // measures the old layout and opens the stack too far.
      if (window.rebuildExplodes) window.rebuildExplodes();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyLayoutTweaks, { once: true });
    } else {
      applyLayoutTweaks();
    }

    window.addEventListener('resize', applyTopPrices);
    // The park is half of what the row does not fill, so it moves with the
    // window at every size, not only across the column breakpoint.
    window.addEventListener('resize', parkAccessories);
    // The row's height is its images' height, and on a cold load they are not
    // measured yet — a park read off the unloaded row is a park off by the
    // difference.
    window.addEventListener('load', parkAccessories);
    window.setTimeout(applyLayoutTweaks, 1200);
  })();
