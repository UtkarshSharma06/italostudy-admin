import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '@/components/ui/select';
import { 
    Accordion, 
    AccordionItem, 
    AccordionTrigger, 
    AccordionContent 
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { generateBookletPDF } from '@/utils/bookletGenerator';
import { 
    FileJson, 
    Download, 
    Trash2, 
    CheckCircle2, 
    Plus, 
    Library, 
    Settings2, 
    ChevronRight,
    Search,
    BookOpen,
    Loader2
} from 'lucide-react';
import { EXAMS } from '@/config/exams';
import { Question } from '@/types/test';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

export default function BookletManager() {
    const { toast } = useToast();
    
    // Top-level View State
    const [isCreating, setIsCreating] = useState(false);
    const [selectedExamId, setSelectedExamId] = useState<string>('');
    
    // Hierarchical Data State: Key format: "SubjectName|||TopicName"
    const [questionsByTopic, setQuestionsByTopic] = useState<Record<string, Question[]>>({});
    const [localJsonInputs, setLocalJsonInputs] = useState<Record<string, string>>({});
    
    // Practice Bank Sync State
    const [topicSyncState, setTopicSyncState] = useState<Record<string, { 
        isSynced: boolean, 
        difficulty: 'easy' | 'medium' | 'hard',
        isProcessing: boolean 
    }>>({});

    const [isGenerating, setIsGenerating] = useState(false);
    const [progressMsg, setProgressMsg] = useState('');

    const selectedExam = useMemo(() => EXAMS[selectedExamId], [selectedExamId]);

    // Derived: All unique questions collected for generation
    const allCollectedQuestions = useMemo(() => {
        const list: Question[] = [];
        Object.values(questionsByTopic).forEach(qs => list.push(...qs));
        return list;
    }, [questionsByTopic]);

    const handleSaveTopicJson = (subject: string, topic: string) => {
        const key = `${subject}|||${topic}`;
        const input = localJsonInputs[key] || '';
        
        if (!input.trim()) return;

        try {
            const parsed = JSON.parse(input);
            const questions: Question[] = Array.isArray(parsed) ? parsed : [parsed];
            
            // Normalize questions for this topic
            const normalized = questions.map(q => ({
                ...q,
                section_name: subject,
                topic: topic
            }));

            setQuestionsByTopic(prev => ({
                ...prev,
                [key]: normalized
            }));

            toast({
                title: "Questions Saved",
                description: `Successfully loaded ${normalized.length} questions into ${topic}.`,
            });
        } catch (error) {
            toast({
                title: "JSON Error",
                description: "Invalid JSON format. Please check your data.",
                variant: "destructive"
            });
        }
    };

    const clearTopic = (subject: string, topic: string) => {
        const key = `${subject}|||${topic}`;
        setQuestionsByTopic(prev => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
        setLocalJsonInputs(prev => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const handleSyncToggle = async (checked: boolean, subject: string, topic: string) => {
        const key = `${subject}|||${topic}`;
        const questions = questionsByTopic[key] || [];

        if (questions.length === 0 && checked) {
            toast({
                title: "No Questions",
                description: "Please import JSON questions for this topic first.",
                variant: "destructive"
            });
            return;
        }

        setTopicSyncState(prev => ({
            ...prev,
            [key]: { 
                difficulty: prev[key]?.difficulty || 'medium',
                isSynced: prev[key]?.isSynced || false,
                isProcessing: true 
            }
        }));

        try {
            if (checked) {
                // ADD TO PRACTICE BANK
                const difficulty = topicSyncState[key]?.difficulty || 'medium';
                const { error } = await supabase
                    .from('practice_questions')
                    .upsert(questions.map(q => ({
                        exam_type: selectedExamId,
                        subject: subject,
                        topic: topic,
                        difficulty: difficulty,
                        question_text: q.question_text,
                        options: (q.options as any),
                        correct_index: q.correct_index,
                        explanation: q.explanation || '',
                        media: (q.media as any) || null,
                        passage: q.passage || null
                    })));

                if (error) throw error;
                toast({ title: "Synced", description: `Added ${questions.length} questions to Practice Bank.` });
            } else {
                // REMOVE FROM PRACTICE BANK
                const { error } = await supabase
                    .from('practice_questions')
                    .delete()
                    .eq('exam_type', selectedExamId)
                    .eq('subject', subject)
                    .eq('topic', topic);

                if (error) throw error;
                toast({ title: "Removed", description: "Topic questions removed from Practice Bank." });
            }

            setTopicSyncState(prev => ({
                ...prev,
                [key]: { 
                    difficulty: prev[key]?.difficulty || 'medium',
                    isSynced: checked, 
                    isProcessing: false 
                }
            }));
        } catch (error: any) {
            toast({
                title: "Sync Error",
                description: error.message,
                variant: "destructive"
            });
            setTopicSyncState(prev => ({
                ...prev,
                [key]: { ...prev[key], isProcessing: false }
            }));
        }
    };

    const handleGenerate = async () => {
        if (allCollectedQuestions.length === 0) {
            toast({
                title: "Empty Booklet",
                description: "Please add at least one topic with questions.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        setProgressMsg('Generating Book Cover & Pages...');
        
        try {
            await generateBookletPDF(selectedExam.name, questionsByTopic, '/logo.webp', (msg) => setProgressMsg(msg));
            toast({ title: "Success", description: "PDF generated successfully!" });
        } catch (err) {
            toast({
                title: "PDF Error",
                description: "Failed to generate PDF booklet.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
            setProgressMsg('');
        }
    };

    // DASHBOARD VIEW
    if (!isCreating) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Booklet Generator</h2>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Version 2.0 • Hierarchical Mode</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-2 border-slate-900 bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-700" />
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Plus size={24} className="text-indigo-400" />
                                Start New Project
                            </CardTitle>
                            <CardDescription className="text-slate-400 font-medium">Build a full question bank booklet from scratch by defining topics.</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <Button 
                                onClick={() => setIsCreating(true)}
                                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold uppercase tracking-widest h-12 rounded-xl"
                            >
                                Open Generator Wizard
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-100 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Library size={24} className="text-indigo-600" />
                                Existing Context
                            </CardTitle>
                            <CardDescription>Review and sync existing question sets from the database.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                                        <Search size={18} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-900 uppercase">Recent Sessions</p>
                                        <p className="text-[10px] font-bold text-slate-500">View previously generated booklets</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="rounded-full h-8 text-[10px] font-black uppercase tracking-tighter opacity-50 cursor-not-allowed">Coming Soon</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // GENERATOR VIEW
    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsCreating(false)}
                        className="h-10 w-10 p-0 rounded-full hover:bg-slate-100"
                    >
                        <ChevronRight className="rotate-180" size={20} />
                    </Button>
                    <div>
                        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Generator Wizard</h2>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-100 text-[10px] font-black tracking-widest uppercase">
                                Hierarchical Build
                            </Badge>
                            {allCollectedQuestions.length > 0 && (
                                <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-100 text-[10px] font-black tracking-widest uppercase">
                                    {allCollectedQuestions.length} Questions Queued
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {allCollectedQuestions.length > 0 && (
                        <Button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-widest gap-2 shadow-lg shadow-slate-200"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />}
                            {isGenerating ? progressMsg : 'Generate Full PDF'}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Taxonomy Controls */}
                <Card className="lg:col-span-2 rounded-[2rem] border-slate-100 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 block">Exam Focus</Label>
                        <Select onValueChange={setSelectedExamId} value={selectedExamId}>
                            <SelectTrigger className="h-14 rounded-2xl border-slate-200 shadow-sm bg-white text-base font-bold">
                                <SelectValue placeholder="Choose target exam..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-slate-200">
                                {Object.values(EXAMS).map(exam => (
                                    <SelectItem key={exam.id} value={exam.id} className="font-bold py-3">{exam.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <CardContent className="p-6">
                        {!selectedExam ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                    <BookOpen size={24} className="text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-400">Select an exam to begin</h3>
                                <p className="text-sm text-slate-400 max-w-xs">Upload questions per subject and topic for granular control over your booklet structure.</p>
                            </div>
                        ) : (
                            <Accordion type="single" collapsible className="space-y-4">
                                {Object.keys(selectedExam.syllabus).map(subject => (
                                    <AccordionItem key={subject} value={subject} className="border border-slate-100 rounded-3xl px-4 overflow-hidden shadow-sm">
                                        <AccordionTrigger className="hover:no-underline py-5 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Plus size={16} />
                                                </div>
                                                <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{subject}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <Accordion type="single" collapsible className="space-y-3">
                                                {selectedExam.syllabus[subject].map(topic => {
                                                    const key = `${subject}|||${topic.name}`;
                                                    const qCount = (questionsByTopic[key] || []).length;
                                                    const isSynced = topicSyncState[key]?.isSynced;

                                                    return (
                                                        <AccordionItem key={topic.id} value={topic.id} className="border border-slate-50 bg-slate-50/30 rounded-2xl px-4 overflow-hidden">
                                                            <AccordionTrigger className="hover:no-underline py-4">
                                                                <div className="flex items-center justify-between w-full pr-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[13px] font-bold text-slate-700">{topic.name}</span>
                                                                        {qCount > 0 && <Badge className="bg-emerald-500 text-white border-0 text-[10px] h-5">{qCount}</Badge>}
                                                                        {isSynced && <CheckCircle2 size={14} className="text-emerald-500" />}
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="space-y-4 pt-2 pb-5">
                                                                <div className="space-y-3">
                                                                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">JSON Payload</Label>
                                                                    <Textarea 
                                                                        placeholder='Paste JSON for this topic...'
                                                                        className="min-h-[100px] rounded-xl font-mono text-[10px] bg-white border-slate-200"
                                                                        value={localJsonInputs[key] || ''}
                                                                        onChange={(e) => setLocalJsonInputs(prev => ({ ...prev, [key]: e.target.value }))}
                                                                    />
                                                                    <div className="flex items-center gap-2">
                                                                        <Button 
                                                                            size="sm" 
                                                                            onClick={() => handleSaveTopicJson(subject, topic.name)}
                                                                            className="rounded-full bg-slate-900 text-[10px] h-8 px-4 font-black uppercase"
                                                                        >
                                                                            Store in Booklet
                                                                        </Button>
                                                                        {qCount > 0 && (
                                                                            <Button 
                                                                                size="sm" 
                                                                                variant="ghost" 
                                                                                onClick={() => clearTopic(subject, topic.name)}
                                                                                className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50 text-[10px] h-8 px-4 font-black uppercase"
                                                                            >
                                                                                <Trash2 size={12} className="mr-1" /> Clear
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {qCount > 0 && (
                                                                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3 mt-4">
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                <Switch 
                                                                                    id={`sync-${key}`}
                                                                                    checked={isSynced}
                                                                                    disabled={topicSyncState[key]?.isProcessing}
                                                                                    onCheckedChange={(c) => handleSyncToggle(c, subject, topic.name)}
                                                                                />
                                                                                <Label htmlFor={`sync-${key}`} className="text-xs font-bold text-slate-700">Sync to Practice Bank</Label>
                                                                            </div>
                                                                            <div className="flex items-center gap-1">
                                                                                {['easy', 'medium', 'hard'].map((lvl) => (
                                                                                    <Button 
                                                                                        key={lvl}
                                                                                        size="sm"
                                                                                        variant="ghost"
                                                                                        onClick={() => setTopicSyncState(prev => ({ 
                                                                                            ...prev, 
                                                                                            [key]: { 
                                                                                                isSynced: prev[key]?.isSynced || false,
                                                                                                isProcessing: prev[key]?.isProcessing || false,
                                                                                                difficulty: lvl as any 
                                                                                            } 
                                                                                        }))}
                                                                                        className={`h-6 px-3 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                                                                            (topicSyncState[key]?.difficulty || 'medium') === lvl 
                                                                                            ? 'bg-slate-900 text-white' 
                                                                                            : 'bg-slate-50 text-slate-400'
                                                                                        }`}
                                                                                    >
                                                                                        {lvl}
                                                                                    </Button>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    );
                                                })}
                                            </Accordion>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </CardContent>
                </Card>

                {/* Sidebar Context */}
                <div className="space-y-6">
                    <Card className="rounded-3xl border-slate-100 shadow-lg bg-indigo-600 text-white">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Plus size={16} /> Booklet Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-white/70 text-xs font-bold uppercase tracking-tight">Active Exam</p>
                                <p className="text-xs font-black uppercase">{selectedExam?.id || 'None'}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-white/70 text-xs font-bold uppercase tracking-tight">Filled Topics</p>
                                <p className="text-xs font-black uppercase">{Object.keys(questionsByTopic).length}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-white/70 text-xs font-bold uppercase tracking-tight">Total Questions</p>
                                <p className="text-lg font-black">{allCollectedQuestions.length}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Alert className="bg-amber-50 border-amber-200 rounded-2xl">
                        <Settings2 className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-900 text-xs font-black uppercase tracking-widest">Workflow Tip</AlertTitle>
                        <AlertDescription className="text-amber-700 text-[10px] font-bold leading-relaxed mt-2">
                            Expand a subject, then a specific topic to reveal its JSON paste area. 
                            Saving questions at the topic level ensures perfect grouping in the final PDF and Practice Bank.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
}
