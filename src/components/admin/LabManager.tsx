import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    Plus,
    Trash2,
    Database,
    Loader2,
    FlaskConical,
    Edit,
    Box
} from 'lucide-react';
import { EXAMS } from '@/config/exams';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, VisuallyHidden } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';

export default function LabManager() {
    const { toast } = useToast();
    const [selectedExamId, setSelectedExamId] = useState<string>(Object.keys(EXAMS)[0]);
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [models, setModels] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [currentModel, setCurrentModel] = useState({
        model_title: '',
        topic_title: '',
        component_id: '',
        embed_code: '',
        description: '',
        concepts: '',
        subject: ''
    });

    const activeExam = EXAMS[selectedExamId as keyof typeof EXAMS];
    const subjects = activeExam?.sections.map(s => s.name) || [];

    useEffect(() => {
        if (subjects.length > 0 && !selectedSubject) {
            setSelectedSubject(subjects[0]);
        }
    }, [selectedExamId, subjects]);

    useEffect(() => {
        fetchModels();
    }, [selectedExamId, selectedSubject]);

    const fetchModels = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await (supabase as any)
                .from('lab_models')
                .select('*')
                .eq('exam_type', selectedExamId)
                .eq('subject', selectedSubject.toLowerCase()); // Match the lowercase format used when saving

            if (error) throw error;
            setModels(data || []);
        } catch (error: any) {
            console.error('Fetch error:', error);
            // Don't toast on initial load if table doesn't exist yet, 
            // the UI will show empty/add button
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveModel = async () => {
        if (!currentModel.model_title.trim() || !currentModel.component_id.trim()) {
            toast({ title: "Incomplete Form", description: "Title and Component ID are required.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        const dataToSave = {
            exam_type: selectedExamId,
            subject: selectedSubject.toLowerCase(),
            topic_title: currentModel.topic_title || 'General',
            model_title: currentModel.model_title,
            component_id: currentModel.component_id,
            embed_code: currentModel.embed_code,
            description: currentModel.description,
            concepts: currentModel.concepts.split(',').map(s => s.trim()).filter(Boolean)
        };

        try {
            if (editingId) {
                const { error } = await (supabase as any)
                    .from('lab_models')
                    .update(dataToSave)
                    .eq('id', editingId);
                if (error) throw error;
                toast({ title: "Updated", description: "Model mapping updated successfully." });
            } else {
                const { error } = await (supabase as any)
                    .from('lab_models')
                    .insert([dataToSave]);
                if (error) throw error;
                toast({ title: "Created", description: "New 3D model mapping added." });
            }
            closeModal();
            fetchModels();
        } catch (error: any) {
            toast({
                title: "Save Failed",
                description: error.message.includes('relation "lab_models" does not exist')
                    ? "Database table 'lab_models' missing. Please create it in Supabase."
                    : error.message,
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteModel = async (id: string) => {
        if (!confirm("Remove this 3D model mapping?")) return;

        try {
            const { error } = await (supabase as any)
                .from('lab_models')
                .delete()
                .eq('id', id);
            if (error) throw error;
            setModels(models.filter(m => m.id !== id));
            toast({ title: "Deleted", description: "Model mapping removed." });
        } catch (error: any) {
            toast({ title: "Delete Failed", description: error.message, variant: "destructive" });
        }
    };

    const handleEditStart = (m: any) => {
        setCurrentModel({
            model_title: m.model_title,
            topic_title: m.topic_title || '',
            component_id: m.component_id,
            embed_code: m.embed_code || '',
            description: m.description || '',
            concepts: (m.concepts || []).join(', '),
            subject: m.subject // DB stores lowercase now, but select expects Capitalized from EXAMS
        });
        // We might need to map DB lowercase back to Title Case if we want the select to work perfectly, 
        // but since we only use selectedSubject state for the dropdown, this is fine for editing *context*.
        setEditingId(m.id);
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setCurrentModel({
            model_title: '',
            topic_title: '',
            component_id: '',
            embed_code: '',
            description: '',
            concepts: '',
            subject: ''
        });
        setEditingId(null);
        setIsAddModalOpen(false);
    };

    const availableComponents = [
        'DNAHelix', 'CellStructure', 'BohrAtom', 'ForceVisualizer',
        'TrigCircle', 'SkeletalSystem', 'NervousSystem', 'MuscularSystem'
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-end justify-between bg-white/50 p-6 rounded-3xl border border-slate-100 dark:border-border">
                <div className="flex flex-wrap gap-6 items-end">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Exam Type</Label>
                        <select
                            value={selectedExamId}
                            onChange={(e) => setSelectedExamId(e.target.value)}
                            className="h-12 w-48 rounded-xl border-slate-200 dark:border-border bg-white dark:bg-card text-xs font-bold px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                        >
                            {Object.values(EXAMS).map(exam => (
                                <option key={exam.id} value={exam.id}>{exam.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject Sector</Label>
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
                </div>

                <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all">
                            <Plus className="w-4 h-4 mr-2" /> Map 3D Model
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 border-none shadow-2xl">
                        <DialogHeader className="p-0">
                            <VisuallyHidden><DialogTitle>3D Model Mapping</DialogTitle></VisuallyHidden>
                            <div className="p-8 border-b border-slate-100 dark:border-border flex items-center gap-4 bg-slate-50/50">
                                <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                                    <Box className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight uppercase">{editingId ? 'Edit Model Core' : 'Deploy 3D Mapping'}</h2>
                                    <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em]">Assigning to {selectedSubject} in {activeExam?.name}</p>
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Topic Group (e.g. Anatomy, Genetics)</Label>
                                    <Input
                                        placeholder="Enter topic name..."
                                        className="h-12 rounded-xl"
                                        value={currentModel.topic_title}
                                        onChange={(e) => setCurrentModel({ ...currentModel, topic_title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sim Title</Label>
                                    <Input
                                        placeholder="e.g. Skeletal System"
                                        className="h-12 rounded-xl"
                                        value={currentModel.model_title}
                                        onChange={(e) => setCurrentModel({ ...currentModel, model_title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Logic Component ID</Label>
                                    <select
                                        className="w-full h-12 rounded-xl border border-input bg-background px-3 text-xs font-bold"
                                        value={currentModel.component_id}
                                        onChange={(e) => setCurrentModel({ ...currentModel, component_id: e.target.value })}
                                    >
                                        <option value="">Select Target Component</option>
                                        {availableComponents.map(id => (
                                            <option key={id} value={id}>{id}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">External Embed Code (Iframe)</Label>
                                <Textarea
                                    placeholder='<iframe src="..." ...></iframe>'
                                    className="min-h-[80px] rounded-xl font-mono text-[10px]"
                                    value={currentModel.embed_code}
                                    onChange={(e) => setCurrentModel({ ...currentModel, embed_code: e.target.value })}
                                />
                                <p className="text-[9px] text-slate-400 italic">Optional: Paste an iframe from Sketchfab, Google, or other 3D hosts.</p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Educational Concepts (CSV)</Label>
                                <Input
                                    placeholder="e.g. Replication, Base Pairs, Nucleus"
                                    className="h-12 rounded-xl"
                                    value={currentModel.concepts}
                                    onChange={(e) => setCurrentModel({ ...currentModel, concepts: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Analytic Description</Label>
                                <Textarea
                                    placeholder="Detailed overview of the simulation..."
                                    className="min-h-[100px] rounded-2xl resize-none"
                                    value={currentModel.description}
                                    onChange={(e) => setCurrentModel({ ...currentModel, description: e.target.value })}
                                />
                            </div>

                            <Button
                                onClick={handleSaveModel}
                                disabled={isSubmitting}
                                className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : (editingId ? "Update Intelligence" : "Deploy Logic")}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Accessing Secure Archive...</p>
                </div>
            ) : models.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 dark:bg-muted/50 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-border text-slate-400">
                    <FlaskConical className="w-16 h-16 mb-6 opacity-20" />
                    <p className="text-sm font-bold">No 3D Models mapped to this sector.</p>
                    <p className="text-[10px] font-black uppercase tracking-widest mt-2 opacity-50">Manual Deployment Required</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {models.map((m) => (
                        <div key={m.id} className="group bg-white dark:bg-card p-6 rounded-[2.5rem] border border-slate-100 dark:border-border hover:shadow-xl transition-all relative overflow-hidden">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEditStart(m)}
                                    className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteModel(m.id)}
                                    className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 ring-4 ring-white">
                                    <Box className="w-5 h-5" />
                                </div>
                                <h3 className="font-black text-xs uppercase tracking-widest text-slate-800">{m.model_title}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-1.5">
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[8px] font-black uppercase text-slate-400">ID: {m.component_id}</span>
                                    {(m.concepts || []).map((c: string) => (
                                        <span key={c} className="px-2 py-0.5 rounded-full bg-indigo-50 text-[8px] font-black uppercase text-indigo-600">{c}</span>
                                    ))}
                                </div>
                                <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{m.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
