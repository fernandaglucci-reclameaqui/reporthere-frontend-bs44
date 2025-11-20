// Email service using Resend API
const RESEND_API_KEY = 're_WV7rY7Pz_L7cTTgBKUmhT2zuiyhGMpvZi';
const RESEND_API_URL = 'https://api.resend.com/emails';

// Email templates
const emailTemplates = {
  complaintConfirmation: (data) => ({
    subject: `Complaint Submitted: ${data.companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2d7a5e; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background-color: #2d7a5e; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .info-box { background-color: white; padding: 15px; border-left: 4px solid #2d7a5e; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Complaint Submitted Successfully</h1>
            </div>
            <div class="content">
              <p>Hi ${data.userName},</p>
              
              <p>Thank you for submitting your complaint on <strong>ReportHere</strong>. We've received your feedback and it's now visible on our platform.</p>
              
              <div class="info-box">
                <h3>Complaint Details:</h3>
                <p><strong>Company:</strong> ${data.companyName}</p>
                <p><strong>Subject:</strong> ${data.title}</p>
                <p><strong>Status:</strong> Under Review</p>
                <p><strong>Complaint ID:</strong> #${data.complaintId}</p>
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Your complaint is now public and visible to other consumers</li>
                <li>The company will be notified about your complaint</li>
                <li>You'll receive an email when the company responds</li>
                <li>You can track the status in your dashboard</li>
              </ul>
              
              <center>
                <a href="https://reporthere-frontend-bs44.vercel.app/complaint/${data.complaintId}" class="button">View Your Complaint</a>
              </center>
              
              <p>Thank you for helping build a more transparent marketplace!</p>
              
              <p>Best regards,<br><strong>The ReportHere Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2024 ReportHere. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  companyNotification: (data) => ({
    subject: `New Complaint: ${data.title}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .alert-box { background-color: #fff3cd; padding: 15px; border-left: 4px solid: #ffc107; margin: 20px 0; }
            .complaint-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚠️ New Customer Complaint</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              
              <p>A new complaint has been filed against <strong>${data.companyName}</strong> on ReportHere.</p>
              
              <div class="alert-box">
                <p><strong>⏰ Quick response improves your reputation!</strong></p>
                <p>Companies that respond within 24 hours have 3x higher customer satisfaction ratings.</p>
              </div>
              
              <div class="complaint-box">
                <h3>Complaint Details:</h3>
                <p><strong>Subject:</strong> ${data.title}</p>
                <p><strong>Category:</strong> ${data.category}</p>
                <p><strong>Amount Involved:</strong> $${data.amount || 'N/A'}</p>
                <p><strong>Description:</strong></p>
                <p>${data.description}</p>
              </div>
              
              <p><strong>Recommended Actions:</strong></p>
              <ol>
                <li>Review the complaint details carefully</li>
                <li>Respond professionally and promptly</li>
                <li>Offer a resolution to the customer</li>
                <li>Update the complaint status</li>
              </ol>
              
              <center>
                <a href="https://reporthere-frontend-bs44.vercel.app/business-dashboard" class="button">Respond to Complaint</a>
              </center>
              
              <p>Best regards,<br><strong>The ReportHere Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2024 ReportHere. All rights reserved.</p>
              <p>Don't have access? <a href="https://reporthere-frontend-bs44.vercel.app/claimprofile">Claim your company profile</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  }),

  companyResponse: (data) => ({
    subject: `${data.companyName} Responded to Your Complaint`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
            .response-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #28a745; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💬 Company Response Received</h1>
            </div>
            <div class="content">
              <p>Hi ${data.userName},</p>
              
              <p>Good news! <strong>${data.companyName}</strong> has responded to your complaint.</p>
              
              <div class="response-box">
                <h3>Company's Response:</h3>
                <p>${data.response}</p>
              </div>
              
              <p><strong>What's next?</strong></p>
              <ul>
                <li>Review the company's response</li>
                <li>Reply if you have additional questions</li>
                <li>Mark the complaint as resolved if you're satisfied</li>
                <li>Update your review based on the outcome</li>
              </ul>
              
              <center>
                <a href="https://reporthere-frontend-bs44.vercel.app/complaint/${data.complaintId}" class="button">View Full Conversation</a>
              </center>
              
              <p>Thank you for using ReportHere!</p>
              
              <p>Best regards,<br><strong>The ReportHere Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2024 ReportHere. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  })
};

// Send email function
export async function sendEmail(to, templateName, data) {
  try {
    const template = emailTemplates[templateName](data);
    
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ReportHere <noreply@reporthere.com>',
        to: [to],
        subject: template.subject,
        html: template.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Convenience functions
export async function sendComplaintConfirmation(userEmail, data) {
  return sendEmail(userEmail, 'complaintConfirmation', data);
}

export async function sendCompanyNotification(companyEmail, data) {
  return sendEmail(companyEmail, 'companyNotification', data);
}

export async function sendCompanyResponseNotification(userEmail, data) {
  return sendEmail(userEmail, 'companyResponse', data);
}
