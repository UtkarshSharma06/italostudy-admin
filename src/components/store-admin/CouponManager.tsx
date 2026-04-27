import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
    Ticket, Plus, Trash2, Tag, Calendar,
    Check, X, RefreshCw, Hash, Percent, Euro,
    Users, AlertCircle, Loader2, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Coupon {
    id: string;
    code: string;
    discount_type: 'percent' | 'fixed';
    discount_value: number;
    min_order_amount: number;
    max_uses: number | null;
    used_count: number;
    valid_until: string | null;
    is_active: boolean;
    created_at: string;
}

export default function CouponManager() {
    const [coupons,   setCoupons]   = useState<Coupon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSaving,   setIsSaving]   = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Form State
    const [formData, setFormData] = useState({
        code: '',
        discount_type: 'percent' as 'percent' | 'fixed',
        discount_value: '',
        min_order_amount: '0',
        max_uses: '',
        valid_until: '',
        is_active: true
    });

    useEffect(() => { fetchCoupons(); }, []);

    const fetchCoupons = async () => {
        setIsLoading(true);
        const { data, error } = await (supabase.from('store_coupons' as any) as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setCoupons((data as any) || []);
        else if (!error.message?.includes('does not exist')) toast.error('Failed to load coupons');
        setIsLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.code || !formData.discount_value) return toast.error('Please fill required fields');

        setIsSaving(true);
        const payload = {
            code: formData.code.toUpperCase().trim(),
            discount_type: formData.discount_type,
            discount_value: parseFloat(formData.discount_value),
            min_order_amount: parseFloat(formData.min_order_amount || '0'),
            max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
            valid_until: formData.valid_until || null,
            is_active: formData.is_active
        };

        const { error } = await (supabase.from('store_coupons' as any) as any).insert([payload]);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Coupon created successfully!');
            setIsFormOpen(false);
            resetForm();
            fetchCoupons();
        }
        setIsSaving(false);
    };

    const resetForm = () => {
        setFormData({
            code: '',
            discount_type: 'percent',
            discount_value: '',
            min_order_amount: '0',
            max_uses: '',
            valid_until: '',
            is_active: true
        });
    };

    const toggleStatus = async (id: string, current: boolean) => {
        const { error } = await (supabase.from('store_coupons' as any) as any)
            .update({ is_active: !current })
            .eq('id', id);
        if (error) toast.error('Update failed');
        else {
            setCoupons(coupons.map(c => c.id === id ? { ...c, is_active: !current } : c));
            toast.success(current ? 'Coupon deactivated' : 'Coupon activated');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this coupon?')) return;
        const { error } = await (supabase.from('store_coupons' as any) as any).delete().eq('id', id);
        if (error) toast.error('Delete failed');
        else {
            toast.success('Deleted');
            setCoupons(coupons.filter(c => c.id !== id));
        }
    };

    const filtered = coupons.filter(c => c.code.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6">
            {/* Header / Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-3xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Coupons</p>
                        <p className="text-2xl font-black text-[#0f172a]">{coupons.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Check className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active</p>
                        <p className="text-2xl font-black text-[#0f172a]">{coupons.filter(c => c.is_active).length}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-[#0f172a] hover:bg-slate-800 text-white rounded-3xl p-5 flex items-center justify-center gap-2 transition-all group lg:col-span-1 shadow-lg shadow-slate-200/50"
                >
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    <span className="font-black uppercase tracking-widest text-sm">Create New Coupon</span>
                </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            placeholder="Filter coupons by code..."
                            className="w-full pl-11 pr-4 h-11 rounded-2xl bg-slate-50 border-none text-sm font-medium focus:ring-2 focus:ring-indigo-500"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-slate-300 w-10 h-10" /></div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <Tag className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                            <p className="text-slate-400 font-medium">No coupons found matching your search.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filtered.map(coupon => (
                                <div key={coupon.id} className="group bg-slate-50/50 hover:bg-white border hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 p-5 rounded-3xl transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className={cn(
                                            "w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center border-2",
                                            coupon.is_active ? "bg-white border-indigo-100 text-indigo-600 shadow-sm" : "bg-slate-100 border-slate-200 text-slate-400"
                                        )}>
                                            <span className="text-lg font-black">{coupon.discount_type === 'percent' ? `${coupon.discount_value}%` : `€${coupon.discount_value}`}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest">OFF</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-base font-black font-mono uppercase tracking-tight text-[#0f172a]">{coupon.code}</h4>
                                                {coupon.is_active ? (
                                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                                ) : (
                                                    <span className="flex h-2 w-2 rounded-full bg-slate-300" />
                                                )}
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <Users className="w-3 h-3" /> {coupon.used_count || 0} / {coupon.max_uses || '∞'} uses
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <Calendar className="w-3 h-3" /> {coupon.valid_until ? format(new Date(coupon.valid_until), 'dd MMM yyyy') : 'No Expiry'}
                                                </div>
                                            </div>
                                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-2 bg-indigo-50 px-2 py-0.5 rounded w-fit">
                                                Min Order: €{coupon.min_order_amount}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button onClick={() => toggleStatus(coupon.id, coupon.is_active)}
                                            className={cn("p-3 rounded-2xl transition-all", coupon.is_active ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200")}>
                                            {coupon.is_active ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                                        </button>
                                        <button onClick={() => handleDelete(coupon.id)}
                                            className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-100 transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Creation Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFormOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ y: 20, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg relative overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-[#0f172a]">New Coupon</h2>
                                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-50 rounded-2xl"><X className="w-6 h-6 text-slate-300" /></button>
                            </div>
                            <form onSubmit={handleSave} className="p-8 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coupon Code</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input
                                            required placeholder="e.g. FIRST10"
                                            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border-none font-black font-mono uppercase focus:ring-2 focus:ring-indigo-500"
                                            value={formData.code}
                                            onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Type</label>
                                        <select
                                            className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-none font-bold text-sm focus:ring-2 focus:ring-indigo-500"
                                            value={formData.discount_type}
                                            onChange={e => setFormData({ ...formData, discount_type: e.target.value as any })}
                                        >
                                            <option value="percent">Percentage (%)</option>
                                            <option value="fixed">Fixed Price (€)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Value</label>
                                        <div className="relative">
                                            {formData.discount_type === 'percent' ? <Percent className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" /> : <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />}
                                            <input
                                                required type="number" step="0.01" placeholder="10"
                                                className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-indigo-500"
                                                value={formData.discount_value}
                                                onChange={e => setFormData({ ...formData, discount_value: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Min Order (€)</label>
                                        <input
                                            type="number" step="0.01" placeholder="0.00"
                                            className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-indigo-500"
                                            value={formData.min_order_amount}
                                            onChange={e => setFormData({ ...formData, min_order_amount: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Max Uses</label>
                                        <input
                                            type="number" placeholder="No limit"
                                            className="w-full h-12 px-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-indigo-500"
                                            value={formData.max_uses}
                                            onChange={e => setFormData({ ...formData, max_uses: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Expiry Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <input
                                            type="date"
                                            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-slate-50 border-none font-bold focus:ring-2 focus:ring-indigo-500"
                                            value={formData.valid_until}
                                            onChange={e => setFormData({ ...formData, valid_until: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button" onClick={() => setIsFormOpen(false)}
                                        className="flex-1 h-12 rounded-2xl border-2 border-slate-100 font-bold uppercase tracking-widest text-xs hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit" disabled={isSaving}
                                        className="flex-1 h-12 rounded-2xl bg-[#0f172a] text-white font-black uppercase tracking-widest text-xs hover:bg-slate-800 flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : 'Create Coupon'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
