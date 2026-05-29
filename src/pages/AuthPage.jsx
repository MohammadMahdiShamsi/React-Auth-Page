import { Outlet, useLocation } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const AuthPage = ({ mode }) => {
  const location = useLocation();

  // عنوان دینامیک برای مراحل مختلف ثبت‌نام
  let title = mode === "login" ? "ورود به حساب کاربری" : "ثبت نام";

  if (mode === "register") {
    if (location.pathname.includes("registerotp")) {
      title = "تایید شماره موبایل";
    } else if (location.pathname.includes("registerpassword")) {
      title = "انتخاب رمز عبور"; // ← عنوان مورد نظر تو
    } else if (location.pathname.includes("registeruser")) {
      title = "اطلاعات اولیه";
    }
  }

  return (
    <AuthLayout title={title}>
      {mode === "login" ? <LoginForm /> : <Outlet />}
    </AuthLayout>
  );
};

export default AuthPage;
