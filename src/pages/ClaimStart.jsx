import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Company } from '@/api/entities';
import { CompanyClaim } from '@/api/entities';
import { SendEmail } from '@/api/integrations';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Building, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ClaimStart() {
    const { search } = useLocation();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const slug = new URLSearchParams(search).get('slug');
                if (!slug) throw new Error("No company specified.");

                const companies = await Company.filter({ slug });
                if (companies.length === 0) throw new Error("Company not found.");
                setCompany(companies[0]);

                const currentUser = await User.me();
                setUser(currentUser);

            } catch (error) {
                console.error(error);
                toast.error(error.message);
                navigate(createPageUrl('companies'));
            }
            setLoading(false);
        };
        loadData();
    }, [search, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

            // Create a claim ticket
            const claimData = {
                company_id: company.id,
                company_name: company.name,
                requester_user_id: user.id,
                requester_email: user.email,
                verification_method: 'domain_email',
                status: 'submitted',
                notes: `Verification Code: ${verificationCode}`, // Storing code in notes for simplicity
                authorized_declaration: true // Implicit from starting the flow
            };
            const newClaim = await CompanyClaim.create(claimData);

            // Send verification email
            await SendEmail({
                to: user.email,
                subject: `Verify your email for ${company.name} – ReportHere`,
                body: `Your verification code is: ${verificationCode}\n\nThis code is valid for 15 minutes. Enter it on the verification page to proceed.`
            });

            toast.success("Verification code sent to your email.");
            navigate(createPageUrl(`ClaimVerify?claim_id=${newClaim.id}`));

        } catch (error) {
            console.error("Failed to start claim process:", error);
            toast.error("Failed to start claim process. Please try again.");
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Building className="w-12 h-12 mx-auto text-green-600 mb-4" />
                    <h2 className="text-3xl font-extrabold text-gray-900">Claim Profile for {company.name}</h2>
                    <p className="mt-2 text-gray-600">Verify your affiliation to manage this company's profile.</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <p className="text-sm text-gray-700">
                                To verify you are an authorized representative, we will send a verification code to your registered email address.
                            </p>
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <Label htmlFor="email">Your Work Email</Label>
                                <div className="flex items-center gap-2 mt-1">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <p id="email" className="font-semibold text-gray-800">{user.email}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">
                                If this is not a company domain email, you may be required to submit additional documentation after this step.
                            </p>
                            <Button type="submit" disabled={submitting} className="w-full bg-green-600 hover:bg-green-700">
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Verification Code"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}