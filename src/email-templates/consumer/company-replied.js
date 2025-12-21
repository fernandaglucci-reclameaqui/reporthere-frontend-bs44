/**
 * Consumer Email: Company Has Replied
 * Sent when company responds to consumer's complaint
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox,
  getComplaintUrl
} from '../template-utils.js';

export function generateCompanyRepliedEmail(complaint, reply, consumerEmail) {
  const complaintUrl = getComplaintUrl(complaint.id, 'consumer');
  
  const content = `
    ${createTitle('💬 Company Has Responded to Your Complaint')}
    
    ${createParagraph(`Good news! ${complaint.company_name} has responded to your complaint (Case #${complaint.id}).`)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">Company's Response:</p>
      <p style="margin: 0; color: #4b5563; font-style: italic; padding: 12px; background-color: #f9fafb; border-radius: 4px;">
        "${reply.message_text}"
      </p>
    `, 'info')}
    
    ${createParagraph('<strong>What you can do now:</strong>')}
    
    <ul style="margin: 16px 0; padding-left: 20px; color: #4b5563;">
      <li><strong>View the full response</strong> and any attachments on your complaint page</li>
      <li><strong>Reply with additional information</strong> if needed</li>
      <li><strong>Mark as resolved</strong> if the company has addressed your concern</li>
      <li><strong>Continue the conversation</strong> until you're satisfied</li>
    </ul>
    
    ${createButton('View Full Response', complaintUrl)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #10b981;">💚 Help Other Consumers</p>
      <p style="margin: 0; color: #065f46;">
        After your issue is resolved, consider rating your experience. Your feedback helps other consumers make informed decisions and encourages companies to maintain high service standards.
      </p>
    `, 'info')}
    
    ${createParagraph('If the response doesn\'t adequately address your concern, you can continue the conversation by replying on your complaint page.')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `💬 ${complaint.company_name} Responded - Case #${complaint.id}`,
    content,
    consumerEmail
  );
}

export default generateCompanyRepliedEmail;
