import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Loader2, TrendingUp, TrendingDown, Users, Wallet, Zap, Target, RefreshCw, FileSpreadsheet, ArrowUpRight, BarChart3, Globe, Award } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, differenceInDays, startOfDay, endOfDay, subDays, subYears } from 'date-fns';
import { cn } from '@/lib/utils';
import { generateExcelReport, type ReportTimeframe } from '@/utils/excelReportGenerator';
import { useToast } from '@/hooks/use-toast';

const EUR_RATES: Record<string, number> = { USD: 1.08, INR: 106.6, GBP: 0.86, NGN: 1750 };
const toEUR = (amount: number, currency: string) =>
    currency === 'EUR' ? amount : amount / (EUR_RATES[currency] || 1);

const PLAN_COLORS: Record<string, string> = { global: '#6366f1', pro: '#10b981', free: '#94a3b8', explorer: '#94a3b8' };
const CHART_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

function KPICard({ label, value, sub, icon: Icon, trend, color = 'indigo' }: any) {
    const positive = trend >= 0;
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                {trend !== undefined && (
                    <div className={cn('flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg', positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                        {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(trend).toFixed(1)}%
                    </div>
                )}
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mt-1">{label}</p>
            {sub && <p className="text-[9px] font-bold text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg inline-block">{sub}</p>}
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-xl text-xs">
            <p className="font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} className="font-bold" style={{ color: p.color }}>{p.name}: {p.value}</p>
            ))}
        </div>
    );
};

export default function InvestorDashboard() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);
    const [timeframe, setTimeframe] = useState<ReportTimeframe>('6m');
    const [data, setData] = useState<any>(null);

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        try {
            const to = endOfDay(new Date());
            let from: Date | null = null;
            if (timeframe === '30d') from = startOfDay(subDays(new Date(), 30));
            else if (timeframe === '3m') from = startOfDay(subMonths(new Date(), 3));
            else if (timeframe === '6m') from = startOfDay(subMonths(new Date(), 6));
            else if (timeframe === '1y') from = startOfDay(subYears(new Date(), 1));

            const applyFilter = (query: any) => {
                if (from) return query.gte('created_at', from.toISOString()).lte('created_at', to.toISOString());
                return query.lte('created_at', to.toISOString());
            };

            const [txRes, profileRes, sessionRes, ieltsRes] = await Promise.all([
                applyFilter(supabase.from('transactions').select('id,amount,currency,status,plan_id,created_at,user_id')
                    .neq('plan_id', 'explorer').neq('plan_id', 'STORE_ORDER')),
                applyFilter(supabase.from('profiles').select('id,subscription_tier,selected_plan,country,created_at,email,last_sign_in_at,utm_source')),
                applyFilter(supabase.from('tests').select('id,exam_type,created_at').eq('is_mock', true)),
                applyFilter(supabase.from('mock_exam_submissions').select('id,created_at'))
            ]);

            const txs = txRes.data || [];
            const profiles = profileRes.data || [];
            const sessions = sessionRes.data || [];
            const ieltsSessions = ieltsRes.data || [];

            // ── REVENUE ──────────────────────────────────────────────────
            const completed = txs.filter((t: any) => t.status === 'completed');
            const now = new Date();
            const thisMonthStart = startOfMonth(now);
            const lastMonthStart = startOfMonth(subMonths(now, 1));
            const lastMonthEnd = endOfMonth(subMonths(now, 1));

            const mrrCurrent = completed
                .filter((t: any) => new Date(t.created_at) >= thisMonthStart)
                .reduce((s: number, t: any) => s + toEUR(Number(t.amount), t.currency), 0);

            const mrrLast = completed
                .filter((t: any) => new Date(t.created_at) >= lastMonthStart && new Date(t.created_at) <= lastMonthEnd)
                .reduce((s: number, t: any) => s + toEUR(Number(t.amount), t.currency), 0);

            const totalRevenue = completed.reduce((s: number, t: any) => s + toEUR(Number(t.amount), t.currency), 0);
            const mrrGrowth = mrrLast > 0 ? ((mrrCurrent - mrrLast) / mrrLast) * 100 : 0;
            const arr = mrrCurrent * 12;

            // ── MONTHLY TREND (12 months) ─────────────────────────────────
            const revenueByMonth: Record<string, number> = {};
            const signupsByMonth: Record<string, number> = {};
            for (let i = 11; i >= 0; i--) {
                const d = subMonths(now, i);
                const key = format(d, 'MMM yy');
                revenueByMonth[key] = 0;
                signupsByMonth[key] = 0;
            }
            completed.forEach((t: any) => {
                const key = format(new Date(t.created_at), 'MMM yy');
                if (revenueByMonth[key] !== undefined) revenueByMonth[key] += toEUR(Number(t.amount), t.currency);
            });
            profiles.forEach((p: any) => {
                const key = format(new Date(p.created_at), 'MMM yy');
                if (signupsByMonth[key] !== undefined) signupsByMonth[key] = (signupsByMonth[key] || 0) + 1;
            });
            const monthlyRevenue = Object.entries(revenueByMonth).map(([month, revenue]) => ({ month, revenue: Math.round(revenue as number), users: signupsByMonth[month] || 0 }));

            // ── USERS ─────────────────────────────────────────────────────
            const totalUsers = profiles.length;
            const newThisMonth = profiles.filter((p: any) => new Date(p.created_at) >= thisMonthStart).length;
            const newLastMonth = profiles.filter((p: any) => new Date(p.created_at) >= lastMonthStart && new Date(p.created_at) <= lastMonthEnd).length;
            const userGrowth = newLastMonth > 0 ? ((newThisMonth - newLastMonth) / newLastMonth) * 100 : 0;

            const planCounts = profiles.reduce((acc: any, p: any) => {
                const plan = p.subscription_tier || 'free';
                acc[plan] = (acc[plan] || 0) + 1;
                return acc;
            }, {});
            const planData = Object.entries(planCounts).map(([name, value]) => ({ name: name === 'free' ? 'Explorer' : name.charAt(0).toUpperCase() + name.slice(1), value, pct: Math.round(((value as number) / totalUsers) * 100) }));

            const payingUsers = profiles.filter((p: any) => 
                ['global', 'elite', 'pro'].includes(p.subscription_tier) || 
                ['global', 'elite', 'pro'].includes(p.selected_plan)
            ).length;
            const conversionRate = totalUsers > 0 ? (payingUsers / totalUsers) * 100 : 0;
            const arpu = payingUsers > 0 ? totalRevenue / payingUsers : 0;

            // ── GEOGRAPHY ────────────────────────────────────────────────
            const countryCounts = profiles.reduce((acc: any, p: any) => {
                const c = p.country || 'Unknown';
                acc[c] = (acc[c] || 0) + 1;
                return acc;
            }, {});
            const topCountries = Object.entries(countryCounts)
                .sort((a: any, b: any) => b[1] - a[1])
                .slice(0, 8)
                .map(([country, count]) => ({ country, count, pct: Math.round(((count as number) / totalUsers) * 100) }));

            // ── PAYMENT HEALTH ────────────────────────────────────────────
            const failedTx = txs.filter((t: any) => t.status === 'failed').length;
            const failureRate = txs.length > 0 ? (failedTx / txs.length) * 100 : 0;

            // ── REAL ENGAGEMENT (DAU/MAU) ─────────────────────────────────
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            
            const dau = profiles.filter((p: any) => p.last_sign_in_at && new Date(p.last_sign_in_at) >= oneDayAgo).length;
            const mau = profiles.filter((p: any) => p.last_sign_in_at && new Date(p.last_sign_in_at) >= thirtyDaysAgo).length;

            // ── ACQUISITION SOURCES ───────────────────────────────────────
            const sourceCounts = profiles.reduce((acc: any, p: any) => {
                const s = p.utm_source || 'Organic/Direct';
                acc[s] = (acc[s] || 0) + 1;
                return acc;
            }, {});
            const acquisitionData = Object.entries(sourceCounts)
                .sort((a: any, b: any) => b[1] - a[1])
                .slice(0, 5)
                .map(([source, count]) => ({ source, count }));

            // ── SESSIONS ─────────────────────────────────────────────────
            const examCounts = sessions.reduce((acc: any, s: any) => {
                const e = s.exam_type || 'Other';
                acc[e] = (acc[e] || 0) + 1;
                return acc;
            }, {});
            
            // Inject IELTS mock exam submissions manually since they use a different table structure
            if (ieltsSessions.length > 0) {
                examCounts['IELTS'] = (examCounts['IELTS'] || 0) + ieltsSessions.length;
            }

            const examData = Object.entries(examCounts).map(([exam, count]) => ({ exam: exam.replace('-prep', '').toUpperCase(), count }));

            setData({
                mrrCurrent, mrrLast, mrrGrowth, arr, totalRevenue,
                totalUsers, newThisMonth, userGrowth, payingUsers,
                conversionRate, arpu, failureRate, failedTx,
                monthlyRevenue, planData, topCountries, examData,
                dau, mau, acquisitionData
            });
        } catch (err: any) {
            toast({ variant: 'destructive', title: 'Failed to load investor data', description: err.message });
        } finally {
            setIsLoading(false);
        }
    }, [toast, timeframe]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await generateExcelReport(timeframe);
            toast({ title: '✅ Report exported' });
        } catch (e: any) {
            toast({ variant: 'destructive', title: 'Export failed', description: e.message });
        } finally { setIsExporting(false); }
    };

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Loading investor data...</p>
        </div>
    );

    if (!data) return null;

    const mrrFormatted = `€${Math.round(data.mrrCurrent).toLocaleString()}`;
    const arrFormatted = `€${Math.round(data.arr).toLocaleString()}`;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Investor Dashboard</h2>
                    </div>
                    <p className="text-xs font-medium text-slate-400 ml-[52px]">Real-time business metrics — MRR, ARR, growth & unit economics</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        {(['30d', '3m', '6m', '1y', 'all'] as ReportTimeframe[]).map(tf => (
                            <button key={tf} onClick={() => setTimeframe(tf)}
                                className={cn('px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',
                                    timeframe === tf ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500')}>
                                {tf}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchAll} className="gap-2 rounded-xl">
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </Button>
                    <Button size="sm" className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold" onClick={handleExport} disabled={isExporting}>
                        {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
                        Export Excel
                    </Button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard label="MRR" value={mrrFormatted} sub={`ARR: ${arrFormatted}`} icon={Wallet} trend={data.mrrGrowth} color="indigo" />
                <KPICard label="Total Revenue" value={`€${Math.round(data.totalRevenue).toLocaleString()}`} sub="All time (EUR)" icon={TrendingUp} color="emerald" />
                <KPICard label="Total Students" value={data.totalUsers.toLocaleString()} sub={`+${data.newThisMonth} this month`} icon={Users} trend={data.userGrowth} color="violet" />
                <KPICard label="Paying Users" value={data.payingUsers.toLocaleString()} sub={`${data.conversionRate.toFixed(1)}% conversion`} icon={Zap} color="amber" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <KPICard label="DAU" value={data.dau.toLocaleString()} sub="Daily Active Users" icon={Users} color="emerald" />
                <KPICard label="MAU" value={data.mau.toLocaleString()} sub="Monthly Active Users" icon={Users} color="indigo" />
                <KPICard label="Conversion Rate" value={`${data.conversionRate.toFixed(1)}%`} sub="Free → Paid" icon={ArrowUpRight} color="violet" />
                <KPICard label="ARPU" value={`€${Math.round(data.arpu)}`} sub="Avg revenue / paying user" icon={Target} color="amber" />
                <KPICard label="Payment Failures" value={data.failedTx} sub={`${data.failureRate.toFixed(1)}% failure rate`} icon={TrendingDown} color="rose" />
            </div>

            {/* Revenue + User Growth Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Monthly Revenue</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">EUR equivalent · Last 12 months</p>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={data.monthlyRevenue}>
                            <defs>
                                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }} tickFormatter={v => `€${v}`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="revenue" name="Revenue (€)" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">User Growth</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">New signups per month · Last 12 months</p>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={data.monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 'bold' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="users" name="New Users" radius={[6, 6, 0, 0]} fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Plan Breakdown + Geography */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Plan Breakdown</h3>
                    <div className="flex items-center gap-8">
                        <ResponsiveContainer width={160} height={160}>
                            <PieChart>
                                <Pie data={data.planData} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3}>
                                    {data.planData.map((entry: any, i: number) => (
                                        <Cell key={i} fill={PLAN_COLORS[entry.name.toLowerCase()] || CHART_COLORS[i]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-3">
                            {data.planData.map((p: any, i: number) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ background: PLAN_COLORS[p.name.toLowerCase()] || CHART_COLORS[i] }} />
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{p.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-black text-slate-900 dark:text-white">{p.value}</span>
                                        <span className="text-[9px] font-bold text-slate-400 ml-2">{p.pct}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Globe className="w-4 h-4 text-indigo-500" />
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Top Countries</h3>
                    </div>
                    <div className="space-y-3">
                        {data.topCountries.map((c: any, i: number) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-400 w-4">{i + 1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.country}</span>
                                        <span className="text-[10px] font-black text-slate-400">{c.count} · {c.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-indigo-500 transition-all duration-700" style={{ width: `${c.pct}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Exam Popularity & Acquisition */}
            <div className="grid lg:grid-cols-2 gap-6">
                {data.examData.length > 0 && (
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">Mock Sessions by Exam Type</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={data.examData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="count" name="Sessions" radius={[8, 8, 0, 0]} barSize={48}>
                                    {data.examData.map((_: any, i: number) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6">User Acquisition Channels</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data.acquisitionData} layout="vertical" margin={{ top: 0, right: 0, left: 30, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                            <YAxis type="category" dataKey="source" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" name="Users" radius={[0, 8, 8, 0]} barSize={24} fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Investor Summary Card */}
            <div className="bg-slate-900 dark:bg-slate-950 p-10 rounded-[2.5rem] text-white">
                <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-slate-300">📊 Investor Summary Snapshot</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'MRR', value: mrrFormatted, note: `${data.mrrGrowth >= 0 ? '+' : ''}${data.mrrGrowth.toFixed(1)}% MoM` },
                        { label: 'ARR', value: arrFormatted, note: 'Annualized run rate' },
                        { label: 'Total Users', value: data.totalUsers.toLocaleString(), note: `+${data.newThisMonth} this month` },
                        { label: 'Conversion', value: `${data.conversionRate.toFixed(1)}%`, note: 'Free → Paid' },
                        { label: 'ARPU', value: `€${Math.round(data.arpu)}`, note: 'Per paying user' },
                        { label: 'Paying Users', value: data.payingUsers.toString(), note: `of ${data.totalUsers} total` },
                        { label: 'Total Revenue', value: `€${Math.round(data.totalRevenue).toLocaleString()}`, note: 'All time' },
                        { label: 'Failure Rate', value: `${data.failureRate.toFixed(1)}%`, note: `${data.failedTx} failed payments` },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.label}</p>
                            <p className="text-xl font-black text-white">{item.value}</p>
                            <p className="text-[9px] font-bold text-slate-500 mt-1">{item.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
