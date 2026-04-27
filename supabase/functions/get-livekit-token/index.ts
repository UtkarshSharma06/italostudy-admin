import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { AccessToken } from "npm:livekit-server-sdk"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const body = await req.json()
        const { roomName, participantName } = body

        // 1. Validate inputs before sanitization — prevent DoS with huge strings
        if (!roomName || !participantName) {
            return new Response(
                JSON.stringify({ error: 'Missing roomName or participantName' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        if (typeof roomName !== 'string' || roomName.length > 200) {
            return new Response(
                JSON.stringify({ error: 'Invalid roomName: must be a string under 200 characters' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        if (typeof participantName !== 'string' || participantName.length > 200) {
            return new Response(
                JSON.stringify({ error: 'Invalid participantName: must be a string under 200 characters' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 2. Sanitize Inputs
        // LiveKit identities and room names must be alphanumeric/dashes/underscores
        const safeRoom = roomName.replace(/[^a-zA-Z0-9_\-]/g, '_')
        const safeIdentity = participantName.replace(/[^a-zA-Z0-9_\- ]/g, '_').trim()

        // 3. Load Secrets
        const apiKey = Deno.env.get('LIVEKIT_API_KEY')?.replace(/\s/g, '')
        const apiSecret = Deno.env.get('LIVEKIT_API_SECRET')?.replace(/\s/g, '')

        if (!apiKey || !apiSecret) {
            console.error('[Error] LIVEKIT_API_KEY or LIVEKIT_API_SECRET is missing')
            return new Response(
                JSON.stringify({ error: 'LiveKit server configuration missing on server' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 4. Create Token with Explicit Grants
        const at = new AccessToken(apiKey, apiSecret, {
            identity: safeIdentity,
        })

        at.addGrant({
            roomJoin: true,
            room: safeRoom,
            canPublish: true,
            canSubscribe: true,
            canPublishData: true,
        })

        const token = await at.toJwt()

        // Last sanity check on the token
        if (typeof token !== 'string' || token.length < 50) {
            throw new Error('Token generation produced an invalid result')
        }

        return new Response(
            JSON.stringify({ token }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error: any) {
        console.error('[Fatal Error] LiveKit function failed:', error)
        return new Response(
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})

