import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
    Trash2,
    Loader2,
    Pencil,
    Image as ImageIcon,
    Eye,
    Plus,
    Sparkles
} from 'lucide-react';
import { format } from 'date-fns';
import BlogAdminDashboard from './blog/BlogAdminDashboard';
import { Link } from 'react-router-dom';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: any;
    status: 'draft' | 'published';
    featured_image: string;
    category_id?: string;
    published_at: string;
    created_at: string;
    views: number;
    seo_title?: string;
    meta_description?: string;
    focus_keyword?: string;
    alt_text?: string;
    image_title?: string;
    faq_schema?: any;
    seo_metadata?: any;
}

interface BlogManagerProps {
    permissions?: {
        can_edit: boolean;
        can_delete: boolean;
        can_export: boolean;
    };
    isSuperAdmin?: boolean;
}

export default function BlogManager({ permissions, isSuperAdmin = true }: BlogManagerProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const { toast } = useToast();

    const canEdit = isSuperAdmin || permissions?.can_edit;
    const canDelete = isSuperAdmin || permissions?.can_delete;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast({
                title: "Error fetching posts",
                description: error.message,
                variant: "destructive",
            });
        } else {
            setPosts(data || []);
        }
        setIsLoading(false);
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post? 🙊")) return;

        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) {
            toast({
                title: "Error deleting post",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Post Deleted 🗑️",
            });
            fetchPosts();
        }
    };

    if (isDashboardOpen) {
        return (
            <BlogAdminDashboard
                post={editingPost}
                onBack={() => {
                    setIsDashboardOpen(false);
                    setEditingPost(null);
                }}
                onSaveSuccess={() => {
                    setIsDashboardOpen(false);
                    setEditingPost(null);
                    fetchPosts();
                }}
            />
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                        <Sparkles className="w-8 h-8 text-indigo-600" />
                        Blog Authority
                    </h1>
                    <p className="text-slate-500 font-bold text-sm">Design search-engine friendly and conversion-oriented content.</p>
                </div>
                <Button
                    onClick={() => setIsDashboardOpen(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest gap-3 shadow-xl shadow-slate-200"
                    disabled={!canEdit}
                >
                    <Plus className="w-5 h-5" />
                    Create New Entry
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[3rem] border-2 border-slate-50">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-6" />
                    <p className="font-black text-slate-400 capitalize tracking-widest text-sm">Synchronizing your archives...</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-40 bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                    <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-6 opacity-30" />
                    <p className="text-slate-400 font-bold">The library is empty. Let's write something! ✍️</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-6 flex items-center justify-between group hover:border-indigo-100 transition-all shadow-sm">
                            <div className="flex items-center gap-8">
                                <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex-shrink-0 overflow-hidden border-2 border-slate-100 group-hover:border-indigo-50 transition-all relative">
                                    {post.featured_image ? (
                                        <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-4xl grayscale opacity-50">
                                            📚
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-black text-slate-900 text-xl group-hover:text-indigo-600 transition-colors">{post.title}</h4>
                                    <div className="flex items-center gap-4">
                                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border-2 ${post.status === 'published'
                                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                            : 'bg-slate-50 border-slate-100 text-slate-400'
                                            }`}>
                                            {post.status}
                                        </span>
                                        <div className="flex items-center gap-2 text-slate-400 border-l border-slate-100 pl-4 h-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">
                                                {format(new Date(post.created_at), 'MMM d, yyyy')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400 border-l border-slate-100 pl-4 h-4">
                                            <Eye className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-black">{post.views || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link to={`/blog/${post.slug}`} target="_blank">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="rounded-2xl w-12 h-12 bg-slate-50 hover:bg-slate-100 text-slate-400"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl border-slate-200 h-10 px-4 font-bold gap-2 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                        onClick={() => {
                                            setEditingPost(post);
                                            setIsDashboardOpen(true);
                                        }}
                                        disabled={!canEdit}
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-xl h-10 px-4 font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                                        onClick={() => handleDeletePost(post.id)}
                                        disabled={!canDelete}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
