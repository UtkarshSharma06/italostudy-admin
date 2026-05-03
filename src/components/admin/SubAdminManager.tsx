import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Users,
    ShieldCheck,
    ShieldAlert,
    Search,
    Check,
    X,
    Loader2,
    Lock,
    Unlock,
    Settings,
    UserPlus,
    Trash2,
    Edit3,
    Download,
    Megaphone
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_TABS = [
    { id: "analytics", label: "Dashboard", category: "Analytics" },
    { id: "marketing", label: "Marketing", category: "Analytics" },
    { id: "seo-health", label: "SEO Health", category: "Analytics" },
    { id: "mock-results", label: "Results", category: "Analytics" },
    { id: "payments", label: "Payments", category: "Finance" },
    { id: "pricing", label: "Pricing", category: "Finance" },
    { id: "coupons", label: "Coupons", category: "Finance" },
    { id: "sessions", label: "Sessions", category: "Management" },
    { id: "series", label: "Mock Series", category: "Management" },
    { id: "reports", label: "Question Reports", category: "Management" },
    { id: "qa-reports", label: "Q&A Reports", category: "Management" },
    { id: "mock-evals", label: "Mock Grade", category: "Management" },
    { id: "writing-evals", label: "Essay Grade", category: "Management" },
    { id: "site-reviews", label: "Site Reviews", category: "Management" },
    { id: "exam-manager", label: "Exam Model", category: "Material" },
    { id: "learning", label: "Lessons", category: "Material" },
    { id: "reading", label: "Reading", category: "Material" },
    { id: "listening", label: "Listening", category: "Material" },
    { id: "writing-tasks", label: "Tasks", category: "Material" },
    { id: "practice", label: "Practice Bank", category: "Material" },
    { id: "booklet", label: "Booklet Generator", category: "Material" },
    { id: "3d-labs", label: "Labs", category: "Material" },
    { id: "resources", label: "Resources", category: "Material" },
    { id: "blog", label: "Blog", category: "Material" },
    { id: "page-content", label: "Page Content", category: "Material" },
    { id: "status-hub", label: "Status Hub", category: "Material" },
    { id: "users", label: "Students", category: "Ops" },
    { id: "consultants", label: "Staff", category: "Ops" },
    { id: "community", label: "Community", category: "Ops" },
    { id: "feedback", label: "Feedback", category: "Ops" },
    { id: "notifications", label: "Alerts", category: "Ops" },
    { id: "announcements", label: "Banner Ads", category: "Ops" },
    { id: "security", label: "Security & Bans", category: "Ops" },
    { id: "system-config", label: "Settings", category: "Ops" },
    { id: "sub-admins", label: "Sub-Admins", category: "Ops" }
];

interface Profile {
    id: string;
    email: string;
    display_name: string;
    role: string;
}

interface AdminPermission {
    user_id: string;
    allowed_tabs: string[];
    permissions: {
        can_edit: boolean;
        can_delete: boolean;
        can_export: boolean;
        can_view_pii: boolean;
        can_manage_staff: boolean;
        can_broadcast: boolean;
    };
}

export default function SubAdminManager({ permissions: currentAdminPermissions, isSuperAdmin }: { permissions?: any, isSuperAdmin?: boolean }) {
    const canManageStaff = isSuperAdmin || currentAdminPermissions?.can_manage_staff === true;
    const [users, setUsers] = useState<Profile[]>([]);
    const [permissions, setPermissions] = useState<Record<string, string[]>>({});
    const [actionPermissions, setActionPermissions] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data: profiles, error: pError } = await supabase
                .from('profiles')
                .select('*')
                .or('role.eq.admin,role.eq.sub_admin');

            if (pError) throw pError;

            const { data: permData, error: permError } = await supabase
                .from('admin_permissions')
                .select('*');

            if (permError) throw permError;

            const permMap: Record<string, string[]> = {};
            const actionPermMap: Record<string, any> = {};
            permData?.forEach(p => {
                permMap[p.user_id] = p.allowed_tabs;
                actionPermMap[p.user_id] = p.permissions || {
                    can_edit: true,
                    can_delete: false,
                    can_export: false,
                    can_view_pii: false,
                    can_manage_staff: false,
                    can_broadcast: false
                };
            });

            setUsers(profiles || []);
            setPermissions(permMap);
            setActionPermissions(actionPermMap);
        } catch (error: any) {
            toast({
                title: "Error loading data",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePermissions = async (userId: string, tabId: string) => {
        if (!canManageStaff) {
            toast({ title: "Access Denied", description: "You don't have permission to manage staff settings.", variant: "destructive" });
            return;
        }
        const currentTabs = permissions[userId] || [];
        const newTabs = currentTabs.includes(tabId)
            ? currentTabs.filter(id => id !== tabId)
            : [...currentTabs, tabId];

        try {
            const { error } = await supabase
                .from('admin_permissions')
                .upsert({
                    user_id: userId,
                    allowed_tabs: newTabs,
                    permissions: actionPermissions[userId] || { 
                        can_edit: true, 
                        can_delete: false, 
                        can_export: false,
                        can_view_pii: false,
                        can_manage_staff: false,
                        can_broadcast: false
                    }
                });

            if (error) throw error;

            setPermissions({ ...permissions, [userId]: newTabs });
            toast({
                title: "Permissions Updated",
                description: "Settings are now applied for this user."
            });
        } catch (error: any) {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    const handleUpdateActionPermission = async (userId: string, action: string, value: boolean) => {
        if (!canManageStaff) {
            toast({ title: "Access Denied", description: "Modifying capabilities requires Staff Management permission.", variant: "destructive" });
            return;
        }
        const currentPerms = actionPermissions[userId] || { 
            can_edit: true, 
            can_delete: false, 
            can_export: false,
            can_view_pii: false,
            can_manage_staff: false,
            can_broadcast: false
        };
        const newPerms = { ...currentPerms, [action]: value };

        try {
            const { error } = await supabase
                .from('admin_permissions')
                .upsert({
                    user_id: userId,
                    allowed_tabs: permissions[userId] || [],
                    permissions: newPerms
                });

            if (error) throw error;

            setActionPermissions({ ...actionPermissions, [userId]: newPerms });
            toast({
                title: "Access Updated",
                description: "The user's capabilities have been updated."
            });
        } catch (error: any) {
            toast({
                title: "Update failed",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    const promoteToRole = async (user: Profile, role: 'admin' | 'sub_admin') => {
        if (!canManageStaff) {
            toast({ title: "Access Denied", description: "Not allowed by super admin.", variant: "destructive" });
            return;
        }
        try {
            const { error: roleError } = await supabase
                .from('profiles')
                .update({ role: role })
                .eq('id', user.id);

            if (roleError) throw roleError;

            if (role === 'sub_admin') {
                const { error: permError } = await supabase
                    .from('admin_permissions')
                    .upsert([{ user_id: user.id, allowed_tabs: ['blog'] }]); // Default for sub-admins
                if (permError) throw permError;
            }

            toast({
                title: "Role Updated",
                description: `${user.email} has been assigned a new role.`
            });
            fetchData();
        } catch (error: any) {
            toast({
                title: "Action failed",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    const revokeAdmin = async (userId: string) => {
        if (!canManageStaff) {
            toast({ title: "Access Denied", description: "Revoking access is restricted to super admins.", variant: "destructive" });
            return;
        }
        try {
            const { error: roleError } = await supabase
                .from('profiles')
                .update({ role: 'user' })
                .eq('id', userId);

            if (roleError) throw roleError;

            await supabase
                .from('admin_permissions')
                .delete()
                .eq('user_id', userId);

            toast({
                title: "Access Revoked",
                description: "The user has been demoted to a standard student account."
            });
            fetchData();
        } catch (error: any) {
            toast({
                title: "Action failed",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Lock className="w-6 h-6 text-indigo-600" />
                        Staff Permissions
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Manage access levels for administrators and support staff.</p>
                </div>

                <div className="relative group min-w-[320px]">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Add staffMember by email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs font-semibold"
                    />

                    {searchQuery.length > 3 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                            <UserSearchList query={searchQuery} onSelect={promoteToRole} />
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full h-64 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                    </div>
                ) : users.length === 0 ? (
                    <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[2rem]">
                        <Users className="w-12 h-12 text-slate-200 mb-4" />
                        <p className="text-sm font-bold text-slate-400">No staff members assigned yet.</p>
                    </div>
                ) : (
                    users.map(user => (
                        <div key={user.id} className="card-surface p-6 flex flex-col gap-6 relative overflow-hidden group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 font-bold text-xl">
                                        {user.display_name?.[0] || user.email[0].toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{user.display_name || 'Staff Member'}</h3>
                                        <p className="text-[10px] font-medium text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
                                    user.role === 'admin' ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
                                )}>
                                    {user.role === 'admin' ? 'Super Admin' : 'Sub-Admin'}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Allowed Pages</span>
                                    <span className="text-[10px] font-bold text-indigo-600">{(permissions[user.id] || []).length} / {ALL_TABS.length}</span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                                    {ALL_TABS.map(tab => {
                                        const isAllowed = (permissions[user.id] || []).includes(tab.id);
                                        const isSuper = user.role === 'admin';
                                        return (
                                            <button
                                                key={tab.id}
                                                disabled={isSuper}
                                                onClick={() => handleUpdatePermissions(user.id, tab.id)}
                                                className={cn(
                                                    "px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all border",
                                                    isAllowed
                                                        ? "bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100"
                                                        : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100",
                                                    isSuper && "bg-amber-50 border-amber-100 text-amber-700 opacity-100"
                                                )}
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Capabilities</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: 'can_edit', label: 'Modify Data', icon: Edit3, color: 'text-indigo-600' },
                                        { id: 'can_delete', label: 'Delete Data', icon: Trash2, color: 'text-rose-600' },
                                        { id: 'can_export', label: 'Export PDF/CSV', icon: Download, color: 'text-emerald-600' },
                                        { id: 'can_view_pii', label: 'View PII (IP/Email)', icon: ShieldAlert, color: 'text-amber-600' },
                                        { id: 'can_manage_staff', label: 'Staff Management', icon: UserPlus, color: 'text-blue-600' },
                                        { id: 'can_broadcast', label: 'Alerts & Ads', icon: Megaphone, color: 'text-purple-600' }
                                    ].map(action => (
                                        <button
                                            key={action.id}
                                            disabled={user.role === 'admin'}
                                            onClick={() => handleUpdateActionPermission(user.id, action.id, !actionPermissions[user.id]?.[action.id])}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                                                actionPermissions[user.id]?.[action.id] || user.role === 'admin'
                                                    ? "bg-white dark:bg-slate-900 border-slate-200 shadow-sm"
                                                    : "bg-slate-50 dark:bg-slate-800/50 border-transparent opacity-60"
                                            )}
                                        >
                                            <action.icon className={cn("w-4 h-4 shrink-0", actionPermissions[user.id]?.[action.id] || user.role === 'admin' ? action.color : "text-slate-300")} />
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-black uppercase truncate">{action.label}</p>
                                                <p className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">
                                                    {actionPermissions[user.id]?.[action.id] || user.role === 'admin' ? 'Enabled' : 'Disabled'}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 text-[10px] font-bold uppercase tracking-widest rounded-xl text-rose-500 hover:bg-rose-50"
                                    onClick={() => revokeAdmin(user.id)}
                                >
                                    Revoke Access
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function UserSearchList({ query, onSelect }: { query: string, onSelect: (user: any, role: 'admin' | 'sub_admin') => void }) {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const data = await supabase
                .from('profiles')
                .select('*')
                .ilike('email', `%${query}%`)
                .limit(5);
            setResults(data.data || []);
            setLoading(false);
        };
        fetch();
    }, [query]);

    if (loading) return <div className="p-8 flex items-center justify-center"><Loader2 className="w-5 h-5 animate-spin text-indigo-600" /></div>;

    if (results.length === 0) return <div className="p-8 text-center text-xs font-bold text-slate-400">No users found.</div>;

    return (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {results.map(user => (
                <div
                    key={user.id}
                    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-[10px] font-bold text-indigo-600 uppercase">
                            {user.email[0]}
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{user.display_name || user.email.split('@')[0]}</p>
                            <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onSelect(user, 'sub_admin')}
                            className="text-[9px] font-bold text-indigo-600 hover:bg-indigo-600 hover:text-white px-2.5 py-1 rounded-lg border border-indigo-200 transition-all uppercase"
                        >
                            + Sub-Admin
                        </button>
                        <button
                            onClick={() => onSelect(user, 'admin')}
                            className="text-[9px] font-bold text-amber-600 hover:bg-amber-600 hover:text-white px-2.5 py-1 rounded-lg border border-amber-200 transition-all uppercase"
                        >
                            + Admin
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
