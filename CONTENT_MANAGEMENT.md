# 📝 Content Management Guide

This guide explains how to edit content on ReportHere without touching code.

---

## 🎯 What You Can Edit

You can edit the following content through the Supabase dashboard:

1. **Homepage Text & CTAs**
2. **Pricing Plans & Details**
3. **FAQs**
4. **Legal Pages** (Terms, Privacy Policy, etc.)
5. **Email Templates** (Basic copy changes)

---

## 🛠️ How to Edit Content

### Step 1: Access Supabase

1. Go to [Supabase Dashboard](https://database.supabase.co/)
2. Log in with your account
3. Select your **ReportHere** project

### Step 2: Open Table Editor

1. Click on the **"Table Editor"** icon (grid icon) in the left sidebar
2. You'll see a list of all your database tables

### Step 3: Find the Content Table

Look for the table named **`content`** (or similar). This table stores all editable content.

**Table Structure:**

| Column | Description | Example |
|---|---|---|
| `id` | Unique identifier | `homepage_hero_title` |
| `type` | Content type | `text`, `html`, `json` |
| `value` | The actual content | `"Welcome to ReportHere!"` |
| `updated_at` | Last update timestamp | `2025-12-28 10:30:00` |

### Step 4: Edit Content

1. Click on the row you want to edit
2. Modify the `value` field
3. Click **Save** or press Enter
4. The changes will appear on your website immediately (or after a page refresh)

---

## 📋 Content IDs Reference

Here's a list of all editable content IDs and what they control:

### Homepage

| ID | What it controls |
|---|---|
| `homepage_hero_title` | Main headline on homepage |
| `homepage_hero_subtitle` | Subtitle below headline |
| `homepage_cta_primary` | Primary button text |
| `homepage_cta_secondary` | Secondary button text |
| `homepage_features` | Features section (JSON format) |

### Pricing

| ID | What it controls |
|---|---|
| `pricing_free_title` | Free plan title |
| `pricing_free_features` | Free plan features (JSON array) |
| `pricing_pro_title` | Pro plan title |
| `pricing_pro_features` | Pro plan features (JSON array) |
| `pricing_enterprise_title` | Enterprise plan title |
| `pricing_enterprise_features` | Enterprise plan features (JSON array) |

### FAQs

| ID | What it controls |
|---|---|
| `faq_list` | All FAQs (JSON array of {question, answer} objects) |

### Legal Pages

| ID | What it controls |
|---|---|
| `legal_terms` | Terms of Service (HTML) |
| `legal_privacy` | Privacy Policy (HTML) |
| `legal_cookies` | Cookie Policy (HTML) |

### Email Templates

| ID | What it controls |
|---|---|
| `email_welcome_subject` | Welcome email subject line |
| `email_welcome_body` | Welcome email body text |
| `email_complaint_subject` | Complaint confirmation subject |
| `email_complaint_body` | Complaint confirmation body |

---

## 🚀 Next Steps

**Status:** The content management system is **partially implemented**.

**What's done:**
- ✅ Documentation created
- ✅ Content structure defined

**What's needed:**
- ⏳ Create the `content` table in Supabase
- ⏳ Populate it with initial content
- ⏳ Update frontend to read from this table

**I will complete this setup in the next phase!**

---

*This document was last updated on Dec 28, 2025 by Manus AI.*
