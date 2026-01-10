/**
 * Wave 3B: Company Claim Utilities
 * Helper functions for checking claim status and credits
 */

import { supabase } from '../api/supabaseClient';

export interface CompanyClaim {
  id: string;
  company_id: string;
  claimed_by_user_id: string;
  claim_status: 'pending' | 'verified' | 'rejected';
  verification_method: string;
  verification_email: string;
  business_website: string;
  created_at: string;
  verified_at: string | null;
}

export interface CompanyCredits {
  id: string;
  company_id: string;
  reply_credits: number;
  updated_at: string;
}

/**
 * Get claim status for a company
 */
export async function getCompanyClaim(companyId: string): Promise<CompanyClaim | null> {
  try {
    const { data, error } = await supabase
      .from('company_claims')
      .select('*')
      .eq('company_id', companyId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching company claim:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error in getCompanyClaim:', err);
    return null;
  }
}

/**
 * Get reply credits for a company
 */
export async function getCompanyCredits(companyId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('company_credits')
      .select('reply_credits')
      .eq('company_id', companyId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching company credits:', error);
      return 0;
    }

    return data?.reply_credits || 0;
  } catch (err) {
    console.error('Error in getCompanyCredits:', err);
    return 0;
  }
}

/**
 * Check if a company can reply (verified + has credits)
 */
export async function canCompanyReply(companyId: string): Promise<{
  canReply: boolean;
  reason?: string;
  claim?: CompanyClaim;
  credits?: number;
}> {
  const claim = await getCompanyClaim(companyId);

  // Not claimed
  if (!claim) {
    return {
      canReply: false,
      reason: 'unclaimed',
      claim: null,
      credits: 0
    };
  }

  // Pending verification
  if (claim.claim_status === 'pending') {
    return {
      canReply: false,
      reason: 'pending',
      claim,
      credits: 0
    };
  }

  // Rejected
  if (claim.claim_status === 'rejected') {
    return {
      canReply: false,
      reason: 'rejected',
      claim,
      credits: 0
    };
  }

  // Verified - check credits
  const credits = await getCompanyCredits(companyId);

  if (credits <= 0) {
    return {
      canReply: false,
      reason: 'no_credits',
      claim,
      credits: 0
    };
  }

  return {
    canReply: true,
    claim,
    credits
  };
}

/**
 * Decrement reply credits (call this when a company replies)
 */
export async function decrementReplyCredit(companyId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.rpc('decrement_reply_credit', {
      p_company_id: companyId
    });

    if (error) {
      console.error('Error decrementing credits:', error);
      return false;
    }

    return data === true;
  } catch (err) {
    console.error('Error in decrementReplyCredit:', err);
    return false;
  }
}

/**
 * Check if current user owns this company claim
 */
export async function isUserCompanyOwner(companyId: string, userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('company_claims')
      .select('claimed_by_user_id')
      .eq('company_id', companyId)
      .eq('claimed_by_user_id', userId)
      .single();

    if (error) return false;
    return !!data;
  } catch (err) {
    return false;
  }
}

/**
 * Get claim status badge info
 */
export function getClaimStatusBadge(claim: CompanyClaim | null): {
  text: string;
  color: string;
  bgColor: string;
} {
  if (!claim) {
    return {
      text: 'Unclaimed',
      color: 'text-slate-600',
      bgColor: 'bg-slate-100'
    };
  }

  switch (claim.claim_status) {
    case 'verified':
      return {
        text: 'Verified Business',
        color: 'text-green-700',
        bgColor: 'bg-green-100'
      };
    case 'pending':
      return {
        text: 'Verification Pending',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100'
      };
    case 'rejected':
      return {
        text: 'Claim Rejected',
        color: 'text-red-700',
        bgColor: 'bg-red-100'
      };
    default:
      return {
        text: 'Unknown Status',
        color: 'text-slate-600',
        bgColor: 'bg-slate-100'
      };
  }
}

/**
 * Get reply lock message based on status
 */
export function getReplyLockMessage(reason: string): string {
  switch (reason) {
    case 'unclaimed':
      return 'Business response available after profile claim & verification.';
    case 'pending':
      return 'Your claim is pending verification. You\'ll be able to reply once verified.';
    case 'rejected':
      return 'Your claim was rejected. Please contact support for assistance.';
    case 'no_credits':
      return 'You\'ve used all reply credits. Contact us to add more credits.';
    default:
      return 'Reply is currently unavailable.';
  }
}
