import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { CompanyMember } from "@/api/entities";
import { startCheckout } from "@/components/billing/billingAdapter";
import { Button } from "@/components/ui/button";

const provider = "base44"; // Set billing provider

export default function UpgradeModal({ open, onClose }){
  const [user, setUser] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    if (open) {
      (async () => {
        try {
          const me = await User.me();
          setUser(me);
          const memberships = await CompanyMember.filter({ user_id: me.id });
          if (memberships.length > 0) {
            setCompanyId(memberships[0].company_id);
          }
        } catch (e) {
          console.error("Failed to load user/company info for upgrade:", e);
        }
      })();
    }
  }, [open]);
  
  const handleUpgrade = (planName) => {
    if (companyId && user?.email) {
      startCheckout({ 
        provider, 
        plan: planName, 
        company_id: companyId, 
        email: user.email 
      });
    } else {
      alert("Could not initiate upgrade. User or company information is missing.");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8 space-y-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900">Upgrade to Keep Replying</h2>
        <p className="text-gray-600">
          You’ve reached the Free plan reply limit for this month. Upgrade to unlock unlimited replies, add more team members, and access advanced analytics.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 flex flex-col">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-gray-500 text-sm mb-4">Ideal for growing businesses.</p>
            <ul className="text-sm space-y-2 list-disc list-inside flex-grow">
              <li>Unlimited replies</li>
              <li>Up to 5 seats</li>
              <li>Analytics & SLA alerts</li>
            </ul>
            <Button className="mt-6 w-full" onClick={() => handleUpgrade("Pro")}>Choose Pro</Button>
          </div>
          <div className="border-2 border-green-500 rounded-lg p-6 flex flex-col relative">
            <div className="absolute top-0 -translate-y-1/2 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full">Most Popular</div>
            <h3 className="text-xl font-semibold">Business</h3>
             <p className="text-gray-500 text-sm mb-4">For established companies.</p>
            <ul className="text-sm space-y-2 list-disc list-inside flex-grow">
              <li>Unlimited replies</li>
              <li>Up to 20 seats</li>
              <li>API access</li>
              <li>Priority support</li>
            </ul>
            <Button className="mt-6 w-full bg-green-600 hover:bg-green-700" onClick={() => handleUpgrade("Business")}>Choose Business</Button>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}