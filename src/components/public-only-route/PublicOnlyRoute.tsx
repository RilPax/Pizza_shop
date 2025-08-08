import { Navigate, Outlet } from "react-router";

export const PublicOnlyRoute = () => {
  const isAuth = false;
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
