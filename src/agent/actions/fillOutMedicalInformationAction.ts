import { Page } from "playwright";
import { z } from "zod";
import { PatientSchema } from "../../api/schema/patient";
import { DELAY_BETWEEN_ACTIONS } from "../../consts";
import { Patient } from "../../types/patient";

/**
 * Fill out the medical information on the form
 * @param page - The playwright page object
 * @returns A message indicating the success or failure of the action
 */
export const fillOutMedicalInformationAction = (page: Page) => ({
  name: "fillOutMedicalInformation",
  description: "Fill out a form with medical information",
  parameters: z.object({
    medicalInformation: PatientSchema.shape.medicalInformation,
  }),
  execute: async ({ medicalInformation }: Patient) => {
    try {
      const { gender, bloodType, allergies, currentMedications } =
        medicalInformation;

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.click('span:text("Medical Information")');

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.selectOption('select[name="gender"]', gender);

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.selectOption('select[name="bloodType"]', bloodType);

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill('textarea[name="allergies"]', allergies.join(", "));

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill(
        'textarea[name="medications"]',
        currentMedications.join(", ")
      );

      return "Medical information filled successfully";
    } catch (error) {
      console.error(`Error while filling out medical information: ${error}`);
      // propagating the error message back to the agent
      return `Error filling out medical information: ${error}`;
    }
  },
});
