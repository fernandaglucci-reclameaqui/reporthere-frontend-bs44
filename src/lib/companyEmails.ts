/**
 * Wave 3B: Company Engagement Email Templates
 * Neutral, Section 230 compliant language
 */

export interface CompanyNotificationData {
  companyName: string;
  complaintId: string;
  complaintTitle: string;
  claimUrl: string;
  viewUrl: string;
}

export interface ClaimStatusData {
  companyName: string;
  claimStatus: 'started' | 'verified' | 'rejected';
  verificationEmail: string;
  dashboardUrl: string;
}

/**
 * Email: Company has been mentioned in feedback
 * Sent when a complaint is filed against an unclaimed company
 */
export function getCompanyMentionedEmail(data: CompanyNotificationData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consumer Feedback Shared</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">ReportHere</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
                A Consumer Shared Feedback Involving ${data.companyName}
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                A customer has shared their experience on ReportHere's platform. This is an opportunity to engage, respond, and build trust with your customers.
              </p>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                  <strong>Important:</strong> ReportHere does not verify the accuracy of consumer feedback. We serve as a neutral platform for communication between consumers and businesses.
                </p>
              </div>

              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Feedback Title:</p>
                <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 500;">${data.complaintTitle}</p>
              </div>

              <!-- CTA Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.claimUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; margin-bottom: 12px;">
                      Claim Your Business Profile
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${data.viewUrl}" style="display: inline-block; padding: 12px 24px; color: #059669; text-decoration: none; border: 2px solid #10b981; border-radius: 6px; font-weight: 500; font-size: 14px;">
                      View the Feedback
                    </a>
                  </td>
                </tr>
              </table>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                  Why Claim Your Profile?
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                  <li>Respond directly to customer feedback</li>
                  <li>Show potential customers you care</li>
                  <li>Build trust and transparency</li>
                  <li>Turn negative experiences into positive outcomes</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                This email was sent because your business was mentioned on ReportHere.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} ReportHere. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Email: Claim request received
 * Sent when a business submits a claim
 */
export function getClaimStartedEmail(data: ClaimStatusData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claim Request Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">ReportHere</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
                We Received Your Claim Request
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Thank you for claiming <strong>${data.companyName}</strong> on ReportHere!
              </p>

              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                  Verification Email:
                </p>
                <p style="margin: 0; color: #1e3a8a; font-size: 14px;">
                  ${data.verificationEmail}
                </p>
              </div>

              <p style="margin: 20px 0; color: #4b5563; font-size: 14px; line-height: 1.6;">
                Our team will review your claim within <strong>24-48 hours</strong>. We'll send you an email once your business profile is verified.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.dashboardUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p style="margin: 0 0 12px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
                  What happens next?
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                  <li>Our team verifies your business ownership</li>
                  <li>You'll receive 5 free reply credits upon verification</li>
                  <li>You can respond to customer feedback</li>
                  <li>Build trust and improve your reputation</li>
                </ul>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                Questions? Contact us at support@reporthere.org
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} ReportHere. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Email: Claim verified
 * Sent when a business claim is approved
 */
export function getClaimVerifiedEmail(data: ClaimStatusData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Business Verified!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px 8px 0 0;">
              <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Congratulations!</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: 600;">
                Your Business Profile is Verified!
              </h2>
              
              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                <strong>${data.companyName}</strong> is now verified on ReportHere. You can start responding to customer feedback and building trust!
              </p>

              <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #065f46; font-size: 14px; font-weight: 600;">
                  🎁 Welcome Gift:
                </p>
                <p style="margin: 0; color: #047857; font-size: 14px;">
                  You've received <strong>5 free reply credits</strong> to get started!
                </p>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.dashboardUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      Start Responding to Feedback
                    </a>
                  </td>
                </tr>
              </table>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <p style="margin: 0 0 12px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
                  What you can do now:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.8;">
                  <li>View all feedback about your business</li>
                  <li>Respond directly to customers (5 free replies)</li>
                  <li>Show transparency and build trust</li>
                  <li>Turn unhappy customers into loyal fans</li>
                </ul>
              </div>

              <div style="background-color: #f9fafb; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">
                  <strong>Need more reply credits?</strong> Contact us to discuss plans that fit your business needs.
                </p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px;">
                Questions? Contact us at support@reporthere.org
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © ${new Date().getFullYear()} ReportHere. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
