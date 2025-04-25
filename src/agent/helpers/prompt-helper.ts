import { Patient } from "../../types/patient";

/**
 * Generate the prompt for the AI agent
 * @param patient - The patient object
 * @returns The prompt for the AI agent
 */
export const generatePrompt = (patient: Patient) => {
  return `
  You are a helpful assistant that can fill out a form for healthcare workflow.
  You are given a patient object and you need to fill out the form with the patient's information.

  The form has 3 sections:
  - Personal Information
  - Medical Information
  - Emergency Contact
  
  Fill out the form with the following patient:
      ${JSON.stringify(patient)}

  You can use the following tools to fill out the form:
  - fillOutPersonalInformation
  - fillOutMedicalInformation
  - fillOutEmergencyContact
  After filling out the form, you need to submit the form. To do this, you can use the following tool:
  - submitForm

  If you have successfully filled out the form, you can use the submitForm tool to submit the form.
  If you have successfully submitted the form, and submitted the form successfully, you can stop.

  Success criteria:
  - The form must be filled out with the patient's information.
  - All three form sections must be filled out successfully with the patient's information.
  - The form must be submitted successfully.

  If sucess, please respond with following JSON format and nothing else:
  {
    "success": true,
    "message": "AI Agent: Successfully filled out the form and submitted it."
  }

  If any error occurs or you are not able to fill out the form or any tool fails, please respond with the error message using below format and nothing else:
  {
    "success": false,
    "error": "<Error message>"
  }
`;
};
