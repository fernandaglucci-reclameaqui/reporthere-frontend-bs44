import { supabase } from './supabaseClient';

/**
 * Supabase Entity Adapter
 * Provides Base44-like API for Supabase operations
 */

class SupabaseEntity {
  constructor(tableName) {
    this.tableName = tableName;
  }

  /**
   * List entities with pagination and sorting
   * @param {string} orderBy - Field to sort by (prefix with '-' for DESC)
   * @param {number} limit - Number of items to return
   * @param {number} offset - Number of items to skip
   * @returns {Promise<Array>} Array of entities
   */
  async list(orderBy = '-created_date', limit = 50, offset = 0) {
    const isDescending = orderBy.startsWith('-');
    const field = isDescending ? orderBy.substring(1) : orderBy;
    
    const { data, error, count } = await supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .order(field, { ascending: !isDescending })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    // Return in Base44 format
    return data || [];
  }

  /**
   * Filter entities by conditions
   * @param {Object} filters - Filter conditions
   * @param {string} orderBy - Field to sort by
   * @param {number} limit - Number of items to return
   * @returns {Promise<Array>} Array of entities
   */
  async filter(filters = {}, orderBy = '-created_date', limit = 1000) {
    const isDescending = orderBy.startsWith('-');
    const field = isDescending ? orderBy.substring(1) : orderBy;
    
    let query = supabase.from(this.tableName).select('*');
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value);
      }
    });
    
    // Apply ordering
    query = query.order(field, { ascending: !isDescending });
    
    // Apply limit
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  }

  /**
   * Get a single entity by ID
   * @param {string} id - Entity ID
   * @returns {Promise<Object>} Entity object
   */
  async get(id) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Create a new entity
   * @param {Object} entityData - Entity data
   * @returns {Promise<Object>} Created entity
   */
  async create(entityData) {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([entityData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Update an entity by ID
   * @param {string} id - Entity ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated entity
   */
  async update(id, updates) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Delete an entity by ID
   * @param {string} id - Entity ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}

// Auth adapter for user operations
class SupabaseAuth {
  /**
   * Get current user
   * @returns {Promise<Object>} Current user
   */
  async me() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    if (!user) return null;
    
    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    return profile || { id: user.id, email: user.email };
  }

  /**
   * Sign up a new user
   * @param {Object} credentials - Email and password
   * @returns {Promise<Object>} User object
   */
  async signUp({ email, password, ...metadata }) {
    console.log('SignUp attempt:', { email, metadata });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: window.location.origin
      }
    });
    
    if (error) {
      console.error('Supabase auth.signUp error:', error);
      throw error;
    }
    
    console.log('SignUp response:', data);
    
    // Create profile
    if (data.user) {
      const profileData = {
        id: data.user.id,
        email: data.user.email,
        ...metadata
      };
      
      console.log('Creating profile:', profileData);
      
      const { data: profileResult, error: profileError } = await supabase
        .from('profiles')
        .insert([profileData])
        .select()
        .single();
      
      if (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't throw - auth user was created successfully
      } else {
        console.log('Profile created:', profileResult);
      }
    }
    
    return data.user;
  }

  /**
   * Sign in user
   * @param {Object} credentials - Email and password
   * @returns {Promise<Object>} User object
   */
  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data.user;
  }

  /**
   * Sign out current user
   * @returns {Promise<void>}
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Redirect to login (for compatibility with Base44)
   * @param {string} returnUrl - URL to return to after login
   */
  async loginWithRedirect(returnUrl) {
    // Store return URL
    localStorage.setItem('auth_return_url', returnUrl);
    // Redirect to login page
    window.location.href = '/login';
  }

  /**
   * Update current user's profile data
   * @param {Object} updates - Profile updates
   * @returns {Promise<Object>} Updated profile
   */
  async updateMe(updates) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  /**
   * Update current user's user data (alias for updateMe)
   * @param {Object} updates - Profile updates
   * @returns {Promise<Object>} Updated profile
   */
  async updateMyUserData(updates) {
    return this.updateMe(updates);
  }
}

// Create entity instances
export const Complaint = new SupabaseEntity('complaints');
export const Company = new SupabaseEntity('companies');
export const CompanyClaim = new SupabaseEntity('company_claims');
export const CompanyMember = new SupabaseEntity('company_members');
export const ComplaintMessage = new SupabaseEntity('complaint_messages');
export const ComplaintSurvey = new SupabaseEntity('complaint_surveys');
export const CompanyMetricsDaily = new SupabaseEntity('company_metrics_daily');
export const ModerationAction = new SupabaseEntity('moderation_actions');
export const Subscription = new SupabaseEntity('subscriptions');
export const CompanyReplyLog = new SupabaseEntity('company_reply_logs');
export const Post = new SupabaseEntity('posts');
export const CompanyTrustScore = new SupabaseEntity('company_trust_scores');
export const CompanyTrustHistory = new SupabaseEntity('company_trust_history');
export const Notification = new SupabaseEntity('notifications');
export const BillingTransaction = new SupabaseEntity('billing_transactions');

// Auth instance
export const User = new SupabaseAuth();

// Export supabase client for direct access
export { supabase };
