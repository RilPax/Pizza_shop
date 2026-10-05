import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, ProtectedRoute, PublicOnlyRoute } from "../index";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { authoriseUserThunk } from "../../store/slices/user-slice";
import { loadBasket } from "../../store/slices/basket-slice";
import {
  Basket,
  Home,
  Login,
  Menu,
  NotFound,
  Offer,
  Profile,
  Register,
  Success,
} from "../../pages";

export function App() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.id);
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);

  useEffect(() => {
    dispatch(authoriseUserThunk());
  }, [dispatch]);

  // Подгружаем корзину гостя или пользователя при входе / выходе
  useEffect(() => {
    if (isAuthChecked) dispatch(loadBasket());
  }, [dispatch, isAuthChecked, userId]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/success" element={<Success />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/offer" element={<Offer />} />
        </Route>
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
