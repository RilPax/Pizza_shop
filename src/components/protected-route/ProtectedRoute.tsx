import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router";
import { useAppSelector } from "../../store/store";
import { Preloader } from "../preloader/Preloader";

export const ProtectedRoute = () => {
  const { isAuth, loading } = useAppSelector((state) => state.user);

  const location = useLocation();

  if (loading) return <Preloader />;

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};
