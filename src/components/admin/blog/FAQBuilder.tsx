import { useState } from 'react';
import { generateUUID } from '@/lib/uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    MessageSquare,
    Plus,
    Trash2,
    Code,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    FileCode,
    Wand2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

interface FAQBuilderProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function FAQBuilder({ formData, setFormData }: FAQBuilderProps) {
    const { toast } = useToast();
    const [faqs, setFaqs] = useState<FAQItem[]>(formData.faq_schema || []);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const addFaq = () => {
        const newFaq = {
            id: generateUUID(),
            question: '',
            answer: ''
        };
        const updatedFaqs = [...faqs, newFaq];
        setFaqs(updatedFaqs);
        setFormData({ ...formData, faq_schema: updatedFaqs });
        setExpandedId(newFaq.id);
    };

    const updateFaq = (id: string, field: keyof FAQItem, value: string) => {
        const updatedFaqs = faqs.map(faq =>
            faq.id === id ? { ...faq, [field]: value } : faq
        );
        setFaqs(updatedFaqs);
        setFormData({ ...formData, faq_schema: updatedFaqs });
    };

    const removeFaq = (id: string) => {
        const updatedFaqs = faqs.filter(faq => faq.id !== id);
        setFaqs(updatedFaqs);
        setFormData({ ...formData, faq_schema: updatedFaqs });
    };

    const autoExtractFaqs = () => {
        try {
            const doc = new DOMParser().parseFromString(formData.content || '', 'text/html');
            const detailsEls = doc.querySelectorAll('details');
            if (detailsEls.length > 0) {
                const autoFaqs = Array.from(detailsEls).map(el => {
                    const summary = el.querySelector('summary')?.textContent?.trim() || '';
                    let answer = '';
                    el.childNodes.forEach(node => {
                        if (node.nodeName.toLowerCase() !== 'summary') {
                            answer += (node.textContent || '') + ' ';
                        }
                    });
                    answer = answer.trim().replace(/\s\s+/g, ' ');
                    return {
                        id: generateUUID(),
                        question: summary,
                        answer: answer
                    };
                }).filter(f => f.question && f.answer);

                const finalFaqs = [...faqs];
                let added = 0;
                autoFaqs.forEach(auto => {
                    if (!finalFaqs.find(f => f.question.toLowerCase() === auto.question.toLowerCase())) {
                        finalFaqs.push(auto);
                        added++;
                    }
                });

                if (added > 0) {
                    setFaqs(finalFaqs);
                    setFormData({ ...formData, faq_schema: finalFaqs });
                    toast({ description: `Extracted ${added} new FAQs from HTML! ✨` });
                } else {
                    toast({ description: `No new FAQs found.` });
                }
            } else {
                toast({ description: `No <details> tags found in the HTML.`, variant: "destructive" });
            }
        } catch (err) {
            toast({ description: "Error extracting FAQs", variant: "destructive" });
        }
    };

    const generateJsonLd = () => {
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.filter(f => f.question && f.answer).map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        return JSON.stringify(schema, null, 2);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="bg-white border-2 border-slate-50 p-8 rounded-[2.5rem] shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 leading-none mb-1">FAQ Manager</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Boost CTR with Schema markup</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={autoExtractFaqs}
                                className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-10 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                            >
                                <Wand2 className="w-4 h-4 mr-2" /> Auto-Extract
                            </Button>
                            <Button
                                onClick={addFaq}
                                className="rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest h-10"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add FAQ
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {faqs.length === 0 ? (
                            <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No FAQs added yet</p>
                            </div>
                        ) : (
                            faqs.map((faq, index) => (
                                <div key={faq.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                                    <button
                                        onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                                        className="w-full p-4 flex items-center justify-between bg-white text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-300">0{index + 1}</span>
                                            <span className="font-bold text-slate-700 truncate max-w-[200px]">
                                                {faq.question || "New Question..."}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => { e.stopPropagation(); removeFaq(faq.id); }}
                                                className="w-8 h-8 rounded-lg text-rose-500 hover:bg-rose-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            {expandedId === faq.id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {expandedId === faq.id && (
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                exit={{ height: 0 }}
                                                className="px-6 pb-6 pt-2 space-y-4"
                                            >
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">The Question</Label>
                                                    <Input
                                                        value={faq.question}
                                                        onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                                                        className="h-12 rounded-xl border-slate-100 font-bold"
                                                        placeholder="e.g., How long does it take to prepare for IMAT?"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">The Answer</Label>
                                                    <Textarea
                                                        value={faq.answer}
                                                        onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)}
                                                        className="min-h-[100px] rounded-xl border-slate-100 font-bold p-4 resize-none"
                                                        placeholder="Provide a concise and helpful answer..."
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <FileCode className="w-6 h-6 text-indigo-400" />
                                <h3 className="text-xl font-black">JSON-LD Schema</h3>
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-[8px] font-black uppercase tracking-widest">
                                Valid Google Schema
                            </div>
                        </div>

                        <div className="bg-black/40 rounded-3xl p-6 font-mono text-[10px] text-indigo-200/80 overflow-x-auto border border-white/5">
                            <pre className="whitespace-pre">
                                {generateJsonLd()}
                            </pre>
                        </div>

                        <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-[10px] font-bold text-white/60 leading-relaxed italic">
                                "Google uses FAQ schema to display rich results in search. These expanded listings take more screen space and significantly increase Click-Through Rate (CTR)."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
