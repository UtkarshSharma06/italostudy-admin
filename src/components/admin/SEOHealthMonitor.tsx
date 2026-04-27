import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    RefreshCw,
    ExternalLink,
    ShieldAlert,
    Link as LinkIcon,
    Trash2,
    Loader2,
    Search,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    Wrench,
    Zap,
    ShieldCheck,
    Globe,
    Terminal,
    Clock
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SEOIssue {
    issue_type: 'duplicate_slug' | 'canonical_mismatch' | 'redirect_loop';
    origin_table: string;
    row_id: string;
    display_name: string;
    current_value: string;
    expected_path: string;
    issue_description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
}

interface Redirect {
    id: string;
    source_path: string;
    target_path: string;
    status_code: number;
    is_active: boolean;
    created_at: string;
}

interface HealthLog {
    id: string;
    event_type: 'error' | 'ping' | 'performance';
    severity: string;
    url: string;
    message: string;
    metadata: any;
    created_at: string;
}

const ITEMS_PER_PAGE = 10;

export default function SEOHealthMonitor() {
    const [issues, setIssues] = useState<SEOIssue[]>([]);
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPulsing, setIsPulsing] = useState(false);
    const [activeTab, setActiveTab] = useState('audit');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Pagination State
    const [auditPage, setAuditPage] = useState(1);
    const [redirectPage, setRedirectPage] = useState(1);
    const [stabilityPage, setStabilityPage] = useState(1);
    
    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch SEO Issues from view
            const { data: auditData, error: auditError } = await supabase
                .from('seo_health_report' as any)
                .select('*');

            if (auditError) throw auditError;
            setIssues((auditData as any) || []);

            // Fetch Redirects
            const { data: redirectData, error: redirectError } = await supabase
                .from('url_redirects' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (redirectError) throw redirectError;
            setRedirects((redirectData as any) || []);

            // Fetch Stability Logs
            const { data: logsData, error: logsError } = await supabase
                .from('site_health_logs' as any)
                .select('*')
                .order('created_at', { ascending: false })
                .limit(100);

            if (!logsError) setHealthLogs((logsData as any) || []);

        } catch (error: any) {
            toast({
                title: "Sync Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const runPulseCheck = async () => {
        setIsPulsing(true);
        toast({ title: "Initiating Global Pulse", description: "Verifying core route accessibility..." });
        
        const coreRoutes = [
            // Core Cluster
            { name: 'Home', path: '/' },
            { name: 'Italy Home', path: '/it' },
            { name: 'Turkey Home', path: '/tr' },
            { name: 'Auth Portal', path: '/auth' },
            { name: 'Onboarding', path: '/onboarding' },
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Community', path: '/community' },
            { name: 'Community Upgrade', path: '/community/upgrade' },
            { name: 'Subjects', path: '/subjects' },
            { name: 'Practice', path: '/practice' },
            { name: 'Mock Exams', path: '/mock-exams' },
            { name: 'Analytics', path: '/analytics' },
            { name: 'Admin', path: '/admin' },
            { name: 'History', path: '/history' },
            { name: 'Settings', path: '/settings' },
            { name: 'Billing', path: '/billing' },
            { name: 'Bookmarks', path: '/bookmarks' },
            { name: 'Pricing', path: '/pricing' },
            { name: 'Study Planner', path: '/study-planner' },
            { name: 'Mock Guidelines', path: '/mock-guidelines' },
            { name: 'Study Labs', path: '/labs' },
            
            // Store Cluster
            { name: 'Store Main', path: '/store' },
            { name: 'All Products', path: '/store/products' },
            { name: 'My Orders', path: '/store/orders' },
            { name: 'Store Admin', path: '/store-admin' },
            
            // Educational Cluster
            { name: 'Institutional', path: '/institutional' },
            { name: 'Syllabus Main', path: '/syllabus' },
            { name: 'Get Admission', path: '/get-admission' },
            { name: 'Education Portal', path: '/learning' },
            { name: 'Reading History', path: '/reading/history' },
            { name: 'Listening History', path: '/listening/history' },
            { name: 'Writing History', path: '/writing/history' },
            { name: 'Speaking Lobby', path: '/speaking' },
            { name: 'Speaking History', path: '/speaking/history' },
            
            // Authority Cluster - CEnT-S
            { name: 'CEnT-S Ultimate Guide', path: '/cent-s-exam-ultimate-guide' },
            { name: 'CEnT-S Syllabus', path: '/cent-s-syllabus-2026' },
            { name: 'CEnT-S Pattern', path: '/cent-s-exam-pattern-2026' },
            { name: 'CEnT-S Cutoff', path: '/cent-s-cutoff-2026' },
            { name: 'CEnT-S Free Mock', path: '/cent-s-mock-test-free-2026' },
            { name: 'CEnT-S Papers', path: '/cent-s-previous-year-papers-pdf' },
            { name: 'CEnT-S Strategy', path: '/cent-s-preparation-strategy-2026' },
            { name: 'CEnT-S Books', path: '/best-books-for-cent-s-2026' },
            { name: 'CEnT-S Eligibility', path: '/cent-s-eligibility-criteria' },
            { name: 'CEnT-S Registration', path: '/cent-s-registration-process-2026' },
            { name: 'CEnT-S Dates', path: '/cent-s-important-dates-2026' },
            { name: 'CEnT-S Difficulty', path: '/cent-s-difficulty-level-analysis' },
            { name: 'CEnT-S Passing Score', path: '/cent-s-passing-score-explained' },

            // Authority Cluster - IMAT
            { name: 'IMAT Ultimate Guide', path: '/imat-exam-ultimate-guide-2026' },
            { name: 'IMAT Syllabus', path: '/imat-syllabus-2026' },
            { name: 'IMAT Dates', path: '/imat-exam-dates-2026' },
            { name: 'IMAT Registration', path: '/imat-registration-2026' },
            { name: 'IMAT Strategy', path: '/imat-preparation-strategy-2026' },
            { name: 'IMAT vs CEnT-S', path: '/imat-vs-cents-2026' },
            { name: 'IMAT Books', path: '/imat-best-books-2026' },
            { name: 'IMAT Cutoff', path: '/imat-cutoff-trends-2026' },
            { name: 'IMAT Difficulty', path: '/imat-difficulty-analysis-2026' },
            { name: 'IMAT Eligibility', path: '/imat-eligibility-criteria-2026' },
            { name: 'IMAT Free Mock', path: '/imat-mock-test-free-2026' },
            { name: 'IMAT Passing Score', path: '/imat-passing-score-explained-2026' },
            { name: 'IMAT Pattern', path: '/imat-exam-pattern-2026' },
            { name: 'IMAT Papers', path: '/imat-previous-year-papers-pdf' },

            // Authority Cluster - Study in Italy
            { name: 'Italy Guide', path: '/study-in-italy-guide-2026' },
            { name: 'Italy Universities', path: '/study-in-italy/universities-2026' },
            { name: 'Italy w/o IELTS', path: '/study-in-italy/without-ielts' },
            { name: 'Italy Tuition', path: '/study-in-italy/tuition-fees-2026' },
            { name: 'Italy Application', path: '/study-in-italy/how-to-apply' },

            // External Cluster
            { name: 'Apply University', path: '/apply-university' },
            { name: 'Consultant Dashboard', path: '/consultant/dashboard' },
            { name: 'Download App', path: '/download-app' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Privacy', path: '/privacy' },
            { name: 'Terms', path: '/terms' },
            { name: 'Refund', path: '/refund' }
        ];

        try {
            for (const route of coreRoutes) {
                const startTime = performance.now();
                let status = 200;
                let success = true;

                try {
                    const resp = await fetch(route.path, { method: 'HEAD' });
                    status = resp.status;
                    success = resp.ok;
                } catch (e) {
                    status = 0;
                    success = false;
                }

                const duration = Math.round(performance.now() - startTime);

                await supabase.rpc('log_site_health_event' as any, {
                    p_event_type: 'ping',
                    p_severity: success ? 'low' : 'critical',
                    p_url: route.path,
                    p_message: success ? `Pulse Check: OK (${status})` : `Pulse Check: FAILED (${status})`,
                    p_metadata: { duration_ms: duration, status, route_name: route.name }
                });
            }

            toast({ title: "Pulse Check Complete", description: "All routes verified. Check stability logs for details." });
            fetchData();
        } catch (error: any) {
            toast({ title: "Pulse Failed", description: error.message, variant: "destructive" });
        } finally {
            setIsPulsing(false);
        }
    };

    const handleFixSlug = async (issue: SEOIssue) => {
        const newSlug = window.prompt(`Enter new slug for "${issue.display_name}":`, issue.current_value);
        if (!newSlug || newSlug === issue.current_value) return;

        try {
            const { error } = await supabase.rpc('update_content_slug' as any, {
                target_table: issue.origin_table,
                target_id: issue.row_id,
                new_slug: newSlug
            });

            if (error) throw error;

            toast({
                title: "Slug Updated",
                description: "New 301 redirect created automatically. 🚀",
            });
            fetchData();
        } catch (error: any) {
            toast({ title: "Fix failed", description: error.message, variant: "destructive" });
        }
    };

    const handleFixCanonical = async (issue: SEOIssue) => {
        try {
            const { error } = await supabase.rpc('fix_canonical_url' as any, {
                target_id: issue.row_id,
                new_canonical: issue.expected_path
            });

            if (error) throw error;

            toast({
                title: "Canonical Synced",
                description: "Canonical URL now matches the actual content path.",
            });
            fetchData();
        } catch (error: any) {
            toast({ title: "Fix failed", description: error.message, variant: "destructive" });
        }
    };

    const handleDeleteRedirect = async (id: string) => {
        if (!confirm("Remove this redirect rule?")) return;
        try {
            const { error } = await supabase.from('url_redirects' as any).delete().eq('id', id);
            if (error) throw error;
            toast({ title: "Redirect Removed" });
            fetchData();
        } catch (error: any) {
            toast({ title: "Delete failed", description: error.message, variant: "destructive" });
        }
    };

    // Filtered & Paginated Data
    const filteredIssues = useMemo(() => 
        issues.filter(i => 
            i.display_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            i.issue_type.toLowerCase().includes(searchTerm.toLowerCase())
        ), [issues, searchTerm]
    );

    const filteredRedirects = useMemo(() => 
        redirects.filter(r => 
            r.source_path.toLowerCase().includes(searchTerm.toLowerCase()) || 
            r.target_path.toLowerCase().includes(searchTerm.toLowerCase())
        ), [redirects, searchTerm]
    );

    const pagedIssues = filteredIssues.slice((auditPage - 1) * ITEMS_PER_PAGE, auditPage * ITEMS_PER_PAGE);
    const pagedRedirects = filteredRedirects.slice((redirectPage - 1) * ITEMS_PER_PAGE, redirectPage * ITEMS_PER_PAGE);
    const pagedStability = healthLogs.slice((stabilityPage - 1) * ITEMS_PER_PAGE, stabilityPage * ITEMS_PER_PAGE);

    const healthScore = Math.max(0, 100 - (issues.length * 5));
    const healthColor = healthScore > 90 ? 'text-emerald-500' : healthScore > 70 ? 'text-amber-500' : 'text-rose-500';

    return (
        <div className="max-w-full overflow-x-hidden space-y-8 pb-20 px-1">
            {/* Header / Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Activity className="w-40 h-40" />
                </div>
                
                <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10 text-center lg:text-left">
                    <div className="relative shrink-0">
                        <svg className="w-28 h-28 lg:w-36 lg:h-36 transform -rotate-90">
                            <circle cx="56" cy="56" r="50" className="lg:hidden text-slate-100 dark:text-slate-800" stroke="currentColor" strokeWidth="10" fill="transparent" />
                            <circle cx="72" cy="72" r="66" className="hidden lg:block text-slate-100 dark:text-slate-800" stroke="currentColor" strokeWidth="12" fill="transparent" />
                            
                            {/* Mobile Ring */}
                            <circle 
                                cx="56" cy="56" r="50" className={cn("lg:hidden transition-all duration-1000 ease-out", healthColor)} 
                                stroke="currentColor" strokeWidth="10" fill="transparent" 
                                strokeDasharray="314.15" 
                                strokeDashoffset={314.15 - (314.15 * healthScore / 100)} 
                            />
                            {/* Desktop Ring */}
                            <circle 
                                cx="72" cy="72" r="66" className={cn("hidden lg:block transition-all duration-1000 ease-out", healthColor)} 
                                stroke="currentColor" strokeWidth="12" fill="transparent" 
                                strokeDasharray="414.69" 
                                strokeDashoffset={414.69 - (414.69 * healthScore / 100)} 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={cn("text-2xl lg:text-4xl font-black", healthColor)}>{healthScore}</span>
                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Global Health</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-5">
                        <div className="space-y-1">
                            <h1 className="text-2xl lg:text-4xl font-black text-slate-900 dark:text-white flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                SEO & Stability Pulse
                                <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 rounded-full font-black text-[9px] uppercase px-3 py-1">Guardian Mode</Badge>
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-xl leading-relaxed text-sm">
                                Real-time monitoring of slug integrity, canonical health, and system-wide runtime errors.
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                                <ShieldAlert className={cn("w-4 h-4", issues.length > 0 ? "text-amber-500" : "text-emerald-500")} />
                                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">SEO Alerts</span>
                                <span className="text-xs font-black text-slate-900 dark:text-white">{issues.length}</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                                <Globe className="w-4 h-4 text-emerald-500" />
                                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Site Status</span>
                                <span className="text-xs font-black text-emerald-500">Online</span>
                            </div>
                            <div className="h-10 w-px bg-slate-100 dark:bg-slate-800 mx-2 hidden lg:block" />
                            <Button 
                                variant="outline" 
                                className="rounded-2xl h-11 px-6 font-black uppercase text-[10px] tracking-widest gap-2 bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:text-white"
                                onClick={runPulseCheck}
                                disabled={isPulsing}
                            >
                                {isPulsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                                Run Global Pulse
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs defaultValue="audit" className="w-full no-tabs-list" onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
                        <TabsList className="bg-transparent h-10 gap-1 p-0 flex-nowrap">
                            <TabsTrigger value="audit" className="rounded-xl px-5 font-black text-[9px] whitespace-nowrap uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white">Audit</TabsTrigger>
                            <TabsTrigger value="stability" className="rounded-xl px-5 font-black text-[9px] whitespace-nowrap uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white">Stability Logs</TabsTrigger>
                            <TabsTrigger value="redirects" className="rounded-xl px-5 font-black text-[9px] whitespace-nowrap uppercase tracking-widest data-[state=active]:bg-slate-900 data-[state=active]:text-white">Redirects</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="relative group w-full md:w-64 shrink-0">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <Input 
                            placeholder="Filter events..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-11 h-12 w-full rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs font-bold focus-visible:ring-2 focus-visible:ring-indigo-500/20" 
                        />
                    </div>
                </div>

                {/* Audit Tab */}
                <TabsContent value="audit" className="mt-0 space-y-6 focus-visible:outline-none">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-40">
                            <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Crawling Metadata...</p>
                        </div>
                    ) : pagedIssues.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 py-32 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto">
                                <ShieldCheck className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">SEO Optimized</h3>
                            <p className="text-slate-400 font-bold text-sm">No duplicate slugs or canonical errors detected. 🎉</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-4">
                                {pagedIssues.map((issue, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        key={issue.severity + issue.row_id + idx} 
                                        className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all"
                                    >
                                        <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border",
                                                issue.severity === 'critical' ? "bg-rose-50 border-rose-100 text-rose-500" :
                                                issue.severity === 'high' ? "bg-amber-50 border-amber-100 text-amber-500" :
                                                "bg-indigo-50 border-indigo-100 text-indigo-500"
                                            )}>
                                                {issue.issue_type === 'duplicate_slug' ? <LinkIcon className="w-6 h-6" /> : <RefreshCw className="w-6 h-6" />}
                                            </div>
                                            
                                            <div className="space-y-1.5 flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="rounded-full text-[8px] font-black uppercase px-2 bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400">{issue.origin_table}</Badge>
                                                    <Badge className={cn(
                                                        "rounded-full text-[8px] font-black uppercase px-2",
                                                        issue.severity === 'critical' ? "bg-rose-50 text-rose-600" : "bg-indigo-50 text-indigo-600"
                                                    )}>{issue.severity}</Badge>
                                                </div>
                                                <h4 className="text-lg font-black text-slate-900 dark:text-white truncate">{issue.display_name}</h4>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2 truncate">
                                                        Current: <span className="font-mono text-rose-500">{issue.current_value || 'None'}</span>
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-2 truncate">
                                                        Ideal: <span className="font-mono text-emerald-500">{issue.expected_path}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex-shrink-0" onClick={() => window.open(issue.expected_path, '_blank')}>
                                                <ExternalLink className="w-5 h-5 text-slate-400" />
                                            </Button>
                                            <Button 
                                                className="rounded-2xl h-12 px-6 flex-1 md:flex-none font-black text-[10px] uppercase tracking-widest gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 transition-all shadow-lg"
                                                onClick={() => issue.issue_type === 'duplicate_slug' ? handleFixSlug(issue) : handleFixCanonical(issue)}
                                            >
                                                <Wrench className="w-4 h-4" />
                                                Fix Now
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Pagination */}
                            <div className="flex items-center justify-center gap-4 py-4">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    disabled={auditPage === 1}
                                    onClick={() => setAuditPage(prev => prev - 1)}
                                    className="rounded-xl font-black text-[10px] uppercase gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </Button>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-xl">
                                    Page {auditPage} / {Math.ceil(filteredIssues.length / ITEMS_PER_PAGE)}
                                </span>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    disabled={auditPage >= Math.ceil(filteredIssues.length / ITEMS_PER_PAGE)}
                                    onClick={() => setAuditPage(prev => prev + 1)}
                                    className="rounded-xl font-black text-[10px] uppercase gap-2"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </TabsContent>

                {/* Stability Logs Tab */}
                <TabsContent value="stability" className="mt-0 space-y-6 focus-visible:outline-none">
                    {pagedStability.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 py-32 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 text-center">
                             <Terminal className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                             <p className="text-slate-400 font-bold">No stability events recorded yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[800px]">
                                        <thead>
                                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Type</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Route / URL</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Event Message</th>
                                                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                            {pagedStability.map((log) => (
                                                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        {log.event_type === 'error' ? (
                                                            <Badge className="bg-rose-50 text-rose-600 rounded-lg text-[8px] font-black px-2 py-1 uppercase border-rose-100">Crash</Badge>
                                                        ) : (
                                                            <Badge className="bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black px-2 py-1 uppercase border-emerald-100">Pulse</Badge>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-[11px] font-bold font-mono text-slate-600 dark:text-slate-400 truncate max-w-[200px] inline-block">{log.url}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{log.message}</p>
                                                            {log.metadata?.duration_ms && <p className="text-[9px] font-black text-indigo-500 uppercase">{log.metadata.duration_ms}ms Latency</p>}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                                                        {format(new Date(log.created_at), 'MMM dd, HH:mm:ss')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Stability Pagination */}
                            <div className="flex items-center justify-center gap-4 py-4">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    disabled={stabilityPage === 1}
                                    onClick={() => setStabilityPage(prev => prev - 1)}
                                    className="rounded-xl font-black text-[10px] uppercase gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </Button>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-xl">
                                    Page {stabilityPage} / {Math.ceil(healthLogs.length / ITEMS_PER_PAGE)}
                                </span>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    disabled={stabilityPage >= Math.ceil(healthLogs.length / ITEMS_PER_PAGE)}
                                    onClick={() => setStabilityPage(prev => prev + 1)}
                                    className="rounded-xl font-black text-[10px] uppercase gap-2"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* Redirects Tab */}
                <TabsContent value="redirects" className="mt-0 space-y-6 focus-visible:outline-none">
                    {filteredRedirects.length === 0 ? (
                        <div className="bg-white dark:bg-slate-900 py-32 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 text-center">
                             <LinkIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                             <p className="text-slate-400 font-bold">No active redirects found.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pagedRedirects.map((redirect, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.03 }}
                                        key={redirect.id + idx} 
                                        className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative group overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 rounded-lg text-[9px] font-black px-2.5 py-1 uppercase">{redirect.status_code} Redirect</Badge>
                                            <button 
                                                onClick={() => handleDeleteRedirect(redirect.id)}
                                                className="p-2 hover:bg-rose-50 rounded-xl transition-colors text-slate-300 hover:text-rose-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Source Path</p>
                                                <p className="text-[11px] font-bold font-mono text-slate-600 dark:text-slate-400 truncate bg-slate-50 dark:bg-slate-800 p-2 rounded-xl border border-slate-100/50 dark:border-slate-700/30">{redirect.source_path}</p>
                                            </div>
                                            <div className="flex justify-center py-1">
                                                <ArrowRight className="w-4 h-4 text-slate-200" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Destination</p>
                                                <p className="text-[11px] font-bold font-mono text-indigo-600 dark:text-indigo-400 truncate bg-indigo-50/30 dark:bg-indigo-900/20 p-2 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30">{redirect.target_path}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Redirects Pagination */}
                            <div className="flex items-center justify-center gap-4 py-4">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    disabled={redirectPage === 1}
                                    onClick={() => setRedirectPage(prev => prev - 1)}
                                    className="rounded-xl font-black text-[10px] uppercase gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </Button>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-xl">
                                    Page {redirectPage} / {Math.ceil(filteredRedirects.length / ITEMS_PER_PAGE)}
                                </span>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    disabled={redirectPage >= Math.ceil(filteredRedirects.length / ITEMS_PER_PAGE)}
                                    onClick={() => setRedirectPage(prev => prev + 1)}
                                    className="rounded-xl font-black text-[10px] uppercase gap-2"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

