# Reputation System Implementation Guide

## Overview

This document explains the new **Customer Karma** reputation system with 5-face sentiment tracking and automated reputation seals.

---

## 🗄️ Database Setup

### Step 1: Run SQL Migrations in Supabase

Go to your Supabase project → SQL Editor and run these migrations in order:

#### Migration 1: Add Sentiment Fields to Complaints Table
```sql
-- File: supabase-migrations/001_add_sentiment_to_complaints.sql
-- Run this first
```

This adds:
- `customer_sentiment` enum (GREEN, YELLOW, ORANGE, RED, PURPLE)
- `resolved_at` timestamp
- `first_response_at` timestamp

#### Migration 2: Create Reputation Metrics Table
```sql
-- File: supabase-migrations/002_create_reputation_metrics_table.sql
-- Run this second
```

This creates:
- `company_reputation_metrics` table with all calculated fields
- `reputation_seal` enum (HIGHLY_RECOMMENDED, RECOMMENDED, etc.)
- Automatic timestamp updates

---

## 🎨 Frontend Components

### 1. SentimentSelectionModal

**Location:** `src/components/complaints/SentimentSelectionModal.jsx`

**Usage:**
```jsx
import SentimentSelectionModal from '@/components/complaints/SentimentSelectionModal';

<SentimentSelectionModal
  isOpen={showSentimentModal}
  onClose={() => setShowSentimentModal(false)}
  complaintId={complaint.id}
  onSentimentSelected={(sentiment) => {
    console.log('User selected:', sentiment);
  }}
/>
```

**When to show:**
- When a complaint is marked as resolved/closed
- When user clicks "Rate this interaction"
- After business responds and user confirms resolution

### 2. SentimentIcon

**Location:** `src/components/ui/SentimentIcon.jsx`

**Usage:**
```jsx
import SentimentIcon from '@/components/ui/SentimentIcon';

<SentimentIcon 
  sentiment="GREEN" 
  size="lg"  // sm, md, lg, xl
/>
```

### 3. ReputationSeal

**Location:** `src/components/ui/ReputationSeal.jsx`

**Usage:**
```jsx
import ReputationSeal from '@/components/ui/ReputationSeal';

// Badge variant (compact)
<ReputationSeal 
  seal="HIGHLY_RECOMMENDED" 
  variant="badge"
/>

// Full variant (with description)
<ReputationSeal 
  seal="UNDER_REVIEW" 
  variant="full"
/>
```

---

## 📊 Services & Logic

### Reputation Metrics Service

**Location:** `src/services/reputationMetricsService.js`

**Key Functions:**

#### Get Company Metrics
```javascript
import { getCompanyMetrics } from '@/services/reputationMetricsService';

const metrics = await getCompanyMetrics(companyId);
console.log(metrics.customer_karma); // 0-100
console.log(metrics.reputation_seal); // HIGHLY_RECOMMENDED, etc.
```

#### Update Sentiment
```javascript
import { updateComplaintSentiment } from '@/services/reputationMetricsService';

await updateComplaintSentiment(complaintId, 'GREEN');
// This automatically recalculates company metrics
```

#### Resolve Complaint with Sentiment
```javascript
import { resolveComplaint } from '@/services/reputationMetricsService';

await resolveComplaint(complaintId, 'YELLOW');
// Marks as resolved AND sets sentiment
```

#### Auto-Mark Ignored Complaints
```javascript
import { autoMarkIgnoredComplaints } from '@/services/reputationMetricsService';

// Run as cron job or on-demand
const updatedIds = await autoMarkIgnoredComplaints(7); // 7 days threshold
console.log(`Marked ${updatedIds.length} complaints as ignored`);
```

---

## 🔢 Customer Karma Calculation

**Formula:**
```
Customer Karma = (
  (GREEN × 1.0) +
  (YELLOW × 0.5) +
  (ORANGE × 0.2) +
  (RED × 0.0) +
  (PURPLE × 0.0)
) / total_sentiments × 100
```

**Example:**
- 10 GREEN (You Nailed It!)
- 3 YELLOW (It's Meh…)
- 1 ORANGE (Uh Oh…)
- 1 RED (Disappointing)
- 0 PURPLE (Ignored)

```
Karma = ((10×1.0) + (3×0.5) + (1×0.2) + (1×0.0) + (0×0.0)) / 15 × 100
      = (10 + 1.5 + 0.2 + 0 + 0) / 15 × 100
      = 11.7 / 15 × 100
      = 78%
```

---

## 🏆 Reputation Seal Thresholds

| Seal | Karma | Resolution Rate | Ignored Rate | Min Complaints |
|------|-------|----------------|--------------|----------------|
| **Highly Recommended** | ≥ 80% | ≥ 70% | ≤ 10% | 5+ |
| **Recommended** | ≥ 60% | ≥ 50% | ≤ 20% | 5+ |
| **Needs Improvement** | ≥ 40% | ≥ 30% | any | 5+ |
| **Not Recommended** | < 40% | < 30% | any | 5+ |
| **Under Review** | any | any | any | < 5 |

---

## 🔄 Integration Points

### 1. Complaint Detail Page

**File:** `src/pages/ComplaintDetail.jsx`

Add sentiment selection when user marks complaint as resolved:

```jsx
import SentimentSelectionModal from '@/components/complaints/SentimentSelectionModal';

// Show modal after resolution
const [showSentimentModal, setShowSentimentModal] = useState(false);

// After user clicks "Mark as Resolved"
const handleResolve = () => {
  setShowSentimentModal(true);
};

<SentimentSelectionModal
  isOpen={showSentimentModal}
  onClose={() => setShowSentimentModal(false)}
  complaintId={complaint.id}
/>
```

### 2. Business Dashboard

**File:** `src/components/dashboard/CompanyDashboard.jsx`

Show Customer Karma and reputation seal:

```jsx
import { getCompanyMetrics } from '@/services/reputationMetricsService';
import ReputationSeal from '@/components/ui/ReputationSeal';

const [metrics, setMetrics] = useState(null);

useEffect(() => {
  const loadMetrics = async () => {
    const data = await getCompanyMetrics(companyId);
    setMetrics(data);
  };
  loadMetrics();
}, [companyId]);

// Display
<div className="text-4xl font-bold">{metrics?.customer_karma}%</div>
<ReputationSeal seal={metrics?.reputation_seal} variant="badge" />
```

### 3. Company Public Profile

**File:** `src/pages/CompanyProfile.jsx`

Show reputation seal and sentiment distribution:

```jsx
import { getCompanyMetrics } from '@/services/reputationMetricsService';
import ReputationSeal from '@/components/ui/ReputationSeal';
import SentimentIcon from '@/components/ui/SentimentIcon';

// Load and display metrics
<ReputationSeal seal={metrics?.reputation_seal} variant="full" />

// Show sentiment breakdown
<div className="grid grid-cols-5 gap-2">
  <div>
    <SentimentIcon sentiment="GREEN" size="md" />
    <span>{metrics?.count_green}</span>
  </div>
  {/* Repeat for other sentiments */}
</div>
```

---

## 🔧 Maintenance Tasks

### Daily Cron Job (Recommended)

Create a scheduled function to:
1. Auto-mark ignored complaints (7+ days old, no response)
2. Recalculate all company metrics

```javascript
import { 
  autoMarkIgnoredComplaints, 
  recalculateAllCompanyMetrics 
} from '@/services/reputationMetricsService';

async function dailyMaintenanceJob() {
  // Mark ignored complaints
  await autoMarkIgnoredComplaints(7);
  
  // Recalculate all metrics
  await recalculateAllCompanyMetrics();
}
```

### Manual Recalculation

If you need to recalculate metrics for all companies:

```javascript
import { recalculateAllCompanyMetrics } from '@/services/reputationMetricsService';

const count = await recalculateAllCompanyMetrics();
console.log(`Updated metrics for ${count} companies`);
```

---

## 📝 TODO / Next Steps

- [ ] Run SQL migrations in Supabase
- [ ] Integrate SentimentSelectionModal into complaint resolution flow
- [ ] Update Business Dashboard to show Customer Karma
- [ ] Update Company Profile to show reputation seal
- [ ] Set up daily cron job for auto-marking ignored complaints
- [ ] Add sentiment distribution charts to analytics
- [ ] Test the complete flow end-to-end

---

## 🎨 Design Notes

- All sentiment faces are hand-drawn with crayon/pastel texture
- Icons are located in `/public/sentiment-*.png`
- Colors match the sentiment types (green, yellow, orange, red, purple)
- Reputation seals use emoji icons (🟢 🟡 🟠 🔴 ⚪)

---

## 🐛 Troubleshooting

### Metrics not updating?
- Check if `company_id` exists on complaints
- Verify migrations ran successfully
- Try `recalculateCompanyMetrics(companyId)` manually

### Sentiment modal not showing?
- Check if complaint has `id` prop
- Verify Supabase client is configured
- Check browser console for errors

### Reputation seal shows "Under Review"?
- Company needs at least 5 complaints with sentiment
- Check if metrics are being calculated
- Verify thresholds in `calculateReputationSeal()`

---

## 📞 Support

For questions or issues, check:
- `src/constants/sentiment.js` - All calculation logic
- `src/services/reputationMetricsService.js` - API interactions
- Supabase logs - Database errors

---

**Last Updated:** November 22, 2024
**Version:** 1.0
