import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Use service role key so RLS is bypassed — read-only sitemap generation
const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const BASE_URL = 'https://italostudy.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow GET
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
            auth: { persistSession: false }
        });

        // Fetch all questions — select only the columns needed for sitemap
        const { data: questions, error } = await supabase
            .from('qa_questions')
            .select('slug, updated_at, created_at, exam_type, upvotes')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[sitemap-qa] Supabase error:', error.message);
            return res.status(500).send('Error generating sitemap');
        }

        const now = new Date().toISOString().split('T')[0];
        const items = questions || [];

        // Calculate priority based on upvotes
        const getPriority = (upvotes: number): string => {
            if (upvotes >= 20) return '0.9';
            if (upvotes >= 10) return '0.8';
            if (upvotes >= 5)  return '0.7';
            return '0.6';
        };

        // Calculate changefreq based on age
        const getChangefreq = (createdAt: string): string => {
            const ageMs = Date.now() - new Date(createdAt).getTime();
            const ageDays = ageMs / (1000 * 60 * 60 * 24);
            if (ageDays < 7)  return 'daily';
            if (ageDays < 30) return 'weekly';
            return 'monthly';
        };

        const urlEntries = items
            .map((q) => {
                const lastmod = (q.updated_at || q.created_at || now).split('T')[0];
                const priority = getPriority(q.upvotes || 0);
                const changefreq = getChangefreq(q.created_at || now);
                return `  <url>
    <loc>${BASE_URL}/answers/${encodeURIComponent(q.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
            })
            .join('\n');

        // Hub page entry  
        const hubEntry = `  <url>
    <loc>${BASE_URL}/answers</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${hubEntry}
${urlEntries}
</urlset>`;

        // Cache for 1 hour at CDN level, stale-while-revalidate for 24h
        // Google re-crawls sitemaps every few days — 1h cache is perfectly fresh
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
        res.setHeader('X-Sitemap-Count', String(items.length));

        console.log(`[sitemap-qa] Generated sitemap with ${items.length} questions`);
        return res.status(200).send(xml);

    } catch (err: any) {
        console.error('[sitemap-qa] Unexpected error:', err);
        return res.status(500).send('Internal Server Error');
    }
}
