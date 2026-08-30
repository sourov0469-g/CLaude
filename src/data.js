/* ==========================================================================
   PIZZABURG · HRM PRACTICES — deck data
   Group NEXIX · Bangladesh University · BUS-2204

   The copy on these thirteen slides is the group's own, taken line for line
   from the deck they wrote, and the speaker notes are theirs too. Nothing
   here adds a claim the group did not make.

   Behind it all: one face-to-face interview with Mr. Ranjan Datta, General
   Manager of Human Resource at PizzaBurg, on 26 August 2026, checked against
   the Bangladesh Labour Act 2006.
   ========================================================================== */

/* which photograph sits, heavily blurred, behind the bench on each slide */
window.BACKDROPS = {
  cover: 'pb-neon-sign',
  intro: 'pb-two-pizzas',
  method: 'pb-interview-c',
  planning: 'pb-pizza-pan',
  recruit: 'pb-dough-hands',
  turnover: 'pb-dhaka-street',
  welfare: 'pb-pizzas-table-a',
  performance: 'pb-interview-e',
  discipline: 'pb-justice',
  findings: 'pb-desk-calendar',
  recommendations: 'pb-interview-d',
  conclusion: 'pb-brand-salman',
  thanks: 'pb-team-selfie',
};

const PRESENTERS = [
  { key: 'ratul',  name: 'Raiyan Ahmed Ratul',     short: 'Raiyan',  id: '202511170047', hue: 8   },
  { key: 'aditya', name: 'Aditya Tripura',         short: 'Aditya',  id: '202511170006', hue: 26  },
  { key: 'liya',   name: 'Liya Akter',             short: 'Liya',    id: '202511170072', hue: 42  },
  { key: 'shuvo',  name: 'Shuvo Chandra Roy',      short: 'Shuvo',   id: '202511170023', hue: 150 },
  { key: 'sourov', name: 'Asiful Islam Sourov',    short: 'Sourov',  id: '202511170026', hue: 205 },
  { key: 'esha',   name: 'Fabliha Mubarrat Kabir', short: 'Fabliha', id: '202511170060', hue: 268 },
];

/* One pizza gets made across the deck. `stage` is where the bench has got to
   while a slide is up: the base is stretched while we explain the study, it
   goes into the oven as discipline begins, and it is sliced and served on the
   closing slides. */
const STAGE_ORDER = [
  'flour', 'dough', 'stretch', 'base', 'sauce', 'cheese',
  'toppings', 'peel', 'oven', 'bake', 'out', 'slice', 'served',
];

const SLIDES = [

  /* ===== RAIYAN — slides 1 and 2 ========================================= */
  {
    id: 'cover', by: 'ratul', layout: 'cover', stage: 'flour', fov: 38,
    kicker: 'Human Resource Management · BUS-2204',
    title: 'PizzaBurg',
    titleSub: 'Human Resource Management Practices',
    lede: 'An analytical report based on a face-to-face interview with PizzaBurg’s General Manager of Human Resource.',
    meta: [
      { k: 'Group', v: 'NEXIX' },
      { k: 'Institution', v: 'Bangladesh University' },
      { k: 'Submitted', v: '28 August 2026' },
    ],
    roster: true,
    notes: 'Good morning. We are Group NEXIX. Our report studies the Human Resource Management practices of PizzaBurg, a local pizza and burger chain, based on a face-to-face interview with their General Manager of Human Resource.',
  },
  {
    id: 'intro', by: 'ratul', layout: 'split', stage: 'dough',
    photo: { src: 'pb-neon-sign', caption: 'A PizzaBurg outlet, Dhaka' },
    photo2: { src: 'pb-pizzas-table-c', caption: 'Their menu, photographed on the day' },
    kicker: 'Introduction & Objectives',
    title: 'About the company, and our objectives',
    stats: [
      { value: '22', label: 'outlets' },
      { value: '~1,000', label: 'employees' },
      { value: '4,000+', label: 'pizzas / day' },
    ],
    bulletsTitle: 'Objectives of the study',
    bullets: [
      'Examine PizzaBurg’s Human Resource Management practices',
      'Cover workforce planning, recruitment, turnover, welfare, performance, training and discipline',
      'Compare those practices with the **Bangladesh Labour Act 2006**',
      'Identify strengths, concerns and practical recommendations',
    ],
    notes: 'PizzaBurg is a local pizza and burger chain founded in January 2018 in Mirpur-2, Dhaka. It now runs 22 outlets with close to a thousand employees and sells over four thousand pizzas a day. Our objective was to study how a company that grew this fast manages its people — covering staffing, recruitment, turnover, welfare, performance, training and discipline — and to identify its strengths and areas for improvement.',
  },

  /* ===== ADITYA — slides 3 and 4 ========================================= */
  {
    id: 'method', by: 'aditya', layout: 'split', stage: 'stretch', handover: true,
    photo: { kind: 'video', src: 'interview-18s', poster: 'pb-interview-b', caption: 'The interview · 26 August 2026' },
    photo2: { src: 'pb-interview-a', caption: 'PizzaBurg head office, Dhaka' },
    kicker: 'Methodology',
    title: 'How we collected our information',
    bullets: [
      '**Qualitative case study** of a single company',
      'Primary data: **one face-to-face interview**',
      'Interviewee: **Mr. Ranjan Datta**, General Manager of Human Resource',
      '**26 August 2026**, Dhaka',
      'Prepared questions with follow-ups; handwritten notes, at his request',
      'Secondary sources used only for background and the law',
    ],
    note: { tone: 'concern', title: 'Limitation', body: 'One interviewee, one meeting. No documents seen, no employees interviewed. Where we say something was not evidenced, we mean it was not described to us — not that it does not exist.' },
    notes: 'We used a qualitative case-study approach. Our primary data came from a face-to-face interview with Mr. Ranjan Datta, General Manager of Human Resource, held on 26 August 2026 in Dhaka. We used prepared questions with room for follow-ups and took handwritten notes, as he preferred. An important limitation: our findings are based on the information of one HR representative — we did not see company documents or interview workers.',
  },
  {
    id: 'planning', by: 'aditya', layout: 'split', stage: 'base',
    photo: { src: 'pb-pizzas-table-b', caption: 'A PizzaBurg outlet floor' },
    kicker: 'Workforce Planning',
    title: 'A fixed number at every outlet',
    bullets: [
      'PizzaBurg operates **22 outlets** across ten cities and towns',
      'Each outlet has a **fixed number of employees**',
      'Staffing is **not** determined through a supply-and-demand policy',
      'About **12 outlets are in Dhaka**; the rest across nine other towns',
    ],
    note: { tone: 'strength', title: 'Strength', body: 'Consistency and straightforward planning. Labour cost per outlet is predictable, rosters stay simple, and the same team works together.' },
    note2: { tone: 'concern', title: 'Concern', body: 'Less flexibility when workload changes. No periodic review of the fixed numbers was described to us, so a headcount set on opening day can drift out of date.' },
    aside: { kind: 'outlets' },
    notes: 'PizzaBurg operates 22 outlets, and each outlet is given a fixed number of employees. The company does not set staffing through a supply-and-demand policy. The strength of this is consistency and straightforward planning — labour cost is predictable and the same team works together. The concern is less flexibility when an outlet’s workload changes.',
  },

  /* ===== LIYA — slides 5 and 6 =========================================== */
  {
    id: 'recruit', by: 'liya', layout: 'split', stage: 'sauce', handover: true,
    photo: { src: 'pb-dough-hands', caption: 'Candidates demonstrate the actual task' },
    photo2: { src: 'pb-hiring-poster', fit: 'contain', caption: 'PizzaBurg also advertises roles publicly' },
    kicker: 'Recruitment & Selection',
    title: 'Hired in one day',
    bullets: [
      'Applies to **kitchen and floor staff** (blue-collar roles)',
      '**One-day** process from interview to decision',
      '**Practical experience** is checked',
      'Candidates may be asked to **demonstrate their ability** on the job',
      'How candidates are **sourced** was not described to us',
    ],
    note: { tone: 'strength', title: 'Strength', body: 'Better job-fit assessment. Watching a cook actually cook predicts performance far more reliably than an interview or a certificate.' },
    note2: { tone: 'rec', title: 'Recommendation', body: 'Standardise the test with a one-page scoring sheet — the tasks, what to look for, and the minimum score that gets an offer — so all 22 outlets hire to the same standard.' },
    notes: 'For blue-collar employees — kitchen and floor staff — recruitment is a one-day interview process. Practical experience is considered, and candidates may be asked to demonstrate their practical ability. The strength here is better job-fit assessment: watching someone do the actual work tells you more than a certificate. Our recommendation is to standardise the practical assessment criteria so every outlet applies the same standard.',
  },
  {
    id: 'turnover', by: 'liya', layout: 'split', stage: 'cheese',
    photo: { src: 'pb-dhaka-street', caption: 'Continuity keeps every kitchen running' },
    photo2: { src: 'pb-interview-c', caption: 'Asking about notice and turnover' },
    kicker: 'Turnover & Resignation',
    title: 'Turnover and the notice period',
    bullets: [
      'Every employee must give **two months’ notice** before resigning',
      'It gives HR time to **recruit a replacement**',
      'Two months matches the **60 days Section 27** requires of a permanent worker',
      'Turnover is **never counted**, and leavers are not asked why they go',
    ],
    aside: { kind: 'turnover' },
    notes: 'White-collar turnover is very low; blue-collar turnover is medium. Employees must give two months’ notice before resigning, which gives HR time to recruit a replacement. That two-month requirement aligns exactly with Section 27 of the Bangladesh Labour Act, which asks a permanent worker for sixty days’ notice. Overall it supports workforce continuity and reduces disruption in the kitchen.',
  },

  /* ===== SHUVO — slides 7 and 8 ========================================== */
  {
    id: 'welfare', by: 'shuvo', layout: 'split', stage: 'toppings', handover: true, wide: true,
    photo: { src: 'pb-pizzas-table-a', caption: 'Food support is provided on shift' },
    kicker: 'Employee Welfare',
    title: 'What employees receive',
    note: { tone: 'concern', title: 'Concern', body: 'Eligibility conditions were not explained, so applicants cannot count a benefit and staff may not know they qualify.' },
    aside: { kind: 'welfare' },
    notes: 'Eligible employees receive accommodation support and food support. Health checkups are provided, and that includes maternity-related care, which is consistent with Sections 45 to 50 of the Labour Act. Housing and food are the two largest costs a low-paid worker in Dhaka carries, so this support contributes directly to employee well-being and retention.',
  },
  {
    id: 'performance', by: 'shuvo', layout: 'split', stage: 'peel', wide: true,
    photo: { src: 'pb-interview-e', caption: 'Asking how reviews are used' },
    kicker: 'Performance & Training',
    title: 'Reviewed monthly, linked to training',
    lede: 'Reviews feed directly into training.',
    note: { tone: 'rec', title: 'Recommendation', body: 'Use clear, measurable indicators and document review outcomes.' },
    aside: { kind: 'loop' },
    notes: 'Performance is reviewed every month, which supports continuous monitoring — most companies of this size review once a year. Importantly, performance results are linked with training: the review identifies a gap, training addresses it, and the next month’s review shows whether it worked. Our recommendation is to use clear measurable indicators and to document the review outcomes so progress can actually be compared.',
  },

  /* ===== SOUROV — slides 9 and 10 ======================================== */
  {
    id: 'discipline', by: 'sourov', layout: 'split', stage: 'oven', handover: true, arc: 0.45,
    photo: { src: 'pb-justice', tone: 'warm', caption: 'Measured against the Labour Act 2006' },
    photo2: { src: 'pb-interview-d', caption: 'Mr. Datta on grounds for dismissal' },
    kicker: 'Discipline & Termination',
    title: 'Grounds for termination',
    bullets: [
      'Violation of **rules and regulations**',
      '**Sexual harassment**',
      '**Dishonesty** and integrity violations',
      'Other **serious misconduct**',
      'No warning or inquiry procedure was described',
    ],
    note: { tone: 'strength', title: 'Strength', body: 'Clear standards, broadly matching the misconduct list in §23(4). Naming sexual harassment explicitly is uncommon in this trade.' },
    note2: { tone: 'rec', title: 'Recommendation', body: 'Write down the §24 procedure — written charge, 7 days to reply, a hearing, and a joint inquiry inside 60 days — and establish the sexual harassment complaint committee, with outside members, that the 2009 High Court directive requires.' },
    notes: 'Serious misconduct may lead to termination. The grounds given were violation of rules and regulations, sexual harassment, integrity-related violations, and other serious misconduct. These broadly match Section 23 of the Labour Act. Two points on procedure: Section 24 requires a written charge, at least seven days to reply, a hearing and an inquiry before any punishment; and the 2009 High Court directive requires every workplace to have a sexual harassment complaint committee. Neither was described to us, so our recommendation is to document the procedure and establish the committee.',
  },
  {
    id: 'findings', by: 'sourov', layout: 'split', stage: 'bake',
    cam: { p: [-1, 13, 37], t: [-31, 4.8, 3], fov: 43 },
    photo: { src: 'pb-team-street', caption: 'Group NEXIX on site' },
    photo2: { src: 'pb-brand-salman', caption: 'PizzaBurg brand reach' },
    kicker: 'Major Findings',
    title: 'Major findings',
    bullets: [
      'Fixed staffing across **22 outlets**, not adjusted for demand',
      'Office turnover very low, floor turnover medium — but **never counted**',
      '**Two months’** resignation notice, matching the 60 days of §27',
      'One-day hiring with a practical test, but **no marking sheet**',
      '**Monthly** reviews linked to training, with no fixed measures described',
      'Welfare covering housing, food and health, eligibility unexplained',
      'Overall: **the methods are sound, the records are missing**',
      'Two gaps carry legal weight — **no §24 procedure**, **no harassment committee**',
    ],
    notes: 'Bringing it together. Fixed staffing across 22 outlets. Very low white-collar turnover and medium blue-collar turnover. A two-month resignation notice aligned with the Labour Act. Practical, experience-based selection for blue-collar roles. Monthly performance reviews linked to training. Welfare support and clear misconduct standards. The overall pattern: the practices themselves are sound, but documentation is limited.',
  },

  /* ===== FABLIHA — slides 11, 12 and 13 ================================== */
  {
    id: 'recommendations', by: 'esha', layout: 'split', stage: 'out', handover: true, wide: true,
    photo: { src: 'pb-file-stack', caption: 'Most fixes are a form, not a budget' },
    kicker: 'Recommendations',
    title: 'What we recommend',
    aside: { kind: 'recs' },
    notes: 'Our recommendations. Review the fixed staffing levels periodically rather than setting them once. Standardise the practical recruitment assessment with a scoring sheet. Use the two-month notice period strategically — for handover and for exit interviews. Strengthen the monthly reviews with measurable indicators. Integrate performance and training records centrally. And maintain clear, consistently documented disciplinary standards, including the complaint committee.',
  },
  {
    id: 'conclusion', by: 'esha', layout: 'split', stage: 'slice', arc: 1.4,
    photo: { src: 'pb-two-pizzas', caption: 'Twenty-two kitchens, one standard' },
    photo2: { src: 'pb-pizza-closeup', caption: 'What all of it is for' },
    kicker: 'Conclusion',
    title: 'HRM built around operational continuity',
    bullets: [
      'Every practice serves one goal: **keeping 22 outlets open and running**',
      'Fixed staffing creates **consistency**; the notice rule turns a sudden loss into a **planned** one',
      'Practical selection supports **job fit**; monthly reviews catch problems in **weeks, not months**',
      'In every area the **method was sound and the paperwork was missing**',
      'Two gaps go beyond untidiness — **no §24 procedure**, **no harassment committee**',
      'The next task is to **write the system down** without losing the speed',
    ],
    notes: 'In conclusion, PizzaBurg’s HRM is strongly connected to operational continuity — every practice serves the goal of keeping 22 outlets running. Fixed staffing creates consistency, notice periods support replacement planning, practical selection supports job fit, and monthly reviews support continuous monitoring. Further improvement is possible through stronger measurement, documentation and periodic staffing review.',
  },
  {
    id: 'thanks', by: 'esha', layout: 'closing', stage: 'served', fov: 42, arc: 1.3,
    kicker: 'Group NEXIX · Bangladesh University',
    title: 'Thank you.',
    titleSub: 'Questions & discussion.',
    lede: 'With thanks to Mr. Ranjan Datta, General Manager of Human Resource at PizzaBurg.',
    aside: { kind: 'team' },
    notes: 'Thank you for listening. We are happy to take questions. And our thanks to Mr. Ranjan Datta of PizzaBurg, who gave us his time and answered every question we asked.',
  },
];

/* ------------------------------------------------------------------ panels --
   The numbers and words the aside panels draw. Every one of them comes off a
   slide of the group's own deck; nothing here is estimated. */

const OUTLETS = { total: 22, dhaka: 12, towns: 10 };

const TURNOVER = [
  { grp: 'White-collar', lvl: 'Very Low', body: 'Office staff rarely leave the company.', tone: 'low' },
  { grp: 'Blue-collar',  lvl: 'Medium',   body: 'Front-line staff turn over more often.', tone: 'med' },
];

const WELFARE = [
  { icon: 'roof',   name: 'Accommodation',   body: 'Housing support for employees who qualify.' },
  { icon: 'bowl',   name: 'Food support',    body: 'Provided during working hours.' },
  { icon: 'cross',  name: 'Health checkups', body: 'Health checkups are provided.' },
  { icon: 'cradle', name: 'Maternity care',  body: 'Provided. Full §§45–50 entitlement not described.' },
];

const LOOP = [
  { n: '01', t: 'Monthly review',       b: 'Each employee’s performance is assessed.' },
  { n: '02', t: 'Gap identified',       b: 'The review shows where improvement is needed.' },
  { n: '03', t: 'Training given',       b: 'Training targets the identified gap.' },
  { n: '04', t: 'Monitoring continues', b: 'The next review shows the result.' },
];

const RECS = {
  first: [
    'Establish the **sexual harassment complaint committee**, with outside members',
    'Write down the **§24 disciplinary procedure** and issue it to every outlet manager',
    'Keep **one central record per employee** — appointment, reviews, training, discipline, exit',
  ],
  then: [
    'Add a written **scoring sheet** to the practical hiring test',
    'Use a one-page **monthly review form** with measurable indicators',
    '**Count turnover monthly**, and use the 60-day notice for handover and exit interviews',
    'Review each outlet’s **headcount twice a year** against real workload',
    '**Explain welfare eligibility** and open a promotion ladder to shift supervisor',
    'Add **induction and supervisor training**, plus a yearly Labour Act check',
  ],
};
