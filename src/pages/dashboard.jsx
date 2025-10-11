
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { Loader2 } from 'lucide-react';
import CompanyDashboard from '../components/dashboard/CompanyDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';
import RouteProbe from '../components/debug/RouteProbe';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('loading'); // 'loading', 'company', 'consumer'
  const [viewProps, setViewProps] = useState({});
  
  useEffect(() => {
    let mounted = true;
    const determineView = async () => {
      try {
        const currentUser = await User.me();
        if (!mounted) return;
        
        const role = currentUser.user_type?.toLowerCase();

        if (role === 'admin') {
          navigate(createPageUrl('admin-dashboard'));
        } else if (role === 'business') {
          // Business users are now handled by the dedicated business-dashboard page.
          // This simplifies logic here.
          navigate(createPageUrl('business-dashboard'));
        } else {
          // Default to consumer dashboard
          setView('consumer');
        }

      } catch (error) {
        // Not logged in
        navigate(createPageUrl('Home'));
      }
    };
    determineView();
    return () => { mounted = false; };
  }, [navigate]);

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
      </div>
    );
  }
  
  // This will now only render the UserDashboard, as business users are redirected.
  return <UserDashboard />;
}
