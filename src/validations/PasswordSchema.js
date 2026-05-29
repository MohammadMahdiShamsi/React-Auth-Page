import { z } from "zod";

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .regex(/[A-Z]/, "باید حداقل یک حرف بزرگ انگلیسی (A-Z) داشته باشد")
      .regex(/[a-z]/, "باید حداقل یک حرف کوچک انگلیسی (a-z) داشته باشد")
      .regex(/[0-9]/, "باید حداقل یک عدد داشته باشد")
      .regex(
        /[!@#$&*_-]/,
        "باید حداقل یکی از نمادها (! @ # $ & * - _) را داشته باشد",
      ),

    confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });
