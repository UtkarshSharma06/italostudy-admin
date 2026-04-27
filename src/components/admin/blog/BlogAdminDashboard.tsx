import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layout,
    Search as SearchIcon,
    Globe,
    CheckCircle2,
    AlertCircle,
    Image as ImageIcon,
    Settings,
    MessageSquare,
    Sparkles,
    ChevronRight,
    ArrowLeft,
    Save,
    Eye,
    MousePointer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import SEOSection from '@/components/admin/blog/SEOSection';
import ContentSEOAnalyzer from '@/components/admin/blog/ContentSEOAnalyzer';
import MediaSEOManager from '@/components/admin/blog/MediaSEOManager';
import FAQBuilder from '@/components/admin/blog/FAQBuilder';
import CTABuilder from '@/components/admin/blog/CTABuilder';
import { supabase } from '@/integrations/supabase/client';
import { Editor } from '@tinymce/tinymce-react';

interface BlogAdminDashboardProps {
    onBack: () => void;
    post?: any;
    onSaveSuccess: () => void;
}

export default function BlogAdminDashboard({ onBack, post, onSaveSuccess }: BlogAdminDashboardProps) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('metadata');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await supabase.from('blog_categories').select('id, name');
            if (data) setCategories(data);
        };
        fetchCategories();
    }, []);

    const unwrapContent = (content: any): string => {
        if (!content) return '';

        // If it's an object with a body, take the body
        if (typeof content === 'object' && content !== null && 'body' in content) {
            return unwrapContent(content.body);
        }

        // If it's a string, try to parse it as JSON in case it's stringified
        if (typeof content === 'string') {
            try {
                // Heuristic: only try to parse if it looks like a JSON object containing "body"
                if (content.trim().startsWith('{') && content.includes('"body"')) {
                    const parsed = JSON.parse(content);
                    // Check if the parsed result is indeed our structure
                    if (parsed && typeof parsed === 'object' && 'body' in parsed) {
                        return unwrapContent(parsed.body);
                    }
                }
            } catch (e) {
                // Not valid JSON, treat as raw content
            }
        }

        return String(content);
    };

    const getInitialCustomHtmlState = (content: any): boolean => {
        if (typeof content === 'object' && content !== null && 'is_custom_html' in content) {
            return content.is_custom_html;
        }
        if (typeof content === 'string') {
            try {
                if (content.trim().startsWith('{') && content.includes('"is_custom_html"')) {
                    const parsed = JSON.parse(content);
                    return !!parsed.is_custom_html;
                }
            } catch (e) {}
        }
        return false;
    };

    const [formData, setFormData] = useState({
        title: post?.title || '',
        slug: post?.slug || '',
        excerpt: post?.excerpt || '',
        content: unwrapContent(post?.content),
        is_custom_html: getInitialCustomHtmlState(post?.content),
        status: post?.status || 'draft',
        featured_image: post?.featured_image || '',
        category_id: post?.category_id || '',
        seo_title: post?.seo_title || '',
        meta_description: post?.meta_description || '',
        focus_keyword: post?.focus_keyword || '',
        alt_text: post?.alt_text || '',
        image_title: post?.image_title || '',
        faq_schema: post?.faq_schema || [],
        cta_config: post?.cta_config || null,
        seo_metadata: post?.seo_metadata || {
            indexing: { index: true, follow: true },
            og: { title: '', description: '', image: '' },
            twitter: { card: 'summary_large_image' }
        }
    });

    const tabs = [
        { id: 'metadata', label: 'Metadata & SEO', icon: Globe },
        { id: 'content', label: 'Editor & Analysis', icon: SearchIcon },
        { id: 'media', label: 'Media & Social', icon: ImageIcon },
        { id: 'faqs', label: 'FAQs & Schema', icon: MessageSquare },
        { id: 'cta', label: 'CTA Builder', icon: MousePointer },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            // Auto-generate slug if missing
            let finalSlug = formData.slug;
            if (!finalSlug && formData.title) {
                finalSlug = formData.title
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');

                // Update local state to reflect the change visually if possible, 
                // though usually we just save it. Let's update it for consistency.
                setFormData(prev => ({ ...prev, slug: finalSlug }));
            }

            if (!finalSlug) {
                toast({
                    title: "Validation Error",
                    description: "A URL slug is required. Please add a title to auto-generate one.",
                    variant: "destructive"
                });
                setIsSubmitting(false);
                return;
            }

            // Check if slug already exists
            let slugQuery = supabase
                .from('blog_posts')
                .select('id')
                .eq('slug', finalSlug);
            
            if (post?.id) {
                slugQuery = slugQuery.neq('id', post.id);
            }

            const { data: existingPosts, error: slugCheckError } = await slugQuery;
            
            if (slugCheckError) throw slugCheckError;

            if (existingPosts && existingPosts.length > 0) {
                toast({
                    title: "URL Slug Unavailable",
                    description: `The slug "/blog/${finalSlug}" is already in use by another post. Please modify it.`,
                    variant: "destructive",
                });
                setIsSubmitting(false);
                return;
            }

            // Auto-detect FAQs from `<details>` blocks in the HTML
            let finalFaqs = [...(formData.faq_schema || [])];
            try {
                const doc = new DOMParser().parseFromString(formData.content, 'text/html');
                const detailsEls = doc.querySelectorAll('details');
                if (detailsEls.length > 0) {
                    const autoFaqs = Array.from(detailsEls).map(el => {
                        const summary = el.querySelector('summary')?.textContent?.trim() || '';
                        let answer = '';
                        el.childNodes.forEach(node => {
                            if (node.nodeName.toLowerCase() !== 'summary') {
                                answer += (node.textContent || '') + ' ';
                            }
                        });
                        answer = answer.trim();
                        // remove multiple spaces
                        answer = answer.replace(/\s\s+/g, ' ');
                        return {
                            id: Math.random().toString(36).substring(7),
                            question: summary,
                            answer: answer
                        };
                    }).filter(f => f.question && f.answer);
                    
                    // Add new FAQs if their question doesn't already exist in finalFaqs
                    autoFaqs.forEach(auto => {
                        if (!finalFaqs.find(f => f.question.toLowerCase() === auto.question.toLowerCase())) {
                            finalFaqs.push(auto);
                        }
                    });
                }
            } catch (err) {
                console.error("Error parsing FAQs", err);
            }

            const { is_custom_html, ...restFormData } = formData;
            const dataToSave = {
                ...restFormData,
                slug: finalSlug, // Ensure we use the generated one
                content: { body: formData.content, is_custom_html: formData.is_custom_html },
                faq_schema: finalFaqs,
                cta_config: formData.cta_config || null,
                updated_at: new Date().toISOString()
            };

            const { error } = post?.id
                ? await supabase.from('blog_posts').update(dataToSave).eq('id', post.id)
                : await supabase.from('blog_posts').insert([dataToSave]);

            if (error) throw error;

            toast({
                title: post?.id ? "Post updated!" : "Post created!",
                description: "All SEO rules and content saved successfully.",
            });
            onSaveSuccess();
        } catch (error: any) {
            toast({
                title: "Error saving post",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePreview = () => {
        if (!formData.slug) {
            toast({
                title: "Cannot Preview",
                description: "Please save the post with a valid slug first.",
                variant: "destructive"
            });
            return;
        }
        window.open(`#/blog/${formData.slug}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50/50 rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h2 className="text-lg font-black text-slate-900 leading-none mb-1">
                            {post ? 'Edit Post' : 'Create New Post'}
                        </h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-3 h-3 text-indigo-500" /> SEO-Guarded Environment
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handlePreview} className="rounded-xl font-bold text-xs h-10 border-2">
                        <Eye className="w-4 h-4 mr-2" /> Preview
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        className="rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-xs uppercase tracking-widest h-10 px-6 shadow-lg shadow-slate-200 transition-all"
                    >
                        {isSubmitting ? 'Saving...' : 'Save & Publish'}
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar Tabs */}
                <aside className="w-64 bg-white border-r border-slate-100 p-4 space-y-1 overflow-y-auto hidden lg:block">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-3 p-4 rounded-2xl transition-all group",
                                activeTab === tab.id
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-900")} />
                            <span className="font-black uppercase tracking-tight text-[10px]">{tab.label}</span>
                            {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </button>
                    ))}

                    <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">SEO Score</p>
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="24" cy="24" r="20" className="stroke-slate-200 fill-none" strokeWidth="4" />
                                    <circle cx="24" cy="24" r="20" className="stroke-emerald-500 fill-none" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="30" />
                                </svg>
                                <span className="absolute text-[10px] font-black">75%</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-slate-800">Heading Hierarchy</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <p className="text-[8px] font-bold text-slate-400 uppercase">Optimized</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-white p-8">
                    <div className="max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            {activeTab === 'metadata' && (
                                <motion.div
                                    key="metadata"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <SEOSection formData={formData} setFormData={setFormData} />
                                </motion.div>
                            )}

                            {activeTab === 'content' && (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <ContentSEOAnalyzer formData={formData} setFormData={setFormData} />
                                </motion.div>
                            )}

                            {activeTab === 'media' && (
                                <motion.div
                                    key="media"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <MediaSEOManager formData={formData} setFormData={setFormData} />
                                </motion.div>
                            )}

                            {activeTab === 'faqs' && (
                                <motion.div
                                    key="faqs"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <FAQBuilder formData={formData} setFormData={setFormData} />
                                </motion.div>
                            )}

                            {activeTab === 'cta' && (
                                <motion.div
                                    key="cta"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <CTABuilder formData={formData} setFormData={setFormData} />
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="space-y-8">
                                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                        <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                                            <Settings className="w-6 h-6 text-slate-800" /> Post Configuration
                                        </h3>

                                        {/* Slug Management */}
                                        <div className="mb-8">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">
                                                URL Slug (Auto-generated if empty)
                                            </Label>
                                            <div className="flex gap-4">
                                                <div className="flex-1 relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs select-none">
                                                        italostudy.com/blog/
                                                    </span>
                                                    <Input
                                                        value={formData.slug}
                                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                        className="pl-40 h-14 rounded-2xl border-2 border-slate-100 font-bold text-slate-700"
                                                        placeholder="my-awesome-post"
                                                    />
                                                </div>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => {
                                                        const slug = formData.title
                                                            .toLowerCase()
                                                            .trim()
                                                            .replace(/[^\w\s-]/g, '')
                                                            .replace(/[\s_-]+/g, '-')
                                                            .replace(/^-+|-+$/g, '');
                                                        setFormData({ ...formData, slug });
                                                    }}
                                                    className="h-14 rounded-2xl px-6 font-bold"
                                                >
                                                    Generate from Title
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Live Status</Label>
                                                <select
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl h-14 px-6 font-bold focus:border-indigo-500 transition-all outline-none"
                                                    value={formData.status}
                                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                                >
                                                    <option value="draft">📁 Draft (Hidden)</option>
                                                    <option value="published">🚀 Published (Live)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</Label>
                                                <select
                                                    className="w-full bg-white border-2 border-slate-100 rounded-2xl h-14 px-6 font-bold focus:border-indigo-500 transition-all outline-none"
                                                    value={formData.category_id}
                                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                                >
                                                    <option value="">Uncategorized</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-8 border-t-2 border-slate-100 flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm">
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900 mb-1">Custom HTML Mode</h4>
                                                <p className="text-[10px] font-bold text-slate-500">Bypass styling layers and render your blog entirely from uploaded raw HTML structure.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={formData.is_custom_html}
                                                    onChange={(e) => setFormData({ ...formData, is_custom_html: e.target.checked })}
                                                />
                                                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    );
}
