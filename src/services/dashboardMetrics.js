/**
 * Dashboard Metrics Service - Phase 1
 * Calculates core metrics for ReportHere Dashboard V2
 */

/**
 * Calculate Loved Score™ based on customer satisfaction ratings
 * @param {Array} complaints - Array of complaint objects with satisfaction_rating
 * @returns {Object} - { happy: %, neutral: %, sad: %, isLovedCompany: boolean }
 */
export function calculateLovedScore(complaints) {
  if (!complaints || complaints.length === 0) {
    return { happy: 0, neutral: 0, sad: 0, isLovedCompany: false, total: 0 };
  }

  // Filter complaints that have satisfaction ratings (only resolved complaints)
  const ratedComplaints = complaints.filter(c => 
    c.satisfaction_rating && 
    ['happy', 'neutral', 'sad'].includes(c.satisfaction_rating)
  );

  if (ratedComplaints.length === 0) {
    return { happy: 0, neutral: 0, sad: 0, isLovedCompany: false, total: 0 };
  }

  const total = ratedComplaints.length;
  const happyCount = ratedComplaints.filter(c => c.satisfaction_rating === 'happy').length;
  const neutralCount = ratedComplaints.filter(c => c.satisfaction_rating === 'neutral').length;
  const sadCount = ratedComplaints.filter(c => c.satisfaction_rating === 'sad').length;

  const happyPercent = Math.round((happyCount / total) * 100);
  const neutralPercent = Math.round((neutralCount / total) * 100);
  const sadPercent = Math.round((sadCount / total) * 100);

  // Loved Company badge: > 85% happy ratings
  const isLovedCompany = happyPercent >= 85;

  return {
    happy: happyPercent,
    neutral: neutralPercent,
    sad: sadPercent,
    isLovedCompany,
    total: total,
    counts: {
      happy: happyCount,
      neutral: neutralCount,
      sad: sadCount
    }
  };
}

/**
 * Calculate Resolution Rate
 * @param {Array} complaints - Array of complaint objects
 * @returns {Object} - { rate: %, resolved: number, total: number }
 */
export function calculateResolutionRate(complaints) {
  if (!complaints || complaints.length === 0) {
    return { rate: 0, resolved: 0, total: 0 };
  }

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const rate = Math.round((resolved / total) * 100);

  return { rate, resolved, total };
}

/**
 * Calculate Average Response Time
 * @param {Array} complaints - Array of complaint objects
 * @returns {Object} - { hours: number, formatted: string }
 */
export function calculateAverageResponseTime(complaints) {
  if (!complaints || complaints.length === 0) {
    return { hours: 0, formatted: '0h' };
  }

  // Filter complaints that have both created_at and business_response_date
  const respondedComplaints = complaints.filter(c => 
    c.created_at && 
    c.business_response_date
  );

  if (respondedComplaints.length === 0) {
    return { hours: 0, formatted: '0h' };
  }

  // Calculate time differences in hours
  const totalHours = respondedComplaints.reduce((sum, c) => {
    const created = new Date(c.created_at);
    const responded = new Date(c.business_response_date);
    const diffMs = responded - created;
    const diffHours = diffMs / (1000 * 60 * 60);
    return sum + diffHours;
  }, 0);

  const avgHours = totalHours / respondedComplaints.length;

  // Format for display
  let formatted;
  if (avgHours < 1) {
    formatted = `${Math.round(avgHours * 60)}m`;
  } else if (avgHours < 24) {
    formatted = `${Math.round(avgHours)}h`;
  } else {
    const days = Math.floor(avgHours / 24);
    const hours = Math.round(avgHours % 24);
    formatted = hours > 0 ? `${days}d ${hours}h` : `${days}d`;
  }

  return {
    hours: Math.round(avgHours * 10) / 10, // Round to 1 decimal
    formatted
  };
}

/**
 * Calculate all core metrics at once
 * @param {Array} complaints - Array of complaint objects
 * @returns {Object} - All metrics combined
 */
export function calculateCoreMetrics(complaints) {
  const lovedScore = calculateLovedScore(complaints);
  const resolutionRate = calculateResolutionRate(complaints);
  const responseTime = calculateAverageResponseTime(complaints);

  return {
    lovedScore,
    resolutionRate,
    responseTime,
    totalComplaints: complaints?.length || 0
  };
}

/**
 * Get reputation snapshot data for display
 * @param {Object} metrics - Core metrics object
 * @returns {Array} - Array of snapshot items
 */
export function getReputationSnapshot(metrics) {
  const { lovedScore, resolutionRate, responseTime } = metrics;

  return [
    {
      label: 'Loved Score™',
      value: `${lovedScore.happy}%`,
      sub: `${lovedScore.total} ratings`,
      icon: '💚',
      badge: lovedScore.isLovedCompany ? 'Loved Company' : null
    },
    {
      label: 'Resolution Rate',
      value: `${resolutionRate.rate}%`,
      sub: `${resolutionRate.resolved} of ${resolutionRate.total} resolved`,
      icon: '✅'
    },
    {
      label: 'Avg Response Time',
      value: responseTime.formatted,
      sub: `${responseTime.hours} hours average`,
      icon: '⚡'
    }
  ];
}

/**
 * Calculate sentiment distribution for charts
 * @param {Array} complaints - Array of complaint objects
 * @returns {Array} - Sentiment data for visualization
 */
export function calculateSentimentDistribution(complaints) {
  if (!complaints || complaints.length === 0) {
    return [];
  }

  const ratedComplaints = complaints.filter(c => c.satisfaction_rating);
  
  const distribution = {
    happy: ratedComplaints.filter(c => c.satisfaction_rating === 'happy').length,
    neutral: ratedComplaints.filter(c => c.satisfaction_rating === 'neutral').length,
    sad: ratedComplaints.filter(c => c.satisfaction_rating === 'sad').length
  };

  return [
    { name: '😊 Happy', value: distribution.happy, color: '#22c55e' },
    { name: '😐 Neutral', value: distribution.neutral, color: '#6b7280' },
    { name: '😞 Sad', value: distribution.sad, color: '#ef4444' }
  ];
}
