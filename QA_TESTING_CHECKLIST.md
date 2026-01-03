# ReportHere — Full-Blast "Go-Live Beta" System Checklist

**Goal:** Public beta, live domain, real users, controlled risk.

**Test Accounts Required:**
- Consumer A, Consumer B
- Company A (free tier), Company B (paid tier if enabled)
- Admin / internal (if exists)
- One "blocked/disabled" user (for auth edge cases)

---

## PASS/FAIL CRITERIA

- **P0 (Blocker):** breaks core flow, security/privacy risk, payments issue, blank screens, data leaks → **NO LAUNCH**
- **P1 (High):** major UX break, wrong permissions, broken emails, share links broken → launch only if mitigated
- **P2 (Medium):** copy/layout issues, minor glitches
- **P3 (Low):** polish

**Evidence required for every bug:**
- URL + user role + device/browser
- Steps to reproduce
- Expected vs actual
- Screenshot/video
- Console errors + Network tab (if applicable)

---

## 1) DOMAIN, DNS, SITE REACHABILITY (P0)

### 1.1 Domain resolves
- [ ] reporthere.org loads (no parking page, no 404, no SSL warning)
- [ ] www redirect behavior defined (www→root or root→www) and consistent
- [ ] HTTPS enforced (http→https redirect)

**Expected:** valid SSL, fast first paint.

### 1.2 Email DNS sanity (P0)
- [ ] MX points to Namecheap email
- [ ] SPF/DKIM/verification for sending provider stays valid (Resend or whichever)
- [ ] No conflicting SPF records

**Expected:** domain verified, sending not failing.

---

## 2) ENVIRONMENTS & LAUNCH SWITCHES (P0)

### 2.1 Beta mode (P0)
- [ ] Site shows "Public Beta" label somewhere (footer or header)
- [ ] Any risky unfinished features are disabled or gated

**Expected:** users understand it's beta; no irreversible damage.

### 2.2 Payments mode (P0)
- [ ] If payments are enabled: **production keys**, no sandbox references
- [ ] If payments not ready: **upgrade button disabled** or routes to "Coming soon"

**Expected:** no broken upgrade loop, no repeated-click errors.

*(Memory: you had an "upgrade" button error after multiple clicks and sandbox in payment system. This must be verified.)*

---

## 3) AUTHENTICATION & ACCOUNTS (P0)

### 3.1 Signup/Login (P0)

Test for consumer + company:
- [ ] Sign up success
- [ ] Email verification (if used)
- [ ] Login/logout
- [ ] Remember session behavior
- [ ] Password reset: request + email arrives + reset works

**Expected:** clean flow, no dead ends.

### 3.2 Role routing (P0)
- [ ] Consumer lands on consumer dashboard
- [ ] Company lands on company dashboard
- [ ] No cross-role navigation leaks

**Expected:** role separation is strict.

---

## 4) CORE PRODUCT FLOWS (P0)

### 4A) CONSUMER PATH (P0)

#### 4A.1 Consumer dashboard UI (P0)

*(Memory: dashboard was white/blank, no CTA, complaints and dashboard same page.)*

- [ ] Dashboard loads without white screen
- [ ] Clear CTAs:
  - [ ] "Create complaint"
  - [ ] "View my complaints"
  - [ ] "Settings/Profile"

**Expected:** dashboard is not empty; navigation works.

#### 4A.2 Create complaint (P0)
- [ ] Complaint creation form loads
- [ ] Required fields validate
- [ ] Submission creates a complaint record
- [ ] User is redirected to complaint detail page
- [ ] Complaint appears in "My complaints" list

**Expected:** end-to-end creation works every time.

#### 4A.3 Complaint detail view (P0)
- [ ] Status visible
- [ ] Thread visible
- [ ] Company response area visible when present
- [ ] Consumer can add a reply (if allowed)
- [ ] Consumer can attach documents (if feature exists)

**Expected:** complaint is navigable and readable.

#### 4A.4 Social sharing (P1)

*(Memory: you want user + company + platform to be able to share complaint on social media.)*

- [ ] Share button exists on complaint detail
- [ ] Share link preview works (title/description/image)
- [ ] Shared URL opens correct complaint page
- [ ] If complaint is private/unlisted, share must respect privacy

**Expected:** share works and doesn't leak private info.

---

### 4B) COMPANY PATH (P0)

#### 4B.1 Company onboarding (P0)
- [ ] Company signup creates company profile
- [ ] Company can add logo and profile info
- [ ] Company directory listing appears if directory is public

**Expected:** company profile is manageable.

#### 4B.2 Company dashboard (P0)
- [ ] Lists complaints involving the company
- [ ] Has CTA: "Reply", "Resolve", "Request mediation" (if enabled)
- [ ] Reply credits / limits visible (free tier rules)

**Expected:** company can work complaints.

#### 4B.3 Public replies transparency (P0)

*(Memory: company replies are public and transparent; only documents are restricted.)*

- [ ] Company reply posts successfully
- [ ] Reply shows publicly on complaint detail
- [ ] Timestamps + identity display correctly

**Expected:** transparency is consistent.

#### 4B.4 Free tier limits (P0/P1)

*(Memory: free tier should NOT have unlimited replies; upgrade errors were happening.)*

- [ ] Verify exact free-tier limits are enforced:
  - [ ] reply count
  - [ ] mediation access
  - [ ] branding, etc.
- [ ] Upgrade button behavior:
  - [ ] works once
  - [ ] doesn't error on repeated clicks
  - [ ] shows correct plan/price OR is disabled if not ready

**Expected:** limits are enforced; no upgrade crash.

---

## 5) DOCUMENTS & PRIVACY MODEL (P0)

*(Memory: documents uploaded by consumer should be visible only to the company; mediation gives you access only if authorized.)*

### 5.1 Upload behavior (P0)
- [ ] Consumer uploads a document → success
- [ ] Consumer sees file in their complaint detail
- [ ] Company sees file in the complaint detail

### 5.2 Access control (P0)
- [ ] Other consumers cannot access documents (direct URL test)
- [ ] Public complaint viewers cannot access documents
- [ ] Admin/Platform cannot access unless:
  - [ ] escalation/mediation is requested AND
  - [ ] user authorization is granted

**Expected:** no document leakage by URL guessing.

### 5.3 Authorization toggle (P0)
- [ ] Consumer can authorize sharing docs with platform for mediation
- [ ] Once authorized, platform role can access
- [ ] Once revoked (if supported), access ends

**Expected:** permission gates are real.

---

## 6) MEDIATION / ESCALATION FLOW (P1/P0 depending if live)

If mediation is enabled:
- [ ] Company requests mediation
- [ ] Consumer consent required
- [ ] Platform is notified
- [ ] Mediation workspace loads
- [ ] Audit trail exists

If not ready:
- [ ] Mediation feature disabled everywhere
- [ ] No dead CTAs

**Expected:** either fully working or fully hidden.

---

## 7) BLOG & CONTENT PUBLISHING SYSTEM (P1)

*(Memory: you need blog editable by you, shareable across all socials, with SEO and AI indexing.)*

### 7.1 CMS/editability (P1)
- [ ] You can create/edit/publish a post without dev
- [ ] Slug, title, meta description editable
- [ ] Featured image upload works

### 7.2 Shareability (P1)
- [ ] Social share cards render (OpenGraph/Twitter)
- [ ] Copy link opens correct post
- [ ] Share buttons (if present) work

### 7.3 SEO basics (P1)
- [ ] Indexable pages have correct meta tags
- [ ] Canonicals are correct
- [ ] Sitemap exists (if implemented)
- [ ] Robots.txt does not block everything

**Expected:** blog is not dev-dependent.

---

## 8) UI/UX INTEGRITY CHECKS (P1)

### 8.1 Profiles & branding (P1)

*(Memory: you noted Reclame Aqui style profiles with pictures/logos.)*

- [ ] Consumer profile shows basic identity/avatar (if feature exists)
- [ ] Company profile shows logo
- [ ] No broken image placeholders
- [ ] Consistent formatting

### 8.2 Navigation correctness (P0/P1)
- [ ] "My complaints" and "Dashboard" go to different pages with different purpose
- [ ] Back button does not break state
- [ ] Menu items match role

---

## 9) DATA INTEGRITY & PERMISSIONS (RLS) (P0)

*(Memory: you had "Role Permissions & RLS policies PASS WITH NOTES". Re-verify.)*

### 9.1 RLS regression test (P0)
- [ ] Consumer A cannot see Consumer B complaints
- [ ] Company A cannot see Company B complaints
- [ ] Company cannot edit consumer data
- [ ] Public cannot access private routes

### 9.2 Admin scope (P0)
- [ ] Admin can see what admin should see
- [ ] Admin cannot see restricted documents unless mediation authorization exists

---

## 10) EMAIL SYSTEM (P0)

**Inboxes:** info@, no-reply@, notifications@

### 10.1 Transactional email deliverability (P0)

Test emails to:
- [ ] Gmail
- [ ] Outlook/Hotmail
- [ ] Yahoo (optional but good)

Use cases:
- [ ] Verify email (if used)
- [ ] Password reset
- [ ] Complaint created notification
- [ ] Company replied notification

**Expected:** arrives within 1–2 minutes, not in spam.

### 10.2 Headers sanity (P0)
- [ ] From matches domain
- [ ] Reply-To routes correctly (human replies go to info@)
- [ ] Unsubscribe present for non-transactional (if any marketing emails exist)

---

## 11) ANALYTICS, LOGS, ERROR MONITORING (P1)

**Minimum:**
- [ ] Pageview analytics installed (GA4/Plausible/etc.)
- [ ] Error tracking (Sentry or equivalent) for frontend + backend
- [ ] Server logs accessible to Manus

**Expected:** you can see what's breaking in real time after launch.

---

## 12) PERFORMANCE & RELIABILITY (P1)

- [ ] Homepage loads < 3s on normal connection
- [ ] Core complaint pages load reliably
- [ ] No infinite spinners
- [ ] No large blocking assets

**Expected:** feels "real", not "fragile".

---

## 13) SECURITY BASICS (P0)

- [ ] Rate-limit or protect:
  - [ ] signup
  - [ ] login
  - [ ] password reset
- [ ] File upload scanning/limits (size/type)
- [ ] No secrets exposed in frontend
- [ ] Admin routes protected

**Expected:** no obvious abuse vectors.

---

## 14) CONTENT POLICY & ABUSE HANDLING (P1)

- [ ] Report abuse flow (even simple: mailto info@ or form)
- [ ] Takedown process documented internally
- [ ] Basic moderation policy visible (even short)

**Expected:** you can handle the first "problem user".

---

## 15) COMPATIBILITY (P1)

Test on:
- [ ] Desktop: Chrome + Firefox
- [ ] Mobile: iPhone Safari + Android Chrome
- [ ] Responsive layout: dashboards, complaint form, complaint detail

**Expected:** usable across devices.

---

## 16) FINAL PRE-LAUNCH "GOLDEN PATH" SCRIPT (P0)

**Fiverr tester must run this end-to-end without help:**

1. Consumer signs up
2. Consumer creates complaint against Company A
3. Company A signs up / claims profile (if applicable)
4. Company A replies publicly
5. Consumer receives notification email
6. Consumer replies back
7. Document uploaded by consumer
8. Verify document visibility:
   - [ ] Public viewer: cannot access
   - [ ] Company A: can access
   - [ ] Company B: cannot access
9. Share complaint link on social:
   - [ ] opens correct page
   - [ ] does not leak documents
10. Logout/login again: everything still there

**Expected:** full loop works.

---

## 17) LAUNCH DECISION GATE

**Launch is allowed only if:**

- [ ] All P0 pass
- [ ] P1 has either pass or an explicit mitigation (feature disabled/gated)
- [ ] Payment is either correct in production or fully disabled
- [ ] Email password reset works reliably

---

## DELIVERABLE FORMAT FOR FIVERR TESTER

Ask them to provide:

**A spreadsheet (or doc) with columns:**
- ID / Area / Severity / Steps / Expected / Actual / Video-Link / Screenshot / Browser-Device

**A short summary:**
- "Top 5 P0s"
- "Top 5 P1s"
- "Overall launch recommendation: YES/NO"

---

## DOMAIN CONFIGURATION QUESTION

**Question:** The domain of reporthere.org is https://reporthere-frontend-bs44.vercel.app/

**Answer:**

Right now:
- **reporthere.org** = your brand domain
- **reporthere-frontend-bs44.vercel.app** = your deployed app URL

This is normal during development.

**But before going live, reporthere.org must point to that Vercel app.**

If you don't connect them:
- Emails go out from @reporthere.org
- Users click links
- They land on a vercel.app URL
  → This screams "unfinished" and hurts trust + email reputation.

**What needs to happen:**
1. Go to Vercel project settings
2. Add custom domain: reporthere.org
3. Vercel will give you DNS records (A/CNAME)
4. Add those records in Namecheap DNS
5. Wait for DNS propagation (5-60 minutes)
6. Verify reporthere.org loads the app

**This is a P0 blocker for launch.**

---

**END OF CHECKLIST**
