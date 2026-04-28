import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ShieldCheck, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // MFA & Reset States
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [requiresMFA, setRequiresMFA] = useState(false);
    const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
    const [mfaCode, setMfaCode] = useState("");

    const { user, profile, signIn, signOut, resetPassword, mfa } = useAuth();
    const navigate = useNavigate();

    // Check existing session for redirect or access denial
    useEffect(() => {
        if (user && profile && !requiresMFA) {
            const isAdminRole = profile.role === 'admin' || profile.role === 'sub_admin';
            if (isAdminRole) {
                navigate('/', { replace: true });
            } else {
                // If logged in but not admin (common for Google OAuth users),
                // we must sign them out and inform them.
                signOut().then(() => {
                    toast.error('Access Denied', {
                        description: 'You do not have administrative privileges.',
                    });
                });
            }
        }
    }, [user, profile, requiresMFA, navigate, signOut, toast]);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email.');
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await resetPassword(email);
            if (error) throw error;
            
            toast.success('Email Sent', { 
                description: "If an account exists, a reset link has been sent to your email." 
            });
            setIsForgotPassword(false);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMFAVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mfaFactorId || mfaCode.length !== 6) return;
        
        setIsLoading(true);
        try {
            const { error } = await mfa.challengeAndVerify(mfaFactorId, mfaCode);
            if (error) {
                toast.error('Verification Failed', { description: 'Invalid 2FA code.' });
                setIsLoading(false);
                return;
            }

            // After successful MFA, check role
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const { data: userProfile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                if (userProfile?.role !== 'admin' && userProfile?.role !== 'sub_admin') {
                    await signOut();
                    toast.error('Access Denied', { description: 'You lack administrative privileges.' });
                } else {
                    toast.success('Authorized', { description: "2FA verified. Welcome back." });
                    setRequiresMFA(false);
                    navigate('/', { replace: true });
                }
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsLoading(true);

        try {
            const { data, error } = await signIn(email, password);
            
            if (error) {
                toast.error('Authentication Failed', {
                    description: 'Invalid credentials. Please try again.',
                });
                setIsLoading(false);
                return;
            }

            if (data.session) {
                // 1. Check if MFA is required for this user
                const currentAAL = data.session.authenticator_assurance_level;
                const { data: factorsData } = await mfa.listFactors();
                const totpFactor = factorsData?.all?.find((f: any) => f.factor_type === 'totp' && f.status === 'verified');

                if (totpFactor && currentAAL !== 'aal2') {
                    setMfaFactorId(totpFactor.id);
                    setRequiresMFA(true);
                    setIsLoading(false);
                    return; // Stop here, wait for MFA
                }

                // 2. No MFA required, check role directly
                const { data: userProfile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.session.user.id)
                    .single();

                if (userProfile?.role !== 'admin' && userProfile?.role !== 'sub_admin') {
                    await signOut();
                    toast.error('Access Denied', {
                        description: 'You do not have administrative privileges.',
                    });
                } else {
                    toast.success('Authorized', { description: "Welcome to the control panel." });
                    navigate('/', { replace: true });
                }
            }
        } catch (err: any) {
             toast.error('System Error', { description: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/`,
                }
            });
            if (error) throw error;
        } catch (err: any) {
            toast.error('Google Login Error', { description: err.message });
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#fafafa] font-sans antialiased p-6">
            <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <img src="/logo.webp" alt="Italostudy Admin" className="h-9 w-auto mb-6" />
                    <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                        {requiresMFA ? 'Two-Factor Authentication' : isForgotPassword ? 'Reset Password' : 'System Operations'}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {requiresMFA ? 'Enter your 6-digit authenticator code' : isForgotPassword ? 'Enter your email to receive a reset link' : 'Sign in with your administrator account'}
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    
                    {requiresMFA ? (
                        <form onSubmit={handleMFAVerify} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[13px] font-medium text-slate-700">Authentication Code</label>
                                <Input
                                    type="text"
                                    maxLength={6}
                                    placeholder="000000"
                                    value={mfaCode}
                                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                                    className="h-12 bg-slate-50/50 border-slate-200 text-slate-900 text-center text-xl tracking-widest rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white transition-all font-mono"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading || mfaCode.length !== 6}
                                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-sm transition-all mt-2 text-sm"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify Access'}
                            </Button>
                            <button
                                type="button"
                                onClick={async () => { await signOut(); setRequiresMFA(false); }}
                                className="w-full text-[13px] text-slate-500 hover:text-slate-800 transition-colors mt-4 font-medium"
                            >
                                Cancel and sign out
                            </button>
                        </form>
                    ) : isForgotPassword ? (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[13px] font-medium text-slate-700">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@italostudy.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 bg-slate-50/50 border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white transition-all text-sm"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-sm transition-all mt-2 text-sm"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
                            </Button>
                            <button
                                type="button"
                                onClick={() => setIsForgotPassword(false)}
                                className="w-full text-[13px] text-slate-500 hover:text-slate-800 transition-colors mt-4 font-medium"
                            >
                                Return to login
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-[13px] font-medium text-slate-700">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="name@italostudy.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 bg-slate-50/50 border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white transition-all text-sm"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-[13px] font-medium text-slate-700">Password</label>
                                    <button 
                                        type="button" 
                                        onClick={() => setIsForgotPassword(true)}
                                        className="text-[12px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
                                    >
                                        Forgot?
                                    </button>
                                </div>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-11 bg-slate-50/50 border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 focus:bg-white transition-all text-sm"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium shadow-sm transition-all mt-2 text-sm"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-500 font-medium tracking-widest">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full h-11 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium shadow-sm transition-all text-sm flex items-center justify-center gap-2"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google Auth
                            </Button>
                        </form>
                    )}
                </div>
                
                {/* Footer Minimalist */}
                <div className="text-center mt-8">
                    <p className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
                        Secure Environment • V.2026
                    </p>
                </div>
            </div>
        </main>
    );
}
