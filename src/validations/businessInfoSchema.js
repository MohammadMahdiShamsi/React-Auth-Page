import { z } from "zod";

export const businessInfoSchema = z.object({
  businessName: z.string().min(1, "نام کسب‌ و کار الزامی است"),

  businessType: z.string().min(1, "نوع کسب‌ و کار الزامی است"),

  addSmartProducts: z.boolean().optional(),
});
