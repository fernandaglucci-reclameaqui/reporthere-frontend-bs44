/**
 * Wave 3A: Event System
 * 
 * Central event tracking and triggering system for ReportHere
 * Logs all important platform events and triggers automated actions
 */

import { supabase } from '@/api/supabaseClient';

// Event types
export const EventTypes = {
  COMPLAINT_CREATED: 'complaint_created',
  COMPANY_REPLIED: 'company_replied',
  EVIDENCE_FLAGGED: 'evidence_flagged',
  COMPLAINT_SHARED: 'complaint_shared',
  COMPLAINT_RESOLVED: 'complaint_resolved',
  COMPLAINT_UPDATED: 'complaint_updated',
  USER_REGISTERED: 'user_registered',
  COMPANY_CLAIMED: 'company_claimed'
};

/**
 * Log an event to the database
 * @param {string} eventType - Type of event from EventTypes
 * @param {object} data - Event data
 * @param {string} userId - Optional user ID who triggered the event
 */
export async function logEvent(eventType, data, userId = null) {
  try {
    const event = {
      event_type: eventType,
      event_data: data,
      user_id: userId,
      created_at: new Date().toISOString()
    };

    const { data: result, error } = await supabase
      .from('platform_events')
      .insert([event])
      .select()
      .single();

    if (error) {
      console.error('Error logging event:', error);
      return null;
    }

    console.log(`✅ Event logged: ${eventType}`, result);
    return result;
  } catch (error) {
    console.error('Error in logEvent:', error);
    return null;
  }
}

/**
 * Get recent events for admin dashboard
 * @param {number} limit - Number of events to retrieve
 * @param {string} eventType - Optional filter by event type
 */
export async function getRecentEvents(limit = 50, eventType = null) {
  try {
    let query = supabase
      .from('platform_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (eventType) {
      query = query.eq('event_type', eventType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getRecentEvents:', error);
    return [];
  }
}

/**
 * Get event statistics for admin dashboard
 */
export async function getEventStats(days = 7) {
  try {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const { data, error } = await supabase
      .from('platform_events')
      .select('event_type, created_at')
      .gte('created_at', since.toISOString());

    if (error) {
      console.error('Error fetching event stats:', error);
      return {};
    }

    // Group by event type
    const stats = {};
    data.forEach(event => {
      if (!stats[event.event_type]) {
        stats[event.event_type] = 0;
      }
      stats[event.event_type]++;
    });

    return stats;
  } catch (error) {
    console.error('Error in getEventStats:', error);
    return {};
  }
}

/**
 * Helper functions for specific events
 */

export async function logComplaintCreated(complaintId, complaintData, userId) {
  return logEvent(EventTypes.COMPLAINT_CREATED, {
    complaint_id: complaintId,
    company_id: complaintData.company_id,
    company_name: complaintData.company_name,
    title: complaintData.title,
    category: complaintData.category
  }, userId);
}

export async function logCompanyReplied(complaintId, responseId, companyId, userId) {
  return logEvent(EventTypes.COMPANY_REPLIED, {
    complaint_id: complaintId,
    response_id: responseId,
    company_id: companyId
  }, userId);
}

export async function logEvidenceFlagged(complaintId, adminId) {
  return logEvent(EventTypes.EVIDENCE_FLAGGED, {
    complaint_id: complaintId,
    flagged_by: adminId
  }, adminId);
}

export async function logComplaintShared(complaintId, platform, userId = null) {
  return logEvent(EventTypes.COMPLAINT_SHARED, {
    complaint_id: complaintId,
    platform: platform // 'twitter', 'facebook', 'linkedin', 'copy'
  }, userId);
}

export async function logComplaintResolved(complaintId, resolvedBy, userId) {
  return logEvent(EventTypes.COMPLAINT_RESOLVED, {
    complaint_id: complaintId,
    resolved_by: resolvedBy
  }, userId);
}
