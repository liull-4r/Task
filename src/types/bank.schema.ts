// src/types/bank.schema.ts
import { z } from "zod";

export const bankSchema = z.object({
  name: z.string().min(2, "Name is required"),
  code: z.string().min(2, "Code is required"),
  sortNo: z
    .number({ invalid_type_error: "Sort No must be a number" })
    .min(0, "Sort No cannot be negative"),
});

// Export TypeScript type
export type BankFormData = z.infer<typeof bankSchema>;


export const updateBankSchema = z.object({
  name: z.string().min(2, "Name is required"),
  sortNo: z
    .number({ invalid_type_error: "Sort No must be a number" })
    .min(0, "Sort No cannot be negative"),
});
export type UpdateBankFormData = z.infer<typeof updateBankSchema>;