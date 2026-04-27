import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, User, Calendar } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MockEvaluationManager() {
    const { toast } = useToast();
    const [mockSubmissions, setMockSubmissions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [evaluatingSubmission, setEvaluatingSubmission] = useState<any>(null);
    const [gradingData, setGradingData] = useState({
        overall: 6.0,
        task: 6.0,
        coherence: 6.0,
        lexical: 6.0,
        grammar: 6.0,
        feedback: ''
    });

    useEffect(() => {
        fetchPendingMockSubmissions();
    }, []);

    const fetchPendingMockSubmissions = async () => {
        setIsLoading(true);

        // Fetch mock exam submissions with pending writing evaluations
        const { data, error } = await (supabase as any)
            .from('mock_exam_submissions')
            .select(`
                *,
                profiles(display_name, email),
                mock_sessions(title),
                writing_submissions!mock_exam_submissions_writing_submission_id_fkey(id, content, created_at, status)
            `)
            .eq('status', 'pending')
            .not('writing_submission_id', 'is', null)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching mock submissions:', error);
            toast({
                title: "Error",
                description: "Failed to load mock exam submissions",
                variant: "destructive"
            });
        } else {
            setMockSubmissions(data || []);
        }

        setIsLoading(false);
    };

    const handleOpenEvaluation = async (submission: any) => {
        setEvaluatingSubmission(submission);
        setGradingData({
            overall: 6.0,
            task: 6.0,
            coherence: 6.0,
            lexical: 6.0,
            grammar: 6.0,
            feedback: ''
        });
    };

    const handleSaveEvaluation = async () => {
        if (!evaluatingSubmission) return;

        // Calculate overall band (average of all criteria)
        const overallBand = (
            gradingData.task +
            gradingData.coherence +
            gradingData.lexical +
            gradingData.grammar
        ) / 4;

        // Save writing feedback
        const { error: feedbackError } = await supabase
            .from('writing_feedback')
            .insert({
                submission_id: evaluatingSubmission.writing_submissions[0].id,
                overall_score: overallBand,
                task_achievement_score: gradingData.task,
                coherence_score: gradingData.coherence,
                lexical_score: gradingData.lexical,
                grammar_score: gradingData.grammar,
                feedback_text: gradingData.feedback || "Band score finalized by examiner."
            });

        if (feedbackError) {
            toast({ title: "Error", description: feedbackError.message, variant: "destructive" });
            return;
        }

        // Update writing submission status
        await supabase
            .from('writing_submissions')
            .update({ status: 'completed' })
            .eq('id', evaluatingSubmission.writing_submissions[0].id);

        // Update mock exam submission with writing band and mark as completed
        const { error: updateError } = await (supabase as any)
            .from('mock_exam_submissions')
            .update({
                writing_band: overallBand,
                status: 'completed',
                evaluated_at: new Date().toISOString()
            })
            .eq('id', evaluatingSubmission.id);

        if (updateError) {
            toast({ title: "Error", description: updateError.message, variant: "destructive" });
        } else {
            toast({
                title: "Evaluation Complete",
                description: `Band ${overallBand.toFixed(1)} submitted. Student will be notified.`
            });
            setEvaluatingSubmission(null);
            fetchPendingMockSubmissions();
        }
    };

    const bandMetrics = [
        { key: 'task', label: 'Task Achievement' },
        { key: 'coherence', label: 'Coherence & Cohesion' },
        { key: 'lexical', label: 'Lexical Resource' },
        { key: 'grammar', label: 'Grammar & Accuracy' }
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Mock Exam Evaluations</h2>
                <div className="text-sm text-slate-500">
                    {mockSubmissions.length} pending evaluation{mockSubmissions.length !== 1 ? 's' : ''}
                </div>
            </div>

            {mockSubmissions.length === 0 ? (
                <Card className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Pending Evaluations</h3>
                    <p className="text-slate-500">All mock exam submissions have been evaluated.</p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {mockSubmissions.map((submission) => (
                        <Card key={submission.id} className="p-6 hover:border-indigo-300 transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                {submission.profiles?.display_name || 'Unknown Student'}
                                            </h3>
                                            <p className="text-sm text-slate-500">{submission.profiles?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 ml-13">
                                        <div className="flex items-center gap-1">
                                            <FileText className="w-4 h-4" />
                                            <span>{submission.mock_sessions?.title || 'Mock Exam'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleOpenEvaluation(submission)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                                >
                                    Evaluate Writing
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Evaluation Dialog */}
            <Dialog open={!!evaluatingSubmission} onOpenChange={() => setEvaluatingSubmission(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">IELTS Writing Evaluation</DialogTitle>
                        <DialogDescription>
                            Grade the student's writing performance across all criteria
                        </DialogDescription>
                    </DialogHeader>

                    {evaluatingSubmission && (
                        <div className="space-y-6 py-4">
                            {/* Student Writing Content */}
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Student's Essay</Label>
                                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-h-64 overflow-y-auto">
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                                        {evaluatingSubmission.writing_submissions?.[0]?.content || 'No content available'}
                                    </p>
                                </div>
                            </div>

                            {/* Band Scoring Sliders */}
                            <div className="space-y-4">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Band Scores (0-9)</Label>
                                {bandMetrics.map((metric) => (
                                    <div key={metric.key} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold text-slate-700">{metric.label}</span>
                                            <span className="text-indigo-600 font-black text-lg">{(gradingData as any)[metric.key]}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="9"
                                            step="0.5"
                                            value={(gradingData as any)[metric.key]}
                                            onChange={(e) => setGradingData({ ...gradingData, [metric.key]: parseFloat(e.target.value) })}
                                            className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-full"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Feedback */}
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Examiner Feedback</Label>
                                <Textarea
                                    value={gradingData.feedback}
                                    onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                                    className="min-h-[150px] rounded-2xl"
                                    placeholder="Provide detailed feedback on the student's performance..."
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setEvaluatingSubmission(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEvaluation} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-8">
                            Submit Evaluation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
