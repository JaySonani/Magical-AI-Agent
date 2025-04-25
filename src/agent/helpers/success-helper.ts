import { CoreMessage, GenerateTextResult, TextPart } from "ai";

/**
 * Handle the outcome of the AI agent
 * @param result - The result of the generateText function
 * @returns The outcome of the AI agent
 */
export const handleOutcome = (result: GenerateTextResult<any, CoreMessage>) => {
  const firstMessage = result.response.messages[0].content;

  if (Array.isArray(firstMessage)) {
    const textPart = firstMessage.find(
      (part) => part.type === "text"
    ) as TextPart;

    if (isJsonObject(textPart.text)) {
      return JSON.parse(textPart.text);
    }
  }
};

/**
 * Check if the text is a JSON object
 * @param text - The text to check
 * @returns True if the text is a JSON object, false otherwise
 */
const isJsonObject = (text: string) => {
  try {
    const parsed = JSON.parse(text);
    return typeof parsed === "object" && parsed !== null;
  } catch {
    return false;
  }
};
