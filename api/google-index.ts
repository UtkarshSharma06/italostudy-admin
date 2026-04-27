import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { url, type = 'URL_UPDATED' } = req.body;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid "url" in request body' });
        }

        // Expected format:
        // GOOGLE_SERVICE_ACCOUNT_KEY = {
        //   "type": "service_account",
        //   "project_id": "YOUR_PROJECT_ID",
        //   ...
        // }
        const keyString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
        if (!keyString) {
            console.error('[google-index] Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment constraints.');
            // We return 200 so the Supabase webhook doesn't repeatedly retry failing on unconfigured env
            return res.status(200).json({
                warning: 'GOOGLE_SERVICE_ACCOUNT_KEY not configured. Webhook fired but indexing skipped.'
            });
        }

        let credentials;
        try {
            credentials = JSON.parse(keyString);
        } catch (err: any) {
            console.error('[google-index] Error parsing JSON key:', err.message);
            return res.status(500).json({ error: 'Invalid Google Service Account Key JSON format' });
        }

        // 1. Authenticate using Service Account credentials
        const auth = new GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        // 2. Obtain an authenticated client
        const client = await auth.getClient();

        // 3. Prepare payload for the Indexing API
        const endpoint = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
        const payload = {
            url: url,          // Requires absolute URL e.g. https://italostudy.com/answers/my-slug
            type: type,        // 'URL_UPDATED' or 'URL_DELETED'
        };

        // 4. Fire the publish request
        const indexingResponse = await client.request({
            url: endpoint,
            method: 'POST',
            data: payload,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(`[google-index] Successfully requested indexing for: ${url}`);
        return res.status(200).json({
            success: true,
            message: `Indexing request submitted for ${url}`,
            data: indexingResponse.data,
        });

    } catch (err: any) {
        console.error('[google-index] API error:', err.message || err);
        return res.status(500).json({ error: 'Internal server error while processing Indexing request.' });
    }
}
