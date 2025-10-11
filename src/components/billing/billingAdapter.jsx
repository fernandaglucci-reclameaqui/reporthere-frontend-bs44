import { Billing } from "@base44/billing-sdk";

// This adapter abstracts the billing provider logic.

/**
 * Initiates the checkout process for a given plan.
 * @param {object} params
 * @param {string} params.provider - The billing provider ("base44" or "stripe").
 * @param {string} params.plan - The name of the plan (e.g., "Pro", "Business").
 * @param {string} params.company_id - The ID of the company subscribing.
 * @param {string} params.email - The email of the customer for the session.
 */
export async function startCheckout({ provider, plan, company_id, email }) {
  if (provider === "stripe") {
    // This block is a placeholder for a potential future Stripe implementation.
    // The Stripe files were removed in the previous step.
    console.warn("Stripe provider is not implemented. Falling back to base44.");
  }

  // Default to Base44 native billing
  try {
    // The plan name must match the name defined in createBillingPlans ("Pro" or "Business")
    await Billing.createCheckout(plan, {
      companyId: company_id,
      customerEmail: email,
    });
  } catch (error) {
    console.error("Base44 Billing Checkout Error:", error);
    alert("Could not start checkout. Please try again.");
  }
}

/**
 * Redirects the user to the customer portal to manage their subscription.
 * @param {object} params
 * @param {string} params.provider - The billing provider ("base44" or "stripe").
 * @param {string} params.company_id - The ID of the company (used by some providers).
 */
export async function openPortal({ provider, company_id }) {
  if (provider === "stripe") {
    // This block is a placeholder for a potential future Stripe implementation.
    console.warn("Stripe provider is not implemented. Falling back to base44.");
  }
  
  // Default to Base44 native billing
  try {
    // The Base44 portal is context-aware and doesn't require company_id.
    await Billing.createPortalSession();
  } catch (error) {
    console.error("Base44 Billing Portal Error:", error);
    alert("Could not open billing portal. Please try again.");
  }
}