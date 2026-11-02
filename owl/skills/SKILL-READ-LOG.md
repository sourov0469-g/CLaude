# Skill read log: Owl Roofing (each skill read IN FULL by its tag, in this session, by me)

Format: tag, name, when read, and the rules taken. Rules are stated in words so they can be checked against the work.

## Phase 1: brand recovery
- ⟦S0607⟧ brand-extract
  - **Method:** measure the live site, never guess. Frequency-rank the colour literals and resolve seven roles: background,
    surface, foreground, muted, border, accent, accent-secondary.
  - **What to save:** the real @font-face families and the weights actually used; every logo candidate (prefer the SVG
    wordmark); 6-8 large hero/cover images filtered by rendered size; voice from real headings.
  - **Anti-bot walls:** never bypass one. (owlroofing.com shows "Confirm you are human" to headless Chromium. I did not
    attempt it. I rendered the page source and assets fetched by plain HTTP instead, and say so in the gate report.)
  - **Proprietary fonts:** keep the real family name, name the closest Google font as the stand-in, and say "stand-in for".
  - Do not invent company facts.
- ⟦S0659⟧ anti-ai-slop (craft)
  - **Seven cardinal sins:** indigo accents; the two-stop trust gradient; emoji icons; the wrong display face; the rounded
    card with a coloured left border; invented metrics; filler copy.
  - **Soft tells:** the Hero→Features→Pricing→FAQ→CTA skeleton; placeholder image CDNs; more than 12 raw hex values outside
    :root; the accent used more than 2 times per screen.
  - **Soul:** 80% proven patterns + 20% distinctive choice: one bold move, voice, one memorable micro-interaction, one
    product-only detail.
  - **Identifiability test:** someone outside the project can tell whose site a screenshot is.
- ⟦S0660⟧ color (craft)
  - **Four layers by pixel share:** neutrals 70-90%, ONE accent 5-10%, semantic 0-5%, effect under 1%.
  - At most 2 visible accent uses per screen; links and focus rings count as accent.
  - **Contrast gates:** 4.5 body, 3 large text, 3 UI.
  - Darken the accent for text use and keep the bright variant for fills.
  - **Naming:** tokens named by purpose. No decorative gradients.
- ⟦S0444⟧ company-logos
  - Logos monochrome by default; brand colour only where recognition matters.
  - Never mix filled, outline and wordmark styles in one row.
  - Never hotlink random logo assets. (Owl's logo is taken from Owl's own source and saved locally.)
- ⟦S1418⟧ color-system
  - Full tonal scales, not swatches. Semantic colours each get background, foreground, border and icon variants.
  - Test EVERY foreground/background pair. Never use colour alone for meaning. Simulate colour blindness.
- ⟦S0001⟧ frontend-design
  - The hero opens with the most characteristic thing in the subject's world.
  - **Two-pass method:** plan the tokens (4-6 named hex, type roles, layout concept, principles), review the plan against
    the brief for genericness, then build.
  - **AI clusters to avoid:**
    - a cream ground + serif display + terracotta accent;
    - near-black + one acid accent;
    - a broadsheet with hairline rules;
    - the SaaS card kit;
    - template chrome: tracked ALL-CAPS eyebrows, middle-dot meta strings, mono data labels, → on links.
  - **Type and structure:** one accent word in a headline and all-caps labels are tells. Numbered markers only for real
    sequences. Lines under 80 characters.
  - **Motion:** one orchestrated moment beats scattered fades.
  - **Restraint:** spend boldness in one place, then remove one accessory before shipping.
  - **Note for Owl:** the live site already sits close to cluster 1 (cream ground) and uses tracked ALL-CAPS eyebrows
    ("THE TWIN CITIES TRUSTED ROOFING COMPANY", "OUR SERVICES", "COMPANY PROMISE"). The kept colours stay; the template
    chrome goes.
