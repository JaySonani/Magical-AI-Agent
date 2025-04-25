import { Request, RequestHandler, Response } from "express";
import cron from "node-cron";

import { MagicalAgent } from "../../agent/agent";
import { generatePrompt } from "../../agent/helpers/prompt-helper";
import { Patient } from "../../types/patient";
import { PatientSchema } from "../schema/patient";

/**
 * Schedule the AI Agent to run every 5 minutes
 * @param request - The request object
 * @param response - The response object
 */
export const scheduleAgentHandler: RequestHandler = async (
  request: Request<{}, {}, Patient>,
  response: Response
) => {
  try {
    const validationResult = PatientSchema.safeParse(request.body);

    if (!validationResult.success) {
      response.status(400).json({
        error:
          "Invalid request body. Please provide valid patient information.",
        details: validationResult.error.errors,
      });
      return;
    }

    const patient: Patient = validationResult.data;

    cron.schedule("*/5 * * * *", async () => {
      console.log("\nRunning AI Agent every 5 minutes");
      const agent = new MagicalAgent();
      await agent.run(generatePrompt(patient));
    });

    response.json({
      success: true,
      message: "AI Agent scheduled successfully every 5 minutes",
    });
  } catch (error) {
    console.error("Error invoking AI Agent:", error);
    response.status(500).json({
      success: false,
      error: "An error occurred while processing your request",
    });
  }
};
