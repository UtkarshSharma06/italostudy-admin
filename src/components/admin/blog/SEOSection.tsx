import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
    Globe,
    AlertCircle,
    CheckCircle2,
    Search as SearchIcon,
    Terminal,
    Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SEOSectionProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function SEOSection({ formData, setFormData }: SEOSectionProps) {
    const titleLength = formData.seo_title.length;
    const descLength = formData.meta_description.length;

    const titleStatus = titleLength >= 50 && titleLength <= 60 ? 'optimal' : titleLength > 60 ? 'too-long' : 'too-short';
    const descStatus = descLength >= 150 && descLength <= 160 ? 'optimal' : descLength > 160 ? 'too-long' : 'too-short';

    const keywordInTitle = formData.focus_keyword && formData.seo_title.toLowerCase().includes(formData.focus_keyword.toLowerCase());
    const keywordInDesc = formData.focus_keyword && formData.meta_description.toLowerCase().includes(formData.focus_keyword.toLowerCase());
    const keywordInSlug = formData.focus_keyword && formData.slug
        ? formData.slug.toLowerCase().includes(formData.focus_keyword.toLowerCase().replace(/\s+/g, '-'))
        : false;
    const titleStartsWithKeyword = formData.focus_keyword && formData.seo_title
        ? formData.seo_title.toLowerCase().startsWith(formData.focus_keyword.toLowerCase())
        : false;
    const CTA_WORDS = ['learn', 'discover', 'guide', 'how to', 'best', 'tips', 'free', 'complete', 'step', 'top', 'master', 'ultimate', 'everything'];
    const ctaWordInDesc = CTA_WORDS.some(w => formData.meta_description.toLowerCase().includes(w));

    return (
        <div className="space-y-10">
            {/* Basic Info */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Post Title (H1)</Label>
                    <Input
                        placeholder="The main title of your article..."
                        className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-bold text-lg focus:border-indigo-500 transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Excerpt (Short Description)</Label>
                    <Textarea
                        placeholder="Brief summary shown on blog cards (separate from SEO description)..."
                        className="h-14 min-h-[56px] rounded-2xl border-2 border-slate-100 px-6 py-4 font-bold focus:border-indigo-500 transition-all resize-none"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                </div>
            </div>

            <div className="w-full h-px bg-slate-100 my-4" />

            {/* Focus Keyword */}
            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <Terminal className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="font-black text-lg leading-none mb-1">Target Keyword</h4>
                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">What should people search on Google?</p>
                    </div>
                </div>
                <Input
                    placeholder="e.g., IMAT Preparation Guide 2026"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-16 rounded-2xl px-6 font-bold text-lg focus:bg-white/20 transition-all border-2"
                    value={formData.focus_keyword}
                    onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })}
                />
            </div>

            {/* Meta Metadata Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-end px-1">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">SEO Title (Meta Title)</Label>
                            <span className={cn(
                                "text-[10px] font-black",
                                titleStatus === 'optimal' ? "text-emerald-500" : "text-amber-500"
                            )}>
                                {titleLength}/60 chars
                            </span>
                        </div>
                        <Input
                            className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-bold focus:border-indigo-500 transition-all"
                            placeholder="Enter a high-converting SEO title..."
                            value={formData.seo_title}
                            onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                        />
                        <div className="flex items-center gap-2 px-2 mt-1">
                            <div className={cn("w-1.5 h-1.5 rounded-full", keywordInTitle ? "bg-emerald-500" : "bg-slate-300")} />
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Keyword in Title</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-end px-1">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Meta Description</Label>
                            <span className={cn(
                                "text-[10px] font-black",
                                descStatus === 'optimal' ? "text-emerald-500" : "text-amber-500"
                            )}>
                                {descLength}/160 chars
                            </span>
                        </div>
                        <Textarea
                            className="min-h-[120px] rounded-2xl border-2 border-slate-100 p-6 font-bold focus:border-indigo-500 transition-all resize-none"
                            placeholder="Hook the reader! Explain what's inside in 160 characters..."
                            value={formData.meta_description}
                            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        />
                        <div className="flex items-center gap-2 px-2 mt-1">
                            <div className={cn("w-1.5 h-1.5 rounded-full", keywordInDesc ? "bg-emerald-500" : "bg-slate-300")} />
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Keyword in Description</p>
                        </div>
                    </div>
                </div>

                {/* Google Preview */}
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                        <SearchIcon className="w-3 h-3" /> Live Google Preview
                    </h4>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-sm mx-auto">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <span className="text-[10px]">🏢</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-700 leading-none">ItaloStudy</span>
                                <span className="text-[8px] text-slate-400">https://italostudy.com › blog</span>
                            </div>
                        </div>
                        <h3 className="text-[#1a0dab] text-xl font-normal hover:underline cursor-pointer mb-1 line-clamp-2">
                            {formData.seo_title || formData.title || 'Start Typing to See Preview...'}
                        </h3>
                        <p className="text-[#4d5156] text-sm line-clamp-3 leading-snug">
                            {formData.meta_description || 'Add a meta description to see how your site appears in search results. A good description increases click-through rate!'}
                        </p>
                    </div>

                    <div className="mt-8 space-y-3">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">SEO Checklist</h5>

                        {/* Keyword in Title Check */}
                        <div className="p-4 bg-white/50 rounded-xl border border-slate-100 flex items-start gap-3">
                            {keywordInTitle ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-700 uppercase mb-1">
                                    {keywordInTitle ? '✓ Keyword in SEO Title' : '✗ Keyword Missing from SEO Title'}
                                </p>
                                <p className="text-[9px] font-medium text-slate-500 leading-relaxed">
                                    {keywordInTitle
                                        ? `Great! "${formData.focus_keyword}" appears in your SEO title.`
                                        : `Add "${formData.focus_keyword || 'your keyword'}" to the SEO Title for better rankings.`
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Keyword in Description Check */}
                        <div className="p-4 bg-white/50 rounded-xl border border-slate-100 flex items-start gap-3">
                            {keywordInDesc ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-700 uppercase mb-1">
                                    {keywordInDesc ? '✓ Keyword in Meta Description' : '✗ Keyword Missing from Description'}
                                </p>
                                <p className="text-[9px] font-medium text-slate-500 leading-relaxed">
                                    {keywordInDesc
                                        ? `Perfect! "${formData.focus_keyword}" is in your meta description.`
                                        : `Include "${formData.focus_keyword || 'your keyword'}" in the Meta Description to improve CTR.`
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Keyword in Slug Check */}
                        <div className="p-4 bg-white/50 rounded-xl border border-slate-100 flex items-start gap-3">
                            {keywordInSlug ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-700 uppercase mb-1">
                                    {keywordInSlug ? '✓ Keyword in URL Slug' : '✗ Keyword Missing from URL Slug'}
                                </p>
                                <p className="text-[9px] font-medium text-slate-500 leading-relaxed">
                                    {keywordInSlug
                                        ? 'URL slug contains the focus keyword — great for ranking.'
                                        : 'Include your keyword in the URL slug (Settings tab) for a boost.'}
                                </p>
                            </div>
                        </div>

                        {/* Title Starts With Keyword */}
                        <div className="p-4 bg-white/50 rounded-xl border border-slate-100 flex items-start gap-3">
                            {titleStartsWithKeyword ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-700 uppercase mb-1">
                                    {titleStartsWithKeyword ? '✓ Keyword at Title Start' : 'ℹ Title Doesn\'t Start With Keyword'}
                                </p>
                                <p className="text-[9px] font-medium text-slate-500 leading-relaxed">
                                    {titleStartsWithKeyword
                                        ? 'Excellent! Starting with the keyword is a strong ranking signal.'
                                        : 'Front-loading your keyword in the title improves CTR and rankings.'}
                                </p>
                            </div>
                        </div>

                        {/* CTA Word in Desc */}
                        <div className="p-4 bg-white/50 rounded-xl border border-slate-100 flex items-start gap-3">
                            {ctaWordInDesc ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-700 uppercase mb-1">
                                    {ctaWordInDesc ? '✓ Persuasive Word in Description' : '✗ No Persuasive Word in Description'}
                                </p>
                                <p className="text-[9px] font-medium text-slate-500 leading-relaxed">
                                    {ctaWordInDesc
                                        ? 'Description has an action/benefit word — improves click-through rate.'
                                        : 'Add words like "learn", "discover", "free", "guide" to boost CTR.'}
                                </p>
                            </div>
                        </div>

                        {/* Overall Score */}
                        <div className={cn(
                            "p-4 rounded-xl border-2 flex items-center gap-3 transition-all",
                            keywordInTitle && keywordInDesc
                                ? "bg-emerald-50 border-emerald-200"
                                : "bg-amber-50 border-amber-200"
                        )}>
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-black text-lg",
                                keywordInTitle && keywordInDesc
                                    ? "bg-emerald-500 text-white"
                                    : "bg-amber-500 text-white"
                            )}>
                                {keywordInTitle && keywordInDesc ? '💯' : '⚠️'}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-black text-slate-800 uppercase">
                                    {keywordInTitle && keywordInDesc
                                        ? 'SEO Optimized!'
                                        : 'SEO Needs Improvement'
                                    }
                                </p>
                                <p className="text-[9px] font-medium text-slate-600">
                                    {keywordInTitle && keywordInDesc
                                        ? 'Your meta tags are properly optimized for search engines.'
                                        : 'Fix the issues above to improve your search ranking.'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Canonical Override */}
            <div className="bg-white border-2 border-slate-50 p-8 rounded-[2.5rem] space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <Map className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                        <h5 className="font-black text-slate-800 text-sm">Canonical URL Override</h5>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Leave blank for auto-generation</p>
                    </div>
                </div>
                <Input
                    placeholder="https://italostudy.com/blog/..."
                    className="h-14 rounded-2xl border-2 border-slate-50 px-6 font-bold focus:border-indigo-500 transition-all"
                />
            </div>
        </div>
    );
}
