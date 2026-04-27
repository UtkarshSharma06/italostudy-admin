// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { email, userName, rating } = await req.json();

        if (!RESEND_API_KEY) {
            console.warn("RESEND_API_KEY not found. Skipping email send.");
            return new Response(JSON.stringify({ success: true, message: "Email skipped (no API key)" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            });
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "Italostudy <feedback@italostudy.com>",
                to: [email],
                subject: "Thank you for your feedback! 🌟",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #4f46e5;">Hi ${userName || 'there'},</h2>
                        <p style="font-size: 16px; color: #374151;">Thank you so much for sharing your feedback with us! and for giving us a rating of <strong>${rating}/5</strong>.</p>
                        <p style="font-size: 16px; color: #374151;">Your insights help us build a better learning platform for students worldwide. Our team will review your suggestions and work on making the platform even better.</p>
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #6b7280; font-size: 12px;">
                            Best regards,<br>
                            <strong>The Italostudy Team</strong>
                        </div>
                    </div>
                `
            })
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: res.status
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400
        });
    }
});
