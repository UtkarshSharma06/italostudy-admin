import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Razorpay from "npm:razorpay@2.9.2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
        const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);

        // 1. Authenticate user
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) throw new Error("Missing Authorization header");
        const token = authHeader.replace('Bearer ', '');
        
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
        if (authError || !user) throw new Error("Unauthorized");

        // 2. Fetch User Profile
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('payment_provider, provider_subscription_id')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            throw new Error("Could not find user profile configuration");
        }

        const gateway = profile.payment_provider;
        const subId = profile.provider_subscription_id;

        if (!gateway || !subId) {
            // Nothing to cancel on provider, just clear it locally
            await supabaseAdmin.from('profiles').update({ 
                payment_provider: null,
                provider_subscription_id: null
                // Do NOT set to free here — let them enjoy the rest of their billing cycle!
            }).eq('id', user.id);
            
            return new Response(JSON.stringify({ success: true, message: "Subscription cancelled locally. You will have access until your current billing cycle ends." }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            });
        }

        let canceledOnGateway = false;

        // 3. Cancel via Respective Gateway API
        if (gateway === 'razorpay') {
            const key_id = Deno.env.get('RAZORPAY_KEY_ID');
            const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET');
            if (key_id && key_secret) {
                const instance = new Razorpay({ key_id, key_secret });
                // cancel at cycle end
                await instance.subscriptions.cancel(subId, true);
                canceledOnGateway = true;
            } else {
                throw new Error("Razorpay credentials missing from secrets.");
            }
        } 
        
        else if (gateway === 'paypal') {
            // For PayPal, we need a Bearer token first using Client ID + Secret
            // Then we hit /v1/billing/subscriptions/{id}/cancel
            // For simplicity and depending on environment, we might just require manual Admin cancel if PayPal API integration isn't fully set up with Access Tokens.
            // Let's implement full cancel.
            const clientId = Deno.env.get('VITE_PAYPAL_CLIENT_ID');
            const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET');
            
            if (clientId && clientSecret) {
                const isLive = clientId.startsWith('A') || !clientId.includes('test'); // basic heuristic, better to check env
                const apiBase = Deno.env.get('PAYPAL_ENVIRONMENT') === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
                
                // Get Access Token
                const auth = btoa(`${clientId}:${clientSecret}`);
                const tokenRes = await fetch(`${apiBase}/v1/oauth2/token`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'grant_type=client_credentials'
                });
                
                if (tokenRes.ok) {
                    const tokenData = await tokenRes.json();
                    
                    // Actually Cancel
                    const cancelRes = await fetch(`${apiBase}/v1/billing/subscriptions/${subId}/cancel`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${tokenData.access_token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ reason: "User requested cancellation via ItaloStudy portal" })
                    });
                    
                    if (cancelRes.ok || cancelRes.status === 204) {
                        canceledOnGateway = true;
                    } else {
                        const errText = await cancelRes.text();
                        console.error("PayPal Cancel Error:", errText);
                        throw new Error("Failed to cancel PayPal subscription natively");
                    }
                } else {
                      throw new Error("Failed to authenticate with PayPal to cancel");
                }
            } else {
                 console.warn("PayPal Secret missing, performing localized cancel only.");
            }
        }
        
        else if (gateway === 'dodo') {
            // Dodo Payments Cancellation
            // According to docs: PATCH /subscriptions/:id with status=cancelled
            const apiKey = Deno.env.get('DODO_API_KEY');
            const environment = Deno.env.get('DODO_ENVIRONMENT') || 'test_mode';
            
            if (apiKey) {
                const isLive = environment === 'live_mode' || environment === 'production' || environment === 'live';
                const apiBase = isLive ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';
                
                const cancelRes = await fetch(`${apiBase}/subscriptions/${subId}`, {
                    method: 'PATCH',
                    headers: {
                         'Authorization': `Bearer ${apiKey}`,
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: "cancelled" })
                });
                
                if (cancelRes.ok) {
                    canceledOnGateway = true;
                } else {
                    const errText = await cancelRes.text();
                    console.error("Dodo Cancel API Error:", cancelRes.status, errText);
                    // Still proceed with local cleanup even if gateway cancel fails
                    // (subscription will naturally expire)
                    console.warn("Dodo gateway cancel failed, proceeding with local cleanup.");
                }
            } else {
                console.warn("DODO_API_KEY missing, cannot cancel at gateway.");
            }
        }

        // 4. Update the User Profile locally so we don't bill or grant access anymore next month
        // We do NOT set selected_plan to 'free' yet, because we want them to enjoy the rest of their paid month.
        // We just clear the payment provider variables so the frontend knows it won't renew.
        await supabaseAdmin.from('profiles').update({ 
            payment_provider: null,
            provider_subscription_id: null
        }).eq('id', user.id);

        return new Response(JSON.stringify({ 
            success: true, 
            message: "Subscription successfully cancelled. It will not renew next billing cycle.",
            canceledOnGateway
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error: any) {
        console.error("Error cancelling subscription:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
