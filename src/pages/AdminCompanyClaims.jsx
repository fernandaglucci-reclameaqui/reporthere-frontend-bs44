import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { logEvent } from '@/lib/eventSystem';

export default function AdminCompanyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [creditInputs, setCreditInputs] = useState({});

  useEffect(() => {
    loadClaims();
  }, []);

  const loadClaims = async () => {
    try {
      setLoading(true);
      
      // Load claims with credits
      const { data: claimsData, error: claimsError } = await supabase
        .from('company_claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (claimsError) throw claimsError;

      // Load credits for each company
      const { data: creditsData, error: creditsError } = await supabase
        .from('company_credits')
        .select('*');

      if (creditsError) throw creditsError;

      // Merge data
      const creditsMap = {};
      creditsData?.forEach(c => {
        creditsMap[c.company_id] = c.reply_credits;
      });

      const enrichedClaims = claimsData?.map(claim => ({
        ...claim,
        credits: creditsMap[claim.company_id] || 0
      }));

      setClaims(enrichedClaims || []);
    } catch (err) {
      console.error('Error loading claims:', err);
      setError('Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  const updateClaimStatus = async (claimId, companyId, newStatus) => {
    try {
      setError('');
      setSuccess('');

      const { error: updateError } = await supabase
        .from('company_claims')
        .update({
          claim_status: newStatus,
          verified_at: newStatus === 'verified' ? new Date().toISOString() : null
        })
        .eq('id', claimId);

      if (updateError) throw updateError;

      // Log event
      await logEvent('admin_claim_status_changed', {
        claim_id: claimId,
        company_id: companyId,
        new_status: newStatus
      });

      setSuccess(`Claim ${newStatus} successfully!`);
      loadClaims();
    } catch (err) {
      console.error('Error updating claim:', err);
      setError('Failed to update claim status');
    }
  };

  const updateCredits = async (companyId) => {
    try {
      setError('');
      setSuccess('');

      const newCredits = parseInt(creditInputs[companyId] || '0');
      if (isNaN(newCredits) || newCredits < 0) {
        setError('Invalid credit amount');
        return;
      }

      // Check if credits record exists
      const { data: existing } = await supabase
        .from('company_credits')
        .select('id')
        .eq('company_id', companyId)
        .single();

      if (existing) {
        // Update existing
        const { error: updateError } = await supabase
          .from('company_credits')
          .update({
            reply_credits: newCredits,
            updated_at: new Date().toISOString()
          })
          .eq('company_id', companyId);

        if (updateError) throw updateError;
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from('company_credits')
          .insert([{
            company_id: companyId,
            reply_credits: newCredits
          }]);

        if (insertError) throw insertError;
      }

      // Log event
      await logEvent('admin_credits_updated', {
        company_id: companyId,
        new_credits: newCredits
      });

      setSuccess('Credits updated successfully!');
      setCreditInputs({ ...creditInputs, [companyId]: '' });
      loadClaims();
    } catch (err) {
      console.error('Error updating credits:', err);
      setError('Failed to update credits');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-slate-600">Loading claims...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Company Claims & Credits Management</h1>
      <p className="mt-2 text-slate-600">Approve claims and manage reply credits for verified businesses</p>

      {error && (
        <Alert className="mt-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8 space-y-4">
        {claims.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">No claims yet</p>
          </div>
        )}

        {claims.map((claim) => (
          <div key={claim.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{claim.company_id}</h3>
                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  <p><strong>Email:</strong> {claim.verification_email}</p>
                  {claim.business_website && <p><strong>Website:</strong> {claim.business_website}</p>}
                  <p><strong>Method:</strong> {claim.verification_method}</p>
                  <p><strong>Submitted:</strong> {new Date(claim.created_at).toLocaleString()}</p>
                  {claim.verified_at && <p><strong>Verified:</strong> {new Date(claim.verified_at).toLocaleString()}</p>}
                </div>
              </div>

              <div className="ml-6">
                <div className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  claim.claim_status === 'verified' ? 'bg-green-100 text-green-700' :
                  claim.claim_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {claim.claim_status}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-slate-200 pt-4">
              {/* Status Actions */}
              <div className="flex gap-2">
                {claim.claim_status !== 'verified' && (
                  <Button
                    onClick={() => updateClaimStatus(claim.id, claim.company_id, 'verified')}
                    className="bg-green-600 text-white hover:bg-green-700"
                    size="sm"
                  >
                    Approve
                  </Button>
                )}
                {claim.claim_status !== 'rejected' && (
                  <Button
                    onClick={() => updateClaimStatus(claim.id, claim.company_id, 'rejected')}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    size="sm"
                  >
                    Reject
                  </Button>
                )}
                {claim.claim_status !== 'pending' && (
                  <Button
                    onClick={() => updateClaimStatus(claim.id, claim.company_id, 'pending')}
                    variant="outline"
                    size="sm"
                  >
                    Set Pending
                  </Button>
                )}
              </div>

              {/* Credits Management */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  Credits: <strong>{claim.credits}</strong>
                </span>
                <Input
                  type="number"
                  min="0"
                  placeholder="New amount"
                  value={creditInputs[claim.company_id] || ''}
                  onChange={(e) => setCreditInputs({ ...creditInputs, [claim.company_id]: e.target.value })}
                  className="w-24"
                />
                <Button
                  onClick={() => updateCredits(claim.company_id)}
                  variant="outline"
                  size="sm"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-900">Admin Guide</h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-800">
          <li>• <strong>Approve:</strong> Verify the business claim and grant 5 free credits automatically</li>
          <li>• <strong>Reject:</strong> Deny the claim (business can resubmit)</li>
          <li>• <strong>Credits:</strong> Set reply credits manually (each reply uses 1 credit)</li>
          <li>• <strong>Verified businesses</strong> can reply to complaints only if they have credits</li>
        </ul>
      </div>
    </div>
  );
}
