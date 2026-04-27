import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';

declare global {
    interface Window {
        renderMathInElement?: (el: HTMLElement, options: any) => void;
    }
}

interface TinyEditorProps {
    value: string;
    onChange: (content: string) => void;
    height?: number;
}

export default function TinyEditor({ value, onChange, height = 600 }: TinyEditorProps) {
    const editorRef = useRef<any>(null);
    const { toast } = useToast();

    // Custom image upload handler
    const handleImageUpload = async (blobInfo: any): Promise<string> => {
        try {
            const blob = blobInfo.blob();
            // Upload to Cloudinary instead of Supabase Storage
            const result = await uploadToCloudinary(blob, 'editor');
            return result.secure_url;
        } catch (error: any) {
            toast({
                title: 'Image Upload Failed',
                description: error.message || 'Ensure "learning-assets" bucket exists.',
                variant: 'destructive'
            });
            throw error;
        }
    };

    return (
        <div className="tinymce-wrapper">
            <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                onEditorChange={onChange}
                init={{
                    height,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount', 'paste',
                        'quickbars', 'math'
                    ],
                    toolbar: "undo redo | blocks | bold italic underline strikethrough | " +
                        "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                        "forecolor backcolor removeformat | link image media table | customMath | code fullscreen preview",
                    content_style: `
                        body { 
                            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                            font-size: 14px;
                            line-height: 1.7;
                            padding: 16px;
                        }
                        h1, h2, h3, h4, h5, h6 { 
                            font-weight: 800; 
                            margin-top: 1.5em; 
                            margin-bottom: 0.75em;
                            line-height: 1.3;
                        }
                        h1 { font-size: 2.25em; }
                        h2 { font-size: 1.875em; }
                        h3 { font-size: 1.5em; }
                        p { margin-bottom: 1em; }
                        img { max-width: 100%; height: auto; border-radius: 8px; margin: 1em 0; }
                        a { color: #4f46e5; text-decoration: underline; }
                        code { 
                            background: #f1f5f9; 
                            padding: 2px 6px; 
                            border-radius: 4px; 
                            font-family: 'Courier New', monospace;
                            font-size: 0.9em;
                        }
                        pre { 
                            background: #f1f5f9; 
                            padding: 16px; 
                            border-radius: 8px; 
                            overflow-x: auto;
                        }
                        blockquote { 
                            border-left: 4px solid #4f46e5; 
                            padding-left: 16px; 
                            margin: 1em 0;
                            font-style: italic;
                            color: #64748b;
                        }
                        ul, ol { padding-left: 2em; margin-bottom: 1em; }
                        table { 
                            border-collapse: collapse; 
                            width: 100%; 
                            margin: 1em 0;
                        }
                        table td, table th { 
                            border: 1px solid #e2e8f0; 
                            padding: 8px; 
                        }
                        table th { 
                            background: #f1f5f9; 
                            font-weight: 700;
                        }
                        .math-formula {
                            background: #f0f9ff;
                            padding: 2px 6px;
                            border-radius: 4px;
                            font-family: 'KaTeX_Main', 'Times New Roman', serif;
                            color: #0369a1;
                            border: 1px solid #bae6fd;
                        }
                    `,
                    paste_as_text: false,
                    paste_data_images: true,
                    images_upload_handler: handleImageUpload,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    skin: 'oxide',
                    content_css: [
                        'default',
                        'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css'
                    ],
                    branding: false,
                    promotion: false,
                    setup: (editor) => {
                        // Register custom Math button
                        editor.ui.registry.addButton('customMath', {
                            text: 'Math',
                            icon: 'code-sample',
                            tooltip: 'Insert Math Formula (LaTeX)',
                            onAction: () => {
                                editor.windowManager.open({
                                    title: 'Insert Math Formula',
                                    body: {
                                        type: 'panel',
                                        items: [
                                            {
                                                type: 'textarea',
                                                name: 'formula',
                                                label: 'LaTeX Formula',
                                                placeholder: 'E.g., \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}'
                                            },
                                            {
                                                type: 'htmlpanel',
                                                html: '<p style="font-size: 11px; color: #666; margin-top: 8px;">Examples:<br/>• Inline: $x^2 + y^2 = z^2$<br/>• Display: \\[\\frac{a}{b}\\]<br/>• Fractions: \\frac{numerator}{denominator}<br/>• Greek: \\alpha, \\beta, \\theta</p>'
                                            }
                                        ]
                                    },
                                    buttons: [
                                        {
                                            type: 'cancel',
                                            text: 'Close'
                                        },
                                        {
                                            type: 'submit',
                                            text: 'Insert',
                                            buttonType: 'primary'
                                        }
                                    ],
                                    onSubmit: (api) => {
                                        const data = api.getData();
                                        const formula = data.formula as string;

                                        if (formula && formula.trim()) {
                                            let wrappedFormula = formula.trim();
                                            if (!wrappedFormula.startsWith('$') &&
                                                !wrappedFormula.startsWith('\\[') &&
                                                !wrappedFormula.startsWith('\\(')) {
                                                wrappedFormula = `$${wrappedFormula}$`;
                                            }
                                            editor.insertContent(`<span class="math-formula">${wrappedFormula}</span>&nbsp;`);
                                        }
                                        api.close();
                                    }
                                });
                            }
                        });

                        // Trigger math rendering when content changes
                        const renderMathInEditor = () => {
                            if (window.renderMathInElement) {
                                window.renderMathInElement(editor.getBody(), {
                                    delimiters: [
                                        { left: '\\[', right: '\\]', display: true },
                                        { left: '\\(', right: '\\)', display: false },
                                        { left: '$$', right: '$$', display: true },
                                        { left: '$', right: '$', display: false }
                                    ],
                                    throwOnError: false
                                });
                            }
                        };

                        editor.on('SetContent Change NodeChange keyup', renderMathInEditor);
                        editor.on('init', renderMathInEditor);
                    }
                }}
            />
        </div>
    );
}
