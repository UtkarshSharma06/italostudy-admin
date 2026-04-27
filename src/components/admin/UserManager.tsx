import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
    Users,
    Search,
    Shield,
    ShieldAlert,
    MessageSquare,
    MessageSquareOff,
    Ban,
    CheckCircle2,
    Loader2,
    Trash2,
    ShieldX,
    Globe,
    Copy,
    Hash,
    Phone,
    RefreshCw
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface Profile {
    id: string;
    email: string; // Note: Email might not be in public view unless exposure is enabled, usually auth.users is simpler but profiles is safer. 
    // If email is null in profiles, we might need to rely on username.
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    role: string;
    subscription_tier: string | null;
    community_enabled: boolean;
    is_banned: boolean;
    last_ip: string | null;
    country: string | null;
    created_at: string;
    email_verified: boolean;
    auth_providers: string[];
    phone_number: string | null;
}

interface MarketingLead {
    id: string;
    email: string;
    source: string;
    meta_data: any;
    created_at: string;
}

export default function UserManager() {
    const [users, setUsers] = useState<Profile[]>([]);
    const [leads, setLeads] = useState<MarketingLead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingLeads, setIsLoadingLeads] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLeadPage, setCurrentLeadPage] = useState(1);
    const itemsPerPage = 10;
    const { toast } = useToast();

    useEffect(() => {
        setCurrentPage(1);
        setCurrentLeadPage(1);
    }, [searchQuery, activeTab]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await (supabase as any).rpc('get_admin_users');

            if (error) throw error;
            setUsers(data as Profile[]);
        } catch (error: any) {
            toast({
                title: "Error fetching users",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLeads = async () => {
        setIsLoadingLeads(true);
        try {
            const { data, error } = await supabase
                .from('marketing_leads' as any)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads((data as unknown) as MarketingLead[] || []);
        } catch (error: any) {
            console.error('Error fetching leads:', error);
        } finally {
            setIsLoadingLeads(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchLeads();
    }, []);

    const handleToggleCommunity = async (userId: string, currentStatus: boolean, username: string) => {
        try {
            const { error } = await (supabase as any)
                .from('profiles')
                .update({ community_enabled: !currentStatus })
                .eq('id', userId);

            if (error) throw error;

            setUsers(users.map(u => u.id === userId ? { ...u, community_enabled: !currentStatus } : u));
            toast({
                title: !currentStatus ? "Community Access Restored" : "Community Access Restricted",
                description: `Updated access for ${username}`
            });
        } catch (error: any) {
            toast({ title: "Update failed", description: error.message, variant: "destructive" });
        }
    };

    const handleToggleBan = async (userId: string, currentStatus: boolean, username: string) => {
        if (!confirm(`Are you sure you want to ${currentStatus ? 'unban' : 'BAN'} ${username}? This will restrict their login access.`)) return;

        try {
            const { error } = await (supabase as any)
                .from('profiles')
                .update({ is_banned: !currentStatus })
                .eq('id', userId);

            if (error) throw error;

            setUsers(users.map(u => u.id === userId ? { ...u, is_banned: !currentStatus } : u));
            toast({
                title: !currentStatus ? "User Banned" : "User Unbanned",
                description: `${username} has been ${!currentStatus ? 'banned' : 'restored'}.`
            });
        } catch (error: any) {
            console.error("Ban toggle error:", error);
            toast({
                title: "Action Blocked",
                description: "Security policy denied this update. Are you a super-admin?",
                variant: "destructive"
            });
        }
    };

    const handleDeleteUser = async (userId: string, username: string) => {
        if (!confirm(`Are you sure you want to PERMANENTLY DELETE ${username}? This action is irreversible and will remove all their data.`)) return;

        // Final safety check
        if (!confirm(`Please confirm again: DELETE ${username} permanently?`)) return;

        try {
            const { error } = await (supabase as any).rpc('delete_user_by_admin', {
                target_user_id: userId
            });

            if (error) throw error;

            setUsers(users.filter(u => u.id !== userId));
            toast({
                title: "User Deleted",
                description: `${username} has been permanently removed.`
            });
        } catch (error: any) {
            console.error('Delete user error:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to delete user",
                variant: "destructive"
            });
        }
    };

    const handleBanIP = async (ip: string, username: string) => {
        if (!ip) return;
        if (!confirm(`Are you sure you want to BLOCK IP ${ip}? This will affect all accounts using this connection.`)) return;

        try {
            const { error } = await (supabase as any)
                .from('banned_ips')
                .insert({ ip: ip, reason: `Banned via ${username}` });

            if (error) throw error;

            toast({
                title: "IP Banned",
                description: `Network ${ip} has been restricted.`,
                variant: "destructive"
            });
        } catch (error: any) {
            toast({ title: "Failed to block IP", description: error.message, variant: "destructive" });
        }
    };

    const handleUpdateTier = async (userId: string, newTier: string, userName: string) => {
        try {
            // Map subscription tier to selected_plan
            const planMap: Record<string, string> = {
                'free': 'explorer',
                'pro': 'pro',
                'global': 'global'
            };

            const { error } = await supabase
                .from('profiles')
                .update({
                    subscription_tier: newTier,
                    selected_plan: planMap[newTier] || 'explorer'
                })
                .eq('id', userId);

            if (error) throw error;

            toast({
                title: "Tier Updated",
                description: `${userName}'s subscription tier has been updated to ${newTier.toUpperCase()}.`,
            });

            fetchUsers();
        } catch (error: any) {
            console.error('Update tier error:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to update subscription tier",
                variant: "destructive"
            });
        }
    };

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied",
            description: `${label} copied to clipboard.`
        });
    };

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase();

        // Tab filtering
        if (activeTab === 'verified' && !user.email_verified) return false;
        if (activeTab === 'unverified' && user.email_verified) return false;

        // Search filtering
        return (
            (user.display_name?.toLowerCase() || '').includes(query) ||
            (user.username?.toLowerCase() || '').includes(query) ||
            (user.email?.toLowerCase() || '').includes(query) ||
            (user.phone_number?.toLowerCase() || '').includes(query) ||
            user.id.toLowerCase().includes(query) ||
            (user.country?.toLowerCase() || '').includes(query)
        );
    });

    const handleCopyAllEmails = () => {
        const allEmails = users
            .filter(u => u.email)
            .map(u => u.email)
            .join(', ');

        if (!allEmails) {
            toast({ title: "No emails found" });
            return;
        }

        navigator.clipboard.writeText(allEmails);
        toast({
            title: "Emails Copied",
            description: `${users.filter(u => u.email).length} email addresses copied for marketing.`
        });
    };

    function renderUserList(userList: Profile[]) {
        if (userList.length === 0) {
            return (
                <div className="text-center py-12 text-muted-foreground bg-white dark:bg-card rounded-2xl border border-dashed border-slate-200 dark:border-border">
                    No users found {searchQuery ? `matching "${searchQuery}"` : "in this category"}
                </div>
            );
        }

        const totalPages = Math.ceil(userList.length / itemsPerPage);
        const paginatedUsers = userList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        return (
            <div className="space-y-6">
            <div className="grid gap-4">
                {paginatedUsers.map((user) => (
                    <div
                        key={user.id}
                        className={`
                            group flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border transition-all
                            ${user.is_banned ? 'bg-destructive/5 border-destructive/20' : 'bg-white dark:bg-card border-slate-100 dark:border-border hover:border-indigo-200'}
                        `}
                    >
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                <AvatarImage src={user.avatar_url || undefined} />
                                <AvatarFallback className="font-bold bg-indigo-50 text-indigo-600">
                                    {(user.display_name || user.username || '?')[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                                        {user.display_name || 'Unknown'}
                                    </h3>
                                    {user.role === 'admin' && (
                                        <Badge variant="default" className="bg-indigo-600 text-[10px] uppercase">Admin</Badge>
                                    )}
                                    {user.is_banned && (
                                        <Badge variant="destructive" className="text-[10px] uppercase">Banned</Badge>
                                    )}
                                    {user.email_verified ? (
                                        <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 text-[9px] font-black uppercase tracking-widest px-1.5 h-4 flex items-center gap-1">
                                            <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="border-slate-200 text-slate-400 bg-slate-50 text-[9px] font-black uppercase tracking-widest px-1.5 h-4 flex items-center gap-1">
                                            <ShieldAlert className="w-2.5 h-2.5" /> Unverified
                                        </Badge>
                                    )}
                                    <div className="flex items-center gap-1">
                                        {user.auth_providers?.map(provider => (
                                            <Badge key={provider} variant="secondary" className="text-[8px] font-bold uppercase tracking-tight h-4 px-1 bg-slate-100/50">
                                                {provider === 'google' ? 'Google' : 'Email'}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap mt-0.5">
                                    <div
                                        className="flex items-center gap-1 font-mono text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer hover:bg-slate-200 transition-colors"
                                        onClick={() => copyToClipboard(user.id, 'User ID')}
                                        title="Click to copy User ID"
                                    >
                                        <Hash className="w-2.5 h-2.5" />
                                        {user.id.slice(0, 8)}...
                                        <Copy className="w-2.5 h-2.5 ml-1 opacity-50" />
                                    </div>
                                    <span className="font-mono text-xs opacity-70">@{user.username || 'user'}</span>
                                    {user.email && <span className="text-xs opacity-40">• {user.email}</span>}
                                    {user.phone_number && (
                                        <div 
                                            className="flex items-center gap-1 font-mono text-[9px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded cursor-pointer hover:bg-slate-200 transition-colors"
                                            onClick={() => copyToClipboard(user.phone_number!, 'Phone Number')}
                                            title="Click to copy Phone Number"
                                        >
                                            <Phone className="w-2.5 h-2.5" />
                                            {user.phone_number}
                                            <Copy className="w-2.5 h-2.5 ml-1 opacity-50" />
                                        </div>
                                    )}
                                    {user.last_ip && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded text-[9px] font-bold text-indigo-600/70">
                                            <Globe className="w-3 h-3" />
                                            {user.last_ip}
                                            {user.country && <span className="ml-1 opacity-80 decoration-dotted underline underline-offset-2">({user.country})</span>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                            {/* Subscription Tier Selector */}
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plan</span>
                                <select
                                    value={user.subscription_tier || 'free'}
                                    onChange={(e) => handleUpdateTier(user.id, e.target.value, user.display_name || user.username || 'User')}
                                    disabled={user.role === 'admin'}
                                    className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="free">Free/Explorer</option>
                                    <option value="pro">Pro Plan</option>
                                    <option value="global">Global Admission</option>
                                </select>
                            </div>

                            {/* Community Toggler */}
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs font-bold uppercase tracking-widest ${user.community_enabled ? 'text-emerald-600' : 'text-slate-400'}`}>
                                        {user.community_enabled ? 'Chat Active' : 'Chat Restricted'}
                                    </span>
                                    <Switch
                                        checked={user.community_enabled}
                                        onCheckedChange={() => handleToggleCommunity(user.id, user.community_enabled, user.display_name || user.username || 'User')}
                                        disabled={user.role === 'admin'}
                                    />
                                </div>
                            </div>

                            {/* Ban Button */}
                            <Button
                                variant={user.is_banned ? "default" : "ghost"}
                                size="sm"
                                className={user.is_banned ? "bg-emerald-600 hover:bg-emerald-700" : "text-destructive hover:bg-destructive/10"}
                                onClick={() => handleToggleBan(user.id, user.is_banned, user.display_name || user.username || 'User')}
                                disabled={user.role === 'admin'}
                            >
                                {user.is_banned ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Ban className="w-4 h-4 mr-2" />}
                                {user.is_banned ? "Unban User" : "Ban"}
                            </Button>

                            {/* Delete Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteUser(user.id, user.display_name || user.username || 'User')}
                                disabled={user.role === 'admin'}
                                title="Permanently Delete User"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>

                            {/* Ban IP Button */}
                            {user.last_ip && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                    onClick={() => handleBanIP(user.last_ip!, user.display_name || user.username || 'User')}
                                    disabled={user.role === 'admin'}
                                    title="Block this IP Address"
                                >
                                    <ShieldX className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="p-6 border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-card rounded-[2rem] mt-6 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1 hidden md:block">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, userList.length)} of {userList.length} entries
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">Prev</Button>
                        {[...Array(totalPages)].map((_, i) => {
                            if (totalPages > 7 && i !== 0 && i !== totalPages - 1 && Math.abs(i + 1 - currentPage) > 1) {
                                if (i === 1 && currentPage > 3) return <span key={i} className="px-2 py-1 text-slate-400">...</span>;
                                if (i === totalPages - 2 && currentPage < totalPages - 2) return <span key={i} className="px-2 py-1 text-slate-400">...</span>;
                                return null;
                            }
                            return (
                                <Button key={i} variant={currentPage === i + 1 ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(i + 1)} className={cn("w-9 h-9 p-0 rounded-xl text-[10px] font-black", currentPage === i + 1 ? "bg-indigo-600 text-white" : "")}>{i + 1}</Button>
                            )
                        })}
                        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">Next</Button>
                    </div>
                </div>
            )}
            </div>
        );
    }

    const renderLeadsList = () => {
        if (isLoadingLeads) {
            return (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            );
        }

        if (leads.length === 0) {
            return (
                <div className="text-center py-12 bg-white dark:bg-card rounded-2xl border-2 border-dashed border-slate-100 dark:border-border">
                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No leads captured yet</p>
                </div>
            );
        }

        const totalPages = Math.ceil(leads.length / itemsPerPage);
        const paginatedLeads = leads.slice((currentLeadPage - 1) * itemsPerPage, currentLeadPage * itemsPerPage);

        return (
            <div className="space-y-6">
            <div className="space-y-4">
                {paginatedLeads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-6 bg-white dark:bg-card rounded-2xl border border-slate-100 dark:border-border hover:shadow-md transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black border border-indigo-100 dark:border-indigo-900/50">
                                {lead.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 dark:text-slate-100">{lead.email}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                                        {lead.source.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        {format(new Date(lead.created_at), 'MMM dd, yyyy HH:mm')}
                                    </span>
                                </div>
                                {lead.meta_data?.resource_title && (
                                    <p className="text-[10px] text-indigo-500 font-black uppercase mt-1">
                                        Interested in: {lead.meta_data.resource_title}
                                    </p>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-slate-50 hover:bg-white rounded-xl text-slate-400 hover:text-indigo-600 transition-all font-black uppercase text-[10px] tracking-widest px-4 border border-transparent hover:border-indigo-100"
                            onClick={() => {
                                navigator.clipboard.writeText(lead.email);
                                toast({ title: "Email copied!" });
                            }}
                        >
                            <Copy className="w-3.5 h-3.5 mr-2" /> Copy
                        </Button>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="p-6 border border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-card rounded-[2rem] mt-6 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-1 hidden md:block">
                        Showing {(currentLeadPage - 1) * itemsPerPage + 1} to {Math.min(currentLeadPage * itemsPerPage, leads.length)} of {leads.length} entries
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={currentLeadPage === 1} onClick={() => setCurrentLeadPage(prev => prev - 1)} className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">Prev</Button>
                        {[...Array(totalPages)].map((_, i) => {
                            if (totalPages > 7 && i !== 0 && i !== totalPages - 1 && Math.abs(i + 1 - currentLeadPage) > 1) {
                                if (i === 1 && currentLeadPage > 3) return <span key={i} className="px-2 py-1 text-slate-400">...</span>;
                                if (i === totalPages - 2 && currentLeadPage < totalPages - 2) return <span key={i} className="px-2 py-1 text-slate-400">...</span>;
                                return null;
                            }
                            return (
                                <Button key={i} variant={currentLeadPage === i + 1 ? "default" : "outline"} size="sm" onClick={() => setCurrentLeadPage(i + 1)} className={cn("w-9 h-9 p-0 rounded-xl text-[10px] font-black", currentLeadPage === i + 1 ? "bg-indigo-600 text-white" : "")}>{i + 1}</Button>
                            )
                        })}
                        <Button variant="outline" size="sm" disabled={currentLeadPage === totalPages} onClick={() => setCurrentLeadPage(prev => prev + 1)} className="rounded-xl h-9 px-4 text-[10px] font-black uppercase tracking-widest">Next</Button>
                    </div>
                </div>
            )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-card p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-border">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users by name, username..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 rounded-xl"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mr-4">
                        <Users className="h-4 w-4" />
                        <span className="font-bold">{users.length}</span> Total Users
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => { fetchUsers(); fetchLeads(); }}
                        disabled={isLoading || isLoadingLeads}
                        className="rounded-xl h-10 px-4"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                        Refresh
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                        <TabsList className="bg-slate-100 dark:bg-slate-900 border-none p-1 rounded-xl h-11">
                            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest">
                                All Users
                            </TabsTrigger>
                            <TabsTrigger value="verified" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest">
                                Verified
                            </TabsTrigger>
                            <TabsTrigger value="unverified" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest">
                                Unverified
                            </TabsTrigger>
                            <TabsTrigger value="marketing" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest">
                                Email List
                            </TabsTrigger>
                            <TabsTrigger value="leads" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest">
                                Leads <Badge className="ml-2 bg-indigo-500 text-white border-none text-[8px] h-4 px-1">{leads.length}</Badge>
                            </TabsTrigger>
                        </TabsList>

                        {activeTab === 'marketing' && (
                            <Button
                                onClick={handleCopyAllEmails}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none"
                            >
                                <Copy className="w-3.5 h-3.5 mr-2" /> Copy All Emails
                            </Button>
                        )}
                    </div>

                    <TabsContent value="all" className="mt-0">
                        {renderUserList(filteredUsers)}
                    </TabsContent>

                    <TabsContent value="verified" className="mt-0">
                        {renderUserList(filteredUsers)}
                    </TabsContent>

                    <TabsContent value="unverified" className="mt-0">
                        {renderUserList(filteredUsers)}
                    </TabsContent>

                    <TabsContent value="marketing" className="mt-0">
                        <div className="bg-white dark:bg-card p-8 rounded-[2rem] border-2 border-slate-100 dark:border-border shadow-sm">
                            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 mb-6 uppercase tracking-widest flex items-center gap-2">
                                <Users className="w-4 h-4 text-indigo-500" />
                                Marketing Email List ({users.filter(u => u.email).length})
                            </h4>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 font-mono text-xs leading-relaxed break-all select-all h-[400px] overflow-y-auto">
                                {users.filter(u => u.email).map((u, i, arr) => (
                                    <span key={u.id} className="text-slate-600 dark:text-slate-400">
                                        {u.email}{i < arr.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="leads" className="mt-0">
                        {renderLeadsList()}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
