-- Synchronize page_content table with the latest approved landing page text.
-- This ensures that the CMS (DB) and the code (fallbacks) are in perfect sync,
-- eliminating the "content flash" and providing a robust baseline for SEO.

INSERT INTO public.page_content (page_slug, field_key, field_value)
VALUES
  -- Hero Section (Global)
  ('landing-global', 'hero_headline', 'Master the IMAT & CEnT-S <br/> <span>Exam 2026</span>'),
  ('landing-global', 'hero_subheadline', 'Everything you need to prepare for CEnT-S & IMAT — practice, analysis, and guidance designed to help you perform at your best.'),
  ('landing-global', 'hero_cta_primary', 'Start FREE'),
  ('landing-global', 'hero_cta_secondary', 'Read the Blog'),

  -- IMAT Marketing (Global)
  ('landing-global', 'imat_marketing_badge', 'Official IMAT 2026 Manual'),
  ('landing-global', 'imat_marketing_title', 'Master the <br/> <span>IMAT Exam</span>'),
  ('landing-global', 'imat_marketing_description', 'Join thousands of students using Europe''s most advanced simulator for the IMAT 2026. Experience high-fidelity testing with detailed diagnostics.'),
  ('landing-global', 'imat_marketing_f1', '2026 Curriculum Aligned Content'),
  ('landing-global', 'imat_marketing_f2', 'Proctored Mock Exam Environment'),
  ('landing-global', 'imat_marketing_f3', 'Global Ranking & Benchmarking'),
  ('landing-global', 'imat_marketing_cta', 'Read the IMAT Guide'),

  -- CEnT-S Marketing (Global)
  ('landing-global', 'cents_marketing_badge', 'Official-style preparation'),
  ('landing-global', 'cents_marketing_title', 'Master the <br/> <span>CEnT-S Exam</span>'),
  ('landing-global', 'cents_marketing_description', 'Prepare with the most realistic CEnT-S simulator available. Built for international students aiming for top medical schools in Italy.'),
  ('landing-global', 'cents_marketing_f1', 'Real exam-style questions & structure'),
  ('landing-global', 'cents_marketing_f2', 'Unlimited mock tests with instant results'),
  ('landing-global', 'cents_marketing_f3', 'Detailed performance stats to track progress'),
  ('landing-global', 'cents_marketing_cta', 'Explore the Ultimate Guide'),

  -- Turkish Regional Seeds (landing-tr)
  ('landing-tr', 'hero_headline', 'IMAT & CEnT-S <br/> <span>2026 Sınavında</span> Uzmanlaşın'),
  ('landing-tr', 'hero_subheadline', 'CEnT-S ve IMAT hazırlığınız için ihtiyacınız olan her şey — en iyi performansınızı göstermeniz için tasarlanmış pratikler, analizler ve rehberlik.'),
  ('landing-tr', 'imat_marketing_title', '<span>IMAT Sınavında</span><br/> Uzmanlaşın'),
  ('landing-tr', 'cents_marketing_title', '<span>CEnT-S Sınavında</span><br/> Uzmanlaşın'),

  -- About CEnT-S Section (Global)
  ('landing-global', 'about_cents_badge', 'Global Authority Cluster'),
  ('landing-global', 'about_cents_title', 'Ultimate Guide to the CENT-S Exam 2026'),
  ('landing-global', 'about_cents_p1', 'Navigating the landscape of medical entrance preparation Europe can be daunting, but for students aiming for Italian public universities, the CENT-S exam 2026 stands as the most critical milestone. Organized by CISIA, the CENT-S (CEnT-S) is the standard entrance qualification for international medical programs taught in English across Italy''s most prestigious institutions, including Sapienza University of Rome and the University of Milan.'),
  ('landing-global', 'about_cents_struct_title', 'Exam Structure & Scoring'),
  ('landing-global', 'about_cents_struct_p1', 'The 2026 session of the CEnT-S follows a rigorous 90-minute format containing 60 multiple-choice questions. Understanding the weight of each section is key to your IMAT practice test strategy:'),
  ('landing-global', 'about_cents_stat_bio_label', 'Biology'),
  ('landing-global', 'about_cents_stat_bio_val', '23 Questions'),
  ('landing-global', 'about_cents_stat_chem_label', 'Chemistry'),
  ('landing-global', 'about_cents_stat_chem_val', '15 Questions'),
  ('landing-global', 'about_cents_stat_phys_label', 'Physics & Math'),
  ('landing-global', 'about_cents_stat_phys_val', '13 Questions'),
  ('landing-global', 'about_cents_stat_logic_label', 'Logic & General Culture'),
  ('landing-global', 'about_cents_stat_logic_val', '9 Questions'),
  ('landing-global', 'about_cents_scoring_note', 'Scoring System: +1 point for correct answers, -0.25 points for incorrect answers, and 0 points for skipped questions.'),
  ('landing-global', 'about_cents_p2', 'At ItaloStudy, we provide a free mock exams suite specifically calibrated to the 2026 difficulty level. Unlike generic resources, our test engine mirrors the exact pressure and cognitive load of the official CISIA environment. Our database of over 10,000 practice questions ensures that no topic—from molecular biology to complex reasoning on texts—is left untouched.'),
  ('landing-global', 'about_cents_p3', 'Preparing for the CENT-S exam 2026 requires more than just memorization; it demands strategic speed and precise accuracy. Our simulator''s internal data shows that the ''Reasoning on Texts and Data'' section remains the primary bottleneck for 85% of candidates. By integrating detailed analytics and adaptive difficulty, we help you master the nuances of the CISIA curriculum before you even walk into the test center.'),
  ('landing-global', 'about_cents_duration', '90 Minutes Duration'),
  ('landing-global', 'about_cents_questions', '60 Multiple Choice Qs'),
  ('landing-global', 'about_cents_strat_title', 'Section-Wise Strategy'),
  ('landing-global', 'about_cents_strat_1', 'Logic: 1.5 mins per question. Focus on pattern recognition.'),
  ('landing-global', 'about_cents_strat_2', 'Biology: 45 seconds per question. Quick recall is key.'),
  ('landing-global', 'about_cents_strat_3', 'Chemistry: 1.2 mins per question. Calculations first.'),
  ('landing-global', 'about_cents_score_title', 'Safe Score Analysis'),
  ('landing-global', 'about_cents_score_desc', 'Historical data for 2024/2025 indicates:'),
  ('landing-global', 'about_cents_score_uni1_label', 'Sapienza/Milan'),
  ('landing-global', 'about_cents_score_uni1_val', '52+ Points'),
  ('landing-global', 'about_cents_score_uni2_label', 'Bologna/Pavia'),
  ('landing-global', 'about_cents_score_uni2_val', '48+ Points'),
  ('landing-global', 'about_cents_score_uni3_label', 'Other Public Unis'),
  ('landing-global', 'about_cents_score_uni3_val', '42+ Points'),
  ('landing-global', 'about_cents_fail_title', 'Why Students Fail the CENT-S Exam'),
  ('landing-global', 'about_cents_fail_p1', 'Statistically, failure on the CENT-S exam 2026 is rarely due to a lack of scientific knowledge. Our analytics from 45,000+ mock attempts show that 68% of lost points come from ''Blind Guessing'' and ''Time Fatigue.'' Students often spend too long on a single logic puzzle, leaving them with less than 30 seconds for critical biology questions at the end of the paper.'),
  ('landing-global', 'about_cents_skip_title', 'The ''Aggressive Skipping'' Method'),
  ('landing-global', 'about_cents_skip_p1', 'Our simulator trains you to identify and skip ''Time Vampire'' questions instantly. In a penalty-based scoring system (-0.25), skipping a question is often more profitable than guessing.'),
  ('landing-global', 'about_cents_comp_title', 'CENT-S vs IMAT: A Difficulty Comparison'),
  ('landing-global', 'about_cents_comp_p1', 'Many candidates ask: Is the CENT-S harder than the IMAT? While the syllabus is nearly identical, the CEnT-S (CISIA) format places a higher emphasis on Reasoning on Texts and Data. The IMAT traditionally featured more complex General Knowledge questions, whereas the 2026 CEnT-S focuses on the application of scientific principles in a time-sensitive environment.'),
  ('landing-global', 'about_cents_cta1', 'Explore the 2026 Syllabus'),
  ('landing-global', 'about_cents_cta2', 'Access Free Study Resources'),

  -- Authority Stats
  ('landing-global', 'authority_badge', 'Proven Track Record'),
  ('landing-global', 'authority_title', 'The Most Trusted Platform for International Med Students'),
  ('landing-global', 'authority_description', 'We don''t just provide questions. We provide the precise cognitive training required to clear the world''s toughest medical entrance exams.'),

  -- Global Challenge
  ('landing-global', 'global_challenge_badge', 'Global Competition'),
  ('landing-global', 'global_challenge_title', 'Are You Ready for the <span>2026 Challenge?</span>'),
  ('landing-global', 'global_challenge_description', 'Join thousands of aspirants in the world''s largest live simulation cluster. Test your logic, science, and timing against real-time global rankings.'),

  -- Why Choose Us
  ('landing-global', 'why_choose_us_badge', 'The ItaloStudy Advantage'),
  ('landing-global', 'why_choose_us_title', 'Why Students Choose <span>Us Over Generic Apps</span>'),
  ('landing-global', 'why_choose_us_description', 'We specialize exclusively in Italian medical admissions. Our algorithms are built on 14 years of official ministerial data, not random guesses.')

ON CONFLICT (page_slug, field_key)
DO UPDATE SET
  field_value = EXCLUDED.field_value,
  updated_at = now();
