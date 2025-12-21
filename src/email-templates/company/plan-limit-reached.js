/**
 * Company Email: Plan Limit Reached
 * Sent when company hits their plan limits
 */

import {
  generateEmail,
  createTitle,
  createParagraph,
  createButton,
  createInfoBox
} from '../template-utils.js';

export function generatePlanLimitEmail(companyName, limitType, currentPlan, companyEmail) {
  const upgradeUrl = 'https://reporthere.org/upgrade';
  
  const limitMessages = {
    complaints: {
      title: 'Monthly Complaint Limit Reached',
      message: `Your ${currentPlan} plan includes handling up to a certain number of complaints per month. You've reached this limit.`,
      impact: 'New complaints can still be submitted, but you won\'t be able to respond until you upgrade or your limit resets next month.'
    },
    responses: {
      title: 'Response Limit Reached',
      message: `Your ${currentPlan} plan includes a limited number of responses per month. You've used all available responses.`,
      impact: 'You can still view complaints, but cannot send new responses until you upgrade.'
    },
    export: {
      title: 'Export Feature Locked',
      message: `Data export is a premium feature not included in your ${currentPlan} plan.`,
      impact: 'Upgrade to access CSV exports of your complaints, responses, and analytics data.'
    }
  };
  
  const limit = limitMessages[limitType] || limitMessages.complaints;
  
  const content = `
    ${createTitle(`📊 ${limit.title}`)}
    
    ${createParagraph(`Hi ${companyName},`)}
    
    ${createParagraph(limit.message)}
    
    ${createInfoBox(`
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #f59e0b;">⚠️ Impact on Your Account</p>
      <p style="margin: 0; color: #78350f;">
        ${limit.impact}
      </p>
    `, 'warning')}
    
    ${createParagraph('<strong>Why upgrade?</strong>')}
    
    <ul style="margin: 16px 0; padding-left: 20px; color: #4b5563;">
      <li><strong>Unlimited responses</strong> - Never miss a customer interaction</li>
      <li><strong>Priority support</strong> - Get help when you need it</li>
      <li><strong>Advanced analytics</strong> - Deep insights into your performance</li>
      <li><strong>Data export</strong> - Download your data anytime</li>
      <li><strong>Custom branding</strong> - Make your profile stand out</li>
    </ul>
    
    ${createButton('Upgrade Now', upgradeUrl)}
    
    ${createParagraph('Questions about plans and pricing? <a href="https://reporthere.org/pricing" style="color: #10b981;">View our pricing page</a> or <a href="https://reporthere.org/contact" style="color: #10b981;">contact our team</a>.')}
    
    ${createParagraph('Best regards,<br>The ReportHere Team')}
  `;
  
  return generateEmail(
    `📊 ${limit.title} - Upgrade to Continue`,
    content,
    companyEmail
  );
}

export default generatePlanLimitEmail;
