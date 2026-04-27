import { useState, useEffect, lazy, Suspense } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
    LayoutDashboard, 
    Package, 
    ShoppingBag, 
    Tags, 
    BarChart3, 
    Settings,
    Plus, 
    Loader2, 
    ArrowLeft, 
    Layers,
    Ticket,
    ShieldCheck,
    CreditCard,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Lazy load managers
const ProductManager = lazy(() => import('@/components/store-admin/ProductManager'));
const OrderManager = lazy(() => import('@/components/store-admin/OrderManager'));
const CategoryManager = lazy(() => import('@/components/store-admin/CategoryManager'));
const LayoutManager = lazy(() => import('@/components/store-admin/LayoutManager'));
const CouponManager = lazy(() => import('@/components/store-admin/CouponManager'));
const navigationGroups = [
    {
        title: "Overview",
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
        ]
    },
    {
        title: "Catalogue",
        items: [
            { id: 'products', label: 'Products', icon: Package },
            { id: 'categories', label: 'Categories', icon: Tags },
            { id: 'coupons', label: 'Coupons', icon: Ticket },
        ]
    },
    {
        title: "Design & Config",
        items: [
            { id: 'layout', label: 'Layout', icon: Layers },
            { id: 'settings', label: 'Settings', icon: Settings },
        ]
    }
];

const tabLabels: Record<string, { title: string; desc: string }> = {
    dashboard:  { title: 'Store Overview',  desc: 'Real-time sales performance and business health' },
    products:   { title: 'Product Catalogue',   desc: 'Manage digital & physical study resources' },
    orders:     { title: 'Order Fulfilment',     desc: 'Track student purchases and manage shipments' },
    categories: { title: 'Product Categories', desc: 'Organise products by exam or subject' },
    coupons:    { title: 'Discount Coupons',    desc: 'Manage store-wide discount codes and offers' },
    layout:     { title: 'Storefront Layout',     desc: 'Design your store homepage — banners & sections' },
    settings:   { title: 'Store Settings',   desc: 'Configure currency, tax and store preferences' },
};

export default function StoreAdmin() {
    const { profile } = useAuth() as any;
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);

    const isAdmin = profile?.role === 'admin' || profile?.role === 'sub_admin';

    if (!isAdmin) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Unauthorized Access</h2>
                    <p className="text-slate-500">You do not have permission to view the Store Admin.</p>
                    <Button onClick={() => navigate('/')} variant="outline" className="rounded-xl">
                        Go Home
                    </Button>
                </div>
            </div>
        );
    }

    const sidebarExpanded = isSidebarHovered;

    return (
        <Layout showFooter={false}>
            <div className="flex bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-80px)] overflow-hidden">

                {/* ── Enhanced Collapsible Sidebar ──────────────────── */}
                <motion.div
                    onMouseEnter={() => setIsSidebarHovered(true)}
                    onMouseLeave={() => setIsSidebarHovered(false)}
                    animate={{ width: sidebarExpanded ? 240 : 80 }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                    className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 relative z-40 shrink-0 shadow-2xl shadow-indigo-100/10"
                >
                    {/* Brand header */}
                    <div className="h-20 flex items-center justify-center shrink-0 border-b border-slate-50 dark:border-slate-800">
                        <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                            <ShoppingBag className="w-5 h-5 text-indigo-400" />
                        </div>
                    </div>

                    <nav className="flex-1 py-8 px-3 space-y-8 overflow-y-auto custom-scrollbar scrollbar-hide">
                        {navigationGroups.map((group, idx) => (
                            <div key={idx}>
                                <AnimatePresence>
                                    {sidebarExpanded && (
                                        <motion.label
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-5 block mb-3 whitespace-nowrap"
                                        >
                                            {group.title}
                                        </motion.label>
                                    )}
                                </AnimatePresence>
                                <div className="space-y-1.5">
                                    {group.items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={cn(
                                                "w-full flex items-center transition-all relative group h-11 rounded-xl",
                                                sidebarExpanded ? "px-4 gap-4" : "justify-center",
                                                activeTab === item.id 
                                                    ? "bg-[#0f172a] text-white shadow-lg shadow-slate-200 dark:shadow-none" 
                                                    : "text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700"
                                            )}
                                        >
                                            <div className={cn("shrink-0 flex items-center justify-center", sidebarExpanded ? "w-5 h-5" : "w-10 h-10")}>
                                                <item.icon className={cn("w-[18px] h-[18px] transition-transform group-hover:scale-110", activeTab === item.id ? "text-indigo-400" : "text-slate-400")} />
                                            </div>
                                            <AnimatePresence>
                                                {sidebarExpanded && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -8 }}
                                                        className="text-[11px] font-black uppercase tracking-widest truncate"
                                                    >
                                                        {item.label}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                            
                                            {activeTab === item.id && !sidebarExpanded && (
                                                <motion.div layoutId="active-dot-store" 
                                                    className="absolute right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-slate-50 dark:border-slate-800">
                        <button
                            onClick={() => navigate('/admin')}
                            className={cn(
                                "w-full flex items-center h-12 rounded-xl transition-all text-slate-400 hover:text-indigo-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50",
                                sidebarExpanded ? "px-4 gap-3" : "justify-center"
                            )}
                        >
                            <ArrowLeft className="w-4 h-4 shrink-0" />
                            {sidebarExpanded && (
                                <span className="text-[10px] font-black uppercase tracking-widest truncate">Back to Admin</span>
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* ── Main Content ─────────────────────────── */}
                <main className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-950">
                    <Suspense fallback={
                        <div className="h-full w-full flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-[#0f172a]" />
                        </div>
                    }>
                        <div className="max-w-7xl mx-auto px-10 py-12 space-y-12">
                            {/* Page header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="h-px w-8 bg-indigo-500 rounded-full" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Store Protocol</p>
                                    </div>
                                    <h1 className="text-4xl font-black text-[#0f172a] dark:text-white tracking-tight leading-none">
                                        {tabLabels[activeTab]?.title}
                                    </h1>
                                    <p className="text-slate-400 mt-3 font-medium text-sm">
                                        {tabLabels[activeTab]?.desc}
                                    </p>
                                </div>
                                
                        </div>

                            {/* Tab panels */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeTab === 'dashboard'  && <StoreDashboard />}
                                {activeTab === 'products'   && <ProductManager />}
                                {activeTab === 'orders'     && <OrderManager />}
                                {activeTab === 'categories' && <CategoryManager />}
                                {activeTab === 'coupons'    && <CouponManager />}
                                {activeTab === 'layout'     && <LayoutManager />}
                                {activeTab === 'settings'   && <StoreSettings />}
                            </div>
                        </div>
                    </Suspense>
                </main>
            </div>
        </Layout>
    );
}

// ── Optimized Store Dashboard ────────────────────────────────────────
function StoreDashboard() {
    const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0, active_coupons: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const { data: o } = await (supabase.from('store_orders' as any) as any).select('total_amount').in('status', ['paid', 'shipped', 'delivered']);
                const { count: oc } = await (supabase.from('store_orders' as any) as any).select('*', { count: 'exact', head: true });
                const { count: pc } = await (supabase.from('store_products' as any) as any).select('*', { count: 'exact', head: true }).eq('is_active', true);
                const { count: cc } = await (supabase.from('store_coupons' as any) as any).select('*', { count: 'exact', head: true }).eq('is_active', true);

                setStats({
                    sales: o?.reduce((sum: number, x: any) => sum + Number(x.total_amount), 0) || 0,
                    orders: oc || 0,
                    products: pc || 0,
                    active_coupons: cc || 0
                });
            } catch (e) { console.error(e); } finally { setLoading(false); }
        };
        fetchStats();
    }, []);

    const dashboardStats = [
        { label: 'Market Sales',     value: `€${stats.sales.toFixed(2)}`, sub: 'Total gross volume', icon: BarChart3, color: 'indigo' },
        { label: 'Total Orders',     value: stats.orders.toString(),      sub: 'Transaction count',  icon: ShoppingBag, color: 'emerald' },
        { label: 'Live Inventory',   value: stats.products.toString(),    sub: 'Active products',    icon: Package,     color: 'amber' },
        { label: 'Active Offers',    value: stats.active_coupons.toString(), sub: 'Running coupons', icon: Ticket,      color: 'rose' },
    ];

    const actions = [
        { label: 'Add Product', icon: Package, tab: 'products', color: 'bg-indigo-50 text-indigo-600' },
        { label: 'View Orders', icon: ShoppingBag, tab: 'orders', color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Create Coupon', icon: Ticket, tab: 'coupons', color: 'bg-rose-50 text-rose-600' },
        { label: 'Store Layout', icon: Layers, tab: 'layout', color: 'bg-amber-50 text-amber-600' },
    ];

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dashboardStats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-7 rounded-[2rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/5">
                        {loading && (
                            <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                                <Loader2 className="w-5 h-5 animate-spin text-slate-300" />
                            </div>
                        )}
                        <div className="flex items-center justify-between mb-6">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", `bg-${stat.color}-500/10`, `text-${stat.color}-600`)}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[9px] mt-1">{stat.label}</p>
                        <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                           <p className="text-[10px] font-bold text-slate-400">{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0f172a] flex items-center justify-center">
                        <Plus className="w-4 h-4 text-indigo-400" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#0f172a] dark:text-white">Management Core</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {actions.map((action, i) => (
                        <button key={i} className="flex flex-col items-center justify-center p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-[#0f172a] dark:hover:border-indigo-500 transition-all group gap-4 bg-white dark:bg-slate-900 shadow-sm shadow-slate-100/50">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", action.color)}>
                                <action.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StoreSettings() {
    const [storeConfig, setStoreConfig] = useState<any>({ mode: 'beta', gateways: {} });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadStoreConfig();
    }, []);

    const loadStoreConfig = async () => {
        setLoading(true);
        try {
            const { data } = await supabase
                .from('system_settings')
                .select('value')
                .eq('key', 'store_config')
                .maybeSingle();

            if (data?.value) {
                setStoreConfig(data.value);
            }
        } catch (e) {
            console.error('Failed to load store config:', e);
        } finally {
            setLoading(false);
        }
    };

    const saveStoreConfig = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('system_settings')
                .upsert({ key: 'store_config', value: storeConfig }, { onConflict: 'key' });

            if (error) throw error;
            toast.success('Store settings saved!');
        } catch (e: any) {
            toast.error(e.message || 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const toggleGateway = (name: string) => {
        setStoreConfig((prev: any) => ({
            ...prev,
            gateways: {
                ...prev.gateways,
                [name]: !prev.gateways?.[name]
            }
        }));
    };

    const gatewayList = [
        { key: 'stripe', label: 'Stripe', desc: 'Global card payments', color: '#635BFF', abbr: 'ST' },
        { key: 'razorpay', label: 'Razorpay', desc: 'Cards (India focus)', color: '#3395FF', abbr: 'RZ' },
        { key: 'paypal', label: 'PayPal', desc: 'Digital wallet', color: '#003087', abbr: 'PP' },
        { key: 'cashfree', label: 'Cashfree', desc: 'UPI, Cards, Wallets', color: '#111111', abbr: 'CF' },
        { key: 'dodo', label: 'Dodo Payments', desc: 'Global / SaaS checkout', color: '#0d9488', abbr: 'DO' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Save Button */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Store Payment Settings</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                        Manage which payment gateways are available in the store checkout
                    </p>
                </div>
                <Button
                    onClick={saveStoreConfig}
                    disabled={saving}
                    className="bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl px-6 h-11 font-bold transition-all active:scale-95"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                    Save Settings
                </Button>
            </div>

            {/* Payment Mode Toggle */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                        <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Payment Mode</h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            Switch between free (beta) and live payment processing
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setStoreConfig((p: any) => ({ ...p, mode: 'beta' }))}
                        className={cn(
                            "p-6 rounded-2xl border-2 transition-all text-left",
                            storeConfig.mode === 'beta'
                                ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10"
                                : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
                        )}
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                            <Zap className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">Beta Mode</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                            Orders placed for free — no payment required
                        </p>
                    </button>

                    <button
                        onClick={() => setStoreConfig((p: any) => ({ ...p, mode: 'live' }))}
                        className={cn(
                            "p-6 rounded-2xl border-2 transition-all text-left",
                            storeConfig.mode === 'live'
                                ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10"
                                : "border-slate-100 dark:border-slate-700 hover:border-slate-200"
                        )}
                    >
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                            <CreditCard className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">Live Mode</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                            Real payments with enabled gateways below
                        </p>
                    </button>
                </div>
            </div>

            {/* Payment Gateways */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Payment Gateways</h4>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            Toggle which gateways appear in the store checkout
                            {storeConfig.mode !== 'live' && (
                                <span className="text-amber-500 ml-1">(Requires Live Mode above)</span>
                            )}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {gatewayList.map((gw) => {
                        const enabled = !!storeConfig.gateways?.[gw.key];
                        return (
                            <div
                                key={gw.key}
                                className={cn(
                                    "flex items-center justify-between p-5 rounded-2xl border transition-all",
                                    enabled
                                        ? "border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-900/5"
                                        : "border-slate-100 dark:border-slate-800"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black"
                                        style={{ backgroundColor: gw.color }}
                                    >
                                        {gw.abbr}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{gw.label}</p>
                                        <p className="text-[10px] text-slate-400 font-bold">{gw.desc}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleGateway(gw.key)}
                                    className={cn(
                                        "w-12 h-7 rounded-full p-1 transition-all duration-200",
                                        enabled ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
                                    )}
                                >
                                    <motion.div
                                        animate={{ x: enabled ? 20 : 0 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

