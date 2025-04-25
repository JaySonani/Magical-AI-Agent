import { Page } from "playwright";
import { z } from "zod";
import { DELAY_BETWEEN_ACTIONS } from "../../consts";

/**
 * Submit the completed medical form
 * @param page - The playwright page object
 * @returns A message indicating the success or failure of the action
 */
export const submitFormAction = (page: Page) => ({
  name: "submitForm",
  description: "Submit the completed medical form",
  parameters: z.object({}),
  execute: async () => {
    try {
      await page.click('button[type="submit"]');
      await page.waitForTimeout(DELAY_BETWEEN_ACTIONS);

      return "Form submitted successfully";
    } catch (error) {
      console.error(`Error while submitting form: ${error}`);
      return `Error submitting form: ${error}`;
    }
  },
});
