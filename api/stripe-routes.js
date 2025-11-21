// Stripe API Routes for ReportHere
// These are serverless functions that handle Stripe operations securely

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create Checkout Session
 * POST /api/create-checkout-session
 */
async function createCheckoutSession(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, userEmail, userId, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      client_reference_id: userId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Create Customer Portal Session
 * POST /api/create-portal-session
 */
async function createPortalSession(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId, returnUrl } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get Subscription Status
 * GET /api/subscription-status/:userId
 */
async function getSubscriptionStatus(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.params;

    // Query your database for subscription info
    // This is a placeholder - you'll need to implement your database query
    const subscription = await getSubscriptionFromDatabase(userId);

    if (!subscription) {
      return res.status(200).json({
        active: false,
        tier: 'FREE',
        status: null,
      });
    }

    // Verify subscription status with Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);

    res.status(200).json({
      active: stripeSubscription.status === 'active',
      tier: subscription.tier,
      status: stripeSubscription.status,
      currentPeriodEnd: stripeSubscription.current_period_end,
      cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Cancel Subscription
 * POST /api/cancel-subscription
 */
async function cancelSubscription(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subscriptionId } = req.body;

    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.status(200).json({ success: true, subscription });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Verify Payment Session
 * GET /api/verify-session/:sessionId
 */
async function verifyPaymentSession(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.status(200).json({
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email,
      userId: session.client_reference_id,
      subscriptionId: session.subscription,
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Stripe Webhook Handler
 * POST /api/webhooks/stripe
 */
async function handleStripeWebhook(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object;
      await handleSubscriptionUpdate(updatedSubscription);
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      await handleSubscriptionCancellation(deletedSubscription);
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      await handleSuccessfulInvoicePayment(invoice);
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      await handleFailedInvoicePayment(failedInvoice);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
}

// Helper functions for webhook handlers
async function handleSuccessfulPayment(session) {
  // Update your database with subscription info
  console.log('Payment successful for session:', session.id);
  
  // TODO: Update user's subscription status in your database
  // await updateUserSubscription(session.client_reference_id, {
  //   stripe_customer_id: session.customer,
  //   stripe_subscription_id: session.subscription,
  //   tier: getTierFromPriceId(session.line_items.data[0].price.id),
  //   status: 'active'
  // });
}

async function handleSubscriptionUpdate(subscription) {
  console.log('Subscription updated:', subscription.id);
  
  // TODO: Update subscription status in your database
}

async function handleSubscriptionCancellation(subscription) {
  console.log('Subscription cancelled:', subscription.id);
  
  // TODO: Update user's subscription to FREE tier in your database
}

async function handleSuccessfulInvoicePayment(invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  // TODO: Send receipt email to customer
}

async function handleFailedInvoicePayment(invoice) {
  console.log('Invoice payment failed:', invoice.id);
  
  // TODO: Send payment failure notification to customer
}

// Placeholder for database query
async function getSubscriptionFromDatabase(userId) {
  // TODO: Implement actual database query
  // This should query your Supabase database for the user's subscription
  return null;
}

// Export handlers
module.exports = {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  cancelSubscription,
  verifyPaymentSession,
  handleStripeWebhook,
};
