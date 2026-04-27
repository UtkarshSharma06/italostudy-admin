import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    Plus,
    Trash2,
    FileText,
    Loader2,
    Download,
    Eye,
    Search,
    Filter,
    Cloud,
    Database,
    AlertCircle,
    Pencil,
    X,
    BookOpen
} from 'lucide-react';
import { EXAMS } from '@/config/exams';

interface Resource {
    id: string;
    title: string;
    description: string;
    file_url: string;
    slug: string;
    exam_type: string;
    created_at: string;
}

export default function ResourceManager() {
    const { toast } = useToast();
    const [resources, setResources] = useState<Resource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Filter State
    const [selectedExamFilter, setSelectedExamFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Edit State
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [examType, setExamType] = useState('cent-s-prep');
    const [file, setFile] = useState<File | null>(null);
    const [isCloudinaryConfigured] = useState(() =>
        Boolean(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME && import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    );

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('exam_resources')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching resources:', error);
            // Don't show toast on 404/missing table if migration hasn't run yet
            if (!error.message.includes('does not exist')) {
                toast({ title: 'Fetch Error', description: error.message, variant: 'destructive' });
            }
        } else {
            setResources(data || []);
        }
        setIsLoading(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !slug) return;
        if (!editingId && !file) return;

        setIsUploading(true);
        try {
            let finalFileUrl = '';

            // 1. Upload File if selected
            if (file) {
                const result = await uploadToCloudinary(file, 'resources');
                finalFileUrl = result.secure_url;
            }

            if (editingId) {
                // UPDATE
                const updateData: any = {
                    title,
                    description,
                    slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    exam_type: examType
                };

                if (finalFileUrl) {
                    updateData.file_url = finalFileUrl;
                }

                const { error: dbError } = await supabase
                    .from('exam_resources')
                    .update(updateData)
                    .eq('id', editingId);

                if (dbError) throw dbError;
                toast({ title: 'Success', description: 'Resource updated successfully.' });
            } else {
                // INSERT
                const { error: dbError } = await supabase
                    .from('exam_resources')
                    .insert([{
                        title,
                        description,
                        file_url: finalFileUrl,
                        exam_type: examType,
                        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    }]);

                if (dbError) throw dbError;
                toast({ title: 'Success', description: 'Resource uploaded successfully.' });
            }

            // Reset Form
            resetForm();
            fetchResources();

        } catch (error: any) {
            toast({ title: editingId ? 'Update Failed' : 'Upload Failed', description: error.message, variant: 'destructive' });
        } finally {
            setIsUploading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setSlug('');
        setDescription('');
        setFile(null);
        setEditingId(null);
        const fileInput = document.getElementById('resource-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const startEdit = (resource: Resource) => {
        setEditingId(resource.id);
        setTitle(resource.title);
        setSlug(resource.slug);
        setDescription(resource.description || '');
        setExamType(resource.exam_type);
        setFile(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;

        const { error } = await supabase
            .from('exam_resources')
            .delete()
            .eq('id', id);

        if (error) {
            toast({ title: 'Delete Failed', description: error.message, variant: 'destructive' });
        } else {
            toast({ title: 'Resource Deleted' });
            setResources(resources.filter(r => r.id !== id));
        }
    };

    const filteredResources = resources.filter(r => {
        const matchesExam = selectedExamFilter === 'all' || r.exam_type === selectedExamFilter;
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesExam && matchesSearch;
    });

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-1">
                <div className="card-surface p-6 sticky top-8">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        {editingId ? <Pencil className="w-5 h-5 text-indigo-500" /> : <Plus className="w-5 h-5 text-indigo-500" />}
                        {editingId ? 'Edit Resource' : 'Upload Resource'}
                    </h2>

                    <div className={`p-3 rounded-2xl mb-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${isCloudinaryConfigured ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-lg shadow-rose-900/10'}`}>
                        {isCloudinaryConfigured ? (
                            <><Cloud className="w-3 h-3" /> Cloudinary Ready (Safe for Egress)</>
                        ) : (
                            <><AlertCircle className="w-3 h-3 animate-pulse" /> Cloudinary Required (Supabase Storage Disabled)</>
                        )}
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Biology Study Guide 2024"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Page Slug (URL)</Label>
                            <div className="flex gap-2">
                                <span className="bg-muted px-3 py-2 rounded-md border text-muted-foreground text-sm">/resources/</span>
                                <Input
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                                    placeholder="biology-study-guide"
                                    required
                                />
                            </div>
                            <p className="text-[10px] text-muted-foreground">This will be the URL of your resource page: studybuddy.com/resources/{slug || "..."}</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="exam_type">Target Exam</Label>
                            <select
                                id="exam_type"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={examType}
                                onChange={(e) => setExamType(e.target.value)}
                            >
                                {Object.values(EXAMS).map(exam => (
                                    <option key={exam.id} value={exam.id}>{exam.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Brief overview..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="resource-file">File {editingId ? '(Optional)' : '(PDF, Doc, Image)'}</Label>
                            <Input
                                id="resource-file"
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required={!editingId}
                                className="cursor-pointer"
                            />
                            <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-indigo-50 border border-indigo-100/50">
                                <BookOpen className="w-3 h-3 text-indigo-600" />
                                <p className="text-[9px] text-indigo-600 font-bold leading-tight uppercase tracking-tighter">
                                    {editingId ? "Update file to enable 3D Book Preview on the public page." : "PDFs uploaded here will automatically generate a 3D Book Preview."}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                disabled={isUploading || (!editingId && !file)}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : (editingId ? <Pencil className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />)}
                                {editingId ? 'Update Resource' : 'Upload Resource'}
                            </Button>
                            {editingId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    className="px-3"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Resources List */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FileText className="w-5 h-5" /> Library
                        <span className="text-sm font-normal text-muted-foreground ml-2">({filteredResources.length})</span>
                    </h2>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-48">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <select
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm w-32"
                            value={selectedExamFilter}
                            onChange={(e) => setSelectedExamFilter(e.target.value)}
                        >
                            <option value="all">All Exams</option>
                            {Object.values(EXAMS).map(exam => (
                                <option key={exam.id} value={exam.id}>{exam.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 text-center text-muted-foreground">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                        <p>Loading library...</p>
                    </div>
                ) : filteredResources.length === 0 ? (
                    <div className="card-surface p-12 text-center text-muted-foreground border-dashed">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No resources found.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredResources.map(resource => (
                            <div key={resource.id} className="card-surface p-4 flex items-center justify-between group hover:border-indigo-500/30 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-foreground">{resource.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase text-slate-500">
                                                {EXAMS[resource.exam_type as keyof typeof EXAMS]?.name || resource.exam_type}
                                            </span>
                                            {resource.description && (
                                                <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px] border-l pl-2 ml-1 border-slate-200">
                                                    {resource.description}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-slate-400 hover:text-indigo-600"
                                        asChild
                                    >
                                        <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                                            <Download className="w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-slate-400 hover:text-indigo-600"
                                        onClick={() => startEdit(resource)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-slate-400 hover:text-destructive"
                                        onClick={() => handleDelete(resource.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
