import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { userInfoSchema } from "../../validations/userInfoSchema";
import InputField from "../common/InputField";

const UserInfoForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userInfoSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    navigate("/register/business");
  };

  return (
    <div dir="rtl">
      <p className="text-muted mb-3" style={{ fontFamily: "Vazir-Bold" }}>
        اطلاعات اولیه خود را وارد کنید
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="نام"
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <InputField
          label="نام خانوادگی"
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <button
          type="submit"
          className="btn btn-primary w-100 mt-2 font-Vazir-Bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات"}
        </button>

        <p
          className="text-center text-muted mt-3 font-Vazir-Bold"
          style={{ fontSize: "12px" }}
        >
          ورود شما به معنای پذیرش{" "}
          <a href="#" className="text-primary">
            شرایط استفاده
          </a>{" "}
          از خدمات و سیاست{" "}
          <a href="#" className="text-primary">
            حریم خصوصی
          </a>{" "}
          ابرآیرون است
        </p>
      </form>
    </div>
  );
};

export default UserInfoForm;
