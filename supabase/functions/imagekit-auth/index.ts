// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"
import { encode } from "https://deno.land/std@0.168.0/encoding/hex.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const privateKey = Deno.env.get('IMAGEKIT_PRIVATE_KEY');
        if (!privateKey) {
            throw new Error('IMAGEKIT_PRIVATE_KEY is not set');
        }

        const token = crypto.randomUUID();
        const expire = Math.floor(Date.now() / 1000) + 1800; // 30 mins
        const signatureRaw = token + expire.toString();

        // Use Web Crypto API to sign the payload with HMAC-SHA1
        const encoder = new TextEncoder();
        const keyData = encoder.encode(privateKey);
        const messageData = encoder.encode(signatureRaw);

        const key = await crypto.subtle.importKey(
            "raw",
            keyData,
            { name: "HMAC", hash: "SHA-1" },
            false,
            ["sign"]
        );

        const signatureArrayBuffer = await crypto.subtle.sign("HMAC", key, messageData);
        const signatureBytes = new Uint8Array(signatureArrayBuffer);

        // Convert to hex
        const signature = Array.from(signatureBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        return new Response(
            JSON.stringify({
                token,
                expire,
                signature
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            },
        )
    }
})
