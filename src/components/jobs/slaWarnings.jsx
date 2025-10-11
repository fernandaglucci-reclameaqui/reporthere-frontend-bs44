import { Complaint, Company } from "@/api/entities";
import { notifySlaBreach } from "@/components/api/notifications";

export default async function runSlaWarnings() {
  const list = await Complaint.filter({ status: "waiting_company" }, "-sla_due_at", 1000);
  let warningsSent = 0;
  
  for (const c of list) {
    if (!c.sla_due_at) continue;
    if (new Date(c.sla_due_at).getTime() < Date.now()) {
      let companyEmail = null;
      try {
        const company = await Company.get(c.company_id);
        companyEmail = company?.email || `support@${company?.primary_domain || "example.com"}`;
      } catch (e) {
        companyEmail = `support@${c.company_domain || "example.com"}`;
      }
      
      await notifySlaBreach(companyEmail, c);
      warningsSent++;
    }
  }
  
  return { success: true, message: `SLA warnings job completed. Sent ${warningsSent} warnings.` };
}