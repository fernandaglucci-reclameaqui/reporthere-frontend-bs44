/**
 * Company Email: New Complaint Received
 * Sent immediately when a new complaint is submitted
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox,
  formatComplaintSummary,
  getComplaintUrl
} from '../template-utils.js';

export function generateNewComplaintEmail(complaint, companyEmail) {
  const complaintUrl = getComplaintUrl(complaint.id, 'company');
  
  const content = `
    ${createTitle('New Complaint Received')}
    
    ${createParagraph('A new complaint has been submitted about your company. Quick responses improve your Customer Karma score and SLA compliance.')}
    
    ${formatComplaintSummary(complaint)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">⏱️ Response Time Matters</p>
      <p style="margin: 0; color: #4b5563;">
        Responding within <strong>24 hours</strong> improves your SLA Met percentage and Customer Karma score. 
        Fast, professional responses build trust and improve your public reputation.
      </p>
    `, 'info')}
    
    ${createParagraph('Click the button below to view the full complaint and respond:')}
    
    ${createButton('View & Respond to Complaint', complaintUrl)}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `New Complaint #${complaint.id} - Action Required`,
    content,
    companyEmail
  );
}

export default generateNewComplaintEmail;
