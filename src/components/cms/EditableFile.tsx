import React, { useRef, useState } from 'react';
import { useLiveEdit } from '@/contexts/LiveEditContext';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Upload, FileText, Loader2, ExternalLink } from 'lucide-react';

interface EditableFileProps {
    fieldKey: string;
    /** Current URL stored in Supabase (or empty if not yet set) */
    currentUrl: string;
    /** Text label on the download button when no file is set */
    placeholder?: string;
    /** Wraps an existing download element; if omitted renders a default button */
    children?: React.ReactNode;
    className?: string;
    folder?: string;
    /** File formats to accept (e.g., ".pdf,.doc" or "image/*") */
    accept?: string;
}

export default function EditableFile({
    fieldKey,
    currentUrl,
    placeholder = 'Download',
    children,
    className = '',
    folder = 'cluster-pages/files',
    accept = '.pdf,.doc,.docx,.zip',
}: EditableFileProps) {
    const { isEditMode, pageSlug, saveField } = useLiveEdit();
    const [uploading, setUploading] = useState(false);
    const [saved, setSaved] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const { secure_url } = await uploadToCloudinary(file, `${folder}/${pageSlug}`);
            await saveField(fieldKey, secure_url);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error('EditableFile upload error:', err);
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    // -----------------------------------------------------------------------
    // Non-edit mode — just render the children or a plain download link
    // -----------------------------------------------------------------------
    if (!isEditMode) {
        if (children) {
            return <>{children}</>;
        }
        if (currentUrl) {
            return (
                <a href={currentUrl} target="_blank" rel="noopener noreferrer" className={className}>
                    {placeholder}
                </a>
            );
        }
        return null;
    }

    // -----------------------------------------------------------------------
    // Edit mode — overlay upload controls
    // -----------------------------------------------------------------------
    return (
        <div className="relative inline-flex group items-center">
            {/* Existing content */}
            {children ?? (
                currentUrl ? (
                    <a href={currentUrl} target="_blank" rel="noopener noreferrer" className={className}>
                        {placeholder}
                    </a>
                ) : (
                    <span className="opacity-40 text-sm italic">{placeholder} (no file yet)</span>
                )
            )}

            {/* Upload overlay — appears on hover in edit mode */}
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 flex items-center justify-center gap-1.5
                           bg-indigo-600/90 text-white text-xs font-bold rounded-lg
                           opacity-0 group-hover:opacity-100 transition-all duration-200
                           shadow-lg cursor-pointer"
                title="Click to replace file"
            >
                {uploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : saved ? (
                    <span className="text-emerald-300">✓ Uploaded</span>
                ) : (
                    <>
                        <Upload className="w-3.5 h-3.5" />
                        Replace File
                    </>
                )}
            </button>

            {/* Current URL badge */}
            {isEditMode && currentUrl && (
                <a
                    href={currentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 flex items-center gap-1 text-[10px] font-bold text-indigo-600
                               bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-full
                               hover:bg-indigo-100 transition-colors"
                    title="Open current file"
                >
                    <FileText className="w-2.5 h-2.5" />
                    <ExternalLink className="w-2.5 h-2.5" />
                </a>
            )}

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
