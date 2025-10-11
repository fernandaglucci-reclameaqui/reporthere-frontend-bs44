import React, { useEffect, useState } from 'react';
import { User } from '@/api/entities';
import { Complaint } from '@/api/entities';
import { Company } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BriefcaseBusiness, Users, FileText, Building2, UploadCloud, Send } from 'lucide-react';

const StatCard = ({ title, value, icon, link }) => (
  <Link to={link}>
    <Card className="hover:bg-gray-50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  </Link>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, complaints: 0, companies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userCount, complaintCount, companyCount] = await Promise.all([
          User.list(null, 1).then(res => res.total),
          Complaint.list(null, 1).then(res => res.total),
          Company.list(null, 1).then(res => res.total),
        ]);
        setStats({ users: userCount, complaints: complaintCount, companies: companyCount });
      } catch (error) {
        console.error("Failed to load admin stats:", error);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BriefcaseBusiness className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatCard
            title="Total Users"
            value={loading ? '...' : stats.users}
            icon={<Users className="h-5 w-5 text-muted-foreground" />}
            link="#" // Link to a future user management page
          />
          <StatCard
            title="Total Complaints"
            value={loading ? '...' : stats.complaints}
            icon={<FileText className="h-5 w-5 text-muted-foreground" />}
            link={createPageUrl('complaints')}
          />
          <StatCard
            title="Total Companies"
            value={loading ? '...' : stats.companies}
            icon={<Building2 className="h-5 w-5 text-muted-foreground" />}
            link={createPageUrl('companies')}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
                title="Data Import"
                value="Upload"
                icon={<UploadCloud className="h-5 w-5 text-muted-foreground" />}
                link={createPageUrl('data-import')}
            />
             <StatCard
                title="Run Notifications"
                value="Execute"
                icon={<Send className="h-5 w-5 text-muted-foreground" />}
                link={createPageUrl('run-notifications')}
            />
             <StatCard
                title="Moderation"
                value="Queue"
                icon={<FileText className="h-5 w-5 text-muted-foreground" />}
                link={createPageUrl('ModerationQueue')}
            />
        </div>
      </div>
    </div>
  );
}