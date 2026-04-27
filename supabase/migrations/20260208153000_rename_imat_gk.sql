-- Migration: 20260208153000_rename_imat_gk.sql
-- Goal: Rename 'General Knowledge' topic to 'Reading and General Knowledge' for IMAT

DO $$ 
BEGIN
    -- Update practice_questions (Has exam_type directly)
    UPDATE public.practice_questions 
    SET topic = 'Reading and General Knowledge' 
    WHERE topic = 'General Knowledge' AND exam_type = 'imat-prep';

    -- Update session_questions (Linked to mock_sessions table)
    UPDATE public.session_questions sq
    SET topic = 'Reading and General Knowledge' 
    FROM public.mock_sessions s
    WHERE sq.session_id = s.id 
    AND sq.topic = 'General Knowledge' 
    AND s.exam_type = 'imat-prep';

    -- Update questions (Active tests, linked to tests table)
    UPDATE public.questions q
    SET topic = 'Reading and General Knowledge' 
    FROM public.tests t
    WHERE q.test_id = t.id
    AND q.topic = 'General Knowledge' 
    AND t.exam_type = 'imat-prep';
    
    -- Update user_practice_responses (Has exam_type directly)
    UPDATE public.user_practice_responses
    SET topic = 'Reading and General Knowledge'
    WHERE topic = 'General Knowledge' AND exam_type = 'imat-prep';

    -- Update topic_performance (Has exam_type directly)
    UPDATE public.topic_performance
    SET topic = 'Reading and General Knowledge'
    WHERE topic = 'General Knowledge' AND exam_type = 'imat-prep';

END $$;
