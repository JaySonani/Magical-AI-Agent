export const DELAY_BETWEEN_ACTIONS = 100;
export const MEDICAL_FORM_URL = "https://magical-medical-form.netlify.app/";

export const PORT = 3000;

export const AVAILABLE_ENDPOINTS = [
  {
    path: "/api/invoke-agent",
    method: "POST",
    description: "Invoke the AI Agent",
  },
  {
    path: "/api/schedule-agent",
    method: "POST",
    description: "Schedule the AI Agent to run every 5 minutes",
  },
];
