import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // 1. Get slug from URL
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).send('Slug is required');
  }

  // 2. Initialize Supabase
  const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://jyjhpqtqbwtxxgijxetq.supabase.co';
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_LZduUlJ96GYtgyo0l-iTzw_P-8Glk_v';
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // 3. Fetch Post Data
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*, blog_categories(name)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      console.error('Post not found:', slug, error);
      return res.status(404).send('Post not found');
    }

    // 4. Load Template
    const templatePath = path.join(process.cwd(), 'blog-slug-template.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    // 5. Prepare Data
    const title = post.title || 'Untitled Post';
    const excerpt = post.excerpt || '';
    const featuredImage = post.featured_image || 'https://italostudy.com/logo.png';
    const postUrl = `https://italostudy.com/blog/${slug}`;
    const categoryName = post.blog_categories?.name || 'Education';
    const publishDate = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Process content (mirrors BlogPost.tsx logic)
    const isCustomHtml = typeof post.content === 'object' && post.content !== null && post.content.is_custom_html === true;
    const recursiveUnwrap = (val) => {
        if (!val) return '';
        if (typeof val === 'object') {
            return val.body ? recursiveUnwrap(val.body) : JSON.stringify(val);
        }
        if (typeof val === 'string') {
            try {
                const trimmed = val.trim();
                // Avoid un-JSONing pure HTML strings that aren't JSON
                if (trimmed.startsWith('{') && trimmed.includes('"body"')) {
                    const parsed = JSON.parse(val);
                    return recursiveUnwrap(parsed);
                }
            } catch { }
            return val;
        }
        return String(val);
    };
    const body = recursiveUnwrap(post.content);
    const processedContent = body.includes('<') ? body : body.replace(/\n/g, '<br />');

    let faqSchemaStr = '';
    if (post.faq_schema && post.faq_schema.length > 0) {
        const schemaObj = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faq_schema.filter(f => f.question && f.answer).map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        faqSchemaStr = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;
    }

    const readTime = Math.max(1, Math.ceil(processedContent.split(/\s+/).length / 225));

    // 6. Injection Logic
    const replacements = {
      '{{META_TITLE}}': post.seo_title || `${title} | ItaloStudy Blog`,
      '{{META_DESCRIPTION}}': post.meta_description || excerpt,
      '{{META_IMAGE}}': featuredImage,
      '{{POST_URL}}': postUrl,
      '{{CANONICAL_URL}}': postUrl,
      '{{TITLE}}': title,
      '{{CONTENT}}': processedContent,
      '{{CATEGORY_NAME}}': categoryName,
      '{{READ_TIME}}': readTime,
      '{{PUBLISHED_DATE}}': publishDate,
      '{{AUTHOR_NAME}}': 'ItaloStudy Team',
      '{{FEATURED_IMAGE}}': featuredImage,
      '{{FAQ_SCHEMA}}': faqSchemaStr
    };

    // Replace all placeholders
    Object.keys(replacements).forEach(key => {
      html = html.split(key).join(replacements[key]);
    });

    // Handle the conditional featured image block manually since it's not a real template engine
    if (!post.featured_image) {
        html = html.replace(/{{#if FEATURED_IMAGE}}[\s\S]*?{{\/if}}/, '');
    } else {
        html = html.replace('{{#if FEATURED_IMAGE}}', '').replace('{{/if}}', '');
    }

    // Handle conditional CUSTOM_HTML_MODE logic manually 
    if (isCustomHtml) {
        html = html.replace(/{{#if CUSTOM_HTML_MODE}}([\s\S]*?){{else}}[\s\S]*?{{\/if}}/, '$1');
    } else {
        html = html.replace(/{{#if CUSTOM_HTML_MODE}}[\s\S]*?{{else}}([\s\S]*?){{\/if}}/, '$1');
    }

    // 7. Send Response
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).send(html);

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).send('Internal Server Error');
  }
}
