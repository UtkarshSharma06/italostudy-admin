// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req: Request) => {
    try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

        // 1. Find users who have expired but are still on a premium tier
        const now = new Date().toISOString();
        const { data: expiredUsers, error: fetchError } = await supabase
            .from('profiles')
            .select('id, telegram_chat_id, selected_plan, subscription_tier')
            .lt('subscription_expiry_date', now)
            .neq('subscription_tier', 'initiate') // Only target those not yet downgraded
            .not('subscription_expiry_date', 'is', null);

        if (fetchError) throw fetchError;

        console.log(`Found ${expiredUsers?.length || 0} expired users to process.`);

        const results = {
            processed: 0,
            notifications_sent: 0,
            downgraded: 0,
            errors: []
        };

        if (expiredUsers && expiredUsers.length > 0) {
            for (const user of expiredUsers) {
                try {
                    // A. Send Notification (fire and forget to not block downgrade)
                    // We use our own send-push function for consistency
                    const { error: pushError } = await supabase.functions.invoke('send-push', {
                        body: {
                            title: "Plan Expired 🔔",
                            body: "Your subscription has expired. You have been switched to the Explorer plan. Renew now to regain access!",
                            data: { target_user_id: user.id }
                        }
                    });

                    if (!pushError) results.notifications_sent++;
                    else console.error(`Failed to notify user ${user.id}:`, pushError);

                    // B. Downgrade User
                    const { error: updateError } = await supabase
                        .from('profiles')
                        .update({
                            selected_plan: 'explorer',
                            subscription_tier: 'initiate',
                            // We keep the expiry date as is (in the past) to serve as a record, or we could null/reset it.
                            // Keeping it allows us to see WHEN it expired.
                        })
                        .eq('id', user.id);

                    if (updateError) throw updateError;
                    results.downgraded++;

                } catch (err) {
                    console.error(`Error processing user ${user.id}:`, err);
                    results.errors.push({ userId: user.id, error: err.message });
                }
                results.processed++;
            }
        }

        return new Response(JSON.stringify({ success: true, results }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("check-expiry error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
});
