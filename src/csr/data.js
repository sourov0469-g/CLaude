/* ==========================================================================
   PIZZABURG · CORPORATE SOCIAL RESPONSIBILITY — deck data
   Group NEXIX · Bangladesh University · Business Ethics

   Sixteen slides, written by the same six students who prepared the earlier
   PizzaBurg HRM report. What PizzaBurg is already doing comes from two
   secondary sources and nothing else: Dhaka Tribune reporting for the two
   community gestures, and a document hosted on Scribd for the workplace and
   packaging claims. Neither was verified by us in person, and the slides say
   so where it matters.

   The four proposals — Buy 1 Give 1, Green PizzaBurg, Student Support and
   Food Rescue — are the group's own. So is the priority ranking on slide 14.
   Carroll's CSR Pyramid is used as an organising lens for judging what we
   found; it is not a source of any PizzaBurg fact.
   ========================================================================== */

const PRESENTERS = [
  { key: 'ratul',  name: 'Raiyan Ahmed Ratul',     short: 'Raiyan',  id: '202511170047', hue: 8   },
  { key: 'aditya', name: 'Aditya Tripura',         short: 'Aditya',  id: '202511170006', hue: 26  },
  { key: 'liya',   name: 'Liya Akter',             short: 'Liya',    id: '202511170072', hue: 42  },
  { key: 'shuvo',  name: 'Shuvo Chandra Roy',      short: 'Shuvo',   id: '202511170023', hue: 150 },
  { key: 'sourov', name: 'Asiful Islam Sourov',    short: 'Sourov',  id: '202511170026', hue: 205 },
  { key: 'esha',   name: 'Fabliha Mubarrat Kabir', short: 'Fabliha', id: '202511170060', hue: 268 },
];

/* One balance scale is weighed across the deck. `stage` is how far the beam
   has tipped while a slide is up: it starts loaded on the cost side, and each
   stage sets one more token down on the giving pan — a lantern at Ramadan, a
   gift at Christmas, an apron, a leaf, then the four proposals — so the tilt
   toward the good side is the argument being made, not a decoration. */
const STAGE_ORDER = [
  'open', 'framework', 'ramadan', 'christmas', 'welfare', 'environment',
  'gap', 'idea1', 'idea2', 'idea3', 'idea4', 'fullreveal',
];

const SLIDES = [

  /* ===== RAIYAN — slides 1 and 2 ========================================= */
  {
    id: 'cover', by: 'ratul', layout: 'cover', stage: 'open',
    kicker: 'Business Ethics · Course Project',
    title: 'PizzaBurg',
    titleSub: 'Corporate Social Responsibility',
    lede: 'A review of PizzaBurg’s current CSR practices, and four new initiatives proposed by Group NEXIX.',
    meta: [
      { k: 'Group', v: 'NEXIX' },
      { k: 'Institution', v: 'Bangladesh University' },
      { k: 'Course', v: 'Business Ethics' },
    ],
    roster: true,
    notes: 'Good morning. We are Group NEXIX. Some of you will remember our earlier HRM report on PizzaBurg — this presentation continues that same research thread, this time looking at Corporate Social Responsibility. We will walk through what PizzaBurg is already doing for CSR based on published sources, apply a CSR framework from this course to judge how far that goes, and then pitch four new CSR ideas of our own.',
  },
  {
    id: 'team', by: 'ratul', layout: 'split', stage: 'open',
    cam: { p: [13, 11, 50], t: [-11, 3.2, 2], fov: 36 },
    kicker: 'Meet Group NEXIX',
    title: 'Our team',
    lede: 'The same six members who prepared the earlier PizzaBurg HRM report return for this CSR analysis.',
    bullets: [
      'Six members, working as **Group NEXIX** for a second time',
      'We continue the same research line, on a different question',
      'Each of us takes a block of these **sixteen slides**',
    ],
    aside: { kind: 'team' },
    notes: 'A quick round of introductions. This is the same six-person group that submitted the earlier PizzaBurg HRM report, so we are continuing as Group NEXIX, and we have split the sixteen slides between the six of us.',
  },

  /* ===== ADITYA — slides 3 and 4 ========================================= */
  {
    id: 'intro', by: 'ratul', layout: 'split', stage: 'open',
    cam: { p: [18, 14, 57], t: [-6, 4.0, -1], fov: 38 },
    photo: { src: 'pb-neon-sign', caption: 'A PizzaBurg outlet, Dhaka' },
    photo2: { src: 'pb-two-pizzas', caption: 'Two of their pizzas, photographed on our earlier HRM site visit' },
    kicker: 'Introduction & Objectives',
    title: 'Why we are studying PizzaBurg’s CSR',
    lede: 'Having already studied its HR practices, we now turn to how PizzaBurg behaves as a corporate citizen.',
    stats: [
      { value: '4', label: 'practices found' },
      { value: '4', label: 'ideas proposed' },
    ],
    bulletsTitle: 'Objectives of the study',
    bullets: [
      'Document what PizzaBurg is **currently doing** for CSR, from published sources',
      'Judge whether that goes far enough, using a **CSR framework** from this course',
      'Propose **four new initiatives**, and say where we would start',
    ],
    notes: 'For anyone who was not in the room for our HRM presentation, a quick recap — we studied how PizzaBurg manages its people. This time we are asking a different question: how does PizzaBurg behave as a corporate citizen? Our objectives are threefold. Lay out what CSR activities PizzaBurg is already reported to run. Judge those against a framework from this course. And put forward four new CSR ideas of our own, with a sense of which are worth doing first.',
  },
  {
    id: 'framework', by: 'aditya', layout: 'split', stage: 'framework', handover: true,
    kicker: 'Our Analytical Lens',
    title: 'What CSR means here',
    lede: 'We use Carroll’s four-part CSR pyramid — economic, legal, ethical and philanthropic responsibility — to judge what good CSR looks like for a company like PizzaBurg.',
    bullets: [
      'Each tier rests on the one below it: a company cannot give if it cannot **trade**',
      'The question the pyramid lets us ask: does CSR sit only at the **top tier**?',
      'Occasional giving is philanthropic. **Everyday practice** reaches further down',
    ],
    note: { tone: 'concern', title: 'On the framework', body: 'Carroll (1991) is our own choice of lens, and the tier we assign each activity to is our reading. Neither comes from Dhaka Tribune or from the Scribd document.' },
    aside: { kind: 'pyramid' },
    notes: 'Before judging PizzaBurg’s CSR we needed a framework, and as a group we chose Carroll’s CSR Pyramid, since it is the model most commonly taught in Business Ethics courses like ours. Economic responsibility is staying profitable enough to keep operating. Legal is following food-safety, labour and environmental rules. Ethical is doing what is right where the law is silent. Philanthropic is voluntarily giving back. We will use it mainly to ask whether PizzaBurg’s current CSR sits only at the philanthropic tier as occasional giving, or whether it is starting to become part of how the company operates.',
  },

  /* ===== LIYA — slides 5 to 8 ============================================ */
  {
    id: 'current-community-ramadan', by: 'aditya', layout: 'split', stage: 'ramadan',
    kicker: 'Current CSR · Community Giving',
    title: 'Iftar donations at Ramadan',
    lede: 'PizzaBurg’s first confirmed community gesture is tied to a specific point on the religious calendar.',
    bullets: [
      'During Ramadan, PizzaBurg has supplied **pizzas for iftar meals** at mosques',
      'The gesture runs **only during Ramadan**, not year-round',
      'In Carroll’s terms this is **philanthropic** — voluntary goodwill, not yet a structure',
    ],
    meta: [{ k: 'Source', v: 'Dhaka Tribune reporting' }],
    notes: 'Our first confirmed finding, reported by Dhaka Tribune, is that during Ramadan PizzaBurg has supplied pizzas for iftar meals at mosques. We are presenting this as a reported fact from a news source, not something our group verified in person. In Carroll’s terms it sits in the philanthropic tier — real goodwill, but tied to one point on the calendar rather than running all year.',
  },
  {
    id: 'current-community-christmas', by: 'liya', layout: 'split', stage: 'christmas', handover: true,
    kicker: 'Current CSR · Community Giving',
    title: 'The Christmas giveaway',
    lede: 'A second confirmed gesture, tied to a different date and reaching a different group.',
    bullets: [
      'Around Christmas, staff have dressed as Santa Claus and handed out **complimentary pizzas** to underprivileged children',
      'Like the Ramadan gesture, this runs **once a year** rather than continuously',
      'Two real acts of giving — both **dated**, neither yet a programme',
    ],
    meta: [{ k: 'Source', v: 'Dhaka Tribune reporting' }],
    notes: 'Around Christmas, PizzaBurg staff have dressed as Santa Claus and handed out complimentary pizzas to underprivileged children — also reported by Dhaka Tribune. Together with the Ramadan gesture, that is two confirmed acts of community giving, both real, both tied to a specific date rather than running all year.',
  },
  {
    id: 'current-internal-welfare', by: 'liya', layout: 'split', stage: 'welfare',
    kicker: 'Current CSR · Employee Welfare',
    title: 'A supportive workplace',
    lede: 'Beyond community giving, PizzaBurg is also reported to focus on how it treats its own staff.',
    bullets: [
      'The company states it aims to build a **supportive, inclusive** workplace culture',
      'That leans toward **ethical** responsibility — doing right by staff, beyond the legal minimum',
      'It is an aim the company describes, not an outcome anyone has measured',
    ],
    meta: [{ k: 'Source', v: 'Document hosted on Scribd' }],
    photo: { src: 'pb-interview-a', caption: 'PizzaBurg’s head office in Dhaka, on our earlier HRM site visit' },
    note: { tone: 'concern', title: 'On this source', body: 'Scribd hosts documents, it does not author them. We could not attribute this one, so we present it as stated intent rather than an independently checked outcome.' },
    notes: 'Our third finding comes from a Scribd source and looks inward rather than outward: PizzaBurg is described as aiming to build a supportive, inclusive workplace for its employees. We are flagging that this is a secondary, less formal source than a newspaper, so we are treating it as stated intent rather than an independently audited outcome.',
  },
  {
    id: 'current-internal-environment', by: 'liya', layout: 'split', stage: 'environment',
    kicker: 'Current CSR · Environmental Responsibility',
    title: 'Eco-friendly packaging',
    lede: 'The same source also describes a move toward more sustainable packaging.',
    photo: { src: 'pb-pizzas-table-c', caption: 'Serving boards and a branded cup in a PizzaBurg outlet — what they use today, not the proposal' },
    bullets: [
      'The company has moved toward **more eco-friendly packaging** for its food',
      'It has also taken steps to **reduce plastic waste** in its operations',
      'An early step into environmental responsibility — but **“more eco-friendly” is not defined**',
    ],
    meta: [{ k: 'Source', v: 'Document hosted on Scribd' }],
    notes: 'The same source also describes PizzaBurg moving toward more eco-friendly packaging and taking steps to reduce plastic waste. In our framework this is an early step into environmental responsibility — though we would note that “more eco-friendly” is not defined with any specific target, which is part of what our second new idea addresses.',
  },

  /* ===== SHUVO — slides 9 and 10 ========================================= */
  {
    id: 'gap', by: 'shuvo', layout: 'split', stage: 'gap', arc: 0.5, handover: true,
    kicker: 'The Opportunity',
    title: 'Where PizzaBurg’s CSR can go further',
    lede: 'The four existing activities are a good start, but clear gaps appear once we look at what is missing.',
    stats: [
      { value: '4', label: 'CSR areas found' },
      { value: '4', label: 'gaps identified' },
    ],
    bullets: [
      'Everything confirmed is either **occasional** or a **general statement of intent**',
      'Nothing reported handles **unsold food** at day’s end, or supports **students**',
      'Packaging has **no target** and **no return loop** described',
      'These four gaps are exactly what our four proposals close',
    ],
    aside: { kind: 'compare' },
    notes: 'Putting the last four slides together, PizzaBurg has real CSR activity, but it clusters around either specific holidays or general statements of intent. We want to be fair here — we are not saying PizzaBurg is doing badly, only that there is clear room to turn occasional goodwill into structured, everyday programs. And this is our own analysis, built on the four sourced facts you have just seen.',
  },
  {
    id: 'idea-buy1give1', by: 'shuvo', layout: 'split', stage: 'idea1',
    kicker: 'New Idea 1 · Group NEXIX proposal',
    title: 'Buy 1, Give 1',
    lede: 'For selected menu items, PizzaBurg donates one meal to someone in need for every meal a customer buys.',
    bullets: [
      'Customers choose from a **short list of eligible meals** at checkout',
      'For every eligible meal sold, PizzaBurg donates **one equivalent meal**',
      'The customer sees the giving happen, at the moment they order',
    ],
    note: { tone: 'strength', title: 'Why it is different', body: 'Unlike the Ramadan and Christmas giveaways, this runs every day of the year and scales automatically with sales.' },
    note2: { tone: 'concern', title: 'Ours, not theirs', body: 'A new idea from our group. PizzaBurg does not currently run a program like this.' },
    notes: 'This is where we shift from reporting on PizzaBurg to pitching our own ideas. For selected menu items, every meal a customer buys means one equivalent meal donated to someone in need. The difference from the Ramadan and Christmas examples we just covered is that this runs every day of the year, it scales automatically with sales, and it lets customers feel directly involved in the giving.',
  },

  /* ===== SOUROV — slides 11 and 12 ======================================= */
  {
    id: 'idea-green', by: 'sourov', layout: 'split', stage: 'idea2', handover: true,
    kicker: 'New Idea 2 · Group NEXIX proposal',
    title: 'Green PizzaBurg',
    lede: 'Push the existing packaging effort further: fully biodegradable packaging, plus a box return and recycle system.',
    bullets: [
      'Step 1 — move to **100% biodegradable packaging** across all outlets',
      'Step 2 — an **in-store return point** so customers bring used boxes back',
      'Returned boxes go to **recycling or composting**, not landfill',
      'A small **loyalty incentive** could be what makes people carry the box back',
    ],
    note: { tone: 'concern', title: 'Ours, not theirs', body: 'This extends the “more eco-friendly packaging” step already reported on slide 8. It goes further than anything PizzaBurg has announced.' },
    notes: 'Our second proposal takes the packaging step we found and pushes it further than what is currently confirmed. First, move to fully biodegradable packaging across all outlets. Second, set up an in-store system so customers can return used boxes for recycling or composting, possibly with a small loyalty incentive to make that worth doing. We want to be upfront that this is our extension of PizzaBurg’s direction, not a program they have already announced.',
  },
  {
    id: 'idea-student', by: 'sourov', layout: 'split', stage: 'idea3',
    kicker: 'New Idea 3 · Group NEXIX proposal',
    title: 'Student Support',
    lede: 'As university students ourselves, our third proposal asks PizzaBurg to invest directly in financially disadvantaged students.',
    bullets: [
      '**Scholarships** for financially disadvantaged university students',
      '**Free or discounted meals** for eligible students',
      '**Internships** at PizzaBurg, pairing support with work experience',
      'No equivalent programme appeared anywhere in our research',
    ],
    notes: 'Our third idea is close to home for us, since we are university students ourselves. Three components: scholarships for financially disadvantaged students, free or discounted meals for those who qualify, and internship places at PizzaBurg so the support comes with work experience attached. We think this makes sense both ethically and commercially, since students are likely a meaningful part of PizzaBurg’s customer base.',
  },

  /* ===== FABLIHA — slides 13 to 16 ======================================= */
  {
    id: 'idea-rescue', by: 'esha', layout: 'split', stage: 'idea4', handover: true,
    kicker: 'New Idea 4 · Group NEXIX proposal',
    title: 'Food Rescue',
    lede: 'Instead of discarding safe, unsold food at closing time, PizzaBurg donates it to shelters and charitable organisations.',
    bullets: [
      'At day’s end, still-safe unsold food is **set aside** instead of thrown away',
      'Partner with **local shelters** to collect and distribute it the **same day**',
      'It cuts food waste and feeds people with the **same single change**',
      'Together with Buy 1 Give 1, donation becomes a **daily habit**, not a holiday event',
    ],
    notes: 'Instead of throwing away pizzas and other food that is still safe to eat at closing time, PizzaBurg would set that food aside and partner with local shelters to collect and distribute it the same day. It hits two goals at once — cutting food waste and getting more food to people who need it. This is not part of PizzaBurg’s currently reported CSR activities; it is our proposal.',
  },
  {
    id: 'roi-matrix', by: 'esha', layout: 'split', stage: 'idea4',
    cam: { p: [13, 12, 42], t: [-3.2, 4.6, 0], fov: 35 },
    kicker: 'The Business Case',
    title: 'Impact against effort',
    lede: 'We placed our four proposals on a simple priority matrix — impact against effort and cost.',
    bullets: [
      '**Food Rescue** — low effort, high impact: a process change and one partnership',
      '**Buy 1, Give 1** — higher effort, but steady year-round visibility',
      '**Student Support** — moderate effort, and it can start small',
      '**Green PizzaBurg** — the largest cost, and the widest reach',
    ],
    aside: { kind: 'matrix' },
    notes: 'We tried to be honest about the fact that we do not have real financial data from PizzaBurg to run an actual ROI calculation — so what we are presenting here is our own qualitative reasoning, plotted as impact against effort, not audited numbers. Food Rescue is low effort and high impact: mainly a process change plus a shelter partnership. Buy 1 Give 1 needs a tracking system but offers steady, scalable, year-round visibility. Student Support needs a budget but can start small. Green PizzaBurg raises supply costs and needs new in-store logistics.',
  },
  {
    id: 'roi-order', by: 'esha', layout: 'split', stage: 'fullreveal', arc: 1.3,
    kicker: 'The Business Case',
    title: 'Where to start, and why',
    lede: 'Reading the matrix suggests a rollout order, though all four ideas are complementary.',
    bulletsTitle: 'Suggested order',
    bullets: [
      '**Food Rescue** — costs the least and reuses food already made',
      '**Buy 1, Give 1** — needs some tracking, then pays back all year',
      '**Student Support** — can start with a handful of places and grow',
      '**Green PizzaBurg** — the biggest investment, best planned once the others run',
      'All four turn existing goodwill into **structured, ongoing** CSR',
    ],
    notes: 'This ordering is our own judgement call, not a financial model. On that basis we would start with Food Rescue, since it is mostly a process change at close to zero cost, then Buy 1 Give 1, which needs some tracking but pays off with steady visibility. Student Support can start small. Green PizzaBurg is probably the most expensive, so we see it as the longer-term investment. What ties all four together is that they convert PizzaBurg’s existing goodwill into something structured and ongoing, not just occasional.',
  },
  {
    id: 'closing', by: 'esha', layout: 'closing', stage: 'fullreveal', arc: 1.4,
    cam: { p: [20, 15, 55], t: [0, 6.0, 0], fov: 39 },
    photo: { src: 'pb-team-street', caption: 'Group NEXIX on site' },
    kicker: 'Group NEXIX · Bangladesh University',
    title: 'Thank you.',
    titleSub: 'Questions & discussion.',
    lede: 'PizzaBurg already gives — at Ramadan, at Christmas, and to its own staff. Four structured programs would make that giving daily.',
    meta: [
      { k: 'Dhaka Tribune', v: 'Ramadan iftar donations · Christmas giveaway coverage' },
      { k: 'Scribd', v: 'Employee welfare · packaging and plastic waste' },
      { k: 'Carroll (1991)', v: 'The Pyramid of Corporate Social Responsibility' },
    ],
    notes: 'PizzaBurg already contributes to society through community support and special-day initiatives like the Ramadan iftar donations and the Christmas giveaways, alongside its stated focus on employee welfare and more eco-friendly packaging. Building on that, we have suggested four new CSR activities — Buy 1 Give 1, Green PizzaBurg, Student Support and Food Rescue. Together they span community giving, employee wellbeing, environmental care and student support, and we believe they can benefit both society and the environment without asking PizzaBurg to abandon what it already does well. Thank you all for listening.',
  },
];

/* the heavily blurred photograph that sits behind the bench. Read by the deck,
   so it has to be global; nothing here is meant to be read literally — these
   are colour and warmth under a scene, not illustrations of the slide. */
window.BACKDROPS = {
  'cover': 'pb-neon-sign',
  'team': 'pb-team-office',
  'intro': 'pb-two-pizzas',
  'framework': 'pb-desk-calendar',
  'current-community-ramadan': 'pb-pizzas-table-a',
  'current-community-christmas': 'pb-pizzas-table-b',
  'current-internal-welfare': 'pb-dough-hands',
  'current-internal-environment': 'pb-pizza-pan',
  'gap': 'pb-file-stack',
  'idea-buy1give1': 'pb-two-pizzas',
  'idea-green': 'pb-pizza-pan',
  'idea-student': 'pb-pizzas-table-c',
  'idea-rescue': 'pb-pizza-closeup',
  'roi-matrix': 'pb-desk-calendar',
  'roi-order': 'pb-file-stack',
  'closing': 'pb-team-selfie',
};

/* ------------------------------------------------------------------ panels --
   What the three new aside panels draw. The pyramid is Carroll's, worded for
   this company; the comparison and the matrix are the group's own reading of
   the four sourced facts, and are labelled as such on their slides. */

/* top tier first — the panel stacks it downward, widening toward the base */
const PYRAMID = [
  { tier: 'Philanthropic', gloss: 'giving back' },
  { tier: 'Ethical', gloss: 'doing right' },
  { tier: 'Legal', gloss: 'following the law' },
  { tier: 'Economic', gloss: 'staying profitable' },
];

const GAPCOMPARE = {
  has: [
    'Ramadan iftar donations',
    'Christmas Santa giveaway',
    'A supportive workplace culture',
    '“More eco-friendly” packaging',
  ],
  missing: [
    'Any ongoing food-rescue program',
    'Any student-focused program',
    'Fully biodegradable packaging',
    'A box return and recycling loop',
  ],
};

/* effort and impact are 0..1 fractions of the panel's two axes, not scores we
   measured — they are where the group would place each idea by argument */
const MATRIX = [
  { name: 'Food Rescue',     effort: 0.22, impact: 0.78, note: 'A process change plus one shelter partnership.' },
  { name: 'Buy 1, Give 1',   effort: 0.58, impact: 0.72, note: 'Needs tracking at the till; scales with sales.' },
  { name: 'Student Support', effort: 0.38, impact: 0.52, note: 'Needs a budget, but can start small and grow.' },
  { name: 'Green PizzaBurg', effort: 0.82, impact: 0.70, note: 'Raises supply costs and needs in-store logistics.' },
];
