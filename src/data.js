/* ==========================================================================
   PIZZABURG · HRM PRACTICES — deck data
   Group NEXIX · Bangladesh University · BUS-2204

   Thirteen slides, in the order the group presents them. The copy follows the
   group's own deck; the report behind it rests on one face-to-face interview
   with Mr. Ranjan Datta, General Manager of Human Resource at PizzaBurg, on
   26 August 2026, checked against the Bangladesh Labour Act 2006.

   Where the report says something was "not evidenced", the wording keeps that
   distinction: it was not described to us, which is not the same as absent.
   ========================================================================== */

const PRESENTERS = [
  { key: 'ratul',  name: 'Raiyan Ahmed Ratul',     short: 'Ratul',  id: '202511170047', hue: 8   },
  { key: 'aditto', name: 'Aditya Tripura',         short: 'Aditto', id: '202511170006', hue: 26  },
  { key: 'liya',   name: 'Liya Akter',             short: 'Liya',   id: '202511170072', hue: 42  },
  { key: 'souvo',  name: 'Shuvo Chandra Roy',      short: 'Souvo',  id: '202511170023', hue: 150 },
  { key: 'sourov', name: 'Asiful Islam Sourov',    short: 'Sourov', id: '202511170026', hue: 205 },
  { key: 'esha',   name: 'Fabliha Mubarrat Kabir', short: 'Esha',   id: '202511170060', hue: 268 },
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

  /* ===== RATUL — slides 1 and 2 ========================================== */
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
    notes: 'Good afternoon. We are Group NEXIX, and our report is on the human resource practices of PizzaBurg — a Bangladeshi pizza and burger chain that has grown from one shop to twenty-two in eight years. Everything here comes out of one face-to-face meeting with their General Manager of Human Resource, which we then checked against the Bangladesh Labour Act.',
  },
  {
    id: 'intro', by: 'ratul', layout: 'split', stage: 'dough',
    kicker: 'Introduction & Objectives',
    title: 'About the company, and our objectives',
    lede: 'A local chain competing with foreign brands in the same cities, growing fast enough for the strain to show.',
    stats: [
      { value: '22', label: 'outlets' },
      { value: '~1,000', label: 'employees' },
      { value: '4,000+', label: 'pizzas a day' },
    ],
    bullets: [
      'Examine PizzaBurg’s Human Resource Management practices',
      'Cover workforce planning, recruitment, turnover, welfare, performance, training and discipline',
      'Compare those practices with the **Bangladesh Labour Act 2006**',
      'Identify strengths, concerns and practical recommendations',
    ],
    aside: { kind: 'photo', src: 'outlet-sign', caption: 'Inside a PizzaBurg outlet, Dhaka' },
    notes: 'PizzaBurg runs twenty-two outlets, employs close to a thousand people and sells over four thousand pizzas a day. Our aim was to examine how it manages those people, to compare what we found against the Bangladesh Labour Act of 2006, and to end with practical recommendations. Aditto will explain how we collected the information.',
  },

  /* ===== ADITTO — slides 3 and 4 ========================================= */
  {
    id: 'method', by: 'aditto', layout: 'split', stage: 'stretch', handover: true,
    kicker: 'Methodology',
    title: 'How we collected our information',
    lede: 'A qualitative case study of a single company, built on one interview at PizzaBurg head office.',
    bullets: [
      '**Qualitative case study** of a single company',
      'Primary data: **one face-to-face interview**',
      '**Mr. Ranjan Datta**, General Manager of Human Resource',
      '**26 August 2026**, Dhaka',
      'Prepared questions with follow-ups; handwritten notes, at his request',
    ],
    aside: { kind: 'video', src: 'interview-18s', poster: 'interview-wide', caption: 'The interview · 26 August 2026' },
    note: { tone: 'concern', title: 'Limitation', body: 'One interviewee, one meeting. No documents seen, no employees interviewed. Where we say something was not evidenced, we mean it was not described to us — not that it does not exist.' },
    notes: 'This is a qualitative case study of one company, and our primary data is a single face-to-face interview with Mr. Ranjan Datta, the General Manager of Human Resource, on the twenty-sixth of August at their head office in Dhaka. We used prepared questions but allowed ourselves follow-ups, and we took handwritten notes because he preferred that to a recording. One limitation, honestly, up front: one interviewee, one meeting, no documents, no employees. So where we say something was not evidenced, we mean it was not described to us.',
  },
  {
    id: 'planning', by: 'aditto', layout: 'split', stage: 'base',
    kicker: 'Workforce Planning',
    title: 'A fixed number at every outlet',
    lede: 'Each outlet gets a set headcount, and it is not adjusted for how busy a shop is.',
    bullets: [
      'PizzaBurg operates **22 outlets** across ten cities and towns',
      'Each outlet has a **fixed number of employees**',
      'Staffing is **not** determined through a supply-and-demand policy',
      'About **12 outlets are in Dhaka**; the rest across nine other towns',
    ],
    aside: { kind: 'outlets' },
    note: { tone: 'strength', title: 'Strength', body: 'Consistency and straightforward planning. Labour cost per outlet is predictable, rosters stay simple, and the same team works together.' },
    note2: { tone: 'concern', title: 'Concern', body: 'Less flexibility when workload changes, and no periodic review of the fixed numbers was described to us — so a headcount set on opening day can drift out of date.' },
    notes: 'PizzaBurg runs twenty-two outlets across ten cities and towns, and each one has a fixed number of employees. Mr. Datta was clear this is not set by supply and demand. About twelve of those outlets are in Dhaka and the rest are spread across nine other towns. The strength is consistency — labour cost per outlet is predictable and rosters stay simple. The concern is that nothing appears to review those numbers. Liya will take recruitment.',
  },

  /* ===== LIYA — slides 5 and 6 =========================================== */
  {
    id: 'recruit', by: 'liya', layout: 'split', stage: 'sauce', handover: true,
    kicker: 'Recruitment & Selection',
    title: 'Hired in one day',
    lede: 'The moment a cook leaves the station is empty, so speed here is not carelessness. It is the only option.',
    bullets: [
      'Applies to **kitchen and floor staff**',
      '**One-day** process from interview to decision',
      'Practical **experience** is checked',
      'Candidates may be asked to **demonstrate their ability** on the job',
      'How candidates are **sourced** was not described to us',
    ],
    aside: { kind: 'photo', src: 'stock-dough-stretching-hands', caption: 'Candidates demonstrate the actual task' },
    note: { tone: 'strength', title: 'Strength', body: 'Better job-fit assessment. Watching a cook actually cook predicts performance far more reliably than an interview or a certificate.' },
    note2: { tone: 'rec', title: 'Recommendation', body: 'Standardise the test with a one-page scoring sheet — the tasks, what to look for, and the minimum score that gets an offer — so all 22 outlets hire to the same standard.' },
    notes: 'Hiring for kitchen and floor staff is done in one day, from interview to decision. Practical experience is checked, and candidates may be asked to demonstrate their ability on the job. That last part is the strongest thing in the system — watching a cook actually cook predicts performance far more reliably than an interview or a certificate. Our recommendation is to standardise it with a one-page scoring sheet, so all twenty-two outlets hire to the same standard.',
  },
  {
    id: 'turnover', by: 'liya', layout: 'split', stage: 'cheese',
    kicker: 'Turnover & Resignation',
    title: 'Turnover and the notice period',
    lede: 'Two words of answer, and a rule that quietly matches the statute.',
    bullets: [
      'Every employee must give **two months’ notice** before resigning',
      'It gives HR time to **recruit a replacement**',
      'Two months matches the **60 days Section 27** asks of a permanent worker',
      'Turnover is **never counted**, and leavers are not asked why they go',
    ],
    aside: { kind: 'turnover' },
    note: { tone: 'concern', title: 'No figures were given', body: 'Very low and medium are the manager’s own words, not a measurement. The payroll already holds everything needed to count it properly.' },
    notes: 'On turnover, Mr. Datta answered in two words. Office staff, very low. Floor and kitchen staff, medium. No figures — those are his words, not a measurement. Every employee must give two months notice before resigning, which gives HR time to recruit a replacement, and it happens to match exactly the sixty days Section 27 asks of a permanent worker. The gap is that turnover is never counted and nobody asks leavers why they are going. Souvo will take welfare.',
  },

  /* ===== SOUVO — slides 7 and 8 ========================================== */
  {
    id: 'welfare', by: 'souvo', layout: 'split', stage: 'toppings', handover: true,
    kicker: 'Employee Welfare',
    title: 'What employees receive',
    lede: 'Housing and food are the two biggest costs a low-paid worker in Dhaka carries. PizzaBurg helps with both.',
    aside: { kind: 'welfare' },
    bullets: [
      'Worth more to a low-paid worker than a pay rise of the same cost',
      'Maternity care engages **Sections 45–50** of the Labour Act',
      'Benefits like these reduce dissatisfaction — a **promotion path** is what creates drive',
    ],
    note: { tone: 'concern', title: 'Concern', body: 'Eligibility conditions were not explained, so applicants cannot count a benefit and staff may not know they qualify.' },
    notes: 'Employees who qualify get accommodation support, food support during working hours, health checkups, and maternity care. These are not small gestures — housing and food are the two biggest costs a low-paid worker in Dhaka carries, so help with both is worth more than a pay rise costing the company the same money. Maternity care also engages Sections forty-five to fifty. Our concern is that eligibility was never explained, so applicants cannot count a benefit and staff may not know they qualify.',
  },
  {
    id: 'performance', by: 'souvo', layout: 'split', stage: 'peel',
    kicker: 'Performance & Training',
    title: 'Reviewed monthly, linked to training',
    lede: 'Most companies this size review once a year. Monthly means a problem shows up in weeks.',
    aside: { kind: 'loop' },
    bullets: [
      'Performance is assessed **every month**, not annually',
      'The review decides **who gets training** — the step most companies skip',
      'The next review then **tests whether the training worked**',
      'No fixed measures, and no written record, were described to us',
    ],
    note: { tone: 'rec', title: 'Recommendation', body: 'Use clear, measurable indicators and document review outcomes, so two months can be compared and training can be shown to have worked.' },
    notes: 'Performance is reviewed every month rather than once a year, and what the review finds decides who gets training. That is genuinely clever — it makes the appraisal do the job of finding the training gap, which is the step most companies skip. And because the cycle is monthly, the next review naturally tests whether the training worked. What was not described was any fixed set of measures or any written record. Sourov will take discipline.',
  },

  /* ===== SOUROV — slides 9 and 10 ======================================== */
  {
    id: 'discipline', by: 'sourov', layout: 'split', stage: 'oven', handover: true, arc: 0.45,
    kicker: 'Discipline & Termination',
    title: 'Grounds for termination',
    lede: 'The grounds are fair and broadly match the Act. The procedure behind them is what is missing.',
    bullets: [
      'Violation of **rules and regulations**',
      '**Sexual harassment**',
      '**Dishonesty** and integrity violations',
      'Other **serious misconduct**',
      'No warning or inquiry procedure was described to us',
    ],
    aside: { kind: 'photo', src: 'stock-gavel-scales-wooden-desk', caption: 'Measured against the Labour Act 2006' },
    note: { tone: 'strength', title: 'Strength', body: 'Clear standards, broadly matching the misconduct list in §23(4). Naming sexual harassment explicitly is uncommon in this trade.' },
    note2: { tone: 'rec', title: 'Recommendation', body: 'Write down the §24 procedure — allegations in writing, at least 7 days to explain, a hearing, a finding on enquiry — and establish the sexual harassment complaint committee, with outside members, that the 2009 High Court directive requires.' },
    notes: 'An employee can be dismissed for violating rules and regulations, for sexual harassment, for dishonesty, and for other serious misconduct. Those grounds are fair, they broadly match the misconduct list in Section twenty-three, and naming sexual harassment explicitly is uncommon in this trade. But no warning or inquiry procedure was described. Section twenty-four requires the allegations in writing, at least seven days to explain, a hearing, and a finding on enquiry. And the 2009 High Court directive requires every workplace to have a harassment complaint committee with outside members. Those two are the most urgent things in our report, and both are close to free.',
  },
  {
    id: 'findings', by: 'sourov', layout: 'wide', stage: 'bake',
    kicker: 'Major Findings',
    title: 'The methods are sound, the records are missing',
    lede: 'Everything points one way — keeping 22 kitchens open. What is missing is the writing down.',
    bullets: [
      'Fixed staffing across **22 outlets**, not adjusted for demand',
      'Office turnover very low, floor turnover medium — but **never counted**',
      '**Two months’** resignation notice, matching the 60 days of §27',
      'One-day hiring with a practical test, but **no marking sheet**',
      '**Monthly** reviews linked to training, with no fixed measures described',
      'Two gaps carry legal weight — **no §24 procedure**, **no harassment committee**',
    ],
    aside: { kind: 'ledger' },
    notes: 'Putting it together. Fixed staffing across twenty-two outlets, not adjusted for demand. Office turnover very low, floor turnover medium, but never counted. Two months notice, matching the sixty days of Section twenty-seven. One-day hiring with a practical test, but no marking sheet. Monthly reviews linked to training, with no fixed measures described. Overall the methods are sound and the records are missing — and two of those gaps carry real legal weight. Esha will take the recommendations.',
  },

  /* ===== ESHA — slides 11, 12 and 13 ===================================== */
  {
    id: 'recommendations', by: 'esha', layout: 'wide', stage: 'out', handover: true,
    kicker: 'Recommendations',
    title: 'What we recommend',
    lede: 'Almost every fix on this list is a form and a decision, not a budget.',
    aside: { kind: 'recs' },
    bullets: [
      'The most urgent item is also **one of the cheapest**',
      'Central records come early because **everything else needs somewhere to live**',
    ],
    notes: 'Three things we would do first, and they are urgent and close to free. Establish the sexual harassment complaint committee with outside members. Write down the Section twenty-four disciplinary procedure and issue it to every outlet manager. And keep one central record per employee. After that: add a scoring sheet to the practical test, use a one-page monthly review form, count turnover monthly and use the sixty-day notice for handover and exit interviews, review each outlet’s headcount twice a year, explain welfare eligibility and open a promotion ladder, and add induction and supervisor training plus a yearly Labour Act check.',
  },
  {
    id: 'conclusion', by: 'esha', layout: 'split', stage: 'slice', arc: 1.4,
    kicker: 'Conclusion',
    title: 'HRM built around operational continuity',
    lede: 'A business the owner watched himself ran on judgement. A thousand workers in ten towns cannot.',
    bullets: [
      'Every practice serves one goal: **keeping 22 outlets open and running**',
      'Fixed staffing creates **consistency**; the notice rule turns a sudden loss into a **planned** one',
      'Practical selection supports **job fit**; monthly reviews catch problems in **weeks, not months**',
      'In every area we asked about, the **method was sound and the paperwork was missing**',
      'The next task is to **write the system down** without losing the speed',
    ],
    aside: { kind: 'photo', src: 'team-street', caption: 'NEXIX, on the way to the interview' },
    notes: 'Our conclusion is that PizzaBurg’s HRM is built around operational continuity. Every practice serves one goal — keeping twenty-two outlets open and running. Fixed staffing creates consistency. The notice rule turns a sudden loss into a planned one. Practical selection supports job fit, and monthly reviews catch problems in weeks rather than months. In every area we asked about, the method was sound and the paperwork was missing. The next task is to write the system down without losing the speed that got them here.',
  },
  {
    id: 'thanks', by: 'esha', layout: 'closing', stage: 'served', fov: 42, arc: 1.3,
    kicker: 'Group NEXIX · Bangladesh University',
    title: 'Thank you',
    titleSub: 'Questions & discussion',
    lede: 'With thanks to Mr. Ranjan Datta, General Manager of Human Resource at PizzaBurg, who answered every question we asked.',
    aside: { kind: 'team' },
    notes: 'Thank you. Our biggest thanks go to Mr. Ranjan Datta, who gave us his time and answered every question we asked, including the difficult ones. Students do not usually get that kind of access. Thanks also to our course teacher, Md. Hassan Talukdar. We are happy to take questions.',
  },
];

/* --- supporting data ------------------------------------------------------ */

const OUTLETS = [
  { city: 'Dhaka', n: 12 }, { city: 'Chattogram', n: 2 }, { city: 'Narayanganj', n: 1 },
  { city: 'Cumilla', n: 1 }, { city: 'Rajshahi', n: 1 }, { city: 'Feni', n: 1 },
  { city: 'Khulna', n: 1 }, { city: 'Mymensingh', n: 1 }, { city: 'Barishal', n: 1 },
  { city: 'Noakhali', n: 1 },
];

const TURNOVER = [
  { grp: 'White-collar', lvl: 'Very low', tone: 'low', body: 'Office staff rarely leave the company.' },
  { grp: 'Blue-collar', lvl: 'Medium', tone: 'med', body: 'Front-line staff turn over more often.' },
];

const WELFARE = [
  { icon: 'roof', name: 'Accommodation', body: 'Housing support for employees who qualify.' },
  { icon: 'bowl', name: 'Food support', body: 'Provided during working hours.' },
  { icon: 'cross', name: 'Health checkups', body: 'Health checkups are provided.' },
  { icon: 'cradle', name: 'Maternity care', body: 'Provided. Full §§45–50 entitlement not described.' },
];

const LOOP = [
  { n: '01', t: 'Monthly review', b: 'Each employee’s performance is assessed.' },
  { n: '02', t: 'Gap identified', b: 'The review shows where improvement is needed.' },
  { n: '03', t: 'Training given', b: 'Training targets the identified gap.' },
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

const LEDGER = [
  { t: 'Described to us', tone: 'yes', items: ['Fixed staffing, 22 outlets', 'One-day hiring with a practical test', 'Two months’ notice', 'Monthly review linked to training', 'Housing, food, health, maternity', 'Four grounds for dismissal'] },
  { t: 'Not evidenced', tone: 'no', items: ['Any review of the fixed numbers', 'A marking sheet for the test', 'A turnover figure, or exit interviews', 'Fixed measures, or a written record', 'Welfare eligibility rules', 'A §24 procedure or harassment committee'] },
];
