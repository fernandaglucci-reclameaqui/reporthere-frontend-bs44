import React, { useEffect, useState } from "react";
import { Complaint, ModerationAction } from "@/api/entities";
import { Button } from "@/components/ui/button";

export default function ModerationQueue(){
  const [list, setList] = useState([]);
  
  useEffect(()=>{ 
    Complaint.filter({ status: "submitted" }, "-created_at").then(setList); 
  },[]);

  const approve = async (c) => {
    await Complaint.update(c.id, { status: "published", published_date: new Date().toISOString() });
    await ModerationAction.create({ target_type:"complaint", target_id:c.id, type:"approve", reason:"manual approve" });
    setList(l => l.filter(x => x.id !== c.id));
  };
  const reject = async (c) => {
    await Complaint.update(c.id, { status: "rejected" });
    await ModerationAction.create({ target_type:"complaint", target_id:c.id, type:"reject", reason:"manual reject" });
    setList(l => l.filter(x => x.id !== c.id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Moderation Queue</h1>
      {list.length === 0 ? (
        <div className="text-center py-12 text-gray-500">The moderation queue is empty.</div>
      ) : (
        <div className="space-y-4">
          {list.map(c => (
            <div key={c.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-lg">{c.title}</div>
                  <div className="text-sm text-gray-500 mb-2">For: {c.company_name}</div>
                </div>
                <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{c.description}</p>
              <div className="mt-4 flex gap-3">
                <Button onClick={() => approve(c)} className="bg-green-600 hover:bg-green-700">Approve</Button>
                <Button variant="destructive" onClick={() => reject(c)}>Reject</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}