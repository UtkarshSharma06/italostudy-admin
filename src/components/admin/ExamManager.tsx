import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useExam } from '@/context/ExamContext';
import {
    Plus, Trash2, Edit2, Save, X, Layout,
    BookOpen, List, Target, Clock, Settings,
    FileJson, ChevronRight, ChevronDown
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';

interface SyllabusTopic {
    id: string;
    name: string;
    subtopics: string[];
}

interface ExamSection {
    id: string;
    name: string;
    questionCount: number;
    durationMinutes: number;
    icon?: string;
    color?: string;
}

interface Exam {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    duration_minutes: number;
    total_questions: number;
    proctored: boolean | null;
    scoring: {
        correct: number;
        incorrect: number;
        skipped: number;
        difficulty_labels?: {
            easy: string;
            medium: string;
            hard: string;
        };
    };
    sections: ExamSection[];
    syllabus: Record<string, SyllabusTopic[]>;
    bg_gradient: string | null;
    is_live: boolean | null;
    is_soon: boolean | null;
    created_at?: string;
    updated_at?: string;
}

export default function ExamManager() {
    const { refreshExams } = useExam();
    const [exams, setExams] = useState<Exam[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingExam, setEditingExam] = useState<Exam | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState<Partial<Exam>>({
        slug: '',
        name: '',
        description: '',
        duration_minutes: 60,
        total_questions: 50,
        proctored: true,
        scoring: {
            correct: 1,
            incorrect: 0,
            skipped: 0,
            difficulty_labels: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
        },
        sections: [],
        syllabus: {},
        bg_gradient: 'from-indigo-600 to-blue-600',
        is_live: true,
        is_soon: false
    });

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('exams')
            .select('*')
            .order('name');

        if (data) setExams(data as unknown as Exam[]);
        if (error) console.error('Error fetching exams:', error);
        setLoading(false);
    };

    const handleSave = async () => {
        if (!formData.slug || !formData.name) {
            toast({ title: "Slug and Name are required", variant: "destructive" });
            return;
        }

        const { error } = await supabase
            .from('exams')
            .upsert(formData as any)
            .select();

        if (!error) {
            toast({ title: `Exam ${editingExam ? 'updated' : 'created'} successfully` });
            setIsDialogOpen(false);
            fetchExams();
            refreshExams();
            setEditingExam(null);
        } else {
            toast({ title: "Error saving exam", description: error.message, variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this exam? This cannot be undone.')) return;

        const { error } = await supabase
            .from('exams')
            .delete()
            .eq('id', id);

        if (!error) {
            toast({ title: "Exam deleted successfully" });
            fetchExams();
        }
    };

    const openEditDialog = (exam: Exam) => {
        setEditingExam(exam);
        setFormData(exam);
        setIsDialogOpen(true);
    };

    const openCreateDialog = () => {
        setEditingExam(null);
        setFormData({
            slug: '',
            name: '',
            description: '',
            duration_minutes: 60,
            total_questions: 50,
            proctored: true,
            scoring: {
                correct: 1,
                incorrect: 0,
                skipped: 0,
                difficulty_labels: { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
            },
            sections: [],
            syllabus: {},
            bg_gradient: 'from-indigo-600 to-blue-600',
            is_live: true,
            is_soon: false
        });
        setIsDialogOpen(true);
    };

    // Syllabus Management Helpers
    const addSubject = (subjectName: string) => {
        if (!subjectName) return;
        const newSyllabus = { ...formData.syllabus };
        if (!newSyllabus[subjectName]) {
            newSyllabus[subjectName] = [];
            setFormData({ ...formData, syllabus: newSyllabus });
        }
    };

    const addTopic = (subjectName: string, topicName: string) => {
        const newSyllabus = { ...formData.syllabus };
        const id = topicName.toLowerCase().replace(/\s+/g, '_');
        newSyllabus[subjectName].push({ id, name: topicName, subtopics: [] });
        setFormData({ ...formData, syllabus: newSyllabus });
    };

    const addSubtopic = (subjectName: string, topicIndex: number, subtopicName: string) => {
        const newSyllabus = { ...formData.syllabus };
        newSyllabus[subjectName][topicIndex].subtopics.push(subtopicName);
        setFormData({ ...formData, syllabus: newSyllabus });
    };

    // Section Management Helpers
    const addSection = () => {
        const newSections = [...(formData.sections || [])];
        newSections.push({
            id: `sec_${Date.now()} `,
            name: 'New Section',
            questionCount: 10,
            durationMinutes: 15,
            icon: '📝',
            color: 'blue'
        });
        setFormData({ ...formData, sections: newSections });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Layout className="w-6 h-6" /> Exam Configuration
                </h2>
                <Button onClick={openCreateDialog} className="gap-2">
                    <Plus className="w-4 h-4" /> Create New Exam
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam) => (
                    <Card key={exam.id} className="hover:shadow-md transition-shadow dark:bg-card">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className={`text - [10px] font - bold uppercase tracking - widest px - 2 py - 0.5 rounded - full border mb - 2 inline - block ${exam.is_live ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'} `}>
                                        {exam.is_live ? 'Live' : 'Draft'}
                                    </div>
                                    <CardTitle className="text-xl">{exam.name}</CardTitle>
                                    <CardDescription className="font-mono text-xs">{exam.slug}</CardDescription>
                                </div>
                                <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(exam)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(exam.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm text-slate-500">
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{exam.duration_minutes}m</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Questions</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{exam.total_questions}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-1"><Layout className="w-3 h-3" /> Sections</span>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{exam.sections?.length || 0}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                    <DialogHeader className="p-6 pb-2">
                        <DialogTitle className="text-2xl">{editingExam ? 'Edit Exam' : 'Create New Exam'}</DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto min-h-0 p-6 pt-0">
                        <Tabs defaultValue="basic" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                                <TabsTrigger value="scoring">Scoring & Rules</TabsTrigger>
                                <TabsTrigger value="sections">Sections</TabsTrigger>
                                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4 pt-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Exam Name</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. SAT Preparation"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Slug (Unique Identifier)</label>
                                        <Input
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="e.g. sat-prep"
                                            disabled={!!editingExam}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the exam purpose and structure..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">BG Gradient</label>
                                        <Input
                                            value={formData.bg_gradient}
                                            onChange={(e) => setFormData({ ...formData, bg_gradient: e.target.value })}
                                            placeholder="from-indigo-600 to-blue-600"
                                        />
                                    </div>
                                    <div className="flex items-center gap-8 pt-6">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_live}
                                                onChange={(e) => setFormData({ ...formData, is_live: e.target.checked })}
                                                className="w-4 h-4"
                                            />
                                            <label className="text-sm font-medium">Is Live</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_soon}
                                                onChange={(e) => setFormData({ ...formData, is_soon: e.target.checked })}
                                                className="w-4 h-4"
                                            />
                                            <label className="text-sm font-medium">Coming Soon</label>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="scoring" className="space-y-4 pt-2">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Correct Ans (+)</label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            value={formData.scoring?.correct}
                                            onChange={(e) => setFormData({ ...formData, scoring: { ...formData.scoring!, correct: parseFloat(e.target.value) } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Incorrect Ans (-)</label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            value={formData.scoring?.incorrect}
                                            onChange={(e) => setFormData({ ...formData, scoring: { ...formData.scoring!, incorrect: parseFloat(e.target.value) } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Skipped (0)</label>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            value={formData.scoring?.skipped}
                                            onChange={(e) => setFormData({ ...formData, scoring: { ...formData.scoring!, skipped: parseFloat(e.target.value) } })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Total Duration (mins)</label>
                                        <Input
                                            type="number"
                                            value={formData.duration_minutes}
                                            onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Total Questions</label>
                                        <Input
                                            type="number"
                                            value={formData.total_questions}
                                            onChange={(e) => setFormData({ ...formData, total_questions: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Custom Difficulty Labels</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-400">Easy Label</label>
                                            <Input
                                                value={formData.scoring?.difficulty_labels?.easy || 'Easy'}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    scoring: {
                                                        ...formData.scoring!,
                                                        difficulty_labels: { ...formData.scoring?.difficulty_labels || { easy: 'Easy', medium: 'Medium', hard: 'Hard' }, easy: e.target.value }
                                                    }
                                                })}
                                                placeholder="e.g. Foundation"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-400">Medium Label</label>
                                            <Input
                                                value={formData.scoring?.difficulty_labels?.medium || 'Medium'}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    scoring: {
                                                        ...formData.scoring!,
                                                        difficulty_labels: { ...formData.scoring?.difficulty_labels || { easy: 'Easy', medium: 'Medium', hard: 'Hard' }, medium: e.target.value }
                                                    }
                                                })}
                                                placeholder="e.g. Standard"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-slate-400">Hard Label</label>
                                            <Input
                                                value={formData.scoring?.difficulty_labels?.hard || 'Hard'}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    scoring: {
                                                        ...formData.scoring!,
                                                        difficulty_labels: { ...formData.scoring?.difficulty_labels || { easy: 'Easy', medium: 'Medium', hard: 'Hard' }, hard: e.target.value }
                                                    }
                                                })}
                                                placeholder="e.g. Advanced"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="sections" className="space-y-4 pt-2">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Exam Sections</h4>
                                    <Button size="sm" variant="outline" onClick={addSection} className="gap-2">
                                        <Plus className="w-3 h-3" /> Add Section
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {formData.sections?.map((section, idx) => (
                                        <div key={idx} className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-800 space-y-3">
                                            <div className="grid grid-cols-3 gap-3">
                                                <Input
                                                    placeholder="Section Name"
                                                    value={section.name}
                                                    onChange={(e) => {
                                                        const newSections = [...formData.sections!];
                                                        newSections[idx].name = e.target.value;
                                                        setFormData({ ...formData, sections: newSections });
                                                    }}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Questions"
                                                    value={section.questionCount}
                                                    onChange={(e) => {
                                                        const newSections = [...formData.sections!];
                                                        newSections[idx].questionCount = parseInt(e.target.value);
                                                        setFormData({ ...formData, sections: newSections });
                                                    }}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Duration"
                                                    value={section.durationMinutes}
                                                    onChange={(e) => {
                                                        const newSections = [...formData.sections!];
                                                        newSections[idx].durationMinutes = parseInt(e.target.value);
                                                        setFormData({ ...formData, sections: newSections });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2">
                                                    <Input className="w-20" value={section.icon} onChange={(e) => {
                                                        const newSections = [...formData.sections!];
                                                        newSections[idx].icon = e.target.value;
                                                        setFormData({ ...formData, sections: newSections });
                                                    }} placeholder="Icon" />
                                                    <Input className="w-32" value={section.color} onChange={(e) => {
                                                        const newSections = [...formData.sections!];
                                                        newSections[idx].color = e.target.value;
                                                        setFormData({ ...formData, sections: newSections });
                                                    }} placeholder="Color (e.g. blue)" />
                                                </div>
                                                <Button size="icon" variant="ghost" className="text-destructive h-8 w-8" onClick={() => {
                                                    const newSections = formData.sections!.filter((_, i) => i !== idx);
                                                    setFormData({ ...formData, sections: newSections });
                                                }}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="syllabus" className="space-y-4 pt-2">
                                <div className="space-y-6">
                                    <div className="flex gap-2">
                                        <Input id="newSubject" placeholder="Subject Name (e.g. Biology)" />
                                        <Button onClick={() => {
                                            const val = (document.getElementById('newSubject') as HTMLInputElement).value;
                                            addSubject(val);
                                            (document.getElementById('newSubject') as HTMLInputElement).value = '';
                                        }}>Add Subject</Button>
                                    </div>

                                    {Object.entries(formData.syllabus || {}).map(([subject, topics]) => (
                                        <Card key={subject} className="border-2 border-slate-100">
                                            <CardHeader className="py-3 bg-slate-50 dark:bg-slate-800 flex flex-row items-center justify-between">
                                                <CardTitle className="text-sm font-black uppercase tracking-widest">{subject}</CardTitle>
                                                <Button size="icon" variant="ghost" className="text-destructive h-8 w-8" onClick={() => {
                                                    const newSyllabus = { ...formData.syllabus };
                                                    delete newSyllabus[subject];
                                                    setFormData({ ...formData, syllabus: newSyllabus });
                                                }}>
                                                    <Trash2 className="w-3 h-3" />
                                                </Button>
                                            </CardHeader>
                                            <CardContent className="p-4 space-y-4">
                                                <div className="flex gap-2 mb-2">
                                                    <Input id={`newTopic_${subject} `} placeholder="New Topic" size={20} />
                                                    <Button size="sm" onClick={() => {
                                                        const val = (document.getElementById(`newTopic_${subject} `) as HTMLInputElement).value;
                                                        addTopic(subject, val);
                                                        (document.getElementById(`newTopic_${subject} `) as HTMLInputElement).value = '';
                                                    }}>Add Topic</Button>
                                                </div>
                                                <div className="space-y-3">
                                                    {topics.map((topic, tIdx) => (
                                                        <div key={tIdx} className="p-3 bg-slate-50/50 rounded-lg border border-slate-100">
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="font-bold text-sm tracking-tight">{topic.name}</span>
                                                                <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive" onClick={() => {
                                                                    const newSyllabus = { ...formData.syllabus };
                                                                    newSyllabus[subject].splice(tIdx, 1);
                                                                    setFormData({ ...formData, syllabus: newSyllabus });
                                                                }}>
                                                                    <Trash2 className="w-3 h-3" />
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                {topic.subtopics.map((sub, sIdx) => (
                                                                    <span key={sIdx} className="px-2 py-0.5 bg-white border rounded text-[10px] flex items-center gap-1">
                                                                        {sub}
                                                                        <X className="w-2 h-2 cursor-pointer text-slate-400" onClick={() => {
                                                                            const newSyllabus = { ...formData.syllabus };
                                                                            newSyllabus[subject][tIdx].subtopics.splice(sIdx, 1);
                                                                            setFormData({ ...formData, syllabus: newSyllabus });
                                                                        }} />
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <Input id={`newSub_${subject}_${tIdx} `} placeholder="Add Subtopic" className="h-7 text-[10px]" />
                                                                <Button size="sm" className="h-7 px-2" variant="outline" onClick={() => {
                                                                    const val = (document.getElementById(`newSub_${subject}_${tIdx} `) as HTMLInputElement).value;
                                                                    addSubtopic(subject, tIdx, val);
                                                                    (document.getElementById(`newSub_${subject}_${tIdx} `) as HTMLInputElement).value = '';
                                                                }}>Add</Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="p-6 border-t bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="w-4 h-4" /> {editingExam ? 'Update Exam' : 'Create Exam'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
