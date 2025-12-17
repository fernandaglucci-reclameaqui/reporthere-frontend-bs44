import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * Initiates the checkout process for a given plan using Stripe.
 * @param {object} params
 * @param {string} params.plan - The plan ID (e.g., "starter", "growth", "pro", "enterprise", "ultimate")
 * @param {string} params.organization_id - The ID of the organization subscribing
 * @param {string} params.email - The email of the customer for the session
 */
export async function startCheckout({ plan, organization_id, email }) {
  try {
    // Get the plan details from Supabase
    const { data: planData, error: planError } = await supabase
      .from('plans')
      .select('*')
      .eq('id', plan)
      .single();

    if (planError || !planData) {
      console.error('Plan not found:', planError);
      alert('Plan not found. Please try again.');
      return;
    }

    // Free plan doesn't need checkout
    if (planData.name === 'Free') {
      alert('You are already on the Free plan!');
      return;
    }

    // Check if plan has Stripe price ID
    if (!planData.stripe_price_id) {
      console.error('Plan does not have Stripe price ID:', planData);
      alert('This plan is not available for purchase yet.');
      return;
    }

    // Create checkout session via API
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: planData.stripe_price_id,
        userEmail: email,
        userId: organization_id,
        successUrl: `${window.location.origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/billing`,
      }),
    });

    const { url, error } = await response.json();

    if (error) {
      console.error('Checkout error:', error);
      alert(`Could not start checkout: ${error}`);
      return;
    }

    // Redirect to Stripe Checkout
    window.location.href = url;
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    alert('Could not start checkout. Please try again.');
  }
}

/**
 * Redirects the user to the Stripe customer portal to manage their subscription.
 * @param {object} params
 * @param {string} params.organization_id - The ID of the organization
 */
export async function openPortal({ organization_id }) {
  try {
    // Get organization's Stripe customer ID
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('stripe_customer_id')
      .eq('id', organization_id)
      .single();

    if (orgError || !org || !org.stripe_customer_id) {
      console.error('Organization not found or no Stripe customer:', orgError);
      alert('No active subscription found.');
      return;
    }

    // Create portal session via API
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: org.stripe_customer_id,
        returnUrl: `${window.location.origin}/billing`,
      }),
    });

    const { url, error } = await response.json();

    if (error) {
      console.error('Portal error:', error);
      alert(`Could not open portal: ${error}`);
      return;
    }

    // Redirect to Stripe Customer Portal
    window.location.href = url;
  } catch (error) {
    console.error('Stripe Portal Error:', error);
    alert('Could not open billing portal. Please try again.');
  }
}

/**
 * Get current subscription status for an organization
 * @param {string} organization_id - The ID of the organization
 * @returns {Promise<object>} Subscription details
 */
export async function getSubscriptionStatus(organization_id) {
  try {
    const { data: org, error } = await supabase
      .from('organizations')
      .select(`
        *,
        plans (*)
      `)
      .eq('id', organization_id)
      .single();

    if (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }

    return {
      plan: org.plans,
      status: org.subscription_status,
      currentPeriodEnd: org.subscription_current_period_end,
      stripeCustomerId: org.stripe_customer_id,
      stripeSubscriptionId: org.stripe_subscription_id,
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}

/**
 * Cancel subscription at period end
 * @param {string} subscription_id - Stripe subscription ID
 */
export async function cancelSubscription(subscription_id) {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId: subscription_id,
      }),
    });

    const { success, error } = await response.json();

    if (error) {
      console.error('Cancel error:', error);
      alert(`Could not cancel subscription: ${error}`);
      return false;
    }

    return success;
  } catch (error) {
    console.error('Cancel Subscription Error:', error);
    alert('Could not cancel subscription. Please try again.');
    return false;
  }
}
