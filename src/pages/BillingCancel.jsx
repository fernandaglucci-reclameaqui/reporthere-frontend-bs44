import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function BillingCancel() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-gray-600 mb-8">
        Your payment process was canceled. Your plan has not been changed.
      </p>
      <div className="space-x-4">
        <Link to={createPageUrl("CompanyInbox")}>
          <Button variant="outline">Back to Inbox</Button>
        </Link>
      </div>
    </div>
  );
}