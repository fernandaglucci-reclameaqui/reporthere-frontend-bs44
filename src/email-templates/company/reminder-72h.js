/**
 * Company Email: 72-Hour Final Reminder
 * Sent 72 hours after complaint if still no response
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox,
  formatComplaintSummary,
  getComplaintUrl,
  formatDuration
} from '../template-utils.js';

export function generate72HourReminderEmail(complaint, companyEmail) {
  const complaintUrl = getComplaintUrl(complaint.id, 'company');
  const hoursSinceSubmission = Math.round((Date.now() - new Date(complaint.created_date).getTime()) / (1000 * 60 * 60));
  
  const content = `
    ${createTitle('🚨 Final Reminder: Complaint Requires Attention')}
    
    ${createParagraph(`A complaint submitted ${formatDuration(hoursSinceSubmission)} ago still has not received any response from your company.`)}
    
    ${formatComplaintSummary(complaint)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #ef4444;">🚨 Reputation Risk</p>
      <p style="margin: 0 0 8px 0; color: #7f1d1d;">
        <strong>72+ hours without response</strong> significantly damages your public reputation metrics:
      </p>
      <ul style="margin: 0 0 8px 0; padding-left: 20px; color: #7f1d1d;">
        <li><strong>SLA Met:</strong> This complaint now counts as a failed SLA</li>
        <li><strong>Avg Response Time:</strong> Increasing dramatically</li>
        <li><strong>Customer Karma:</strong> Declining</li>
        <li><strong>Resolution Rate:</strong> Decreasing</li>
      </ul>
      <p style="margin: 0; color: #7f1d1d;">
        <strong>Customers can see these metrics on your public profile.</strong> Prolonged silence signals poor customer service and may drive potential customers away.
      </p>
    `, 'error')}
    
    ${createParagraph('<strong>This is your final automated reminder.</strong> Please respond to this complaint as soon as possible.')}
    
    ${createButton('Respond Immediately', complaintUrl)}
    
    ${createParagraph('If you are unable to resolve the issue, at minimum:')}
    
    <ul style="margin: 16px 0; padding-left: 20px; color: #4b5563;">
      <li>Acknowledge the complaint</li>
      <li>Explain what steps you're taking</li>
      <li>Provide a timeline for resolution</li>
      <li>Show empathy and professionalism</li>
    </ul>
    
    ${createParagraph('Even a brief, professional response is better than silence. Customers value transparency and communication.')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `🚨 FINAL REMINDER: Complaint #${complaint.id} - 72 Hours Without Response`,
    content,
    companyEmail
  );
}

export default generate72HourReminderEmail;
