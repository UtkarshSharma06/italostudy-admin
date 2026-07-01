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
    Award,
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
            const PAGE = 1000;

            // ── Paginated profiles (only columns needed for stats) ──────────────
            const fetchAllProfiles = async () => {
                let page = 0;
                const all: any[] = [];
                while (true) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('id, created_at, last_sign_in_at, utm_source, subscription_tier, subscription_expiry_date, is_banned')
                        .range(page * PAGE, (page + 1) * PAGE - 1);
                    if (error) throw error;
                    if (!data || data.length === 0) break;
                    all.push(...data);
                    if (data.length < PAGE) break;
                    page++;
                }
                return all;
            };

            // ── Paginated practice responses — used for total_practice_sessions stat only ──
            const fetchAllPractice = async () => {
                let page = 0;
                const all: any[] = [];
                while (true) {
                    const { data, error } = await supabase
                        .from('user_practice_responses')
                        .select('exam_type')
                        .range(page * PAGE, (page + 1) * PAGE - 1);
                    if (error) throw error;
                    if (!data || data.length === 0) break;
                    all.push(...data);
                    if (data.length < PAGE) break;
                    page++;
                }
                return all;
            };

            // ── Paginated COMPLETED tests — primary source for exam popularity ──
            // This is the most reliable source: every submitted test records exam_type
            // and total_questions, covering both practice and mock for all exam types.
            const fetchAllCompletedTests = async () => {
                let page = 0;
                const all: any[] = [];
                while (true) {
                    const { data, error } = await supabase
                        .from('tests')
                        .select('exam_type, total_questions')
                        .eq('status', 'completed')
                        .range(page * PAGE, (page + 1) * PAGE - 1);
                    if (error) throw error;
                    if (!data || data.length === 0) break;
                    all.push(...data);
                    if (data.length < PAGE) break;
                    page++;
                }
                return all;
            };

            const [profiles, practiceData, completedTestsData, recentTxRes] = await Promise.all([
                fetchAllProfiles(),
                fetchAllPractice(),
                fetchAllCompletedTests(),
                // Recent completed transactions for activity feed
                supabase.from('transactions')
                    .select('id, plan_id, created_at, profiles(display_name, email)')
                    .neq('plan_id', 'explorer')
                    .neq('plan_id', 'STORE_ORDER')
                    .eq('status', 'completed')
                    .order('created_at', { ascending: false })
                    .limit(10)
            ]);

            const now = new Date();
            const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0);
            const oneWeekAgo  = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000);
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

            // ── Core counts ─────────────────────────────────────────────────────
            const total_users     = profiles.length;
            const new_users_today = profiles.filter((p: any) => new Date(p.created_at) >= todayStart).length;

            // Active subscriptions: global plan AND expiry date is in the future (or no expiry = lifetime)
            const active_subscriptions = profiles.filter((p: any) => {
                const tier = (p.subscription_tier || '').toLowerCase();
                if (tier !== 'global') return false;
                if (!p.subscription_expiry_date) return true; // lifetime / no-expiry plan
                return new Date(p.subscription_expiry_date) > now;
            }).length;

            const active_bans_count = profiles.filter((p: any) => p.is_banned).length;

            const weekly_active_users  = profiles.filter((p: any) => p.last_sign_in_at && new Date(p.last_sign_in_at) >= oneWeekAgo).length;
            const monthly_active_users = profiles.filter((p: any) => p.last_sign_in_at && new Date(p.last_sign_in_at) >= thirtyDaysAgo).length;
            const unique_active_today  = profiles.filter((p: any) => p.last_sign_in_at && new Date(p.last_sign_in_at) >= todayStart).length;

            // ── Exam popularity — questions practiced per exam type ──────────────
            // Source: completed tests table (total_questions per completed test).
            // This is the most accurate signal — covers ALL test modes (practice &
            // mock) and ALL exam types without any arbitrary multipliers.

            // Normalize variant exam_type values → canonical form so duplicates merge.
            // The DB stores BOTH 'cent-s' (from mock_sessions) and 'cent-s-prep'
            // (from practice bank / activeExam.id). All variants roll into one key.
            const EXAM_TYPE_ALIASES: Record<string, string> = {
                // CEnT-S variants → canonical 'cent-s-prep' (matches exams.ts id)
                'cent-s':         'cent-s-prep',
                'cents':          'cent-s-prep',
                'cent_s':         'cent-s-prep',
                'cent-s prep':    'cent-s-prep',
                'cens-prep':      'cent-s-prep',
                'cens_prep':      'cent-s-prep',
                'cents-prep':     'cent-s-prep',
                'cens':           'cent-s-prep',
                'cen-s':          'cent-s-prep',
                'cen-s-prep':     'cent-s-prep',
                // IMAT variants
                'imat':           'imat-prep',
                // SAT variants
                'sat':            'sat-prep',
                // IELTS variants
                'ielts':          'ielts-academic',
                // Note: 'tolc-e' and 'til-i' are already the canonical IDs in exams.ts
                // — do NOT remap them.
            };
            const normalizeExamType = (raw: string): string => {
                const key = raw.toLowerCase().trim();
                return EXAM_TYPE_ALIASES[key] ?? raw;
            };

            const examCounts: Record<string, number> = {};

            // DEBUG: log all raw exam_type values from DB
            const rawExamTypes = new Set(completedTestsData.map((t: any) => t.exam_type));
            console.log('[Exam Popularity] Raw exam_type values from DB:', [...rawExamTypes]);

            completedTestsData.forEach((t: any) => {
                const type = normalizeExamType(t.exam_type || 'Other');
                const practiced = t.total_questions || 0;
                if (practiced > 0) {
                    examCounts[type] = (examCounts[type] || 0) + practiced;
                }
            });

            console.log('[Exam Popularity] Normalized counts:', examCounts);

            const top_exams = Object.entries(examCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([exam_type, count]) => ({ exam_type, count }));

            // ── UTM source distribution ──────────────────────────────────────
            const utmMap: Record<string, number> = {};
            profiles.forEach((p: any) => {
                if (p.utm_source) utmMap[p.utm_source] = (utmMap[p.utm_source] || 0) + 1;
            });
            const top_utm_source = Object.entries(utmMap).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

            const total_practice_sessions = practiceData.length;

            // ── Recent activity from transactions ────────────────────────────
            const recent_activity = (recentTxRes.data || []).map((tx: any) => ({
                type: 'Payment',
                title: (tx.profiles as any)?.display_name || 'Unknown User',
                description: `${(tx.plan_id || '').toUpperCase()} plan`,
                time: tx.created_at
            }));

            setStats({
                total_users,
                new_users_today,
                total_visitors: 0,         // page-view tracking disabled (DB writes turned off)
                unique_visitors_today: 0,  // page-view tracking disabled
                active_subscriptions,
                active_bans_count,
                weekly_active_users,
                monthly_active_users,
                unique_active_today,
                retention_rate_weekly:  total_users > 0 ? Math.round((weekly_active_users  / total_users) * 100) : 0,
                retention_rate_monthly: total_users > 0 ? Math.round((monthly_active_users / total_users) * 100) : 0,
                top_exams,
                recent_activity,
                top_utm_source,
                avg_mock_score: undefined, // Suppressed: IELTS/IMAT/CENT-S use incompatible score scales
                total_practice_sessions
            });
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
            'cent-s-prep':    'CEnT-S',
            'imat-prep':      'IMAT',
            'sat-prep':       'SAT',
            'ielts-academic': 'IELTS',
            'tolc-e':         'TOLC-E',
            'til-i':          'TIL-I',
            'general':        'Practice'
        };
        return labels[type] || type.replace(/-prep$/i, '').toUpperCase();
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
            subValue: `${stats?.retention_rate_weekly ?? 0}% 7-day engagement rate`,
            icon: TrendingUp,
            color: 'emerald'
        },
        {
            label: 'Active Last 30 Days',
            value: stats?.monthly_active_users ?? 0,
            subValue: `${stats?.retention_rate_monthly ?? 0}% 30-day engagement rate`,
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
            value: stats?.top_utm_source || 'None Tracked',
            subValue: 'Most common tracked signup source (partial — Google OAuth excluded)',
            icon: Globe,
            color: 'indigo'
        },
        {
            label: 'Mock Score',
            value: '—',
            subValue: 'Incomparable scales: IELTS band vs IMAT vs CENT-S',
            icon: Target,
            color: 'amber'
        },
        {
            label: 'Practice Sessions',
            value: (stats?.total_practice_sessions || 0).toLocaleString(),
            subValue: 'Total practice responses logged all-time',
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
                            <div className="h-6 px-2 rounded-lg bg-slate-50 text-slate-400 text-[8px] font-black uppercase flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Snapshot
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
                                <Award className="w-4 h-4 text-violet-500" />
                                Exam Popularity
                            </h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Questions practiced across all completed tests</p>
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
                                    <Bar dataKey="count" name="Questions Practiced" radius={[8, 8, 0, 0]} barSize={40}>
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
