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
            Last updated: January 4, 2026
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-lg max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What ReportHere Does</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere is a public platform designed to give people a place to share their experiences with businesses, and to give businesses an opportunity to respond openly. Our role is to provide the technology and space for these conversations — not to judge, verify, or take sides.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed">
              All complaints, responses, comments, and reviews on ReportHere are submitted by users or businesses. These posts reflect individual experiences, opinions, and perspectives. ReportHere does not pre-screen or independently verify user-submitted content before it is published.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy & Interpretation</h2>
            <p className="text-gray-700 leading-relaxed">
              Because content on ReportHere is based on personal experiences, it may differ from one person to another and may not always reflect the full context of a situation. Users should use their own judgment when reading or relying on information found on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Abuse Prevention & Platform Integrity</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we do not verify individual complaints, we take platform integrity seriously.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              ReportHere uses a combination of automated systems and human review to identify suspicious activity, including but not limited to fake accounts, coordinated behavior, or attempts to manipulate complaints or responses.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If a user or business believes content has been posted in bad faith or violates our policies, it can be reported. ReportHere may review flagged activity and take appropriate action, which may include limiting visibility, removing content, or restricting accounts that misuse the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Mediation or Guaranteed Outcomes</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere is not a dispute-resolution or arbitration service. We do not mediate complaints, negotiate settlements, guarantee responses, or ensure outcomes. Any resolution occurs directly between the consumer and the business.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Professional Advice</h2>
            <p className="text-gray-700 leading-relaxed">
              Information shared on ReportHere is provided for general informational purposes only. It should not be considered legal, financial, medical, or professional advice. Users should consult qualified professionals for guidance specific to their circumstances.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shared Responsibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Users are responsible for the content they submit and should ensure it is honest, lawful, and respectful of others' rights.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Businesses are responsible for the accuracy and legality of their responses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Framework</h2>
            <p className="text-gray-700 leading-relaxed">
              ReportHere operates as an interactive computer service under Section 230 of the U.S. Communications Decency Act. As such, ReportHere is not legally responsible for user-generated content posted by consumers or businesses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, ReportHere and its affiliates are not liable for damages, losses, or consequences resulting from use of the platform or reliance on user-generated content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Platform Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to keep ReportHere accessible and reliable, but we do not guarantee uninterrupted service or error-free operation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              This disclaimer may be updated from time to time as the platform evolves. The most current version will always be available on this page. Continued use of ReportHere indicates acceptance of any updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions related to this disclaimer, contact us at{' '}
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
