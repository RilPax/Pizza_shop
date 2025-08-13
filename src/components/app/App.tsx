import { Routes, Route } from "react-router";
import { Layout, ProtectedRoute, PublicOnlyRoute } from "../index";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { authoriseUserThunk } from "../../store/slices/user-slice";
import { Basket, Catalog, Login, NotFound, Offer, Profile, Register } from "../../pages";
import { fetchBasket } from "../../store/slices/basket-slice";
import { Success } from "../../pages/success/Success";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authoriseUserThunk()).then(() => {
    dispatch(fetchBasket());
  });
    
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Catalog />} />

        <Route path="/success" element={<Success />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/offer" element={<Offer />} />
        </Route>
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
