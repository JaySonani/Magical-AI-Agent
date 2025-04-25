import cors from "cors";
import express from "express";

import { AVAILABLE_ENDPOINTS } from "../consts";
import { invokeAgentHandler } from "./handlers/invoke-agent";
import { scheduleAgentHandler } from "./handlers/schedule-agent";

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get("/", (_, res) => {
  res.json({
    message: "Hello World from Magical AI Agent!",
    endpoints: AVAILABLE_ENDPOINTS,
  });
});

// All available routes
router.post("/invoke-agent", invokeAgentHandler);
router.post("/schedule-agent", scheduleAgentHandler);

app.use("/api", router);

export default app;
