import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Building2, Mail, Phone, Globe } from 'lucide-react';

const ClaimProfile = () => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useLocation();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the claim request
    setLocation('/business/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/images/logo-official.png" alt="ReportHere" className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Claim Your Business Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Verify your ownership to start managing your reputation.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#2C4A3B]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#2C4A3B] bg-green-50' : 'border-gray-300'}`}>1</div>
              <span className="text-xs mt-1 font-medium">Find</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-[#2C4A3B]' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-[#2C4A3B]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#2C4A3B] bg-green-50' : 'border-gray-300'}`}>2</div>
              <span className="text-xs mt-1 font-medium">Verify</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-[#2C4A3B]' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-[#2C4A3B]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-[#2C4A3B] bg-green-50' : 'border-gray-300'}`}>3</div>
              <span className="text-xs mt-1 font-medium">Confirm</span>
            </div>
          </div>

          {step === 1 && (
            <form className="space-y-6" onSubmit={handleNext}>
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input id="company-name" type="text" className="pl-10" placeholder="e.g. Acme Corp" required />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Company Website</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input id="website" type="url" className="pl-10" placeholder="https://example.com" required />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#2C4A3B] hover:bg-[#1e3329]">
                Find My Company
              </Button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleNext}>
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <p className="text-sm text-blue-700">
                  We found <strong>Acme Corp</strong>. To verify ownership, please provide your official business contact details.
                </p>
              </div>

              <div>
                <Label htmlFor="email">Work Email</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input id="email" type="email" className="pl-10" placeholder="you@acmecorp.com" required />
                </div>
                <p className="mt-1 text-xs text-gray-500">Must be a domain matching the company website.</p>
              </div>

              <div>
                <Label htmlFor="phone">Business Phone</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input id="phone" type="tel" className="pl-10" placeholder="+1 (555) 000-0000" required />
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" className="flex-1 bg-[#2C4A3B] hover:bg-[#1e3329]">Verify Identity</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Verification Pending</h3>
                <p className="mt-2 text-sm text-gray-500">
                  We've sent a verification link to <strong>you@acmecorp.com</strong>. Please check your email to complete the process.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md text-left text-sm text-gray-600">
                <p className="font-bold mb-2">What happens next?</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Click the link in your email</li>
                  <li>Set up your password</li>
                  <li>Access your business dashboard immediately</li>
                </ul>
              </div>

              <Button onClick={handleFinish} className="w-full bg-[#2C4A3B] hover:bg-[#1e3329]">
                Go to Dashboard Demo
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClaimProfile;
