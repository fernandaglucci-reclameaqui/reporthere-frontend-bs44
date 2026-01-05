import React from 'react';
import { FileText, Shield, Users, Scale, Globe, Heart, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <FileText className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">Terms of Service</h1>
          <p className="text-emerald-100 text-center text-xl">Last updated: January 5, 2026</p>
          <p className="text-white/90 text-center text-lg mt-4 max-w-2xl mx-auto">
            Clear, fair, and respectful guidelines for everyone using ReportHere
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
                Welcome to ReportHere
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                By using ReportHere, you're agreeing to these terms and how the platform works. They're here to keep things clear, fair, and respectful for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* What ReportHere Is */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg border border-teal-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                What ReportHere Is (and Isn't)
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                ReportHere is a public space where people share real experiences with businesses, and where businesses can respond publicly.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We provide the tools and space for these conversations. We don't judge who's right or wrong, and we don't act as a mediator or decision-maker in disputes.
              </p>
            </div>
          </div>
        </div>

        {/* Content on the Platform */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Content on the Platform
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Everything posted on ReportHere — including complaints, responses, comments, and messages — comes directly from users or businesses.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                If you post something, you're responsible for it. That means sharing information honestly (to the best of your knowledge), lawfully, and in a way that respects other people's rights.
              </p>
            </div>
          </div>
        </div>

        {/* Using ReportHere Respectfully */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Using ReportHere Respectfully
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We want ReportHere to support honest experiences and constructive dialogue. You agree not to post content that is illegal, intentionally misleading, abusive, harassing, defamatory, obscene, or designed to manipulate or harm others.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Content created to spam, deceive, or game the platform isn't allowed.
              </p>
            </div>
          </div>
        </div>

        {/* Moderation & Fair Use */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg border border-teal-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
                Moderation & Fair Use
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                We don't review every post before it goes live. That said, we care deeply about fairness and trust.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                ReportHere may review activity — using a mix of automated tools and human judgment — to detect abuse, fake accounts, or coordinated misuse. When content or behavior violates these Terms or our policies, we may limit visibility, remove content, or restrict accounts.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed font-medium text-emerald-700">
                Our goal is to protect the community, not to take sides.
              </p>
            </div>
          </div>
        </div>

        {/* No Mediation, No Promises */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                No Mediation, No Promises
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                ReportHere isn't a dispute-resolution service. We don't negotiate outcomes, force responses, or guarantee resolutions. Any conversation or resolution happens directly between the people involved.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Availability */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Platform Availability
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We work hard to keep ReportHere available and reliable, but the service is provided "as is." From time to time, features may change, be unavailable, or experience issues.
              </p>
            </div>
          </div>
        </div>

        {/* Opinions Are Personal */}
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl shadow-lg border border-teal-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
                Opinions Are Personal
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                The views shared on ReportHere belong to the people who post them. They don't represent ReportHere's opinions. How you interpret or act on information found here is up to you.
              </p>
            </div>
          </div>
        </div>

        {/* Limits of Responsibility */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg border border-green-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Limits of Responsibility
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To the extent allowed by law, ReportHere and its affiliates aren't responsible for losses or damages resulting from using the platform or relying on user-generated content.
              </p>
            </div>
          </div>
        </div>

        {/* Updates to These Terms */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg border border-emerald-100 p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Updates to These Terms
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                As ReportHere evolves, these Terms may be updated. The latest version will always be posted here. Continuing to use the platform means you accept any updates.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section - Extra Special */}
        <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-2xl shadow-2xl p-10 transform hover:scale-[1.02] transition-all duration-300">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Questions?</h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              If you have questions about these Terms, reach out through our contact form or email us at
            </p>
            <a 
              href="mailto:legal@reporthere.org" 
              className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              legal@reporthere.org
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 inline-block border border-emerald-200">
            By using ReportHere, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
