import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Company } from "@/api/entities";
import { CompanyClaim } from "@/api/entities";
import { CompanyMember } from "@/api/entities";
import { User } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Subscription } from "@/api/entities";
import { withinSeatLimit } from "@/components/utils/rbac";
import { 
  Building2, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Mail,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function ClaimCompanyForm({ companyId }) {
  const navigate = useNavigate();
  
  const [company, setCompany] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    requester_email: "",
    company_website: "",
    evidence_urls: [],
    authorized_declaration: false
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [companyData, currentUser] = await Promise.all([
        Company.get(companyId),
        User.me()
      ]);

      setCompany(companyData);
      setUser(currentUser);
      
      // Pre-fill form data
      setFormData(prev => ({
        ...prev,
        requester_email: currentUser.email,
        company_website: companyData.website || ""
      }));
    } catch (error) {
      setError("Failed to load company data");
    }
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFileUpload = async (files) => {
    if (files.length === 0) return;
    
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => UploadFile({ file }));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.file_url);
      
      setFormData(prev => ({
        ...prev,
        evidence_urls: [...prev.evidence_urls, ...urls]
      }));
    } catch (error) {
      setError("Failed to upload files. Please try again.");
    }
    setUploading(false);
  };

  const removeEvidence = (index) => {
    setFormData(prev => ({
      ...prev,
      evidence_urls: prev.evidence_urls.filter((_, i) => i !== index)
    }));
  };

  const extractDomain = (email) => {
    return email.split('@')[1]?.toLowerCase();
  };

  const handleSubmit = async () => {
    if (!formData.requester_email || !formData.authorized_declaration) {
      setError("Please fill in all required fields and confirm authorization.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Create the claim
      const claimData = {
        company_id: companyId,
        company_name: company.name,
        requester_user_id: user.id,
        requester_email: formData.requester_email,
        company_website: formData.company_website,
        verification_method: formData.evidence_urls.length > 0 ? "document_upload" : "domain_email",
        evidence_urls: formData.evidence_urls,
        authorized_declaration: formData.authorized_declaration
      };

      const claim = await CompanyClaim.create(claimData);

      // Check for auto-approval
      const emailDomain = extractDomain(formData.requester_email);
      const companyDomain = company.primary_domain?.toLowerCase();
      
      if (emailDomain && companyDomain && emailDomain === companyDomain && company.verified_status !== 'verified') {
        // Auto-approve the claim
        await CompanyClaim.update(claim.id, {
          status: "approved",
          reviewed_at: new Date().toISOString()
        });

        // Update company verification status
        await Company.update(companyId, {
          verified_status: "verified",
          verified: true
        });

        // Add user as owner member, checking seat limits
        const subscription = await Subscription.filter({ company_id: companyId }, "-created_date", 1).then(r=>r[0]);
        const members = await CompanyMember.filter({ company_id: companyId });

        if (!withinSeatLimit(subscription, members.length + 1)) {
          throw new Error("Seat limit reached for this company. Please contact support to upgrade the plan.");
        }

        const existingMember = members.find(m => m.user_id === user.id);

        if (!existingMember) {
          await CompanyMember.create({
            company_id: companyId,
            company_name: company.name,
            user_id: user.id,
            user_email: user.email,
            role: "owner", // Changed from admin to owner as per requirements
            invited_at: new Date().toISOString(),
            accepted_at: new Date().toISOString()
          });
        }

        // Redirect to business dashboard
        setTimeout(() => {
          navigate(createPageUrl("BusinessDashboard"));
        }, 2000);
      } else {
        // Manual review required
        setTimeout(() => {
          navigate(createPageUrl(`CompanyProfile?id=${companyId}`));
        }, 2000);
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message || "Failed to submit claim. Please try again.");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error && !company) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted!</h2>
        <p className="text-gray-600 mb-6">
          {extractDomain(formData.requester_email) === company?.primary_domain?.toLowerCase() ? 
            "Your domain matches the company domain. Your claim has been automatically approved and you now have access to the Business Dashboard!" :
            "Your claim has been submitted for review. You'll be notified once it's processed."
          }
        </p>
        <div className="flex gap-3 justify-center">
          <Button 
            variant="outline"
            onClick={() => navigate(createPageUrl(`CompanyProfile?id=${companyId}`))}
          >
            View Company
          </Button>
          {extractDomain(formData.requester_email) === company?.primary_domain?.toLowerCase() && (
            <Button onClick={() => navigate(createPageUrl("BusinessDashboard"))}>
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            {company?.logo_url ? (
              <img src={company.logo_url} alt={company.name} className="w-6 h-6 object-contain" />
            ) : (
              <Building2 className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{company?.name}</h3>
            {company?.industry && (
              <p className="text-sm text-gray-600 capitalize">
                {company.industry.replace(/_/g, ' ')}
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Business Email */}
        <div>
          <Label htmlFor="requester_email">Business Email Address *</Label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="requester_email"
              type="email"
              value={formData.requester_email}
              onChange={(e) => setFormData({...formData, requester_email: e.target.value})}
              placeholder="your.name@company.com"
              className="pl-10"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Use your official business email address for faster verification
          </p>
        </div>

        {/* Company Website */}
        <div>
          <Label htmlFor="company_website">Company Website</Label>
          <div className="mt-1 relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="company_website"
              type="url"
              value={formData.company_website}
              onChange={(e) => setFormData({...formData, company_website: e.target.value})}
              placeholder="https://company.com"
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        {/* Verification Documents */}
        <div>
          <Label>Supporting Documents (Optional)</Label>
          <p className="text-sm text-gray-600 mb-3">
            Upload business registration, tax documents, or other proof of authorization
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Upload business documents for verification
            </p>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="evidence-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('evidence-upload').click()}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Choose Files"}
            </Button>
          </div>

          {formData.evidence_urls.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label>Uploaded Documents:</Label>
              {formData.evidence_urls.map((url, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Document {index + 1}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEvidence(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Authorization Declaration */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="authorized"
            checked={formData.authorized_declaration}
            onCheckedChange={(checked) => setFormData({...formData, authorized_declaration: checked})}
            className="mt-0.5"
          />
          <div className="flex-1">
            <label htmlFor="authorized" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I am authorized to represent this business *
            </label>
            <p className="text-xs text-gray-500 mt-1">
              I confirm that I am an authorized representative of this business and have the right to claim and manage this profile.
            </p>
          </div>
        </div>

        {/* Auto-approval notice */}
        {formData.requester_email && company?.primary_domain && 
         extractDomain(formData.requester_email) === company.primary_domain.toLowerCase() && (
          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Fast-track verification:</strong> Your email domain matches the company domain. 
              Your claim will be automatically approved upon submission.
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button
            onClick={handleSubmit}
            disabled={submitting || !formData.requester_email || !formData.authorized_declaration}
            className="bg-green-600 hover:bg-green-700"
          >
            {submitting ? "Submitting Claim..." : "Submit Claim"}
          </Button>
        </div>
      </div>
    </div>
  );
}