/**
 * Reputation Metrics Service
 * Handles calculation and storage of company reputation metrics
 */

import { supabase } from '../api/supabaseClient';
import { calculateReputationMetrics } from '../constants/sentiment';

/**
 * Recalculate and update reputation metrics for a specific company
 * 
 * @param {string} companyId - UUID of the company
 * @returns {Promise<Object>} - Updated metrics object
 */
export async function recalculateCompanyMetrics(companyId) {
  try {
    // Fetch all complaints for this company
    const { data: complaints, error: complaintsError } = await supabase
      .from('complaints')
      .select('*')
      .eq('company_id', companyId);

    if (complaintsError) {
      throw complaintsError;
    }

    // Calculate metrics
    const metrics = calculateReputationMetrics(complaints || []);

    // Upsert into company_reputation_metrics table
    const { data, error } = await supabase
      .from('company_reputation_metrics')
      .upsert({
        company_id: companyId,
        total_complaints: metrics.totalComplaints,
        resolved_complaints: metrics.resolvedComplaints,
        responded_complaints: metrics.respondedComplaints,
        ignored_complaints: metrics.ignoredComplaints,
        count_green: metrics.sentimentCounts.GREEN,
        count_yellow: metrics.sentimentCounts.YELLOW,
        count_orange: metrics.sentimentCounts.ORANGE,
        count_red: metrics.sentimentCounts.RED,
        count_purple: metrics.sentimentCounts.PURPLE,
        response_rate: metrics.responseRate,
        resolution_rate: metrics.resolutionRate,
        ignored_rate: metrics.ignoredRate,
        customer_karma: metrics.customerKarma,
        reputation_seal: metrics.reputationSeal,
        last_calculated_at: new Date().toISOString()
      }, {
        onConflict: 'company_id'
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error recalculating company metrics:', error);
    throw error;
  }
}

/**
 * Get reputation metrics for a company
 * 
 * @param {string} companyId - UUID of the company
 * @param {boolean} forceRecalculate - Force recalculation instead of using cached data
 * @returns {Promise<Object>} - Metrics object
 */
export async function getCompanyMetrics(companyId, forceRecalculate = false) {
  try {
    if (forceRecalculate) {
      return await recalculateCompanyMetrics(companyId);
    }

    // Try to get cached metrics first
    const { data, error } = await supabase
      .from('company_reputation_metrics')
      .select('*')
      .eq('company_id', companyId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw error;
    }

    // If no cached data exists, calculate it
    if (!data) {
      return await recalculateCompanyMetrics(companyId);
    }

    // If data is older than 1 hour, recalculate
    const lastCalculated = new Date(data.last_calculated_at);
    const hoursSinceCalculation = (Date.now() - lastCalculated.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceCalculation > 1) {
      return await recalculateCompanyMetrics(companyId);
    }

    return data;
  } catch (error) {
    console.error('Error getting company metrics:', error);
    throw error;
  }
}

/**
 * Update customer sentiment for a complaint
 * This will also trigger a metrics recalculation for the company
 * 
 * @param {string} complaintId - UUID of the complaint
 * @param {string} sentiment - Sentiment type (GREEN, YELLOW, ORANGE, RED, PURPLE)
 * @returns {Promise<Object>} - Updated complaint object
 */
export async function updateComplaintSentiment(complaintId, sentiment) {
  try {
    // Update the complaint with sentiment
    const { data: complaint, error: updateError } = await supabase
      .from('complaints')
      .update({
        customer_sentiment: sentiment
      })
      .eq('id', complaintId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Recalculate metrics for the company
    if (complaint.company_id) {
      await recalculateCompanyMetrics(complaint.company_id);
    }

    return complaint;
  } catch (error) {
    console.error('Error updating complaint sentiment:', error);
    throw error;
  }
}

/**
 * Mark complaint as resolved and optionally set sentiment
 * 
 * @param {string} complaintId - UUID of the complaint
 * @param {string} sentiment - Optional sentiment type
 * @returns {Promise<Object>} - Updated complaint object
 */
export async function resolveComplaint(complaintId, sentiment = null) {
  try {
    const updates = {
      status: 'resolved',
      resolved_at: new Date().toISOString()
    };

    if (sentiment) {
      updates.customer_sentiment = sentiment;
    }

    const { data: complaint, error: updateError } = await supabase
      .from('complaints')
      .update(updates)
      .eq('id', complaintId)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Recalculate metrics for the company
    if (complaint.company_id) {
      await recalculateCompanyMetrics(complaint.company_id);
    }

    return complaint;
  } catch (error) {
    console.error('Error resolving complaint:', error);
    throw error;
  }
}

/**
 * Auto-mark old unanswered complaints as PURPLE (Feeling Ignored)
 * Run this as a cron job or on-demand
 * 
 * @param {number} daysThreshold - Number of days without response to consider ignored (default: 7)
 * @returns {Promise<Array>} - Array of updated complaint IDs
 */
export async function autoMarkIgnoredComplaints(daysThreshold = 7) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysThreshold);

    // Find complaints that are old, unanswered, and don't have sentiment set
    const { data: complaints, error: fetchError } = await supabase
      .from('complaints')
      .select('id, company_id')
      .is('first_response_at', null)
      .is('customer_sentiment', null)
      .lt('created_at', cutoffDate.toISOString());

    if (fetchError) {
      throw fetchError;
    }

    if (!complaints || complaints.length === 0) {
      return [];
    }

    // Update all these complaints to PURPLE
    const complaintIds = complaints.map(c => c.id);
    const { error: updateError } = await supabase
      .from('complaints')
      .update({ customer_sentiment: 'PURPLE' })
      .in('id', complaintIds);

    if (updateError) {
      throw updateError;
    }

    // Recalculate metrics for affected companies
    const uniqueCompanyIds = [...new Set(complaints.map(c => c.company_id))];
    await Promise.all(
      uniqueCompanyIds.map(companyId => recalculateCompanyMetrics(companyId))
    );

    return complaintIds;
  } catch (error) {
    console.error('Error auto-marking ignored complaints:', error);
    throw error;
  }
}

/**
 * Recalculate metrics for all companies
 * Use this for a nightly cron job or manual refresh
 * 
 * @returns {Promise<number>} - Number of companies updated
 */
export async function recalculateAllCompanyMetrics() {
  try {
    // Get all company IDs that have complaints
    const { data: companies, error } = await supabase
      .from('complaints')
      .select('company_id')
      .not('company_id', 'is', null);

    if (error) {
      throw error;
    }

    // Get unique company IDs
    const uniqueCompanyIds = [...new Set(companies.map(c => c.company_id))];

    // Recalculate metrics for each company
    await Promise.all(
      uniqueCompanyIds.map(companyId => recalculateCompanyMetrics(companyId))
    );

    return uniqueCompanyIds.length;
  } catch (error) {
    console.error('Error recalculating all company metrics:', error);
    throw error;
  }
}
