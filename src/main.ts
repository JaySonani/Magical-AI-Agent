import { generateText } from "ai";
import { model } from "./_internal/setup";
import { createSession } from "./session";

export async function main() {
  // This will automatically create a chromium instance, connect, and navigate to the given url.
  // You are given a playwright page back.
  const page = await createSession("https://www.google.com");

  // We've given you an API key and a model, you can use the vercel AI SDK to generate text, setup tools, etc.
  const response = await generateText({
    model,
    prompt: "How many r's are in strawberry?"
  });

  console.log('first')
  console.log(response);

  
}
