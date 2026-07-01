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
    email: string;
    display_name: string | null;
    username: string | null;
    avatar_url: string | null;
    role: string;
    subscription_tier: string | null;
    selected_plan: string | null;
    subscription_expiry_date: string | null;
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

const getContinent = (countryName: string | null): string => {
    if (!countryName) return 'Other / Unknown';
    const c = countryName.toLowerCase().trim();
    
    // Europe
    if (['italy', 'uk', 'united kingdom', 'germany', 'france', 'spain', 'poland', 'romania', 'netherlands', 'belgium', 'greece', 'portugal', 'sweden', 'hungary', 'austria', 'switzerland', 'bulgaria', 'denmark', 'finland', 'slovakia', 'ireland', 'croatia', 'lithuania', 'slovenia', 'latvia', 'estonia', 'cyprus', 'luxembourg', 'malta', 'norway', 'iceland', 'ukraine', 'russia', 'turkey', 'serbia', 'albania', 'georgia', 'armenia', 'azerbaijan'].some(x => c.includes(x))) return 'Europe';
    
    // Asia
    if (['india', 'china', 'pakistan', 'indonesia', 'bangladesh', 'japan', 'philippines', 'vietnam', 'iran', 'thailand', 'myanmar', 'south korea', 'iraq', 'afghanistan', 'saudi arabia', 'uzbekistan', 'malaysia', 'yemen', 'nepal', 'north korea', 'sri lanka', 'kazakhstan', 'syria', 'cambodia', 'jordan', 'united arab emirates', 'uae', 'tajikistan', 'israel', 'laos', 'kyrgyzstan', 'lebanon', 'singapore', 'oman', 'kuwait', 'mongolia', 'qatar', 'bahrain', 'timor-leste', 'bhutan', 'maldives', 'brunei'].some(x => c.includes(x))) return 'Asia';
    
    // Africa
    if (['nigeria', 'ethiopia', 'egypt', 'congo', 'tanzania', 'south africa', 'kenya', 'uganda', 'algeria', 'sudan', 'morocco', 'angola', 'ghana', 'madagascar', 'cameroon', 'ivory coast', 'niger', 'burkina faso', 'mali', 'malawi', 'zambia', 'senegal', 'chad', 'somalia', 'zimbabwe', 'guinea', 'rwanda', 'benin', 'burundi', 'tunisia', 'south sudan', 'togo', 'sierra leone', 'libya', 'liberia', 'central african republic', 'mauritania', 'eritrea', 'namibia', 'gambia', 'botswana', 'gabon', 'lesotho', 'guinea-bissau', 'equatorial guinea', 'mauritius', 'eswatini', 'djibouti', 'comoros', 'cabo verde', 'sao tome and principe', 'seychelles'].some(x => c.includes(x))) return 'Africa';
    
    // North America
    if (['usa', 'united states', 'canada', 'mexico', 'guatemala', 'cuba', 'haiti', 'dominican republic', 'honduras', 'nicaragua', 'el salvador', 'costa rica', 'panama', 'jamaica', 'trinidad', 'bahamas', 'belize', 'barbados', 'saint lucia', 'saint vincent', 'grenada', 'antigua', 'dominica', 'saint kitts'].some(x => c.includes(x))) return 'North America';
    
    // South America
    if (['brazil', 'colombia', 'argentina', 'peru', 'venezuela', 'chile', 'ecuador', 'bolivia', 'paraguay', 'uruguay', 'guyana', 'suriname'].some(x => c.includes(x))) return 'South America';
    
    // Oceania
    if (['australia', 'new zealand', 'papua new guinea', 'fiji', 'solomon islands', 'micronesia', 'vanuatu', 'samoa', 'kiribati', 'tonga', 'marshall islands', 'palau', 'tuvalu', 'nauru'].some(x => c.includes(x))) return 'Oceania';
    
    return 'Other / Unknown';
};

export default function UserManager({ permissions, isSuperAdmin }: { permissions?: any, isSuperAdmin?: boolean }) {
    // Default permissions if not provided (fallback for super-admin logic)
    const canViewPII = isSuperAdmin || permissions?.can_view_pii === true;
    const canDelete = isSuperAdmin || permissions?.can_delete === true;
    const canEdit = isSuperAdmin || permissions?.can_edit === true;
    const canExport = isSuperAdmin || permissions?.can_export === true;
    const [users, setUsers] = useState<Profile[]>([]);
    const [leads, setLeads] = useState<MarketingLead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingLeads, setIsLoadingLeads] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLeadPage, setCurrentLeadPage] = useState(1);
    // Per-user pending tier & duration selections (before admin clicks Apply)
    const [userPendingTiers, setUserPendingTiers] = useState<Record<string, string>>({});
    const [userDurations, setUserDurations] = useState<Record<string, number>>({});
    const itemsPerPage = 10;
    const { toast } = useToast();

    useEffect(() => {
        setCurrentPage(1);
        setCurrentLeadPage(1);
    }, [searchQuery, activeTab]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            let allUsers: Profile[] = [];
            let from = 0;
            const step = 1000;
            let hasMore = true;

            while (hasMore) {
                const { data, error } = await (supabase as any)
                    .rpc('get_admin_users')
                    .range(from, from + step - 1);

                if (error) throw error;
                
                if (data && data.length > 0) {
                    allUsers = [...allUsers, ...(data as Profile[])];
                    if (data.length < step) {
                        hasMore = false;
                    } else {
                        from += step;
                    }
                } else {
                    hasMore = false;
                }
            }

            setUsers(allUsers);
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

    const handleUpdateTier = async (userId: string, newTier: string, userName: string, months: number = 1) => {
        try {
            const planMap: Record<string, string> = {
                'free': 'explorer',
                'initiate': 'explorer',
                'pro': 'pro',
                'global': 'global'
            };

            // Calculate expiry based on selected months; free = null
            let expiryDate: string | null = null;
            if (newTier !== 'free' && newTier !== 'initiate') {
                const d = new Date();
                d.setMonth(d.getMonth() + months);
                expiryDate = d.toISOString();
            }

            const { error } = await supabase
                .from('profiles')
                .update({
                    subscription_tier: newTier === 'free' ? 'initiate' : newTier,
                    selected_plan: planMap[newTier] || 'explorer',
                    subscription_expiry_date: expiryDate,
                })
                .eq('id', userId);

            if (error) throw error;

            const expiryLabel = expiryDate
                ? `${months} month${months > 1 ? 's' : ''} → expires ${new Date(expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                : 'Free plan (no expiry)';

            toast({
                title: "Plan Updated ✅",
                description: `${userName} → ${newTier.toUpperCase()}. ${expiryLabel}`,
            });

            // Clear pending state for this user
            setUserPendingTiers(prev => { const n = {...prev}; delete n[userId]; return n; });
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
                <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-border bg-white dark:bg-card shadow-sm">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-border bg-slate-50/50 dark:bg-slate-900/20">
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">#</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">User</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Email</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">IP & Loc</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Auth</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-64">Plan & Duration</th>
                                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-border">
                            {paginatedUsers.map((user, index) => (
                                <tr key={user.id} className={cn("transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-900/20 group", user.is_banned && "bg-destructive/5")}>
                                    {/* Index */}
                                    <td className="p-4 text-xs text-slate-400 font-mono">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    
                                    {/* Name & ID */}
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border border-white shadow-sm">
                                                <AvatarImage src={user.avatar_url || undefined} />
                                                <AvatarFallback className="font-bold text-xs bg-indigo-50 text-indigo-600">
                                                    {(user.display_name || user.username || '?')[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{user.display_name || 'Unknown'}</span>
                                                    {user.role === 'admin' && <Badge className="bg-indigo-600 text-[8px] uppercase px-1 py-0 h-3">Admin</Badge>}
                                                </div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] text-muted-foreground font-mono">@{user.username || 'user'}</span>
                                                    <span className="text-[9px] text-slate-300 font-mono cursor-pointer hover:text-indigo-500" onClick={() => copyToClipboard(user.id, 'User ID')} title="Copy ID">
                                                        #{user.id.slice(0, 6)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="p-4">
                                        {user.email ? (
                                            <span 
                                                className={cn("text-xs", !canViewPII && "cursor-help text-slate-400", canViewPII && "text-slate-600 dark:text-slate-300")}
                                                onClick={() => {
                                                    if (!canViewPII) {
                                                        toast({ title: "Access Restricted", description: "Viewing full PII is not allowed.", variant: "destructive" });
                                                    }
                                                }}
                                            >
                                                {canViewPII ? user.email : user.email.replace(/(.{3}).*@/, '$1***@')}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">No Email</span>
                                        )}
                                    </td>

                                    {/* Phone */}
                                    <td className="p-4">
                                        {user.phone_number ? (
                                            <span className="text-xs font-mono text-slate-600 dark:text-slate-300 cursor-pointer hover:text-indigo-600" onClick={() => copyToClipboard(user.phone_number!, 'Phone')}>
                                                {user.phone_number}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">-</span>
                                        )}
                                    </td>

                                    {/* IP & Country */}
                                    <td className="p-4">
                                        {user.last_ip ? (
                                            <div className="flex flex-col gap-0.5">
                                                <span className={cn("text-xs font-mono text-slate-600 dark:text-slate-300", !canViewPII && "cursor-help text-slate-400")}
                                                    onClick={() => {
                                                        if (!canViewPII) toast({ title: "Access Restricted", description: "Viewing IP is not allowed.", variant: "destructive" });
                                                    }}>
                                                    {canViewPII ? user.last_ip : '***.***.***.***'}
                                                </span>
                                                {user.country && <span className="text-[10px] text-slate-400">{user.country}</span>}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">-</span>
                                        )}
                                    </td>

                                    {/* Auth Method */}
                                    <td className="p-4">
                                        <div className="flex flex-wrap items-center gap-1">
                                            {user.auth_providers?.map(provider => (
                                                <Badge key={provider} variant="secondary" className="text-[9px] uppercase tracking-wider bg-slate-100/50">
                                                    {provider === 'google' ? 'Google' : 'Email'}
                                                </Badge>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Status (Verified/Banned) */}
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1 items-start">
                                            {user.is_banned && (
                                                <Badge variant="destructive" className="text-[9px] uppercase">Banned</Badge>
                                            )}
                                            {user.email_verified ? (
                                                <Badge variant="outline" className="border-emerald-200 text-emerald-600 bg-emerald-50 text-[9px] uppercase tracking-wider px-1.5 h-4 flex items-center gap-1">
                                                    <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-slate-200 text-slate-400 bg-slate-50 text-[9px] uppercase tracking-wider px-1.5 h-4 flex items-center gap-1">
                                                    <ShieldAlert className="w-2.5 h-2.5" /> Unverified
                                                </Badge>
                                            )}
                                        </div>
                                    </td>

                                    {/* Plan & Duration */}
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <select
                                                    value={userPendingTiers[user.id] ?? (user.subscription_tier || 'free')}
                                                    onChange={(e) => setUserPendingTiers(prev => ({ ...prev, [user.id]: e.target.value }))}
                                                    disabled={user.role === 'admin'}
                                                    className="text-[10px] font-bold px-2 py-1 rounded border border-slate-200 bg-white focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                                                >
                                                    <option value="free">Free/Explorer</option>
                                                    <option value="pro">Pro Plan</option>
                                                    <option value="global">Global Admission</option>
                                                </select>

                                                {(userPendingTiers[user.id] ?? user.subscription_tier) !== 'free' &&
                                                 (userPendingTiers[user.id] ?? user.subscription_tier) !== 'initiate' && (
                                                    <select
                                                        value={userDurations[user.id] ?? 1}
                                                        onChange={(e) => setUserDurations(prev => ({ ...prev, [user.id]: Number(e.target.value) }))}
                                                        className="text-[10px] font-bold px-2 py-1 rounded border border-indigo-200 bg-indigo-50 text-indigo-700 focus:ring-1 focus:ring-indigo-500"
                                                    >
                                                        <option value={1}>1 Mo</option>
                                                        <option value={3}>3 Mo</option>
                                                        <option value={6}>6 Mo</option>
                                                        <option value={12}>1 Yr</option>
                                                    </select>
                                                )}

                                                {(userPendingTiers[user.id] !== undefined || userDurations[user.id] !== undefined) && !user.is_banned && (
                                                    <button
                                                        onClick={() => {
                                                            const tier = userPendingTiers[user.id] ?? user.subscription_tier ?? 'free';
                                                            const months = userDurations[user.id] ?? 1;
                                                            handleUpdateTier(user.id, tier, user.display_name || user.username || 'User', months);
                                                        }}
                                                        className="text-[9px] font-black uppercase px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                                                    >
                                                        Apply
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {user.subscription_expiry_date ? (
                                                <span className={cn("text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded w-max", new Date(user.subscription_expiry_date) < new Date() ? 'text-red-500 bg-red-50' : 'text-emerald-600 bg-emerald-50')}>
                                                    {new Date(user.subscription_expiry_date) < new Date() ? '⚠ Expired ' : 'Until '}
                                                    {new Date(user.subscription_expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
                                                </span>
                                            ) : (
                                                user.subscription_tier && user.subscription_tier !== 'initiate' && user.subscription_tier !== 'free' && (
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded w-max">No Expiry ⚠</span>
                                                )
                                            )}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="flex items-center gap-1 mr-2" title={user.community_enabled ? "Chat Active" : "Chat Restricted"}>
                                                <Switch
                                                    checked={user.community_enabled}
                                                    onCheckedChange={() => handleToggleCommunity(user.id, user.community_enabled, user.display_name || user.username || 'User')}
                                                    disabled={user.role === 'admin'}
                                                    className="scale-75 data-[state=checked]:bg-emerald-500"
                                                />
                                            </div>

                                            <Button
                                                variant="ghost" size="icon"
                                                className={cn("h-8 w-8 rounded-lg", user.is_banned ? "text-emerald-600 hover:bg-emerald-50" : "text-slate-400 hover:text-orange-600 hover:bg-orange-50")}
                                                onClick={() => {
                                                    if (!canEdit) return toast({ title: "Access Denied", description: "Not allowed.", variant: "destructive" });
                                                    handleToggleBan(user.id, user.is_banned, user.display_name || user.username || 'User');
                                                }}
                                                disabled={user.role === 'admin'}
                                                title={user.is_banned ? "Unban User" : "Ban User"}
                                            >
                                                {user.is_banned ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                            </Button>

                                            {user.last_ip && (
                                                <Button
                                                    variant="ghost" size="icon"
                                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                                    onClick={() => {
                                                        if (!canDelete) return toast({ title: "Access Denied", description: "Not allowed.", variant: "destructive" });
                                                        handleBanIP(user.last_ip!, user.display_name || user.username || 'User');
                                                    }}
                                                    disabled={user.role === 'admin'}
                                                    title="Block IP"
                                                >
                                                    <ShieldX className="w-4 h-4" />
                                                </Button>
                                            )}

                                            <Button
                                                variant="ghost" size="icon"
                                                className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => {
                                                    if (!canDelete) return toast({ title: "Access Denied", description: "Not allowed.", variant: "destructive" });
                                                    handleDeleteUser(user.id, user.display_name || user.username || 'User');
                                                }}
                                                disabled={user.role === 'admin'}
                                                title="Delete User"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                onClick={() => {
                                    if (!canExport) {
                                        toast({ title: "Access Denied", description: "Exporting data lists is not allowed by super admin.", variant: "destructive" });
                                        return;
                                    }
                                    handleCopyAllEmails();
                                }}
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
                            <div className="flex items-center justify-between mb-8">
                                <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
                                    <Users className="w-4 h-4 text-indigo-500" />
                                    Marketing Email List ({users.filter(u => u.email).length})
                                </h4>
                                <Button
                                    onClick={handleCopyAllEmails}
                                    variant="outline"
                                    className="border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-black uppercase text-[10px] tracking-widest h-9 px-4 rounded-xl"
                                >
                                    <Copy className="w-3.5 h-3.5 mr-2" /> Copy All Addresses
                                </Button>
                            </div>

                            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                                {Object.entries(
                                    users.filter(u => u.email).reduce((acc, user) => {
                                        const continent = getContinent(user.country);
                                        if (!acc[continent]) acc[continent] = [];
                                        if (!acc[continent].includes(user.email)) {
                                            acc[continent].push(user.email);
                                        }
                                        return acc;
                                    }, {} as Record<string, string[]>)
                                ).sort(([a], [b]) => a === 'Other / Unknown' ? 1 : b === 'Other / Unknown' ? -1 : a.localeCompare(b)).map(([continent, emails]) => (
                                    <div key={continent} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                                    <Globe className="w-3.5 h-3.5 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">
                                                        {continent}
                                                    </h5>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">{emails.length} active targets</p>
                                                </div>
                                            </div>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                onClick={() => {
                                                    navigator.clipboard.writeText(emails.join(', '));
                                                    toast({ title: `${continent} list copied!` });
                                                }}
                                                className="h-8 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                            >
                                                <Copy className="w-3 h-3 mr-1.5" /> Copy List
                                            </Button>
                                        </div>
                                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 font-mono text-[10px] leading-relaxed break-all select-all text-slate-600 dark:text-slate-400">
                                            {emails.join(', ')}
                                        </div>
                                    </div>
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
