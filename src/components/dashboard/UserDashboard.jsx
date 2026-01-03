import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { User } from "@/api/entities";
import { Complaint } from "@/api/entities";
import { createPageUrl } from '@/utils';
import RouteProbe from '../debug/RouteProbe';
import { Button } from '@/components/ui/button';
import { FileText, AlertCircle } from 'lucide-react';

function EmptyState() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
      <div className="max-w-2xl mx-auto px-6">
        <FileText className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Your Dashboard!</h2>
        <p className="text-lg text-gray-700 mb-4">
          You haven't filed any complaints yet. This is where you'll track all your complaints and see company responses.
        </p>
        <div className="bg-white rounded-lg p-6 mb-6 text-left shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">What you can do here:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Track the status of all your complaints in one place</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>See when companies respond to your complaints</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Get notified of updates and resolutions</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Help other consumers by sharing your experiences</span>
            </li>
          </ul>
        </div>
        <Button 
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 shadow-lg"
          onClick={() => navigate(createPageUrl('filecomplaint'))}
        >
          ➕ File Your First Complaint
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          It only takes a few minutes to share your story
        </p>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const [items, setItems] = useState([]);
  const [state, setState] = useState("loading");

  // MOUNT BEACON (from user instructions)
  useEffect(() => { console.log("[USR] mount"); }, []);

  useEffect(() => {
    let mounted = true;
    setState("loading");
    const loadData = async () => {
        try {
            const currentUser = await User.me();
            if (!currentUser) throw new Error("User not authenticated.");

            const userComplaints = await Complaint.filter({ created_by: currentUser.email }, '-updated_date');
            if (mounted) {
                setItems(userComplaints || []);
                setState("ok");
            }
        } catch (e) {
            console.error("[USR] fetch error:", e);
            if (mounted) setState("error");
        }
    };
    loadData();
    return () => { mounted = false; };
  }, []);

  // --- NEVER return null; always show visible UI ---
  return (
    <RouteProbe name="/dashboard/user">
      <div style={{position:"fixed",top:96,left:4,zIndex:99998,background:"#06c",color:"#fff",padding:"2px 6px",borderRadius:4}}>USR MOUNT</div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>

        {state === "loading" && <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">Loading your complaints…</div>}
        {state === "error"   && <div className="p-4 bg-red-50 text-red-800 rounded-lg">Couldn’t load your complaints right now.</div>}

        {state === "ok" && (
          items.length === 0
            ? <EmptyState />
            : <ul className="space-y-3">
                {items.map(row => (
                  <li key={row.id} className="border p-4 rounded-lg bg-white shadow-sm">
                    <div className="font-medium text-gray-800">{row.title}</div>
                    <div className="text-sm text-gray-500">{new Date(row.created_at).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
        )}
      </div>
    </RouteProbe>
  );
}