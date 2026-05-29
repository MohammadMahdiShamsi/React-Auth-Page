import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { businessInfoSchema } from "../../validations/businessInfoSchema";
import InputField from "../common/InputField";
import businessImg from "../../assets/img/createBusinessImg.0e413132.png";
import SelectField from "../common/SelectField";

const businessTypes = [
  "خرده‌فروشی",
  "عمده‌فروشی",
  "خدمات",
  "تولیدی",
  "پخش",
  "سایر",
];

const BusinessInfoForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(businessInfoSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    navigate("/register/business/accounting");
  };

  return (
    <div>
      <h5 className="mb-1" style={{ fontFamily: "Vazir-Bold" }}>
        اطلاعات کسب‌ و کار
      </h5>
      <p
        className="text-muted mb-2"
        style={{ fontSize: "14px", fontFamily: "Vazir-Bold" }}
      >
        لطفاً اطلاعات کسب‌ و کار خود را وارد کنید
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="نام کسب‌ و کار"
          error={errors.businessName?.message}
          {...register("businessName")}
        />

        {/* dropdown نوع کسب‌وکار */}
        <SelectField
          label="نوع کسب‌ و کار"
          error={errors.businessType?.message}
          options={businessTypes.map((type) => ({ value: type, label: type }))}
          {...register("businessType")}
        />
        <small
          className="text-muted mb-3 d-block"
          style={{ fontFamily: "Vazir-Bold" }}
        >
          در صورتی که نوع کسب‌ و کار شما در لیست یافت نشد، از گزینه سایر استفاده
          کنید
        </small>
        {/* چک‌باکس */}
        <div
          className="form-check d-flex align-items-center gap-2 justify-content-end"
          dir="ltr"
        >
          <label
            className="form-check-label px-4"
            style={{ fontFamily: "Vazir-Bold" }}
          >
            افزودن هوشمند کالاهای مرتبط با کسب‌ و کار شما
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            {...register("addSmartProducts")}
          />
        </div>

        <div>
          <img
            src={businessImg}
            alt=""
            style={{ width: "550px", height: "243" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 font-Vazir-Bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ثبت..." : "تایید"}
        </button>
      </form>
    </div>
  );
};

export default BusinessInfoForm;
