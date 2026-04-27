import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';
import {
    ImageIcon,
    Upload,
    Instagram,
    Facebook,
    Twitter,
    Info,
    AlertCircle,
    CheckCircle2,
    ImagePlus,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaSEOManagerProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function MediaSEOManager({ formData, setFormData }: MediaSEOManagerProps) {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const hasAltText = formData.alt_text.trim().length > 0;
    const hasImageTitle = formData.image_title.trim().length > 0;

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setImageError(false);

        try {
            // Upload to Cloudinary instead of Supabase Storage
            const result = await uploadToCloudinary(file, 'blog');
            const publicUrl = result.secure_url;

            setFormData({ ...formData, featured_image: publicUrl });
            toast({ title: "Image Uploaded", description: " Featured image updated successfully." });
        } catch (error: any) {
            toast({
                title: "Upload Failed",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Main Media Settings */}
                <div className="space-y-8">
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                            <ImageIcon className="w-6 h-6 text-slate-800" /> Featured Media
                        </h3>

                        <div className="space-y-6">
                            {/* Hidden File Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="image/*"
                            />

                            {/* Clickable Area */}
                            <div
                                onClick={() => !isUploading && fileInputRef.current?.click()}
                                className="aspect-video rounded-3xl bg-slate-200 overflow-hidden relative group border-2 border-slate-100 cursor-pointer hover:border-indigo-200 transition-all"
                            >
                                {formData.featured_image && !imageError ? (
                                    <img
                                        src={formData.featured_image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-3 bg-slate-100">
                                        <ImagePlus className="w-10 h-10 opacity-20" />
                                        <p className="text-xs font-black uppercase tracking-widest opacity-40">
                                            {imageError ? 'Invalid Image URL' : 'No Image Selected'}
                                        </p>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                    <Button variant="secondary" className="rounded-xl font-bold text-xs pointer-events-none">
                                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                                        {isUploading ? 'Uploading...' : 'Change Featured Image'}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Direct Image URL</Label>
                                <Input
                                    placeholder="Paste your optimized image URL here..."
                                    className="h-14 rounded-2xl border-2 border-slate-100 px-6 font-bold"
                                    value={formData.featured_image}
                                    onChange={(e) => {
                                        setFormData({ ...formData, featured_image: e.target.value });
                                        setImageError(false); // Reset error on change
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2.5rem] space-y-6 shadow-sm">
                        <div className="flex items-center gap-2 px-1">
                            <Info className="w-4 h-4 text-indigo-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Essential Image SEO</h4>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex justify-between">
                                    Alt Text (Mandatory)
                                    {!hasAltText && <span className="text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Required</span>}
                                </Label>
                                <Input
                                    placeholder="Describe the image for screen readers and SEO..."
                                    className={cn(
                                        "h-14 rounded-2xl border-2 px-6 font-bold focus:ring-0 transition-all",
                                        hasAltText ? "border-slate-50 focus:border-indigo-500" : "border-rose-100 focus:border-rose-300"
                                    )}
                                    value={formData.alt_text}
                                    onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Image Title</Label>
                                <Input
                                    placeholder="Brief title for the image..."
                                    className="h-14 rounded-2xl border-2 border-slate-50 px-6 font-bold focus:border-indigo-500 transition-all"
                                    value={formData.image_title}
                                    onChange={(e) => setFormData({ ...formData, image_title: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Sharing Preview */}
                <div className="space-y-8">
                    <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 h-full">
                        <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                            <Upload className="w-6 h-6 text-slate-800" /> Social Preview
                        </h3>

                        <div className="space-y-12">
                            {/* Facebook / OG Card */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Facebook className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Facebook / Meta Preview</span>
                                </div>
                                <div className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100 max-w-sm">
                                    <div className="aspect-[1.91/1] bg-slate-200 relative">
                                        {formData.featured_image && !imageError ? (
                                            <img src={formData.featured_image} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                <ImageIcon className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-[#f2f3f5] space-y-1">
                                        <p className="text-[10px] text-slate-500 uppercase font-medium tracking-tight">ITALOSTUDY.COM</p>
                                        <h5 className="font-bold text-slate-900 leading-tight">
                                            {formData.seo_title || formData.title || 'Post Title Goes Here'}
                                        </h5>
                                        <p className="text-xs text-slate-500 line-clamp-2">
                                            {formData.meta_description || 'Brief description used for social media sharing cards...'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Twitter Card */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <Twitter className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Twitter / X Preview</span>
                                </div>
                                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 max-w-sm relative">
                                    <div className="aspect-square bg-slate-200 relative">
                                        {formData.featured_image && !imageError ? (
                                            <img src={formData.featured_image} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                <ImageIcon className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/20">
                                        <h5 className="font-black text-xs text-slate-900 leading-tight mb-1">
                                            {formData.seo_title || formData.title || 'Post Title'}
                                        </h5>
                                        <p className="text-[10px] text-slate-500 truncate">italostudy.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

