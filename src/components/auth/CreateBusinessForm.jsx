import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBusinessForm = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      dir="rtl"
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "300px" }}
    >
      {!completed ? (
        <>
          <div
            className="spinner-border text-primary mb-3"
            style={{ width: "50px", height: "50px" }}
          />
          <p style={{ fontFamily: "Vazir-Bold", color: "#6c757d" }}>
            در حال ایجاد پنل ابرآیرون برای
          </p>
          <p style={{ fontFamily: "Vazir-Bold", color: "#333" }}>
            عنوان کسب‌وکار
          </p>
        </>
      ) : (
        <>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#28a745",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "white",
              marginBottom: "12px",
            }}
          >
            ✓
          </div>
          <p style={{ fontFamily: "Vazir-Bold", color: "#28a745" }}>
            پنل با موفقیت ایجاد شد!
          </p>
        </>
      )}
    </div>
  );
};

export default CreateBusinessForm;
