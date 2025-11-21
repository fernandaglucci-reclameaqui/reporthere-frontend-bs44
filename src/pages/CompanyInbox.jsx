import React, { useEffect, useMemo, useState } from "react";
import { Complaint } from "@/api/entities";
import { User } from "@/api/entities";
import { CompanyMember } from "@/api/entities";
import { Subscription } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createPageUrl } from "@/utils";
import { requireCompanyRole, withinSeatLimit } from "../components/utils/rbac";

// Helper: resolve company_id for the logged-in user
async function getMyCompanyId() {
  const me = await User.me();
  // If your auth already stores company_id on the user, prefer that:
  if (me?.company_id) return me.company_id;

  // Fallback: look up membership
  try {
    const rows = await CompanyMember.filter({ user_id: me.id }, "-created_at", 1);
    return rows?.[0]?.company_id || null;
  } catch (e) {
    return null;
  }
}

// SLA utilities
function hoursUntil(dateIso) {
  if (!dateIso) return null;
  const diffMs = new Date(dateIso).getTime() - Date.now();
  return Math.round(diffMs / 36e5);
}
function isOverdue(dateIso) {
  if (!dateIso) return false;
  return new Date(dateIso).getTime() < Date.now();
}

export default function CompanyInbox() {
  const [companyId, setCompanyId] = useState(null);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("new");
  const [search, setSearch] = useState("");
  const [memberRole, setMemberRole] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [memberCount, setMemberCount] = useState(0);
  const [error, setError] = useState(null);

  // Load company id and initial list
  useEffect(() => {
    (async () => {
      setLoading(true);
      const cid = await getMyCompanyId();
      setCompanyId(cid);
      if (cid) {
        try {
          const me = await User.me();
          const [members, subscriptions] = await Promise.all([
            CompanyMember.filter({ company_id: cid }),
            Subscription.filter({ company_id: cid }, "-created_at", 1)
          ]);
          
          const myMembership = members.find(m => m.user_id === me.id);
          setMemberRole(myMembership?.role || null);
          setMemberCount(members.length);
          setSubscription(subscriptions[0] || null);
        } catch(e) {
          console.error("Could not fetch member role:", e);
        }
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!companyId) return;
    (async () => {
      setLoading(true);
      const filter = { company_id: companyId };
      if (statusFilter && statusFilter !== "all") filter.status = statusFilter;
      const rows = await Complaint.filter(filter, "-created_at");
      const filtered = rows.filter(r => {
        if (!search?.trim()) return true;
        const q = search.toLowerCase();
        return (r.title || "").toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q);
      });
      setList(filtered);
      setLoading(false);
    })();
  }, [companyId, statusFilter, search]);

  const tabs = useMemo(() => ([
    { key: "new", label: "New" },
    { key: "waiting_company", label: "Waiting Company" },
    { key: "company_replied", label: "Waiting Customer" },
    { key: "resolved", label: "Resolved" },
    { key: "all", label: "All" },
  ]), []);

  const canPerformActions = memberRole && ["agent", "admin", "owner"].includes(memberRole);
  const isAtSeatLimit = !withinSeatLimit(subscription, memberCount);

  const assignToMe = async (c) => {
    try {
      requireCompanyRole(memberRole, "agent");
      const me = await User.me();
      const due = new Date(Date.now() + 48 * 3600 * 1000).toISOString();
      const updated = await Complaint.update(c.id, { assigned_to: me.id, sla_due_at: due, status: "waiting_company" });
      setList(rows => rows.map(r => r.id === c.id ? { ...r, ...updated } : r));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const setInternalNote = async (c, noteText) => {
    try {
      requireCompanyRole(memberRole, "agent");
      const updated = await Complaint.update(c.id, { internal_note: noteText || "" });
      setList(rows => rows.map(r => r.id === c.id ? { ...r, ...updated } : r));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const cannedResponse = async (c, variant = "ack") => {
    try {
      requireCompanyRole(memberRole, "agent");
      const maps = {
        ack: "Thanks for your report. We're reviewing it and will update you soon.",
        info: "Could you share your order number and any screenshots to help us investigate?",
        solved: "We believe this issue is solved. If not, please reply here so we can reopen."
      };
      const text = maps[variant] || maps.ack;
      const updated = await Complaint.update(c.id, { business_response: text, status: "company_replied" });
      setList(rows => rows.map(r => r.id === c.id ? { ...r, ...updated } : r));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const markResolved = async (c) => {
    try {
      requireCompanyRole(memberRole, "agent");
      const updated = await Complaint.update(c.id, { status: "resolved", closed_at: new Date().toISOString() });
      setList(rows => rows.map(r => r.id === c.id ? { ...r, ...updated } : r));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Inbox</h1>
          <div className="flex gap-2">
            <input
              className="border rounded px-3 py-2 text-sm w-64"
              placeholder="Search by title/description"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Access Control Banners */}
        {!canPerformActions && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertDescription>
              <strong>Limited Access:</strong> You have viewer-only permissions. 
              Contact a company admin to request agent access for complaint management.
            </AlertDescription>
          </Alert>
        )}

        {isAtSeatLimit && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="flex items-center justify-between">
              <div>
                <strong>Seat Limit Reached:</strong> Your team has reached the maximum number of seats ({subscription?.seats || 3}) for your {subscription?.plan || 'Free'} plan.
              </div>
              <Button size="sm" variant="outline">
                Upgrade Plan
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription>
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(t => (
            <Button
              key={t.key}
              variant={statusFilter === t.key ? "default" : "outline"}
              onClick={() => setStatusFilter(t.key)}
            >
              {t.label}
            </Button>
          ))}
        </div>

        {loading && <div className="text-gray-600">Loading...</div>}
        {!loading && list.length === 0 && (
          <div className="text-gray-500">No complaints found.</div>
        )}

        <div className="space-y-4">
          {list.map(c => {
            const hoursLeft = hoursUntil(c.sla_due_at);
            const overdue = isOverdue(c.sla_due_at);
            return (
              <div key={c.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{c.title}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Status: <span className="font-medium">{c.status || "new"}</span>
                      {c.assigned_to ? ` • Assigned to: ${c.assigned_to}` : " • Unassigned"}
                      {c.category ? ` • ${c.category}` : ""}
                    </div>
                    <p className="mt-2 text-gray-800 whitespace-pre-wrap">{c.description}</p>
                  </div>

                  <div className="text-right min-w-[180px]">
                    <div className={`text-xs inline-block px-2 py-1 rounded ${overdue ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"}`}>
                      SLA {overdue ? "overdue" : "due"} {c.sla_due_at ? `(${overdue ? `${Math.abs(hoursLeft)}h late` : `in ${hoursLeft}h`})` : "(not set)"}
                    </div>
                    <div className="mt-2 space-x-2">
                      {!c.assigned_to && (
                        <Button size="sm" onClick={() => assignToMe(c)} disabled={!canPerformActions}>
                          Assign to me
                        </Button>
                      )}
                      <Button size="sm" variant="outline" onClick={() => cannedResponse(c, "ack")} disabled={!canPerformActions}>
                        Ack
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cannedResponse(c, "info")} disabled={!canPerformActions}>
                        Ask Info
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => cannedResponse(c, "solved")} disabled={!canPerformActions}>
                        Solved
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => markResolved(c)} disabled={!canPerformActions}>
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-sm text-gray-600">Internal note (private)</label>
                  <Textarea
                    className="mt-1"
                    defaultValue={c.internal_note || ""}
                    placeholder={canPerformActions ? "Write a private note…" : "View only - no edit permissions"}
                    onBlur={(e) => setInternalNote(c, e.target.value)}
                    disabled={!canPerformActions}
                  />
                </div>

                <div className="mt-3 text-sm">
                  <a className="text-green-700 hover:underline" href={createPageUrl(`CompanyProfile?id=${c.company_id}`)}>
                    View public company page →
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}