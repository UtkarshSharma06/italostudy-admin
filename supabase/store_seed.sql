-- ==========================================
-- ITALOSTUDY STORE — SEED DATA  (UUID-safe)
-- Run this in Supabase SQL Editor
-- ==========================================

-- ── 1. CATEGORIES ──────────────────────────────────────────
INSERT INTO public.store_categories (name, slug, icon, description) VALUES
  ('IMAT',     'imat',     'GraduationCap', 'Resources for the International Medical Admissions Test'),
  ('CENT-S',   'cent-s',   'FlaskConical',  'Resources for the CENT-S Italian medical exam'),
  ('TIL',      'til',      'BookOpen',      'Resources for the Test di Ingresso in Lingua italiana'),
  ('General',  'general',  'Layers',        'General study tools and stationery'),
  ('Bundles',  'bundles',  'Package',       'Value-packed study bundles')
ON CONFLICT (slug) DO NOTHING;


-- ── 2. PRODUCTS ────────────────────────────────────────────

-- IMAT Products
INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT 2025 Complete Biology Guide',
  'imat-2025-complete-biology-guide',
  'A 300-page deep-dive into every Biology topic tested in IMAT. Covers Cell Biology, Genetics, Evolution, Human Physiology, and Ecology. Includes 400+ practice questions with detailed explanations.',
  34.99, 49.99, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'imat'),
  ARRAY['https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-2025-complete-biology-guide');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT 2025 Chemistry Masterclass',
  'imat-2025-chemistry-masterclass',
  'Comprehensive Chemistry covering Organic, Inorganic, and Physical Chemistry for IMAT. Each topic features concise theory followed by IMAT-style practice problems.',
  29.99, 39.99, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'imat'),
  ARRAY['https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-2025-chemistry-masterclass');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT Physics & Math Formula Book',
  'imat-physics-math-formula-book',
  'The ultimate quick-reference formula book for IMAT Physics & Mathematics. All formulas organised by topic with solved examples. Perfect for last-minute revision.',
  14.99, NULL, 'EUR', 'physical',
  (SELECT id FROM public.store_categories WHERE slug = 'imat'),
  ARRAY['https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-physics-math-formula-book');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT Past Papers 2011–2024',
  'imat-past-papers-2011-2024',
  'Complete official IMAT past papers from 2011 to 2024 with full worked solutions. Each paper includes examiner insights and time-management tips.',
  24.99, 34.99, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'imat'),
  ARRAY['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-past-papers-2011-2024');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT Logical Reasoning Workbook',
  'imat-logical-reasoning-workbook',
  '500 original Logical Reasoning questions designed for IMAT. Covers Problem Solving, Critical Thinking, and Data Analysis with step-by-step solutions.',
  19.99, NULL, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'imat'),
  ARRAY['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-logical-reasoning-workbook');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT 2025 Full Preparation Kit (Printed)',
  'imat-2025-full-preparation-kit-printed',
  'Print edition of the Italostudy IMAT preparation kit. Biology, Chemistry, Physics & Math, and Logical Reasoning — shipped worldwide in a boxed set.',
  89.99, 119.99, 'EUR', 'physical',
  (SELECT id FROM public.store_categories WHERE slug = 'imat'),
  ARRAY['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-2025-full-preparation-kit-printed');


-- CENT-S Products
INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'CENT-S 2025 Biology Theory Book',
  'cents-2025-biology-theory-book',
  'In-depth Biology theory for CENT-S, aligned to the official syllabus. Every topic has a 100-word introduction, paragraph explanations, and diagrams.',
  27.99, 39.99, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'cent-s'),
  ARRAY['https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'cents-2025-biology-theory-book');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'CENT-S Italian Language Prep Guide',
  'cents-italian-language-prep-guide',
  'Master Italian comprehension and language sections of CENT-S. Includes grammar rules, reading strategies, and 200 practice questions with annotated answers.',
  22.99, NULL, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'cent-s'),
  ARRAY['https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'cents-italian-language-prep-guide');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'CENT-S 2025 Mock Test Series (5 Tests)',
  'cents-2025-mock-test-series',
  'Five full-length CENT-S simulation exams with official timing. Includes a detailed performance report and worked solutions for every question.',
  34.99, 49.99, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'cent-s'),
  ARRAY['https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'cents-2025-mock-test-series');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'CENT-S Chemistry & Physics Cheatsheets',
  'cents-chemistry-physics-cheatsheets',
  'A4 laminated cheatsheets covering all Chemistry and Physics formulas for CENT-S. Ideal for last-minute revision before exam day.',
  9.99, NULL, 'EUR', 'physical',
  (SELECT id FROM public.store_categories WHERE slug = 'cent-s'),
  ARRAY['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'cents-chemistry-physics-cheatsheets');


-- TIL Products
INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'TIL Italian Proficiency Course',
  'til-italian-proficiency-course',
  'A structured B2–C1 Italian course for the TIL exam. Covers grammar, vocabulary, reading comprehension, and writing tasks aligned to the official TIL format.',
  39.99, 54.99, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'til'),
  ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'til-italian-proficiency-course');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'TIL Practice Question Bank',
  'til-practice-question-bank',
  '600+ TIL-style questions covering all exam sections. Includes audio transcripts for listening exercises and model answers for writing tasks.',
  24.99, NULL, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'til'),
  ARRAY['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'til-practice-question-bank');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'TIL Vocabulary Flashcard Deck',
  'til-vocabulary-flashcard-deck',
  '500 premium laminated flashcards covering Italian vocabulary most tested in TIL. Colour-coded by topic. Perfect for commute study.',
  18.99, 24.99, 'EUR', 'physical',
  (SELECT id FROM public.store_categories WHERE slug = 'til'),
  ARRAY['https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'til-vocabulary-flashcard-deck');


-- General Products
INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'Italostudy 2025 Study Planner & Journal',
  'italostudy-2025-study-planner',
  'The official Italostudy academic planner — weekly and daily layouts, habit trackers, exam countdown, and motivational quotes. 200 pages, premium paper.',
  24.99, NULL, 'EUR', 'physical',
  (SELECT id FROM public.store_categories WHERE slug = 'general'),
  ARRAY['https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'italostudy-2025-study-planner');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'Italostudy Pastel Highlighter Set',
  'italostudy-pastel-highlighter-set',
  'Set of 6 premium pastel highlighters in the Italostudy colour palette. Chisel tip for precise underlining, quick-drying and bleed-resistant.',
  8.99, NULL, 'EUR', 'physical',
  (SELECT id FROM public.store_categories WHERE slug = 'general'),
  ARRAY['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'italostudy-pastel-highlighter-set');


-- Bundle Products
INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'IMAT Ultimate Bundle 2025',
  'imat-ultimate-bundle-2025',
  'Everything you need to ace IMAT: Biology Guide + Chemistry Masterclass + Physics & Math Formula Book + Past Papers (2011–2024) + Logical Reasoning Workbook. Save 40% vs. buying separately.',
  79.99, 139.95, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'bundles'),
  ARRAY['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'imat-ultimate-bundle-2025');

INSERT INTO public.store_products (title, slug, description, price, discount_price, currency, type, category_id, images, is_active)
SELECT
  'CENT-S Complete Study Bundle',
  'cents-complete-study-bundle',
  'Full CENT-S preparation package: Biology Theory Book + Italian Language Prep Guide + Cheatsheets + Mock Test Series. Save 35% vs. buying separately.',
  69.99, 104.96, 'EUR', 'digital',
  (SELECT id FROM public.store_categories WHERE slug = 'bundles'),
  ARRAY['https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600'],
  true
WHERE NOT EXISTS (SELECT 1 FROM public.store_products WHERE slug = 'cents-complete-study-bundle');


-- ── 3. HOME SECTIONS ───────────────────────────────────────
INSERT INTO public.store_home_sections (title, subtitle, category_id, section_type, display_order, is_active)
SELECT 'Best IMAT 2025 Resources', 'Hand-picked for this year''s intake', (SELECT id FROM public.store_categories WHERE slug = 'imat'), 'scroll', 0, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_home_sections WHERE title = 'Best IMAT 2025 Resources');

INSERT INTO public.store_home_sections (title, subtitle, category_id, section_type, display_order, is_active)
SELECT 'CENT-S Preparation', 'Everything you need for the Italian medical exam', (SELECT id FROM public.store_categories WHERE slug = 'cent-s'), 'scroll', 1, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_home_sections WHERE title = 'CENT-S Preparation');

INSERT INTO public.store_home_sections (title, subtitle, category_id, section_type, display_order, is_active)
SELECT 'TIL Language Exam', 'Master Italian to secure your place', (SELECT id FROM public.store_categories WHERE slug = 'til'), 'scroll', 2, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_home_sections WHERE title = 'TIL Language Exam');

INSERT INTO public.store_home_sections (title, subtitle, category_id, section_type, display_order, is_active)
SELECT 'Value Bundles', 'Save big with curated study bundles', (SELECT id FROM public.store_categories WHERE slug = 'bundles'), 'hero_grid', 3, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_home_sections WHERE title = 'Value Bundles');

INSERT INTO public.store_home_sections (title, subtitle, category_id, section_type, display_order, is_active)
SELECT 'General Study Tools', 'Planners, stationery & more', (SELECT id FROM public.store_categories WHERE slug = 'general'), 'grid', 4, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_home_sections WHERE title = 'General Study Tools');


-- ── 4. BANNERS ─────────────────────────────────────────────
INSERT INTO public.store_banners (title, subtitle, image_url, link_url, badge_text, display_order, is_active)
SELECT
  'Start Strong, Score Higher',
  'Premium IMAT & CENT-S resources — crafted by Italostudy experts.',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop',
  '/store/products',
  'NEW 2025',
  0, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_banners WHERE title = 'Start Strong, Score Higher');

INSERT INTO public.store_banners (title, subtitle, image_url, link_url, badge_text, display_order, is_active)
SELECT
  'CENT-S 2025 Prep is Live',
  'Full Biology, Chemistry, Language & Mock Tests — all in one place.',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop',
  '/store/products',
  'JUST LAUNCHED',
  1, true
WHERE NOT EXISTS (SELECT 1 FROM public.store_banners WHERE title = 'CENT-S 2025 Prep is Live');

-- ✅ Done! Go to /store to see your products.
