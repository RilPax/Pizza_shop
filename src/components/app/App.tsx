import { Routes, Route } from "react-router";
import { Layout, ProtectedRoute, PublicOnlyRoute } from "../index";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { authoriseUserThunk } from "../../store/slices/user-slice";
import { Basket, Catalog, Login, Profile, Register } from "../../pages";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authoriseUserThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Catalog />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
