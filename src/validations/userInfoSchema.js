import { z } from "zod";

const farsiOnly = /^[\u0600-\u06FF\s]+$/;

export const userInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "نام الزامی است")
    .regex(farsiOnly, "نام باید فقط به فارسی باشد"),

  lastName: z
    .string()
    .min(1, "نام خانوادگی الزامی است")
    .regex(farsiOnly, "نام خانوادگی باید فقط به فارسی باشد"),
});
