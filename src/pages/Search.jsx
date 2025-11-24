import React, { useState, useEffect, useCallback } from "react";
import { Company } from "@/api/entities";
import { createPageUrl } from "@/utils";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Search(){
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || ""); 
  const [res, setRes] = useState([]); 
  const [loading, setLoading] = useState(false);

  const go = useCallback(async () => {
    if (!q.trim()) {
      setRes([]);
      return;
    }
    setLoading(true);
    try {
      const rows = await Company.filter({ name: { $ilike: `%${q}%` } }, "name", 50);
      setRes(rows); 
    } catch (e) {
      console.error("Search failed:", e);
      setRes([]);
    }
    setLoading(false);
  }, [q]);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      go();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [go]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-3">Search Companies</h1>
      <div className="flex gap-2">
        <Input 
          className="flex-1 p-2" 
          value={q} 
          onChange={e => setQ(e.target.value)} 
          placeholder="Type a company name" 
        />
        <Button onClick={go} disabled={loading}>{loading ? "Searching..." : "Search"}</Button>
      </div>
      <ul className="mt-4 space-y-2">
        {res.map(c => (
          <li key={c.id}>
            <Link 
              to={createPageUrl(`CompanyProfile?${c.slug ? `slug=${c.slug}` : `id=${c.id}`}`)} 
              className="text-blue-600 hover:underline"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}