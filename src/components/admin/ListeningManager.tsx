import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit, ArrowLeft, Music, HelpCircle, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import MediaEditor from '@/components/admin/MediaEditor';
import { MediaContent } from '@/types/test';

export default function ListeningManager() {
    const { toast } = useToast();
    const [view, setView] = useState<'list' | 'test' | 'part'>('list');
    const [tests, setTests] = useState<any[]>([]);
    const [selectedTest, setSelectedTest] = useState<any>(null);
    const [parts, setParts] = useState<any[]>([]);
    const [selectedPart, setSelectedPart] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    // Modals for Part/Question creation
    const [partDialogOpen, setPartDialogOpen] = useState(false);
    const [partFormData, setPartFormData] = useState({ title: '', audio_url: '' });
    const [questionDialogOpen, setQuestionDialogOpen] = useState(false);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [questionFormData, setQuestionFormData] = useState({
        type: 'mcq' as any,
        text: '',
        media: null as MediaContent | null
    });

    // Test Level Management
    const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
    const [editingTestState, setEditingTestState] = useState<any>(null);
    const [testFormData, setTestFormData] = useState({
        title: '',
        is_mock_only: false
    });

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        const { data } = await supabase.from('listening_tests').select('*').order('created_at', { ascending: false });
        if (data) setTests(data);
    };

    const handleOpenCreateTest = () => {
        setEditingTestState(null);
        setTestFormData({ title: '', is_mock_only: false });
        setIsManageDialogOpen(true);
    };

    const handleOpenEditTest = (test: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingTestState(test);
        setTestFormData({ title: test.title, is_mock_only: test.is_mock_only });
        setIsManageDialogOpen(true);
    };

    const handleSaveTest = async () => {
        if (!testFormData.title) {
            toast({ title: "Error", description: "Title is required", variant: "destructive" });
            return;
        }

        let error;
        if (editingTestState) {
            const { error: updateError } = await supabase
                .from('listening_tests')
                .update({
                    title: testFormData.title,
                    is_mock_only: testFormData.is_mock_only
                })
                .eq('id', editingTestState.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('listening_tests')
                .insert({
                    title: testFormData.title,
                    is_mock_only: testFormData.is_mock_only
                });
            error = insertError;
        }

        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Success", description: editingTestState ? "Test updated" : "Test created" });
            setIsManageDialogOpen(false);
            fetchTests();
        }
    };

    const openTest = async (test: any) => {
        setSelectedTest(test);
        const { data } = await supabase.from('listening_parts').select('*').eq('test_id', test.id).order('order_index');
        setParts(data || []);
        setView('test');
    };

    const handleCreatePart = async () => {
        if (!selectedTest || !partFormData.title || !partFormData.audio_url) return;

        const { error } = await supabase.from('listening_parts').insert({
            test_id: selectedTest.id,
            title: partFormData.title,
            audio_url: partFormData.audio_url,
            order_index: parts.length + 1
        });

        if (!error) {
            toast({ title: "Success", description: "Part added" });
            setPartDialogOpen(false);
            setPartFormData({ title: '', audio_url: '' });
            openTest(selectedTest);
        }
    };

    const openPart = async (part: any) => {
        setSelectedPart(part);
        const { data } = await supabase.from('listening_questions').select('*').eq('part_id', part.id).order('order_index');
        setQuestions(data || []);
        setView('part');
    };

    const handleAddQuestion = async () => {
        if (!selectedPart || !questionFormData.text) return;

        const questionData = {
            part_id: selectedPart.id,
            question_type: questionFormData.type,
            question_text: questionFormData.text,
            order_index: editingQuestionId ? undefined : questions.length + 1,
            media: questionFormData.media,
            correct_answer: (questionFormData as any).correct_answer || '',
            options: (questionFormData.type === 'mcq' || questionFormData.type === 'multi_select')
                ? (questionFormData.options || ["Option A", "Option B", "Option C", "Option D"])
                : null
        };

        let error;
        if (editingQuestionId) {
            const { error: updateError } = await supabase
                .from('listening_questions')
                .update(questionData)
                .eq('id', editingQuestionId);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('listening_questions')
                .insert(questionData);
            error = insertError;
        }

        if (!error) {
            setQuestionDialogOpen(false);
            setEditingQuestionId(null);
            setQuestionFormData({ type: 'mcq' as any, text: '', media: null });
            const { data } = await supabase.from('listening_questions').select('*').eq('part_id', selectedPart.id).order('order_index');
            setQuestions(data || []);
            toast({ title: "Success", description: editingQuestionId ? "Question updated" : "Question added" });
        } else {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    const handleEditQuestion = (q: any) => {
        setEditingQuestionId(q.id);
        setQuestionFormData({
            type: q.question_type,
            text: q.question_text,
            media: q.media,
            ...q
        });
        setQuestionDialogOpen(true);
    };

    const deleteQuestion = async (id: string) => {
        if (!confirm("Delete this question?")) return;
        await supabase.from('listening_questions').delete().eq('id', id);
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const deleteTest = async (testId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete entire test? This includes all parts and questions.")) return;
        await supabase.from('listening_tests').delete().eq('id', testId);
        setTests(prev => prev.filter(t => t.id !== testId));
    };

    const deletePart = async (partId: string) => {
        if (!confirm("Delete part? Questions will also be removed.")) return;
        await supabase.from('listening_parts').delete().eq('id', partId);
        setParts(prev => prev.filter(p => p.id !== partId));
    };

    const updateOption = async (question: any, optIndex: number, newValue: string) => {
        const newOptions = [...(question.options || [])];
        newOptions[optIndex] = newValue;
        setQuestions(prev => prev.map(q => q.id === question.id ? { ...q, options: newOptions } : q));
        await supabase.from('listening_questions').update({ options: newOptions }).eq('id', question.id);
    };

    const addOption = async (question: any) => {
        const newOptions = [...(question.options || []), `Option ${String.fromCharCode(65 + (question.options?.length || 0))}`];
        setQuestions(prev => prev.map(q => q.id === question.id ? { ...q, options: newOptions } : q));
        await supabase.from('listening_questions').update({ options: newOptions }).eq('id', question.id);
    };

    const removeOption = async (question: any, optIndex: number) => {
        const newOptions = (question.options || []).filter((_: any, i: number) => i !== optIndex);
        setQuestions(prev => prev.map(q => q.id === question.id ? { ...q, options: newOptions } : q));
        await supabase.from('listening_questions').update({ options: newOptions }).eq('id', question.id);
    };

    return (
        <div className="space-y-6">
            {view === 'list' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Listening Tests</h2>
                        <Button onClick={handleOpenCreateTest}><Plus className="w-4 h-4 mr-2" /> New Test</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tests.map(test => (
                            <Card key={test.id} className="p-6 hover:border-indigo-500 cursor-pointer transition-colors relative group" onClick={() => openTest(test)}>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 items-center">
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => handleOpenEditTest(test, e)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="destructive" className="h-8 w-8" onClick={(e) => deleteTest(test.id, e)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{test.title}</h3>
                                    {test.is_mock_only && (
                                        <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200">
                                            Mock
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    {test.is_mock_only ? 'Mock Simulation Only' : 'General Practice + Mock'}
                                </p>
                                <p className="text-slate-300 text-[10px] mt-2">
                                    {test.created_at ? new Date(test.created_at).toLocaleDateString() : 'Just now'}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {view === 'test' && selectedTest && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setView('list')}><ArrowLeft /></Button>
                        <h2 className="text-2xl font-bold">{selectedTest.title} (Parts)</h2>
                    </div>
                    <Button onClick={() => setPartDialogOpen(true)}><Plus className="w-4 h-4 mr-2" /> Add Part</Button>
                    <div className="space-y-4">
                        {parts.map((p, i) => (
                            <Card key={p.id} className="p-4 flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <Music className="w-5 h-5 text-indigo-600" />
                                    <div>
                                        <span className="font-bold">{p.title}</span>
                                        <p className="text-xs text-slate-500">{p.audio_url}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => openPart(p)}>Edit Questions</Button>
                                    <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => deletePart(p.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {view === 'part' && selectedPart && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => setView('test')}><ArrowLeft /></Button>
                            <h2 className="text-2xl font-bold">Questions: {selectedPart.title}</h2>
                        </div>
                        <Button
                            onClick={async () => {
                                const { error } = await supabase.from('listening_parts').update({ content: selectedPart.content }).eq('id', selectedPart.id);
                                if (!error) toast({ title: "Saved", description: "Part layout updated" });
                            }}
                        >
                            <Save className="w-4 h-4 mr-2" /> Save Layout
                        </Button>
                    </div>

                    <div className="space-y-4 mb-8 p-6 bg-slate-50 rounded-2xl border-2 border-slate-100">
                        <label className="text-sm font-black uppercase text-slate-400 tracking-widest">Part Layout / Instructions (HTML supported)</label>
                        <Textarea
                            className="min-h-[200px] font-mono whitespace-pre-wrap"
                            placeholder="Add tables, images, or instructions here..."
                            defaultValue={selectedPart.content || ''}
                            onBlur={(e) => setSelectedPart({ ...selectedPart, content: e.target.value })}
                        />
                        <p className="text-xs text-slate-500 italic">Use HTML (e.g. &lt;table&gt;) for complex layouts like the IELTS form completion samples.</p>
                    </div>

                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'mcq', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ MCQ</Button>
                        <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'multi_select', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ Multi-Select</Button>
                        <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'bool', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ T/F/NG</Button>
                        <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'gap', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ Fill Gap</Button>
                        <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'short_answer', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ Short Ans</Button>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, i) => (
                            <Card key={q.id} className="p-4 relative group">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => handleEditQuestion(q)}><Edit className="w-4 h-4" /></Button>
                                    <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteQuestion(q.id)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                                <div className="flex gap-3">
                                    <span className="font-bold text-indigo-600">{i + 1}.</span>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase bg-slate-100 px-1.5 py-0.5 rounded">{q.question_type}</span>
                                            <Input
                                                defaultValue={q.question_text}
                                                onBlur={async (e) => {
                                                    await supabase.from('listening_questions').update({ question_text: e.target.value }).eq('id', q.id);
                                                }}
                                                className="h-8 text-sm font-semibold border-transparent hover:border-slate-200 dark:border-border focus:border-indigo-500"
                                            />
                                        </div>
                                        {(q.question_type === 'mcq' || q.question_type === 'multi_select') && (
                                            <div className="grid grid-cols-2 gap-2 pl-6">
                                                {q.options?.map((opt: string, optIdx: number) => {
                                                    const isCorrect = q.question_type === 'multi_select'
                                                        ? q.correct_answer?.split(',').map((s: string) => s.trim()).includes(opt)
                                                        : q.correct_answer === opt;

                                                    return (
                                                        <div key={optIdx} className="flex items-center gap-2 group/opt">
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className={`h-6 w-6 shrink-0 ${isCorrect ? 'text-green-600 bg-green-50' : 'text-slate-300'}`}
                                                                onClick={async () => {
                                                                    let newCorrect;
                                                                    if (q.question_type === 'multi_select') {
                                                                        const current = q.correct_answer?.split(',').map((s: string) => s.trim()).filter(Boolean) || [];
                                                                        if (current.includes(opt)) {
                                                                            newCorrect = current.filter((s: string) => s !== opt).join(', ');
                                                                        } else {
                                                                            newCorrect = [...current, opt].join(', ');
                                                                        }
                                                                    } else {
                                                                        newCorrect = opt;
                                                                    }

                                                                    setQuestions(prev => prev.map(item => item.id === q.id ? { ...item, correct_answer: newCorrect } : item));
                                                                    await supabase.from('listening_questions').update({ correct_answer: newCorrect }).eq('id', q.id);
                                                                }}
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </Button>
                                                            <Input
                                                                defaultValue={opt}
                                                                onBlur={(e) => updateOption(q, optIdx, e.target.value)}
                                                                className="h-7 text-xs flex-1"
                                                                placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                                                            />
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-6 w-6 text-slate-300 hover:text-red-500 opacity-0 group-hover/opt:opacity-100 transition-opacity"
                                                                onClick={() => removeOption(q, optIdx)}
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border border-dashed border-indigo-200 w-full"
                                                    onClick={() => addOption(q)}
                                                >
                                                    <Plus className="w-3 h-3 mr-1" /> Add Option
                                                </Button>
                                            </div>
                                        )}

                                        <div className="pl-6 pt-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correct Answer:</span>
                                                <Input
                                                    defaultValue={q.correct_answer}
                                                    placeholder={q.question_type === 'multi_select' ? "e.g. A, B, C" : "Correct Answer"}
                                                    onBlur={async (e) => {
                                                        await supabase.from('listening_questions').update({ correct_answer: e.target.value }).eq('id', q.id);
                                                    }}
                                                    className="h-7 text-xs flex-1 max-w-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Test Management Dialog */}
            <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingTestState ? 'Edit Test Settings' : 'Create New Listening Test'}</DialogTitle>
                        <DialogDescription>
                            Configure the test title and visibility settings.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Test Title</Label>
                            <Input
                                id="title"
                                value={testFormData.title}
                                onChange={(e) => setTestFormData({ ...testFormData, title: e.target.value })}
                                placeholder="e.g. Cambridge 18 Test 1"
                            />
                        </div>
                        <div className="flex items-center space-x-2 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-2">
                            <Checkbox
                                id="is_mock_only"
                                checked={testFormData.is_mock_only}
                                onCheckedChange={(checked) => setTestFormData({ ...testFormData, is_mock_only: checked as boolean })}
                            />
                            <Label htmlFor="is_mock_only" className="text-sm font-bold text-slate-700 leading-none cursor-pointer">
                                Reserved for Mock Tests Only
                                <span className="block text-[10px] text-slate-400 font-medium">Hides this from general student practice selection.</span>
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsManageDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSaveTest}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Part Creation Dialog */}
            <Dialog open={partDialogOpen} onOpenChange={setPartDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Listening Part</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Part Title</Label>
                            <Input value={partFormData.title} onChange={e => setPartFormData({ ...partFormData, title: e.target.value })} placeholder="e.g. Part 1: Introduction" />
                        </div>
                        <div className="space-y-2">
                            <Label>Audio URL</Label>
                            <Input value={partFormData.audio_url} onChange={e => setPartFormData({ ...partFormData, audio_url: e.target.value })} placeholder="https://..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPartDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreatePart}>Create Part</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingQuestionId ? 'Edit' : 'Add'} {questionFormData.type.toUpperCase()} Question</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Question Text</Label>
                            <Textarea
                                value={questionFormData.text}
                                onChange={e => setQuestionFormData({ ...questionFormData, text: e.target.value })}
                                placeholder="Enter question..."
                                className="min-h-[100px]"
                            />
                        </div>

                        <MediaEditor
                            media={questionFormData.media}
                            onChange={(media) => setQuestionFormData({ ...questionFormData, media })}
                        />

                        {editingQuestionId && (questionFormData.type === 'mcq' || questionFormData.type === 'multi_select') && (
                            <div className="space-y-2">
                                <Label>Options</Label>
                                {(questionFormData as any).options?.map((opt: string, idx: number) => (
                                    <div key={idx} className="flex gap-2">
                                        <Input
                                            value={opt}
                                            onChange={(e) => {
                                                const newOpts = [...(questionFormData as any).options];
                                                newOpts[idx] = e.target.value;
                                                setQuestionFormData({ ...questionFormData, options: newOpts } as any);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {(editingQuestionId || (questionFormData.type !== 'mcq' && questionFormData.type !== 'multi_select')) && (
                            <div className="space-y-2">
                                <Label>Correct Answer</Label>
                                <Input
                                    value={(questionFormData as any).correct_answer || ''}
                                    onChange={e => setQuestionFormData({ ...questionFormData, correct_answer: e.target.value } as any)}
                                    placeholder="Enter correct answer..."
                                />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => { setQuestionDialogOpen(false); setEditingQuestionId(null); }}>Cancel</Button>
                        <Button onClick={handleAddQuestion}>{editingQuestionId ? 'Update' : 'Add'} Question</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
