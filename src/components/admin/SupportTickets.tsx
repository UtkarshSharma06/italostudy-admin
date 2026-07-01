import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, CheckCircle2, Circle, MessageSquare, Search, ArrowLeft, Clock } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { formatDistanceToNow } from 'date-fns';

interface Ticket {
    id: string;
    subject: string;
    status: 'open' | 'closed';
    created_at: string;
    user_id: string;
    has_unread_admin_reply: boolean;
    profiles?: {
        display_name?: string;
        email?: string;
        avatar_url?: string;
    };
}

interface Message {
    id: string;
    message: string;
    sender_type: 'user' | 'admin';
    created_at: string;
    sender_id: string;
}

export default function SupportTickets() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('open');
    
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTickets();
        
        // Subscription for new tickets
        const channel = supabase.channel('admin_tickets')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, () => {
                fetchTickets();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        if (selectedTicket) {
            fetchMessages(selectedTicket.id);
            
            const channel = supabase.channel(`ticket_messages_${selectedTicket.id}`)
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'support_messages', filter: `ticket_id=eq.${selectedTicket.id}` }, (payload) => {
                    setMessages(prev => [...prev, payload.new as Message]);
                    scrollToBottom();
                })
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [selectedTicket]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const fetchTickets = async () => {
        setIsLoading(true);
        const { data: ticketsData, error: ticketsError } = await (supabase as any)
            .from('support_tickets')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (ticketsError) {
            console.error('Error fetching tickets:', ticketsError);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load tickets.' });
            setIsLoading(false);
            return;
        }
        
        if (ticketsData && ticketsData.length > 0) {
            const userIds = [...new Set(ticketsData.map(t => t.user_id))];
            const { data: profilesData } = await supabase
                .from('profiles')
                .select('id, display_name, email, avatar_url')
                .in('id', userIds as string[]);
                
            const profileMap = new Map();
            if (profilesData) {
                profilesData.forEach(p => profileMap.set(p.id, p));
            }
            
            const ticketsWithProfiles = ticketsData.map(t => ({
                ...t,
                profiles: profileMap.get(t.user_id) || null
            }));
            setTickets(ticketsWithProfiles as any[]);
        } else {
            setTickets([]);
        }
        setIsLoading(false);
    };

    const fetchMessages = async (ticketId: string) => {
        setIsMessagesLoading(true);
        const { data, error } = await (supabase as any)
            .from('support_messages')
            .select('*')
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: true });
            
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load messages.' });
        } else {
            setMessages(data || []);
            scrollToBottom();
        }
        setIsMessagesLoading(false);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedTicket || !user) return;
        
        setIsSending(true);
        const { error } = await (supabase as any)
            .from('support_messages')
            .insert([{
                ticket_id: selectedTicket.id,
                sender_id: user.id,
                sender_type: 'admin',
                message: newMessage.trim()
            }]);
            
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } else {
            setNewMessage('');
            // Mark ticket as having unread admin reply
            await (supabase as any)
                .from('support_tickets')
                .update({ has_unread_admin_reply: true, updated_at: new Date().toISOString() })
                .eq('id', selectedTicket.id);
        }
        setIsSending(false);
    };

    const toggleTicketStatus = async (ticket: Ticket) => {
        const newStatus = ticket.status === 'open' ? 'closed' : 'open';
        const { error } = await (supabase as any)
            .from('support_tickets')
            .update({ status: newStatus, updated_at: new Date().toISOString() })
            .eq('id', ticket.id);
            
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } else {
            toast({ title: 'Success', description: `Ticket marked as ${newStatus}.` });
            if (selectedTicket?.id === ticket.id) {
                setSelectedTicket({ ...selectedTicket, status: newStatus });
            }
            fetchTickets();
        }
    };

    const filteredTickets = tickets.filter(t => {
        const matchesSearch = t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              t.profiles?.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              t.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || t.status === filter;
        return matchesSearch && matchesFilter;
    });

    if (selectedTicket) {
        return (
            <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setSelectedTicket(null)}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedTicket.subject}</h2>
                            <p className="text-xs text-slate-500">
                                from {selectedTicket.profiles?.display_name || 'User'} ({selectedTicket.profiles?.email})
                            </p>
                        </div>
                    </div>
                    <Button 
                        variant={selectedTicket.status === 'open' ? 'outline' : 'default'}
                        onClick={() => toggleTicketStatus(selectedTicket)}
                        className="gap-2"
                    >
                        {selectedTicket.status === 'open' ? (
                            <><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Close Ticket</>
                        ) : (
                            <><Circle className="w-4 h-4" /> Reopen Ticket</>
                        )}
                    </Button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900">
                    {isMessagesLoading ? (
                        <div className="flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div>
                    ) : messages.length === 0 ? (
                        <div className="text-center text-slate-500 py-10">No messages yet.</div>
                    ) : (
                        messages.map((msg) => {
                            const isAdmin = msg.sender_type === 'admin';
                            return (
                                <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl p-4 ${
                                        isAdmin 
                                        ? 'bg-indigo-600 text-white rounded-tr-sm' 
                                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-sm shadow-sm'
                                    }`}>
                                        <div className="text-xs opacity-70 mb-1 font-medium flex items-center gap-2">
                                            {isAdmin ? 'You (Admin)' : (selectedTicket.profiles?.display_name || 'User')}
                                            <span className="text-[9px] opacity-60">
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className={`whitespace-pre-wrap text-sm ${isAdmin ? '[&_p]:text-white [&_math]:text-white' : '[&_p]:text-slate-800'}`}>
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {msg.message}
        </ReactMarkdown>
    </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Reply Area */}
                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    {selectedTicket.status === 'closed' ? (
                        <div className="text-center text-sm text-slate-500 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            This ticket is closed. Reopen it to reply.
                        </div>
                    ) : (
                        <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
                            <Textarea 
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                placeholder="Type your reply here..."
                                className="resize-none rounded-2xl min-h-[60px]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                            />
                            <Button type="submit" size="icon" className="h-[60px] w-[60px] rounded-2xl shrink-0" disabled={isSending || !newMessage.trim()}>
                                {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <Button variant={filter === 'all' ? 'default' : 'ghost'} size="sm" onClick={() => setFilter('all')} className="rounded-lg">All</Button>
                    <Button variant={filter === 'open' ? 'default' : 'ghost'} size="sm" onClick={() => setFilter('open')} className="rounded-lg">Open</Button>
                    <Button variant={filter === 'closed' ? 'default' : 'ghost'} size="sm" onClick={() => setFilter('closed')} className="rounded-lg">Closed</Button>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input 
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
                ) : filteredTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                        <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                        <p>No tickets found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredTickets.map(ticket => (
                            <div 
                                key={ticket.id} 
                                onClick={() => setSelectedTicket(ticket)}
                                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex items-center justify-between gap-4 group"
                            >
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                        ticket.status === 'open' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-slate-900 dark:text-white truncate text-base group-hover:text-indigo-600 transition-colors">
                                                {ticket.subject || 'No Subject'}
                                            </h3>
                                            {ticket.status === 'open' ? (
                                                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                                                    Open
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                                    Closed
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span className="truncate">{ticket.profiles?.display_name || ticket.profiles?.email || 'Unknown User'}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {ticket.has_unread_admin_reply && ticket.status === 'open' && (
                                        <span className="text-[10px] font-bold text-indigo-500 uppercase flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> Replied
                                        </span>
                                    )}
                                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        View
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
