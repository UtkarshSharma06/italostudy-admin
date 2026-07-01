import { useState, useEffect, lazy, Suspense } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/datetime-picker';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import {
    Plus,
    Trash2,
    Calendar,
    Clock,
    Box,
    ShieldCheck,
    Loader2,
    FileJson,
    X,
    Zap,
    Brain,
    Pencil,
    Layers,
    BookOpen,
    Headphones,
    PenTool,
    MessageSquare,
    Users as UsersIcon,
    UserCog,
    Bell,
    Trophy,
    Newspaper,
    Menu,
    Megaphone,
    LogOut,
    Search,
    Settings,
    ShieldAlert,
    FileText,
    BarChart3,
    UserPlus,
    Ticket,
    Wallet,
    Hash,
    AlertTriangle,
    Radar,
    Image as ImageIcon,
    Table as TableIcon,
    PencilLine,
    Activity,
    Link as LinkIcon,
    FileDown,
    FileEdit,
    Star,
    CheckCircle2,
    Lock,
    Moon,
    Sun,
    TrendingUp,
    Globe,
    ShoppingBag,
    GraduationCap
} from 'lucide-react';
import { generateMockTestPDF } from '@/utils/pdfExport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaEditor from '@/components/admin/MediaEditor';
import { MediaContent } from '@/types/test';
const CourseManager = lazy(() => import('@/components/admin/CourseManager'));
const PreRegistrationManager = lazy(() => import('@/components/admin/PreRegistrationManager'));
const LearningManager = lazy(() => import('@/components/admin/LearningManager'));
const ReadingManager = lazy(() => import('@/components/admin/ReadingManager'));
const ListeningManager = lazy(() => import('@/components/admin/ListeningManager'));
const WritingManager = lazy(() => import('@/components/admin/WritingManager'));
const PracticeManager = lazy(() => import('@/components/admin/PracticeManager'));
const LabManager = lazy(() => import('@/components/admin/LabManager'));
const FeedbackManager = lazy(() => import('@/components/admin/FeedbackManager'));
const MockEvaluationManager = lazy(() => import('@/components/admin/MockEvaluationManager'));
const UserManager = lazy(() => import('@/components/admin/UserManager'));
const ConsultantManager = lazy(() => import('@/components/admin/ConsultantManager'));
const NotificationManager = lazy(() => import('@/components/admin/NotificationManager'));
const ResourceManager = lazy(() => import('@/components/admin/ResourceManager'));
const BlogManager = lazy(() => import('@/components/admin/BlogManager'));
const MockSeriesManager = lazy(() => import('@/components/admin/MockSeriesManager'));
const MockResultsViewer = lazy(() => import('@/components/admin/MockResultsViewer'));
const SubAdminManager = lazy(() => import('@/components/admin/SubAdminManager'));
const AnalyticsOverview = lazy(() => import('@/components/admin/AnalyticsOverview'));
const InvestorDashboard = lazy(() => import('@/components/admin/InvestorDashboard'));
const SystemConfig = lazy(() => import('@/components/admin/SystemConfig'));
const SecurityMonitor = lazy(() => import('@/components/admin/SecurityMonitor'));
const PricingManager = lazy(() => import('@/components/admin/PricingManager'));
const CouponsManager = lazy(() => import('@/components/admin/CouponsManager'));
const PaymentsManager = lazy(() => import('@/components/admin/PaymentsManager'));
const CommunityManager = lazy(() => import('@/components/admin/CommunityManager'));
const QuestionReportManager = lazy(() => import('@/components/admin/QuestionReportManager'));
const QAReportManager = lazy(() => import('@/components/admin/QAReportManager'));
const ExamManager = lazy(() => import('@/components/admin/ExamManager'));

const PageContentManager = lazy(() => import('@/components/admin/PageContentManager'));
const ReviewManager = lazy(() => import('@/components/admin/ReviewManager'));
const PlatformUpdatesManager = lazy(() => import('@/components/admin/PlatformUpdatesManager'));
const BookletManager = lazy(() => import('@/components/admin/BookletManager'));
const SEOHealthMonitor = lazy(() => import('@/components/admin/SEOHealthMonitor'));
const AnnouncementManager = lazy(() => import('@/components/admin/AnnouncementManager'));
const AdCampaignManager = lazy(() => import('@/components/admin/store/AdCampaignManager'));
const SupportTickets = lazy(() => import('@/components/admin/SupportTickets'));
const SupportTopics = lazy(() => import('@/components/admin/SupportTopics'));
import { useAuth } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';
import { EXAMS } from '@/config/exams';
import { MathText } from '@/components/MathText';
import { useTheme } from 'next-themes';

interface MockSession {
    id: string;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    exam_type: string;
    duration: number;
    max_attempts: number;
    is_official: boolean;
    access_type: 'open' | 'request_required';
    is_active: boolean;
    registration_count: number;
    attempts_per_person: number;
    difficulty: 'easy' | 'medium' | 'hard';
    is_explorer_allowed?: boolean;
    is_sections_locked?: boolean;
    section_timing_mode?: 'section' | 'total';
    config?: any;
    reading_test_id?: string | null;
    listening_test_id?: string | null;
    writing_task1_id?: string | null;
    writing_task2_id?: string | null;
}

interface SessionFormData {
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    exam_type: string;
    duration: number;
    max_attempts: number;
    is_official: boolean;
    access_type: 'open' | 'request_required';
    is_active: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
    is_explorer_allowed: boolean;
    is_sections_locked: boolean;
    section_timing_mode: 'section' | 'total';
    reading_test_id?: string;
    listening_test_id?: string;
    writing_task1_id?: string;
    writing_task2_id?: string;
}

// Consolidated lucide-react imports above

interface Question {
    question_text: string;
    options: string[];
    correct_index: number;
    explanation?: string;
    section_name: string;
    topic?: string;
    passage?: string;
    media?: MediaContent | null;
}

import { JsonImportGuide } from '@/components/admin/JsonImportGuide';

const SidebarContent = ({
    isMobile = false,
    isSuperAdmin,
    permissionsLoading,
    isSidebarHovered,
    setIsSidebarHovered,
    navigationGroups,
    activeTab,
    setActiveTab,
    setIsMobileMenuOpen,
    handleSignOut
}: {
    isMobile?: boolean;
    isSuperAdmin: boolean;
    permissionsLoading: boolean;
    isSidebarHovered: boolean;
    setIsSidebarHovered: (h: boolean) => void;
    navigationGroups: any[];
    activeTab: string;
    setActiveTab: (t: string) => void;
    setIsMobileMenuOpen: (o: boolean) => void;
    handleSignOut: () => void;
}) => {
    if (!isSuperAdmin && permissionsLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            </div>
        );
    }

    const expanded = isSidebarHovered || isMobile;

    return (
        <motion.div
            onMouseEnter={() => !isMobile && setIsSidebarHovered(true)}
            onMouseLeave={() => !isMobile && setIsSidebarHovered(false)}
            animate={{ width: expanded ? (isMobile ? '100%' : 260) : 80 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className={cn(
                "flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 relative z-[100]",
                !isMobile && "overflow-hidden shadow-2xl shadow-indigo-100/10",
                isMobile && "w-full"
            )}
        >
            <div className="h-20 flex items-center justify-center shrink-0 border-b border-slate-50 dark:border-slate-800">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 dark:shadow-none">
                    <ShieldCheck className="w-6 h-6" />
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 custom-scrollbar scrollbar-hide">
                {navigationGroups.map((group, idx) => (
                    <div key={idx} className="mb-6">
                        <AnimatePresence>
                            {expanded && (
                                <motion.label
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 px-8 block mb-2 whitespace-nowrap"
                                >
                                    {group.title}
                                </motion.label>
                            )}
                        </AnimatePresence>
                        <div className="space-y-1.5 px-3">
                            {group.items.map((item: any) => (
                                <button
                                    key={item.id}
                                    onClick={() => { setActiveTab(item.id); isMobile && setIsMobileMenuOpen(false); }}
                                    className={cn(
                                        "w-full flex items-center transition-all relative group h-11 rounded-xl",
                                        expanded ? "px-4 gap-4" : "justify-center",
                                        activeTab === item.id ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <div className={cn("shrink-0 flex items-center justify-center", expanded ? "w-5 h-5" : "w-10 h-10")}>
                                        <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", activeTab === item.id ? "text-white" : "text-slate-400")} />
                                    </div>
                                    <AnimatePresence>
                                        {expanded && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="truncate whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    {activeTab === item.id && !expanded && (
                                        <motion.div layoutId="active-dot" className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-50 dark:border-slate-800">
                <div className={cn(
                    "bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl flex items-center transition-all",
                    expanded ? "justify-between" : "justify-center"
                )}>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 shrink-0">
                            <Activity className="w-4 h-4 text-emerald-500" />
                        </div>
                        <AnimatePresence>
                            {expanded && (
                                <motion.div 
                                    initial={{ opacity: 0, width: 0 }} 
                                    animate={{ opacity: 1, width: 'auto' }}
                                    exit={{ opacity: 0, width: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    <p className="text-[10px] font-bold text-emerald-500 uppercase leading-tight">Live</p>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <AnimatePresence>
                        {expanded && (
                            <motion.button 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                onClick={handleSignOut} 
                                className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all group shrink-0"
                            >
                                <LogOut className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default function Admin() {
    const { 
        user, 
        profile, 
        signOut, 
        isSuperAdmin, 
        loading: authLoading, 
        permissions: authPermissions, 
        allowedTabs: authTabs,
        refreshPermissions
    } = useAuth() as any;
    const { theme, setTheme } = useTheme();
    const displayName = profile?.display_name || profile?.full_name?.split(' ')[0] || 'Admin';
    const { toast } = useToast();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState<MockSession[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('analytics');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarHovered, setIsSidebarHovered] = useState(false);
    const [readingTests, setReadingTests] = useState<any[]>([]);
    const [listeningTests, setListeningTests] = useState<any[]>([]);
    const [writingTasks, setWritingTasks] = useState<any[]>([]);
    const [availableExams, setAvailableExams] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 1024 : false);
    const [pdfProgressMessage, setPdfProgressMessage] = useState<string>('');
    const [sessionSubTab, setSessionSubTab] = useState('create');

    // Form state for creating/editing sessions
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [formData, setFormData] = useState<SessionFormData>({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        exam_type: 'cent-s-prep',
        duration: 100,
        max_attempts: 1,
        is_official: false,
        access_type: 'open',
        is_active: true, // Default to active
        is_explorer_allowed: false,
        is_sections_locked: true,
        section_timing_mode: 'section',
        reading_test_id: '',
        listening_test_id: '',
        writing_task1_id: '',
        writing_task2_id: '',
        difficulty: 'medium',
    });

    const handleDownloadSessionPDF = async (session: MockSession, sessionQuestions?: Question[]) => {
        setIsLoading(true);
        setPdfProgressMessage("Starting...");
        const { id: toastId, update } = toast({ 
            title: "Generating PDF...", 
            description: "Preparing your branded document...",
            duration: 999999 // Keep it open during generation
        });

        try {
            let questionsToExport = sessionQuestions;

            // If no questions provided (clicked from list), fetch them
            if (!questionsToExport) {
                const { data, error } = await supabase
                    .from('session_questions')
                    .select('*')
                    .eq('session_id', session.id)
                    .order('order_index', { ascending: true });

                if (error) throw error;
                questionsToExport = data.map((q: any) => ({
                    ...q,
                    options: q.options || [],
                })) as any;
            }

            if (!questionsToExport || questionsToExport.length === 0) {
                toast({ title: "No questions to export", variant: "destructive" });
                return;
            }

            await generateMockTestPDF(
                session.title, 
                questionsToExport as any, 
                '/logo.webp', 
                session.id,
                (msg) => {
                    setPdfProgressMessage(msg);
                    update({
                        id: toastId,
                        title: "Generating PDF...",
                        description: msg
                    });
                }
            );
            
            update({
                id: toastId,
                title: "Success",
                description: "PDF has been generated and downloaded.",
                duration: 5000
            });
        } catch (error: any) {
            console.error("PDF Export Error:", error);
            update({
                id: toastId,
                title: "Export Failed",
                description: "Failed to generate PDF. Check console for details.",
                variant: "destructive",
                duration: 5000
            });
        } finally {
            setIsLoading(false);
            setPdfProgressMessage('');
        }
    };

    // Question Management
    const [selectedSession, setSelectedSession] = useState<MockSession | null>(null);
    const [manualQuestions, setManualQuestions] = useState<Question[]>([]);
    const [importMode, setImportMode] = useState<'form' | 'json'>('form');
    const [jsonInput, setJsonInput] = useState('');
    const [isSequencingMode, setIsSequencingMode] = useState(false);
    const [sequencingIndices, setSequencingIndices] = useState<number[]>([]);
    const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
        question_text: '',
        options: ['', '', '', '', ''],
        correct_index: 0,
        section_name: '',
        topic: '',
        passage: '',
        explanation: '',
        media: null
    });

    const [practiceBankToggleState, setPracticeBankToggleState] = useState<Record<number, {
        isOpen: boolean;
        examId: string;
        subject: string;
        topic: string;
        difficulty: string;
        isSubmitting: boolean;
        isAdded?: boolean;
        insertedId?: string;
    }>>({});



    const allowedTabs = isSuperAdmin ? [] : authTabs;
    const actionPermissions = isSuperAdmin ? { 
        can_edit: true, 
        can_delete: true, 
        can_export: true,
        can_view_pii: true,
        can_manage_staff: true,
        can_broadcast: true
    } : authPermissions;
    const permissionsLoading = authLoading;

    useEffect(() => {
        // Load persisted session and questions
        const savedQuestions = localStorage.getItem('admin_manual_questions');
        const savedSession = localStorage.getItem('admin_selected_session');

        if (savedSession) {
            try {
                setSelectedSession(JSON.parse(savedSession));
            } catch (e) {
                console.error("Failed to load saved session:", e);
            }
        }

        if (savedQuestions) {
            try {
                const parsed = JSON.parse(savedQuestions);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setManualQuestions(parsed);
                }
            } catch (e) {
                console.error("Failed to load saved questions:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (manualQuestions.length > 0) {
            localStorage.setItem('admin_manual_questions', JSON.stringify(manualQuestions));
        } else {
            localStorage.removeItem('admin_manual_questions');
        }
    }, [manualQuestions]);

    useEffect(() => {
        if (selectedSession) {
            localStorage.setItem('admin_selected_session', JSON.stringify(selectedSession));
        } else {
            localStorage.removeItem('admin_selected_session');
        }
    }, [selectedSession]);

    useEffect(() => {
        fetchSessions();
        fetchTestData();
        fetchAvailableExams();

        // Subscribe to sessions and registrations for real-time count updates
        const channel = supabase
            .channel('admin_registration_sync')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'mock_sessions' }, () => fetchSessions())
            .on('postgres_changes', { event: '*', schema: 'public', table: 'session_registrations' }, () => fetchSessions())
            .subscribe();

        const handleResize = () => setIsMobile(window.innerWidth <= 1024);
        window.addEventListener('resize', handleResize);

        return () => {
            supabase.removeChannel(channel);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (selectedSession) {
            // Only fetch from DB if we don't have a local buffer for THIS session
            const savedQuestions = localStorage.getItem('admin_manual_questions');
            const savedSession = localStorage.getItem('admin_selected_session');

            let hasRestoreBuffer = false;
            if (savedQuestions && savedSession) {
                try {
                    const parsedSession = JSON.parse(savedSession);
                    if (parsedSession.id === selectedSession.id) {
                        hasRestoreBuffer = true;
                    }
                } catch (e) { }
            }

            if (!hasRestoreBuffer) {
                fetchSessionQuestions(selectedSession.id);
            }
        } else {
            // Only clear if we explicitly deselected (not just on mount check)
            const savedSession = localStorage.getItem('admin_selected_session');
            if (!savedSession) {
                setManualQuestions([]);
            }
        }
    }, [selectedSession]);

    const fetchSessionQuestions = async (id: string) => {
        const { data, error } = await supabase
            .from('session_questions')
            .select('*')
            .eq('session_id', id)
            .order('order_index', { ascending: true });

        if (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to load existing questions." });
        } else if (data) {
            setManualQuestions(data.map((q: any) => ({
                question_text: q.question_text,
                options: q.options,
                correct_index: q.correct_index,
                section_name: q.section_name,
                explanation: q.explanation,
                topic: q.topic || '',
                passage: q.passage || '',
                media: q.media
            })));
        }
    };

    const fetchTestData = async () => {
        const [rData, lData, wData] = await Promise.all([
            supabase.from('reading_tests').select('id, title'),
            supabase.from('listening_tests').select('id, title'),
            supabase.from('writing_tasks').select('id, title, task_type')
        ]);
        setReadingTests(rData.data || []);
        setListeningTests(lData.data || []);
        setWritingTasks(wData.data || []);
    };

    const fetchAvailableExams = async () => {
        const { data } = await supabase.from('exams').select('id, slug, name, sections, syllabus').order('name');
        setAvailableExams(data || []);
    };

    const fetchSessions = async () => {
        setIsLoading(true);

        // Fetch sessions
        const { data: sessionsData, error: sessionsError } = await supabase
            .from('mock_sessions')
            .select('*')
            .order('start_time', { ascending: false });

        if (sessionsError) {
            toast({ variant: "destructive", title: "Error", description: "Failed to load sessions." });
            setIsLoading(false);
            return;
        }

        if (sessionsData && sessionsData.length > 0) {
            const sessionIds = sessionsData.map(s => s.id);

            // Fetch registration counts - counting unique user_id per session
            const { data: registrations, error: regError } = await supabase
                .from('session_registrations')
                .select('session_id, user_id')
                .in('session_id', sessionIds);

            if (regError) {
                console.error("Error fetching registrations:", regError);
            }

            // Group by session and count unique users (though UNIQUE constraint exists in DB, this is for absolute safety)
            const registrationCounts: Record<string, Set<string>> = {};
            registrations?.forEach(reg => {
                if (!registrationCounts[reg.session_id]) {
                    registrationCounts[reg.session_id] = new Set();
                }
                registrationCounts[reg.session_id].add(reg.user_id);
            });

            const sessionsWithCounts = sessionsData.map(session => {
                const config = (session.config || {}) as any;
                return {
                    ...session,
                    registration_count: registrationCounts[session.id]?.size || 0,
                    reading_test_id: config.reading_test_id || null,
                    listening_test_id: config.listening_test_id || null,
                    writing_task1_id: config.writing_task1_id || null,
                    writing_task2_id: config.writing_task2_id || null,
                } as MockSession;
            });

            setSessions(sessionsWithCounts);
        } else {
            setSessions([]);
        }

        setIsLoading(false);
    };

    const handleResetForm = () => {
        setEditingSessionId(null);
        setFormData({
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            exam_type: 'cent-s-prep',
            duration: 100,
            max_attempts: 1,
            is_official: false,
            access_type: 'open',
            is_active: true,
            is_explorer_allowed: false,
            is_sections_locked: true,
            section_timing_mode: 'section',
            reading_test_id: '',
            listening_test_id: '',
            writing_task1_id: '',
            writing_task2_id: '',
            difficulty: 'medium'
        });
    };

    const handleSaveSession = async (e: React.FormEvent) => {
        e.preventDefault();
        // Permission check
        if (!actionPermissions.can_edit) {
            toast({ variant: "destructive", title: "Access Denied", description: "You do not have permission to modify sessions." });
            return;
        }

        setIsSubmitting(true);
        // Validation for IELTS: Must link at least one module
        if (formData.exam_type?.includes('ielts')) {
            const hasModule = formData.reading_test_id || formData.listening_test_id || formData.writing_task1_id || formData.writing_task2_id;
            if (!hasModule) {
                toast({
                    variant: "destructive",
                    title: "Missing Material",
                    description: "Please link at least one Reading, Listening, or Writing module for IELTS sessions."
                });
                setIsSubmitting(false);
                return;
            }
        }

        // Store module IDs in config JSONB column
        const config: any = {};
        if (formData.reading_test_id) config.reading_test_id = formData.reading_test_id;
        if (formData.listening_test_id) config.listening_test_id = formData.listening_test_id;
        if (formData.writing_task1_id) config.writing_task1_id = formData.writing_task1_id;
        if (formData.writing_task2_id) config.writing_task2_id = formData.writing_task2_id;

        const sessionData = {
            title: formData.title,
            description: formData.description,
            start_time: formData.start_time,
            end_time: formData.end_time,
            exam_type: formData.exam_type,
            duration: formData.duration,
            max_attempts: formData.max_attempts,
            is_official: formData.is_official,
            access_type: formData.access_type,
            is_active: formData.is_active,
            difficulty: formData.difficulty,
            is_explorer_allowed: formData.is_explorer_allowed,
            is_sections_locked: formData.is_sections_locked,
            section_timing_mode: formData.section_timing_mode,
            config: Object.keys(config).length > 0 ? config : {}
        };
        const { error } = editingSessionId
            ? await supabase.from('mock_sessions').update(sessionData).eq('id', editingSessionId)
            : await supabase.from('mock_sessions').insert([sessionData]);
        if (error) {
            toast({ variant: "destructive", title: "Failed", description: error.message });
        } else {
            toast({ title: "Success", description: editingSessionId ? "Session updated." : "New session created." });
            handleResetForm();
            fetchSessions();
        }
        setIsSubmitting(false);
    };

    const handleDeleteSession = async (id: string) => {
        // Permission check
        if (!actionPermissions.can_delete) {
            toast({ variant: "destructive", title: "Access Denied", description: "You do not have permission to delete sessions." });
            return;
        }

        if (!confirm('Are you sure you want to delete this session?')) return;
        const { error } = await supabase.from('mock_sessions').delete().eq('id', id);
        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else {
            toast({ title: "Deleted", description: "Session removed." });
            fetchSessions();
        }
    };

    const handleEditClick = (session: MockSession) => {
        // Permission check is less critical here (handled on save), but good for UX
        if (!actionPermissions.can_edit) {
            toast({ variant: "destructive", title: "Access Denied", description: "You are in read-only mode." });
            return;
        }

        setEditingSessionId(session.id);
        setFormData({
            title: session.title,
            description: session.description || '',
            start_time: new Date(session.start_time).toISOString(),
            end_time: new Date(session.end_time).toISOString(),
            exam_type: session.exam_type,
            is_official: session.is_official,
            access_type: session.access_type,
            duration: session.duration,
            max_attempts: session.max_attempts || 1,
            is_active: session.is_active,
            is_explorer_allowed: session.is_explorer_allowed || false,
            // Load module IDs from config JSONB column
            reading_test_id: (session.config as any)?.reading_test_id || '',
            listening_test_id: (session.config as any)?.listening_test_id || '',
            writing_task1_id: (session.config as any)?.writing_task1_id || '',
            writing_task2_id: (session.config as any)?.writing_task2_id || '',
            difficulty: (session as any).difficulty || 'medium',
            is_sections_locked: session.is_sections_locked ?? true,
            section_timing_mode: session.section_timing_mode ?? 'section',
        });
        setSessionSubTab('create');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleAddQuestionToList = () => {
        if (!currentQuestion.question_text || currentQuestion.options.some(o => !o)) {
            toast({ variant: "destructive", title: "Error", description: "Please fill in all fields." });
            return;
        }

        if (editingQuestionIndex !== null) {
            setManualQuestions(prev => {
                const updated = [...prev];
                updated[editingQuestionIndex] = currentQuestion;
                return updated;
            });
            setEditingQuestionIndex(null);
            toast({ title: "Updated", description: "Question updated in queue." });
        } else {
            setManualQuestions(prev => [...prev, currentQuestion]);
            toast({ title: "Added", description: "Question added to queue." });
        }

        setCurrentQuestion({
            question_text: '',
            options: ['', '', '', '', ''],
            correct_index: 0,
            passage: '',
            explanation: '',
            section_name: manualQuestions.length > 0 ? manualQuestions[manualQuestions.length - 1].section_name : '',
            media: null
        });
    };

    const handleJsonImport = () => {
        if (!jsonInput.trim()) {
            toast({ variant: "destructive", title: "Wait!", description: "Please paste your JSON data first." });
            return;
        }

        try {
            const parsed = JSON.parse(jsonInput.trim());
            if (!Array.isArray(parsed)) throw new Error('Input must be a JSON array [].');

            const processedQuestions = parsed.map(p => {
                let media = p.media;

                // Flexible Media Detection: Auto-detect image URLs in flat or malformed structures
                if (typeof media === 'string' && (media.includes('http') || media.includes('ik.imagekit.io'))) {
                    const isImage = /\.(webp|png|jpg|jpeg|svg|gif)(\?.*)?$/i.test(media);
                    if (isImage) {
                        media = { type: 'image', image: { url: media, alt: p.question_text?.substring(0, 20) } };
                    }
                } else if (media && !media.type) {
                    if (media.image?.url) media.type = 'image';
                    else if (media.table?.headers) media.type = 'table';
                    else if (media.chart?.data) media.type = 'chart';
                    else if (media.url) { // Handle flat { url: "..." }
                        media = { type: 'image', image: { url: media.url, alt: media.alt } };
                    }
                }

                    return {
                        ...p,
                        question_text: p.question_text || p.question || '', // Fallback for missing text
                        media,
                        section_name: p.section_name || p.subject || p.topic || 'General'
                    };
                });

            setManualQuestions([...manualQuestions, ...processedQuestions]);
            setJsonInput('');
            toast({ title: "Import Successful", description: `${processedQuestions.length} questions added to queue.` });
        } catch (e: any) {
            console.error("JSON Parse Error:", e);
            toast({
                variant: "destructive",
                title: "Import Error",
                description: "The text you pasted is not valid JSON. Please check for extra characters or mismatched brackets."
            });
        }
    };

    const handleSaveQuestions = async () => {
        if (!selectedSession) return;
        if (manualQuestions.length === 0) {
            toast({ variant: "destructive", title: "Wait!", description: "Your question queue is empty. Add questions before syncing." });
            return;
        }
        setIsSubmitting(true);
        const { error: delError } = await supabase.from('session_questions').delete().eq('session_id', selectedSession.id);
        if (delError) {
            toast({ variant: "destructive", title: "Error", description: "Failed to clear questions." });
            setIsSubmitting(false);
            return;
        }

        const sanitizedQuestions = manualQuestions.map((q, idx) => ({
            session_id: selectedSession.id,
            question_text: q.question_text || '[Missing Question Text]', // Final fallback for DB constraint
            options: q.options || [],
            correct_index: q.correct_index || 0,
            explanation: q.explanation || '',
            topic: q.topic || '',
            passage: q.passage || '',
            media: (q.media as any) || null,
            section_name: q.section_name || 'General',
            order_index: idx + 1 
        }));



        console.log('Sending Questions Payload:', sanitizedQuestions.map(q => ({ id: q.order_index, media: q.media })));

        const { error } = await supabase.from('session_questions').insert(sanitizedQuestions);
        if (error) toast({ variant: "destructive", title: "Error", description: error.message });
        else {
            toast({ title: "Success", description: "Questions saved." });
            localStorage.removeItem('admin_manual_questions');
            localStorage.removeItem('admin_selected_session');
            setSelectedSession(null);
            setManualQuestions([]);
        }
        setIsSubmitting(false);
    };

    const handleAddToPracticeBank = async (q: Question, idx: number) => {
        const state = practiceBankToggleState[idx];
        if (!state || !state.examId || !state.subject || !state.topic) {
            toast({ variant: "destructive", title: "Missing Info", description: "Please select Exam, Subject and Topic." });
            return;
        }

        setPracticeBankToggleState(prev => ({
            ...prev,
            [idx]: { ...prev[idx], isSubmitting: true }
        }));

        try {
            const { data: insertedData, error } = await supabase.from('practice_questions').insert([{
                exam_type: state.examId,
                subject: state.subject,
                topic: state.topic,
                difficulty: state.difficulty,
                question_text: q.question_text,
                options: q.options,
                correct_index: q.correct_index,
                explanation: q.explanation || '',
                passage: q.passage || '',
                media: q.media as any,
                created_at: new Date().toISOString()
            }]).select('id').single();

            if (error) throw error;

            toast({ title: "Success", description: "Question added to Practice Bank." });
            setPracticeBankToggleState(prev => ({
                ...prev,
                [idx]: { 
                    ...prev[idx], 
                    isSubmitting: false, 
                    isAdded: true, 
                    isOpen: false,
                    insertedId: insertedData?.id 
                }
            }));
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
            setPracticeBankToggleState(prev => ({
                ...prev,
                [idx]: { ...prev[idx], isSubmitting: false }
            }));
        }
    };

    const handleRemoveFromPracticeBank = async (idx: number) => {
        const state = practiceBankToggleState[idx];
        if (!state?.isAdded) return;

        setPracticeBankToggleState(prev => ({
            ...prev,
            [idx]: { ...prev[idx], isSubmitting: true }
        }));

        try {
            if (state.insertedId) {
                const { error } = await supabase
                    .from('practice_questions')
                    .delete()
                    .eq('id', state.insertedId);

                if (error) throw error;
            }

            toast({ title: "Success", description: "Question removed from Practice Bank." });
            setPracticeBankToggleState(prev => ({
                ...prev,
                [idx]: { 
                    ...prev[idx], 
                    isSubmitting: false, 
                    isAdded: false, 
                    isOpen: false,
                    insertedId: undefined 
                }
            }));
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
            setPracticeBankToggleState(prev => ({
                ...prev,
                [idx]: { ...prev[idx], isSubmitting: false }
            }));
        }
    };


    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const navigationGroups = [
        {
            title: "Analytics", items: [
                { id: "analytics",    label: "Dashboard",     icon: BarChart3    },
                { id: "pre-registrations", label: "Pre-Registrations", icon: Ticket },
                { id: "investor",     label: "Investor KPIs", icon: TrendingUp   },
                { id: "marketing",    label: "Marketing",     icon: Radar        },
                { id: "seo-health",   label: "SEO Health",    icon: Globe        },
                { id: "mock-results", label: "Results",       icon: Trophy       },
            ]
        },
        {
            title: "Finance", items: [
                { id: "payments", label: "Payments", icon: Wallet  },
                { id: "pricing",  label: "Pricing",  icon: Zap     },
                { id: "coupons",  label: "Coupons",  icon: Ticket  },
                { id: "ad-campaigns", label: "Ad Campaigns", icon: ShoppingBag },
            ]
        },
        {
            title: "Management", items: [
                { id: "sessions",      label: "Sessions",        icon: Calendar    },
                { id: "series",        label: "Mock Series",     icon: TableIcon   },
                { id: "reports",       label: "Question Reports",icon: AlertTriangle },
                { id: "qa-reports",    label: "Q&A Reports",     icon: ShieldAlert },
                { id: "mock-evals",    label: "Mock Grade",      icon: CheckCircle2},
                { id: "writing-evals", label: "Essay Grade",     icon: PenTool     },
                { id: "site-reviews",  label: "Site Reviews",    icon: Star        },
            ]
        },
        {
            title: "Material", items: [
                { id: "courses",       label: "Courses",           icon: GraduationCap },
                { id: "exam-manager",  label: "Exam Model",        icon: FileJson    },
                { id: "learning",      label: "Lessons",           icon: Brain       },
                { id: "reading",       label: "Reading",           icon: BookOpen    },
                { id: "listening",     label: "Listening",         icon: Headphones  },
                { id: "writing-tasks", label: "Tasks",             icon: Pencil      },
                { id: "practice",      label: "Practice Bank",     icon: Layers      },
                { id: "booklet",       label: "Booklet Generator", icon: FileDown    },
                { id: "3d-labs",       label: "Labs",              icon: Box         },
                { id: "resources",     label: "Resources",         icon: FileText    },
                { id: "blog",          label: "Blog",              icon: Newspaper   },
                { id: "page-content",  label: "Page Content",      icon: PencilLine  },
                { id: "status-hub",    label: "Status Hub",        icon: LinkIcon    },
            ]
        },
        {
            title: "Ops", items: [
                { id: "users",         label: "Students",       icon: UsersIcon  },
                { id: "consultants",   label: "Staff",          icon: UserCog    },
                { id: "community",     label: "Community",      icon: Hash       },
                { id: "feedback",      label: "Feedback",       icon: MessageSquare },
                { id: "support-tickets", label: "Support Tickets", icon: MessageSquare },
                { id: "support-topics",  label: "Help Topics",     icon: FileText },
                { id: "notifications", label: "Alerts",         icon: Bell       },
                { id: "announcements", label: "Banner Ads",     icon: Megaphone  },
                { id: "security",      label: "Security & Bans",icon: Lock       },
                { id: "system-config", label: "Settings",       icon: Settings   },
                ...(isSuperAdmin ? [{ id: "sub-admins", label: "Sub-Admins", icon: UserPlus }] : [])
            ]
        },
    ].map(group => ({
        ...group,
        items: group.items.filter(item => isSuperAdmin || allowedTabs.includes(item.id))
    })).filter(group => group.items.length > 0);



    if (authLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-slate-950">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">Loading Panel</p>
                        <p className="text-sm text-slate-500">Verifying administrator access...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Layout showHeader={false}>
            <div className="flex h-screen bg-white dark:bg-slate-950 overflow-hidden">
                <SidebarContent 
                    isSuperAdmin={isSuperAdmin}
                    permissionsLoading={permissionsLoading}
                    isSidebarHovered={isSidebarHovered}
                    setIsSidebarHovered={setIsSidebarHovered}
                    navigationGroups={navigationGroups}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    handleSignOut={handleSignOut}
                />

                <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50/30 dark:bg-slate-950">
                    <header className="h-20 bg-white/80 dark:bg-slate-900/80 border-b border-slate-100 dark:border-slate-800 px-6 lg:px-10 flex items-center justify-between shrink-0 sticky top-0 z-50 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden">
                                        <Menu className="w-6 h-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="p-0 w-72">
                                    <SidebarContent 
                                        isMobile
                                        isSuperAdmin={isSuperAdmin}
                                        permissionsLoading={permissionsLoading}
                                        isSidebarHovered={isSidebarHovered}
                                        setIsSidebarHovered={setIsSidebarHovered}
                                        navigationGroups={navigationGroups}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                                        handleSignOut={handleSignOut}
                                    />
                                </SheetContent>
                            </Sheet>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    {navigationGroups.flatMap(g => g.items).find(i => i.id === activeTab)?.label || 'Admin'}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 lg:gap-6">
                            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-full border border-slate-100 dark:border-slate-800/50">
                                <div className="flex flex-col items-end mr-4">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                                        {profile?.display_name || 'Administrator'}
                                    </span>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full animate-pulse",
                                            isSuperAdmin ? "bg-amber-500" : "bg-indigo-500"
                                        )} />
                                        <span className={cn(
                                            "text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded",
                                            isSuperAdmin ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
                                        )}>
                                            {isSuperAdmin ? 'Super Admin' : 'Sub-Admin'}
                                        </span>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-4 w-4 ml-1 text-slate-400 hover:text-indigo-500"
                                            onClick={() => {
                                                refreshPermissions();
                                                toast({ title: "Syncing", description: "Refreshing permissions from server..." });
                                            }}
                                            title="Sync Permissions"
                                        >
                                            <Activity className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
                                    {profile?.display_name?.charAt(0) || 'A'}
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-transform"
                            >
                                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>

                            <div className="hidden sm:block relative w-48 lg:w-80 group">
                                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input
                                    placeholder="Find tools..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="pl-11 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs font-medium focus-visible:ring-1 focus-visible:ring-indigo-500 transition-all hover:bg-white dark:hover:bg-slate-800"
                                />
                            </div>
                            {(isSuperAdmin || allowedTabs.includes('notifications')) && (
                                <Button variant="outline" size="icon" className={cn("w-10 h-10 rounded-xl transition-all border-slate-200 dark:border-slate-800", activeTab === 'notifications' ? "bg-indigo-600 border-indigo-600 text-white" : "")} onClick={() => setActiveTab('notifications')}>
                                    <Bell className={cn("w-4 h-4", activeTab === 'notifications' ? "text-white" : "text-slate-400")} />
                                </Button>
                            )}
                            {(isSuperAdmin || allowedTabs.includes('system-config')) && (
                                <Button variant="ghost" size="icon" className={cn("w-10 h-10 rounded-xl transition-all", activeTab === 'system-config' ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" : "")} onClick={() => setActiveTab('system-config')}>
                                    <Settings className={cn("w-4 h-4", activeTab === 'system-config' ? "text-indigo-600" : "text-slate-400")} />
                                </Button>
                            )}
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto scroll-smooth pt-6 lg:pt-10 pb-24 lg:pb-32 px-4 lg:px-6 xl:px-10">
                        <div className="w-full mx-auto">
                            <Tabs value={activeTab} className="space-y-0 no-tabs-list">
                                <TabsList className="hidden">
                                    {navigationGroups.flatMap(g => g.items).map(item => (
                                        <TabsTrigger key={item.id} value={item.id}>{item.label}</TabsTrigger>
                                    ))}
                                </TabsList>

                                <Suspense fallback={<div className="flex h-[40vh] items-center justify-center w-full"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>}>
                                <TabsContent value="exam-manager" className="mt-0 focus-visible:outline-none">{activeTab === 'exam-manager' && <ExamManager />}</TabsContent>
                                <TabsContent value="courses" className="mt-0 focus-visible:outline-none">{activeTab === 'courses' && <CourseManager />}</TabsContent>
                                <TabsContent value="pre-registrations" className="mt-0 focus-visible:outline-none">{activeTab === 'pre-registrations' && <PreRegistrationManager />}</TabsContent>
                                <TabsContent value="learning" className="mt-0 focus-visible:outline-none">{activeTab === 'learning' && <LearningManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                <TabsContent value="analytics" className="mt-0 focus-visible:outline-none">{activeTab === 'analytics' && <AnalyticsOverview />}</TabsContent>
                                <TabsContent value="investor" className="mt-0 focus-visible:outline-none">{activeTab === 'investor' && <InvestorDashboard />}</TabsContent>
                                
                                <TabsContent value="support-tickets" className="mt-0 focus-visible:outline-none">{activeTab === 'support-tickets' && <SupportTickets />}</TabsContent>
                                <TabsContent value="support-topics" className="mt-0 focus-visible:outline-none">{activeTab === 'support-topics' && <SupportTopics />}</TabsContent>
                                
                                <TabsContent value="payments" className="mt-0 focus-visible:outline-none">{activeTab === 'payments' && <PaymentsManager />}</TabsContent>
                                <TabsContent value="coupons" className="mt-0 focus-visible:outline-none">{activeTab === 'coupons' && <CouponsManager />}</TabsContent>
                                <TabsContent value="ad-campaigns" className="mt-0 focus-visible:outline-none">{activeTab === 'ad-campaigns' && <AdCampaignManager />}</TabsContent>
                                <TabsContent value="mock-results" className="mt-0 focus-visible:outline-none">{activeTab === 'mock-results' && <MockResultsViewer />}</TabsContent>
                                <TabsContent value="sessions" className="mt-0 focus-visible:outline-none">
                                    {activeTab === 'sessions' && (
                                        <Tabs value={sessionSubTab} onValueChange={setSessionSubTab} className="space-y-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <TabsList className="bg-white/50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                                    <TabsTrigger value="create" className="rounded-xl px-8 py-2.5 text-[10px] uppercase tracking-widest font-black data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300">
                                                        {editingSessionId ? 'Edit Session' : 'Create Mock'}
                                                    </TabsTrigger>
                                                    <TabsTrigger value="groups" className="rounded-xl px-8 py-2.5 text-[10px] uppercase tracking-widest font-black data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all duration-300">
                                                        Mock Groups
                                                    </TabsTrigger>
                                                </TabsList>
                                            </div>

                                            <TabsContent value="create" className="mt-0 focus-visible:outline-none">
                                                <div className="max-w-4xl mx-auto">
                                                    <div className="bg-white dark:bg-slate-900 p-8 md:p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                                                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                                                            {editingSessionId ? <Pencil className="w-5 h-5 text-indigo-500" /> : <Plus className="w-5 h-5" />}
                                                            {editingSessionId ? 'Modify Session Details' : 'Deploy New Mock Session'}
                                                        </h2>
                                                        <form onSubmit={handleSaveSession} className="space-y-6">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="space-y-2">
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session Title</Label>
                                                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="h-12 rounded-xl" placeholder="e.g. IMAT 2024 Simulation" />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Exam Model</Label>
                                                                    <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 outline-none" value={formData.exam_type} onChange={e => {
                                                                        const slug = e.target.value;
                                                                        const exam = availableExams.find(ex => ex.slug === slug);
                                                                        const duration = (exam as any)?.duration_minutes || 100;
                                                                        const isImat = slug.includes('imat');
                                                                        setFormData({ 
                                                                            ...formData, 
                                                                            exam_type: slug, 
                                                                            duration,
                                                                            is_sections_locked: isImat ? false : formData.is_sections_locked,
                                                                            section_timing_mode: isImat ? 'total' : formData.section_timing_mode
                                                                        });
                                                                    }}>
                                                                        {availableExams.map(exam => (
                                                                            <option key={exam.id} value={exam.slug}>{exam.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                                                                <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Provide context about this session..." className="rounded-xl min-h-[100px]" />
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <DateTimePicker
                                                                    label="Start Time"
                                                                    value={formData.start_time}
                                                                    onChange={(value) => setFormData({ ...formData, start_time: value })}
                                                                    required
                                                                />
                                                                <DateTimePicker
                                                                    label="End Time"
                                                                    value={formData.end_time}
                                                                    onChange={(value) => setFormData({ ...formData, end_time: value })}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                <div className="space-y-2">
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Access Type</Label>
                                                                    <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" value={formData.access_type} onChange={e => setFormData({ ...formData, access_type: e.target.value as any })}>
                                                                        <option value="open">Open Group</option><option value="request_required">Invitation Only</option>
                                                                    </select>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Difficulty</Label>
                                                                    <select className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm" value={formData.difficulty} onChange={e => setFormData({ ...formData, difficulty: e.target.value as any })}>
                                                                        <option value="easy">Easy</option>
                                                                        <option value="medium">Medium</option>
                                                                        <option value="hard">Hard</option>
                                                                    </select>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Max Attempts</Label>
                                                                    <Input type="number" value={formData.max_attempts} onChange={e => setFormData({ ...formData, max_attempts: parseInt(e.target.value) || 1 })} className="h-12 rounded-xl" />
                                                                </div>
                                                            </div>

                                                            {formData.exam_type?.includes('ielts') && (
                                                                <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                                                                    <h4 className="text-[10px] font-black uppercase text-indigo-500 tracking-widest flex items-center gap-2">
                                                                        <Layers className="w-4 h-4" /> Link IELTS Material
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div className="space-y-1">
                                                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Reading Module</Label>
                                                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs" value={formData.reading_test_id} onChange={e => setFormData({ ...formData, reading_test_id: e.target.value })}>
                                                                                <option value="">None Linked</option>
                                                                                {readingTests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                                                            </select>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Listening Module</Label>
                                                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs" value={formData.listening_test_id} onChange={e => setFormData({ ...formData, listening_test_id: e.target.value })}>
                                                                                <option value="">None Linked</option>
                                                                                {listeningTests.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                                                            </select>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Writing Task 1</Label>
                                                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs" value={formData.writing_task1_id} onChange={e => setFormData({ ...formData, writing_task1_id: e.target.value })}>
                                                                                <option value="">None</option>
                                                                                {writingTasks.filter(t => t.task_type === 'task1').map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                                                            </select>
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <Label className="text-[9px] font-bold uppercase text-slate-400">Writing Task 2</Label>
                                                                            <select className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-xs" value={formData.writing_task2_id} onChange={e => setFormData({ ...formData, writing_task2_id: e.target.value })}>
                                                                                <option value="">None</option>
                                                                                {writingTasks.filter(t => t.task_type === 'task2').map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="flex items-center justify-between p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl border border-purple-100/50 dark:border-purple-800/30">
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase text-purple-900 dark:text-purple-300 tracking-wider">Explorer Access</p>
                                                                        <p className="text-[8px] font-bold text-purple-600/70 dark:text-purple-400/70 uppercase">Allow free users to attempt</p>
                                                                    </div>
                                                                    <Switch checked={formData.is_explorer_allowed} onCheckedChange={val => setFormData({ ...formData, is_explorer_allowed: val })} />
                                                                </div>

                                                                <div className="flex items-center justify-between p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/30">
                                                                    <div>
                                                                        <p className="text-[10px] font-black uppercase text-indigo-900 dark:text-indigo-300 tracking-wider">Lock Sections</p>
                                                                        <p className="text-[8px] font-bold text-indigo-600/70 dark:text-indigo-400/70 uppercase">Prevent back navigation</p>
                                                                    </div>
                                                                    <Switch checked={formData.is_sections_locked} onCheckedChange={val => setFormData({ ...formData, is_sections_locked: val })} />
                                                                </div>
                                                            </div>

                                                            <div className="p-5 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Timing Configuration</Label>
                                                                <div className="flex gap-3 mt-4">
                                                                    <Button 
                                                                        type="button" 
                                                                        variant={formData.section_timing_mode === 'section' ? 'default' : 'outline'}
                                                                        className="flex-1 h-11 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all"
                                                                        onClick={() => setFormData({ ...formData, section_timing_mode: 'section' })}
                                                                    >
                                                                        Sectional
                                                                    </Button>
                                                                    <Button 
                                                                        type="button" 
                                                                        variant={formData.section_timing_mode === 'total' ? 'default' : 'outline'}
                                                                        className="flex-1 h-11 text-[10px] uppercase font-black tracking-widest rounded-xl transition-all"
                                                                        onClick={() => setFormData({ ...formData, section_timing_mode: 'total' })}
                                                                    >
                                                                        Total Time
                                                                    </Button>
                                                                </div>
                                                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-3 italic text-center">
                                                                    {formData.section_timing_mode === 'section' ? 
                                                                        "Sectional: Each part has its own timer. Auto-next on expiry." : 
                                                                        "Total Time: Single clock for the entire mock. Flexible navigation."}
                                                                </p>
                                                            </div>

                                                            <div className="flex gap-4 pt-6">
                                                                <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={handleResetForm}>Reset Form</Button>
                                                                <Button type="submit" className="flex-[2] h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold" disabled={isSubmitting}>
                                                                    {isSubmitting ? <Loader2 className="animate-spin" /> : editingSessionId ? 'Update Session' : 'Deploy Mock'}
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="groups" className="mt-0 focus-visible:outline-none">
                                                {(() => {
                                                    const grouped = sessions.reduce((acc, session) => {
                                                        const type = session.exam_type || 'Other';
                                                        if (!acc[type]) acc[type] = [];
                                                        acc[type].push(session);
                                                        return acc;
                                                    }, {} as Record<string, MockSession[]>);
                                                    
                                                    const examTypes = Object.keys(grouped).sort();
                                                    
                                                    if (examTypes.length === 0) {
                                                        return (
                                                            <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                                                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
                                                                    <Calendar className="w-8 h-8 text-slate-300" />
                                                                </div>
                                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No mock sessions deployed yet</p>
                                                                <Button variant="ghost" className="mt-4 text-indigo-500 hover:text-indigo-600 font-bold" onClick={() => setSessionSubTab('create')}>Create Your First Mock</Button>
                                                            </div>
                                                        );
                                                    }

                                                    return (
                                                        <Tabs defaultValue={examTypes[0]} className="space-y-8">
                                                            <div className="flex flex-col gap-4">
                                                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 flex items-center gap-3">
                                                                    Select Exam Model
                                                                    <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
                                                                </h3>
                                                                <div className="overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
                                                                    <TabsList className="inline-flex h-auto p-1.5 bg-slate-100/50 dark:bg-slate-800/50 rounded-[1.25rem] border border-slate-200/50 dark:border-slate-700/50">
                                                                        {examTypes.map(type => (
                                                                            <TabsTrigger 
                                                                                key={type} 
                                                                                value={type}
                                                                                className="rounded-xl px-6 py-3 text-[10px] uppercase tracking-widest font-black data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all whitespace-nowrap group/trigger"
                                                                            >
                                                                                {availableExams.find(e => e.slug === type)?.name || type.toUpperCase()}
                                                                                <span className="ml-3 px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-md text-[9px] group-data-[state=active]/trigger:bg-indigo-50 group-data-[state=active]/trigger:text-indigo-600 transition-colors">{grouped[type].length}</span>
                                                                            </TabsTrigger>
                                                                        ))}
                                                                    </TabsList>
                                                                </div>
                                                            </div>

                                                            {examTypes.map(type => (
                                                                <TabsContent key={type} value={type} className="mt-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-3 duration-500">
                                                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                                                        {grouped[type].map(s => (
                                                                            <div key={s.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                                                                <div className="flex justify-between items-start gap-6">
                                                                                    <div className="space-y-5 flex-1">
                                                                                        <div>
                                                                                            <div className="flex items-center gap-2 mb-3">
                                                                                                <span className={cn(
                                                                                                    "text-[9px] font-black uppercase px-3 py-1 rounded-lg tracking-tighter",
                                                                                                    s.access_type === 'open' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                                                                                                )}>
                                                                                                    {s.access_type === 'open' ? 'Open Access' : 'Invite Only'}
                                                                                                </span>
                                                                                                <span className="text-[9px] font-black uppercase px-3 py-1 bg-slate-50 text-slate-500 border border-slate-100 rounded-lg tracking-tighter">
                                                                                                    {s.difficulty}
                                                                                                </span>
                                                                                            </div>
                                                                                            <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors leading-tight">{s.title}</h3>
                                                                                            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{s.description || 'Global practice session'}</p>
                                                                                        </div>

                                                                                        <div className="grid grid-cols-2 gap-6 pt-2">
                                                                                            <div className="flex items-center gap-3 text-slate-400">
                                                                                                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                                                                    <Calendar className="w-4 h-4" />
                                                                                                </div>
                                                                                                <div className="flex flex-col">
                                                                                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Date</span>
                                                                                                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{new Date(s.start_time).toLocaleDateString()}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="flex items-center gap-3 text-slate-400">
                                                                                                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                                                                                    <UsersIcon className="w-4 h-4" />
                                                                                                </div>
                                                                                                <div className="flex flex-col">
                                                                                                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Students</span>
                                                                                                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{s.registration_count || 0} Registered</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex flex-col gap-2 shrink-0">
                                                                                        <div className="flex gap-2">
                                                                                            <Button variant="outline" size="icon" className="w-11 h-11 rounded-2xl border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all" onClick={() => handleEditClick(s)} title="Edit Session"><Pencil className="w-5 h-5" /></Button>
                                                                                            <Button variant="outline" size="icon" className="w-11 h-11 rounded-2xl border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all" onClick={() => setSelectedSession(s)} title="Manage Questions"><Layers className="w-5 h-5" /></Button>
                                                                                        </div>
                                                                                        <div className="flex gap-2">
                                                                                            <Button variant="outline" size="icon" className="w-11 h-11 rounded-2xl border-slate-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all" onClick={() => handleDownloadSessionPDF(s)} title="Download PDF"><FileDown className="w-5 h-5" /></Button>
                                                                                            <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all" onClick={() => handleDeleteSession(s.id)} title="Delete Session"><Trash2 className="w-5 h-5" /></Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </TabsContent>
                                                            ))}
                                                        </Tabs>
                                                    );
                                                })()}
                                            </TabsContent>

                                        </Tabs>
                                    )}
                                </TabsContent>
                                {(isSuperAdmin || allowedTabs.includes('series')) && <TabsContent value="series" className="mt-0 focus-visible:outline-none">{activeTab === 'series' && <MockSeriesManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('pricing')) && <TabsContent value="pricing" className="mt-0 focus-visible:outline-none">{activeTab === 'pricing' && <PricingManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('mock-evals')) && <TabsContent value="mock-evals" className="mt-0 focus-visible:outline-none">{activeTab === 'mock-evals' && <MockEvaluationManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('writing-evals')) && <TabsContent value="writing-evals" className="mt-0 focus-visible:outline-none">{activeTab === 'writing-evals' && <WritingManager mode="evaluations" permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('reading')) && <TabsContent value="reading" className="mt-0 focus-visible:outline-none">{activeTab === 'reading' && <ReadingManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('listening')) && <TabsContent value="listening" className="mt-0 focus-visible:outline-none">{activeTab === 'listening' && <ListeningManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('writing-tasks')) && <TabsContent value="writing-tasks" className="mt-0 focus-visible:outline-none">{activeTab === 'writing-tasks' && <WritingManager mode="tasks" permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('practice')) && <TabsContent value="practice" className="mt-0 focus-visible:outline-none">{activeTab === 'practice' && <PracticeManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('booklet')) && <TabsContent value="booklet" className="mt-0 focus-visible:outline-none">{activeTab === 'booklet' && <BookletManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('reports')) && <TabsContent value="reports" className="mt-0 focus-visible:outline-none">{activeTab === 'reports' && <QuestionReportManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('qa-reports')) && <TabsContent value="qa-reports" className="mt-0 focus-visible:outline-none">{activeTab === 'qa-reports' && <QAReportManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('3d-labs')) && <TabsContent value="3d-labs" className="mt-0 focus-visible:outline-none">{activeTab === '3d-labs' && <LabManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                <TabsContent value="resources" className="mt-0 focus-visible:outline-none">{activeTab === 'resources' && <ResourceManager />}</TabsContent>
                                <TabsContent value="blog" className="mt-0 focus-visible:outline-none">{activeTab === 'blog' && <BlogManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                {(isSuperAdmin || allowedTabs.includes('page-content')) && <TabsContent value="page-content" className="mt-0 focus-visible:outline-none">{activeTab === 'page-content' && <PageContentManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('status-hub')) && <TabsContent value="status-hub" className="mt-0 focus-visible:outline-none">{activeTab === 'status-hub' && <PlatformUpdatesManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('feedback')) && <TabsContent value="feedback" className="mt-0 focus-visible:outline-none">{activeTab === 'feedback' && <FeedbackManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('community')) && <TabsContent value="community" className="mt-0 focus-visible:outline-none">{activeTab === 'community' && <CommunityManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('users')) && <TabsContent value="users" className="mt-0 focus-visible:outline-none">{activeTab === 'users' && <UserManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('consultants')) && <TabsContent value="consultants" className="mt-0 focus-visible:outline-none">{activeTab === 'consultants' && <ConsultantManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('site-reviews')) && <TabsContent value="site-reviews" className="mt-0 focus-visible:outline-none">{activeTab === 'site-reviews' && <ReviewManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>}
                                {(isSuperAdmin || allowedTabs.includes('notifications')) && (
                                    <>
                                        <TabsContent value="notifications" className="mt-0 focus-visible:outline-none">{activeTab === 'notifications' && <NotificationManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                        <TabsContent value="announcements" className="mt-0 focus-visible:outline-none">{activeTab === 'announcements' && <AnnouncementManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                    </>
                                )}
                                <TabsContent value="sub-admins" className="mt-0 focus-visible:outline-none">{activeTab === 'sub-admins' && <SubAdminManager permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                {(isSuperAdmin || allowedTabs.includes('security')) && (
                                    <TabsContent value="security" className="mt-0 focus-visible:outline-none">{activeTab === 'security' && <SecurityMonitor isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                )}
                                {(isSuperAdmin || allowedTabs.includes('system-config')) && (
                                    <TabsContent value="system-config" className="mt-0 focus-visible:outline-none">{activeTab === 'system-config' && <SystemConfig permissions={actionPermissions} isSuperAdmin={isSuperAdmin} />}</TabsContent>
                                )}
                                <TabsContent value="seo-health" className="mt-0 focus-visible:outline-none">{activeTab === 'seo-health' && <SEOHealthMonitor />}</TabsContent>
                                </Suspense>
                            </Tabs>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal remains same but with tightened layout */}
            {
                selectedSession && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
                        <div className="w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h2 className="text-xl font-bold">{selectedSession.title}</h2>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedSession(null)}><X className="w-5 h-5" /></Button>
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
                                            <Textarea
                                                placeholder="Enter reading passage if applicable..."
                                                value={currentQuestion.passage}
                                                onChange={e => setCurrentQuestion(prev => ({ ...prev, passage: e.target.value }))}
                                                className="h-32 text-xs"
                                            />
                                            {currentQuestion.passage && (
                                                <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Passage Preview (LaTeX)</p>
                                                    <MathText content={currentQuestion.passage} className="text-sm leading-relaxed" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400">Section <span className="text-red-500">*</span></Label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                                                value={currentQuestion.section_name}
                                                onChange={e => setCurrentQuestion(prev => ({ ...prev, section_name: e.target.value }))}
                                            >
                                                <option value="">Select Section...</option>
                                                {availableExams.find(e => e.slug === selectedSession?.exam_type)?.sections?.map((s: any) => (
                                                    <option key={s.name} value={s.name}>{s.name}</option>
                                                ))}
                                                <option value="General">General</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400">Question Text</Label>
                                            <Input placeholder="Question content..." value={currentQuestion.question_text} onChange={e => setCurrentQuestion(prev => ({ ...prev, question_text: e.target.value }))} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {currentQuestion.options.map((o, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <Button variant={currentQuestion.correct_index === i ? 'default' : 'outline'} className="w-10 h-10 shrink-0 font-bold" onClick={() => setCurrentQuestion(prev => ({ ...prev, correct_index: i }))}>{String.fromCharCode(65 + i)}</Button>
                                                    <Input value={o} placeholder="Option" onChange={e => {
                                                        setCurrentQuestion(prev => {
                                                            const n = [...prev.options]; n[i] = e.target.value;
                                                            return { ...prev, options: n };
                                                        });
                                                    }} />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400">Explanation (Optional)</Label>
                                            <Textarea
                                                placeholder="Explain why the correct option is right..."
                                                value={currentQuestion.explanation}
                                                onChange={e => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                                                className="h-24 text-xs"
                                            />
                                            {currentQuestion.explanation && (
                                                <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                                    <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Live Preview (LaTeX)</p>
                                                    <MathText content={currentQuestion.explanation} className="text-sm leading-relaxed" />
                                                </div>
                                            )}
                                        </div>

                                        <MediaEditor
                                            media={currentQuestion.media || null}
                                            onChange={(media) => setCurrentQuestion(prev => ({ ...prev, media }))}
                                        />

                                        <Button onClick={handleAddQuestionToList} className="w-full bg-slate-900 text-white h-12 rounded-xl">
                                            {editingQuestionIndex !== null ? 'Update Question' : 'Add to Buffer'}
                                        </Button>
                                        {editingQuestionIndex !== null && (
                                            <Button variant="ghost" className="w-full" onClick={() => {
                                                setEditingQuestionIndex(null);
                                                setCurrentQuestion({ question_text: '', options: ['', '', '', '', ''], correct_index: 0, passage: '', media: null, section_name: '' });
                                            }}>Cancel Edit</Button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <JsonImportGuide />
                                        <Textarea
                                            className="h-48 font-mono text-xs"
                                            value={jsonInput}
                                            onChange={e => setJsonInput(e.target.value)}
                                            placeholder='[{"question_text": "...", "section_name": "...", "options": ["...", "..."], "correct_index": 0, "explanation": "..."}]'
                                        />
                                        <Button
                                            onClick={handleJsonImport}
                                            className="w-full bg-slate-100 text-slate-900 border border-slate-200 hover:bg-slate-200 h-10 rounded-xl font-bold text-xs uppercase tracking-widest"
                                        >
                                            Parse & Add to Queue
                                        </Button>
                                    </div>
                                )}
                                <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-slate-800 dark:text-slate-200">Question Queue ({manualQuestions.length})</h3>
                                        <div className="flex gap-2">
                                            {manualQuestions.length > 0 && !isSequencingMode && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleDownloadSessionPDF(selectedSession, manualQuestions as any)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-black text-[10px] uppercase tracking-widest px-4 h-9"
                                                    >
                                                        <FileDown className="w-3 h-3 mr-2" />
                                                        Download PDF
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setIsSequencingMode(true);
                                                            setSequencingIndices([]);
                                                        }}
                                                        variant="outline"
                                                        size="sm"
                                                        className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 font-black text-[10px] uppercase tracking-widest px-4 h-9"
                                                    >
                                                        <Box className="w-3 h-3 mr-2" />
                                                        Manual Sequence
                                                    </Button>
                                                </div>
                                            )}
                                            {isSequencingMode && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => setSequencingIndices([])}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="rounded-xl text-slate-500 font-bold text-[10px] uppercase"
                                                    >
                                                        Reset
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setIsSequencingMode(false);
                                                            setSequencingIndices([]);
                                                        }}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="rounded-xl text-rose-500 font-bold text-[10px] uppercase"
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        disabled={sequencingIndices.length === 0}
                                                        onClick={() => {
                                                            const newQuestions = [...manualQuestions];
                                                            const reordered = [];
                                                            const usedIndices = new Set(sequencingIndices);

                                                            // Add sequenced items first
                                                            sequencingIndices.forEach(idx => {
                                                                reordered.push(newQuestions[idx]);
                                                            });

                                                            // Add remaining items
                                                            newQuestions.forEach((q, idx) => {
                                                                if (!usedIndices.has(idx)) {
                                                                    reordered.push(q);
                                                                }
                                                            });

                                                            setManualQuestions(reordered);
                                                            setIsSequencingMode(false);
                                                            setSequencingIndices([]);
                                                            toast({ title: "Sequence Applied", description: "Questions re-ordered according to your clicks." });
                                                        }}
                                                        variant="default"
                                                        size="sm"
                                                        className="rounded-xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest px-4 h-9"
                                                    >
                                                        Apply Order
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {manualQuestions.map((q, i) => {
                                            const seqIndex = sequencingIndices.indexOf(i);
                                            const isSequenced = seqIndex !== -1;
                                            const pbState = practiceBankToggleState[i] || { 
                                                isOpen: false, 
                                                isAdded: false, 
                                                isSubmitting: false,
                                                examId: '',
                                                subject: '',
                                                topic: '',
                                                difficulty: 'medium'
                                            };

                                            return (
                                                <div key={i} className="space-y-3">
                                                    <div
                                                        onClick={() => {
                                                            if (isSequencingMode && !isSequenced) {
                                                                setSequencingIndices([...sequencingIndices, i]);
                                                            }
                                                        }}
                                                        className={cn(
                                                            "p-3 rounded-xl flex justify-between items-center text-xs font-bold border transition-all",
                                                            isSequencingMode ? "cursor-pointer border-blue-100 hover:bg-blue-50/50" : "bg-slate-50 border-slate-100",
                                                            isSequenced && "bg-blue-50 border-blue-300 ring-2 ring-blue-100"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3 truncate max-w-[70%]">
                                                            {isSequencingMode && (
                                                                <div className={cn(
                                                                    "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border",
                                                                    isSequenced ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-300 border-slate-200"
                                                                )}>
                                                                    {isSequenced ? seqIndex + 1 : <Plus className="w-3 h-3" />}
                                                                </div>
                                                            )}
                                                            <span className="truncate">
                                                                {!isSequencingMode && `${i + 1}. `}
                                                                <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded ml-1 mr-2 tracking-wider">
                                                                    {q.section_name || 'General'}
                                                                </span>
                                                                {q.passage && <span className="text-indigo-500 font-black mr-2 text-[10px] shrink-0">[PASSAGE]</span>}
                                                                <span className="truncate mr-2">{q.question_text}</span>
                                                                <div className="flex gap-1.5 shrink-0">
                                                                    {q.media?.type === 'image' && <ImageIcon className="w-3 h-3 text-indigo-400" />}
                                                                    {(q.media?.type === 'chart' || q.media?.type === 'graph' || q.media?.type === 'pie') && <Activity className="w-3 h-3 text-emerald-400" />}
                                                                    {q.media?.type === 'table' && <TableIcon className="w-3 h-3 text-amber-400" />}
                                                                    {q.media?.type === 'diagram' && <Layers className="w-3 h-3 text-rose-400" />}
                                                                </div>
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            {!isSequencingMode && (
                                                                <>
                                                                    <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-100 rounded-lg">
                                                                        <Label className="text-[9px] font-black uppercase tracking-tighter text-slate-400">Add to Bank</Label>
                                                                        <Switch 
                                                                            checked={pbState.isAdded || pbState.isOpen} 
                                                                            disabled={pbState.isSubmitting}
                                                                            onCheckedChange={(val) => {
                                                                                if (!val && pbState.isAdded) {
                                                                                    handleRemoveFromPracticeBank(i);
                                                                                    return;
                                                                                }

                                                                                const exam = availableExams.find(ex => ex.slug === selectedSession?.exam_type) || availableExams[0];
                                                                                const subject = exam?.sections?.find((s: any) => s.name === q.section_name)?.name || exam?.sections?.[0]?.name || '';
                                                                                const topic = exam?.syllabus?.[subject]?.[0]?.name || '';
                                                                                setPracticeBankToggleState(prev => ({
                                                                                    ...prev,
                                                                                    [i]: { 
                                                                                        isOpen: val, 
                                                                                        examId: exam?.slug || '', 
                                                                                        subject, 
                                                                                        topic, 
                                                                                        difficulty: 'medium', 
                                                                                        isSubmitting: false,
                                                                                        isAdded: prev[i]?.isAdded,
                                                                                        insertedId: prev[i]?.insertedId
                                                                                    }
                                                                                }));
                                                                            }} 
                                                                        />
                                                                        {pbState.isAdded && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                                                    </div>
                                                                    <div className="flex gap-1">
                                                                        <Button variant="ghost" className="h-8 w-8 text-indigo-500" onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setEditingQuestionIndex(i);
                                                                            setCurrentQuestion(manualQuestions[i]);
                                                                            document.querySelector('.space-y-6')?.scrollTo({ top: 0, behavior: 'smooth' });
                                                                        }}><PencilLine className="w-4 h-4" /></Button>
                                                                        <Button variant="ghost" className="h-8 w-8 text-rose-500" onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setManualQuestions(manualQuestions.filter((_, idx) => idx !== i));
                                                                        }}><Trash2 className="w-4 h-4" /></Button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {pbState.isOpen && (
                                                        <motion.div 
                                                            initial={{ height: 0, opacity: 0 }} 
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-wrap gap-4 items-end"
                                                        >
                                                            <div className="space-y-1.5">
                                                                <Label className="text-[8px] font-black uppercase text-indigo-400 tracking-widest ml-1">Exam</Label>
                                                                <select 
                                                                    value={pbState.examId} 
                                                                    onChange={e => {
                                                                        const exam = availableExams.find(ex => ex.slug === e.target.value);
                                                                        const subject = exam?.sections?.[0]?.name || '';
                                                                        const topic = exam?.syllabus?.[subject]?.[0]?.name || '';
                                                                        setPracticeBankToggleState(prev => ({
                                                                            ...prev,
                                                                            [i]: { ...prev[i], examId: e.target.value, subject, topic }
                                                                        }));
                                                                    }}
                                                                    className="h-8 rounded-lg border border-indigo-100 bg-white px-3 text-[10px] font-bold"
                                                                >
                                                                    {availableExams.map(ex => <option key={ex.id} value={ex.slug}>{ex.name}</option>)}
                                                                </select>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label className="text-[8px] font-black uppercase text-indigo-400 tracking-widest ml-1">Subject</Label>
                                                                <select 
                                                                    value={pbState.subject} 
                                                                    onChange={e => {
                                                                        const exam = availableExams.find(ex => ex.slug === pbState.examId);
                                                                        const topic = exam?.syllabus?.[e.target.value]?.[0]?.name || '';
                                                                        setPracticeBankToggleState(prev => ({
                                                                            ...prev,
                                                                            [i]: { ...prev[i], subject: e.target.value, topic }
                                                                        }));
                                                                    }}
                                                                    className="h-8 rounded-lg border border-indigo-100 bg-white px-3 text-[10px] font-bold"
                                                                >
                                                                    {availableExams.find(ex => ex.slug === pbState.examId)?.sections?.map((s: any) => <option key={s.name} value={s.name}>{s.name}</option>)}
                                                                </select>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label className="text-[8px] font-black uppercase text-indigo-400 tracking-widest ml-1">Topic</Label>
                                                                <select 
                                                                    value={pbState.topic} 
                                                                    onChange={e => setPracticeBankToggleState(prev => ({ ...prev, [i]: { ...prev[i], topic: e.target.value } }))}
                                                                    className="h-8 max-w-[150px] rounded-lg border border-indigo-100 bg-white px-3 text-[10px] font-bold"
                                                                >
                                                                    {availableExams.find(ex => ex.slug === pbState.examId)?.syllabus?.[pbState.subject]?.map((t: any) => <option key={t.name} value={t.name}>{t.name}</option>)}
                                                                </select>
                                                            </div>
                                                            <div className="space-y-1.5">
                                                                <Label className="text-[8px] font-black uppercase text-indigo-400 tracking-widest ml-1">Level</Label>
                                                                <select 
                                                                    value={pbState.difficulty} 
                                                                    onChange={e => setPracticeBankToggleState(prev => ({ ...prev, [i]: { ...prev[i], difficulty: e.target.value } }))}
                                                                    className="h-8 rounded-lg border border-indigo-100 bg-white px-3 text-[10px] font-bold"
                                                                >
                                                                    <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                                                                </select>
                                                            </div>
                                                            <Button 
                                                                onClick={() => handleAddToPracticeBank(q, i)} 
                                                                disabled={pbState.isSubmitting}
                                                                className="h-8 bg-indigo-600 text-white rounded-lg px-4 text-[10px] font-black uppercase tracking-widest"
                                                            >
                                                                {pbState.isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Add Point'}
                                                            </Button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8">
                                        <Button onClick={handleSaveQuestions} disabled={isSubmitting} className="w-full bg-emerald-600 text-white h-14 rounded-2xl shadow-lg">Finalize & Sync to Server</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {pdfProgressMessage && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md"
                        >
                            <motion.div 
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="bg-white rounded-3xl p-8 shadow-2xl border border-white/20 flex flex-col items-center max-w-sm w-full mx-4"
                            >
                                <div className="relative w-20 h-20 mb-6">
                                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent"
                                    />
                                    <FileDown className="absolute inset-0 m-auto w-8 h-8 text-indigo-600" />
                                </div>
                                
                                <h3 className="text-xl font-black text-slate-900 mb-2">Generating PDF</h3>
                                <p className="text-sm font-medium text-slate-500 text-center animate-pulse">
                                    {pdfProgressMessage}
                                </p>
                                
                                <div className="mt-8 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-full h-full bg-indigo-600"
                                    />
                                </div>
                                
                                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                                    Do not close this window
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </Layout>
    );
};
