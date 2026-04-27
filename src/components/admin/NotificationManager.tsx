import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Bell,
    Plus,
    Trash2,
    Eye,
    Loader2,
    Calendar,
    Briefcase,
    Sparkles,
    Pencil,
    X as CloseIcon,
    Image as ImageIcon,
    Upload
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Notification {
    id: string;
    title: string | null;
    short_description: string | null;
    content_html: string;
    content_type?: string;
    image_url?: string | null;
    created_at: string;
    is_active: boolean;
    exam_type: string | null;
    show_minimal: boolean;
    push_type?: string | null;
    button_label?: string | null;
    link_url?: string | null;
    link_type?: string | null;
}

const EXAM_OPTIONS = [
    { id: '', name: 'General (All Users)' },
    { id: 'cent-s-prep', name: 'CENT-S' },
    { id: 'imat-prep', name: 'IMAT' },
    { id: 'sat-prep', name: 'SAT' },
    { id: 'ielts-academic', name: 'IELTS' }
];

export default function NotificationManager() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        short_description: '',
        content_html: '',
        content_type: 'html' as 'html' | 'image',
        image_url: '',
        exam_type: '',
        show_minimal: false,
        send_push: true,
        push_type: 'announcement', // 'announcement' | 'deal' | 'warning'
        telegram_message: '', // Explicit field for Telegram
        button_label: '',
        link_url: '',
        link_type: 'internal' as 'internal' | 'external'
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data, error } = await supabase
                .from('site_notifications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNotifications(data || []);
        } catch (error: any) {
            toast.error('Error fetching notifications: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Exclude telegram_message from DB operations (it's not in the schema)
            const { telegram_message, ...dbData } = formData;

            if (editingId) {
                const { error } = await supabase
                    .from('site_notifications')
                    .update({
                        ...dbData,
                        exam_type: formData.exam_type === '' ? null : formData.exam_type,
                    })
                    .eq('id', editingId);

                if (error) throw error;
                toast.success('Notification updated successfully');
            } else {
                const { data: newNotif, error } = await supabase
                    .from('site_notifications')
                    .insert([{
                        ...dbData,
                        exam_type: formData.exam_type === '' ? null : formData.exam_type,
                        created_by: (await supabase.auth.getUser()).data.user?.id
                    }])
                    .select()
                    .single();

                if (error) throw error;

                // Trigger Push Notification
                if (newNotif && formData.send_push) {
                    console.log('Push triggered for:', newNotif);
                    await handleSendPush(newNotif);
                }
            }

            setFormData({
                title: '',
                short_description: '',
                content_html: '',
                content_type: 'html',
                image_url: '',
                exam_type: '',
                show_minimal: false,
                send_push: true,
                push_type: 'announcement',
                telegram_message: '',
                button_label: '',
                link_url: '',
                link_type: 'internal'
            });
            setEditingId(null);
            fetchNotifications();
        } catch (error: any) {
            console.error('Submit error:', error);
            toast.error('Error saving notification: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (notif: Notification) => {
        setFormData({
            title: notif.title || '',
            short_description: notif.short_description || '',
            content_html: notif.content_html,
            content_type: (notif.content_type as "html" | "image") || 'html',
            image_url: notif.image_url || '',
            exam_type: notif.exam_type || '',
            show_minimal: notif.show_minimal,
            send_push: true,
            push_type: notif.push_type || 'announcement',
            telegram_message: '',
            button_label: notif.button_label || '',
            link_url: notif.link_url || '',
            link_type: (notif.link_type as 'internal' | 'external') || 'internal'
        });
        setEditingId(notif.id);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setFormData({
            title: '',
            short_description: '',
            content_html: '',
            content_type: 'html',
            image_url: '',
            exam_type: '',
            show_minimal: false,
            send_push: true,
            push_type: 'announcement',
            telegram_message: '',
            button_label: '',
            link_url: '',
            link_type: 'internal'
        });
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notification?')) return;

        try {
            const { error } = await supabase
                .from('site_notifications')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast.success('Notification deleted');
            fetchNotifications();
        } catch (error: any) {
            toast.error('Error deleting notification: ' + error.message);
        }
    };

    const handleSendPush = async (notif: any) => {
        setIsSubmitting(true);
        try {
            const { error: pushError } = await supabase.functions.invoke('send-push', {
                body: {
                    title: notif.title || 'New Announcement',
                    body: notif.short_description || 'Check the app for details',
                    topic: notif.exam_type || 'all_users',
                    image_url: notif.image_url,
                    content_type: (notif.content_type as "html" | "image") || 'html',
                    data: {
                        url: '/dashboard',
                        notification_id: notif.id,
                        push_type: notif.push_type || 'announcement'
                    },
                    telegram_message: notif.telegram_message || formData.telegram_message // Pass explicit message
                }
            });

            if (pushError) throw pushError;
            toast.success('Push notification deployed successfully');
        } catch (error: any) {
            console.error('Push Error:', error);
            toast.error('Push failed: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('site_notifications')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchNotifications();
        } catch (error: any) {
            toast.error('Error updating status: ' + error.message);
        }
    };

    return (
        <div className="space-y-8 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <Bell className="w-6 h-6 text-indigo-600" />
                        Site Notifications
                    </h2>
                    <p className="text-slate-500 font-bold text-sm">Create and manage global site announcements</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Create Form */}
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                    <h3 className="font-black text-slate-900 border-l-4 border-indigo-500 pl-4 uppercase tracking-widest text-xs">Create Announcement</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title (Optional)</label>
                            <Input
                                placeholder="E.g., New Course Available!"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="rounded-xl border-slate-100 focus:border-indigo-500 transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Dashboard (Exam)</label>
                            <select
                                value={formData.exam_type}
                                onChange={e => setFormData({ ...formData, exam_type: e.target.value })}
                                className="w-full rounded-xl border-slate-100 border p-2.5 focus:border-indigo-500 transition-all font-bold text-sm bg-white"
                            >
                                {EXAM_OPTIONS.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Short Description (Optional)</label>
                            <Input
                                placeholder="A brief summary for the notification bell list"
                                value={formData.short_description}
                                onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                                className="rounded-xl border-slate-100 focus:border-indigo-500 transition-all font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-1">
                                Telegram Message (Optional)
                            </label>
                            <Textarea
                                placeholder="Exact text for Telegram bot (Markdown/HTML supported if configured). If empty, uses Title + Body."
                                value={formData.telegram_message || ''}
                                onChange={e => setFormData({ ...formData, telegram_message: e.target.value })}
                                className="rounded-xl border-slate-100 focus:border-indigo-500 transition-all font-mono text-xs min-h-[80px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Push Category</label>
                            <select
                                value={formData.push_type}
                                onChange={e => setFormData({ ...formData, push_type: e.target.value })}
                                className="w-full rounded-xl border-slate-100 border p-2.5 focus:border-indigo-500 transition-all font-bold text-sm bg-white"
                            >
                                <option value="announcement">📢 Standard Announcement</option>
                                <option value="deal">🏷️ Special Deal / Offer</option>
                                <option value="warning">⚠️ Important Warning</option>
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Button Label</label>
                                <Input
                                    placeholder="E.g., View Store"
                                    value={formData.button_label}
                                    onChange={e => setFormData({ ...formData, button_label: e.target.value })}
                                    className="rounded-xl border-white bg-white/50 focus:bg-white transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Redirect Link</label>
                                <Input
                                    placeholder="E.g., /store or https://..."
                                    value={formData.link_url}
                                    onChange={e => setFormData({ ...formData, link_url: e.target.value })}
                                    className="rounded-xl border-white bg-white/50 focus:bg-white transition-all font-bold"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Link Type</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="link_type"
                                            checked={formData.link_type === 'internal'}
                                            onChange={() => setFormData({ ...formData, link_type: 'internal' })}
                                            className="w-4 h-4 text-indigo-600 border-indigo-200 focus:ring-indigo-500"
                                        />
                                        <span className={cn("text-xs font-black uppercase tracking-tight", formData.link_type === 'internal' ? "text-indigo-600" : "text-slate-400")}>
                                            Internal (App Redirect)
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="link_type"
                                            checked={formData.link_type === 'external'}
                                            onChange={() => setFormData({ ...formData, link_type: 'external' })}
                                            className="w-4 h-4 text-indigo-600 border-indigo-200 focus:ring-indigo-500"
                                        />
                                        <span className={cn("text-xs font-black uppercase tracking-tight", formData.link_type === 'external' ? "text-indigo-600" : "text-slate-400")}>
                                            External (New Tab)
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="show_minimal"
                                    checked={formData.show_minimal}
                                    onChange={e => setFormData({ ...formData, show_minimal: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label htmlFor="show_minimal" className="text-[10px] font-black text-slate-900 cursor-pointer uppercase tracking-tight">
                                    Minimal UI
                                </label>
                            </div>
                            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                                <input
                                    type="checkbox"
                                    id="send_push"
                                    checked={formData.send_push}
                                    onChange={e => setFormData({ ...formData, send_push: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                />
                                <label htmlFor="send_push" className="text-[10px] font-black text-emerald-600 cursor-pointer uppercase tracking-tight">
                                    Push (WhatsApp Style)
                                </label>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 border-b border-slate-100 pb-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, content_type: 'html' })}
                                    className={`text-[10px] font-black uppercase tracking-widest pb-2 px-2 transition-all relative ${formData.content_type === 'html' ? 'text-indigo-600' : 'text-slate-400'}`}
                                >
                                    HTML Content
                                    {formData.content_type === 'html' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, content_type: 'image' })}
                                    className={`text-[10px] font-black uppercase tracking-widest pb-2 px-2 transition-all relative ${formData.content_type === 'image' ? 'text-indigo-600' : 'text-slate-400'}`}
                                >
                                    Image Content
                                    {formData.content_type === 'image' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
                                </button>
                            </div>

                            {formData.content_type === 'html' ? (
                                <div className="space-y-2 anim-fade-in">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content (HTML Support)</label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        title: 'INTERNATIONAL CENT-S MOCK TEST',
                                                        short_description: 'Global Simulation Arena v4.0 is now live.',
                                                        content_html: `<div class="[perspective:1000px]">
    <div class="bg-white border-b border-white/40 rounded-t-[30px] p-8 md:p-10 [transform:rotateX(1deg)] shadow-2xl transition-all duration-500 hover:[transform:rotateX(0deg)] group">
        <!-- Floating Header -->
        <div class="flex items-center gap-4 mb-8">
            <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[18px] flex items-center justify-center shadow-lg shadow-indigo-500/30 transform -rotate-6 transition-transform group-hover:rotate-0">
                <span class="text-2xl">🏆</span>
            </div>
            <div>
                <h2 class="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">INTERNATIONAL CENT-S MOCK TEST</h2>
                <span class="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Global Simulation v5.0</span>
            </div>
        </div>

        <p class="text-slate-500 text-sm md:text-base leading-relaxed mb-8 font-medium">
            Challenge yourself with our most advanced 3D-proctored environment. Test your speed, accuracy, and knowledge against 5,000+ students worldwide.
        </p>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-4 mb-10">
            <div class="bg-white/50 p-5 rounded-2xl border border-black/5 hover:border-indigo-100 transition-colors">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Duration</div>
                <div class="text-lg font-black text-slate-900">110 Mins</div>
            </div>
            <div class="bg-white/50 p-5 rounded-2xl border border-black/5 hover:border-indigo-100 transition-colors">
                <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Difficulty</div>
                <div class="text-lg font-black text-slate-900">Advanced</div>
            </div>
        </div>

        <!-- CTA -->
        <a href="/mock-exams" class="block w-full bg-slate-900 text-white text-center py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-slate-900/20 transition-all hover:bg-indigo-600 hover:scale-[1.02] active:scale-[0.98]">
            Enter Simulation Arena &rarr;
        </a>
    </div>
</div>`
                                                    });
                                                }}
                                                className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1"
                                            >
                                                <Sparkles className="w-3 h-3" />
                                                Use Premium Template
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreviewContent(formData.content_html);
                                                    setIsPreviewOpen(true);
                                                }}
                                                className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-colors"
                                            >
                                                Preview HTML
                                            </button>
                                        </div>
                                    </div>
                                    <Textarea
                                        placeholder="<p>Full HTML content for the notification page...</p>"
                                        value={formData.content_html}
                                        onChange={e => setFormData({ ...formData, content_html: e.target.value })}
                                        required={formData.content_type === 'html'}
                                        className="rounded-xl border-slate-100 focus:border-indigo-500 transition-all font-mono text-sm min-h-[200px]"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4 anim-fade-in">
                                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 group transition-all hover:bg-slate-100 hover:border-indigo-300 relative overflow-hidden min-h-[200px]">
                                        {formData.image_url ? (
                                            <div className="w-full h-full">
                                                <img src={formData.image_url} alt="Notification" className="max-h-[300px] mx-auto rounded-lg shadow-lg object-contain" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, image_url: '' })}
                                                    className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <CloseIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                                    <ImageIcon className="w-8 h-8 text-indigo-600" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-sm font-black text-slate-900">Upload Image Notification</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG or WEBP up to 5MB</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    disabled={isUploading}
                                                    onClick={() => document.getElementById('image-upload')?.click()}
                                                    className="bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200 shadow-sm rounded-xl px-6 h-10 font-black uppercase text-[10px] tracking-widest"
                                                >
                                                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                                                    Choose Image
                                                </Button>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            id="image-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                setIsUploading(true);
                                                try {
                                                    // Upload to Cloudinary instead of Supabase Storage
                                                    const result = await uploadToCloudinary(file, 'notifications');
                                                    const publicUrl = result.secure_url;

                                                    setFormData({ ...formData, image_url: publicUrl });
                                                    toast.success('Image uploaded successfully');
                                                } catch (error: any) {
                                                    toast.error('Upload failed: ' + error.message);
                                                } finally {
                                                    setIsUploading(false);
                                                }
                                            }}
                                        />
                                    </div>
                                    {formData.image_url && (
                                        <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            Image path: {formData.image_url.split('/').pop()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button
                                disabled={isSubmitting}
                                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-black uppercase tracking-widest text-xs gap-2"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />)}
                                {editingId ? 'Update Notification' : 'Publish Notification'}
                            </Button>
                            {editingId && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancelEdit}
                                    className="rounded-xl h-12 border-slate-200 font-black uppercase tracking-widest text-xs px-6"
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="bg-slate-50/50 rounded-3xl p-8 border border-white space-y-6">
                    <h3 className="font-black text-slate-900 border-l-4 border-indigo-500 pl-4 uppercase tracking-widest text-xs">Recent History</h3>
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                                <p className="text-slate-400 font-bold text-sm italic">No notifications found</p>
                            </div>
                        ) : (
                            notifications.map((notif) => (
                                <div key={notif.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1 pr-4">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-black text-slate-900">{notif.title}</h4>
                                                {notif.content_type === 'image' && (
                                                    <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                                        <ImageIcon className="w-2.5 h-2.5" />
                                                        Image
                                                    </span>
                                                )}
                                                {!notif.is_active && (
                                                    <span className="bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">Draft</span>
                                                )}
                                                {notif.exam_type && (
                                                    <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                                                        {EXAM_OPTIONS.find(o => o.id === notif.exam_type)?.name}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 font-bold line-clamp-1">{notif.short_description}</p>
                                            <div className="flex items-center gap-4 pt-2">
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(notif.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleSendPush(notif)}
                                                disabled={isSubmitting}
                                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                                                title="Re-send Push Notification"
                                            >
                                                <Bell className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(notif)}
                                                className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => toggleStatus(notif.id, notif.is_active)}
                                                className={`p-2 rounded-lg transition-colors ${notif.is_active ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                                title={notif.is_active ? "Mark as Inactive" : "Mark as Active"}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(notif.id)}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-widest">HTML Preview</h3>
                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <Plus className="w-5 h-5 rotate-45 text-slate-400" />
                            </button>
                        </div>
                        <div className="p-8 max-h-[70vh] overflow-y-auto">
                            {formData.content_type === 'image' && formData.image_url ? (
                                <img src={formData.image_url} alt="Preview" className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white" />
                            ) : (
                                <div
                                    className="prose prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{ __html: formData.content_html || '<p class="text-slate-400 italic">No content to preview</p>' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
