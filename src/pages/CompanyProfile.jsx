import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Company } from "@/api/entities";
import { Complaint } from "@/api/entities";
import { createPageUrl } from "@/utils";

export default function CompanyPublicPage() {
  const { slug } = useParams();
  const [data, setData] = useState({ company: { name: "(loading...)" }, recent: [] });
  const [state, setState] = useState("loading");

  // MOUNT BEACON (from user instructions)
  useEffect(() => { console.log("[CMP] mount, slug=", slug); }, [slug]);

  useEffect(() => {
    let mounted = true;
    setState("loading");
    const loadData = async () => {
        try {
            if (!slug) throw new Error("Company slug not provided");
            const companies = await Company.filter({ slug });
            if (!companies || companies.length === 0) throw new Error(`Company '${slug}' not found`);
            const companyData = companies[0];

            const recentComplaints = await Complaint.filter({ company_id: companyData.id, status: 'published' }, '-published_date', 5);

            if (mounted) {
                setData({ company: companyData, recent: recentComplaints });
                setState("ok");
            }
        } catch (e) {
            console.error("[CMP] fetch error:", e);
            if (mounted) setState("error");
        }
    };
    loadData();
    return () => { mounted = false; };
  }, [slug]);

  // --- NEVER return null; always show visible UI ---
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div style={{position:"fixed",top:64,left:4,zIndex:99998,background:"#06c",color:"#fff",padding:"2px 6px",borderRadius:4}}>CMP MOUNT</div>
      <h1 className="text-3xl font-bold">{data.company?.name || "Company"}</h1>
      {data.company?.website && <p className="text-gray-600">{data.company.website}</p>}

      {state === "loading" && <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg">Loading company…</div>}
      {state === "error"   && <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg">Couldn’t load company data. Please try again later.</div>}

      <section className="p-0 mt-6 border rounded-lg bg-white">
        <div className="p-4 border-b font-semibold text-gray-800">Recent complaints</div>
        <ul>
          {(data.recent ?? []).map(it => (
            <li key={it.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
               <Link to={createPageUrl(`complaint/${it.id}`)}>
                    <div className="font-medium text-gray-800">{it.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(it.created_at).toLocaleString()}</div>
               </Link>
            </li>
          ))}
          {(data.recent ?? []).length === 0 && state === "ok" && (
            <li className="p-6 text-gray-600">No public complaints have been filed for this company yet.</li>
          )}
        </ul>
      </section>
    </div>
  );
}