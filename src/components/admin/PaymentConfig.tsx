import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface GatewayConfig {
    [key: string]: {
        enabled: boolean;
        test_mode?: boolean;
        public_key?: string;
        secret_key?: string;
        key_id?: string;
        key_secret?: string;
        client_id?: string;
        store_id?: string;
        api_key?: string;
        app_id?: string;
        environment?: 'sandbox' | 'production';
        vendor_id?: string;
        client_token?: string;
    };
    dodo?: {
        enabled: boolean;
        api_key?: string;
        webhook_secret?: string;
        environment?: 'sandbox' | 'production';
        store_product_id?: string;
    };
}

export default function PaymentConfig() {
    const [config, setConfig] = useState<GatewayConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});

    const toggleSensitive = (key: string) => {
        setShowSensitive(prev => ({ ...prev, [key]: !prev[key] }));
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('system_settings')
            .select('value')
            .eq('key', 'payment_gateways')
            .single();

        if (data) {
            setConfig(data.value as unknown as GatewayConfig);
        } else {
            // Fallback default
            setConfig({
                stripe: { enabled: true, public_key: '', secret_key: '' },
                razorpay: { enabled: false, key_id: '', key_secret: '' },
                paypal: { enabled: false, client_id: '' },
                lemonsqueezy: { enabled: false, store_id: '', api_key: '' },
                cashfree: { enabled: false, app_id: '', secret_key: '', environment: 'sandbox' },
                paddle: { enabled: false, vendor_id: '', client_token: '', environment: 'sandbox' },
                dodo: { enabled: false, api_key: '', webhook_secret: '', environment: 'sandbox', store_product_id: '' }
            });
        }
        setIsLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        // In a real app, validation should happen here
        const { error } = await supabase
            .from('system_settings')
            .upsert({ key: 'payment_gateways', value: config });

        if (error) {
            toast.error('Failed to save settings');
        } else {
            toast.success('Payment settings updated');
        }
        setIsSaving(false);
    };

    const updateGateway = (provider: string, field: string, value: any) => {
        setConfig(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [provider]: {
                    ...prev[provider],
                    [field]: value
                }
            };
        });
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-slate-400" /></div>;
    if (!config) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment Gateways</h3>
                    <p className="text-sm text-slate-400">Configure your payment providers and API keys.</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                </Button>
            </div>

            <div className="grid gap-6">
                {/* Stripe */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#635BFF]/10 flex items-center justify-center text-[#635BFF] font-black tracking-tighter text-xs">STR</div>
                            <div>
                                <CardTitle className="text-base">Stripe</CardTitle>
                                <CardDescription>Credit Cards & International</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.stripe?.enabled}
                            onCheckedChange={(c) => updateGateway('stripe', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.stripe?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>Publishable Key</Label>
                                <Input
                                    value={config.stripe.public_key || ''}
                                    onChange={e => updateGateway('stripe', 'public_key', e.target.value)}
                                    type="password"
                                    placeholder="pk_test_..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Secret Key</Label>
                                <div className="relative">
                                    <Input
                                        value={config.stripe.secret_key || ''}
                                        onChange={e => updateGateway('stripe', 'secret_key', e.target.value)}
                                        type={showSensitive['stripe_secret'] ? 'text' : 'password'}
                                        placeholder="sk_test_..."
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => toggleSensitive('stripe_secret')}
                                    >
                                        {showSensitive['stripe_secret'] ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Razorpay */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#3395FF]/10 flex items-center justify-center text-[#3395FF] font-black tracking-tighter text-xs">RZR</div>
                            <div>
                                <CardTitle className="text-base">Razorpay</CardTitle>
                                <CardDescription>India (UPI, Cards, Netbanking)</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.razorpay?.enabled}
                            onCheckedChange={(c) => updateGateway('razorpay', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.razorpay?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>Key ID</Label>
                                <Input
                                    value={config.razorpay.key_id || ''}
                                    onChange={e => updateGateway('razorpay', 'key_id', e.target.value)}
                                    placeholder="rzp_test_..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Key Secret</Label>
                                <div className="relative">
                                    <Input
                                        value={config.razorpay.key_secret || ''}
                                        onChange={e => updateGateway('razorpay', 'key_secret', e.target.value)}
                                        type={showSensitive['razorpay_secret'] ? 'text' : 'password'}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => toggleSensitive('razorpay_secret')}
                                    >
                                        {showSensitive['razorpay_secret'] ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Lemon Squeezy */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#FFC233]/10 flex items-center justify-center text-[#FFC233] font-black tracking-tighter text-xs">LMN</div>
                            <div>
                                <CardTitle className="text-base">Lemon Squeezy</CardTitle>
                                <CardDescription>Global Merchant of Record</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.lemonsqueezy?.enabled}
                            onCheckedChange={(c) => updateGateway('lemonsqueezy', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.lemonsqueezy?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>Store ID</Label>
                                <Input
                                    value={config.lemonsqueezy.store_id || ''}
                                    onChange={e => updateGateway('lemonsqueezy', 'store_id', e.target.value)}
                                    placeholder="Store ID"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>API Key</Label>
                                <div className="relative">
                                    <Input
                                        value={config.lemonsqueezy.api_key || ''}
                                        onChange={e => updateGateway('lemonsqueezy', 'api_key', e.target.value)}
                                        type={showSensitive['lmn_api'] ? 'text' : 'password'}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => toggleSensitive('lmn_api')}
                                    >
                                        {showSensitive['lmn_api'] ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* PayPal */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#003087]/10 flex items-center justify-center text-[#003087] font-black tracking-tighter text-xs">PAL</div>
                            <div>
                                <CardTitle className="text-base">PayPal</CardTitle>
                                <CardDescription>International Payments</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.paypal?.enabled}
                            onCheckedChange={(c) => updateGateway('paypal', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.paypal?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>Client ID</Label>
                                <Input
                                    value={config.paypal.client_id || ''}
                                    onChange={e => updateGateway('paypal', 'client_id', e.target.value)}
                                    placeholder="Client ID"
                                />
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Cashfree */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#111111]/10 flex items-center justify-center text-[#111111] font-black tracking-tighter text-xs">CSH</div>
                            <div>
                                <CardTitle className="text-base">Cashfree</CardTitle>
                                <CardDescription>India (UPI, Cards, Netbanking)</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.cashfree?.enabled}
                            onCheckedChange={(c) => updateGateway('cashfree', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.cashfree?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>App ID</Label>
                                <Input
                                    value={config.cashfree.app_id || ''}
                                    onChange={e => updateGateway('cashfree', 'app_id', e.target.value)}
                                    placeholder="App ID"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Secret Key</Label>
                                <div className="relative">
                                    <Input
                                        value={config.cashfree.secret_key || ''}
                                        onChange={e => updateGateway('cashfree', 'secret_key', e.target.value)}
                                        type={showSensitive['cashfree_secret'] ? 'text' : 'password'}
                                        placeholder="Secret Key"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => toggleSensitive('cashfree_secret')}
                                    >
                                        {showSensitive['cashfree_secret'] ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Environment</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                                    value={config.cashfree.environment || 'sandbox'}
                                    onChange={e => updateGateway('cashfree', 'environment', e.target.value)}
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="production">Production</option>
                                </select>
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Paddle */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-black tracking-tighter text-xs">PDL</div>
                            <div>
                                <CardTitle className="text-base">Paddle</CardTitle>
                                <CardDescription>Global Merchant of Record</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.paddle?.enabled}
                            onCheckedChange={(c) => updateGateway('paddle', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.paddle?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>Vendor ID</Label>
                                <Input
                                    value={config.paddle.vendor_id || ''}
                                    onChange={e => updateGateway('paddle', 'vendor_id', e.target.value)}
                                    placeholder="Vendor ID"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Client Token</Label>
                                <Input
                                    value={config.paddle.client_token || ''}
                                    onChange={e => updateGateway('paddle', 'client_token', e.target.value)}
                                    placeholder="Client Token"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Environment</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                                    value={config.paddle.environment || 'sandbox'}
                                    onChange={e => updateGateway('paddle', 'environment', e.target.value)}
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="production">Production</option>
                                </select>
                            </div>
                        </CardContent>
                    )}
                </Card>

                {/* Dodo Payments */}
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500 font-black tracking-tighter text-xs">DO</div>
                            <div>
                                <CardTitle className="text-base">Dodo Payments</CardTitle>
                                <CardDescription>Secure Hosted Checkout</CardDescription>
                            </div>
                        </div>
                        <Switch
                            checked={config.dodo?.enabled}
                            onCheckedChange={(c) => updateGateway('dodo', 'enabled', c)}
                        />
                    </CardHeader>
                    {config.dodo?.enabled && (
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid gap-2">
                                <Label>API Key</Label>
                                <div className="relative">
                                    <Input
                                        value={config.dodo.api_key || ''}
                                        onChange={e => updateGateway('dodo', 'api_key', e.target.value)}
                                        type={showSensitive['dodo_api'] ? 'text' : 'password'}
                                        placeholder="sk_test_..."
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => toggleSensitive('dodo_api')}
                                    >
                                        {showSensitive['dodo_api'] ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Webhook Secret</Label>
                                <div className="relative">
                                    <Input
                                        value={config.dodo.webhook_secret || ''}
                                        onChange={e => updateGateway('dodo', 'webhook_secret', e.target.value)}
                                        type={showSensitive['dodo_wh'] ? 'text' : 'password'}
                                        placeholder="whsec_..."
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => toggleSensitive('dodo_wh')}
                                    >
                                        {showSensitive['dodo_wh'] ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Store Product ID (One-time payments)</Label>
                                <Input
                                    value={config.dodo.store_product_id || ''}
                                    onChange={e => updateGateway('dodo', 'store_product_id', e.target.value)}
                                    placeholder="p_xxx..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Environment</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                                    value={config.dodo.environment || 'sandbox'}
                                    onChange={e => updateGateway('dodo', 'environment', e.target.value)}
                                >
                                    <option value="sandbox">Sandbox</option>
                                    <option value="production">Production</option>
                                </select>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </div>
        </div >
    );
}
