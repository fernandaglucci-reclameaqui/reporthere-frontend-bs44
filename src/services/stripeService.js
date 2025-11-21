// Stripe Payment Service for ReportHere
// This service handles all Stripe payment operations

// Stripe configuration
const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'YOUR_STRIPE_PUBLISHABLE_KEY';
const STRIPE_SECRET_KEY = process.env.REACT_APP_STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY';

// Pricing tiers matching your pricing page
export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    priceId: null, // No Stripe price ID for free tier
    features: [
      'View public complaints',
      'Search companies',
      'Basic company profiles',
      'Limited to 1 complaint per month'
    ]
  },
  BASIC: {
    name: 'Basic',
    price: 29,
    priceId: 'price_basic', // Will be replaced with actual Stripe price ID
    features: [
      'Respond to complaints',
      'Company dashboard',
      'Email notifications',
      'Up to 50 complaints/month',
      'Basic analytics'
    ]
  },
  PRO: {
    name: 'Pro',
    price: 79,
    priceId: 'price_pro', // Will be replaced with actual Stripe price ID
    features: [
      'Everything in Basic',
      'Unlimited complaints',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access'
    ],
    popular: true
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 'Custom',
    priceId: null, // Contact sales for custom pricing
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantees',
      'White-label solution',
      'Advanced security features'
    ]
  }
};

/**
 * Initialize Stripe checkout session
 * @param {string} priceId - Stripe price ID
 * @param {string} userEmail - Customer email
 * @param {string} userId - User ID from your database
 * @returns {Promise<string>} - Checkout session URL
 */
export async function createCheckoutSession(priceId, userEmail, userId) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userEmail,
        userId,
        successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

/**
 * Create Stripe customer portal session for subscription management
 * @param {string} customerId - Stripe customer ID
 * @returns {Promise<string>} - Portal session URL
 */
export async function createPortalSession(customerId) {
  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        returnUrl: `${window.location.origin}/business-dashboard`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const { url } = await response.json();
    return url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

/**
 * Check if user has active subscription
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Subscription status
 */
export async function getSubscriptionStatus(userId) {
  try {
    const response = await fetch(`/api/subscription-status/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return {
      active: false,
      tier: 'FREE',
      status: null
    };
  }
}

/**
 * Cancel subscription
 * @param {string} subscriptionId - Stripe subscription ID
 * @returns {Promise<boolean>} - Success status
 */
export async function cancelSubscription(subscriptionId) {
  try {
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    return true;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Verify payment session
 * @param {string} sessionId - Checkout session ID
 * @returns {Promise<Object>} - Session details
 */
export async function verifyPaymentSession(sessionId) {
  try {
    const response = await fetch(`/api/verify-session/${sessionId}`);
    
    if (!response.ok) {
      throw new Error('Failed to verify payment session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment session:', error);
    throw error;
  }
}

// Export Stripe publishable key for frontend use
export const getStripePublishableKey = () => STRIPE_PUBLISHABLE_KEY;
