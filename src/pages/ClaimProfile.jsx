
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// base44 removed - using Supabase entities
import { User } from '@/api/entities';
import { Company } from '@/api/entities';
import { CompanyClaim } from '@/api/entities';
import { SendEmail } from '@/api/integrations';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle, AlertCircle, Building, Link as LinkIcon, Briefcase } from 'lucide-react';
import { slugify } from '../components/utils/slug';

const FormSkeleton = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
    </div>
);

export default function ClaimProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [selectedCompany, setSelectedCompany] = useState('new');
    const [newCompanyName, setNewCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [role, setRole] = useState('');
    const [evidence, setEvidence] = useState('');
    const [notes, setNotes] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const currentUser = await User.me();
                setUser(currentUser);
                const companyList = await Company.list("-total_complaints", 1000);
                setCompanies(companyList);
            } catch (err) {
                await User.loginWithRedirect(window.location.href);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!termsAccepted) {
            setError("You must confirm you are an authorized representative.");
            return;
        }
        if (selectedCompany === 'new' && !newCompanyName.trim()) {
            setError("Please enter your company's name.");
            return;
        }

        setSubmitting(true);
        setError(null);
        try {
            const isNewCompany = selectedCompany === 'new';
            let companyIdToClaim;
            let companyNameToClaim;

            if (isNewCompany) {
                const newCompany = await Company.create({
                    name: newCompanyName.trim(),
                    slug: slugify(newCompanyName.trim()),
                    total_complaints: 0
                });
                companyIdToClaim = newCompany.id;
                companyNameToClaim = newCompany.name;
            } else {
                companyIdToClaim = selectedCompany;
                companyNameToClaim = companies.find(c => c.id === companyIdToClaim)?.name;
            }

            const claimData = {
                company_id: companyIdToClaim,
                company_name: companyNameToClaim,
                user_id: user.id,
                requester_email: user.email,
                verification_method: 'email',
                verification_data: {
                    website: website,
                    role: role,
                    evidence: evidence ? evidence.split(',').map(url => url.trim()).filter(Boolean) : []
                },
                admin_notes: notes || '',
                status: 'approved'
            };
            const newClaim = await CompanyClaim.create(claimData);
            
            const updatedCompaniesClaimed = Array.from(new Set([...(user.companies_claimed || []), companyIdToClaim]));
            await User.updateMe({
                user_type: 'business',
                companies_claimed: updatedCompaniesClaimed
            });
            
            try {
                await Promise.all([
                    SendEmail({
                        to: 'admin@reporthere.com',
                        subject: `New Company Claim Submitted & Auto-Approved: ${companyNameToClaim}`,
                        body: `A claim for ${companyNameToClaim} was auto-approved for ${user.email}.\nClaim ID: ${newClaim.id}`
                    }),
                    SendEmail({
                        to: user.email,
                        subject: 'Your Company Profile is Ready',
                        body: `Hello ${user.full_name || 'there'},\n\nYour claim for ${companyNameToClaim} has been approved. You can now access your business dashboard to manage complaints and your company profile.\n\nThank you,\nThe ReportHere Team`
                    })
                ]);
            } catch (emailError) {
                console.error("Email notification failed:", emailError);
            }
            
            setSuccess(true);
        } catch (err) {
            console.error("Claim submission failed:", err);
            setError(err.message || "An unexpected error occurred. Please try again.");
            setSubmitting(false);
        }
    };

    if (loading) {
        return <FormSkeleton />;
    }

    if (success) {
        return (
            <SuccessRedirect />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <Building className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Claim Your Company Profile</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Verify your business to manage your reputation, respond to customers, and access analytics.
                    </p>
                </div>

                <Card className="shadow-2xl">
                    <CardHeader>
                        <CardTitle>Verification Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="company" className="font-semibold">Company</Label>
                                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                                    <SelectTrigger id="company" className="mt-1">
                                        <SelectValue placeholder="Select your company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="new">-- Add a new company --</SelectItem>
                                        {companies.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedCompany === 'new' && (
                                <div>
                                    <Label htmlFor="new-company-name" className="font-semibold">New Company Name</Label>
                                    <Input 
                                        id="new-company-name" 
                                        value={newCompanyName} 
                                        onChange={e => setNewCompanyName(e.target.value)} 
                                        placeholder="e.g., Acme Corporation"
                                        required
                                        className="mt-1"
                                    />
                                </div>
                            )}

                            <div>
                                <Label htmlFor="website" className="font-semibold">Company Website</Label>
                                <Input 
                                    id="website" 
                                    type="url" 
                                    value={website} 
                                    onChange={e => setWebsite(e.target.value)} 
                                    placeholder="https://www.example.com" 
                                    required 
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="role" className="font-semibold">Your Role / Title</Label>
                                <Input 
                                    id="role" 
                                    value={role} 
                                    onChange={e => setRole(e.target.value)} 
                                    placeholder="e.g., Customer Support Manager" 
                                    required 
                                    className="mt-1"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="work-email" className="font-semibold">Your Work Email</Label>
                                <Input 
                                    id="work-email" 
                                    type="email" 
                                    value={user.email} 
                                    disabled 
                                    className="mt-1 bg-gray-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">This must be your official company email address.</p>
                            </div>

                            <div>
                                <Label htmlFor="evidence" className="font-semibold">Evidence (Optional)</Label>
                                <Textarea 
                                    id="evidence" 
                                    value={evidence}
                                    onChange={e => setEvidence(e.target.value)}
                                    placeholder="Link to your LinkedIn profile, company registration document, etc. Separate multiple links with a comma." 
                                    className="mt-1"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="notes" className="font-semibold">Notes (Optional)</Label>
                                <Textarea 
                                    id="notes" 
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Any additional information for our review team."
                                    className="mt-1"
                                />
                            </div>

                            <div className="flex items-start space-x-3 pt-2">
                                <Checkbox
                                    id="terms"
                                    checked={termsAccepted}
                                    onCheckedChange={setTermsAccepted}
                                    className="mt-1"
                                />
                                <Label htmlFor="terms" className="text-sm font-medium text-gray-700">
                                    I confirm that I am an authorized representative of this company and have the right to claim this profile.
                                </Label>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="pt-2">
                                <Button type="submit" disabled={submitting} className="w-full bg-green-600 hover:bg-green-700">
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Claim Profile'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function SuccessRedirect() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Clear user cache to force re-fetch on next page load
        User.clearCache();
    
        if (countdown <= 0) {
            navigate(createPageUrl('business-dashboard'));
            return;
        }
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <Card className="max-w-lg w-full text-center shadow-lg">
                <CardContent className="p-10">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Claim Approved!</h2>
                    <p className="text-gray-600 mb-8">
                       Your company profile is now linked to your account. Redirecting you to the business dashboard in {countdown} seconds...
                    </p>
                    <Button onClick={() => navigate(createPageUrl('business-dashboard'))}>Go to Business Dashboard Now</Button>
                </CardContent>
            </Card>
        </div>
    );
}
