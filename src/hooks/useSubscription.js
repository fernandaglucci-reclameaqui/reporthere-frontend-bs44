/**
 * useSubscription Hook
 * Manages subscription state and plan enforcement
 * Date: December 17, 2025
 */

import { useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';

/**
 * Plan definitions with features and limits
 */
const PLANS = {
  free: {
    name: 'Free',
    features: {
      maxComplaintsPerMonth: 5,
      maxResponsesPerMonth: 10,
      canExportData: false,
      canCustomizeBranding: false,
      prioritySupport: false,
      advancedAnalytics: false
    }
  },
  basic: {
    name: 'Basic',
    price: 29,
    features: {
      maxComplaintsPerMonth: 50,
      maxResponsesPerMonth: 100,
      canExportData: true,
      canCustomizeBranding: false,
      prioritySupport: false,
      advancedAnalytics: false
    }
  },
  professional: {
    name: 'Professional',
    price: 99,
    features: {
      maxComplaintsPerMonth: 200,
      maxResponsesPerMonth: 500,
      canExportData: true,
      canCustomizeBranding: true,
      prioritySupport: true,
      advancedAnalytics: true
    }
  },
  enterprise: {
    name: 'Enterprise',
    price: 299,
    features: {
      maxComplaintsPerMonth: Infinity,
      maxResponsesPerMonth: Infinity,
      canExportData: true,
      canCustomizeBranding: true,
      prioritySupport: true,
      advancedAnalytics: true,
      dedicatedAccountManager: true,
      customIntegrations: true
    }
  }
};

export function useSubscription() {
  const [user, setUser] = useState(null);

  // Get current user from Supabase
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);
  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.company_id) {
      loadSubscription();
      loadUsage();
    }
  }, [user]);

  async function loadSubscription() {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/subscriptions/${user.company_id}`);
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      console.error('Error loading subscription:', error);
      // Default to free plan if error
      setSubscription({ plan: 'free', status: 'active' });
    } finally {
      setLoading(false);
    }
  }

  async function loadUsage() {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/subscriptions/${user.company_id}/usage`);
      const data = await response.json();
      setUsage(data);
    } catch (error) {
      console.error('Error loading usage:', error);
      setUsage({ complaintsThisMonth: 0, responsesThisMonth: 0 });
    }
  }

  /**
   * Get current plan details
   */
  function getPlan() {
    if (!subscription) return PLANS.free;
    return PLANS[subscription.plan] || PLANS.free;
  }

  /**
   * Check if a feature is available
   */
  function hasFeature(featureName) {
    const plan = getPlan();
    return plan.features[featureName] === true;
  }

  /**
   * Check if usage limit is reached
   */
  function isLimitReached(limitType) {
    if (!usage) return false;
    
    const plan = getPlan();
    const limits = plan.features;

    if (limitType === 'complaints') {
      return usage.complaintsThisMonth >= limits.maxComplaintsPerMonth;
    }
    
    if (limitType === 'responses') {
      return usage.responsesThisMonth >= limits.maxResponsesPerMonth;
    }

    return false;
  }

  /**
   * Get usage percentage for a limit
   */
  function getUsagePercentage(limitType) {
    if (!usage) return 0;
    
    const plan = getPlan();
    const limits = plan.features;

    if (limitType === 'complaints') {
      if (limits.maxComplaintsPerMonth === Infinity) return 0;
      return Math.round((usage.complaintsThisMonth / limits.maxComplaintsPerMonth) * 100);
    }
    
    if (limitType === 'responses') {
      if (limits.maxResponsesPerMonth === Infinity) return 0;
      return Math.round((usage.responsesThisMonth / limits.maxResponsesPerMonth) * 100);
    }

    return 0;
  }

  /**
   * Check if user should see upgrade prompt
   */
  function shouldShowUpgrade() {
    const plan = getPlan();
    return plan.name === 'Free' || 
           getUsagePercentage('complaints') > 80 || 
           getUsagePercentage('responses') > 80;
  }

  /**
   * Get upgrade URL
   */
  function getUpgradeUrl() {
    return '/upgrade';
  }

  /**
   * Check if user is on a paid plan
   */
  function isPaidPlan() {
    const plan = getPlan();
    return plan.name !== 'Free';
  }

  return {
    subscription,
    usage,
    loading,
    plan: getPlan(),
    hasFeature,
    isLimitReached,
    getUsagePercentage,
    shouldShowUpgrade,
    getUpgradeUrl,
    isPaidPlan,
    refresh: () => {
      loadSubscription();
      loadUsage();
    }
  };
}

export default useSubscription;
