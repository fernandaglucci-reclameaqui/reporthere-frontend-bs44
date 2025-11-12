import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/api/entities';
import { Company } from '@/api/entities';
import { Subscription } from '@/api/entities';
// base44 removed - using Supabase entities
import { createPageUrl } from '@/utils';
import { Loader2, CheckCircle, Package, CreditCard, Building, ArrowLeft, ExternalLink, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const plans = [
    { name: "Pro", price: "$49", sku: "plan_pro_monthly", features: ["5 User Seats", "500 Reply Credits/mo", "Standard Analytics", "Email Support"] },
    { name: "Business", price: "$199", sku: "plan_business_monthly", features: ["20 User Seats", "2,500 Reply Credits/mo", "Advanced Analytics", "Priority Support"] }
];

const creditPacks = [
    { name: "100 Credits", price: "$19", sku: "credits_100" },
    { name: "500 Credits", price: "$79", sku: "credits_500" },
    { name: "1000 Credits", price: "$129", sku: "credits_1000" }
];

export default function BillingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState(null);
    const [company, setCompany] = useState(null);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const currentUser = await User.me();
                setUser(currentUser);

                if (!currentUser.companies_claimed || currentUser.companies_claimed.length === 0) {
                    toast.error("You must claim a company profile to access billing.");
                    navigate(createPageUrl('ClaimProfile'));
                    return;
                }

                const companyId = currentUser.companies_claimed[0];
                const companyData = await Company.get(companyId);
                setCompany(companyData);

                const subs = await Subscription.filter({ company_id: companyId });
                if (subs.length > 0) {
                    setSubscription(subs[0]);
                }
            } catch (error) {
                console.error("Error loading billing data:", error);
                toast.error("You must be logged in to manage billing.");
                navigate(createPageUrl('Home'));
            }
            setLoading(false);
        };
        loadData();
    }, [navigate]);

    const handleCheckout = async (sku) => {
        setIsProcessing(true);
        try {
            const { createBillingCheckout } = await import('@/api/functions');
            const data = await createBillingCheckout({
                sku: sku,
                companyId: company.id,
                success_url: `${window.location.origin}${createPageUrl('BillingSuccess')}`,
                cancel_url: window.location.href,
            });
            window.location.href = data.checkout_url;
        } catch (error) {
            console.error("Checkout failed:", error);
            toast.error("Could not initiate checkout. Please try again.");
            setIsProcessing(false);
        }
    };

    const handlePortal = async () => {
        setIsProcessing(true);
        try {
            const { createBillingPortal } = await import('@/api/functions');
            const data = await createBillingPortal();
            window.location.href = data.portal_url;
        } catch (error) {
            console.error("Portal creation failed:", error);
            toast.error("Could not open billing portal. Please try again.");
            setIsProcessing(false);
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="outline" size="icon" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /></Button>
                    <h1 className="text-3xl font-bold text-gray-900">Billing & Subscriptions</h1>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Building className="w-5 h-5 text-gray-600" /> {company.name}</CardTitle>
                        <CardDescription>Manage your plan and credits.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Current Plan</p>
                            <p className="text-xl font-bold">{subscription ? subscription.plan_sku.split('_')[1] : 'Free'}</p>
                            {subscription && <p className="text-xs text-gray-500">Renews on {new Date(subscription.current_period_end).toLocaleDateString()}</p>}
                        </div>
                         <div className="p-4 bg-gray-100 rounded-lg">
                            <p className="text-sm font-medium text-gray-600">Reply Credits</p>
                            <p className="text-xl font-bold">{company.credits_available || 0}</p>
                            <p className="text-xs text-gray-500">Used for responding to complaints.</p>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="plans">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
                        <TabsTrigger value="credits">Buy Credits</TabsTrigger>
                    </TabsList>
                    <TabsContent value="plans">
                        <div className="grid md:grid-cols-2 gap-8">
                            {plans.map(plan => (
                                <Card key={plan.name} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{plan.name}</CardTitle>
                                        <CardDescription className="text-3xl font-bold pt-2">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <ul className="space-y-3">
                                            {plan.features.map(feature => (
                                                <li key={feature} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button
                                            className="w-full"
                                            disabled={isProcessing || subscription?.plan_sku === plan.sku}
                                            onClick={() => handleCheckout(plan.sku)}
                                        >
                                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : subscription?.plan_sku === plan.sku ? 'Current Plan' : 'Choose Plan'}
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                     <TabsContent value="credits">
                        <Card>
                            <CardHeader>
                                <CardTitle>One-Time Credit Packs</CardTitle>
                                <CardDescription>Top up your credits anytime. Credits do not expire.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {creditPacks.map(pack => (
                                    <div key={pack.sku} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-semibold">{pack.name}</p>
                                            <p className="text-sm text-gray-600">{pack.price}</p>
                                        </div>
                                        <Button onClick={() => handleCheckout(pack.sku)} disabled={isProcessing}>
                                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Buy Now'}
                                        </Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                
                 <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Manage Billing</CardTitle>
                        <CardDescription>Update your payment method, view invoices, or cancel your subscription.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button onClick={handlePortal} disabled={isProcessing}>
                            {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" /> Open Customer Portal</>}
                        </Button>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}