import React from 'react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 5, 2026</p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Welcome to ReportHere</h2>
          <p className="text-gray-700 mb-6">
            By using ReportHere, you're agreeing to these terms and how the platform works. They're here to keep things clear, fair, and respectful for everyone.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What ReportHere Is (and Isn't)</h2>
          <p className="text-gray-700 mb-4">
            ReportHere is a public space where people share real experiences with businesses, and where businesses can respond publicly.
          </p>
          <p className="text-gray-700 mb-6">
            We provide the tools and space for these conversations. We don't judge who's right or wrong, and we don't act as a mediator or decision-maker in disputes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Content on the Platform</h2>
          <p className="text-gray-700 mb-4">
            Everything posted on ReportHere — including complaints, responses, comments, and messages — comes directly from users or businesses.
          </p>
          <p className="text-gray-700 mb-6">
            If you post something, you're responsible for it. That means sharing information honestly (to the best of your knowledge), lawfully, and in a way that respects other people's rights.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Using ReportHere Respectfully</h2>
          <p className="text-gray-700 mb-4">
            We want ReportHere to support honest experiences and constructive dialogue. You agree not to post content that is illegal, intentionally misleading, abusive, harassing, defamatory, obscene, or designed to manipulate or harm others.
          </p>
          <p className="text-gray-700 mb-6">
            Content created to spam, deceive, or game the platform isn't allowed.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Moderation & Fair Use</h2>
          <p className="text-gray-700 mb-4">
            We don't review every post before it goes live. That said, we care deeply about fairness and trust.
          </p>
          <p className="text-gray-700 mb-4">
            ReportHere may review activity — using a mix of automated tools and human judgment — to detect abuse, fake accounts, or coordinated misuse. When content or behavior violates these Terms or our policies, we may limit visibility, remove content, or restrict accounts.
          </p>
          <p className="text-gray-700 mb-6">
            Our goal is to protect the community, not to take sides.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">No Mediation, No Promises</h2>
          <p className="text-gray-700 mb-6">
            ReportHere isn't a dispute-resolution service. We don't negotiate outcomes, force responses, or guarantee resolutions. Any conversation or resolution happens directly between the people involved.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Platform Availability</h2>
          <p className="text-gray-700 mb-6">
            We work hard to keep ReportHere available and reliable, but the service is provided "as is." From time to time, features may change, be unavailable, or experience issues.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Opinions Are Personal</h2>
          <p className="text-gray-700 mb-6">
            The views shared on ReportHere belong to the people who post them. They don't represent ReportHere's opinions. How you interpret or act on information found here is up to you.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limits of Responsibility</h2>
          <p className="text-gray-700 mb-6">
            To the extent allowed by law, ReportHere and its affiliates aren't responsible for losses or damages resulting from using the platform or relying on user-generated content.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Updates to These Terms</h2>
          <p className="text-gray-700 mb-6">
            As ReportHere evolves, these Terms may be updated. The latest version will always be posted here. Continuing to use the platform means you accept any updates.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Questions?</h2>
          <p className="text-gray-700 mb-2">
            If you have questions about these Terms, reach out through our contact form or email us at{' '}
            <a href="mailto:legal@reporthere.org" className="text-blue-600 hover:text-blue-800 underline">
              legal@reporthere.org
            </a>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            By using ReportHere, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
