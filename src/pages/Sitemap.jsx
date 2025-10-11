import React, { useEffect, useState } from "react";
import { Company } from "@/api/entities";
import { createPageUrl } from "@/utils";

export default function Sitemap(){
  const [items, setItems] = useState([]);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    Company.list("name", 1000).then(setItems);
    setOrigin(window.location.origin);
  }, []);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    (items.length > 0 ? items.map(c => 
      `<url><loc>${origin}${createPageUrl(`CompanyProfile?${c.slug ? `slug=${c.slug}` : `id=${c.id}`}`)}</loc></url>`
    ).join("\n") : "") +
    `\n</urlset>`;
    
  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace' }}>
      {xml}
    </pre>
  );
}