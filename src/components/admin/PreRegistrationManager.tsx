import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Calendar, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PreRegistration {
    id: string;
    created_at: string;
    user_id: string;
    course_id: string;
    users: {
        email: string;
        display_name: string | null;
    };
    courses: {
        title: string;
    };
}

export default function PreRegistrationManager() {
    const { toast } = useToast();
    const [registrations, setRegistrations] = useState<PreRegistration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        setLoading(true);
        try {
            // Fetch pre-registrations with course details
            const { data: regsData, error: regsError } = await supabase
                .from('course_pre_registrations')
                .select(`
                    id, created_at, user_id, course_id,
                    courses:course_id(title)
                `)
                .order('created_at', { ascending: false });

            if (regsError) throw regsError;
            
            const regs = regsData || [];
            
            // Collect unique user IDs
            const userIds = [...new Set(regs.map((r: any) => r.user_id))].filter(Boolean);
            
            // Fetch profiles for these users
            let profilesMap: Record<string, any> = {};
            if (userIds.length > 0) {
                const { data: profilesData, error: profilesError } = await supabase
                    .from('profiles')
                    .select('id, email, display_name')
                    .in('id', userIds);
                    
                if (!profilesError && profilesData) {
                    profilesData.forEach((p: any) => {
                        profilesMap[p.id] = p;
                    });
                }
            }

            // Stitch together
            const formatted = regs.map((row: any) => {
                const profile = profilesMap[row.user_id] || {};
                return {
                    id: row.id,
                    created_at: row.created_at,
                    user_id: row.user_id,
                    course_id: row.course_id,
                    users: {
                        email: profile.email || 'Unknown',
                        display_name: profile.display_name || 'Unknown',
                    },
                    courses: {
                        title: row.courses?.title || 'Unknown Course',
                    }
                };
            });
            
            setRegistrations(formatted);
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
        setLoading(false);
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8," + 
            "Course,Email,Name,Date\n" + 
            registrations.map(r => `"${r.courses.title}","${r.users.email}","${r.users.display_name}","${new Date(r.created_at).toLocaleDateString()}"`).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "pre_registrations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Pre-Registrations</h2>
                    <p className="text-sm text-slate-500">View users who pre-registered for upcoming courses.</p>
                </div>
                <button onClick={handleExport} className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-100 transition-colors">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                <th className="p-4 font-medium">User</th>
                                <th className="p-4 font-medium">Course</th>
                                <th className="p-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {registrations.map(r => (
                                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900">{r.users.display_name}</div>
                                        <div className="text-sm text-slate-500">{r.users.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-slate-700">{r.courses.title}</div>
                                    </td>
                                    <td className="p-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {new Date(r.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {registrations.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-slate-500 font-medium">
                                        No pre-registrations yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
