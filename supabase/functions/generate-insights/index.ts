// @ts-nocheck
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Deployment Version: 4.0.0 (OpenRouter Architecture)
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const OPENROUTER_API_KEY = Deno.env.get('OPENROUTER_API_KEY');
    const body = await req.json();

    if (!OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({ insights: "AI Insights currently unavailable. Please configure OPENROUTER_API_KEY." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const examName = body.examName || 'ENTRANCE';
    let prompt = "";

    const { subject, score, avgTimePerQuestion, topicPerformance, totalQuestions, timeTaken, timeLimit } = body;

    // Build a summary of topic performance
    const topicSummary = Object.entries(topicPerformance || {})
      .map(([topic, stats]: [string, any]) => {
        const accuracy = Math.round((stats.correct / stats.total) * 100);
        return `- ${topic}: ${accuracy}% (${stats.correct}/${stats.total})`;
      })
      .join('\n');

    prompt = `
      Analyze this ${examName} Session for the subject ${subject}.
      
      Performance Matrix:
      - Overall Score: ${score}%
      - Efficiency: ${Math.round(avgTimePerQuestion)}s per question
      - Volume: ${totalQuestions} questions attempted
      - Time Usage: ${Math.round(timeTaken / 60)}m used out of ${Math.round(timeLimit / 60)}m limit
      
      Topic-Wise Accuracy:
      ${topicSummary || 'General assessment'}
      
      Provide a highly structured, professional study plan in 4 short sections:
      1. 🚀 **Strategic Overview**: 1-2 sentence assessment of their current level.
      2. 🎯 **Priority Focus**: Identify the specific topics or behaviors (like speed) that need immediate work.
      3. 📋 **Strategic Guidance**: Advice on how to approach this subject differently (e.g., focus on concepts vs. speed).
      4. 📅 **Action Plan**: 2 specific, actionable steps to take before the next session.
      
      Keep the total length under 200 words. Use Markdown for bolding and structure. Use a motivating, data-driven "Elite Academic Coach" tone.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-lite-preview:free",
        messages: [
          {
            role: "system",
            content: "You are an elite academic coach for medical and competitive entrance exams. Your advice is precise, data-backed, and highly structured. You speak with authority and motivation."
          },
          { role: "user", content: prompt }
        ],
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      throw new Error(errorData.error?.message || `OpenRouter returned ${response.status}`);
    }

    const data = await response.json();
    const insights = data.choices?.[0]?.message?.content || "No insights generated.";
    return new Response(JSON.stringify({ insights }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error("Insights Function Error:", error);
    return new Response(JSON.stringify({
      error: error.message,
      insights: `⚠️ Connection Issue: ${error.message?.includes('OPENROUTER_API_KEY') ? 'AI key missing' : 'The AI is currently busy.'} Please try again in a moment.`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
