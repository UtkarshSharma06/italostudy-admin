-- Migration to seed landing page and CENT-S cluster content for CMS
-- Date: 2026-02-28

-- Helper function to insert or update page content
CREATE OR REPLACE FUNCTION upsert_page_content(
  p_slug TEXT,
  p_key TEXT,
  p_value TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO page_content (page_slug, field_key, field_value)
  VALUES (p_slug, p_key, p_value)
  ON CONFLICT (page_slug, field_key)
  DO UPDATE SET field_value = EXCLUDED.field_value, updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- 1. Global Landing Page Content (landing-global)
SELECT upsert_page_content('landing-global', 'seo_title', 'ItaloStudy | Free Prep for CEnT-S, IMAT, SAT & IELTS, Simplified');
SELECT upsert_page_content('landing-global', 'seo_description', 'Experience the world''s most advanced study simulator for IMAT, SAT, CEnT-S and IELTS preparation. Europe''s choice for admissions success.');
SELECT upsert_page_content('landing-global', 'seo_keywords', 'italostudy, IMAT preparation, CEnT-S exam guide, European admissions, global study prep, free mock exams');

-- FAQ Schema Content
SELECT upsert_page_content('landing-global', 'faq_q1', 'What is the CENT-S 2026 exam?');
SELECT upsert_page_content('landing-global', 'faq_a1', 'The CEnT-S 2026 is the official entrance exam for International Medical Programs taught in English at Italian public universities. It is managed by CISIA.');
SELECT upsert_page_content('landing-global', 'faq_q2', 'How is the CENT-S 2026 score calculated?');
SELECT upsert_page_content('landing-global', 'faq_a2', 'Scoring follows the standard CISIA model: +1 for correct, -0.25 for incorrect, and 0 for skipped questions. Total duration is 90 minutes for 60 questions.');
SELECT upsert_page_content('landing-global', 'faq_q3', 'What is a safe score for CENT-S 2026?');
SELECT upsert_page_content('landing-global', 'faq_a3', 'Based on previous year data, a safe competitive score for top-tier universities ranges between 45 and 55 points.');

-- SEO Hub Titles
SELECT upsert_page_content('landing-global', 'seo_hub_title', 'The Authority Hub: Ultimate Guides 2026');
SELECT upsert_page_content('landing-global', 'seo_hub_description', 'Expert-curated resources designed to navigate the complexities of European medical school admissions.');
SELECT upsert_page_content('landing-global', 'cents_hub_title', 'CENT-S 2026 Master Hub');
SELECT upsert_page_content('landing-global', 'imat_hub_title', 'IMAT 2026 Authority Pillar');

-- Active Users Reveal
SELECT upsert_page_content('landing-global', 'reveal_title', 'Question Bank Size');
SELECT upsert_page_content('landing-global', 'reveal_hint', 'Move to Reveal');
SELECT upsert_page_content('landing-global', 'reveal_bank_size', '045000');
SELECT upsert_page_content('landing-global', 'reveal_footer', 'Verified Questions');

-- Exam Countdown
SELECT upsert_page_content('landing-global', 'exam_countdown_date', '2026-04-15T09:00:00');
SELECT upsert_page_content('landing-global', 'exam_countdown_label', 'Session 1 Countdown');

-- Global Challenge (Quiz)
SELECT upsert_page_content('landing-global', 'global_challenge_badge', 'CISIA 2026 READY');
SELECT upsert_page_content('landing-global', 'global_challenge_title', 'Global Authority League');
SELECT upsert_page_content('landing-global', 'global_challenge_description', 'Test your intuition against the 2026 CISIA difficulty curve. Can you break the 50-point barrier?');

-- Quiz Q1
SELECT upsert_page_content('landing-global', 'quiz_q1_subject', 'Biology');
SELECT upsert_page_content('landing-global', 'quiz_q1_question', 'Which cellular organelle is responsible for the synthesis of ATP through oxidative phosphorylation?');
SELECT upsert_page_content('landing-global', 'quiz_q1_opt0', 'Golgi Apparatus');
SELECT upsert_page_content('landing-global', 'quiz_q1_opt1', 'Mitochondria');
SELECT upsert_page_content('landing-global', 'quiz_q1_opt2', 'Endoplasmic Reticulum');
SELECT upsert_page_content('landing-global', 'quiz_q1_opt3', 'Lysosome');
SELECT upsert_page_content('landing-global', 'quiz_q1_correct', '1');

-- 2. Italy Regional Landing Page (landing-it)
SELECT upsert_page_content('landing-it', 'seo_title', 'ItaloStudy | Preparazione Gratuita IMAT - Test Simulati Illimitati');
SELECT upsert_page_content('landing-it', 'seo_description', 'Piattaforma gratuita per la preparazione IMAT, SAT, CEnT-S e IELTS. Test simulati illimitati e supporto per le ammissioni universitarie in Italia.');
SELECT upsert_page_content('landing-it', 'seo_keywords', 'preparazione IMAT gratis, medicina Italia, test ammissione università, simulatore IMAT');

-- 3. Turkey Regional Landing Page (landing-tr)
SELECT upsert_page_content('landing-tr', 'seo_title', 'ItaloStudy | Ücretsiz IMAT ve CEnT-S Hazırlık Platformu');
SELECT upsert_page_content('landing-tr', 'seo_description', 'İtalya''da tıp eğitimi için IMAT ve CEnT-S sınavlarına ücretsiz hazırlanın. Sınırsız deneme sınavları ve uzman danışmanlık desteği.');
SELECT upsert_page_content('landing-tr', 'seo_keywords', 'İtalya tıp eğitimi, IMAT hazırlık, CEnT-S sınavı, yurt dışı eğitim danışmanlığı');

-- Drop helper function
DROP FUNCTION upsert_page_content(TEXT, TEXT, TEXT);
