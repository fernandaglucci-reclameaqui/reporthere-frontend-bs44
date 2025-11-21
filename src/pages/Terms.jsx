import React from 'react';
import { FileText, Shield, AlertCircle, Scale, Info, Ban } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">Terms of Service</h1>
          <p className="text-emerald-100 text-center text-lg">Last updated: October 7, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using ReportHere ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed">
                Our service allows users to post complaints about businesses and for businesses to respond. All complaints are subject to moderation and may be removed if they violate our content policies. We are a neutral platform and do not arbitrate disputes.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Conduct</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree not to post any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy. You are responsible for the content you post.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Ban className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Moderation</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, but not the obligation, to monitor and review submissions. We may remove or modify any content at our sole discretion for any reason, including violation of these Terms.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service is provided "as is". We make no warranty that the service will be uninterrupted, timely, or error-free. The opinions expressed are those of the users and not of ReportHere.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall ReportHere be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or the inability to use the Service.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">Questions about our Terms?</h3>
          <p className="text-emerald-700">
            If you have any questions about these Terms of Service, please contact us through our contact form.
          </p>
        </div>
      </div>
    </div>
  );
}
