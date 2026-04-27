// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
        const body = await req.json().catch(() => ({}));
        const { prompt, essay, taskType } = body;

        console.log(`Starting evaluation for ${taskType || 'Writing'}. Essay length: ${essay?.length}`);

        if (!OPENROUTER_API_KEY) {
            throw new Error("Missing OPENROUTER_API_KEY in server environment.");
        }

        if (!essay || essay.length < 5) {
            throw new Error("The essay content is empty or too short.");
        }

        const systemPrompt = `
            You are an expert IELTS examiner. Evaluate the student's essay based on the provided task prompt.
            Return a JSON object with: 
            overall_score (0-9.0), 
            task_achievement_score (0-9.0), 
            coherence_score (0-9.0), 
            lexical_score (0-9.0), 
            grammar_score (0-9.0), 
            and feedback_text (Markdown format analysis with bullet points for mistakes).
        `;

        const models = [
            "google/gemini-2.0-flash-exp:free",
            "google/gemini-flash-1.5-exp:free",
            "meta-llama/llama-3.1-8b-instruct:free",
            "openrouter/auto"
        ];

        let lastError = "";
        for (const model of models) {
            try {
                console.log(`Attempting with: ${model}`);
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${OPENROUTER_API_KEY.trim()}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: `Task Prompt: ${prompt}\n\nStudent Essay: ${essay}` }
                        ]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const aiContent = data.choices?.[0]?.message?.content;
                    if (aiContent) {
                        const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
                        const cleanJson = jsonMatch ? jsonMatch[0] : aiContent;
                        const result = JSON.parse(cleanJson);

                        console.log(`SUCCESS: Evaluation complete using ${model}`);
                        return new Response(JSON.stringify({
                            overall_score: Number(result.overall_score) || 0,
                            task_achievement_score: Number(result.task_achievement_score || result.task_response_score || 0),
                            coherence_score: Number(result.coherence_score || 0),
                            lexical_score: Number(result.lexical_score || 0),
                            grammar_score: Number(result.grammar_score || 0),
                            feedback_text: result.feedback_text || "Detailed feedback generation complete."
                        }), {
                            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                        });
                    }
                } else {
                    const errBody = await response.json().catch(() => ({}));
                    lastError = errBody.error?.message || response.statusText;
                    console.error(`Model ${model} failed: ${lastError}`);
                }
            } catch (e) {
                lastError = e.message;
                console.error(`Fetch error for ${model}: ${lastError}`);
            }
        }

        throw new Error(`AI Evaluation failed after multiple attempts. Last error: ${lastError}`);

    } catch (error) {
        console.error("CRITICAL EDGE FUNCTION ERROR:", error.message);
        return new Response(JSON.stringify({
            error: error.message,
            details: "Check Supabase side logs for CRITICAL EDGE FUNCTION ERROR"
        }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
