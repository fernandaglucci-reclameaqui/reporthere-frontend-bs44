import React, {useEffect, useState} from "react";
import { Complaint, Company, CompanyMetricsDaily } from "@/api/entities";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AdminAnalytics(){
  const [totComplaints,setTotComplaints]=useState(0);
  const [topCompanies,setTopCompanies]=useState([]);
  const [recent,setRecent]=useState([]);
  const [allCompanies, setAllCompanies] = useState({});

  useEffect(()=>{
    (async ()=>{
      const companies = await Company.list();
      const companyMap = companies.reduce((acc, c) => {
        acc[c.id] = c.name;
        return acc;
      }, {});
      setAllCompanies(companyMap);

      const last = await Complaint.list("-created_at", 1000);
      setTotComplaints(last.length);

      const counts = {};
      last.forEach(c=>{ counts[c.company_id]=(counts[c.company_id]||0)+1; });
      const top = Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
      setTopCompanies(top);

      setRecent(last.slice(0,10));
    })();
  },[]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Total Complaints (last 1000)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totComplaints}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Companies by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {topCompanies.map(([id,n])=> (
                <li key={id} className="flex justify-between items-center">
                  <Link to={createPageUrl(`CompanyProfile?id=${id}`)} className="text-blue-600 hover:underline">
                    {allCompanies[id] || id}
                  </Link>
                  <span className="font-semibold">{n}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recent.map(c=> (
                <li key={c.id} className="text-sm">
                  <p className="font-medium truncate">{c.title}</p>
                  <p className="text-gray-500">
                    For: <Link to={createPageUrl(`CompanyProfile?id=${c.company_id}`)} className="text-blue-600 hover:underline">
                      {allCompanies[c.company_id] || c.company_id}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}