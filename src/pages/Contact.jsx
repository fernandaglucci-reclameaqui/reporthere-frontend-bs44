import React from 'react';
import { Mail, MessageSquare, HelpCircle, Newspaper, Scale, Handshake, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section with Beautiful Gradient */}
      <header className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Mail className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-2xl text-emerald-50 font-light">
            We're here to help.
          </p>
          <p className="text-lg text-emerald-100 mt-2 max-w-3xl mx-auto">
            If you have questions about your account, a complaint, or your business profile, reach out to us using the contact information below.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        {/* Main Support Section */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              How to Reach Us
            </h2>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Support Email
            </h3>
            <a 
              href="mailto:support@reporthere.com" 
              className="text-2xl font-semibold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-2"
            >
              <Mail className="w-6 h-6" />
              support@reporthere.com
            </a>
            <p className="text-gray-600 mt-3">
              We respond within 24–48 hours, Monday to Friday.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Consumer Support */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                Consumer Support Includes:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Help with account creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Troubles logging in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>Reporting abusive or illegal content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>General questions about complaints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✓</span>
                  <span>How Customer Karma works</span>
                </li>
              </ul>
            </div>

            {/* Business Support */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                Business Support Includes:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">✓</span>
                  <span>Claiming your business profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">✓</span>
                  <span>Responding to complaints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">✓</span>
                  <span>Understanding analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">✓</span>
                  <span>Subscription questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">✓</span>
                  <span>Reporting incorrect business info</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Before Contacting */}
        <section className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8 border-2 border-amber-200 text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Before contacting us…
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            Check our FAQ — most questions are answered there.
          </p>
          <a 
            href="/faq" 
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md"
          >
            View FAQ
          </a>
        </section>

        {/* Other Contact Options */}
        <section className="grid md:grid-cols-3 gap-6">
          
          {/* Media & Press */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-500 rounded-xl flex items-center justify-center shadow-md">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Media & Press
              </h3>
            </div>
            <a 
              href="mailto:press@reporthere.com" 
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors break-all"
            >
              press@reporthere.com
            </a>
          </div>

          {/* Legal Requests */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-red-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center shadow-md">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Legal Requests
              </h3>
            </div>
            <a 
              href="mailto:legal@reporthere.com" 
              className="text-red-600 hover:text-red-700 font-semibold transition-colors break-all"
            >
              legal@reporthere.com
            </a>
          </div>

          {/* Partnerships */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Partnerships
              </h3>
            </div>
            <a 
              href="mailto:partnerships@reporthere.com" 
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors break-all"
            >
              partnerships@reporthere.com
            </a>
          </div>

        </section>

        {/* Legal Removal Policy */}
        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-red-100">
          <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Legal Removal Requests
          </h3>
          <p className="text-gray-700 mb-4">
            For removal requests due to legal violations, contact{' '}
            <a href="mailto:legal@reporthere.com" className="text-red-600 hover:text-red-700 font-semibold">
              legal@reporthere.com
            </a>
          </p>
          <div className="mb-4">
            <p className="font-semibold text-gray-900 mb-2">We review only:</p>
            <ul className="space-y-1 text-gray-700 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Privacy violations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Dangerous content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Doxxing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Court-ordered removals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Clear, objective legal risks</span>
              </li>
            </ul>
          </div>
          <p className="text-gray-600 italic">
            We do not remove content simply because a business or consumer disagrees with it.
          </p>
        </section>

        {/* No Phone Support */}
        <section className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-xl p-8 border-2 border-gray-200 text-center shadow-lg">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            We do not offer phone support
          </h3>
          <p className="text-gray-700">
            To maintain consistency and protect user privacy, all requests must come through email.
          </p>
          <p className="text-gray-600 mt-2">
            A chatbot is available for common questions 24/7.
          </p>
        </section>

      </main>
    </div>
  );
}
