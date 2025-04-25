import { CoreMessage, GenerateTextResult } from "ai";

let turnCounter = 1;

/**
 * Logs the thinking of the AI agent
 * @param result - The result of the generateText function
 */
export const logThinking = (result: GenerateTextResult<any, CoreMessage>) => {
  const firstMessage = result.response.messages[0];
  const secondMessage = result.response.messages[1];

  if (Array.isArray(firstMessage.content)) {
    console.log(`\n\n========>> AI AGENT - Turn #${turnCounter}:`);
    firstMessage.content.forEach((part) => {
      console.log(part);
    });
    secondMessage && console.log(secondMessage?.content);
  }
  turnCounter++;
};
