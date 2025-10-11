
import { createStripeCheckout } from "@/api/functions";
import { createStripePortal } from "@/api/functions";

export async function startStripeCheckout(planName, company_id) {
  try {
    const result = await createStripeCheckout({ planName, company_id });
    const url = result?.data?.url;
    if (url) {
      window.location.href = url;
    } else {
      console.error("Stripe checkout failed:", result);
      alert("Could not initiate checkout. Please try again.");
    }
  } catch (error) {
    console.error("Error calling createStripeCheckout:", error);
    alert("An error occurred while setting up payment.");
  }
}

export async function redirectToCustomerPortal(company_id) {
    try {
        const result = await createStripePortal({ company_id });
        const url = result?.data?.url;
        if(url) {
            window.location.href = url;
        } else {
            console.error("Could not create portal session:", result);
            alert("Could not open billing management. Please try again.");
        }
    } catch (error) {
        console.error("Error calling createStripePortal:", error);
        alert("An error occurred while opening billing management.");
    }
}
