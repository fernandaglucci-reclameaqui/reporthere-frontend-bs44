/**
 * Customer Sentiment System
 * These represent how the customer FELT after the interaction
 * NOT a judgment on the company (legal protection)
 */

export const SENTIMENT_TYPES = {
  GREEN: 'GREEN',
  YELLOW: 'YELLOW',
  ORANGE: 'ORANGE',
  RED: 'RED',
  PURPLE: 'PURPLE'
};

export const SENTIMENT_CONFIG = {
  [SENTIMENT_TYPES.GREEN]: {
    label: 'You Nailed It!',
    description: 'Positive experience',
    icon: '/sentiment-green-nailed-it.png',
    color: '#22c55e', // green
    weight: 1.0,
    value: 5
  },
  [SENTIMENT_TYPES.YELLOW]: {
    label: "It's Meh…",
    description: 'Neutral / okay',
    icon: '/sentiment-yellow-meh.png',
    color: '#eab308', // yellow
    weight: 0.5,
    value: 3
  },
  [SENTIMENT_TYPES.ORANGE]: {
    label: 'Uh Oh… Could Be Better',
    description: 'Could be better',
    icon: '/sentiment-orange-uhoh.png',
    color: '#f97316', // orange
    weight: 0.2,
    value: 2
  },
  [SENTIMENT_TYPES.RED]: {
    label: 'Pretty Disappointing',
    description: 'Negative experience',
    icon: '/sentiment-red-disappointing.png',
    color: '#ef4444', // red
    weight: 0.0,
    value: 1
  },
  [SENTIMENT_TYPES.PURPLE]: {
    label: 'Feeling Ignored',
    description: 'No response / unresolved',
    icon: '/sentiment-purple-ignored.png',
    color: '#a855f7', // purple
    weight: 0.0,
    value: 0
  }
};

/**
 * Company Reputation Seals
 * These are SYSTEM-GENERATED based on metrics
 * NOT chosen by users
 */

export const REPUTATION_SEAL_TYPES = {
  HIGHLY_RECOMMENDED: 'HIGHLY_RECOMMENDED',
  RECOMMENDED: 'RECOMMENDED',
  NEEDS_IMPROVEMENT: 'NEEDS_IMPROVEMENT',
  NOT_RECOMMENDED: 'NOT_RECOMMENDED',
  UNDER_REVIEW: 'UNDER_REVIEW'
};

export const REPUTATION_SEAL_CONFIG = {
  [REPUTATION_SEAL_TYPES.HIGHLY_RECOMMENDED]: {
    label: 'Highly Recommended',
    color: '#22c55e', // green
    icon: '🟢',
    description: 'Excellent customer care and resolution'
  },
  [REPUTATION_SEAL_TYPES.RECOMMENDED]: {
    label: 'Recommended',
    color: '#eab308', // yellow
    icon: '🟡',
    description: 'Good customer service track record'
  },
  [REPUTATION_SEAL_TYPES.NEEDS_IMPROVEMENT]: {
    label: 'Needs Improvement',
    color: '#f97316', // orange
    icon: '🟠',
    description: 'Some areas need attention'
  },
  [REPUTATION_SEAL_TYPES.NOT_RECOMMENDED]: {
    label: 'Not Recommended',
    color: '#ef4444', // red
    icon: '🔴',
    description: 'Significant customer service concerns'
  },
  [REPUTATION_SEAL_TYPES.UNDER_REVIEW]: {
    label: 'Under Review',
    color: '#9ca3af', // gray
    icon: '⚪',
    isDefault: true,
    description: 'New profile - building reputation'
  }
};

/**
 * Calculate Customer Karma score (0-100)
 * Based on weighted sentiment distribution
 * 
 * Formula:
 * - Green: 1.0 weight
 * - Yellow: 0.5 weight
 * - Orange: 0.2 weight
 * - Red: 0.0 weight
 * - Purple: 0.0 weight
 * 
 * @param {Object} sentimentCounts - { GREEN: n, YELLOW: n, ORANGE: n, RED: n, PURPLE: n }
 * @returns {number} - Customer Karma score (0-100)
 */
export function calculateCustomerKarma(sentimentCounts) {
  const green = sentimentCounts.GREEN || 0;
  const yellow = sentimentCounts.YELLOW || 0;
  const orange = sentimentCounts.ORANGE || 0;
  const red = sentimentCounts.RED || 0;
  const purple = sentimentCounts.PURPLE || 0;

  const total = green + yellow + orange + red + purple;
  
  if (total === 0) {
    return 0;
  }

  const weightedSum = (
    (green * 1.0) +
    (yellow * 0.5) +
    (orange * 0.2) +
    (red * 0.0) +
    (purple * 0.0)
  );

  const karma = (weightedSum / total) * 100;
  return Math.round(karma * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate reputation seal based on metrics
 * 
 * Thresholds:
 * - Under Review: < 5 total complaints
 * - Highly Recommended: karma ≥ 80, resolution ≥ 70%, ignored ≤ 10%
 * - Recommended: karma ≥ 60, resolution ≥ 50%, ignored ≤ 20%
 * - Needs Improvement: karma ≥ 40, resolution ≥ 30%
 * - Not Recommended: everything else
 * 
 * @param {Object} metrics - { customerKarma, totalComplaints, resolutionRate, ignoredRate }
 * @returns {string} - Reputation seal type
 */
export function calculateReputationSeal(metrics) {
  const {
    customerKarma = 0,
    totalComplaints = 0,
    resolutionRate = 0,
    ignoredRate = 0
  } = metrics;

  // Not enough data yet
  if (totalComplaints < 5) {
    return REPUTATION_SEAL_TYPES.UNDER_REVIEW;
  }

  // Highly Recommended
  if (customerKarma >= 80 && resolutionRate >= 0.7 && ignoredRate <= 0.1) {
    return REPUTATION_SEAL_TYPES.HIGHLY_RECOMMENDED;
  }

  // Recommended
  if (customerKarma >= 60 && resolutionRate >= 0.5 && ignoredRate <= 0.2) {
    return REPUTATION_SEAL_TYPES.RECOMMENDED;
  }

  // Needs Improvement
  if (customerKarma >= 40 && resolutionRate >= 0.3) {
    return REPUTATION_SEAL_TYPES.NEEDS_IMPROVEMENT;
  }

  // Not Recommended
  return REPUTATION_SEAL_TYPES.NOT_RECOMMENDED;
}

/**
 * Get sentiment configuration by type
 */
export function getSentimentConfig(sentimentType) {
  return SENTIMENT_CONFIG[sentimentType] || null;
}

/**
 * Get reputation seal configuration by type
 */
export function getReputationSealConfig(sealType) {
  return REPUTATION_SEAL_CONFIG[sealType] || REPUTATION_SEAL_CONFIG[REPUTATION_SEAL_TYPES.UNDER_REVIEW];
}

/**
 * Calculate all reputation metrics for a company
 * 
 * @param {Array} complaints - Array of complaint objects
 * @returns {Object} - Complete metrics object
 */
export function calculateReputationMetrics(complaints) {
  const totalComplaints = complaints.length;
  
  if (totalComplaints === 0) {
    return {
      totalComplaints: 0,
      resolvedComplaints: 0,
      respondedComplaints: 0,
      ignoredComplaints: 0,
      sentimentCounts: {
        GREEN: 0,
        YELLOW: 0,
        ORANGE: 0,
        RED: 0,
        PURPLE: 0
      },
      responseRate: 0,
      resolutionRate: 0,
      ignoredRate: 0,
      customerKarma: 0,
      reputationSeal: REPUTATION_SEAL_TYPES.UNDER_REVIEW
    };
  }

  // Count complaints by status
  const resolvedComplaints = complaints.filter(c => 
    c.resolved_at || ['resolved', 'closed'].includes(c.status)
  ).length;

  const respondedComplaints = complaints.filter(c => 
    c.first_response_at
  ).length;

  const ignoredComplaints = complaints.filter(c => {
    if (c.first_response_at) return false;
    const daysSinceCreated = (Date.now() - new Date(c.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreated > 7;
  }).length;

  // Count sentiments
  const sentimentCounts = {
    GREEN: 0,
    YELLOW: 0,
    ORANGE: 0,
    RED: 0,
    PURPLE: 0
  };

  complaints.forEach(c => {
    if (c.customer_sentiment && sentimentCounts.hasOwnProperty(c.customer_sentiment)) {
      sentimentCounts[c.customer_sentiment]++;
    }
  });

  // Calculate rates
  const responseRate = respondedComplaints / totalComplaints;
  const resolutionRate = resolvedComplaints / totalComplaints;
  const ignoredRate = ignoredComplaints / totalComplaints;

  // Calculate Customer Karma
  const customerKarma = calculateCustomerKarma(sentimentCounts);

  // Calculate reputation seal
  const reputationSeal = calculateReputationSeal({
    customerKarma,
    totalComplaints,
    resolutionRate,
    ignoredRate
  });

  return {
    totalComplaints,
    resolvedComplaints,
    respondedComplaints,
    ignoredComplaints,
    sentimentCounts,
    responseRate,
    resolutionRate,
    ignoredRate,
    customerKarma,
    reputationSeal
  };
}
