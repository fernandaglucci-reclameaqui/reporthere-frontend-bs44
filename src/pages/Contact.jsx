import React from 'react';
import { Mail, MessageSquare, HelpCircle, Newspaper, Scale, Handshake, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Mail className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-2xl text-gray-700 font-light">
            We're here to help.
          </p>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            If you have questions about your account, a complaint, or your business profile, reach out to us using the contact information below.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        
        {/* Main Support Section */}
        <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">
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
            <div>
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
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                Business Support Includes:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Claiming your business profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Responding to complaints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Understanding analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Subscription questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Reporting incorrect business info</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Before Contacting */}
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-100 text-center">
          <HelpCircle className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Before contacting us…
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            Check our FAQ — most questions are answered there.
          </p>
          <a 
            href="/faq" 
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            View FAQ
          </a>
        </section>

        {/* Other Contact Options */}
        <section className="grid md:grid-cols-3 gap-6">
          
          {/* Media & Press */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="w-7 h-7 text-purple-600" />
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-7 h-7 text-red-600" />
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Handshake className="w-7 h-7 text-blue-600" />
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
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
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
        <section className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-8 border border-gray-200 text-center">
          <Phone className="w-12 h-12 text-gray-500 mx-auto mb-4" />
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
