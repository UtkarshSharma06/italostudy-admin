import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!SUPABASE_URL || !SUPABASE_KEY || !REDIS_URL || !REDIS_TOKEN) {
    console.error('[API Init] Missing environment variables:', {
        hasSupabaseUrl: !!SUPABASE_URL,
        hasSupabaseKey: !!SUPABASE_KEY,
        hasRedisUrl: !!REDIS_URL,
        hasRedisToken: !!REDIS_TOKEN
    });
}

const redis = new Redis({
    url: REDIS_URL!,
    token: REDIS_TOKEN!,
});

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

const CACHE_KEY = 'reviews:published';
const TTL_SECONDS = 300; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS headers so the Vite SPA can call this
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');

    try {
        // 1. Try Redis cache first (~5ms, Frankfurt)
        const cached = await redis.get(CACHE_KEY);
        if (cached) {
            return res.status(200).json({ data: cached, source: 'cache' });
        }

        // 2. Cache miss → fetch from Supabase SEA
        const { data, error } = await supabase
            .from('site_reviews')
            .select('id,user_name,user_avatar,rating,content,date_string')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // 3. Store in Redis for next requests
        await redis.set(CACHE_KEY, data, { ex: TTL_SECONDS });

        return res.status(200).json({ data, source: 'db' });
    } catch (err: any) {
        console.error('[api/reviews] error:', err);
        return res.status(500).json({ error: err.message });
    }
}
