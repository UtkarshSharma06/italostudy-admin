import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Plus, Trash2, Save, RefreshCw,
    Check, X, Zap, Sparkles, Brain,
    Layers, Layout, ListChecks, Palette,
    PlusCircle, MinusCircle, GripVertical,
    ArrowUp, ArrowDown, MessageSquare,
    Rocket, AlertTriangle, DollarSign,
    Loader2, BadgeCheck
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { motion, Reorder } from 'framer-motion';

interface PlanCycle {
    id: string;
    name: string;
    price: number;
    durationValue: number;
    durationUnit: 'days' | 'months' | 'years';
    dodoId?: string;
    regionalPrices?: Record<string, number>;
}

interface Plan {
    id: string;
    name: string;
    description: string;
    cycles: PlanCycle[];
    icon: string;
    color: string;
    isPopular: boolean;
    badge: string;
    isVisible: boolean;
    regionalPrices?: Record<string, number>;
}

interface Feature {
    name: string;
    [key: string]: any; // planId: value
}

interface PricingConfig {
    plans: Plan[];
    comparison: Feature[];
    mode: 'beta' | 'live';
}

const IconMap: any = {
    Brain: Brain,
    Zap: Zap,
    Sparkles: Sparkles,
    Layers: Layers,
    Layout: Layout
};

const RegionalPriceEditor = ({
    prices,
    onChange
}: {
    prices?: Record<string, number>,
    onChange: (prices: Record<string, number>) => void
}) => {
    const [newCurrency, setNewCurrency] = useState('');
    const [newPrice, setNewPrice] = useState('');

    const addPrice = () => {
        if (!newCurrency || !newPrice) return;
        const cur = newCurrency.toUpperCase().trim();
        const price = parseFloat(newPrice);
        if (isNaN(price)) return;

        onChange({ ...prices, [cur]: price });
        setNewCurrency('');
        setNewPrice('');
    };

    const removePrice = (cur: string) => {
        const newPrices = { ...prices };
        delete newPrices[cur];
        onChange(newPrices);
    };

    return (
        <div className="space-y-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/20">
            <div className="flex items-center justify-between mb-1">
                <Label className="text-[10px] uppercase font-black text-indigo-600 dark:text-indigo-400">Fixed Regional Prices</Label>
                <BadgeCheck className="w-3.5 h-3.5 text-indigo-600" />
            </div>

            <div className="space-y-2">
                {Object.entries(prices || {}).map(([cur, price]) => (
                    <div key={cur} className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        <span className="text-[10px] font-black text-slate-500 w-10 text-center">{cur}</span>
                        <Input
                            type="number"
                            value={price}
                            onChange={e => onChange({ ...prices, [cur]: parseFloat(e.target.value) || 0 })}
                            className="h-8 text-[10px] font-bold rounded-lg border-none bg-slate-50 dark:bg-slate-800"
                        />
                        <button onClick={() => removePrice(cur)} className="p-1 text-slate-300 hover:text-rose-500 transition-colors">
                            <Trash2 size={12} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 pt-1">
                <Input
                    placeholder="USD"
                    value={newCurrency}
                    onChange={e => setNewCurrency(e.target.value)}
                    className="h-8 text-[10px] font-bold rounded-lg uppercase w-16"
                    maxLength={3}
                />
                <Input
                    type="number"
                    placeholder="9.99"
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="h-8 text-[10px] font-bold rounded-lg"
                />
                <Button onClick={addPrice} size="sm" variant="outline" className="h-8 px-2 rounded-lg border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                    <Plus size={14} />
                </Button>
            </div>
            <p className="text-[8px] font-medium text-slate-400 italic">User from this region will see this fixed price instead of EUR conversion.</p>
        </div>
    );
};

export default function PricingManager() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [config, setConfig] = useState<PricingConfig | null>(null);

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('system_settings')
                .select('*')
                .eq('key', 'pricing_plans')
                .single();

            if (error && error.code !== 'PGRST116') throw error;

            if (data) {
                const parsedConfig = data.value as any as PricingConfig;

                // MIGRATION: Convert old monthly/quarterly prices to cycles
                const migratedPlans = parsedConfig.plans.map((plan: any) => {
                    if (!plan.cycles) {
                        const cycles: PlanCycle[] = [];
                        if (plan.monthlyPrice !== undefined) {
                            cycles.push({
                                id: `${plan.id}_monthly`,
                                name: 'Monthly',
                                price: plan.monthlyPrice,
                                durationValue: 1,
                                durationUnit: 'months'
                            });
                        }
                        if (plan.quarterlyPrice !== undefined) {
                            cycles.push({
                                id: `${plan.id}_quarterly`,
                                name: 'Quarterly',
                                price: plan.quarterlyPrice,
                                durationValue: 3,
                                durationUnit: 'months'
                            });
                        }
                        return {
                            ...plan,
                            cycles: cycles.map(c => ({
                                ...c,
                                durationValue: c.durationValue || (c as any).duration_value,
                                durationUnit: c.durationUnit || (c as any).duration_unit
                            }))
                        };
                    }
                    // Even if cycles exist, ensure duration fields are mapped correctly if they are in snake_case
                    if (plan.cycles) {
                        return {
                            ...plan,
                            cycles: plan.cycles.map((c: any) => ({
                                ...c,
                                durationValue: c.durationValue || c.duration_value,
                                durationUnit: c.durationUnit || c.duration_unit
                            }))
                        };
                    }
                    return plan;
                });

                setConfig({ ...parsedConfig, plans: migratedPlans });
            } else {
                // Initialize with defaults if empty
                const defaultConfig: PricingConfig = {
                    plans: [],
                    comparison: [],
                    mode: 'beta'
                };
                setConfig(defaultConfig);
            }
        } catch (err: any) {
            toast.error('Failed to load pricing: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!config) return;
        setIsSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase
                .from('system_settings')
                .upsert({
                    key: 'pricing_plans',
                    value: config as any,
                    updated_by: user?.id,
                    updated_at: new Date().toISOString()
                });

            if (error) throw error;
            toast.success('Pricing configuration saved globally!');
        } catch (err: any) {
            toast.error('Failed to save: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const updatePlan = (id: string, updates: Partial<Plan>) => {
        if (!config) return;
        const newPlans = config.plans.map(p => p.id === id ? { ...p, ...updates } : p);
        setConfig({ ...config, plans: newPlans });
    };

    const addPlan = () => {
        if (!config) return;
        const newId = `plan_${Date.now()}`;
        const newPlan: Plan = {
            id: newId,
            name: 'New Plan',
            description: 'New Description',
            cycles: [
                { id: `${newId}_monthly`, name: 'Monthly', price: 0, durationValue: 1, durationUnit: 'months' }
            ],
            icon: 'Layers',
            color: 'from-slate-400 to-slate-600',
            isPopular: false,
            badge: '',
            isVisible: true
        };
        setConfig({ ...config, plans: [...config.plans, newPlan] });
    };

    const removePlan = (id: string) => {
        if (!config) return;
        if (!confirm('Removing a plan will also remove its column from the comparison table. Continue?')) return;
        const newPlans = config.plans.filter(p => p.id !== id);
        const newComparison = config.comparison.map(feat => {
            const { [id]: _, ...rest } = feat;
            return rest as Feature;
        });
        setConfig({ ...config, plans: newPlans, comparison: newComparison });
    };


    const addFeature = () => {
        if (!config) return;
        const newFeature: Feature = { name: 'New Feature' };
        config.plans.forEach(p => {
            newFeature[p.id] = false;
        });
        setConfig({ ...config, comparison: [...config.comparison, newFeature] });
    };

    const removeFeature = (idx: number) => {
        if (!config) return;
        const newComparison = [...config.comparison];
        newComparison.splice(idx, 1);
        setConfig({ ...config, comparison: newComparison });
    };

    const moveFeature = (index: number, direction: 'up' | 'down') => {
        if (!config) return;
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === config.comparison.length - 1) return;

        const newComparison = [...config.comparison];
        const temp = newComparison[index];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        newComparison[index] = newComparison[targetIndex];
        newComparison[targetIndex] = temp;

        setConfig({ ...config, comparison: newComparison });
    };

    const updateFeature = (idx: number, updates: Partial<Feature>) => {
        if (!config) return;
        const newComparison = [...config.comparison];
        newComparison[idx] = { ...newComparison[idx], ...updates };
        setConfig({ ...config, comparison: newComparison });
    };

    if (isLoading) return <div className="flex items-center justify-center h-64"><RefreshCw className="animate-spin text-indigo-500" /></div>;
    if (!config) return <div>No configuration found.</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Palette className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Pricing & Plans</h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">Manage global subscription tiers and comparison features</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    {/* Mode Toggle */}
                    <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex mr-2">
                        <button
                            onClick={() => setConfig({ ...config, mode: 'beta' })}
                            className={cn(
                                "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all flex items-center gap-2",
                                config?.mode === 'beta'
                                    ? "bg-indigo-500 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            <Rocket size={14} /> Beta
                        </button>
                        <button
                            onClick={() => setConfig({ ...config, mode: 'live' })}
                            className={cn(
                                "px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wide transition-all flex items-center gap-2",
                                config?.mode === 'live'
                                    ? "bg-emerald-500 text-white shadow-sm"
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            )}
                        >
                            <DollarSign size={14} /> Live
                        </button>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={fetchPricing}
                        className="rounded-xl"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-12 font-bold transition-all active:scale-95"
                    >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        Publish Changes
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="plans" className="space-y-6">
                <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl h-14 w-full sm:w-auto">
                    <TabsTrigger value="plans" className="rounded-xl px-8 h-12 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 shadow-none">
                        <Layout className="w-4 h-4 mr-2" />
                        Tiers & Styling
                    </TabsTrigger>
                    <TabsTrigger value="comparison" className="rounded-xl px-8 h-12 font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 shadow-none">
                        <ListChecks className="w-4 h-4 mr-2" />
                        Feature Table
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="plans" className="space-y-6 mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {config.plans.map(plan => (
                            <div key={plan.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col group hover:shadow-md transition-shadow">
                                <div className={cn("p-6 bg-gradient-to-br relative text-white", plan.color)}>
                                    <button onClick={() => removePlan(plan.id)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-rose-500 rounded-lg transition-colors text-white">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                            {IconMap[plan.icon] ? <p>{(() => { const Icon = IconMap[plan.icon]; return <Icon className="w-6 h-6" /> })()}</p> : <Layers className="w-6 h-6" />}
                                        </div>
                                        <h3 className="font-black uppercase tracking-tight text-lg">{plan.name}</h3>
                                    </div>
                                    <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{plan.description}</p>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-black text-slate-400">Plan Name</Label>
                                            <Input value={plan.name} onChange={e => updatePlan(plan.id, { name: e.target.value })} className="rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-black text-slate-400">ID (System Only)</Label>
                                            <Input value={plan.id} disabled className="rounded-xl bg-slate-50 opacity-50" />
                                        </div>

                                        <RegionalPriceEditor
                                            prices={plan.regionalPrices}
                                            onChange={newPrices => updatePlan(plan.id, { regionalPrices: newPrices })}
                                        />

                                        {/* Dynamic Cycles Section */}
                                        <div className="space-y-4 pt-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-[10px] uppercase font-black text-slate-400">Billing Cycles</Label>
                                                <button
                                                    onClick={() => {
                                                        const newCycle: PlanCycle = {
                                                            id: `${plan.id}_${Date.now()}`,
                                                            name: 'New Cycle',
                                                            price: 0,
                                                            durationValue: 1,
                                                            durationUnit: 'months',
                                                            dodoId: ''
                                                        };
                                                        updatePlan(plan.id, { cycles: [...(plan.cycles || []), newCycle] });
                                                    }}
                                                    className="p-1 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                >
                                                    <PlusCircle size={16} />
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {(plan.cycles || []).map((cycle, cIdx) => (
                                                    <div key={cycle.id} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 space-y-3 relative group/cycle">
                                                        <button
                                                            onClick={() => {
                                                                const newCycles = plan.cycles.filter(c => c.id !== cycle.id);
                                                                updatePlan(plan.id, { cycles: newCycles });
                                                            }}
                                                            className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/cycle:opacity-100 transition-opacity shadow-lg"
                                                        >
                                                            <MinusCircle size={14} />
                                                        </button>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="space-y-1">
                                                                <Label className="text-[8px] uppercase font-bold text-slate-400">Label</Label>
                                                                <Input
                                                                    value={cycle.name}
                                                                    onChange={e => {
                                                                        const newCycles = [...plan.cycles];
                                                                        newCycles[cIdx] = { ...cycle, name: e.target.value };
                                                                        updatePlan(plan.id, { cycles: newCycles });
                                                                    }}
                                                                    className="h-8 text-[10px] font-bold rounded-lg"
                                                                    placeholder="e.g. Monthly"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-[8px] uppercase font-bold text-slate-400">Price (€)</Label>
                                                                <Input
                                                                    type="number"
                                                                    value={cycle.price}
                                                                    onChange={e => {
                                                                        const newCycles = [...plan.cycles];
                                                                        newCycles[cIdx] = { ...cycle, price: parseFloat(e.target.value) || 0 };
                                                                        updatePlan(plan.id, { cycles: newCycles });
                                                                    }}
                                                                    className="h-8 text-[10px] font-bold rounded-lg"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="space-y-1">
                                                                <Label className="text-[8px] uppercase font-bold text-slate-400">Duration</Label>
                                                                <Input
                                                                    type="number"
                                                                    value={cycle.durationValue}
                                                                    onChange={e => {
                                                                        const newCycles = [...plan.cycles];
                                                                        newCycles[cIdx] = { ...cycle, durationValue: parseInt(e.target.value) || 1 };
                                                                        updatePlan(plan.id, { cycles: newCycles });
                                                                    }}
                                                                    className="h-8 text-[10px] font-bold rounded-lg"
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-[8px] uppercase font-bold text-slate-400">Unit</Label>
                                                                <select
                                                                    className="w-full h-8 rounded-lg border border-slate-200 bg-white dark:bg-slate-900 px-2 text-[10px] font-bold"
                                                                    value={cycle.durationUnit}
                                                                    onChange={e => {
                                                                        const newCycles = [...plan.cycles];
                                                                        newCycles[cIdx] = { ...cycle, durationUnit: e.target.value as any };
                                                                        updatePlan(plan.id, { cycles: newCycles });
                                                                    }}
                                                                >
                                                                    <option value="days">Days</option>
                                                                    <option value="months">Months</option>
                                                                    <option value="years">Years</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1 mt-2">
                                                            <Label className="text-[8px] uppercase font-bold text-teal-600 dark:text-teal-500">Dodo Plan ID (Product/Price ID)</Label>
                                                            <Input
                                                                value={cycle.dodoId || ''}
                                                                onChange={e => {
                                                                    const newCycles = [...plan.cycles];
                                                                    newCycles[cIdx] = { ...cycle, dodoId: e.target.value };
                                                                    updatePlan(plan.id, { cycles: newCycles });
                                                                }}
                                                                className="h-8 text-[10px] font-bold rounded-lg border-teal-200 focus-visible:ring-teal-500 bg-teal-50/30 dark:bg-teal-900/10 dark:border-teal-900/50"
                                                                placeholder="e.g. plan_xxx..."
                                                            />
                                                        </div>

                                                        <RegionalPriceEditor
                                                            prices={cycle.regionalPrices}
                                                            onChange={newPrices => {
                                                                const newCycles = [...plan.cycles];
                                                                newCycles[cIdx] = { ...cycle, regionalPrices: newPrices };
                                                                updatePlan(plan.id, { cycles: newCycles });
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                                {(!plan.cycles || plan.cycles.length === 0) && (
                                                    <p className="text-[10px] text-center py-4 text-slate-400 font-medium italic">No billing cycles defined.</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] uppercase font-black text-slate-400">Badge Text</Label>
                                            <Input value={plan.badge} onChange={e => updatePlan(plan.id, { badge: e.target.value })} placeholder="e.g. BETA ONLY" className="rounded-xl" />
                                        </div>
                                        <div className="flex items-center gap-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={plan.isPopular}
                                                    onChange={e => updatePlan(plan.id, { isPopular: e.target.checked })}
                                                    id={`popular-${plan.id}`}
                                                    className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                                                />
                                                <label htmlFor={`popular-${plan.id}`} className="text-xs font-bold text-slate-600 cursor-pointer">Featured Plan</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={plan.isVisible !== false} // Default to true if undefined
                                                    onChange={e => updatePlan(plan.id, { isVisible: e.target.checked })}
                                                    id={`visible-${plan.id}`}
                                                    className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                                                />
                                                <label htmlFor={`visible-${plan.id}`} className="text-xs font-bold text-slate-600 cursor-pointer text-emerald-600/80">Show on Website</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="space-y-4 pt-4 border-t border-slate-50">
                                        <Label className="text-[10px] uppercase font-black text-slate-400">UI Styling</Label>
                                        <div className="space-y-3">
                                            <select
                                                className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold"
                                                value={plan.icon}
                                                onChange={e => updatePlan(plan.id, { icon: e.target.value })}
                                            >
                                                {Object.keys(IconMap).map(k => <option key={k} value={k}>{k}</option>)}
                                            </select>
                                            <div className="grid grid-cols-2 gap-2">
                                                {[
                                                    { label: 'Indigo', val: 'from-indigo-500 to-violet-600' },
                                                    { label: 'Amber', val: 'from-amber-400 to-orange-500' },
                                                    { label: 'Slate', val: 'from-slate-400 to-slate-600' },
                                                    { label: 'Emerald', val: 'from-emerald-400 to-teal-500' },
                                                    { label: 'Rose', val: 'from-rose-500 to-pink-600' }
                                                ].map(c => (
                                                    <button
                                                        key={c.val}
                                                        onClick={() => updatePlan(plan.id, { color: c.val })}
                                                        className={cn(
                                                            "h-10 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all",
                                                            plan.color === c.val ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                                                            "bg-gradient-to-r text-white",
                                                            c.val
                                                        )}
                                                    >
                                                        {c.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={addPlan}
                            className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all gap-4 min-h-[400px]"
                        >
                            <PlusCircle size={32} />
                            <span className="font-black uppercase tracking-widest text-xs">Add New Tier</span>
                        </button>
                    </div>
                </TabsContent>

                <TabsContent value="comparison" className="mt-0">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">Feature Comparison</h3>
                                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">Define visibility across plans</p>
                            </div>
                            <Button onClick={addFeature} className="bg-white text-indigo-600 hover:bg-white border border-slate-200 rounded-xl font-bold px-6 shadow-none">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Feature Row
                            </Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="py-6 px-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-1/4">Feature Label</th>
                                        {config.plans.map(plan => (
                                            <th key={plan.id} className="py-6 px-8 text-center text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                                {plan.name}
                                            </th>
                                        ))}
                                        <th className="w-20"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {config.comparison.map((feat, fIdx) => (
                                        <tr key={fIdx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                            <td className="py-4 px-8">
                                                <Input
                                                    value={feat.name}
                                                    onChange={e => updateFeature(fIdx, { name: e.target.value })}
                                                    className="h-10 text-[11px] font-bold uppercase tracking-tight bg-transparent border-none focus-visible:ring-0 focus:bg-white transition-all p-0 text-slate-900"
                                                />
                                            </td>
                                            {config.plans.map(plan => {
                                                const val = feat[plan.id];
                                                return (
                                                    <td key={plan.id} className="py-2 px-8">
                                                        <div className="flex items-center justify-center">
                                                            {typeof val === 'boolean' ? (
                                                                <div className="relative group/bool">
                                                                    <button
                                                                        onClick={() => updateFeature(fIdx, { [plan.id]: !val })}
                                                                        className={cn(
                                                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                                                            val ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300"
                                                                        )}
                                                                    >
                                                                        {val ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => updateFeature(fIdx, { [plan.id]: "" })}
                                                                        className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover/bool:opacity-100 transition-opacity z-10 hover:text-indigo-600"
                                                                        title="Switch to Text"
                                                                    >
                                                                        <MessageSquare size={8} />
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="relative group/val">
                                                                    <Input
                                                                        value={val || ''}
                                                                        onChange={e => updateFeature(fIdx, { [plan.id]: e.target.value })}
                                                                        className="h-9 w-24 text-[10px] text-center font-black uppercase text-slate-900 border-none bg-slate-50/50 rounded-lg group-hover/val:bg-white border-transparent focus:ring-1 focus:ring-indigo-500"
                                                                    />
                                                                    <button
                                                                        onClick={() => updateFeature(fIdx, { [plan.id]: true })}
                                                                        className="absolute -top-1 -right-1 w-4 h-4 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[8px] opacity-0 group-hover/val:opacity-100 transition-opacity"
                                                                        title="Switch to Checkbox"
                                                                    >
                                                                        <Check size={8} />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                            <td className="px-8 flex justify-end gap-2 items-center">
                                                <div className="flex flex-col gap-0.5">
                                                    <button
                                                        onClick={() => moveFeature(fIdx, 'up')}
                                                        disabled={fIdx === 0}
                                                        className="p-1 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 rounded disabled:opacity-30 disabled:hover:text-slate-300 disabled:hover:bg-transparent"
                                                        title="Move Up"
                                                    >
                                                        <ArrowUp size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => moveFeature(fIdx, 'down')}
                                                        disabled={fIdx === config.comparison.length - 1}
                                                        className="p-1 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 rounded disabled:opacity-30 disabled:hover:text-slate-300 disabled:hover:bg-transparent"
                                                        title="Move Down"
                                                    >
                                                        <ArrowDown size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFeature(fIdx)}
                                                    className="p-2 transition-all text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                                                    title="Delete Feature Row"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-[2.5rem] p-8 border border-amber-100 dark:border-amber-900/20">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-widest">Pricing Strategy Tip</h4>
                        <p className="text-xs font-medium text-amber-700/70 dark:text-amber-400/70 mt-1">You can enter values like "BASIC", "ADVANCED" or "UNLIMITED" to show text instead of a tick/cross. Just type in the cell!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
