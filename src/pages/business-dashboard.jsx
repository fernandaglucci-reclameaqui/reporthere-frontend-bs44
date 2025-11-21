import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from "@/api/entities";
import { Company } from "@/api/entities";
import { Complaint } from "@/api/entities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Loader2, AlertTriangle, Briefcase, ClipboardList, Download, Upload } from "lucide-react";
import { calculateCoreMetrics } from '@/services/dashboardMetrics';
import LovedScoreCard from '@/components/dashboard/LovedScoreCard';
import ReputationSnapshot from '@/components/dashboard/ReputationSnapshot';
import StatusChip from "@/components/ui/StatusChip";

// --- Helper Components from previous prompt ---
function Kpi({ label, value, sub }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
    </div>
  );
}

function Bars({ data, a, b }) {
    const W = 520, H = 160, pad = 24;
    if (!data || data.length === 0) return <div className="h-full w-full bg-gray-50 rounded-md" />;
    const max = Math.max(1, ...data.map((d) => Math.max(Number(d[a]), Number(d[b]))));
    const barW = (W - pad * 2) / (data.length * 2.2);
    return (
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Opened vs Resolved">
        <g transform={`translate(${pad},${pad})`}>
            {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
            <g key={i}>
                <line x1={0} x2={W - pad * 2} y1={(1 - t) * (H - pad * 2)} y2={(1 - t) * (H - pad * 2)} stroke="#eee" />
                <text x={-8} y={(1 - t) * (H - pad * 2)} textAnchor="end" dominantBaseline="middle" fontSize="10" fill="#888">{Math.round(t * max)}</text>
            </g>
            ))}
            {data.map((d, i) => {
            const x = i * (barW * 2.2);
            const h1 = (Number(d[a]) / max) * (H - pad * 2);
            const h2 = (Number(d[b]) / max) * (H - pad * 2);
            return (
                <g key={i} transform={`translate(${x},0)`}>
                <rect x={0} y={(H - pad * 2) - h1} width={barW} height={h1} rx={6} fill="#cfe4ff" />
                <rect x={barW + 6} y={(H - pad * 2) - h2} width={barW} height={h2} rx={6} fill="#c7f0d5" />
                <text x={barW} y={H - pad * 2 + 12} textAnchor="middle" fontSize="11" fill="#666">{d.week}</text>
                </g>
            );
            })}
        </g>
        </svg>
    );
}

function Donut({ data }) {
    if (!data || data.length === 0) return <div className="h-full w-full bg-gray-50 rounded-full" />;
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const R = 60, r = 36, cx = 90, cy = 90, colors = ["#fde68a", "#bfdbfe", "#fecaca", "#bbf7d0"];
    let acc = 0;
    return (
        <svg width="100%" height="200" viewBox="0 0 180 180" role="img" aria-label="Cases by Status">
        {data.map((d, i) => {
            const start = (acc / total) * Math.PI * 2; acc += d.value;
            const end = (acc / total) * Math.PI * 2;
            const large = end - start > Math.PI ? 1 : 0;
            const x1 = cx + R * Math.cos(start), y1 = cy + R * Math.sin(start);
            const x2 = cx + R * Math.cos(end), y2 = cy + R * Math.sin(end);
            const path = `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} Z`;
            return <path key={i} d={path} fill={colors[i % colors.length]} />;
        })}
        <circle cx={cx} cy={cy} r={r} fill="#fff" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="#222">{total}</text>
        </svg>
    );
}

function Lines({ data }) {
    if (!data || data.length === 0) return <div className="h-full w-full bg-gray-50 rounded-md" />;
    const W = 520, H = 160, pad = 24;
    const keys = ["pos", "neu", "neg"];
    const max = Math.max(1, ...data.flatMap(d => keys.map(k => Number(d[k]))));
    const X = (i) => pad + (i * (W - pad * 2)) / Math.max(1, data.length - 1);
    const Y = (v) => pad + (H - pad * 2) - (v / max) * (H - pad * 2);
    const mkPath = (k) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${X(i)} ${Y(Number(d[k]))}`).join(" ");
    const colors = { pos: "#16a34a", neu: "#6b7280", neg: "#dc2626" };
    return (
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Sentiment">
        <g>
            <path d={mkPath("pos")} fill="none" stroke={colors.pos} strokeWidth="2" />
            <path d={mkPath("neu")} fill="none" stroke={colors.neu} strokeWidth="2" />
            <path d={mkPath("neg")} fill="none" stroke={colors.neg} strokeWidth="2" />
        </g>
        {data.map((d, i) => <text key={i} x={X(i)} y={H - 4} textAnchor="middle" fontSize="11" fill="#666">{d.day}</text>)}
        </svg>
    );
}
// --- Main Component ---
export default function CompanySuperDashboard() {
  const [view, setView] = useState("loading"); // loading, dashboard, error, wrong_user
  const [data, setData] = useState({ kpis: null, weekly: null, statuses: null, sentiment: null, list: null });
  const [fetchErrors, setFetchErrors] = useState({});
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const loadAllData = async () => {
        try {
            const currentUser = await User.me();
            if (currentUser.user_type !== 'business' || !currentUser.companies_claimed?.length) {
                setView("wrong_user");
                return;
            }
            
            const companyId = currentUser.companies_claimed[0];

            // In a real app, these would be API calls to backend functions
            // For now, we simulate them by fetching and processing data on the client.
            const [company, allComplaints] = await Promise.all([
                Company.get(companyId),
                Complaint.filter({ company_id: companyId })
            ]);

            // --- Process KPIs ---
            const kpisData = { open: 0, resolved_30d: 0, first_response_avg_hours: 0, sla_met_30d: 0 };
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            kpisData.open = allComplaints.filter(c => ['published', 'responded'].includes(c.status)).length;
            kpisData.resolved_30d = allComplaints.filter(c => c.status === 'resolved' && new Date(c.closed_at) > thirtyDaysAgo).length;
            kpisData.first_response_avg_hours = company.response_time_hours || 0;
            const relevantForSla = allComplaints.filter(c => c.published_date && new Date(c.published_date) > thirtyDaysAgo);
            const metSla = relevantForSla.filter(c => c.business_response_date && (new Date(c.business_response_date) - new Date(c.published_date)) < (24 * 60 * 60 * 1000));
            kpisData.sla_met_30d = relevantForSla.length > 0 ? Math.round((metSla.length / relevantForSla.length) * 100) : 100;
            
            // --- Process Statuses ---
            const statusesData = allComplaints.reduce((acc, c) => {
                const statusKey = c.status === 'published' ? 'Pending' : c.status === 'responded' ? 'In Progress' : c.status === 'resolved' ? 'Resolved' : 'Other';
                const existing = acc.find(s => s.name === statusKey);
                if (existing) existing.value++;
                else acc.push({ name: statusKey, value: 1});
                return acc;
            }, []);
            
            // Calculate Phase 1 metrics
            const coreMetrics = calculateCoreMetrics(allComplaints);
            
            setData({
                kpis: kpisData,
                weekly: [ { week: "W1", opened: 5, resolved: 3 }, { week: "W2", opened: 8, resolved: 6 }, { week: "W3", opened: 4, resolved: 7 }, { week: "W4", opened: 9, resolved: 9 } ], // Demo
                statuses: statusesData,
                sentiment: [ { day: "Mon", pos: 46, neu: 32, neg: 22 }, { day: "Tue", pos: 52, neu: 28, neg: 20 }, { day: "Wed", pos: 41, neu: 35, neg: 24 }, { day: "Thu", pos: 55, neu: 25, neg: 20 }, { day: "Fri", pos: 49, neu: 31, neg: 20 }], // Demo
                list: allComplaints,
                coreMetrics: coreMetrics
            });
            setView("dashboard");

        } catch (error) {
            console.error("Dashboard loading failed:", error);
            setFetchErrors({ general: "Could not load dashboard data." });
            setView("error");
        }
    };
    loadAllData();
  }, []);

  const filtered = useMemo(() => {
    if (!data.list) return [];
    let rows = data.list;
    if (q) {
      const s = q.toLowerCase();
      rows = rows.filter(r => r.title.toLowerCase().includes(s));
    }
    if (status !== "all") {
        const statusMap = { "pending": "published", "in_progress": "responded", "resolved": "resolved", "overdue": "overdue" };
        rows = rows.filter(r => r.status === statusMap[status]);
    }
    return rows;
  }, [data.list, q, status]);

  if (view === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
        <p className="ml-4 text-lg text-gray-600">Loading Your Dashboard...</p>
      </div>
    );
  }

  if (view === 'wrong_user') {
    return (
       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-lg text-center shadow-lg">
                <CardContent className="p-10">
                    <Briefcase className="w-12 h-12 mx-auto text-green-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-800">Business Dashboard</h2>
                    <p className="text-gray-600 mt-2 mb-6">This dashboard is for business account holders. Your account is currently a consumer account.</p>
                    <Link to={createPageUrl("dashboard")}>
                        <Button>Go to My Consumer Dashboard</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  if (view === 'error') {
     return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
             <Card className="max-w-lg text-center shadow-lg">
                 <CardContent className="p-10">
                     <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                     <h2 className="text-xl font-bold text-gray-800">Could Not Load Dashboard</h2>
                     <p className="text-gray-600 mt-2 mb-6">{fetchErrors.general || "An unexpected error occurred."}</p>
                     <Button onClick={() => window.location.reload()}>Try Again</Button>
                 </CardContent>
             </Card>
         </div>
     );
  }

  // --- Main Dashboard View ---
  return (
    <div className="min-h-screen bg-white">
      <div style={{position:"fixed",top:64,left:4,zIndex:99998,background:"#ff7f50",color:"#fff",padding:"2px 6px",borderRadius:4, font:"10px sans-serif"}}>CMP-DASH MOUNT</div>
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Company Super Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl"><Download className="w-4 h-4 mr-2"/>Export</Button>
            <Button variant="outline" className="rounded-xl"><Upload className="w-4 h-4 mr-2"/>Import</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Phase 1: Reputation Snapshot */}
        {data.coreMetrics && (
          <ReputationSnapshot metrics={data.coreMetrics} />
        )}

        {/* Phase 1: Loved Score Card */}
        {data.coreMetrics && (
          <div className="grid grid-cols-1 gap-4">
            <LovedScoreCard lovedScore={data.coreMetrics.lovedScore} />
          </div>
        )}

        {/* Legacy KPIs - Keep for now */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi label="Open Complaints" value={data.kpis?.open ?? '...'} sub={fetchErrors.kpis ? "fallback" : undefined}/>
          <Kpi label="Resolved (30d)" value={data.kpis?.resolved_30d ?? '...'}/>
          <Kpi label="Avg First Response" value={`${data.kpis?.first_response_avg_hours ?? '...'}h`}/>
          <Kpi label="SLA Met (30d)" value={`${data.kpis?.sla_met_30d ?? '...'}%`}/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border p-4 shadow-sm lg:col-span-2">
            <h2 className="font-semibold mb-2">Opened vs Resolved (weekly)</h2>
            <div className="h-44"><Bars data={data.weekly} a="opened" b="resolved" /></div>
            {fetchErrors.weekly && <div className="text-xs text-red-700 mt-2">Couldn’t load weekly data — showing fallback.</div>}
          </div>

          <div className="rounded-2xl border p-4 shadow-sm">
            <h2 className="font-semibold mb-2">Cases by Status</h2>
            <div className="h-48"><Donut data={data.statuses}/></div>
            {fetchErrors.statuses && <div className="text-xs text-red-700 mt-2">Couldn’t load status summary — showing fallback.</div>}
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              {(data.statuses ?? []).map(s => (
                <div key={s.name} className="flex items-center justify-between">
                  <span>{s.name}</span><span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Customer Sentiment (last 5 days)</h2>
          <div className="h-44"><Lines data={data.sentiment}/></div>
          {fetchErrors.sentiment && <div className="text-xs text-red-700 mt-2">Couldn’t load sentiment — showing fallback.</div>}
        </div>

        <div className="rounded-2xl border p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative w-full sm:w-72">
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search by subject or customer" className="w-full border rounded-xl px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm w-4 h-4" />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" aria-label="Filter by status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-auto rounded-xl border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3">Subject</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Created</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 max-w-[360px] truncate" title={r.title}>{r.title}</td>
                    <td className="px-4 py-3"><StatusChip status={r.status.toUpperCase()}/></td>
                    <td className="px-4 py-3 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <Link to={createPageUrl(`complaint/${r.id}`)}>
                        <Button variant="ghost" size="sm">Open</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td className="px-4 py-6 text-gray-600 text-center" colSpan={4}>No complaints match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}