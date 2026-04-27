import { useState, useEffect } from 'react';

import { supabase } from '@/integrations/supabase/client';
import {
    Search, Clock, CheckCircle2, Truck, XCircle, RefreshCw,
    ChevronDown, ExternalLink, Package, Monitor, X,
    AlertTriangle, Check, Loader2, Eye, FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface OrderItem {
    id: string;
    quantity: number;
    unit_price: number;
    product: {
        id: string;
        title: string;
        type: 'digital' | 'physical';
        images: string[];
    };
}

interface Order {
    id: string;
    created_at: string;
    subtotal: number;
    tax_amount: number;
    discount_amount: number;
    total_amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    shipping_address: any;
    tracking_number: string | null;
    tracking_url: string | null;
    admin_notes: string | null;
    user_id: string;
    profiles?: { display_name: string | null; email: string | null; };
    order_items?: OrderItem[];
    payment_method: string | null;
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    pending:   { label: 'Pending',   icon: Clock,        color: 'text-amber-600',  bg: 'bg-amber-50 border-amber-100' },
    paid:      { label: 'Paid',      icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    shipped:   { label: 'Shipped',   icon: Truck,        color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-100' },
    delivered: { label: 'Delivered', icon: CheckCircle2, color: 'text-emerald-600',bg: 'bg-emerald-50 border-emerald-100' },
    cancelled: { label: 'Cancelled', icon: XCircle,      color: 'text-rose-600',   bg: 'bg-rose-50 border-rose-100' },
    refunded:  { label: 'Refunded',  icon: RefreshCw,    color: 'text-slate-600',  bg: 'bg-slate-50 border-slate-100' },
};

const ALL_STATUSES = ['all', 'pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded'];

export default function OrderManager() {
    const [orders,         setOrders]         = useState<Order[]>([]);
    const [isLoading,      setIsLoading]      = useState(true);
    const [searchQuery,    setSearchQuery]    = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedOrder,  setSelectedOrder]  = useState<Order | null>(null);
    const [isUpdating,     setIsUpdating]     = useState(false);

    // Edit panel state
    const [editTracking,  setEditTracking]  = useState('');
    const [editTrackingUrl, setEditTrackingUrl] = useState('');
    const [editNotes,     setEditNotes]     = useState('');
    const [editStatus,    setEditStatus]    = useState('');

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await (supabase.from('store_orders' as any) as any)
                .select(`
                    *,
                    customer:user_id ( display_name, email ),
                    payment_method,
                    order_items:store_order_items (
                        id, quantity, unit_price,
                        product:store_products ( id, title, type, images, gst_percentage )
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase Query Error:', error);
                throw error;
            }
            setOrders((data as any) || []);
        } catch (err: any) {
            console.error('Order Load Error Details:', err);
            toast.error(
                err.code === 'PGRST204' 
                ? 'Database schema out of sync. Please run the migration script.' 
                : 'Failed to load orders: ' + (err.message || 'Unknown error')
            );
        } finally {
            setIsLoading(false);
        }
    };

    const openOrder = (order: Order) => {
        setSelectedOrder(order);
        setEditTracking(order.tracking_number || '');
        setEditTrackingUrl(order.tracking_url || '');
        setEditNotes(order.admin_notes || '');
        setEditStatus(order.status);
    };

    const saveOrder = async () => {
        if (!selectedOrder) return;
        setIsUpdating(true);
        const { error } = await (supabase.from('store_orders' as any) as any)
            .update({
                status: editStatus,
                tracking_number: editTracking || null,
                tracking_url: editTrackingUrl || null,
                admin_notes: editNotes || null,
            })
            .eq('id', selectedOrder.id);

        if (error) {
            toast.error('Update failed: ' + error.message);
        } else {
            toast.success('Order updated!');
            fetchOrders(); // Refresh to ensure data sync
        }
        setIsUpdating(false);
    };

    const quickStatus = async (orderId: string, newStatus: string) => {
        const { error } = await (supabase.from('store_orders' as any) as any)
            .update({ status: newStatus })
            .eq('id', orderId);
        if (error) { toast.error('Update failed'); return; }
        toast.success(`Order marked as ${newStatus}`);
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    };

    const filtered = orders.filter(o => {
        const q = searchQuery.toLowerCase();
        const matchSearch = !q ||
            o.profiles?.display_name?.toLowerCase().includes(q) ||
            o.profiles?.email?.toLowerCase().includes(q) ||
            o.id.toLowerCase().includes(q);
        const matchStatus = selectedStatus === 'all' || o.status === selectedStatus;
        return matchSearch && matchStatus;
    });

    // Stats
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        paid: orders.filter(o => o.status === 'paid').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
    };

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Orders', value: stats.total, color: 'text-[#0f172a]' },
                    { label: 'Pending', value: stats.pending, color: 'text-amber-600' },
                    { label: 'Paid', value: stats.paid, color: 'text-indigo-600' },
                    { label: 'Shipped', value: stats.shipped, color: 'text-blue-600' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                        <p className={cn("text-3xl font-black mt-1", s.color)}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        placeholder="Search by customer name, email or order ID..."
                        className="w-full pl-11 pr-4 h-11 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f172a] transition-all"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-1">
                    {ALL_STATUSES.map(s => (
                        <button
                            key={s}
                            onClick={() => setSelectedStatus(s)}
                            className={cn(
                                "px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                selectedStatus === s
                                    ? "bg-[#0f172a] text-white"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Method</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i}><td colSpan={7} className="px-6 py-5">
                                        <div className="h-4 bg-slate-50 rounded-full animate-pulse" />
                                    </td></tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-20 text-center text-slate-400 font-medium">
                                    No orders found.
                                </td></tr>
                            ) : filtered.map(order => {
                                const conf = statusConfig[order.status] || statusConfig.pending;
                                const Icon = conf.icon;
                                const hasPhysical = order.order_items?.some(i => i.product?.type === 'physical');
                                return (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-xs font-black text-slate-400 font-mono">
                                            #{order.id.split('-')[0].toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase shrink-0">
                                                    {order.profiles?.display_name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 leading-none">{order.profiles?.display_name || '—'}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{order.profiles?.email || '—'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1 flex-wrap">
                                                {order.order_items?.slice(0, 2).map((item, i) => (
                                                    <span key={i} className={cn(
                                                        "flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase",
                                                        item.product?.type === 'digital' ? 'bg-[#0f172a] text-white' : 'bg-slate-100 text-slate-600'
                                                    )}>
                                                        {item.product?.type === 'digital' ? <Monitor className="w-2.5 h-2.5" /> : <Package className="w-2.5 h-2.5" />}
                                                        {item.product?.title?.split(' ').slice(0, 2).join(' ')}
                                                    </span>
                                                ))}
                                                {(order.order_items?.length || 0) > 2 && (
                                                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-slate-100 text-slate-500">
                                                        +{(order.order_items?.length || 0) - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-[#0f172a]">
                                            €{Number(order.total_amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                {order.payment_method || 'SECURE'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn("flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", conf.bg, conf.color)}>
                                                <Icon className="w-3 h-3" /> {conf.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-bold text-slate-400">{format(new Date(order.created_at), 'dd MMM yyyy')}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openOrder(order)}
                                                    className="h-8 w-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-[#0f172a] hover:text-white transition-all">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Order Management Panel ──────────── */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-50">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-sm"
                            onClick={() => setSelectedOrder(null)} />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl flex flex-col"
                        >
                            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h2 className="font-black text-base text-[#0f172a]">Manage Order</h2>
                                    <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">#{selectedOrder.id.split('-')[0]}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Financial Breakdown */}
                                <div className="bg-[#0f172a] rounded-3xl p-6 text-white space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financial Breakdown</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-semibold text-slate-400">
                                            <span>Subtotal</span>
                                            <span className="text-white">&euro;{(selectedOrder.subtotal || selectedOrder.total_amount).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-semibold text-slate-400">
                                            <span>Total GST (Tax)</span>
                                            <span className="text-white">&euro;{(selectedOrder.tax_amount || 0).toFixed(2)}</span>
                                        </div>
                                        {selectedOrder.discount_amount > 0 && (
                                            <div className="flex justify-between text-xs font-bold text-emerald-400">
                                                <span>Coupon Discount</span>
                                                <span>- &euro;{selectedOrder.discount_amount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-white/10 pt-3 mt-3 flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="font-black text-[11px] uppercase tracking-widest text-slate-400">Grand Total</span>
                                                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.1em] mt-1">{selectedOrder.payment_method || 'SECURE GATEWAY'}</span>
                                            </div>
                                            <span className="text-2xl font-black">&euro;{selectedOrder.total_amount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping address (if physical) */}
                                {selectedOrder.shipping_address && Object.keys(selectedOrder.shipping_address).length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shipping Address</p>
                                        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-0.5">
                                            <p className="font-bold">{selectedOrder.shipping_address.name}</p>
                                            <p>{selectedOrder.shipping_address.address}</p>
                                            <p>{selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.country}</p>
                                            <p>{selectedOrder.shipping_address.phone}</p>
                                        </div>
                                    </div>
                                )}

                                {/* ── Update Status ── */}
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Update Status</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(statusConfig).map(([key, conf]) => {
                                            const Icon = conf.icon;
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => setEditStatus(key)}
                                                    className={cn(
                                                        "flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                                        editStatus === key ? `${conf.bg} ${conf.color} border-current` : "bg-slate-50 text-slate-400 border-transparent hover:bg-slate-100"
                                                    )}
                                                >
                                                    <Icon className="w-3 h-3" /> {conf.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ── Tracking ── (only if physical) */}
                                {selectedOrder.order_items?.some(i => i.product?.type === 'physical') && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tracking Information</p>
                                        <input
                                            placeholder="Tracking number (e.g. IT123456789)"
                                            value={editTracking}
                                            onChange={e => setEditTracking(e.target.value)}
                                            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                                        />
                                        <input
                                            placeholder="Tracking URL (e.g. https://track.dhl.com/...)"
                                            value={editTrackingUrl}
                                            onChange={e => setEditTrackingUrl(e.target.value)}
                                            className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                                        />
                                        {editTrackingUrl && (
                                            <a href={editTrackingUrl} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800">
                                                <ExternalLink className="w-3 h-3" /> Test tracking link
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* ── Admin Notes ── */}
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note to Customer (visible in My Orders)</p>
                                    <textarea
                                        placeholder="e.g. 'Your book has been dispatched via DHL Express.'"
                                        value={editNotes}
                                        onChange={e => setEditNotes(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                                    />
                                </div>

                                {/* ── Danger zone ── */}
                                {editStatus !== 'cancelled' && editStatus !== 'refunded' && (
                                    <div className="border border-rose-100 bg-rose-50/50 rounded-xl p-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Danger Zone</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => setEditStatus('cancelled')}
                                                className="flex-1 h-9 rounded-xl bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors flex items-center justify-center gap-1.5">
                                                <XCircle className="w-3.5 h-3.5" /> Cancel Order
                                            </button>
                                            <button onClick={() => setEditStatus('refunded')}
                                                className="flex-1 h-9 rounded-xl bg-slate-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5">
                                                <RefreshCw className="w-3.5 h-3.5" /> Mark Refunded
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Save button */}
                            <div className="p-6 border-t border-slate-100 shrink-0">
                                <button
                                    onClick={saveOrder}
                                    disabled={isUpdating}
                                    className={cn(
                                        "w-full h-12 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all",
                                        isUpdating ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#0f172a] hover:bg-slate-800 text-white"
                                    )}
                                >
                                    {isUpdating ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Check className="w-4 h-4" /> Save Changes</>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
