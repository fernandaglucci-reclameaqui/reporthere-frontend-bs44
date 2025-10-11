import React from 'react';

export default function StatusChip({ status }) {
  const map = {
    // Complaint Statuses
    SUBMITTED: { text: "Pending", className: "bg-gray-100 text-gray-800" },
    PUBLISHED: { text: "Open", className: "bg-yellow-100 text-yellow-800" },
    RESPONDED: { text: "Answered", className: "bg-blue-100 text-blue-800" },
    RESOLVED: { text: "Resolved", className: "bg-green-100 text-green-800" },
    REJECTED: { text: "Rejected", className: "bg-red-100 text-red-800" },
    
    // Internal / Company view statuses
    UNANSWERED: { text: "Unanswered", className: "bg-yellow-100 text-yellow-800" },
    IN_PROGRESS:{ text: "In progress", className: "bg-blue-100 text-blue-800" },
    OVERDUE: { text: "Overdue", className: "bg-red-100 text-red-800" }
  };
  const s = map[status] || { text: status.toLowerCase().replace(/_/g, ' '), className: "bg-gray-100 text-gray-800" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${s.className}`}>{s.text}</span>;
}