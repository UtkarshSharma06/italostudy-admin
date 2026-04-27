import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MediaContent } from '@/types/test';
import {
    ImageIcon, TableIcon, Activity as ChartIcon,
    Trash2, Plus, Link as LinkIcon, Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { secureUploadToImageKit } from '@/lib/imagekit';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface MediaEditorProps {
    media: MediaContent | null;
    onChange: (media: MediaContent | null) => void;
}

export default function MediaEditor({ media, onChange }: MediaEditorProps) {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [activeTab, setActiveTab] = useState<'image' | 'table' | 'chart'>(
        media?.type === 'diagram' ? 'image' : (media?.type || 'image') as any
    );

    const updateMedia = (updates: Partial<MediaContent>) => {
        onChange({
            ...media,
            ...updates,
            type: activeTab, // Ensure the type matches the active tab and isn't overwritten by ...media
        } as MediaContent);
    };

    const renderImageEditor = () => (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-400 tracking-widest flex items-center gap-2">
                            <LinkIcon className="w-3 h-3" /> Image URL (WebP/PNG/JPG/SVG)
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Paste image or graph URL..."
                                value={media?.image?.url || ''}
                                onChange={e => updateMedia({ image: { ...media?.image, url: e.target.value } })}
                                className="text-xs h-10 rounded-xl"
                            />
                            <Button variant="outline" className="h-10 w-10 shrink-0 rounded-xl group relative overflow-hidden" disabled={isUploading}>
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin text-indigo-500" /> : <Upload className="w-4 h-4 text-slate-500" />}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                    disabled={isUploading}
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        setIsUploading(true);
                                        try {
                                            const url = await secureUploadToImageKit(file);
                                            updateMedia({ image: { ...media?.image, url } });
                                            toast({ title: "Upload Success", description: "Image hosted on ImageKit.io" });
                                        } catch (err: any) {
                                            toast({
                                                variant: "destructive",
                                                title: "Upload Failed",
                                                description: err.message || "Could not upload image to ImageKit."
                                            });
                                        } finally {
                                            setIsUploading(false);
                                        }
                                    }}
                                />
                            </Button>
                        </div>
                    </div>

                    {/* Image Preview Area */}
                    <div className="space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Preview</Label>
                        <div className="h-24 w-full rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex items-center justify-center overflow-hidden">
                            {media?.image?.url ? (
                                <img
                                    src={media.image.url}
                                    alt="Preview"
                                    className="max-h-full max-w-full object-contain p-2"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                                    }}
                                />
                            ) : (
                                <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">No Image Loaded</div>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-muted-foreground italic">Use ImageKit for uploads or paste any graph/image URL.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-slate-400">Alt Text</Label>
                    <Input
                        placeholder="Description..."
                        value={media?.image?.alt || ''}
                        onChange={e => updateMedia({ image: { ...media?.image, alt: e.target.value } })}
                        className="text-xs h-9"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-slate-400">Caption</Label>
                    <Input
                        placeholder="Optional caption..."
                        value={media?.image?.caption || ''}
                        onChange={e => updateMedia({ image: { ...media?.image, caption: e.target.value } })}
                        className="text-xs h-9"
                    />
                </div>
            </div>
        </div>
    );

    const renderTableEditor = () => {
        const table = media?.table || { headers: ['Column 1', 'Column 2'], rows: [['Data 1', 'Data 2']] };

        const addRow = () => {
            const newRows = [...table.rows, new Array(table.headers.length).fill('')];
            updateMedia({ table: { ...table, rows: newRows } });
        };

        const addColumn = () => {
            const newHeaders = [...table.headers, `Column ${table.headers.length + 1}`];
            const newRows = table.rows.map(row => [...row, '']);
            updateMedia({ table: { ...table, headers: newHeaders, rows: newRows } });
        };

        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="overflow-x-auto border border-border rounded-xl">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 dark:bg-muted font-bold">
                            <tr>
                                {table.headers.map((h, i) => (
                                    <th key={i} className="p-2 border-b border-r border-border">
                                        <input
                                            value={h}
                                            onChange={e => {
                                                const next = [...table.headers]; next[i] = e.target.value;
                                                updateMedia({ table: { ...table, headers: next } });
                                            }}
                                            className="bg-transparent w-full focus:outline-none"
                                        />
                                    </th>
                                ))}
                                <th className="w-8 border-b border-border"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {table.rows.map((row, i) => (
                                <tr key={i}>
                                    {row.map((cell, j) => (
                                        <td key={j} className="p-2 border-b border-r border-border">
                                            <input
                                                value={cell}
                                                onChange={e => {
                                                    const nextRows = [...table.rows]; nextRows[i] = [...nextRows[i]]; nextRows[i][j] = e.target.value;
                                                    updateMedia({ table: { ...table, rows: nextRows } });
                                                }}
                                                className="bg-transparent w-full focus:outline-none"
                                            />
                                        </td>
                                    ))}
                                    <td className="p-1 border-b border-border">
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-rose-500" onClick={() => {
                                            const nextRows = table.rows.filter((_, idx) => idx !== i);
                                            updateMedia({ table: { ...table, rows: nextRows } });
                                        }}><Trash2 className="w-3 h-3" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={addRow} className="text-[10px] h-8 rounded-lg"><Plus className="w-3 h-3 mr-1" /> Row</Button>
                    <Button variant="outline" size="sm" onClick={addColumn} className="text-[10px] h-8 rounded-lg"><Plus className="w-3 h-3 mr-1" /> Column</Button>
                </div>
            </div>
        );
    };

    const renderChartEditor = () => {
        const chart = media?.chart || { chartType: 'bar', data: [{ name: 'A', value: 10 }, { name: 'B', value: 20 }] };

        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="grid grid-cols-3 gap-2">
                    {['bar', 'line', 'pie'].map((type) => (
                        <Button
                            key={type}
                            variant={chart.chartType === type ? 'default' : 'outline'}
                            className="h-12 rounded-xl text-[10px] font-black uppercase tracking-widest flex flex-col gap-1"
                            onClick={() => updateMedia({ chart: { ...chart, chartType: type as any } })}
                        >
                            {type}
                        </Button>
                    ))}
                </div>
                <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400">Chart Data (JSON)</Label>
                    <Textarea
                        className="font-mono text-[10px] h-32"
                        value={JSON.stringify(chart.data, null, 2)}
                        onChange={e => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                updateMedia({ chart: { ...chart, data: parsed } });
                            } catch (err) { }
                        }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-400">X-Axis Key</Label>
                        <Input placeholder="name" value={chart.xKey || ''} onChange={e => updateMedia({ chart: { ...chart, xKey: e.target.value } })} className="text-xs h-9" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-400">Y-Axis Key</Label>
                        <Input placeholder="value" value={chart.yKey || ''} onChange={e => updateMedia({ chart: { ...chart, yKey: e.target.value } })} className="text-xs h-9" />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] flex items-center gap-2">
                    Rich Media
                    {media && (
                        <Button variant="ghost" size="icon" className="h-5 w-5 text-rose-500" onClick={() => onChange(null)}>
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    )}
                </h4>
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-border shadow-sm">
                    <Button variant={activeTab === 'image' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('image')} className="h-7 px-2 rounded-lg"><ImageIcon className="w-3.5 h-3.5" /></Button>
                    <Button variant={activeTab === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('table')} className="h-7 px-2 rounded-lg"><TableIcon className="w-3.5 h-3.5" /></Button>
                    <Button variant={activeTab === 'chart' ? 'secondary' : 'ghost'} size="sm" onClick={() => setActiveTab('chart')} className="h-7 px-2 rounded-lg"><ChartIcon className="w-3.5 h-3.5" /></Button>
                </div>
            </div>

            {activeTab === 'image' && renderImageEditor()}
            {activeTab === 'table' && renderTableEditor()}
            {activeTab === 'chart' && renderChartEditor()}
        </div>
    );
}
