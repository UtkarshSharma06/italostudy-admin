import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ShoppingBag, Loader2, Plus, X, Search, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface StoreAdsSelectorProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function StoreAdsSelector({ formData, setFormData }: StoreAdsSelectorProps) {
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('store_products')
                .select('id, title, price, discount_price, images')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProducts(data);
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, []);

    // Ensure cta_config exists
    const ctaConfig = formData.cta_config || {};
    const selectedIds: string[] = ctaConfig.ad_product_ids || [];

    const toggleProduct = (id: string) => {
        let newIds = [...selectedIds];
        if (newIds.includes(id)) {
            newIds = newIds.filter(pid => pid !== id);
        } else {
            newIds.push(id);
        }
        
        setFormData({
            ...formData,
            cta_config: {
                ...ctaConfig,
                ad_product_ids: newIds
            }
        });
    };

    const removeProduct = (id: string) => {
        const newIds = selectedIds.filter(pid => pid !== id);
        setFormData({
            ...formData,
            cta_config: {
                ...ctaConfig,
                ad_product_ids: newIds
            }
        });
    };

    const filteredProducts = products.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedProducts = products.filter(p => selectedIds.includes(p.id));

    return (
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900">Store Advertisements</h3>
                        <p className="text-sm font-bold text-slate-500">Select products to dynamically feature alongside this blog post.</p>
                    </div>
                </div>

                <div className="mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-200">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">
                        Currently Selected ({selectedProducts.length})
                    </Label>
                    
                    {selectedProducts.length === 0 ? (
                        <p className="text-sm font-bold text-slate-400 text-center py-4">No products selected yet. Search and add products below.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedProducts.map(p => (
                                <div key={p.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border-2 border-indigo-100 shadow-sm relative group">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                                        {p.images && p.images.length > 0 ? (
                                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300"><ShoppingBag className="w-5 h-5"/></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-slate-900 truncate">{p.title}</h4>
                                        <p className="text-xs font-black text-indigo-600">
                                            €{p.discount_price || p.price}
                                        </p>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl"
                                        onClick={() => removeProduct(p.id)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
                        Available Products
                    </Label>
                    
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input 
                            placeholder="Search products by name..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-12 h-12 rounded-2xl bg-slate-50 border-slate-200"
                        />
                    </div>

                    <div className="border border-slate-200 rounded-3xl overflow-hidden max-h-[400px] overflow-y-auto bg-slate-50">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
                                <p className="text-xs font-bold text-slate-400">Loading products...</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-sm font-bold text-slate-400">No products found.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {filteredProducts.map(p => {
                                    const isSelected = selectedIds.includes(p.id);
                                    return (
                                        <div key={p.id} className={`flex items-center justify-between p-4 transition-colors hover:bg-white cursor-pointer ${isSelected ? 'bg-indigo-50/30' : ''}`} onClick={() => toggleProduct(p.id)}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 overflow-hidden shrink-0">
                                                    {p.images && p.images.length > 0 ? (
                                                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-200"><ShoppingBag className="w-4 h-4"/></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{p.title}</h4>
                                                    <p className="text-xs font-bold text-slate-500">€{p.discount_price || p.price}</p>
                                                </div>
                                            </div>
                                            <div>
                                                {isSelected ? (
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                    </div>
                                                ) : (
                                                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-slate-200 text-slate-400">
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[2.5rem]">
                <h4 className="text-sm font-black text-emerald-800 mb-2">SEO Benefit 🚀</h4>
                <p className="text-xs font-bold text-emerald-600/80 leading-relaxed">
                    By linking store products directly to this blog post, the system will automatically inject **Product and Offer Schema** metadata into the webpage. 
                    This enables rich snippets in Google Search Results (like displaying price and availability directly in search) and passes valuable internal link authority to your product pages!
                </p>
            </div>
        </div>
    );
}
