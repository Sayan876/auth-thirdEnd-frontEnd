import { Navigate, Outlet } from "react-router";
import useAuth from "@/auth/store";

function GuestLayout() {
  const checkLogin = useAuth((state) => state.checkLogin);

  if (checkLogin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default GuestLayout;
