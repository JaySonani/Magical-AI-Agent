import app from "./api/api";
import { PORT } from "./consts";

export async function main() {
  app.listen(PORT, () => {
    console.log("Server is running..");
    console.log(`AI Agent is ready to be invoked at http://localhost:${PORT}`);
  });
}
