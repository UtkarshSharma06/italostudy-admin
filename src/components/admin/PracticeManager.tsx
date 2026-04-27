import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JsonImportGuide } from '@/components/admin/JsonImportGuide';
import {
    Plus,
    Trash2,
    Database,
    Zap,
    FileJson,
    X,
    CheckCircle2,
    Loader2,
    Search,
    Brain,
    Rocket,
    Edit,
    Layers,
    Sparkles,
    FileDown
} from 'lucide-react';
import { generateMockTestPDF } from '@/utils/pdfExport';
// EXAMS import removed to use dynamic exams from DB
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, VisuallyHidden } from "@/components/ui/dialog";
import { MathText } from '@/components/MathText';
import { cn } from '@/lib/utils';
import MediaEditor from '@/components/admin/MediaEditor';
import QuestionMedia from '@/components/QuestionMedia';
import { MediaContent } from '@/types/test';

export default function PracticeManager() {
    const { toast } = useToast();
    const [selectedExamId, setSelectedExamId] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedTopic, setSelectedTopic] = useState<string>('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [questions, setQuestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableExams, setAvailableExams] = useState<any[]>([]);
    const [selectedExamConfig, setSelectedExamConfig] = useState<any>(null);

    // Form states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [importMode, setImportMode] = useState<'form' | 'json'>('form');
    const [jsonInput, setJsonInput] = useState('');
    const [jsonTargetTopic, setJsonTargetTopic] = useState<string>('');
    const [jsonTargetDifficulty, setJsonTargetDifficulty] = useState<string>('medium');
    const [importQueue, setImportQueue] = useState<any[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<{
        question_text: string;
        options: string[];
        correct_index: number;
        explanation: string;
        difficulty: string;
        topic: string;
        passage: string;
        media: MediaContent | null;
    }>({
        question_text: '',
        options: ['', '', '', '', ''],
        correct_index: 0,
        explanation: '',
        difficulty: 'medium',
        topic: '',
        passage: '',
        media: null
    });

    useEffect(() => {
        fetchExams();

        // Load persisted buffer
        const saved = localStorage.getItem('practice_import_queue');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setImportQueue(parsed);
                }
            } catch (e) {
                console.error("Failed to load practice buffer:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (importQueue.length > 0) {
            localStorage.setItem('practice_import_queue', JSON.stringify(importQueue));
        } else {
            localStorage.removeItem('practice_import_queue');
        }
    }, [importQueue]);

    const fetchExams = async () => {
        const { data } = await supabase.from('exams').select('*').order('name');
        if (data && data.length > 0) {
            setAvailableExams(data);
            if (!selectedExamId) {
                setSelectedExamId(data[0].slug);
            }
        }
    };

    useEffect(() => {
        const config = availableExams.find(e => e.slug === selectedExamId);
        setSelectedExamConfig(config);

        if (config) {
            const subjectsList = config.sections.map((s: any) => s.name);
            if (subjectsList.length > 0) {
                setSelectedSubject(subjectsList[0]);
            }
        }
    }, [selectedExamId, availableExams]);

    const subjects = useMemo(() =>
        selectedExamConfig?.sections.map((s: any) => s.name) || [],
        [selectedExamConfig]
    );

    const availableTopics = useMemo(() =>
        (selectedExamConfig?.syllabus?.[selectedSubject] || []).map((t: any) => t.name),
        [selectedExamConfig, selectedSubject]
    );

    useEffect(() => {
        setSelectedTopic('all');
        if (availableTopics.length > 0) {
            setJsonTargetTopic(availableTopics[0]);
        }
    }, [selectedSubject, availableTopics]);

    useEffect(() => {
        setCurrentPage(1);
        if (selectedExamId && selectedSubject) {
            fetchQuestions();
        }
    }, [selectedExamId, selectedSubject, selectedTopic, selectedDifficulty]);

    const fetchQuestions = async () => {
        setIsLoading(true);
        let query = (supabase as any)
            .from('practice_questions')
            .select('*')
            .eq('exam_type', selectedExamId)
            .eq('subject', selectedSubject);

        if (selectedTopic !== 'all') {
            query = query.eq('topic', selectedTopic);
        }

        if (selectedDifficulty !== 'all') {
            query = query.eq('difficulty', selectedDifficulty);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            toast({ title: "Error fetching questions", description: error.message, variant: "destructive" });
        } else {
            setQuestions(data || []);
        }
        setIsLoading(false);
    };

    const handleAddQuestion = async () => {
        if (!currentQuestion.question_text.trim() || currentQuestion.options.some(opt => !opt.trim())) {
            toast({ title: "Incomplete Question", description: "Please fill in all fields.", variant: "destructive" });
            return;
        }

        const finalTopic = currentQuestion.topic || (selectedTopic !== 'all' ? selectedTopic : availableTopics[0]);
        const finalDifficulty = currentQuestion.difficulty || (selectedDifficulty !== 'all' ? selectedDifficulty : "medium");

        const qData = {
            ...currentQuestion,
            topic: finalTopic,
            difficulty: finalDifficulty
        };

        if (editingIdx !== null) {
            setImportQueue(prev => {
                const newQueue = [...prev];
                newQueue[editingIdx] = qData;
                return newQueue;
            });
            setEditingIdx(null);
            toast({ title: "Queue Updated", description: "Modified item in the buffer." });
            setImportMode('json');
        } else if (editingId) {
            setIsSubmitting(true);
            const dataToUpdate = {
                exam_type: selectedExamId,
                subject: selectedSubject,
                ...qData
            };
            const { error } = await (supabase as any)
                .from('practice_questions')
                .update(dataToUpdate)
                .eq('id', editingId);

            if (error) {
                toast({ title: "Update Failed", description: error.message, variant: "destructive" });
            } else {
                toast({ title: "Success", description: "Question updated." });
                setQuestions(prev => prev.map(q => q.id === editingId ? { ...q, ...dataToUpdate } : q));
                closeModal();
                fetchQuestions();
            }
            setIsSubmitting(false);
        } else {
            // Adding a new single question manually - goes straight to DB or queue?
            // User specifically asked for JSON import to go to "ques". 
            // Manual add could also go to queue for consistency, or stay direct.
            // Let's keep manual direct but allow queue for JSON as requested.
            setIsSubmitting(true);
            const dataToInsert = {
                exam_type: selectedExamId,
                subject: selectedSubject,
                ...qData
            };
            const { error } = await (supabase as any)
                .from('practice_questions')
                .insert([dataToInsert]);

            if (error) {
                toast({ title: "Save Failed", description: error.message, variant: "destructive" });
            } else {
                toast({ title: "Success", description: "Question added to bank." });
                closeModal();
                fetchQuestions();
            }
            setIsSubmitting(false);
        }
    };

    const closeModal = () => {
        setCurrentQuestion({
            question_text: '',
            options: ['', '', '', '', ''],
            correct_index: 0,
            explanation: '',
            difficulty: 'medium',
            topic: '',
            passage: '',
            media: null
        });
        setEditingId(null);
        setEditingIdx(null);
        setIsAddModalOpen(false);
    };

    const handleEditStart = (q: any) => {
        setCurrentQuestion({
            question_text: q.question_text,
            options: q.options || ['', '', '', '', ''],
            correct_index: q.correct_index,
            explanation: q.explanation || '',
            difficulty: q.difficulty,
            topic: q.topic || '',
            passage: q.passage || '',
            media: q.media || null
        });
        setEditingId(q.id);
        setEditingIdx(null);
        setImportMode('form');
        setIsAddModalOpen(true);
    };

    const handleBulkImport = () => {
        try {
            const cleanedInput = jsonInput.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
            let parsed = JSON.parse(cleanedInput);

            if (!Array.isArray(parsed) && parsed.questions) parsed = parsed.questions;
            if (!Array.isArray(parsed)) throw new Error("Input must be a JSON array.");

            const validated = parsed.map((q: any) => {
                let media = q.media || null;
                // Normalize table media structure if 'content' is used instead of 'table'
                if (media && media.type === 'table' && media.content && !media.table) {
                    media = { ...media, table: media.content };
                }

                return {
                    question_text: q.question_text || q.question || q.text || "",
                    options: Array.isArray(q.options) ? q.options : ["", "", "", "", ""],
                    correct_index: q.correct_index ?? (q.correctIndex ?? 0),
                    explanation: q.explanation || "",
                    difficulty: jsonTargetDifficulty.toLowerCase(),
                    topic: jsonTargetTopic,
                    passage: q.passage || "",
                    media: media
                };
            });

            setImportQueue(prev => [...prev, ...validated]);
            setJsonInput('');
            toast({ title: "Import Successful", description: `${validated.length} questions added to buffer.` });
        } catch (err: any) {
            toast({ title: "Import Failed", description: err.message, variant: "destructive" });
        }
    };

    const handleDeployQueue = async () => {
        if (importQueue.length === 0) return;

        setIsSubmitting(true);
        try {
            const dataToInsert = importQueue.map(q => ({
                exam_type: selectedExamId,
                subject: selectedSubject,
                question_text: q.question_text,
                options: q.options,
                correct_index: q.correct_index,
                explanation: q.explanation,
                difficulty: (q.difficulty || 'medium').toLowerCase(),
                topic: q.topic,
                passage: q.passage,
                media: q.media
            }));

            const { error } = await (supabase as any)
                .from('practice_questions')
                .insert(dataToInsert);

            if (error) throw error;

            toast({ title: "Deployment Success", description: `Added ${dataToInsert.length} questions to server.` });
            localStorage.removeItem('practice_import_queue');
            setImportQueue([]);
            setIsAddModalOpen(false);
            fetchQuestions();
        } catch (err: any) {
            toast({ title: "Deployment Failed", description: err.message, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteQuestion = async (id: string) => {
        const { error } = await (supabase as any)
            .from('practice_questions')
            .delete()
            .eq('id', id);

        if (error) {
            toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
        } else {
            setQuestions(questions.filter(q => q.id !== id));
            toast({ title: "Question Removed" });
        }
    };

    const handleClearAll = async () => {
        if (!confirm(`Wipe all ${questions.length} questions for ${selectedSubject}?`)) return;

        setIsSubmitting(true);
        const { error } = await (supabase as any)
            .from('practice_questions')
            .delete()
            .eq('exam_type', selectedExamId)
            .eq('subject', selectedSubject);

        if (error) {
            toast({ title: "Clear Failed", description: error.message, variant: "destructive" });
        } else {
            setQuestions([]);
            toast({ title: "Bank Cleared", description: `All items for ${selectedSubject} removed.` });
        }
        setIsSubmitting(false);
    };

    const handleDownloadPDF = async () => {
        if (questions.length === 0) {
            toast({ title: "No questions to export", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        toast({ title: "Generating PDF...", description: "Please wait while we prepare your branded document." });

        try {
            const testTitle = `${selectedExamConfig?.name || selectedExamId} - ${selectedSubject}`;
            await generateMockTestPDF(testTitle, questions, '/logo.webp');
            toast({ title: "Success", description: "PDF has been generated and downloaded." });
        } catch (error: any) {
            console.error("PDF Export Error:", error);
            toast({ title: "Export Failed", description: "Failed to generate PDF. Check console for details.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {importQueue.length > 0 && (
                <div
                    onClick={() => {
                        setImportMode('json');
                        setIsAddModalOpen(true);
                    }}
                    className="group bg-gradient-to-r from-indigo-600 to-violet-600 p-4 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-between cursor-pointer hover:scale-[1.01] transition-all hover:shadow-indigo-200 animate-in fade-in slide-in-from-top-4 duration-500"
                >
                    <div className="flex items-center gap-4 text-white">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                            <Layers className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <h4 className="font-black uppercase tracking-widest text-[11px] opacity-80">Authorized Staging Protocol Active</h4>
                            <p className="font-bold text-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-300" />
                                {importQueue.length} Intelligence Points waiting in buffer
                            </p>
                        </div>
                    </div>
                    <div className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-black text-[10px] uppercase tracking-widest group-hover:bg-white group-hover:text-indigo-600 transition-all">
                        Review & Sync
                    </div>
                </div>
            )}
            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-6 items-end justify-between bg-white/50 p-6 rounded-3xl border border-slate-100 dark:border-border dark:border-border">
                <div className="flex flex-wrap gap-6 items-end">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Target Exam</Label>
                        <select
                            value={selectedExamId}
                            onChange={(e) => {
                                setSelectedExamId(e.target.value);
                                setSelectedSubject('');
                            }}
                            className="h-12 w-48 rounded-xl border-slate-200 dark:border-border bg-white dark:bg-card text-xs font-bold px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        >
                            {availableExams.map(exam => (
                                <option key={exam.id} value={exam.slug}>{exam.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject domain</Label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="h-12 w-48 rounded-xl border-slate-200 dark:border-border bg-white dark:bg-card text-xs font-bold px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        >
                            {subjects.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Topic filtering</Label>
                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="h-12 w-48 rounded-xl border-slate-200 dark:border-border bg-white dark:bg-card text-xs font-bold px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        >
                            <option value="all">All Topics</option>
                            {availableTopics.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Grade Level</Label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="h-12 w-48 rounded-xl border-slate-200 dark:border-border bg-white dark:bg-card text-xs font-bold px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        >
                            <option value="all">Mixed Levels</option>
                            <option value="easy">{selectedExamConfig?.scoring?.difficulty_labels?.easy || 'Easy'}</option>
                            <option value="medium">{selectedExamConfig?.scoring?.difficulty_labels?.medium || 'Medium'}</option>
                            <option value="hard">{selectedExamConfig?.scoring?.difficulty_labels?.hard || 'Hard'}</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3">
                    {questions.length > 0 && (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleDownloadPDF}
                                className="h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 border-indigo-100 transition-all shadow-sm"
                            >
                                <FileDown className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleClearAll}
                                className="h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 hover:text-rose-600 border border-transparent hover:border-rose-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Wipe Bank
                            </Button>
                        </>
                    )}
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95 transition-all">
                                <Plus className="w-4 h-4 mr-2" /> {importQueue.length > 0 ? `Stage Buffer (${importQueue.length})` : 'Add Intel Point'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-0 border-none shadow-2xl bg-white dark:bg-slate-900">
                            <DialogHeader className="p-0">
                                <VisuallyHidden>
                                    <DialogTitle>New Question Entry</DialogTitle>
                                </VisuallyHidden>
                                <div className="p-8 border-b border-slate-100 dark:border-border flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                                            <Database className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tight uppercase">{editingId || editingIdx !== null ? 'Edit Question Analysis' : 'New Question Entry'}</h2>
                                            <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em]">Deploying to {selectedSubject} ({selectedExamConfig?.name})</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={closeModal} className="rounded-xl">
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </DialogHeader>

                            <div className="p-10 space-y-8">
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                                    <button
                                        onClick={() => setImportMode('form')}
                                        className={cn(
                                            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                            importMode === 'form' ? "bg-white dark:bg-card text-indigo-600 shadow-md" : "text-slate-400"
                                        )}
                                    >Step-by-Step Form</button>
                                    <button
                                        onClick={() => setImportMode('json')}
                                        className={cn(
                                            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                                            importMode === 'json' ? "bg-white dark:bg-card text-indigo-600 shadow-md" : "text-slate-400"
                                        )}
                                    >JSON Bulk Uplink</button>
                                </div>

                                {importMode === 'form' ? (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Logical Topic</Label>
                                                <select
                                                    value={currentQuestion.topic || (selectedTopic !== 'all' ? selectedTopic : availableTopics[0])}
                                                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, topic: e.target.value }))}
                                                    className="w-full h-14 rounded-2xl border border-slate-100 dark:border-border bg-white dark:bg-card px-4 text-xs font-bold uppercase tracking-widest"
                                                >
                                                    {availableTopics.map(t => (
                                                        <option key={t} value={t}>{t}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Difficulty Grade Level</Label>
                                                <select
                                                    value={currentQuestion.difficulty || (selectedDifficulty !== 'all' ? selectedDifficulty : "medium")}
                                                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, difficulty: e.target.value }))}
                                                    className="w-full h-14 rounded-2xl border border-slate-100 dark:border-border bg-white dark:bg-card px-4 text-xs font-bold uppercase tracking-widest"
                                                >
                                                    <option value="easy">{selectedExamConfig?.scoring?.difficulty_labels?.easy || 'Easy'}</option>
                                                    <option value="medium">{selectedExamConfig?.scoring?.difficulty_labels?.medium || 'Medium'}</option>
                                                    <option value="hard">{selectedExamConfig?.scoring?.difficulty_labels?.hard || 'Hard'}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Passage Context (Optional)</Label>
                                            <Textarea
                                                placeholder="Reading passage or context..."
                                                className="min-h-[100px] rounded-2xl border-slate-100 dark:border-border text-sm font-medium p-6 resize-none"
                                                value={currentQuestion.passage}
                                                onChange={(e) => setCurrentQuestion(prev => ({ ...prev, passage: e.target.value }))}
                                            />
                                            {currentQuestion.passage && (
                                                <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-border">
                                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Passage Preview (LaTeX)</p>
                                                    <MathText content={currentQuestion.passage} className="text-sm font-medium leading-relaxed" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Question Content (Intel)</Label>
                                            <Textarea
                                                placeholder="Ask the candidate..."
                                                className="min-h-[120px] rounded-2xl border-slate-100 dark:border-border text-sm font-medium p-6 resize-none"
                                                value={currentQuestion.question_text}
                                                onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question_text: e.target.value }))}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Response Options (Assign Truth)</Label>
                                            <div className="space-y-3">
                                                {currentQuestion.options.map((opt, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <button
                                                            onClick={() => setCurrentQuestion(prev => ({ ...prev, correct_index: idx }))}
                                                            className={cn(
                                                                "w-12 h-12 rounded-xl border flex items-center justify-center font-black text-xs transition-all",
                                                                currentQuestion.correct_index === idx ? "bg-emerald-500 border-transparent text-white shadow-lg" : "bg-white dark:bg-card border-slate-100 dark:border-border text-slate-400"
                                                            )}
                                                        >{String.fromCharCode(65 + idx)}</button>
                                                        <Input
                                                            placeholder={`Option ${String.fromCharCode(65 + idx)} content...`}
                                                            className="h-12 rounded-xl border-slate-100 dark:border-border text-sm font-bold"
                                                            value={opt}
                                                            onChange={(e) => {
                                                                const newOpts = [...currentQuestion.options];
                                                                newOpts[idx] = e.target.value;
                                                                setCurrentQuestion(prev => ({ ...prev, options: newOpts }));
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <MediaEditor
                                            media={currentQuestion.media}
                                            onChange={(media) => setCurrentQuestion(prev => ({ ...prev, media }))}
                                        />

                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Explanation Archive</Label>
                                            <Textarea
                                                placeholder="Provide the reasoning for the correct response..."
                                                className="h-24 rounded-2xl border-slate-100 dark:border-border text-sm font-medium p-6 resize-none"
                                                value={currentQuestion.explanation}
                                                onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                                            />
                                            {currentQuestion.explanation && (
                                                <div className="mt-4 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-border">
                                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">Live Reasoning Preview (LaTeX)</p>
                                                    <MathText content={currentQuestion.explanation} className="text-sm font-medium leading-relaxed" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-4">
                                            {editingIdx !== null && (
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => {
                                                        setEditingIdx(null);
                                                        setImportMode('json');
                                                    }}
                                                    className="flex-1 h-16 rounded-[2rem] font-bold"
                                                >
                                                    Cancel Edit
                                                </Button>
                                            )}
                                            <Button
                                                onClick={handleAddQuestion}
                                                disabled={isSubmitting}
                                                className="flex-[2] h-16 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : (editingId || editingIdx !== null ? "Update Intelligence" : "Authorize Injection")}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="space-y-6">
                                            <JsonImportGuide />

                                            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Topic for this Batch</Label>
                                                    <select
                                                        value={jsonTargetTopic}
                                                        onChange={(e) => setJsonTargetTopic(e.target.value)}
                                                        className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold"
                                                    >
                                                        {availableTopics.map(t => (
                                                            <option key={t} value={t}>{t}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Difficulty for this Batch</Label>
                                                    <select
                                                        value={jsonTargetDifficulty}
                                                        onChange={(e) => setJsonTargetDifficulty(e.target.value)}
                                                        className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-widest"
                                                    >
                                                        <option value="easy">Easy</option>
                                                        <option value="medium">Medium</option>
                                                        <option value="hard">Hard</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <Textarea
                                                placeholder='[{"question_text": "...", "options": ["A","B","C","D","E"], "correct_index": 0, "explanation": "Why it is correct...", "passage": "Optional passage..."}]'
                                                className="h-[200px] rounded-[2rem] border-slate-100 dark:border-border font-mono text-xs p-8"
                                                value={jsonInput}
                                                onChange={(e) => setJsonInput(e.target.value)}
                                            />
                                            <Button
                                                onClick={handleBulkImport}
                                                disabled={!jsonInput.trim() || isSubmitting}
                                                className="w-full h-16 rounded-[2rem] bg-indigo-950 hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl"
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : "Deploy to Buffer"}
                                            </Button>
                                        </div>

                                        {importQueue.length > 0 && (
                                            <div className="pt-8 border-t border-slate-100 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                                        <Zap className="w-4 h-4 text-amber-500" /> Staging Buffer ({importQueue.length})
                                                    </h3>
                                                    <Button
                                                        onClick={() => {
                                                            if (confirm("Clear buffer?")) setImportQueue([]);
                                                        }}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-[9px] font-black uppercase text-rose-500 h-8"
                                                    >
                                                        Clear All
                                                    </Button>
                                                </div>

                                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                                    {importQueue.map((q, idx) => (
                                                        <div key={idx} className="group p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between hover:border-indigo-200 transition-all">
                                                            <div className="flex items-center gap-4 truncate mr-4">
                                                                <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                                    {idx + 1}
                                                                </div>
                                                                <span className="text-xs font-bold text-slate-700 truncate">{q.question_text || "Empty Question Text"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="w-8 h-8 rounded-lg text-indigo-500"
                                                                    onClick={() => {
                                                                        setCurrentQuestion(q);
                                                                        setEditingIdx(idx);
                                                                        setImportMode('form');
                                                                    }}
                                                                >
                                                                    <Edit className="w-3.5 h-3.5" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="w-8 h-8 rounded-lg text-rose-500"
                                                                    onClick={() => {
                                                                        setImportQueue(importQueue.filter((_, i) => i !== idx));
                                                                    }}
                                                                >
                                                                    <X className="w-3.5 h-3.5" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <Button
                                                    onClick={handleDeployQueue}
                                                    disabled={isSubmitting}
                                                    className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-100"
                                                >
                                                    {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : "Authorize Protocol & Sync"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* List */}
            <div className="relative">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-300">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Accessing Secure Archive...</p>
                    </div>
                ) : questions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-slate-50 dark:bg-muted rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-border text-slate-400">
                        <Rocket className="w-16 h-16 mb-6 opacity-20" />
                        <p className="text-sm font-bold">No intel detected for this sector.</p>
                        <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-50">Awaiting Manual Deployment</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {questions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((q) => (
                            <div key={q.id} className="group bg-white dark:bg-card p-8 rounded-[2.5rem] border border-slate-100 dark:border-border hover:border-indigo-200 transition-all shadow-sm hover:shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEditStart(q)}
                                        className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors flex items-center justify-center mb-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuestion(q.id)}
                                        className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors flex items-center justify-center"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 mb-6">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                        q.difficulty === 'easy' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                            q.difficulty === 'hard' ? "bg-rose-50 text-rose-600 border border-rose-100" :
                                                "bg-orange-50 text-orange-600 border border-orange-100"
                                    )}>
                                        {q.difficulty}
                                    </span>
                                    {q.is_corrected && (
                                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-1.5">
                                            <CheckCircle2 className="w-2.5 h-2.5" />
                                            Corrected
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {q.passage && (
                                        <div className="mb-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                            <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Passage Context</p>
                                            <MathText content={q.passage} className="text-sm text-slate-600 line-clamp-3" />
                                        </div>
                                    )}
                                    <div className="text-sm font-bold text-slate-800 leading-relaxed mb-6">
                                        <MathText content={q.question_text} />
                                    </div>

                                    {q.media && (
                                        <div className="mb-6">
                                            <QuestionMedia media={q.media} />
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 gap-2">
                                        {q.options.map((opt: string, i: number) => (
                                            <div key={i} className={cn(
                                                "p-4 rounded-xl text-xs font-bold border flex items-center gap-3",
                                                i === q.correct_index
                                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                                                    : "bg-slate-50/50 border-slate-100 dark:border-border text-slate-500"
                                            )}>
                                                <div className={cn(
                                                    "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black",
                                                    i === q.correct_index ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                                                )}>
                                                    {String.fromCharCode(65 + i)}
                                                </div>
                                                <MathText content={opt} />
                                            </div>
                                        ))}
                                    </div>

                                    {q.explanation && (
                                        <div className="mt-8 pt-8 border-t border-slate-50">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Internal Logic</div>
                                            <div className="text-[11px] font-medium text-slate-500 leading-relaxed italic">
                                                <MathText content={q.explanation} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                        {Math.ceil(questions.length / itemsPerPage) > 1 && (
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-card rounded-[2.5rem] mt-6 shadow-sm">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1 hidden md:block">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, questions.length)} of {questions.length} entries
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                        className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Prev
                                    </Button>
                                    {[...Array(Math.ceil(questions.length / itemsPerPage))].map((_, i) => {
                                        const totalPages = Math.ceil(questions.length / itemsPerPage);
                                        if (totalPages > 7) {
                                            if (
                                                i !== 0 && i !== totalPages - 1 && 
                                                Math.abs(i + 1 - currentPage) > 1
                                            ) {
                                                if (i === 1 && currentPage > 3) return <span key={i} className="px-2 py-1 text-slate-400">...</span>;
                                                if (i === totalPages - 2 && currentPage < totalPages - 2) return <span key={i} className="px-2 py-1 text-slate-400">...</span>;
                                                return null;
                                            }
                                        }
                                        return (
                                            <Button
                                                key={i}
                                                variant={currentPage === i + 1 ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={cn(
                                                    "w-9 h-9 p-0 rounded-xl text-[10px] font-black",
                                                    currentPage === i + 1 ? "bg-indigo-600 text-white" : ""
                                                )}
                                            >
                                                {i + 1}
                                            </Button>
                                        )
                                    })}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === Math.ceil(questions.length / itemsPerPage)}
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                        className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}
