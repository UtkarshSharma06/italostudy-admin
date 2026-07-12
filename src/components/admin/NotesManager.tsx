import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2, FileText, ChevronRight, Upload, GripVertical, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Subject {
    id: string;
    title: string;
    exam_model_id: string;
    position: number;
}

interface Exam {
    id: string;
    name: string;
    slug: string;
}

interface Chapter {
    id: string;
    subject_id: string;
    title: string;
    position: number;
}

interface Material {
    id: string;
    chapter_id: string;
    title: string;
    pdf_url: string;
    is_free: boolean;
    position: number;
}

export default function NotesManager() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    
    const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
    const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
    const [exams, setExams] = useState<Exam[]>([]);
    const [selectedExamModel, setSelectedExamModel] = useState<string>('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const { toast } = useToast();

    // New item states
    const [newSubjectTitle, setNewSubjectTitle] = useState('');
    const [newChapterTitle, setNewChapterTitle] = useState('');
    const [newMaterialTitle, setNewMaterialTitle] = useState('');
    const [newMaterialIsFree, setNewMaterialIsFree] = useState(false);
    const [newMaterialUrl, setNewMaterialUrl] = useState('');

    useEffect(() => {
        const fetchExams = async () => {
            const { data } = await supabase.from('exams').select('id,name,slug').order('name');
            if (data) setExams(data);
        };
        fetchExams();
    }, []);

    useEffect(() => {
        if (selectedExamModel) {
            fetchSubjects(selectedExamModel);
        } else {
            setSubjects([]);
        }
        setActiveSubject(null);
        setActiveChapter(null);
        setChapters([]);
        setMaterials([]);
    }, [selectedExamModel]);

    useEffect(() => {
        if (activeSubject) {
            fetchChapters(activeSubject.id);
            setActiveChapter(null);
            setMaterials([]);
        }
    }, [activeSubject]);

    useEffect(() => {
        if (activeChapter) {
            fetchMaterials(activeChapter.id);
        }
    }, [activeChapter]);

    const fetchSubjects = async (examModelId: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.from('pdf_subjects').select('*').eq('exam_model_id', examModelId).order('position', { ascending: true });
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load subjects' });
        } else {
            setSubjects(data || []);
        }
        setIsLoading(false);
    };

    const fetchChapters = async (subjectId: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.from('pdf_chapters').select('*').eq('subject_id', subjectId).order('position', { ascending: true });
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load chapters' });
        } else {
            setChapters(data || []);
        }
        setIsLoading(false);
    };

    const fetchMaterials = async (chapterId: string) => {
        setIsLoading(true);
        const { data, error } = await supabase.from('pdf_materials').select('*').eq('chapter_id', chapterId).order('position', { ascending: true });
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load materials' });
        } else {
            setMaterials(data || []);
        }
        setIsLoading(false);
    };

    const handleAddSubject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSubjectTitle.trim() || !selectedExamModel) {
            if (!selectedExamModel) toast({ variant: 'destructive', title: 'Error', description: 'Please select an exam model first' });
            return;
        }
        setIsSaving(true);
        const position = subjects.length > 0 ? Math.max(...subjects.map(s => s.position)) + 1 : 0;
        const { data, error } = await supabase.from('pdf_subjects').insert([{ title: newSubjectTitle, exam_model_id: selectedExamModel, position }]).select().single();
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } else if (data) {
            setSubjects([...subjects, data]);
            setNewSubjectTitle('');
            toast({ title: 'Success', description: 'Subject created' });
        }
        setIsSaving(false);
    };

    const handleAddChapter = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newChapterTitle.trim() || !activeSubject) return;
        setIsSaving(true);
        const position = chapters.length > 0 ? Math.max(...chapters.map(c => c.position)) + 1 : 0;
        const { data, error } = await supabase.from('pdf_chapters').insert([{ 
            title: newChapterTitle, 
            subject_id: activeSubject.id, 
            position 
        }]).select().single();
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } else if (data) {
            setChapters([...chapters, data]);
            setNewChapterTitle('');
            toast({ title: 'Success', description: 'Chapter created' });
        }
        setIsSaving(false);
    };

    const handleAddMaterial = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMaterialTitle.trim() || !activeChapter || !newMaterialUrl.trim()) {
            toast({ variant: 'destructive', title: 'Missing Info', description: 'Please provide a title and a PDF URL.' });
            return;
        }

        setIsSaving(true);
        try {
            const position = materials.length > 0 ? Math.max(...materials.map(m => m.position)) + 1 : 0;
            const { data, error: insertError } = await supabase.from('pdf_materials').insert([{
                chapter_id: activeChapter.id,
                title: newMaterialTitle,
                pdf_url: newMaterialUrl,
                is_free: newMaterialIsFree,
                position
            }]).select().single();

            if (insertError) throw insertError;

            if (data) {
                setMaterials([...materials, data]);
                setNewMaterialTitle('');
                setNewMaterialIsFree(false);
                setNewMaterialUrl('');
                toast({ title: 'Success', description: 'Material added successfully' });
            }
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'Failed to add', description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteSubject = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Delete this subject and all its chapters/materials?')) return;
        const { error } = await supabase.from('pdf_subjects').delete().eq('id', id);
        if (!error) {
            setSubjects(subjects.filter(s => s.id !== id));
            if (activeSubject?.id === id) setActiveSubject(null);
            toast({ title: 'Deleted', description: 'Subject deleted' });
        }
    };

    const handleDeleteChapter = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Delete this chapter and all its materials?')) return;
        const { error } = await supabase.from('pdf_chapters').delete().eq('id', id);
        if (!error) {
            setChapters(chapters.filter(c => c.id !== id));
            if (activeChapter?.id === id) setActiveChapter(null);
            toast({ title: 'Deleted', description: 'Chapter deleted' });
        }
    };

    const handleDeleteMaterial = async (id: string) => {
        if (!confirm('Delete this material?')) return;

        const { error } = await supabase.from('pdf_materials').delete().eq('id', id);
        if (!error) {
            setMaterials(materials.filter(m => m.id !== id));
            toast({ title: 'Deleted', description: 'Material deleted' });
        }
    };

    const toggleMaterialFree = async (id: string, currentVal: boolean) => {
        const { error } = await supabase.from('pdf_materials').update({ is_free: !currentVal }).eq('id', id);
        if (!error) {
            setMaterials(materials.map(m => m.id === id ? { ...m, is_free: !currentVal } : m));
            toast({ title: 'Updated', description: 'Access level updated' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Notes & PDFs</h1>
                    <p className="text-slate-500 mt-2">Manage study materials, PDFs, and notes for students.</p>
                </div>
                <div className="w-full md:w-64">
                    <Select value={selectedExamModel} onValueChange={setSelectedExamModel}>
                        <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <SelectValue placeholder="Select Exam Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {exams.map(exam => (
                                <SelectItem key={exam.id} value={exam.id}>{exam.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Subjects Column */}
                <div className={cn(
                    "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-opacity duration-300",
                    !selectedExamModel && "opacity-50 pointer-events-none"
                )}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold">1. Subjects</h2>
                        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">{subjects.length}</span>
                    </div>

                    <form onSubmit={handleAddSubject} className="mb-6 flex gap-2">
                        <Input 
                            placeholder={selectedExamModel ? "New subject..." : "Select an exam model first"} 
                            value={newSubjectTitle}
                            onChange={(e) => setNewSubjectTitle(e.target.value)}
                            disabled={!selectedExamModel}
                            className="bg-slate-50 dark:bg-slate-800/50 border-0 focus-visible:ring-1"
                        />
                        <Button type="submit" size="icon" disabled={isSaving || !newSubjectTitle || !selectedExamModel} className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        </Button>
                    </form>

                    <div className="space-y-2">
                        {isLoading && subjects.length === 0 ? (
                            <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /></div>
                        ) : subjects.map(subject => (
                            <div 
                                key={subject.id}
                                onClick={() => setActiveSubject(subject)}
                                className={cn(
                                    "group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border",
                                    activeSubject?.id === subject.id 
                                        ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20" 
                                        : "bg-white border-transparent hover:border-slate-200 dark:bg-slate-900 dark:hover:border-slate-800"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 cursor-grab" />
                                    <span className={cn("font-semibold", activeSubject?.id === subject.id ? "text-indigo-700 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300")}>
                                        {subject.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={(e) => handleDeleteSubject(subject.id, e)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <ChevronRight className={cn("w-4 h-4", activeSubject?.id === subject.id ? "text-indigo-500" : "text-slate-300")} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chapters Column */}
                <div className={cn(
                    "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-opacity duration-300",
                    !activeSubject && "opacity-50 pointer-events-none"
                )}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold">2. Chapters</h2>
                        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">{chapters.length}</span>
                    </div>

                    <form onSubmit={handleAddChapter} className="mb-6 flex gap-2">
                        <Input 
                            placeholder={activeSubject ? `New chapter in ${activeSubject.title}...` : "Select a subject first"} 
                            value={newChapterTitle}
                            onChange={(e) => setNewChapterTitle(e.target.value)}
                            disabled={!activeSubject}
                            className="bg-slate-50 dark:bg-slate-800/50 border-0 focus-visible:ring-1"
                        />
                        <Button type="submit" size="icon" disabled={isSaving || !newChapterTitle || !activeSubject} className="shrink-0 bg-indigo-600 hover:bg-indigo-700">
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        </Button>
                    </form>

                    <div className="space-y-2">
                        {isLoading && activeSubject && chapters.length === 0 ? (
                            <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /></div>
                        ) : chapters.map(chapter => (
                            <div 
                                key={chapter.id}
                                onClick={() => setActiveChapter(chapter)}
                                className={cn(
                                    "group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border",
                                    activeChapter?.id === chapter.id 
                                        ? "bg-indigo-50 border-indigo-200 dark:bg-indigo-500/10 dark:border-indigo-500/20" 
                                        : "bg-white border-transparent hover:border-slate-200 dark:bg-slate-900 dark:hover:border-slate-800"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 cursor-grab" />
                                    <span className={cn("font-medium", activeChapter?.id === chapter.id ? "text-indigo-700 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300")}>
                                        {chapter.title}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={(e) => handleDeleteChapter(chapter.id, e)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                    <ChevronRight className={cn("w-4 h-4", activeChapter?.id === chapter.id ? "text-indigo-500" : "text-slate-300")} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Materials Column */}
                <div className={cn(
                    "bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-opacity duration-300",
                    !activeChapter && "opacity-50 pointer-events-none"
                )}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold">3. Notes & PDFs</h2>
                        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">{materials.length}</span>
                    </div>

                    <form onSubmit={handleAddMaterial} className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="space-y-1">
                            <Label className="text-xs text-slate-500">Material Title</Label>
                            <Input 
                                placeholder="e.g. Chapter 1 Summary" 
                                value={newMaterialTitle}
                                onChange={(e) => setNewMaterialTitle(e.target.value)}
                                className="bg-white dark:bg-slate-900 border-slate-200"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label className="text-xs text-slate-500">PDF URL</Label>
                            <Input 
                                type="url" 
                                placeholder="https://example.com/file.pdf"
                                value={newMaterialUrl}
                                onChange={(e) => setNewMaterialUrl(e.target.value)}
                                className="bg-white dark:bg-slate-900 border-slate-200"
                            />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="space-y-0.5">
                                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Free Access</Label>
                                <p className="text-[10px] text-slate-500">Allow Explorer plan to view</p>
                            </div>
                            <Switch checked={newMaterialIsFree} onCheckedChange={setNewMaterialIsFree} />
                        </div>

                        <Button type="submit" disabled={isSaving || !newMaterialTitle || !newMaterialUrl || !activeChapter} className="w-full bg-indigo-600 hover:bg-indigo-700">
                            {isSaving ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                            ) : (
                                <><Plus className="w-4 h-4 mr-2" /> Add Material</>
                            )}
                        </Button>
                    </form>

                    <div className="space-y-3">
                        {isLoading && activeChapter && materials.length === 0 ? (
                            <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-slate-400" /></div>
                        ) : materials.map(material => (
                            <div key={material.id} className="group p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            material.is_free ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                                        )}>
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate" title={material.title}>{material.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <a href={material.pdf_url} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-wider text-indigo-500 hover:text-indigo-600 flex items-center gap-1">
                                                    View PDF
                                                </a>
                                                <span className="text-slate-300 dark:text-slate-700">•</span>
                                                <span className={cn(
                                                    "text-[10px] font-black uppercase tracking-wider",
                                                    material.is_free ? "text-emerald-500" : "text-amber-500"
                                                )}>
                                                    {material.is_free ? 'Free' : 'Global Plan'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <Button variant="ghost" size="icon" className="w-7 h-7 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={() => handleDeleteMaterial(material.id)}>
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Label className="text-[9px] uppercase tracking-wider text-slate-400">Free?</Label>
                                            <Switch 
                                                checked={material.is_free} 
                                                onCheckedChange={() => toggleMaterialFree(material.id, material.is_free)} 
                                                className="scale-[0.6] origin-right" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
