import { useState } from "react";
import BusinessLayout from "@/components/BusinessLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Star, 
  AlertCircle,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { cn } from "@/lib/utils";
import companiesData from "../data/companies.json";

// Mock Data for Chart
const data = [
  { name: "Mon", complaints: 4 },
  { name: "Tue", complaints: 3 },
  { name: "Wed", complaints: 7 },
  { name: "Thu", complaints: 2 },
  { name: "Fri", complaints: 5 },
  { name: "Sat", complaints: 8 },
  { name: "Sun", complaints: 4 },
];

export default function BusinessDashboard() {
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Simulate using the first company from our data source as the "current user's company"
  const currentCompany = companiesData[0]; // Amazon for demo purposes

  return (
    <BusinessLayout>
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, here's what's happening with your business.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowTutorial(true)}>
            Start Tutorial
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Invite Team Member
          </Button>
        </div>
      </div>

      {/* Tutorial Banner (Req #1) */}
      {showTutorial && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8 relative">
          <button 
            onClick={() => setShowTutorial(false)}
            className="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800"
          >
            <span className="sr-only">Dismiss</span>
            ×
          </button>
          <div className="flex gap-4">
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900 text-lg mb-1">Getting Started with ReportHere</h3>
              <p className="text-emerald-700 mb-4 max-w-2xl">
                Learn how to manage your reputation, respond to complaints, and use AI insights to improve your business.
                Take our quick 6-step tour to master the dashboard.
              </p>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700">
                Begin Tour
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          title="Reputation Score" 
          value={`${currentCompany.score}/10.0`}
          trend={currentCompany.trend === 'up' ? '+0.2' : '-0.1'}
          trendUp={currentCompany.trend === 'up'}
          icon={Star}
          color="text-yellow-500"
          bg="bg-yellow-50"
        />
        <MetricCard 
          title="Profile Views" 
          value={currentCompany.views.toLocaleString()}
          trend="+12%" 
          trendUp={true}
          icon={Users}
          color="text-blue-500"
          bg="bg-blue-50"
        />
        <MetricCard 
          title="Unresolved Issues" 
          value={Math.round(currentCompany.complaints * 0.05).toString()} 
          trend="-2" 
          trendUp={true} // Good that it went down
          icon={AlertCircle}
          color="text-red-500"
          bg="bg-red-50"
        />
        <MetricCard 
          title="Response Rate" 
          value={`${currentCompany.responseRate}%`}
          trend="+1%" 
          trendUp={true}
          icon={MessageSquare}
          color="text-emerald-500"
          bg="bg-emerald-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Volume (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="complaints" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorComplaints)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-medium text-gray-600 text-sm">JD</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-900">Shipping Delay on Order #12345</h4>
                        <span className="text-xs text-gray-500">2h ago</span>
                      </div>
                      
                      {/* AI Summarization Stub (Req #4) */}
                      <div className="bg-slate-50 p-2 rounded-md mb-2 border border-slate-100">
                        <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 text-indigo-500" /> 
                          <span className="font-semibold text-indigo-600">AI Summary:</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Customer is frustrated due to a 3-day delay in express shipping. Requesting immediate refund of shipping fees.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {/* AI Categorization Stub (Req #2) */}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          <Star className="h-3 w-3 mr-1" />
                          Category: Shipping
                        </span>
                        
                        {/* AI Severity Flagging Stub (Req #3) */}
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Severity: High
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Action Required */}
          <Card className="bg-red-50 border-red-100">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Action Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                  <p className="text-sm font-medium text-gray-900 mb-1">Unresolved Complaint</p>
                  <p className="text-xs text-gray-500 mb-2">Ticket #8821 • 2 days overdue</p>
                  <Button size="sm" variant="destructive" className="w-full h-8 text-xs">
                    Respond Now
                  </Button>
                </div>
                <div className="bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                  <p className="text-sm font-medium text-gray-900 mb-1">Negative Review Spike</p>
                  <p className="text-xs text-gray-500 mb-2">3 new 1-star reviews today</p>
                  <Button size="sm" variant="outline" className="w-full h-8 text-xs border-red-200 text-red-700 hover:bg-red-50">
                    Analyze
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-indigo-50 border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900 flex items-center gap-2">
                <Star className="h-5 w-5" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-indigo-800 mb-4">
                We've noticed a trend in "Shipping" complaints. 
                Consider updating your delivery estimates.
              </p>
              <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </BusinessLayout>
  );
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, color, bg }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2 rounded-lg", bg)}>
            <Icon className={cn("h-5 w-5", color)} />
          </div>
          <div className={cn(
            "flex items-center text-xs font-medium px-2 py-1 rounded-full",
            trendUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          )}>
            {trendUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {trend}
          </div>
        </div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </CardContent>
    </Card>
  );
}
