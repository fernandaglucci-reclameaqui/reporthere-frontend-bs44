import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CompanyClaim } from '@/api/entities';
import { Company } from '@/api/entities';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';

export default function ClaimVerify() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [claimId, setClaimId] = useState(null);
    const [code, setCode] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const id = new URLSearchParams(search).get('claim_id');
        if (!id) {
            toast.error("Invalid verification link.");
            navigate(createPageUrl('Home'));
        }
        setClaimId(id);
    }, [search, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code || code.length !== 6) {
            toast.error("Please enter a valid 6-digit code.");
            return;
        }
        setSubmitting(true);
        
        try {
            const claim = await CompanyClaim.get(claimId);
            const storedCode = claim.notes?.match(/Verification Code: (\d{6})/)?.[1];
            
            if (!storedCode || storedCode !== code) {
                throw new Error("Invalid verification code.");
            }

            // Code is valid, approve claim
            await CompanyClaim.update(claim.id, { status: 'approved', notes: 'Verified via email code.' });
            
            // Update company to mark as claimed
            const company = await Company.get(claim.company_id);
            const existingClaimants = company.claimed_by || [];
            await Company.update(claim.company_id, {
                claimed_by: [...new Set([...existingClaimants, claim.requester_user_id])],
                verified_status: 'verified' // Mark as verified on successful claim
            });

            // Update user record
            const user = await User.me();
            const existingCompanies = user.companies_claimed || [];
             await User.updateMyUserData({
                companies_claimed: [...new Set([...existingCompanies, claim.company_id])]
            });

            toast.success("Verification successful! You can now manage this company profile.");
            navigate(createPageUrl('dashboard'));

        } catch (error) {
            console.error("Verification failed:", error);
            toast.error(error.message || "Verification failed. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <KeyRound className="w-12 h-12 mx-auto text-green-600 mb-4" />
                    <h2 className="text-3xl font-extrabold text-gray-900">Enter Verification Code</h2>
                    <p className="mt-2 text-gray-600">A 6-digit code was sent to your email address.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md">
                    <div>
                        <Label htmlFor="code" className="sr-only">Verification Code</Label>
                        <Input
                            id="code"
                            name="code"
                            type="text"
                            required
                            maxLength="6"
                            className="text-center text-2xl tracking-[0.5em] h-16"
                            placeholder="______"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full bg-green-600 hover:bg-green-700">
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify"}
                    </Button>
                </form>
            </div>
        </div>
    );
}