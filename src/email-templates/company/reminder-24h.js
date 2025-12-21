/**
 * Company Email: 24-Hour Reminder
 * Sent 24 hours after complaint if no response
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

export function generate24HourReminderEmail(complaint, companyEmail) {
  const complaintUrl = getComplaintUrl(complaint.id, 'company');
  const hoursSinceSubmission = Math.round((Date.now() - new Date(complaint.created_date).getTime()) / (1000 * 60 * 60));
  
  const content = `
    ${createTitle('⏰ Reminder: Unanswered Complaint')}
    
    ${createParagraph(`A complaint submitted ${formatDuration(hoursSinceSubmission)} ago still hasn't received a response from your team.`)}
    
    ${formatComplaintSummary(complaint)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #f59e0b;">⚠️ SLA Impact</p>
      <p style="margin: 0; color: #78350f;">
        Your 24-hour SLA window has passed. Delayed responses negatively impact your:
      </p>
      <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #78350f;">
        <li><strong>SLA Met percentage</strong> (shown on your public profile)</li>
        <li><strong>Average Response Time</strong> metric</li>
        <li><strong>Customer Karma score</strong></li>
      </ul>
      <p style="margin: 8px 0 0 0; color: #78350f;">
        Respond now to minimize the impact and show customers you care.
      </p>
    `, 'warning')}
    
    ${createParagraph('Click below to respond:')}
    
    ${createButton('Respond Now', complaintUrl)}
    
    ${createParagraph('Remember: Even if you cannot fully resolve the issue yet, acknowledging the complaint and providing a timeline shows professionalism and improves customer trust.')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `⏰ REMINDER: Complaint #${complaint.id} - 24 Hours Without Response`,
    content,
    companyEmail
  );
}

export default generate24HourReminderEmail;
