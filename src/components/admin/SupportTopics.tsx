import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Trash2, Pencil } from 'lucide-react';

interface SupportTopic {
    id: string;
    question: string;
    answer: string;
    order: number;
}

export default function SupportTopics() {
    const { toast } = useToast();
    const [topics, setTopics] = useState<SupportTopic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [editingTopic, setEditingTopic] = useState<SupportTopic | null>(null);
    const [formData, setFormData] = useState({ question: '', answer: '', order: 0 });

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('support_topics')
            .select('*')
            .order('order', { ascending: true });
            
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load support topics.' });
        } else {
            setTopics(data || []);
        }
        setIsLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        if (editingTopic) {
            const { error } = await supabase
                .from('support_topics')
                .update(formData)
                .eq('id', editingTopic.id);
            
            if (error) toast({ variant: 'destructive', title: 'Error', description: error.message });
            else toast({ title: 'Success', description: 'Topic updated successfully.' });
        } else {
            const { error } = await supabase
                .from('support_topics')
                .insert([formData]);
                
            if (error) toast({ variant: 'destructive', title: 'Error', description: error.message });
            else toast({ title: 'Success', description: 'Topic created successfully.' });
        }
        
        setIsSubmitting(false);
        setEditingTopic(null);
        setFormData({ question: '', answer: '', order: 0 });
        fetchTopics();
    };

    const handleEdit = (topic: SupportTopic) => {
        setEditingTopic(topic);
        setFormData({ question: topic.question, answer: topic.answer, order: topic.order || 0 });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this topic?')) return;
        const { error } = await supabase.from('support_topics').delete().eq('id', id);
        
        if (error) toast({ variant: 'destructive', title: 'Error', description: error.message });
        else {
            toast({ title: 'Deleted', description: 'Topic has been removed.' });
            fetchTopics();
        }
    };

    if (isLoading) {
        return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {editingTopic ? <Pencil className="w-5 h-5 text-indigo-500" /> : <Plus className="w-5 h-5" />}
                    {editingTopic ? 'Edit Topic' : 'Add New Topic'}
                </h2>
                
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Question / Topic Title</Label>
                        <Input 
                            value={formData.question} 
                            onChange={(e) => setFormData({...formData, question: e.target.value})} 
                            required 
                            placeholder="e.g. How do I reset my password?"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea 
                            value={formData.answer} 
                            onChange={(e) => setFormData({...formData, answer: e.target.value})} 
                            required 
                            className="min-h-[100px]"
                            placeholder="Detailed answer..."
                        />
                    </div>
                    <div className="space-y-2 w-32">
                        <Label>Display Order</Label>
                        <Input 
                            type="number"
                            value={formData.order} 
                            onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
                        />
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                        {editingTopic && (
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => { setEditingTopic(null); setFormData({ question: '', answer: '', order: 0 }); }}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {editingTopic ? 'Save Changes' : 'Add Topic'}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
                <h2 className="text-xl font-bold mb-4">Popular Help Topics</h2>
                
                {topics.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">No help topics added yet.</div>
                ) : (
                    <div className="space-y-4">
                        {topics.map(topic => (
                            <div key={topic.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{topic.question}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{topic.answer}</p>
                                    <div className="mt-2 text-xs text-slate-400">Order: {topic.order || 0}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="icon" variant="ghost" onClick={() => handleEdit(topic)}>
                                        <Pencil className="w-4 h-4 text-indigo-500" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(topic.id)}>
                                        <Trash2 className="w-4 h-4 text-rose-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
