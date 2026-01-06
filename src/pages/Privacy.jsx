import React from 'react';
import { Lock, Database, Share2, Settings, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Hero Section with Beautiful Gradient */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Lock className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-emerald-50 text-center text-lg">Last updated: October 7, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <Database className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, file a complaint, or otherwise communicate with us. This may include your name, email address, and any other information you choose to provide.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-100 p-8 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-4">2. How We Use Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We use the information we collect to operate and improve our services, including to moderate content, facilitate communication between consumers and businesses, and to send you technical notices and support messages.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-8 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                <Share2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed">
                We do not sell your personal information. Published complaints are public. We may share information with businesses that are the subject of a complaint to facilitate a resolution. We may also share information in response to a legal request if we believe it is required by law.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 p-8 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
                <Settings className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">4. Your Choices</h2>
              <p className="text-gray-700 leading-relaxed">
                You may review and update your account information at any time by logging into your account. Please note that we may retain certain information as required by law or for legitimate business purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-100 p-8 mb-6 hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-green-500 rounded-xl flex items-center justify-center shadow-md">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-4">5. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact form.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-6 mt-8 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Your Privacy Matters</h3>
          </div>
          <p className="text-gray-700">
            We are committed to protecting your personal information and being transparent about how we use it. Your trust is important to us.
          </p>
        </div>
      </div>
    </div>
  );
}
