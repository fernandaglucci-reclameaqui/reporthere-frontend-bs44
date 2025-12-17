// Stripe Webhook Endpoint for Vercel Serverless Functions
// This handles all Stripe webhook events and updates Supabase

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for admin operations
);

// Disable body parsing for webhooks (Vercel handles raw body)
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Main webhook handler
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Get raw body for signature verification
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`✅ Received event: ${event.type}`);

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;

      default:
        console.log(`ℹ️  Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session) {
  console.log('💳 Processing checkout session:', session.id);

  const userId = session.client_reference_id;
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  if (!userId) {
    console.error('No user ID in checkout session');
    return;
  }

  // Get subscription details from Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0].price.id;

  // Find the plan based on price ID
  const { data: plan, error: planError } = await supabase
    .from('plans')
    .select('*')
    .eq('stripe_price_id', priceId)
    .single();

  if (planError || !plan) {
    console.error('Plan not found for price ID:', priceId);
    return;
  }

  // Update organization with subscription info
  const { error: updateError } = await supabase
    .from('organizations')
    .update({
      plan_id: plan.id,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_status: 'active',
      subscription_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('id', userId);

  if (updateError) {
    console.error('Error updating organization:', updateError);
    throw updateError;
  }

  console.log(`✅ Subscription activated for user ${userId} on plan ${plan.name}`);
}

/**
 * Handle subscription creation
 */
async function handleSubscriptionCreated(subscription) {
  console.log('📝 Subscription created:', subscription.id);
  // Usually handled by checkout.session.completed
}

/**
 * Handle subscription updates (plan changes, renewals)
 */
async function handleSubscriptionUpdated(subscription) {
  console.log('🔄 Subscription updated:', subscription.id);

  const priceId = subscription.items.data[0].price.id;

  // Find the plan
  const { data: plan } = await supabase
    .from('plans')
    .select('*')
    .eq('stripe_price_id', priceId)
    .single();

  if (!plan) {
    console.error('Plan not found for price ID:', priceId);
    return;
  }

  // Update organization
  const { error } = await supabase
    .from('organizations')
    .update({
      plan_id: plan.id,
      subscription_status: subscription.status,
      subscription_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription updated to ${plan.name}`);
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription) {
  console.log('❌ Subscription deleted:', subscription.id);

  // Get the Free plan
  const { data: freePlan } = await supabase
    .from('plans')
    .select('*')
    .eq('name', 'Free')
    .single();

  if (!freePlan) {
    console.error('Free plan not found!');
    return;
  }

  // Downgrade to Free plan
  const { error } = await supabase
    .from('organizations')
    .update({
      plan_id: freePlan.id,
      subscription_status: 'canceled',
      stripe_subscription_id: null,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error downgrading to free plan:', error);
    throw error;
  }

  console.log('✅ Organization downgraded to Free plan');
}

/**
 * Handle successful invoice payment (renewals)
 */
async function handleInvoicePaymentSucceeded(invoice) {
  console.log('💰 Invoice payment succeeded:', invoice.id);

  if (!invoice.subscription) {
    return; // Not a subscription invoice
  }

  // Update subscription status
  const { error } = await supabase
    .from('organizations')
    .update({
      subscription_status: 'active',
    })
    .eq('stripe_subscription_id', invoice.subscription);

  if (error) {
    console.error('Error updating payment status:', error);
  }

  console.log('✅ Payment recorded');
}

/**
 * Handle failed invoice payment
 */
async function handleInvoicePaymentFailed(invoice) {
  console.log('⚠️  Invoice payment failed:', invoice.id);

  if (!invoice.subscription) {
    return;
  }

  // Update subscription status
  const { error } = await supabase
    .from('organizations')
    .update({
      subscription_status: 'past_due',
    })
    .eq('stripe_subscription_id', invoice.subscription);

  if (error) {
    console.error('Error updating payment failure:', error);
  }

  console.log('⚠️  Subscription marked as past_due');
}

/**
 * Helper to get raw body from request
 */
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
