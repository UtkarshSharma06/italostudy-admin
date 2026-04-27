import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLiveEdit } from '@/contexts/LiveEditContext';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function isHtml(v: string) { return v.includes('<span'); }
function isMarkdown(v: string) {
    if (!v) return false;
    return v.includes('|---') || v.includes('| :') || v.includes('**') || v.includes('###') || v.startsWith('#');
}

function normaliseRaw(raw: string): string {
    if (!raw) return raw;
    try {
        if (raw.startsWith('{"__rich"')) {
            const p = JSON.parse(raw) as { text: string; color?: string; gradient?: { from: string; to: string; direction?: string } };
            const t = p.text ?? '';
            if (p.gradient) {
                const d = p.gradient.direction ?? 'to right';
                return `<span style="background-image:linear-gradient(${d},${p.gradient.from},${p.gradient.to});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;display:inline">${t}</span>`;
            }
            if (p.color) return `<span style="color:${p.color}">${t}</span>`;
            return t;
        }
    } catch { /* not JSON */ }
    return raw;
}

function sanitise(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const walk = (node: Node) => {
        [...node.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) return;
            const el = child as HTMLElement;
            if (el.tagName === 'SPAN') { el.removeAttribute('class'); el.removeAttribute('id'); walk(el); }
            else child.replaceWith(document.createTextNode(el.textContent ?? ''));
        });
    };
    walk(tmp);
    return tmp.innerHTML;
}

// ---------------------------------------------------------------------------
// Colour presets
// ---------------------------------------------------------------------------
const SOLID_PRESETS = ['#0f172a', '#1e40af', '#6366f1', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#16a34a', '#0891b2', '#f8fafc'];
const GRADIENT_PRESETS: [string, string, string][] = [
    ['Indigo→Purple', '#6366f1', '#8b5cf6'],
    ['Blue→Cyan', '#3b82f6', '#06b6d4'],
    ['Pink→Rose', '#ec4899', '#f43f5e'],
    ['Green→Teal', '#22c55e', '#14b8a6'],
    ['Orange→Yellow', '#f97316', '#eab308'],
    ['Violet→Pink', '#8b5cf6', '#ec4899'],
    ['Sky→Indigo', '#38bdf8', '#6366f1'],
    ['Gold', '#f59e0b', '#92400e'],
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface EditableTextProps {
    fieldKey: string;
    fallback?: string;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
    multiline?: boolean;
    placeholder?: string;
}

// ---------------------------------------------------------------------------
// EditableText — content always lives in the ref; never conditionally unmounted
// ---------------------------------------------------------------------------
export default function EditableText({ fieldKey, fallback = '', as: Tag = 'span', className = '', children, multiline = false }: EditableTextProps) {
    const { isEditMode, saveField, getRawField } = useLiveEdit();
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [toolbar, setToolbar] = useState<{ visible: boolean; x: number; y: number }>({ visible: false, x: 0, y: 0 });
    const [tbMode, setTbMode] = useState<'solid' | 'gradient'>('solid');
    const [solidColor, setSolidColor] = useState('#6366f1');
    const [gradFrom, setGradFrom] = useState('#6366f1');
    const [gradTo, setGradTo] = useState('#8b5cf6');
    const [gradDir, setGradDir] = useState('to right');

    const ref = useRef<HTMLElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const savedRange = useRef<Range | null>(null);
    // Track last synced value so we don't overwrite while editing
    const lastSynced = useRef('');

    const rawValue = normaliseRaw(getRawField(fieldKey));
    const displayFallback = typeof children === 'string' ? children : fallback;

    // ── Sync innerHTML whenever content changes (but NOT while user is typing) ──
    useEffect(() => {
        if (!ref.current || isEditing) return;
        const target = rawValue || displayFallback;
        if (target === lastSynced.current) return;
        lastSynced.current = target;

        // If we're rendering markdown via component, we don't set innerHTML 
        // to avoid clashing with React rendering
        if (isMarkdown(target)) return;

        if (isHtml(target)) {
            ref.current.innerHTML = target;
        } else {
            ref.current.textContent = target;
        }
    }); // run every render — guarded by isEditing & lastSynced checks

    // ── Focus after entering edit ──
    useEffect(() => {
        if (isEditing && ref.current) {
            ref.current.focus();
            const s = window.getSelection();
            const r = document.createRange();
            r.selectNodeContents(ref.current);
            r.collapse(false);
            s?.removeAllRanges();
            s?.addRange(r);
        }
    }, [isEditing]);

    // ── Selection → show toolbar ──
    const checkSelection = useCallback(() => {
        if (!isEditing || !isEditMode) return;
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !ref.current?.contains(sel.anchorNode)) {
            setToolbar(prev => prev.visible ? { ...prev, visible: false } : prev);
            return;
        }
        savedRange.current = sel.getRangeAt(0).cloneRange();
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        setToolbar({ visible: true, x: rect.left + rect.width / 2, y: rect.top });
    }, [isEditing, isEditMode]);

    useEffect(() => {
        document.addEventListener('selectionchange', checkSelection);
        return () => document.removeEventListener('selectionchange', checkSelection);
    }, [checkSelection]);

    // ── Apply colour to selection ──
    function applyToSelection(mode: 'solid' | 'gradient' | 'clear') {
        const sel = window.getSelection();
        if (savedRange.current) { sel?.removeAllRanges(); sel?.addRange(savedRange.current); }
        if (!sel || sel.isCollapsed) return;
        const range = sel.getRangeAt(0);
        if (mode === 'clear') { document.execCommand('removeFormat'); setToolbar(t => ({ ...t, visible: false })); saveCurrentContent(); return; }
        const span = document.createElement('span');
        if (mode === 'solid') {
            span.style.color = solidColor;
        } else {
            span.style.backgroundImage = `linear-gradient(${gradDir}, ${gradFrom}, ${gradTo})`;
            span.style.webkitBackgroundClip = 'text';
            span.style.webkitTextFillColor = 'transparent';
            span.style.backgroundClip = 'text';
            span.style.display = 'inline';
        }
        try { range.surroundContents(span); } catch { const f = range.extractContents(); span.appendChild(f); range.insertNode(span); }
        sel.removeAllRanges();
        setToolbar(t => ({ ...t, visible: false }));
        saveCurrentContent();
    }

    async function saveCurrentContent() {
        if (!ref.current) return;
        const html = sanitise(ref.current.innerHTML);
        const plain = ref.current.innerText;
        const toStore = isHtml(html) ? html : plain;
        lastSynced.current = toStore;
        await saveField(fieldKey, toStore);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    function handleBlur(e: React.FocusEvent) {
        if (toolbarRef.current?.contains(e.relatedTarget as Node)) return;
        setIsEditing(false);
        setToolbar(t => ({ ...t, visible: false }));
        saveCurrentContent();
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (!multiline && e.key === 'Enter') { e.preventDefault(); ref.current?.blur(); }
        if (e.key === 'Escape') { setIsEditing(false); setToolbar(t => ({ ...t, visible: false })); }
    }

    // ── Always render the SAME element — only change behaviour ──
    // (Never conditionally unmount so ref content is preserved)
    const editRing = !isEditMode ? '' : isEditing
        ? 'outline outline-2 outline-indigo-500 outline-offset-2'
        : 'outline outline-2 outline-dashed outline-indigo-300/60 outline-offset-2 hover:outline-indigo-500 cursor-pointer';

    return (
        <>
            {/* Selection colour toolbar — only in edit mode */}
            {isEditMode && toolbar.visible && (
                <div
                    ref={toolbarRef}
                    tabIndex={-1}
                    onMouseDown={e => e.preventDefault()}
                    style={{
                        position: 'fixed',
                        left: Math.max(10, Math.min(toolbar.x - 160, window.innerWidth - 340)),
                        top: Math.max(10, toolbar.y - 172),
                        zIndex: 99999,
                    }}
                    className="w-[320px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 flex flex-col gap-2"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Format Selection</span>
                        <button onClick={() => setToolbar(t => ({ ...t, visible: false }))} className="text-slate-600 hover:text-slate-400 text-sm leading-none">✕</button>
                    </div>
                    <div className="flex gap-1">
                        {(['solid', 'gradient'] as const).map(m => (
                            <button key={m} onClick={() => setTbMode(m)} className={`flex-1 py-1 rounded-lg text-[10px] font-black ${tbMode === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                {m === 'solid' ? '🎨 Color' : '🌈 Gradient'}
                            </button>
                        ))}
                        <button onClick={() => applyToSelection('clear')} className="px-2 py-1 rounded-lg text-[10px] font-black bg-slate-800 text-slate-400 hover:bg-slate-700">× Reset</button>
                    </div>

                    {tbMode === 'solid' && (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-1.5">
                                {SOLID_PRESETS.map(c => (
                                    <button key={c} onClick={() => setSolidColor(c)} title={c}
                                        className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${solidColor === c ? 'border-white scale-110' : 'border-slate-600'}`}
                                        style={{ background: c }} />
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="color" value={solidColor} onChange={e => setSolidColor(e.target.value)} className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent" />
                                <code className="text-[10px] text-slate-400">{solidColor}</code>
                                <span className="ml-auto text-lg font-black" style={{ color: solidColor }}>Aa</span>
                            </div>
                        </div>
                    )}

                    {tbMode === 'gradient' && (
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-1">
                                {GRADIENT_PRESETS.map(([label, from, to]) => (
                                    <button key={label} onClick={() => { setGradFrom(from); setGradTo(to); }}
                                        className="px-2 h-5 rounded-full text-[9px] font-black text-white hover:scale-105 transition-transform"
                                        style={{ background: `linear-gradient(to right,${from},${to})` }}>{label}</button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="color" value={gradFrom} onChange={e => setGradFrom(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent" />
                                <span className="text-slate-400">→</span>
                                <input type="color" value={gradTo} onChange={e => setGradTo(e.target.value)} className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent" />
                                <div className="flex-1 h-5 rounded text-[9px] font-black text-white flex items-center justify-center"
                                    style={{ background: `linear-gradient(${gradDir},${gradFrom},${gradTo})` }}>preview</div>
                            </div>
                            <div className="flex gap-1">
                                {(['to right', 'to bottom', '135deg', '45deg'] as const).map(d => (
                                    <button key={d} onClick={() => setGradDir(d)} className={`flex-1 py-0.5 rounded text-[10px] font-bold ${gradDir === d ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                        {d === 'to right' ? '→' : d === 'to bottom' ? '↓' : d === '135deg' ? '↘' : '↗'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <button onClick={() => applyToSelection(tbMode)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black">
                        ✓ Apply to selection
                    </button>
                </div>
            )}

            <span className="relative group inline-block">
                {isEditMode && !isEditing && (
                    <span className="absolute -top-7 left-0 z-50 hidden group-hover:flex items-center gap-1 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none">
                        ✏️ Double-click · select words to colour
                    </span>
                )}
                {saved && (
                    <span className="absolute -top-7 right-0 z-50 flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg whitespace-nowrap pointer-events-none">✓ Saved</span>
                )}
                {!isEditing && isMarkdown(rawValue || displayFallback) ? (
                    React.createElement(Tag as any, {
                        ref: ref as any,
                        onDoubleClick: isEditMode ? () => setIsEditing(true) : undefined,
                        className: `${className} ${editRing} transition-all duration-150 rounded-sm prose-table:w-full prose-table:border-collapse prose-th:border prose-th:p-2 prose-td:border prose-td:p-2`,
                        children: <ReactMarkdown>{rawValue || displayFallback}</ReactMarkdown>
                    })
                ) : (
                    React.createElement(Tag as any, {
                        ref: ref as any,
                        contentEditable: isEditMode && isEditing,
                        suppressContentEditableWarning: true,
                        onDoubleClick: isEditMode ? () => setIsEditing(true) : undefined,
                        onBlur: isEditMode ? handleBlur : undefined,
                        onKeyDown: isEditMode ? handleKeyDown : undefined,
                        className: `${className} ${editRing} transition-all duration-150 rounded-sm`,
                    })
                )}
            </span>
        </>
    );
}
