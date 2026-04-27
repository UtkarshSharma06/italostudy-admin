// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Deployment Version: 6.1.0 (Failover Reliability Mode)
serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
        const body = await req.json();
        const { question, context } = body;

        if (!OPENROUTER_API_KEY) {
            return new Response(JSON.stringify({ response: "Tutor offline (Key missing)." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const models = [
            "google/gemini-2.0-flash-exp:free",
            "google/gemini-flash-1.5-exp:free",
            "mistralai/mistral-7b-instruct:free"
        ];

        let lastError = "";
        for (const model of models) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${OPENROUTER_API_KEY.trim()}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: "system", content: `You are an AI tutor for ${context?.subject || 'exams'}.` },
                            { role: "user", content: question }
                        ]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const content = data.choices?.[0]?.message?.content;
                    if (content) {
                        return new Response(JSON.stringify({ response: content }), {
                            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                        });
                    }
                } else {
                    const err = await response.json();
                    lastError = err.error?.message || response.statusText;
                }
            } catch (e) {
                lastError = e.message;
            }
        }

        return new Response(JSON.stringify({ response: `Tutor is busy right now. (Error: ${lastError})` }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ response: `Runtime Error: ${error.message}` }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
