import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle2, Edit3, Loader2, MessageSquare, Trash2 } from 'lucide-react';
import { MathText } from '@/components/MathText';
import MediaEditor from '@/components/admin/MediaEditor';
import QuestionMedia from '@/components/QuestionMedia';

interface QuestionReport {
    id: string;
    user_id: string;
    question_id: string;
    master_question_id: string;
    source_table: 'practice_questions' | 'session_questions';
    reason: string;
    details?: string;
    status: string;
    created_at: string;
    profiles: {
        display_name: string;
        email: string;
    };
}

export default function QuestionReportManager() {
    const { toast } = useToast();
    const [reports, setReports] = useState<QuestionReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ pending: 0, resolved: 0 });
    const [selectedReport, setSelectedReport] = useState<QuestionReport | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<any>(null);
    const [adminMessage, setAdminMessage] = useState('');
    const [isResolving, setIsResolving] = useState(false);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setLoading(true);
        try {
            // Fetch counts for stats
            const { data: allReports, error: statsError } = await (supabase as any)
                .from('question_reports')
                .select('status');

            if (statsError) throw statsError;

            const pending = allReports?.filter(r => r.status === 'pending').length || 0;
            const resolved = allReports?.filter(r => r.status === 'resolved').length || 0;
            setStats({ pending, resolved });

            // Fetch pending reports for table
            const { data, error } = await (supabase as any)
                .from('question_reports')
                .select('*, profiles(display_name, email)')
                .eq('status', 'pending')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReports(data || []);
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleEditReport = async (report: QuestionReport) => {
        setSelectedReport(report);
        // Fetch current question content from the source table
        try {
            const { data, error } = await supabase
                .from(report.source_table)
                .select('*')
                .eq('id', report.master_question_id)
                .maybeSingle(); // Use maybeSingle to avoid 406 errors

            if (error) throw error;

            if (!data) {
                toast({ title: "Question not found", description: "The reported question was not found in the database.", variant: "destructive" });
                return;
            }

            setEditingQuestion(data);
            setAdminMessage('');
        } catch (error: any) {
            toast({ title: "Error fetching question", description: error.message, variant: "destructive" });
        }
    };

    const handleResolve = async () => {
        if (!selectedReport || !editingQuestion) return;
        setIsResolving(true);
        try {
            const { error } = await supabase.rpc('resolve_question_report', {
                p_report_id: selectedReport.id,
                p_new_question_text: editingQuestion.question_text,
                p_new_options: editingQuestion.options,
                p_new_correct_index: editingQuestion.correct_index,
                p_new_explanation: editingQuestion.explanation,
                p_admin_message: adminMessage,
                p_new_passage: editingQuestion.passage,
                p_new_media: editingQuestion.media // Pass media to RPC
            });

            if (error) throw error;

            toast({ title: "Success", description: "Question corrected and report resolved." });
            setSelectedReport(null);
            setEditingQuestion(null);
            fetchReports();
        } catch (error: any) {
            toast({ title: "Resolution failed", description: error.message, variant: "destructive" });
        } finally {
            setIsResolving(false);
        }
    };

    const handleDeleteReport = async (id: string) => {
        if (!confirm('Are you sure you want to delete this report? This action cannot be undone.')) return;

        try {
            const { error } = await supabase
                .from('question_reports')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast({ title: "Success", description: "Report deleted successfully." });
            fetchReports();
        } catch (error: any) {
            toast({ title: "Error deleting report", description: error.message, variant: "destructive" });
        }
    };

    const updateOption = (index: number, value: string) => {
        const newOptions = [...editingQuestion.options];
        newOptions[index] = value;
        setEditingQuestion({ ...editingQuestion, options: newOptions });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Question Reports</h2>
                    <p className="text-sm text-slate-500">Review and fix incorrect questions flagged by users.</p>
                </div>
                <Button onClick={fetchReports} variant="outline" size="sm">
                    Refresh
                </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Pending Reports</p>
                        <p className="text-2xl font-black">{stats.pending}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Resolved Reports</p>
                        <p className="text-2xl font-black">{stats.resolved}</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            ) : reports.length === 0 ? (
                <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold">All Clear!</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2">No pending question reports at the moment.</p>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Reporter</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell className="text-xs text-slate-500">
                                        {new Date(report.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-bold text-sm">{report.profiles?.display_name || 'Student'}</p>
                                        <p className="text-[10px] text-slate-400">{report.profiles?.email}</p>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${report.source_table === 'practice_questions' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {report.source_table.replace('_', ' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <p className="text-sm text-slate-600 italic line-clamp-2">"{report.reason}"</p>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => handleEditReport(report)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                                Resolve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeleteReport(report.id)}
                                                className="text-rose-600 border-rose-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            <Dialog open={!!editingQuestion} onOpenChange={(open) => !open && setEditingQuestion(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            Correct Reported Question
                        </DialogTitle>
                    </DialogHeader>

                    {editingQuestion && (
                        <div className="space-y-6 py-4">
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase tracking-wider">Reported By</Label>
                                    <p className="font-medium">{selectedReport?.profiles?.display_name || 'Unknown User'}</p>
                                    <p className="text-xs text-slate-400">{selectedReport?.profiles?.email}</p>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500 uppercase tracking-wider">Reason</Label>
                                    <p className="font-medium text-rose-600">{selectedReport?.reason}</p>
                                </div>
                                {selectedReport?.details && (
                                    <div className="col-span-2 pt-2 mt-2 border-t border-slate-200">
                                        <Label className="text-xs text-slate-500 uppercase tracking-wider mb-1 block">User Details</Label>
                                        <p className="text-sm text-slate-700 whitespace-pre-wrap">"{selectedReport.details}"</p>
                                    </div>
                                )}
                            </div>

                            {/* Media Editor */}
                            <div className="grid gap-2">
                                <Label>Media Content</Label>
                                <MediaEditor
                                    media={editingQuestion.media}
                                    onChange={(media) => setEditingQuestion({ ...editingQuestion, media })}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Question Text</Label>
                                <Textarea
                                    value={editingQuestion.question_text}
                                    onChange={(e) => setEditingQuestion({ ...editingQuestion, question_text: e.target.value })}
                                    rows={4}
                                />
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Preview (Math Rendering)</p>
                                    {editingQuestion.media && (
                                        <div className="mb-4">
                                            <QuestionMedia media={editingQuestion.media} />
                                        </div>
                                    )}
                                    <MathText content={editingQuestion.question_text} className="text-sm" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label>Passage (Optional)</Label>
                                <Textarea
                                    value={editingQuestion.passage || ''}
                                    onChange={(e) => setEditingQuestion({ ...editingQuestion, passage: e.target.value })}
                                    placeholder="Enter reading passage if applicable..."
                                    rows={6}
                                />
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Passage Preview</p>
                                    <MathText content={editingQuestion.passage || ''} className="text-sm" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label>Options</Label>
                                {editingQuestion.options.map((opt: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <button
                                            onClick={() => setEditingQuestion({ ...editingQuestion, correct_index: idx })}
                                            className={`mt-2 w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all ${editingQuestion.correct_index === idx
                                                ? 'bg-emerald-500 text-white ring-2 ring-emerald-100 shadow-lg'
                                                : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                                                }`}
                                        >
                                            {String.fromCharCode(65 + idx)}
                                        </button>

                                        <div className="flex-1 space-y-2">
                                            <Input
                                                value={opt}
                                                onChange={(e) => updateOption(idx, e.target.value)}
                                                className={editingQuestion.correct_index === idx ? 'border-emerald-200 bg-emerald-50/20' : ''}
                                            />
                                            <div className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                                <MathText content={opt} className="text-xs" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid gap-2">
                                <Label>Explanation</Label>
                                <Textarea
                                    value={editingQuestion.explanation || ''}
                                    onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                                    rows={3}
                                />
                                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <p className="text-[10px] font-black uppercase text-blue-400 mb-2">Explanation Preview</p>
                                    <MathText content={editingQuestion.explanation || ''} className="text-sm" />
                                </div>
                            </div>

                            <div className="grid gap-2 pt-4 border-t border-slate-100">
                                <Label className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                    Message to Student (Optional)
                                </Label>
                                <Input
                                    placeholder="e.g., Thank you! We have updated the correct answer and improved the explanation."
                                    value={adminMessage}
                                    onChange={(e) => setAdminMessage(e.target.value)}
                                />
                                <p className="text-[10px] text-slate-400 italic">This message will appear on the student's dashboard.</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setEditingQuestion(null)}>Cancel</Button>
                        <Button
                            onClick={handleResolve}
                            disabled={isResolving}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[150px]"
                        >
                            {isResolving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                            Resolve & Propagate Fix
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
