import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Preloader } from "../preloader/Preloader";

export const ProtectedRoute = () => {
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
