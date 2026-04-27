import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
    MousePointer2,
    Search,
    Globe,
    TrendingUp,
    RefreshCw,
    AlertCircle,
    Loader2,
    ExternalLink,
    SearchX,
    Filter
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from 'recharts';
import { useToast } from '@/hooks/use-toast';

interface MarketingStats {
    utm_sources: { name: string; value: number }[];
    referrers: { name: string; value: number }[];
    zero_searches: { name: string; value: number; location: string }[];
    daily_views: { date: string; value: number }[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function MarketingAnalytics() {
    const { toast } = useToast();
    const [stats, setStats] = useState<MarketingStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.rpc('get_marketing_analytics');
            if (error) throw error;
            setStats(data as MarketingStats);
        } catch (err: any) {
            console.error("Marketing fetch error:", err);
            setError(err.message || "Failed to load marketing data. Make sure you ran the SQL function.");
            toast({
                variant: "destructive",
                title: "Data Loading Error",
                description: "Ensure you have executed the get_marketing_analytics SQL function in Supabase."
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generating Insights...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center max-w-md mx-auto">
                <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Setup Required</h3>
                <p className="text-sm text-slate-500 mb-6">{error}</p>
                <Button onClick={fetchStats} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Retry Sync
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Marketing Intelligence</h2>
                    </div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Growth metrics, SEO gaps & acquisition funnels</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading} className="gap-2 rounded-xl h-10 px-4 border-slate-200">
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    Sync Data
                </Button>
            </div>

            {/* Daily Traffic Wave */}
            <div className="card-surface p-8 rounded-[2rem]">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <MousePointer2 className="w-4 h-4 text-indigo-500" />
                            Traffic Momentum
                        </h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Daily page views across 30 days</p>
                    </div>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.daily_views || []}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="date" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
                                tickFormatter={(val) => new Date(val).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '10px', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* UTM Sources */}
                <div className="card-surface p-8 rounded-[2rem]">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-emerald-500" />
                        Campaign Performance (UTM)
                    </h3>
                    <div className="h-64 w-full">
                        {stats?.utm_sources && stats.utm_sources.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.utm_sources} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis 
                                        dataKey="name" 
                                        type="category" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fill: '#64748b', fontSize: 11, fontWeight: 'bold'}}
                                        width={100}
                                    />
                                    <Tooltip 
                                        cursor={{fill: 'transparent'}}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                                        {stats.utm_sources.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300">
                                <Filter className="w-10 h-10 mb-2 opacity-20" />
                                <p className="text-[10px] font-bold uppercase tracking-widest">No UTM data tracked yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Top Referrers */}
                <div className="card-surface p-8 rounded-[2rem]">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-amber-500" />
                        Organic Referrers
                    </h3>
                    <div className="space-y-3">
                        {stats?.referrers.map((ref, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[10px] font-black text-indigo-600">
                                        {idx + 1}
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-700 uppercase">{ref.name}</span>
                                </div>
                                <span className="text-xs font-black text-slate-900">{ref.value} <span className="text-[9px] text-slate-400 font-bold ml-1">VIEWS</span></span>
                            </div>
                        ))}
                        {(!stats?.referrers || stats.referrers.length === 0) && (
                            <p className="text-center py-10 text-slate-300 text-[10px] font-bold uppercase">No referrer data found</p>
                        )}
                    </div>
                </div>
            </div>

            {/* SEO Gaps (Zero Result Searches) */}
            <div className="card-surface p-8 rounded-[2rem] border-rose-100/50">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-sm font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                            <SearchX className="w-4 h-4" />
                            SEO Intelligence (Zero Results)
                        </h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Content users are looking for but we don't have yet</p>
                    </div>
                    <div className="h-6 px-3 rounded-full bg-rose-50 text-rose-600 text-[8px] font-black uppercase flex items-center animate-pulse">
                        Opportunity List
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats?.zero_searches.map((s, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-rose-200 transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="px-2 py-1 bg-slate-50 rounded-lg text-[8px] font-black text-slate-400 uppercase">
                                    {s.location}
                                </div>
                                <span className="text-rose-500 text-xs font-black">×{s.value}</span>
                            </div>
                            <p className="text-sm font-black text-slate-900 mb-1 group-hover:text-rose-600 transition-colors uppercase truncate">"{s.name}"</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Highly Requested Topic</p>
                        </div>
                    ))}
                    {(!stats?.zero_searches || stats.zero_searches.length === 0) && (
                        <div className="col-span-full py-20 text-center text-slate-300">
                            <Search className="w-12 h-12 mx-auto mb-4 opacity-10" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">No zero-result searches captured yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
