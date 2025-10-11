import { Company } from "@/api/entities";
import { unresolvedCount } from "@/components/utils/complaints";
import { companyProfileUrl } from "@/components/utils/links";
import { sendEmail } from "@/components/api/notifications";

export default async function runOutreachEmails({minUnresolved=3} = {}) {
  const companies = await Company.list("name", 2000);
  let emailsSent = 0;
  
  for (const c of companies) {
    if (c.verified_status === 'verified') continue; // Don't email verified companies

    const n = await unresolvedCount(c.id);
    if (n < minUnresolved) continue;

    const to = c.email || `info@${c.primary_domain || ""}`;
    if (!to.includes('@')) continue;

    const link = companyProfileUrl(c);
    const body = [
      `Hi ${c.name} team,`,
      ``,
      `We noticed ${n} customer complaints awaiting a response on ReportHere.`,
      `You can view your public profile and the unresolved complaints here: ${link}`,
      ``,
      `Replying to customers improves your public reputation score and search presence. Our free plan includes all the basic tools to get started.`,
      ``,
      `Thank you,`,
      `The ReportHere Team`
    ].join("\n");

    try {
      await sendEmail(to, `${n} customer complaints are waiting for your reply on ReportHere`, body);
      emailsSent++;
    } catch (error) {
      console.error(`Failed to send outreach email to ${to}:`, error);
    }
  }
  return { success: true, message: `Outreach job completed. Sent ${emailsSent} emails.` };
}