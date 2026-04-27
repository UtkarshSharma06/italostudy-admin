import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star, MessageSquare, HelpCircle, Lightbulb, Calendar, User, Filter, CheckCircle, Clock, AlertCircle, Bug, ThumbsUp, Trash2, Edit, X, BookOpen, Video, Monitor, ShieldCheck, RefreshCw, Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Feedback {
    id: string;
    user_id: string;
    rating: number;
    review: string | null;
    major_questions: string | null;
    suggestions: string | null;
    category: string;
    status: string;
    created_at: string;
    user_email?: string;
    // Enhanced fields
    question_quality_rating?: number | null;
    mocktest_quality_rating?: number | null;
    video_lectures_rating?: number | null;
    security_rating?: number | null;
    ui_ux_rating?: number | null;
    bugs_experienced?: boolean | null;
    bug_details?: string | null;
    nps_score?: number | null;
}

export default function FeedbackManager() {
    const { toast } = useToast();
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterRating, setFilterRating] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [filterRating, filterCategory, filterStatus]);
    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            setLoading(true);

            // Fetch feedback first
            const { data, error } = await supabase
                .from('feedback')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Get unique user IDs
            const userIds = [...new Set(data?.map((item: any) => item.user_id) || [])];

            // Fetch user profiles separately
            const { data: profiles } = await supabase
                .from('profiles')
                .select('id, email')
                .in('id', userIds);

            // Create user email map
            const userEmailMap: Record<string, string> = {};
            profiles?.forEach(profile => {
                userEmailMap[profile.id] = profile.email || 'Unknown';
            });

            // Transform data to include user_email
            const transformedData = data?.map((item: any) => ({
                ...item,
                user_email: userEmailMap[item.user_id] || 'Unknown'
            })) || [];

            setFeedback(transformedData);
        } catch (error: any) {
            toast({
                title: 'Error Loading Feedback',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('feedback')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setFeedback(feedback.map(f =>
                f.id === id ? { ...f, status: newStatus } : f
            ));

            toast({
                title: 'Status Updated',
                description: `Feedback marked as ${newStatus}`,
            });
        } catch (error: any) {
            toast({
                title: 'Update Failed',
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    const deleteFeedback = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this feedback? This cannot be undone.")) return;

        try {
            const { error } = await supabase
                .from('feedback')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setFeedback(prev => prev.filter(f => f.id !== id));
            toast({
                title: "Feedback Deleted",
                description: "The feedback has been permanently removed.",
            });
        } catch (error) {
            console.error('Error deleting feedback:', error);
            toast({
                title: "Error",
                description: "Failed to delete feedback.",
                variant: "destructive",
            });
        }
    };

    const handleEditSave = async () => {
        if (!editingFeedback) return;

        try {
            const { error } = await supabase
                .from('feedback')
                .update({
                    status: editingFeedback.status,
                    category: editingFeedback.category,
                    rating: editingFeedback.rating,
                    review: editingFeedback.review,
                    question_quality_rating: editingFeedback.question_quality_rating,
                    mocktest_quality_rating: editingFeedback.mocktest_quality_rating,
                    ui_ux_rating: editingFeedback.ui_ux_rating,
                    nps_score: editingFeedback.nps_score,
                })
                .eq('id', editingFeedback.id);

            if (error) throw error;

            setFeedback(prev => prev.map(f => f.id === editingFeedback.id ? editingFeedback : f));
            setIsEditOpen(false);
            setEditingFeedback(null);
            toast({
                title: "Feedback Updated",
                description: "Changes have been saved successfully.",
            });
        } catch (error) {
            console.error('Error updating feedback:', error);
            toast({
                title: "Error",
                description: "Failed to update feedback.",
                variant: "destructive",
            });
        }
    };

    const openEditModal = (item: Feedback) => {
        setEditingFeedback({ ...item });
        setIsEditOpen(true);
    };

    const filteredFeedback = feedback.filter(f => {
        if (filterRating !== 'all' && f.rating !== parseInt(filterRating)) return false;
        if (filterCategory !== 'all' && f.category !== filterCategory) return false;
        if (filterStatus !== 'all' && f.status !== filterStatus) return false;
        return true;
    });

    const stats = {
        total: feedback.length,
        avgRating: feedback.length > 0
            ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
            : '0',
        avgQuestionQuality: feedback.filter(f => f.question_quality_rating).length > 0
            ? (feedback.reduce((sum, f) => sum + (f.question_quality_rating || 0), 0) / feedback.filter(f => f.question_quality_rating).length).toFixed(1)
            : '0',
        avgMockQuality: feedback.filter(f => f.mocktest_quality_rating).length > 0
            ? (feedback.reduce((sum, f) => sum + (f.mocktest_quality_rating || 0), 0) / feedback.filter(f => f.mocktest_quality_rating).length).toFixed(1)
            : '0',
        avgVideoQuality: feedback.filter(f => f.video_lectures_rating).length > 0
            ? (feedback.reduce((sum, f) => sum + (f.video_lectures_rating || 0), 0) / feedback.filter(f => f.video_lectures_rating).length).toFixed(1)
            : '0',
        avgUiUx: feedback.filter(f => f.ui_ux_rating).length > 0
            ? (feedback.reduce((sum, f) => sum + (f.ui_ux_rating || 0), 0) / feedback.filter(f => f.ui_ux_rating).length).toFixed(1)
            : '0',
        avgSecurity: feedback.filter(f => f.security_rating).length > 0
            ? (feedback.reduce((sum, f) => sum + (f.security_rating || 0), 0) / feedback.filter(f => f.security_rating).length).toFixed(1)
            : '0',
        avgNPS: feedback.filter(f => f.nps_score !== null).length > 0
            ? (feedback.reduce((sum, f) => sum + (f.nps_score || 0), 0) / feedback.filter(f => f.nps_score !== null).length).toFixed(1)
            : '0',
        bugReports: feedback.filter(f => f.bugs_experienced).length,
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'feature': return Lightbulb;
            case 'bug': return Bug;
            case 'content': return Star;
            default: return MessageSquare;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'reviewed': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'resolved': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-slate-100 text-slate-700 dark:text-slate-300 border-slate-200';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96 bg-white dark:bg-slate-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total</p>
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 mt-1">{stats.total}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Overall</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">{stats.avgRating}</span>
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Questions</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">{stats.avgQuestionQuality}</span>
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Videos</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">{stats.avgVideoQuality}</span>
                        <Video className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">UI/UX</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">{stats.avgUiUx}</span>
                        <Monitor className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Security</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl font-black text-slate-900 dark:text-slate-100">{stats.avgSecurity}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border shadow-sm">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Recommendation</p>
                    <p className="text-xl font-black text-slate-900 dark:text-slate-100 mt-1">{stats.avgNPS}</p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 shadow-sm">
                    <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest">Bugs</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xl font-black text-rose-700 dark:text-rose-300">{stats.bugReports}</span>
                        <Bug className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 p-6 rounded-2xl bg-white dark:bg-card border border-slate-200 dark:border-border dark:border-border">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Filters:</span>
                </div>

                <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-[140px] rounded-xl border-2">
                        <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[160px] rounded-xl border-2">
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="content">Content Quality</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] rounded-xl border-2">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    onClick={() => {
                        setFilterRating('all');
                        setFilterCategory('all');
                        setFilterStatus('all');
                    }}
                    variant="outline"
                    className="rounded-xl border-2"
                >
                    Clear Filters
                </Button>

                <div className="flex-1" />

                <Button
                    onClick={fetchFeedback}
                    variant="outline"
                    className="rounded-xl border-2 h-10 px-4"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                    Refresh
                </Button>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
                {filteredFeedback.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="font-bold">No feedback found</p>
                    </div>
                ) : (
                    filteredFeedback.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => {
                        const CategoryIcon = getCategoryIcon(item.category);
                        return (
                            <div
                                key={item.id}
                                className="p-6 rounded-2xl bg-white dark:bg-card border-2 border-slate-100 dark:border-border hover:border-indigo-200 dark:hover:border-primary/50 transition-all space-y-4"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                                            <CategoryIcon className="w-6 h-6 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-black text-slate-900 dark:text-slate-100">{item.user_email}</span>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-lg text-[10px] font-black uppercase border",
                                                    getStatusColor(item.status)
                                                )}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </span>
                                                <span className="capitalize">{item.category}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions & Rating */}
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={() => openEditModal(item)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => deleteFeedback(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={cn(
                                                        "w-4 h-4",
                                                        star <= item.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-slate-300"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Review */}
                                {item.review && (
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-muted border border-slate-100 dark:border-border">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {item.review}
                                        </p>
                                    </div>
                                )}

                                {/* Diagnostic Ratings Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Questions</p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={cn("w-2.5 h-2.5", (item.question_quality_rating || 0) >= s ? "fill-indigo-600 text-indigo-600" : "text-slate-200")} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Mock Test</p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={cn("w-2.5 h-2.5", (item.mocktest_quality_rating || 0) >= s ? "fill-blue-600 text-blue-600" : "text-slate-200")} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Videos</p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={cn("w-2.5 h-2.5", (item.video_lectures_rating || 0) >= s ? "fill-purple-600 text-purple-600" : "text-slate-200")} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">UI/UX</p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={cn("w-2.5 h-2.5", (item.ui_ux_rating || 0) >= s ? "fill-emerald-600 text-emerald-600" : "text-slate-200")} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Security</p>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={cn("w-2.5 h-2.5", (item.security_rating || 0) >= s ? "fill-teal-600 text-teal-600" : "text-slate-200")} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Questions & Suggestions */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.bug_details && (
                                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Bug className="w-4 h-4 text-red-600" />
                                                <span className="text-xs font-black text-red-600 uppercase">Bug Details</span>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{item.bug_details}</p>
                                        </div>
                                    )}

                                    {item.suggestions && (
                                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Lightbulb className="w-4 h-4 text-green-600" />
                                                <span className="text-xs font-black text-green-600 uppercase">Suggestions</span>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{item.suggestions}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-border mt-4">
                                    {item.status === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => updateStatus(item.id, 'reviewed')}
                                                size="sm"
                                                variant="outline"
                                                className="rounded-xl text-xs font-bold"
                                            >
                                                Mark Reviewed
                                            </Button>
                                            <Button
                                                onClick={() => updateStatus(item.id, 'resolved')}
                                                size="sm"
                                                className="rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700"
                                            >
                                                Mark Resolved
                                            </Button>
                                        </>
                                    )}
                                    {item.status === 'reviewed' && (
                                        <Button
                                            onClick={() => updateStatus(item.id, 'resolved')}
                                            size="sm"
                                            className="rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700"
                                        >
                                            Mark Resolved
                                        </Button>
                                    )}
                                    {item.status === 'resolved' && (
                                        <Button
                                            onClick={() => updateStatus(item.id, 'pending')}
                                            size="sm"
                                            variant="outline"
                                            className="rounded-xl text-xs font-bold"
                                        >
                                            Reopen
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination Controls */}
            {filteredFeedback.length > itemsPerPage && (
                <div className="flex items-center justify-center gap-4 py-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl font-black uppercase text-[10px] tracking-widest px-6"
                    >
                        Previous
                    </Button>
                    <div className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                        Page <span className="text-indigo-600">{currentPage}</span> of {Math.ceil(filteredFeedback.length / itemsPerPage)}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredFeedback.length / itemsPerPage), prev + 1))}
                        disabled={currentPage === Math.ceil(filteredFeedback.length / itemsPerPage)}
                        className="rounded-xl font-black uppercase text-[10px] tracking-widest px-6"
                    >
                        Next Page
                    </Button>
                </div>
            )}

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Edit Feedback</DialogTitle>
                        <DialogDescription>Make changes to the user's feedback stored in the database.</DialogDescription>
                    </DialogHeader>
                    {editingFeedback && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                        value={editingFeedback.status}
                                        onValueChange={(val) => setEditingFeedback({ ...editingFeedback, status: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="reviewed">Reviewed</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={editingFeedback.category}
                                        onValueChange={(val) => setEditingFeedback({ ...editingFeedback, category: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="feature">Feature Request</SelectItem>
                                            <SelectItem value="bug">Bug Report</SelectItem>
                                            <SelectItem value="content">Content Issue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Review Text</Label>
                                <Textarea
                                    value={editingFeedback.review || ''}
                                    onChange={(e) => setEditingFeedback({ ...editingFeedback, review: e.target.value })}
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Rating (1-5)</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={5}
                                        value={editingFeedback.rating}
                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, rating: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Recommendation Score (0-10)</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={10}
                                        value={editingFeedback.nps_score || 0}
                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, nps_score: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase">Questions</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={5}
                                        value={editingFeedback.question_quality_rating || 0}
                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, question_quality_rating: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase">Mock Test</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={5}
                                        value={editingFeedback.mocktest_quality_rating || 0}
                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, mocktest_quality_rating: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase">UI/UX</Label>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={5}
                                        value={editingFeedback.ui_ux_rating || 0}
                                        onChange={(e) => setEditingFeedback({ ...editingFeedback, ui_ux_rating: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button onClick={handleEditSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
