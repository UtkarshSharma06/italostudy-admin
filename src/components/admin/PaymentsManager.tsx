import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Wallet, TrendingUp, AlertCircle, Search,
    Download, ArrowUpRight, CheckCircle2,
    XCircle, Clock, CreditCard, Trash2, FileText,
    RefreshCw, GraduationCap, Zap, Package
} from 'lucide-react';
import { generateInvoice } from '@/utils/invoiceGenerator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths, subYears } from 'date-fns';

// ── Unified transaction row ───────────────────────────────────────────────────
interface UnifiedTransaction {
    id: string;
    amount: number;
    currency: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
    payment_method: string;
    created_at: string;
    user_id: string;
    plan_id?: string;          // subscription only
    course_id?: string;        // course only
    course_title?: string;     // course only
    amount_eur?: number;       // course uses this
    txn_type: 'subscription' | 'course';
    profiles?: {
        display_name: string;
        email: string;
    };
}

// ── Provider icon ─────────────────────────────────────────────────────────────
const ProviderIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'stripe':
            return <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center font-bold text-[10px] tracking-tight">STR</div>;
        case 'paypal':
            return <div className="w-8 h-8 rounded-lg bg-[#003087]/10 text-[#003087] flex items-center justify-center font-bold text-[10px] tracking-tight">PAL</div>;
        case 'razorpay':
            return <div className="w-8 h-8 rounded-lg bg-[#3395FF]/10 text-[#3395FF] flex items-center justify-center font-bold text-[10px] tracking-tight">RZR</div>;
        case 'dodo':
        case 'dodopayments':
            return <div className="w-8 h-8 rounded-lg bg-[#6B21A8]/10 text-[#6B21A8] flex items-center justify-center font-bold text-[10px] tracking-tight">DDO</div>;
        case 'lemonsqueezy':
            return <div className="w-8 h-8 rounded-lg bg-[#FFC233]/10 text-[#FFC233] flex items-center justify-center font-bold text-[10px] tracking-tight">LMN</div>;
        default:
            return <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center"><CreditCard size={14} /></div>;
    }
};

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
        pending: "bg-amber-50 text-amber-600 border-amber-100",
        failed: "bg-rose-50 text-rose-600 border-rose-100",
        refunded: "bg-slate-50 text-slate-500 border-slate-100",
    };
    const icons: Record<string, JSX.Element> = {
        completed: <CheckCircle2 size={11} />,
        pending: <Clock size={11} />,
        failed: <XCircle size={11} />,
        refunded: <ArrowUpRight size={11} />,
    };
    return (
        <span className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border w-fit",
            styles[status] || styles.pending
        )}>
            {icons[status]}
            {status}
        </span>
    );
};

// ── Type badge ────────────────────────────────────────────────────────────────
const TypeBadge = ({ type }: { type: 'subscription' | 'course' }) => (
    <span className={cn(
        "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border w-fit",
        type === 'subscription'
            ? "bg-indigo-50 text-indigo-600 border-indigo-100"
            : "bg-violet-50 text-violet-600 border-violet-100"
    )}>
        {type === 'subscription' ? <Zap size={9} /> : <GraduationCap size={9} />}
        {type === 'subscription' ? 'Subscription' : 'Course'}
    </span>
);

// ── Conversion rates ──────────────────────────────────────────────────────────
const RATES: Record<string, number> = { 'USD': 1.08, 'INR': 106.6, 'GBP': 0.86, 'NGN': 1750 };
const CURRENCY_SYMBOLS: Record<string, string> = { 'USD': '$', 'EUR': '€', 'INR': '₹', 'GBP': '£', 'NGN': '₦' };
const toEur = (amount: number, currency: string) =>
    currency === 'EUR' ? amount : amount / (RATES[currency] || 1);

export default function PaymentsManager() {
    const [transactions, setTransactions] = useState<UnifiedTransaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ subscriptionRevenue: 0, courseRevenue: 0, count: 0, failed: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [timeframe, setTimeframe] = useState('6m');
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'subscription' | 'course'>('all');
    const itemsPerPage = 12;

    useEffect(() => { fetchTransactions(); }, [timeframe]);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            let startDate: Date | null = null;
            if (timeframe !== 'all') {
                if      (timeframe === '7d')  startDate = subDays(new Date(), 7);
                else if (timeframe === '30d') startDate = subDays(new Date(), 30);
                else if (timeframe === '3m')  startDate = subMonths(new Date(), 3);
                else if (timeframe === '6m')  startDate = subMonths(new Date(), 6);
                else if (timeframe === '1y')  startDate = subYears(new Date(), 1);
            }

            // ── Paginated subscription transactions ─────────────────────────────
            // NOTE: We do NOT use .select('*, profiles(...)') because the FK on
            // transactions.user_id points to auth.users, not public.profiles.
            // That auto-join silently returns null for coupon purchases.
            // Instead we fetch profiles manually (same pattern as course transactions).
            const fetchAllSubs = async () => {
                const PAGE = 1000;
                let page = 0;
                const all: any[] = [];
                while (true) {
                    let q = supabase
                        .from('transactions')
                        .select('*')
                        .neq('plan_id', 'explorer')
                        .neq('plan_id', 'STORE_ORDER')
                        .order('created_at', { ascending: false })
                        .range(page * PAGE, (page + 1) * PAGE - 1);
                    if (startDate) q = q.gte('created_at', startDate.toISOString());
                    const { data, error } = await q;
                    if (error) throw error;
                    if (!data || data.length === 0) break;
                    all.push(...data);
                    if (data.length < PAGE) break;
                    page++;
                }
                return all;
            };

            // ── Paginated course transactions ────────────────────────────────
            const fetchAllCourses = async () => {
                const PAGE = 1000;
                let page = 0;
                const all: any[] = [];
                while (true) {
                    let q = (supabase as any)
                        .from('course_transactions')
                        .select('*')
                        .order('created_at', { ascending: false })
                        .range(page * PAGE, (page + 1) * PAGE - 1);
                    if (startDate) q = q.gte('created_at', startDate.toISOString());
                    const { data, error } = await q;
                    if (error) throw error;
                    if (!data || data.length === 0) break;
                    all.push(...data);
                    if (data.length < PAGE) break;
                    page++;
                }
                return all;
            };

            const [subData, courseData] = await Promise.all([fetchAllSubs(), fetchAllCourses()]);

            // ── Manually fetch profiles for ALL user_ids (subs + courses) ────────
            // This is the reliable approach since transactions.user_id FK → auth.users
            // (not public.profiles), so Supabase auto-join doesn't work consistently.
            const allUserIds = Array.from(new Set(
                [...subData, ...courseData].map((t: any) => t.user_id).filter(Boolean)
            ));
            const profilesMap: Record<string, any> = {};

            if (allUserIds.length > 0) {
                for (let i = 0; i < allUserIds.length; i += 500) {
                    const chunk = allUserIds.slice(i, i + 500);
                    const { data: pData } = await supabase
                        .from('profiles')
                        .select('id, display_name, email')
                        .in('id', chunk);
                    if (pData) {
                        pData.forEach((p: any) => {
                            profilesMap[p.id] = p;
                        });
                    }
                }
            }

            // ── Merge & normalize ───────────────────────────────────────────
            const subs: UnifiedTransaction[] = subData.map((t: any) => ({
                ...t,
                txn_type: 'subscription' as const,
                amount: Number(t.amount),
                profiles: profilesMap[t.user_id] || null,
            }));

            const courses: UnifiedTransaction[] = courseData.map((t: any) => ({
                id: t.id,
                amount: Number(t.amount_eur),
                amount_eur: Number(t.amount_eur),
                currency: 'EUR',
                status: t.status,
                payment_method: t.payment_method || 'dodo',
                created_at: t.created_at,
                user_id: t.user_id,
                course_id: t.course_id,
                course_title: t.metadata?.course_title || 'Course',
                txn_type: 'course' as const,
                profiles: profilesMap[t.user_id] || null,
            }));

            const merged = [...subs, ...courses].sort(
                (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            setTransactions(merged);

            // ── Stats ────────────────────────────────────────────────────
            const subRevenue = subs
                .filter(t => t.status === 'completed')
                .reduce((acc, t) => acc + toEur(t.amount, t.currency), 0);
            const courseRevenue = courses
                .filter(t => t.status === 'completed')
                .reduce((acc, t) => acc + Number(t.amount_eur || t.amount), 0);
            const failed = merged.filter(t => t.status === 'failed').length;

            setStats({ subscriptionRevenue: subRevenue, courseRevenue, count: merged.length, failed });
        } catch (err) {
            toast.error('Failed to load transactions');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTransaction = async (tx: UnifiedTransaction) => {
        if (!window.confirm('Permanently delete this transaction record? This cannot be undone.')) return;
        try {
            const table = tx.txn_type === 'course' ? 'course_transactions' : 'transactions';
            const { error } = await (supabase as any).from(table).delete().eq('id', tx.id);
            if (error) throw error;
            setTransactions(prev => prev.filter(t => t.id !== tx.id));
            toast.success('Transaction deleted');
        } catch (err) {
            toast.error('Failed to delete transaction');
        }
    };

    const handleMarkAsPaid = async (tx: UnifiedTransaction) => {
        if (!window.confirm('Mark this transaction as Paid (completed)? This will only update the transaction record. You will still need to manually grant access to the user.')) return;
        try {
            const table = tx.txn_type === 'course' ? 'course_transactions' : 'transactions';
            const { error } = await (supabase as any).from(table).update({ status: 'completed' }).eq('id', tx.id);
            if (error) throw error;
            setTransactions(prev => prev.map(t => t.id === tx.id ? { ...t, status: 'completed' } : t));
            toast.success('Transaction marked as completed');
            // Refresh to update stats
            fetchTransactions();
        } catch (err) {
            toast.error('Failed to update transaction');
        }
    };

    const handleDownloadCSV = () => {
        if (transactions.length === 0) { toast.error('No data to export'); return; }
        const headers = ['ID', 'Type', 'Customer', 'Email', 'Amount (EUR)', 'Currency', 'Status', 'Method', 'Plan/Course', 'Date'];
        const csvData = filteredTransactions.map(tx => {
            const eurAmt = tx.txn_type === 'course' ? (tx.amount_eur || tx.amount).toFixed(2) : toEur(tx.amount, tx.currency).toFixed(2);
            return [
                tx.id,
                tx.txn_type,
                tx.profiles?.display_name || 'Unknown',
                tx.profiles?.email || 'N/A',
                eurAmt,
                tx.currency,
                tx.status,
                tx.payment_method,
                tx.txn_type === 'course' ? (tx.course_title || tx.course_id || 'N/A') : (tx.plan_id || 'N/A'),
                format(new Date(tx.created_at), 'yyyy-MM-dd HH:mm'),
            ].join(',');
        });
        const csv = [headers.join(','), ...csvData].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `italostudy-payments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('CSV Downloaded');
    };

    const handleDownloadInvoice = (tx: UnifiedTransaction) => {
        if (tx.txn_type === 'course') {
            generateInvoice(null, tx.profiles, 'course', tx);
        } else {
            generateInvoice(tx, tx.profiles, 'subscription');
        }
    };

    const filteredTransactions = transactions.filter(tx => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = (
            (tx.profiles?.display_name?.toLowerCase() || '').includes(q) ||
            (tx.profiles?.email?.toLowerCase() || '').includes(q) ||
            tx.id.toLowerCase().includes(q) ||
            (tx.plan_id?.toLowerCase() || '').includes(q) ||
            (tx.course_title?.toLowerCase() || '').includes(q)
        );
        const matchesType = typeFilter === 'all' || tx.txn_type === typeFilter;
        return matchesSearch && matchesType;
    });

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalRevenue = stats.subscriptionRevenue + stats.courseRevenue;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Stats Cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {/* Total Revenue */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400">Total Revenue</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            €{totalRevenue.toLocaleString('en-EU', { maximumFractionDigits: 0 })}
                        </h3>
                    </div>
                </div>

                {/* Subscription Revenue */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400">Subscriptions</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            €{stats.subscriptionRevenue.toLocaleString('en-EU', { maximumFractionDigits: 0 })}
                        </h3>
                    </div>
                </div>

                {/* Course Revenue */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center text-violet-600">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400">Course Revenue</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            €{stats.courseRevenue.toLocaleString('en-EU', { maximumFractionDigits: 0 })}
                        </h3>
                    </div>
                </div>

                {/* Failed */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-400">Failed Payments</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stats.failed}</h3>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">in selected period</p>
                    </div>
                </div>
            </div>

            {/* ── Transactions Table ───────────────────────────────────────── */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Table header controls */}
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Transactions</h3>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">Subscriptions + Course purchases · Live audit log</p>
                        </div>

                        <div className="flex flex-wrap gap-3 items-center">
                            {/* Type filter */}
                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                                {(['all', 'subscription', 'course'] as const).map((f) => (
                                    <button key={f}
                                        onClick={() => { setTypeFilter(f); setCurrentPage(1); }}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                            typeFilter === f
                                                ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}>
                                        {f}
                                    </button>
                                ))}
                            </div>

                            {/* Timeframe */}
                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                                {['7d', '30d', '3m', '6m', '1y', 'all'].map((tf) => (
                                    <button key={tf}
                                        onClick={() => { setTimeframe(tf); setCurrentPage(1); }}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                            timeframe === tf
                                                ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}>
                                        {tf}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <Input
                                    placeholder="Search user, plan, or course…"
                                    className="pl-9 h-10 w-64 rounded-xl bg-slate-50 border-slate-200"
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                />
                            </div>

                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-slate-50 transition-colors"
                                onClick={fetchTransactions} disabled={isLoading}>
                                <RefreshCw className={cn("w-4 h-4 text-slate-400", isLoading && "animate-spin")} />
                            </Button>

                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                onClick={handleDownloadCSV}>
                                <Download size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                            <tr>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Type</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Method</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {paginatedTransactions.map((tx) => (
                                <tr key={`${tx.txn_type}-${tx.id}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    {/* Customer */}
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                                                {tx.profiles?.display_name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                                    {tx.profiles?.display_name || 'Unknown User'}
                                                </p>
                                                <p className="text-xs text-slate-400">{tx.profiles?.email || 'No email'}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Type badge + descriptor */}
                                    <td className="px-8 py-4">
                                        <div className="space-y-1">
                                            <TypeBadge type={tx.txn_type} />
                                            <p className="text-[10px] text-slate-400 font-bold">
                                                {tx.txn_type === 'course'
                                                    ? (tx.course_title || tx.course_id || '—')
                                                    : (tx.plan_id ? `${tx.plan_id.toUpperCase()} PLAN` : '—')}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-8 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                                €{tx.txn_type === 'course'
                                                    ? Number(tx.amount_eur || tx.amount).toFixed(2)
                                                    : toEur(tx.amount, tx.currency).toFixed(2)}
                                            </span>
                                            {tx.txn_type === 'subscription' && tx.currency !== 'EUR' && (
                                                <span className="text-[9px] text-slate-400 font-bold uppercase">
                                                    {tx.currency === 'INR' ? '₹' : tx.currency === 'USD' ? '$' : tx.currency === 'GBP' ? '£' : tx.currency === 'NGN' ? '₦' : `${tx.currency} `}{tx.amount} captured
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-8 py-4"><StatusBadge status={tx.status} /></td>

                                    {/* Method */}
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <ProviderIcon type={tx.payment_method} />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 capitalize">
                                                {tx.payment_method}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="px-8 py-4">
                                        <span className="text-xs font-bold text-slate-400">
                                            {format(new Date(tx.created_at), 'MMM d, yyyy')}
                                        </span>
                                        <p className="text-[10px] text-slate-300 font-medium">
                                            {format(new Date(tx.created_at), 'HH:mm')}
                                        </p>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {tx.status === 'completed' && (
                                                <Button variant="ghost" size="sm"
                                                    className="h-8 w-8 p-0 rounded-lg text-indigo-600 hover:bg-indigo-50"
                                                    onClick={() => handleDownloadInvoice(tx)}
                                                    title="Download Invoice">
                                                    <FileText size={14} />
                                                </Button>
                                            )}
                                            {tx.status !== 'completed' && (
                                                <Button variant="ghost" size="sm"
                                                    className="h-8 w-8 p-0 rounded-lg text-emerald-600 hover:bg-emerald-50"
                                                    onClick={() => handleMarkAsPaid(tx)}
                                                    title="Mark as Paid">
                                                    <CheckCircle2 size={14} />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm"
                                                className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:bg-rose-50"
                                                onClick={() => handleDeleteTransaction(tx)}
                                                title="Delete Transaction">
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredTransactions.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={7} className="px-8 py-16 text-center">
                                        <Package className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                        <p className="text-slate-400 font-medium text-sm">No transactions found</p>
                                    </td>
                                </tr>
                            )}

                            {isLoading && (
                                <tr>
                                    <td colSpan={7} className="px-8 py-16 text-center">
                                        <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin mx-auto mb-2" />
                                        <p className="text-slate-400 text-xs font-medium">Loading transactions…</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">
                                Previous
                            </Button>
                            {[...Array(Math.min(totalPages, 7))].map((_, i) => (
                                <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={cn("w-9 h-9 p-0 rounded-xl text-[10px] font-black", currentPage === i + 1 ? "bg-indigo-600" : "")}>
                                    {i + 1}
                                </Button>
                            ))}
                            <Button variant="outline" size="sm" disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
