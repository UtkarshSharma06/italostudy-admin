-- IMAT Authority Cluster Seed Data – Part 2/2
-- Pages: imat-registration-process, imat-preparation-strategy, imat-vs-cents

INSERT INTO public.page_content (page_slug, field_key, field_value) VALUES

-- ═══════════════════════════════════════════════
-- PAGE: imat-registration-process
-- ═══════════════════════════════════════════════

('imat-registration-process', 'hero_headline', 'IMAT Registration Guide 2026: The Step-by-Step Authority Manual'),
('imat-registration-process', 'hero_desc', 'The Italian medical school registration process is notoriously complex, involving multiple portals, strict payment windows, and specific legal requirements. Our 1800-word authority guide simplifies every step to ensure your seat is secured for 2026.'),

('imat-registration-process', 'section_universitaly_title', 'Step 1: The Universitaly Portal Initialization'),
('imat-registration-process', 'section_universitaly_body', 'The registration journey begins on the Universitaly.it portal, the official gateway for all international students in Italy. 
1. **Account Setup**: You must create an account using your legal name exactly as it appears on your passport. Errors here can cause major verification issues at the test center.
2. **Choice of Program**: You must select "Medicina e Chirurgia" (Medicine and Surgery) and choose between the Italian-taught or English-taught (IMAT) options.
3. **Primary Choice Strategy**: You are allowed to list multiple university preferences. However, your *first-choice* university is the only one that determines your test center location (if testing in Italy) and is your primary competitor in the Non-EU ranking.
**Technical Tip**: Save your registration number (Codice Fiscale is often generated during this step) as you will need it for all future correspondence with the MUR.'),

('imat-registration-process', 'section_payment_title', 'Step 2: Exam Fee Payment & Global Center Lock'),
('imat-registration-process', 'section_payment_body', 'During the July 2026 registration window, you must pay the exam fee. 
- **Fees**: Historically, this has been around €130 for candidates in Italy and approx. £114 / $164 for those testing abroad.
- **Payment Gateway**: Payment is handled typically via the "PagoPA" system for Italian centers or international credit card gateways for foreign centers. 
- **The Seat Lock**: Test centers in major hubs like London, Dubai, and Istanbul are extremely high-demand. Paying early in the window is critical. Your registration is NOT complete until the payment status on Universitaly changes to "Confirmed".
- **Refund Policy**: Note that the IMAT registration fee is strictly non-refundable under any circumstances, even if your visa is rejected later.'),

('imat-registration-process', 'section_docs_title', 'Step 3: Document Checklist for 2026 Applicants'),
('imat-registration-process', 'section_docs_body', 'While you don''t upload everything during the initial registration, you must have these ready for the enrollment phase immediately after the exam:
1. **Passport/ID**: Valid for at least 15 months beyond your arrival date.
2. **CIMEA Statement of Comparability**: The fastest way to legalize your high school diploma for 2026.
3. **Language Certificate**: B2 English certificate (IELTS 6.0+, TOEFL 72+, or Cambridge B2 First). Check our MOI database for exemptions.
4. **Pre-enrollment Summary**: Downloaded from Universitaly — this is your "entry ticket" for the consulate.'),

('imat-registration-process', 'section_errors_title', 'Common Mistakes & How to Fix Them'),
('imat-registration-process', 'section_errors_body', '1. **Name Mismatch**: If your name on Universitaly differs from your passport by even one letter, you may be barred from the test center. Contact the university support immediately if this happens.
2. **Missing the June Decree**: The registration window is often only 15–21 days long. Follow our Telegram notifications to get alerted the second the window opens.
3. **Non-EU Residency**: If you are a Non-EU student currently living in Italy on a stay permit, you fall under the EU quota. Do not register as a Non-EU student, or your score will be invalidated.'),

-- ═══════════════════════════════════════════════
-- PAGE: imat-preparation-strategy
-- ═══════════════════════════════════════════════

('imat-preparation-strategy', 'hero_headline', 'IMAT 2026 Preparation Strategy: Data-Backed Roadmaps'),
('imat-preparation-strategy', 'hero_desc', 'Scoring in the top 5% of the IMAT isn''t about the number of hours you study, but how you manage the 100-minute performance window. This 2000-word strategic manual covers everything from 6-month timelines to the psychology of the -0.4 penalty.'),

('imat-preparation-strategy', 'section_roadmap_title', '1. The 6-Month "Elite" Study Plan'),
('imat-preparation-strategy', 'section_roadmap_body', 'For a competitive 2026 application, we recommend starting no later than April 2026.
- **Phase 1: Concept Foundation (Months 1-2)**: Focus purely on understanding cell biology, organic chemistry mechanisms, and dynamics in physics. Do not worry about speed yet.
- **Phase 2: Tactical Drilling (Months 3-4)**: Solve past papers from 2011–2025. Group your mistakes into "Concept Error" (I didn''t know the fact) or "Execution Error" (I misread the question).
- **Phase 3: The Simulation Phase (Months 5-6)**: One full-length, timed mock exam every Saturday morning. Replicate the 100-minute block without interruptions or calculators.'),

('imat-preparation-strategy', 'section_logic_title', '2. Mastering the Critical Thinking Logic'),
('imat-preparation-strategy', 'section_logic_body', 'The IMAT Logic section (often called Problem Solving and Data Analysis) is where many high-performing science students lose points. 
- **TSA Alignment**: The IMAT Logic questions are derived from the Cambridge Thinking Skills Assessment (TSA). Practice using Oxford/Cambridge TSA Section 1 past papers.
- **Critical Thinking**: Learn to identify "Main Conclusions", "Underlying Assumptions", and "Flaws in Reasoning". These are standardized question types that appear with 90% frequency.
- **Data Interpretation**: Practice reading graphs and complex tables quickly. The difficulty here isn''t the math, it''s the extraction of data under time pressure.'),

('imat-preparation-strategy', 'section_blank_title', '3. Tactical Guessing & The -0.4 Penalty'),
('imat-preparation-strategy', 'section_blank_body', 'In the IMAT, every wrong answer costs you 0.4 points. This makes "Blind Guessing" statistically harmful.
**The Golden Guard Strategy**:
- If you can confidently eliminate 2 out of 5 options: The probability of scoring (+1.5 - 0.4 - 0.4) is positive. In this case, you SHOULD guess.
- If you have no idea: LEAVE IT BLANK. A 0 score is significantly better than a cumulative -0.4 which can drop you hundreds of ranks in the final list.
- **Data Point**: In previous cycles, the difference between admission at a top university and rejection was often as low as 0.5 points.'),

('imat-preparation-strategy', 'section_resources_title', '4. Recommended Resources for 2026'),
('imat-preparation-strategy', 'section_resources_body', '- **Biology**: *Campbell Biology* (Biology Global Edition). This is the "gold standard" for the IMAT scientific curriculum.
- **Chemistry**: *Pearson Chemistry* or *IB Chemistry* textbooks.
- **Physics**: *Giancoli Physics for Scientists and Engineers*.
- **ItaloStudy Simulator**: Our AI-driven platform tracks your weak areas across 10,000+ past IMAT/CENT-S questions to personalize your revision.'),

-- ═══════════════════════════════════════════════
-- PAGE: imat-vs-cents
-- ═══════════════════════════════════════════════

('imat-vs-cents', 'hero_headline', 'IMAT vs. CENT-S: Choosing the Right Medical Exam for 2026'),
('imat-vs-cents', 'hero_desc', 'With the introduction of the CEnT-S (Centro Nazionale Test per lo Studio), international applicants often find themselves confused. Which exam should you take? Which universities accept which score? This 1600-word authority comparison clarifies the landscape.'),

('imat-vs-cents', 'section_comparison_title', '1. Defining the Exams: Historical Context'),
('imat-vs-cents', 'section_comparison_body', 'The **IMAT** (International Medical Admissions Test) is the established standard for English-taught Medicine at major public universities (Milan, Bologna, Rome, Naples). It is administered by MUR (Italian Ministry of Research).
The **CENT-S** is a newer examination format increasingly used by specific regional universities and for different degree categories. As of 2026, many students find themselves preparing for both due to the 90% syllabus overlap. 
**Key Difference**: The IMAT tends to be more "internationalist" in its logic questions, whereas the CENT-S focuses more on the direct application of scientific knowledge taught in the Italian "Liceo Scientifico" curriculum.'),

('imat-vs-cents', 'section_syllabus_comparison_title', '2. Syllabus Overlap & Critical Differences'),
('imat-vs-cents', 'section_syllabus_comparison_body', 'Biology and Chemistry are almost identical across both exams. However, the weighting differs:
- **IMAT**: Heavily weights Biology and Critical Thinking Logic. Physics and Maths are smaller but vital rank enhancers.
- **CENT-S**: Tends to have a more distributed weighting across the four pillars of science. You may find more "Pure Physics" questions in CENT-S than in a typical IMAT paper.
**2026 Strategy**: If you prepare for the IMAT, you are effectively 95% prepared for the CENT-S. The only difference is the "feel" of the question formatting and the time management required per section.'),

('imat-vs-cents', 'section_choices_title', '3. University Acceptance (Direct Impact)'),
('imat-vs-cents', 'section_choices_body', 'This is the most critical factor. 
- **IMAT Universities**: Milan Statale, Milan Bicocca, Bologna, Padova, Pavia, Turin, Rome La Sapienza, Rome Tor Vergata, Naples Federico II, Naples Campania Vanvitelli, Messina, Bari, Catania, Ancona.
- **CENT-S/TOLC Universities**: Check the regional bandos for regional public universities and private institutions migrating to the national center structure.
**Recommendation**: Always base your choice on the university you want to attend first, then look at which exam they require. Do not choose an exam because you think it is "easier".'),

('imat-vs-cents', 'section_dual_sitting_title', '4. The Dual Sitting Strategy for 2026'),
('imat-vs-cents', 'section_dual_sitting_body', 'Since the IMAT and CENT-S are typically held on different dates, many high-achieving international students sit BOTH.
- **Benefit**: It provides a "Plan B" if your first-choice IMAT score is lower than expected.
- **Risk**: Preparing for two different exam formats in the final month can lead to burnout. 
- **The ItaloStudy Approach**: Our simulation platform allows you to toggle between IMAT and CENT-S modes to practice the specific pacing of each exam style without changing your core scientific study material.')

ON CONFLICT (page_slug, field_key) DO UPDATE SET field_value = EXCLUDED.field_value;
