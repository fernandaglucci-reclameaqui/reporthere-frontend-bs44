import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-gray-600 mt-2">Why we built a place where complaints can’t be ignored.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4 text-[17px] leading-7 text-gray-800">
            <p>
              It started as a small try-before-you-buy. No confirmation email ever came. Days later, the product arrived anyway.
              I tested it, didn’t like it, and tried to return it within the three-week window they promised.
            </p>
            <p>
              That’s when the real problem began: their website support couldn’t find my order at all — not by an order number (I never got one),
              not by my name, not by my address, not even by the credit card. The phone number on their site was disconnected.
              I was stuck and unheard.
            </p>
            <p>
              So I built the space I needed: a visible, trusted board where any consumer can file a clear complaint and companies will see it —
              and are nudged to respond. No disappearing tickets. No dead phone lines. Just accountability in the open.
            </p>
            <p>
              <b>ReportHere</b> exists so no one has to shout into the void. Every complaint has a home. Every company has a chance to make it right.
              That’s how trust is rebuilt: one honest report and one timely response at a time.
            </p>
          </div>
          <div className="md:col-span-1">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop"
              alt="Three women together — a mother and two daughters — standing in solidarity"
              className="w-full h-64 md:h-full object-cover rounded-2xl shadow-sm"
            />
            <div className="text-xs text-gray-500 mt-2">Imagery is illustrative.</div>
          </div>
        </div>

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Our Promise</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            <li>Complaints live in public view — with respectful moderation.</li>
            <li>Companies get a structured inbox to respond and resolve.</li>
            <li>We measure response time, resolution rate, and fairness — transparently.</li>
          </ul>
        </section>

        <section className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-800">
            Questions? Write to <a className="underline" href="mailto:support@reporthere.com">support@reporthere.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
}