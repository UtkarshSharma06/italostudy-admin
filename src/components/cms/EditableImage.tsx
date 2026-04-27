import React, { useRef, useState } from 'react';
import { useLiveEdit } from '@/contexts/LiveEditContext';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Upload, ImageIcon, Loader2, Image as ImageIconLucide } from 'lucide-react';

interface EditableImageProps {
    fieldKey: string;
    /** Current image URL stored in Supabase */
    currentUrl: string;
    /** Alternative text for the image */
    alt?: string;
    /** CSS class for the image element */
    className?: string;
    /** CSS class for the container */
    containerClassName?: string;
    /** Cloudinary folder to upload to */
    folder?: string;
    /** Fallback icon size */
    iconSize?: number;
    /** Children to render when not in edit mode and no image is present */
    children?: React.ReactNode;
}

export default function EditableImage({
    fieldKey,
    currentUrl,
    alt = 'Image',
    className = 'w-full h-full object-cover',
    containerClassName = '',
    folder = 'cluster-pages/images',
    iconSize = 32,
    children,
}: EditableImageProps) {
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
            console.error('EditableImage upload error:', err);
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    // -----------------------------------------------------------------------
    // Non-edit mode
    // -----------------------------------------------------------------------
    if (!isEditMode) {
        if (currentUrl) {
            return (
                <div className={containerClassName}>
                    <img src={currentUrl} alt={alt} className={className} />
                </div>
            );
        }
        return children ? <>{children}</> : (
            <div className={`${containerClassName} flex items-center justify-center bg-slate-100 rounded-xl`}>
                <ImageIconLucide size={iconSize} className="text-slate-300" />
            </div>
        );
    }

    // -----------------------------------------------------------------------
    // Edit mode
    // -----------------------------------------------------------------------
    return (
        <div className={`relative group ${containerClassName}`}>
            {/* Display current image or placeholder */}
            {currentUrl ? (
                <img src={currentUrl} alt={alt} className={className} />
            ) : (
                <div className="flex items-center justify-center bg-slate-100 rounded-xl w-full h-full min-h-[100px]">
                    {children ?? <ImageIconLucide size={iconSize} className="text-slate-300" />}
                </div>
            )}

            {/* Upload overlay */}
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2
                           bg-indigo-600/80 text-white text-xs font-bold
                           opacity-0 group-hover:opacity-100 transition-all duration-200
                           cursor-pointer p-2 text-center"
                title="Click to replace image"
            >
                {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : saved ? (
                    <span className="text-emerald-300 font-black">✓ Updated</span>
                ) : (
                    <>
                        <Upload className="w-5 h-5" />
                        <span>Upload Image</span>
                    </>
                )}
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
