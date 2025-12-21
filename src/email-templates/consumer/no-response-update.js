/**
 * Consumer Email: No Response Update
 * Sent periodically when company hasn't responded
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox,
  getComplaintUrl,
  formatDuration
} from '../template-utils.js';

export function generateNoResponseUpdateEmail(complaint, consumerEmail, daysSinceSubmission) {
  const complaintUrl = getComplaintUrl(complaint.id, 'consumer');
  
  const content = `
    ${createTitle('📊 Update on Your Complaint')}
    
    ${createParagraph(`We wanted to give you an update on your complaint against ${complaint.company_name} (Case #${complaint.id}).`)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #f59e0b;">⏳ Status Update</p>
      <p style="margin: 0 0 8px 0; color: #78350f;">
        It's been <strong>${daysSinceSubmission} days</strong> since you submitted your complaint, and the company has not yet responded.
      </p>
      <p style="margin: 0; color: #78350f;">
        While we've notified them multiple times, we cannot force a response. However, this silence is being recorded and affects their public reputation metrics.
      </p>
    `, 'warning')}
    
    ${createParagraph('<strong>How this impacts the company:</strong>')}
    
    <ul style="margin: 16px 0; padding-left: 20px; color: #4b5563;">
      <li><strong>SLA Met percentage</strong> decreases (shown publicly)</li>
      <li><strong>Average Response Time</strong> increases</li>
      <li><strong>Customer Karma score</strong> declines</li>
      <li><strong>Resolution Rate</strong> is negatively impacted</li>
    </ul>
    
    ${createParagraph('These metrics are visible on their public company profile, which helps other consumers make informed decisions.')}
    
    ${createButton('View Your Complaint', complaintUrl)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #6b7280;">ℹ️ What You Can Do</p>
      <p style="margin: 0; color: #4b5563;">
        • <strong>Wait for a response:</strong> We'll notify you immediately when they reply<br>
        • <strong>Try direct contact:</strong> You can also reach out to the company directly<br>
        • <strong>Share your experience:</strong> Update your complaint with any new information<br>
        • <strong>Seek alternatives:</strong> Consider other resolution channels if urgent
      </p>
    `, 'info')}
    
    ${createParagraph('We\'ll continue to monitor your complaint and notify you of any updates. The company\'s lack of response is publicly documented and impacts their reputation score.')}
    
    ${createParagraph('If you have questions or need assistance, visit our <a href="https://reporthere.org/help" style="color: #10b981;">Help Center</a>.')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `📊 Update: Complaint #${complaint.id} - ${daysSinceSubmission} Days Without Response`,
    content,
    consumerEmail
  );
}

export default generateNoResponseUpdateEmail;
