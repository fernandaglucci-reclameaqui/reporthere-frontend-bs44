import React from "react";
import { SentimentIcon } from '@/components/ui/SentimentIcon';
import { SENTIMENT_TYPES } from '@/constants/sentiment';
import { MessageSquare, Reply, Heart, BarChart3, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            How It Works
          </h1>
          <p className="text-2xl text-gray-700 font-light max-w-3xl mx-auto">
            A simple, clean process designed for humans — not bureaucracy.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Step 1 */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-10 h-10 text-emerald-600" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-emerald-600">1</span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    A Customer Shares Their Experience
                  </h2>
                </div>
                <p className="text-xl text-gray-700 mb-4">
                  Anyone can post a complaint or feedback about a business, big or small.
                </p>
                <p className="text-lg text-emerald-600 font-semibold">
                  Fast, free, clear, nothing complicated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <Reply className="w-10 h-10 text-blue-600" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-blue-600">2</span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    The Business Responds
                  </h2>
                </div>
                <p className="text-xl text-gray-700 mb-4">
                  Companies receive the message instantly and can reply, fix the problem, or follow up.
                </p>
                <div className="space-y-2 text-lg text-gray-600">
                  <p>
                    <strong className="text-gray-900">For small businesses,</strong> this is often the moment where trust is restored.
                  </p>
                  <p>
                    <strong className="text-gray-900">For big companies,</strong> this replaces chaos with clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3 - Customer Rates */}
        <section>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-purple-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <Heart className="w-10 h-10 text-rose-600" strokeWidth={2} fill="currentColor" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-purple-600">3</span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    The Customer Rates How They Felt
                  </h2>
                </div>
                <p className="text-xl text-gray-700 mb-6">
                  After the issue is resolved, the customer selects one of our 5 emotion icons — the heart of <strong>Customer Karma</strong>:
                </p>
                
                {/* Sentiment Icons */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                  <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border-2 border-green-200">
                    <SentimentIcon sentiment={SENTIMENT_TYPES.NAILED_IT} size="lg" className="mb-2" />
                    <p className="text-sm font-bold text-gray-900">Green</p>
                    <p className="text-xs text-gray-600">Loved it</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border-2 border-yellow-200">
                    <SentimentIcon sentiment={SENTIMENT_TYPES.MEH} size="lg" className="mb-2" />
                    <p className="text-sm font-bold text-gray-900">Yellow</p>
                    <p className="text-xs text-gray-600">Okay</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border-2 border-orange-200">
                    <SentimentIcon sentiment={SENTIMENT_TYPES.UH_OH} size="lg" className="mb-2" />
                    <p className="text-sm font-bold text-gray-900">Orange</p>
                    <p className="text-xs text-gray-600">Could've been better</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border-2 border-red-200">
                    <SentimentIcon sentiment={SENTIMENT_TYPES.DISAPPOINTING} size="lg" className="mb-2" />
                    <p className="text-sm font-bold text-gray-900">Red</p>
                    <p className="text-xs text-gray-600">Disappointed</p>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur rounded-xl p-4 text-center border-2 border-purple-200">
                    <SentimentIcon sentiment={SENTIMENT_TYPES.IGNORED} size="lg" className="mb-2" />
                    <p className="text-sm font-bold text-gray-900">Purple</p>
                    <p className="text-xs text-gray-600">Ignored</p>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mt-6 text-center">
                  This reveals the <strong className="text-purple-600">real emotional outcome</strong> — not just a rating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4 - Customer Karma Updates */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-10 h-10 text-amber-600" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-amber-600">4</span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Customer Karma Updates Automatically
                  </h2>
                </div>
                <p className="text-xl text-gray-700 mb-6">
                  Our system calculates:
                </p>
                <ul className="space-y-3 text-lg text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-500 text-2xl mr-3">✓</span>
                    <span>positive vs negative experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 text-2xl mr-3">✓</span>
                    <span>trends over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 text-2xl mr-3">✓</span>
                    <span>reputation patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 text-2xl mr-3">✓</span>
                    <span>areas where the business shines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 text-2xl mr-3">✓</span>
                    <span>areas where improvement is needed</span>
                  </li>
                </ul>
                <p className="text-lg text-amber-600 font-semibold mt-6">
                  Everything shows up beautifully on the company's dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5 - Businesses Improve */}
        <section>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-emerald-600" strokeWidth={2} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-emerald-600">5</span>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Businesses Improve — Customers Stay
                  </h2>
                </div>
                <p className="text-xl text-gray-700 mb-6">
                  When companies see how people actually feel, they stop guessing and start growing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold text-gray-900">Better service.</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold text-gray-900">Better reputation.</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                    <p className="text-2xl font-bold text-gray-900">Better relationships.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="text-center py-12">
          <div className="bg-white rounded-2xl p-12 shadow-lg border-2 border-emerald-200">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join ReportHere today and experience a better way to handle customer feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/file-complaint" 
                className="px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-lg hover:bg-emerald-700 transition-colors"
              >
                File a Complaint
              </a>
              <a 
                href="/business-signup" 
                className="px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-colors"
              >
                For Businesses
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
