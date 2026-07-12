import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Wallet, AlertCircle, Search, Download, ArrowUpRight,
    CheckCircle2, XCircle, Clock, CreditCard, Trash2,
    FileText, RefreshCw, GraduationCap, Zap, Package, TrendingUp
} from 'lucide-react';
import { generateInvoice } from '@/utils/invoiceGenerator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format, subDays, subMonths, subYears } from 'date-fns';

interface UnifiedTransaction {
    id: string; amount: number; currency: string;
    status: 'completed' | 'pending' | 'failed' | 'refunded';
    payment_method: string; created_at: string; user_id: string;
    plan_id?: string; course_id?: string; course_title?: string;
    amount_eur?: number; txn_type: 'subscription' | 'course';
    profiles?: { display_name: string; email: string };
}

const FALLBACK_RATES: Record<string, number> = {
    USD: 1.14, GBP: 0.86, INR: 109,  TRY: 53.4,
    PKR: 318,  BDT: 122,  NGN: 1820, BRL: 5.88,
    MXN: 20.0, AED: 4.19, SAR: 4.28, EGP: 57,
    RON: 5.24, PLN: 4.31, HUF: 358,  CZK: 24.3,
    IDR: 20629, KRW: 1721, JPY: 185,  THB: 38.1,
};
const SYMBOLS: Record<string, string> = {
    EUR:'€', USD:'$', GBP:'£', INR:'₹', TRY:'₺',
    PKR:'₨', BDT:'৳', NGN:'₦', BRL:'R$ ', MXN:'$',
    AED:'AED ', SAR:'SAR ', EGP:'E£',
};
const getSym = (c: string) => SYMBOLS[c] ?? (c + ' ');

const ProviderIcon = ({ type }: { type: string }) => {
    const m: Record<string,{bg:string;tc:string;l:string}> = {
        stripe:{bg:'bg-[#635BFF]/10',tc:'text-[#635BFF]',l:'STR'},
        paypal:{bg:'bg-[#003087]/10',tc:'text-[#003087]',l:'PAL'},
        razorpay:{bg:'bg-[#3395FF]/10',tc:'text-[#3395FF]',l:'RZR'},
        dodo:{bg:'bg-[#6B21A8]/10',tc:'text-[#6B21A8]',l:'DDO'},
        dodopayments:{bg:'bg-[#6B21A8]/10',tc:'text-[#6B21A8]',l:'DDO'},
        lemonsqueezy:{bg:'bg-[#FFC233]/10',tc:'text-[#FFC233]',l:'LMN'},
    };
    const p = m[type];
    if (!p) return <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center"><CreditCard size={14} /></div>;
    return <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] tracking-tight',p.bg,p.tc)}>{p.l}</div>;
};

const StatusBadge = ({ status }: { status: string }) => {
    const m: Record<string,{cls:string;icon:JSX.Element}> = {
        completed:{cls:'bg-emerald-50 text-emerald-600 border-emerald-100',icon:<CheckCircle2 size={11}/>},
        pending:{cls:'bg-amber-50 text-amber-600 border-amber-100',icon:<Clock size={11}/>},
        failed:{cls:'bg-rose-50 text-rose-600 border-rose-100',icon:<XCircle size={11}/>},
        refunded:{cls:'bg-slate-50 text-slate-500 border-slate-100',icon:<ArrowUpRight size={11}/>},
    };
    const s = m[status] ?? m.pending;
    return <span className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border w-fit',s.cls)}>{s.icon}{status}</span>;
};

const TypeBadge = ({ type }: { type: 'subscription'|'course' }) => (
    <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border w-fit',
        type==='subscription'?'bg-indigo-50 text-indigo-600 border-indigo-100':'bg-violet-50 text-violet-600 border-violet-100')}>
        {type==='subscription'?<Zap size={9}/>:<GraduationCap size={9}/>}
        {type==='subscription'?'Subscription':'Course'}
    </span>
);
export default function PaymentsManager() {
    const [transactions, setTransactions]   = useState<UnifiedTransaction[]>([]);
    const [isLoading, setIsLoading]         = useState(true);
    const [ratesLoading, setRatesLoading]   = useState(true);
    const [liveRates, setLiveRates]         = useState<Record<string,number>>(FALLBACK_RATES);
    const [rateDate, setRateDate]           = useState('');
    const [stats, setStats]                 = useState({ subRev: 0, courseRev: 0, count: 0, failed: 0 });
    const [currentPage, setCurrentPage]     = useState(1);
    const [timeframe, setTimeframe]         = useState('6m');
    const [searchQuery, setSearchQuery]     = useState('');
    const [typeFilter, setTypeFilter]       = useState<'all'|'subscription'|'course'>('all');
    const itemsPerPage = 12;

    const toEur = useCallback((amount: number, currency: string) => {
        if (currency === 'EUR') return amount;
        const rate = liveRates[currency] ?? FALLBACK_RATES[currency] ?? 1;
        return amount / rate;
    }, [liveRates]);

    const getEurAmount = useCallback((tx: UnifiedTransaction) => {
        if (tx.txn_type === 'course') return Number(tx.amount_eur || tx.amount);
        return toEur(tx.amount, tx.currency);
    }, [toEur]);

    useEffect(() => {
        (async () => {
            setRatesLoading(true);
            try {
                // Fetch via Supabase Edge Function proxy to avoid browser CORS restrictions.
                // The proxy calls frankfurter.app (ECB) server-side and returns the rates.
                const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
                const res = await fetch(`${supabaseUrl}/functions/v1/get-exchange-rates`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                // frankfurter.app returns { date, rates: { INR: 108.9, ... } }
                // Note: EUR itself is not in the rates object (it's the base), we handle that in toEur()
                setLiveRates(data.rates as Record<string, number>);
                setRateDate(data.date ?? '');
            } catch (err: any) {
                console.warn('Live rate fetch failed, using fallback rates:', err.message);
                toast.info('Using approximate rates — deploy get-exchange-rates function for live rates');
            } finally {
                setRatesLoading(false);
            }
        })();
    }, []);

    const calcStats = useCallback((txns: UnifiedTransaction[]) => {
        const subs    = txns.filter(t => t.txn_type === 'subscription');
        const courses = txns.filter(t => t.txn_type === 'course');
        const subRev    = subs.filter(t => t.status === 'completed').reduce((a,t) => a + toEur(t.amount, t.currency), 0);
        const courseRev = courses.filter(t => t.status === 'completed').reduce((a,t) => a + Number(t.amount_eur || t.amount), 0);
        const failed    = txns.filter(t => t.status === 'failed').length;
        setStats({ subRev, courseRev, count: txns.length, failed });
    }, [toEur]);

    useEffect(() => { calcStats(transactions); }, [liveRates, calcStats]);
    useEffect(() => { fetchTransactions(); }, [timeframe]);

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            let startDate: Date|null = null;
            if (timeframe !== 'all') {
                if (timeframe==='7d')  startDate = subDays(new Date(),7);
                else if (timeframe==='30d') startDate = subDays(new Date(),30);
                else if (timeframe==='3m')  startDate = subMonths(new Date(),3);
                else if (timeframe==='6m')  startDate = subMonths(new Date(),6);
                else if (timeframe==='1y')  startDate = subYears(new Date(),1);
            }
            const pageAll = async (table: string, extra?: (q:any)=>any) => {
                const SZ=1000; let pg=0; const all: any[]=[];
                while(true) {
                    let q=(supabase as any).from(table).select('*').order('created_at',{ascending:false}).range(pg*SZ,(pg+1)*SZ-1);
                    if(extra) q=extra(q);
                    if(startDate) q=q.gte('created_at',startDate.toISOString());
                    const {data,error}=await q;
                    if(error) throw error;
                    if(!data||data.length===0) break;
                    all.push(...data);
                    if(data.length<SZ) break;
                    pg++;
                }
                return all;
            };
            const [subData, courseData] = await Promise.all([
                pageAll('transactions',(q)=>q.neq('plan_id','explorer').neq('plan_id','STORE_ORDER')),
                pageAll('course_transactions'),
            ]);
            const uids = Array.from(new Set([...subData,...courseData].map((t:any)=>t.user_id).filter(Boolean)));
            const pm: Record<string,any>={};
            for(let i=0;i<uids.length;i+=500){
                const {data:pd}=await supabase.from('profiles').select('id,display_name,email').in('id',uids.slice(i,i+500));
                if(pd) pd.forEach((p:any)=>{pm[p.id]=p;});
            }
            const subs: UnifiedTransaction[] = subData.map((t:any) => {
                let amt = Number(t.amount);
                // Fix for historical data bug where INR 549 was stored as 5.49
                if (t.currency === 'INR' && amt > 0 && amt < 100) {
                    amt = Math.round(amt * 100);
                }
                return {
                    ...t,
                    txn_type: 'subscription' as const,
                    amount: amt,
                    profiles: pm[t.user_id] ?? null
                };
            });
            const courses: UnifiedTransaction[] = courseData.map((t:any)=>({
                id:t.id,amount:Number(t.amount_eur),amount_eur:Number(t.amount_eur),currency:'EUR',
                status:t.status,payment_method:t.payment_method||'dodo',created_at:t.created_at,
                user_id:t.user_id,course_id:t.course_id,course_title:t.metadata?.course_title||'Course',
                txn_type:'course' as const,profiles:pm[t.user_id]??null,
            }));
            const merged = [...subs,...courses].sort((a,b)=>new Date(b.created_at).getTime()-new Date(a.created_at).getTime());
            setTransactions(merged);
            calcStats(merged);
        } catch { toast.error('Failed to load transactions'); }
        finally { setIsLoading(false); }
    };

    const handleDelete = async (tx: UnifiedTransaction) => {
        if(!window.confirm('Permanently delete this transaction? Cannot be undone.')) return;
        try {
            const {error}=await (supabase as any).from(tx.txn_type==='course'?'course_transactions':'transactions').delete().eq('id',tx.id);
            if(error) throw error;
            setTransactions(p=>p.filter(t=>t.id!==tx.id));
            toast.success('Transaction deleted');
        } catch { toast.error('Failed to delete'); }
    };

    const handleMarkPaid = async (tx: UnifiedTransaction) => {
        if(!window.confirm('Mark as paid? Remember to manually grant access to the user.')) return;
        try {
            const {error}=await (supabase as any).from(tx.txn_type==='course'?'course_transactions':'transactions').update({status:'completed'}).eq('id',tx.id);
            if(error) throw error;
            setTransactions(p=>p.map(t=>t.id===tx.id?{...t,status:'completed'}:t));
            toast.success('Marked as completed');
            fetchTransactions();
        } catch { toast.error('Failed to update'); }
    };

    const handleDownloadInvoice = (tx: UnifiedTransaction) => {
        if(tx.txn_type==='course') generateInvoice(null,tx.profiles,'course',tx);
        else generateInvoice(tx,tx.profiles,'subscription');
    };

    const filtered = transactions.filter(tx=>{
        const q=searchQuery.toLowerCase();
        const m=(tx.profiles?.display_name?.toLowerCase()||'').includes(q)||(tx.profiles?.email?.toLowerCase()||'').includes(q)||tx.id.toLowerCase().includes(q)||(tx.plan_id?.toLowerCase()||'').includes(q)||(tx.course_title?.toLowerCase()||'').includes(q);
        return m&&(typeFilter==='all'||tx.txn_type===typeFilter);
    });

    const handleCSV = () => {
        if(!filtered.length){toast.error('No data');return;}
        const h=['ID','Type','Customer','Email','EUR Amount','Captured Currency','Captured Amount','Status','Method','Plan/Course','Date'];
        const rows=filtered.map(tx=>[tx.id,tx.txn_type,tx.profiles?.display_name||'Unknown',tx.profiles?.email||'N/A',getEurAmount(tx).toFixed(2),tx.currency,tx.amount,tx.status,tx.payment_method,tx.txn_type==='course'?(tx.course_title||tx.course_id||'N/A'):(tx.plan_id||'N/A'),format(new Date(tx.created_at),'yyyy-MM-dd HH:mm')].join(','));
        const blob=new Blob([[h.join(','),...rows].join('\n')],{type:'text/csv'});
        const a=Object.assign(document.createElement('a'),{href:window.URL.createObjectURL(blob),download:`italostudy-payments-${format(new Date(),'yyyy-MM-dd')}.csv`});
        a.click();window.URL.revokeObjectURL(a.href);
        toast.success('CSV downloaded');
    };

    const totalPages = Math.ceil(filtered.length/itemsPerPage);
    const paginated  = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
    const totalRev   = stats.subRev + stats.courseRev;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Rate status banner */}
            <div className={cn('flex items-center gap-2 text-[10px] font-bold rounded-2xl px-4 py-2 w-fit border',
                ratesLoading ? 'text-slate-400 bg-slate-50 border-slate-100' : 'text-emerald-600 bg-emerald-50 border-emerald-100')}>
                {ratesLoading ? <RefreshCw size={12} className="animate-spin"/> : <TrendingUp size={12}/>}
                {ratesLoading ? 'Fetching live EUR exchange rates…' : `Live ECB rates · ${rateDate} · All non-EUR amounts converted in real-time`}
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                    {label:'Total Revenue',val:`€${totalRev.toLocaleString('en-EU',{maximumFractionDigits:0})}`,sub:'converted to EUR',icon:<Wallet className="w-6 h-6"/>,bg:'bg-indigo-50 dark:bg-indigo-900/20',tc:'text-indigo-600'},
                    {label:'Subscriptions',val:`€${stats.subRev.toLocaleString('en-EU',{maximumFractionDigits:0})}`,sub:'',icon:<Zap className="w-6 h-6"/>,bg:'bg-emerald-50 dark:bg-emerald-900/20',tc:'text-emerald-600'},
                    {label:'Course Revenue',val:`€${stats.courseRev.toLocaleString('en-EU',{maximumFractionDigits:0})}`,sub:'',icon:<GraduationCap className="w-6 h-6"/>,bg:'bg-violet-50 dark:bg-violet-900/20',tc:'text-violet-600'},
                    {label:'Failed Payments',val:`${stats.failed}`,sub:'in selected period',icon:<AlertCircle className="w-6 h-6"/>,bg:'bg-rose-50 dark:bg-rose-900/20',tc:'text-rose-600'},
                ].map(c=>(
                    <div key={c.label} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center gap-5">
                        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center',c.bg,c.tc)}>{c.icon}</div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">{c.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{c.val}</h3>
                            {c.sub&&<p className="text-[10px] text-slate-400 font-medium mt-0.5">{c.sub}</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Table card */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Transactions</h3>
                            <p className="text-xs text-slate-400 font-medium mt-0.5">Subscriptions + Courses · EUR values use live ECB rates</p>
                        </div>
                        <div className="flex flex-wrap gap-3 items-center">
                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                                {(['all','subscription','course'] as const).map(f=>(
                                    <button key={f} onClick={()=>{setTypeFilter(f);setCurrentPage(1);}}
                                        className={cn('px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',typeFilter===f?'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm':'text-slate-500 hover:text-slate-700')}>{f}</button>
                                ))}
                            </div>
                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl">
                                {['7d','30d','3m','6m','1y','all'].map(tf=>(
                                    <button key={tf} onClick={()=>{setTimeframe(tf);setCurrentPage(1);}}
                                        className={cn('px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',timeframe===tf?'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm':'text-slate-500 hover:text-slate-700')}>{tf}</button>
                                ))}
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400"/>
                                <Input placeholder="Search user, plan, or course…" className="pl-9 h-10 w-64 rounded-xl bg-slate-50 border-slate-200" value={searchQuery} onChange={e=>{setSearchQuery(e.target.value);setCurrentPage(1);}}/>
                            </div>
                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-slate-50" onClick={fetchTransactions} disabled={isLoading}>
                                <RefreshCw className={cn('w-4 h-4 text-slate-400',isLoading&&'animate-spin')}/>
                            </Button>
                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-slate-200 hover:bg-indigo-50 hover:text-indigo-600" onClick={handleCSV}>
                                <Download size={16}/>
                            </Button>
                        </div>
                    </div>
                </div>

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
                            {paginated.map(tx=>(
                                <tr key={`${tx.txn_type}-${tx.id}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                                                {tx.profiles?.display_name?.charAt(0)?.toUpperCase()||'U'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">{tx.profiles?.display_name||'Unknown User'}</p>
                                                <p className="text-xs text-slate-400">{tx.profiles?.email||'No email'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="space-y-1">
                                            <TypeBadge type={tx.txn_type}/>
                                            <p className="text-[10px] text-slate-400 font-bold">
                                                {tx.txn_type==='course'?(tx.course_title||tx.course_id||'—'):(tx.plan_id?tx.plan_id.toUpperCase()+' PLAN':'—')}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                                                €{getEurAmount(tx).toFixed(2)}
                                            </span>
                                            {tx.currency!=='EUR'&&(
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                                                    {getSym(tx.currency)}{tx.amount.toLocaleString()} captured
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-4"><StatusBadge status={tx.status}/></td>
                                    <td className="px-8 py-4">
                                        <div className="flex items-center gap-2">
                                            <ProviderIcon type={tx.payment_method}/>
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 capitalize">{tx.payment_method}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className="text-xs font-bold text-slate-400">{format(new Date(tx.created_at),'MMM d, yyyy')}</span>
                                        <p className="text-[10px] text-slate-300 font-medium">{format(new Date(tx.created_at),'HH:mm')}</p>
                                    </td>
                                    <td className="px-8 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {tx.status==='completed'&&(
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-indigo-600 hover:bg-indigo-50" onClick={()=>handleDownloadInvoice(tx)} title="Download Invoice">
                                                    <FileText size={14}/>
                                                </Button>
                                            )}
                                            {tx.status!=='completed'&&(
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-emerald-600 hover:bg-emerald-50" onClick={()=>handleMarkPaid(tx)} title="Mark as Paid">
                                                    <CheckCircle2 size={14}/>
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:bg-rose-50" onClick={()=>handleDelete(tx)} title="Delete">
                                                <Trash2 size={14}/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length===0&&!isLoading&&(
                                <tr><td colSpan={7} className="px-8 py-16 text-center">
                                    <Package className="w-10 h-10 text-slate-200 mx-auto mb-3"/>
                                    <p className="text-slate-400 font-medium text-sm">No transactions found</p>
                                </td></tr>
                            )}
                            {isLoading&&(
                                <tr><td colSpan={7} className="px-8 py-16 text-center">
                                    <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin mx-auto mb-2"/>
                                    <p className="text-slate-400 text-xs font-medium">Loading transactions…</p>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages>1&&(
                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Showing {(currentPage-1)*itemsPerPage+1}–{Math.min(currentPage*itemsPerPage,filtered.length)} of {filtered.length}
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={currentPage===1} onClick={()=>setCurrentPage(p=>p-1)} className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">Previous</Button>
                            {[...Array(Math.min(totalPages,7))].map((_,i)=>(
                                <Button key={i} variant={currentPage===i+1?'default':'outline'} size="sm" onClick={()=>setCurrentPage(i+1)}
                                    className={cn('w-9 h-9 p-0 rounded-xl text-[10px] font-black',currentPage===i+1?'bg-indigo-600':'')}>{i+1}</Button>
                            ))}
                            <Button variant="outline" size="sm" disabled={currentPage===totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">Next</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}