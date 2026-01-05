import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Heart, Users, TrendingUp, Shield, Zap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function ForBusinesses() {
  const benefits = [
    {
      icon: BarChart3,
      title: "Your Reputation, All in One Place",
      description: "Monitor complaints, feedback, and emotional sentiment in a clean, intuitive dashboard."
    },
    {
      icon: Heart,
      title: "Customer Karma™ Insights",
      description: "See how people felt across five emotional categories. Understand what's working — and what isn't — instantly."
    },
    {
      icon: Shield,
      title: "Fair for Small and Big Businesses",
      description: "The same tools for everyone. Designed for solo cleaners, contractors, boutiques, restaurants, franchises, and large enterprise operations."
    }
  ];

  const emotions = [
    { color: "bg-green-500", label: "Green — Loved you" },
    { color: "bg-yellow-500", label: "Yellow — Neutral" },
    { color: "bg-orange-500", label: "Orange — Not great" },
    { color: "bg-red-500", label: "Red — Negative" },
    { color: "bg-purple-500", label: "Purple — Unresponded/Ignored" }
  ];

  const features = [
    "Transparent public reputation",
    "Tools to resolve problems quickly",
    "Emotional sentiment analytics",
    "Clean, modern interface",
    "Stronger customer relationships",
    "Insight into what people feel — not just what they say"
  ];

  const plans = [
    {
      name: "Free Plan",
      features: [
        "Receive unlimited complaints",
        "View all complaints",
        "View basic stats",
        "Reply to 2 complaints per month"
      ]
    },
    {
      name: "Paid Plans",
      features: [
        "Reply to all complaints",
        "Advanced analytics",
        "Sentiment reports",
        "SLA metrics"
      ]
    }
  ];

  const steps = [
    "Claim your business profile",
    "Access your dashboard",
    "View new complaints",
    "Respond publicly or privately",
    "Improve Customer Karma with better service and communication"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            For Businesses
          </h1>
          <p className="text-2xl text-gray-700 font-light mb-2">
            Build trust. Improve faster. Show customers you're listening.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ReportHere gives businesses a modern, transparent, and powerful way to understand customer sentiment and respond publicly — without the chaos of traditional complaint systems.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Why Join ReportHere */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Join ReportHere?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <benefit.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Karma */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-purple-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Customer Karma™ Insights
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            See how people felt across five emotional categories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {emotions.map((emotion, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <div className={`w-12 h-12 ${emotion.color} rounded-full mx-auto mb-3`}></div>
                <p className="text-sm font-medium text-gray-700">
                  {emotion.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Plans */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Pricing Plans
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {plan.name}
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What You Get With ReportHere
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Final Message */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 text-center border border-blue-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Marketplace Has Changed
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            Today, customers expect transparency, honesty, and accountability. Reporting platforms are no longer a threat — they're an opportunity.
          </p>
          <p className="text-2xl font-semibold text-blue-600 mb-2">
            When businesses listen, they grow.
          </p>
          <p className="text-2xl font-semibold text-blue-600 mb-8">
            When customers feel heard, they stay.
          </p>
          <Link to={createPageUrl('ClaimProfile')}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4">
              <Building2 className="w-5 h-5 mr-2" />
              Claim Your Business Profile
            </Button>
          </Link>
        </section>

      </main>
    </div>
  );
}
