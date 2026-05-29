import { z } from "zod";

export const accountingInfoSchema = z.object({
  currency: z.string().min(1, "لطفاً ارز را انتخاب کنید"),
  calendarType: z.enum(["shamsi", "miladi"]),
  taxRate: z
    .string()
    .regex(/^\d+$/, "فقط عدد وارد کنید")
    .refine((v) => +v >= 0 && +v <= 100, "عدد بین ۰ تا ۱۰۰ وارد کنید"),
  fiscalYear: z.string().regex(/^\d{4}$/, "سال مالی معتبر نیست"),
});
