import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Settings,
    Shield,
    Zap,
    AlertTriangle,
    RefreshCw,
    Save,
    LayoutDashboard
} from 'lucide-react';
import { toast } from 'sonner';
import PaymentConfig from '@/components/admin/PaymentConfig';

export default function SystemConfig() {
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [config, setConfig] = useState({
        maintenance_mode: false,
        support_email: 'contact@italostudy.com',
        site_name: 'ItaloStudy',
        allow_registrations: true,
        enable_community: true,
        page_configs: {
            '/subjects': { enabled: true, message: "" },
            '/practice': { enabled: true, message: "" },
            '/learning': { enabled: false, message: "The Learning Hub is currently under development. We're working hard to bring you the best content!" },
            '/community': { enabled: true, message: "" },
            '/mock-exams': { enabled: true, message: "" },
            '/analytics': { enabled: true, message: "" },
            '/settings': { enabled: true, message: "" },
            '/store': { enabled: true, message: "" },
        }
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data, error } = await supabase
                    .from('system_settings')
                    .select('*');

                if (error) throw error;

                const newConfig = { ...config };
                data?.forEach(setting => {
                    if (setting.key === 'maintenance_mode') newConfig.maintenance_mode = setting.value as boolean;
                    if (setting.key === 'allow_registrations') newConfig.allow_registrations = setting.value as boolean;
                    if (setting.key === 'enable_community') newConfig.enable_community = setting.value as boolean;
                    if (setting.key === 'is_review_collector_enabled') (newConfig as any).is_review_collector_enabled = setting.value as boolean;
                    if (setting.key === 'page_configs') newConfig.page_configs = { ...newConfig.page_configs, ...(setting.value as any) };
                    if (setting.key === 'site_config') {
                        const val = setting.value as any;
                        newConfig.site_name = val.site_name;
                        newConfig.support_email = val.support_email;
                    }
                });
                setConfig(newConfig);
            } catch (err: any) {
                console.error("Error fetching settings:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const user = (await supabase.auth.getUser()).data.user;
            const updates = [
                { key: 'maintenance_mode', value: config.maintenance_mode, updated_by: user?.id },
                { key: 'allow_registrations', value: config.allow_registrations, updated_by: user?.id },
                { key: 'enable_community', value: config.enable_community, updated_by: user?.id },
                { key: 'is_review_collector_enabled', value: (config as any).is_review_collector_enabled, updated_by: user?.id },
                { key: 'page_configs', value: config.page_configs, updated_by: user?.id },
                { key: 'site_config', value: { site_name: config.site_name, support_email: config.support_email }, updated_by: user?.id }
            ];

            const { error } = await supabase
                .from('system_settings')
                .upsert(updates);

            if (error) throw error;
            toast.success('Settings persisted successfully!');
        } catch (err: any) {
            toast.error('Failed to save settings: ' + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const togglePage = (path: string, val: boolean) => {
        const newPageConfigs = { ...config.page_configs, [path]: { ...config.page_configs[path as keyof typeof config.page_configs], enabled: val } };
        
        // Sync community toggle if applicable
        if (path === '/community') {
            setConfig({ ...config, page_configs: newPageConfigs, enable_community: val });
        } else {
            setConfig({ ...config, page_configs: newPageConfigs });
        }
    };

    const updatePageMessage = (path: string, msg: string) => {
        setConfig({
            ...config,
            page_configs: {
                ...config.page_configs,
                [path]: { ...config.page_configs[path as keyof typeof config.page_configs], message: msg }
            }
        });
    };

    const PAGE_LABELS: Record<string, string> = {
        '/subjects': 'Subjects Portal',
        '/practice': 'Practice Engine',
        '/learning': 'Learning Hub',
        '/community': 'Community & Chat',
        '/mock-exams': 'Mock Exam System',
        '/analytics': 'Performance Analytics',
        '/settings': 'User Settings & Profile',
        '/store': 'Marketplace (Store)'
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Site Settings</h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">Manage global platform configurations and defaults</p>
                    </div>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 h-12 font-bold transition-all active:scale-95"
                >
                    {isSaving ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Settings
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Core Settings */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-indigo-500" />
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">General Configuration</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Website Name</Label>
                                <Input
                                    value={config.site_name}
                                    onChange={e => setConfig({ ...config, site_name: e.target.value })}
                                    className="rounded-xl border-slate-200 dark:border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Support Email Address</Label>
                                <Input
                                    value={config.support_email}
                                    onChange={e => setConfig({ ...config, support_email: e.target.value })}
                                    className="rounded-xl border-slate-200 dark:border-slate-800"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="w-5 h-5 text-amber-500" />
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Feature Controls</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">Maintenance Mode</p>
                                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">Pause public access to the platform</p>
                                </div>
                                <Switch
                                    checked={config.maintenance_mode}
                                    onCheckedChange={val => setConfig({ ...config, maintenance_mode: val })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">User Registrations</p>
                                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">Allow new students to create accounts</p>
                                </div>
                                <Switch
                                    checked={config.allow_registrations}
                                    onCheckedChange={val => setConfig({ ...config, allow_registrations: val })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                                <div>
                                    <p className="text-xs font-bold text-amber-900 dark:text-amber-400">Trustpilot Collector</p>
                                    <p className="text-[10px] font-medium text-amber-600/70 dark:text-amber-500/50 mt-0.5">Gate mock exams behind a review screenshot</p>
                                </div>
                                <Switch
                                    checked={(config as any).is_review_collector_enabled}
                                    onCheckedChange={val => setConfig({ ...config, is_review_collector_enabled: val } as any)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Management */}
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <LayoutDashboard className="w-5 h-5 text-indigo-500" />
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Page Visibility & Development</h3>
                    </div>

                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.entries(config.page_configs).map(([path, settings]) => (
                            <div key={path} className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                            {PAGE_LABELS[path] || path}
                                        </p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{path}</p>
                                    </div>
                                    <Switch
                                        checked={settings.enabled}
                                        onCheckedChange={val => togglePage(path, val)}
                                    />
                                </div>
                                
                                {!settings.enabled && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <Label className="text-[9px] font-black uppercase tracking-widest text-indigo-500">Custom Maintenance Message</Label>
                                        <Input 
                                            placeholder="e.g. This page is currently under development..."
                                            value={settings.message}
                                            onChange={e => updatePageMessage(path, e.target.value)}
                                            className="h-10 text-xs rounded-xl bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/50 focus:border-indigo-500"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Critical Warnings */}
            <div className="bg-rose-50 dark:bg-rose-900/10 rounded-[2rem] p-8 border border-rose-100 dark:border-rose-900/20">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center text-rose-600 shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-rose-900 dark:text-rose-400 uppercase tracking-widest">Important Note</h4>
                        <p className="text-xs font-medium text-rose-700/70 dark:text-rose-400/70 mt-1">Changes made here affect all users globally. Please double-check your settings before saving.</p>
                    </div>
                </div>
            </div>

            {/* Payment Configuration */}
            <PaymentConfig />
        </div>
    );
}
