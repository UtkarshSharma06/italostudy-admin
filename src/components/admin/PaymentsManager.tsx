import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Wallet, TrendingUp, AlertCircle, Search,
    Download, Users, ArrowUpRight, CheckCircle2,
    XCircle, Clock, CreditCard, Trash2, FileText,
    RefreshCw
} from 'lucide-react';
import { generateInvoice } from '@/utils/invoiceGenerator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths, subYears } from 'date-fns';

interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
    payment_method: 'stripe' | 'razorpay' | 'paypal' | 'lemonsqueezy';
    created_at: string;
    user_id: string;
    plan_id: string;
    // We'll join profile data
    profiles?: {
        display_name: string;
        email: string;
        group_id?: string; // Avatar logic if available
    }
}

const ProviderIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'stripe':
            return <div className="w-8 h-8 rounded-lg bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center font-bold text-[10px] tracking-tight">STR</div>;
        case 'paypal':
            return <div className="w-8 h-8 rounded-lg bg-[#003087]/10 text-[#003087] flex items-center justify-center font-bold text-[10px] tracking-tight">PAL</div>;
        case 'razorpay':
            return <div className="w-8 h-8 rounded-lg bg-[#3395FF]/10 text-[#3395FF] flex items-center justify-center font-bold text-[10px] tracking-tight">RZR</div>;
        case 'lemonsqueezy':
            return <div className="w-8 h-8 rounded-lg bg-[#FFC233]/10 text-[#FFC233] flex items-center justify-center font-bold text-[10px] tracking-tight">LMN</div>;
        default:
            return <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center"><CreditCard size={14} /></div>;
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
        pending: "bg-amber-50 text-amber-600 border-amber-100",
        failed: "bg-rose-50 text-rose-600 border-rose-100",
        refunded: "bg-slate-50 text-slate-500 border-slate-100"
    };

    const icons = {
        completed: <CheckCircle2 size={12} />,
        pending: <Clock size={12} />,
        failed: <XCircle size={12} />,
        refunded: <ArrowUpRight size={12} />
    };

    return (
        <span className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
            styles[status as keyof typeof styles] || styles.pending
        )}>
            {icons[status as keyof typeof icons]}
            {status}
        </span>
    );
};

export default function PaymentsManager() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, count: 0, failed: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const [timeframe, setTimeframe] = useState('6m');
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 10;

    useEffect(() => {
        fetchTransactions();
    }, [timeframe]);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            let query = supabase
                .from('transactions')
                .select(`
                    *,
                    profiles (
                        display_name,
                        email
                    )
                `)
                .neq('plan_id', 'explorer');

            if (timeframe !== 'all') {
                let startDate = new Date();
                if (timeframe === '7d') startDate = subDays(new Date(), 7);
                else if (timeframe === '30d') startDate = subDays(new Date(), 30);
                else if (timeframe === '3m') startDate = subMonths(new Date(), 3);
                else if (timeframe === '6m') startDate = subMonths(new Date(), 6);
                else if (timeframe === '1y') startDate = subYears(new Date(), 1);

                query = query.gte('created_at', startDate.toISOString());
            }

            const { data, error } = await query.order('created_at', { ascending: false });

            if (error) throw error;

            const txs = data || [];
            setTransactions(txs);

            // Calc stats
            // Calc stats in EUR
            const total = txs
                .filter(t => t.status === 'completed')
                .reduce((acc, t) => {
                    const amount = Number(t.amount);
                    if (t.currency === 'EUR') return acc + amount;

                    // Conversion logic (matching useCurrency logic but in reverse)
                    const rates: Record<string, number> = {
                        'USD': 1.08, 'INR': 106.6, 'GBP': 0.86, 'NGN': 1750
                    };
                    const rate = rates[t.currency] || 1;
                    return acc + (amount / rate);
                }, 0);

            setStats({
                total,
                count: txs.length,
                failed: txs.filter(t => t.status === 'failed').length
            });

        } catch (err) {
            toast.error('Failed to load transactions');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTransaction = async (id: string) => {
        if (!window.confirm('Are you sure you want to permanently delete this transaction record? This cannot be undone.')) return;

        try {
            const { error } = await supabase
                .from('transactions')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setTransactions(prev => prev.filter(t => t.id !== id));
            toast.success('Transaction deleted');
        } catch (err) {
            console.error('Delete error:', err);
            toast.error('Failed to delete transaction');
        }
    };

    const handleDownloadCSV = () => {
        if (transactions.length === 0) {
            toast.error('No data to export');
            return;
        }

        const headers = ['ID', 'Customer', 'Email', 'Amount (EUR Equivalent)', 'Captured Amount', 'Currency', 'Status', 'Method', 'Plan', 'Date'];
        const csvData = transactions.map(tx => {
            const eurAmount = tx.currency === 'EUR' ? tx.amount : (Number(tx.amount) / ({ 'INR': 106.6, 'USD': 1.08, 'GBP': 0.86 }[tx.currency] || 1)).toFixed(2);
            return [
                tx.id,
                tx.profiles?.display_name || 'Unknown',
                tx.profiles?.email || 'N/A',
                eurAmount,
                tx.amount,
                tx.currency,
                tx.status,
                tx.payment_method,
                tx.plan_id || 'N/A',
                format(new Date(tx.created_at), 'yyyy-MM-dd HH:mm')
            ].join(',');
        });

        const csvContent = [headers.join(','), ...csvData].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `italostudy-payments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('CSV Downloaded');
    };

    const filteredTransactions = transactions.filter(tx => {
        const query = searchQuery.toLowerCase();
        return (
            (tx.profiles?.display_name?.toLowerCase() || '').includes(query) ||
            (tx.profiles?.email?.toLowerCase() || '').includes(query) ||
            tx.id.toLowerCase().includes(query) ||
            (tx.plan_id?.toLowerCase() || '').includes(query)
        );
    });

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                        <Wallet className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Total Revenue</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            €{stats.total.toLocaleString()}
                        </h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                        <TrendingUp className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Total Transactions</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {stats.count}
                        </h3>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600">
                        <AlertCircle className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-400">Failed Payments</p>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            {stats.failed}
                        </h3>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                        <p className="text-xs text-slate-400 font-medium mt-1">Real-time payment audit log</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        {/* Timeframe Selector */}
                        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                            {['7d', '30d', '3m', '6m', '1y', 'all'].map((tf) => (
                                <button
                                    key={tf}
                                    onClick={() => { setTimeframe(tf); setCurrentPage(1); }}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                        timeframe === tf
                                            ? "bg-white dark:bg-slate-700 text-indigo-600 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                                    )}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search user or plan..."
                                className="pl-9 h-10 w-64 rounded-xl bg-slate-50 border-slate-200"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-slate-50 transition-colors"
                            onClick={() => fetchTransactions()}
                            disabled={isLoading}
                        >
                            <RefreshCw className={cn("w-4 h-4 text-slate-400", isLoading && "animate-spin")} />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                            onClick={handleDownloadCSV}
                        >
                            <Download size={16} />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                            <tr>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Amount</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4">Method</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {paginatedTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
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
                                    <td className="px-8 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                                €{tx.currency === 'EUR' ? tx.amount : (Number(tx.amount) / ({ 'INR': 106.6, 'USD': 1.08, 'GBP': 0.86 }[tx.currency] || 1)).toFixed(2)}
                                            </span>
                                            {tx.currency !== 'EUR' && (
                                                <span className="text-[9px] text-slate-400 font-bold uppercase">
                                                    Captured: {tx.currency === 'INR' ? '₹' : tx.currency === 'USD' ? '$' : ''}{tx.amount}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold ml-1">{tx.plan_id ? `for ${tx.plan_id}` : ''}</span>
                                    </td>
                                    <td className="px-8 py-4">
                                        <StatusBadge status={tx.status} />
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <ProviderIcon type={tx.payment_method} />
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 capitalize">
                                                {tx.payment_method}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="text-xs font-bold text-slate-400">
                                            {format(new Date(tx.created_at), 'MMM d, yyyy')}
                                        </span>
                                        <p className="text-[10px] text-slate-300 font-medium">
                                            {format(new Date(tx.created_at), 'HH:mm')}
                                        </p>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {tx.status === 'completed' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 rounded-lg text-indigo-600 hover:bg-indigo-50"
                                                    onClick={() => generateInvoice(tx, tx.profiles)}
                                                    title="Download Invoice"
                                                >
                                                    <FileText size={14} />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:bg-rose-50"
                                                onClick={() => handleDeleteTransaction(tx.id)}
                                                title="Delete Transaction"
                                            >
                                                <Trash2 size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {transactions.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, transactions.length)} of {transactions.length} entries
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest"
                            >
                                Previous
                            </Button>
                            {[...Array(totalPages)].map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={cn(
                                        "w-9 h-9 p-0 rounded-xl text-[10px] font-black",
                                        currentPage === i + 1 ? "bg-indigo-600" : ""
                                    )}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
