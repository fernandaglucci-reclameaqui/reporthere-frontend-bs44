/**
 * Wave 3A: Email Service
 * 
 * Sends transactional emails with neutral, legally safe language
 * Uses Resend (already configured in your project)
 */

import { supabase } from '@/api/supabaseClient';

/**
 * Email templates with neutral, legally safe language
 */
const EMAIL_TEMPLATES = {
  complaint_created: {
    subject: (data) => `A consumer shared feedback about ${data.company_name}`,
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
          .disclaimer { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📢 ReportHere Notification</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            
            <p>A consumer has shared feedback about <strong>${data.company_name}</strong> on ReportHere.</p>
            
            <div class="disclaimer">
              <strong>⚠️ Important:</strong> ReportHere does not verify the accuracy of consumer feedback. This is user-generated content and does not represent the views of ReportHere.
            </div>
            
            <p><strong>Category:</strong> ${data.complaint_category}</p>
            <p><strong>Topic:</strong> ${data.complaint_title}</p>
            
            <p>You can view this feedback and respond directly:</p>
            
            <a href="${data.complaint_url}" class="button">View Feedback</a>
            
            <p>Don't have a business profile yet? Claim your business to respond to consumer feedback:</p>
            
            <a href="${data.claim_profile_url}" class="button" style="background: #6b7280;">Claim Your Business</a>
            
            <div class="footer">
              <p>This is an automated notification from ReportHere.</p>
              <p>ReportHere is a neutral platform for consumer feedback. We do not verify claims.</p>
              <p>© 2026 ReportHere. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  },

  company_replied: {
    subject: () => 'A company responded to your feedback',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>💬 New Response to Your Feedback</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            
            <p>A company has responded to the feedback you shared on ReportHere.</p>
            
            <p>Click below to view their response:</p>
            
            <a href="${data.complaint_url}" class="button">View Response</a>
            
            <p>You can reply to continue the conversation.</p>
            
            <div class="footer">
              <p>This is an automated notification from ReportHere.</p>
              <p>© 2026 ReportHere. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  },

  evidence_flagged: {
    subject: () => '🚨 Evidence flagged for review',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚨 Admin Alert: Evidence Flagged</h2>
          </div>
          <div class="content">
            <p>An admin has flagged evidence for review.</p>
            
            <p><strong>Flagged by:</strong> ${data.flagged_by}</p>
            
            <p>Please review this complaint immediately:</p>
            
            <a href="${data.complaint_url}" class="button">Review Complaint</a>
            
            <div class="footer">
              <p>This is an automated admin notification from ReportHere.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  },

  complaint_resolved: {
    subject: () => 'Your feedback has been marked as resolved',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>✅ Feedback Resolved</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            
            <p>The feedback you shared on ReportHere has been marked as resolved.</p>
            
            <p>You can view the resolution details here:</p>
            
            <a href="${data.complaint_url}" class="button">View Resolution</a>
            
            <p>Thank you for using ReportHere to share your experience.</p>
            
            <div class="footer">
              <p>This is an automated notification from ReportHere.</p>
              <p>© 2026 ReportHere. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }
};

/**
 * Send email using Supabase Edge Function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email HTML content
 */
export async function sendEmail(to, subject, html) {
  try {
    // Call Supabase Edge Function for sending emails
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to,
        subject,
        html
      }
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    console.log(`✅ Email sent to ${to}: ${subject}`);
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendEmail:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send templated email
 * @param {string} to - Recipient email
 * @param {string} templateName - Template name from EMAIL_TEMPLATES
 * @param {object} data - Template data
 */
export async function sendTemplatedEmail(to, templateName, data) {
  const template = EMAIL_TEMPLATES[templateName];
  
  if (!template) {
    console.error(`Template not found: ${templateName}`);
    return { success: false, error: 'Template not found' };
  }

  const subject = template.subject(data);
  const html = template.html(data);

  return sendEmail(to, subject, html);
}

/**
 * Queue email for later sending (useful for batch operations)
 */
export async function queueEmail(to, templateName, data) {
  try {
    const { data: result, error } = await supabase
      .from('email_queue')
      .insert([{
        to,
        template_name: templateName,
        template_data: data,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error queuing email:', error);
      return { success: false, error };
    }

    console.log(`✅ Email queued: ${templateName} to ${to}`);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in queueEmail:', error);
    return { success: false, error: error.message };
  }
}
