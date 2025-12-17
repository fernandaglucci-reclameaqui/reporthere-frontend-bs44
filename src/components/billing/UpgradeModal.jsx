import React, { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { startCheckout } from "@/components/billing/billingAdapter";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function UpgradeModal({ open, onClose }) {
  const [user, setUser] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      loadUserAndPlans();
    }
  }, [open]);

  const loadUserAndPlans = async () => {
    try {
      setLoading(true);

      // Get current user
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      setUser(authUser);

      // Get user's organization
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', authUser.id)
        .single();

      if (profileError) throw profileError;
      setOrganizationId(profile.organization_id);

      // Get current organization plan
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .select('plan_id, plans(*)')
        .eq('id', profile.organization_id)
        .single();

      if (orgError) throw orgError;
      setCurrentPlan(org.plans);

      // Get all available plans
      const { data: allPlans, error: plansError } = await supabase
        .from('plans')
        .select('*')
        .order('price_monthly', { ascending: true });

      if (plansError) throw plansError;
      setPlans(allPlans);

    } catch (e) {
      console.error("Failed to load user/plans info:", e);
      alert("Could not load pricing information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (planId) => {
    if (!organizationId || !user?.email) {
      alert("Could not initiate upgrade. User or organization information is missing.");
      return;
    }

    await startCheckout({
      plan: planId,
      organization_id: organizationId,
      email: user.email,
    });
  };

  const formatPrice = (cents) => {
    if (cents === 0) return "Free";
    return `$${(cents / 100).toLocaleString()}`;
  };

  const formatLimit = (limit) => {
    if (!limit || limit === 0) return "Unlimited";
    return limit.toLocaleString();
  };

  const getPlanFeatures = (plan) => {
    const features = [
      { label: "Monthly Responses", value: formatLimit(plan.max_responses_per_month) },
      { label: "Team Members", value: formatLimit(plan.max_users) },
    ];

    // Add plan-specific features
    if (plan.name === "Free") {
      features.push({ label: "Basic Analytics", value: true });
      features.push({ label: "Email Support", value: false });
    } else if (plan.name === "Starter") {
      features.push({ label: "Basic Analytics", value: true });
      features.push({ label: "Email Support", value: true });
    } else if (plan.name === "Growth") {
      features.push({ label: "Advanced Analytics", value: true });
      features.push({ label: "Priority Support", value: true });
      features.push({ label: "Custom Branding", value: true });
    } else if (plan.name === "Pro") {
      features.push({ label: "Advanced Analytics", value: true });
      features.push({ label: "Priority Support", value: true });
      features.push({ label: "Custom Branding", value: true });
      features.push({ label: "API Access", value: true });
    } else if (plan.name === "Enterprise") {
      features.push({ label: "Advanced Analytics", value: true });
      features.push({ label: "Dedicated Support", value: true });
      features.push({ label: "Custom Branding", value: true });
      features.push({ label: "API Access", value: true });
      features.push({ label: "SLA Guarantee", value: true });
    } else if (plan.name === "Ultimate") {
      features.push({ label: "Advanced Analytics", value: true });
      features.push({ label: "Dedicated Support", value: true });
      features.push({ label: "Custom Branding", value: true });
      features.push({ label: "API Access", value: true });
      features.push({ label: "SLA Guarantee", value: true });
      features.push({ label: "White Label", value: true });
    }

    return features;
  };

  const isCurrentPlan = (planId) => currentPlan?.id === planId;
  const isDowngrade = (plan) => {
    if (!currentPlan) return false;
    return plan.price_monthly < currentPlan.price_monthly;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-6xl w-full p-8 space-y-6 shadow-2xl my-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="text-gray-600 mt-2">
            Upgrade to unlock more responses, add team members, and access advanced features.
          </p>
          {currentPlan && (
            <p className="text-sm text-gray-500 mt-1">
              Current plan: <span className="font-semibold">{currentPlan.name}</span>
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading plans...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const features = getPlanFeatures(plan);
              const isCurrent = isCurrentPlan(plan.id);
              const isPopular = plan.name === "Growth";
              const isDowngradeOption = isDowngrade(plan);

              return (
                <div
                  key={plan.id}
                  className={`border rounded-lg p-6 flex flex-col relative ${
                    isPopular ? "border-2 border-green-500 shadow-lg" : ""
                  } ${isCurrent ? "bg-gray-50" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatPrice(plan.price_monthly)}
                      </span>
                      {plan.price_monthly > 0 && (
                        <span className="text-gray-600">/month</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 flex-grow mb-6">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        {typeof feature.value === 'boolean' ? (
                          <>
                            {feature.value ? (
                              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                            )}
                            <span className={feature.value ? "text-gray-700" : "text-gray-400"}>
                              {feature.label}
                            </span>
                          </>
                        ) : (
                          <>
                            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-700">
                              <strong>{feature.value}</strong> {feature.label}
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <Button className="w-full" disabled variant="outline">
                      Current Plan
                    </Button>
                  ) : plan.name === "Free" ? (
                    <Button
                      className="w-full"
                      variant="outline"
                      disabled={isDowngradeOption}
                    >
                      {isDowngradeOption ? "Contact Support to Downgrade" : "Free Plan"}
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${
                        isPopular
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isDowngradeOption}
                    >
                      {isDowngradeOption ? "Contact Support to Downgrade" : `Choose ${plan.name}`}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-500">
            Need a custom plan? <a href="mailto:support@reporthere.com" className="text-blue-600 hover:underline">Contact us</a>
          </p>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
