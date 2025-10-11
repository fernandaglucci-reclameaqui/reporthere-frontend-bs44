export default function Robots() {
  const body = `User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain" }
  });
}