import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
    Megaphone, 
    Plus, 
    Trash2, 
    Eye, 
    Loader2, 
    Pencil, 
    X as CloseIcon,
    Palette,
    Monitor,
    Layout as LayoutIcon,
    ChevronRight,
    Sparkles,
    Check,
    Clock,
    Mail,
    ArrowRight,
    MousePointer2,
    Zap,
    Bell,
    Gift,
    Code,
    Globe,
    Save,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import AnnouncementBar from '@/components/AnnouncementBar';

interface Announcement {
    id: string;
    title: string | null;
    content: string;
    mobile_content: string | null;
    is_active: boolean;
    page_target: string;
    created_at: string;
}

const TARGETS = [
    { id: 'global', name: 'Global (All Pages)' },
    { id: 'dashboard', name: 'Dashboard Only' },
    { id: 'store', name: 'Store Only' },
    { id: 'imat-prep', name: 'IMAT Exam Model' },
    { id: 'cent-s-prep', name: 'CEnT-S Exam Model' },
    { id: 'tolc-prep', name: 'TOLC Exam Model' },
    { id: 'til-prep', name: 'TIL Exam Model' },
    { id: 'public_popup', name: 'Public Popup (All Public Pages)' },
    { id: 'public_popup_home', name: 'Public Popup (Landing Page Only)' },
    { id: 'public_popup_store', name: 'Public Popup (Store Only)' },
    { id: 'public_popup_pricing', name: 'Public Popup (Pricing Only)' },
    { id: 'public_popup_blog', name: 'Public Popup (Blog Only)' }
];

export default function AnnouncementManager() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [exams, setExams] = useState<{id: string, name: string}[]>([]);
    const [showPreview, setShowPreview] = useState(true);
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        mobile_content: '',
        page_target: 'global',
        is_active: true
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchAnnouncements();
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const { data, error } = await supabase
                .from('exams')
                .select('slug, name')
                .eq('is_live', true);
            
            if (error) throw error;
            if (data) {
                setExams(data.map(e => ({ id: e.slug, name: `${e.name} Dashboard` })));
            }
        } catch (err) {
            console.error('Error fetching exams:', err);
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const { data, error } = await supabase
                .from('site_announcements' as any)
                .select('*')
                .order('created_at', { ascending: false }) as { data: Announcement[] | null, error: any };

            if (error) throw error;
            setAnnouncements(data || []);
        } catch (error: any) {
            toast.error('Error fetching announcements: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingId) {
                const { error } = await supabase
                    .from('site_announcements' as any)
                    .update(formData)
                    .eq('id', editingId);

                if (error) throw error;
                toast.success('Announcement updated successfully');
            } else {
                const { error } = await supabase
                    .from('site_announcements' as any)
                    .insert([formData]);

                if (error) throw error;
                toast.success('Announcement published successfully');
            }

            resetForm();
            fetchAnnouncements();
        } catch (error: any) {
            toast.error('Error saving announcement: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (ann: Announcement) => {
        setFormData({
            title: ann.title || '',
            content: ann.content,
            mobile_content: ann.mobile_content || '',
            page_target: ann.page_target,
            is_active: ann.is_active
        });
        setEditingId(ann.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            mobile_content: '',
            page_target: 'global',
            is_active: true
        });
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            const { error } = await supabase
                .from('site_announcements' as any)
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast.success('Announcement deleted');
            fetchAnnouncements();
        } catch (error: any) {
            toast.error('Error deleting announcement: ' + error.message);
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('site_announcements' as any)
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchAnnouncements();
        } catch (error: any) {
            toast.error('Error updating status: ' + error.message);
        }
    };

    return (
        <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center">
                            <Megaphone className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                            HTML Banners
                        </h2>
                    </div>
                    <p className="text-slate-500 font-bold text-sm ml-1">Paste your HTML code to show beautiful banners to students</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Now</p>
                        <p className="text-2xl font-black text-indigo-600 leading-none">{announcements.filter(a => a.is_active).length}</p>
                    </div>
                </div>
            </div>


            {/* Live Preview - Sticky Top */}
            <div className="sticky top-0 z-50 py-4 bg-slate-50/80 backdrop-blur-xl -mx-6 px-6">
                <div className="bg-white rounded-3xl p-4 shadow-xl border border-indigo-100/50">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Preview</span>
                        </div>
                        <button 
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 transition-all text-slate-500 hover:text-slate-900 border border-slate-100"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {showPreview ? 'Collapse' : 'Expand Preview'}
                            </span>
                            {showPreview ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    </div>
                    {showPreview && (
                        <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 min-h-[40px] flex items-center justify-center animate-fadeIn">
                            <AnnouncementBar 
                                previewData={{
                                    ...formData,
                                    is_active: true
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-5 bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8 h-fit">
                    <div className="flex items-center justify-between">
                        <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                            <Palette className="w-4 h-4 text-indigo-500" />
                            {editingId ? 'Edit Campaign' : 'Configure Banner'}
                        </h3>
                        {editingId && (
                            <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition-colors">
                                <CloseIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Name</label>
                                <Input
                                    placeholder="E.g., Winter Sale 2026"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="rounded-2xl border-slate-100 font-bold h-12 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                    <Monitor className="w-3 h-3" /> Target Page
                                </label>
                                <select
                                    value={formData.page_target}
                                    onChange={e => setFormData({ ...formData, page_target: e.target.value })}
                                    className="w-full rounded-2xl border-slate-100 border p-3.5 focus:border-indigo-500 transition-all font-bold text-sm bg-white shadow-sm"
                                >
                                    <optgroup label="General Pages & Popups">
                                        {TARGETS.filter(t => !t.id.includes('-prep')).map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="Exam Specific Dashboards">
                                        {exams.map(e => (
                                            <option key={e.id} value={e.id}>{e.name}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</label>
                                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 h-[50px]">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={formData.is_active}
                                        onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                        className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <label htmlFor="is_active" className="text-[10px] font-black text-slate-600 cursor-pointer uppercase tracking-tight">
                                        Active
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Desktop HTML */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <Monitor className="w-3 h-3" /> Desktop Banner HTML
                            </label>
                            <Textarea
                                placeholder='<div style="background: linear-gradient(90deg,#f87171,#fb923c); padding: 10px 20px; display:flex; align-items:center; justify-content:space-between; color:white;">Welcome! Check out our latest updates <a href="#" style="background:white;color:#f87171;padding:4px 14px;border-radius:99px;font-weight:700;font-size:12px;">Claim Now</a></div>'
                                value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                required
                                className="rounded-2xl border-slate-100 focus:border-indigo-500 font-mono text-sm min-h-[200px] shadow-sm bg-slate-50"
                            />
                        </div>

                        {/* Mobile HTML */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <span>📱</span> Mobile Banner HTML
                                <span className="text-slate-300 font-medium normal-case tracking-normal ml-1">(optional — leave blank to use desktop version)</span>
                            </label>
                            <Textarea
                                placeholder='<div style="background: linear-gradient(90deg,#f87171,#fb923c); padding: 8px 12px; display:flex; align-items:center; justify-content:space-between; color:white; font-size:12px;">🔥 Mega Sale — 50% Off <a href="#" style="background:white;color:#f87171;padding:3px 10px;border-radius:99px;font-weight:700;font-size:11px;white-space:nowrap;">Claim</a></div>'
                                value={formData.mobile_content}
                                onChange={e => setFormData({ ...formData, mobile_content: e.target.value })}
                                className="rounded-2xl border-slate-100 focus:border-indigo-500 font-mono text-sm min-h-[160px] shadow-sm bg-slate-50"
                            />
                            <p className="text-[10px] text-slate-400 font-medium px-1">💡 Keep it to a single line: text on the left, a small button on the right.</p>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                            <p className="text-[10px] font-bold text-amber-700 leading-relaxed">
                                <strong>Tip:</strong> For the mobile version, use <code>display:flex; align-items:center; justify-content:space-between;</code> to get a slim single-line strip.
                            </p>
                        </div>

                        <Button
                            disabled={isSubmitting}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-[20px] h-14 font-black uppercase tracking-[0.2em] text-sm gap-3 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? <Zap className="w-5 h-5 fill-current" /> : <Plus className="w-5 h-5" />)}
                            {editingId ? 'Update Campaign' : 'Launch Campaign'}
                        </Button>
                    </form>
                </div>

                {/* List & Analytics */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-slate-50/50 rounded-[40px] p-8 border border-white space-y-6 h-full min-h-[800px]">
                        <div className="flex items-center justify-between">
                            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs flex items-center gap-2">
                                <LayoutIcon className="w-4 h-4 text-indigo-500" />
                                Active Campaigns
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase">Live</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading assets...</p>
                                </div>
                            ) : announcements.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-100">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-slate-200" />
                                    </div>
                                    <p className="text-slate-400 font-bold text-sm italic">No campaigns found. Start your first promotion!</p>
                                </div>
                            ) : (
                                announcements.map((ann) => (
                                    <div key={ann.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                                        <div className="flex items-start justify-between relative z-10">
                                            <div className="space-y-4 pr-4 flex-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {ann.is_active ? (
                                                        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-100">
                                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                            Live
                                                        </div>
                                                    ) : (
                                                        <div className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200">Paused</div>
                                                    )}
                                                    <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100">
                                                        {TARGETS.find(t => t.id === ann.page_target)?.name || ann.page_target}
                                                    </div>
                                                    <div className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100 flex items-center gap-1">
                                                         <Code className="w-3 h-3" />
                                                         HTML Content
                                                     </div>
                                                </div>
                                                
                                                <div className="space-y-1">
                                                    <h4 className="font-black text-slate-900 text-xl tracking-tight line-clamp-1">{ann.title || 'Flash Announcement'}</h4>
                                                    <p className="text-sm text-slate-500 font-medium line-clamp-2 italic leading-relaxed">"{ann.content}"</p>
                                                </div>
                                                
                                                {/* Mini Preview Strip */}
                                                <div className="pt-2">
                                                    <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                                                        <AnnouncementBar 
                                                            previewData={{
                                                                ...ann,
                                                                is_active: true
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleEdit(ann)}
                                                    className="w-10 h-10 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                    title="Edit Campaign"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => toggleStatus(ann.id, ann.is_active)}
                                                    className={cn(
                                                        "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                                                        ann.is_active ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                    )}
                                                    title={ann.is_active ? "Pause" : "Play"}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(ann.id)}
                                                    className="w-10 h-10 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    title="Archive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
