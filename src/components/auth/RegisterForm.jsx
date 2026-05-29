import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../common/InputField";
import FormButton from "../common/FormButton";
import registerSchema from "../../validations/registerSchema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const savedPhone = state?.phone;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  // اگر شماره قبلاً وارد شده بود، داخل فیلد بگذار
  if (savedPhone) {
    setValue("phone", savedPhone);
  }

  const onSubmit = async (data) => {
    try {
      console.log("ارسال کد به:", data.phone);
      toast.success("کد تایید ارسال شد");

      navigate("registerotp", {
        state: { phone: data.phone },
        replace: true,
      });
    } catch (error) {
      toast.error(error?.message || "خطا در ثبت نام!");
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
      </div>
      <FormButton label="ثبت نام" isLoading={isSubmitting} type="submit" />
      <hr />
      <button
        type="button"
        className="btn btn-outline-primary w-100 font-Vazir-Bold mt-2"
        onClick={() => navigate("/login")}
      >
        ورود به حساب کاربری
      </button>
      <p
        className="text-center text-muted mt-3 font-Vazir-Bold"
        style={{ fontSize: "12px" }}
      >
        ثبت نام شما به معنای پذیرش{" "}
        <a href="#" className="text-primary font-Vazir-Bold">
          شرایط استفاده
        </a>{" "}
        از خدمات و سیاست ابرآیرون است
      </p>
    </form>
  );
};

export default RegisterForm;
