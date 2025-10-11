import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { SendEmail } from '@/api/integrations';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await SendEmail({
        to: 'support@reporthere.org', // Your support email
        from_name: `Contact Form - ${formData.name}`,
        subject: `Contact Form: ${formData.subject}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-16 bg-white p-8 rounded-lg shadow-lg space-y-6">
          {submitStatus === 'success' && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Message Sent!</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Something went wrong</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>We couldn't send your message. Please try again later or email us directly.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <Label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Your Name
              </Label>
              <div className="mt-2.5">
                <Input type="text" id="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="sm:col-span-1">
              <Label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Your Email
              </Label>
              <div className="mt-2.5">
                <Input type="email" id="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                Subject
              </Label>
              <div className="mt-2.5">
                <Input type="text" id="subject" value={formData.subject} onChange={handleChange} required />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </Label>
              <div className="mt-2.5">
                <Textarea id="message" rows={4} value={formData.message} onChange={handleChange} required />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}