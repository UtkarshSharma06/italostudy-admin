import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    Trash2,
    Loader2,
    Pencil,
    Plus,
    Activity,
    X,
    Calendar,
    Settings,
    Map,
    Save,
    Quote,
    Zap,
    Layout,
    Target,
    Brain,
    Edit,
    BarChart,
    BookOpen,
    HelpCircle,
    Play
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// --- TYPES ---
interface PlatformUpdate {
    id: string;
    title: string;
    description: string;
    update_date: string;
    update_type: 'NEW' | 'IMPROVED' | 'ENHANCED' | 'ADDED';
    category: string;
    icon: string;
}

interface SystemStatus {
    id: string;
    name: string;
    status: 'operational' | 'degraded' | 'maintenance' | 'down';
    order_index: number;
}

interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    status: 'backlog' | 'researching' | 'in_progress' | 'completed';
    target_date: string;
    icon: string;
    order_index: number;
}

interface HeroFeature {
    title: string;
    description: string;
    tags: string[];
    status_text: string;
    progress: number;
    icon: string;
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatar_url: string;
}

interface PlatformConfig {
    current_session_text: string;
    live_status_percentage: number;
    hero_feature_json: HeroFeature;
    testimonial_json: Testimonial;
}

const ICON_OPTIONS = [
    { name: 'Zap', icon: Zap },
    { name: 'Edit', icon: Edit },
    { name: 'BarChart', icon: BarChart },
    { name: 'BookOpen', icon: BookOpen },
    { name: 'HelpCircle', icon: HelpCircle },
    { name: 'Brain', icon: Brain },
    { name: 'Target', icon: Target },
    { name: 'Play', icon: Play },
    { name: 'Layout', icon: Layout }
];

export default function PlatformStatusHub() {
    const [activeTab, setActiveTab] = useState('updates');
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);

    // --- STATE: UPDATES ---
    const [updates, setUpdates] = useState<PlatformUpdate[]>([]);
    const [editingUpdate, setEditingUpdate] = useState<PlatformUpdate | null>(null);
    const [updateForm, setUpdateForm] = useState({
        title: '',
        description: '',
        update_date: format(new Date(), 'yyyy-MM-dd'),
        update_type: 'NEW' as PlatformUpdate['update_type'],
        category: 'Platform',
        icon: 'zap'
    });

    // --- STATE: SYSTEM ---
    const [systems, setSystems] = useState<SystemStatus[]>([]);

    // --- STATE: ROADMAP ---
    const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
    const [editingRoadmap, setEditingRoadmap] = useState<RoadmapItem | null>(null);

    // --- STATE: CONFIG ---
    const [config, setConfig] = useState<PlatformConfig>({
        current_session_text: '',
        live_status_percentage: 0,
        hero_feature_json: { title: '', description: '', tags: [], status_text: '', progress: 0, icon: 'brain' },
        testimonial_json: { quote: '', author: '', role: '', avatar_url: '' }
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [updatesRes, systemsRes, roadmapRes, configRes] = await Promise.all([
                supabase.from('platform_updates').select('*').order('update_date', { ascending: false }),
                supabase.from('platform_system_status').select('*').order('order_index', { ascending: true }),
                supabase.from('platform_roadmap').select('*').order('order_index', { ascending: true }),
                supabase.from('platform_config').select('*').eq('id', 'global').single()
            ]);

            if (updatesRes.data) setUpdates(updatesRes.data as any);
            if (systemsRes.data) setSystems(systemsRes.data as any);
            if (roadmapRes.data) setRoadmap(roadmapRes.data as any);
            if (configRes.data) setConfig({
                current_session_text: configRes.data.current_session_text,
                live_status_percentage: configRes.data.live_status_percentage,
                hero_feature_json: configRes.data.hero_feature_json || config.hero_feature_json,
                testimonial_json: configRes.data.testimonial_json || config.testimonial_json
            });
        } catch (err) {
            console.error("Error fetching status hub data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // --- HANDLERS: UPDATES ---
    const handleSaveUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title: updateForm.title,
            description: updateForm.description,
            update_date: updateForm.update_date,
            update_type: updateForm.update_type,
            category: updateForm.category,
            icon: updateForm.icon
        };

        const res = editingUpdate?.id 
            ? await supabase.from('platform_updates').update(payload).eq('id', editingUpdate.id)
            : await supabase.from('platform_updates').insert([payload]);

        if (!res.error) {
            toast({ title: editingUpdate?.id ? "Update Modified" : "Update Published" });
            setEditingUpdate(null);
            resetUpdateForm();
            fetchAllData();
        }
    };

    const resetUpdateForm = () => {
        setUpdateForm({
            title: '', description: '', update_date: format(new Date(), 'yyyy-MM-dd'),
            update_type: 'NEW', category: 'Platform', icon: 'zap'
        });
    };

    const handleEditUpdate = (u: PlatformUpdate) => {
        setEditingUpdate(u);
        setUpdateForm({
            title: u.title,
            description: u.description,
            update_date: u.update_date,
            update_type: u.update_type,
            category: u.category,
            icon: u.icon
        });
    };

    // --- HANDLERS: ROADMAP ---
    const handleSaveRoadmap = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRoadmap) return;

        const payload = {
            title: editingRoadmap.title,
            description: editingRoadmap.description,
            status: editingRoadmap.status,
            target_date: editingRoadmap.target_date,
            icon: editingRoadmap.icon
        };

        const res = editingRoadmap.id 
            ? await supabase.from('platform_roadmap').update(payload).eq('id', editingRoadmap.id)
            : await supabase.from('platform_roadmap').insert([payload]);

        if (!res.error) {
            toast({ title: "Roadmap updated" });
            setEditingRoadmap(null);
            fetchAllData();
        }
    };

    // --- HANDLERS: CONFIG ---
    const handleSaveConfig = async () => {
        const { error } = await supabase
            .from('platform_config')
            .update({
                current_session_text: config.current_session_text,
                live_status_percentage: config.live_status_percentage,
                hero_feature_json: config.hero_feature_json,
                testimonial_json: config.testimonial_json
            })
            .eq('id', 'global');

        if (!error) {
            toast({ title: "Premium configuration deployed ✅" });
            fetchAllData();
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-4" />
                <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Synchronizing Premium Status Hub...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 flex items-center gap-4 italic tracking-tight">
                        <Zap className="w-10 h-10 text-indigo-600 fill-indigo-600/10" />
                        PREMIUM HUB
                    </h1>
                    <p className="text-slate-500 font-bold ml-14 -mt-1 uppercase tracking-[0.2em] text-[10px]">2025 Pixel-Perfect Control Board</p>
                </div>
            </div>

            <Tabs defaultValue="updates" className="w-full">
                <TabsList className="bg-slate-100/50 p-1.5 rounded-[2rem] h-auto mb-8 border border-slate-200/60 shadow-inner">
                    <TabsTrigger value="updates" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-indigo-600 font-black uppercase tracking-widest text-[11px] transition-all">
                        Changelog
                    </TabsTrigger>
                    <TabsTrigger value="roadmap" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-amber-600 font-black uppercase tracking-widest text-[11px] transition-all">
                        Roadmap
                    </TabsTrigger>
                    <TabsTrigger value="systems" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-emerald-600 font-black uppercase tracking-widest text-[11px] transition-all">
                        Infrastructure
                    </TabsTrigger>
                    <TabsTrigger value="config" className="rounded-full px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-rose-600 font-black uppercase tracking-widest text-[11px] transition-all">
                        <Settings className="w-4 h-4 mr-2" />
                        Visual Editor
                    </TabsTrigger>
                </TabsList>

                {/* --- TAB: UPDATES --- */}
                <TabsContent value="updates" className="space-y-6">
                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-indigo-500" />
                                Latest Updates
                            </h2>
                            <Button onClick={() => { setEditingUpdate({} as any); resetUpdateForm(); }} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-6">
                                <Plus className="w-4 h-4 mr-2" /> Add Premium Entry
                            </Button>
                        </div>

                        {editingUpdate && (
                            <form onSubmit={handleSaveUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 p-8 bg-slate-50/50 rounded-3xl border-2 border-indigo-100 relative">
                                <button type="button" onClick={() => setEditingUpdate(null)} className="absolute top-4 right-4 p-2 hover:bg-white rounded-full"><X className="w-5 h-5"/></button>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Update Title</Label>
                                        <Input value={updateForm.title} onChange={e => setUpdateForm({...updateForm, title: e.target.value})} className="rounded-xl h-12 font-bold" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Icon Style</Label>
                                            <select value={updateForm.icon} onChange={e => setUpdateForm({...updateForm, icon: e.target.value})} className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-bold">
                                                {ICON_OPTIONS.map(opt => <option key={opt.name} value={opt.name.toLowerCase()}>{opt.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Badge Type</Label>
                                            <select value={updateForm.update_type} onChange={e => setUpdateForm({...updateForm, update_type: e.target.value as any})} className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-bold">
                                                <option value="NEW">NEW</option>
                                                <option value="IMPROVED">IMPROVED</option>
                                                <option value="ENHANCED">ENHANCED</option>
                                                <option value="ADDED">ADDED</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Category</Label>
                                            <Input value={updateForm.category} onChange={e => setUpdateForm({...updateForm, category: e.target.value})} className="rounded-xl h-12 font-bold" required />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Publish Date</Label>
                                            <Input type="date" value={updateForm.update_date} onChange={e => setUpdateForm({...updateForm, update_date: e.target.value})} className="rounded-xl h-12 font-bold" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description (Be Descriptive)</Label>
                                        <Textarea value={updateForm.description} onChange={e => setUpdateForm({...updateForm, description: e.target.value})} className="rounded-xl min-h-[140px] font-medium" required />
                                    </div>
                                    <Button type="submit" className="w-full bg-slate-900 text-white rounded-xl h-12 font-black uppercase tracking-widest text-[11px]">Deploy Premium Update</Button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-4">
                            {updates.map(u => (
                                <div key={u.id} className="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-100 rounded-2xl border border-transparent hover:border-slate-200 transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                                            <Zap className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100">{u.update_type}</span>
                                                <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">{u.category}</span>
                                                <span className="text-[9px] font-black uppercase text-slate-400 ml-2">{format(new Date(u.update_date), 'MMMM dd, yyyy')}</span>
                                            </div>
                                            <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{u.title}</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1">{u.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <Button variant="outline" size="icon" onClick={() => handleEditUpdate(u)} className="w-9 h-9 rounded-xl border-slate-200 hover:text-indigo-600 bg-white"><Pencil className="w-4 h-4"/></Button>
                                        <Button onClick={async () => { if(confirm('Delete?')) await supabase.from('platform_updates').delete().eq('id', u.id); fetchAllData(); }} variant="ghost" size="icon" className="w-9 h-9 rounded-xl text-rose-500 hover:bg-rose-50"><Trash2 className="w-4 h-4"/></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* --- TAB: ROADMAP --- */}
                <TabsContent value="roadmap" className="space-y-6">
                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Map className="w-6 h-6 text-amber-500" />
                                What We're Building
                            </h2>
                            <Button onClick={() => setEditingRoadmap({} as any)} className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] h-10 px-6">
                                <Plus className="w-4 h-4 mr-2" /> Add Roadmap Item
                            </Button>
                        </div>

                        {editingRoadmap && (
                            <form onSubmit={handleSaveRoadmap} className="p-8 bg-amber-50/30 rounded-3xl border-2 border-amber-100/50 mb-12 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Feature Title</Label>
                                        <Input value={editingRoadmap.title || ''} onChange={e => setEditingRoadmap({...editingRoadmap, title: e.target.value})} className="rounded-xl h-11 font-bold" required />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Icon</Label>
                                        <select value={editingRoadmap.icon || 'layout'} onChange={e => setEditingRoadmap({...editingRoadmap, icon: e.target.value})} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-bold">
                                            {ICON_OPTIONS.map(opt => <option key={opt.name} value={opt.name.toLowerCase()}>{opt.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Status</Label>
                                        <select value={editingRoadmap.status || 'backlog'} onChange={e => setEditingRoadmap({...editingRoadmap, status: e.target.value as any})} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm font-bold">
                                            <option value="backlog">Planned (Backlog)</option>
                                            <option value="researching">Researching</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Target Description</Label>
                                        <Textarea value={editingRoadmap.description || ''} onChange={e => setEditingRoadmap({...editingRoadmap, description: e.target.value})} className="rounded-xl min-h-[100px]" required />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Target Date (e.g. May 2025)</Label>
                                            <Input value={editingRoadmap.target_date || ''} onChange={e => setEditingRoadmap({...editingRoadmap, target_date: e.target.value})} className="rounded-xl h-11 font-bold" required />
                                        </div>
                                        <div className="flex gap-4">
                                            <Button type="button" variant="outline" onClick={() => setEditingRoadmap(null)} className="flex-1 rounded-xl">Cancel</Button>
                                            <Button type="submit" className="flex-[2] bg-amber-600 text-white rounded-xl">Save Roadmap</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}

                        <div className="space-y-4">
                            {roadmap.map((item, i) => (
                                <div key={item.id} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-amber-600">
                                            <Brain className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-900">{item.title}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[9px] font-bold uppercase px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500">{item.status} - {item.target_date}</span>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => setEditingRoadmap(item)} className="w-8 h-8 rounded-lg"><Pencil className="w-4 h-4"/></Button>
                                            <Button onClick={async () => { if(confirm('Delete?')) await supabase.from('platform_roadmap').delete().eq('id', item.id); fetchAllData(); }} variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-rose-500"><Trash2 className="w-4 h-4"/></Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* --- TAB: SYSTEMS --- */}
                <TabsContent value="systems" className="space-y-6">
                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <Activity className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-2xl font-black text-slate-900">Infrastructure Health</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {systems.map(system => (
                                <div key={system.id} className="p-6 rounded-[2rem] border-2 border-slate-50 bg-slate-50/40 space-y-4 shadow-sm">
                                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block text-center mb-4">{system.name}</Label>
                                    <div className={cn(
                                        "w-full px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border-2 transition-all cursor-pointer",
                                        system.status === 'operational' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                    )} onClick={async () => {
                                        await supabase.from('platform_system_status').update({ status: system.status === 'operational' ? 'down' : 'operational' }).eq('id', system.id);
                                        fetchAllData();
                                    }}>
                                        {system.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* --- TAB: CONFIG (2025 PREMIUM EDITOR) --- */}
                <TabsContent value="config" className="space-y-8">
                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                            <Zap className="w-6 h-6 text-indigo-500" />
                            <h2 className="text-2xl font-black text-slate-900">Featured Upcoming Spotlight (Hero)</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Hero Feature Title</Label>
                                    <Input value={config.hero_feature_json.title} onChange={e => setConfig({...config, hero_feature_json: {...config.hero_feature_json, title: e.target.value}})} className="rounded-xl h-12 font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Hero Description</Label>
                                    <Textarea value={config.hero_feature_json.description} onChange={e => setConfig({...config, hero_feature_json: {...config.hero_feature_json, description: e.target.value}})} className="rounded-xl min-h-[100px]" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Progress (%)</Label>
                                        <Input type="number" value={config.hero_feature_json.progress} onChange={e => setConfig({...config, hero_feature_json: {...config.hero_feature_json, progress: parseInt(e.target.value)}})} className="rounded-xl h-12 font-bold" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Status Sub-text</Label>
                                        <Input value={config.hero_feature_json.status_text} onChange={e => setConfig({...config, hero_feature_json: {...config.hero_feature_json, status_text: e.target.value}})} className="rounded-xl h-12 font-bold" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Tags (Comma separated)</Label>
                                    <Input 
                                        value={config.hero_feature_json.tags.join(', ')} 
                                        onChange={e => setConfig({...config, hero_feature_json: {...config.hero_feature_json, tags: e.target.value.split(',').map(t => t.trim())}})} 
                                        className="rounded-xl h-12 font-bold"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Hero Icon (Lucide name)</Label>
                                    <Input value={config.hero_feature_json.icon} onChange={e => setConfig({...config, hero_feature_json: {...config.hero_feature_json, icon: e.target.value}})} className="rounded-xl h-12 font-bold" />
                                </div>
                                <div className="p-6 bg-slate-900 rounded-3xl text-white">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-2">Live Preview Simulation</p>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"><Zap className="w-4 h-4 text-indigo-400" /></div>
                                        <h4 className="font-black text-lg">{config.hero_feature_json.title}</h4>
                                    </div>
                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className="bg-indigo-500 h-full" style={{ width: `${config.hero_feature_json.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                            <Quote className="w-6 h-6 text-emerald-500" />
                            <h2 className="text-2xl font-black text-slate-900">Student Testimonial Spotlight</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">The Quote</Label>
                                    <Textarea value={config.testimonial_json.quote} onChange={e => setConfig({...config, testimonial_json: {...config.testimonial_json, quote: e.target.value}})} className="rounded-xl min-h-[120px] font-bold text-slate-700 italic" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Full Name</Label>
                                        <Input value={config.testimonial_json.author} onChange={e => setConfig({...config, testimonial_json: {...config.testimonial_json, author: e.target.value}})} className="rounded-xl h-11 font-bold" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Role / Location</Label>
                                        <Input value={config.testimonial_json.role} onChange={e => setConfig({...config, testimonial_json: {...config.testimonial_json, role: e.target.value}})} className="rounded-xl h-11 font-bold" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] font-black uppercase text-slate-400">Avatar URL</Label>
                                    <Input value={config.testimonial_json.avatar_url} onChange={e => setConfig({...config, testimonial_json: {...config.testimonial_json, avatar_url: e.target.value}})} className="rounded-xl h-11 font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Button onClick={handleSaveConfig} className="bg-slate-900 hover:bg-black text-white rounded-[2rem] h-16 px-16 font-black uppercase tracking-[0.3em] shadow-2xl hover:shadow-indigo-500/20 transition-all gap-4">
                                <Save className="w-6 h-6" />
                                Deploy 2025 Premium Layout
                            </Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
