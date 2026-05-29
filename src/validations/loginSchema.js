import { z } from "zod";

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "شماره همراه الزامی است")
    .regex(/^[0-9]+$/, "شماره همراه فقط باید عدد باشد")
    .regex(/^09[0-9]{9}$/, "شماره همراه معتبر نیست"),

  password: z.string().min(1, "کلمه عبور الزامی است"),
});

export default loginSchema;
