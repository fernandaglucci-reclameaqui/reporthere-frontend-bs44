# ✅ User Flows Verification Checklist

This checklist verifies that all key user flows work correctly on ReportHere.

---

## 🧪 Testing Instructions

1. Open your browser in **Incognito/Private mode** (to test as a new user)
2. Go through each flow below
3. Mark each step as **PASS** or **FAIL**
4. If **FAIL**, note the issue in the "Notes" column

---

## 📋 Consumer Flows

### Flow 1: Consumer Sign Up

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Go to `/signup` | Signup page loads | ⏳ | |
| 2. Fill in email, password | Form accepts input | ⏳ | |
| 3. Click "Sign Up" | Account is created | ⏳ | |
| 4. Check email | Welcome email received | ⏳ | |
| 5. After signup | Redirected to dashboard (NOT blank screen) | ⏳ | |
| 6. Dashboard shows | "File Your First Complaint" CTA visible | ⏳ | |

**Overall Flow 1:** ⏳ PENDING

---

### Flow 2: File a Complaint

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Click "File a Complaint" | Complaint form loads | ⏳ | |
| 2. Fill in company name | Autocomplete suggests companies | ⏳ | |
| 3. Fill in complaint details | Form accepts input | ⏳ | |
| 4. Upload evidence (optional) | File uploads successfully | ⏳ | |
| 5. Click "Submit" | Complaint is submitted | ⏳ | |
| 6. Check email | Confirmation email received | ⏳ | |
| 7. Go to "My Complaints" | New complaint appears in list | ⏳ | |
| 8. Click on complaint | Complaint details page loads | ⏳ | |

**Overall Flow 2:** ⏳ PENDING

---

### Flow 3: View Complaint Status

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Go to "My Complaints" | List of complaints loads | ⏳ | |
| 2. Check complaint status | Status badge shows correct state | ⏳ | |
| 3. Click on a complaint | Complaint details page loads | ⏳ | |
| 4. Check for company response | If company replied, response is visible | ⏳ | |

**Overall Flow 3:** ⏳ PENDING

---

## 🏢 Business Flows

### Flow 4: Business Sign Up

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Click "For Businesses" | Business landing page loads | ⏳ | |
| 2. Click "Get Started" | Redirected to signup | ⏳ | |
| 3. Fill in email, password | Form accepts input | ⏳ | |
| 4. Click "Sign Up" | Account is created | ⏳ | |
| 5. After signup | Redirected to business dashboard | ⏳ | |
| 6. Dashboard shows | Onboarding steps or "Claim Company" CTA | ⏳ | |

**Overall Flow 4:** ⏳ PENDING

---

### Flow 5: Claim Company

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Click "Claim Company" | Company search/claim page loads | ⏳ | |
| 2. Search for company | Search works, shows results | ⏳ | |
| 3. Click "Claim" | Claim process starts | ⏳ | |
| 4. Verify ownership | Verification method is clear | ⏳ | |
| 5. Complete verification | Company is claimed successfully | ⏳ | |
| 6. Go to dashboard | Dashboard now shows company data | ⏳ | |

**Overall Flow 5:** ⏳ PENDING

---

### Flow 6: Respond to Complaint

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Go to business dashboard | List of complaints loads | ⏳ | |
| 2. Click on a complaint | Complaint details page loads | ⏳ | |
| 3. Click "Respond" | Response form appears | ⏳ | |
| 4. Type response | Form accepts input | ⏳ | |
| 5. Click "Submit Response" | Response is posted | ⏳ | |
| 6. Check complaint page | Response appears publicly | ⏳ | |
| 7. Check consumer email | Consumer receives notification | ⏳ | |

**Overall Flow 6:** ⏳ PENDING

---

### Flow 7: Upgrade Subscription

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Click "Upgrade" button | Pricing/plans page loads | ⏳ | |
| 2. Select a plan | Plan is selected | ⏳ | |
| 3. Click "Subscribe" | Stripe checkout opens | ⏳ | |
| 4. Enter payment info | Stripe accepts payment | ⏳ | |
| 5. Complete payment | Redirected back to dashboard | ⏳ | |
| 6. Check dashboard | Plan is upgraded, features unlocked | ⏳ | |
| 7. Click "Upgrade" again | No errors, shows current plan | ⏳ | |

**Overall Flow 7:** ⏳ PENDING

---

### Flow 8: Public Complaint Page

| Step | Expected Behavior | Status | Notes |
|---|---|---|---|
| 1. Get public complaint URL | URL format: `/complaints/[id]` | ⏳ | |
| 2. Open in incognito | Page loads (no login required) | ⏳ | |
| 3. Check complaint details | All details are visible | ⏳ | |
| 4. Check company response | If exists, response is displayed | ⏳ | |
| 5. Check SEO meta tags | Title and description are set | ⏳ | |

**Overall Flow 8:** ⏳ PENDING

---

## 📊 Summary

| Flow | Status | Priority |
|---|---|---|
| Consumer Sign Up | ⏳ PENDING | HIGH |
| File a Complaint | ⏳ PENDING | HIGH |
| View Complaint Status | ⏳ PENDING | MEDIUM |
| Business Sign Up | ⏳ PENDING | HIGH |
| Claim Company | ⏳ PENDING | HIGH |
| Respond to Complaint | ⏳ PENDING | HIGH |
| Upgrade Subscription | ⏳ PENDING | MEDIUM |
| Public Complaint Page | ⏳ PENDING | MEDIUM |

---

## 🐛 Known Issues

*(To be filled in during testing)*

---

## 🚀 Next Steps

1. **Test each flow** using this checklist
2. **Mark each step** as PASS or FAIL
3. **Document any issues** in the "Notes" column
4. **Create GitHub issues** for any bugs found
5. **Retest after fixes** to confirm resolution

---

*This document was last updated on Dec 28, 2025 by Manus AI.*
