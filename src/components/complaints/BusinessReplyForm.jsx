import React, { useState } from 'react';
import { Complaint } from '@/api/entities';
import { Notification } from '@/api/entities';
import { SendEmail } from '@/api/integrations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Send } from 'lucide-react';
import AIResponseWriter from '@/components/ai/AIResponseWriter';
import { createPageUrl } from '@/utils';

export default function BusinessReplyForm({ complaint, company, onReplySuccess }) {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response.trim()) {
      setError("Response cannot be empty.");
      return;
    }
    
    if (response.trim().length < 20) {
      setError("Response must be at least 20 characters to ensure meaningful communication.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Update the complaint with the business response
      const updatedComplaint = await Complaint.update(complaint.id, {
        business_response: response,
        business_response_date: new Date().toISOString(),
        status: 'responded'
      });

      const consumerEmail = complaint.created_by;
      const complaintUrl = `${window.location.origin}${createPageUrl(`complaint/${complaint.id}`)}`;

      // 2. Notify the consumer via Email
      if (consumerEmail) {
        await SendEmail({
          to: consumerEmail,
          subject: `An update on your complaint against ${company.name}`,
          body: `The company "${company.name}" has responded to your complaint titled "${complaint.title}".
          
You can view the response here: ${complaintUrl}

Thank you for using ReportHere.`
        });
      }

      // 3. Create an in-app notification for the consumer
      if (consumerEmail) {
        await Notification.create({
            user_email: consumerEmail,
            type: "BUSINESS_REPLY",
            title: `${company.name} replied to your complaint`,
            body: response.substring(0, 150) + (response.length > 150 ? '...' : ''),
            link_url: createPageUrl(`complaint/${complaint.id}`),
            complaint_id: complaint.id,
            company_id: company.id
        });
      }

      // 4. Trigger a state update on the parent component
      if (onReplySuccess) {
        onReplySuccess(updatedComplaint);
      }
      setResponse('');

    } catch (err) {
      console.error("Failed to submit reply:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-8 bg-gray-50 border-green-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Send className="w-5 h-5 text-green-600" />
          Post an Official Reply
        </CardTitle>
        <CardDescription>
          Your response will be public and will notify the consumer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* AI Response Writer */}
        <div className="mb-6">
          <AIResponseWriter
            complaint={complaint}
            companyName={company.name}
            onUseResponse={(aiResponse) => setResponse(aiResponse)}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write your official response here..."
              className="min-h-[150px] bg-white"
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> {error}
              </p>
            )}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? "Submitting..." : "Submit Reply"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}