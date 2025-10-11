import { Complaint, ComplaintSurvey, User } from "@/api/entities";
import { notifySurveyReminder } from "@/components/api/notifications";

export default async function runSurveyReminders() {
  const list = await Complaint.filter({ status: "company_replied" }, "-updated_date", 1000);
  const now = Date.now();
  let remindersSent = 0;

  for (const c of list) {
    const survey = await ComplaintSurvey.filter({ complaint_id: c.id }, "-created_date", 1);
    if (survey.length) continue;

    const lastTs = new Date(c.updated_date || c.created_date).getTime();
    const ageHours = (now - lastTs) / 36e5;

    // Get consumer email
    let consumerEmail = null;
    try {
      const consumer = await User.get(c.created_by);
      consumerEmail = consumer?.email;
    } catch (e) {
      continue;
    }

    if (Math.abs(ageHours - 48) < 1) {
      await notifySurveyReminder(consumerEmail, c, "48h");
      remindersSent++;
    }
    if (Math.abs(ageHours - 168) < 1) { // 7 days
      await notifySurveyReminder(consumerEmail, c, "7d");
      remindersSent++;
    }
  }
  
  return { success: true, message: `Survey reminders job completed. Sent ${remindersSent} reminders.` };
}