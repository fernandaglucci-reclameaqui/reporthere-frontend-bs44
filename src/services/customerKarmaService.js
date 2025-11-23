import { SENTIMENT_WEIGHTS, calculateCustomerKarma } from '@/constants/sentiment';

/**
 * Calculate Customer Karma metrics from an array of complaints
 * @param {Array} complaints - Array of complaint objects with customer_sentiment field
 * @returns {Object} Karma data for display
 */
export function calculateKarmaMetrics(complaints) {
  // Count sentiments
  const sentimentCounts = {
    green: 0,
    yellow: 0,
    orange: 0,
    red: 0,
    purple: 0
  };

  // Only count complaints that have sentiment
  const complaintsWithSentiment = complaints.filter(c => c.customer_sentiment);
  
  complaintsWithSentiment.forEach(complaint => {
    const sentiment = complaint.customer_sentiment.toLowerCase();
    if (sentimentCounts.hasOwnProperty(sentiment)) {
      sentimentCounts[sentiment]++;
    }
  });

  const total = complaintsWithSentiment.length;

  // Calculate percentages
  const sentimentPercentages = {
    green: total > 0 ? Math.round((sentimentCounts.green / total) * 100) : 0,
    yellow: total > 0 ? Math.round((sentimentCounts.yellow / total) * 100) : 0,
    orange: total > 0 ? Math.round((sentimentCounts.orange / total) * 100) : 0,
    red: total > 0 ? Math.round((sentimentCounts.red / total) * 100) : 0,
    purple: total > 0 ? Math.round((sentimentCounts.purple / total) * 100) : 0
  };

  // Calculate Customer Karma score (0-100)
  const customerKarma = calculateCustomerKarma(sentimentCounts);

  // Determine reputation seal based on karma score
  let reputationSeal = 'UNDER_REVIEW';
  if (total >= 5) {
    if (customerKarma >= 80) {
      reputationSeal = 'HIGHLY_RECOMMENDED';
    } else if (customerKarma >= 60) {
      reputationSeal = 'RECOMMENDED';
    } else if (customerKarma >= 40) {
      reputationSeal = 'NEEDS_IMPROVEMENT';
    } else {
      reputationSeal = 'NOT_RECOMMENDED';
    }
  }

  return {
    customerKarma: Math.round(customerKarma),
    sentimentCounts,
    sentimentPercentages,
    total,
    reputationSeal
  };
}

/**
 * Calculate response and resolution metrics
 * @param {Array} complaints - Array of complaint objects
 * @returns {Object} Response metrics
 */
export function calculateResponseMetrics(complaints) {
  const total = complaints.length;
  
  if (total === 0) {
    return {
      responseRate: 0,
      resolutionRate: 0,
      ignoredRate: 0,
      avgResponseTime: 0
    };
  }

  const responded = complaints.filter(c => c.first_response_at || c.business_response).length;
  const resolved = complaints.filter(c => c.resolved_at || c.status === 'resolved').length;
  const ignored = complaints.filter(c => c.customer_sentiment === 'PURPLE').length;

  const responseRate = Math.round((responded / total) * 100);
  const resolutionRate = Math.round((resolved / total) * 100);
  const ignoredRate = Math.round((ignored / total) * 100);

  // Calculate average response time in hours
  const responseTimes = complaints
    .filter(c => c.first_response_at && c.created_date)
    .map(c => {
      const created = new Date(c.created_date);
      const responded = new Date(c.first_response_at);
      return (responded - created) / (1000 * 60 * 60); // Convert to hours
    });

  const avgResponseTime = responseTimes.length > 0
    ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
    : 0;

  return {
    responseRate,
    resolutionRate,
    ignoredRate,
    avgResponseTime,
    totalComplaints: total,
    respondedCount: responded,
    resolvedCount: resolved,
    ignoredCount: ignored
  };
}
