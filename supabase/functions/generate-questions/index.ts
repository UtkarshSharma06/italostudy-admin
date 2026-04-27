// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Deployment Version: 8.0.0 (Exam-Centric Architecture)
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');

    if (req.method === 'GET') {
      return new Response(JSON.stringify({
        version: "8.0.0",
        mode: "Exam-Centric",
        capabilities: ["mcq", "svg-diagrams", "syllabus-strict", "IMAT-aware", "CENT-S-aware"]
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const body = await req.json();
    const { exam, subject, count, difficulty, topic, topics } = body;

    const freeModels = [
      "google/gemini-2.0-flash-exp:free",
      "google/gemini-flash-1.5-exp:free",
      "mistralai/mistral-7b-instruct:free",
    ];

    const systemPrompt = `You are a professional senior exam designer for ${exam || 'CENT-S'} Entrance Exam.
CRITICAL: You MUST strictly adhere to the official ${exam || 'CENT-S'} syllabus for ${subject}.
AI must NEVER generate questions outside the specified syllabus.

Diversity Rules:
1. Conceptual (theoretical understanding)
2. Application (applying a concept to a scenario)
3. Analytical (comparing two entities or processes)
4. Diagram-based (SVG format for complex visual explanations) - include 1 diagram if possible.

Difficulty: ${difficulty || 'medium'}. 
Marking Scheme Knowledge: 
- IMAT: +1.5 for correct, -0.4 for wrong.
- CENT-S: +1 for correct, -0.25 for wrong.
Return ONLY clean JSON. No markdown.`;

    const topicContext = topics
      ? `specific sub-topics: ${Array.isArray(topics) ? topics.join(', ') : topics}`
      : `topic: ${topic || subject}`;
    const userPrompt = `Generate exactly ${count || 3} UNIQUE, VARIED, and EXAM-GRADE multiple-choice questions for the following ${topicContext} under the subject ${subject}. 
Ensure the questions are challenging and representative of the real ${exam} exam.
Format: { "questions": [ { "question": "...", "options": ["A","B","C","D","E"], "correctIndex": 0, "explanation": "Detailed professional explanation...", "difficulty": "${difficulty}", "topic": "${topic || subject}", "diagram": "SVG_CODE_OR_NULL" } ] }
NOTE: Use 5 options (A-E) for all questions.`;

    let lastError = "Start";

    for (const model of freeModels) {
      try {
        console.log(`[V7.0.0] Attempting Diversity with: ${model}`);
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
              { role: "user", content: userPrompt }
            ],
            temperature: 0.7, // Higher temp = more variety/creativity
            top_p: 0.9
          })
        });

        const rawText = await response.text();
        if (!response.ok) {
          lastError = `API ${response.status}: ${rawText.slice(0, 50)}`;
          continue;
        }

        const data = JSON.parse(rawText);
        let content = data.choices?.[0]?.message?.content;
        if (!content) continue;

        // Sanitization Layer (from V6.3.0)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        let jsonStr = jsonMatch ? jsonMatch[0] : content;
        jsonStr = jsonStr.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ");
        jsonStr = jsonStr.replace(/\\(?!["\\/bfnrtu])/g, "");

        try {
          const validated = JSON.parse(jsonStr);
          if (validated.questions && validated.questions.length > 0) {
            return new Response(JSON.stringify(validated), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
          }
        } catch (e) {
          lastError = `JSON Wash Error: ${e.message}`;
        }
      } catch (e) {
        lastError = `Runtime: ${e.message}`;
      }
    }

    throw new Error(`Failed to generate unique questions. (Details: ${lastError})`);

  } catch (error) {
    return new Response(JSON.stringify({
      error: "AI_GENERATION_ERROR",
      message: error.message
    }), { status: 200, headers: corsHeaders });
  }
});
