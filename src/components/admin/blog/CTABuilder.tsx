import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MousePointer,
    Eye,
    CheckCircle2,
    Star,
    Mail,
    Zap,
    Layers,
    PanelBottom,
    Sidebar,
    Type,
    LayoutTemplate,
    ExternalLink,
    RefreshCw,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    MessageCircle,
    Send,
    Youtube,
    DownloadCloud
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAConfig {
    id?: string;
    template: string;
    position: 'top' | 'mid' | 'bottom' | 'sticky';
    headline: string;
    subtext: string;
    buttonText: string;
    buttonLink: string;
    badge?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
    emailPlaceholder?: string;
}

interface CTABuilderProps {
    formData: any;
    setFormData: (data: any) => void;
}

const TEMPLATES = [
    {
        id: 'sticky-bar',
        name: 'Sticky Bottom Bar',
        icon: PanelBottom,
        color: 'yellow',
        description: 'Slim bar pinned to bottom of screen — high visibility, non-intrusive',
        defaults: {
            headline: '🚀 Ready to start your study journey?',
            subtext: '',
            buttonText: 'Start Free Now',
            buttonLink: '/auth',
            badge: ''
        }
    },
    {
        id: 'hero-banner',
        name: 'Hero Banner',
        icon: LayoutTemplate,
        color: 'indigo',
        description: 'Full-width gradient card — maximum conversions at article top or bottom',
        defaults: {
            headline: 'Conquer Your Exam. Start Today.',
            subtext: 'Join thousands of students already preparing on ItaloStudy — for free.',
            buttonText: 'Get Started Free',
            buttonLink: '/auth',
            badge: 'Free for Students'
        }
    },
    {
        id: 'inline-card',
        name: 'Inline Card',
        icon: Layers,
        color: 'emerald',
        description: 'Boxed card inserted mid-article — contextual and high-engagement',
        defaults: {
            headline: 'Prepare Smarter, Not Harder 📚',
            subtext: 'Access 1000+ practice questions, mock exams, and expert tips.',
            buttonText: 'Try It Free',
            buttonLink: '/auth',
            badge: '✨ No credit card needed'
        }
    },
    {
        id: 'side-widget',
        name: 'Side Float Widget',
        icon: Sidebar,
        color: 'violet',
        description: 'Fixed widget on right side — visible while reading, non-blocking',
        defaults: {
            headline: 'Free Mock Exam',
            subtext: 'Test your skills today',
            buttonText: 'Take Free Test',
            buttonLink: '/mock-exams',
            badge: ''
        }
    },
    {
        id: 'newsletter',
        name: 'Newsletter Embed',
        icon: Mail,
        color: 'pink',
        description: 'Email capture inside article flow — grow your list naturally',
        defaults: {
            headline: 'Get Weekly Study Tips',
            subtext: 'No spam. Just actionable exam prep tips every week.',
            buttonText: 'Subscribe',
            buttonLink: '',
            emailPlaceholder: 'your@email.com',
            badge: '📬 5,000+ students subscribed'
        }
    },
    {
        id: 'minimal-text',
        name: 'Minimal Text CTA',
        icon: Type,
        color: 'slate',
        description: 'Clean inline text CTA — perfect for editorial-style content',
        defaults: {
            headline: 'Want to practice for real?',
            subtext: 'ItaloStudy has free mock exams, study guides, and expert tips for IMAT, CEnT-S, SAT & IELTS.',
            buttonText: 'Start Practicing →',
            buttonLink: '/auth',
            badge: ''
        }
    },
    {
        id: 'whatsapp-group',
        name: 'WhatsApp Group',
        icon: MessageCircle,
        color: 'green',
        description: 'Invite users to join a WhatsApp community or study group',
        defaults: {
            headline: 'Join our IMAT Study Group 🚀',
            subtext: 'Get daily questions, tips and advice from accepted students.',
            buttonText: 'Join WhatsApp',
            buttonLink: 'https://chat.whatsapp.com/...',
            badge: '🟢 500+ Members'
        }
    },
    {
        id: 'telegram-group',
        name: 'Telegram Channel',
        icon: Send,
        color: 'sky',
        description: 'Grow your Telegram channel with an integrated CTA box',
        defaults: {
            headline: 'Follow our Telegram Channel',
            subtext: 'We post daily quizzes, news, and free resources.',
            buttonText: 'Join Telegram',
            buttonLink: 'https://t.me/...',
            badge: '✈️ Daily Updates'
        }
    },
    {
        id: 'youtube-subscribe',
        name: 'YouTube Subscribe',
        icon: Youtube,
        color: 'red',
        description: 'Highlight your YouTube channel and drive subscriptions',
        defaults: {
            headline: 'Watch our Free Video Courses',
            subtext: 'Subscribe for weekly lessons, past paper solutions, and interviews.',
            buttonText: 'Subscribe on YouTube',
            buttonLink: 'https://youtube.com/@italostudy',
            badge: '📺 10k+ Subscribers'
        }
    },
    {
        id: 'resource-download',
        name: 'Resource Download',
        icon: DownloadCloud,
        color: 'amber',
        description: 'Offer a free PDF guide, cheat sheet, or study planner',
        defaults: {
            headline: 'Free IMAT Cheat Sheet 📄',
            subtext: 'Download our comprehensive 50-page guide covering all biology topics.',
            buttonText: 'Download PDF',
            buttonLink: '/resources/imat-cheatsheet.pdf',
            badge: '🎁 Free Gift'
        }
    }
];

const colorMap: Record<string, { bg: string; text: string; border: string; btn: string; badge: string }> = {
    yellow: {
        bg: 'bg-yellow-400',
        text: 'text-slate-900',
        border: 'border-yellow-300',
        btn: 'bg-slate-900 text-white hover:bg-slate-800',
        badge: 'bg-yellow-300 text-yellow-900'
    },
    indigo: {
        bg: 'bg-gradient-to-br from-indigo-600 to-violet-600',
        text: 'text-white',
        border: 'border-indigo-500',
        btn: 'bg-white text-indigo-700 hover:bg-indigo-50',
        badge: 'bg-white/20 text-white border border-white/30'
    },
    emerald: {
        bg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        text: 'text-white',
        border: 'border-emerald-400',
        btn: 'bg-white text-emerald-700 hover:bg-emerald-50',
        badge: 'bg-white/20 text-white border border-white/30'
    },
    violet: {
        bg: 'bg-gradient-to-b from-violet-600 to-purple-700',
        text: 'text-white',
        border: 'border-violet-500',
        btn: 'bg-white text-violet-700 hover:bg-violet-50',
        badge: 'bg-white/20 text-white border border-white/30'
    },
    pink: {
        bg: 'bg-gradient-to-br from-pink-500 to-rose-500',
        text: 'text-white',
        border: 'border-pink-400',
        btn: 'bg-white text-pink-700 hover:bg-pink-50',
        badge: 'bg-white/20 text-white border border-white/30'
    },
    slate: {
        bg: 'bg-slate-50',
        text: 'text-slate-800',
        border: 'border-slate-200',
        btn: 'bg-indigo-600 text-white hover:bg-indigo-700',
        badge: 'bg-indigo-50 text-indigo-700 border border-indigo-100'
    },
    green: {
        bg: 'bg-[#F0FDF4]',
        text: 'text-[#166534]',
        border: 'border-[#BBF7D0]',
        btn: 'bg-[#25D366] text-white hover:bg-[#1DA851] shadow-lg shadow-green-500/20',
        badge: 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]'
    },
    sky: {
        bg: 'bg-[#F0F9FF]',
        text: 'text-[#0369A1]',
        border: 'border-[#BAE6FD]',
        btn: 'bg-[#0088CC] text-white hover:bg-[#007AB8] shadow-lg shadow-sky-500/20',
        badge: 'bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]'
    },
    red: {
        bg: 'bg-[#FEF2F2]',
        text: 'text-[#991B1B]',
        border: 'border-[#FECACA]',
        btn: 'bg-[#FF0000] text-white hover:bg-[#CC0000] shadow-lg shadow-red-500/20',
        badge: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
    },
    amber: {
        bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
        text: 'text-white',
        border: 'border-amber-300',
        btn: 'bg-white text-orange-700 hover:bg-orange-50',
        badge: 'bg-white/20 text-white border border-white/30'
    }
};

function CTAPreview({ config, template }: { config: CTAConfig; template: typeof TEMPLATES[0] }) {
    const colors = colorMap[template.color];

    if (template.id === 'sticky-bar') {
        return (
            <div className={cn('w-full px-6 py-3 flex items-center justify-between rounded-2xl shadow-lg', colors.bg)}>
                <p className={cn('font-black text-sm', colors.text)}>{config.headline || 'Your CTA headline here'}</p>
                <button className={cn('px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex-shrink-0 ml-4', colors.btn)}>
                    {config.buttonText || 'Click Here'}
                </button>
            </div>
        );
    }

    if (template.id === 'hero-banner') {
        return (
            <div className={cn('w-full p-8 rounded-[2rem] text-center', colors.bg)}>
                {config.badge && (
                    <div className={cn('inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4', colors.badge)}>
                        {config.badge}
                    </div>
                )}
                <h3 className={cn('text-2xl font-black mb-3', colors.text)}>{config.headline || 'Your headline here'}</h3>
                <p className={cn('text-sm mb-6 opacity-80', colors.text)}>{config.subtext || 'Your subtext here'}</p>
                <button className={cn('px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest', colors.btn)}>
                    {config.buttonText || 'CTA Button'}
                </button>
            </div>
        );
    }

    if (template.id === 'inline-card') {
        return (
            <div className={cn('w-full p-6 rounded-[1.5rem] flex items-center gap-6', colors.bg)}>
                <div className="flex-1">
                    {config.badge && <div className={cn('inline-flex text-[9px] px-2 py-1 rounded-lg font-black mb-2', colors.badge)}>{config.badge}</div>}
                    <h3 className={cn('text-lg font-black mb-1', colors.text)}>{config.headline || 'Your headline'}</h3>
                    <p className={cn('text-xs opacity-80', colors.text)}>{config.subtext || 'Subtext here'}</p>
                </div>
                <button className={cn('flex-shrink-0 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider', colors.btn)}>
                    {config.buttonText || 'Go'}
                </button>
            </div>
        );
    }

    if (template.id === 'side-widget') {
        return (
            <div className={cn('w-48 p-5 rounded-[2rem] text-center mx-auto', colors.bg)}>
                <Star className={cn('w-8 h-8 mx-auto mb-3', colors.text, 'opacity-80')} />
                <h3 className={cn('text-sm font-black mb-2', colors.text)}>{config.headline || 'Headline'}</h3>
                <p className={cn('text-[10px] mb-4 opacity-70', colors.text)}>{config.subtext || 'Subtext'}</p>
                <button className={cn('w-full py-2 rounded-xl font-black text-[10px] uppercase tracking-wider', colors.btn)}>
                    {config.buttonText || 'Button'}
                </button>
            </div>
        );
    }

    if (template.id === 'newsletter') {
        return (
            <div className={cn('w-full p-6 rounded-[1.5rem] text-center', colors.bg)}>
                <Mail className={cn('w-8 h-8 mx-auto mb-3', colors.text, 'opacity-80')} />
                <h3 className={cn('text-lg font-black mb-2', colors.text)}>{config.headline || 'Newsletter Headline'}</h3>
                <p className={cn('text-xs mb-4 opacity-80', colors.text)}>{config.subtext}</p>
                {config.badge && <p className={cn('text-[9px] font-black mb-3 opacity-70', colors.text)}>{config.badge}</p>}
                <div className="flex gap-2 max-w-xs mx-auto">
                    <input
                        className="flex-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 border-0 outline-none"
                        placeholder={config.emailPlaceholder || 'your@email.com'}
                        disabled
                    />
                    <button className={cn('px-4 py-2 rounded-xl font-black text-xs', colors.btn)}>
                        {config.buttonText || 'Join'}
                    </button>
                </div>
            </div>
        );
    }

    if (template.id === 'minimal-text') {
        return (
            <div className={cn('w-full p-6 rounded-[1.5rem] border-l-4', colors.bg, `border-l-indigo-500`)}>
                <h3 className={cn('text-base font-black mb-2', colors.text)}>{config.headline || 'Your question/hook here'}</h3>
                <p className={cn('text-sm mb-4 opacity-70', colors.text)}>{config.subtext}</p>
                <a className={cn('text-sm font-black underline underline-offset-2', colors.text === 'text-white' ? 'text-white' : 'text-indigo-600')}>
                    {config.buttonText || 'Learn more →'}
                </a>
            </div>
        );
    }

    if (['whatsapp-group', 'telegram-group', 'youtube-subscribe'].includes(template.id)) {
        const Icon = template.icon;
        return (
            <div className={cn('w-full p-6 rounded-[1.5rem] flex items-center gap-6 border', colors.bg, colors.border)}>
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner bg-white/50', colors.text)}>
                    <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                    {config.badge && <div className={cn('inline-flex text-[9px] px-2 py-1 rounded-lg font-black mb-2', colors.badge)}>{config.badge}</div>}
                    <h3 className={cn('text-lg font-black mb-1', colors.text)}>{config.headline || 'Your headline'}</h3>
                    <p className={cn('text-xs opacity-80', colors.text)}>{config.subtext || 'Subtext here'}</p>
                </div>
                <button className={cn('flex-shrink-0 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider', colors.btn)}>
                    {config.buttonText || 'Go'}
                </button>
            </div>
        );
    }

    if (template.id === 'resource-download') {
        const Icon = template.icon;
        return (
            <div className={cn('w-full p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 shadow-xl', colors.bg)}>
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-10 h-10 text-white drop-shadow-md" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    {config.badge && <div className={cn('inline-flex text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest mb-3', colors.badge)}>{config.badge}</div>}
                    <h3 className={cn('text-2xl font-black mb-2', colors.text)}>{config.headline || 'Free Resource'}</h3>
                    <p className={cn('text-sm opacity-90', colors.text)}>{config.subtext || 'Download our free guide today.'}</p>
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0">
                    <button className={cn('w-full md:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest', colors.btn)}>
                        {config.buttonText || 'Download Free'}
                    </button>
                </div>
            </div>
        );
    }

    return null;
}

export default function CTABuilder({ formData, setFormData }: CTABuilderProps) {
    // Migrate string/object to array securely
    const initialCtas: CTAConfig[] = (() => {
        if (!formData.cta_config) return [];
        if (Array.isArray(formData.cta_config)) return formData.cta_config;
        if (typeof formData.cta_config === 'object') {
            // Give it an ID if it's migrating from the old single-object schema
            return [{ ...formData.cta_config, id: formData.cta_config.id || Math.random().toString(36).substring(2, 9) }];
        }
        return [];
    })();

    const [ctas, setCtas] = useState<CTAConfig[]>(initialCtas);
    const [editingId, setEditingId] = useState<string | null>(null);

    const activeCta = ctas.find(c => c.id === editingId);
    const selectedTemplate = activeCta ? TEMPLATES.find(t => t.id === activeCta.template) || null : null;

    const saveToParent = (newCtas: CTAConfig[]) => {
        setFormData({ ...formData, cta_config: newCtas });
    };

    const handleAddCta = () => {
        const newCta: CTAConfig = {
            id: Math.random().toString(36).substring(2, 9),
            template: '', // Force them to pick a template
            position: 'bottom',
            headline: '',
            subtext: '',
            buttonText: '',
            buttonLink: '',
            badge: '',
            emailPlaceholder: ''
        };
        const updated = [...ctas, newCta];
        setCtas(updated);
        saveToParent(updated);
        setEditingId(newCta.id as string);
    };

    const handleRemoveCta = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updated = ctas.filter(c => c.id !== id);
        setCtas(updated);
        saveToParent(updated);
        if (editingId === id) setEditingId(null);
    };

    const updateActiveCta = (updates: Partial<CTAConfig>) => {
        if (!editingId) return;
        const updated = ctas.map(c => c.id === editingId ? { ...c, ...updates } : c);
        setCtas(updated);
        saveToParent(updated);
    };

    const selectTemplate = (tpl: typeof TEMPLATES[0]) => {
        if (!activeCta) return;
        updateActiveCta({
            template: tpl.id,
            headline: activeCta.headline || tpl.defaults.headline,
            subtext: activeCta.subtext || tpl.defaults.subtext,
            buttonText: activeCta.buttonText || tpl.defaults.buttonText,
            buttonLink: activeCta.buttonLink || tpl.defaults.buttonLink,
            badge: activeCta.badge ?? tpl.defaults.badge,
            emailPlaceholder: (tpl.defaults as any).emailPlaceholder || activeCta.emailPlaceholder
        });
    };

    const resetTemplate = () => {
        if (!selectedTemplate) return;
        updateActiveCta({
            headline: selectedTemplate.defaults.headline,
            subtext: selectedTemplate.defaults.subtext,
            buttonText: selectedTemplate.defaults.buttonText,
            buttonLink: selectedTemplate.defaults.buttonLink,
            badge: selectedTemplate.defaults.badge || '',
        });
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setEditingId(null)}
                        className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                            editingId ? "bg-slate-100 hover:bg-slate-200 text-slate-600" : "bg-indigo-50 text-indigo-600"
                        )}
                    >
                        {editingId ? <ChevronDown className="w-6 h-6 rotate-90" /> : <MousePointer className="w-6 h-6" />}
                    </button>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 leading-none mb-1">
                            {editingId ? 'Edit CTA' : 'CTA Builder'}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {editingId ? 'Customize your selected call-to-action' : 'Manage calls-to-action for this post'}
                        </p>
                    </div>
                </div>
                {!editingId && (
                    <Button onClick={handleAddCta} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 h-10 px-4">
                        <Plus className="w-4 h-4" /> Add CTA
                    </Button>
                )}
            </div>

            {/* Main View: List or Edit */}
            {!editingId ? (
                /* List View */
                <div className="space-y-4">
                    {ctas.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                            <Layers className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">No CTAs configured yet</p>
                            <Button onClick={handleAddCta} variant="outline" className="rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                                <Plus className="w-4 h-4 mr-2" /> Add Your First CTA
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {ctas.map((cta, i) => {
                                const tpl = TEMPLATES.find(t => t.id === cta.template);
                                const Icon = tpl?.icon || LayoutTemplate;
                                const colors = tpl ? colorMap[tpl.color] : colorMap.slate;

                                return (
                                    <motion.div
                                        key={cta.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        onClick={() => setEditingId(cta.id as string)}
                                        className="group relative bg-white border-2 border-slate-100 rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all"
                                    >
                                        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', colors.bg, colors.text)}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-slate-900 truncate">
                                                {cta.headline || (tpl ? `${tpl.name} CTA` : 'Unconfigured CTA')}
                                            </h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded-md">
                                                    Pos: {cta.position}
                                                </span>
                                                <span className="text-[10px] text-slate-400 truncate">
                                                    {tpl?.name || 'Requires configuration'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-indigo-600">
                                                <RefreshCw className="w-4 h-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={(e) => handleRemoveCta(cta.id as string, e)}
                                                className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                /* Edit View */
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-10"
                >
                    {/* Template Picker */}
                    <div>
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-4 block">
                            Step 1 — Pick a Template
                        </Label>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {TEMPLATES.map((tpl) => {
                                const Icon = tpl.icon;
                                const colors = colorMap[tpl.color];
                                const isSelected = selectedTemplate?.id === tpl.id;
                                return (
                                    <button
                                        key={tpl.id}
                                        onClick={() => selectTemplate(tpl)}
                                        className={cn(
                                            'relative p-5 rounded-[1.5rem] border-2 text-left transition-all duration-200 group',
                                            isSelected
                                                ? 'border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100'
                                                : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'
                                        )}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3">
                                                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                            </div>
                                        )}
                                        <div className={cn(
                                            'w-10 h-10 rounded-xl flex items-center justify-center mb-3',
                                            colors.bg,
                                            colors.text,
                                            'opacity-90'
                                        )}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <p className={cn('font-black text-sm mb-1', isSelected ? 'text-indigo-700' : 'text-slate-800')}>
                                            {tpl.name}
                                        </p>
                                        <p className="text-[10px] font-medium text-slate-400 leading-snug">{tpl.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Edit Form & Preview */}
                    <AnimatePresence mode="wait">
                        {activeCta && selectedTemplate ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="grid lg:grid-cols-2 gap-10"
                            >
                                {/* Left: Fields */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                                            Step 2 — Customize Content
                                        </Label>
                                        <button
                                            onClick={resetTemplate}
                                            className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                                        >
                                            <RefreshCw className="w-3 h-3" /> Reset to defaults
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Position on Page</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { value: 'top', label: '⬆️ Top of Article' },
                                                { value: 'mid', label: '🔀 Mid Article' },
                                                { value: 'bottom', label: '⬇️ Bottom of Article' },
                                                { value: 'sticky', label: '📌 Sticky (always visible)' }
                                            ].map(pos => (
                                                <button
                                                    key={pos.value}
                                                    onClick={() => updateActiveCta({ position: pos.value as any })}
                                                    className={cn(
                                                        'px-4 py-3 rounded-xl border-2 font-black text-[10px] uppercase tracking-wider text-left transition-all',
                                                        activeCta.position === pos.value
                                                            ? 'bg-indigo-50 border-indigo-400 text-indigo-700'
                                                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                                                    )}
                                                >
                                                    {pos.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Headline</Label>
                                        <Input
                                            value={activeCta.headline}
                                            onChange={e => updateActiveCta({ headline: e.target.value })}
                                            className="h-12 rounded-2xl border-2 border-slate-100 px-5 font-bold focus:border-indigo-500"
                                            placeholder="Your persuasive headline..."
                                        />
                                    </div>

                                    {selectedTemplate.id !== 'sticky-bar' && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Subtext</Label>
                                            <Textarea
                                                value={activeCta.subtext}
                                                onChange={e => updateActiveCta({ subtext: e.target.value })}
                                                className="min-h-[80px] rounded-2xl border-2 border-slate-100 p-4 font-bold resize-none focus:border-indigo-500"
                                                placeholder="Supporting text that builds trust or explains the offer..."
                                            />
                                        </div>
                                    )}

                                    {selectedTemplate.id !== 'sticky-bar' && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Badge (optional)</Label>
                                            <Input
                                                value={activeCta.badge || ''}
                                                onChange={e => updateActiveCta({ badge: e.target.value })}
                                                className="h-12 rounded-2xl border-2 border-slate-100 px-5 font-bold focus:border-indigo-500"
                                                placeholder="e.g. Free for Students"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Button Text</Label>
                                        <Input
                                            value={activeCta.buttonText}
                                            onChange={e => updateActiveCta({ buttonText: e.target.value })}
                                            className="h-12 rounded-2xl border-2 border-slate-100 px-5 font-bold focus:border-indigo-500"
                                            placeholder="e.g. Get Started Free"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Button Link</Label>
                                        <div className="relative">
                                            <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                            <Input
                                                value={activeCta.buttonLink}
                                                onChange={e => updateActiveCta({ buttonLink: e.target.value })}
                                                className="h-12 rounded-2xl border-2 border-slate-100 pl-10 pr-5 font-bold focus:border-indigo-500"
                                                placeholder="/auth or https://..."
                                            />
                                        </div>
                                    </div>

                                    {selectedTemplate.id === 'newsletter' && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Email Placeholder</Label>
                                            <Input
                                                value={activeCta.emailPlaceholder || ''}
                                                onChange={e => updateActiveCta({ emailPlaceholder: e.target.value })}
                                                className="h-12 rounded-2xl border-2 border-slate-100 px-5 font-bold focus:border-indigo-500"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Right: Live Preview */}
                                <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 block">
                                        Live Preview
                                    </Label>
                                    <div className="bg-slate-50 rounded-[2rem] p-6 border-2 border-slate-100 min-h-[300px] flex flex-col gap-4">
                                        {/* Simulated content */}
                                        <div className="space-y-2 opacity-50">
                                            <div className="h-3 bg-slate-300 rounded-full w-3/4" />
                                            <div className="h-3 bg-slate-300 rounded-full w-full" />
                                            <div className="h-3 bg-slate-300 rounded-full w-5/6" />
                                        </div>

                                        <div className="my-2 shadow-sm rounded-[2rem]">
                                            <CTAPreview config={activeCta} template={selectedTemplate} />
                                        </div>

                                        {selectedTemplate.id !== 'sticky-bar' && (
                                            <div className="space-y-2 opacity-50">
                                                <div className="h-3 bg-slate-300 rounded-full w-full" />
                                                <div className="h-3 bg-slate-300 rounded-full w-4/6" />
                                            </div>
                                        )}
                                    </div>
                                    <Button 
                                        onClick={() => setEditingId(null)} 
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12"
                                    >
                                        Done Editing
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200"
                            >
                                <MousePointer className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Select a template above to get started</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}
