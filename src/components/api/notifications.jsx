import { SendEmail } from "@/api/integrations";

export async function sendEmail(to, subject, body) {
  await SendEmail({ to, subject, body });
}

export async function notifyCompanyNewComplaint(company, complaint) {
  const to = company?.support_email || `support@${company?.primary_domain || "example.com"}`;
  await sendEmail(to, "New complaint received", `Title: ${complaint.title}\n\n${complaint.description}`);
}

export async function notifyConsumerCompanyResponded(consumerEmail, complaint) {
  if (!consumerEmail) return;
  await sendEmail(consumerEmail, "Company responded to your complaint", `Check the thread for: ${complaint.title}`);
}

export async function notifySlaBreach(companyEmail, complaint) {
  if (!companyEmail) return;
  await sendEmail(companyEmail, "SLA warning: complaint overdue", `Complaint "${complaint.title}" has exceeded its SLA.`);
}

export async function notifySurveyReminder(consumerEmail, complaint, whenLabel="48h") {
  if (!consumerEmail) return;
  await sendEmail(consumerEmail, `Survey reminder (${whenLabel})`, `Please rate your experience for "${complaint.title}".`);
}