import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
    Radar,
    Zap,
    ShieldCheck,
    Activity,
    Bell,
    Calendar,
    MapPin,
    Loader2,
    RefreshCw,
    Clock,
    AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Slot {
    id: string;
    university: string;
    city: string | null;
    region: string | null;
    test_date: string;
    registration_deadline: string | null;
    seats_available: boolean;
    seats_count: string | null;
    updated_at: string;
}

export default function SeatRadarManager() {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPushing, setIsPushing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchSlots = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('cent_exam_slots')
                .select('*')
                .eq('seats_available', true)
                .order('test_date', { ascending: true });

            if (error) throw error;
            setSlots(data || []);
            setLastUpdated(new Date());
        } catch (error: any) {
            toast.error('Failed to fetch seats: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSlots();
        // Set up real-time subscription
        const channel = supabase
            .channel('cent_seat_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cent_exam_slots' }, () => {
                fetchSlots();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleForcePush = async () => {
        setIsPushing(true);
        try {
            const { data, error } = await supabase.functions.invoke('seat-scraper', {
                body: { force: true }
            });

            if (error) throw error;

            toast.success('Broadcast signal deployed! 🚀', {
                description: 'Seats are being pushed to all Global subscribers.'
            });
            fetchSlots();
        } catch (error: any) {
            console.error('Push Error:', error);
            toast.error('Push failed: ' + error.message);
        } finally {
            setIsPushing(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Radar Header */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 shadow-2xl">
                {/* Background Radar Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-10">
                    <div className="absolute inset-0 border border-indigo-500 rounded-full animate-[ping_3s_infinite]" />
                    <div className="absolute inset-[100px] border border-indigo-400 rounded-full animate-[ping_4s_infinite]" />
                    <div className="absolute inset-[200px] border border-indigo-300 rounded-full animate-[ping_5s_infinite]" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 transform -rotate-6">
                                <Radar className="w-10 h-10 animate-pulse" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-900 animate-bounce" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tighter">Seat Radar <span className="text-indigo-400">v2.0</span></h2>
                            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-1 flex items-center gap-2">
                                <Activity className="w-3 h-3 text-emerald-500" />
                                Automated Scraper Active
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <Button
                            onClick={handleForcePush}
                            disabled={isPushing}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-8 h-14 font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                        >
                            {isPushing ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-3" />
                            ) : (
                                <Zap className="w-5 h-5 mr-3 group-hover:text-amber-400 transition-colors" />
                            )}
                            {isPushing ? 'Deploying Signal...' : 'Push to Telegram'}
                        </Button>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            Filtered for Global/Elite Users
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            Live Availability ({slots.length})
                        </h3>
                        <button
                            onClick={fetchSlots}
                            className="text-[10px] font-black text-slate-400 hover:text-indigo-500 flex items-center gap-1 transition-colors"
                        >
                            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                            {isLoading ? 'Scanning...' : 'Scan Now'}
                        </button>
                    </div>

                    {slots.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-300">
                                <Radar className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-slate-400 font-bold text-sm">No available seats detected on the radar.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {slots.map((slot) => (
                                <div key={slot.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 hover:border-indigo-500/20 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                                            Live
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">Automated: Every 5m</p>
                                            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">{slot.city}, {slot.region}</p>
                                            <h4 className="font-bold text-slate-900 dark:text-white leading-tight pr-12">{slot.university}</h4>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Calendar className="w-3 h-3" />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight">Test Date</span>
                                                </div>
                                                <p className="text-xs font-black text-slate-900 dark:text-slate-200">{slot.test_date}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Zap className="w-3 h-3" />
                                                    <span className="text-[10px] font-bold uppercase tracking-tight">Status</span>
                                                </div>
                                                <p className="text-xs font-black text-emerald-500 uppercase">{slot.seats_count || 'Available'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-indigo-600 rounded-[2rem] p-8 text-white space-y-6 shadow-xl shadow-indigo-500/20">
                        <h3 className="text-lg font-black leading-tight">Automation Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-4 h-4 text-emerald-400" />
                                    <span className="text-[10px] font-bold uppercase">Background Cron</span>
                                </div>
                                <span className="text-[10px] font-black uppercase bg-emerald-500 px-2 py-0.5 rounded-full">Active</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-indigo-300" />
                                    <span className="text-[10px] font-bold uppercase">Schedule</span>
                                </div>
                                <span className="text-[10px] font-black uppercase">Every 5m</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-[10px] font-bold text-indigo-200 italic">
                                "This system automatically scans the CISIA portal every 5 minutes and broadcasts updates to premium users only."
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Admin Note</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            The "Push to Telegram" button triggers an immediate scan and broadcasts **all** currently available seats, even if they haven't changed status recently. Use this for testing or manual updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
