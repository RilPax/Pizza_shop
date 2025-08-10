import { Routes, Route } from "react-router";
import { ProtectedRoute, PublicOnlyRoute } from "../index";
import { useAppDispatch } from "../../store/store";
import { useEffect } from "react";
import { authoriseUserThunk } from "../../store/slices/user-slice";

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authoriseUserThunk());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" />
      <Route element={<ProtectedRoute />}>
        <Route path="/basket" />
        <Route path="/profile" />
      </Route>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/register" />
        <Route path="/login" />
      </Route>
    </Routes>
  );
}
