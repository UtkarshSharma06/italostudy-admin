import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    Plus,
    Trash2,
    Package,
    Loader2,
    Search,
    Filter,
    Pencil,
    X,
    Image as ImageIcon,
    Euro,
    FileDigit,
    LayoutGrid,
    CheckCircle2,
    AlertCircle,
    Copy,
    ExternalLink,
    Upload,
    Upload,
    Link as LinkIcon,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    discount_price: number | null;
    type: 'digital' | 'physical';
    stock_quantity: number;
    images: string[];
    is_active: boolean;
    download_url?: string | null;
    category_id?: string | null;
    is_bundle?: boolean;
    bundle_items?: string[];
    created_at: string;
}

interface Category {
    id: string;
    name: string;
}

export default function ProductManager() {
    const { toast } = useToast();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'digital' | 'physical' | 'bundle'>('all');

    // Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        price: '',
        discount_price: '',
        type: 'digital' as 'digital' | 'physical',
        stock_quantity: '-1',
        images: [] as string[],
        category_id: '',
        download_url: '',
        is_bundle: false,
        bundle_items: [] as string[],
        gst_percentage: '18',
        is_active: true
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const { data } = await supabase.from('store_categories').select('id, name').order('name');
        setCategories(data || []);
    };

    const fetchProducts = async () => {
        setIsLoading(true);
        const { data, error } = await (supabase.from('store_products' as any) as any)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            if (!error.message.includes('does not exist')) {
                toast({ title: 'Error', description: error.message, variant: 'destructive' });
            }
        } else {
            setProducts((data as any) || []);
        }
        setIsLoading(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
            stock_quantity: parseInt(formData.stock_quantity),
            gst_percentage: parseInt(formData.gst_percentage || '18'),
            slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            download_url: formData.type === 'digital' ? formData.download_url : null,
            category_id: formData.category_id || null,
            bundle_items: formData.is_bundle ? formData.bundle_items : []
        };

        try {
            if (editingId) {
                const { error } = await (supabase.from('store_products' as any) as any)
                    .update(productData)
                    .eq('id', editingId);
                if (error) throw error;
                toast({ title: 'Success', description: 'Product updated.' });
            } else {
                const { error } = await (supabase.from('store_products' as any) as any)
                    .insert([productData]);
                if (error) throw error;
                toast({ title: 'Success', description: 'Product created.' });
            }
            setIsFormOpen(false);
            resetForm();
            fetchProducts();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            slug: '',
            description: '',
            price: '',
            discount_price: '',
            type: 'digital',
            stock_quantity: '-1',
            images: [],
            category_id: '',
            download_url: '',
            is_bundle: false,
            bundle_items: [],
            is_active: true
        });
        setEditingId(null);
    };

    const startEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({
            title: product.title,
            slug: product.slug,
            description: product.description || '',
            price: product.price.toString(),
            discount_price: product.discount_price?.toString() || '',
            type: product.type,
            stock_quantity: product.stock_quantity.toString(),
            images: product.images || [],
            category_id: product.category_id || '',
            download_url: product.download_url || '',
            is_bundle: !!product.is_bundle,
            bundle_items: product.bundle_items || [],
            gst_percentage: (product as any).gst_percentage?.toString() || '18',
            is_active: product.is_active
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this product?')) return;
        const { error } = await (supabase.from('store_products' as any) as any).delete().eq('id', id);
        if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
        else {
            toast({ title: 'Product Deleted' });
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const { secure_url } = await uploadToCloudinary(file, 'store/products');
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, secure_url]
            }));
            toast({ title: 'Success', description: 'Image uploaded to Cloudinary.' });
        } catch (err: any) {
            toast({ title: 'Upload Failed', description: err.message, variant: 'destructive' });
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const toggleBundleItem = (id: string) => {
        setFormData(prev => ({
            ...prev,
            bundle_items: prev.bundle_items.includes(id)
                ? prev.bundle_items.filter(i => i !== id)
                : [...prev.bundle_items, id]
        }));
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || p.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            {/* Header / Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
                    <Input 
                        placeholder="Search products..." 
                        className="pl-12 h-11 rounded-2xl bg-slate-50 border-slate-100 focus:ring-indigo-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <select 
                        className="h-11 px-4 rounded-2xl bg-slate-50 border-slate-100 text-sm font-medium focus:ring-indigo-500"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as any)}
                    >
                        <option value="all">All Types</option>
                        <option value="digital">Digital</option>
                        <option value="physical">Physical</option>
                        <option value="bundle">Bundles</option>
                    </select>
                    <Button 
                        onClick={() => { resetForm(); setIsFormOpen(true); }}
                        className="h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 px-6 gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        New Product
                    </Button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {isLoading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse" />
                        ))
                    ) : filteredProducts.length === 0 ? (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-slate-50 mx-auto flex items-center justify-center text-slate-300">
                                <Package className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No products found</h3>
                            <p className="text-slate-400">Start by creating your first educational product.</p>
                        </div>
                    ) : (
                        filteredProducts.map((p) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={p.id}
                                className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                        p.type === 'digital' ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                    )}>
                                        {p.type}
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => startEdit(p)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="aspect-[4/3] rounded-3xl bg-slate-50 dark:bg-slate-800/50 overflow-hidden relative">
                                        {p.images?.[0] ? (
                                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ImageIcon className="w-12 h-12" />
                                            </div>
                                        )}
                                        {!p.is_active && (
                                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-white/20 bg-white/10 rounded-full">Inactive</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {p.title}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white">€{p.price}</span>
                                            {p.discount_price && (
                                                <span className="text-sm text-slate-400 line-through font-medium">€{p.discount_price}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800/50">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                            <Package className="w-4 h-4" />
                                            {p.stock_quantity === -1 ? 'Unlimited' : `${p.stock_quantity} in stock`}
                                        </div>
                                        <Button variant="ghost" size="sm" className="rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50" onClick={() => window.open(`/store/${p.slug}`, '_blank')}>
                                            View Page <ExternalLink className="w-3 h-3 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isFormOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setIsFormOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative"
                        >
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {editingId ? 'Edit Product' : 'New Product'}
                                </h2>
                                <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Title</Label>
                                        <Input 
                                            required 
                                            value={formData.title} 
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            placeholder="Biology Masterclass PDF"
                                            className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description</Label>
                                        <Textarea 
                                            value={formData.description} 
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            placeholder="Tell your students why they need this..."
                                            className="rounded-2xl bg-slate-50 border-slate-100 min-h-[100px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price (€)</Label>
                                        <Input 
                                            required 
                                            type="number"
                                            step="0.01"
                                            value={formData.price} 
                                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                                            className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Old/Discount Price (€)</Label>
                                        <Input 
                                            type="number"
                                            step="0.01"
                                            value={formData.discount_price} 
                                            onChange={(e) => setFormData({...formData, discount_price: e.target.value})}
                                            className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Type</Label>
                                        <select 
                                            className="flex h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium"
                                            value={formData.type}
                                            onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                                        >
                                            <option value="digital">Digital (Instant Access)</option>
                                            <option value="physical">Physical (Requires Shipping)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock (Use -1 for unlimited)</Label>
                                        <Input 
                                            type="number"
                                            value={formData.stock_quantity} 
                                            onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                                            className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</Label>
                                        <select 
                                            className="flex h-12 w-full rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-medium"
                                            value={formData.category_id}
                                            onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                        >
                                            <option value="">No Category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {formData.type === 'digital' && (
                                        <div className="space-y-3 col-span-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Download URL / Resource ID</Label>
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                                                        <ShieldCheck className="w-3 h-3 text-indigo-600" />
                                                        <span className="text-[8px] font-black uppercase text-indigo-600 tracking-widest">1-hr Secure Link Enabled</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Input 
                                                value={formData.download_url} 
                                                onChange={(e) => setFormData({...formData, download_url: e.target.value})}
                                                placeholder="Enter Cloudinary Public ID (e.g. store/biology-book)"
                                                className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                                            />
                                            <div className="space-y-1.5 px-1 pt-1">
                                                <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5">
                                                    <AlertCircle className="w-3 h-3 text-indigo-600" />
                                                    For highest security, enter the <strong>Cloudinary Public ID</strong>. Students will receive a unique link valid for 1 hour.
                                                </p>
                                                <p className="text-[10px] text-amber-600 font-bold flex items-center gap-1.5">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    <strong>Refund Policy:</strong> Digital products are non-refundable once accessed.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2 col-span-2 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-900">Bundle Configuration</Label>
                                                <p className="text-[10px] text-slate-400 font-medium">Link multiple products into this single purchase</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(p => ({ ...p, is_bundle: !p.is_bundle }))}
                                                className={cn(
                                                    "w-12 h-6 rounded-full p-1 transition-all",
                                                    formData.is_bundle ? "bg-indigo-600" : "bg-slate-200"
                                                )}
                                            >
                                                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-all", formData.is_bundle ? "translate-x-6" : "translate-x-0")} />
                                            </button>
                                        </div>

                                        {formData.is_bundle && (
                                            <div className="space-y-3 pt-2">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Products to Bundle</p>
                                                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                                    {products.filter(p => p.id !== editingId).map(p => (
                                                        <button
                                                            key={p.id}
                                                            type="button"
                                                            onClick={() => toggleBundleItem(p.id)}
                                                            className={cn(
                                                                "flex items-center gap-2 p-2 rounded-xl border text-left transition-all",
                                                                formData.bundle_items.includes(p.id)
                                                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm"
                                                                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                                                            )}
                                                        >
                                                            <div className={cn("w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center", formData.bundle_items.includes(p.id) ? "bg-indigo-500 border-indigo-500" : "border-slate-200")}>
                                                                {formData.bundle_items.includes(p.id) && <CheckCircle2 className="w-2 h-2 text-white" />}
                                                            </div>
                                                            <span className="text-[11px] font-bold line-clamp-1">{p.title}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">GST Percentage (%)</Label>
                                        <Input 
                                            type="number"
                                            value={formData.gst_percentage} 
                                            onChange={(e) => setFormData({...formData, gst_percentage: e.target.value})}
                                            className="h-12 rounded-2xl bg-slate-50 border-slate-100"
                                        />
                                    </div>

                                    <div className="space-y-4 col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Images (Gallery)</Label>
                                        
                                        <div className="grid grid-cols-4 gap-4">
                                            {formData.images.map((url, i) => (
                                                <div key={i} className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative group">
                                                    <img src={url} alt={`Product ${i}`} className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => removeImage(i)}
                                                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-rose-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="aspect-square rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer relative">
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                                <Upload className="w-5 h-5 text-slate-400" />
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Add Image</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            <div className="relative flex-1">
                                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                                <Input 
                                                    placeholder="Or paste external URL..."
                                                    className="h-10 pl-10 rounded-xl bg-slate-50 border-slate-100 text-xs"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            const val = (e.target as HTMLInputElement).value;
                                                            if (val) {
                                                                setFormData(p => ({ ...p, images: [...p.images, val] }));
                                                                (e.target as HTMLInputElement).value = '';
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Supports Cloudinary</p>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="p-8 border-t border-slate-100 dark:border-slate-800 flex gap-4">
                                <Button 
                                    onClick={() => setIsFormOpen(false)}
                                    variant="outline" 
                                    className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    disabled={isSubmitting}
                                    onClick={handleFormSubmit}
                                    className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100/20"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (editingId ? 'Update Product' : 'Create Product')}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
