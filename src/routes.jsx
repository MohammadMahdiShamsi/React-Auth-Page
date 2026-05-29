import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import RegisterForm from "./components/auth/RegisterForm";
import OtpForm from "./components/auth/OtpForm";
import PasswordForm from "./components/auth/PasswordForm.jsx";
import UserInfoForm from "./components/auth/UserInfoForm.jsx";
import BusinessLayout from "./components/auth/BusinessLayout.jsx";
import BusinessInfoForm from "./components/auth/BusinessInfoForm.jsx";
import AccountingInfoForm from "./components/auth/AccountingInfoForm.jsx";
import CreateBusinessForm from "./components/auth/CreateBusinessForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <AuthPage mode="login" />,
  },
  {
    path: "/register",
    element: <AuthPage mode="register" />,
    children: [
      { index: true, element: <RegisterForm /> },
      { path: "registerotp", element: <OtpForm /> },
      { path: "registerpassword", element: <PasswordForm /> },
      { path: "registeruser", element: <UserInfoForm /> },
    ],
  },
  {
    path: "/register/business",
    element: <BusinessLayout />,
    children: [
      { index: true, element: <BusinessInfoForm /> },
      { path: "accounting", element: <AccountingInfoForm /> },
      { path: "create", element: <CreateBusinessForm /> },
    ],
  },
]);
export default router;
