import React, { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Star, Shield, AlertCircle, ThumbsUp, ThumbsDown, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import companies, { Company } from '../data/companies';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CompanyProfile = () => {
  const [match, params] = useRoute("/company/:id");
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (params?.id) {
      // Find company by ID or Name (slug)
      const found = companies.find(c => 
        c.id === params.id || 
        c.name.toLowerCase().replace(/\s+/g, '-') === params.id
      );
      setCompany(found || null);
    }
  }, [params]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Company Not Found</h2>
          <p className="text-gray-500 mt-2">We couldn't find the company you're looking for.</p>
          <Link href="/search">
            <Button className="mt-4">Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      {/* Header / Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-4">
              <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full uppercase tracking-wide">
                  {company.category}
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{company.complaints} complaints</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Avg. response: 24h</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Verified Company</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getScoreColor(company.score)}`}>
                <span className="text-2xl font-bold">{company.score}</span>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-bold uppercase opacity-80">Reputation</span>
                  <span className="text-xs opacity-80">/ 10</span>
                </div>
              </div>
              <Link href={`/file-complaint?company=${encodeURIComponent(company.name)}`}>
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                  File a Complaint
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Performance Overview</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium text-gray-900">{company.responseRate}%</span>
                </div>
                <Progress value={company.responseRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Resolution Rate</span>
                  <span className="font-medium text-gray-900">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Would Buy Again</span>
                  <span className="font-medium text-gray-900">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">About {company.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {company.name} is a leading provider in the {company.category} sector. 
              They have been registered on ReportHere since 2024 and actively manage their customer reputation.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="#" className="text-sm text-green-600 hover:underline font-medium">Visit Official Website &rarr;</a>
            </div>
          </div>
        </div>

        {/* Right Column: Complaints Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Complaints</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Most Recent</Button>
              <Button variant="ghost" size="sm">Unanswered</Button>
            </div>
          </div>

          {/* Mock Complaints List */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Order never arrived and no refund</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>São Paulo, SP</span>
                    <span>•</span>
                    <span>2 days ago</span>
                    <span>•</span>
                    <span className="text-gray-400">ID: #9823{i}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded border border-yellow-100">
                  Pending
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                I placed an order over two weeks ago and the tracking status hasn't updated since. 
                I've tried contacting support multiple times but only get automated responses. 
                This is unacceptable service for such a large company...
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="w-3 h-3" /> Helpful (12)
                  </button>
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <MessageSquare className="w-3 h-3" /> Comments (2)
                  </button>
                </div>
                <Link href={`/complaint/9823${i}`}>
                  <span className="text-sm text-green-600 font-medium hover:underline cursor-pointer">Read full story</span>
                </Link>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-4">
            <Button variant="outline" className="w-full">Load More Complaints</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
