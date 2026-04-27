import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    UserPlus,
    Key,
    Users,
    ShieldCheck,
    Loader2,
    Copy,
    CheckCircle2,
    Trash2,
    Calendar,
    Clock,
    Activity,
    MessageSquare,
    FileText,
    Ban,
    Eye,
    TrendingUp
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ConsultantManager() {
    const [consultants, setConsultants] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [accessCodes, setAccessCodes] = useState<any[]>([]);
    const [assignedWork, setAssignedWork] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState<any | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [consRes, appsRes, codesRes, workRes, msgsRes] = await Promise.all([
                supabase.from('profiles').select('*').or('role.eq.consultant,is_consultant.eq.true'),
                supabase.from('consultant_applications').select('*').order('created_at', { ascending: false }),
                supabase.from('consultant_access_codes').select('*').order('created_at', { ascending: false }),
                supabase.from('admission_applications').select(`
                    id, 
                    consultant_id, 
                    status, 
                    university_name,
                    updated_at,
                    progress_percentage,
                    profiles ( display_name, email )
                `),
                (supabase.from('admission_messages') as any).select('user_id, created_at, message, application_id').eq('is_from_consultant', true).order('created_at', { ascending: false }).limit(1000)
            ]);

            if (consRes.data) setConsultants(consRes.data);
            if (appsRes.data) setApplications(appsRes.data);
            if (codesRes.data) setAccessCodes(codesRes.data);
            if (workRes.data) setAssignedWork(workRes.data);
            if (msgsRes.data) setMessages(msgsRes.data);
        } catch (err) {
            console.error('Error fetching consultant data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const generateCode = async () => {
        if (!newEmail) {
            toast({
                title: "Email Required",
                description: "Please enter the consultant's email address.",
                variant: "destructive"
            });
            return;
        }

        setIsGenerating(true);
        const code = Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        try {
            const { error } = await supabase.from('consultant_access_codes').insert({
                code,
                protocol_id: newEmail.trim().toLowerCase(),
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            });

            if (error) throw error;
            toast({
                title: "Credentials Generated",
                description: `Protocol ID: ${newEmail}\nSecurity Key: ${code}`
            });
            setNewEmail("");
            fetchData();
        } catch (err: any) {
            toast({ title: "Generation Failed", description: err.message, variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied to clipboard" });
    };

    const removeConsultant = async (profileId: string) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    role: 'user',
                    is_consultant: false
                })
                .eq('id', profileId);

            if (error) throw error;
            toast({ title: "Consultant Access Revoked" });
            fetchData();
            if (selectedConsultant?.id === profileId) setSelectedConsultant(null);
        } catch (err: any) {
            toast({ title: "Action Failed", description: err.message, variant: "destructive" });
        }
    };

    const deleteAccessCode = async (codeId: string) => {
        try {
            const { error } = await supabase
                .from('consultant_access_codes')
                .delete()
                .eq('id', codeId);

            if (error) throw error;
            toast({ title: "Invitation Revoked" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Delete Failed", description: err.message, variant: "destructive" });
        }
    };

    const approveApplication = async (applicationId: string, userId: string) => {
        try {
            // Update application status
            const { error: appError } = await supabase
                .from('consultant_applications')
                .update({
                    status: 'approved',
                    reviewed_at: new Date().toISOString(),
                    reviewed_by: (await supabase.auth.getUser()).data.user?.id
                })
                .eq('id', applicationId);

            if (appError) throw appError;

            // Update user role to consultant
            const { error: roleError } = await supabase
                .from('profiles')
                .update({ role: 'consultant' })
                .eq('id', userId);

            if (roleError) throw roleError;

            toast({
                title: "Application Approved",
                description: "User has been granted consultant access."
            });
            fetchData();
        } catch (err: any) {
            toast({ title: "Approval Failed", description: err.message, variant: "destructive" });
        }
    };

    const rejectApplication = async (applicationId: string) => {
        try {
            const { error } = await supabase
                .from('consultant_applications')
                .update({
                    status: 'rejected',
                    reviewed_at: new Date().toISOString(),
                    reviewed_by: (await supabase.auth.getUser()).data.user?.id
                })
                .eq('id', applicationId);

            if (error) throw error;
            toast({ title: "Application Rejected" });
            fetchData();
        } catch (err: any) {
            toast({ title: "Rejection Failed", description: err.message, variant: "destructive" });
        }
    };

    const getConsultantStats = (consultantId: string) => {
        const theirApps = assignedWork.filter(a => a.consultant_id === consultantId);
        const theirMsgs = messages.filter(m => m.user_id === consultantId);

        let lastActive = null;
        if (theirMsgs.length > 0) {
            const lastMsg = theirMsgs.reduce((latest, current) =>
                new Date(current.created_at) > new Date(latest.created_at) ? current : latest
                , theirMsgs[0]);
            lastActive = lastMsg.created_at;
        }

        return {
            studentCount: theirApps.length,
            activeCount: theirApps.filter(a => a.status !== 'not_started' && a.status !== 'rejected').length,
            messageCount: theirMsgs.length,
            lastActive
        };
    };

    return (
        <div className="space-y-12">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Active Consultants</p>
                        <h3 className="text-3xl font-black text-indigo-900">{consultants.length}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                        <Users className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Students Managed</p>
                        <h3 className="text-3xl font-black text-blue-900">{assignedWork.length}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                        <FileText className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">Pending Approval</p>
                        <h3 className="text-3xl font-black text-amber-900">{applications.filter(a => a.status === 'pending').length}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-amber-600">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                </div>
                <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Invitations Open</p>
                        <h3 className="text-3xl font-black text-emerald-900">{accessCodes.filter(c => !c.is_used).length}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600">
                        <Key className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Pending Applications Section */}
            {applications.filter(a => a.status === 'pending').length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-amber-600" />
                        Pending Approvals
                    </h3>
                    <div className="space-y-3">
                        {applications.filter(a => a.status === 'pending').map(app => (
                            <div key={app.id} className="p-6 rounded-2xl bg-white dark:bg-card border border-amber-100 hover:border-amber-200 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-bold text-lg tracking-tight">{app.full_name}</h4>
                                        <p className="text-sm text-slate-400 font-bold">{app.email}</p>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
                                        Pending Review
                                    </span>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Qualifications</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{app.qualifications}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Experience</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300">{app.experience}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => approveApplication(app.id, app.user_id)}
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            if (window.confirm(`Reject application from ${app.full_name}?`)) {
                                                rejectApplication(app.id);
                                            }
                                        }}
                                        variant="outline"
                                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Active Consultants */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-600" />
                        Live Consultant Roster
                    </h3>

                    {isLoading ? (
                        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-slate-200" /></div>
                    ) : consultants.length === 0 ? (
                        <div className="p-12 text-center rounded-[2rem] border border-dashed text-slate-400">
                            No active consultants found.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {consultants.map(c => {
                                const stats = getConsultantStats(c.id);
                                return (
                                    <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-card border border-slate-100 group hover:border-indigo-200 transition-all shadow-sm hover:shadow-md">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-200">
                                                    {c.avatar_url ? <img src={c.avatar_url} className="w-full h-full rounded-full object-cover" /> : c.display_name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-base tracking-tight">{c.display_name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold">{c.email}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                {stats.lastActive ? (
                                                    <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 justify-end">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Active {formatDistanceToNow(new Date(stats.lastActive))} ago
                                                    </div>
                                                ) : (
                                                    <div className="text-[10px] font-bold text-slate-300">Inactive</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="p-3 bg-slate-50 rounded-xl">
                                                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Workload</p>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-indigo-600" />
                                                    <span className="font-bold text-slate-700">{stats.studentCount} Students</span>
                                                </div>
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded-xl">
                                                <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Interactions</p>
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                                                    <span className="font-bold text-slate-700">{stats.messageCount} Msgs</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="flex-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold"
                                                onClick={() => setSelectedConsultant(c)}
                                            >
                                                <Eye className="w-4 h-4 mr-2" /> Inspect
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200"
                                                onClick={() => {
                                                    if (window.confirm(`Are you sure you want to REVOKE access for ${c.display_name}? They will lose all consultant privileges.`)) {
                                                        removeConsultant(c.id);
                                                    }
                                                }}
                                            >
                                                <Ban className="w-4 h-4 mr-2" /> Revoke
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Access Codes */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Key className="w-5 h-5 text-indigo-600" />
                            Invitation Protocol
                        </h3>
                    </div>

                    <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Consultant Email (Protocol ID)</label>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="consultant@example.com"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="bg-white border-indigo-100 focus:ring-indigo-500 rounded-xl"
                                />
                                <Button
                                    onClick={generateCode}
                                    disabled={isGenerating}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl whitespace-nowrap"
                                >
                                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                                    Generate Code
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {accessCodes.map(code => (
                            <div key={code.id} className={`p-4 rounded-2xl border transition-all ${code.is_used ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-emerald-100 shadow-sm'}`}>
                                <div className="space-y-3 mb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Protocol ID</p>
                                            <p className="font-bold text-sm text-slate-700">{code.protocol_id || 'Legacy Code'}</p>
                                        </div>
                                        {code.is_used ? (
                                            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-tighter">
                                                <CheckCircle2 className="w-3 h-3" /> Used
                                            </span>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                                    onClick={() => copyToClipboard(`${code.protocol_id}\nKey: ${code.code}`)}
                                                >
                                                    <Copy className="w-3.5 h-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => {
                                                        if (window.confirm("Revoke this unused invitation?")) {
                                                            deleteAccessCode(code.id);
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Key</span>
                                        <code className="text-xs font-black tracking-widest text-indigo-600">
                                            {code.code}
                                        </code>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(new Date(code.created_at), 'MMM d')}</span>
                                    {!code.is_used && (
                                        <span className="flex items-center gap-1 text-emerald-500"><Clock className="w-3 h-3" /> Expires {format(new Date(code.expires_at), 'MMM d')}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inspect Modal */}
            <Dialog open={!!selectedConsultant} onOpenChange={(o) => {
                if (!o) setSelectedConsultant(null);
            }}>
                <DialogContent className="max-w-4xl bg-white rounded-[3rem] p-0 overflow-hidden border-0">
                    {selectedConsultant && (
                        <div className="flex flex-col h-[80vh]">
                            <div className="bg-slate-50 p-8 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-indigo-200">
                                            {selectedConsultant.display_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900">{selectedConsultant.display_name}</h2>
                                            <p className="text-lg text-slate-500 font-medium">{selectedConsultant.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold text-sm">
                                            Active Consultant
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                                <Tabs defaultValue="students" className="flex flex-col h-full w-full">
                                    <div className="px-8 pt-6 flex-shrink-0">
                                        <TabsList className="bg-slate-100 p-1 rounded-2xl w-full justify-start max-w-md">
                                            <TabsTrigger value="students" className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                                <Users className="w-4 h-4 mr-2" /> Managed Students
                                            </TabsTrigger>
                                            <TabsTrigger value="activity" className="rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                                <TrendingUp className="w-4 h-4 mr-2" /> Recent Activity
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <TabsContent value="students" className="flex-1 overflow-y-auto min-h-0 p-8 pt-4 data-[state=inactive]:hidden">
                                        {assignedWork.filter(a => a.consultant_id === selectedConsultant.id).length === 0 ? (
                                            <div className="p-12 text-center text-slate-400 border-2 border-dashed rounded-3xl">
                                                No students currently assigned.
                                            </div>
                                        ) : (
                                            <div className="space-y-4 pb-4">
                                                {assignedWork.filter(a => a.consultant_id === selectedConsultant.id).map(work => {
                                                    const displayProgress = work.progress_percentage ||
                                                        (work.status === 'accepted' ? 100 :
                                                            work.status === 'rejected' ? 100 :
                                                                work.status === 'under_review' ? 75 :
                                                                    work.status === 'pending_review' ? 50 : 10);

                                                    return (
                                                        <div key={work.id} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-indigo-100 transition-colors">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <div>
                                                                    <h4 className="font-bold text-lg text-slate-900">
                                                                        {work.profiles?.display_name || work.profiles?.email || 'Unknown Student'}
                                                                    </h4>
                                                                    <p className="text-sm text-slate-400 font-bold">
                                                                        {work.university_name || 'No University Selected'}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className={`
                                                                    inline-flex px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide mb-1
                                                                    ${work.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                                                                            work.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                                                                'bg-blue-50 text-blue-600'}
                                                                `}>
                                                                        {work.status.replace('_', ' ')}
                                                                    </div>
                                                                    <p className="text-[10px] text-slate-300 font-bold">
                                                                        Updated {format(new Date(work.updated_at), 'MMM d')}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="bg-slate-50 rounded-xl p-3">
                                                                <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                                                                    <span className="flex items-center gap-1">
                                                                        Application Progress
                                                                        <span title="Estimated based on application status and completed steps." className="cursor-help text-slate-300">ⓘ</span>
                                                                    </span>
                                                                    <span>{displayProgress}%</span>
                                                                </div>
                                                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                                                    <div
                                                                        className={`h-full rounded-full transition-all duration-500 ${displayProgress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                                                                            }`}
                                                                        style={{ width: `${displayProgress}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="activity" className="flex-1 overflow-y-auto min-h-0 p-8 pt-4 data-[state=inactive]:hidden">
                                        <div className="relative pl-4 space-y-6 pb-4 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-slate-200">
                                            {messages.filter(m => m.user_id === selectedConsultant.id).length === 0 ? (
                                                <div className="text-slate-400 text-sm font-bold pl-4">No recent activity recorded.</div>
                                            ) : (
                                                messages.filter(m => m.user_id === selectedConsultant.id).map((msg, i) => (
                                                    <div key={i} className="relative pl-6">
                                                        <div className="absolute left-[-5px] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-indigo-500 shadow-sm" />
                                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-xs font-black uppercase text-indigo-500 tracking-wide">Sent Message</span>
                                                                <span className="text-[10px] font-bold text-slate-400">{format(new Date(msg.created_at), 'MMM d, h:mm a')}</span>
                                                            </div>
                                                            <p className="text-sm text-slate-600 line-clamp-2 italic">"{msg.message}"</p>
                                                            {/* We could lookup student name here if we enriched messages with app data */}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
