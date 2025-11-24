import React from 'react';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';

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
            We're here to help
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Contact Options */}
        <section className="grid md:grid-cols-2 gap-8">
          
          {/* General Inquiries */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                General Inquiries
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              For general questions, feedback, or business partnerships, reach out to us at:
            </p>
            <a 
              href="mailto:contact@reporthere.com" 
              className="text-xl font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              contact@reporthere.com
            </a>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Support
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Need help with your account, complaint, or business profile? Our support team is ready to assist:
            </p>
            <a 
              href="mailto:support@reporthere.com" 
              className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              support@reporthere.com
            </a>
          </div>

        </section>

        {/* FAQ Link */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have a quick question?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Check out our FAQ page for instant answers to common questions.
          </p>
          <a 
            href="/FAQ" 
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            View FAQ
          </a>
        </section>

        {/* Response Time */}
        <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Response Time
          </h3>
          <p className="text-gray-700">
            We typically respond within 24-48 hours during business days (Monday-Friday).
          </p>
        </section>

      </main>
    </div>
  );
}
