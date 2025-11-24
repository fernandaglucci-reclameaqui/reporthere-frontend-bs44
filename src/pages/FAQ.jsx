import React from 'react';
import { HelpCircle, Users, Building2 } from 'lucide-react';

export default function FAQ() {
  const consumerFAQs = [
    {
      q: "How do I open a complaint?",
      a: "Go to any company profile and click 'Open Complaint'. You will be guided through the process."
    },
    {
      q: "Do I need an account to submit a complaint?",
      a: "Yes. You will create an account during the complaint process."
    },
    {
      q: "Can I edit my complaint?",
      a: "You can edit for a short period after posting, unless the business has already responded. Edits are logged for transparency."
    },
    {
      q: "Can I delete my complaint?",
      a: "Complaints become part of the business' public record. We only remove content if it violates our Terms, includes personal/private data, or contains threats or illegal content. We do NOT remove complaints simply because the issue was resolved, the user asked to delete it later, or the business requests removal."
    },
    {
      q: "Are complaints anonymous?",
      a: "Your name is not displayed publicly unless you choose to show it. Businesses do receive enough information to identify the case (formally or informally)."
    },
    {
      q: "What is Customer Karma?",
      a: "A 5-emotion feedback model: Green (Loved it), Yellow (Okay), Orange (Not great), Red (Pretty bad), Purple (Completely ignored). Businesses see sentiment analytics on their dashboard."
    },
    {
      q: "Is ReportHere a mediator?",
      a: "No. We do not negotiate, take sides, judge, investigate, or guarantee resolutions. We are a communication platform only."
    },
    {
      q: "What if a business lies in their response?",
      a: "You may reply publicly. We do not verify business statements."
    }
  ];

  const businessFAQs = [
    {
      q: "How do I claim my business profile?",
      a: "Click 'Claim your profile' on the company page and follow the instructions."
    },
    {
      q: "Does it cost money?",
      a: "Free Plan includes unlimited complaints, view all complaints, view basic stats, and reply to 2 complaints per month. Paid Plans offer reply to all complaints, analytics, Customer Karma dashboard, SLA tracking, and priority visibility."
    },
    {
      q: "Can I remove complaints?",
      a: "No. ReportHere does not delete user-submitted complaints unless they violate the Terms."
    },
    {
      q: "What happens if a complaint is false?",
      a: "You may reply publicly, provide your version, or flag the complaint for review (only if it violates our Terms). We do not evaluate who is 'right' or 'wrong'."
    },
    {
      q: "Can I sue the platform for a complaint?",
      a: "No. Under U.S. law, ReportHere is protected as a platform hosting user-generated content. Users—not ReportHere—are responsible for what they post."
    },
    {
      q: "Can I close or hide my company profile?",
      a: "No. ReportHere maintains public business profiles for transparency."
    },
    {
      q: "What is the Loved Score™ and Customer Karma?",
      a: "Loved Score™: Businesses receive ratings based on outcome satisfaction. Customer Karma shows emotional sentiment distribution from real consumers using our 5-face model."
    },
    {
      q: "Does responding to complaints improve my score?",
      a: "Yes. Responsiveness and resolution are factored into reputation metrics."
    },
    {
      q: "Can I integrate ReportHere into my CRM?",
      a: "Not yet — integrations are planned."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <HelpCircle className="w-16 h-16 text-emerald-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-2xl text-gray-700 font-light">
            Everything you need to know about ReportHere
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Consumer FAQs */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              For Consumers
            </h2>
          </div>
          <div className="space-y-6">
            {consumerFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Business FAQs */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              For Businesses
            </h2>
          </div>
          <div className="space-y-6">
            {businessFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12 text-center border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We're here to help! Reach out to our support team.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Contact Us
          </a>
        </section>

      </main>
    </div>
  );
}
