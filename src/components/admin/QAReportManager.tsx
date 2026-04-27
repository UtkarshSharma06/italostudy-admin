import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Trash2, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';

const FLAIRS = [
    "⚠️ Scam", "❌ Wrong Info", "✅ Good Answer", "📌 High Quality", "🛡️ Official", "🎯 Spot On",
    "🎓 Expert Answer", "🔥 Hot Take", "🗑️ Low Effort", "🛑 Off-Topic", "🌶️ Controversial",
    "💬 Discussion", "💡 Great Tip", "📣 Announcement", "📚 Study Guide", "🎓 Admissions",
    "🧪 Science/Bio", "🤔 Needs Refinement", "⭐ Exceptional"
];

export default function QAReportManager() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFlairs, setSelectedFlairs] = useState<Record<string, string>>({});
    const { toast } = useToast();

    useEffect(() => { fetchReports(); }, []);

    const fetchReports = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('qa_reports')
            .select(`
                *,
                reporter:reporter_id (display_name, email)
            `)
            .order('created_at', { ascending: false });
        if (!error && data) setReports(data);
        setLoading(false);
    };

    const handleAction = async (reportId: string, action: 'dismiss' | 'delete' | 'flair', flairVal?: string) => {
        if (!window.confirm(`Are you sure you want to ${action} this report?`)) return;
        try {
            const { error } = await supabase.rpc('admin_resolve_qa_report', {
                p_report_id: reportId,
                p_action: action,
                p_flair: flairVal || null
            });
            if (error) throw error;
            toast({ title: "Success", description: "Moderation action executed securely." });
            fetchReports();
        } catch (e: any) {
            toast({ variant: "destructive", title: "Error", description: e.message });
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Community Reports...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Q&A Moderation Queue</h2>
            </div>
            
            {reports.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-700">All clear!</h3>
                    <p className="text-slate-500 mt-1">There are no pending reports from the community frontlines.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {reports.map(r => (
                        <div key={r.id} className={`p-5 border rounded-xl bg-white shadow-sm flex flex-col gap-4 ${r.status !== 'pending' ? 'opacity-60' : 'border-red-100'}`}>
                            
                            <div className="flex flex-wrap justify-between items-start gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        {r.reason}
                                    </span>
                                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md capitalize border border-indigo-100">{r.target_type}</span>
                                    <div className="text-sm text-slate-500">
                                        Reported by <span className="font-semibold text-slate-700">{r.reporter?.display_name || 'Anonymous User'}</span>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide border ${r.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                    {r.status}
                                </span>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                                <p className="italic font-serif leading-relaxed line-clamp-3 pl-2">"{r.target_preview}"</p>
                            </div>
                            
                            {r.custom_note && (
                                <div className="text-sm text-slate-600 bg-blue-50/50 p-3 rounded-md border border-blue-100">
                                    <strong className="text-slate-800 flex items-center gap-1.5 mb-1">
                                        <MessageSquare className="w-3.5 h-3.5" /> User Note:
                                    </strong>
                                    {r.custom_note}
                                </div>
                            )}
                            
                            {r.status === 'pending' && (
                                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 mt-1">
                                    {/* Primary Resolution Actions */}
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleAction(r.id, 'dismiss')} className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200">
                                            <XCircle className="w-4 h-4" /> Ignore & Dismiss
                                        </button>
                                        <button onClick={() => handleAction(r.id, 'delete')} className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm">
                                            <Trash2 className="w-4 h-4" /> Delete Content Permanently
                                        </button>
                                    </div>
                                    
                                    <div className="h-6 w-px bg-slate-200 hidden md:block mx-1"></div>

                                    {/* Passive Moderation (Flairs) */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-400 mr-1">Or apply flair:</span>
                                        <select 
                                            value={selectedFlairs[r.id] || FLAIRS[0]}
                                            onChange={e => setSelectedFlairs({...selectedFlairs, [r.id]: e.target.value})}
                                            className="text-xs font-bold px-2 py-1.5 border border-slate-200 text-slate-700 bg-white rounded shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                        >
                                            {FLAIRS.map(f => <option key={f} value={f}>{f}</option>)}
                                        </select>
                                        <button onClick={() => handleAction(r.id, 'flair', selectedFlairs[r.id] || FLAIRS[0])} className="text-xs font-bold px-3 py-1.5 border border-indigo-200 text-indigo-700 bg-indigo-50 rounded shadow-sm hover:bg-indigo-100 transition-colors">Apply Flair</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
