import React from 'react';
import { Lock, Database, Share2, Settings, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-center text-lg">Last updated: October 7, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, file a complaint, or otherwise communicate with us. This may include your name, email address, and any other information you choose to provide.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We use the information we collect to operate and improve our services, including to moderate content, facilitate communication between consumers and businesses, and to send you technical notices and support messages.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. Published complaints are public. We may share information with businesses that are the subject of a complaint to facilitate a resolution. We may also share information in response to a legal request if we believe it is required by law.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your Choices</h2>
              <p className="text-gray-700 leading-relaxed">
                You may review and update your account information at any time by logging into your account. Please note that we may retain certain information as required by law or for legitimate business purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact form.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Your Privacy Matters</h3>
          </div>
          <p className="text-blue-700">
            We are committed to protecting your personal information and being transparent about how we use it. Your trust is important to us.
          </p>
        </div>
      </div>
    </div>
  );
}
