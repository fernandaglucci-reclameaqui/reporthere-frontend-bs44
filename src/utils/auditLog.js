/**
 * Audit Log Utility
 * Tracks admin actions and important system events
 */

import { supabase } from '@/api/supabaseClient';

export const AuditLog = {
  /**
   * Log an admin action
   * @param {Object} params - Log parameters
   */
  async log({
    action,
    entityType,
    entityId,
    userId,
    userEmail,
    details = {},
    ipAddress = null
  }) {
    try {
      const logEntry = {
        action,
        entity_type: entityType,
        entity_id: entityId,
        user_id: userId,
        user_email: userEmail,
        details: JSON.stringify(details),
        ip_address: ipAddress || await this.getClientIP(),
        created_at: new Date().toISOString()
      };

      // Store in audit_logs table (you'll need to create this table)
      const { error } = await supabase
        .from('audit_logs')
        .insert([logEntry]);

      if (error) {
        console.error('Error logging audit entry:', error);
      }

      // Also log to console in development
      if (import.meta.env.DEV) {
        console.log('[AUDIT LOG]', logEntry);
      }
    } catch (error) {
      console.error('Error in audit log:', error);
    }
  },

  /**
   * Get client IP address (best effort)
   */
  async getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return null;
    }
  },

  /**
   * Log complaint moderation action
   */
  async logComplaintModeration(action, complaintId, userId, userEmail, details = {}) {
    return this.log({
      action: `complaint_${action}`,
      entityType: 'complaint',
      entityId: complaintId,
      userId,
      userEmail,
      details
    });
  },

  /**
   * Log user action
   */
  async logUserAction(action, targetUserId, adminId, adminEmail, details = {}) {
    return this.log({
      action: `user_${action}`,
      entityType: 'user',
      entityId: targetUserId,
      userId: adminId,
      userEmail: adminEmail,
      details
    });
  },

  /**
   * Log company action
   */
  async logCompanyAction(action, companyId, userId, userEmail, details = {}) {
    return this.log({
      action: `company_${action}`,
      entityType: 'company',
      entityId: companyId,
      userId,
      userEmail,
      details
    });
  },

  /**
   * Get audit logs with filters
   */
  async getLogs({ 
    limit = 100, 
    entityType = null, 
    entityId = null,
    userId = null,
    startDate = null,
    endDate = null
  }) {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (entityType) {
        query = query.eq('entity_type', entityType);
      }

      if (entityId) {
        query = query.eq('entity_id', entityId);
      }

      if (userId) {
        query = query.eq('user_id', userId);
      }

      if (startDate) {
        query = query.gte('created_at', startDate);
      }

      if (endDate) {
        query = query.lte('created_at', endDate);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map(log => ({
        ...log,
        details: JSON.parse(log.details || '{}')
      }));
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }
  },

  /**
   * Get audit logs for a specific entity
   */
  async getEntityHistory(entityType, entityId) {
    return this.getLogs({ entityType, entityId, limit: 1000 });
  },

  /**
   * Export audit logs as CSV
   */
  async exportToCSV(filters = {}) {
    const logs = await this.getLogs({ ...filters, limit: 10000 });
    
    const headers = ['Timestamp', 'Action', 'Entity Type', 'Entity ID', 'User Email', 'IP Address', 'Details'];
    const rows = logs.map(log => [
      new Date(log.created_at).toISOString(),
      log.action,
      log.entity_type,
      log.entity_id,
      log.user_email,
      log.ip_address || 'N/A',
      JSON.stringify(log.details)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  },

  /**
   * Download audit logs as CSV file
   */
  async downloadCSV(filters = {}) {
    const csv = await this.exportToCSV(filters);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

export default AuditLog;
