import { useState } from 'react';
import { AlertCircle, Code, Info, ChevronDown, ChevronUp, FileJson } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

const JSON_EXAMPLE = `[
  {
    "question_text": "Who won the race?",
    "options": ["C", "F", "D", "A", "E"],
    "correct_index": 1,
    "topic": "Logic",
    "difficulty": "hard",
    "media": {
      "type": "image",
      "image": {
        "url": "https://ik.imagekit.io/italostudy/...",
        "alt": "Race Track",
        "caption": "Figure 1: The final lap"
      }
    },
    "explanation": "Detailed explanation..."
  }
]`;

export function JsonImportGuide() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="space-y-4 mb-6">
            <Button
                variant="outline"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between h-12 rounded-xl border-dashed border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 text-indigo-600 font-bold px-6"
            >
                <div className="flex items-center gap-2">
                    <FileJson className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest">How to Format your JSON?</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>

            {isOpen && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/50">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <AlertTitle className="text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">Crucial Tip</AlertTitle>
                        <AlertDescription className="text-amber-700 dark:text-amber-400 text-xs">
                            Always wrap your JSON in <strong>square brackets [ ]</strong>, even if you are only importing one question!
                        </AlertDescription>
                    </Alert>

                    <div className="bg-slate-900 rounded-xl p-4 overflow-hidden relative group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Code className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Expected Structure</span>
                            </div>
                        </div>
                        <pre className="text-[10px] text-slate-300 font-mono leading-relaxed overflow-x-auto">
                            {JSON_EXAMPLE}
                        </pre>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Required Fields</p>
                            <ul className="text-[10px] text-slate-500 space-y-1 list-disc list-inside">
                                <li>question_text</li>
                                <li>options (array of 5)</li>
                                <li>correct_index (0-4)</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Optional Fields</p>
                            <ul className="text-[10px] text-slate-500 space-y-1 list-disc list-inside">
                                <li>passage (for reading)</li>
                                <li>media (image/table/chart)</li>
                                <li>explanation, topic, difficulty</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
