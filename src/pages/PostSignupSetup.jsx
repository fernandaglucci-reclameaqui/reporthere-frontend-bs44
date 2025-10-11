import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';

export default function PostSignupSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Finalizing your account setup...");

  useEffect(() => {
    const setupUser = async () => {
      try {
        const user = await User.me();
        
        // Check if the user is new (created in the last 2 minutes)
        const isNewUser = new Date() - new Date(user.created_date) < 120000;

        if (isNewUser && !user.user_type || user.user_type === 'consumer') {
          const params = new URLSearchParams(location.search);
          const role = params.get('role');

          if (role === 'business' || role === 'consumer') {
            setMessage(`Setting your role to ${role}...`);
            await User.updateMyUserData({ user_type: role });
            
            if (role === 'business') {
              setMessage("Redirecting you to the business claim page...");
              navigate(createPageUrl('ClaimWizard'));
            } else {
              setMessage("Redirecting you to the home page...");
              navigate(createPageUrl('Home'));
            }
          } else {
            // Default to home if role is invalid
             navigate(createPageUrl('Home'));
          }
        } else {
          // User is not new, or already has a non-consumer role, just redirect
           navigate(createPageUrl('Home'));
        }
      } catch (error) {
        // Not logged in, redirect to login
        setMessage("You're not logged in. Redirecting...");
        await User.loginWithRedirect(window.location.href);
      }
    };

    setupUser();
  }, [navigate, location.search]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-6"></div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Please wait</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}