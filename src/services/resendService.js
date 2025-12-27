/**
 * Resend Email Service
 * Professional email sending with beautiful templates
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_RYXHNjVn_3zzfx9Ryh3orpkebZiEAyTdg';
const FROM_EMAIL = 'notifications@reporthere.org';
const REPLY_TO_EMAIL = 'hello@reporthere.org';

/**
 * Send email via Resend API
 */
export async function sendEmail({ to, subject, html, replyTo = REPLY_TO_EMAIL }) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API Error:', error);
      throw new Error(`Failed to send email: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('Email sent successfully:', data.id);
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Send welcome email after signup
 */
export async function sendWelcomeEmail(userEmail, userName) {
  const subject = '🎉 Welcome to ReportHere!';
  const html = getWelcomeEmailTemplate(userName);
  
  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

/**
 * Send email verification
 */
export async function sendVerificationEmail(userEmail, verificationLink) {
  const subject = '📧 Verify your ReportHere account';
  const html = getVerificationEmailTemplate(verificationLink);
  
  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(userEmail, resetLink) {
  const subject = '🔐 Reset your ReportHere password';
  const html = getPasswordResetEmailTemplate(resetLink);
  
  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

/**
 * Send complaint confirmation to user
 */
export async function sendComplaintConfirmationEmail(userEmail, complaintData) {
  const subject = `✅ Complaint #${complaintData.id} submitted successfully`;
  const html = getComplaintConfirmationTemplate(complaintData);
  
  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

/**
 * Send complaint notification to company
 */
export async function sendCompanyComplaintNotification(companyEmail, complaintData) {
  const subject = `🔔 New complaint received for ${complaintData.companyName}`;
  const html = getCompanyNotificationTemplate(complaintData);
  
  return sendEmail({
    to: companyEmail,
    subject,
    html,
  });
}

/**
 * Send complaint status update
 */
export async function sendStatusUpdateEmail(userEmail, complaintData, newStatus) {
  const subject = `📬 Update on your complaint #${complaintData.id}`;
  const html = getStatusUpdateTemplate(complaintData, newStatus);
  
  return sendEmail({
    to: userEmail,
    subject,
    html,
  });
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

/**
 * Base email template with ReportHere branding
 */
function getBaseTemplate(content) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ReportHere</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f3f4f6;
      color: #1f2937;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      text-decoration: none;
    }
    .content {
      padding: 40px 30px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #10b981;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #059669;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
    .footer a {
      color: #10b981;
      text-decoration: none;
    }
    h1 {
      color: #111827;
      font-size: 24px;
      margin: 0 0 20px 0;
    }
    p {
      line-height: 1.6;
      margin: 0 0 16px 0;
      color: #374151;
    }
    .highlight {
      background-color: #d1fae5;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #10b981;
      margin: 20px 0;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 30px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="https://reporthere.org" class="logo">ReportHere</a>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p><strong>ReportHere</strong> - Empowering consumers, improving businesses</p>
      <p>
        <a href="https://reporthere.org">Home</a> • 
        <a href="https://reporthere.org/help">Help Center</a> • 
        <a href="https://reporthere.org/contact">Contact Us</a>
      </p>
      <p style="margin-top: 20px; font-size: 12px;">
        © ${new Date().getFullYear()} ReportHere. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Welcome email template
 */
function getWelcomeEmailTemplate(userName) {
  const content = `
    <h1>🎉 Welcome to ReportHere, ${userName}!</h1>
    
    <p>Thank you for joining ReportHere – the platform that gives consumers a voice and helps businesses improve.</p>
    
    <div class="highlight">
      <p style="margin: 0;"><strong>What you can do now:</strong></p>
      <ul style="margin: 10px 0 0 0; padding-left: 20px;">
        <li>File complaints about companies</li>
        <li>Track your complaint status</li>
        <li>See how companies respond</li>
        <li>Help others make informed decisions</li>
      </ul>
    </div>
    
    <p>Ready to get started?</p>
    
    <a href="https://reporthere.org/filecomplaint" class="button">File Your First Complaint</a>
    
    <div class="divider"></div>
    
    <p><strong>Need help?</strong> Our support team is here for you at <a href="mailto:hello@reporthere.org">hello@reporthere.org</a></p>
  `;
  
  return getBaseTemplate(content);
}

/**
 * Email verification template
 */
function getVerificationEmailTemplate(verificationLink) {
  const content = `
    <h1>📧 Verify your email address</h1>
    
    <p>Thanks for signing up! Please verify your email address to activate your ReportHere account.</p>
    
    <a href="${verificationLink}" class="button">Verify Email Address</a>
    
    <div class="highlight">
      <p style="margin: 0;"><strong>⚠️ Security tip:</strong> This link expires in 24 hours.</p>
    </div>
    
    <p>If you didn't create a ReportHere account, you can safely ignore this email.</p>
    
    <div class="divider"></div>
    
    <p style="font-size: 14px; color: #6b7280;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${verificationLink}" style="color: #10b981; word-break: break-all;">${verificationLink}</a>
    </p>
  `;
  
  return getBaseTemplate(content);
}

/**
 * Password reset template
 */
function getPasswordResetEmailTemplate(resetLink) {
  const content = `
    <h1>🔐 Reset your password</h1>
    
    <p>We received a request to reset your ReportHere password.</p>
    
    <a href="${resetLink}" class="button">Reset Password</a>
    
    <div class="highlight">
      <p style="margin: 0;"><strong>⚠️ Security tip:</strong> This link expires in 1 hour.</p>
    </div>
    
    <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
    
    <div class="divider"></div>
    
    <p style="font-size: 14px; color: #6b7280;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${resetLink}" style="color: #10b981; word-break: break-all;">${resetLink}</a>
    </p>
  `;
  
  return getBaseTemplate(content);
}

/**
 * Complaint confirmation template
 */
function getComplaintConfirmationTemplate(complaintData) {
  const content = `
    <h1>✅ Complaint submitted successfully!</h1>
    
    <p>Hi ${complaintData.userName || 'there'},</p>
    
    <p>Your complaint against <strong>${complaintData.companyName}</strong> has been submitted and is now public on ReportHere.</p>
    
    <div class="highlight">
      <p style="margin: 0 0 10px 0;"><strong>Complaint Details:</strong></p>
      <p style="margin: 5px 0;"><strong>ID:</strong> #${complaintData.id}</p>
      <p style="margin: 5px 0;"><strong>Title:</strong> ${complaintData.title}</p>
      <p style="margin: 5px 0;"><strong>Category:</strong> ${complaintData.category || 'General'}</p>
      <p style="margin: 5px 0;"><strong>Status:</strong> Open</p>
    </div>
    
    <p>The company has been notified and can respond to your complaint publicly.</p>
    
    <a href="https://reporthere.org/complaint/${complaintData.id}" class="button">View Your Complaint</a>
    
    <div class="divider"></div>
    
    <p><strong>What happens next?</strong></p>
    <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
      <li>The company can respond to your complaint</li>
      <li>You'll receive email updates on any status changes</li>
      <li>Other users can see your complaint and the company's response</li>
      <li>You can update your complaint or mark it as resolved</li>
    </ul>
    
    <p>Thank you for using ReportHere to hold companies accountable!</p>
  `;
  
  return getBaseTemplate(content);
}

/**
 * Company notification template
 */
function getCompanyNotificationTemplate(complaintData) {
  const content = `
    <h1>🔔 New complaint received</h1>
    
    <p>A new complaint has been filed against <strong>${complaintData.companyName}</strong> on ReportHere.</p>
    
    <div class="highlight">
      <p style="margin: 0 0 10px 0;"><strong>Complaint Details:</strong></p>
      <p style="margin: 5px 0;"><strong>ID:</strong> #${complaintData.id}</p>
      <p style="margin: 5px 0;"><strong>Title:</strong> ${complaintData.title}</p>
      <p style="margin: 5px 0;"><strong>Category:</strong> ${complaintData.category || 'General'}</p>
      <p style="margin: 5px 0;"><strong>Filed:</strong> ${new Date().toLocaleDateString()}</p>
    </div>
    
    <p><strong>Preview:</strong></p>
    <p style="background-color: #f9fafb; padding: 15px; border-radius: 8px; font-style: italic;">
      "${complaintData.description?.substring(0, 200)}${complaintData.description?.length > 200 ? '...' : ''}"
    </p>
    
    <a href="https://reporthere.org/business-dashboard" class="button">View & Respond</a>
    
    <div class="divider"></div>
    
    <p><strong>⚡ Quick Response Tips:</strong></p>
    <ul style="margin: 10px 0; padding-left: 20px; color: #374151;">
      <li>Respond within 24 hours to show you care</li>
      <li>Be professional and empathetic</li>
      <li>Offer a clear solution or next steps</li>
      <li>Public responses show transparency to all customers</li>
    </ul>
    
    <p>Companies that respond quickly and professionally build stronger customer trust.</p>
  `;
  
  return getBaseTemplate(content);
}

/**
 * Status update template
 */
function getStatusUpdateTemplate(complaintData, newStatus) {
  const statusEmoji = {
    'open': '📬',
    'in_progress': '⏳',
    'resolved': '✅',
    'closed': '🔒',
  };
  
  const content = `
    <h1>${statusEmoji[newStatus] || '📬'} Complaint status updated</h1>
    
    <p>Hi ${complaintData.userName || 'there'},</p>
    
    <p>There's an update on your complaint against <strong>${complaintData.companyName}</strong>.</p>
    
    <div class="highlight">
      <p style="margin: 0 0 10px 0;"><strong>Status Changed:</strong></p>
      <p style="margin: 5px 0; font-size: 18px;">
        <strong style="color: #10b981;">${newStatus.replace('_', ' ').toUpperCase()}</strong>
      </p>
    </div>
    
    <a href="https://reporthere.org/complaint/${complaintData.id}" class="button">View Details</a>
    
    <div class="divider"></div>
    
    <p>You can continue to track your complaint and see any responses from the company.</p>
    
    <p>Thank you for using ReportHere!</p>
  `;
  
  return getBaseTemplate(content);
}
