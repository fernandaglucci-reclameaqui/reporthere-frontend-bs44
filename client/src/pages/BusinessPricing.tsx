import React from 'react';
import { Link } from 'wouter';
import { Check, X, Building2, ShieldCheck, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const BusinessPricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Hero Section */}
      <div className="bg-[#2C4A3B] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Claim Your Business Profile</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Take control of your reputation. Respond to reviews, analyze customer sentiment, and build trust.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 -mt-16 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Free</h3>
              <p className="text-gray-500 mt-2">Essential tools to manage your presence.</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Claim your company profile</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Receive complaint notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Publicly respond to reviews</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                <span className="text-gray-400">Advanced analytics dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                <span className="text-gray-400">Dedicated success manager</span>
              </li>
            </ul>

            <Link href="/business/signup?plan=free">
              <Button variant="outline" className="w-full py-6 text-lg font-bold border-2 border-gray-200 hover:border-[#2C4A3B] hover:text-[#2C4A3B]">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#2C4A3B] relative flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2C4A3B] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
              Most Popular
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
              <p className="text-gray-500 mt-2">For growing businesses building trust.</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">$49</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Everything in Free</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Advanced Analytics Dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Competitor benchmarking</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">"Verified Business" badge</span>
              </li>
            </ul>

            <Link href="/business/signup?plan=pro">
              <Button className="w-full py-6 text-lg font-bold bg-[#2C4A3B] hover:bg-[#1e3329] text-white shadow-lg">
                Start 14-Day Trial
              </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
              <p className="text-gray-500 mt-2">Custom solutions for large organizations.</p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Everything in Professional</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">API Access</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Dedicated Account Manager</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">Custom integration support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-gray-600">SSO & Advanced Security</span>
              </li>
            </ul>

            <Link href="/contact">
              <Button variant="outline" className="w-full py-6 text-lg font-bold border-2 border-gray-200 hover:border-[#2C4A3B] hover:text-[#2C4A3B]">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Claim Your Profile?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Managing your reputation isn't just about damage control. It's about building a brand that customers trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-700">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Official Presence</h3>
            <p className="text-gray-600">
              Ensure your company information, logo, and contact details are accurate and up-to-date.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-700">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Build Trust</h3>
            <p className="text-gray-600">
              Show customers you care by responding to feedback and resolving issues publicly.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-700">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Data Insights</h3>
            <p className="text-gray-600">
              Understand what customers really think with sentiment analysis and trend tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPricing;
