import { z } from "zod";

export const profileUpdateSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters.").optional(),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number.").optional(),
  email: z.string().email("Please enter a valid email address.").optional(),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Please enter a valid 12-digit Aadhaar number.").optional(),
  state: z.string().min(1, "State is required.").optional(),
  district: z.string().min(1, "District is required.").optional(),
  occupation: z.string().min(1, "Occupation is required.").optional(),
  annualIncome: z.string().min(1, "Annual income slab is required.").optional(),
  education: z.string().min(1, "Education level is required.").optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
