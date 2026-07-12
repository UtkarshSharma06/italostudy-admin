import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import {
    Plus, Trash2, Calendar, Loader2, Pencil, Layers, FileDown,
    PencilLine, Activity, Image as ImageIcon
} from 'lucide-react';
import { generateMockTestPDF } from '@/utils/pdfExport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaEditor from '@/components/admin/MediaEditor';
import { MediaContent } from '@/types/test';
import { JsonImportGuide } from '@/components/admin/JsonImportGuide';
import { MathText } from '@/components/MathText';
import { cn } from '@/lib/utils';

interface MockSession {
    id: string; title: string; description: string; start_time: string; end_time: string;
    exam_type: string; duration: number; max_attempts: number; is_official: boolean;
    access_type: 'open' | 'request_required'; is_active: boolean; registration_count: number;
    attempts_per_person: number; difficulty: 'easy' | 'medium' | 'hard';
    is_explorer_allowed?: boolean; is_sections_locked?: boolean;
    section_timing_mode?: 'section' | 'total'; config?: any;
    reading_test_id?: string | null; listening_test_id?: string | null;
    writing_task1_id?: string | null; writing_task2_id?: string | null;
}

interface SessionFormData {
    title: string; description: string; start_time: string; end_time: string;
    exam_type: string; duration: number; max_attempts: number; is_official: boolean;
    access_type: 'open' | 'request_required'; is_active: boolean;
    difficulty: 'easy' | 'medium' | 'hard'; is_explorer_allowed: boolean;
    is_sections_locked: boolean; section_timing_mode: 'section' | 'total';
    reading_test_id?: string; listening_test_id?: string;
    writing_task1_id?: string; writing_task2_id?: string; pdf_url?: string;
}

interface Question {
    question_text: string; options: string[]; correct_index: number;
    explanation?: string; section_name: string; topic?: string;
    passage?: string; media?: MediaContent | null;
}

const defaultForm: SessionFormData = {
    title: '', description: '', start_time: '', end_time: '',
    exam_type: 'cent-s-prep', duration: 100, max_attempts: 1,
    is_official: false, access_type: 'open', is_active: true,
    is_explorer_allowed: false, is_sections_locked: true,
    section_timing_mode: 'section', reading_test_id: '',
    listening_test_id: '', writing_task1_id: '', writing_task2_id: '',
    difficulty: 'medium', pdf_url: ''
};

export default function MockSessionManager({ permissions, isSuperAdmin }: { permissions?: any; isSuperAdmin?: boolean }) {
    const { toast } = useToast();
    const [sessions, setSessions] = useState<MockSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sessionSubTab, setSessionSubTab] = useState('create');
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [formData, setFormData] = useState<SessionFormData>(defaultForm);
    const [readingTests, setReadingTests] = useState<any[]>([]);
    const [listeningTests, setListeningTests] = useState<any[]>([]);
    const [writingTasks, setWritingTasks] = useState<any[]>([]);
    const [availableExams, setAvailableExams] = useState<any[]>([]);
    const [pdfProgressMessage, setPdfProgressMessage] = useState('');
    const [selectedSession, setSelectedSession] = useState<MockSession | null>(null);
    const [manualQuestions, setManualQuestions] = useState<Question[]>([]);
    const [importMode, setImportMode] = useState<'form' | 'json'>('form');
    const [jsonInput, setJsonInput] = useState('');
    const [isSequencingMode, setIsSequencingMode] = useState(false);
    const [sequencingIndices, setSequencingIndices] = useState<number[]>([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        question_text: '', options: ['', '', '', '', ''], correct_index: 0,
        section_name: '', topic: '', passage: '', explanation: '', media: null
    });
    const ap = permissions || { can_edit: true, can_delete: true };

    useEffect(() => {
        fetchSessions(); fetchTestData(); fetchAvailableExams();
        const ch = supabase.channel('msm_sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'mock_sessions' }, fetchSessions)
            .subscribe();
        return () => { supabase.removeChannel(ch); };
    }, []);

    useEffect(() => {
        try { const s = localStorage.getItem('admin_selected_session'); if (s) setSelectedSession(JSON.parse(s)); } catch {}
        try { const q = localStorage.getItem('admin_manual_questions'); if (q) { const p = JSON.parse(q); if (Array.isArray(p) && p.length > 0) setManualQuestions(p); } } catch {}
    }, []);

    useEffect(() => {
        if (manualQuestions.length > 0) localStorage.setItem('admin_manual_questions', JSON.stringify(manualQuestions));
        else localStorage.removeItem('admin_manual_questions');
    }, [manualQuestions]);

    useEffect(() => {
        if (selectedSession) {
            localStorage.setItem('admin_selected_session', JSON.stringify(selectedSession));
            fetchSessionQuestions(selectedSession.id);
        } else {
            localStorage.removeItem('admin_selected_session');
        }
    }, [selectedSession?.id]);

    const fetchSessionQuestions = async (id: string) => {
        const { data } = await supabase.from('session_questions').select('*').eq('session_id', id).order('order_index', { ascending: true });
        if (data) setManualQuestions(data.map((q: any) => ({ question_text: q.question_text, options: q.options, correct_index: q.correct_index, section_name: q.section_name, explanation: q.explanation, topic: q.topic || '', passage: q.passage || '', media: q.media })));
    };

    const fetchTestData = async () => {
        const [r, l, w] = await Promise.all([
            supabase.from('reading_tests').select('id, title'),
            supabase.from('listening_tests').select('id, title'),
            supabase.from('writing_tasks').select('id, title, task_type')
        ]);
        setReadingTests(r.data || []); setListeningTests(l.data || []); setWritingTasks(w.data || []);
    };

    const fetchAvailableExams = async () => {
        const { data } = await supabase.from('exams').select('id, slug, name, sections, syllabus').order('name');
        setAvailableExams(data || []);
    };

    const fetchSessions = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('mock_sessions').select('*').order('start_time', { ascending: false });
        if (error) { toast({ variant: 'destructive', title: 'Error loading sessions' }); setIsLoading(false); return; }
        if (data && data.length > 0) {
            const { data: regs } = await supabase.from('session_registrations').select('session_id, user_id').in('session_id', data.map(s => s.id));
            const counts: Record<string, Set<string>> = {};
            regs?.forEach(r => { if (!counts[r.session_id]) counts[r.session_id] = new Set(); counts[r.session_id].add(r.user_id); });
            setSessions(data.map(s => {
                const c = (s.config || {}) as any;
                return { ...s, registration_count: counts[s.id]?.size || 0, reading_test_id: c.reading_test_id || null, listening_test_id: c.listening_test_id || null, writing_task1_id: c.writing_task1_id || null, writing_task2_id: c.writing_task2_id || null } as MockSession;
            }));
        } else setSessions([]);
        setIsLoading(false);
    };

    const handleResetForm = () => { setEditingSessionId(null); setFormData(defaultForm); };

    const handleEditClick = (s: MockSession) => {
        setEditingSessionId(s.id);
        setFormData({ title: s.title, description: s.description, start_time: s.start_time, end_time: s.end_time, exam_type: s.exam_type, duration: s.duration, max_attempts: s.max_attempts, is_official: s.is_official, access_type: s.access_type, is_active: s.is_active, difficulty: s.difficulty, is_explorer_allowed: s.is_explorer_allowed || false, is_sections_locked: s.is_sections_locked || false, section_timing_mode: s.section_timing_mode || 'section', reading_test_id: s.reading_test_id || '', listening_test_id: s.listening_test_id || '', writing_task1_id: s.writing_task1_id || '', writing_task2_id: s.writing_task2_id || '' });
        setSessionSubTab('create');
    };

    const handleSaveSession = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ap.can_edit) { toast({ variant: 'destructive', title: 'Access Denied' }); return; }
        setIsSubmitting(true);
        const config: any = {};
        if (formData.reading_test_id) config.reading_test_id = formData.reading_test_id;
        if (formData.listening_test_id) config.listening_test_id = formData.listening_test_id;
        if (formData.writing_task1_id) config.writing_task1_id = formData.writing_task1_id;
        if (formData.writing_task2_id) config.writing_task2_id = formData.writing_task2_id;
        if (formData.pdf_url) config.pdf_url = formData.pdf_url;
        const payload = { title: formData.title, description: formData.description, start_time: formData.start_time || new Date().toISOString(), end_time: formData.end_time || new Date(Date.now() + 3600000).toISOString(), exam_type: formData.exam_type, duration: formData.duration, max_attempts: formData.max_attempts, is_official: formData.is_official, access_type: formData.access_type, is_active: formData.is_active, difficulty: formData.difficulty, is_explorer_allowed: formData.is_explorer_allowed, is_sections_locked: formData.is_sections_locked, section_timing_mode: formData.section_timing_mode, config };
        const { error } = editingSessionId
            ? await supabase.from('mock_sessions').update(payload).eq('id', editingSessionId)
            : await supabase.from('mock_sessions').insert([payload]);
        if (error) toast({ variant: 'destructive', title: 'Error', description: error.message });
        else { toast({ title: 'Success' }); handleResetForm(); fetchSessions(); setSessionSubTab('groups'); }
        setIsSubmitting(false);
    };

    const handleDeleteSession = async (id: string) => {
        if (!ap.can_delete || !confirm('Delete this session and all questions?')) return;
        await supabase.from('session_questions').delete().eq('session_id', id);
        const { error } = await supabase.from('mock_sessions').delete().eq('id', id);
        if (error) toast({ variant: 'destructive', title: 'Error', description: error.message });
        else { toast({ title: 'Deleted' }); fetchSessions(); }
    };

    const handleAddQuestion = () => {
        if (!currentQuestion.question_text.trim()) { toast({ variant: 'destructive', title: 'Enter question text' }); return; }
        if (editingQuestionIndex !== null) {
            setManualQuestions(prev => { const n = [...prev]; n[editingQuestionIndex] = currentQuestion; return n; });
            setEditingQuestionIndex(null);
        } else setManualQuestions(prev => [...prev, currentQuestion]);
        setCurrentQuestion({ question_text: '', options: ['', '', '', '', ''], correct_index: 0, section_name: '', topic: '', passage: '', explanation: '', media: null });
    };

    const handleJsonImport = () => {
        try {
            const p = JSON.parse(jsonInput);
            if (!Array.isArray(p)) throw new Error();
            setManualQuestions(prev => [...prev, ...p]);
            setJsonInput('');
            toast({ title: 'Imported', description: p.length + ' questions added.' });
        } catch { toast({ variant: 'destructive', title: 'Invalid JSON' }); }
    };

    const handleSaveQuestions = async () => {
        if (!selectedSession) return;
        setIsSubmitting(true);
        await supabase.from('session_questions').delete().eq('session_id', selectedSession.id);
        const rows = manualQuestions.map((q, idx) => ({ session_id: selectedSession.id, question_text: q.question_text, options: q.options, correct_index: q.correct_index, explanation: q.explanation || '', passage: q.passage || '', media: (q.media as any) || null, section_name: q.section_name || 'General', order_index: idx + 1 }));
        const { error } = await supabase.from('session_questions').insert(rows);
        if (error) toast({ variant: 'destructive', title: 'Error', description: error.message });
        else {
            toast({ title: 'Saved' });
            localStorage.removeItem('admin_manual_questions');
            localStorage.removeItem('admin_selected_session');
            setSelectedSession(null);
            setManualQuestions([]);
        }
        setIsSubmitting(false);
    };

    const handleDownloadPDF = async (session: MockSession, qs?: Question[]) => {
        setPdfProgressMessage('Starting...');
        try {
            let toExport = qs;
            if (!toExport) {
                const { data, error } = await supabase.from('session_questions').select('*').eq('session_id', session.id).order('order_index', { ascending: true });
                if (error) throw error;
                toExport = data as any;
            }
            if (!toExport?.length) { toast({ title: 'No questions', variant: 'destructive' }); return; }
            await generateMockTestPDF(session.title, toExport as any, '/logo.webp', session.id, msg => setPdfProgressMessage(msg));
        } catch (e: any) { toast({ variant: 'destructive', title: 'Error', description: e.message }); }
        finally { setPdfProgressMessage(''); }
    };

    const grouped = sessions.reduce((acc, s) => { const t = s.exam_type || 'Other'; if (!acc[t]) acc[t] = []; acc[t].push(s); return acc; }, {} as Record<string, MockSession[]>);
    const examTypes = Object.keys(grouped).sort();

    return (
        <div className="w-full">
            <Tabs value={sessionSubTab} onValueChange={setSessionSubTab} className="space-y-6">
                <TabsList className="bg-white/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <TabsTrigger value="create" className="rounded-xl px-8 py-2.5 text-[10px] uppercase tracking-widest font-black data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300">
                        {editingSessionId ? 'Edit Session' : 'Create Mock'}
                    </TabsTrigger>
                    <TabsTrigger value="groups" className="rounded-xl px-8 py-2.5 text-[10px] uppercase tracking-widest font-black data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300">
                        Mock Groups
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="mt-0 focus-visible:outline-none">
                    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h2 className="text-xl font-bold mb-8">{editingSessionId ? 'Edit Session' : 'Deploy New Mock Session'}</h2>
                        <form onSubmit={handleSaveSession} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session Title</Label>
                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="h-12 rounded-xl" placeholder="e.g. IMAT 2024 Simulation" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exam Model</Label>
                                    <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none" value={formData.exam_type} onChange={e => setFormData({ ...formData, exam_type: e.target.value })}>
                                        {availableExams.map(ex => <option key={ex.id} value={ex.slug}>{ex.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                                <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="rounded-xl min-h-[80px]" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">PDF Download URL (Premium)</Label>
                                <Input value={formData.pdf_url || ''} onChange={e => setFormData({ ...formData, pdf_url: e.target.value })} className="h-12 rounded-xl" placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DateTimePicker label="Start Time" value={formData.start_time} onChange={v => setFormData({ ...formData, start_time: v })} required />
                                <DateTimePicker label="End Time" value={formData.end_time} onChange={v => setFormData({ ...formData, end_time: v })} required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Access Type</Label>
                                    <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm" value={formData.access_type} onChange={e => setFormData({ ...formData, access_type: e.target.value as any })}>
                                        <option value="open">Open</option><option value="request_required">Invite Only</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Difficulty</Label>
                                    <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 text-sm" value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value as any })}>
                                        <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Max Attempts</Label>
                                    <Input type="number" value={formData.max_attempts} onChange={e => setFormData({ ...formData, max_attempts: parseInt(e.target.value) || 1 })} className="h-12 rounded-xl" />
                                </div>
                            </div>
                            {formData.exam_type?.includes('ielts') && (
                                <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 space-y-4">
                                    <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Link IELTS Material</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Reading</Label>
                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs mt-1" value={formData.reading_test_id} onChange={e => setFormData({ ...formData, reading_test_id: e.target.value })}>
                                                <option value="">None</option>{readingTests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Listening</Label>
                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs mt-1" value={formData.listening_test_id} onChange={e => setFormData({ ...formData, listening_test_id: e.target.value })}>
                                                <option value="">None</option>{listeningTests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Task 1</Label>
                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs mt-1" value={formData.writing_task1_id} onChange={e => setFormData({ ...formData, writing_task1_id: e.target.value })}>
                                                <option value="">None</option>{writingTasks.filter(t => t.task_type === 'task1').map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Task 2</Label>
                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs mt-1" value={formData.writing_task2_id} onChange={e => setFormData({ ...formData, writing_task2_id: e.target.value })}>
                                                <option value="">None</option>{writingTasks.filter(t => t.task_type === 'task2').map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-2xl border border-purple-100/50">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-purple-900 tracking-wider">Explorer Access</p>
                                        <p className="text-[8px] font-bold text-purple-600/70 uppercase">Allow free users</p>
                                    </div>
                                    <Switch checked={formData.is_explorer_allowed} onCheckedChange={v => setFormData({ ...formData, is_explorer_allowed: v })} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-indigo-900 tracking-wider">Lock Sections</p>
                                        <p className="text-[8px] font-bold text-indigo-600/70 uppercase">Prevent back navigation</p>
                                    </div>
                                    <Switch checked={formData.is_sections_locked} onCheckedChange={v => setFormData({ ...formData, is_sections_locked: v })} />
                                </div>
                            </div>
                            <div className="p-5 bg-slate-50/50 rounded-3xl border border-slate-100">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Timing Mode</Label>
                                <div className="flex gap-3 mt-4">
                                    <Button type="button" variant={formData.section_timing_mode === 'section' ? 'default' : 'outline'} className="flex-1 h-11 text-[10px] uppercase font-black rounded-xl" onClick={() => setFormData({ ...formData, section_timing_mode: 'section' })}>Sectional</Button>
                                    <Button type="button" variant={formData.section_timing_mode === 'total' ? 'default' : 'outline'} className="flex-1 h-11 text-[10px] uppercase font-black rounded-xl" onClick={() => setFormData({ ...formData, section_timing_mode: 'total' })}>Total Time</Button>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={handleResetForm}>Reset</Button>
                                <Button type="submit" className="flex-[2] h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : editingSessionId ? 'Update Session' : 'Deploy Mock'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </TabsContent>

                <TabsContent value="groups" className="mt-0 focus-visible:outline-none">
                    {isLoading ? (
                        <div className="flex h-40 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
                    ) : examTypes.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200">
                            <Calendar className="w-12 h-12 text-slate-300 mb-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No sessions yet</p>
                            <Button variant="ghost" className="mt-4 text-indigo-500 font-bold" onClick={() => setSessionSubTab('create')}>Create First Mock</Button>
                        </div>
                    ) : (
                        <Tabs defaultValue={examTypes[0]} className="space-y-6">
                            <div className="overflow-x-auto pb-2">
                                <TabsList className="inline-flex h-auto p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-[1.25rem] border border-slate-200/50">
                                    {examTypes.map(type => (
                                        <TabsTrigger key={type} value={type} className="rounded-xl px-6 py-3 text-[10px] uppercase tracking-widest font-black data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm whitespace-nowrap">
                                            {availableExams.find(e => e.slug === type)?.name || type.toUpperCase()}
                                            <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-500 rounded-md text-[9px]">{grouped[type].length}</span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                            {examTypes.map(type => (
                                <TabsContent key={type} value={type} className="mt-0 focus-visible:outline-none">
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                        {grouped[type].map(s => (
                                            <div key={s.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                                <div className="flex justify-between items-start gap-6">
                                                    <div className="space-y-3 flex-1">
                                                        <div className="flex gap-2">
                                                            <span className={cn("text-[9px] font-black uppercase px-3 py-1 rounded-lg", s.access_type === 'open' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>{s.access_type === 'open' ? 'Open' : 'Invite Only'}</span>
                                                            <span className="text-[9px] font-black uppercase px-3 py-1 bg-slate-50 text-slate-500 rounded-lg">{s.difficulty}</span>
                                                        </div>
                                                        <h3 className="font-bold text-xl text-slate-900 dark:text-white">{s.title}</h3>
                                                        <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>
                                                        <div className="flex gap-6">
                                                            <div className="flex items-center gap-2 text-slate-400"><Calendar className="w-4 h-4" /><span className="text-[10px] font-bold">{new Date(s.start_time).toLocaleDateString()}</span></div>
                                                            <div className="flex items-center gap-2 text-slate-400"><Activity className="w-4 h-4" /><span className="text-[10px] font-bold">{s.registration_count || 0} Registered</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 shrink-0">
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="icon" className="w-11 h-11 rounded-2xl" onClick={() => handleEditClick(s)}><Pencil className="w-5 h-5" /></Button>
                                                            <Button variant="outline" size="icon" className="w-11 h-11 rounded-2xl" onClick={() => setSelectedSession(s)}><Layers className="w-5 h-5" /></Button>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="icon" className="w-11 h-11 rounded-2xl" onClick={() => handleDownloadPDF(s)}><FileDown className="w-5 h-5" /></Button>
                                                            <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl text-rose-400 hover:bg-rose-50" onClick={() => handleDeleteSession(s.id)}><Trash2 className="w-5 h-5" /></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    )}
                </TabsContent>
            </Tabs>

            {pdfProgressMessage && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
                    <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full mx-4">
                        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
                        <h3 className="text-xl font-black mb-2">Generating PDF</h3>
                        <p className="text-sm text-slate-500 animate-pulse">{pdfProgressMessage}</p>
                    </div>
                </div>
            )}

            {selectedSession && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
                    <div className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{selectedSession.title}</h2>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedSession(null)}>✕</Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            <div className="flex gap-4 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                                <Button variant={importMode === 'form' ? 'default' : 'ghost'} onClick={() => setImportMode('form')} className="flex-1 rounded-xl font-bold">Manual Entry</Button>
                                <Button variant={importMode === 'json' ? 'default' : 'ghost'} onClick={() => setImportMode('json')} className="flex-1 rounded-xl font-bold">Bulk JSON</Button>
                            </div>
                            {importMode === 'form' ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Passage (Optional)</Label>
                                        <Textarea placeholder="Reading passage..." value={currentQuestion.passage} onChange={e => setCurrentQuestion(p => ({ ...p, passage: e.target.value }))} className="h-28 text-xs" />
                                        {currentQuestion.passage && <div className="p-4 bg-slate-50 rounded-xl border border-slate-100"><MathText content={currentQuestion.passage} className="text-sm" /></div>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Section *</Label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={currentQuestion.section_name} onChange={e => setCurrentQuestion(p => ({ ...p, section_name: e.target.value }))}>
                                            <option value="">Select...</option>
                                            {availableExams.find(e => e.slug === selectedSession?.exam_type)?.sections?.map((s: any) => <option key={s.name} value={s.name}>{s.name}</option>)}
                                            <option value="General">General</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Question Text</Label>
                                        <Input value={currentQuestion.question_text} onChange={e => setCurrentQuestion(p => ({ ...p, question_text: e.target.value }))} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {currentQuestion.options.map((o, i) => (
                                            <div key={i} className="flex gap-2">
                                                <Button variant={currentQuestion.correct_index === i ? 'default' : 'outline'} className="w-10 h-10 shrink-0 font-bold" onClick={() => setCurrentQuestion(p => ({ ...p, correct_index: i }))}>{String.fromCharCode(65 + i)}</Button>
                                                <Input value={o} onChange={e => setCurrentQuestion(p => { const n = [...p.options]; n[i] = e.target.value; return { ...p, options: n }; })} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400">Explanation (Optional)</Label>
                                        <Textarea value={currentQuestion.explanation} onChange={e => setCurrentQuestion(p => ({ ...p, explanation: e.target.value }))} className="h-20 text-xs" />
                                    </div>
                                    <MediaEditor media={currentQuestion.media || null} onChange={m => setCurrentQuestion(p => ({ ...p, media: m }))} />
                                    <Button onClick={handleAddQuestion} className="w-full bg-slate-900 text-white h-12 rounded-xl">
                                        {editingQuestionIndex !== null ? 'Update Question' : 'Add to Buffer'}
                                    </Button>
                                    {editingQuestionIndex !== null && (
                                        <Button variant="ghost" className="w-full" onClick={() => { setEditingQuestionIndex(null); setCurrentQuestion({ question_text: '', options: ['', '', '', '', ''], correct_index: 0, section_name: '', topic: '', passage: '', explanation: '', media: null }); }}>Cancel Edit</Button>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <JsonImportGuide />
                                    <Textarea className="h-48 font-mono text-xs" value={jsonInput} onChange={e => setJsonInput(e.target.value)} placeholder='[{"question_text": "...", "section_name": "...", "options": ["A", "B"], "correct_index": 0}]' />
                                    <Button onClick={handleJsonImport} className="w-full bg-slate-100 text-slate-900 h-10 rounded-xl font-bold text-xs uppercase">Parse & Add to Queue</Button>
                                </div>
                            )}
                            <div className="pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold">Question Queue ({manualQuestions.length})</h3>
                                    <div className="flex gap-2">
                                        {manualQuestions.length > 0 && !isSequencingMode && (
                                            <>
                                                <Button onClick={() => handleDownloadPDF(selectedSession, manualQuestions as any)} variant="outline" size="sm" className="rounded-xl text-[10px] font-black uppercase px-4 h-9"><FileDown className="w-3 h-3 mr-2" />PDF</Button>
                                                <Button onClick={() => { setIsSequencingMode(true); setSequencingIndices([]); }} variant="outline" size="sm" className="rounded-xl text-[10px] font-black uppercase px-4 h-9">Reorder</Button>
                                            </>
                                        )}
                                        {isSequencingMode && (
                                            <>
                                                <Button onClick={() => setSequencingIndices([])} variant="ghost" size="sm">Reset</Button>
                                                <Button onClick={() => { setIsSequencingMode(false); setSequencingIndices([]); }} variant="ghost" size="sm" className="text-rose-500">Cancel</Button>
                                                <Button disabled={sequencingIndices.length === 0} onClick={() => {
                                                    const r: Question[] = [];
                                                    const u = new Set(sequencingIndices);
                                                    sequencingIndices.forEach(i => r.push(manualQuestions[i]));
                                                    manualQuestions.forEach((q, i) => { if (!u.has(i)) r.push(q); });
                                                    setManualQuestions(r); setIsSequencingMode(false); setSequencingIndices([]);
                                                }} variant="default" size="sm" className="bg-blue-600 text-white rounded-xl text-[10px] uppercase px-4 h-9">Apply</Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {manualQuestions.map((q, i) => {
                                        const si = sequencingIndices.indexOf(i);
                                        const isSeq = si !== -1;
                                        return (
                                            <div key={i} onClick={() => { if (isSequencingMode && !isSeq) setSequencingIndices(prev => [...prev, i]); }}
                                                className={cn("p-3 rounded-xl flex justify-between items-center text-xs font-bold border transition-all", isSequencingMode ? "cursor-pointer border-blue-100 hover:bg-blue-50/50" : "bg-slate-50 border-slate-100", isSeq && "bg-blue-50 border-blue-300")}>
                                                <span className="truncate max-w-[70%]">
                                                    {!isSequencingMode && <span className="mr-2 text-slate-400">{i + 1}.</span>}
                                                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded mr-2">{q.section_name || 'General'}</span>
                                                    {q.media?.type === 'image' && <ImageIcon className="inline w-3 h-3 text-indigo-400 mr-1" />}
                                                    {q.question_text}
                                                </span>
                                                {!isSequencingMode && (
                                                    <div className="flex gap-1 shrink-0">
                                                        <Button variant="ghost" className="h-8 w-8 text-indigo-500" onClick={e => { e.stopPropagation(); setEditingQuestionIndex(i); setCurrentQuestion(manualQuestions[i]); }}><PencilLine className="w-4 h-4" /></Button>
                                                        <Button variant="ghost" className="h-8 w-8 text-rose-500" onClick={e => { e.stopPropagation(); setManualQuestions(prev => prev.filter((_, idx) => idx !== i)); }}><Trash2 className="w-4 h-4" /></Button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-6">
                                    <Button onClick={handleSaveQuestions} disabled={isSubmitting} className="w-full bg-emerald-600 text-white h-14 rounded-2xl shadow-lg">
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Finalize & Sync to Server'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
