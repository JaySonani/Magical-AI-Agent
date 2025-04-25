import { Page } from "playwright";
import { z } from "zod";

import { PatientSchema } from "../../api/schema/patient";
import { DELAY_BETWEEN_ACTIONS } from "../../consts";
import { Patient } from "../../types/patient";

/**
 * Fill out the personal information on the form
 * @param page - The playwright page object
 * @returns A message indicating the success or failure of the action
 */
export const fillOutPersonalInformationAction = (page: Page) => ({
  name: "fillOutPersonalInformation",
  description: "Fill out a form with personal information",
  parameters: z.object({
    personalInformation: PatientSchema.shape.personalInformation,
  }),
  execute: async ({ personalInformation }: Patient) => {
    try {
      const { firstName, lastName, dateOfBirth, medicalId } =
        personalInformation;

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);

      await page.fill('input[name="firstName"]', firstName);

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill('input[name="lastName"]', lastName);

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill('input[name="dateOfBirth"]', dateOfBirth);

      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);
      await page.fill('input[name="medicalId"]', medicalId);

      return "Personal information filled successfully";
    } catch (error) {
      console.error(`Error while filling out personal information: ${error}`);
      // propagating the error message back to the agent
      return `Error filling out personal information: ${error}`;
    }
  },
});
