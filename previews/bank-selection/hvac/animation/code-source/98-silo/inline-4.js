
  // Where this visit came from, carried to checkout. The checkout is a
  // different host, so without this every UTM and the Meta click id stopped
  // at the cart permalink, and Shopify recorded each order as arriving from
  // silosilosilo.com with no campaign. Captured from the landing URL and
  // kept for the tab's session, so a visitor who lands from an ad and
  // browses before checking out still carries it. First touch wins: once a
  // session has a source, a later tagged URL in the same tab does not
  // replace it.
  const ATTRIBUTION = (function() {
    const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id',
                  'fbclid', 'gclid', 'ttclid'];
    const STORE = 'silo:attribution';
    const fromUrl = {};
    const query = new URLSearchParams(window.location.search);
    KEYS.forEach((k) => { const v = query.get(k); if (v) fromUrl[k] = v; });
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(STORE) || 'null');
      if (saved && Object.keys(saved).length) return saved;
      if (Object.keys(fromUrl).length) window.sessionStorage.setItem(STORE, JSON.stringify(fromUrl));
    } catch (e) {
      // Storage blocked: this page's own URL is still worth carrying.
    }
    return fromUrl;
  })();

  const CartManager = {
    config: {
      selectors: {
        quantityDisplay: '[data-show-quantity]',
        quantityInc: '[data-change-quantity-inc]',
        quantityDec: '[data-change-quantity-dec]',
        cartContainer: '[data-cart-items-container]',
        cartItem: '[data-cart-item]'
      },
      attributes: {
        dynamicProductId: 'data-dynamic-product-id',
        cartTemplate: 'cart-template'
      },
      values: {
        dynamicItem: 'dynamic-item'
      },
      // Brass go-live switch. Kept as a switch because brass depends on Shopify state
      // this file cannot see; flip it off if that state regresses.
      gates: {
        brass: true
      },
      prices: {
        '8973822722300': 100,
        '8973825540348': 19,
        '8973828849916': 19,
        '8973831667964': 19,
        '8974057079036': 9,
        '8974057832700': 19,
        '8974058717436': 29,
        '8974059077884': 39,
        '8974059602172': 49,
        // Brass, on Eddie's curve. Shopify was moved to these values first (2026-08-16,
        // 39/39/59/69/99 -> 29/59/89/119/149) and these mirror it — checkout here is a cart
        // permalink, so Shopify's price wins no matter what this file says. Page and charge
        // must agree by construction; that is the lesson of the Tower overcharge, where the
        // page said $99 and Shopify charged $145.
        // If these ever need to change: change Shopify first, then match here. Never the
        // other way round.
        'brass-cap': 29,
        'brass-15': 59,
        'brass-30': 89,
        'brass-60': 119,
        'brass-90': 149,
        // The brass counterpart to the $100 Silo Stack. Created in Shopify
        // 2026-08-16 as SILO-SS-BR: a 33% bundle discount off the $445 parts
        // sum, mirroring aluminum's 31% ($100 against $145).
        'brass-stack': 299
      },
      variants: {
        '8973822722300': '47171959030012',
        '8973825540348': '47171380838652',
        '8973828849916': '47171412427004',
        '8973831667964': '47171488350460',
        '8974057079036': '47173359206652',
        '8974057832700': '47173364678908',
        '8974058717436': '47173369135356',
        '8974059077884': '47173369659644',
        '8974059602172': '47173371298044',
        // VERIFIED 2026-08-16 against the live storefront (products.json): every ID below
        // resolves to the expected SILO-SS-BR-* SKU at the price above.
        'brass-cap': '50988602261756',
        'brass-15': '50988602917116',
        'brass-30': '50988602982652',
        'brass-60': '50988603048188',
        'brass-90': '50988603080956',
        'brass-stack': '50988897992956'
      },

      // Which five pieces make a stack, per material. This is the only place
      // the bundle rule is written down; collapseCart() below is the only
      // place it is applied, and the bar, the thumbnails and the checkout
      // permalink all read that one result.
      sets: [
        {
          stack: '8973822722300',
          pieces: ['8974057079036', '8974057832700', '8974058717436', '8974059077884', '8974059602172']
        },
        {
          stack: 'brass-stack',
          pieces: ['brass-cap', 'brass-15', 'brass-30', 'brass-60', 'brass-90']
        }
      ]
    },

    rowQty(productId) {
      const row = document.querySelector('section.section_cart[sf-product="' + productId + '"]');
      if (!row) return 0;
      const display = row.querySelector('[data-show-quantity]');
      return display ? (parseInt(display.textContent, 10) || 0) : 0;
    },

    // The cart as it will actually be charged.
    //
    // The rows hold what was clicked, piece by piece. But a complete set of
    // five IS a stack, and Shopify sells that as one cheaper SKU — $100 where
    // the same five à la carte are $145. So the cart is collapsed once, here,
    // before anything reads it: whole sets become stacks, the remainder stays
    // à la carte, and inserts pass straight through.
    //
    // Doing it in one place is the point. The subtotal in the bar, the
    // thumbnails above it and the variants in the permalink are three views of
    // this one list, so they cannot drift apart — and the buyer gets the
    // cheaper number without having to know the rule exists.
    collapseCart() {
      const lines = [];
      const claimed = {};

      this.config.sets.forEach((set) => {
        set.pieces.concat([set.stack]).forEach((id) => { claimed[id] = true; });
        if (!this.isPurchasable(set.stack)) return;
        const qtys = set.pieces.map((id) => this.rowQty(id));
        const folded = Math.min.apply(null, qtys);
        // The stack row's own quantity is already a stack; the folded sets are
        // added to it rather than counted twice.
        const stacks = this.rowQty(set.stack) + folded;
        if (stacks > 0) lines.push({ id: set.stack, n: stacks });
        set.pieces.forEach((id, i) => {
          const over = qtys[i] - folded;
          if (over > 0) lines.push({ id: id, n: over });
        });
      });

      $('section.section_cart').each((index, element) => {
        const id = $(element).attr('sf-product');
        if (claimed[id]) return;
        const n = this.rowQty(id);
        if (n > 0) lines.push({ id: id, n: n });
      });

      return lines.filter((l) => this.isPurchasable(l.id));
    },

    // A key is purchasable unless a gate covers it. There is deliberately no brass Tower:
    // SILO-SS-BR does not exist, so a brass stack stays unsellable rather than mispriced.
    isPurchasable(productId) {
      if (!productId) return false;
      if (String(productId).indexOf('brass-') === 0) return this.config.gates.brass;
      return true;
    },

    initializeCart() {
      $('section.section_cart').each((index, element) => {
        const section = $(element);
        const cartContainer = section.find(this.config.selectors.cartContainer);
        const quantityDisplay = section.find(this.config.selectors.quantityDisplay).first();

        if (quantityDisplay.length > 0) {
          quantityDisplay.text('0');
        }

        if (cartContainer.find(this.config.selectors.cartItem).length > 0) {
          const template = cartContainer.find(this.config.selectors.cartItem).first().clone();
          section.data(this.config.attributes.cartTemplate, template);
          cartContainer.empty();
          this.setCartMiddleVisibility(section, 0);
        }
      });
    },

    setSectionQuantity(section, quantity) {
      const safeQuantity = Math.max(0, Number(quantity) || 0);
      const quantityDisplay = section.find(this.config.selectors.quantityDisplay).first();
      if (quantityDisplay.length > 0) {
        quantityDisplay.text(safeQuantity);
      }
      this.updateCartItemsDisplay(section, safeQuantity);
      this.updateCartTotal();
    },

    updateCartTotal() {
      const lines = this.collapseCart();
      const total = lines.reduce((sum, l) => sum + (this.config.prices[l.id] || 0) * l.n, 0);
      $('[sf-cart-subtotal]').text('$' + total);
      // Everything downstream of a quantity change happens here, so there is
      // one path from the model to the page however the change was made — a
      // piece stepper, the stack callout, or an insert.
      if (window.renderCartStrip) window.renderCartStrip(lines);
      if (window.syncShopControls) window.syncShopControls();
    },

    updateCartItemsDisplay(section, quantity) {
      const cartContainer = section.find(this.config.selectors.cartContainer);
      let template = section.data(this.config.attributes.cartTemplate);
      const safeQuantity = Math.max(0, Number(quantity) || 0);

      if (!template) {
        template = section.find(this.config.selectors.cartItem).first().clone();
        section.data(this.config.attributes.cartTemplate, template);
      }

      cartContainer.find(`[${this.config.attributes.dynamicProductId}]`).remove();
      for (let i = 0; i < safeQuantity; i++) {
        cartContainer.append(template.clone().attr(this.config.attributes.dynamicProductId, this.config.values.dynamicItem));
      }
      this.setCartMiddleVisibility(section, safeQuantity);
    },

    setCartMiddleVisibility(section, quantity) {
      const cartMiddleBox = section.find('.cart_box-middle');
      if (cartMiddleBox.length === 0) {
        return;
      }
      const isEmpty = quantity <= 0;
      cartMiddleBox.toggleClass('is-empty', isEmpty);
      cartMiddleBox.css('display', isEmpty ? 'none' : '');
    },

    updateQuantityAndCart(section, change) {
      // A gated item cannot be added. Refusing the increment here is what keeps the
      // subtotal honest — the row can never hold a quantity the checkout would drop.
      if (change > 0 && !this.isPurchasable(section.attr('sf-product'))) return;
      const quantityDisplay = section.find(this.config.selectors.quantityDisplay);
      if (quantityDisplay.length > 0) {
        const currentQuantity = parseInt(quantityDisplay.text()) || 0;
        const newQuantity = Math.max(0, currentQuantity + change);
        this.setSectionQuantity(section, newQuantity);
      }
    },

    bindQuantityButtons() {
      $(document).on('click', this.config.selectors.quantityDec, (e) => {
        this.updateQuantityAndCart($(e.currentTarget).closest('section'), -1);
      });

      $(document).on('click', this.config.selectors.quantityInc, (e) => {
        this.updateQuantityAndCart($(e.currentTarget).closest('section'), 1);
      });
    },

    buildCheckoutUrl() {
      // Same collapsed list the bar was priced from, so Shopify is asked for
      // exactly the lines the buyer was shown — a folded set goes over as one
      // stack variant, never as five pieces at the higher price.
      const items = this.collapseCart()
        .filter((l) => this.config.variants[l.id])
        .map((l) => this.config.variants[l.id] + ':' + l.n);
      if (items.length === 0) return null;
      // Shopify's permalink takes a query string after the line items
      // (/cart/<variant>:<qty>,...?key=value). Set through URL so anything
      // already on the query is merged with, never doubled.
      const url = new URL('https://checkout.silosilosilo.com/cart/' + items.join(','));
      Object.keys(ATTRIBUTION).forEach((k) => {
        if (!url.searchParams.has(k)) url.searchParams.set(k, ATTRIBUTION[k]);
      });
      return url.toString();
    },

    bindCheckout() {
      $(document).on('click', '[sf-checkout]', (e) => {
        e.preventDefault();
        const url = this.buildCheckoutUrl();
        if (url) {
          window.location.href = url;
        }
      });
    },

    initialize() {
      this.initializeCart();
      this.bindQuantityButtons();
      this.bindCheckout();
    }
  };

  // Exposed so the price actually shown on a row can be derived from the same map used to
  // total the cart and build the checkout URL, instead of a second hand-maintained copy.
  window.CartManager = CartManager;

  $(document).ready(function() { CartManager.initialize(); });
