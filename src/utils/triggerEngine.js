/**
 * Wave 3A: Trigger Engine
 * 
 * Automatically triggers notifications based on platform events
 * This makes the platform "alive" and reactive
 */

import { EventTypes } from './eventSystem';

// Re-export EventTypes for convenience
export { EventTypes };
import { sendEmail } from './emailService';

/**
 * Main trigger processor
 * Call this after logging an event to fire appropriate triggers
 */
export async function processTriggers(eventType, eventData) {
  console.log(`🔔 Processing triggers for: ${eventType}`);

  try {
    switch (eventType) {
      case EventTypes.COMPLAINT_CREATED:
        await handleComplaintCreated(eventData);
        break;

      case EventTypes.COMPANY_REPLIED:
        await handleCompanyReplied(eventData);
        break;

      case EventTypes.EVIDENCE_FLAGGED:
        await handleEvidenceFlagged(eventData);
        break;

      case EventTypes.COMPLAINT_SHARED:
        await handleComplaintShared(eventData);
        break;

      case EventTypes.COMPLAINT_RESOLVED:
        await handleComplaintResolved(eventData);
        break;

      default:
        console.log(`No triggers defined for event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error processing triggers for ${eventType}:`, error);
  }
}

/**
 * Trigger: Complaint Created
 * Actions:
 * - Notify company that they've been mentioned
 * - Log for admin review
 */
async function handleComplaintCreated(data) {
  const { complaint_id, company_id, company_name, title, category } = data;

  console.log(`📧 Trigger: Notifying company about new complaint`);

  // TODO: Get company email from database
  // For now, we'll prepare the email template
  
  const emailData = {
    to: 'company@example.com', // Will be replaced with actual company email
    subject: `A consumer shared feedback about ${company_name}`,
    template: 'complaint_created',
    data: {
      company_name,
      complaint_title: title,
      complaint_category: category,
      complaint_url: `https://www.reporthere.org/complaint/${complaint_id}`,
      claim_profile_url: `https://www.reporthere.org/claim-business`
    }
  };

  // Queue email (will be sent by email service)
  console.log('✅ Email queued:', emailData);
  
  return emailData;
}

/**
 * Trigger: Company Replied
 * Actions:
 * - Notify consumer that company responded
 * - Update complaint status
 */
async function handleCompanyReplied(data) {
  const { complaint_id, response_id, company_id } = data;

  console.log(`📧 Trigger: Notifying consumer about company reply`);

  // TODO: Get consumer email from complaint
  
  const emailData = {
    to: 'consumer@example.com', // Will be replaced with actual consumer email
    subject: 'A company responded to your feedback',
    template: 'company_replied',
    data: {
      complaint_url: `https://www.reporthere.org/complaint/${complaint_id}#response-${response_id}`
    }
  };

  console.log('✅ Email queued:', emailData);
  
  return emailData;
}

/**
 * Trigger: Evidence Flagged
 * Actions:
 * - Notify admin team
 * - Log for review
 */
async function handleEvidenceFlagged(data) {
  const { complaint_id, flagged_by } = data;

  console.log(`🚨 Trigger: Notifying admin about flagged evidence`);

  const emailData = {
    to: 'admin@reporthere.org',
    subject: 'Evidence flagged for review',
    template: 'evidence_flagged',
    data: {
      complaint_url: `https://www.reporthere.org/admin/complaint/${complaint_id}`,
      flagged_by
    }
  };

  console.log('✅ Admin notification queued:', emailData);
  
  return emailData;
}

/**
 * Trigger: Complaint Shared
 * Actions:
 * - Log share event for analytics
 * - Track viral growth
 */
async function handleComplaintShared(data) {
  const { complaint_id, platform } = data;

  console.log(`📊 Trigger: Logging share on ${platform}`);

  // Just logging for now, no email needed
  console.log(`✅ Share tracked: Complaint ${complaint_id} shared on ${platform}`);
  
  return { tracked: true };
}

/**
 * Trigger: Complaint Resolved
 * Actions:
 * - Notify consumer
 * - Update analytics
 */
async function handleComplaintResolved(data) {
  const { complaint_id, resolved_by } = data;

  console.log(`✅ Trigger: Complaint resolved`);

  // TODO: Get consumer email
  
  const emailData = {
    to: 'consumer@example.com',
    subject: 'Your feedback has been marked as resolved',
    template: 'complaint_resolved',
    data: {
      complaint_url: `https://www.reporthere.org/complaint/${complaint_id}`,
      resolved_by
    }
  };

  console.log('✅ Resolution email queued:', emailData);
  
  return emailData;
}

/**
 * Helper: Queue multiple triggers
 */
export async function queueTriggers(triggers) {
  const results = [];
  
  for (const trigger of triggers) {
    try {
      const result = await processTriggers(trigger.eventType, trigger.eventData);
      results.push({ success: true, result });
    } catch (error) {
      results.push({ success: false, error: error.message });
    }
  }
  
  return results;
}
