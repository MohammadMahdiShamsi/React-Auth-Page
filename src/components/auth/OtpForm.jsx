import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormButton from "../common/FormButton";
import toast from "react-hot-toast";

const OtpForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.phone;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) setIsExpired(true);
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (paste.length === 6) {
      setOtp(paste.split(""));
      inputs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    if (isExpired) {
      toast.error("کد تایید منقضی شده، لطفاً کد جدید دریافت کنید");
      return;
    }
    setIsSubmitting(true);
    console.log("کد وارد شده:", code);
    toast.success("ثبت نام موفق ");

    navigate("../registerpassword", {
      state: { phone: phone },
      replace: true,
    });

    setIsSubmitting(false);
  };

  const onBack = () => {
    navigate("/register", {
      state: { phone: phone },
      replace: true,
    });
  };

  if (!phone) {
    return <p>شماره تلفن یافت نشد!</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate dir="rtl">
      <h6 className="text-center mb-1" style={{ fontFamily: "Vazir-Bold" }}>
        تایید شماره موبایل
      </h6>
      <p
        className="text-center text-muted mb-4"
        style={{ fontSize: "12px", fontFamily: "Vazir-Bold" }}
      >
        کد تایید برای شماره {phone} ارسال شد
      </p>

      <div className="d-flex gap-2 justify-content-center mb-3" dir="ltr">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            style={{
              width: "45px",
              height: "45px",
              textAlign: "center",
              fontSize: "18px",
              fontFamily: "Vazir-Bold",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          type="button"
          className="btn p-0 text-primary"
          style={{ fontSize: "13px", fontFamily: "Vazir-Bold" }}
          onClick={onBack}
        >
          اصلاح شماره
        </button>

        {timer > 0 ? (
          <span className="text-muted" style={{ fontSize: "13px" }}>
            {formatTime(timer)}
          </span>
        ) : (
          <button
            type="button"
            className="btn p-0 text-primary"
            style={{ fontSize: "13px", fontFamily: "Vazir-Bold" }}
            onClick={() => setTimer(120)}
          >
            ارسال مجدد کد
          </button>
        )}
      </div>

      <FormButton label="تایید کد" isLoading={isSubmitting} type="submit" />
    </form>
  );
};

export default OtpForm;
