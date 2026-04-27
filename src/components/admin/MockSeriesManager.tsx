import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
    Plus, 
    Trash2, 
    Pencil, 
    Layers, 
    Link as LinkIcon, 
    Unlink, 
    Calendar,
    Search,
    ChevronRight,
    Loader2,
    X,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MockSeries {
    id: string;
    title: string;
    description: string;
    exam_type: string;
    is_active: boolean;
    schedule_info: string;
    created_at: string;
}

interface MockSession {
    id: string;
    title: string;
    exam_type: string;
    start_time: string;
}

interface SeriesItem {
    id: string;
    series_id: string;
    session_id: string;
    order_index: number;
    mock_sessions?: MockSession;
}

export default function MockSeriesManager() {
    const { toast } = useToast();
    const [series, setSeries] = useState<MockSeries[]>([]);
    const [allSessions, setAllSessions] = useState<MockSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingSeriesId, setEditingSeriesId] = useState<string | null>(null);
    const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
    const [seriesItems, setSeriesItems] = useState<SeriesItem[]>([]);
    const [availableExams, setAvailableExams] = useState<any[]>([]);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        exam_type: 'imat-prep',
        is_active: true,
        schedule_info: ''
    });

    const linkSectionRef = useState<HTMLDivElement | null>(null)[0]; // Simplified ref usage or just window scroll
    // I'll use a direct window scroll for simplicity as I don't want to mess with lots of refs right now

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (selectedSeriesId) {
            fetchSeriesItems(selectedSeriesId);
        }
    }, [selectedSeriesId]);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            const [seriesRes, sessionsRes, examsRes] = await Promise.all([
                (supabase.from('mock_series' as any) as any).select('*').order('created_at', { ascending: false }),
                supabase.from('mock_sessions').select('id, title, exam_type, start_time').order('start_time', { ascending: false }),
                supabase.from('exams').select('id, slug, name').order('name')
            ]);

            if (seriesRes.error) throw seriesRes.error;
            if (sessionsRes.error) throw sessionsRes.error;
            if (examsRes.error) throw examsRes.error;

            setSeries((seriesRes.data as any) || []);
            setAllSessions(sessionsRes.data || []);
            setAvailableExams(examsRes.data || []);
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSeriesItems = async (seriesId: string) => {
        try {
            const { data, error } = await (supabase
                .from('mock_series_items' as any) as any)
                .select('*, mock_sessions(id, title, exam_type, start_time)')
                .eq('series_id', seriesId)
                .order('order_index', { ascending: true });

            if (error) throw error;
            setSeriesItems((data as any) || []);
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    const handleSaveSeries = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const dataRow = { ...formData };
            const query = (supabase.from('mock_series' as any) as any);
            
            if (editingSeriesId) {
                const { error } = await query.update(dataRow).eq('id', editingSeriesId);
                if (error) throw error;
                toast({ title: "Success", description: "Series updated." });
                fetchInitialData();
            } else {
                const { data: result, error } = await query.insert([dataRow]).select();
                if (error) throw error;
                const newId = result?.[0]?.id;
                
                toast({ title: "Success", description: "Series created." });
                handleResetForm();
                await fetchInitialData();
                
                if (newId) {
                    setSelectedSeriesId(newId);
                    setTimeout(() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }, 500);
                }
            }
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetForm = () => {
        setEditingSeriesId(null);
        setFormData({
            title: '',
            description: '',
            exam_type: 'imat-prep',
            is_active: true,
            schedule_info: ''
        });
    };

    const handleEditClick = (s: MockSeries) => {
        setEditingSeriesId(s.id);
        setFormData({
            title: s.title,
            description: s.description || '',
            exam_type: s.exam_type,
            is_active: s.is_active,
            schedule_info: s.schedule_info || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteSeries = async (id: string) => {
        if (!confirm('Are you sure you want to delete this series?')) return;
        try {
            const { error } = await (supabase.from('mock_series' as any) as any).delete().eq('id', id);
            if (error) throw error;
            toast({ title: "Deleted", description: "Series removed." });
            fetchInitialData();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    const toggleSessionInSeries = async (sessionId: string) => {
        if (!selectedSeriesId) return;

        const existing = seriesItems.find(item => item.session_id === sessionId);
        
        try {
            if (existing) {
                const { error } = await (supabase.from('mock_series_items' as any) as any).delete().eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await (supabase.from('mock_series_items' as any) as any).insert([{
                    series_id: selectedSeriesId,
                    session_id: sessionId,
                    order_index: seriesItems.length
                }]);
                if (error) throw error;
            }
            fetchSeriesItems(selectedSeriesId);
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    if (isLoading) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
    }

    return (
        <div className="space-y-8 pb-20">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm sticky top-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            {editingSeriesId ? <Pencil className="w-5 h-5 text-indigo-500" /> : <Plus className="w-5 h-5" />}
                            {editingSeriesId ? 'Edit Series' : 'New Mock Series'}
                        </h2>
                        
                        <form onSubmit={handleSaveSeries} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Series Title</Label>
                                <Input 
                                    value={formData.title} 
                                    onChange={e => setFormData({ ...formData, title: e.target.value })} 
                                    placeholder="e.g. IMAT Ultimate Series 2026"
                                    required 
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea 
                                    value={formData.description} 
                                    onChange={e => setFormData({ ...formData, description: e.target.value })} 
                                    placeholder="Brief overview of what this series includes..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label>Exam Type</Label>
                                    <select 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.exam_type}
                                        onChange={e => setFormData({ ...formData, exam_type: e.target.value })}
                                    >
                                        {availableExams.map(ex => (
                                            <option key={ex.id} value={ex.slug}>{ex.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Active</Label>
                                    <div className="flex items-center h-10">
                                        <input 
                                            type="checkbox" 
                                            checked={formData.is_active}
                                            onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-sm text-slate-500">Visible to users</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Series Schedule (HTML/Text)</Label>
                                <Textarea 
                                    value={formData.schedule_info} 
                                    onChange={e => setFormData({ ...formData, schedule_info: e.target.value })} 
                                    placeholder="Dates, times, and breakdown of the series..."
                                    className="min-h-[150px] font-mono text-xs"
                                />
                                <p className="text-[10px] text-slate-400">This will be displayed in the "Open Schedule" modal.</p>
                            </div>

                            <div className="pt-4 flex gap-2">
                                <Button type="submit" disabled={isSubmitting} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : (editingSeriesId ? 'Update Series' : 'Create Series')}
                                </Button>
                                {editingSeriesId && (
                                    <Button type="button" variant="outline" onClick={handleResetForm}>Cancel</Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-500" /> Existing Series</h2>
                        
                        <div className="space-y-3">
                            {series.length === 0 ? (
                                <div className="text-center py-10 text-slate-400 text-sm">No series created yet.</div>
                            ) : (
                                series.map(s => (
                                    <div 
                                        key={s.id} 
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all cursor-pointer group",
                                            selectedSeriesId === s.id 
                                                ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800" 
                                                : "bg-white border-slate-100 hover:border-indigo-200 dark:bg-slate-800 dark:border-slate-700"
                                        )}
                                        onClick={() => setSelectedSeriesId(s.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800">
                                                    <Layers className={cn("w-5 h-5", selectedSeriesId === s.id ? "text-indigo-600" : "text-slate-400")} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 dark:text-white">{s.title}</h3>
                                                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{s.exam_type} • {s.is_active ? 'Active' : 'Inactive'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant={selectedSeriesId === s.id ? "default" : "outline"}
                                                    className={cn(
                                                        "h-8 text-[9px] font-black uppercase tracking-widest px-3 rounded-lg flex items-center gap-2",
                                                        selectedSeriesId === s.id ? "bg-indigo-600" : "text-slate-500"
                                                    )}
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        setSelectedSeriesId(s.id); 
                                                        setTimeout(() => {
                                                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                                                        }, 100);
                                                    }}
                                                >
                                                    <LinkIcon className="w-3 h-3" />
                                                    {selectedSeriesId === s.id ? 'Selected' : 'Link Mocks'}
                                                </Button>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg" onClick={(e) => { e.stopPropagation(); handleEditClick(s); }}>
                                                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={(e) => { e.stopPropagation(); handleDeleteSeries(s.id); }}>
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {selectedSeriesId && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                                        <div className="p-2 bg-indigo-600 rounded-xl text-white">
                                            <LinkIcon className="w-5 h-5" />
                                        </div>
                                        Manage Series Content
                                    </h2>
                                    <p className="text-sm text-slate-400 font-medium">Add or remove sessions from "{series.find(s => s.id === selectedSeriesId)?.title}"</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedSeriesId(null)}><X className="w-5 h-5" /></Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Included Mocks */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">Included in Series</h3>
                                    <div className="space-y-2 min-h-[200px] border-2 border-dashed border-slate-100 rounded-2xl p-2">
                                        {seriesItems.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-2">
                                                <LinkIcon className="w-5 h-5 opacity-20" />
                                                <p className="text-[10px] font-bold uppercase tracking-widest">No mocks linked</p>
                                            </div>
                                        ) : (
                                            seriesItems.map(item => (
                                                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate pr-4">{item.mock_sessions?.title}</span>
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="w-7 h-7 rounded-lg text-rose-500 hover:bg-rose-50 shrink-0"
                                                        onClick={() => toggleSessionInSeries(item.session_id)}
                                                    >
                                                        <Unlink className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Available Mocks */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">All Deployed Mocks</h3>
                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {allSessions
                                            .filter(s => !seriesItems.some(item => item.session_id === s.id))
                                            .map(s => (
                                                <div key={s.id} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-indigo-200 transition-all group">
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{s.title}</p>
                                                        <p className="text-[8px] uppercase font-black text-slate-400 tracking-tighter">{s.exam_type} • {new Date(s.start_time).toLocaleDateString()}</p>
                                                    </div>
                                                    <Button 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="w-7 h-7 rounded-lg text-indigo-600 hover:bg-indigo-50 shrink-0"
                                                        onClick={() => toggleSessionInSeries(s.id)}
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
