import { z } from "zod";
import { PatientSchema } from "../api/schema/patient";

export type Patient = z.infer<typeof PatientSchema>;
