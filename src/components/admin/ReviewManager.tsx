import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Trash2, 
    ExternalLink, 
    User, 
    Calendar, 
    ShieldX, 
    CheckCircle2,
    Search,
    Loader2,
    Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewSubmission {
    id: string;
    user_id: string;
    image_url: string;
    extracted_text: string | null;
    created_at: string;
    profiles: {
        email: string;
        display_name: string | null;
    } | null;
}

export default function ReviewManager() {
    const { toast } = useToast();
    const [submissions, setSubmissions] = useState<ReviewSubmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            // Note: This expects we will have a review_submissions table
            const { data, error } = await supabase
                .from('review_submissions' as any)
                .select(`
                    *,
                    profiles (
                        email,
                        display_name
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSubmissions(data as any || []);
        } catch (error: any) {
            console.error('Error fetching submissions:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load review submissions."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (submission: ReviewSubmission) => {
        if (!confirm('Are you sure you want to delete this submission? This will also reset the user\'s "has_submitted_review" status, gating them from mock exams again.')) return;

        setIsDeleting(submission.id);
        try {
            // 1. Reset user status
            const { error: profileError } = await (supabase
                .from('profiles')
                .update({ has_submitted_review: false } as any) as any)
                .eq('id', submission.user_id);

            if (profileError) throw profileError;

            // 2. Delete submission record
            const { error: deleteError } = await supabase
                .from('review_submissions' as any)
                .delete()
                .eq('id', submission.id);

            if (deleteError) throw deleteError;

            // 3. Update local state
            setSubmissions(prev => prev.filter(s => s.id !== submission.id));
            
            toast({
                title: "Success",
                description: "Submission deleted and user access revoked."
            });
        } catch (error: any) {
            console.error('Error deleting submission:', error);
            toast({
                variant: "destructive",
                title: "Failed",
                description: error.message
            });
        } finally {
            setIsDeleting(null);
        }
    };

    const filteredSubmissions = submissions.filter(s => 
        s.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.profiles?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE);
    const paginatedSubmissions = filteredSubmissions.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <ImageIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Trustpilot Screenshot Collector</h2>
                        <p className="text-xs font-medium text-slate-400 mt-1">Review and manage user-submitted proof of reviews</p>
                    </div>
                </div>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 focus:ring-amber-500"
                    />
                </div>
            </div>

            {/* Submissions Grid */}
            {isLoading ? (
                <div className="h-64 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                </div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 text-center p-8">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <ShieldX className="w-8 h-8" />
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold">No submissions found</h3>
                    <p className="text-slate-400 text-sm mt-1">Users haven't uploaded any screenshots yet or none match your search.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {paginatedSubmissions.map((submission) => (
                                <motion.div
                                    key={submission.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm group hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-500"
                                >
                                    {/* Image Preview */}
                                    <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                        <img 
                                            src={submission.image_url} 
                                            alt="Review Screenshot" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                            <a 
                                                href={submission.image_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <div className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-amber-600 flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" />
                                                VERIFIED BY OCR
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                                                    <User className="w-4 h-4 text-indigo-500" />
                                                    {submission.profiles?.display_name || 'Anonymous User'}
                                                </div>
                                                <div className="text-[10px] font-medium text-slate-400">
                                                    {submission.profiles?.email}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(submission.created_at).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {submission.extracted_text && (
                                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">OCR Snippet</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                                                    "{submission.extracted_text}"
                                                </p>
                                            </div>
                                        )}

                                        <Button
                                            onClick={() => handleDelete(submission)}
                                            disabled={isDeleting === submission.id}
                                            variant="ghost"
                                            className="w-full h-11 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 font-bold"
                                        >
                                            {isDeleting === submission.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                            ) : (
                                                <Trash2 className="w-4 h-4 mr-2" />
                                            )}
                                            Delete & Revoke Access
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 pb-8">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="rounded-xl font-bold uppercase text-[10px] tracking-widest"
                            >
                                Previous
                            </Button>
                            <div className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Page <span className="text-amber-500">{currentPage}</span> of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="rounded-xl font-bold uppercase text-[10px] tracking-widest"
                            >
                                Next Page
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
