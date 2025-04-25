import { CoreMessage, generateText } from "ai";
import { Page } from "playwright";

import { model } from "../_internal/setup";
import { MEDICAL_FORM_URL } from "../consts";
import { createSession } from "../session";

import { fillOutEmergencyContactAction } from "./actions/fillOutEmergencyContactAction";
import { fillOutMedicalInformationAction } from "./actions/fillOutMedicalInformationAction";
import { fillOutPersonalInformationAction } from "./actions/fillOutPersonalInformation";
import { submitFormAction } from "./actions/submitFormAction";

import { logThinking } from "./helpers/logger-helper";
import { handleOutcome } from "./helpers/success-helper";

/**
 * The Magical Agent class
 */
export class MagicalAgent {
  private messages: CoreMessage[];
  private page!: Page;

  constructor() {
    this.messages = [];
  }

  async initialize(prompt: string) {
    this.page = await createSession(MEDICAL_FORM_URL);
    this.messages = [
      {
        role: "user",
        content: prompt,
      },
    ];
  }

  async run(prompt: string) {
    await this.initialize(prompt);

    while (true) {
      const result = await generateText({
        model,
        messages: this.messages,
        tools: {
          fillOutPersonalInformation: fillOutPersonalInformationAction(
            this.page
          ),
          fillOutMedicalInformation: fillOutMedicalInformationAction(this.page),
          fillOutEmergencyContact: fillOutEmergencyContactAction(this.page),
          submitForm: submitFormAction(this.page),
        },
      });

      logThinking(result);
      const outcome = handleOutcome(result);

      // We have given the instruction to the agent to respond with a JSON object containing
      // a success property only if the form is filled out successfully or there is an error/failure
      // In these 2 cases only, we will return the outcome. False case has been included so
      // that the agent can propogate the error/failure to the user via API response.
      if (outcome?.success || outcome?.success === false) {
        await this.page.close();
        return outcome;
      }

      this.messages = this.messages.concat(result.response.messages);
    }
  }
}
