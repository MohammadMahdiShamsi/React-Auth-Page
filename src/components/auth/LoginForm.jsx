import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loginSchema from "../../validations/loginSchema";
import InputField from "../common/InputField";
import PasswordInput from "../common/PasswordInput";
import FormButton from "../common/FormButton";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      console.log("داده‌های ورود:", data);
      toast.success("ورود موفق!");
      // اینجا می‌تونی به داشبورد ریدایرکت کنی
      // navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message || "خطا در ورود!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate dir="rtl">
      <div style={{ maxWidth: "380px", margin: "0 auto" }}>
        <InputField
          label="شماره همراه"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <PasswordInput
          label="کلمه عبور"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <span className="text-muted font-Vazir-Bold mb-2 mt-2">
          رمز عبور خود را فراموش کرده ام ؟
        </span>
        <a
          href="#"
          className="text-primary text-decoration-none font-Vazir-Bold mb-2 mt-2"
        >
          بازیابی رمز عبور
        </a>
      </div>

      <FormButton label="ورود" isLoading={isSubmitting} type="submit" />

      <button
        type="button"
        className="btn btn-outline-primary w-100 mt-3 mb-2 font-Vazir-Bold"
      >
        ورود با رمز یکبار مصرف
      </button>

      <hr />

      <button
        type="button"
        className="btn btn-outline-primary w-100 font-Vazir-Bold mt-2"
        onClick={() => navigate("/register")}
      >
        ثبت نام کنید
      </button>

      <p
        className="text-center text-muted mt-3 font-Vazir-Bold"
        style={{ fontSize: "12px" }}
      >
        ورود شما به معنای پذیرش{" "}
        <a href="#" className="text-primary font-Vazir-Bold">
          شرایط استفاده
        </a>{" "}
        از خدمات و سیاست ابرآیرون است
      </p>
    </form>
  );
};

export default LoginForm;
