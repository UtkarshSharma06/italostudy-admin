import { useState, useEffect, useCallback } from 'react';
import { supabase as _supabase } from '@/integrations/supabase/client';
// Cast once — new course tables aren't in the generated types yet.
// After running the migration and regenerating types, remove this cast.
const supabase = _supabase as any;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
    Plus, Trash2, Pencil, Loader2, GraduationCap, BookOpen,
    ChevronRight, ChevronDown, Video, FileText, Users, Euro,
    Clock, Eye, EyeOff, ArrowLeft, ToggleLeft, ToggleRight,
    Calendar, CheckCircle, XCircle, Search, RefreshCw, Image as ImageIcon, Settings
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail_url: string;
    banner_url: string;
    exam_model_id: string | null;
    price_eur: number;
    discount_price_eur?: number | null;
    expiry_days: number;
    is_active: boolean;
    is_free: boolean;
    created_at: string;
    regional_prices?: Record<string, number>;
    slug?: string;
    launch_date?: string;
    lecture_type?: string;
    lectures_count?: string;
    features?: string[];
    tests_count?: string;
    badge_text?: string;
    is_recommended?: boolean;
    rating?: number;
    theme_color?: string;
    icon_type?: string;
    pre_register_discount_percent?: number;
    demo_video_url?: string | null;
}
interface CourseSubject { id: string; course_id: string; title: string; position: number; }
interface CourseChapter { id: string; subject_id: string; title: string; position: number; }
interface CourseLecture { id: string; chapter_id: string; title: string; youtube_video_id: string; thumbnail_url?: string; duration_seconds: number | null; position: number; is_preview: boolean; }
interface CoursePdf { id: string; chapter_id: string; title: string; pdf_url: string; position: number; is_preview: boolean; }
interface Enrollment { id: string; user_id: string; course_id: string; amount_paid_eur: number; purchased_at: string; expires_at: string; status: string; profiles?: { email: string; full_name: string; }; }
interface Exam { id: string; name: string; slug: string; }

const EMPTY_COURSE: Omit<Course, 'id' | 'created_at'> = {
    title: '', slug: '', description: '', thumbnail_url: '', banner_url: '',
    exam_model_id: null, price_eur: 0, discount_price_eur: null, expiry_days: 365, is_active: true, is_free: false, regional_prices: {}, launch_date: '', lecture_type: 'Recorded', lectures_count: '', features: [], tests_count: '', badge_text: '', is_recommended: false, rating: 0.0, theme_color: '', icon_type: '', pre_register_discount_percent: 0, demo_video_url: ''
};

export default function CourseManager() {
    const { toast } = useToast();
    const [activeSubTab, setActiveSubTab] = useState('courses');

    // ── Courses ──
    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [courseForm, setCourseForm] = useState(EMPTY_COURSE);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [exams, setExams] = useState<Exam[]>([]);

    // ── Subjects ──
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [subjects, setSubjects] = useState<CourseSubject[]>([]);
    const [loadingSubjects, setLoadingSubjects] = useState(false);
    const [subjectTitle, setSubjectTitle] = useState('');
    const [editingSubject, setEditingSubject] = useState<CourseSubject | null>(null);

    // ── Chapters ──
    const [selectedSubject, setSelectedSubject] = useState<CourseSubject | null>(null);
    const [chapters, setChapters] = useState<CourseChapter[]>([]);
    const [loadingChapters, setLoadingChapters] = useState(false);
    const [chapterTitle, setChapterTitle] = useState('');
    const [editingChapter, setEditingChapter] = useState<CourseChapter | null>(null);

    // ── Lectures ──
    const [selectedChapter, setSelectedChapter] = useState<CourseChapter | null>(null);
    const [lectures, setLectures] = useState<CourseLecture[]>([]);
    const [loadingLectures, setLoadingLectures] = useState(false);
    const [lectureForm, setLectureForm] = useState({ title: '', youtube_video_id: '', thumbnail_url: '', duration_seconds: '', is_preview: false });
    const [editingLecture, setEditingLecture] = useState<CourseLecture | null>(null);

    // ── PDFs ──
    const [pdfs, setPdfs] = useState<CoursePdf[]>([]);
    const [loadingPdfs, setLoadingPdfs] = useState(false);
    const [pdfForm, setPdfForm] = useState({ title: '', pdf_url: '', is_preview: false });
    const [editingPdf, setEditingPdf] = useState<CoursePdf | null>(null);

    // ── Enrollments ──
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);
    const [enrollSearch, setEnrollSearch] = useState('');
    const [manualEnroll, setManualEnroll] = useState({ email: '', course_id: '', days: 365 });

    // ── Courses Ad Banner ──
    const [adBannerForm, setAdBannerForm] = useState({ image_url: '', title: '', subtitle: '', cta_label: '', cta_url: '' });
    const [savingBanner, setSavingBanner] = useState(false);
    const [bannerLoaded, setBannerLoaded] = useState(false);

    // ─── Fetch Exams ─────────────────────────────────────────────────────────
    useEffect(() => {
        supabase.from('exams').select('id,name,slug').order('name').then(({ data }) => setExams(data || []));
        // Load existing ad banner
        supabase.from('system_settings').select('value').eq('key', 'courses_ad_banner').maybeSingle()
            .then(({ data }) => {
                if (data?.value) setAdBannerForm(data.value as any);
                setBannerLoaded(true);
            });
    }, []);

    // ─── Courses CRUD ─────────────────────────────────────────────────────────
    const fetchCourses = useCallback(async () => {
        setLoadingCourses(true);
        const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
        if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
        else setCourses((data as any) || []);
        setLoadingCourses(false);
    }, []);

    useEffect(() => { fetchCourses(); }, [fetchCourses]);

    const handleSaveCourse = async () => {
        if (!courseForm.title.trim()) { toast({ title: 'Title required', variant: 'destructive' }); return; }
        // Clean up regional prices (remove empty/invalid)
        const cleanedRegionalPrices: Record<string, number> = {};
        if (courseForm.regional_prices?.INR) cleanedRegionalPrices.INR = Number(courseForm.regional_prices.INR);
        if (courseForm.regional_prices?.INR_discount) cleanedRegionalPrices.INR_discount = Number(courseForm.regional_prices.INR_discount);
        
        let finalSlug = courseForm.slug?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || null;

        const payload = { ...courseForm, slug: finalSlug, price_eur: Number(courseForm.price_eur), discount_price_eur: courseForm.discount_price_eur ? Number(courseForm.discount_price_eur) : null, expiry_days: Number(courseForm.expiry_days), regional_prices: cleanedRegionalPrices, launch_date: courseForm.launch_date, lecture_type: courseForm.lecture_type, pre_register_discount_percent: Number(courseForm.pre_register_discount_percent || 0), demo_video_url: courseForm.demo_video_url || null };
        const { error } = editingCourse
            ? await supabase.from('courses').update(payload).eq('id', editingCourse.id)
            : await supabase.from('courses').insert([payload]);
        if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
        toast({ title: editingCourse ? 'Course updated' : 'Course created' });
        setShowCourseForm(false); setEditingCourse(null); setCourseForm(EMPTY_COURSE); fetchCourses();
    };

    const handleDeleteCourse = async (id: string) => {
        if (!confirm('Delete this course and ALL its content? This cannot be undone.')) return;
        const { error } = await supabase.from('courses').delete().eq('id', id);
        if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
        else { toast({ title: 'Course deleted' }); fetchCourses(); }
    };

    const handleToggleActive = async (course: Course) => {
        await supabase.from('courses').update({ is_active: !course.is_active }).eq('id', course.id);
        fetchCourses();
    };

    // ─── Subjects CRUD ────────────────────────────────────────────────────────
    const fetchSubjects = useCallback(async (courseId: string) => {
        setLoadingSubjects(true);
        const { data } = await supabase.from('course_subjects').select('*').eq('course_id', courseId).order('position');
        setSubjects((data as any) || []);
        setLoadingSubjects(false);
    }, []);

    const handleSaveSubject = async () => {
        if (!selectedCourse || !subjectTitle.trim()) return;
        const maxPos = subjects.reduce((m, s) => Math.max(m, s.position), 0);
        const { error } = editingSubject
            ? await supabase.from('course_subjects').update({ title: subjectTitle, position: editingSubject.position }).eq('id', editingSubject.id)
            : await supabase.from('course_subjects').insert([{ course_id: selectedCourse.id, title: subjectTitle, position: maxPos + 1 }]);
        if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
        setSubjectTitle(''); setEditingSubject(null); fetchSubjects(selectedCourse.id);
    };

    const handleDeleteSubject = async (id: string) => {
        if (!confirm('Delete subject and all its chapters?')) return;
        await supabase.from('course_subjects').delete().eq('id', id);
        if (selectedCourse) fetchSubjects(selectedCourse.id);
    };

    // ─── Chapters CRUD ────────────────────────────────────────────────────────
    const fetchChapters = useCallback(async (subjectId: string) => {
        setLoadingChapters(true);
        const { data } = await supabase.from('course_chapters').select('*').eq('subject_id', subjectId).order('position');
        setChapters((data as any) || []);
        setLoadingChapters(false);
    }, []);

    const handleSaveChapter = async () => {
        if (!selectedSubject || !chapterTitle.trim()) return;
        const maxPos = chapters.reduce((m, c) => Math.max(m, c.position), 0);
        const { error } = editingChapter
            ? await supabase.from('course_chapters').update({ title: chapterTitle }).eq('id', editingChapter.id)
            : await supabase.from('course_chapters').insert([{ subject_id: selectedSubject.id, title: chapterTitle, position: maxPos + 1 }]);
        if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
        setChapterTitle(''); setEditingChapter(null); fetchChapters(selectedSubject.id);
    };

    const handleDeleteChapter = async (id: string) => {
        if (!confirm('Delete chapter and all its lectures/PDFs?')) return;
        await supabase.from('course_chapters').delete().eq('id', id);
        if (selectedSubject) fetchChapters(selectedSubject.id);
    };

    // ─── Lectures CRUD ────────────────────────────────────────────────────────
    const fetchLectures = useCallback(async (chapterId: string) => {
        setLoadingLectures(true);
        const { data } = await supabase.from('course_lectures').select('*').eq('chapter_id', chapterId).order('position');
        setLectures((data as any) || []);
        setLoadingLectures(false);
    }, []);

    const fetchPdfs = useCallback(async (chapterId: string) => {
        setLoadingPdfs(true);
        const { data } = await supabase.from('course_pdfs').select('*').eq('chapter_id', chapterId).order('position');
        setPdfs((data as any) || []);
        setLoadingPdfs(false);
    }, []);

    const handleSaveLecture = async () => {
        if (!selectedChapter || !lectureForm.title.trim()) return;
        // Strip full YT URL if user pastes it — extract just the ID
        let ytId = lectureForm.youtube_video_id.trim();
        const ytMatch = ytId.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) ytId = ytMatch[1];

        const maxPos = lectures.reduce((m, l) => Math.max(m, l.position), 0);
        const payload = {
            chapter_id: selectedChapter.id,
            title: lectureForm.title,
            youtube_video_id: ytId,
            thumbnail_url: lectureForm.thumbnail_url.trim() || null,
            duration_seconds: lectureForm.duration_seconds ? Number(lectureForm.duration_seconds) : null,
            is_preview: lectureForm.is_preview,
            position: editingLecture ? editingLecture.position : maxPos + 1,
        };
        const { error } = editingLecture
            ? await supabase.from('course_lectures').update(payload).eq('id', editingLecture.id)
            : await supabase.from('course_lectures').insert([payload]);
        if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
        setLectureForm({ title: '', youtube_video_id: '', thumbnail_url: '', duration_seconds: '', is_preview: false });
        setEditingLecture(null); fetchLectures(selectedChapter.id);
    };

    const handleDeleteLecture = async (id: string) => {
        await supabase.from('course_lectures').delete().eq('id', id);
        if (selectedChapter) fetchLectures(selectedChapter.id);
    };

    const handleSavePdf = async () => {
        if (!selectedChapter || !pdfForm.title.trim() || !pdfForm.pdf_url.trim()) return;
        const maxPos = pdfs.reduce((m, p) => Math.max(m, p.position), 0);
        const payload = { chapter_id: selectedChapter.id, title: pdfForm.title, pdf_url: pdfForm.pdf_url, position: editingPdf ? editingPdf.position : maxPos + 1 };
        const { error } = editingPdf
            ? await supabase.from('course_pdfs').update(payload).eq('id', editingPdf.id)
            : await supabase.from('course_pdfs').insert([payload]);
        if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
        setPdfForm({ title: '', pdf_url: '', is_preview: false }); setEditingPdf(null); fetchPdfs(selectedChapter.id);
    };

    const handleDeletePdf = async (id: string) => {
        await supabase.from('course_pdfs').delete().eq('id', id);
        if (selectedChapter) fetchPdfs(selectedChapter.id);
    };

    // ─── Enrollments ─────────────────────────────────────────────────────────
    const fetchEnrollments = useCallback(async () => {
        setLoadingEnrollments(true);
        const { data: enrollData, error: enrollError } = await supabase
            .from('course_enrollments')
            .select('*')
            .order('purchased_at', { ascending: false })
            .limit(200);
        
        if (enrollError) {
            console.error("Fetch Enrollments Error:", enrollError);
            toast({ title: 'Error fetching enrollments', description: enrollError.message, variant: 'destructive' });
            setLoadingEnrollments(false);
            return;
        }
        
        const enrollments = enrollData || [];

        if (enrollments.length > 0) {
            const userIds = [...new Set(enrollments.map((e: any) => e.user_id))];
            const { data: profilesData } = await supabase
                .from('profiles')
                .select('id, email, display_name')
                .in('id', userIds);
            
            const profileMap = new Map();
            if (profilesData) {
                profilesData.forEach((p: any) => profileMap.set(p.id, {
                    email: p.email,
                    full_name: p.display_name
                }));
            }

            enrollments.forEach((e: any) => {
                e.profiles = profileMap.get(e.user_id) || null;
            });
        }

        setEnrollments(enrollments);
        setLoadingEnrollments(false);
    }, []);

    useEffect(() => {
        if (activeSubTab === 'enrollments') {
            fetchEnrollments();
        }
    }, [activeSubTab, fetchEnrollments]);

    const handleManualEnroll = async () => {
        if (!manualEnroll.email || !manualEnroll.course_id) {
            toast({ title: 'User Email and Course ID required', variant: 'destructive' }); return;
        }

        const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .ilike('email', manualEnroll.email.trim())
            .maybeSingle();

        if (profileError || !userProfile) {
            toast({ title: 'User not found', description: 'No user found with this email.', variant: 'destructive' });
            return;
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + Number(manualEnroll.days));
        const { error } = await supabase.from('course_enrollments').upsert([{
            user_id: userProfile.id, course_id: manualEnroll.course_id,
            amount_paid_eur: 0, expires_at: expiresAt.toISOString(), status: 'active'
        }], { onConflict: 'user_id,course_id' });
        if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
        toast({ title: 'Enrollment granted!' });
        setManualEnroll({ email: '', course_id: '', days: 365 });
        fetchEnrollments();
    };

    const handleRevokeEnrollment = async (id: string) => {
        if (!confirm('Are you sure you want to completely remove this user from the course?')) return;
        await supabase.from('course_enrollments').delete().eq('id', id);
        fetchEnrollments();
    };

    const filteredEnrollments = enrollments.filter(e =>
        !enrollSearch ||
        (e.profiles as any)?.email?.toLowerCase().includes(enrollSearch.toLowerCase()) ||
        (e.profiles as any)?.full_name?.toLowerCase().includes(enrollSearch.toLowerCase())
    );

    // ─── Format helpers ───────────────────────────────────────────────────────
    const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const isExpired = (d: string) => new Date(d) < new Date();


    // ─── Reusable Course Form Fields ──────────────────────────────────────────
    const CourseFormFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Title *</Label>
                <Input value={courseForm.title} onChange={e => setCourseForm(p => ({ ...p, title: e.target.value, slug: p.slug ? p.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') }))}
                    placeholder="e.g. IMAT 2026 Complete Prep" className="h-10" />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">URL Slug</Label>
                <Input value={courseForm.slug || ''} onChange={e => setCourseForm(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '') }))}
                    placeholder="imat-2026-complete-prep" className="h-10" />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Exam Model</Label>
                <select value={courseForm.exam_model_id || ''} onChange={e => setCourseForm(p => ({ ...p, exam_model_id: e.target.value || null }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none">
                    <option value="">— All Users —</option>
                    {exams.map(ex => <option key={ex.id} value={ex.slug}>{ex.name}</option>)}
                </select>
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lecture Type</Label>
                <select value={courseForm.lecture_type || 'Recorded'} onChange={e => setCourseForm(p => ({ ...p, lecture_type: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none">
                    <option value="Live">Live</option>
                    <option value="Recorded">Recorded</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Launch Date</Label>
                <select
                    value={courseForm.launch_date?.toLowerCase() === 'coming soon' ? 'Coming Soon' : 'Specific Date'}
                    onChange={e => {
                        if (e.target.value === 'Coming Soon') {
                            setCourseForm(p => ({ ...p, launch_date: 'Coming Soon' }));
                        } else {
                            setCourseForm(p => ({ ...p, launch_date: '' }));
                        }
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none mb-2"
                >
                    <option value="Specific Date">Specific Date</option>
                    <option value="Coming Soon">Coming Soon</option>
                </select>
                {courseForm.launch_date?.toLowerCase() !== 'coming soon' && (
                    <Input type="date" value={courseForm.launch_date || ''} onChange={e => setCourseForm(p => ({ ...p, launch_date: e.target.value }))} className="h-10" />
                )}
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lectures Count</Label>
                <Input value={courseForm.lectures_count || ''} onChange={e => setCourseForm(p => ({ ...p, lectures_count: e.target.value }))}
                    placeholder="e.g. 128 Lessons" className="h-10" />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tests Count</Label>
                <Input value={courseForm.tests_count || ''} onChange={e => setCourseForm(p => ({ ...p, tests_count: e.target.value }))}
                    placeholder="e.g. 32 Tests" className="h-10" />
            </div>
            
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Base Price (€)</Label>
                <Input type="number" value={courseForm.price_eur} onChange={e => setCourseForm(p => ({ ...p, price_eur: Number(e.target.value) }))} className="h-10" />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Discount Price (€)</Label>
                <Input type="number" value={courseForm.discount_price_eur || ''} onChange={e => setCourseForm(p => ({ ...p, discount_price_eur: e.target.value ? Number(e.target.value) : null }))} className="h-10" />
            </div>
            
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Base Price (₹ INR)</Label>
                <Input type="number" value={courseForm.regional_prices?.INR || ''} onChange={e => setCourseForm(p => ({ ...p, regional_prices: { ...p.regional_prices, INR: Number(e.target.value) } }))} className="h-10" />
            </div>
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Discount Price (₹ INR)</Label>
                <Input type="number" value={courseForm.regional_prices?.INR_discount || ''} onChange={e => setCourseForm(p => ({ ...p, regional_prices: { ...p.regional_prices, INR_discount: Number(e.target.value) } }))} className="h-10" />
            </div>
            
            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pre-Register Discount (%)</Label>
                <Input type="number" value={courseForm.pre_register_discount_percent || ''} onChange={e => setCourseForm(p => ({ ...p, pre_register_discount_percent: Number(e.target.value) }))} className="h-10" placeholder="e.g. 20" />
            </div>

            <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Validity (Days)</Label>
                <Input type="number" value={courseForm.expiry_days} onChange={e => setCourseForm(p => ({ ...p, expiry_days: Number(e.target.value) }))} className="h-10" />
            </div>
            <div className="space-y-1.5 pt-6">
                <div className="flex items-center gap-3">
                    <Switch checked={courseForm.is_free} onCheckedChange={c => setCourseForm(p => ({ ...p, is_free: c }))} />
                    <Label className="font-bold">Free Course</Label>
                </div>
            </div>

            {/* Visual & Marketing */}
            <div className="space-y-1.5 md:col-span-2 bg-indigo-50/50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 mt-4">
                <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-4">Visual & Marketing Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Badge Text</Label>
                        <Input value={courseForm.badge_text || ''} onChange={e => setCourseForm(p => ({ ...p, badge_text: e.target.value }))}
                            placeholder="e.g. Most Popular" className="h-10 bg-white dark:bg-slate-900" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Star Rating (e.g. 4.8)</Label>
                        <Input type="number" step="0.1" value={courseForm.rating || ''} onChange={e => setCourseForm(p => ({ ...p, rating: Number(e.target.value) }))}
                            placeholder="0.0" className="h-10 bg-white dark:bg-slate-900" />
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Theme Color</Label>
                        <div className="flex gap-2">
                            <Input type="color" value={courseForm.theme_color || '#1e1b4b'} onChange={e => setCourseForm(p => ({ ...p, theme_color: e.target.value }))}
                                className="h-10 w-16 p-1 bg-white dark:bg-slate-900 cursor-pointer" />
                            <Input value={courseForm.theme_color || ''} onChange={e => setCourseForm(p => ({ ...p, theme_color: e.target.value }))}
                                placeholder="#1E1B4B" className="h-10 flex-1 bg-white dark:bg-slate-900 uppercase font-mono text-sm" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">3D Icon Type</Label>
                        <select value={courseForm.icon_type || ''} onChange={e => setCourseForm(p => ({ ...p, icon_type: e.target.value }))}
                            className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none">
                            <option value="">Default (No Icon)</option>
                            <option value="hat">Graduation Hat</option>
                            <option value="atom">Atom / Physics</option>
                            <option value="leaf">Leaf / Biology</option>
                            <option value="flask">Flask / Chemistry</option>
                            <option value="math">Calculator / Math</option>
                        </select>
                    </div>
                    <div className="space-y-1.5 md:col-span-2 pt-2">
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                            <Switch checked={courseForm.is_recommended || false} onCheckedChange={c => setCourseForm(p => ({ ...p, is_recommended: c }))} />
                            <div className="flex flex-col">
                                <Label className="font-bold text-indigo-900 dark:text-indigo-300">Feature in "Recommended For You"</Label>
                                <span className="text-[10px] text-slate-500">Enable this to show the course in the recommended carousel.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</Label>
                <Textarea value={courseForm.description} onChange={e => setCourseForm(p => ({ ...p, description: e.target.value }))} className="min-h-[80px]" />
            </div>
            <div className="space-y-1.5 md:col-span-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Features</Label>
                    <Button size="sm" variant="outline" className="h-7 text-xs font-bold gap-1" onClick={(e) => { e.preventDefault(); setCourseForm(p => ({ ...p, features: [...(p.features || []), ''] })); }}><Plus className="w-3 h-3" /> Add Feature</Button>
                </div>
                <div className="space-y-2">
                    {(courseForm.features || []).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <Input value={feat} onChange={e => {
                                const newFeats = [...(courseForm.features || [])];
                                newFeats[idx] = e.target.value;
                                setCourseForm(p => ({ ...p, features: newFeats }));
                            }} placeholder="e.g. 500+ Hours of Live Classes" className="h-9" />
                            <Button size="icon" variant="ghost" className="h-9 w-9 text-red-500 hover:bg-red-50" onClick={(e) => {
                                e.preventDefault();
                                const newFeats = [...(courseForm.features || [])];
                                newFeats.splice(idx, 1);
                                setCourseForm(p => ({ ...p, features: newFeats }));
                            }}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                    ))}
                    {(!courseForm.features || courseForm.features.length === 0) && (
                        <p className="text-xs text-slate-400 italic">No features added. Click "Add Feature" to create a structured list.</p>
                    )}
                </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thumbnail Image URL</Label>
                <Input value={courseForm.thumbnail_url} onChange={e => setCourseForm(p => ({ ...p, thumbnail_url: e.target.value }))} className="h-10" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banner Image URL</Label>
                <Input value={courseForm.banner_url} onChange={e => setCourseForm(p => ({ ...p, banner_url: e.target.value }))} className="h-10" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Demo Video URL</Label>
                <Input value={courseForm.demo_video_url || ''} onChange={e => setCourseForm(p => ({ ...p, demo_video_url: e.target.value }))} className="h-10" placeholder="e.g. YouTube URL or .mp4 link" />
            </div>
            <Button onClick={handleSaveCourse} className="w-full mt-4 md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12">Save Course</Button>
        </div>
    );

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6 pb-20">
            {selectedCourse ? (
                // ── MASTER-DETAIL COURSE WORKSPACE ──
                <div className="flex flex-col h-[calc(100vh-100px)] bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    {/* Workspace Header */}
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => { setSelectedCourse(null); setSelectedSubject(null); setSelectedChapter(null); }} className="h-10 w-10 rounded-full hover:bg-slate-100">
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </Button>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 dark:text-white">{selectedCourse.title}</h2>
                                <p className="text-xs text-slate-500 font-semibold">Course Workspace</p>
                            </div>
                        </div>
                        <Dialog open={showCourseForm} onOpenChange={setShowCourseForm}>
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={() => { setEditingCourse(selectedCourse); setCourseForm({ ...selectedCourse, regional_prices: selectedCourse.regional_prices || {} } as any); }} className="gap-2 rounded-xl font-bold border-slate-300">
                                    <Settings className="w-4 h-4" /> Settings
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader><DialogTitle>Edit Course Settings</DialogTitle></DialogHeader>
                                <CourseFormFields />
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Split Layout: Subjects | Chapters | Lectures */}
                    <div className="flex flex-1 overflow-hidden">
                        
                        {/* Column 1: Subjects */}
                        <div className="w-[30%] min-w-[250px] max-w-[350px] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                                <span className="font-black text-xs uppercase tracking-widest text-slate-500">Subjects</span>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-slate-200" onClick={() => { setEditingSubject(null); setSubjectTitle(''); }}><Plus className="w-4 h-4" /></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>{editingSubject ? 'Edit Subject' : 'Add Subject'}</DialogTitle></DialogHeader>
                                        <Input placeholder="Subject Name (e.g. Biology)" value={subjectTitle} onChange={e => setSubjectTitle(e.target.value)} />
                                        <Button onClick={handleSaveSubject} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 mt-2">Save Subject</Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                {loadingSubjects ? <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div> : subjects.map(sub => (
                                    <div key={sub.id} className={cn("group flex items-center justify-between p-3.5 rounded-xl cursor-pointer border transition-all", selectedSubject?.id === sub.id ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200")} onClick={() => { setSelectedSubject(sub); setSelectedChapter(null); fetchChapters(sub.id); }}>
                                        <div className={cn("flex-1 font-bold text-sm truncate", selectedSubject?.id === sub.id ? "text-indigo-800" : "text-slate-700")}>{sub.title}</div>
                                        <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={(e) => { e.stopPropagation(); setEditingSubject(sub); setSubjectTitle(sub.title); }}><Pencil className="w-3.5 h-3.5" /></Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader><DialogTitle>Edit Subject</DialogTitle></DialogHeader>
                                                    <Input placeholder="Subject Name" value={subjectTitle} onChange={e => setSubjectTitle(e.target.value)} />
                                                    <Button onClick={handleSaveSubject} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 mt-2">Save Changes</Button>
                                                </DialogContent>
                                            </Dialog>
                                            <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); handleDeleteSubject(sub.id); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Chapters */}
                        <div className="w-[30%] min-w-[250px] max-w-[350px] border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col">
                            {selectedSubject ? (
                                <>
                                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
                                        <div className="truncate mr-2">
                                            <span className="font-black text-xs uppercase tracking-widest text-indigo-500 truncate block">Chapters in</span>
                                            <span className="text-sm font-bold text-slate-800 truncate block">{selectedSubject.title}</span>
                                        </div>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-slate-200 shrink-0" onClick={() => { setEditingChapter(null); setChapterTitle(''); }}><Plus className="w-4 h-4" /></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader><DialogTitle>{editingChapter ? 'Edit Chapter' : 'Add Chapter'}</DialogTitle></DialogHeader>
                                                <Input placeholder="Chapter Name" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} />
                                                <Button onClick={handleSaveChapter} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 mt-2">Save Chapter</Button>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                        {loadingChapters ? <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div> : chapters.map(chap => (
                                            <div key={chap.id} className={cn("group flex items-center justify-between p-3.5 rounded-xl cursor-pointer border transition-all", selectedChapter?.id === chap.id ? "bg-white border-slate-300 shadow-sm" : "bg-transparent border-transparent hover:bg-white hover:border-slate-200")} onClick={() => { setSelectedChapter(chap); fetchLectures(chap.id); fetchPdfs(chap.id); }}>
                                                <div className="flex-1 font-bold text-sm text-slate-700 truncate">{chap.title}</div>
                                                <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={(e) => { e.stopPropagation(); setEditingChapter(chap); setChapterTitle(chap.title); }}><Pencil className="w-3.5 h-3.5" /></Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader><DialogTitle>Edit Chapter</DialogTitle></DialogHeader>
                                                            <Input placeholder="Chapter Name" value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} />
                                                            <Button onClick={handleSaveChapter} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10 mt-2">Save Changes</Button>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); handleDeleteChapter(chap.id); }}><Trash2 className="w-3.5 h-3.5" /></Button>
                                                </div>
                                            </div>
                                        ))}
                                        {chapters.length === 0 && !loadingChapters && <p className="text-sm text-center text-slate-400 mt-10 font-medium">No chapters added yet.</p>}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                    <BookOpen className="w-10 h-10 mb-3 opacity-20" />
                                    <p className="font-bold text-sm">Select a subject</p>
                                    <p className="text-xs mt-1 opacity-70">to manage its chapters.</p>
                                </div>
                            )}
                        </div>

                        {/* Column 3: Lectures & PDFs */}
                        <div className="flex-1 bg-white dark:bg-slate-900 flex flex-col min-w-[350px]">
                            {selectedChapter ? (
                                <>
                                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                                        <div className="truncate mr-4">
                                            <span className="font-black text-xs uppercase tracking-widest text-indigo-500 truncate block">Content for</span>
                                            <span className="text-sm font-bold text-slate-800 truncate block">{selectedChapter.title}</span>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" className="gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold shadow-sm text-white" onClick={() => { setEditingLecture(null); setLectureForm({title:'', youtube_video_id:'', thumbnail_url:'', duration_seconds:'', is_preview: false}); }}><Video className="w-4 h-4" /> Add Video</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader><DialogTitle>{editingLecture ? 'Edit Video' : 'Add Video Lecture'}</DialogTitle></DialogHeader>
                                                    <div className="space-y-4 py-2">
                                                        <div><Label className="text-xs font-bold text-slate-500 uppercase">Lecture Title</Label><Input value={lectureForm.title} onChange={e=>setLectureForm(p=>({...p, title:e.target.value}))} /></div>
                                                        <div><Label className="text-xs font-bold text-slate-500 uppercase">YouTube URL / Video ID</Label><Input value={lectureForm.youtube_video_id} onChange={e=>setLectureForm(p=>({...p, youtube_video_id:e.target.value}))} /></div>
                                                        <div><Label className="text-xs font-bold text-slate-500 uppercase">Duration (Seconds)</Label><Input type="number" placeholder="e.g. 1200 (for 20m)" value={lectureForm.duration_seconds} onChange={e=>setLectureForm(p=>({...p, duration_seconds:e.target.value}))} /></div>
                                                        <div className="flex items-center gap-2 mt-2"><Switch checked={lectureForm.is_preview} onCheckedChange={c=>setLectureForm(p=>({...p, is_preview:c}))} /><Label className="font-bold">Free Preview</Label></div>
                                                    </div>
                                                    <Button onClick={handleSaveLecture} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10">Save Video</Button>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" className="gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm" onClick={() => { setEditingPdf(null); setPdfForm({title:'', pdf_url:'', is_preview:false}); }}><FileText className="w-4 h-4" /> Add PDF</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader><DialogTitle>{editingPdf ? 'Edit PDF' : 'Add PDF Notes'}</DialogTitle></DialogHeader>
                                                    <div className="space-y-4 py-2">
                                                        <div><Label className="text-xs font-bold text-slate-500 uppercase">PDF Title</Label><Input value={pdfForm.title} onChange={e=>setPdfForm(p=>({...p, title:e.target.value}))} /></div>
                                                        <div><Label className="text-xs font-bold text-slate-500 uppercase">PDF File URL (Cloudinary / S3)</Label><Input value={pdfForm.pdf_url} onChange={e=>setPdfForm(p=>({...p, pdf_url:e.target.value}))} /></div>
                                                        <div className="flex items-center gap-2 mt-2"><Switch checked={pdfForm.is_preview} onCheckedChange={c=>setPdfForm(p=>({...p, is_preview:c}))} /><Label className="font-bold">Free Preview</Label></div>
                                                    </div>
                                                    <Button onClick={handleSavePdf} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10">Save PDF</Button>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-5 space-y-8">
                                        {loadingLectures || loadingPdfs ? <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div> : (
                                            <>
                                                {/* Videos List */}
                                                <div>
                                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Video className="w-4 h-4"/> Video Lectures ({lectures.length})</h4>
                                                    {lectures.length === 0 ? <p className="text-sm text-slate-400 italic">No videos yet.</p> : (
                                                        <div className="grid gap-3">
                                                            {lectures.map(lec => (
                                                                <div key={lec.id} className="group flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:shadow-md transition-all bg-white">
                                                                    <div className="flex items-center gap-4 truncate">
                                                                        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0"><Video className="w-5 h-5 text-indigo-500"/></div>
                                                                        <div className="truncate">
                                                                            <div className="font-bold text-slate-800 text-sm truncate flex items-center gap-2">{lec.title} {lec.is_preview && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-sm font-black">FREE</span>}</div>
                                                                            <div className="text-xs text-slate-400 mt-0.5">ID: {lec.youtube_video_id}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <Dialog>
                                                                            <DialogTrigger asChild>
                                                                                <Button size="icon" variant="outline" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50" onClick={() => { setEditingLecture(lec); setLectureForm({title:lec.title, youtube_video_id:lec.youtube_video_id, thumbnail_url:lec.thumbnail_url||'', duration_seconds:lec.duration_seconds?String(lec.duration_seconds):'', is_preview:lec.is_preview}); }}><Pencil className="w-3.5 h-3.5"/></Button>
                                                                            </DialogTrigger>
                                                                            <DialogContent>
                                                                                <DialogHeader><DialogTitle>Edit Video Lecture</DialogTitle></DialogHeader>
                                                                                <div className="space-y-4 py-2">
                                                                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">Lecture Title</Label><Input value={lectureForm.title} onChange={e=>setLectureForm(p=>({...p, title:e.target.value}))} /></div>
                                                                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">YouTube URL / Video ID</Label><Input value={lectureForm.youtube_video_id} onChange={e=>setLectureForm(p=>({...p, youtube_video_id:e.target.value}))} /></div>
                                                                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">Duration (Seconds)</Label><Input type="number" placeholder="e.g. 1200 (for 20m)" value={lectureForm.duration_seconds} onChange={e=>setLectureForm(p=>({...p, duration_seconds:e.target.value}))} /></div>
                                                                                    <div className="flex items-center gap-2 mt-2"><Switch checked={lectureForm.is_preview} onCheckedChange={c=>setLectureForm(p=>({...p, is_preview:c}))} /><Label className="font-bold">Free Preview</Label></div>
                                                                                </div>
                                                                                <Button onClick={handleSaveLecture} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-10">Save Changes</Button>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                        <Button size="icon" variant="outline" className="h-8 w-8 text-red-500 hover:bg-red-50 border-red-200" onClick={()=>handleDeleteLecture(lec.id)}><Trash2 className="w-3.5 h-3.5"/></Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* PDFs List */}
                                                <div>
                                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><FileText className="w-4 h-4"/> PDF Notes ({pdfs.length})</h4>
                                                    {pdfs.length === 0 ? <p className="text-sm text-slate-400 italic">No PDFs yet.</p> : (
                                                        <div className="grid gap-3">
                                                            {pdfs.map(pdf => (
                                                                <div key={pdf.id} className="group flex items-center justify-between p-4 border border-slate-200 rounded-2xl hover:shadow-md transition-all bg-white">
                                                                    <div className="flex items-center gap-4 truncate">
                                                                        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-orange-500"/></div>
                                                                        <div className="truncate">
                                                                            <div className="font-bold text-slate-800 text-sm truncate flex items-center gap-2">{pdf.title} {pdf.is_preview && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-sm font-black">FREE</span>}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <Dialog>
                                                                            <DialogTrigger asChild>
                                                                                <Button size="icon" variant="outline" className="h-8 w-8 text-orange-600 hover:bg-orange-50" onClick={() => { setEditingPdf(pdf); setPdfForm({title:pdf.title, pdf_url:pdf.pdf_url, is_preview:pdf.is_preview}); }}><Pencil className="w-3.5 h-3.5"/></Button>
                                                                            </DialogTrigger>
                                                                            <DialogContent>
                                                                                <DialogHeader><DialogTitle>Edit PDF Notes</DialogTitle></DialogHeader>
                                                                                <div className="space-y-4 py-2">
                                                                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">PDF Title</Label><Input value={pdfForm.title} onChange={e=>setPdfForm(p=>({...p, title:e.target.value}))} /></div>
                                                                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">PDF File URL</Label><Input value={pdfForm.pdf_url} onChange={e=>setPdfForm(p=>({...p, pdf_url:e.target.value}))} /></div>
                                                                                    <div className="flex items-center gap-2 mt-2"><Switch checked={pdfForm.is_preview} onCheckedChange={c=>setPdfForm(p=>({...p, is_preview:c}))} /><Label className="font-bold">Free Preview</Label></div>
                                                                                </div>
                                                                                <Button onClick={handleSavePdf} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10">Save Changes</Button>
                                                                            </DialogContent>
                                                                        </Dialog>
                                                                        <Button size="icon" variant="outline" className="h-8 w-8 text-red-500 hover:bg-red-50 border-red-200" onClick={()=>handleDeletePdf(pdf.id)}><Trash2 className="w-3.5 h-3.5"/></Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                    <Video className="w-10 h-10 mb-3 opacity-20" />
                                    <p className="font-bold text-sm">Select a chapter</p>
                                    <p className="text-xs mt-1 opacity-70">to manage its videos and PDFs.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // ── DASHBOARD VIEW (NO COURSE SELECTED) ──
                <>
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <GraduationCap className="w-8 h-8 text-indigo-600" /> Course Manager
                            </h1>
                            <p className="text-slate-500 text-sm font-medium mt-1">PhysicsWallah-style unified learning management.</p>
                        </div>
                    </div>

                    <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
                        <TabsList className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 gap-1">
                            <TabsTrigger value="courses" className="rounded-xl px-5 py-2.5 text-[11px] font-black uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all"><BookOpen className="w-4 h-4 mr-2 inline"/> Library</TabsTrigger>
                            <TabsTrigger value="enrollments" className="rounded-xl px-5 py-2.5 text-[11px] font-black uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all"><Users className="w-4 h-4 mr-2 inline"/> Enrollments</TabsTrigger>
                            <TabsTrigger value="banner" className="rounded-xl px-5 py-2.5 text-[11px] font-black uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all"><ImageIcon className="w-4 h-4 mr-2 inline"/> Ad Banner</TabsTrigger>
                        </TabsList>

                        <TabsContent value="courses" className="mt-8">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-sm text-slate-500 font-bold">{courses.length} courses total</p>
                                <Dialog open={showCourseForm} onOpenChange={setShowCourseForm}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => { setEditingCourse(null); setCourseForm(EMPTY_COURSE); }} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 px-6 font-black uppercase tracking-widest gap-2 shadow-md">
                                            <Plus className="w-4 h-4" /> Create Course
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader><DialogTitle>Create New Course</DialogTitle></DialogHeader>
                                        <CourseFormFields />
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {loadingCourses ? <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div> : courses.map(course => (
                                    <div key={course.id} className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="h-40 bg-slate-100 relative group">
                                            {course.banner_url ? <img src={course.banner_url} alt="" className="w-full h-full object-cover" /> : <div className="absolute inset-0 bg-indigo-50 flex items-center justify-center"><ImageIcon className="w-8 h-8 text-indigo-200"/></div>}
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg text-slate-800">{course.is_active ? '✅ ACTIVE' : 'DRAFT'}</div>
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                <Button size="icon" variant="secondary" className="rounded-full w-10 h-10" onClick={() => handleToggleActive(course)}>{course.is_active ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}</Button>
                                                <Button size="icon" variant="destructive" className="rounded-full w-10 h-10" onClick={() => handleDeleteCourse(course.id)}><Trash2 className="w-4 h-4"/></Button>
                                            </div>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="font-black text-lg leading-tight line-clamp-2 text-slate-900">{course.title}</h3>
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">€{course.discount_price_eur || course.price_eur}</span>
                                                {course.is_free && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">FREE</span>}
                                                {course.launch_date === 'Coming Soon' && <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">SOON</span>}
                                            </div>
                                            <Button className="w-full mt-5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 font-bold" onClick={() => { setSelectedCourse(course); fetchSubjects(course.id); }}>Manage Content</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="enrollments" className="mt-8">
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Manual Enrollment Form */}
                                    <div className="w-full md:w-1/3 space-y-6">
                                        <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2"><Plus className="w-5 h-5 text-indigo-500" /> Grant Manual Access</h3>
                                        <div className="space-y-4">
                                            <div><Label className="text-xs font-bold text-slate-500 uppercase">User Email</Label><Input value={manualEnroll.email} onChange={e => setManualEnroll(p => ({ ...p, email: e.target.value }))} placeholder="e.g. student@example.com" className="mt-1 h-11 rounded-xl" /></div>
                                            <div>
                                                <Label className="text-xs font-bold text-slate-500 uppercase">Course</Label>
                                                <select value={manualEnroll.course_id} onChange={e => setManualEnroll(p => ({ ...p, course_id: e.target.value }))} className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm mt-1 outline-none">
                                                    <option value="">Select a course...</option>
                                                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                                </select>
                                            </div>
                                            <div><Label className="text-xs font-bold text-slate-500 uppercase">Validity (Days)</Label><Input type="number" value={manualEnroll.days} onChange={e => setManualEnroll(p => ({ ...p, days: Number(e.target.value) }))} className="mt-1 h-11 rounded-xl" /></div>
                                            <Button onClick={handleManualEnroll} className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl font-bold text-white">Grant Access</Button>
                                        </div>
                                    </div>
                                    {/* Enrollments List */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2"><Users className="w-5 h-5 text-indigo-500" /> Recent Enrollments</h3>
                                            <div className="relative w-64">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input value={enrollSearch} onChange={e => setEnrollSearch(e.target.value)} placeholder="Search email..." className="pl-9 h-11 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                                                    <tr>
                                                        <th className="px-6 py-4 rounded-tl-2xl">Student</th>
                                                        <th className="px-6 py-4">Course</th>
                                                        <th className="px-6 py-4">Status</th>
                                                        <th className="px-6 py-4 text-right rounded-tr-2xl">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                                    {loadingEnrollments ? <tr><td colSpan={4} className="px-6 py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500" /></td></tr> :
                                                        filteredEnrollments.map(enroll => {
                                                            const course = courses.find(c => c.id === enroll.course_id);
                                                            const expired = isExpired(enroll.expires_at);
                                                            return (
                                                                <tr key={enroll.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                                                    <td className="px-6 py-4">
                                                                        <div className="font-bold text-slate-900 dark:text-white">{(enroll.profiles as any)?.full_name || 'Unknown'}</div>
                                                                        <div className="text-xs text-slate-500">{(enroll.profiles as any)?.email || enroll.user_id.slice(0, 8) + '...'}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{course?.title || 'Unknown Course'}</td>
                                                                    <td className="px-6 py-4">
                                                                        <span className={cn("px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-md", expired ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600")}>
                                                                            {expired ? 'Expired' : 'Active'}
                                                                        </span>
                                                                        <div className="text-[10px] text-slate-400 mt-1 font-medium">Ends {fmt(enroll.expires_at)}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 text-right">
                                                                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 font-bold text-xs" onClick={() => handleRevokeEnrollment(enroll.id)}>Revoke</Button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="banner" className="mt-8">
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 max-w-2xl shadow-sm">
                                <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2 mb-6"><ImageIcon className="w-5 h-5 text-indigo-500" /> App Ad Banner</h3>
                                <div className="space-y-5">
                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">Title</Label><Input value={adBannerForm.title} onChange={e => setAdBannerForm(p => ({ ...p, title: e.target.value }))} className="mt-1 h-11 rounded-xl" /></div>
                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">Subtitle</Label><Input value={adBannerForm.subtitle} onChange={e => setAdBannerForm(p => ({ ...p, subtitle: e.target.value }))} className="mt-1 h-11 rounded-xl" /></div>
                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">CTA Label</Label><Input value={adBannerForm.cta_label} onChange={e => setAdBannerForm(p => ({ ...p, cta_label: e.target.value }))} className="mt-1 h-11 rounded-xl" /></div>
                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">CTA URL</Label><Input value={adBannerForm.cta_url} onChange={e => setAdBannerForm(p => ({ ...p, cta_url: e.target.value }))} className="mt-1 h-11 rounded-xl" /></div>
                                    <div><Label className="text-xs font-bold text-slate-500 uppercase">Banner Image URL</Label><Input value={adBannerForm.image_url} onChange={e => setAdBannerForm(p => ({ ...p, image_url: e.target.value }))} className="mt-1 h-11 rounded-xl" /></div>
                                    <Button onClick={async () => {
                                        setSavingBanner(true);
                                        const { error } = await supabase.from('system_settings').upsert({ key: 'courses_ad_banner', value: adBannerForm }, { onConflict: 'key' });
                                        if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
                                        else toast({ title: 'Banner updated successfully' });
                                        setSavingBanner(false);
                                    }} disabled={savingBanner} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-11 rounded-xl w-full">{savingBanner ? 'Saving...' : 'Save Banner'}</Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    );
}
