import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function BillingSuccessPage() {
    const q = useQuery();
    const navigate = useNavigate();

    const transactionId = q.get("transaction_id");
    const orderId = q.get("order_id");

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-xl mx-auto p-8 text-center bg-white shadow-lg rounded-lg">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Payment Successful</h1>
                <p className="text-gray-600 mb-6">
                    Your purchase has been processed. Your account and credits will be updated momentarily.
                </p>

                <div className="mb-6 text-sm text-gray-500 bg-gray-50 p-4 rounded-md">
                    {transactionId && <div>Transaction ID: <code className="font-mono">{transactionId}</code></div>}
                    {orderId && <div>Order ID: <code className="font-mono">{orderId}</code></div>}
                </div>

                <div className="flex justify-center gap-4">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link to={createPageUrl("dashboard")}>Go to Dashboard</Link>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(createPageUrl("Home"))}>
                        Back to Home
                    </Button>
                </div>

                <p className="mt-8 text-xs text-gray-500">
                    If this page was refreshed, don’t worry—credits and plans are granted once by our backend system to prevent duplicates.
                </p>
            </div>
        </div>
    );
}