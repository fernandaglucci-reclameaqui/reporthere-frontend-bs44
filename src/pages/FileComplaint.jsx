import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Complaint, Company, User, Notification } from "@/api/entities";
import { UploadFile, InvokeLLM, SendEmail } from "@/api/integrations";
import { sendComplaintConfirmation, sendCompanyNotification } from '../services/emailService';
import { slugify } from "../components/utils/slug";
import {
  FileText, Upload, AlertCircle, CheckCircle, ArrowLeft, ArrowRight,
  User as UserIcon, Building, MessageSquare, Target, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  { value: "other", label: "Other" }
];

const STEPS = [
  { id: 1, title: "Your Info", icon: UserIcon, color: "bg-blue-500" },
  { id: 2, title: "Company", icon: Building, color: "bg-purple-500" },
  { id: 3, title: "What Happened", icon: MessageSquare, color: "bg-orange-500" },
  { id: 4, title: "What You Want", icon: Target, color: "bg-green-500" }
];

const ProgressBar = ({ currentStep }) => {
  const progress = (currentStep / STEPS.length) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              currentStep >= step.id 
                ? `${step.color} text-white shadow-lg scale-110` 
                : 'bg-gray-200 text-gray-400'
            }`}>
              <step.icon className="w-6 h-6" />
            </div>
            <span className={`text-xs mt-2 font-medium ${
              currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default function FileComplaint() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Step 1: User Info
    fullName: "",
    email: "",
    phone: "",
    
    // Step 2: Company
    companyName: "",
    companyId: null,
    companyEmail: "",
    category: "",
    incidentDate: "",
    
    // Step 3: What Happened
    title: "",
    description: "",
    attachments: [],
    
    // Step 4: What You Want
    desiredSolution: "",
    amountInvolved: "",
    
    // Terms
    termsAccepted: false
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const allCompanies = await Company.list("-total_complaints", 500);
        setCompanies(allCompanies);
        
        const user = await User.me();
        if (user) {
          setFormData(prev => ({
            ...prev,
            fullName: user.full_name || "",
            email: user.email || ""
          }));
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (formData.companyName.length > 1) {
      const filtered = companies
        .filter(c => c.name.toLowerCase().includes(formData.companyName.toLowerCase()))
        .slice(0, 5);
      setFilteredCompanies(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.companyName, companies]);

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email) {
        setError("Please fill in your name and email");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.companyName || !formData.category) {
        setError("Please select a company and category");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.title || !formData.description) {
        setError("Please describe what happened");
        return;
      }
    }
    
    setError(null);
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError(null);
  };

  const handleCompanySelect = (company) => {
    setFormData(prev => ({
      ...prev,
      companyName: company.name,
      companyId: company.id
    }));
    setShowSuggestions(false);
  };

  const handleFileUpload = async (files) => {
    if (files.length === 0) return;
    
    try {
      const uploadPromises = Array.from(files).map(file => UploadFile({ file }));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(result => result.file_url);
      
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...urls]
      }));
    } catch (error) {
      setError("Failed to upload files. Please try again.");
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      setError("Please accept the Terms of Service");
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Check if user is logged in
      let user = await User.me().catch(() => null);
      let generatedPassword = null;
      
      if (!user) {
        // Check if user already exists
        try {
          // Try to check if email exists in profiles table
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', formData.email)
            .single();
          
          if (existingProfile) {
            // User exists but not logged in
            setError(`An account with ${formData.email} already exists. Please sign in to file a complaint.`);
            setSubmitting(false);
            return;
          }
        } catch (checkError) {
          // Profile doesn't exist, continue with signup
        }
        
        // Auto-create account with generated password
        generatedPassword = generatePassword();
        
        try {
          const signUpResult = await User.signUp({
            email: formData.email,
            password: generatedPassword,
            full_name: formData.fullName,
            user_type: 'consumer'
          });
          console.log("✅ User signed up:", signUpResult);
          
          // Auto-login after signup
          const signInResult = await User.signIn({ 
            email: formData.email, 
            password: generatedPassword 
          });
          console.log("✅ User signed in:", signInResult);
          
          // Get the newly created user
          user = await User.me();
          console.log("✅ Current user after login:", user);
          
        } catch (signupError) {
          console.error("Auto-signup failed:", signupError);
          // Check if it's a duplicate email error
          if (signupError.message && signupError.message.includes('already registered')) {
            setError(`An account with ${formData.email} already exists. Please sign in to file a complaint.`);
          } else {
            setError("Failed to create account. Please try again or sign up manually.");
          }
          setSubmitting(false);
          return;
        }
      }

      // Find or create company
      let company = companies.find(c => 
        c.name.toLowerCase() === formData.companyName.toLowerCase()
      );
      
      let companyId = formData.companyId;
      if (company) {
        companyId = company.id;
        await Company.update(company.id, {
          total_complaints: (company.total_complaints || 0) + 1
        });
      } else {
        const newCompany = await Company.create({
          name: formData.companyName.trim(),
          slug: slugify(formData.companyName.trim()),
          total_complaints: 1
        });
        companyId = newCompany.id;
      }

      // Create complaint
      const complaintData = {
        title: formData.title,
        description: formData.description,
        desired_solution: formData.desiredSolution,
        category: formData.category,
        company_id: companyId,
        company_name: formData.companyName,
        user_id: user.id,
        user_email: formData.email,
        user_name: formData.fullName,
        user_phone: formData.phone,
        amount_involved: formData.amountInvolved ? parseFloat(formData.amountInvolved) : null,
        incident_date: formData.incidentDate || null,
        attachments: formData.attachments,
        status: "submitted",
        severity: "medium"
      };

      const newComplaint = await Complaint.create(complaintData);
      console.log("✅ Complaint created successfully:", newComplaint);
      console.log("✅ Complaint ID:", newComplaint?.id);
      console.log("✅ User ID in complaint:", newComplaint?.user_id);
      
      // Send notifications
      try {
        // Customer notification with beautiful HTML template
        
        await sendComplaintConfirmation(formData.email, {
          userName: formData.fullName,
          companyName: formData.companyName,
          title: formData.title,
          complaintId: newComplaint.id
        });
        
        // Company notification (if email provided)
        if (formData.companyEmail && formData.companyEmail.trim()) {
          
          await sendCompanyNotification(formData.companyEmail, {
            companyName: formData.companyName,
            title: formData.title,
            category: formData.category,
            amount: formData.amountInvolved,
            description: formData.description,
            complaintId: newComplaint.id
          });
        }
      } catch (emailError) {
        console.error("Email failed:", emailError);
      }

      setSuccess(true);
      console.log("✅ Success state set, will redirect to:", `/ComplaintDetail?id=${newComplaint?.id}`);
      setTimeout(() => {
        console.log("✅ Redirecting now...");
        navigate(`/ComplaintDetail?id=${newComplaint.id}`);
      }, 2000);
      
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit complaint. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
              <p className="text-gray-600 mb-4">
                Your complaint has been received and is under review. We'll notify you of any updates.
              </p>
              <p className="text-sm text-gray-500">Redirecting you to your complaint...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">File a Complaint</h1>
          <p className="text-lg text-gray-600">We'll help you get your voice heard</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form Card */}
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Step 1: User Info */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <UserIcon className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
                  <p className="text-gray-600">We need your contact information</p>
                </div>

                <div>
                  <Label htmlFor="fullName" className="text-base font-semibold">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="John Doe"
                    className="mt-2 h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="mt-2 h-12 text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+1 (555) 123-4567"
                    className="mt-2 h-12 text-lg"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Company */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <Building className="w-16 h-16 text-purple-500 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Which company?</h2>
                  <p className="text-gray-600">Tell us about the business</p>
                </div>

                <div className="relative">
                  <Label htmlFor="company" className="text-base font-semibold">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="Search or type company name"
                    className="mt-2 h-12 text-lg"
                  />
                  {showSuggestions && filteredCompanies.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredCompanies.map(company => (
                        <button
                          key={company.id}
                          onClick={() => handleCompanySelect(company)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                        >
                          <div className="font-medium">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.total_complaints || 0} complaints</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyEmail" className="text-base font-semibold">Company Email (Optional)</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={(e) => setFormData({...formData, companyEmail: e.target.value})}
                    placeholder="support@company.com"
                    className="mt-2 h-12 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">💡 Have the company's email? We'll notify them immediately!</p>
                </div>

                <div>
                  <Label htmlFor="category" className="text-base font-semibold">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="mt-2 h-12 text-lg">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="incidentDate" className="text-base font-semibold">When did this happen? (Optional)</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
                    className="mt-2 h-12 text-lg"
                  />
                </div>
              </div>
            )}

            {/* Step 3: What Happened */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <MessageSquare className="w-16 h-16 text-orange-500 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900">What happened?</h2>
                  <p className="text-gray-600">Tell us your story in detail</p>
                </div>

                <div>
                  <Label htmlFor="title" className="text-base font-semibold">Brief Summary *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Defective product not refunded"
                    className="mt-2 h-12 text-lg"
                    maxLength={100}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.title.length}/100 characters</p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-base font-semibold">What Happened in Detail *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the issue in detail. Include dates, what you purchased, what went wrong, and how the company responded..."
                    className="mt-2 min-h-[200px] text-base"
                    maxLength={5000}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.description.length}/5000 characters</p>
                </div>

                <div>
                  <Label className="text-base font-semibold">Attachments (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium">
                      Click to upload files
                    </label>
                    <p className="text-sm text-gray-500 mt-1">Images or PDF (max 25MB each)</p>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {formData.attachments.map((url, index) => (
                        <div key={index} className="text-sm text-gray-600">✓ File {index + 1} uploaded</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: What You Want */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-6">
                  <Target className="w-16 h-16 text-green-500 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold text-gray-900">What do you want?</h2>
                  <p className="text-gray-600">Tell us your desired outcome</p>
                </div>

                <div>
                  <Label htmlFor="desiredSolution" className="text-base font-semibold">Solution Expected *</Label>
                  <Textarea
                    id="desiredSolution"
                    value={formData.desiredSolution}
                    onChange={(e) => setFormData({...formData, desiredSolution: e.target.value})}
                    placeholder="What would resolve this issue for you? (e.g., Full refund, product replacement, apology, policy change...)"
                    className="mt-2 min-h-[150px] text-base"
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.desiredSolution.length}/1000 characters</p>
                </div>

                <div>
                  <Label htmlFor="amount" className="text-base font-semibold">Amount Involved (Optional)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amountInvolved}
                    onChange={(e) => setFormData({...formData, amountInvolved: e.target.value})}
                    placeholder="$0.00"
                    className="mt-2 h-12 text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-1">How much money is at stake?</p>
                </div>

                <div className="flex items-start space-x-3 pt-4 border-t">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData({...formData, termsAccepted: checked})}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    I confirm that the information provided is accurate and I agree to the{" "}
                    <a href="/Terms" className="text-purple-600 hover:underline">Terms of Service</a> and{" "}
                    <a href="/Privacy" className="text-purple-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              {currentStep < STEPS.length ? (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="ml-auto px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.termsAccepted}
                  size="lg"
                  className="ml-auto px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
