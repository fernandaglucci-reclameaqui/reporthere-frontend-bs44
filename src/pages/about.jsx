import React from "react";
import { SentimentIcon } from '@/components/ui/SentimentIcon';
import { SENTIMENT_TYPES } from '@/constants/sentiment';
import { Eye, Heart, TrendingUp } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section with Beautiful Gradient */}
      <header className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-2xl text-emerald-50 font-light">
            We Believe Every Voice Deserves to Be Heard
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Opening Story */}
        <section className="prose prose-lg max-w-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-100">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
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
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 md:p-12 border-2 border-emerald-200 shadow-lg">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 text-center">
              Our Vision
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              To become the United States' most trusted platform for honest, human-centered customer feedback — empowering people to be heard, businesses to grow through transparency, and every interaction to lead to a better experience.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 md:p-12 border-2 border-green-200 shadow-lg">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              To make customer feedback <strong>simple, human, and fair — for everyone.</strong>
            </p>
            <p className="text-lg text-gray-600 mb-6 text-center max-w-3xl mx-auto">
              We exist to help people feel heard and help businesses understand what truly matters.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 text-center shadow-md">
                <p className="text-xl font-bold text-gray-900">No walls.</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 text-center shadow-md">
                <p className="text-xl font-bold text-gray-900">No excuses.</p>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 text-center shadow-md">
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-100">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-12 text-center">
              Our Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Transparency */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Eye className="w-12 h-12 text-white" strokeWidth={2} />
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
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-12 h-12 text-white" strokeWidth={2} fill="currentColor" />
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
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-12 h-12 text-white" strokeWidth={2} />
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-100">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6 text-center">
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
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-200 shadow-md">
                <SentimentIcon sentiment={SENTIMENT_TYPES.NAILED_IT} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Green</p>
                <p className="text-sm text-gray-600">They loved it</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 text-center border-2 border-yellow-200 shadow-md">
                <SentimentIcon sentiment={SENTIMENT_TYPES.MEH} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Yellow</p>
                <p className="text-sm text-gray-600">It was okay</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 text-center border-2 border-orange-200 shadow-md">
                <SentimentIcon sentiment={SENTIMENT_TYPES.UH_OH} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Orange</p>
                <p className="text-sm text-gray-600">Not great</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 text-center border-2 border-red-200 shadow-md">
                <SentimentIcon sentiment={SENTIMENT_TYPES.DISAPPOINTING} size="xl" className="mb-4" />
                <p className="text-lg font-bold text-gray-900 mb-2">Red</p>
                <p className="text-sm text-gray-600">Pretty bad</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center border-2 border-purple-200 shadow-md">
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
          <div className="bg-gradient-to-br from-teal-100 to-green-100 rounded-2xl p-8 md:p-12 border-2 border-teal-200 shadow-lg">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Value 1 */}
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Radical Transparency</h3>
                <p className="text-gray-700 mb-2">
                  We believe truth shouldn't be hidden behind forms, scripts, or silence.
                </p>
                <p className="text-emerald-600 font-semibold">
                  Honest feedback builds honest businesses.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Human First</h3>
                <p className="text-gray-700 mb-2">
                  Every interaction on ReportHere is designed to respect people — their time, their voice, and their experience.
                </p>
                <p className="text-emerald-600 font-semibold">
                  People aren't ticket numbers. They're human beings.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Fairness for All</h3>
                <p className="text-gray-700 mb-2">
                  We don't take sides. We create space for honest dialogue where both customers and businesses can be heard.
                </p>
                <p className="text-emerald-600 font-semibold">
                  Real solutions come from balanced conversations.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Continuous Improvement</h3>
                <p className="text-gray-700 mb-2">
                  We're not perfect — and we don't pretend to be. We listen, we learn, and we evolve.
                </p>
                <p className="text-emerald-600 font-semibold">
                  Growth is a journey, not a destination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section>
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Us in Building a Better Way
            </h2>
            <p className="text-xl text-emerald-50 mb-8 max-w-3xl mx-auto">
              Whether you're a customer who wants to be heard or a business ready to listen — ReportHere is your platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/file-complaint"
                className="inline-block bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Share Your Story
              </a>
              <a
                href="/for-businesses"
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors border-2 border-white shadow-lg"
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
