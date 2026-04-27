import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit, Save, ArrowLeft, FileText, HelpCircle, CheckCircle } from 'lucide-react';
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


export default function ReadingManager() {
    const { toast } = useToast();
    const [view, setView] = useState<'list' | 'test' | 'passage'>('list');
    const [tests, setTests] = useState<any[]>([]);
    const [selectedTest, setSelectedTest] = useState<any>(null);
    const [passages, setPassages] = useState<any[]>([]);
    const [selectedPassage, setSelectedPassage] = useState<any>(null);
    const [passagetext, setPassageText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [questions, setQuestions] = useState<any[]>([]);

    // Modals for Passage/Question creation
    const [passageDialogOpen, setPassageDialogOpen] = useState(false);
    const [passageFormData, setPassageFormData] = useState({ title: '' });
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
        const { data } = await supabase.from('reading_tests').select('*').order('created_at', { ascending: false });
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
                .from('reading_tests')
                .update({
                    title: testFormData.title,
                    is_mock_only: testFormData.is_mock_only
                })
                .eq('id', editingTestState.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('reading_tests')
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
        const { data } = await supabase.from('reading_passages').select('*').eq('test_id', test.id).order('order_index');
        setPassages(data || []);
        setView('test');
    };

    const handleCreatePassage = async () => {
        if (!selectedTest || !passageFormData.title) return;

        const { error } = await supabase.from('reading_passages').insert({
            test_id: selectedTest.id,
            title: passageFormData.title,
            content: 'Write passage content here...',
            order_index: passages.length + 1
        });

        if (!error) {
            toast({ title: "Success", description: "Passage added" });
            setPassageDialogOpen(false);
            setPassageFormData({ title: '' });
            openTest(selectedTest);
        }
    };

    const openPassage = async (passage: any) => {
        setSelectedPassage(passage);
        setPassageText(passage.content);
        setImageUrl(passage.image_url || '');
        const { data } = await supabase.from('reading_questions').select('*').eq('passage_id', passage.id).order('order_index');
        setQuestions(data || []);
        setView('passage');
    };

    const savePassageContent = async () => {
        if (!selectedPassage) return;
        const { error } = await supabase.from('reading_passages').update({
            content: passagetext,
            image_url: imageUrl
        }).eq('id', selectedPassage.id);
        if (!error) toast({ title: "Saved", description: "Passage content updated" });
    };

    const handleAddQuestion = async () => {
        if (!selectedPassage || !questionFormData.text) return;

        const questionData = {
            passage_id: selectedPassage.id,
            question_type: questionFormData.type,
            question_text: questionFormData.text,
            correct_answer: (questionFormData as any).correct_answer || '',
            order_index: editingQuestionId ? undefined : questions.length + 1,
            media: questionFormData.media,
            options: (questionFormData.type === 'mcq' || questionFormData.type === 'multi_select')
                ? (questionFormData.options || ["Option A", "Option B", "Option C", "Option D"])
                : questionFormData.type === 'short_answer' ? [""] : null
        };

        let error;
        if (editingQuestionId) {
            const { error: updateError } = await supabase
                .from('reading_questions')
                .update(questionData)
                .eq('id', editingQuestionId);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('reading_questions')
                .insert(questionData);
            error = insertError;
        }

        if (!error) {
            setQuestionDialogOpen(false);
            setEditingQuestionId(null);
            setQuestionFormData({ type: 'mcq' as any, text: '', media: null });
            const { data } = await supabase.from('reading_questions').select('*').eq('passage_id', selectedPassage.id).order('order_index');
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
        await supabase.from('reading_questions').delete().eq('id', id);
        setQuestions(prev => prev.filter(q => q.id !== id));
    };

    const deleteTest = async (testId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete entire test? This includes all passages and questions.")) return;
        await supabase.from('reading_tests').delete().eq('id', testId);
        setTests(prev => prev.filter(t => t.id !== testId));
    };

    const deletePassage = async (passageId: string) => {
        if (!confirm("Delete passage? Questions will also be removed.")) return;
        await supabase.from('reading_passages').delete().eq('id', passageId);
        setPassages(prev => prev.filter(p => p.id !== passageId));
    };

    const updateOption = async (question: any, optIndex: number, newValue: string) => {
        const newOptions = [...(question.options || [])];
        newOptions[optIndex] = newValue;
        setQuestions(prev => prev.map(q => q.id === question.id ? { ...q, options: newOptions } : q));
        await supabase.from('reading_questions').update({ options: newOptions }).eq('id', question.id);
    };

    const addOption = async (question: any) => {
        const newOptions = [...(question.options || []), `Option ${String.fromCharCode(65 + (question.options?.length || 0))}`];
        setQuestions(prev => prev.map(q => q.id === question.id ? { ...q, options: newOptions } : q));
        await supabase.from('reading_questions').update({ options: newOptions }).eq('id', question.id);
    };

    const removeOption = async (question: any, optIndex: number) => {
        const newOptions = (question.options || []).filter((_: any, i: number) => i !== optIndex);
        setQuestions(prev => prev.map(q => q.id === question.id ? { ...q, options: newOptions } : q));
        await supabase.from('reading_questions').update({ options: newOptions }).eq('id', question.id);
    };

    return (
        <div className="space-y-6">
            {view === 'list' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Reading Tests</h2>
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
                                <p className="text-slate-300 text-[10px] mt-2">{new Date(test.created_at).toLocaleDateString()}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {view === 'test' && selectedTest && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setView('list')}><ArrowLeft /></Button>
                        <h2 className="text-2xl font-bold">{selectedTest.title} (Passages)</h2>
                    </div>
                    <Button onClick={() => setPassageDialogOpen(true)}><Plus className="w-4 h-4 mr-2" /> Add Passage</Button>
                    <div className="space-y-4">
                        {passages.map((p, i) => (
                            <Card key={p.id} className="p-4 flex justify-between items-center group">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">P{i + 1}</span>
                                    <span className="font-bold">{p.title}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => openPassage(p)}>Edit</Button>
                                    <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => deletePassage(p.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {view === 'passage' && selectedPassage && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setView('test')}><ArrowLeft /></Button>
                        <h2 className="text-2xl font-bold">Editing: {selectedPassage.title}</h2>
                    </div>

                    <Tabs defaultValue="content">
                        <TabsList>
                            <TabsTrigger value="content"><FileText className="w-4 h-4 mr-2" /> Passage Content</TabsTrigger>
                            <TabsTrigger value="questions"><HelpCircle className="w-4 h-4 mr-2" /> Questions ({questions.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="content" className="space-y-4">
                            <div className="space-y-4 mb-4 p-4 border rounded-lg bg-slate-50">
                                <h3 className="font-semibold text-sm">Passage Image (Optional)</h3>
                                <Input
                                    placeholder="Enter Image URL (e.g., https://example.com/image.jpg)"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                />
                                <p className="text-xs text-slate-500">Provide a direct link to an image to display it above the passage.</p>
                            </div>
                            <Textarea
                                className="min-h-[500px] font-mono whitespace-pre-wrap"
                                value={passagetext}
                                onChange={(e) => setPassageText(e.target.value)}
                            />
                            <Button onClick={savePassageContent}><Save className="w-4 h-4 mr-2" /> Save Content</Button>
                        </TabsContent>

                        <TabsContent value="questions" className="space-y-6">
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'mcq', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ MCQ</Button>
                                <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'bool', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ T/F/NG</Button>
                                <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'gap', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ Fill Gap</Button>
                                <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'short_answer', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ Short Ans</Button>
                                <Button size="sm" variant="outline" onClick={() => { setQuestionFormData({ type: 'multi_select', text: '', media: null }); setEditingQuestionId(null); setQuestionDialogOpen(true); }}>+ Multi-Select</Button>
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
                                                            await supabase.from('reading_questions').update({ question_text: e.target.value }).eq('id', q.id);
                                                        }}
                                                        className="h-8 text-sm font-semibold border-transparent hover:border-slate-200 dark:border-border focus:border-indigo-500"
                                                    />
                                                    {q.question_type !== 'mcq' && (
                                                        <Input
                                                            defaultValue={q.correct_answer || ''}
                                                            onBlur={async (e) => {
                                                                await supabase.from('reading_questions').update({ correct_answer: e.target.value }).eq('id', q.id);
                                                            }}
                                                            placeholder="Correct Ans"
                                                            className="h-8 w-24 text-sm border-green-200 bg-green-50 focus:border-green-500"
                                                        />
                                                    )}
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
                                                                            await supabase.from('reading_questions').update({ correct_answer: newCorrect }).eq('id', q.id);
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
                                                {q.question_type === 'short_answer' && (
                                                    <div className="pl-6 mt-2">
                                                        <Input
                                                            defaultValue={q.options?.[0] || ''}
                                                            onBlur={(e) => updateOption(q, 0, e.target.value)}
                                                            className="h-8 text-sm bg-green-50 border-green-200"
                                                            placeholder="Model Answer"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            )}

            {/* Test Management Dialog */}
            <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{editingTestState ? 'Edit Test Settings' : 'Create New Reading Test'}</DialogTitle>
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

            {/* Passage Creation Dialog */}
            <Dialog open={passageDialogOpen} onOpenChange={setPassageDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Reading Passage</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Passage Title</Label>
                            <Input value={passageFormData.title} onChange={e => setPassageFormData({ ...passageFormData, title: e.target.value })} placeholder="e.g. The History of Aviation" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setPassageDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreatePassage}>Create Passage</Button>
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

                        {(editingQuestionId || questionFormData.type !== 'mcq') && (
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
