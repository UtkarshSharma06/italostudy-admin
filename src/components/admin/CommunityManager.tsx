import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    Hash,
    Upload,
    Save,
    Loader2,
    Trash2,
    Image as ImageIcon,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommunityManager() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [community, setCommunity] = useState<any>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchGeneralCommunity();
    }, []);

    const fetchGeneralCommunity = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await (supabase as any)
                .from('communities')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(1)
                .maybeSingle();

            if (error) throw error;
            if (data) {
                setCommunity(data);
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'Failed to load community settings.',
                variant: 'destructive'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!community) return;
        setIsSaving(true);
        try {
            const { error } = await (supabase as any)
                .from('communities')
                .update({
                    name: community.name,
                    description: community.description,
                    image_url: community.image_url
                })
                .eq('id', community.id);

            if (error) throw error;
            toast({
                title: 'Success',
                description: 'Community settings updated successfully.'
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !community) return;

        setUploading(true);
        try {
            // Upload to Cloudinary instead of Supabase Storage
            const result = await uploadToCloudinary(file, 'community-icons');
            const publicUrl = result.secure_url;

            setCommunity({ ...community, image_url: publicUrl });
            toast({
                title: 'Image Uploaded',
                description: 'Initial save required to persist changes.'
            });
        } catch (error: any) {
            toast({
                title: 'Upload Failed',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-500 mb-6" />
                <p className="font-black text-slate-400 capitalize tracking-widest text-sm">Loading Settings...</p>
            </div>
        );
    }

    if (!community) {
        return (
            <div className="text-center py-40 bg-white border-2 border-dashed border-slate-200 rounded-[3rem]">
                <Hash className="w-12 h-12 text-slate-300 mx-auto mb-6 opacity-30" />
                <p className="text-slate-400 font-bold">General community not found. Please contact support.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-4">
                        <Hash className="w-8 h-8 text-indigo-600" />
                        Community Blueprint
                    </h1>
                    <p className="text-slate-500 font-bold text-sm">Manage the identity of your primary student hub.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest gap-3 shadow-xl shadow-indigo-100"
                >
                    {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                    Save Blueprint
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: General Settings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border-2 border-slate-50 dark:border-slate-800 shadow-sm space-y-8">
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Community Name</Label>
                            <Input
                                value={community.name}
                                onChange={(e) => setCommunity({ ...community, name: e.target.value })}
                                className="h-14 rounded-2xl border-2 focus:border-indigo-500 font-bold text-lg"
                                placeholder="Group Name..."
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Description / Topic</Label>
                            <Textarea
                                value={community.description || ''}
                                onChange={(e) => setCommunity({ ...community, description: e.target.value })}
                                className="min-h-[120px] rounded-2xl border-2 focus:border-indigo-500 font-medium text-base"
                                placeholder="What is this group about?..."
                            />
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-start gap-4">
                            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                            <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                                "Updating these settings will immediately affect how the community is displayed to all students on both Web and Mobile apps."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Logo / Icon */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border-2 border-slate-50 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 self-start">Visual Identity</Label>

                        <div className="relative group mb-8">
                            <div className="w-40 h-40 rounded-[3rem] bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl relative">
                                {community.image_url ? (
                                    <img src={community.image_url} alt="Community" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-slate-300" />
                                    </div>
                                )}

                                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-white mb-2" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Update Logo</span>
                                        </>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4 w-full">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Profile Icon</p>
                            <p className="text-[11px] text-slate-500 font-medium">Use a high-quality square image (min 512x512px) for the best results.</p>

                            {community.image_url && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-rose-500 hover:bg-rose-50 rounded-xl font-bold"
                                    onClick={() => setCommunity({ ...community, image_url: null })}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove Icon
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
