import React from "react";
import { Company } from "@/api/entities";
import { Complaint } from "@/api/entities";
import { createPageUrl } from "@/utils";

const generateSitemap = async () => {
    const baseUrl = "https://your-app-name.base44.com"; // Change this to your actual domain
    
    const staticPages = [
        "",
        "companies",
        "complaints",
        "claim-wizard",
        "FileComplaint",
        "terms",
        "privacy",
        "contact-us"
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    staticPages.forEach(page => {
        sitemap += `
  <url>
    <loc>${baseUrl}${createPageUrl(page)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    });

    // Add company pages
    try {
        const companies = await Company.list();
        companies.forEach(company => {
            sitemap += `
  <url>
    <loc>${baseUrl}${createPageUrl(`company/${company.slug}`)}</loc>
    <lastmod>${company.updated_date}</lastmod>
    <priority>0.7</priority>
  </url>`;
        });
    } catch (e) { console.error("Failed to fetch companies for sitemap", e); }

    // Add complaint pages
    try {
        const complaints = await Complaint.filter({ status: "published" });
        complaints.forEach(complaint => {
            sitemap += `
  <url>
    <loc>${baseUrl}${createPageUrl(`complaint/${complaint.id}`)}</loc>
    <lastmod>${complaint.updated_date}</lastmod>
    <priority>0.6</priority>
  </url>`;
        });
    } catch (e) { console.error("Failed to fetch complaints for sitemap", e); }


    sitemap += `
</urlset>`;

    return sitemap;
};

export default async function Sitemap() {
  const body = await generateSitemap();
  return new Response(body, {
    headers: { "Content-Type": "application/xml" }
  });
}