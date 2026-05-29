import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { passwordSchema } from "../../validations/PasswordSchema"; // مسیر را چک کن
import PasswordInput from "../common/PasswordInput";

const RegisterPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.phone;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });

  const rules = [
    { text: "حداقل ۸ کاراکتر", valid: password.length >= 8 },
    {
      text: "حتما از حروف انگلیسی بزرگ و کوچک استفاده کنید  ",
      valid: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    {
      text: " حداقل از یک عدد استفاده کنید مانند 8387286 ",
      valid: /[0-9]/.test(password),
    },
    {
      text: "حداقل یکی از ( ! @ # $ & * - _ ) را داشته باشد  ",
      valid: /[!@#$&*_-]/.test(password),
    },
  ];

  const onSubmit = async (data) => {
    console.log("رمز عبور:", data);
    // ارسال به سرور
    navigate("/register/registeruser", { state: { phone } });
  };

  return (
    <div>
      <p className="text-end text-muted mb-3 font-Vazir-Bold">
        برای حساب کاربری با شماره <span className="text-primary">{phone}</span>{" "}
        یک رمز عبور انتخاب کنید
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate dir="rtl">
        <PasswordInput
          label="کلمه عبور"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          label="تکرار کلمه عبور"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* نمایش قوانین اعتبارسنجی */}
        {password && (
          <div className="mt-3 mb-2" dir="ltr">
            <ul className="list-unstyled">
              {rules.map((rule, index) => (
                <li
                  key={index}
                  className={`small font-Vazir-Bold d-flex align-items-center justify-content-end gap-2 mb-1 ${
                    rule.valid ? "text-success" : "text-muted"
                  }`}
                >
                  {rule.text} {rule.valid ? "✓" : "○"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100 font-Vazir-Bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "تأیید رمز عبور"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPassword;
