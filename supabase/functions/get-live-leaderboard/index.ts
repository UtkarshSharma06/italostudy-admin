// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { session_id } = await req.json();

        if (!session_id) {
            throw new Error('session_id is required');
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { global: { headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}` } } }
        );

        // 1. Get Exam Type
        const { data: session, error: sessionError } = await supabaseClient
            .from('mock_sessions')
            .select('exam_type')
            .eq('id', session_id)
            .single();

        if (sessionError || !session) {
            throw new Error('Session not found');
        }

        let leaderboard = [];

        if (session.exam_type === 'ielts-academic') {
            // IELTS Logic - Get all and deduplicate
            const { data, error } = await supabaseClient
                .from('mock_exam_submissions')
                .select(`
                    user_id,
                    overall_band,
                    completed_at,
                    profiles:user_id ( display_name, avatar_url )
                `)
                .eq('session_id', session_id)
                .order('overall_band', { ascending: false, nullsFirst: false })
                .order('completed_at', { ascending: true })
                .limit(200); // Higher limit to allow for deduplication

            if (error) throw error;

            const bestAttempts = new Map();
            (data || []).forEach((item) => {
                if (!bestAttempts.has(item.user_id)) {
                    bestAttempts.set(item.user_id, item);
                }
            });

            leaderboard = Array.from(bestAttempts.values()).slice(0, 50).map((item: any) => ({
                user_id: item.user_id,
                display_name: item.profiles?.display_name || 'Anonymous',
                avatar_url: item.profiles?.avatar_url,
                score: item.overall_band || 0,
                accuracy: ((item.overall_band || 0) / 9) * 100, // Normalized for progress bar if needed
            }));

        } else {
            // Standard Exams (CENT, etc.) - Get all and deduplicate
            const { data, error } = await supabaseClient
                .from('tests')
                .select(`
                    user_id,
                    score,
                    correct_answers,
                    wrong_answers,
                    skipped_answers,
                    total_questions,
                    time_taken_seconds,
                    profiles:user_id ( display_name, avatar_url )
                `)
                .eq('session_id', session_id)
                .neq('status', 'abandoned')
                .order('score', { ascending: false, nullsFirst: false })
                .order('time_taken_seconds', { ascending: true })
                .limit(200);

            if (error) throw error;

            const bestAttempts = new Map();
            (data || []).forEach((item) => {
                if (!bestAttempts.has(item.user_id)) {
                    bestAttempts.set(item.user_id, item);
                }
            });

            leaderboard = Array.from(bestAttempts.values()).slice(0, 50).map((item: any) => ({
                user_id: item.user_id,
                display_name: item.profiles?.display_name || 'Anonymous',
                avatar_url: item.profiles?.avatar_url,
                score: item.score || 0, // This is percentage
                accuracy: item.score || 0,
                correct_answers: item.correct_answers || 0,
                wrong_answers: item.wrong_answers || 0,
                skipped_answers: item.skipped_answers || 0,
                total_questions: item.total_questions || 0
            }));
        }

        return new Response(JSON.stringify(leaderboard), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
