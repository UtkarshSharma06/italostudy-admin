// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        if (!RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is not set");
        }

        const payload = await req.json();
        console.log("Sending email via Resend:", payload.subject);

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: payload.from || "ItaloStudy Support <contact@italostudy.com>",
                to: payload.to,
                subject: payload.subject,
                html: payload.html,
                cc: payload.cc,
                bcc: payload.bcc,
                reply_to: payload.reply_to || "contact@italostudy.com",
                attachments: payload.attachments,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Resend API error:", data);
            return new Response(JSON.stringify(data), {
                status: response.status,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error in send-email function:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
