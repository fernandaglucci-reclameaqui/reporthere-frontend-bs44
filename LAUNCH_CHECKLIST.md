
# 🚀 ReportHere - Beta Launch Checklist

This document provides a comprehensive checklist to ensure a smooth and successful beta launch for ReportHere. Follow these steps in order.

---

## 📋 **Phase 1: Database Setup (5-10 minutes)**

This phase prepares your Supabase database with the necessary tables and demo content.

- [ ] **1. Run Demo Complaint SQL**
  - **Why:** Adds a realistic complaint to your database so new users can see what ReportHere looks like in action.
  - **How:**
    1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/drvuhmipyzzlrwnzgdvq/sql).
    2. Open the file `add_demo_complaint.sql` from the project files.
    3. Copy the entire content of the file.
    4. Paste it into the SQL Editor.
    5. Click **"Run"**.
    - **Expected Result:** You should see a "Success! No rows returned" message.

- [ ] **2. Run Audit Logs Migration**
  - **Why:** Creates the `audit_logs` table needed for the new Admin Panel to track moderation actions.
  - **How:**
    1. Go to your [Supabase SQL Editor](https://supabase.com/dashboard/project/drvuhmipyzzlrwnzgdvq/sql).
    2. Open the file `supabase/migrations/create_audit_logs_table.sql`.
    3. Copy the entire content of the file.
    4. Paste it into the SQL Editor.
    5. Click **"Run"**.
    - **Expected Result:** Success message. You can verify by checking for the `audit_logs` table in the Table Editor.

---

## 🧠 **Phase 2: Deploy AI Brain (5 minutes)**

This phase activates the AI features (Response Writer, Summaries, Risk Flagging).

- [ ] **3. Deploy Supabase Edge Function**
  - **Why:** This is the "brain" for all AI features. Without it, the AI tools won't work.
  - **How (Manual Method - Easiest):**
    1. Go to [Supabase Edge Functions](https://supabase.com/dashboard/project/drvuhmipyzzlrwnzgdvq/functions).
    2. Click **"Deploy a new function"** and choose **"Via Editor"**.
    3. For the function name, enter exactly: `ai-complaint-analysis`
    4. Open the file `supabase/functions/ai-complaint-analysis/index.ts`.
    5. Copy the entire content of the file.
    6. Paste it into the Supabase function editor.
    7. **IMPORTANT:** Click on the **"Secrets"** tab for the function.
    8. Add a new secret:
        - **Name:** `OPENAI_API_KEY`
        - **Value:** Your actual OpenAI API key (starts with `sk-...`)
    9. Click **"Deploy"**.
    - **Expected Result:** The function is deployed and you can see it in your list of Edge Functions.

---

## ✅ **Phase 3: Final Testing (30-45 minutes)**

This phase ensures all new and existing features are working correctly before launch.

- [ ] **4. Test Critical User Flows**
  - [ ] **File a Complaint:**
    - Go to `https://www.reporthere.org/file-complaint`.
    - File a test complaint against any company.
    - **Expected Result:** Complaint is created and you are redirected to the complaint page.
  - [ ] **Register a New User:**
    - Open an incognito/private browser window.
    - Register a new consumer account.
    - **Expected Result:** Account is created, and you are logged in.
  - [ ] **Company Claim Process:**
    - Register a new business account.
    - Go to a company page and click "Claim this Business".
    - **Expected Result:** Claim process starts.

- [ ] **5. Test AI Features**
  - [ ] **AI Summary:**
    - Go to any complaint page (including the demo one).
    - **Expected Result:** An "AI Summary" card should appear automatically with a 1-2 sentence summary of the complaint.
  - [ ] **AI Response Writer (as a company):**
    - Log in as a business user who has claimed a company.
    - Go to a complaint filed against your company.
    - You should see the "Post an Official Reply" form.
    - Click the **"Generate AI Response"** button.
    - **Expected Result:** A professionally written response appears in the text area.
  - [ ] **AI Risk Flagging (as a company):**
    - On the same complaint page, look below the AI Summary.
    - **Expected Result:** An "AI Risk Assessment" card should appear, showing severity, risk factors, and recommended actions.

- [ ] **6. Test SEO & Social Sharing**
  - [ ] **View Page Source:**
    - Go to any complaint or company page.
    - Right-click and "View Page Source".
    - **Expected Result:** You should see correct `<title>`, `<meta name="description">`, and `og:image` tags.
  - [ ] **Test Social Share Buttons:**
    - On a complaint page, click the "Share" button.
    - Try sharing to Twitter/Facebook.
    - **Expected Result:** A new window opens with a pre-filled post containing the link and title.

- [ ] **7. Test Admin Moderation Panel**
  - **Note:** You must first make your user an admin. Go to the `users` table in Supabase and change your `user_type` to `admin`.
  - [ ] **Access Admin Panel:**
    - Go to `https://www.reporthere.org/admin` (or a custom URL if you create one).
    - **Expected Result:** You see the Admin Moderation Panel.
  - [ ] **Moderate a Complaint:**
    - Find a test complaint.
    - Try the **Hide/Show**, **Flag/Unflag**, and **Delete** buttons.
    - **Expected Result:** The actions work, and the UI updates.
  - [ ] **Check Audit Logs:**
    - After moderating, go to the `audit_logs` table in Supabase.
    - **Expected Result:** You should see new rows corresponding to the actions you just took.

---

## 🚀 **Phase 4: LAUNCH!**

- [ ] **8. Announce Beta Launch!**
  - You are ready to go! Share the link `https://www.reporthere.org` with your first users!

---

## 📈 **Phase 5: Post-Launch Monitoring**

- [ ] **9. Monitor Vercel & Supabase**
  - Check Vercel logs for any runtime errors.
  - Check Supabase for any database or function errors.
- [ ] **10. Gather User Feedback**
  - Pay close attention to what your first users are saying!

---

Good luck with the launch! You've got this! 💚
