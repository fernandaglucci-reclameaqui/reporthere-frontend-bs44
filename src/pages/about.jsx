import React from "react";
import { SentimentIcon } from '@/components/ui/SentimentIcon';
import { SENTIMENT_TYPES } from '@/constants/sentiment';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            About Us
          </h1>
          <p className="text-2xl text-gray-700 font-light">
            We Believe Every Voice Deserves to Be Heard
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Opening Story */}
        <section className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ReportHere was born from a simple, frustrating truth:
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              <strong>Customers were speaking — but no one was really listening.</strong>
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Most complaint systems are confusing, slow, or built to protect the company instead of the consumer. On the other side, businesses struggle to understand what customers actually feel. They guess. They react too late. They lose trust, clients, and reputation without even knowing why.
            </p>
            <p className="text-xl text-emerald-600 font-semibold mt-8">
              We created ReportHere to fix that.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              A Better Way to Build Trust
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Our mission is simple: <strong>connect people and businesses through transparency, empathy, and real communication.</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-2xl font-bold text-gray-900">No secrets.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-2xl font-bold text-gray-900">No hidden walls.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-2xl font-bold text-gray-900">No complicated systems.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-8 text-center">
              Just a clean, human way for customers to share their experiences — and for companies to respond, learn, improve, and shine.
            </p>
          </div>
        </section>

        {/* Customer Karma Section with Faces */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              The Heart of Our Platform: Customer Karma
            </h2>
            <p className="text-xl text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              We didn't want another "5-star rating" system that means nothing.
            </p>
            <p className="text-2xl text-emerald-600 font-bold mb-8 text-center">
              People don't think in stars — they feel.
            </p>
            
            {/* Sentiment Faces Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-200">
                <SentimentIcon sentiment={SENTIMENT_TYPES.NAILED_IT} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Green</p>
                <p className="text-sm text-gray-600">They loved it</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 text-center border-2 border-yellow-200">
                <SentimentIcon sentiment={SENTIMENT_TYPES.MEH} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Yellow</p>
                <p className="text-sm text-gray-600">It was okay</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center border-2 border-orange-200">
                <SentimentIcon sentiment={SENTIMENT_TYPES.UH_OH} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Orange</p>
                <p className="text-sm text-gray-600">Not great</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 text-center border-2 border-red-200">
                <SentimentIcon sentiment={SENTIMENT_TYPES.DISAPPOINTING} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Red</p>
                <p className="text-sm text-gray-600">Pretty bad</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center border-2 border-purple-200">
                <SentimentIcon sentiment={SENTIMENT_TYPES.IGNORED} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Purple</p>
                <p className="text-sm text-gray-600">Completely ignored</p>
              </div>
            </div>

            <div className="mt-12 text-center max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                <strong>This is not about judging businesses.</strong>
              </p>
              <p className="text-lg text-gray-700 mb-4">
                It's about understanding emotions — because that's where the truth lives.
              </p>
              <p className="text-xl text-emerald-600 font-semibold">
                When companies know how people feel, they can finally improve what matters.
              </p>
            </div>
          </div>
        </section>

        {/* Built for Everyone Section */}
        <section>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Built for Every Business — Big or Small
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              From the local cleaning lady who wants to keep her clients happy, to national companies managing thousands of customers a day — everyone deserves a fair system, equal visibility, and tools that help them grow.
            </p>
            <p className="text-xl text-gray-900 font-semibold mb-6">
              That's why ReportHere is:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-emerald-500 text-2xl mr-3">✓</span>
                <span className="text-lg text-gray-700">easy to use</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 text-2xl mr-3">✓</span>
                <span className="text-lg text-gray-700">clean and modern</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 text-2xl mr-3">✓</span>
                <span className="text-lg text-gray-700">accessible to small businesses</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 text-2xl mr-3">✓</span>
                <span className="text-lg text-gray-700">powerful enough for enterprise-level operations</span>
              </li>
              <li className="flex items-start md:col-span-2">
                <span className="text-emerald-500 text-2xl mr-3">✓</span>
                <span className="text-lg text-gray-700">built with fairness and transparency as core values</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Promise Section */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-emerald-200">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Promise
            </h2>
            <div className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
              <p className="text-center">
                We're here to make customer feedback <strong>simple, human, and impossible to ignore.</strong>
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900 mb-2">We don't create chaos</p>
                  <p className="text-gray-600">we organize it.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900 mb-2">We don't punish businesses</p>
                  <p className="text-gray-600">we empower them.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <p className="text-xl font-bold text-gray-900 mb-2">We don't silence customers</p>
                  <p className="text-gray-600">we amplify them.</p>
                </div>
              </div>

              <div className="mt-12 text-center space-y-4">
                <p className="text-xl">
                  When people feel heard, <strong className="text-emerald-600">they stay.</strong>
                </p>
                <p className="text-xl">
                  When businesses listen, <strong className="text-emerald-600">they grow.</strong>
                </p>
                <p className="text-xl">
                  And when transparency becomes the rule, <strong className="text-emerald-600">everybody wins.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="text-center py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to ReportHere.
          </h2>
          <p className="text-2xl text-emerald-600 font-semibold">
            Where honest feedback builds better businesses.
          </p>
        </section>

      </main>
    </div>
  );
}
