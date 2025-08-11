import { Outlet } from "react-router";
import { Footer, Header } from "../index";

export const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
