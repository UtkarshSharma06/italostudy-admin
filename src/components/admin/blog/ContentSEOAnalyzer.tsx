import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
    FileText,
    Hash,
    Timer,
    AlertCircle,
    CheckCircle2,
    ShieldCheck,
    ListTree,
    Link2,
    Image as ImageIcon,
    BookOpen,
    TrendingUp,
    Lightbulb,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface ContentSEOAnalyzerProps {
    formData: any;
    setFormData: (data: any) => void;
}

interface ContentAnalysis {
    wordCount: number;
    readTime: number;
    h1Count: number;
    h2Count: number;
    h3Count: number;
    keywordDensity: number;
    internalLinks: number;
    externalLinks: number;
    imagesWithoutAlt: number;
    totalImages: number;
    avgSentenceLength: number;
    longParagraphs: number;
    keywordInFirstParagraph: boolean;
    issues: string[];
    passes: string[];
    seoScore: number;
}

type LSIMap = Record<string, string[]>;

const LSI_SUGGESTIONS: LSIMap = {
    'imat': ['medical school Italy', 'BMAT preparation', 'Humanitas university', 'university entrance exam', 'medicine degree Italy', 'Italian medical school', 'IMAT past papers'],
    'cents': ['CEnT-S preparation', 'Italian university entrance', 'TOLC exam', 'engineering Italy', 'architecture Italy', 'science degree Italy'],
    'ielts': ['English language test', 'study abroad', 'band score', 'academic IELTS', 'general IELTS', 'British Council', 'language proficiency'],
    'sat': ['college admission', 'SAT prep', 'ACT alternative', 'Ivy League', 'university admission USA', 'standardized test'],
    'study': ['exam preparation', 'study tips', 'learning strategy', 'academic success', 'student life', 'university admission'],
    'italy': ['study in Italy', 'Italian university', 'life in Italy', 'Italian culture', 'visa Italy', 'scholarship Italy', 'Erasmus'],
    'tolc': ['CISIA exam', 'Italian engineering exam', 'university selection Italy', 'TOLC-I', 'TOLC-E', 'TOLC-F'],
    'scholarship': ['financial aid', 'tuition fee', 'DSU scholarship', 'merit-based scholarship', 'ISEE', 'study grant Italy']
};

function getSEOScore(analysis: Omit<ContentAnalysis, 'seoScore'>): number {
    let score = 0;
    const max = 100;

    // Word count (25 pts)
    if (analysis.wordCount >= 1500) score += 25;
    else if (analysis.wordCount >= 800) score += 18;
    else if (analysis.wordCount >= 400) score += 10;

    // H1 (15 pts)
    if (analysis.h1Count === 1) score += 15;

    // H2s (10 pts)
    if (analysis.h2Count >= 3) score += 10;
    else if (analysis.h2Count >= 1) score += 5;

    // Keyword density (15 pts)
    if (analysis.keywordDensity >= 0.5 && analysis.keywordDensity <= 2.0) score += 15;
    else if (analysis.keywordDensity > 0 && analysis.keywordDensity <= 2.5) score += 8;

    // Keyword in first paragraph (10 pts)
    if (analysis.keywordInFirstParagraph) score += 10;

    // Links (10 pts)
    if (analysis.internalLinks >= 2) score += 5;
    else if (analysis.internalLinks >= 1) score += 2;
    if (analysis.externalLinks >= 2) score += 5;
    else if (analysis.externalLinks >= 1) score += 2;

    // Images with ALT (10 pts)
    if (analysis.totalImages === 0 || analysis.imagesWithoutAlt === 0) score += 10;
    else if (analysis.imagesWithoutAlt <= 1) score += 5;

    // Readability (5 pts)
    if (analysis.avgSentenceLength <= 20) score += 5;
    else if (analysis.avgSentenceLength <= 25) score += 3;

    return Math.min(score, max);
}

function getLSISuggestions(keyword: string): string[] {
    if (!keyword) return [];
    const lower = keyword.toLowerCase();
    for (const key of Object.keys(LSI_SUGGESTIONS)) {
        if (lower.includes(key)) return LSI_SUGGESTIONS[key];
    }
    return ['synonyms of your keyword', 'related exam names', 'topic variations', 'subtopics', 'location-specific terms'];
}

function getScoreColor(score: number) {
    if (score >= 80) return { stroke: 'stroke-emerald-500', text: 'text-emerald-400', label: 'Excellent' };
    if (score >= 60) return { stroke: 'stroke-amber-400', text: 'text-amber-400', label: 'Good' };
    if (score >= 40) return { stroke: 'stroke-orange-400', text: 'text-orange-400', label: 'Needs Work' };
    return { stroke: 'stroke-rose-500', text: 'text-rose-400', label: 'Poor' };
}

export default function ContentSEOAnalyzer({ formData, setFormData }: ContentSEOAnalyzerProps) {
    const [analysis, setAnalysis] = useState<ContentAnalysis>({
        wordCount: 0,
        readTime: 0,
        h1Count: 0,
        h2Count: 0,
        h3Count: 0,
        keywordDensity: 0,
        internalLinks: 0,
        externalLinks: 0,
        imagesWithoutAlt: 0,
        totalImages: 0,
        avgSentenceLength: 0,
        longParagraphs: 0,
        keywordInFirstParagraph: false,
        issues: [],
        passes: [],
        seoScore: 0
    });

    const analyzeContent = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const text = doc.body.innerText || '';
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        const wordCount = words.length;

        const h1s = doc.querySelectorAll('h1').length;
        const h2s = doc.querySelectorAll('h2').length;
        const h3s = doc.querySelectorAll('h3').length;

        // Links
        const allLinks = doc.querySelectorAll('a[href]');
        let internalLinks = 0;
        let externalLinks = 0;
        allLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('/') || href.includes('italostudy')) internalLinks++;
            else if (href.startsWith('http')) externalLinks++;
        });

        // Images
        const imgs = doc.querySelectorAll('img');
        let imagesWithoutAlt = 0;
        imgs.forEach(img => {
            const alt = img.getAttribute('alt');
            if (!alt || alt.trim() === '') imagesWithoutAlt++;
        });

        // Keyword checks
        const keyword = formData.focus_keyword || '';
        const keywordCount = keyword
            ? (text.match(new RegExp(keyword, 'gi')) || []).length
            : 0;
        const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

        // Keyword in first paragraph
        const firstPara = doc.querySelector('p');
        const firstParaText = firstPara?.innerText || firstPara?.textContent || '';
        const keywordInFirstParagraph = keyword
            ? firstParaText.toLowerCase().includes(keyword.toLowerCase())
            : false;

        // Sentence length (readability)
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const avgSentenceLength = sentences.length > 0
            ? Math.round(wordCount / sentences.length)
            : 0;

        // Long paragraphs
        const paragraphs = doc.querySelectorAll('p');
        let longParagraphs = 0;
        paragraphs.forEach(p => {
            const pWords = (p.textContent || '').trim().split(/\s+/).length;
            if (pWords > 120) longParagraphs++;
        });

        // Build issues and passes
        const issues: string[] = [];
        const passes: string[] = [];

        if (h1s === 0) issues.push('Missing H1 heading — required for SEO');
        else if (h1s > 1) issues.push('Multiple H1s found — keep exactly 1');
        else passes.push('H1 heading present ✓');

        if (h2s === 0) issues.push('No H2 headings — add sections for structure');
        else if (h2s >= 3) passes.push(`${h2s} H2 sections found ✓`);

        if (wordCount < 800) issues.push(`Only ${wordCount} words — aim for 1,000+ for competitive topics`);
        else if (wordCount >= 1500) passes.push(`${wordCount} words — excellent length ✓`);
        else passes.push(`${wordCount} words — good, 1,500+ is ideal`);

        if (keyword && keywordDensity > 2.5) issues.push('Keyword density too high (>2.5%) — avoid stuffing');
        else if (keyword && keywordDensity < 0.4) issues.push('Keyword density too low — mention it more naturally');
        else if (keyword && keywordDensity >= 0.5) passes.push('Keyword density in optimal range ✓');

        if (keyword && !keywordInFirstParagraph) issues.push('Keyword missing from first paragraph — strong ranking signal');
        else if (keyword && keywordInFirstParagraph) passes.push('Keyword in first paragraph ✓');

        if (internalLinks === 0) issues.push('No internal links — link to other pages on site');
        else passes.push(`${internalLinks} internal link(s) ✓`);

        if (externalLinks === 0) issues.push('No external links — cite 1-2 authoritative sources');
        else passes.push(`${externalLinks} external link(s) ✓`);

        if (imagesWithoutAlt > 0) issues.push(`${imagesWithoutAlt} image(s) missing alt text — required for SEO`);
        else if (imgs.length > 0) passes.push('All images have alt text ✓');

        if (longParagraphs > 2) issues.push(`${longParagraphs} long paragraphs — break them up for readability`);
        else passes.push('Paragraph lengths are fine ✓');

        if (avgSentenceLength > 25) issues.push(`Avg sentence: ${avgSentenceLength} words — aim for under 20`);

        const raw = {
            wordCount,
            readTime: Math.ceil(wordCount / 230),
            h1Count: h1s,
            h2Count: h2s,
            h3Count: h3s,
            keywordDensity,
            internalLinks,
            externalLinks,
            imagesWithoutAlt,
            totalImages: imgs.length,
            avgSentenceLength,
            longParagraphs,
            keywordInFirstParagraph,
            issues,
            passes
        };

        setAnalysis({ ...raw, seoScore: getSEOScore(raw) });
    };

    useEffect(() => {
        analyzeContent(formData.content);
    }, [formData.content, formData.focus_keyword]);

    const scoreColors = getScoreColor(analysis.seoScore);
    const circumference = 2 * Math.PI * 28;
    const offset = circumference - (analysis.seoScore / 100) * circumference;
    const lsiTerms = getLSISuggestions(formData.focus_keyword || '');

    return (
        <div className="grid lg:grid-cols-12 gap-8">
            {/* Editor Side */}
            <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Main Content Editor</Label>
                        <div className="flex gap-4">
                            <span className="text-[10px] font-black text-slate-400 flex items-center gap-1.5">
                                <FileText className="w-3 h-3" /> {analysis.wordCount} words
                            </span>
                            <span className="text-[10px] font-black text-slate-400 flex items-center gap-1.5">
                                <Timer className="w-3 h-3" /> {analysis.readTime} min read
                            </span>
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
                        {formData.is_custom_html ? (
                            <div className="relative bg-[#1e1e1e] flex flex-col h-[700px]">
                                <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#252526]">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Raw Code HTML</span>
                                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors">
                                        Upload .html File
                                        <input 
                                            type="file" 
                                            accept=".html" 
                                            className="hidden" 
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (evt) => setFormData({ ...formData, content: evt.target?.result as string });
                                                    reader.readAsText(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="flex-1 w-full bg-transparent text-emerald-400 font-mono text-sm p-6 resize-none focus:outline-none focus:border-none"
                                    placeholder="<!-- Paste your custom HTML here... -->"
                                    spellCheck={false}
                                />
                            </div>
                        ) : (
                            <Editor
                                apiKey="tmv2dp3b1x6h8p2mcuucu51vh0g9kdkoa6xd6fh5cdnz66lh"
                                value={formData.content}
                                onEditorChange={(content) => setFormData({ ...formData, content })}
                                init={{
                                    height: 700,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                                        'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | link image | table code',
                                    content_style: `
                                        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
                                        body { 
                                            font-family: 'Plus Jakarta Sans', sans-serif; 
                                            font-size: 16px; 
                                            line-height: 1.6; 
                                            color: #1e293b;
                                            padding: 40px;
                                            max-width: 800px;
                                            margin: 0 auto;
                                        }
                                        h1 { font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 2rem; }
                                        h2 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin-top: 2rem; margin-bottom: 1rem; }
                                        h3 { font-size: 1.25rem; font-weight: 800; color: #0f172a; }
                                        p { margin-bottom: 1.5rem; }
                                        img { max-width: 100%; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
                                        a { color: #4f46e5; }
                                    `,
                                    setup: (editor) => {
                                        editor.on('init', () => {
                                            editor.getContainer().style.transition = 'all 0.3s';
                                        });
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* LSI Keywords Panel */}
                {formData.focus_keyword && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="w-5 h-5 text-indigo-500" />
                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-wider text-indigo-700">LSI Keywords to Use Naturally</h4>
                                <p className="text-[9px] font-medium text-indigo-500">Semantically related terms — scatter these in your content for richer topical coverage</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {lsiTerms.map((term, i) => (
                                <span key={i} className="bg-white border border-indigo-200 text-indigo-700 text-[10px] font-black px-3 py-1.5 rounded-xl">
                                    {term}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-24 space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-2 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> SEO Diagnostics
                    </h4>

                    {/* Live SEO Score Ring */}
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex items-center gap-5">
                        <div className="relative w-16 h-16 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                                <circle cx="32" cy="32" r="28" className="stroke-white/10 fill-none" strokeWidth="6" />
                                <circle
                                    cx="32" cy="32" r="28"
                                    className={cn('fill-none transition-all duration-700', scoreColors.stroke)}
                                    strokeWidth="6"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className={cn('absolute inset-0 flex items-center justify-center text-sm font-black', scoreColors.text)}>
                                {analysis.seoScore}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-black text-white uppercase tracking-widest">SEO Score</p>
                            <p className={cn('text-[10px] font-black mt-1', scoreColors.text)}>{scoreColors.label}</p>
                            <p className="text-[8px] text-white/40 font-bold mt-0.5">out of 100</p>
                        </div>
                    </div>

                    {/* Heading Tree */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Heading Structure</span>
                            <ListTree className="w-4 h-4 opacity-40" />
                        </div>
                        <div className="flex gap-3">
                            {[
                                { label: 'H1', val: analysis.h1Count, good: analysis.h1Count === 1 },
                                { label: 'H2', val: analysis.h2Count, good: analysis.h2Count >= 1 },
                                { label: 'H3', val: analysis.h3Count, good: true }
                            ].map(h => (
                                <div key={h.label} className="flex-1 bg-white/5 rounded-xl p-3 text-center border border-white/5">
                                    <p className="text-[8px] font-black uppercase opacity-40 mb-1">{h.label}</p>
                                    <p className={cn('text-xl font-black', h.good ? 'text-emerald-400' : 'text-rose-400')}>
                                        {h.val}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Link Counts */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="flex items-center gap-2 mb-3">
                            <Link2 className="w-4 h-4 opacity-40" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Links</span>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 text-center">
                                <p className={cn('text-xl font-black', analysis.internalLinks >= 2 ? 'text-emerald-400' : 'text-amber-400')}>
                                    {analysis.internalLinks}
                                </p>
                                <p className="text-[8px] font-black opacity-40 uppercase">Internal</p>
                            </div>
                            <div className="w-px bg-white/10" />
                            <div className="flex-1 text-center">
                                <p className={cn('text-xl font-black', analysis.externalLinks >= 1 ? 'text-emerald-400' : 'text-amber-400')}>
                                    {analysis.externalLinks}
                                </p>
                                <p className="text-[8px] font-black opacity-40 uppercase">External</p>
                            </div>
                        </div>
                    </div>

                    {/* Image ALT */}
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-3">
                        <ImageIcon className="w-4 h-4 opacity-40 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Images</p>
                            <p className={cn('text-xs font-black mt-1', analysis.imagesWithoutAlt > 0 ? 'text-rose-400' : 'text-emerald-400')}>
                                {analysis.totalImages === 0
                                    ? 'No images in content'
                                    : analysis.imagesWithoutAlt === 0
                                    ? `${analysis.totalImages} image(s) — all have ALT ✓`
                                    : `${analysis.imagesWithoutAlt} image(s) missing ALT!`}
                            </p>
                        </div>
                    </div>

                    {/* Keyword Density */}
                    {formData.focus_keyword && (
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" />Keyword Density</span>
                                <span>{analysis.keywordDensity.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={cn(
                                        'h-full transition-all duration-500 rounded-full',
                                        analysis.keywordDensity > 2.5 ? 'bg-rose-500' : analysis.keywordDensity < 0.5 ? 'bg-amber-400' : 'bg-emerald-500'
                                    )}
                                    style={{ width: `${Math.min(analysis.keywordDensity * 20, 100)}%` }}
                                />
                            </div>
                            <p className="text-[8px] font-bold opacity-40 uppercase tracking-wider">Target: 0.5% – 2.0%</p>
                        </div>
                    )}

                    {/* Issues */}
                    <div className="pt-2 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Issues ({analysis.issues.length})</p>
                        {analysis.issues.length === 0 ? (
                            <div className="flex gap-3 bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-emerald-200">
                                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                <p className="text-[10px] font-bold leading-normal">Content fully optimized! 🎉</p>
                            </div>
                        ) : (
                            analysis.issues.slice(0, 5).map((issue, idx) => (
                                <div key={idx} className="flex gap-3 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 text-rose-200">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <p className="text-[9px] font-bold leading-normal">{issue}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Passes */}
                    {analysis.passes.length > 0 && (
                        <div className="pt-1 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Passing ({analysis.passes.length})</p>
                            {analysis.passes.slice(0, 4).map((pass, idx) => (
                                <div key={idx} className="flex gap-3 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-200">
                                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <p className="text-[9px] font-bold leading-normal">{pass}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
