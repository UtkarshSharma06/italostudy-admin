import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EXAMS } from '@/config/exams';
import {
    Trophy,
    Users,
    TrendingUp,
    CheckCircle,
    Clock,
    Award,
    Medal,
    Loader2,
    ChevronDown,
    ChevronUp,
    RefreshCw
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface MockSession {
    id: string;
    title: string;
    start_time: string;
    end_time: string;
    exam_type: string;
}

interface Submission {
    id: string;
    user_id: string;
    overall_band?: number;
    score?: number; // For non-IELTS (percentage)
    raw_score?: number; // Actual points earned
    max_score?: number; // Maximum possible points
    reading_band?: number;
    listening_band?: number;
    writing_band?: number;
    status: string;
    correct_answers?: number;
    wrong_answers?: number;
    skipped_answers?: number;
    started_at: string;
    completed_at?: string;
    exam_type?: string;
    time_taken_seconds?: number;
    profiles: {
        display_name: string;
        email: string;
    };
}

export default function MockResultsViewer() {
    const { toast } = useToast();
    const [sessions, setSessions] = useState<MockSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string>('');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const selectedSession = sessions.find(s => s.id === selectedSessionId);

    useEffect(() => {
        fetchSessions();
    }, []);

    useEffect(() => {
        if (selectedSessionId) {
            fetchSubmissions();
            setCurrentPage(1);
        }
    }, [selectedSessionId, selectedSession?.exam_type]);

    const fetchSessions = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('mock_sessions')
                .select('id, title, start_time, end_time, exam_type')
                .order('start_time', { ascending: false });

            if (error) throw error;
            setSessions(data || []);

            // Auto-select the most recent session
            if (data && data.length > 0) {
                setSelectedSessionId(data[0].id);
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubmissions = async () => {
        if (!selectedSessionId) return;

        const currentSession = sessions.find(s => s.id === selectedSessionId);
        if (!currentSession) return;

        setIsLoading(true);
        try {
            if (currentSession.exam_type === 'ielts-academic') {
                const { data, error } = await supabase
                    .from('mock_exam_submissions')
                    .select(`
                        *,
                        profiles(display_name, email)
                    `)
                    .eq('session_id', selectedSessionId)
                    .order('overall_band', { ascending: false, nullsFirst: false });

                if (error) throw error;

                // Group by user and take best attempt
                const bestAttemptsMap = new Map<string, any>();
                (data || []).forEach(item => {
                    const existing = bestAttemptsMap.get(item.user_id);
                    const currentScore = item.overall_band || 0;
                    const existingScore = existing?.overall_band || 0;

                    if (!existing || currentScore > existingScore) {
                        bestAttemptsMap.set(item.user_id, item);
                    }
                });

                const deduplicated = Array.from(bestAttemptsMap.values())
                    .sort((a, b) => (b.overall_band || 0) - (a.overall_band || 0));

                setSubmissions(deduplicated as any[] as Submission[]);
            } else {
                // For non-IELTS exams, fetch from 'tests' table
                const { data, error } = await supabase
                    .from('tests')
                    .select(`
                        *,
                        profiles(display_name, email)
                    `)
                    .eq('session_id', selectedSessionId)
                    .order('score', { ascending: false, nullsFirst: false });

                if (error) throw error;

                // Group by user and take best attempt
                const bestAttemptsMap = new Map<string, any>();
                (data || []).forEach(item => {
                    const existing = bestAttemptsMap.get(item.user_id);
                    const currentScore = item.score || 0;
                    const existingScore = existing?.score || 0;

                    // Tie-breaker: faster time wins
                    const currentTime = (item as any).time_taken_seconds || 999999;
                    const existingTime = (existing as any)?.time_taken_seconds || 999999;

                    if (!existing || currentScore > existingScore || (currentScore === existingScore && currentTime < existingTime)) {
                        bestAttemptsMap.set(item.user_id, item);
                    }
                });

                const deduplicated = Array.from(bestAttemptsMap.values())
                    .sort((a, b) => {
                        const scoreDiff = (b.score || 0) - (a.score || 0);
                        if (scoreDiff !== 0) return scoreDiff;
                        return (a.time_taken_seconds || 0) - (b.time_taken_seconds || 0);
                    });

                // Calculate raw scores for each submission
                const submissionsWithRawScores = await Promise.all(
                    deduplicated.map(async (t: any) => {
                        // Get exam config to calculate raw score
                        const examId = t.exam_type || currentSession.exam_type;
                        const normalizedExamId = examId === 'cent-s' ? 'cent-s-prep' : (examId === 'imat' ? 'imat-prep' : examId);
                        const examConfig = EXAMS[normalizedExamId];

                        let rawScore = 0;
                        let maxScore = 0;
                        let questionsCount = 0;

                        if (examConfig) {
                            try {
                                // Calculate raw score using the pre-aggregated counts in the test record
                                // This is more robust than fetching questions individually
                                const correct = t.correct_answers || 0;
                                const wrong = t.wrong_answers || 0;
                                const skipped = t.skipped_answers || 0;
                                const total = t.total_questions || (correct + wrong + skipped);

                                questionsCount = total;
                                maxScore = total * examConfig.scoring.correct;

                                rawScore = (correct * examConfig.scoring.correct) +
                                    (wrong * examConfig.scoring.incorrect) +
                                    (skipped * examConfig.scoring.skipped);

                                console.log(`🔢 CALC: ${t.profiles?.display_name || 'User'} - C:${correct} W:${wrong} S:${skipped} -> Raw:${rawScore.toFixed(2)}`);
                            } catch (err) {
                                console.error(`Exception calculating raw score for test ${t.id}:`, err);
                            }
                        }

                        const result = {
                            ...t,
                            started_at: t.started_at,
                            overall_band: t.score, // Percentage score
                            raw_score: Number(rawScore.toFixed(2)),
                            max_score: maxScore,
                            exam_type: examId
                        };

                        return result;
                    })
                );

                setSubmissions(submissionsWithRawScores as Submission[]);
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    const completedSubmissions = submissions.filter(s => s.status === 'completed');
    const uniqueParticipants = new Set(submissions.map(s => s.user_id)).size;

    const averageScore = completedSubmissions.length > 0
        ? completedSubmissions.reduce((sum, s) => sum + (s.overall_band || 0), 0) / completedSubmissions.length
        : 0;
    const highestScore = completedSubmissions.length > 0
        ? Math.max(...completedSubmissions.map(s => s.overall_band || 0))
        : 0;
    const completionRate = submissions.length > 0
        ? (completedSubmissions.length / submissions.length) * 100
        : 0;

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
        if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
        return <span className="text-sm font-bold text-slate-400">#{rank}</span>;
    };


    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Mock Exam Results</h2>
                    <p className="text-sm text-slate-500 font-medium">View participant scores and rankings</p>
                </div>

                <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
                    <SelectTrigger className="w-full md:w-[350px] rounded-xl border-slate-200">
                        <SelectValue placeholder="Select a mock session" />
                    </SelectTrigger>
                    <SelectContent>
                        {sessions.map((session) => (
                            <SelectItem key={session.id} value={session.id}>
                                {session.title} - {new Date(session.start_time).toLocaleDateString()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button 
                    variant="outline" 
                    className="rounded-xl border-slate-200 h-10 px-4"
                    onClick={fetchSubmissions}
                    disabled={isLoading || !selectedSessionId}
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                    Refresh
                </Button>
            </div>


            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            ) : !selectedSessionId ? (
                <Card className="p-12 text-center">
                    <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">No Sessions Available</h3>
                    <p className="text-slate-500">Create a mock session to view results.</p>
                </Card>
            ) : (
                <>
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                            <div className="flex items-center justify-between mb-2">
                                <Users className="w-5 h-5 text-indigo-600" />
                                <span className="text-2xl font-black text-indigo-600">{uniqueParticipants}</span>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-600">Total Participants</p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
                            <div className="flex items-center justify-between mb-2">
                                <CheckCircle className="w-5 h-5 text-emerald-600" />
                                <span className="text-2xl font-black text-emerald-600">{completedSubmissions.length}</span>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-600">Completed</p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
                            <div className="flex items-center justify-between mb-2">
                                <TrendingUp className="w-5 h-5 text-amber-600" />
                                <span className="text-2xl font-black text-amber-600">
                                    {sessions.find(s => s.id === selectedSessionId)?.exam_type === 'ielts-academic'
                                        ? averageScore.toFixed(1)
                                        : Math.round(averageScore)}
                                </span>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-600">
                                Average {sessions.find(s => s.id === selectedSessionId)?.exam_type === 'ielts-academic' ? 'Band' : 'Score'}
                            </p>
                        </Card>

                        <Card className="p-6 bg-gradient-to-br from-violet-50 to-white border-violet-100">
                            <div className="flex items-center justify-between mb-2">
                                <Trophy className="w-5 h-5 text-violet-600" />
                                <span className="text-2xl font-black text-violet-600">
                                    {sessions.find(s => s.id === selectedSessionId)?.exam_type === 'ielts-academic'
                                        ? highestScore.toFixed(1)
                                        : highestScore}
                                </span>
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest text-slate-600">
                                Highest {sessions.find(s => s.id === selectedSessionId)?.exam_type === 'ielts-academic' ? 'Band' : 'Score'}
                            </p>
                        </Card>
                    </div>

                    {/* Leaderboard */}
                    <Card className="overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6">
                            <div className="flex items-center gap-3">
                                <Trophy className="w-6 h-6 text-white" />
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Leaderboard</h3>
                            </div>
                        </div>

                        {submissions.length === 0 ? (
                            <div className="p-12 text-center">
                                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h4 className="text-lg font-bold text-slate-900 mb-2">No Submissions Yet</h4>
                                <p className="text-slate-500">Waiting for participants to complete the exam.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                            <div className="divide-y divide-slate-100">
                                {submissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((submission, index) => {
                                    const actualIndex = (currentPage - 1) * itemsPerPage + index;
                                    return (
                                        <div key={submission.id}>
                                            <div
                                                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                                                onClick={() => toggleRow(submission.id)}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {/* Rank */}
                                                    <div className="w-12 flex justify-center shrink-0">
                                                        {getRankIcon(actualIndex + 1)}
                                                    </div>

                                                    {/* Student Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-slate-900 truncate">
                                                            {submission.profiles?.display_name || 'Unknown'}
                                                        </h4>
                                                        <p className="text-xs text-slate-500 truncate">{submission.profiles?.email}</p>
                                                    </div>

                                                    {/* Score */}
                                                    <div className="text-right px-4">
                                                        {sessions.find(s => s.id === selectedSessionId)?.exam_type === 'ielts-academic' ? (
                                                            <>
                                                                <div className="text-xl font-black text-indigo-600">
                                                                    {submission.overall_band?.toFixed(1) || '—'}
                                                                </div>
                                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Band</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="text-lg font-black text-indigo-600">
                                                                    {submission.raw_score !== undefined && submission.max_score && submission.max_score > 0
                                                                        ? `${submission.raw_score} / ${submission.max_score}`
                                                                        : '—'}
                                                                </div>
                                                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                                                    {submission.overall_band ? `${submission.overall_band}%` : 'Score'}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>

                                                    {/* Status */}
                                                    <div className="shrink-0 hidden sm:block">
                                                        <Badge
                                                            variant={submission.status === 'completed' ? 'default' : 'secondary'}
                                                            className={submission.status === 'completed' ? 'bg-emerald-600' : 'bg-amber-500'}
                                                        >
                                                            {submission.status}
                                                        </Badge>
                                                    </div>

                                                    {/* Expand Icon */}
                                                    <div className="shrink-0">
                                                        {expandedRows.has(submission.id) ? (
                                                            <ChevronUp className="w-5 h-5 text-slate-400" />
                                                        ) : (
                                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Details */}
                                            {expandedRows.has(submission.id) && (
                                                <div className="px-4 pb-4 bg-slate-50">
                                                    <div className="grid grid-cols-3 gap-4 pt-4">
                                                        {selectedSession?.exam_type === 'ielts-academic' ? (
                                                            <>
                                                                <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                                                                    <div className="text-xl font-black text-blue-600">
                                                                        {submission.reading_band?.toFixed(1) || 'N/A'}
                                                                    </div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Reading</p>
                                                                </div>
                                                                <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                                                                    <div className="text-xl font-black text-purple-600">
                                                                        {submission.listening_band?.toFixed(1) || 'N/A'}
                                                                    </div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Listening</p>
                                                                </div>
                                                                <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                                                                    <div className="text-xl font-black text-orange-600">
                                                                        {submission.writing_band?.toFixed(1) || 'N/A'}
                                                                    </div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Writing</p>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                                                                    <div className="text-xl font-black text-emerald-600">
                                                                        {submission.correct_answers ?? '—'}
                                                                    </div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Correct</p>
                                                                </div>
                                                                <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                                                                    <div className="text-xl font-black text-rose-600">
                                                                        {submission.wrong_answers ?? '—'}
                                                                    </div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Wrong</p>
                                                                </div>
                                                                <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
                                                                    <div className="text-xl font-black text-slate-400">
                                                                        {submission.skipped_answers ?? '—'}
                                                                    </div>
                                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1">Skipped</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 flex flex-col items-center gap-1">
                                                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                                                            Total Time Taken: <span className="text-slate-900 dark:text-slate-200">
                                                                {submission.time_taken_seconds 
                                                                    ? `${Math.floor(submission.time_taken_seconds / 60)}m ${submission.time_taken_seconds % 60}s` 
                                                                    : 'N/A'}
                                                            </span>
                                                        </div>
                                                        <div className="text-[9px] text-slate-400 font-medium">
                                                            Started: {new Date(submission.started_at).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Pagination Controls */}
                                {submissions.length > itemsPerPage && (
                                    <div className="p-4 border-t border-slate-100 flex items-center justify-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="rounded-xl font-bold uppercase text-[10px] tracking-widest"
                                        >
                                            Previous
                                        </Button>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            Page <span className="text-indigo-600">{currentPage}</span> of {Math.ceil(submissions.length / itemsPerPage)}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(submissions.length / itemsPerPage), prev + 1))}
                                            disabled={currentPage === Math.ceil(submissions.length / itemsPerPage)}
                                            className="rounded-xl font-bold uppercase text-[10px] tracking-widest"
                                        >
                                            Next Page
                                        </Button>
                                    </div>
                                )}
                            </div>
                            </div>
                        )}
                    </Card>
                </>
            )}
        </div>
    );
}
