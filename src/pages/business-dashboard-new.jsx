import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from "@/api/entities";
import { Company } from "@/api/entities";
import { supabase } from '@/api/supabaseClient';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Briefcase, TrendingUp, Users, Clock, Award, CheckCircle, Target, Sparkles } from "lucide-react";
import MetricCard, { MetricValue } from '@/components/dashboard/MetricCard';
import EmptyChartCard from '@/components/dashboard/EmptyChartCard';
import CustomerKarmaCard from '@/components/dashboard/CustomerKarmaCard';

/**
 * Beautiful Business Dashboard with proper N/A handling and colorful design
 */
export default function BeautifulBusinessDashboard() {
  const [view, setView] = useState("loading");
  const [metrics, setMetrics] = useState(null);
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const currentUser = await User.me();
      
      if (currentUser.user_type !== 'business' || !currentUser.companies_claimed?.length) {
        setView("wrong_user");
        return;
      }
      
      const companyId = currentUser.companies_claimed[0];
      
      // Fetch company details
      const companyData = await Company.get(companyId);
      setCompany(companyData);

      // Call Supabase RPC function for metrics
      const { data, error: rpcError } = await supabase.rpc('get_company_dashboard_metrics', {
        p_company_id: companyId
      });

      if (rpcError) {
        console.error('RPC Error:', rpcError);
        // Fallback to manual calculation if RPC not available yet
        setMetrics(await calculateMetricsManually(companyId));
      } else {
        setMetrics(data);
      }

      setView("dashboard");
    } catch (err) {
      console.error("Dashboard loading failed:", err);
      setError(err.message);
      setView("error");
    }
  };

  // Fallback manual calculation (temporary until RPC is deployed)
  const calculateMetricsManually = async (companyId) => {
    // This will be replaced by RPC call once deployed
    return {
      totalComplaints: 0,
      openComplaints: 0,
      resolvedAll: 0,
      resolved30d: 0,
      resolutionRate: null,
      avgFirstResponseSeconds: null,
      ratingCount: 0,
      lovedScore: null,
      slaHours: 24,
      slaEligibleCount: 0,
      slaMet: null
    };
  };

  // Generate Quick Insight based on metrics
  const getQuickInsight = () => {
    if (!metrics) return null;

    // No complaints yet - show onboarding tip
    if (metrics.totalComplaints === 0) {
      return {
        type: "onboarding",
        icon: Sparkles,
        color: "purple",
        title: "Welcome to Your Dashboard!",
        message: "No complaints yet. Set up your support email and SLA targets to be ready when customers reach out.",
        action: "Get Started"
      };
    }

    // SLA issues
    if (metrics.slaMet !== null && metrics.slaMet < 0.8) {
      return {
        type: "warning",
        icon: Clock,
        color: "orange",
        title: "Action Needed: SLA Performance",
        message: `You're meeting SLA on ${Math.round(metrics.slaMet * 100)}% of cases. Speed up first responses to improve.`,
        action: "View Details"
      };
    }

    // Low resolution rate
    if (metrics.resolutionRate !== null && metrics.resolutionRate < 0.6) {
      return {
        type: "warning",
        icon: Target,
        color: "red",
        title: "Low Resolution Rate",
        message: `Only ${Math.round(metrics.resolutionRate * 100)}% of complaints are resolved. Prioritize closing cases.`,
        action: "View Open Cases"
      };
    }

    // Low customer satisfaction
    if (metrics.lovedScore !== null && metrics.lovedScore < 0.7) {
      return {
        type: "warning",
        icon: Users,
        color: "orange",
        title: "Customer Satisfaction Needs Attention",
        message: `Loved Score is ${Math.round(metrics.lovedScore * 100)}%. Improve follow-up and resolution quality.`,
        action: "See Feedback"
      };
    }

    // All good!
    return {
      type: "success",
      icon: Award,
      color: "green",
      title: "Great Job! 🎉",
      message: "Your metrics look healthy. Keep up the excellent customer service!",
      action: null
    };
  };

  // Loading state
  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading Your Beautiful Dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Preparing your metrics ✨</p>
        </div>
      </div>
    );
  }

  // Wrong user type
  if (view === 'wrong_user') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-lg text-center shadow-2xl border-2 border-purple-200">
          <CardContent className="p-10">
            <Briefcase className="w-16 h-16 mx-auto text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Business Dashboard</h2>
            <p className="text-gray-600 mt-3 mb-6">This dashboard is for business accounts. Your account is currently a consumer account.</p>
            <Link to={createPageUrl("dashboard")}>
              <Button className="bg-purple-600 hover:bg-purple-700">Go to Consumer Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (view === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="max-w-lg text-center shadow-2xl border-2 border-red-200">
          <CardContent className="p-10">
            <AlertTriangle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Oops! Something Went Wrong</h2>
            <p className="text-gray-600 mt-3 mb-6">{error || "Could not load dashboard data."}</p>
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const insight = getQuickInsight();
  const InsightIcon = insight?.icon || Sparkles;

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 border-b-2 border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Your Dashboard
              </h1>
              {company && (
                <p className="text-sm text-gray-600 mt-1">{company.name}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full border-2 border-purple-200 hover:bg-purple-50">
                Export Data
              </Button>
              <Link to={createPageUrl("billing")}>
                <Button className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Quick Insight Banner */}
        {insight && (
          <Card className={`border-2 ${
            insight.color === 'green' ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' :
            insight.color === 'orange' ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50' :
            insight.color === 'red' ? 'border-red-200 bg-gradient-to-r from-red-50 to-rose-50' :
            'border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50'
          } shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    insight.color === 'green' ? 'bg-green-100' :
                    insight.color === 'orange' ? 'bg-orange-100' :
                    insight.color === 'red' ? 'bg-red-100' :
                    'bg-purple-100'
                  }`}>
                    <InsightIcon className={`w-8 h-8 ${
                      insight.color === 'green' ? 'text-green-600' :
                      insight.color === 'orange' ? 'text-orange-600' :
                      insight.color === 'red' ? 'text-red-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                  </div>
                </div>
                {insight.action && (
                  <Button variant="outline" className="rounded-full">
                    {insight.action}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Complaints"
            value={MetricValue.number(metrics?.totalComplaints || 0)}
            subtitle="All time"
            icon={Users}
            color="blue"
          />
          
          <MetricCard
            title="Open Complaints"
            value={MetricValue.number(metrics?.openComplaints || 0)}
            subtitle="Needs attention"
            icon={AlertTriangle}
            color="orange"
          />
          
          <MetricCard
            title="Resolved (30d)"
            value={MetricValue.number(metrics?.resolved30d || 0)}
            subtitle="Last 30 days"
            icon={CheckCircle}
            color="green"
          />
          
          <MetricCard
            title="Resolution Rate"
            value={metrics?.resolutionRate !== null ? 
              MetricValue.percent(metrics.resolutionRate) : 
              MetricValue.na("No data yet")
            }
            subtitle={metrics?.totalComplaints > 0 ? "All time" : "Need complaints first"}
            icon={Target}
            color="purple"
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Loved Score"
            value={metrics?.lovedScore !== null ? 
              MetricValue.percent(metrics.lovedScore) : 
              MetricValue.na("No ratings yet")
            }
            subtitle={metrics?.ratingCount > 0 ? 
              `Based on ${metrics.ratingCount} rating${metrics.ratingCount !== 1 ? 's' : ''}` : 
              "Customers haven't rated yet"
            }
            icon={Award}
            color="pink"
          />
          
          <MetricCard
            title="Avg Response Time"
            value={metrics?.avgFirstResponseSeconds !== null ? 
              MetricValue.duration(metrics.avgFirstResponseSeconds) : 
              MetricValue.na("No responses yet")
            }
            subtitle="First company reply"
            icon={Clock}
            color="blue"
          />
          
          <MetricCard
            title="SLA Met (30d)"
            value={metrics?.slaMet !== null ? 
              MetricValue.percent(metrics.slaMet) : 
              MetricValue.na("No eligible cases")
            }
            subtitle={metrics?.slaEligibleCount > 0 ? 
              `${metrics.slaEligibleCount} case${metrics.slaEligibleCount !== 1 ? 's' : ''} evaluated` : 
              `Target: ${metrics?.slaHours || 24}h`
            }
            icon={TrendingUp}
            color={metrics?.slaMet !== null && metrics.slaMet >= 0.8 ? "green" : "orange"}
          />
        </div>

        {/* Customer Karma Section */}
        {metrics?.totalComplaints > 0 ? (
          <CustomerKarmaCard karmaData={{
            customerKarma: metrics.lovedScore !== null ? Math.round(metrics.lovedScore * 100) : 0,
            sentimentCounts: {
              green: 0, // These would come from actual data
              yellow: 0,
              orange: 0,
              red: 0,
              purple: 0
            },
            sentimentPercentages: {
              green: 0,
              yellow: 0,
              orange: 0,
              red: 0,
              purple: 0
            },
            total: metrics.ratingCount || 0,
            reputationSeal: metrics.lovedScore >= 0.8 ? 'HIGHLY_RECOMMENDED' : 
                           metrics.lovedScore >= 0.6 ? 'RECOMMENDED' : 'NEEDS_IMPROVEMENT'
          }} />
        ) : (
          <EmptyChartCard
            title="Customer Karma"
            hint="No customer feedback yet. Resolve complaints to start collecting ratings!"
            iconType="pie"
          />
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmptyChartCard
            title="Opened vs Resolved (Weekly)"
            hint={metrics?.totalComplaints === 0 ? 
              "No complaints yet. Your chart will appear here once you start receiving complaints." :
              "Chart coming soon! We're preparing your data visualization."
            }
            iconType="bar"
          />
          
          <EmptyChartCard
            title="Cases by Status"
            hint={metrics?.totalComplaints === 0 ? 
              "No cases to display yet." :
              "Status breakdown coming soon!"
            }
            iconType="pie"
          />
        </div>

        {/* Onboarding CTA (only show if no complaints) */}
        {metrics?.totalComplaints === 0 && (
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <Sparkles className="w-16 h-16 mx-auto text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Set up your company profile, add your support email, and configure SLA targets 
                to be ready when your first customer reaches out!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">
                  Complete Profile Setup
                </Button>
                <Button variant="outline" className="rounded-full border-2 border-purple-200">
                  Set SLA Targets
                </Button>
                <Button variant="outline" className="rounded-full border-2 border-purple-200">
                  Preview Public Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
