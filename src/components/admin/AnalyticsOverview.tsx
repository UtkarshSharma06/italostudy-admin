import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
    Users,
    MousePointer2,
    Zap,
    Trophy,
    TrendingUp,
    ShieldAlert,
    Clock,
    UserCheck,
    ArrowUpRight,
    ArrowDownRight,
    Loader2,
    LineChart,
    ShieldCheck,
    RefreshCw,
    AlertCircle,
    Globe,
    Target,
    FileSpreadsheet,
    ChevronDown
} from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { generateExcelReport, type ReportTimeframe } from '@/utils/excelReportGenerator';

interface DashboardStats {
    total_users: number;
    new_users_today: number;
    total_visitors: number;
    unique_visitors_today: number;
    active_subscriptions: number;
    active_bans_count: number;
    // Real activity-based metrics
    weekly_active_users: number;
    monthly_active_users: number;
    unique_active_today: number;
    // Retention % (active / total)
    retention_rate_weekly: number;
    retention_rate_monthly: number;
    top_exams: { exam_type: string; count: number }[];
    recent_activity: { type: string; title: string; description: string; time: string }[];
    top_utm_source?: string;
    avg_mock_score?: number;         // real: AVG(score) from completed mocks
    total_practice_sessions?: number; // real: COUNT(*) from user_practice_responses
}

export default function AnalyticsOverview() {
    const { toast } = useToast();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState('');
    const [exportTimeframe, setExportTimeframe] = useState<ReportTimeframe>('30d');
    const [showExportMenu, setShowExportMenu] = useState(false);

    const fetchStats = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Fetching admin dashboard stats...");
            const { data, error } = await supabase.rpc('get_admin_dashboard_stats');

            if (error) {
                console.error("RPC Error:", error);
                throw error;
            }

            console.log("Dashboard stats received:", data);

            if (data) {
                setStats(data as unknown as DashboardStats);
            } else {
                setStats(null);
            }
        } catch (err: any) {
            console.error("Dashboard fetch error:", err);
            setError(err.message || "Failed to load dashboard data");
            toast({
                variant: "destructive",
                title: "Data Loading Error",
                description: "Could not fetch dashboard statistics. Please try refreshing."
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const handleExport = async () => {
        setIsExporting(true);
        setExportProgress('Starting export...');
        setShowExportMenu(false);
        try {
            const fileName = await generateExcelReport(exportTimeframe, setExportProgress);
            toast({ title: '✅ Export Ready', description: `Saved as ${fileName}` });
        } catch (err: any) {
            toast({ variant: 'destructive', title: 'Export Failed', description: err.message || 'Could not generate report.' });
        } finally {
            setIsExporting(false);
            setExportProgress('');
        }
    };

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const formatExamLabel = (type: string) => {
        const labels: Record<string, string> = {
            'cent-s-prep': 'CEnT-S',
            'imat-prep': 'IMAT',
            'sat-prep': 'SAT',
            'ielts-academic': 'IELTS',
            'general': 'Practice'
        };
        return labels[type] || type.toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading stats...</p>
            </div>
        );
    }

    const metricCards = [
        {
            label: 'Total Students',
            value: stats?.total_users || 0,
            subValue: `+${stats?.new_users_today || 0} joined today`,
            icon: Users,
            color: 'indigo'
        },
        {
            label: 'Active Plans',
            value: stats?.active_subscriptions || 0,
            subValue: 'Elite & Pro members',
            icon: Zap,
            color: 'amber'
        },
        {
            label: 'Active Last 7 Days',
            value: stats?.weekly_active_users ?? 0,
            subValue: `${stats?.retention_rate_weekly ?? 0}% of all students`,
            icon: TrendingUp,
            color: 'emerald'
        },
        {
            label: 'Active Last 30 Days',
            value: stats?.monthly_active_users ?? 0,
            subValue: `${stats?.retention_rate_monthly ?? 0}% of all students`,
            icon: UserCheck,
            color: 'rose'
        },
        {
            label: 'Unique Today',
            value: stats?.unique_active_today ?? 0,
            subValue: 'Distinct users active today',
            icon: ShieldCheck,
            color: 'violet'
        },
    ];

    const marketingCards = [
        {
            label: 'Top UTM Source',
            value: stats?.top_utm_source || 'Organic/Direct',
            subValue: 'Best paid acquisition channel',
            icon: Globe,
            color: 'indigo'
        },
        {
            label: 'Avg. Mock Score',
            value: stats?.avg_mock_score !== undefined ? `${stats.avg_mock_score}` : '—',
            subValue: 'Across all completed mock tests',
            icon: Target,
            color: 'amber'
        },
        {
            label: 'Practice Sessions',
            value: (stats?.total_practice_sessions || 0).toLocaleString(),
            subValue: 'Total questions answered on platform',
            icon: LineChart,
            color: 'emerald'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-none mb-2">Platform Overview</h2>
                    <p className="text-xs font-medium text-slate-400">Real-time tracking of platform growth and student activity</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading} className="gap-2 rounded-xl">
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>

                    {/* Export Report Button */}
                    <div className="relative">
                        <div className="flex items-center rounded-xl overflow-hidden border border-indigo-200 dark:border-indigo-800">
                            <Button
                                size="sm"
                                className="rounded-none rounded-l-xl bg-indigo-600 hover:bg-indigo-700 gap-2 font-bold"
                                onClick={handleExport}
                                disabled={isExporting}
                            >
                                {isExporting
                                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />{exportProgress || 'Exporting...'}</>
                                    : <><FileSpreadsheet className="w-3.5 h-3.5" />Export Excel</>}
                            </Button>
                            <button
                                className="h-full px-3 bg-indigo-600 hover:bg-indigo-700 border-l border-indigo-500 text-white transition-colors"
                                onClick={() => setShowExportMenu(p => !p)}
                                disabled={isExporting}
                            >
                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {showExportMenu && (
                            <div className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 p-3 min-w-[220px]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 px-2 mb-2">Select Time Period</p>
                                {(['7d', '30d', '3m', '6m', '1y', 'all'] as ReportTimeframe[]).map(tf => (
                                    <button
                                        key={tf}
                                        onClick={() => { setExportTimeframe(tf); setShowExportMenu(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                                            exportTimeframe === tf
                                                ? 'bg-indigo-50 text-indigo-600'
                                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        {tf === '7d' ? 'Last 7 Days' : tf === '30d' ? 'Last 30 Days' : tf === '3m' ? 'Last 3 Months' : tf === '6m' ? 'Last 6 Months' : tf === '1y' ? 'Last Year' : 'All Time'}
                                        {exportTimeframe === tf && <span className="float-right text-indigo-400">✓</span>}
                                    </button>
                                ))}
                                <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2 px-2">
                                    <p className="text-[9px] text-slate-400 font-bold">Includes: Transactions, Students, Sessions, Growth &amp; Plan Breakdown</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl border border-rose-100 dark:border-rose-900/50 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-xs font-bold">{error}</p>
                    <Button variant="ghost" size="sm" className="ml-auto h-8 text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/40" onClick={fetchStats}>Retry</Button>
                </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {metricCards.map((card, i) => (
                    <div key={i} className="card-surface p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-600`}>
                                <card.icon className="w-5 h-5" />
                            </div>
                            <div className="h-6 px-2 rounded-lg bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" />
                                Live
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 tracking-tight">{card.value.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-3">{card.label}</p>
                        <p className="text-[9px] font-bold text-slate-400 bg-slate-50 p-2 rounded-xl inline-block">{card.subValue}</p>
                    </div>
                ))}
            </div>

            {/* NEW: Marketing & Growth Quick Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-1000">
                {marketingCards.map((card, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-600`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">{card.label}</p>
                                <p className="text-lg font-black text-slate-900 dark:text-white truncate max-w-[140px] uppercase tracking-tight">{card.value}</p>
                                <p className="text-[9px] font-bold text-slate-400 mt-0.5">{card.subValue}</p>
                            </div>
                        </div>
                        {/* Decorative background icon */}
                        <card.icon className="absolute -bottom-4 -right-4 w-20 h-20 text-slate-100 dark:text-slate-800/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 -rotate-12" />
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Popular Exams Chart */}
                <div className="lg:col-span-2 card-surface p-8 rounded-[2rem]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-amber-500" />
                                Exam Popularity
                            </h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Practice session distribution by exam type</p>
                        </div>
                    </div>

                    <div className="h-72 w-full flex items-center justify-center relative">
                        {(!stats?.top_exams || stats.top_exams.length === 0) ? (
                            <div className="text-center">
                                <Trophy className="w-10 h-10 text-slate-100 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">No exam data recorded yet</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.top_exams}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="exam_type"
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={formatExamLabel}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{
                                            borderRadius: '16px',
                                            border: 'none',
                                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                            fontSize: '10px',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                                        {stats.top_exams.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Security Status */}
                <div className="card-surface p-8 rounded-[2rem] bg-slate-900 border-slate-800 text-white flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                        <ShieldCheck className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight mb-2">Security Monitor</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">IP tracking and user activity monitoring are active.</p>

                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-[10px] font-bold uppercase text-slate-500">Blocked IPs</span>
                            <span className="text-xs font-bold">{stats?.active_bans_count || 0}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                            <span className="text-[10px] font-bold uppercase text-slate-500">Status</span>
                            <span className="text-xs font-bold text-emerald-500 uppercase">Operational</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="card-surface p-8 rounded-[2rem]">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Recent Activity</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Live feed of student interactions</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {stats?.recent_activity?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                                    <UserCheck className="w-4 h-4 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-900 dark:text-white uppercase">{item.type || 'Activity'}</p>
                                    <p className="text-[9px] text-slate-500 font-medium uppercase">{item.title}: {item.description}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold text-slate-300 uppercase">
                                {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    )) || (
                            <div className="text-center py-8 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                No recent activity recorded
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
