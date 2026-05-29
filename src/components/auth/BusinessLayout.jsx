import { Outlet, useLocation } from "react-router-dom";
import logoImg from "../../assets/img/download.png";

const steps = [
  {
    id: 1,
    title: "مرحله ۱",
    subtitle: "اطلاعات کسب‌وکار",
    path: "/register/business",
  },
  {
    id: 2,
    title: "مرحله ۲",
    subtitle: "اطلاعات حسابداری",
    path: "/register/business/accounting",
  },
  {
    id: 3,
    title: "مرحله ۳",
    subtitle: "ساخت کسب‌وکار",
    path: "/register/business/create",
  },
];

const BusinessLayout = () => {
  const location = useLocation();

  const getCurrentStep = () => {
    if (location.pathname.includes("accounting")) return 2;
    if (location.pathname.includes("create")) return 3;
    return 1;
  };

  const currentStep = getCurrentStep();

  const getStepStyle = (stepId) => {
    if (stepId < currentStep) return { background: "#28a745", color: "white" };
    if (stepId === currentStep)
      return { background: "#007bff", color: "white" };
    return { background: "#e9ecef", color: "#6c757d" };
  };

  return (
    <div className="container-fluid py-3 px-5">
      {/* هدر لوگو */}
      <div className="row mb-2">
        <div className="col-12 d-flex justify-content-end">
          <img
            src={logoImg}
            alt=""
            style={{ width: "100px", height: "25px" }}
          />
        </div>
      </div>

      {/* محتوا */}
      <div className="row">
        <div
          className="col-12 border-2 border rounded-3 p-4"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <div className="row">
            {/* سمت چپ — Stepper */}
            <div className="col-4 d-flex flex-column align-items-center pt-3">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="d-flex flex-column align-items-center w-100"
                >
                  <div className="d-flex align-items-center justify-content-end w-100 gap-3 pe-3">
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#6c757d",
                          fontFamily: "Vazir-Bold",
                        }}
                      >
                        {step.title}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontFamily: "Vazir-Bold",
                          color: currentStep === step.id ? "#007bff" : "#333",
                        }}
                      >
                        {step.subtitle}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: "bold",
                        flexShrink: 0,
                        ...getStepStyle(step.id),
                      }}
                    >
                      {step.id < currentStep ? "✓" : step.id}
                    </div>
                  </div>

                  {/* خط بین مراحل */}
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        width: "2px",
                        height: "80px",
                        background: "#dee2e6",
                        margin: "8px 0",
                        marginRight: "32px",
                        alignSelf: "flex-end",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* سمت راست — فرم */}
            <div className="col-8 border-start" dir="rtl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLayout;
