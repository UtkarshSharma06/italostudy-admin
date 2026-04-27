import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Image as ImageIcon,
    Plus,
    Trash2,
    GripVertical,
    LayoutGrid,
    Rows,
    ChevronUp,
    ChevronDown,
    Monitor,
    Edit2,
    Check,
    X,
    Eye,
    EyeOff,
    Loader2,
    Link as LinkIcon,
    Tag,
    AlignLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Banner {
    id: string;
    title: string | null;
    subtitle: string | null;
    image_url: string;
    link_url: string | null;
    badge_text: string | null;
    display_order: number;
    is_active: boolean;
}

interface HomeSection {
    id: string;
    title: string;
    subtitle: string | null;
    category_id: string | null;
    section_type: 'scroll' | 'grid' | 'hero_grid';
    display_order: number;
    is_active: boolean;
    store_categories?: { name: string } | null;
}

interface Category {
    id: string;
    name: string;
}

export default function LayoutManager() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<'banners' | 'sections'>('banners');
    const [banners, setBanners] = useState<Banner[]>([]);
    const [sections, setSections] = useState<HomeSection[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Banner form
    const [bannerForm, setBannerForm] = useState({
        title: '', subtitle: '', image_url: '', link_url: '', badge_text: ''
    });
    const [editingBannerId, setEditingBannerId] = useState<string | null>(null);

    // Section form
    const [sectionForm, setSectionForm] = useState({
        title: '', subtitle: '', category_id: '', section_type: 'scroll' as 'scroll' | 'grid' | 'hero_grid'
    });
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setIsLoading(true);
        const [b, s, c] = await Promise.all([
            (supabase.from('store_banners' as any) as any).select('*').order('display_order'),
            (supabase.from('store_home_sections' as any) as any)
                .select('*, store_categories(name)')
                .order('display_order'),
            (supabase.from('store_categories' as any) as any).select('id, name').order('name')
        ]);
        setBanners(b.data || []);
        setSections(s.data || []);
        setCategories(c.data || []);
        setIsLoading(false);
    };

    // ─── BANNER CRUD ────────────────────────────────────────
    const saveBanner = async () => {
        if (!bannerForm.image_url) {
            toast({ title: 'Image URL is required', variant: 'destructive' });
            return;
        }
        setIsSubmitting(true);
        const payload = {
            ...bannerForm,
            display_order: banners.length
        };
        try {
            if (editingBannerId) {
                await (supabase.from('store_banners' as any) as any).update(payload).eq('id', editingBannerId);
                toast({ title: 'Banner updated' });
            } else {
                await (supabase.from('store_banners' as any) as any).insert([payload]);
                toast({ title: 'Banner added' });
            }
            setBannerForm({ title: '', subtitle: '', image_url: '', link_url: '', badge_text: '' });
            setEditingBannerId(null);
            fetchAll();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteBanner = async (id: string) => {
        if (!confirm('Delete this banner?')) return;
        await (supabase.from('store_banners' as any) as any).delete().eq('id', id);
        setBanners(banners.filter(b => b.id !== id));
        toast({ title: 'Banner removed' });
    };

    const toggleBanner = async (id: string, current: boolean) => {
        await (supabase.from('store_banners' as any) as any).update({ is_active: !current }).eq('id', id);
        setBanners(banners.map(b => b.id === id ? { ...b, is_active: !current } : b));
    };

    const moveBanner = async (id: string, dir: -1 | 1) => {
        const idx = banners.findIndex(b => b.id === id);
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= banners.length) return;
        const reordered = [...banners];
        [reordered[idx], reordered[newIdx]] = [reordered[newIdx], reordered[idx]];
        const updates = reordered.map((b, i) =>
            (supabase.from('store_banners' as any) as any).update({ display_order: i }).eq('id', b.id)
        );
        await Promise.all(updates);
        setBanners(reordered.map((b, i) => ({ ...b, display_order: i })));
    };

    // ─── SECTION CRUD ──────────────────────────────────────
    const saveSection = async () => {
        if (!sectionForm.title) {
            toast({ title: 'Section title is required', variant: 'destructive' });
            return;
        }
        setIsSubmitting(true);
        const payload = {
            ...sectionForm,
            category_id: sectionForm.category_id || null,
            display_order: sections.length
        };
        try {
            if (editingSectionId) {
                await (supabase.from('store_home_sections' as any) as any).update(payload).eq('id', editingSectionId);
                toast({ title: 'Section updated' });
            } else {
                await (supabase.from('store_home_sections' as any) as any).insert([payload]);
                toast({ title: 'Section added' });
            }
            setSectionForm({ title: '', subtitle: '', category_id: '', section_type: 'scroll' });
            setEditingSectionId(null);
            fetchAll();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteSection = async (id: string) => {
        if (!confirm('Delete this section?')) return;
        await (supabase.from('store_home_sections' as any) as any).delete().eq('id', id);
        setSections(sections.filter(s => s.id !== id));
        toast({ title: 'Section removed' });
    };

    const toggleSection = async (id: string, current: boolean) => {
        await (supabase.from('store_home_sections' as any) as any).update({ is_active: !current }).eq('id', id);
        setSections(sections.map(s => s.id === id ? { ...s, is_active: !current } : s));
    };

    const moveSection = async (id: string, dir: -1 | 1) => {
        const idx = sections.findIndex(s => s.id === id);
        const newIdx = idx + dir;
        if (newIdx < 0 || newIdx >= sections.length) return;
        const reordered = [...sections];
        [reordered[idx], reordered[newIdx]] = [reordered[newIdx], reordered[idx]];
        const updates = reordered.map((s, i) =>
            (supabase.from('store_home_sections' as any) as any).update({ display_order: i }).eq('id', s.id)
        );
        await Promise.all(updates);
        setSections(reordered.map((s, i) => ({ ...s, display_order: i })));
    };

    const sectionTypeIcon = (type: string) => {
        if (type === 'grid') return <LayoutGrid className="w-3 h-3" />;
        if (type === 'hero_grid') return <Monitor className="w-3 h-3" />;
        return <Rows className="w-3 h-3" />;
    };

    return (
        <div className="space-y-8">
            {/* Tab Switch */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl w-fit">
                {(['banners', 'sections'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all capitalize",
                            activeTab === tab
                                ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        {tab === 'banners' ? '🖼 Hero Banners' : '📦 Page Sections'}
                    </button>
                ))}
            </div>

            {/* ══════════ BANNERS TAB ══════════ */}
            {activeTab === 'banners' && (
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Form */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-5 sticky top-8">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                            {editingBannerId ? 'Edit Banner' : 'Add New Banner'}
                        </h3>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Image URL *</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={bannerForm.image_url}
                                    onChange={e => setBannerForm({ ...bannerForm, image_url: e.target.value })}
                                    placeholder="https://ik.imagekit.io/..."
                                    className="h-11 rounded-2xl bg-slate-50 border-slate-100"
                                />
                            </div>
                            {bannerForm.image_url && (
                                <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden border border-slate-100 mt-2">
                                    <img src={bannerForm.image_url} alt="preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Headline (Optional)</Label>
                            <Input value={bannerForm.title} onChange={e => setBannerForm({ ...bannerForm, title: e.target.value })}
                                placeholder="e.g. NEW IMAT 2025 Book" className="h-11 rounded-2xl bg-slate-50 border-slate-100" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtitle (Optional)</Label>
                            <Input value={bannerForm.subtitle} onChange={e => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                                placeholder="e.g. 50% off this week only" className="h-11 rounded-2xl bg-slate-50 border-slate-100" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Badge</Label>
                                <Input value={bannerForm.badge_text} onChange={e => setBannerForm({ ...bannerForm, badge_text: e.target.value })}
                                    placeholder="NEW / SALE" className="h-11 rounded-2xl bg-slate-50 border-slate-100" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Link URL</Label>
                                <Input value={bannerForm.link_url} onChange={e => setBannerForm({ ...bannerForm, link_url: e.target.value })}
                                    placeholder="/store/..." className="h-11 rounded-2xl bg-slate-50 border-slate-100" />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                onClick={saveBanner}
                                disabled={isSubmitting}
                                className="flex-1 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-xs uppercase tracking-widest"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingBannerId ? 'Update' : 'Add Banner')}
                            </Button>
                            {editingBannerId && (
                                <Button variant="outline" onClick={() => { setEditingBannerId(null); setBannerForm({ title: '', subtitle: '', image_url: '', link_url: '', badge_text: '' }); }}
                                    className="h-12 rounded-2xl px-4">
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Banner List */}
                    <div className="lg:col-span-3 space-y-4">
                        {isLoading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="h-28 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 animate-pulse" />
                            ))
                        ) : banners.length === 0 ? (
                            <div className="py-20 text-center text-slate-400">
                                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p className="font-bold">No banners yet. Add your first hero banner above.</p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {banners.map((banner, idx) => (
                                    <motion.div
                                        key={banner.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={cn(
                                            "bg-white dark:bg-slate-900 rounded-[2rem] border p-5 flex gap-5 items-center group transition-all",
                                            banner.is_active ? "border-slate-100 dark:border-slate-800" : "border-dashed border-slate-200 dark:border-slate-700 opacity-60"
                                        )}
                                    >
                                        <div className="w-32 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-50 border border-slate-100">
                                            <img src={banner.image_url} alt={banner.title || ''} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                {banner.badge_text && (
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-black uppercase tracking-widest">
                                                        {banner.badge_text}
                                                    </span>
                                                )}
                                                <h4 className="font-black text-slate-900 dark:text-white text-sm truncate">
                                                    {banner.title || 'Untitled Banner'}
                                                </h4>
                                            </div>
                                            {banner.subtitle && <p className="text-xs text-slate-400 truncate">{banner.subtitle}</p>}
                                            {banner.link_url && (
                                                <p className="text-[10px] text-indigo-400 font-mono mt-1 truncate">{banner.link_url}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => moveBanner(banner.id, -1)} disabled={idx === 0}
                                                className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-700 disabled:opacity-30">
                                                <ChevronUp className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => moveBanner(banner.id, 1)} disabled={idx === banners.length - 1}
                                                className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-700 disabled:opacity-30">
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => toggleBanner(banner.id, banner.is_active)}
                                                className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600">
                                                {banner.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button onClick={() => { setEditingBannerId(banner.id); setBannerForm({ title: banner.title || '', subtitle: banner.subtitle || '', image_url: banner.image_url, link_url: banner.link_url || '', badge_text: banner.badge_text || '' }); }}
                                                className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteBanner(banner.id)}
                                                className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            )}

            {/* ══════════ SECTIONS TAB ══════════ */}
            {activeTab === 'sections' && (
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Form */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-5 sticky top-8">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                            {editingSectionId ? 'Edit Section' : 'Add New Section'}
                        </h3>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Section Title *</Label>
                            <Input value={sectionForm.title} onChange={e => setSectionForm({ ...sectionForm, title: e.target.value })}
                                placeholder="e.g. Best IMAT 2025 Books" className="h-11 rounded-2xl bg-slate-50 border-slate-100" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subtitle (Optional)</Label>
                            <Input value={sectionForm.subtitle} onChange={e => setSectionForm({ ...sectionForm, subtitle: e.target.value })}
                                placeholder="e.g. Hand-picked for 2025 intake" className="h-11 rounded-2xl bg-slate-50 border-slate-100" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category (Filter Products)</Label>
                            <select
                                value={sectionForm.category_id}
                                onChange={e => setSectionForm({ ...sectionForm, category_id: e.target.value })}
                                className="flex h-11 w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 text-sm font-medium"
                            >
                                <option value="">All Products</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Type</Label>
                            <div className="grid grid-cols-3 gap-3">
                                {([
                                    { type: 'scroll', label: 'Scroll Row', icon: <Rows className="w-5 h-5" /> },
                                    { type: 'grid', label: 'Grid', icon: <LayoutGrid className="w-5 h-5" /> },
                                    { type: 'hero_grid', label: 'Hero', icon: <Monitor className="w-5 h-5" /> },
                                ] as const).map(opt => (
                                    <button
                                        key={opt.type}
                                        onClick={() => setSectionForm({ ...sectionForm, section_type: opt.type })}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                                            sectionForm.section_type === opt.type
                                                ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                                                : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                                        )}
                                    >
                                        {opt.icon}
                                        <span className="text-[9px] font-black uppercase tracking-widest">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button
                                onClick={saveSection}
                                disabled={isSubmitting}
                                className="flex-1 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-xs uppercase tracking-widest"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingSectionId ? 'Update' : 'Add Section')}
                            </Button>
                            {editingSectionId && (
                                <Button variant="outline" onClick={() => { setEditingSectionId(null); setSectionForm({ title: '', subtitle: '', category_id: '', section_type: 'scroll' }); }}
                                    className="h-12 rounded-2xl px-4">
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Sections List */}
                    <div className="lg:col-span-3 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">
                            {sections.length} sections — Drag or reorder to control the store homepage layout
                        </p>
                        {isLoading ? (
                            [...Array(4)].map((_, i) => (
                                <div key={i} className="h-20 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 animate-pulse" />
                            ))
                        ) : sections.length === 0 ? (
                            <div className="py-20 text-center text-slate-400">
                                <AlignLeft className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p className="font-bold">No sections yet. Create your first homepage section.</p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {sections.map((section, idx) => (
                                    <motion.div
                                        key={section.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className={cn(
                                            "bg-white dark:bg-slate-900 rounded-[2rem] border p-5 flex gap-5 items-center group transition-all",
                                            section.is_active ? "border-slate-100 dark:border-slate-800" : "border-dashed border-slate-200 dark:border-slate-700 opacity-60"
                                        )}
                                    >
                                        <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
                                        <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500 shrink-0">
                                            {sectionTypeIcon(section.section_type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-black text-slate-900 dark:text-white text-sm">{section.title}</h4>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase border",
                                                    section.section_type === 'scroll' ? "bg-blue-50 text-blue-500 border-blue-100" :
                                                    section.section_type === 'grid' ? "bg-purple-50 text-purple-500 border-purple-100" :
                                                    "bg-emerald-50 text-emerald-500 border-emerald-100"
                                                )}>
                                                    {section.section_type}
                                                </span>
                                            </div>
                                            {section.subtitle && <p className="text-xs text-slate-400 truncate">{section.subtitle}</p>}
                                            {section.store_categories?.name && (
                                                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                                                    Category: {section.store_categories.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => moveSection(section.id, -1)} disabled={idx === 0}
                                                className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-700 disabled:opacity-30">
                                                <ChevronUp className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => moveSection(section.id, 1)} disabled={idx === sections.length - 1}
                                                className="p-1.5 rounded-xl hover:bg-slate-50 text-slate-300 hover:text-slate-700 disabled:opacity-30">
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => toggleSection(section.id, section.is_active)}
                                                className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600">
                                                {section.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <button onClick={() => {
                                                setEditingSectionId(section.id);
                                                setSectionForm({ title: section.title, subtitle: section.subtitle || '', category_id: section.category_id || '', section_type: section.section_type });
                                            }}
                                                className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => deleteSection(section.id)}
                                                className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
