-- =============================================================================
-- Performance Optimization: Comprehensive Database Indexing
-- Created: 2026-04-22 (v2 — corrected column names)
-- Purpose: Reduce query latency across all high-traffic tables.
-- All columns verified against actual table schemas before indexing.
-- =============================================================================


-- =========================================================
-- 1. PROFILES (hit on every page load by AuthBridge)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role 
    ON public.profiles(role);

CREATE INDEX IF NOT EXISTS idx_profiles_email 
    ON public.profiles(email);

-- Composite: used by usePlanAccess
CREATE INDEX IF NOT EXISTS idx_profiles_role_email 
    ON public.profiles(role, email);


-- =========================================================
-- 2. TESTS (fetched on History, Dashboard, Analytics pages)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_tests_user_id 
    ON public.tests(user_id);

CREATE INDEX IF NOT EXISTS idx_tests_status 
    ON public.tests(status);

CREATE INDEX IF NOT EXISTS idx_tests_created_at 
    ON public.tests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_tests_exam_id 
    ON public.tests(exam_id);

-- Composite: "show this user's completed tests, newest first"
CREATE INDEX IF NOT EXISTS idx_tests_user_status_created 
    ON public.tests(user_id, status, created_at DESC);


-- =========================================================
-- 3. QUESTIONS (fetched for every active test session)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_questions_test_id 
    ON public.questions(test_id);


-- =========================================================
-- 4. TOPIC PERFORMANCE (Analytics page)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_topic_perf_user_id 
    ON public.topic_performance(user_id);

CREATE INDEX IF NOT EXISTS idx_topic_perf_subject 
    ON public.topic_performance(subject);

CREATE INDEX IF NOT EXISTS idx_topic_perf_user_subject 
    ON public.topic_performance(user_id, subject);


-- =========================================================
-- 5. MOCK SESSIONS (actual columns: is_active, exam_type, start_time)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_mock_sessions_is_active 
    ON public.mock_sessions(is_active);

CREATE INDEX IF NOT EXISTS idx_mock_sessions_exam_type 
    ON public.mock_sessions(exam_type);

CREATE INDEX IF NOT EXISTS idx_mock_sessions_start_time 
    ON public.mock_sessions(start_time DESC);


-- =========================================================
-- 6. TRANSACTIONS (already has user_id + created_at indexes from original migration)
--    Adding the missing status index only
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_transactions_status 
    ON public.transactions(status);

-- Composite: "show this user's successful payments, newest first"
CREATE INDEX IF NOT EXISTS idx_transactions_user_status 
    ON public.transactions(user_id, status);


-- =========================================================
-- 7. QA QUESTIONS (already has user_id, exam_type, slug indexes)
--    Adding upvote sort and created_at indexes only
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_qa_questions_upvotes 
    ON public.qa_questions(upvotes DESC);

CREATE INDEX IF NOT EXISTS idx_qa_questions_created_at 
    ON public.qa_questions(created_at DESC);


-- =========================================================
-- 8. SITE HEALTH LOGS (Stability Monitor - admin dashboard)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_site_health_event_type 
    ON public.site_health_logs(event_type);

CREATE INDEX IF NOT EXISTS idx_site_health_severity 
    ON public.site_health_logs(severity);

CREATE INDEX IF NOT EXISTS idx_site_health_url 
    ON public.site_health_logs(url);

CREATE INDEX IF NOT EXISTS idx_site_health_created_at 
    ON public.site_health_logs(created_at DESC);


-- =========================================================
-- 9. URL REDIRECTS (SEO Monitor — source path lookups)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_url_redirects_source_path 
    ON public.url_redirects(source_path);

CREATE INDEX IF NOT EXISTS idx_url_redirects_is_active 
    ON public.url_redirects(is_active);


-- =============================================================================
-- SUMMARY: ~25 targeted indexes across 9 tables.
-- All columns verified against source migration files.
-- =============================================================================
