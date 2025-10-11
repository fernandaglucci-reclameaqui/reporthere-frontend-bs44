
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Complaint } from "@/api/entities";
import { Company } from "@/api/entities";
import { User } from "@/api/entities";
import { Notification } from "@/api/entities"; // Added Notification entity import
import { UploadFile, InvokeLLM, SendEmail } from "@/api/integrations";
import { slugify } from "../components/utils/slug";
import {
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Search,
  X,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = [
  { value: "customer_service", label: "Customer Service" },
  { value: "product_quality", label: "Product Quality" },
  { value: "billing_dispute", label: "Billing Dispute" },
  { value: "delivery_shipping", label: "Delivery & Shipping" },
  { value: "refund_return", label: "Refund & Return" },
  { value: "warranty_repair", label: "Warranty & Repair" },
  { value: "false_advertising", label: "False Advertising" },
  { value: "data_privacy", label: "Data Privacy" },
  { value: "discrimination", label: "Discrimination" },
  { value: "safety_concerns", label: "Safety Concerns" },
  { value: "other", label: "Other" }
];

const SEVERITY_LEVELS = [
  { value: "low", label: "Low - Minor inconvenience", color: "text-green-600" },
  { value: "medium", label: "Medium - Significant issue", color: "text-yellow-600" },
  { value: "high", label: "High - Major problem", color: "text-orange-600" },
  { value: "urgent", label: "Urgent - Safety or legal concern", color: "text-red-600" }
];

const FormSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-8 mx-auto"></div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold ${
            step < currentStep
              ? 'bg-green-600 border-green-600 text-white'
              : step === currentStep
              ? 'bg-green-600 border-green-600 text-white'
              : 'bg-white border-gray-300 text-gray-500'
          }`}>
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-16 h-0.5 mx-2 ${
              step < currentStep ? 'bg-green-600' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default function FileComplaint() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [complaint, setComplaint] = useState({
    title: "",
    description: "",
    category: "",
    company_name: "",
    company_id: null,
    severity: "medium",
    amount_involved: "",
    attachments: []
  });
  const [user, setUser] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdComplaintId, setCreatedComplaintId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null); // New state for inline errors
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const allCompanies = await Company.list("-total_complaints", 500).catch(() => []);
        setCompanies(allCompanies);

        const currentUser = await User.me().catch(() => null);
        setUser(currentUser);

        const urlParams = new URLSearchParams(location.search);
        const companyName = urlParams.get('company') || urlParams.get('companyName');
        const companyId = urlParams.get('company_id') || urlParams.get('companyId');

        if (companyName || companyId) {
          setComplaint(prev => ({
            ...prev,
            company_name: companyName || prev.company_name,
            company_id: companyId || prev.company_id
          }));
        }
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load page data. Please refresh and try again.");
      }
      setLoading(false);
    };
    loadInitialData();
  }, [location.search]);

  useEffect(() => {
    if (complaint.company_name.length > 1) {
      const filtered = companies
        .filter(c => c.name.toLowerCase().includes(complaint.company_name.toLowerCase()))
        .slice(0, 5);
      setFilteredCompanies(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredCompanies([]);
    }
  }, [complaint.company_name, companies]);

  const handleFileUpload = async (files) => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => {
        const maxSize = 25 * 1024 * 1024; // 25MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (file.size > maxSize) {
          throw new Error(`File ${file.name} is too large. Maximum size is 25MB.`);
        }

        if (!allowedTypes.includes(file.type)) {
          throw new Error(`File type ${file.type} is not allowed. Please use PDF, DOCX, PNG, or JPG files.`);
        }

        return UploadFile({ file });
      });

      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.file_url);

      setComplaint(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...urls]
      }));
    } catch (error) {
      console.error("Error uploading files:", error);
      alert(error.message || "Failed to upload files. Please try again.");
    }
    setUploading(false);
  };

  const removeAttachment = (index) => {
    setComplaint(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleCompanySelect = (company) => {
    setComplaint(prev => ({
      ...prev,
      company_name: company.name,
      company_id: company.id
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async () => {
    setFormError(null); // Reset error on new submission

    if (!complaint.title.trim() || !complaint.description.trim() || !complaint.category || !complaint.company_name.trim()) {
      setFormError("Please fill out all required fields: Company, Title, Category, and Details.");
      return;
    }

    if (!termsAccepted) {
      setFormError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setSubmitting(true);
    setIsScrubbing(true);
    try {
      if (!user) {
        await User.loginWithRedirect(window.location.href);
        return;
      }

      let scrubbedDescription = complaint.description;
      let scrubbedTitle = complaint.title;

      // PII Scrubber using LLM - with fallback
      try {
        const piiScrubberPrompt = `Please analyze the following text and remove any personally identifiable information (PII) like names, email addresses, phone numbers, physical addresses, and financial details. Replace the PII with placeholders like [NAME], [EMAIL], [PHONE], [ADDRESS], or [FINANCIAL_INFO]. Return only the scrubbed text. Text to scrub: "${complaint.description}"`;
        scrubbedDescription = await InvokeLLM({ prompt: piiScrubberPrompt });

        const titleScrubberPrompt = `Please analyze the following text and remove any personally identifiable information (PII) like names, email addresses, phone numbers, physical addresses, and financial details. Replace the PII with placeholders like [NAME], [EMAIL], [PHONE], [ADDRESS], or [FINANCIAL_INFO]. Return only the scrubbed text. Text to scrub: "${complaint.title}"`;
        scrubbedTitle = await InvokeLLM({ prompt: titleScrubberPrompt });
      } catch (scrubError) {
          console.warn("PII scrubbing failed, proceeding with original text.", scrubError);
          // Use original text if scrubbing fails, don't block submission
      }

      setIsScrubbing(false);

      let company = companies.find(c =>
        c.name.toLowerCase() === complaint.company_name.toLowerCase()
      );

      let company_id = complaint.company_id;
      if (company) {
        company_id = company.id;
        await Company.update(company.id, {
          total_complaints: (company.total_complaints || 0) + 1
        }).catch(err => console.warn("Failed to update company stats:", err));
      } else {
        try {
          const newCompany = await Company.create({
            name: complaint.company_name.trim(),
            slug: slugify(complaint.company_name.trim()),
            total_complaints: 1
          });
          company_id = newCompany.id;
          company = newCompany;
        } catch (err) {
          console.warn("Failed to create company, using name only:", err);
        }
      }

      const complaintData = {
        title: scrubbedTitle.trim(),
        description: scrubbedDescription.trim(),
        category: complaint.category,
        company_name: complaint.company_name.trim(),
        company_id,
        severity: complaint.severity,
        amount_involved: complaint.amount_involved ? parseFloat(complaint.amount_involved) : null,
        attachments: complaint.attachments,
        status: "submitted", // All complaints now start as submitted for moderation
        has_evidence: complaint.attachments.length > 0
      };

      const created = await Complaint.create(complaintData);
      setCreatedComplaintId(created.id);

      // --- START NEW NOTIFICATION LOGIC ---
      // Send notification to business if company is claimed and has a contact email
      if (company && company.claimed_by && company.claimed_by.length > 0) {
        const ownerId = company.claimed_by[0]; // Assuming first claimant is primary contact
        try {
            // In a real app, you would look up the user by ID to get their email.
            // For now, if the company has a contact email, use that.
            const recipientEmail = company.email;

            if (recipientEmail) {
                await SendEmail({
                    to: recipientEmail,
                    subject: `New Complaint Filed: "${scrubbedTitle.trim()}"`,
                    body: `A new complaint has been filed against ${company.name} on ReportHere.\n\nTitle: ${scrubbedTitle.trim()}\n\nPlease log in to your business dashboard to review and respond.\n\nComplaint URL: ${window.location.origin}${createPageUrl(`complaint/${created.id}`)}`
                });
            }

            // Also create a system notification
             await Notification.create({
                user_email: recipientEmail, // This assumes user_email is the primary key for lookup
                type: "BUSINESS_REPLY", // This type should be more generic like "NEW_COMPLAINT"
                title: `New Complaint against ${company.name}`,
                body: `A new complaint titled "${scrubbedTitle.trim()}" requires your attention.`,
                link_url: createPageUrl(`complaint/${created.id}`)
            });

        } catch (notificationError) {
            console.warn("Failed to send notification email or create system notification to business:", notificationError);
        }
      }
      // --- END NEW NOTIFICATION LOGIC ---

      try {
        await User.updateMyUserData({
          complaints_filed: (user.complaints_filed || 0) + 1
        });
      } catch (err) {
        console.warn("Failed to update user stats:", err);
      }

      setSuccess(true);

    } catch (error) {
      console.error("Error submitting complaint:", error);
      setFormError(error.message || "Failed to submit complaint. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
      setIsScrubbing(false);
    }
  };

  if (loading) {
    return <FormSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Form</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
              Reload Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-lg shadow-lg p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Submission Successful</h2>
          <p className="text-gray-600 mb-8">
            Your complaint has been submitted for moderation. You will be notified once it is published.
          </p>
          <Button
            onClick={() => navigate(createPageUrl("Dashboard"))}
            className="w-full bg-green-600 hover:bg-green-700 mb-4"
          >
            View My Dashboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(createPageUrl("Home"))}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">File a Complaint</h1>
          <p className="text-gray-600">Share your experience to help others and get a resolution.</p>
        </div>

        <StepIndicator currentStep={step} totalSteps={3} />

        <Card className="shadow-lg bg-white">
          <CardContent className="p-8">
            <p className="text-sm text-gray-600 mb-6 form-required-note"><span className="text-red-600 font-semibold">*</span> Required field</p>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 1: The Basics</h2>

                <div>
                  <Label htmlFor="company_name" className="text-base font-medium text-gray-900 required">Company Name</Label>
                  <div className="relative mt-2">
                    <Input
                      id="company_name"
                      value={complaint.company_name}
                      onChange={(e) => setComplaint({...complaint, company_name: e.target.value})}
                      placeholder="Search for a company..."
                      className="h-12 text-base"
                      required // A11y: Mark as required
                      aria-required="true"
                    />
                    {complaint.company_name && (
                      <button
                        onClick={() => setComplaint({...complaint, company_name: ""})}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear company name" // A11y: Add label for button with icon only
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {showSuggestions && filteredCompanies.length > 0 && (
                    <div className="mt-2 border rounded-lg bg-white shadow-sm max-h-40 overflow-y-auto z-10">
                      {filteredCompanies.map((company) => (
                        <button
                          key={company.id}
                          onClick={() => handleCompanySelect(company)}
                          className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                          type="button" // Ensure button is type="button" to prevent form submission
                        >
                          <div className="font-medium">{company.name}</div>
                          {company.total_complaints > 0 && (
                            <div className="text-xs text-gray-500">
                              {company.total_complaints} complaint{company.total_complaints !== 1 ? 's' : ''}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="title" className="text-base font-medium text-gray-900 required">Complaint Title</Label>
                  <Input
                    id="title"
                    value={complaint.title}
                    onChange={(e) => setComplaint({...complaint, title: e.target.value})}
                    placeholder="Brief summary of your issue"
                    className="h-12 text-base mt-2"
                    required // A11y: Mark as required
                    aria-required="true"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-base font-medium text-gray-900 required">Complaint Category</Label>
                  <Select
                    value={complaint.category}
                    onValueChange={(value) => setComplaint({...complaint, category: value})}
                  >
                    <SelectTrigger className="h-12 text-base mt-2" id="category" aria-required="true"> {/* A11y: Add id for label, mark as required */}
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 2: The Details</h2>

                <div>
                  <Label htmlFor="details" className="text-base font-medium text-gray-900 required">Complaint Details</Label>
                  <p className="text-sm text-gray-500 mt-1">Please do not include any personal information like names, emails, or addresses. This will be made public.</p>
                  <Textarea
                    id="details"
                    value={complaint.description}
                    onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                    placeholder="Describe your experience in detail..."
                    className="mt-2 min-h-32 text-base"
                    maxLength={5000}
                    required // A11y: Mark as required
                    aria-required="true"
                  />
                  <p className="text-sm text-gray-500 mt-1 text-right">
                    {complaint.description.length}/5000
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium text-gray-900">Attach Evidence (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-base text-gray-600 mb-2">
                      Drop files here or click to upload
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      PDF, DOCX, PNG, or JPG (max 25MB each)
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.docx"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                      aria-label="Upload files for evidence" // A11y: Label for hidden input
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload').click()}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Browse Files"}
                    </Button>
                  </div>

                  {complaint.attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="font-medium text-sm">Attached files:</p>
                      {complaint.attachments.map((url, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                           <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-green-600 hover:underline truncate">
                            {url.split('/').pop().split('?')[0]}
                          </a>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAttachment(index)}
                            aria-label={`Remove attachment ${url.split('/').pop().split('?')[0]}`} // A11y: Add label for button with icon only
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900">Step 3: Review & Submit</h2>
                </div>

                <div className="space-y-4 p-6 bg-gray-50 rounded-lg border">
                  <div>
                    <h4 className="font-semibold text-gray-900">Company:</h4>
                    <p className="text-gray-700">{complaint.company_name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Title:</h4>
                    <p className="text-gray-700">{complaint.title}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Category:</h4>
                    <p className="text-gray-700">
                      {CATEGORIES.find(c => c.value === complaint.category)?.label}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Description:</h4>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {complaint.description}
                    </p>
                  </div>
                  {complaint.attachments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900">Attachments:</h4>
                      <p className="text-gray-700">{complaint.attachments.length} file(s) attached</p>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={setTermsAccepted}
                    className="mt-1"
                    required // A11y: Mark as required
                    aria-required="true"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the <Link to={createPageUrl("terms")} target="_blank" className="text-green-600 underline">Terms of Service</Link> and <Link to={createPageUrl("privacy")} target="_blank" className="text-green-600 underline">Privacy Policy</Link>.
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I confirm I am authorized to submit this complaint and the information is truthful.
                    </p>
                  </div>
                </div>

                {/* New Inline Error Display */}
                {formError && (
                    <Alert variant="destructive" className="mt-4" role="alert"> {/* A11y: Ensure role="alert" for dynamic errors */}
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {formError}
                        </AlertDescription>
                    </Alert>
                )}
              </div>
            )}

            <div className="flex justify-between pt-8 border-t mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1 || submitting || isScrubbing}
                className="hover:bg-gray-100"
              >
                Previous
              </Button>

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={submitting || isScrubbing ||
                    (step === 1 && (!complaint.company_name || !complaint.title || !complaint.category)) ||
                    (step === 2 && !complaint.description)
                  }
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting || !termsAccepted || isScrubbing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isScrubbing ? "Securing..." : submitting ? "Submitting..." : "Submit Complaint"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
