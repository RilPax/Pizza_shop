import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../store/store";
import { Preloader } from "../preloader/Preloader";

export const PublicOnlyRoute = () => {
  const { isAuth, loading } = useAppSelector((state) => state.user);

  if (loading) return <Preloader />;

  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
