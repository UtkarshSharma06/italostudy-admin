
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
    ShieldAlert,
    Ban,
    CheckCircle2,
    Loader2,
    Shield,
    Trash2,
    AlertTriangle,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DOMPurify from 'dompurify';

interface BannedIP {
    ip: string;
    reason: string;
    created_at: string;
}

interface SecurityAlert {
    id: string;
    title: string;
    short_description: string;
    content_html: string;
    created_at: string;
    is_active: boolean;
    ip_data?: string; // Extracted from description if needed
}

export default function SecurityMonitor() {
    const [bannedIPs, setBannedIPs] = useState<BannedIP[]>([]);
    const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetch Banned IPs
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { data: bans, error: banError } = await (supabase as any)
                .from('banned_ips')
                .select('*')
                .order('created_at', { ascending: false });

            if (banError) throw banError;
            setBannedIPs(bans as BannedIP[] || []);

            // Fetch Security Alerts (from site_notifications)
            const { data: notifications, error: notifError } = await supabase
                .from('site_notifications')
                .select('*')
                .eq('title', 'Security Alert: IP Overlap')
                .order('created_at', { ascending: false })
                .limit(20);

            if (notifError) throw notifError;
            setAlerts(notifications || []);

        } catch (error: unknown) {
            toast({
                title: "Error fetching security data",
                description: (error as Error).message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchData();

        // Realtime subscription for bans
        const channel = supabase
            .channel('security_monitor')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on('postgres_changes', { event: '*', schema: 'public', table: 'banned_ips' as any }, fetchData)
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchData]);

    const handleUnbanIP = async (ip: string) => {
        if (!confirm(`Unban IP ${ip}? This will allow access again.`)) return;

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase as any).rpc('unban_ip', { target_ip: ip });
            if (error) throw error;

            toast({ title: "IP Unbanned", description: `${ip} has been removed from the blacklist.` });
            fetchData();
        } catch (error: unknown) {
            // Fallback to direct delete if RPC fails (though RPC is preferred for security definer)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error: delError } = await (supabase as any).from('banned_ips').delete().eq('ip', ip);
            if (delError) {
                toast({ title: "Failed to unban", description: (error as Error).message, variant: "destructive" });
            } else {
                toast({ title: "IP Unbanned", description: `${ip} has been removed.` });
                fetchData();
            }
        }
    };

    const handleBanFromAlert = async (alert: SecurityAlert) => {
        // Extract IP from the HTML content if possible, or just parse description
        // content_html: "...joined from IP <strong>123.123.123.123</strong>..."
        const ipMatch = alert.content_html.match(/IP <strong>(.*?)<\/strong>/);
        const ipToBan = ipMatch ? ipMatch[1] : null;

        if (!ipToBan) {
            toast({ title: "Could not parse IP", description: "Please ban manually from User Manager.", variant: "destructive" });
            return;
        }

        if (!confirm(`Ban detected IP ${ipToBan}?`)) return;

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { error } = await (supabase as any)
                .from('banned_ips')
                .upsert({ ip: ipToBan, reason: `Banned from Security Alert (${alert.short_description})` });

            if (error) throw error;

            toast({ title: "IP Banned", description: `${ipToBan} is now blocked.`, variant: "destructive" });
            fetchData();
        } catch (error: unknown) {
            toast({ title: "Failed to ban", description: (error as Error).message, variant: "destructive" });
        }
    };

    const handleDismissAlert = async (id: string) => {
        try {
            const { error } = await supabase
                .from('site_notifications')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setAlerts(alerts.filter(a => a.id !== id));
        } catch (error: unknown) {
            toast({ title: "Error", description: "Could not dismiss alert", variant: "destructive" });
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black text-rose-500 leading-none mb-2 flex items-center gap-3">
                    <ShieldAlert className="w-8 h-8" />
                    Security Monitor
                </h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Threat detection & active bans</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Active Bans Section */}
                <div className="card-surface p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <Ban className="w-4 h-4 text-rose-500" />
                            Active IP Bans
                        </h3>
                        <Badge variant="outline" className="font-mono">{bannedIPs.length}</Badge>
                    </div>

                    {isLoading ? (
                        <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-slate-300" /></div>
                    ) : bannedIPs.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                            No active bans
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {bannedIPs.map(ban => (
                                <div key={ban.ip} className="flex items-center justify-between p-3 bg-rose-50/50 border border-rose-100 rounded-xl group hover:border-rose-200 transition-all">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-3 h-3 text-rose-400" />
                                            <span className="font-mono text-xs font-bold text-rose-900">{ban.ip}</span>
                                        </div>
                                        <p className="text-[10px] text-rose-700/70 mt-0.5">{ban.reason}</p>
                                        <p className="text-[9px] text-slate-400 mt-1">{new Date(ban.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-100 h-8"
                                        onClick={() => handleUnbanIP(ban.ip)}
                                    >
                                        Unban
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Security Alerts Section */}
                <div className="card-surface p-6 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            Live Threats
                        </h3>
                        <Badge variant="outline" className="font-mono">{alerts.length}</Badge>
                    </div>

                    {isLoading ? (
                        <div className="py-12 flex justify-center"><Loader2 className="animate-spin text-slate-300" /></div>
                    ) : alerts.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest flex flex-col items-center gap-2">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400/50" />
                            System Nominal
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {alerts.map(alert => (
                                <Alert key={alert.id} className="bg-amber-50/50 border-amber-100">
                                    <ShieldAlert className="h-4 w-4 text-amber-600" />
                                    <AlertTitle className="text-xs font-bold text-amber-900 uppercase tracking-tight">
                                        {alert.title}
                                    </AlertTitle>
                                    <AlertDescription className="mt-1">
                                        <div className="text-[10px] text-amber-800" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(alert.content_html) }} />
                                        <div className="flex items-center gap-2 mt-3">
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="h-6 text-[9px] uppercase font-bold px-2 py-0"
                                                onClick={() => handleBanFromAlert(alert)}
                                            >
                                                Ban Source IP
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-6 text-[9px] uppercase font-bold text-slate-400 hover:text-slate-600 px-2 py-0"
                                                onClick={() => handleDismissAlert(alert.id)}
                                            >
                                                Dismiss
                                            </Button>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
