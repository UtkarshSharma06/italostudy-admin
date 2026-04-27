import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, PenTool, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MediaEditor from '@/components/admin/MediaEditor';
import { MediaContent } from '@/types/test';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface WritingManagerProps {
    mode?: 'evaluations' | 'tasks' | 'all';
}

export default function WritingManager({ mode = 'all' }: WritingManagerProps) {
    const { toast } = useToast();
    const [tasks, setTasks] = useState<any[]>([]);
    const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
    const [gradingSubmission, setGradingSubmission] = useState<any>(null);
    const [gradingData, setGradingData] = useState({
        overall: 6.0,
        task: 6.0,
        coherence: 6.0,
        lexical: 6.0,
        grammar: 6.0,
        feedback: ''
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        task_type: 'task1',
        prompt: '',
        image_url: '',
        media: null as MediaContent | null,
        is_mock_only: false
    });

    useEffect(() => {
        fetchTasks();
        fetchPendingSubmissions();
    }, []);

    const fetchTasks = async () => {
        const { data } = await supabase.from('writing_tasks').select('*').order('created_at', { ascending: false });
        if (data) setTasks(data);
    };

    const fetchPendingSubmissions = async () => {
        // Try with profiles join (requires the foreign key link)
        let { data, error }: any = await supabase
            .from('writing_submissions')
            .select('*, profiles(display_name, email), writing_tasks(prompt)')
            .eq('status', 'pending')
            .order('created_at', { ascending: true });

        if (error) {
            console.warn("Join failed, attempting fallback fetch:", error);
            // Fallback: fetch without profiles to at least show the content
            const { data: retryData, error: retryError } = await supabase
                .from('writing_submissions')
                .select('*, writing_tasks(prompt)')
                .eq('status', 'pending')
                .order('created_at', { ascending: true });

            if (retryError) {
                console.error("Error fetching evaluations:", retryError);
                toast({
                    title: "Fetch Error",
                    description: "Failed to load pending evaluations. Check browser console.",
                    variant: "destructive"
                });
                return;
            }
            data = retryData;
        }

        if (data) setPendingSubmissions(data);
    };

    const handleSaveGrades = async () => {
        if (!gradingSubmission) return;

        const feedbackData = {
            submission_id: gradingSubmission.id,
            overall_score: gradingData.overall,
            task_achievement_score: gradingData.task,
            coherence_score: gradingData.coherence,
            lexical_score: gradingData.lexical,
            grammar_score: gradingData.grammar,
            feedback_text: gradingData.feedback || "Band score finalized by examiner."
        };

        const { error: feedbackError } = await supabase.from('writing_feedback').insert(feedbackData);
        if (feedbackError) {
            toast({ title: "Failed to save feedback", description: feedbackError.message, variant: "destructive" });
            return;
        }

        const { error: subError } = await supabase
            .from('writing_submissions')
            .update({ status: 'completed' })
            .eq('id', gradingSubmission.id);

        if (subError) {
            toast({ title: "Failed to update status", description: subError.message, variant: "destructive" });
        } else {
            toast({ title: "Evaluation Finalized", description: `Band ${gradingData.overall} submitted to student dashboard.` });
            setGradingSubmission(null);
            fetchPendingSubmissions();
        }
    };

    const handleSave = async () => {
        if (!formData.title || !formData.prompt) {
            toast({ title: "Error", description: "Title and prompt are required", variant: "destructive" });
            return;
        }

        const minWords = formData.task_type === 'task1' ? 150 : 250;
        const taskData = {
            title: formData.title,
            task_type: formData.task_type,
            prompt: formData.prompt,
            image_url: formData.image_url || null,
            media: formData.media,
            min_words: minWords,
            is_mock_only: formData.is_mock_only
        };

        let error;
        if (editingTask) {
            const { error: updateError } = await supabase
                .from('writing_tasks')
                .update(taskData)
                .eq('id', editingTask.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('writing_tasks')
                .insert(taskData);
            error = insertError;
        }

        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Success", description: editingTask ? "Task updated" : "Task created" });
            setIsDialogOpen(false);
            fetchTasks();
        }
    };

    const handleOpenCreate = () => {
        setEditingTask(null);
        setFormData({ title: '', task_type: 'task1', prompt: '', image_url: '', media: null, is_mock_only: false });
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (task: any) => {
        setEditingTask(task);
        setFormData({
            title: task.title || '',
            task_type: task.task_type,
            prompt: task.prompt,
            image_url: task.image_url || '',
            media: task.media || null,
            is_mock_only: task.is_mock_only || false
        });
        setIsDialogOpen(true);
    };

    const deleteTask = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        const { error } = await supabase.from('writing_tasks').delete().eq('id', id);
        if (error) {
            toast({ title: "Error", description: "Failed to delete task", variant: "destructive" });
            return;
        }

        setTasks(prev => prev.filter(t => t.id !== id));
        toast({ title: "Deleted", description: "Task removed" });
    };

    return (
        <div className="space-y-12">
            {/* Pending Reviews Section */}
            {(mode === 'evaluations' || mode === 'all') && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                Pending Evaluations
                            </h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manual Grading Queue</p>
                        </div>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                            {pendingSubmissions.length} Submissions
                        </span>
                    </div>

                    {pendingSubmissions.length === 0 ? (
                        <div className="p-12 text-center rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold">No submissions currently awaiting review.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {pendingSubmissions.map(sub => (
                                <Card key={sub.id} className="p-6 bg-white border-2 hover:border-indigo-100 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                                                {sub.profiles?.display_name?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{sub.profiles?.display_name || 'Anonymous User'}</h4>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none mt-1">
                                                    {sub.word_count} words • Submitted {new Date(sub.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Button onClick={() => setGradingSubmission(sub)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 px-6 rounded-xl">
                                            Open Evaluator
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {(mode === 'all') && <div className="h-px bg-slate-100"></div>}

            {(mode === 'tasks' || mode === 'all') && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">Writing Task Library</h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage official task pool</p>
                        </div>
                        <Button onClick={handleOpenCreate} className="bg-slate-900 text-white hover:bg-slate-800 font-bold h-10 px-6 rounded-xl">
                            <Plus className="w-4 h-4 mr-2" /> New Task
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tasks.map(task => (
                            <Card key={task.id} className="p-6 relative group border-2 hover:border-indigo-100 transition-all">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => handleOpenEdit(task)}>
                                        <PenTool className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-600" onClick={() => deleteTask(task.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <PenTool className="w-5 h-5 text-indigo-600" />
                                    <span className="text-xs font-black uppercase bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        {task.task_type === 'task1' ? 'Task 1 (Report)' : 'Task 2 (Essay)'}
                                    </span>
                                    {task.is_mock_only && (
                                        <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded border border-amber-200">
                                            Mock Only
                                        </span>
                                    )}
                                </div>
                                {task.image_url && (
                                    <img src={task.image_url} alt="Task diagram" className="w-full h-32 object-cover rounded-lg mb-3 border border-slate-100" />
                                )}
                                <p className="text-slate-700 dark:text-slate-300 line-clamp-3 mb-2 font-medium">{task.prompt}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. {task.min_words} words</p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Manual Grading Dialog */}
            <Dialog open={!!gradingSubmission} onOpenChange={(open) => !open && setGradingSubmission(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black tracking-tight leading-none uppercase">Evaluator Terminal</DialogTitle>
                        <DialogDescription className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-1">
                            Finalizing performance metrics for {gradingSubmission?.profiles?.display_name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid lg:grid-cols-2 gap-8 py-6">
                        {/* Student content review */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Task Prompt Review</h4>
                                <p className="text-xs text-slate-600 font-medium leading-relaxed italic line-clamp-4 overflow-y-auto max-h-[100px]">
                                    "{gradingSubmission?.writing_tasks?.prompt}"
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-slate-900 text-slate-300 font-medium text-sm leading-relaxed border border-slate-800 shadow-xl overflow-y-auto max-h-[400px]">
                                <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Student Response</h4>
                                <div className="whitespace-pre-wrap">{gradingSubmission?.content}</div>
                            </div>
                        </div>

                        {/* Grading form */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Overall Band', key: 'overall' },
                                    { label: 'Task Response', key: 'task' },
                                    { label: 'Coherence', key: 'coherence' },
                                    { label: 'Lexical Resource', key: 'lexical' },
                                    { label: 'Grammar', key: 'grammar' }
                                ].map(metric => (
                                    <div key={metric.key} className={`space-y-2 p-4 rounded-2xl border ${metric.key === 'overall' ? 'col-span-2 bg-indigo-50 border-indigo-100' : 'bg-slate-50/50 border-slate-100'}`}>
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <span>{metric.label}</span>
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

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Detailed Feedback & Correction</Label>
                                <Textarea
                                    value={gradingData.feedback}
                                    onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                                    className="min-h-[150px] rounded-2xl border-slate-200 font-medium text-sm p-4"
                                    placeholder="Write your constructive feedback here..."
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t border-slate-100">
                        <Button variant="ghost" className="rounded-xl font-bold" onClick={() => setGradingSubmission(null)}>
                            Discard Evaluation
                        </Button>
                        <Button onClick={handleSaveGrades} className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 rounded-xl h-12 shadow-lg shadow-indigo-100">
                            Finalize Band & Notify Student
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="rounded-[2.5rem]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight">{editingTask ? 'Edit Task' : 'Deploy New Task'}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Task Category</Label>
                            <Select
                                value={formData.task_type}
                                onValueChange={(val) => setFormData({ ...formData, task_type: val })}
                            >
                                <SelectTrigger className="h-12 rounded-xl border-slate-200 font-bold">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="task1">Task 1 (Report/Graph)</SelectItem>
                                    <SelectItem value="task2">Task 2 (Argumentative Essay)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Task Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="h-12 rounded-xl border-slate-200 font-bold"
                                placeholder="e.g. Cambridge 18 Test 1 - Task 1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Task Prompt Content</Label>
                            <Textarea
                                value={formData.prompt}
                                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                                rows={6}
                                className="rounded-2xl border-slate-200 font-medium text-sm"
                                placeholder="Enter the official essay prompt..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rich Media (Graph, Table, Image)</Label>
                            <MediaEditor
                                media={formData.media}
                                onChange={(media) => setFormData({ ...formData, media })}
                            />
                            <p className="text-xs text-slate-400">Add a chart, graph, or diagram for the writing task.</p>
                        </div>
                        <div className="flex items-center space-x-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <input
                                type="checkbox"
                                id="is_mock_only"
                                checked={formData.is_mock_only}
                                onChange={(e) => setFormData({ ...formData, is_mock_only: e.target.checked })}
                                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <Label htmlFor="is_mock_only" className="text-sm font-bold text-slate-700 leading-none cursor-pointer">
                                Reserved for Mock Tests Only
                                <span className="block text-[10px] text-slate-400 font-medium">Hides this task from general student practice list.</span>
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" className="rounded-xl font-bold" onClick={() => setIsDialogOpen(false)}>Abort Change</Button>
                        <Button onClick={handleSave} className="bg-slate-900 text-white hover:bg-slate-800 font-black px-8 rounded-xl h-12">Commit Task</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
