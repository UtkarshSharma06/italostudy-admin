import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Plus,
    Trash2,
    Tags,
    Loader2,
    Search,
    Pencil,
    X,
    LayoutGrid,
    Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
    id: string;
    name: string;
    slug: string;
    icon: string | null;
}

export default function CategoryManager() {
    const { toast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', slug: '', icon: '' });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        const { data, error } = await (supabase.from('store_categories' as any) as any).select('*').order('name');
        if (error) console.error(error);
        else setCategories((data as any) || []);
        setIsLoading(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const data = { ...formData, slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };

        try {
            if (editingId) {
                await (supabase.from('store_categories' as any) as any).update(data).eq('id', editingId);
                toast({ title: 'Category updated' });
            } else {
                await (supabase.from('store_categories' as any) as any).insert([data]);
                toast({ title: 'Category created' });
            }
            setFormData({ name: '', slug: '', icon: '' });
            setEditingId(null);
            fetchCategories();
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete category?')) return;
        await (supabase.from('store_categories' as any) as any).delete().eq('id', id);
        setCategories(categories.filter(c => c.id !== id));
        toast({ title: 'Category removed' });
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <Tags className="w-5 h-5 text-indigo-600" />
                        {editingId ? 'Edit Category' : 'New Category'}
                    </h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</Label>
                            <Input 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                className="rounded-2xl h-12 bg-slate-50 border-slate-100"
                                placeholder="e.g. IMAT Preparation"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug</Label>
                            <Input 
                                value={formData.slug} 
                                onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                                className="rounded-2xl h-12 bg-slate-50 border-slate-100"
                                placeholder="imat-prep"
                            />
                        </div>
                        <Button disabled={isSubmitting} className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700">
                             {isSubmitting ? <Loader2 className="animate-spin" /> : (editingId ? 'Update' : 'Create')}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between group h-fit">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                    <LayoutGrid className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-800 dark:text-white leading-none">{cat.name}</h4>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">/{cat.slug}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => { setEditingId(cat.id); setFormData({ name: cat.name, slug: cat.slug, icon: cat.icon || '' }); }} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600">
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
