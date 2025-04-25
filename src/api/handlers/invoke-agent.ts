import { Request, RequestHandler, Response } from "express";
import { MagicalAgent } from "../../agent/agent";
import { generatePrompt } from "../../agent/helpers/prompt-helper";
import { Patient } from "../../types/patient";
import { PatientSchema } from "../schema/patient";

/**
 * Invoke the AI Agent
 * @param request - The request object
 * @param response - The response object
 */
export const invokeAgentHandler: RequestHandler = async (
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

    const agent = new MagicalAgent();
    const result = await agent.run(generatePrompt(patient));
    response.json(result);
  } catch (error) {
    console.error("Error invoking AI Agent:", error);
    response.status(500).json({
      success: false,
      error: "An error occurred while processing your request",
    });
  }
};
