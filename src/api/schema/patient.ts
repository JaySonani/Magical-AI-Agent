import { z } from "zod";

/**
 * The schema for the patient object
 */
export const PatientSchema = z.object({
  personalInformation: z.object({
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.string(),
    medicalId: z.string(),
  }),
  medicalInformation: z.object({
    gender: z.string(),
    bloodType: z.string(),
    allergies: z.array(z.string()),
    currentMedications: z.array(z.string()),
  }),
  emergencyContact: z.object({
    name: z.string(),
    phone: z.string(),
  }),
});
