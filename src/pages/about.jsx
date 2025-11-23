import React from "react";
import { SentimentIcon } from '@/components/ui/SentimentIcon';
import { SENTIMENT_TYPES } from '@/constants/sentiment';
import { Eye, Heart, TrendingUp } from 'lucide-react';

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

        {/* Vision Section */}
        <section>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Vision
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              To become the United States' most trusted platform for honest, human-centered customer feedback — empowering people to be heard, businesses to grow through transparency, and every interaction to lead to a better experience.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              To make customer feedback <strong>simple, human, and fair — for everyone.</strong>
            </p>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-3xl mx-auto">
              We exist to help people feel heard and help businesses understand what truly matters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-gray-900">No walls.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-gray-900">No excuses.</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-gray-900">No corporate noise.</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-8 text-center max-w-3xl mx-auto">
              Just real conversations that build trust, fix problems, and create better experiences on both sides.
            </p>
            <p className="text-xl text-emerald-600 font-semibold mt-6 text-center">
              When communication becomes honest, communities grow stronger.<br />
              That's our mission — one interaction at a time.
            </p>
          </div>
        </section>

        {/* Pillars Section */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Transparency */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                  <Eye className="w-12 h-12 text-emerald-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparency</h3>
                <p className="text-lg text-gray-700 mb-3">
                  We believe trust is built in the open.
                </p>
                <p className="text-gray-600">
                  Clear communication, honest feedback, and visible accountability create stronger relationships between customers and businesses.
                </p>
              </div>

              {/* Humanity */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <Heart className="w-12 h-12 text-rose-600" strokeWidth={2} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Humanity</h3>
                <p className="text-lg text-gray-700 mb-3">
                  Behind every complaint is a real person — a story, a feeling, an experience.
                </p>
                <p className="text-gray-600">
                  We design every part of ReportHere to honor people first, not processes.
                </p>
              </div>

              {/* Growth */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-blue-600" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth</h3>
                <p className="text-lg text-gray-700 mb-3">
                  Feedback isn't criticism — it's opportunity.
                </p>
                <p className="text-gray-600">
                  When businesses understand how customers truly feel, they can grow, improve, and deliver better experiences every day.
                </p>
              </div>
            </div>
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

        {/* Values Section */}
        <section>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Value 1 */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Radical Transparency</h3>
                <p className="text-gray-700 mb-2">
                  We believe truth shouldn't be hidden behind forms, scripts, or silence.
                </p>
                <p className="text-emerald-600 font-semibold">
                  Honest feedback builds honest businesses.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Human First</h3>
                <p className="text-gray-700 mb-2">
                  Every complaint is a person.
                </p>
                <p className="text-emerald-600 font-semibold">
                  Every response is a chance to show respect.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Fairness for All</h3>
                <p className="text-gray-700 mb-2">
                  Small businesses deserve the same tools as the big ones.
                </p>
                <p className="text-emerald-600 font-semibold">
                  Customers deserve the same voice everywhere.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Simplicity Above Everything</h3>
                <p className="text-emerald-600 font-semibold">
                  Feedback should be easy to give, easy to read, and easy to act on.
                </p>
              </div>

              {/* Value 5 */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Accountability That Lifts People Up</h3>
                <p className="text-gray-700 mb-2">
                  We don't shame. We don't punish.
                </p>
                <p className="text-emerald-600 font-semibold">
                  We empower businesses to improve and customers to be heard.
                </p>
              </div>

              {/* Value 6 */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">6. Continuous Improvement</h3>
                <p className="text-gray-700 mb-2">
                  When people listen, everyone grows.
                </p>
                <p className="text-emerald-600 font-semibold">
                  We build tools that evolve — always.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Everyone Section */}
        <section>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
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
