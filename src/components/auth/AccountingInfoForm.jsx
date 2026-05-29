import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { accountingInfoSchema } from "../../validations/accountingInfoSchema";
import SelectField from "../common/SelectField";

const currencies = [
  "تومان ( تومان )",
  "ریال ( ریال )",
  "دلار ( USD )",
  "یورو ( EUR )",
];

// محاسبه سال مالی شمسی
const getCurrentShamsiYear = () => {
  const now = new Date();
  // تبدیل ساده به سال شمسی (تقریبی)
  const shamsiYear = now.getFullYear() - 621;
  return shamsiYear.toString();
};

// const getFiscalDates = (year) => {
//   return {
//     start: `${year}/01/01`,
//     end: `${year}/12/29`,
//   };
// };

const AccountingInfoForm = () => {
  const navigate = useNavigate();
  const currentYear = getCurrentShamsiYear();
  const [calendarType, setCalendarType] = useState("shamsi");
  // const fiscalDates = getFiscalDates(currentYear);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(accountingInfoSchema),
    defaultValues: {
      currency: "toman",
      calendarType: "shamsi",
      taxRate: "10",
      fiscalYear: currentYear,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    navigate("/register/business/create");
  };

  const handleCalendarChange = (type) => {
    setCalendarType(type);
    setValue("calendarType", type);
  };

  return (
    <div>
      <h5 className="mb-1" style={{ fontFamily: "Vazir-Bold" }}>
        اطلاعات حسابداری
      </h5>
      <p
        className="text-muted mb-4"
        style={{ fontSize: "14px", fontFamily: "Vazir-Bold" }}
      >
        اطلاعات حسابداری خود را با توجه به کسب‌وکار خود انتخاب کنید
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* انتخاب ارز */}
        <SelectField
          label="انتخاب ارز"
          error={errors.currency?.message}
          options={currencies.map((type) => ({ value: type, label: type }))}
          {...register("currencies")}
        />
        {/* نوع تقویم */}
        <div
          className="d-flex align-items-center justify-content-between mb-3"
          dir="rtl"
        >
          <span style={{ fontFamily: "Vazir-Bold", fontSize: "14px" }}>
            نوع تقویم
          </span>
          <div
            className="d-flex gap-0"
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => handleCalendarChange("shamsi")}
              style={{
                padding: "8px 24px",
                border: "none",
                fontFamily: "Vazir-Bold",
                fontSize: "14px",
                background: calendarType === "shamsi" ? "#007bff" : "white",
                color: calendarType === "shamsi" ? "white" : "#333",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              شمسی
            </button>
            <button
              type="button"
              onClick={() => handleCalendarChange("miladi")}
              style={{
                padding: "8px 24px",
                border: "none",
                fontFamily: "Vazir-Bold",
                fontSize: "14px",
                background: calendarType === "miladi" ? "#007bff" : "white",
                color: calendarType === "miladi" ? "white" : "#333",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              میلادی
            </button>
          </div>
        </div>

        {/* پیش فرض مالیات */}
        <div className="mb-3" style={{ position: "relative" }}>
          <input
            type="text"
            className={`form-control ${errors.taxRate ? "is-invalid" : ""}`}
            style={{
              fontFamily: "Vazir-Bold",
              textAlign: "right",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              padding: "10px 12px",
            }}
            {...register("taxRate")}
          />
          <label
            style={{
              position: "absolute",
              top: "-10px",
              right: "10px",
              background: "white",
              padding: "0 4px",
              fontSize: "12px",
              color: "#6c757d",
              fontFamily: "Vazir-Bold",
            }}
          >
            پیش فرض مالیات
          </label>
          {errors.taxRate && (
            <div className="invalid-feedback">{errors.taxRate.message}</div>
          )}
        </div>

        {/* سال مالی */}
        <div className="mb-3" style={{ position: "relative" }}>
          <input
            type="text"
            className={`form-control ${errors.fiscalYear ? "is-invalid" : ""}`}
            style={{
              fontFamily: "Vazir-Bold",
              textAlign: "right",
              borderRadius: "8px",
              border: "1px solid #ced4da",
              padding: "10px 12px",
            }}
            {...register("fiscalYear")}
          />
          <label
            style={{
              position: "absolute",
              top: "-10px",
              right: "10px",
              background: "white",
              padding: "0 4px",
              fontSize: "12px",
              color: "#6c757d",
              fontFamily: "Vazir-Bold",
            }}
          >
            سال مالی
          </label>
          {errors.fiscalYear && (
            <div className="invalid-feedback">{errors.fiscalYear.message}</div>
          )}
        </div>

        {/* تاریخ شروع و پایان */}
        <div className="d-flex gap-2 mb-4" dir="rtl">
          <div className="flex-1 position-relative" style={{ flex: 1 }}>
            <input
              type="text"
              className="form-control"
              // value={fiscalDates.start}
              style={{
                fontFamily: "Vazir-Bold",
                textAlign: "right",
                borderRadius: "8px",
                border: "1px solid #ced4da",
                padding: "10px 12px",
              }}
            />
            <label
              style={{
                position: "absolute",
                top: "-10px",
                right: "10px",
                background: "#f8f9fa",
                padding: "0 4px",
                fontSize: "12px",
                color: "#6c757d",
                fontFamily: "Vazir-Bold",
              }}
            >
              شروع دوره
            </label>
          </div>

          <div className="flex-1 position-relative" style={{ flex: 1 }}>
            <input
              type="text"
              className="form-control"
              // value={fiscalDates.end}
              style={{
                fontFamily: "Vazir-Bold",
                textAlign: "right",
                borderRadius: "8px",
                border: "1px solid #ced4da",
                padding: "10px 12px",
              }}
            />
            <label
              style={{
                position: "absolute",
                top: "-10px",
                right: "10px",
                background: "#f8f9fa",
                padding: "0 4px",
                fontSize: "12px",
                color: "#6c757d",
                fontFamily: "Vazir-Bold",
              }}
            >
              پایان دوره
            </label>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="d-flex gap-2" dir="rtl">
          <button
            type="submit"
            className="btn btn-primary flex-grow-1 font-Vazir-Bold"
            disabled={isSubmitting}
            style={{ fontFamily: "Vazir-Bold" }}
          >
            {isSubmitting ? "در حال ثبت..." : "تایید ساختن کسب و کار"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ fontFamily: "Vazir-Bold", minWidth: "80px" }}
            onClick={() => navigate("/register/business")}
          >
            قبلی
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountingInfoForm;
