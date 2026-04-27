// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ONESIGNAL_APP_ID = Deno.env.get("ONESIGNAL_APP_ID");
const ONESIGNAL_REST_API_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req: Request) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        })
    }

    try {
        console.log("=== PUSH NOTIFICATION START ===");
        console.log("OneSignal App ID present:", !!ONESIGNAL_APP_ID);
        console.log("OneSignal Key present:", !!ONESIGNAL_REST_API_KEY);

        if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
            throw new Error("Missing OneSignal configuration secrets in Supabase Dashboard.");
        }

        let payloadJson;
        try {
            payloadJson = await req.json();
        } catch (e) {
            console.error("Failed to parse request JSON:", e.message);
            throw new Error("Invalid or empty JSON body provided.");
        }
        
        console.log("Incoming Push Request KEYS:", Object.keys(payloadJson));

        let { title, body, topic, community_id, sender_id, image_url, content_type, data: extraData, message: rawMessage, html_content, telegram_message } = payloadJson;

        // Normalize fallbacks
        title = title?.trim() || "New Announcement";
        // Prefer explicit telegram_message > html_content (rich text) > rawMessage > body (short desc)
        const mainContent = telegram_message?.trim() || html_content?.trim() || rawMessage?.trim() || body?.trim() || "Check the app for details";
        // Keep body for OneSignal as it expects the short version usually
        body = body?.trim() || mainContent;

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");

        let payload = {
            app_id: ONESIGNAL_APP_ID,
            headings: { en: title },
            contents: { en: body },
            data: {
                url: "/dashboard",
                ...extraData
            }
        };

        if (image_url) {
            payload.big_picture = image_url;
            payload.ios_attachments = { "id1": image_url };
        }

        let targetUserIds: string[] = [];
        
        if (extraData?.target_user_id) {
            targetUserIds = Array.isArray(extraData.target_user_id) 
                ? extraData.target_user_id 
                : [extraData.target_user_id];
        }

        // 1. Handle Community Chat (Targeted by external_user_ids)
        if (community_id) {
            const { data: members, error: memberError } = await supabase
                .from('community_members')
                .select('user_id')
                .eq('community_id', community_id)
                .eq('status', 'approved');

            if (memberError) throw memberError;

            targetUserIds = members.map(m => m.user_id);
            if (sender_id) {
                targetUserIds = targetUserIds.filter(id => id !== sender_id);
            }

            if (targetUserIds.length === 0) {
                return new Response(JSON.stringify({ success: true, message: "No target users" }), { headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
            }

            // Use include_aliases for v5 API
            payload.include_aliases = {
                external_id: targetUserIds
            };
        }
        // 2. Handle Promotional / Topic based (Targeted by Segments or Tags)
        else if (topic) {
            if (topic === 'all_users') {
                payload.included_segments = ["Subscribed Users"];
            } else {
                // Target users using tags set in App.tsx
                payload.filters = [
                    { field: "tag", key: "selected_exam", relation: "=", value: topic }
                ];
            }
        }
        else if (targetUserIds.length > 0) {
            payload.include_aliases = {
                external_id: targetUserIds
            };
        }

        // TELEGRAM BROADCAST LOGIC
        if (TELEGRAM_BOT_TOKEN) {
            try {
                let telegramChatIds: any[] = [];

                if (community_id && targetUserIds.length > 0) {
                    const { data: profiles } = await supabase
                        .from('profiles')
                        .select('telegram_chat_id, subscription_expiry_date, selected_plan, subscription_tier')
                        .not('telegram_chat_id', 'is', null)
                        .in('id', targetUserIds);

                    telegramChatIds = (profiles || []).filter(p => {
                        const isGlobal = p.selected_plan?.toLowerCase() === 'global' ||
                            p.selected_plan?.toLowerCase() === 'elite' ||
                            p.subscription_tier?.toLowerCase() === 'global';
                        const isExpired = p.subscription_expiry_date ? new Date(p.subscription_expiry_date) < new Date() : false;
                        return isGlobal && !isExpired;
                    });
                } else if (extraData?.target_user_id) {
                    // DIRECT TARGETING (e.g. for downgrades)
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('telegram_chat_id')
                        .eq('id', extraData.target_user_id)
                        .single();

                    if (profile?.telegram_chat_id) {
                        telegramChatIds.push({ telegram_chat_id: profile.telegram_chat_id });
                    }
                } else if (topic) {
                    let query = supabase
                        .from('profiles')
                        .select('telegram_chat_id, subscription_expiry_date, selected_plan, subscription_tier')
                        .not('telegram_chat_id', 'is', null);

                    if (topic !== 'all_users') {
                        query = query.eq('selected_exam', topic);
                    }

                    const { data: profiles } = await query;

                    telegramChatIds = (profiles || []).filter(p => {
                        const isGlobal = p.selected_plan?.toLowerCase() === 'global' ||
                            p.selected_plan?.toLowerCase() === 'elite' ||
                            p.subscription_tier?.toLowerCase() === 'global';
                        const isExpired = p.subscription_expiry_date ? new Date(p.subscription_expiry_date) < new Date() : false;
                        return isGlobal && !isExpired;
                    });
                }

                if (telegramChatIds.length > 0) {
                    // Helper to sanitize HTML for Telegram
                    // We need to escape <, >, & to avoid parse errors if we use HTML mode
                    // BUT if the user is sending HTML, we might want to preserve some tags?
                    // For now, let's strip HTML tags to be safe and send as plain text with minimal formatting
                    const stripHtml = (html: string) => {
                        return html.replace(/<[^>]*>?/gm, '');
                    };

                    const safeTitle = stripHtml(title);
                    const safeBody = stripHtml(mainContent);

                    // Construct message
                    const message = `🔔 <b>${safeTitle}</b>\n\n${safeBody}`;

                    const endpoint = image_url ? 'sendPhoto' : 'sendMessage';
                    const botUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/${endpoint}`;

                    console.log(`Sending to ${telegramChatIds.length} Telegram users via ${endpoint}...`);

                    // Parallel await telegram messages with result tracking
                    const results = await Promise.all(telegramChatIds.map(async (u) => {
                        try {
                            const payload: any = {
                                chat_id: u.telegram_chat_id,
                                parse_mode: "HTML" // Try HTML first
                            };

                            if (image_url) {
                                payload.photo = image_url;
                                payload.caption = message;
                            } else {
                                payload.text = message;
                            }

                            // Attempt 1: HTML Mode
                            let resp = await fetch(botUrl, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(payload)
                            });

                            let result = await resp.json();

                            // Attempt 2: Fallback to Plain Text if HTML fails (error 400)
                            if (!resp.ok && result.error_code === 400) {
                                console.warn(`Telegram HTML parse failed for ${u.telegram_chat_id}, retrying as plain text...`);

                                // Strip tags AND decode entities for plain text
                                const plainTextBody = mainContent.replace(/<[^>]*>?/gm, '');
                                const plainMessage = `🔔 ${title}\n\n${plainTextBody}`;

                                delete payload.parse_mode; // No parse mode = plain text
                                if (image_url) {
                                    payload.caption = plainMessage;
                                } else {
                                    payload.text = plainMessage;
                                }

                                resp = await fetch(botUrl, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(payload)
                                });
                                result = await resp.json();
                            }

                            if (!resp.ok) {
                                console.error(`Telegram API Error for ${u.telegram_chat_id}:`, JSON.stringify(result));
                            }
                            return { id: u.telegram_chat_id, success: resp.ok, result };
                        } catch (e) {
                            console.error(`Telegram fetch failed for ${u.telegram_chat_id}:`, e);
                            return { id: u.telegram_chat_id, success: false, error: e.message };
                        }
                    }));

                    const successful = results.filter(r => r.success).length;
                    console.log(`Telegram broadcast results: ${successful}/${telegramChatIds.length} succeeded.`);
                }
            } catch (tError) {
                console.error("Telegram broadcast logic failed:", tError);
            }
        }

        // Call OneSignal API
        console.log("Submitting to OneSignal...");
        const response = await fetch("https://onesignal.com/api/v1/notifications", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${ONESIGNAL_REST_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("OneSignal Result:", JSON.stringify(result));

        if (response.status !== 200) {
            console.error("OneSignal Error Status:", response.status);
            return new Response(JSON.stringify({ error: "OneSignal API Error", details: result }), { status: 400, headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' } });
        }

        return new Response(JSON.stringify({ success: true, result }), {
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }
        });

    } catch (error: any) {
        console.error("send-push error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' }
        });
    }
});
