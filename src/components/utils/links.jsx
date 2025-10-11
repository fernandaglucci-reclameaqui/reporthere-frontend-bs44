import { createPageUrl } from "@/utils";

export function companyProfileUrl(c) {
  if (c?.slug) return createPageUrl(`company/${encodeURIComponent(c.slug)}`);
  if (c?.id) return createPageUrl(`CompanyProfile?id=${encodeURIComponent(c.id)}`); // Fallback
  return createPageUrl("companies");
}