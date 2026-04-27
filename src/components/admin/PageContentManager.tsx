import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PAGE_CONTENT_DEFINITIONS, ContentField } from '@/config/pageContentFields';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    FileEdit,
    Save,
    RefreshCw,
    Upload,
    ChevronRight,
    ExternalLink,
    Loader2,
    FileText,
    CheckCircle2,
    Globe,
    Eye,
    Settings2,
    AlertTriangle,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type FieldValues = Record<string, string>;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
function FieldLabel({ field }: { field: ContentField }) {
    return (
        <div className="mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {field.label}
            </span>
            {(field.type === 'file' || field.type === 'image') && (
                <span className="ml-2 text-[9px] font-bold text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded-full">
                    Cloudinary {field.type === 'image' ? 'Image' : 'PDF'}
                </span>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// File upload field
// ---------------------------------------------------------------------------
function FileField({
    field,
    value,
    pageSlug,
    onChange,
}: {
    field: ContentField;
    value: string;
    pageSlug: string;
    onChange: (val: string) => void;
}) {
    const [uploading, setUploading] = useState(false);
    const { toast } = useToast();
    const inputRef = useRef<HTMLInputElement>(null);

    const isImage = field.type === 'image';

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const { secure_url } = await uploadToCloudinary(file, `cluster-pages/${pageSlug}`);
            onChange(secure_url);
            toast({ title: 'Uploaded ✓', description: file.name });
        } catch (err: any) {
            toast({ variant: 'destructive', title: 'Upload Failed', description: err.message });
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            {value ? (
                <div className="flex flex-col gap-2">
                    {isImage && (
                        <div className="w-full max-w-[140px] aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                            <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-medium text-emerald-700 truncate flex-1 hover:underline"
                        >
                            {value.split('/').pop()}
                        </a>
                        <ExternalLink className="w-3 h-3 text-emerald-500 shrink-0" />
                    </div>
                </div>
            ) : (
                <div className="h-9 border border-dashed border-slate-200 rounded-xl flex items-center px-4 text-[10px] text-slate-400">
                    No {isImage ? 'image' : 'file'} uploaded
                </div>
            )}
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-[10px] h-8 flex-1"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                >
                    {uploading ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1.5" />
                    ) : (
                        <Upload className="w-3 h-3 mr-1.5" />
                    )}
                    {uploading ? 'Uploading…' : value ? `Replace` : `Upload`}
                </Button>
                <input
                    ref={inputRef}
                    type="file"
                    accept={isImage ? "image/*" : ".pdf,.doc,.docx"}
                    className="hidden"
                    onChange={handleFile}
                />
                {value && (
                    <Input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="text-[10px] rounded-xl h-8"
                        placeholder="Direct URL"
                    />
                )}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Repeater Field (Manage lists of items)
// ---------------------------------------------------------------------------
function RepeaterField({
    field,
    values,
    setValues,
    pageSlug,
    renderSingleField
}: {
    field: ContentField;
    values: FieldValues;
    setValues: React.Dispatch<React.SetStateAction<FieldValues>>;
    setSaved: (val: boolean) => void;
    pageSlug: string;
    renderSingleField: (field: ContentField) => React.ReactNode;
}) {
    const rawIds = values[field.key] || '[]';
    let ids: string[] = [];
    try { ids = JSON.parse(rawIds); if (!Array.isArray(ids)) ids = []; } catch { ids = []; }

    const updateIds = (newIds: string[]) => {
        setValues(prev => {
            const next = { ...prev, [field.key]: JSON.stringify(newIds) };
            return next;
        });
        // Call parent's saved state setter if we add/remove items
        setSaved(false);
    };

    const addItem = () => {
        const id = Math.random().toString(36).substring(2, 9);
        updateIds([...ids, id]);
    };

    const removeItem = (idToRemove: string) => {
        if (!confirm('Are you sure you want to remove this item? This will hide its data from the page.')) return;
        updateIds(ids.filter(id => id !== idToRemove));
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newIds = [...ids];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newIds.length) return;
        [newIds[index], newIds[targetIndex]] = [newIds[targetIndex], newIds[index]];
        updateIds(newIds);
    };

    const importDefaults = () => {
        if (!field.defaultItems || field.defaultItems.length === 0) return;

        const newIds: string[] = [];
        const newValues: FieldValues = { ...values };

        field.defaultItems.forEach(item => {
            const id = Math.random().toString(36).substring(2, 9);
            newIds.push(id);

            // Map each default field to the unique repeater key
            Object.entries(item).forEach(([subKey, val]) => {
                newValues[`${field.key}_${id}_${subKey}`] = val;
            });
        });

        setValues(newValues);
        updateIds(newIds);
        toast({
            title: "Defaults Imported",
            description: `Loaded ${field.defaultItems.length} items from configuration.`
        });
    };

    return (
        <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                    {field.label} ({ids.length})
                </span>
                <div className="flex items-center gap-2">
                    {ids.length === 0 && field.defaultItems && (
                        <Button
                            onClick={importDefaults}
                            variant="outline"
                            size="sm"
                            className="h-8 rounded-xl border-indigo-100 text-indigo-600 hover:bg-indigo-50 text-[10px] font-black uppercase"
                        >
                            Import Defaults
                        </Button>
                    )}
                    <Button onClick={addItem} size="sm" className="h-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-[10px] font-black uppercase">
                        Add {field.label.replace(' Selection', '').replace('s', '')}
                    </Button>
                </div>
            </div>

            {ids.length === 0 ? (
                <div className="py-12 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 gap-2">
                    <AlertTriangle size={24} className="opacity-20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-center px-6">
                        No items added yet. Click "Add" or "Import Defaults".
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {ids.map((id, index) => (
                        <div key={id} className="group relative bg-slate-50/50 rounded-[2rem] border border-slate-100 p-6 md:p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5">
                            {/* Controls */}
                            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1.5 hover:bg-indigo-50 text-indigo-400 disabled:opacity-20 rounded-lg">
                                    <ChevronRight className="-rotate-90 w-4 h-4" />
                                </button>
                                <button onClick={() => moveItem(index, 'down')} disabled={index === ids.length - 1} className="p-1.5 hover:bg-indigo-50 text-indigo-400 disabled:opacity-20 rounded-lg">
                                    <ChevronRight className="rotate-90 w-4 h-4" />
                                </button>
                                <button onClick={() => removeItem(id)} className="p-1.5 hover:bg-rose-50 text-rose-400 rounded-lg">
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                    Item #{index + 1}
                                </span>
                            </div>

                            <div className="space-y-6">
                                {field.itemFields?.map(sub => {
                                    // Construct a unique key for this item's field
                                    const subKey = `${field.key}_${id}_${sub.key}`;
                                    return renderSingleField({ ...sub, key: subKey });
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function PageContentManager() {
    const { toast } = useToast();

    const [selectedSlug, setSelectedSlug] = useState<string>(PAGE_CONTENT_DEFINITIONS[0].slug);
    const [values, setValues] = useState<FieldValues>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newSlug, setNewSlug] = useState('');
    const [updatingSlug, setUpdatingSlug] = useState(false);
    const [previewKey, setPreviewKey] = useState(0); // increment to force iframe reload
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const selectedPage = PAGE_CONTENT_DEFINITIONS.find((p) => p.slug === selectedSlug)!;

    // -----------------------------------------------------------------------
    // Load existing content from Supabase
    // -----------------------------------------------------------------------
    const loadContent = useCallback(async (slug: string) => {
        setLoading(true);
        const { data, error } = await (supabase as any)
            .from('page_content')
            .select('field_key, field_value')
            .eq('page_slug', slug);

        if (!error && data) {
            const map: FieldValues = {};
            (data as { field_key: string; field_value: string }[]).forEach((row) => {
                map[row.field_key] = row.field_value;
            });
            setValues(map);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadContent(selectedSlug);
        setSaved(false);
        setNewSlug(selectedSlug);
    }, [selectedSlug, loadContent]);

    // -----------------------------------------------------------------------
    // Save to Supabase
    // -----------------------------------------------------------------------
    const handleSave = async () => {
        setSaving(true);
        const rows = Object.entries(values)
            .map(([field_key, field_value]) => ({
                page_slug: selectedSlug,
                field_key,
                field_value,
            }));

        if (rows.length === 0) {
            toast({ title: 'Nothing to save', description: 'Edit some fields first.' });
            setSaving(false);
            return;
        }

        const { error } = await (supabase as any)
            .from('page_content')
            .upsert(rows, { onConflict: 'page_slug,field_key' });

        if (error) {
            toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
        } else {
            toast({ title: 'Published ✓', description: `${rows.length} fields saved for "${selectedPage.title}"` });
            setSaved(true);
            setPreviewKey((k) => k + 1); // refresh iframe
        }
        setSaving(false);
    };

    // -----------------------------------------------------------------------
    // Field change handler
    // -----------------------------------------------------------------------
    const setField = (key: string, val: string) => {
        setSaved(false);
        setValues((prev) => ({ ...prev, [key]: val }));
    };

    // -----------------------------------------------------------------------
    // Bulk Update Slug in Supabase
    // -----------------------------------------------------------------------
    const handleUpdateSlug = async () => {
        if (!newSlug || newSlug === selectedSlug) return;

        if (!confirm(`CAUTION: This will rename ALL existing content records from "${selectedSlug}" to "${newSlug}". 

You MUST also manually update the slug in:
1. App.tsx (routes)
2. pageContentFields.ts (definitions)

Continue?`)) return;

        setUpdatingSlug(true);
        const { error } = await (supabase as any)
            .from('page_content')
            .update({ page_slug: newSlug })
            .eq('page_slug', selectedSlug);

        if (error) {
            toast({ variant: 'destructive', title: 'Slug Migration Failed', description: error.message });
        } else {
            toast({
                title: 'Slug Migrated ✓',
                description: `Database records moved to "${newSlug}". Now update your code!`
            });
            setSelectedSlug(newSlug);
        }
        setUpdatingSlug(false);
    };

    // -----------------------------------------------------------------------
    // Render a single field (logic separated to be reused by Repeater)
    // -----------------------------------------------------------------------
    const renderSingleField = (field: ContentField) => {
        const val = values[field.key] ?? '';
        return (
            <div key={field.key} className="space-y-1">
                <FieldLabel field={field} />
                {field.type === 'file' || field.type === 'image' ? (
                    <FileField
                        field={field}
                        value={val}
                        pageSlug={selectedSlug}
                        onChange={(v) => setField(field.key, v)}
                    />
                ) : field.type === 'textarea' ? (
                    <Textarea
                        value={val}
                        onChange={(e) => setField(field.key, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}…`}
                        className="text-sm rounded-xl min-h-[80px] resize-y"
                    />
                ) : (
                    <Input
                        value={val}
                        onChange={(e) => setField(field.key, e.target.value)}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}…`}
                        className="text-sm rounded-xl h-10"
                    />
                )}
            </div>
        );
    };

    // -----------------------------------------------------------------------
    // Render a field (including complex types like Repeater)
    // -----------------------------------------------------------------------
    const renderField = (field: ContentField) => {
        if (field.type === 'repeater') {
            return (
                <RepeaterField
                    key={field.key}
                    field={field}
                    values={values}
                    setValues={setValues}
                    setSaved={setSaved}
                    pageSlug={selectedSlug}
                    renderSingleField={renderSingleField}
                />
            );
        }
        return renderSingleField(field);
    };

    // Live preview base URL (dev server)
    const previewUrl = `${window.location.origin}${selectedPage.path}`;

    // -----------------------------------------------------------------------
    // UI
    // -----------------------------------------------------------------------
    return (
        <div className="min-h-[calc(100vh-120px)] bg-slate-50/30 -mx-4 lg:-mx-6 xl:-mx-10 pb-20">
            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header Area - Sticky */}
                <div className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur-md -mx-4 px-4 py-4 mb-8 border-b border-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100 hidden sm:block">
                            <FileEdit className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {selectedPage.title}
                            </h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                {selectedSlug}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 h-12 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-600 transition-all text-sm"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live Page
                        </a>
                        <Button
                            onClick={handleSave}
                            disabled={saving || loading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 px-8 font-black text-sm shadow-xl shadow-indigo-100"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : saved ? (
                                <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-300" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            {saving ? 'Saving…' : saved ? 'Published ✓' : 'Save & Publish'}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT: Page Selector */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block mb-4 ml-1">
                                Select Cluster Page
                            </label>
                            <div className="space-y-1.5">
                                {PAGE_CONTENT_DEFINITIONS.map((page) => (
                                    <button
                                        key={page.slug}
                                        onClick={() => setSelectedSlug(page.slug)}
                                        className={`w-full flex items-center justify-between text-left px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${selectedSlug === page.slug
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 translate-x-1'
                                            : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className="truncate">{page.title}</span>
                                        {selectedSlug === page.slug && <ChevronRight className="w-4 h-4 shrink-0" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Slug Management Box */}
                        <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Settings2 size={80} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                                    <Settings2 size={16} />
                                    Slug Management
                                </h4>
                                <div className="space-y-4">
                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                        Renaming a slug moves all database records. You <span className="text-white font-bold underline">must</span> sync App.tsx manually.
                                    </p>
                                    <div className="space-y-2">
                                        <Input
                                            value={newSlug}
                                            onChange={(e) => setNewSlug(e.target.value)}
                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 h-11 rounded-xl text-xs"
                                        />
                                        <Button
                                            onClick={handleUpdateSlug}
                                            disabled={updatingSlug || newSlug === selectedSlug}
                                            className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-xl h-11"
                                        >
                                            {updatingSlug ? <Loader2 size={16} className="animate-spin" /> : 'Update Slug'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Fields Editor */}
                    <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 md:p-10">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50">
                                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                    <FileText className="text-indigo-600" />
                                    Edit Content
                                </h3>
                                <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {selectedPage.fields.length} Active Fields
                                </div>
                            </div>

                            {loading ? (
                                <div className="py-20 flex flex-col items-center justify-center gap-4">
                                    <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Fetching page data...</p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    {selectedPage.fields.map(renderField)}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
