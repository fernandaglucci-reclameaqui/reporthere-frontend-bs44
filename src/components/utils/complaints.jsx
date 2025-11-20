import { Complaint } from "@/api/entities";

export async function unresolvedCount(company_id) {
  const rows = await Complaint.filter(
    { company_id, status: { $in: ["new", "waiting_company", "company_replied", "submitted", "under_review"] } },
    "-created_date", 1000
  );
  return rows.length;
}

export async function unresolvedList(company_id, limit=50) {
  return Complaint.filter(
    { company_id, status: { $in: ["new", "waiting_company", "company_replied", "submitted", "under_review"] } },
    "-created_date", limit
  );
}