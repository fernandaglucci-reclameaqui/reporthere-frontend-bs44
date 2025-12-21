/**
 * Consumer Email: Complaint Submitted Confirmation
 * Sent immediately after consumer submits a complaint
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox,
  getComplaintUrl
} from '../template-utils.js';

export function generateComplaintSubmittedEmail(complaint, consumerEmail) {
  const complaintUrl = getComplaintUrl(complaint.id, 'consumer');
  
  const content = `
    ${createTitle('✅ Your Complaint Has Been Submitted')}
    
    ${createParagraph(`Thank you for submitting your complaint. We've successfully received it and notified ${complaint.company_name}.`)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">📋 Your Case Details</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>Case ID:</strong> #${complaint.id}</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>Company:</strong> ${complaint.company_name}</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>Category:</strong> ${complaint.category || 'General'}</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>Status:</strong> Submitted</p>
      <p style="margin: 0; color: #4b5563;"><strong>Submitted:</strong> ${new Date(complaint.created_date).toLocaleString()}</p>
    `, 'info')}
    
    ${createParagraph('<strong>What happens next:</strong>')}
    
    <ol style="margin: 16px 0; padding-left: 20px; color: #4b5563;">
      <li>The company will receive an email notification about your complaint</li>
      <li>You'll receive an email when the company responds</li>
      <li>You can track your complaint status anytime using the link below</li>
      <li>If the company doesn't respond within 72 hours, we'll send you an update</li>
    </ol>
    
    ${createButton('View Your Complaint', complaintUrl)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #6b7280;">ℹ️ Important Disclaimer</p>
      <p style="margin: 0; color: #4b5563; font-size: 14px;">
        ReportHere is a transparent platform that connects consumers with companies. 
        <strong>We do not verify, validate, or endorse any complaint or claim.</strong> 
        All content is user-generated. Companies are responsible for responding to and resolving complaints directly with customers.
      </p>
    `, 'info')}
    
    ${createParagraph('We\'re here to facilitate transparent communication between you and the company. Response times and resolution quality are publicly visible on company profiles, encouraging accountability.')}
    
    ${createParagraph('If you have questions, visit our <a href="https://reporthere.org/help" style="color: #10b981;">Help Center</a> or reply to this email.')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `✅ Complaint Submitted - Case #${complaint.id}`,
    content,
    consumerEmail
  );
}

export default generateComplaintSubmittedEmail;
