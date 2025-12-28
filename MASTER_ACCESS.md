# 🔑 ReportHere - Master Access Document

This document lists all services used by ReportHere and confirms your ownership/admin access.

---

## **1. Code + Ownership**

- **GitHub Repo:** [https://github.com/fernandaglucci-reclameaqui/reporthere-frontend-bs44](https://github.com/fernandaglucci-reclameaqui/reporthere-frontend-bs44)
- **Your Access:** Owner (under your account)
- **Confirmation:** If your laptop disappeared today, we can rebuild from GitHub. ✅

---

## **2. Hosting + Services Access**

| Service | Your Account | Access Level | Notes |
|---|---|---|---|
| **Vercel** (Frontend Hosting) | `fernanda.lucci@gmail.com` | Owner | Manages frontend deployment, domains, environment variables |
| **Supabase** (DB/Auth/Storage) | `fernanda.lucci@gmail.com` | Owner | Manages database, user authentication, file storage |
| **Resend** (Email) | `fernanda.lucci@gmail.com` | Owner | Manages email sending, templates, deliverability |
| **Stripe** (Payments) | `fernanda.lucci@gmail.com` | Owner | Manages subscriptions, payments, invoices |
| **Namecheap** (Domain/DNS) | `fernanda.lucci@gmail.com` | Owner | Manages `reporthere.org` domain and DNS records |

---

## **3. Environment Variables + Secrets**

All environment variables are managed in **Vercel** (Settings → Environment Variables).

**`.env.example` file created and committed to GitHub.**

### **Required Environment Variables:**

| Variable | Description | Where to find it |
|---|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase → Project Settings → API |
| `RESEND_API_KEY` | Your Resend API key | Resend → API Keys |
| `STRIPE_SECRET_KEY` | Your Stripe secret key | Stripe → Developers → API keys |
| `STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key | Stripe → Developers → API keys |

---

*This document was last updated on Dec 28, 2025 by Manus AI.*
