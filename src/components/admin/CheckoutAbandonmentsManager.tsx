import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
    Loader2,
    Search,
    RefreshCw,
    ShoppingCart
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Abandonment {
    id: string;
    email: string | null;
    plan_name: string | null;
    created_at: string;
    profiles: {
        display_name: string | null;
        phone_number: string | null;
    } | null;
}

export default function CheckoutAbandonmentsManager() {
    const [records, setRecords] = useState<Abandonment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('checkout_abandonments' as any)
                .select(`
                    id, 
                    email, 
                    plan_name, 
                    created_at,
                    profiles (
                        display_name,
                        phone_number
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRecords(data as unknown as Abandonment[]);
        } catch (error: any) {
            console.error('Error fetching checkout abandonments:', error);
            toast({
                title: 'Error',
                description: 'Failed to fetch checkout abandonments.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRecords = records.filter(r => {
        const query = searchQuery.toLowerCase();
        return (
            (r.email && r.email.toLowerCase().includes(query)) ||
            (r.profiles?.display_name && r.profiles.display_name.toLowerCase().includes(query)) ||
            (r.plan_name && r.plan_name.toLowerCase().includes(query))
        );
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-500/20 rounded-xl text-red-600 dark:text-red-400">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Checkout Abandonments</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Track users who opened the checkout modal but didn't proceed</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <Input
                            placeholder="Search email, name or plan..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-slate-50 dark:bg-slate-800/50"
                        />
                    </div>
                    <Button onClick={fetchRecords} variant="outline" size="icon" disabled={isLoading}>
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Phone Number</th>
                                <th className="px-6 py-4">Plan Name</th>
                                <th className="px-6 py-4">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-600" />
                                        <p>Loading records...</p>
                                    </td>
                                </tr>
                            ) : filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No abandoned checkouts found.
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {record.profiles?.display_name || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {record.email || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {record.profiles?.phone_number || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20">
                                                {record.plan_name || 'Unknown Plan'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {format(new Date(record.created_at), 'MMM d, yyyy h:mm a')}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
