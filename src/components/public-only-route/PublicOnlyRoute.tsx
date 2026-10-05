import { Navigate, Outlet, useLocation, type Location } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Preloader } from "../preloader/Preloader";

export const PublicOnlyRoute = () => {
  const { isAuth, isAuthChecked } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) return <Preloader />;

  // После входа возвращаем туда, откуда пришли (например, на оформление заказа)
  const from = (location.state as { from?: Location } | null)?.from?.pathname ?? "/";

  return !isAuth ? <Outlet /> : <Navigate to={from} replace />;
};
