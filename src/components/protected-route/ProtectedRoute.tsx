import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router";

export const ProtectedRoute = () => {
  const isAuth = false;

  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
