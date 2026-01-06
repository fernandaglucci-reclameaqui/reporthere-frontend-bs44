/**
 * AI Service - Provides AI-powered features for complaints
 * Uses Supabase Edge Functions + OpenAI
 */

import { supabase } from '../api/supabaseClient';

export const AIService = {
  /**
   * Generate a concise summary of a complaint
   * @param {Object} complaint - The complaint object
   * @returns {Promise<string>} - Generated summary
   */
  async generateComplaintSummary(complaint) {
    try {
      const { data, error } = await supabase.functions.invoke('ai-complaint-analysis', {
        body: {
          action: 'generate_summary',
          complaint: {
            title: complaint.title,
            description: complaint.description,
            category: complaint.category,
            sentiment: complaint.sentiment
          }
        }
      });

      if (error) throw error;
      return data.summary;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary. Please try again.');
    }
  },

  /**
   * Generate AI-suggested response for a company
   * @param {Object} complaint - The complaint object
   * @param {string} companyName - Name of the company
   * @returns {Promise<string>} - Suggested response text
   */
  async suggestResponse(complaint, companyName) {
    try {
      const { data, error } = await supabase.functions.invoke('ai-complaint-analysis', {
        body: {
          action: 'suggest_response',
          complaint: {
            title: complaint.title,
            description: complaint.description,
            category: complaint.category,
            desired_solution: complaint.desired_solution,
            sentiment: complaint.sentiment
          },
          companyName
        }
      });

      if (error) throw error;
      return data.suggested_response;
    } catch (error) {
      console.error('Error suggesting response:', error);
      throw new Error('Failed to generate response suggestion. Please try again.');
    }
  },

  /**
   * Analyze complaint for risk factors
   * @param {Object} complaint - The complaint object
   * @returns {Promise<Object>} - Risk analysis result
   */
  async analyzeRisk(complaint) {
    try {
      const { data, error } = await supabase.functions.invoke('ai-complaint-analysis', {
        body: {
          action: 'flag_risk',
          complaint: {
            title: complaint.title,
            description: complaint.description,
            category: complaint.category,
            sentiment: complaint.sentiment
          }
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error analyzing risk:', error);
      throw new Error('Failed to analyze complaint risk. Please try again.');
    }
  }
};

export default AIService;
