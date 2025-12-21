/**
 * Email Template Utilities
 * Functions for generating beautiful, consistent emails
 * Date: December 17, 2025
 */

import fs from 'fs';
import path from 'path';

// Load base template
const baseTemplatePath = path.join(__dirname, 'base-template.html');
const baseTemplate = fs.readFileSync(baseTemplatePath, 'utf8');

/**
 * Generate email HTML from template
 * @param {string} subject - Email subject line
 * @param {string} content - HTML content to insert
 * @param {string} recipientEmail - Recipient's email address
 * @returns {string} Complete HTML email
 */
export function generateEmail(subject, content, recipientEmail) {
  return baseTemplate
    .replace('{{SUBJECT}}', subject)
    .replace('{{CONTENT}}', content)
    .replace('{{EMAIL}}', recipientEmail);
}

/**
 * Create a button CTA
 * @param {string} text - Button text
 * @param {string} url - Button URL
 * @returns {string} Button HTML
 */
export function createButton(text, url) {
  return `<a href="${url}" class="email-button">${text}</a>`;
}

/**
 * Create an info box
 * @param {string} content - Box content
 * @param {string} type - 'info' | 'warning' | 'error'
 * @returns {string} Info box HTML
 */
export function createInfoBox(content, type = 'info') {
  const classMap = {
    info: 'email-info-box',
    warning: 'email-info-box email-info-box-warning',
    error: 'email-info-box email-info-box-error'
  };
  
  return `<div class="${classMap[type]}">${content}</div>`;
}

/**
 * Create a title
 * @param {string} text - Title text
 * @returns {string} Title HTML
 */
export function createTitle(text) {
  return `<h1 class="email-title">${text}</h1>`;
}

/**
 * Create a paragraph
 * @param {string} text - Paragraph text
 * @returns {string} Paragraph HTML
 */
export function createParagraph(text) {
  return `<p class="email-text">${text}</p>`;
}

/**
 * Create a divider
 * @returns {string} Divider HTML
 */
export function createDivider() {
  return `<hr class="email-divider">`;
}

/**
 * Format complaint summary for email
 * @param {object} complaint - Complaint object
 * @returns {string} Formatted HTML
 */
export function formatComplaintSummary(complaint) {
  return `
    <div class="email-info-box">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">Complaint #${complaint.id}</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>From:</strong> ${complaint.customer_name || 'Anonymous'}</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>Category:</strong> ${complaint.category || 'General'}</p>
      <p style="margin: 0 0 4px 0; color: #4b5563;"><strong>Submitted:</strong> ${new Date(complaint.created_date).toLocaleDateString()}</p>
      ${complaint.description ? `<p style="margin: 12px 0 0 0; color: #4b5563;">${complaint.description.substring(0, 200)}${complaint.description.length > 200 ? '...' : ''}</p>` : ''}
    </div>
  `;
}

/**
 * Format time duration in human-readable format
 * @param {number} hours - Number of hours
 * @returns {string} Formatted duration
 */
export function formatDuration(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} minutes`;
  if (hours < 24) return `${Math.round(hours)} hours`;
  return `${Math.round(hours / 24)} days`;
}

/**
 * Get company dashboard URL
 * @param {string} companyId - Company UUID
 * @returns {string} Dashboard URL
 */
export function getCompanyDashboardUrl(companyId) {
  return `https://reporthere.org/business-dashboard?company=${companyId}`;
}

/**
 * Get complaint detail URL
 * @param {string} complaintId - Complaint UUID
 * @param {string} userType - 'company' | 'consumer'
 * @returns {string} Complaint URL
 */
export function getComplaintUrl(complaintId, userType = 'company') {
  if (userType === 'company') {
    return `https://reporthere.org/company/complaint/${complaintId}`;
  }
  return `https://reporthere.org/complaint/${complaintId}`;
}

/**
 * Get unsubscribe URL
 * @param {string} email - User email
 * @param {string} token - Unsubscribe token
 * @returns {string} Unsubscribe URL
 */
export function getUnsubscribeUrl(email, token) {
  return `https://reporthere.org/unsubscribe?email=${encodeURIComponent(email)}&token=${token}`;
}

export default {
  generateEmail,
  createButton,
  createInfoBox,
  createTitle,
  createParagraph,
  createDivider,
  formatComplaintSummary,
  formatDuration,
  getCompanyDashboardUrl,
  getComplaintUrl,
  getUnsubscribeUrl
};
