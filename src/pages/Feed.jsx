import React, { useEffect, useState } from "react";
import { Post } from "@/api/entities";
import { createPageUrl } from "@/utils";

export default function Feed(){
  const [items,setItems] = useState([]);
  const [origin, setOrigin] = useState("");

  useEffect(()=>{ 
    Post.filter({status:"published"},"-created_at",50).then(setItems);
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  },[]);

  const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>ReportHere Blog</title>
<link>${origin}</link>
<description>Updates, news, and insights on consumer trust and business reputation.</description>
<atom:link href="${origin}/Feed" rel="self" type="application/rss+xml" />
${items.map(p => `<item>
  <title>${escapeXml(p.title)}</title>
  <link>${origin}${createPageUrl("BlogPost")}?slug=${p.slug||p.id}</link>
  <guid isPermaLink="false">${p.id}</guid>
  <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
  <description>${escapeXml(p.body_markdown.substring(0, 250))}...</description>
</item>`).join("\n")}
</channel>
</rss>`;

  return (<pre style={{whiteSpace: 'pre', fontFamily: 'monospace', margin: 0, padding: 0}}>{xml}</pre>);
}