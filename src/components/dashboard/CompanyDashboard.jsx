
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/api/supabaseClient";
import { createPageUrl } from "@/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusTabs = [
  { key: "UNANSWERED", label: "Unanswered" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "OVERDUE", label: "Overdue" },
  { key: "RESOLVED", label: "Resolved" }
];

function SkeletonDashboard() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-24 bg-gray-200 rounded-lg" />)}
      </div>
      <div className="h-12 bg-gray-200 rounded-lg" />
      <div className="h-64 bg-gray-200 rounded-lg" />
    </div>
  );
}

function CompanyEmptyState({ status }) {
  const copy = {
    UNANSWERED: {
      title: "No unanswered complaints — yet.",
      tip: "When a new complaint mentions your company, it will appear here for first response."
    },
    IN_PROGRESS: {
      title: "No active conversations.",
      tip: "Threads you’ve replied to will appear here until resolved."
    },
    OVERDUE: {
      title: "Great! No overdue items.",
      tip: "Keep an eye on SLAs to avoid late responses."
    },
    RESOLVED: {
      title: "No resolved complaints in this view.",
      tip: "Close a case to move it here."
    }
  }[status] || {
    title: "Nothing here yet.",
    tip: "Adjust filters above."
  };

  return (
    <div className="p-10 text-center text-gray-600">
      <h3 className="text-lg font-semibold mb-2">{copy.title}</h3>
      <p>{copy.tip}</p>
    </div>
  );
}

function KpiCard({ label, value, warning }) {
  return (
    <Card className={`p-4 ${warning ? "border border-red-400 bg-red-50" : ""}`}>
      <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </Card>
  );
}

function Pagination({ total, page, pageSize, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 p-3 border-t">
      <Button variant="outline" disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</Button>
      <span className="text-sm text-gray-600">Page {page} of {pages}</span>
      <Button variant="outline" disabled={page >= pages} onClick={() => onChange(page + 1)}>Next</Button>
    </div>
  );
}

// Main Component
export default function CompanyDashboard({ company }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [kpis, setKpis] = useState({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("UNANSWERED");
  const [credits, setCredits] = useState(company?.credits_available || 0);

  const pageSize = 20;

  const calculateKpis = (allComplaints) => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const resolvedLast30d = allComplaints.filter(c => c.status === 'resolved' && new Date(c.closed_at) > thirtyDaysAgo).length;
      const newThisWeek = allComplaints.filter(c => new Date(c.created_at) > sevenDaysAgo).length;
      const open = allComplaints.filter(c => ['published', 'responded', 'waiting_company', 'waiting_customer'].includes(c.status)).length;
      const overdue = allComplaints.filter(c => c.sla_due_at && new Date(c.sla_due_at) < now && c.status !== 'resolved').length;
      
      return {
          new_week: newThisWeek,
          open: open,
          overdue: overdue,
          resolved_30d: resolvedLast30d,
          response_rate_30d: company.resolution_rate || 0, // Placeholder
          median_first_reply_hours_30d: company.response_time_hours || 0, // Placeholder
      };
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch all complaints for KPI calculation first
      const { Complaint } = await import('@/api/entities');
      const allCompanyComplaints = await Complaint.filter({ company_id: company.id });
      const calculatedKpis = calculateKpis(allCompanyComplaints);
      setKpis(calculatedKpis);

      // Then fetch paginated/filtered complaints for display
      const filterConfig = { company_id: company.id };
      
      const statusMap = {
        "UNANSWERED": "published",
        "IN_PROGRESS": "responded",
        "RESOLVED": "resolved",
      };

      if (status === "OVERDUE") {
          filterConfig.sla_due_at = { "$lt": new Date().toISOString() };
      } else if (statusMap[status]) {
          filterConfig.status = statusMap[status];
      }

      if (q) {
          // This SDK doesn't support complex OR filters, so we do a simple title search
          // A backend function would be better for a real 'q' search
      }
      
      const complaintItems = await Complaint.list('-created_at', pageSize, (page - 1) * pageSize);
      const totalCount = complaintItems.length;
      
      // Client-side search for 'q' as a temporary measure
      const searchedItems = q ? complaintItems.filter(c => c.title.toLowerCase().includes(q.toLowerCase())) : complaintItems;

      setComplaints(searchedItems);
      setTotal(q ? searchedItems.length : totalCount); // Adjust total for client-side search
      setLoading(false);
    };

    if (company) {
      setCredits(company.credits_available || 0);
      fetchData();
    }
  }, [company, status, q, page]);

  if (loading) return <SkeletonDashboard />;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span>Profile {company.claimed_by ? "claimed" : "unclaimed"}</span>
            <span className="text-gray-300">•</span>
            <Badge variant={company.verified_status === 'verified' ? 'default' : 'secondary'} className={company.verified_status === 'verified' ? 'bg-green-100 text-green-800' : ''}>
              {company.verified_status || 'Unverified'}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={() => navigate("/Billing")}>
            Billing & Credits
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="New (7d)" value={kpis?.new_week ?? 0} />
        <KpiCard label="Reply Credits" value={credits} />
        <KpiCard label="Overdue" value={kpis?.overdue ?? 0} warning={kpis?.overdue > 0} />
        <KpiCard label="Resolved (30d)" value={kpis?.resolved_30d ?? 0} />
        <KpiCard label="Response rate" value={`${Math.round(kpis?.response_rate_30d)}%`} />
        <KpiCard label="1st reply (hrs)" value={kpis?.median_first_reply_hours_30d?.toFixed(1) ?? '0.0'} />
      </section>

      <section className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
          {statusTabs.map(t => (
            <button key={t.key}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${status === t.key ? "bg-white text-gray-800 shadow-sm" : "text-gray-600 hover:bg-gray-200"}`}
              onClick={() => { setStatus(t.key); setPage(1); }}>
              {t.label}
            </button>
          ))}
        </div>
        <Input
          className="max-w-xs"
          placeholder="Search by subject..."
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
      </section>

      <Card>
        <CardContent className="p-0">
          {complaints.length === 0 ? (
            <CompanyEmptyState status={status} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b">
                    <th className="py-3 px-4 font-medium text-gray-600">Subject</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="py-3 px-4 font-medium text-gray-600">SLA Due</th>
                    <th className="py-3 px-4 font-medium text-gray-600">Last Activity</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(row => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{row.title}</div>
                        <div className="text-gray-500 text-xs">{row.category.replace(/_/g, ' ')}</div>
                      </td>
                      <td className="py-3 px-4 capitalize">{row.status.replace(/_/g, ' ')}</td>
                      <td className="py-3 px-4">{row.sla_due_at ? new Date(row.sla_due_at).toLocaleDateString() : "—"}</td>
                      <td className="py-3 px-4">{new Date(row.updated_date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="secondary" size="sm" asChild>
                           <Link to={createPageUrl(`complaint/${row.id}`)}>Open</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
