# ReportHere - Frontend

This is the frontend for the ReportHere platform, a place for consumers to file complaints and for businesses to manage their reputation.

---

## 🚀 How to Deploy

Our deployment process is automated through Vercel.

1.  **Push to `main` branch:** Any code pushed or merged to the `main` branch in GitHub will automatically trigger a **production** deployment.
2.  **Push to any other branch:** Pushing to any other branch (e.g., `develop`, `feature/new-design`) will automatically trigger a **preview** deployment. You can use the preview URL to test changes before merging to `main`.
3.  **Check deployment status:** Go to your [Vercel Dashboard](https://vercel.com/fernanda-luccis-projects/reporthere-frontend-bs44) to see the status of all deployments.

**In short: To deploy to production, just push your code to the `main` branch.**

---

## 🛠️ Project Management Guide

This guide explains where to manage different aspects of the ReportHere platform.

### 📝 Content Editing

*   **Goal:** To allow editing of homepage text, FAQs, legal pages, and blog posts without code.
*   **Implementation:** We will set up a Headless CMS (like Sanity or Strapi) and integrate it into the app. This will provide a user-friendly interface for you to edit all content.
*   **Status:** **(Coming in Phase 3)**. I will build this next.

### 👥 User & Company Management

*   **Where:** [Supabase Dashboard](https://database.supabase.co/)
*   **How-to:**
    1.  Go to your Supabase project.
    2.  Click on the **"Table Editor"** (grid icon) in the left sidebar.
    3.  Select the `users` table to see all users.
    4.  Select the `companies` table to see all companies.
    5.  You can view, edit, or delete records directly from this interface.

### 🪵 Logs & Error Monitoring

*   **Where:** [Vercel Dashboard](https://vercel.com/fernanda-luccis-projects/reporthere-frontend-bs44)
*   **How-to:**
    1.  Go to your Vercel project.
    2.  Click on the **"Logs"** tab.
    3.  You can view real-time logs for all deployments (production and preview).
    4.  Filter by function, time, or search for specific errors.

### 💳 Payments & Subscriptions

*   **Where:** [Stripe Dashboard](https://dashboard.stripe.com/)
*   **How-to:**
    1.  Log in to your Stripe account.
    2.  You can view all customers, payments, subscriptions, and invoices.
    3.  Manage subscription plans and pricing under the **"Products"** section.

### 💾 Backups & Restore

*   **Service:** Supabase
*   **Details:** Supabase automatically creates daily backups of your database. You can restore to a previous point in time from the Supabase dashboard if needed.
*   **Where:** Supabase Project → **Database** → **Backups**.

---

*This document was last updated on Dec 28, 2025 by Manus AI.*
