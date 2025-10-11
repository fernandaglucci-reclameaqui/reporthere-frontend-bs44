import { Subscription, CompanyReplyLog } from "@/api/entities";

export const FREE_MONTHLY_REPLIES = 10;

export async function getCompanyPlan(company_id){
  if (!company_id) return { plan: "Free", status: "active", seats: 1 };
  const s = await Subscription.filter({ company_id }, "-created_date", 1);
  const plan = s?.[0]?.plan || "Free";
  const status = s?.[0]?.status || "active";
  const seats = s?.[0]?.seats || 1;
  return { plan, status, seats };
}

export async function countRepliesThisMonth(company_id){
  if (!company_id) return 0;
  const since = new Date(); since.setDate(1); since.setHours(0,0,0,0);
  const rows = await CompanyReplyLog.filter({ company_id, created_at: { $gte: since.toISOString() } }, "-created_at", 2000);
  return rows.length;
}

export async function canReply(company_id){
  const { plan } = await getCompanyPlan(company_id);
  if (plan !== "Free") return { ok: true };
  const n = await countRepliesThisMonth(company_id);
  if (n < FREE_MONTHLY_REPLIES) return { ok: true, remaining: FREE_MONTHLY_REPLIES - n };
  return { ok: false, reason: "quota" };
}