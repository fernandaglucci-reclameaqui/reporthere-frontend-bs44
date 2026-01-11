# Development Checklist - Jan 9th Requirements

## Phase 1: Business Dashboard (Priority)
- [ ] **Dashboard Layout:** Create a professional layout with sidebar navigation (Overview, Complaints, Analytics, Team, Settings).
- [ ] **Key Metrics Cards:** Display "Reputation Score", "Profile Views", "Unresolved Complaints", and "Response Rate".
- [ ] **Recent Activity Feed:** Show a list of recent complaints or interactions.
- [ ] **Charts:** Implement a chart showing complaint volume over time (using Recharts).
- [ ] **Interactive Tutorial (Req #1):** Add a "Start Tutorial" button that triggers a guided tour (using a library like `driver.js` or custom overlay).

## Phase 2: Data Integration & AI (Mock/Stub)
- [ ] **Mock Data Source:** Create a structured JSON file for "Most Searched Companies" and "Recent Complaints".
- [ ] **Connect Home Page:** Update the Home page to pull "Most Searched Companies" from this source.
- [ ] **AI Categorization (Req #2, #25):** (Stub) Add a "Category" field to complaints and a function to "suggest" categories based on keywords.
- [ ] **AI Severity Flagging (Req #3):** (Stub) Add a "Severity" badge (High/Medium/Low) to the complaint list.
- [ ] **AI Summarization (Req #4):** (Stub) Add a "Summary" field to the complaint detail view.

## Phase 3: Authentication & User Roles
- [ ] **Login Page:** Create a professional Login page with "Business" and "Consumer" tabs.
- [ ] **Signup Page:** Create a Signup page with email/password fields.
- [ ] **Role Management (Req #5, #11, #24):** (Stub) Create a "Team" page in the Business Dashboard to list members and roles (Admin, Support, Analyst).

## Phase 4: Consumer Features
- [ ] **Complaint Filing (Req #31):** Update the "File a Complaint" form to include required contact fields (First Name, Last Name, Email, Phone, State).
- [ ] **Consumer Dashboard (Req #13):** Create a simple dashboard for consumers to view their submitted complaints.
- [ ] **Follow/Upvote System (Req #30, #35):** Add "Follow" and "Upvote" buttons to the Complaint Detail page.

## Phase 5: Advanced Business Features
- [ ] **Analytics Section (Req #6, #17, #20, #23):** Create a dedicated "Analytics" tab with deeper charts (Resolution Time, Satisfaction Trends).
- [ ] **Response Templates (Req #9, #15):** (Stub) Add a "Suggested Response" button in the reply editor.
- [ ] **Audit Trail (Req #8):** (Stub) Create a simple "Audit Log" view in Settings.

## Phase 6: Escalation System
- [ ] **Escalation Fields (Req #32):** Add visual indicators for "Escalation Status" (Internal, Consumer Verified, External).
- [ ] **Escalation Guide Page:** Create the `/complaint/[id]/escalate-guide` page with BBB/Regulatory options.

## Phase 7: Company Profile Management
- [ ] **Edit Profile (Req #19, #22, #26):** Allow business users to edit their description, website, and logo.
- [ ] **Claim Profile:** Create a "Claim This Business" flow.

---
*Note: "Stub" means the UI will be built to show the feature, but the backend AI logic will be simulated for this frontend-only draft.*
