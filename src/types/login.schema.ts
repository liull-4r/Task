import { z } from "zod";

export const loginSchema = z.object({
  phoneNo: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[0-9]+$/,
      "Phone number must contain only numbers and an optional '+' at the start"
    ),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
