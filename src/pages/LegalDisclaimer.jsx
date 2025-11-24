import React from 'react';
import { Scale } from 'lucide-react';

export default function LegalDisclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <Scale className="w-16 h-16 text-gray-700" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Legal Disclaimer
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere is a user-generated content platform that allows consumers to share their experiences with businesses and enables businesses to respond publicly. We do not create, verify, endorse, or control the content posted by users or businesses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Verification of Claims</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere does not investigate, verify, or validate the accuracy of complaints, responses, or any other user-submitted content. All content reflects the personal opinions and experiences of individual users and businesses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Legal, Financial, or Professional Advice</h2>
            <p className="text-gray-700 leading-relaxed">
              Information on ReportHere is for informational purposes only and should not be considered legal, financial, medical, or professional advice. Users should consult qualified professionals for specific guidance related to their situations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Mediation or Resolution Guarantee</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere is a communication platform only. We do not mediate disputes, negotiate settlements, guarantee resolutions, or take sides in any complaint. Any resolution between users and businesses is solely between those parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibility</h2>
            <p className="text-gray-700 leading-relaxed">
              Users are solely responsible for the content they post. By submitting a complaint or response, users represent that their content is truthful, accurate, and does not violate any laws or third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Responsibility</h2>
            <p className="text-gray-700 leading-relaxed">
              Businesses are responsible for the accuracy and legality of their responses. ReportHere does not verify business claims or statements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Protection Under U.S. Law</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere is protected under Section 230 of the Communications Decency Act as a platform hosting user-generated content. We are not liable for content posted by users or businesses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere, its owners, employees, and affiliates are not liable for any damages, losses, or consequences arising from the use of this platform or reliance on any content posted by users or businesses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use at Your Own Risk</h2>
            <p className="text-gray-700 leading-relaxed">
              You use ReportHere at your own risk. We make no warranties or guarantees regarding the accuracy, completeness, or reliability of any content on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere reserves the right to update this Legal Disclaimer at any time. Continued use of the platform constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about this Legal Disclaimer, please contact us at{' '}
              <a href="mailto:legal@reporthere.com" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                legal@reporthere.com
              </a>
            </p>
          </section>

        </div>

      </main>
    </div>
  );
}
