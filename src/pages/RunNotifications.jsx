import React, { useState } from "react";
import runSurveyReminders from "@/components/jobs/surveyReminders";
import runSlaWarnings from "@/components/jobs/slaWarnings";
import runOutreachEmails from "@/components/jobs/outreachEmails"; // Import new job
import { Button } from "@/components/ui/button";

export default function RunNotifications(){
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRunJob = async (jobFn, jobName) => {
    setLoading(true);
    setStatus(`Running ${jobName}...`);
    try {
      const result = await jobFn();
      setStatus(result.message || `${jobName} job completed successfully.`);
    } catch (error) {
      setStatus(`Error running ${jobName}: ${error.message}`);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-sm mt-8">
      <h1 className="text-2xl font-bold mb-4">Run Notification Jobs</h1>
      <p className="text-gray-600 mb-6">Manually trigger background jobs to send notifications. In a production environment, these would be scheduled to run automatically.</p>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <p className="text-sm text-gray-500">Sends reminders to consumers for resolved cases.</p>
          <Button onClick={() => handleRunJob(runSurveyReminders, 'Survey Reminders')} disabled={loading}>
            Run Survey Reminders
          </Button>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <p className="text-sm text-gray-500">Notifies companies about complaints nearing SLA breach.</p>
          <Button variant="outline" onClick={() => handleRunJob(runSlaWarnings, 'SLA Warnings')} disabled={loading}>
            Run SLA Warnings
          </Button>
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <p className="text-sm text-gray-500">Nudges companies with unresolved complaints to sign up.</p>
          <Button variant="secondary" onClick={() => handleRunJob(runOutreachEmails, 'Outreach Emails')} disabled={loading}>
            Run Outreach Emails
          </Button>
        </div>
      </div>
      {status && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md text-sm text-gray-700 border">
          <strong>Status:</strong> {status}
        </div>
      )}
    </div>
  );
}