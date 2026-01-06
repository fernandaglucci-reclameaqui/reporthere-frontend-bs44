/**
 * Sitemap Generator for ReportHere
 * Generates XML sitemap for better SEO
 */

import { Complaint } from '@/api/entities';
import { Company } from '@/api/entities';

export async function generateSitemap() {
  const baseUrl = 'https://www.reporthere.org';
  
  try {
    // Fetch all public complaints and companies
    const [complaints, companies] = await Promise.all([
      Complaint.list({ limit: 1000, is_public: true }),
      Company.list({ limit: 1000 })
    ]);

    // Start XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'daily' },
      { url: '/complaints', priority: '0.9', changefreq: 'daily' },
      { url: '/companies', priority: '0.9', changefreq: 'daily' },
      { url: '/file-complaint', priority: '0.8', changefreq: 'monthly' },
      { url: '/about', priority: '0.5', changefreq: 'monthly' },
      { url: '/contact', priority: '0.5', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly' }
    ];

    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });

    // Add complaint pages
    complaints.forEach(complaint => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/complaint/${complaint.id}</loc>\n`;
      xml += `    <lastmod>${new Date(complaint.updated_at).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += '  </url>\n';
    });

    // Add company pages
    companies.forEach(company => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/company/${company.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(company.updated_at).toISOString().split('T')[0]}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

// Function to download sitemap
export function downloadSitemap(xml) {
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
