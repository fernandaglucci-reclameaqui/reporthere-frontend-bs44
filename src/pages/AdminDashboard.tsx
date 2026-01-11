import React from 'react';
import { Link } from 'wouter';
import { Users, Building2, MessageSquareWarning, TrendingUp, AlertTriangle, CheckCircle, Search, PenTool } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo-official.png" alt="ReportHere" className="h-8 w-auto" />
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search users, companies..." 
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C4A3B]"
              />
            </div>
            <div className="h-8 w-8 bg-[#2C4A3B] rounded-full flex items-center justify-center text-white font-bold text-sm">
              AD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-[calc(100vh-64px)] border-r border-gray-200 hidden md:block sticky top-16">
          <nav className="p-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-green-50 text-[#2C4A3B] rounded-lg font-medium">
              <TrendingUp className="w-5 h-5" />
              Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              <MessageSquareWarning className="w-5 h-5" />
              Complaints <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">12</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              <Building2 className="w-5 h-5" />
              Companies
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              <Users className="w-5 h-5" />
              Users
            </a>
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
              <PenTool className="w-5 h-5" />
              Site Editor
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                Settings
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
            <div className="flex gap-2">
              <Button variant="outline">Export Data</Button>
              <Button className="bg-[#2C4A3B] hover:bg-[#1e3329]">Invite Admin</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Complaints</h3>
                <MessageSquareWarning className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">1,248</div>
              <div className="text-green-600 text-sm font-medium mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +12% this week
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Active Companies</h3>
                <Building2 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">342</div>
              <div className="text-green-600 text-sm font-medium mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +5 new today
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Pending Verification</h3>
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900">8</div>
              <div className="text-gray-500 text-sm font-medium mt-1">
                Requires action
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                <div className="text-green-600 font-bold">$</div>
              </div>
              <div className="text-3xl font-bold text-gray-900">$12.4k</div>
              <div className="text-green-600 text-sm font-medium mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" /> +8% vs last month
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Complaints */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Recent Complaints</h3>
                <Link href="/admin/complaints" className="text-sm text-[#2C4A3B] font-medium hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-gray-100">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 font-bold text-gray-500">
                      U{i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Package never arrived despite "delivered" status
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Filed against <span className="font-medium text-gray-700">Amazon</span> • 2 hours ago
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Verifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Pending Verifications</h3>
                <Link href="/admin/verifications" className="text-sm text-[#2C4A3B] font-medium hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">TechStart Inc.</p>
                        <p className="text-xs text-gray-500">Requested by John Doe</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">Reject</Button>
                      <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white">Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
