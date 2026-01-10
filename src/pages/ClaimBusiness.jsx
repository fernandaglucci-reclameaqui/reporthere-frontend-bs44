import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { logEvent } from '@/utils/eventSystem';

export default function ClaimBusiness() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  
  const [formData, setFormData] = useState({
    verificationEmail: '',
    businessWebsite: '',
    verificationMethod: 'email_domain'
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if user is logged in
      if (!user) {
        setError('Please sign in to claim a business');
        setLoading(false);
        return;
      }

      // Check if company is already claimed
      const { data: existingClaim } = await supabase
        .from('company_claims')
        .select('*')
        .eq('company_id', companyId)
        .single();

      if (existingClaim) {
        setError('This business has already been claimed');
        setLoading(false);
        return;
      }

      // Validate email domain if using domain verification
      let claimStatus = 'pending';
      let verificationMethod = formData.verificationMethod;

      if (formData.verificationMethod === 'email_domain' && formData.businessWebsite) {
        const emailDomain = formData.verificationEmail.split('@')[1];
        const websiteDomain = formData.businessWebsite.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        
        if (emailDomain === websiteDomain) {
          claimStatus = 'verified';
        } else {
          verificationMethod = 'admin_manual';
          claimStatus = 'pending';
        }
      }

      // Create claim
      const { data: claim, error: claimError } = await supabase
        .from('company_claims')
        .insert([{
          company_id: companyId,
          claimed_by_user_id: user.id,
          claim_status: claimStatus,
          verification_method: verificationMethod,
          verification_email: formData.verificationEmail,
          business_website: formData.businessWebsite,
          verified_at: claimStatus === 'verified' ? new Date().toISOString() : null
        }])
        .select()
        .single();

      if (claimError) throw claimError;

      // Log event
      await logEvent('company_claimed', {
        company_id: companyId,
        claim_id: claim.id,
        claim_status: claimStatus,
        verification_method: verificationMethod,
        user_id: user.id
      });

      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(`/company/${companyId}`);
      }, 2000);

    } catch (err) {
      console.error('Error claiming business:', err);
      setError(err.message || 'Failed to claim business. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            <strong>Success!</strong> Your business claim has been submitted.
            {formData.verificationMethod === 'email_domain' ? 
              ' Your business is now verified!' : 
              ' Our team will review your claim within 24-48 hours.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Claim Your Business</h1>
        <p className="mt-2 text-slate-600">
          Verify your business ownership to respond to customer feedback and build trust.
        </p>

        <div className="mt-6 rounded-md bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <strong>Company:</strong> {decodeURIComponent(companyId)}
          </p>
        </div>

        {!user && (
          <Alert className="mt-6 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              Please <a href="/auth/signin" className="font-semibold underline">sign in</a> or <a href="/auth/signup" className="font-semibold underline">create an account</a> to claim this business.
            </AlertDescription>
          </Alert>
        )}

        {user && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="verificationEmail">Business Email *</Label>
              <Input
                id="verificationEmail"
                type="email"
                required
                value={formData.verificationEmail}
                onChange={(e) => setFormData({ ...formData, verificationEmail: e.target.value })}
                placeholder="your@businessdomain.com"
                className="mt-2"
              />
              <p className="mt-1 text-sm text-slate-500">
                Use your official business email for faster verification
              </p>
            </div>

            <div>
              <Label htmlFor="businessWebsite">Business Website (Optional)</Label>
              <Input
                id="businessWebsite"
                type="url"
                value={formData.businessWebsite}
                onChange={(e) => setFormData({ ...formData, businessWebsite: e.target.value })}
                placeholder="https://www.yourbusiness.com"
                className="mt-2"
              />
              <p className="mt-1 text-sm text-slate-500">
                If your email domain matches your website, you'll be verified instantly!
              </p>
            </div>

            <div className="rounded-md bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Verification Methods</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                <li>✅ <strong>Instant:</strong> Email domain matches website domain</li>
                <li>⏳ <strong>Manual Review:</strong> Our team verifies within 24-48 hours</li>
              </ul>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-b from-green-500 to-green-700 px-6 py-3 font-semibold text-white hover:from-green-600 hover:to-green-800"
              >
                {loading ? 'Submitting...' : 'Claim Business'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="px-6 py-3"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        <div className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs text-slate-600">
            <strong>Legal Notice:</strong> By claiming this business, you certify that you are an authorized representative. 
            ReportHere does not verify the accuracy of consumer complaints and serves as a neutral platform for communication.
          </p>
        </div>
      </div>
    </div>
  );
}
