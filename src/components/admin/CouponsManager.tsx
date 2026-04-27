import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Ticket, Plus, Trash2, Tag, Calendar,
    Check, X, RefreshCw, Hash, Percent, DollarSign,
    Users, MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Coupon {
    id: string;
    code: string;
    discount_type: 'percent' | 'fixed';
    discount_value: number;
    max_uses: number | null;
    used_count: number;
    valid_until: string | null;
    is_active: boolean;
}

export default function CouponsManager() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // New Coupon Form
    const [newCode, setNewCode] = useState('');
    const [newType, setNewType] = useState<'percent' | 'fixed'>('percent');
    const [newValue, setNewValue] = useState('');
    const [newLimit, setNewLimit] = useState('');

    const [couponMessage, setCouponMessage] = useState('');
    const [isSavingMessage, setIsSavingMessage] = useState(false);

    useEffect(() => {
        fetchCoupons();
        fetchPricingMessage();
    }, []);

    const fetchPricingMessage = async () => {
        try {
            const { data } = await supabase
                .from('system_settings')
                .select('value')
                .eq('key', 'pricing_coupon_message')
                .maybeSingle();
            if (data && data.value) {
                const val = data.value;
                if (typeof val === 'string') {
                    setCouponMessage(val);
                } else if (val && typeof val === 'object' && (val as any).message) {
                    setCouponMessage(String((val as any).message));
                }
            }
        } catch (err) {
            console.error('Failed to fetch pricing message');
        }
    };

    const handleSaveMessage = async () => {
        setIsSavingMessage(true);
        try {
            const { error } = await supabase
                .from('system_settings')
                .upsert({
                    key: 'pricing_coupon_message',
                    value: { message: couponMessage },
                    updated_at: new Date().toISOString()
                });
            if (error) throw error;
            toast.success('Pricing message updated');
            // Update local state to trigger any immediate effects
            fetchPricingMessage();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsSavingMessage(false);
        }
    };

    const fetchCoupons = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCoupons((data as unknown as Coupon[]) || []);
        } catch (err: any) {
            toast.error('Failed to load coupons');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newCode || !newValue) {
            toast.error('Please fill in code and value');
            return;
        }

        setIsCreating(true);
        try {
            const { error } = await supabase.from('coupons').insert({
                code: newCode.toUpperCase(),
                discount_type: newType,
                discount_value: parseFloat(newValue),
                max_uses: newLimit ? parseInt(newLimit) : null,
            });

            if (error) throw error;
            toast.success('Coupon created');
            setNewCode('');
            setNewValue('');
            setNewLimit('');
            fetchCoupons();
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this coupon?')) return;
        try {
            const { error } = await supabase.from('coupons').delete().eq('id', id);
            if (error) throw error;
            toast.success('Coupon deleted');
            setCoupons(coupons.filter(c => c.id !== id));
        } catch (err) {
            toast.error('Failed to delete coupon');
        }
    };

    const toggleStatus = async (id: string, current: boolean) => {
        try {
            const { error } = await supabase
                .from('coupons')
                .update({ is_active: !current })
                .eq('id', id);

            if (error) throw error;
            setCoupons(coupons.map(c => c.id === id ? { ...c, is_active: !current } : c));
            toast.success(current ? 'Coupon deactivated' : 'Coupon activated');
        } catch (err) {
            toast.error('Status update failed');
        }
    };

    if (isLoading) return <div className="h-64 flex items-center justify-center"><RefreshCw className="animate-spin text-indigo-500" /></div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Coupons</h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">Manage discount codes and generated offers</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 h-fit">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Plus className="w-4 h-4 text-indigo-500" /> New Coupon
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Code</Label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <Input
                                    value={newCode}
                                    onChange={e => setNewCode(e.target.value.toUpperCase())}
                                    placeholder="SUMMER2024"
                                    className="pl-9 font-mono uppercase"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                                    <button
                                        onClick={() => setNewType('percent')}
                                        className={cn("flex-1 text-xs font-bold py-1.5 rounded-md transition-all", newType === 'percent' ? "bg-white shadow text-indigo-600" : "text-slate-400 hover:text-slate-600")}
                                    >
                                        % Off
                                    </button>
                                    <button
                                        onClick={() => setNewType('fixed')}
                                        className={cn("flex-1 text-xs font-bold py-1.5 rounded-md transition-all", newType === 'fixed' ? "bg-white shadow text-indigo-600" : "text-slate-400 hover:text-slate-600")}
                                    >
                                        Fixed
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Value</Label>
                                <div className="relative">
                                    {newType === 'percent' ? (
                                        <Percent className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                    ) : (
                                        <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                    )}
                                    <Input
                                        type="number"
                                        value={newValue}
                                        onChange={e => setNewValue(e.target.value)}
                                        placeholder={newType === 'percent' ? "20" : "10"}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Max Uses (Optional)</Label>
                            <div className="relative">
                                <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <Input
                                    type="number"
                                    value={newLimit}
                                    onChange={e => setNewLimit(e.target.value)}
                                    placeholder="Unlimited"
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleCreate}
                            disabled={isCreating || !newCode || !newValue}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl h-12 mt-4"
                        >
                            {isCreating ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Create Coupon'}
                        </Button>
                    </div>
                </div>

                {/* Pricing Message Manager */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 h-fit space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Pricing Banner</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Show offer on pricing page</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black text-slate-400">Display Message</Label>
                            <Input
                                value={couponMessage}
                                onChange={e => setCouponMessage(e.target.value)}
                                placeholder="use coupon FIRST20 to get 20% off"
                                className="rounded-xl h-12"
                            />
                        </div>

                        <Button
                            onClick={handleSaveMessage}
                            disabled={isSavingMessage}
                            className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl h-12 transition-all active:scale-95"
                        >
                            {isSavingMessage ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Update Message'}
                        </Button>
                    </div>
                </div>

                {/* List */}
                <div className="lg:col-span-2 space-y-4">
                    {coupons.map(coupon => (
                        <div key={coupon.id} className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-all">
                            <div className="flex items-center gap-6">
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black border-2",
                                    coupon.is_active ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-100 text-slate-300"
                                )}>
                                    <span className="text-xl">
                                        {coupon.discount_type === 'percent' ? `${coupon.discount_value}%` : `€${coupon.discount_value}`}
                                    </span>
                                    <span className="text-[9px] uppercase tracking-wider">OFF</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-lg font-black font-mono tracking-tight text-slate-900 dark:text-white uppercase">{coupon.code}</h4>
                                        <span className={cn(
                                            "text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest",
                                            coupon.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                        )}>
                                            {coupon.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                                        <span className="flex items-center gap-1.5"><Tag size={12} /> {coupon.used_count} used</span>
                                        {coupon.max_uses && (
                                            <span className="flex items-center gap-1.5"><Users size={12} /> Limit: {coupon.max_uses}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleStatus(coupon.id, coupon.is_active)}
                                    className={cn("rounded-xl h-10 w-10 p-0", coupon.is_active ? "text-emerald-600 bg-emerald-50" : "text-slate-400 bg-slate-50")}
                                >
                                    {coupon.is_active ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(coupon.id)}
                                    className="rounded-xl h-10 w-10 p-0 text-slate-300 hover:text-rose-500 hover:bg-rose-50"
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {coupons.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-400 font-medium">No coupons generated yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
