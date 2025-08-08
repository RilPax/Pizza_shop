import { Routes, Route } from "react-router";
import { ProtectedRoute, PublicOnlyRoute } from "../index";

export function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/basket" />
      <Route element={<ProtectedRoute />}>
        <Route path="/register" />
        <Route path="/login" />
      </Route>
      <Route element={<PublicOnlyRoute />}></Route>
    </Routes>
  );
}
