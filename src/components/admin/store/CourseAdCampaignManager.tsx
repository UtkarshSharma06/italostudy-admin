import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, GraduationCap, X, CheckCircle2, Megaphone, Check, LayoutDashboard, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CourseAdCampaignManager() {
    const { toast } = useToast();
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingCampaign, setEditingCampaign] = useState<any>(null);

    // Course Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<any[]>([]);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const { data, error } = await (supabase as any)
            .from('course_ad_campaigns')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching course campaigns:', error);
        } else {
            setCampaigns(data || []);
        }
        setIsLoading(false);
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        const { data, error } = await (supabase as any)
            .from('courses')
            .select('id, title, thumbnail_url, price_eur, discount_price_eur, exam_model_id')
            .ilike('title', `%${query}%`)
            .eq('is_active', true)
            .limit(6);

        if (!error && data) {
            setSearchResults(data);
        }
        setIsSearching(false);
    };

    const loadCoursesForCampaign = async (courseIds: string[]) => {
        if (!courseIds || courseIds.length === 0) {
            setSelectedCourses([]);
            return;
        }

        const { data } = await (supabase as any)
            .from('courses')
            .select('id, title, thumbnail_url, price_eur, discount_price_eur')
            .in('id', courseIds);

        if (data) setSelectedCourses(data);
    };

    const startEditing = (campaign: any) => {
        setEditingCampaign(campaign);
        loadCoursesForCampaign(campaign.course_ids || []);
    };

    const startNew = () => {
        setEditingCampaign({
            id: 'new',
            name: '',
            placement_id: 'dashboard-courses',
            is_active: true,
            course_ids: [],
        });
        setSelectedCourses([]);
        setSearchQuery('');
        setSearchResults([]);
    };

    const toggleCourse = (course: any) => {
        const isSelected = selectedCourses.some((c) => c.id === course.id);
        if (isSelected) {
            setSelectedCourses(selectedCourses.filter((c) => c.id !== course.id));
        } else {
            setSelectedCourses([...selectedCourses, course]);
        }
    };

    const saveCampaign = async () => {
        if (!editingCampaign.name || !editingCampaign.placement_id) {
            toast({ variant: 'destructive', title: 'Error', description: 'Name and Placement ID are required' });
            return;
        }

        const payload = {
            name: editingCampaign.name,
            placement_id: editingCampaign.placement_id,
            is_active: editingCampaign.is_active,
            course_ids: selectedCourses.map((c) => c.id),
        };

        let err;
        if (editingCampaign.id === 'new') {
            const { error } = await (supabase as any).from('course_ad_campaigns').insert(payload);
            err = error;
        } else {
            const { error } = await (supabase as any)
                .from('course_ad_campaigns')
                .update(payload)
                .eq('id', editingCampaign.id);
            err = error;
        }

        if (err) {
            toast({ variant: 'destructive', title: 'Error', description: err.message });
            console.error(err);
        } else {
            toast({ title: 'Success', description: 'Course campaign saved successfully' });
            setEditingCampaign(null);
            fetchCampaigns();
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        const { error } = await (supabase as any)
            .from('course_ad_campaigns')
            .update({ is_active: !currentStatus })
            .eq('id', id);

        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status' });
        } else {
            toast({ title: 'Success', description: 'Status updated' });
            fetchCampaigns();
        }
    };

    const formatPrice = (price: number | null) =>
        price != null ? `€${price}` : 'Free';

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-[3rem] p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                                <GraduationCap className="w-6 h-6 text-emerald-300" />
                            </div>
                            <span className="text-sm font-black tracking-widest text-emerald-300 uppercase">Courses</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                            Recommended Course Ads
                        </h1>
                        <p className="text-emerald-200/80 text-lg font-medium max-w-xl">
                            Feature specific courses on the student dashboard. Use the{' '}
                            <code className="bg-white/10 px-2 py-0.5 rounded-lg text-emerald-300 font-mono text-sm">
                                dashboard-courses
                            </code>{' '}
                            placement ID to show courses in the "Recommended Courses" strip.
                        </p>
                    </div>
                    {!editingCampaign && (
                        <Button
                            onClick={startNew}
                            className="bg-white text-emerald-900 hover:bg-emerald-50 rounded-2xl px-6 py-6 h-auto shadow-xl hover:scale-105 transition-all text-sm font-bold border-2 border-transparent"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create Campaign
                        </Button>
                    )}
                </div>
            </div>

            {/* Editing Interface */}
            {editingCampaign && (
                <div className="bg-white border-2 border-emerald-100 rounded-[3rem] p-8 shadow-xl shadow-emerald-100/50">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b-2 border-slate-50">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">
                                {editingCampaign.id === 'new' ? 'New Course Campaign' : 'Edit Campaign'}
                            </h2>
                            <p className="text-sm font-bold text-slate-500">Select courses to feature on the dashboard.</p>
                        </div>
                        <Button variant="ghost" onClick={() => setEditingCampaign(null)} className="rounded-2xl hover:bg-slate-100 text-slate-500">
                            Cancel
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Config Form */}
                        <div className="space-y-6 lg:col-span-1">
                            <div>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">Campaign Name</Label>
                                <Input
                                    value={editingCampaign.name}
                                    onChange={(e) => setEditingCampaign({ ...editingCampaign, name: e.target.value })}
                                    placeholder="e.g. IMAT Featured Courses"
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 font-bold"
                                />
                            </div>

                            <div>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block flex items-center gap-2">
                                    <Target className="w-4 h-4 text-emerald-500" /> Placement ID
                                </Label>
                                <Input
                                    value={editingCampaign.placement_id}
                                    onChange={(e) => setEditingCampaign({ ...editingCampaign, placement_id: e.target.value })}
                                    placeholder="dashboard-courses"
                                    className="h-14 rounded-2xl bg-slate-50 border-slate-200 font-bold font-mono text-emerald-600"
                                />
                                <p className="text-xs font-bold text-slate-400 mt-2">
                                    Use <code className="bg-slate-100 px-1 rounded text-emerald-600 font-mono">dashboard-courses</code> for the homepage strip.
                                </p>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500 block">Status</Label>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setEditingCampaign({ ...editingCampaign, is_active: true })}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${editingCampaign.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                                    >
                                        {editingCampaign.is_active && <Check className="w-4 h-4" />} Active
                                    </button>
                                    <button
                                        onClick={() => setEditingCampaign({ ...editingCampaign, is_active: false })}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 ${!editingCampaign.is_active ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                                    >
                                        {!editingCampaign.is_active && <Check className="w-4 h-4" />} Inactive
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={saveCampaign}
                                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-600/20"
                            >
                                Save Campaign
                            </Button>
                        </div>

                        {/* Course Selector */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Selected Courses */}
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 block">
                                    Featured Courses ({selectedCourses.length})
                                </Label>
                                {selectedCourses.length === 0 ? (
                                    <p className="text-sm font-bold text-slate-400 text-center py-8 bg-white rounded-2xl border border-dashed border-slate-200">
                                        No courses selected yet. Search below.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedCourses.map((c) => (
                                            <div
                                                key={c.id}
                                                className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-emerald-100 shadow-sm relative group"
                                            >
                                                <div className="w-14 h-10 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                                                    {c.thumbnail_url ? (
                                                        <img src={c.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <GraduationCap className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-bold text-slate-900 truncate">{c.title}</h4>
                                                    <p className="text-xs font-black text-emerald-600">{formatPrice(c.price_eur)}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleCourse(c)}
                                                    className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl shrink-0"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Search */}
                            <div>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 block">
                                    Find Courses
                                </Label>
                                <div className="relative mb-4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        value={searchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        placeholder="Search course catalog..."
                                        className="pl-12 h-14 rounded-2xl bg-white border-2 border-slate-100 focus-visible:border-emerald-500 shadow-sm text-sm font-bold"
                                    />
                                    {isSearching && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                                    )}
                                </div>

                                {searchResults.length > 0 && (
                                    <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
                                        {searchResults.map((c) => {
                                            const isSelected = selectedCourses.some((sc) => sc.id === c.id);
                                            return (
                                                <div
                                                    key={c.id}
                                                    onClick={() => toggleCourse(c)}
                                                    className={`flex items-center justify-between p-4 border-b border-slate-50 last:border-0 cursor-pointer transition-colors ${isSelected ? 'bg-emerald-50/50' : 'hover:bg-slate-50'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-10 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                                                            {c.thumbnail_url ? (
                                                                <img src={c.thumbnail_url} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                                    <GraduationCap className="w-4 h-4" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className={`text-sm font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>
                                                                {c.title}
                                                            </h4>
                                                            <p className="text-xs font-bold text-slate-500">{formatPrice(c.price_eur)}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {isSelected ? (
                                                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                                <CheckCircle2 className="w-5 h-5" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400">
                                                                <Plus className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Campaign List */}
            {!editingCampaign && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        [1, 2, 3].map((i) => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2.5rem]" />)
                    ) : campaigns.length === 0 ? (
                        <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
                            <LayoutDashboard className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-black text-slate-900 mb-2">No Course Campaigns Yet</h3>
                            <p className="text-sm font-bold text-slate-500">
                                Create your first campaign to feature courses on the dashboard.
                            </p>
                        </div>
                    ) : (
                        campaigns.map((camp) => (
                            <div
                                key={camp.id}
                                className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group relative"
                            >
                                <div className="absolute top-6 right-6">
                                    <Badge
                                        variant="outline"
                                        className={`font-black uppercase tracking-widest text-[10px] px-3 py-1 border-2 ${camp.is_active ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}
                                    >
                                        {camp.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>

                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Target className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-black text-slate-900 mb-1 truncate pr-20">{camp.name}</h3>
                                <p className="text-sm font-bold text-slate-500 font-mono mb-6 truncate">{camp.placement_id}</p>

                                <div className="flex items-center gap-2 mb-8">
                                    <div className="flex -space-x-3">
                                        {[...Array(Math.min(3, camp.course_ids?.length || 0))].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-600 shadow-sm"
                                            >
                                                <GraduationCap className="w-3.5 h-3.5" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 ml-2">
                                        {camp.course_ids?.length || 0} Courses
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => startEditing(camp)}
                                        className="flex-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold rounded-xl h-10"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => toggleStatus(camp.id, camp.is_active)}
                                        variant="outline"
                                        className="flex-1 border-slate-200 text-slate-600 font-bold rounded-xl h-10 hover:bg-slate-50"
                                    >
                                        {camp.is_active ? 'Pause' : 'Activate'}
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
