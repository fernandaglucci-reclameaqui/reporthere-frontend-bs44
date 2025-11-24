import React from 'react';
import { MessageSquare, Clock, Eye, Heart, TrendingUp } from 'lucide-react';

export default function ForConsumers() {
  const benefits = [
    {
      icon: MessageSquare,
      title: "Your Voice Matters",
      description: "Every complaint helps other consumers make informed decisions and pushes businesses to improve."
    },
    {
      icon: Clock,
      title: "It's Simple and Fast",
      description: "Open a complaint in minutes. No long forms, no complicated steps, no barriers."
    },
    {
      icon: Eye,
      title: "Total Transparency",
      description: "Your experience is displayed exactly as you wrote it — without edits or interference."
    },
    {
      icon: Heart,
      title: "Emotional Feedback That Makes Sense",
      description: "Instead of 5 stars, we use Customer Karma™, a 5-emotion system that expresses how you truly felt."
    },
    {
      icon: TrendingUp,
      title: "Real Responses from Companies",
      description: "Businesses can reply publicly, resolve cases, and improve relationships based on your feedback."
    }
  ];

  const emotions = [
    { color: "bg-green-500", label: "Green — Loved it" },
    { color: "bg-yellow-500", label: "Yellow — Okay" },
    { color: "bg-orange-500", label: "Orange — Not great" },
    { color: "bg-red-500", label: "Red — Pretty bad" },
    { color: "bg-purple-500", label: "Purple — Completely ignored" }
  ];

  const steps = [
    "Search for the business",
    "Click Open Complaint",
    "Create your account",
    "Tell your story",
    "Track responses in your dashboard"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            For Consumers
          </h1>
          <p className="text-2xl text-gray-700 font-light mb-2">
            Speak freely. Be heard. Get real results.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            ReportHere was built to give everyday people a simple, human, and fair way to share their experiences with businesses — without scripts, without confusion, and without being ignored.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Why Use ReportHere */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Use ReportHere?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <benefit.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Karma */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-purple-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Customer Karma™
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
            People don't think in stars. They feel. Our 5-emotion system captures how you truly experienced a business.
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

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-8 text-center">
              If the business resolves your issue, you can mark it as resolved and leave a final emotional rating.
            </p>
          </div>
        </section>

        {/* Power Section */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center border border-emerald-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Experience = Your Power
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Thousands of consumers together create accountability and make the marketplace fairer for everyone.
          </p>
          <a 
            href="/FileComplaint" 
            className="inline-block mt-8 bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-lg"
          >
            File Your First Complaint
          </a>
        </section>

      </main>
    </div>
  );
}
