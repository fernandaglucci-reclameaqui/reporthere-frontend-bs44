import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { 
  ArrowLeft, 
  Shield,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CompanyPicker from "../components/business/CompanyPicker";
import ClaimCompanyForm from "../components/business/ClaimCompanyForm";

export default function ClaimWizard() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const companyId = urlParams.get('company_id');
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      // Redirect to login if not authenticated
      await User.loginWithRedirect(window.location.href);
      return;
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(createPageUrl("Home"))}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Claim Your Business Profile</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take control of your business reputation. Verify your company profile to respond to complaints, 
              update business information, and show customers you care about their feedback.
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {companyId ? (
                <>
                  <Building2 className="w-5 h-5" />
                  Verify Your Business
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5" />
                  Find Your Business
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {companyId ? (
              <ClaimCompanyForm companyId={companyId} />
            ) : (
              <CompanyPicker />
            )}
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Build Trust</h3>
            <p className="text-gray-600 text-sm">
              Verified businesses gain customer confidence with our trust badge and verified status.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Respond Faster</h3>
            <p className="text-gray-600 text-sm">
              Access our Business Dashboard to respond to complaints quickly and professionally.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Control Your Reputation</h3>
            <p className="text-gray-600 text-sm">
              Keep your business information accurate and show customers you're committed to quality service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}