import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';

export default function ChooseProfile() {
  const navigate = useNavigate();

  const handleSignup = async (role) => {
    // The post-signup page will handle setting the role after login
    const redirectUrl = window.location.origin + createPageUrl(`PostSignupSetup?role=${role}`);
    await User.loginWithRedirect(redirectUrl);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose your profile</h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Select whether you're here to share your consumer experiences or to manage your business's reputation.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card 
            className="text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleSignup('consumer')}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Consumer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                I want to file complaints, write reviews, and track my cases to help improve customer service.
              </CardDescription>
              <Button className="w-full">
                Join as a Consumer
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleSignup('business')}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Business</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>
                I want to respond to customer feedback, manage my company’s reputation, and build trust.
              </CardDescription>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Join as a Business
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}