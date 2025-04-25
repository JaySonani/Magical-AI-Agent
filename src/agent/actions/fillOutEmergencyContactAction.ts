import { Page } from "playwright";
import { z } from "zod";

import { PatientSchema } from "../../api/schema/patient";
import { DELAY_BETWEEN_ACTIONS } from "../../consts";
import { Patient } from "../../types/patient";

/**
 * Fill out the emergency contact information on the form
 * @param page - The playwright page object
 * @returns A message indicating the success or failure of the action
 */
export const fillOutEmergencyContactAction = (page: Page) => ({
  name: "fillOutEmergencyContact",
  description: "Fill out a form with emergency contact information",
  parameters: z.object({
    emergencyContact: PatientSchema.shape.emergencyContact,
  }),
  execute: async ({ emergencyContact }: Patient) => {
    try {
      const { name, phone } = emergencyContact;

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.click('span:text("Emergency Contact")');

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill('input[name="emergencyContact"]', name);

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill('input[name="emergencyPhone"]', phone);

      return "Emergency contact information filled successfully";
    } catch (error) {
      console.error("Error filling out emergency contact information:", error);
      // propagating the error message back to the agent
      return `Error filling out emergency contact information: ${error}`;
    }
  },
});
