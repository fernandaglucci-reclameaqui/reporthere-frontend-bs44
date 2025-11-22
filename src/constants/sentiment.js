/**
 * Customer Sentiment System
 * These represent how the customer FELT after the interaction
 * NOT a judgment on the company (legal protection)
 */

export const SENTIMENT_TYPES = {
  GREEN_NAILED_IT: 'green_nailed_it',
  YELLOW_MEH: 'yellow_meh',
  ORANGE_UHOH: 'orange_uhoh',
  RED_DISAPPOINTING: 'red_disappointing',
  PURPLE_IGNORED: 'purple_ignored'
};

export const SENTIMENT_CONFIG = {
  [SENTIMENT_TYPES.GREEN_NAILED_IT]: {
    label: 'You Nailed It!',
    description: 'Positive experience',
    icon: '/sentiment-green-nailed-it.png',
    color: '#22c55e', // green
    value: 5
  },
  [SENTIMENT_TYPES.YELLOW_MEH]: {
    label: "It's Meh…",
    description: 'Neutral / okay',
    icon: '/sentiment-yellow-meh.png',
    color: '#eab308', // yellow
    value: 3
  },
  [SENTIMENT_TYPES.ORANGE_UHOH]: {
    label: 'Uh Oh… Could Be Better',
    description: 'Could be better',
    icon: '/sentiment-orange-uhoh.png',
    color: '#f97316', // orange
    value: 2
  },
  [SENTIMENT_TYPES.RED_DISAPPOINTING]: {
    label: 'Pretty Disappointing',
    description: 'Negative experience',
    icon: '/sentiment-red-disappointing.png',
    color: '#ef4444', // red
    value: 1
  },
  [SENTIMENT_TYPES.PURPLE_IGNORED]: {
    label: 'Feeling Ignored',
    description: 'No response / unresolved',
    icon: '/sentiment-purple-ignored.png',
    color: '#a855f7', // purple
    value: 0
  }
};

/**
 * Company Reputation Seals
 * These are SYSTEM-GENERATED based on metrics
 * NOT chosen by users
 */

export const REPUTATION_SEAL_TYPES = {
  HIGHLY_RECOMMENDED: 'highly_recommended',
  RECOMMENDED: 'recommended',
  NEEDS_IMPROVEMENT: 'needs_improvement',
  NOT_RECOMMENDED: 'not_recommended',
  UNDER_REVIEW: 'under_review'
};

export const REPUTATION_SEAL_CONFIG = {
  [REPUTATION_SEAL_TYPES.HIGHLY_RECOMMENDED]: {
    label: 'Highly Recommended',
    color: '#22c55e', // green
    icon: '🟢'
  },
  [REPUTATION_SEAL_TYPES.RECOMMENDED]: {
    label: 'Recommended',
    color: '#eab308', // yellow
    icon: '🟡'
  },
  [REPUTATION_SEAL_TYPES.NEEDS_IMPROVEMENT]: {
    label: 'Needs Improvement',
    color: '#f97316', // orange
    icon: '🟠'
  },
  [REPUTATION_SEAL_TYPES.NOT_RECOMMENDED]: {
    label: 'Not Recommended',
    color: '#ef4444', // red
    icon: '🔴'
  },
  [REPUTATION_SEAL_TYPES.UNDER_REVIEW]: {
    label: 'Under Review',
    color: '#9ca3af', // gray
    icon: '⚪',
    isDefault: true
  }
};

/**
 * Calculate reputation seal based on sentiment distribution
 * TODO: Implement logic when Fe provides the calculation rules
 * 
 * @param {Object} sentimentCounts - Object with counts for each sentiment type
 * @returns {string} - Reputation seal type
 */
export function calculateReputationSeal(sentimentCounts) {
  // Placeholder - will be implemented with Fe's logic
  // For now, return UNDER_REVIEW as default
  return REPUTATION_SEAL_TYPES.UNDER_REVIEW;
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
