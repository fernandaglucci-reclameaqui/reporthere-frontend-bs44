/**
 * Company Email: Reply Sent Confirmation
 * Sent immediately after company sends a reply
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox,
  getComplaintUrl,
  getCompanyDashboardUrl
} from '../template-utils.js';

export function generateReplyConfirmationEmail(complaint, reply, companyEmail, companyId) {
  const complaintUrl = getComplaintUrl(complaint.id, 'company');
  const dashboardUrl = getCompanyDashboardUrl(companyId);
  
  const content = `
    ${createTitle('✅ Reply Sent Successfully')}
    
    ${createParagraph(`Your response to Complaint #${complaint.id} has been sent to the customer.`)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">Your Reply:</p>
      <p style="margin: 0; color: #4b5563; font-style: italic;">
        "${reply.message_text.substring(0, 200)}${reply.message_text.length > 200 ? '...' : ''}"
      </p>
    `, 'info')}
    
    ${createParagraph('<strong>What happens next:</strong>')}
    
    <ul style="margin: 16px 0; padding-left: 20px; color: #4b5563;">
      <li>The customer will receive an email notification with your reply</li>
      <li>They can respond with additional information or questions</li>
      <li>You'll be notified if they reply</li>
      <li>Your response time has been recorded and will improve your metrics</li>
    </ul>
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #10b981;">💚 Great Job!</p>
      <p style="margin: 0; color: #065f46;">
        Quick, professional responses like this improve your Customer Karma score and build trust with potential customers viewing your profile.
      </p>
    `, 'info')}
    
    ${createButton('View Complaint Thread', complaintUrl)}
    
    ${createButton('Go to Dashboard', dashboardUrl)}
    
    ${createParagraph('Keep up the excellent customer service!')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `✅ Reply Sent - Complaint #${complaint.id}`,
    content,
    companyEmail
  );
}

export default generateReplyConfirmationEmail;
