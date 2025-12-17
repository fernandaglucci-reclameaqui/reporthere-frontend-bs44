import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { openPortal, getSubscriptionStatus } from '@/components/billing/billingAdapter';
import UpgradeModal from '@/components/billing/UpgradeModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle, CreditCard, Users, TrendingUp, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from "sonner";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Billing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [organizationId, setOrganizationId] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    loadBillingInfo();
  }, []);

  const loadBillingInfo = async () => {
    try {
      setLoading(true);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        toast.error("You must be logged in to view billing.");
        navigate('/login');
        return;
      }

      // Get user's organization
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile error:', profileError);
        toast.error("Could not load user profile.");
        return;
      }

      if (!profile.organization_id) {
        toast.error("You must be part of an organization to view billing.");
        navigate('/');
        return;
      }

      setOrganizationId(profile.organization_id);

      // Get subscription status
      const subStatus = await getSubscriptionStatus(profile.organization_id);
      setSubscription(subStatus);
      setCurrentPlan(subStatus?.plan);

      // Get usage data
      const { data: usageData, error: usageError } = await supabase
        .from('usage_tracking')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .gte('period_start', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
        .single();

      if (!usageError && usageData) {
        setUsage(usageData);
      }

    } catch (e) {
      console.error('Failed to load billing info:', e);
      toast.error("Could not load billing information.");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (organizationId) {
      await openPortal({ organization_id: organizationId });
    }
  };

  const formatPrice = (cents) => {
    if (cents === 0) return 'Free';
    return `$${(cents / 100).toLocaleString()}/month`;
  };

  const formatLimit = (limit) => {
    if (!limit || limit === 0) return 'Unlimited';
    return limit.toLocaleString();
  };

  const getUsagePercentage = () => {
    if (!usage || !currentPlan?.max_responses_per_month) return 0;
    if (currentPlan.max_responses_per_month === 0) return 0; // Unlimited
    return (usage.responses_count / currentPlan.max_responses_per_month) * 100;
  };

  const isNearLimit = () => {
    const percentage = getUsagePercentage();
    return percentage >= 80;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-gray-600 mt-4">Loading billing information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Subscription</h1>
            <p className="text-gray-600 mt-1">Manage your plan and billing information</p>
          </div>
        </div>

        {/* Current Plan Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription and billing details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {currentPlan?.name || 'Free'}
                  </span>
                  <span className="text-gray-600">
                    {formatPrice(currentPlan?.price_monthly || 0)}
                  </span>
                </div>
                {subscription?.status && (
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : subscription.status === 'past_due'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>
                )}
                {subscription?.currentPeriodEnd && (
                  <p className="text-sm text-gray-500 mt-2">
                    Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {currentPlan?.name !== 'Ultimate' && (
                  <Button onClick={() => setShowUpgradeModal(true)}>
                    Upgrade Plan
                  </Button>
                )}
                {subscription?.stripeCustomerId && (
                  <Button variant="outline" onClick={handleManageSubscription}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Subscription
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Usage</CardTitle>
            <CardDescription>Your usage for the current billing period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Responses */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Responses</span>
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {usage?.responses_count || 0}
                </div>
                <div className="text-sm text-gray-500">
                  of {formatLimit(currentPlan?.max_responses_per_month)} limit
                </div>
                {currentPlan?.max_responses_per_month > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isNearLimit() ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(getUsagePercentage(), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Team Members</span>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {usage?.users_count || 0}
                </div>
                <div className="text-sm text-gray-500">
                  of {formatLimit(currentPlan?.max_users)} limit
                </div>
              </div>

              {/* Period */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Billing Period</span>
                  <AlertCircle className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-sm text-gray-900">
                  {usage?.period_start && (
                    <>
                      {new Date(usage.period_start).toLocaleDateString()} - {new Date(usage.period_end).toLocaleDateString()}
                    </>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Resets on {usage?.period_end && new Date(usage.period_end).toLocaleDateString()}
                </div>
              </div>
            </div>

            {isNearLimit() && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      You're approaching your monthly limit
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Consider upgrading your plan to avoid service interruption.
                    </p>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      View Plans
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card>
          <CardHeader>
            <CardTitle>Your Plan Includes</CardTitle>
            <CardDescription>Features available on your current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formatLimit(currentPlan?.max_responses_per_month)} Monthly Responses
                  </p>
                  <p className="text-sm text-gray-600">
                    Reply to customer complaints and manage your reputation
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    {formatLimit(currentPlan?.max_users)} Team Members
                  </p>
                  <p className="text-sm text-gray-600">
                    Collaborate with your team to handle complaints
                  </p>
                </div>
              </div>
              {currentPlan?.name !== 'Free' && (
                <>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Advanced Analytics</p>
                      <p className="text-sm text-gray-600">
                        Track response times, sentiment, and customer satisfaction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Priority Support</p>
                      <p className="text-sm text-gray-600">
                        Get help when you need it with faster response times
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Modal */}
      <UpgradeModal open={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
}
